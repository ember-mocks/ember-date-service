import { module, test } from 'qunit';
import { FakeDateService } from 'ember-date-service/test-support';

module('Unit | Service | fake date', function(hooks) {
  hooks.beforeEach(function() {
    this.fakeService = FakeDateService.create();
  });

  test('it has the static Date APIs', function(assert) {
    assert.equal(typeof this.fakeService.now, 'function');
    assert.equal(typeof this.fakeService.UTC, 'function');
    assert.equal(typeof this.fakeService.parse, 'function');
  });

  test('it returns a date from the now method', function(assert) {
    assert.ok(this.fakeService.now());
  });

  test('it can set date to specific date', function(assert) {
    let now = Date.now();
    this.fakeService.setNow(now);

    assert.equal(this.fakeService.now(), now);
  });

  test('it can set date to specific date via Date object', function(assert) {
    let date = new Date();
    let now = this.fakeService.setNow(date);

    assert.equal(typeof this.fakeService.now(), 'number');
    assert.equal(this.fakeService.now(), now);
  });

  test('it can reset date that was previously set', function(assert) {
    let done = assert.async();
    let now = Date.now();

    this.fakeService.setNow(now);

    assert.equal(this.fakeService.now(), now);

    this.fakeService.reset();

    setTimeout(() => {
      assert.notEqual(this.fakeService.now(), now);
      done();
    }, 50);
  });
});
