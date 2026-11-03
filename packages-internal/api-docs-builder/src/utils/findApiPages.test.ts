import { describe, it, expect } from 'vitest';
import { extractApiPage } from './findApiPages';

describe('extractApiPage', () => {
  it('return info for api page', () => {
    expect(
      extractApiPage('/material-ui/docs/pages/material-ui/api/accordion-actions.js'),
    ).to.deep.equal({
      apiPathname: '/material-ui/api/accordion-actions',
    });
  });
});
