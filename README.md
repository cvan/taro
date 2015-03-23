# taro

A local browser using manifests as the data source.

![screenshot of taro](https://cloud.githubusercontent.com/assets/203725/6762891/2d76540e-cf26-11e4-8a4b-bcd49e0ced1e.png "screenshot of taro")

## Installation

To install from npm:

    npm install taro

To install the Node dependencies from a cloned copy of the git repository:

    npm install

Generate a local settings file:

    cp settings_local.js{.dist,}


## Development

To run the file watchers, run this from one terminal session:

    npm run watch:js

And run this from another terminal session:

    npm run watch:css

And from yet another terminal session, serve the site from the simple server:

    npm run dev

Then launch the site from your favourite browser:

[__http://localhost:5000/__](http://localhost:5000/)

If you wish to serve the site from a different port:

    TARO_PORT=8000 npm run dev

### Architecture

* JS is edited in `src/`.
* `jsx` compiles those files and puts them in `lib/`. These built files are used by the server.
* Files in `lib/` are built for the client using `browserify` and put in `static/`.

`static/` and `lib/` are not checked in. So be sure to run `npm run build` before running the server. (`npm start` takes care of this in production, and `npm run dev`/`npm run watch:js` take care of this in development.)


## Deployment

In production, the server is run like so:

    npm start

Alternatively:

    npm run prod

To run the server à la Heroku:

    foreman start web


## Licence

[MIT Licence](LICENCE)


## Contributing

[Contributions are very welcome!](CONTRIBUTING.md)
