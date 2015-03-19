var React = require('react');
var Router = require('react-router');


var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;


var app = React.createClass({displayName: "app",
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


module.exports = app;
