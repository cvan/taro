var getJSON = module.exports.getJSON = function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.onreadystatechange = handler;
  xhr.responseType = 'json';
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.send();

  function handler() {
    if (this.readyState === this.DONE) {
      if (this.status === 200) {
        cb(null, this.response);
      } else {
        var errorMsg = '[getJSON] `' + url + '` failed\nStatus:   ' + this.status;
        if (this.response.message) {
          errorMsg += '\nResponse: ' + this.response.message;
        }
        cb(new Error(errorMsg));
      }
    }
  };
};


var storageGet = module.exports.storageGet = function storageGet(key, value) {
  if (!global.window) {
    return;
  }

  if (!('localStorage' in global.window)) {
    return console.warn('Could not access localStorage');
  }

  var data = localStorage[key];
  if (typeof data === 'undefined') {
    data = null;
  }

  try {
    data = JSON.parse(data);
  } catch (e) {
    console.warn('Could not parse JSON from localStorage[%s]', key);
  }

  return data;
};


var storageSet = module.exports.storageSet = function storageSet(key, value) {
  if (!global.window) {
    return;
  }

  if (!('localStorage' in global.window)) {
    return console.warn('Could not access localStorage');
  }

  try {
    value = JSON.stringify(value);
  } catch (e) {
    console.warn('Could not stringify as JSON to localStorage[%s]', key);
  }

  localStorage[key] = value;
};


var storagePush = module.exports.storagePush = function storagePush(key, value) {
  var data = storageGet(key, value) || [];
  data.push(value);
  storageSet(key, data);
  return data;
};


var slugify = exports.slugify = function (txt) {
  if (typeof txt !== 'string') {
    return txt;
  }

  return (txt || '').toLowerCase()
                    .replace(/ /g, '')
                    .replace(/[^a-zA-Z0-9]+/g, '-');
};


var noop = exports.noop = function () {
};


var addApp = exports.addApp = function (url, cb) {
  cb = cb || noop;

  if (!global.window) {
    return cb(new Error('window is missing!'));
  }

  getJSON('https://fetch-manifest.herokuapp.com/manifest?url=' + url, function (err, data) {
    if (err) {
      data = null;
      return cb(err.message);
    }

    if (data) {
      if (data.error) {
        data = null;
        cb(new Error('Manifest error (for ' + url + '): ' + data.error), data);
      } else {
        var slug = slugify(data.short_name || data.name);
        var app = {
          slug: slug,
          source_url: url,
          manifest: data
        };

        var apps = storageGet('apps') || [];
        var appReplaced = false;
        apps.forEach(function (appObj, idx) {
          if (appObj.source_url === app.source_url) {
            apps[idx] = app;
            appReplaced = true;
          }
        });

        if (appReplaced) {
          storageSet('apps', apps);
          cb(null, apps);
        } else {
          storagePush('apps', app);
          cb(null, app);
        }
      }
    }
  }.bind(this));
};


exports.refreshApps = function (cb) {
  cb = cb || noop;

  if (!global.window) {
    return cb(new Error('window is missing!'));
  }

  var apps = storageGet('apps', apps) || [];
  var done = 0;
  apps.forEach(function (app) {
    addApp(app.source_url, function () {
      done++;
      if (done === apps.length) {
        cb(null);
      }
    });
  });
};


exports.preloadApps = function (cb) {
  cb = cb || noop;

  if (!global.window) {
    return cb(new Error('window is missing!'));
  }

  getJSON('/src/preloadedApps.json', function (err, urls) {
    if (err) {
      url = null;
      return cb(err.message);
    }

    var done = 0;

    urls.forEach(function (url) {
      addApp(url, function () {
        done++;
        if (done === urls.length) {
          cb(null);
        }
      });
    });

  });
};
