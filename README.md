Converter - React
=================

[![Build Status][trav_img]][trav_site]

A simple app written using [React][react] and [CommonJS][cjs], built with
[Webpack][webpack]. Based on
[full-stack-testing.formidablelabs.com/app/](http://full-stack-testing.formidablelabs.com/app/)
from our "[Full. Stack. Testing](http://full-stack-testing.formidablelabs.com/)""
training project.

## Overview

The converter app has a simple Express-based REST backend that serves string
conversions. The frontend app is a React app, crafted with the following:

* [ES6](https://kangax.github.io/compat-table/es6/) via
  [Babel](https://babeljs.io/) for client code.
* Components from [react-bootstrap](http://react-bootstrap.github.io/)
* Server-side rendering and SPA bootstrap.

## Notes

### Size

To test out how optimized the build is, here are some useful curl commands:

```
# Run production build
$ gulp prod

# Minified size
$ curl -so /dev/null -w '%{size_download}\n' \
  http://127.0.0.1:3000/js/$(node -e "console.log(require('./dist/server/stats.json').assetsByChunkName.main[0]);")
148660

# Minified gzipped size
$ curl -so /dev/null -w '%{size_download}\n' --compressed \
  http://127.0.0.1:3000/js/$(node -e "console.log(require('./dist/server/stats.json').assetsByChunkName.main[0]);")
41591
```

## Development

This section is for the convention (REST) server, with a real backend.

### Dev Mode

Install, setup.

```
$ npm install
```

Run the watchers, dev and source maps servers for the real production build:

```
$ npm run prod
```

Run the watchers and the Webpack dev server w/ React hot loader:

```
$ npm run dev
```

URLS to test things out:

* [`127.0.0.1:3000/`](http://127.0.0.1:3000/): Server-side bootstrap, then JS.
* [`127.0.0.1:3000/?__mode=noss`](http://127.0.0.1:3000/?__mode=noss): Pure JS.
* [`127.0.0.1:3000/?__mode=nojs`](http://127.0.0.1:3000/?__mode=nojs): Pure
  server-side. Note that while some links may work (e.g. clicking on a note
  title in list), many things do not since there are absolutely no JS libraries.
  This is intended to just be a small demo of SEO / "crawlable" content.

### Production

Install, setup.

```
$ npm install --production
$ npm run build
```

Run the server.

```
$ NODE_ENV=production node server/index.js
```

[trav]: https://travis-ci.org/
[trav_img]: https://api.travis-ci.org/FormidableLabs/converter-react.svg
[trav_site]: https://travis-ci.org/FormidableLabs/converter-react
[react]: http://facebook.github.io/react/
[cjs]: http://wiki.commonjs.org/wiki/CommonJS
[webpack]: http://webpack.github.io/
