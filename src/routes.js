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
  <Route handler={app} path="/">
    <DefaultRoute name="home" handler={home} />
    <Route name="apps" handler={apps} />
    <Route name="add" handler={add} />
    <Route name="favorites" handler={favorites} />
    <NotFoundRoute handler={notFound} />
  </Route>
);
