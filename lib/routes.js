var React = require('react');  // Needed for React calls when JSX gets compiled to JS.
var Router = require('react-router');

var add = require('./views/add');
var app = require('./views/app');
var apps = require('./views/apps');
var favorites = require('./views/favorites');
var home = require('./views/home');
var notFound = require('./views/notFound');


var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;


module.exports = (
  React.createElement(Route, {handler: app, path: "/"}, 
    React.createElement(DefaultRoute, {name: "home", handler: home}), 
    React.createElement(Route, {name: "apps", handler: apps}), 
    React.createElement(Route, {name: "add", handler: add}), 
    React.createElement(Route, {name: "favorites", handler: favorites}), 
    React.createElement(NotFoundRoute, {handler: notFound})
  )
);
