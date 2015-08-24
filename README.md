Converter - React
=================

[![Build Status][trav_img]][trav_site]
[![Appveyor Status][av_img]][av_site]
[![Coverage Status][cov_img]][cov_site]

A simple app written using [React][react] and [CommonJS][cjs], built with
[Webpack][webpack]. Based on
[full-stack-testing.formidablelabs.com/app/](http://full-stack-testing.formidablelabs.com/app/)
from our "[Full. Stack. Testing](http://full-stack-testing.formidablelabs.com/)"
training project.

## Overview

The converter app has a simple Express-based REST backend that serves string
conversions. The frontend app is a React app, crafted with the following:

* [ES6](https://kangax.github.io/compat-table/es6/) via
  [Babel](https://babeljs.io/) for client code.
* Components from [react-bootstrap](http://react-bootstrap.github.io/)
* [Alt](http://alt.js.org/) for Flux implementation.
* [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) for
  AJAX requests.
* Server-side rendering and SPA bootstrap.

See the app hard at work!

* [`127.0.0.1:3000/`](http://127.0.0.1:3000/): Server-side bootstrap, then client-side.
* [`127.0.0.1:3000/?__mode=noss`](http://127.0.0.1:3000/?__mode=noss): Pure client-side.
* [`127.0.0.1:3000/?__mode=nojs`](http://127.0.0.1:3000/?__mode=nojs): Pure server-side.

## Notes

### Size

To test out how optimized the build is, here are some useful curl commands:

```sh
# Run production build
$ npm run build

# Minified size
$ wc -c dist/js/*.js
  286748 dist/js/bundle.d3749f460563cd1b0884.js

# Minified gzipped size
$ gzip -c dist/js/*.js | wc -c
   77748
```

## Development

For a deeper dive, see: [DEVELOPMENT](DEVELOPMENT.md)

### Dev Mode

Install, setup.

```sh
$ npm install           # Install dependencies
$ npm run install-dev   # Install dev. environment (selenium, etc.).
```

Run the watchers, dev and source maps servers for the real production build:

```sh
$ npm run prod
```

Run the watchers and the Webpack dev server:

```sh
$ npm run dev
```

Run the watchers and the Webpack dev server w/ React hot loader:

```sh
$ npm run hot
```

Ports various servers run on:

* [`2992`](http://127.0.0.1:2992/): Webpack dev server for dev. server.
* [`3000`](http://127.0.0.1:3000/): Development application server.
* [`3001`](http://127.0.0.1:3001/): Sourcemaps static server / test (in-browser) server.
* [`3010`](http://127.0.0.1:3010/): Webpack dev server for ephemeral client
  Karma tests run one-off with full build.
* [`3020`](http://127.0.0.1:3020/): Ephemeral app server for REST server tests.
  Override via `TEST_REST_PORT` environment variable.
* [`3030`](http://127.0.0.1:3030/): Ephemeral app server for functional tests.
  Override via `TEST_FUNC_PORT` environment variable.
* [`3031`](http://127.0.0.1:3031/): Webpack dev server for ephemeral functional
  tests run one-off with full build.
  Override via `TEST_FUNC_WDS_PORT` environment variable.

URLS to test things out:

* [`127.0.0.1:3000/`](http://127.0.0.1:3000/): Server-side bootstrap, then JS.
* [`127.0.0.1:3000/?__mode=noss`](http://127.0.0.1:3000/?__mode=noss): Pure JS.
* [`127.0.0.1:3000/?__mode=nojs`](http://127.0.0.1:3000/?__mode=nojs): Pure
  server-side. Note that while some links may work (e.g. clicking on a note
  title in list), many things do not since there are absolutely no JS libraries.
  This is intended to just be a small demo of SEO / "crawlable" content.

### Bootstrapped Data

As a development helper, we allow a querystring injection of data to bootstrap
the application off of. Normally, you wouldn't allow users to add this, and
instead would choose how to best bootstrap your app.

* [`127.0.0.1:3000/?__bootstrap=camel:hello%20there`](http://127.0.0.1:3000/?__bootstrap=camel:hello%20there):
  Server-side data bootstrapped into the application + render.
* [`127.0.0.1:3000/?__mode=noss&__bootstrap=camel:hello%20there`](http://127.0.0.1:3000/?__mode=noss&__bootstrap=camel:hello%20there):
  Pure client-render, but bootstrap the store off `types` and `values` and
  initiate async `fetch` to backend for data automatically.
* [`127.0.0.1:3000/?__mode=nojs&__bootstrap=camel:hello%20there`](http://127.0.0.1:3000/?__mode=nojs&__bootstrap=camel:hello%20there):
  Pure server-side render with no JS. Should fully render the inputs and
  converted values in static HTML.

## Production

Install, setup.

```sh
$ npm install --production
$ npm run build
```

Run the server.

```sh
$ NODE_ENV=production node server/index.js
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav]: https://travis-ci.org/
[trav_img]: https://api.travis-ci.org/FormidableLabs/converter-react.svg
[trav_site]: https://travis-ci.org/FormidableLabs/converter-react
[av]: https://ci.appveyor.com/
[av_img]: https://ci.appveyor.com/api/projects/status/31hevq3yixwib0xg?svg=true
[av_site]: https://ci.appveyor.com/project/ryan-roemer/converter-react
[cov]: https://coveralls.io
[cov_img]: https://img.shields.io/coveralls/FormidableLabs/converter-react.svg
[cov_site]: https://coveralls.io/r/FormidableLabs/converter-react

[react]: http://facebook.github.io/react/
[cjs]: http://wiki.commonjs.org/wiki/CommonJS
[webpack]: http://webpack.github.io/
