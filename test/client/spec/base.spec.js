/**
 * Base client test initialization / global before/after's.
 *
 * This file has should be included in any test run, filtered or not.
 *
 * **Sinon.JS**: We initialize a `window.sandbox` object here (with
 * fake timers and servers) which should be used instead of `sinon` directly.
 * The best practice is to _not_ import `sinon` directly except to initialize
 * new sandboxes where the default sandbox doesn't work.
 */
/*globals window:false*/
beforeEach(() => {
  window.sandbox = window.sinon.sandbox.create({
    useFakeTimers: true,
    useFakeServer: true
  });
});

afterEach(() => {
  window.sandbox.restore();
});
