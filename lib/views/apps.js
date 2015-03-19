var DocumentTitle = require('react-document-title');
var React = require('react');


var apps = React.createClass({displayName: "apps",
  render: function () {
    return (
      React.createElement(DocumentTitle, {title: "Apps | Taro"}, 
        React.createElement("h2", null, "Apps")
      )
    );
  }
});


module.exports = apps;
