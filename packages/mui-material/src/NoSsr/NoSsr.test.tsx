import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import NoSsr from '@mui/material/NoSsr';

describe('<NoSsr />', () => {
  const { render, renderToString } = createRenderer();

  describe('server-side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      const { container } = renderToString(
        <NoSsr>
          <span>Hello</span>
        </NoSsr>,
      );

      expect(container.firstChild).to.equal(null);
    });
  });

  describe('mounted', () => {
    it('should render the children', () => {
      render(
        <NoSsr>
          <span id="client-only" />
        </NoSsr>,
      );
      expect(document.querySelector('#client-only')).not.to.equal(null);
    });
  });

  describe('prop: fallback', () => {
    it('should render the fallback', () => {
      const { container } = renderToString(
        <div>
          <NoSsr fallback="fallback">
            <span>Hello</span>
          </NoSsr>
        </div>,
      );

      expect(container.firstChild).to.have.text('fallback');
    });
  });

  describe('prop: defer', () => {
    it('should defer the rendering', () => {
      render(
        <NoSsr defer>
          <span id="client-only">Hello</span>
        </NoSsr>,
      );
      expect(document.querySelector('#client-only')).not.to.equal(null);
    });
  });
});
