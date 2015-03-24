var React = require('react');  // Needed for React calls when JSX gets compiled to JS.
var Router = require('react-router');

var add = require('./views/add');
var app = require('./views/app');
var apps = require('./views/apps');
var browser = require('./views/browser');
var favorites = require('./views/favorites');
var notFound = require('./views/notFound');


var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;


module.exports = (
  <Route handler={app} path="/">
    <DefaultRoute name="apps" handler={apps} />
    <Route name="add" handler={add} />
    <Route name="favorites" handler={favorites} />
    <Route name="browser" path="/browser/:appSlug" handler={browser} />
    <NotFoundRoute handler={notFound} />
  </Route>
);
