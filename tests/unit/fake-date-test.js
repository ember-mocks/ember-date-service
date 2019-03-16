import { module, test } from 'qunit';
import { FakeDateService } from 'ember-date-service/test-support';

module('Unit | Service | date', function(hooks) {
  hooks.beforeEach(function() {
    this.fakeService = FakeDateService.create();
  });

  test('it returns a date from the now method', function(assert) {
    assert.ok(this.fakeService.now());
  });

  test('it can set date to specific date', function(assert) {
    let now = Date.now();
    this.fakeService.setNow(now);

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
