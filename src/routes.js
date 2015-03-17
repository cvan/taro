var DocumentTitle = require('react-document-title');
var React = require('react');
var Router = require('react-router');


var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
  render: function () {
    return (
      <div className="app">
        <header>
          <h1>Taro</h1>
          <Link to="home">Home</Link>
          <Link to="apps">Apps</Link>
          <Link to="add">Add an App</Link>
          <Link to="favorites">My Favorites</Link>
        </header>
        <section className="content">
          <RouteHandler />
        </section>
      </div>
    );
  }
});

var Home = React.createClass({
  render: function () {
    return (
      <DocumentTitle title="Home | Taro">
        <h2>Welcome home</h2>
      </DocumentTitle>
    );
  }
});

var Apps = React.createClass({
  render: function () {
    return (
      <DocumentTitle title="Apps | Taro">
        <h2>Apps</h2>
      </DocumentTitle>
    );
  }
});

var Add = React.createClass({
  render: function () {
    return (
      <DocumentTitle title="Add an App | Taro">
        <h2>Add an App</h2>
      </DocumentTitle>
    );
  }
});

var Favorites = React.createClass({
  render: function () {
    return (
      <DocumentTitle title="My Favorites | Taro">
        <h2>My Favorites</h2>
      </DocumentTitle>
    );
  }
});

var NotFound = React.createClass({
  render: function () {
    return (
      <DocumentTitle title="Not Found | Taro">
        <h2>Oops!</h2>
        <p>Page could not be found</p>
      </DocumentTitle>
    );
  }
});


module.exports = (
  <Route handler={App} path="/">
    <DefaultRoute name="home" handler={Home} />
    <Route name="apps" handler={Apps} />
    <Route name="add" handler={Add} />
    <Route name="favorites" handler={Favorites} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);
