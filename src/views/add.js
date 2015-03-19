var DocumentTitle = require('react-document-title');
var React = require('react');

var utils = require('../utils');


var add = React.createClass({
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
      <div>
        <DocumentTitle title="Add an App | Taro" />
        <h2>Add an App</h2>
        <form onSubmit={this.onSubmit}>
          <p>
            <label>
              URL
              <input type="url" placeholder="http://" required ref="url" className="field field--large" />
            </label>
          </p>
          <p>
            <button type="submit">Submit</button>
          </p>
        </form>
      </div>
    );
  }
});


module.exports = add;
