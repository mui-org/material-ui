import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import type { EventHandlers } from '@mui/utils/types';
import type { UseSlotPropsParameters, UseSlotPropsResult } from '@mui/utils/useSlotProps';
import useSlotProps from '@mui/utils/useSlotProps';

const { render } = createRenderer();

function callUseSlotProps<
  ElementType extends React.ElementType,
  SlotProps,
  ExternalForwardedProps,
  ExternalSlotProps extends Record<string, unknown>,
  AdditionalProps,
  OwnerState,
>(
  parameters: UseSlotPropsParameters<
    ElementType,
    SlotProps,
    ExternalForwardedProps,
    ExternalSlotProps,
    AdditionalProps,
    OwnerState
  >,
) {
  const TestComponent = React.forwardRef(
    (
      _: unknown,
      ref: React.Ref<UseSlotPropsResult<ElementType, SlotProps, AdditionalProps, OwnerState>>,
    ) => {
      const slotProps = useSlotProps(parameters);
      React.useImperativeHandle(ref, () => slotProps as any);
      return null;
    },
  );

  const ref =
    React.createRef<UseSlotPropsResult<ElementType, SlotProps, AdditionalProps, OwnerState>>();
  render(<TestComponent ref={ref} />);

  return ref.current!;
}

describe('useSlotProps', () => {
  it('returns the provided slot props if no overrides are present', () => {
    const clickHandler = () => {};
    const getSlotProps = (otherHandlers: EventHandlers) => {
      expect(otherHandlers).to.deep.equal({});

      return {
        id: 'test',
        onClick: clickHandler,
      };
    };

    const result = callUseSlotProps({
      elementType: 'div',
      getSlotProps,
      externalSlotProps: undefined,
      ownerState: undefined,
    });

    expect(result).to.deep.equal({
      id: 'test',
      onClick: clickHandler,
      ref: null,
    });
  });

  it('calls getSlotProps with the external event handlers', () => {
    const externalClickHandler = () => {};
    const internalClickHandler = () => {};

    const getSlotProps = (otherHandlers: EventHandlers) => {
      expect(otherHandlers).to.deep.equal({
        onClick: externalClickHandler,
      });

      return {
        id: 'internalId',
        onClick: internalClickHandler,
      };
    };

    const result = callUseSlotProps({
      elementType: 'div',
      getSlotProps,
      externalSlotProps: {
        className: 'externalClassName',
        id: 'externalId',
        onClick: externalClickHandler,
      },
      ownerState: undefined,
    });

    expect(result).to.deep.equal({
      className: 'externalClassName',
      id: 'externalId',
      onClick: internalClickHandler,
      ref: null,
    });
  });

  it('adds ownerState to props if the elementType is a component', () => {
    const getSlotProps = () => ({
      id: 'test',
    });

    function TestComponent(props: any) {
      return <div {...props} />;
    }

    const result = callUseSlotProps({
      elementType: TestComponent,
      getSlotProps,
      externalSlotProps: undefined,
      ownerState: {
        foo: 'bar',
      },
    });

    expect(result).to.deep.equal({
      id: 'test',
      ref: null,
      ownerState: {
        foo: 'bar',
      },
    });
  });

  it('synchronizes refs provided by internal and external props', () => {
    const internalRef = React.createRef();
    const externalRef = React.createRef();

    const getSlotProps = () => ({
      ref: internalRef,
    });

    const result = callUseSlotProps({
      elementType: 'div',
      getSlotProps,
      externalSlotProps: {
        ref: externalRef,
      },
      ownerState: undefined,
    });

    result.ref('test');

    expect(internalRef.current).to.equal('test');
    expect(externalRef.current).to.equal('test');
  });

  // The "everything but the kitchen sink" test
  it('constructs props from complex parameters', () => {
    const internalRef = React.createRef();
    const externalRef = React.createRef();
    const additionalRef = React.createRef();

    const internalClickHandler = spy();
    const externalClickHandler = spy();
    const externalForwardedClickHandler = spy();

    const createInternalClickHandler =
      (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
        expect(otherHandlers).to.deep.equal({
          onClick: externalClickHandler,
        });

        otherHandlers.onClick(event);
        internalClickHandler(event);
      };

    // usually provided by the hook:
    const getSlotProps = (otherHandlers: EventHandlers) => ({
      id: 'internalId',
      onClick: createInternalClickHandler(otherHandlers),
      ref: internalRef,
      className: 'internal',
    });

    const ownerState = {
      test: true,
    };

    // provided by the user by appending additional props on the Base UI component:
    const forwardedProps = {
      'data-test': 'externalForwarded',
      className: 'externalForwarded',
      onClick: externalForwardedClickHandler,
    };

    // provided by the user via slotProps.*:
    const componentProps = (os: typeof ownerState) => ({
      'data-fromownerstate': os.test,
      'data-test': 'externalComponentsProps',
      className: 'externalComponentsProps',
      onClick: externalClickHandler,
      ref: externalRef,
      id: 'external',
      ownerState: {
        foo: 'bar',
      },
    });

    // set in the Base UI component:
    const additionalProps = {
      className: 'additional',
      ref: additionalRef,
    };

    function TestComponent(props: any) {
      return <div {...props} />;
    }

    const result = callUseSlotProps({
      elementType: TestComponent,
      getSlotProps,
      externalForwardedProps: forwardedProps,
      externalSlotProps: componentProps,
      additionalProps,
      ownerState,
      className: ['another-class', 'yet-another-class'],
    });

    // `id` from componentProps overrides the one from getSlotProps
    expect(result).to.haveOwnProperty('id', 'external');

    // `slotProps` is called with the ownerState
    expect(result).to.haveOwnProperty('data-fromownerstate', true);

    // class names are concatenated
    expect(result).to.haveOwnProperty(
      'className',
      'internal additional another-class yet-another-class externalForwarded externalComponentsProps',
    );

    // `data-test` from componentProps overrides the one from forwardedProps
    expect(result).to.haveOwnProperty('data-test', 'externalComponentsProps');

    // all refs should be synced
    result.ref('test');
    expect(internalRef.current).to.equal('test');
    expect(externalRef.current).to.equal('test');
    expect(additionalRef.current).to.equal('test');

    // event handler provided in slotProps is called
    result.onClick({} as React.MouseEvent);
    expect(externalClickHandler.calledOnce).to.equal(true);

    // event handler provided in forwardedProps is not called (was overridden by slotProps)
    expect(externalForwardedClickHandler.notCalled).to.equal(true);

    // internal event handler is called
    expect(internalClickHandler.calledOnce).to.equal(true);

    // internal ownerState is merged with the one provided by slotProps
    expect(result.ownerState).to.deep.equal({
      test: true,
      foo: 'bar',
    });
  });

  it('should call externalSlotProps with ownerState if skipResolvingSlotProps is not provided', () => {
    const externalSlotProps = spy();
    const ownerState = { foo: 'bar' };

    const getSlotProps = () => ({
      skipResolvingSlotProps: true,
    });

    callUseSlotProps({
      elementType: 'div',
      getSlotProps,
      externalSlotProps,
      ownerState,
    });

    expect(externalSlotProps.callCount).not.to.equal(0);
    expect(externalSlotProps.args[0][0]).to.deep.equal(ownerState);
  });

  it('should not call externalSlotProps if skipResolvingSlotProps is true', () => {
    const externalSlotProps = spy();

    const getSlotProps = () => ({
      skipResolvingSlotProps: true,
    });

    callUseSlotProps({
      elementType: 'div',
      getSlotProps,
      externalSlotProps,
      skipResolvingSlotProps: true,
      ownerState: undefined,
    });

    expect(externalSlotProps.callCount).to.equal(0);
  });
});
