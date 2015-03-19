var DocumentTitle = require('react-document-title');
var React = require('react');


var utils = require('../utils');


var AppTile = React.createClass({
  render: function () {
    var tag = this.props.tag || 'div';

    if (!this.props.data.manifest) {
      return React.createElement(tag, {className: 'app-tile'}, '');
    }

    var linkStyle = {
      backgroundColor: this.props.data.manifest['theme-color'] || '#ccc'
    };
    var name = this.props.data.manifest.name;

    var innerHTML = (
      <a className="app-title__link" href={this.props.data.manifest.start_url}
         target="_blank" style={linkStyle}>
        <h3 className="app-title__name">{name}</h3>
        <img className="app-title__icon"
             src={this.props.data.manifest.icons[this.props.data.manifest.icons.length - 1].src}
             alt={name} title={name} />
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
