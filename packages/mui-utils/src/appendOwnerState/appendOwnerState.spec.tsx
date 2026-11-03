import * as React from 'react';
import appendOwnerState from './appendOwnerState';

const divProps = appendOwnerState('div', { otherProp: true }, { ownerStateProps: true });

// ownerState is not available on a host component
// @ts-expect-error: Host elements never receive an ownerState prop.
const test1 = divProps.ownerState.ownerStateProps;
// @ts-expect-error: Host elements never receive an ownerState prop.
const test2 = divProps.ownerState?.ownerStateProps;

const componentProps = appendOwnerState(
  () => <div />,
  { otherProp: true },
  { ownerStateProps: true },
);

// ownerState is present on a custom component
const test3: boolean = componentProps.ownerState.ownerStateProps;

function test(element: React.ElementType) {
  const props = appendOwnerState(element, { otherProp: true }, { ownerStateProps: true });

  // ownerState may be present on a provided element type (it depends on its exact type)
  // @ts-expect-error: A generic element type may not receive ownerState, so it can be undefined.
  const test4 = props.ownerState.ownerStateProps;
  const test5: boolean | undefined = props.ownerState?.ownerStateProps;
}
