var DocumentTitle = require('react-document-title');
var React = require('react');
var Router = require('react-router');

var utils = require('../utils');


var browser = React.createClass({
  mixins: [Router.State],
  getInitialState: function () {
    return {
      app: {}
    };
  },
  componentDidMount: function () {
    if (global.localStorage) {
      var appSlug = this.context.getCurrentParams().appSlug;

      var apps = utils.storageGet('apps') || [];
      var app = {};

      apps.filter(function (appObj) {
        if (appObj.slug === appSlug) {
          app = appObj;
        }
      });

      this.setState({
        app: app
      });
    }
  },
  render: function () {
    var manifest = this.state.app.manifest || {};

    var title = 'Taro';
    var startUrl = '#';

    if (manifest) {
      var name = manifest.name || manifest.short_name;
      if (name) {
        title = name + ' | Taro';
      }
      startUrl = manifest.start_url;
    }

    return (
      <div>
        <DocumentTitle title={title} />
        <iframe className="app-tile__browser" src={startUrl}></iframe>
      </div>
    );
  }
});


module.exports = browser;
