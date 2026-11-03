import { describe, it, expect } from 'vitest';
import { isMuiElement } from '.';
import { Input, ListItemSecondaryAction, SvgIcon } from '..';

describe('utils/index.js', () => {
  describe('isMuiElement', () => {
    it('should match static muiName property', () => {
      function Component() {
        return null;
      }
      Component.muiName = 'Component';

      expect(isMuiElement(<Component />, ['Component'])).to.equal(true);
      expect(isMuiElement(<div />, ['Input'])).to.equal(false);
      expect(isMuiElement(null, ['SvgIcon'])).to.equal(false);
      expect(isMuiElement('TextNode', ['SvgIcon'])).to.equal(false);
    });

    it('should be truthy for matching components', () => {
      [
        [Input, 'Input'],
        [ListItemSecondaryAction, 'ListItemSecondaryAction'],
        [SvgIcon, 'SvgIcon'],
      ].forEach(([Component, muiName]) => {
        expect(isMuiElement(<Component />, [muiName])).to.equal(true);
      });
    });
  });
});
