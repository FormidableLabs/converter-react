Converter - React
=================



## Development

This section is for the convention (REST) server, with a real backend.

### Dev Mode

Install, setup.

```
$ npm install
```

Run the watchers, dev and source maps servers for the real production build:

```
$ npm run dev
```

Run the watchers and the Webpack dev server w/ React hot loader:

```
$ npm run dev-hot
```


URLS to test things out:

* `http://127.0.0.1:3000/`: Server-side bootstrap, JS takes over.
* `http://127.0.0.1:3000/?__mode=noss`: Pure JS.
* `http://127.0.0.1:3000/?__mode=nojs`: Pure server-side. Note that while
  some links may work (e.g. clicking on a note title in list), many things
  do not since there are absolutely no JS libraries. This is intended to just
  be a small demo of SEO / "crawlable" content.

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
