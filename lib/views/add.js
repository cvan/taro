var DocumentTitle = require('react-document-title');
var React = require('react');

var utils = require('../utils');


var add = React.createClass({displayName: "add",
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
      React.createElement("div", null, 
        React.createElement(DocumentTitle, {title: "Add an App | Taro"}), 
        React.createElement("h2", null, "Add an App"), 
        React.createElement("form", {onSubmit: this.onSubmit}, 
          React.createElement("p", null, 
            React.createElement("label", null, 
              "URL", 
              React.createElement("input", {type: "url", placeholder: "http://", required: true, ref: "url", className: "field field--large"})
            )
          ), 
          React.createElement("p", null, 
            React.createElement("button", {type: "submit"}, "Submit")
          )
        )
      )
    );
  }
});


module.exports = add;
