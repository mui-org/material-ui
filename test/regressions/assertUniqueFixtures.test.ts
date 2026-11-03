import { describe, expect, it } from 'vitest';
import assertUniqueFixtures from './assertUniqueFixtures';

const TEMPLATES = 'docs/data/material/getting-started/templates';

describe('assertUniqueFixtures', () => {
  it('throws when two source files share a route', () => {
    const fixtures = [
      {
        path: `${TEMPLATES}/blog/Blog.js`,
        suite: 'docs-getting-started-templates-blog',
        name: 'Blog',
      },
      {
        path: `${TEMPLATES}/blog/Blog.tsx`,
        suite: 'docs-getting-started-templates-blog',
        name: 'Blog',
      },
    ];

    expect(() => assertUniqueFixtures(fixtures)).to.throw(
      `Duplicate fixture route /docs-getting-started-templates-blog/Blog: ${TEMPLATES}/blog/Blog.js and ${TEMPLATES}/blog/Blog.tsx`,
    );
  });

  it('returns fixtures with distinct routes unchanged', () => {
    const fixtures = [
      {
        path: `${TEMPLATES}/blog/Blog.js`,
        suite: 'docs-getting-started-templates-blog',
        name: 'Blog',
      },
      {
        path: `${TEMPLATES}/checkout/Checkout.js`,
        suite: 'docs-getting-started-templates-checkout',
        name: 'Checkout',
      },
      {
        path: 'docs/data/material/components/buttons/demos/basic-button/BasicButtons.tsx',
        suite: 'docs-components-buttons',
        name: 'BasicButtons',
      },
    ];

    expect(assertUniqueFixtures(fixtures)).to.equal(fixtures);
  });
});
