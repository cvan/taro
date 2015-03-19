var DocumentTitle = require('react-document-title');
var React = require('react');


var apps = React.createClass({
  render: function () {
    return (
      <div>
        <DocumentTitle title="Apps | Taro" />
        <h2>Apps</h2>
      </div>
    );
  }
});


module.exports = apps;
