import Service from '@ember/service';

/**
 * @class DateService
 *
 * Provides a simple interface to the Date object's API, allowing for
 * use within application code and a path to not overriding in test code.
 *
 * This is intended to be used in conjunction with the FakeDateService,
 * which allows you to override dates with static values without having to
 * modify the native Date object.
 */
export default class DateService extends Service {
  now(): number {
    return Date.now();
  }

  UTC(...args: Parameters<DateConstructor['UTC']>): Date {
    return new Date(Date.UTC(...args));
  }

  parse(dateString: string): number {
    return Date.parse(dateString);
  }
}
