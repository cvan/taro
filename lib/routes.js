var DocumentTitle = require('react-document-title');
var React = require('react');
var Router = require('react-router');


var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;



function getJSON(url, cb) {
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
        cb(new Error('[getJSON] `' + url + '` failed with status "' + this.status + '"'));
      }
    }
  };
}


function storageGet(key, value) {
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
}


function storageSet(key, value) {
  if (!('localStorage' in window)) {
    return console.warn('Could not access localStorage');
  }

  try {
    value = JSON.stringify(value);
  } catch (e) {
    console.warn('Could not stringify as JSON to localStorage[%s]', key);
  }

  localStorage[key] = value;
}


function storagePush(key, value) {
  var data = storageGet(key, value) || [];
  data.push(value);
  storageSet(key, data);
}


var App = React.createClass({displayName: "App",
  render: function () {
    return (
      React.createElement("div", {className: "app"}, 
        React.createElement("header", null, 
          React.createElement("h1", null, "Taro"), 
          React.createElement(Link, {to: "home"}, "Home"), 
          React.createElement(Link, {to: "apps"}, "Apps"), 
          React.createElement(Link, {to: "add"}, "Add an App"), 
          React.createElement(Link, {to: "favorites"}, "My Favorites")
        ), 
        React.createElement("section", {className: "content"}, 
          React.createElement(RouteHandler, null)
        )
      )
    );
  }
});


var Home = React.createClass({displayName: "Home",
  render: function () {
    return (
      React.createElement(DocumentTitle, {title: "Home | Taro"}, 
        React.createElement("h2", null, "Welcome home")
      )
    );
  }
});


var Apps = React.createClass({displayName: "Apps",
  render: function () {
    return (
      React.createElement(DocumentTitle, {title: "Apps | Taro"}, 
        React.createElement("h2", null, "Apps")
      )
    );
  }
});


var Add = React.createClass({displayName: "Add",
  onSubmit: function (e) {
    e.preventDefault();

    var url = this.refs.url.getDOMNode().value;

    getJSON('https://fetch-manifest.herokuapp.com/manifest?url=' + url, function (err, data) {
      if (err) {
        data = null;
        console.warn(err.message);
      }

      if (data.error) {
        data = null;
        console.warn('Manifest error (for %s): %s', url, data.error);
      }

      // TODO: Make sure there are no dupes.
      storagePush('apps', {
        source_url: url,
        manifest: data
      });
    });
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(DocumentTitle, {title: "Add an App | Taro"}), 
        React.createElement("h2", null, "Add an App"), 
        React.createElement("form", {onSubmit: this.onSubmit}, 
          React.createElement("p", null, 
            React.createElement("label", null, 
              "URL", 
              React.createElement("input", {type: "url", placeholder: "http://", required: true, ref: "url", className: "field field--large"})
            )
          ), 
          React.createElement("p", null, 
            React.createElement("button", {type: "submit"}, "Submit")
          )
        )
      )
    );
  }
});


var Favorites = React.createClass({displayName: "Favorites",
  render: function () {
    return (
      React.createElement(DocumentTitle, {title: "My Favorites | Taro"}, 
        React.createElement("h2", null, "My Favorites")
      )
    );
  }
});


var NotFound = React.createClass({displayName: "NotFound",
  render: function () {
    return (
      React.createElement(DocumentTitle, {title: "Not Found | Taro"}, 
        React.createElement("h2", null, "Oops!"), 
        React.createElement("p", null, "Page could not be found")
      )
    );
  }
});


module.exports = (
  React.createElement(Route, {handler: App, path: "/"}, 
    React.createElement(DefaultRoute, {name: "home", handler: Home}), 
    React.createElement(Route, {name: "apps", handler: Apps}), 
    React.createElement(Route, {name: "add", handler: Add}), 
    React.createElement(Route, {name: "favorites", handler: Favorites}), 
    React.createElement(NotFoundRoute, {handler: NotFound})
  )
);
