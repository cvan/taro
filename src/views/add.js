var DocumentTitle = require('react-document-title');
var React = require('react');

var app = require('./app');
var utils = require('../utils');


var add = React.createClass({
  onSubmit: function (e) {
    e.preventDefault();

    var urlField = this.refs.url.getDOMNode();
    var url = urlField.value;

    utils.getJSON('https://fetch-manifest.herokuapp.com/manifest?url=' + url, function (err, data) {
      if (err) {
        data = null;
        console.warn(err.message);
      }

      if (data) {
        if (data.error) {
          data = null;
          console.warn('Manifest error (for %s): %s', url, data.error);
        } else {
          utils.storagePush('apps', {
            source_url: url,
            manifest: data
          });
        }
      }

      if (data) {
        var appName = data.manifest && data.manifest.name ? data.manifest.name : url;
        var msg = 'Submitted ' + appName;

        urlField.value = '';
        urlField.blur();

        console.log(msg);
        // alert(msg);
      }
    }.bind(this));
  },
  render: function () {
    return (
      <div>
        <DocumentTitle title="Add an App | Taro" />
        <h2>Add an App</h2>
        <form method="post" onSubmit={this.onSubmit}>
          <p>
            <label>
              URL
              <input type="url" name="url" ref="url" placeholder="http://" autoFocus className="field field--large" />
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
