var DocumentTitle = require('react-document-title');
var React = require('react');
var Router = require('react-router');

var utils = require('../utils');


var Link = Router.Link;


var AppTile = React.createClass({
  render: function () {
    var tag = this.props.tag || 'div';
    var manifest = this.props.data.manifest;

    if (!manifest) {
      return React.createElement(tag, {className: 'app-tile'}, '');
    }

    var styles = {};

    if (manifest['theme-color']) {
      styles.link = {
        backgroundColor: manifest['theme-color']
      };
    }

    if (manifest['webvr_instructions_images'] &&
        Array.isArray(manifest['webvr_instructions_images']) &&
        manifest['webvr_instructions_images'][0]) {

      styles.instructions = {
        backgroundImage: 'url(' + manifest.webvr_instructions_images[0].src + ')'
      };
    }

    var routeParams = {
      appSlug: this.props.data.slug || '<none>'
    };

    var innerHTML = (
      <Link to="browser" params={routeParams} className="app-tile__link"
         title={manifest.name} onClick={this.onClick}
         style={styles.link}
         data-theme-color={manifest['theme-color']}
         data-app-name={routeParams.appSlug}
         data-start-url={manifest.start_url}>

        <div className="app-tile__name">{manifest.name}</div>
        <img className="app-tile__icon"
             src={manifest.icons[manifest.icons.length - 1].src}
             alt={manifest.name} title={manifest.name} />

        <div className="app-tile__details">
          <div className="app-tile__instructions" style={styles.instructions}>
            <div className="wrap">
              <h3 className="app-tile__heading">{manifest.name}</h3>
              <div className="app-tile__tagline">{manifest.tagline}</div>
              <div className="app-tile__description">{manifest.description}</div>
            </div>
          </div>
        </div>
      </Link>
    );

    return React.createElement(tag, {className: 'app-tile'}, innerHTML);
  }
});


var apps = React.createClass({
  getInitialState: function () {
    return {
      apps: []
    };
  },
  componentDidMount: function () {
    if (global.localStorage) {
      var apps = utils.storageGet('apps') || [];
      this.setState({
        apps: apps
      });
    }
  },
  render: function () {
    return (
      <div>
        <DocumentTitle title="Apps | Taro" />
        <h2>Apps</h2>
        <div className="scrollable--h app-list-outer">
          <ol className="app-list">
            {this.state.apps.map(function (data, idx) {
              return <AppTile data={data} key={idx} tag="li" />;
            })}
          </ol>
        </div>
      </div>
    );
  }
});


module.exports = apps;
