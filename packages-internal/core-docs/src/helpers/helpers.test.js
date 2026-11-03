import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import { pageToTitle } from './helpers';

describe('docs getDependencies helpers', () => {
  beforeAll(() => {
    process.env.SOURCE_CODE_REPO = 'https://github.com/mui/material-ui';
  });

  afterAll(() => {
    delete process.env.SOURCE_CODE_REPO;
  });

  it('should return correct title', () => {
    expect(pageToTitle({ pathname: '/docs/src/pages/components/button/button.md' })).to.equal(
      'Button',
    );
    expect(pageToTitle({ pathname: '/components' })).to.equal('Components');
    expect(pageToTitle({ pathname: '/customization/how-to-customize' })).to.equal(
      'How to customize',
    );
  });

  it('should remove `react-` prefix', () => {
    expect(pageToTitle({ pathname: '/docs/pages/material/react-buttons.js' })).to.equal('Buttons');
  });
});
