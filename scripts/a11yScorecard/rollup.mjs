import { playwrightCriteria } from '../../test/regressions/a11y/criteriaSuites.mjs';
import { axeRulesFor } from './axe.mjs';
import { WCAG_CRITERIA } from './wcag.mjs';

/** Worst-first: the library-level rating for a criterion is the worst any component scores. */
const CONFORMANCE_SEVERITY = [
  'Does Not Support',
  'Partially Supports',
  'Supports',
  'Not Applicable',
];

export const RATING_KEYS = ['conformance', 'responsibility', 'group', 'flagged'];

const PLAYWRIGHT_REF = 'test/regressions/index.test.js';

/** The rating fields of a default, without `notApplicable`. */
const ratingOf = (fields) => Object.fromEntries(RATING_KEYS.map((key) => [key, fields[key]]));

/**
 * Applies the library defaults to one component. A component rates each
 * criterion unless its own `notApplicable` lists it or it is not applicable by
 * default. Keying a default not-applicable criterion in `criteria` rates it. A
 * component with `inherits` rates only the criteria it keys, and inherits the
 * rest that its parent rates, including default not-applicable ones. Its own
 * `notApplicable` takes precedence over both, so it can opt out of a criterion
 * that the parent rates.
 */
function resolveReport(source, defaults, resolveParent) {
  const { component, data, regions, axe, ownTests, extraTests } = source;
  const overrides = data.criteria;
  const ownNotApplicable = new Set(data.notApplicable ?? []);
  const parent = data.inherits ? resolveParent(data.inherits) : null;
  // A criterion the parent rates stays applicable, even when it is not applicable by default.
  const parentRates = new Set((parent?.criteria ?? []).map(({ number }) => number));
  const isNotApplicable = (number) =>
    ownNotApplicable.has(number) ||
    (Boolean(defaults.data.criteria[number]?.notApplicable) &&
      !(number in overrides) &&
      !parentRates.has(number));

  const rates = (number) => !isNotApplicable(number) && (parent ? number in overrides : true);

  const unitRefs = new Map();
  for (const scan of [ownTests, ...extraTests].filter(Boolean)) {
    for (const { number } of scan.titles) {
      unitRefs.set(number, new Set([...(unitRefs.get(number) ?? []), scan.ref]));
    }
  }
  const playwright = new Set(playwrightCriteria(component));

  const criteria = WCAG_CRITERIA.filter(({ number }) => rates(number)).map(
    ({ number, name, level }) => {
      const defaultRating = ratingOf(defaults.data.criteria[number]);
      const override = overrides[number] ?? {};
      const axeRules = axe ? axeRulesFor(number, axe) : [];
      const axeFails = axeRules.some((rule) => rule.status === 'fail');
      return {
        number,
        name,
        level,
        ...defaultRating,
        conformance:
          override.conformance ?? (axeFails ? 'Partially Supports' : defaultRating.conformance),
        ...override,
        axeRules,
        evidence: [
          ...[...(unitRefs.get(number) ?? [])].map((ref) => ({ type: 'unit', ref })),
          ...(playwright.has(number) ? [{ type: 'playwright', ref: PLAYWRIGHT_REF }] : []),
          ...(axeRules.length > 0 ? [{ type: 'axe', ref: data.axe }] : []),
        ],
        pass: regions.get(`${number}:pass`) || undefined,
      };
    },
  );

  const rated = new Set(criteria.map(({ number }) => number));
  const parentRated = new Map(
    (parent?.criteria ?? []).map((criterion) => [criterion.number, criterion]),
  );
  const inheritedCriteria = WCAG_CRITERIA.filter(
    ({ number }) => parentRated.has(number) && !rated.has(number) && !isNotApplicable(number),
  );

  // A reason can cover several criteria: `<!-- 3.3.1,3.3.3:start -->`.
  const reasonKey = new Map();
  for (const [name, content] of regions) {
    if (content && /^\d+\.\d+\.\d+(,\d+\.\d+\.\d+)*$/.test(name)) {
      name.split(',').forEach((number) => reasonKey.set(number, name));
    }
  }
  const notApplicable = WCAG_CRITERIA.filter(({ number }) => isNotApplicable(number)).map(
    ({ number, name, level }) => ({
      number,
      name,
      level,
      isDefault: !ownNotApplicable.has(number),
      // The region that holds this criterion's own reason, if it has one.
      reasonKey: reasonKey.get(number),
      reason: regions.get(reasonKey.get(number)) || defaults.regions.get(number) || '',
    }),
  );

  const report = {
    ...source,
    title: data.title ?? component,
    criteria,
    notApplicable,
    inherited: parent && {
      component: parent.component,
      title: parent.title,
      criteria: inheritedCriteria,
      gaps: inheritedCriteria
        .map(({ number }) => parentRated.get(number))
        .filter((criterion) => criterion.conformance !== 'Supports'),
    },
    playwright: [...playwright],
    unaccounted: WCAG_CRITERIA.filter(
      ({ number }) =>
        !rated.has(number) &&
        !isNotApplicable(number) &&
        !inheritedCriteria.some((criterion) => criterion.number === number),
    ).map(({ number }) => number),
  };
  report.counts = countCriteria(report);
  return report;
}

/** Resolves every component, parents first. Throws on an unknown or circular `inherits`. */
export function resolveReports(sources, defaults) {
  const byComponent = new Map(sources.map((source) => [source.component, source]));
  const resolved = new Map();
  const resolving = new Set();

  const resolve = (component) => {
    if (resolved.has(component)) {
      return resolved.get(component);
    }
    const source = byComponent.get(component);
    if (!source) {
      throw new Error(`"inherits": ${component} has no accessibility.json`);
    }
    if (resolving.has(component)) {
      throw new Error(`"inherits" is circular at ${component}`);
    }
    resolving.add(component);
    const report = resolveReport(source, defaults, resolve);
    resolved.set(component, report);
    return report;
  };

  return sources.map((source) => resolve(source.component));
}

/**
 * The count table at the top of each report. Every number is derived from the
 * data: nothing is typed by hand.
 */
export function countCriteria({ criteria, notApplicable, inherited }) {
  const count = (conformance) =>
    criteria.filter((criterion) => criterion.conformance === conformance).length;

  const counts = {
    supports: count('Supports'),
    partiallySupports: count('Partially Supports'),
    doesNotSupport: count('Does Not Support'),
    notApplicable: notApplicable.length,
  };
  if (inherited) {
    counts.inherited = inherited.criteria.length;
  }
  counts.flagged = criteria.filter((criterion) => criterion.flagged).length;
  counts.rated = criteria.length;
  return counts;
}

/**
 * The per-component row on the public page: how many criteria apply, how they
 * split by level, how they conform, and how strong the evidence is.
 *
 * `verified` counts criteria confirmed by a test or a recorded review — the
 * ones without a 🚩 flag. `automated` counts those a deterministic test proves
 * on its own, which is the subset that cannot silently regress.
 */
export function summarize(criteria) {
  const count = (predicate) => criteria.filter(predicate).length;

  return {
    rated: criteria.length,
    levelA: count((criterion) => criterion.level === 'A'),
    levelAA: count((criterion) => criterion.level === 'AA'),
    supports: count((criterion) => criterion.conformance === 'Supports'),
    partiallySupports: count((criterion) => criterion.conformance === 'Partially Supports'),
    doesNotSupport: count((criterion) => criterion.conformance === 'Does Not Support'),
    verified: count((criterion) => !criterion.flagged),
    automated: count((criterion) => criterion.group === 'Automated'),
  };
}

/** Collapses the per-component criteria into one row per success criterion. */
export function rollUpCriteria(reports) {
  const byNumber = new Map();

  for (const report of reports) {
    for (const criterion of report.criteria) {
      const existing = byNumber.get(criterion.number);
      if (!existing) {
        byNumber.set(criterion.number, {
          number: criterion.number,
          name: criterion.name,
          level: criterion.level,
          conformance: criterion.conformance,
          flagged: criterion.flagged,
          affected: criterion.conformance === 'Partially Supports' ? [report.component] : [],
        });
        continue;
      }

      if (criterion.conformance === 'Partially Supports') {
        existing.affected.push(report.component);
      }
      existing.flagged = existing.flagged || criterion.flagged;

      const currentRank = CONFORMANCE_SEVERITY.indexOf(existing.conformance);
      const incomingRank = CONFORMANCE_SEVERITY.indexOf(criterion.conformance);
      if (incomingRank < currentRank) {
        existing.conformance = criterion.conformance;
      }
    }
  }

  return [...byNumber.values()].sort((a, b) =>
    a.number.localeCompare(b.number, undefined, { numeric: true }),
  );
}

/** Counts the rolled-up criteria by their library-level (worst) rating. */
export function summarizeRollup(criteria) {
  const count = (conformance) =>
    criteria.filter((criterion) => criterion.conformance === conformance).length;
  const rated = criteria.filter((criterion) => criterion.conformance !== 'Not Applicable');

  return {
    rated: rated.length,
    supports: count('Supports'),
    partiallySupports: count('Partially Supports'),
    doesNotSupport: count('Does Not Support'),
    flagged: rated.filter((criterion) => criterion.flagged).length,
  };
}
