# taro

A local browser using manifests as the data source.

![screenshot of taro](https://cloud.githubusercontent.com/assets/203725/6762891/2d76540e-cf26-11e4-8a4b-bcd49e0ced1e.png "screenshot of taro")


## Overview

TARO ships with several default apps/channels, and the user can add more by supplying a URL to a web page (or a manifest).

Upon submitting a [URL](http://people.mozilla.org/~cwiemeersch/webvr-demos/polarsea/), TARO will follow the URL to the [linked manifest](http://people.mozilla.org/~cwiemeersch/webvr-demos/polarsea/manifest.json) (the W3C standard kind), storing the contents in the user's local TARO database (all on the client). Using several of the standard manifest keys, plus some custom ones, we have all the data we need to render the metadata and stylise the app in the TARO dashboard.

Think Roku (or Firefox OS) but totally accessible as a web page (or embedded as a web page from a desktop executable app, à la the [__browser.html__](https://github.com/mozilla/browser.html) project).

You can [watch a short screencast](https://www.dropbox.com/s/qg3frfmjwp9nbph/screencast_taro_2015_03_20.mp4?dl=0) of where I'm at right now.

You can also play with a live demo of TARO:

    http://taro-vr.herokuapp.com/


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
