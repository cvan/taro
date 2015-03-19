var DocumentTitle = require('react-document-title');
var React = require('react');


var favorites = React.createClass({displayName: "favorites",
  render: function () {
    return (
      React.createElement(DocumentTitle, {title: "My Favorites | Taro"}, 
        React.createElement("h2", null, "My Favorites")
      )
    );
  }
});


module.exports = favorites;
