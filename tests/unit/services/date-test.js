import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | date', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.service = this.owner.lookup('service:date');
  });

  test('it returns a date from the now method', function(assert) {
    assert.expect(1);

    assert.ok(this.service.now());
  });

  test('it returns a date from the UTC method', function(assert) {
    assert.expect(2);

    let date = this.service.UTC(71, 0, 23, 3, 4, 5);

    assert.ok(date);
    assert.equal(date.toUTCString(), 'Sat, 23 Jan 1971 03:04:05 GMT');
  });

  test('it returns a date from the parse method', function(assert) {
    assert.expect(1);

    let date = this.service.parse('04 Dec 1995 00:12:00 GMT');

    assert.equal(date, 818035920000);
  });
});
