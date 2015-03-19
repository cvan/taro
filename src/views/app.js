var React = require('react');
var Router = require('react-router');


var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;


var app = React.createClass({
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


module.exports = app;
