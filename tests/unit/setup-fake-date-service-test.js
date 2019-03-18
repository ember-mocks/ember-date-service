import { module, test } from 'qunit';
import { setupFakeDateService } from 'ember-date-service/test-support';
import { setupTest } from 'ember-qunit';

module('Unit | Setup | setupFakeDateService', function(hooks) {
  setupTest(hooks);
  setupFakeDateService(hooks);

  test('it sets up the fake date service', function(assert) {
    let fakeDateService = this.owner.lookup('service:date');

    assert.equal(typeof fakeDateService.setNow, 'function');
  });
});

module('Unit | setupFakeDateService not used', function(hooks) {
  setupTest(hooks);

  test("it doesn't pollute other test modules when fake date service not setup", function(assert) {
    let dateService = this.owner.lookup('service:date');

    assert.equal(typeof dateService.setNow, 'undefined');
  });
});
