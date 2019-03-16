import Service from '@ember/service';

export default Service.extend({
  now() {
    return Date.now();
  },

  UTC(...args) {
    return new Date(Date.UTC(...args));
  },

  parse(...args) {
    return Date.parse(...args);
  },
});
