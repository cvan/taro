var DocumentTitle = require('react-document-title');
var React = require('react');
var Router = require('react-router');


var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var utils = require('./utils');


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
      <div>
        <DocumentTitle title="Add an App | Taro" />
        <h2>Add an App</h2>
        <form onSubmit={this.onSubmit}>
          <p>
            <label>
              URL
              <input type="url" placeholder="http://" required ref="url" className="field field--large" />
            </label>
          </p>
          <p>
            <button type="submit">Submit</button>
          </p>
        </form>
      </div>
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
