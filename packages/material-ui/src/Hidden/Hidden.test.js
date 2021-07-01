import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import Hidden from '@material-ui/core/Hidden';

describe('<Hidden />', () => {
  const render = createClientRender();
  const child = <span>Hello</span>;

  describe('prop: implementation', () => {
    it('should use HiddenJs by default', () => {
      const { container } = render(<Hidden width="sm">{child}</Hidden>);
      // JS implementation doesn't requires wrapping <div />
      expect(container.firstChild).to.have.tagName('span');
    });

    it('should change the implementation', () => {
      const { container } = render(<Hidden implementation="css">{child}</Hidden>);
      // CSS implementation requires wrapping <div />
      expect(container.firstChild).to.have.tagName('div');
    });
  });
});
