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
  if (!('localStorage' in window)) {
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
  if (!('localStorage' in window)) {
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
