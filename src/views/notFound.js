var DocumentTitle = require('react-document-title');
var React = require('react');


var notFound = React.createClass({
  render: function () {
    return (
      <DocumentTitle title="Not Found | Taro">
        <h2>Oops!</h2>
        <p>Page could not be found</p>
      </DocumentTitle>
    );
  }
});


module.exports = notFound;
