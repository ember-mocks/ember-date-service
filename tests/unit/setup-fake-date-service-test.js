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


  test('it sets up the fake namespaced date service', function(assert) {
    const namespacedService = this.owner.lookup('service:ember-date-service@date');

    const date = new Date();

    namespacedService.setNow(date)

    assert.equal(namespacedService.now(), date.getTime());
  });
});


module('Unit | setupFakeDateService not used', function(hooks) {
  setupTest(hooks);

  test("it doesn't pollute other test modules when fake date service not setup", function(assert) {
    let dateService = this.owner.lookup('service:date');

    assert.equal(typeof dateService.setNow, 'undefined');
  });
});
