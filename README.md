# ember-date-service

![CI Build](https://github.com/scalvert/ember-date-service/workflows/CI%20Build/badge.svg)
[![Ember Observer Score](https://emberobserver.com/badges/ember-date-service.svg)](https://emberobserver.com/addons/ember-date-service)
[![npm version](https://badge.fury.io/js/ember-date-service.svg)](https://badge.fury.io/js/ember-date-service)
[![Monthly Downloads from NPM](https://img.shields.io/npm/dm/ember-date-service.svg?style=flat-square)](https://www.npmjs.com/package/ember-date-service)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](#badge)

A bare-bones addon that provides a `Date` service with a minimal API.

Often in Ember applications we need to utilize `Date.now()` to retrieve the current time. The functionality is provided by the `Date` object,
but becomes difficult to test when we want to provide static values for `now`.

One solution people often use is to override the `Date` object, or use an API like `sinon.useFakeTimers` to achieve predictable values of `now`. The former can cause issues with BackBurner's runloop, resulting in code stalling and not executing in tests. The latter, while functional, is heavyweight; we may not want all its functionality.

This addon provides a minimal API to achieve the required functionality.

## Compatibility

- Ember.js v2.18 or above
- Ember CLI v2.13 or above

## Installation

```
ember install ember-date-service
```

## Usage

### Application code

You can use the `DateService` by injecting it into your class:

```js
// components/show-date.js
import { inject as service } from "@ember/service";

export default Component.extend({
  date: service(),

  init() {
    this._super(...arguments);

    this.set("currentDate", this.get("date").now());
  }
});
```

### Test code

In test code, `ember-date-service` provides a QUnit hooks setup function to replace the application's `DateService` with a `FakeDateService`. To use it, import and use the `setupFakeDateService` function in your test module, and invoke it immediately following the built-in QUnit `setup*Test` calls.

```js
// tests/integration/show-date-test.js
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupFakeDateService } from "ember-date-service/test-support";

module("Integration | Component | show-date", function(hooks) {
  setupRenderingTest(hooks);
  setupFakeDateService(hooks);

  test("it renders", async function(assert) {
    // ...
  });
});
```

For mocha, you can similarly invoke the `setupFakeDateService` function by omitting the `hooks` parameter.

```js
// tests/integration/show-date-test.js
import { expect } from "chai";
import { describe, it } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupFakeDateService } from "ember-date-service/test-support";

describe("Integration | Component | show-date", function() {
  setupRenderingTest();
  setupFakeDateService();

  it("renders", async function() {
    // ...
  });
});
```

To set a static value for `now`, use the `setNow` function. This function will ensure any subsequent calls to `this.get('date').now()` will return the same value.

```js
// tests/integration/show-date-test.js
module("Integration | Component | show-date", function(hooks) {
  setupRenderingTest(hooks);
  setupFakeDateService(hooks);

  test("it generates the current date", async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#show-date as |date|}}
        {{date}}
      {{/show-date}}
    `);

    assert.ok(this.element.textContent.trim().match(/\d/));
  });

  test("it generates a specific date", async function(assert) {
    assert.expect(1);

    let dateService = this.owner.lookup("service:date");
    let now = Date.now();

    dateService.setNow(now);

    await render(hbs`
      {{#show-date as |date|}}
        {{date}}
      {{/show-date}}
    `);

    assert.equal(this.element.textContent.trim(), now);
  });
});
```

To reset `now` to restore its behavior to the default `Date.now()` behavior, use the `reset` function.

```js
// tests/integration/show-date-test.js
module("Integration | Component | show-date", function(hooks) {
  setupRenderingTest(hooks);
  setupFakeDateService(hooks);

  test("it generates the current date", async function(assert) {
    assert.expect(1);

    let dateService = this.owner.lookup("service:date");
    let now = Date.now();

    dateService.setNow(now);

    await render(hbs`
      {{#show-date as |date|}}
        {{date}}
      {{/show-date}}
    `);

    assert.equal(this.element.textContent.trim(), now);

    dateService.reset();

    assert.notEqual(this.element.textContent.trim(), now);
  });
});
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
