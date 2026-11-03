import { describe, it, expect } from 'vitest';
import appendOwnerState from '@mui/utils/appendOwnerState';

const ownerState = {
  className: 'bar',
  checked: true,
};

function CustomComponent() {
  return null;
}

describe('appendOwnerState', () => {
  describe('when the provided elementType is undefined', () => {
    it('returns the provided existingProps without modification', () => {
      const existingProps = { className: 'foo' };
      const actual = appendOwnerState(undefined, existingProps, ownerState);

      expect(actual).to.equal(existingProps);
    });
  });

  describe('when a DOM element is provided as elementType', () => {
    it('returns the provided existingProps without modification', () => {
      const existingProps = { className: 'foo' };
      const actual = appendOwnerState('div', existingProps, ownerState);

      expect(actual).to.equal(existingProps);
    });
  });

  describe('when a React component is provided as elementType', () => {
    it('returns the provided existingProps with added ownerState', () => {
      const existingProps = { className: 'foo' };
      const actual = appendOwnerState(CustomComponent, existingProps, ownerState);

      expect(actual).to.deep.equal({
        className: 'foo',
        ownerState: {
          className: 'bar',
          checked: true,
        },
      });
    });

    it('merges the provided ownerState with existing ones', () => {
      const existingProps = {
        ownerState: {
          className: 'foo',
          id: 'foo',
        },
        className: 'foo',
      };

      const actual = appendOwnerState(CustomComponent, existingProps, ownerState);

      expect(actual).to.deep.equal({
        className: 'foo',
        ownerState: {
          className: 'bar',
          id: 'foo',
          checked: true,
        },
      });
    });
  });
});
