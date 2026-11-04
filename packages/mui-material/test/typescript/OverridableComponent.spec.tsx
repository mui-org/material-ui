import * as React from 'react';
import { expectType } from '@mui/types';
import type { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';

interface MyOverrideProps {
  className: string;
  myString?: string;
  myCallback?(n: number): void;
}
declare const MyOverrideComponent: React.ComponentType<MyOverrideProps>;
class MyOverrideClassComponent extends React.Component<MyOverrideProps> {
  render() {
    return null;
  }
}
const MyOverrideRefForwardingComponent = React.forwardRef<HTMLLegendElement>((props, ref) => (
  <div ref={ref} />
));
declare const MyIncompatibleComponent1: React.ComponentType<{ inconsistentProp?: number }>;

declare const Foo: OverridableComponent<{
  props: {
    numberProp: number;
    callbackProp?(b: boolean): void;
    inconsistentProp?: string;
  };
  defaultComponent: React.ComponentType<{
    defaultProp?: boolean;
    defaultCallbackProp?(s: string): void;
  }>;
  classKey: 'root' | 'foo' | 'bar';
}>;

// Can provide basic props; callback parameter types will be inferred.
<Foo
  numberProp={3}
  className="foo"
  style={{ backgroundColor: 'red' }}
  classes={{ root: 'x', foo: 'y' }}
  callbackProp={(b) => console.log(b)}
/>;

// Can pass props unique to the default component type; callback parameter types
// will be inferred.
<Foo numberProp={3} defaultProp defaultCallbackProp={(s) => console.log(s)} />;

// Can override the component and pass props unique to it; props of the override
// component that are provided from the wrapping component ("inner props") do
// not need to be specified.
<Foo component={MyOverrideComponent} myString="hello" numberProp={3} />;

// Can pass a callback prop with an override component; callback parameter must
// be explicitly specified.
<Foo component={MyOverrideComponent} myCallback={(n: number) => console.log(n)} numberProp={3} />;

// Can pass overriding component type as a parameter and callback parameters
// will be inferred.
<Foo<typeof MyOverrideComponent>
  component={MyOverrideComponent}
  myCallback={(n) => console.log(n)}
  numberProp={3}
/>;

// Can provide a primitive override and an event handler with explicit type.
<Foo
  component="button"
  numberProp={3}
  onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.currentTarget.checkValidity()}
/>;

// Can get inferred type for events by providing a component type parameter.
<Foo<'button'>
  numberProp={3}
  component="button"
  ref={(elem) => {
    expectType<HTMLButtonElement | null, typeof elem>(elem);
  }}
  onClick={(event) => {
    expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof event>(event);
    event.currentTarget.checkValidity();
  }}
/>;

// Can use refs if the override is a class component
<Foo<typeof MyOverrideClassComponent>
  numberProp={3}
  component={MyOverrideClassComponent}
  ref={(elem) => {
    expectType<MyOverrideClassComponent | null, typeof elem>(elem);
  }}
/>;

// ... or with ref-forwarding components
<Foo<typeof MyOverrideRefForwardingComponent>
  numberProp={42}
  component={MyOverrideRefForwardingComponent}
  ref={(elem) => {
    expectType<HTMLLegendElement | null, typeof elem>(elem);
  }}
/>;

// ... but for an arbitrary ComponentType
// @ts-expect-error: A plain function component does not accept a ref.
<Foo<typeof MyOverrideComponent> component={MyOverrideComponent} ref={() => {}} />;

<Foo
  numberProp={3}
  // @ts-expect-error: Foo does not declare a bad prop.
  bad="hi" // invalid prop
/>;

<Foo
  // @ts-expect-error: MyOverrideComponent requires myString to be a string.
  component={MyOverrideComponent}
  myString={4} // should be a string
  numberProp={3}
/>;

<Foo
  component={MyOverrideComponent}
  myCallback={(n) => {
    expectType<number, typeof n>(n);
  }}
  numberProp={3}
/>;

<Foo<typeof MyOverrideComponent>
  component={MyOverrideComponent}
  // @ts-expect-error: MyOverrideComponent requires myString to be a string.
  myString={4} // should be a string
  myCallback={(n) => {
    expectType<number, typeof n>(n);
  }}
  numberProp={3}
/>;

// inconsistent typing of base vs override prop
// but the assumption is that `Foo` intercepts `inconsistentProp` and doesn't forward it
<Foo
  component={MyIncompatibleComponent1} // inconsistent typing of base vs override prop
  numberProp={3}
  inconsistentProp="hi"
/>;

<Foo<'div'>
  component="div"
  numberProp={3}
  // event type doesn't match component type
  // @ts-expect-error: The div root cannot use a mouse handler restricted to HTMLButtonElement.
  onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.currentTarget.checkValidity()}
/>;

// Typical polymorphic component from @mui/material
interface BarTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    numberProp: number;
    callbackProp?(b: boolean): void;
  };
  defaultComponent: D;
}

declare const Bar: OverridableComponent<BarTypeMap>;

type BarProps<D extends React.ElementType = BarTypeMap['defaultComponent'], P = {}> = OverrideProps<
  BarTypeMap<P, D>,
  D
>;

const Header = React.forwardRef<HTMLElement, BarProps>((props, ref) => (
  <Bar ref={ref} component="header" {...props} />
));
