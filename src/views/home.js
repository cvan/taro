var DocumentTitle = require('react-document-title');
var React = require('react');


var home = React.createClass({
  render: function () {
    return (
      <DocumentTitle title="Home | Taro">
        <h2>Welcome home</h2>
      </DocumentTitle>
    );
  }
});


module.exports = home;
