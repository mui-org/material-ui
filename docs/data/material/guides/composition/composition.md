# Composition

<p class="description">Material UI tries to make composition as easy as possible.</p>

## Wrapping components

To provide maximum flexibility and performance, Material UI needs a way to know the nature of the child elements a component receives.
To solve this problem, we tag some of the components with a `muiName` static property when needed.

You may, however, need to wrap a component in order to enhance it, which can conflict with the `muiName` solution.
If you wrap a component, verify if that component has this static property set.

If you encounter this issue, you need to use the same tag for your wrapping component that is used with the wrapped component.
In addition, you should forward the props, as the parent component may need to control the wrapped components props.

Let's see an example:

```jsx
const WrappedIcon = (props) => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"component": "file://./demos/composition/index.ts"}}

### Forwarding slot props

Use the `mergeSlotProps` utility function to merge custom props with the slot props.
If the arguments are functions then they'll be resolved before merging, and the result from the first argument will override the second.

Special properties that merged between the two arguments are listed below:

- `className`: values are concatenated rather than overriding one another.

  In the snippet below, the `custom-tooltip-popper` class is applied to the Tooltip's popper slot.

  ```jsx
  import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
  import { mergeSlotProps } from '@mui/material/utils';

  export const CustomTooltip = (props: TooltipProps) => {
    const { children, title, sx: sxProps } = props;

    return (
      <Tooltip
        {...props}
        title={<Box sx={{ p: 4 }}>{title}</Box>}
        slotProps={{
          ...props.slotProps,
          popper: mergeSlotProps(props.slotProps?.popper, {
            className: 'custom-tooltip-popper',
            disablePortal: true,
            placement: 'top',
          }),
        }}
      >
        {children}
      </Tooltip>
    );
  };
  ```

  If you added another `className` via the `slotProps` prop on the Custom Tooltip—as shown below—then both would be present on the rendered popper slot:

  ```js
  <CustomTooltip slotProps={{ popper: { className: 'foo' } }} />
  ```

  The popper slot in the original example would now have both classes applied to it, in addition to any others that may be present: `"[…] custom-tooltip-popper foo"`.

- `style`: object are shallow merged rather than replacing one another. The style keys from the first argument have higher priority.
- `sx`: values are concatenated into an array.
- `^on[A-Z]` event handlers: these functions are composed between the two arguments.

  ```js
  mergeSlotProps(props.slotProps?.popper, {
    onClick: (event) => {}, // composed with the `slotProps?.popper?.onClick`
    createPopper: (popperOptions) => {}, // overridden by the `slotProps?.popper?.createPopper`
  });
  ```

## Component prop

Material UI allows you to change the root element that will be rendered via a prop called `component`.

For example, by default a `List` component will render a `<ul>` element.
This can be changed by passing a [React component](https://react.dev/reference/react/Component) to the `component` prop.
The following example renders the `List` component with a `<menu>` element as root element instead:

```jsx
<List component="menu">
  <ListItem>
    <ListItemButton>
      <ListItemText primary="Trash" />
    </ListItemButton>
  </ListItem>
  <ListItem>
    <ListItemButton>
      <ListItemText primary="Spam" />
    </ListItemButton>
  </ListItem>
</List>
```

This pattern is very powerful and allows for great flexibility, as well as a way to interoperate with other libraries, such as your favorite routing or forms library.

### Passing other React components

You can pass any other React component to `component` prop. For example, you can pass `Link` component from `react-router`:

```tsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';

function Demo() {
  return (
    <Button component={Link} to="/react-router">
      React router link
    </Button>
  );
}
```

### With TypeScript

To be able to use the `component` prop, the type of the props should be used with type arguments. Otherwise, the `component` prop will not be present.

The examples below use `TypographyProps` but the same will work for any component which has props defined with `OverrideProps`.

```ts
import { TypographyProps } from '@mui/material/Typography';

function CustomComponent(props: TypographyProps<'a', { component: 'a' }>) {
  /* ... */
}
// ...
<CustomComponent component="a" />;
```

Now the `CustomComponent` can be used with a `component` prop which should be set to `'a'`.
In addition, the `CustomComponent` will have all props of a `<a>` HTML element.
The other props of the `Typography` component will also be present in props of the `CustomComponent`.

You can find a code example with the Button and react-router in [these demos](/material-ui/integrations/routing/#component-prop).

### Generic

It's also possible to have a generic custom component which accepts any React component, including [built-in components](https://react.dev/reference/react-dom/components/common).

```ts
function GenericCustomComponent<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  /* ... */
}
```

If the `GenericCustomComponent` is used with a `component` prop provided, it should also have all props required by the provided component.

```ts
function ThirdPartyComponent({ prop1 }: { prop1: string }) {
  /* ... */
}
// ...
<GenericCustomComponent component={ThirdPartyComponent} prop1="some value" />;
```

The `prop1` became required for the `GenericCustomComponent` as the `ThirdPartyComponent` has it as a requirement.

Not every component fully supports any component type you pass in.
If you encounter a component that rejects its `component` props in TypeScript, please open an issue.
There is an ongoing effort to fix this by making component props generic.

## Caveat with refs

This section covers caveats when using a custom component as `children` or for the
`component` prop.

Some of the components need access to the DOM node. This was previously possible
by using `ReactDOM.findDOMNode`. This function is deprecated in favor of `ref` and
ref forwarding. However, only the following component types can be given a `ref`:

- Any Material UI component
- class components, that is `React.Component` or `React.PureComponent`
- DOM (or host) components, for example `div` or `button`
- [React.forwardRef components](https://react.dev/reference/react/forwardRef)
- [React.lazy components](https://react.dev/reference/react/lazy)
- [React.memo components](https://react.dev/reference/react/memo)

If you don't use one of the above types when using your components in conjunction with Material UI, you might see a warning from
React in your console similar to:

:::warning
Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
:::

Note that you will still get this warning for `lazy` and `memo` components if their wrapped component can't hold a ref.
In some instances, an additional warning is issued to help with debugging, similar to:

:::warning
Invalid prop `component` supplied to `ComponentName`. Expected an element type that can hold a ref.
:::

Only the two most common use cases are covered. For more information see [this section in the official React docs](https://react.dev/reference/react/forwardRef).

```diff
-const MyButton = () => <div role="button" />;
+const MyButton = React.forwardRef((props, ref) =>
+  <div role="button" {...props} ref={ref} />);

 <Button component={MyButton} />;
```

```diff
-const SomeContent = props => <div {...props}>Hello, World!</div>;
+const SomeContent = React.forwardRef((props, ref) =>
+  <div {...props} ref={ref}>Hello, World!</div>);

 <Tooltip title="Hello again."><SomeContent /></Tooltip>;
```

To find out if the Material UI component you're using has this requirement, check
out the props API documentation for that component. If you need to forward refs
the description will link to this section.

### Caveat with StrictMode

If you use class components for the cases described above you will still see
warnings in `React.StrictMode`.
`ReactDOM.findDOMNode` is used internally for backwards compatibility.
You can use `React.forwardRef` and a designated prop in your class component to forward the `ref` to a DOM component.
Doing so should not trigger any more warnings related to the deprecation of `ReactDOM.findDOMNode`.

```diff
 class Component extends React.Component {
   render() {
-    const { props } = this;
+    const { forwardedRef, ...props } = this.props;
     return <div {...props} ref={forwardedRef} />;
   }
 }

-export default Component;
+export default React.forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />);
```
