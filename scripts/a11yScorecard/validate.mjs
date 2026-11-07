import path from 'path';
import { unmatchedAxeDemos } from './axe.mjs';
import { componentsDirectory, exists } from './files.mjs';
import { normalizeAffected, renderDefaultReasons, renderReport } from './render.mjs';
import { RATING_KEYS } from './rollup.mjs';
import {
  CONFORMANCE_SYMBOLS,
  GROUP_HEADINGS,
  RESPONSIBILITY_SYMBOLS,
  WCAG_BY_NUMBER,
  WCAG_CRITERIA,
} from './wcag.mjs';

const ALLOWED = {
  conformance: Object.keys(CONFORMANCE_SYMBOLS),
  responsibility: Object.keys(RESPONSIBILITY_SYMBOLS),
  group: Object.keys(GROUP_HEADINGS),
  flagged: [true, false],
};

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isStrings = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === 'string' && item !== '');

/** Checks the rating fields of one criterion entry. */
function checkRating(entry, where, required, violations) {
  if (!isObject(entry)) {
    violations.push(`${where}: must be an object`);
    return;
  }
  for (const key of Object.keys(entry)) {
    if (!RATING_KEYS.includes(key) && !(required && key === 'notApplicable')) {
      violations.push(`${where}: unknown key "${key}"`);
    }
  }
  for (const key of RATING_KEYS) {
    if (entry[key] === undefined) {
      if (required) {
        violations.push(`${where}: missing "${key}"`);
      }
    } else if (!ALLOWED[key].includes(entry[key])) {
      violations.push(`${where}: "${key}" must be one of ${ALLOWED[key].join(', ')}`);
    }
  }
}

/**
 * The library defaults, `packages/mui-material/src/accessibility.json`:
 * `{ criteria: { <number>: { conformance, responsibility, group, flagged, notApplicable? } } }`,
 * one entry for each WCAG 2.2 Level A and AA criterion.
 */
export function validateDefaults(defaults, check) {
  const violations = [];
  const { criteria } = defaults.data;
  if (!isObject(criteria)) {
    return ['accessibility.json: "criteria" must be an object'];
  }
  for (const { number } of WCAG_CRITERIA) {
    if (!criteria[number]) {
      violations.push(`accessibility.json: ${number} has no default`);
    }
  }
  for (const [number, entry] of Object.entries(criteria)) {
    const where = `accessibility.json: ${number}`;
    if (!WCAG_BY_NUMBER.has(number)) {
      violations.push(`${where} is not a WCAG 2.2 Level A or AA criterion`);
      continue;
    }
    checkRating(entry, where, true, violations);
    if (entry.notApplicable !== undefined && entry.notApplicable !== true) {
      violations.push(`${where}: "notApplicable" is either true or left out`);
    }
  }
  if (violations.length > 0) {
    return violations;
  }

  const used = new Set();
  renderDefaultReasons(defaults, used);
  for (const [name, content] of defaults.regions) {
    if (content && WCAG_BY_NUMBER.has(name) && !used.has(name)) {
      violations.push(
        `accessibility.md: ${name} has a not-applicable reason but is applicable by default`,
      );
    }
  }
  if (check) {
    for (const number of used) {
      if (!defaults.regions.get(number)) {
        violations.push(`accessibility.md: ${number} has no default not-applicable reason`);
      }
    }
  }
  return violations;
}

const COMPONENT_KEYS = {
  title: (value) => typeof value === 'string',
  axe: (value) => typeof value === 'string',
  axeDemos: isStrings,
  tests: isStrings,
  inherits: (value) => typeof value === 'string',
  criteria: isObject,
  notApplicable: isStrings,
};

/**
 * The shape of `<Component>/accessibility.json`, which holds only what differs
 * from the library defaults:
 *
 * - `title` (optional): the display name, when it differs from the folder name.
 * - `axe` (optional): the committed `*.a11y.json` for the component's demos.
 * - `axeDemos` (optional): demo names or `*` globs in that file that count for this component.
 * - `tests` (optional): other components whose test files also test this one.
 * - `inherits` (optional): the component whose ratings this one inherits.
 * - `criteria`: `{ <number>: { conformance?, responsibility?, group?, flagged? } }`.
 * - `notApplicable` (optional): criteria not applicable beyond the defaults.
 */
export async function validateSource(source, defaults) {
  const { component, data } = source;
  const violations = [];
  for (const [key, value] of Object.entries(data)) {
    if (!COMPONENT_KEYS[key]) {
      violations.push(`unknown key "${key}"`);
    } else if (!COMPONENT_KEYS[key](value)) {
      violations.push(`"${key}" has the wrong type`);
    }
  }
  if (data.criteria === undefined) {
    violations.push('missing "criteria"');
  }
  if (violations.length > 0) {
    return violations.map((violation) => `${component}: ${violation}`);
  }

  if (data.axe !== undefined && !source.axe) {
    violations.push(`axe: "${data.axe}" does not exist`);
  }
  if (data.axeDemos !== undefined && data.axe === undefined) {
    violations.push('axeDemos: set without "axe"');
  }
  if (Array.isArray(data.axeDemos) && data.axeDemos.length === 0) {
    violations.push('axeDemos: must list at least one demo');
  }
  if (source.axe && Array.isArray(data.axeDemos)) {
    const unmatched = await unmatchedAxeDemos(data.axe, data.axeDemos);
    unmatched.forEach((pattern) => {
      violations.push(`axeDemos: "${pattern}" matches no demo in ${data.axe}`);
    });
  }
  (data.tests ?? []).forEach((name, index) => {
    if (!source.extraTests[index]) {
      violations.push(`tests: ${name}/${name}.test.js does not exist`);
    }
  });
  if (data.inherits !== undefined) {
    const parent = path.join(componentsDirectory, data.inherits, 'accessibility.json');
    if (!(await exists(parent))) {
      violations.push(`inherits: ${data.inherits} has no accessibility.json`);
    }
  }

  const ownNotApplicable = new Set(data.notApplicable ?? []);
  for (const [number, entry] of Object.entries(data.criteria)) {
    const where = `criteria.${number}`;
    const fallback = defaults.data.criteria[number];
    if (!fallback) {
      violations.push(`${where}: not a WCAG 2.2 Level A or AA criterion`);
      continue;
    }
    checkRating(entry, where, false, violations);
    for (const key of Object.keys(entry)) {
      if (entry[key] === fallback[key]) {
        violations.push(`${where}: "${key}" repeats the default`);
      }
    }
    if (Object.keys(entry).length === 0 && !data.inherits && !fallback.notApplicable) {
      violations.push(`${where}: an empty entry repeats the default`);
    }
    if (ownNotApplicable.has(number)) {
      violations.push(`${number}: rated and listed as not applicable`);
    }
  }
  for (const number of ownNotApplicable) {
    if (!defaults.data.criteria[number]) {
      violations.push(`notApplicable: ${number} is not a WCAG 2.2 Level A or AA criterion`);
    } else if (defaults.data.criteria[number].notApplicable && !data.inherits) {
      // `validateReport` checks an inheriting component against its parent.
      violations.push(`notApplicable: ${number} is already not applicable by default`);
    }
  }
  return violations.map((violation) => `${component}: ${violation}`);
}

/** Checks one resolved criterion against the evidence behind it. */
function checkCriterion(criterion, override, where, violations) {
  const tested = criterion.evidence.some((entry) => entry.type !== 'axe');

  if (override.conformance === 'Supports') {
    for (const { rule, status } of criterion.axeRules) {
      if (status === 'fail') {
        violations.push(`${where}: rated Supports but axe rule "${rule}" fails`);
      }
    }
  }
  // An ⚙️ Automated rating claims that something deterministic proves the
  // criterion, so it must have that test, and it cannot also be flagged 🚩.
  if (criterion.group === 'Automated') {
    if (criterion.flagged) {
      violations.push(`${where}: rated Automated but still flagged 🚩`);
    }
    if (criterion.evidence.length === 0) {
      violations.push(`${where}: rated Automated but no unit, Playwright, or axe test covers it`);
    }
  }
  if (criterion.group === 'Manual' && tested) {
    violations.push(`${where}: rated Manual but a unit or Playwright test covers it`);
  }
}

const isAffected = (value) =>
  Array.isArray(value) &&
  value.every(
    (entry) =>
      (typeof entry === 'string' && entry !== '') ||
      (isObject(entry) &&
        typeof entry.component === 'string' &&
        (entry.note === undefined || typeof entry.note === 'string') &&
        Object.keys(entry).every((key) => key === 'component' || key === 'note')),
  );

const KNOWN_GAP_KEYS = {
  gap: (value) => typeof value === 'string',
  criteria: isStrings,
  affected: isAffected,
  workaround: (value) => typeof value === 'string',
};

/**
 * Returns every problem in `knownGaps.json`. Both modes check the shape of the
 * rows. With `check`, the rows must also explain every ⚠️ and ❌ rating, and
 * must not name a component that has no such rating for the row's criteria.
 */
export function validateKnownGaps(knownGaps, reports, check) {
  const violations = [];
  if (!Array.isArray(knownGaps)) {
    return ['knownGaps.json: must be an array'];
  }

  const failing = new Set();
  for (const { component, criteria } of reports) {
    for (const criterion of criteria) {
      if (criterion.conformance !== 'Supports') {
        failing.add(`${component} ${criterion.number}`);
      }
    }
  }

  const covered = new Set();
  knownGaps.forEach((row, index) => {
    const where = `knownGaps.json[${index}]`;
    if (!isObject(row)) {
      violations.push(`${where}: must be an object`);
      return;
    }
    for (const [key, value] of Object.entries(row)) {
      if (!KNOWN_GAP_KEYS[key]) {
        violations.push(`${where}: unknown key "${key}"`);
      } else if (!KNOWN_GAP_KEYS[key](value)) {
        violations.push(`${where}: "${key}" has the wrong type`);
      }
    }
    for (const key of Object.keys(KNOWN_GAP_KEYS)) {
      if (row[key] === undefined) {
        violations.push(`${where}: missing "${key}"`);
      }
    }
    const criteria = isStrings(row.criteria) ? row.criteria : [];
    criteria
      .filter((number) => !WCAG_BY_NUMBER.has(number))
      .forEach((number) =>
        violations.push(`${where}: ${number} is not a WCAG 2.2 Level A or AA criterion`),
      );

    const affected = isAffected(row.affected) ? row.affected : [];
    for (const entry of affected.map(normalizeAffected)) {
      const matches = criteria.filter((number) => failing.has(`${entry.component} ${number}`));
      if (check && matches.length === 0) {
        violations.push(
          `${where}: ${entry.component} has no ⚠️ or ❌ rating for ${criteria.join(', ')}`,
        );
      }
      matches.forEach((number) => covered.add(`${entry.component} ${number}`));
    }
  });

  for (const key of failing) {
    if (check && !covered.has(key)) {
      violations.push(`knownGaps.json: ${key} is rated ⚠️ or ❌ but no row lists it`);
    }
  }
  return violations;
}

/**
 * Returns every problem in one resolved report, prefixed with the component
 * name. With `check`, the prose the report needs must also be written.
 * `parent` is the resolved report that `inherits` names, if any.
 */
export function validateReport(report, check, defaults, parent) {
  const { component, data, regions } = report;
  const violations = [];

  // An inheriting component can opt out of a default not-applicable criterion
  // only when its parent rates that criterion.
  if (parent) {
    const parentRates = new Set(parent.criteria.map(({ number }) => number));
    for (const number of data.notApplicable ?? []) {
      if (defaults.data.criteria[number]?.notApplicable && !parentRates.has(number)) {
        violations.push(`notApplicable: ${number} is already not applicable by default`);
      }
    }
  }

  for (const number of report.unaccounted) {
    violations.push(`${number} is not rated, inherited, or not applicable`);
  }
  for (const scan of [report.ownTests, ...report.extraTests].filter(Boolean)) {
    for (const { number, name } of scan.titles) {
      const expected = WCAG_BY_NUMBER.get(number)?.name;
      if (expected !== name) {
        violations.push(
          `${scan.ref}: test title "${number} ${name}" does not match WCAG "${number} ${expected ?? '(unknown)'}"`,
        );
      }
    }
  }
  // A test of the component's own for a criterion it calls not applicable
  // means one of the two is wrong.
  const ownTested = new Set([
    ...(report.ownTests?.titles ?? []).map(({ number }) => number),
    ...report.playwright,
  ]);
  for (const { number } of report.notApplicable) {
    if (ownTested.has(number)) {
      violations.push(`${number}: not applicable, but the component's tests cover it`);
    }
  }
  for (const criterion of report.criteria) {
    checkCriterion(
      criterion,
      data.criteria[criterion.number] ?? {},
      `criteria.${criterion.number}`,
      violations,
    );
  }

  // A region the report no longer renders would be dropped on the next run.
  const used = new Set();
  renderReport(report, used);
  for (const [name, content] of regions) {
    if (content && !used.has(name)) {
      violations.push(`accessibility.md: region "${name}" has prose but nothing renders it`);
    }
  }
  if (check) {
    const required = [
      ...report.criteria
        .filter((criterion) => criterion.group !== 'Automated')
        .map(({ number }) => [number, 'notes']),
      ...report.criteria
        .filter((criterion) => criterion.conformance !== 'Supports')
        .map(({ number }) => [`${number}:gap`, 'a known-gap summary']),
      ...report.notApplicable
        .filter((item) => !item.isDefault)
        .map(({ number, reasonKey }) => [reasonKey ?? number, 'a not-applicable reason']),
    ];
    for (const [name, what] of required) {
      if (!regions.get(name)) {
        violations.push(`accessibility.md: ${name.split(':')[0]} needs ${what}`);
      }
    }
  }

  return violations.map((violation) => `${component}: ${violation}`);
}
