import DateService from 'ember-date-service/services/date';

export default DateService.extend({
  init() {
    this._super(...arguments);

    this._now = null;
  },

  now() {
    if (this._now) {
      return this._now;
    }

    return this._super(...arguments);
  },

  setNow(date = Date.now()) {
    this._now = date;
  },

  reset() {
    this._now = null;
  },
});
