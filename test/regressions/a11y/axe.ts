import type { AxeResults } from 'axe-core';
import { expect } from 'vitest';
import type { TestContext } from 'vitest';

export const VISUAL_RULES = ['color-contrast', 'link-in-text-block'];

export const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** Rules disabled globally — depend on page-level context, not component correctness. */
export const GLOBAL_DISABLED_RULES = ['region', 'page-has-heading-one'];

export type RuleStatus = 'pass' | 'fail' | 'incomplete';

export interface RuleEntry {
  status: RuleStatus;
  tags: string[];
}

export interface A11yMeta {
  slug: string;
  demo: string;
  rules: Record<string, RuleEntry>;
}

function formatNode(node: AxeResults['violations'][number]['nodes'][number]): string {
  const lines = [`    HTML: ${node.html}`];
  if (node.failureSummary) {
    lines.push(`    Summary: ${node.failureSummary.replace(/\n/g, '\n      ')}`);
  }
  const checks = [...node.any, ...node.all, ...node.none];
  for (const check of checks) {
    lines.push(`    - ${check.message}`);
    if (check.data && typeof check.data === 'object') {
      const { fgColor, bgColor, contrastRatio, fontSize, fontWeight, expectedContrastRatio } =
        check.data;
      if (contrastRatio !== undefined) {
        lines.push(
          `      Foreground: ${fgColor}, Background: ${bgColor}, Ratio: ${contrastRatio}, Expected: ${expectedContrastRatio}, Font: ${fontSize} / ${fontWeight}`,
        );
      }
    }
  }
  return lines.join('\n');
}

function formatResults(results: AxeResults['violations']) {
  return results
    .map((v) => {
      const header = `  [${v.id}] ${v.help} (${v.impact})\n  ${v.helpUrl}`;
      const nodes = v.nodes.map((n) => formatNode(n)).join('\n\n');
      return `${header}\n\n${nodes}`;
    })
    .join('\n\n');
}

interface RecordA11yOptions {
  slug: string;
  demo: string;
  /**
   * `visual` asserts only rules that need real rendered CSS. `all` asserts
   * every axe violation/incomplete not listed in `skipAssertions`.
   *
   * Note that `all` covers the `incomplete` bucket too, so a rule axe cannot
   * decide on its own — a background it fails to resolve, say — fails the
   * test rather than passing quietly. That is deliberate: an unresolved rule
   * is not evidence of conformance. `skipAssertions` is the escape hatch for
   * a fixture with a known-noisy incomplete; the result still lands in the
   * JSON, only the assertion is suppressed.
   */
  assertions?: 'visual' | 'all';
  /**
   * Rule ids whose violations are recorded but not asserted on. The rule
   * still runs and still lands in the results JSON — only the test-failing
   * assertion is suppressed.
   */
  skipAssertions?: string[];
}

/**
 * Node-side recorder for axe results produced inside a Playwright page.
 *
 * Extracts a structured summary onto `ctx.task.meta.a11y` (the reporter
 * writes one file per demo), then asserts on visual rules (`color-contrast`,
 * `link-in-text-block`) unless listed in `skipAssertions`.
 */
export function recordA11y(
  ctx: TestContext,
  results: AxeResults,
  { slug, demo, assertions = 'visual', skipAssertions = [] }: RecordA11yOptions,
): void {
  const rules: Record<string, RuleEntry> = {};
  const buckets: ReadonlyArray<[AxeResults['passes'], RuleStatus]> = [
    [results.passes, 'pass'],
    [results.incomplete, 'incomplete'],
    [results.violations, 'fail'],
  ];
  for (const [list, status] of buckets) {
    for (const rule of list) {
      const tags = rule.tags.filter((t) => WCAG_TAGS.includes(t)).sort();
      rules[rule.id] = { status, tags };
    }
  }
  const sortedRules = Object.fromEntries(
    Object.entries(rules).sort(([a], [b]) => a.localeCompare(b)),
  );

  const meta: A11yMeta = {
    slug,
    demo,
    rules: sortedRules,
  };
  (ctx.task.meta as { a11y?: A11yMeta }).a11y = meta;

  const skip = new Set(skipAssertions);
  const shouldAssert = (ruleId: string) =>
    !skip.has(ruleId) && (assertions === 'all' || VISUAL_RULES.includes(ruleId));
  const assertedViolations = results.violations.filter((v) => shouldAssert(v.id));
  const assertedIncomplete = results.incomplete.filter((v) => shouldAssert(v.id));

  const failures: string[] = [];
  if (assertedViolations.length > 0) {
    failures.push(
      `${assertedViolations.length} axe violation(s):\n\n${formatResults(assertedViolations)}`,
    );
  }
  if (assertedIncomplete.length > 0) {
    failures.push(
      `${assertedIncomplete.length} axe incomplete (needs review):\n\n${formatResults(assertedIncomplete)}`,
    );
  }
  if (failures.length > 0) {
    expect.fail(`[${slug}/${demo}] ${failures.join('\n\n')}`);
  }
}
