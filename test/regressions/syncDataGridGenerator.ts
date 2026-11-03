// Fake only `requestIdleCallback` so `@mui/x-data-grid-generator`'s
// `asyncWorker` takes its synchronous branch (gated on the `.clock` marker
// sinon adds). Demo rows are then ready before first paint — no loading
// skeleton, and the heaviest grid (`XHero`, 10k rows) no longer flakes when CI
// starves real idle callbacks. `toFake` keeps `Date` (see `fakeDateSetup`) and
// other timers real.
import { useFakeTimers } from 'sinon';

// `useFakeTimers` isn't a React hook; the `use*` name trips the rule.
// eslint-disable-next-line react-hooks/rules-of-hooks
useFakeTimers({ toFake: ['requestIdleCallback'] });

export {};
