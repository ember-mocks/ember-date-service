import FakeDateService from './date';

export default function setupFakeDateService(hooks) {
  hooks.beforeEach(function() {
    this.__dateService = this.lookup('service:date');
    this.register('service:date', FakeDateService);
  });

  hooks.afterEach(function() {
    this.register('service:date', this.__dateService);
  });
}
