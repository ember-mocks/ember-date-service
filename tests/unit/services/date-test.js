import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | date', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.service = this.owner.lookup('service:date');
  });

  test('it returns a date from the now method', function(assert) {
    assert.ok(this.service.now());
  });

  test('it returns a date from the UTC method', function(assert) {
    let date = this.service.UTC(71, 0, 23, 3, 4, 5);

    assert.ok(date);
    assert.equal(date.toUTCString(), 'Sat, 23 Jan 1971 03:04:05 GMT');
  });

  test('it returns a number from the parse method', function(assert) {
    let millis = this.service.parse('Sat, 23 Jan 1971 03:04:05 GMT');

    assert.equal(typeof millis, 'number');
    assert.equal(millis, 33447845000);
  });
});
