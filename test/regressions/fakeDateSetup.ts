// Override `Date` so `new Date()` and `Date.now()` return a stable instant for
// Argos — otherwise the `today` in date-aware composites (XHero /
// XDateRangeDemo build picker defaults from `dayjs()`) shifts the baseline
// every day.
//
// This MUST be imported before any module that reads `Date` at module scope.
// `index.jsx` imports it on its first line, ahead of `./fixtures` (which hosts
// the eager `import.meta.glob` calls). Eager globs *prepend* their imports to
// the module that contains them rather than appending (see mui/base-ui#4370),
// so the globs live in a separate `./fixtures` module that is imported after
// this one — guaranteeing the demos' top-level `dayjs()` runs after the
// override is installed.
//
// `Reflect.construct` preserves the native `Date.prototype` (timezone-aware
// date libraries enumerate its own methods) and forwards `new.target` for
// correct subclass construction. Follows mui/base-ui#4337. The playwright page
// also pins `timezoneId: 'UTC'` (see `index.test.js`) so the frozen instant
// renders identically regardless of the machine's local timezone.

const fakeNow = new Date('2025-06-15T09:00:00.000Z').valueOf();

const OriginalDate = Date;
const offset = fakeNow - OriginalDate.now();

function FakeDate(...args: any[]): Date | string {
  if (new.target) {
    return args.length === 0
      ? Reflect.construct(OriginalDate, [OriginalDate.now() + offset], new.target)
      : Reflect.construct(OriginalDate, args, new.target);
  }
  return new OriginalDate(OriginalDate.now() + offset).toString();
}

FakeDate.prototype = OriginalDate.prototype;
// Static methods can't be assigned to a plain function type under `strict`, so
// copy them through `Object.assign` (base-ui's version relies on a looser
// tsconfig; this is the typecheck-clean equivalent).
Object.assign(FakeDate, {
  parse: OriginalDate.parse,
  UTC: OriginalDate.UTC,
  now: () => OriginalDate.now() + offset,
});

(globalThis as { Date: unknown }).Date = FakeDate;

export {};
