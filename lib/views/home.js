var DocumentTitle = require('react-document-title');
var React = require('react');


var home = React.createClass({displayName: "home",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(DocumentTitle, {title: "Home | Taro"}), 
        React.createElement("h2", null, "Welcome home")
      )
    );
  }
});


module.exports = home;
