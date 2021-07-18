import { expect } from 'chai';
import { adapterToUse } from './test-utils';
import { findClosestEnabledDate } from './date-utils';

describe('findClosestEnabledDate', () => {
  const day18thText = adapterToUse.format(
    adapterToUse.date('2018-08-18T00:00:00.000'),
    'dayOfMonth',
  );
  const only18th = (date: any) => adapterToUse.format(date, 'dayOfMonth') !== day18thText;

  it('should fallback to today if all dates are disabled', () => {
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2000-01-01T00:00:00.000'),
      minDate: adapterToUse.date('1999-01-01T00:00:00.000'), // Use close-by min/max dates to reduce the test runtime.
      maxDate: adapterToUse.date('2001-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: () => true,
      disableFuture: false,
      disablePast: false,
    });

    expect(result).toEqualDateTime(adapterToUse.startOfDay(adapterToUse.date()));
  });

  it('should return given date if it is enabled', () => {
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2000-01-01T00:00:00.000'),
      minDate: adapterToUse.date('1900-01-01T00:00:00.000'),
      maxDate: adapterToUse.date('2100-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: () => false,
      disableFuture: false,
      disablePast: false,
    })!;

    expect(adapterToUse.isSameDay(result, adapterToUse.date('2000-01-01T00:00:00.000'))).to.equal(
      true,
    );
  });

  it('should return next 18th going from 10th', () => {
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2018-08-10T00:00:00.000'),
      minDate: adapterToUse.date('1900-01-01T00:00:00.000'),
      maxDate: adapterToUse.date('2100-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    })!;

    expect(adapterToUse.isSameDay(result, adapterToUse.date('2018-08-18T00:00:00.000'))).to.equal(
      true,
    );
  });

  it('should return previous 18th going from 1st', () => {
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2018-08-01T00:00:00.000'),
      minDate: adapterToUse.date('1900-01-01T00:00:00.000'),
      maxDate: adapterToUse.date('2100-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    })!;

    expect(adapterToUse.isSameDay(result, adapterToUse.date('2018-07-18T00:00:00.000'))).to.equal(
      true,
    );
  });

  it('should return future 18th if disablePast', () => {
    const today = adapterToUse.startOfDay(adapterToUse.date());
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2000-01-01T00:00:00.000'),
      minDate: adapterToUse.date('1900-01-01T00:00:00.000'),
      maxDate: adapterToUse.date('2100-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: true,
    })!;

    expect(adapterToUse.isBefore(result, today)).to.equal(false);
    expect(adapterToUse.isBefore(result, adapterToUse.addDays(today, 31))).to.equal(true);
  });

  it('should return now if disablePast+disableFuture and now is valid', () => {
    const today = adapterToUse.startOfDay(adapterToUse.date());
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2000-01-01T00:00:00.000'),
      minDate: adapterToUse.date('1900-01-01T00:00:00.000'),
      maxDate: adapterToUse.date('2100-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: () => false,
      disableFuture: true,
      disablePast: true,
    })!;

    expect(adapterToUse.isSameDay(result, today)).to.equal(true);
  });

  it('should fallback to today if disablePast+disableFuture and now is invalid', () => {
    const today = adapterToUse.date();
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2000-01-01T00:00:00.000'),
      minDate: adapterToUse.date('1900-01-01T00:00:00.000'),
      maxDate: adapterToUse.date('2100-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: (date) => adapterToUse.isSameDay(date, today),
      disableFuture: true,
      disablePast: true,
    });

    expect(adapterToUse.isEqual(result, adapterToUse.date()));
  });

  it('should return minDate if it is after the date and valid', () => {
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2000-01-01T00:00:00.000'),
      minDate: adapterToUse.date('2018-08-18T00:00:00.000'),
      maxDate: adapterToUse.date('2100-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    })!;

    expect(adapterToUse.isSameDay(result, adapterToUse.date('2018-08-18T00:00:00.000'))).to.equal(
      true,
    );
  });

  it('should return next 18th after minDate', () => {
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2000-01-01T00:00:00.000'),
      minDate: adapterToUse.date('2018-08-01T00:00:00.000'),
      maxDate: adapterToUse.date('2100-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    })!;

    expect(adapterToUse.isSameDay(result, adapterToUse.date('2018-08-18T00:00:00.000'))).to.equal(
      true,
    );
  });

  it('should return maxDate if it is before the date and valid', () => {
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2050-01-01T00:00:00.000'),
      minDate: adapterToUse.date('1900-01-01T00:00:00.000'),
      maxDate: adapterToUse.date('2018-07-18T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    })!;

    expect(adapterToUse.isSameDay(result, adapterToUse.date('2018-07-18T00:00:00.000'))).to.equal(
      true,
    );
  });

  it('should return previous 18th before maxDate', () => {
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2050-01-01T00:00:00.000'),
      minDate: adapterToUse.date('1900-01-01T00:00:00.000'),
      maxDate: adapterToUse.date('2018-08-17T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    })!;

    expect(adapterToUse.isSameDay(result, adapterToUse.date('2018-07-18T00:00:00.000'))).to.equal(
      true,
    );
  });

  it('should fallback to today if minDate is after maxDate', () => {
    const result = findClosestEnabledDate({
      date: adapterToUse.date('2000-01-01T00:00:00.000'),
      minDate: adapterToUse.date('2000-01-01T00:00:00.000'),
      maxDate: adapterToUse.date('1999-01-01T00:00:00.000'),
      utils: adapterToUse,
      shouldDisableDate: () => false,
      disableFuture: false,
      disablePast: false,
    })!;

    expect(result).toEqualDateTime(adapterToUse.startOfDay(adapterToUse.date()));
  });
});
