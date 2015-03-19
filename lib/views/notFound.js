var DocumentTitle = require('react-document-title');
var React = require('react');


var notFound = React.createClass({displayName: "notFound",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(DocumentTitle, {title: "Not Found | Taro"}), 
        React.createElement("h2", null, "Oops!"), 
        React.createElement("p", null, "Page could not be found")
      )
    );
  }
});


module.exports = notFound;
