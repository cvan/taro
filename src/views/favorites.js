var DocumentTitle = require('react-document-title');
var React = require('react');


var favorites = React.createClass({
  render: function () {
    return (
      <div>
        <DocumentTitle title="My Favorites | Taro" />
        <h2>My Favorites</h2>
      </div>
    );
  }
});


module.exports = favorites;
