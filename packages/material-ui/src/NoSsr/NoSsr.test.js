import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, createServerRender } from 'test/utils';
import NoSsr from '@material-ui/core/NoSsr';

describe('<NoSsr />', () => {
  const render = createClientRender();
  const serverRender = createServerRender({ expectUseLayoutEffectWarning: true });

  describe('server-side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      const container = serverRender(
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
      const container = serverRender(
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
