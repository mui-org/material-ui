import { expect } from 'chai';
import appendStyleProps from './appendStyleProps';

const styleProps = {
  className: 'bar',
  checked: true,
};

const CustomComponent = () => null;

describe('appendStyleProps', () => {
  describe('when a DOM element is provided as elementType', () => {
    it('returns the provided existingProps without modification ', () => {
      const existingProps = { className: 'foo' };
      const actual = appendStyleProps('div', existingProps, styleProps);

      expect(actual).to.equal(existingProps);
    });
  });

  describe('when a React component is provided as elementType', () => {
    it('returns the provided existingProps with added styleProps', () => {
      const existingProps = { className: 'foo' };
      const actual = appendStyleProps(CustomComponent, existingProps, styleProps);

      expect(actual).to.deep.equal({
        className: 'foo',
        styleProps: {
          className: 'bar',
          checked: true,
        },
      });
    });

    it('merges the provided styleProps with existing ones', () => {
      const existingProps = {
        styleProps: {
          className: 'foo',
          id: 'foo',
        },
        className: 'foo',
      };

      const actual = appendStyleProps(CustomComponent, existingProps, styleProps);

      expect(actual).to.deep.equal({
        className: 'foo',
        styleProps: {
          className: 'bar',
          id: 'foo',
          checked: true,
        },
      });
    });
  });
});
