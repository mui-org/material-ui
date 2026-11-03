import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';
import { globbySync } from 'globby';
import type {
  Reporter,
  TestCase,
  TestModule,
  TestRunEndReason,
  TestSuite,
  Vitest,
} from 'vitest/node';
import type { SerializedError } from 'vitest';
import type { A11yMeta } from './axe';

const COMPONENTS_DIR = path.resolve(__dirname, '../../../docs/data/material/components');
const VRT_MODULE_PATH = path.resolve(__dirname, '../index.test.js');

interface DemoEntry {
  rules: A11yMeta['rules'];
}

function* walkTests(node: TestModule | TestSuite): Generator<TestCase, undefined, void> {
  for (const child of node.children) {
    if (child.type === 'test') {
      yield child;
    } else if (child.type === 'suite') {
      yield* walkTests(child);
    }
  }
}

function hasStatus(meta: A11yMeta, status: 'fail' | 'incomplete'): boolean {
  for (const rule of Object.values(meta.rules)) {
    if (rule.status === status) {
      return true;
    }
  }
  return false;
}

export default class A11yReporter implements Reporter {
  private filtered = false;

  onInit(ctx: Vitest) {
    this.filtered = ctx.config.testNamePattern != null;
  }

  onTestRunEnd(
    testModules: ReadonlyArray<TestModule>,
    _unhandledErrors: ReadonlyArray<SerializedError>,
    reason: TestRunEndReason,
  ) {
    const entries: A11yMeta[] = [];
    for (const mod of testModules) {
      for (const test of walkTests(mod)) {
        const meta = (test.meta() as { a11y?: A11yMeta }).a11y;
        if (meta) {
          entries.push(meta);
        }
      }
    }

    const bySlug = new Map<string, A11yMeta[]>();
    for (const meta of entries) {
      const list = bySlug.get(meta.slug) ?? [];
      list.push(meta);
      bySlug.set(meta.slug, list);
    }

    // One file per slug, co-located with the component's other files. The docs
    // toolbar reads these via a webpack require.context (eager) at build time.
    //
    // Only docs slugs that already exist accept results. Docs-demo routes
    // always pass; the check exists for a11y fixture suites, whose directory
    // name doubles as the slug. Compare against the exact on-disk names —
    // `existsSync` folds case on macOS (`Rating` matches `rating/`), so a
    // wrong-case suite must fail here on every platform, not only on Linux CI.
    const docsSlugs = new Set(fs.readdirSync(COMPONENTS_DIR));
    for (const [slug, metas] of bySlug) {
      if (!docsSlugs.has(slug)) {
        const routes = metas.map((meta) => `${meta.slug}/${meta.demo}`).join(', ');
        throw new Error(
          `a11y slug "${slug}" (from ${routes}) has no directory under ` +
            `${path.relative(process.cwd(), COMPONENTS_DIR)}. ` +
            `Name a11y fixture suites after an existing docs slug (lowercase) — ` +
            `see parseRoute() in test/regressions/demoMeta.ts.`,
        );
      }
      const slugDir = path.join(COMPONENTS_DIR, slug);
      const sorted = [...metas].sort((a, b) => a.demo.localeCompare(b.demo));
      const file: Record<string, DemoEntry> = {};
      for (const meta of sorted) {
        file[meta.demo] = { rules: meta.rules };
      }
      fs.writeFileSync(
        path.join(slugDir, `${slug}.a11y.json`),
        `${JSON.stringify(file, null, 2)}\n`,
      );
    }

    // Only prune when this run is authoritative for the full enrolment set:
    // VRT module must have actually executed, no `-t` filter narrowed it, and
    // the run completed cleanly. A partial/failed run can omit slugs whose
    // tests crashed before recording, so pruning then would delete tracked
    // JSON for still-enrolled demos.
    const ranVrtSuite = testModules.some((m) => m.moduleId === VRT_MODULE_PATH);
    if (ranVrtSuite && !this.filtered && reason === 'passed') {
      for (const file of globbySync('*/*.a11y.json', { cwd: COMPONENTS_DIR, absolute: true })) {
        const slug = path.basename(path.dirname(file));
        if (!bySlug.has(slug)) {
          fs.unlinkSync(file);
        }
      }
    }

    if (entries.length === 0) {
      return;
    }

    const slugs = [...bySlug.keys()].sort();
    const partial = slugs.filter((s) => bySlug.get(s)!.some((m) => hasStatus(m, 'fail')));
    const needsReview = slugs.filter(
      (s) => !partial.includes(s) && bySlug.get(s)!.some((m) => hasStatus(m, 'incomplete')),
    );
    const pass = slugs.filter((s) => !partial.includes(s) && !needsReview.includes(s));
    // eslint-disable-next-line no-console
    console.log(
      [
        '',
        chalk.bold(
          `a11y results (${entries.length} demos, ${slugs.length} slugs) -> ${path.relative(process.cwd(), COMPONENTS_DIR)}/{slug}/{slug}.a11y.json`,
        ),
        '',
        `  ✅ Pass (${pass.length}):         ${pass.join(', ') || '—'}`,
        `  ⚠️  Partial (${partial.length}):      ${partial.join(', ') || '—'}`,
        `  🔍 Needs review (${needsReview.length}): ${needsReview.join(', ') || '—'}`,
        '',
      ].join('\n'),
    );
  }
}
