import { describe, it, expect } from 'vitest';
import type { AxeResults, Result } from 'axe-core';
import type { TestContext } from 'vitest';
import { recordA11y } from './axe';

/** A minimal axe result carrying a single rule in one bucket. */
function axeResults({
  violations = [],
  incomplete = [],
  passes = [],
}: Partial<Record<'violations' | 'incomplete' | 'passes', Result[]>>): AxeResults {
  return { violations, incomplete, passes, inapplicable: [] } as unknown as AxeResults;
}

function rule(id: string, tags: string[] = ['wcag2a']): Result {
  return { id, tags, nodes: [], description: id, help: id, helpUrl: '' } as unknown as Result;
}

/** `recordA11y` only touches `ctx.task.meta`, so a bare object is enough. */
function context(): TestContext {
  return { task: { meta: {} } } as unknown as TestContext;
}

describe('recordA11y', () => {
  it('records every rule it saw, whatever the assertion mode', () => {
    const ctx = context();
    recordA11y(ctx, axeResults({ passes: [rule('button-name')] }), {
      slug: 'buttons',
      demo: 'BasicButtons',
    });

    expect((ctx.task.meta as any).a11y).to.deep.equal({
      slug: 'buttons',
      demo: 'BasicButtons',
      rules: { 'button-name': { status: 'pass', tags: ['wcag2a'] } },
    });
  });

  it('visual mode ignores a violation that does not depend on rendered CSS', () => {
    expect(() =>
      recordA11y(context(), axeResults({ violations: [rule('button-name')] }), {
        slug: 'buttons',
        demo: 'BasicButtons',
      }),
    ).not.to.throw();
  });

  it('visual mode still asserts the CSS-dependent rules', () => {
    expect(() =>
      recordA11y(context(), axeResults({ violations: [rule('color-contrast', ['wcag2aa'])] }), {
        slug: 'buttons',
        demo: 'BasicButtons',
      }),
    ).to.throw(/color-contrast/);
  });

  it('all mode asserts a violation that visual mode would ignore', () => {
    expect(() =>
      recordA11y(context(), axeResults({ violations: [rule('button-name')] }), {
        slug: 'buttons',
        demo: 'BasicButtons',
        assertions: 'all',
      }),
    ).to.throw(/button-name/);
  });

  it('all mode asserts incompletes too, since an unresolved rule is not evidence', () => {
    expect(() =>
      recordA11y(context(), axeResults({ incomplete: [rule('aria-valid-attr')] }), {
        slug: 'buttons',
        demo: 'BasicButtons',
        assertions: 'all',
      }),
    ).to.throw(/needs review/);
  });

  it('skipAssertions suppresses the assertion but keeps the result', () => {
    const ctx = context();
    expect(() =>
      recordA11y(ctx, axeResults({ violations: [rule('button-name')] }), {
        slug: 'buttons',
        demo: 'BasicButtons',
        assertions: 'all',
        skipAssertions: ['button-name'],
      }),
    ).not.to.throw();

    expect((ctx.task.meta as any).a11y.rules['button-name'].status).to.equal('fail');
  });
});
