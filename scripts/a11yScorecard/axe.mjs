import fs from 'fs/promises';
import path from 'path';
import axe from 'axe-core';
import { minimatch } from 'minimatch';
import { rootDirectory } from './files.mjs';
import { wcagTag } from './wcag.mjs';

const RULE_TAGS = new Map(axe.getRules().map((rule) => [rule.ruleId, rule.tags]));

/** Worst-first, so a rule that fails in one demo fails for the component. */
const STATUS_SEVERITY = ['fail', 'incomplete', 'pass'];

export const AXE_STATUS_SYMBOLS = { pass: '✅', incomplete: '❔', fail: '❌' };

/** Whether a demo name matches one `axeDemos` pattern (`Circular*`, or an exact name). */
export function demoMatches(name, pattern) {
  return minimatch(name, pattern);
}

/**
 * Demo names none of `patternLists` claim. Each list is one component's `axeDemos`.
 * A component without the field is not in the lists: it reads the whole file.
 */
export function unclaimedDemoNames(names, patternLists) {
  const patterns = patternLists.flat();
  return names.filter((name) => !patterns.some((pattern) => demoMatches(name, pattern)));
}

async function readAxeFile(ref) {
  return JSON.parse(await fs.readFile(path.join(rootDirectory, ref), 'utf8'));
}

/** Demo names recorded in a committed `*.a11y.json`. */
export async function demoNames(ref) {
  return Object.keys(await readAxeFile(ref));
}

/** Patterns in `patterns` that name no demo in `ref`. */
export async function unmatchedAxeDemos(ref, patterns) {
  const names = await demoNames(ref);
  return patterns.filter((pattern) => !names.some((name) => demoMatches(name, pattern)));
}

/**
 * Reads a committed `*.a11y.json` and keeps each rule's worst status across
 * the demos: `rule → 'pass' | 'incomplete' | 'fail'`.
 * `patterns` (`axeDemos`) limits which demos count when several components
 * share the file. Anything else, including no list, counts every demo.
 */
export async function readAxeResults(ref, patterns) {
  const demos = await readAxeFile(ref);
  const entries = Array.isArray(patterns)
    ? Object.entries(demos).filter(([name]) =>
        patterns.some((pattern) => demoMatches(name, pattern)),
      )
    : Object.entries(demos);
  const statuses = new Map();
  for (const [, { rules }] of entries) {
    for (const [rule, { status }] of Object.entries(rules)) {
      const current = statuses.get(rule);
      if (!current || STATUS_SEVERITY.indexOf(status) < STATUS_SEVERITY.indexOf(current)) {
        statuses.set(rule, status);
      }
    }
  }
  return statuses;
}

/**
 * The axe rules that test a criterion, from the WCAG tags axe-core ships with
 * each rule (`color-contrast` → `wcag143`), sorted by rule id.
 */
export function axeRulesFor(number, statuses) {
  const tag = wcagTag(number);
  return [...statuses]
    .filter(([rule]) => RULE_TAGS.get(rule)?.includes(tag))
    .map(([rule, status]) => ({ rule, status }))
    .sort((a, b) => a.rule.localeCompare(b.rule));
}
