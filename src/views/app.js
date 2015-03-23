var React = require('react');
var Router = require('react-router');

var utils = require('../utils');


var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;


utils.refreshApps();


var app = React.createClass({
  render: function () {
    return (
      <div className="app">
        <header>
          <h1 className="wordmark">Taro</h1>
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


module.exports = app;
