# taro

A local browser using manifests as the data source.


## Installation

To install from npm:

    npm install taro

To install the Node dependencies from a cloned copy of the git repository:

    npm install

Generate a local settings file:

    cp settings_local.js{.dist,}


## Development

From one terminal session, run the file watchers:

	npm run watch

Serve the site from the simple server:

    npm run dev

Then launch the site from your favourite browser:

[__http://localhost:5000/__](http://localhost:5000/)

If you wish to serve the site from a different port:

    TARO_PORT=8000 npm run dev

### Architecture

* JS is edited in `src/`.
* `jsx` compiles those files and puts them in `lib/`. These built files are used by the server.
* Files in `lib/` are built for the client using `browserify` and put in `static/`.

`static/` and `lib/` are checked in for ease of deployment.


## Deployment

In production, the server is run like so:

    NODE_ENVIRONMENT=production node index

Alternatively:

    npm run prod

To run the server à la Heroku:

    foreman start web


## Licence

[MIT Licence](LICENCE)


## Contributing

[Contributions are very welcome!](CONTRIBUTING.md)
