Development
===========

## Development

All development tasks consist of watching the demo bundle and the test bundle.

Run the application with watched rebuilds:

```sh
$ npm run dev       # dev test/app server (OR)
$ npm run hot       # hot reload test/app server (OR)
$ npm run prod      # run the "REAL THING" with watchers
```

From there you can see:

* Demo app: [127.0.0.1:3000](http://127.0.0.1:3000/)
* Client tests: [127.0.0.1:3001/test/client/test.html](http://127.0.0.1:3001/test/client/test.html)


## General Checks

### In Development

During development, you are expected to be running either:

```sh
$ npm run dev
```

to build the lib and test files. With these running, you can run the faster

```sh
$ npm run check-dev
```

Command. It is comprised of:

```sh
$ npm run lint
$ npm run test-dev
```

Note that the tests here are not instrumented for code coverage and are thus
more development / debugging friendly.

### Continuous Integration

CI doesn't have source / test file watchers, so has to _build_ the test files
via the commands:

```sh
$ npm run check     # PhantomJS only
$ npm run check-cov # (OR) PhantomJS w/ coverage
$ npm run check-ci  # (OR) PhantomJS,Firefox + coverage - available on Travis.
```

Which is currently comprised of:

```sh
$ npm run lint      # AND ...

$ npm run test      # PhantomJS only
$ npm run test-cov  # (OR) PhantomJS w/ coverage
$ npm run test-ci   # (OR) PhantomJS,Firefox + coverage
```

Note that `(test|check)-(cov|ci)` run code coverage and thus the
test code may be harder to debug because it is instrumented.

### Client Tests

The client tests rely on webpack dev server to create and serve the bundle
of the app/test code at: http://127.0.0.1:3001/assets/main.js which is done
with the task `npm run server-test` (part of `npm dev`).

#### Code Coverage

Code coverage reports are outputted to:

```
coverage/
  client/
    BROWSER_STRING/
      lcov-report/index.html  # Viewable web report.
```

## Tests

The test suites in this project can be found in the following locations:

```
test/server
test/client
test/func
```

### Backend Tests

`test/server`

Server-side (aka "backend") tests have two real flavors -- *unit* and *REST*
tests. To run all the server-side tests, try:

```sh
$ npm run test-server
```

#### Server-side Unit Tests

`test/server/spec`

Pure JavaScript tests that import the server code and test it in isolation.

* Extremely fast to execute.
* Typically test pure code logic in isolation.
* Contains a Sinon [sandbox][] **with** fake timers.

Run the tests with:

```sh
$ npm run test-server-unit
```

#### Server-side REST Tests

`test/server/rest`

REST tests rely on spinning up the backend web application and using an HTTP
client to make real network requests to the server and validate responses.

* Must set up / tear down the application web server.
* Issue real REST requests against server and verify responses.
* Fairly fast to execute (localhost network requests).
* Cover more of an "end-to-end" perspective on validation.

Programming notes:

* Contains a Sinon [sandbox][] _without_ fake timers.
* Test against a remote server with environment variables:
    * `TEST_REST_IS_REMOTE=true` (tests should only stub/spy if not remote)
    * `TEST_REST_BASE_URL=http://example.com/`

Run the tests with:

```sh
$ npm run test-server-rest
```

### Frontend Tests

`test/client/spec`

Client-side (aka "frontend") unit tests focus on one or more client application
files in isolation. Some aspects of these tests:

* Extremely fast to execute.
* Execute via a test HTML driver page, not the web application HTML.
* Must create mock DOM and data fixtures.
* Mock out real browser network requests / time.
* Typically test some aspect of the UI from the user perspective.
* Run tests in the browser or from command line.
* May need to be bundled like your application code.

Programming notes:

* Contains a Sinon [sandbox][] **with** fake timers and servers.

Build, then run the tests from the command line with:

```sh
$ npm run-script test-client
```

### Functional Tests

`test/func`

Functional (aka "integration", "end-to-end") tests rely on a full, working
instance of the entire web application. These tests typically:

* Are slower than the other test types.
* Take a "black box" approach to the application and interact only via the
  actual web UI.
* Test user behaviors in an end-to-end manner.

Programming notes:

* Contains a Sinon [sandbox][] _without_ fake timers.
* Test against a remote server with environment variables:
    * `TEST_FUNC_IS_REMOTE=true` (tests should only stub/spy if not remote)
    * `TEST_FUNC_BASE_URL=http://example.com/`

Run the tests with:

```sh
$ npm run-script test-func
```


## Releases

**IMPORTANT - NPM**: To correctly run `preversion` your first step is to make
sure that you have a very modern `npm` binary:

```sh
$ npm install -g npm
```

The basic workflow is:

```sh
# Make sure you have a clean, up-to-date `master`
$ git pull
$ git status # (should be no changes)

# Choose a semantic update for the new version.
# If you're unsure, read about semantic versioning at http://semver.org/
$ npm version major|minor|patch -m "Version %s - INSERT_REASONS"

# `package.json` is updated, and files are committed to git (but unpushed).

# Check that everything looks good in last commit and push.
$ git diff HEAD^ HEAD
$ git push && git push --tags
# ... the project is now pushed to GitHub.

# And finally publish to `npm`!
$ npm publish
```

And you've published!

[sandbox]: http://sinonjs.org/docs/#sinon-sandbox
