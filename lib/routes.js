var DocumentTitle = require('react-document-title');
var React = require('react');
var Router = require('react-router');


var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var utils = require('./utils');


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

    utils.getJSON('https://fetch-manifest.herokuapp.com/manifest?url=' + url, function (err, data) {
      if (err) {
        data = null;
        console.warn(err.message);
      }

      if (data.error) {
        data = null;
        console.warn('Manifest error (for %s): %s', url, data.error);
      }

      // TODO: Make sure there are no dupes.
      utils.storagePush('apps', {
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
