var fs = require('fs');
var http = require('http');
var path = require('path');

var DocumentTitle = require('react-document-title');
var Hapi = require('hapi');
var React = require('react');
var Router = require('react-router');

var routes = require('./lib/routes');


var server = new Hapi.Server();


server.connection({
  host: process.env.TARO_HOST || process.env.HOST || '0.0.0.0',
  port: process.env.TARO_PORT || process.env.PORT || 5000,
  routes: {
    cors: 'CORS' in process.env ? !!process.env.CORS : true,
    validate: {
      options: {
        abortEarly: false
      }
    }
  }
});


server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: './static',
      listing: false,
      index: true
    }
  }
});


var hapiReactRouter = {
  register: function (server, options, next) {

    server.ext('onPreResponse', function (request, reply) {
      if (request.response.source) {
        // Bail if this response was served from the `static/` directory.
        return reply.continue();
      }

      // Pass in `request.path` and the router will immediately match.
      Router.run(routes, request.path, function (Handler, state) {
        var content = React.renderToString(React.createElement(Handler, null));

        var body = template.replace('{{{content}}}', content)
                           .replace('{{{title}}}', DocumentTitle.rewind());

        reply(body);
      });
    });

    next();
  }
};


hapiReactRouter.register.attributes = {
  name: 'hapi-react-router',
  version: '0.0.1'
};


server.register({
  register: hapiReactRouter
}, function (err) {
  if (err) {
    console.error('Failed to load "hapiReactRouter" plugin: %s', err);
    throw err;
  }
});


var template = '';

fs.readFile('templates/index.html', function (err, templateData) {
  if (err) {
    return console.error(err);
  }

  template = templateData.toString();

  server.start(function () {
    console.log('Server is listening: %s', server.info.uri);
  });
});
