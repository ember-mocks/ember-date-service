import FakeDateService from './date';

/**
 * Sets up the fake date service as a replacement for DateService for use in tests.
 *
 * @param {object} hooks QUnit hooks passed to setup function
 */
export default function setupFakeDateService(hooks = self) {
  hooks.beforeEach(function() {
    this.owner.register('service:date', FakeDateService);
  });
}
