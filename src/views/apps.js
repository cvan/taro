var DocumentTitle = require('react-document-title');
var React = require('react');


var utils = require('../utils');


var AppTile = React.createClass({
  render: function () {
    var tag = this.props.tag || 'div';
    var manifest = this.props.data.manifest;

    if (!manifest) {
      return React.createElement(tag, {className: 'app-tile'}, '');
    }

    var linkStyle = {};
    if (manifest['theme-color']) {
      linkStyle = {
        backgroundColor: manifest['theme-color']
      };
    }

    var innerHTML = (
      <a className="app-tile__link" href={manifest.start_url}
         target="_blank" title={manifest.name}
         style={linkStyle} data-theme-color={manifest['theme-color']}>

        <div className="app-tile__name">{manifest.name}</div>
        <img className="app-tile__icon"
             src={manifest.icons[manifest.icons.length - 1].src}
             alt={manifest.name} title={manifest.name} />
        <div className="app-tile__description">{manifest.description}</div>
      </a>
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
      this.setState({
        apps: utils.storageGet('apps') || []
      });
    }
  },
  render: function () {
    return (
      <div>
        <DocumentTitle title="Apps | Taro" />
        <h2>Apps</h2>
        <ol className="app-list">
          {this.state.apps.map(function (data, idx) {
            return <AppTile data={data} key={idx} tag="li" />;
          })}
        </ol>
      </div>
    );
  }
});


module.exports = apps;
