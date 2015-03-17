var DocumentTitle = require('react-document-title');
var React = require('react');
var Router = require('react-router');


var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


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
  render: function () {
    return (
      React.createElement(DocumentTitle, {title: "Add an App | Taro"}, 
        React.createElement("h2", null, "Add an App")
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
