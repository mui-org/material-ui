import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

describe('InitColorSchemeScript', () => {
  const { renderToString } = createRenderer();

  it('should render as expected', () => {
    const { container } = renderToString(<InitColorSchemeScript />);
    expect(container.firstChild).to.have.tagName('script');
  });
});
