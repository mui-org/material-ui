/* eslint-disable react/prefer-stateless-function */
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import getDisplayName from './getDisplayName';

describe('utils/getDisplayName.js', () => {
  describe('getDisplayName', () => {
    it('gets the display name of a React component', () => {
      class SomeComponent extends React.Component {
        render() {
          return <div />;
        }
      }

      class SomeOtherComponent extends React.Component {
        static displayName = 'CustomDisplayName';

        render() {
          return <div />;
        }
      }

      function YetAnotherComponent() {
        return <div />;
      }

      function AndAnotherComponent() {
        return <div />;
      }

      const AnonymousForwardRefComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
        <div {...props} ref={ref} />
      ));

      const ForwardRefComponent = React.forwardRef<HTMLDivElement>(function Div(props, ref) {
        return <div {...props} ref={ref} />;
      });

      const NamedForwardRefComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
        <div {...props} ref={ref} />
      ));
      NamedForwardRefComponent.displayName = 'Div';

      const AnonymousMemoComponent = React.memo((props) => <div {...props} />);

      const MemoComponent = React.memo(function Div(props) {
        return <div {...props} />;
      });

      const NamedMemoComponent = React.memo((props) => <div {...props} />);
      NamedMemoComponent.displayName = 'Div';

      const NamedContext = React.createContext(null);
      NamedContext.displayName = 'SomeContext';

      expect(getDisplayName(SomeComponent)).to.equal('SomeComponent');
      expect(getDisplayName(SomeOtherComponent)).to.equal('CustomDisplayName');
      expect(getDisplayName(YetAnotherComponent)).to.equal('YetAnotherComponent');
      expect(getDisplayName(AndAnotherComponent)).to.equal('AndAnotherComponent');
      expect(getDisplayName(() => <div />)).to.equal('Component');
      expect(getDisplayName('div')).to.equal('div');
      expect(getDisplayName(AnonymousForwardRefComponent)).to.equal('ForwardRef');
      expect(getDisplayName(ForwardRefComponent)).to.equal('ForwardRef(Div)');
      expect(getDisplayName(NamedForwardRefComponent)).to.equal('Div');
      expect(getDisplayName(AnonymousMemoComponent)).to.equal('memo');
      expect(getDisplayName(MemoComponent)).to.equal('memo(Div)');
      expect(getDisplayName(NamedMemoComponent)).to.equal('Div');
      expect(getDisplayName(NamedContext.Provider)).to.equal(undefined);
      expect(getDisplayName(NamedContext.Consumer)).to.equal(undefined);
      // @ts-expect-error: A component type argument is required.
      expect(getDisplayName()).to.equal(undefined);
      // @ts-expect-error: An empty object is not a supported React component type.
      expect(getDisplayName({})).to.equal(undefined);
      // @ts-expect-error: A boolean is not a supported React component type.
      expect(getDisplayName(false)).to.equal(undefined);
    });
  });
});
