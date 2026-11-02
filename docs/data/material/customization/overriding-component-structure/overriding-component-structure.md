# Overriding component structure

<p class="description">Learn how to override the default DOM structure of Material UI components.</p>

Material UI components are designed to suit the widest possible range of use cases, but you may occasionally need to change how a component's structure is rendered in the DOM.

To understand how to do this, it helps to know a bit about how the API design has evolved over time, and to have an accurate mental model of the components themselves.

## Context

Prior to Material UI v6, it was not possible to override the structure of most components in the library.
Some components had `*Props` props that allowed you to pass props to a specific slot, but this pattern was not applied consistently.

In v6, those props were deprecated in favor of the `slots` and `slotProps` props, which allow for more granular control over the structure of a component and make the API more consistent across the library.

## The mental model

A component's structure is determined by the elements that fill that component's **slots**.
Slots are most commonly filled by HTML tags, but may also be filled by React components.

All components contain a root slot that defines their primary node in the DOM tree; more complex components also contain additional interior slots named after the elements they represent.

:::info
To see the available slots for a component, refer to the slots sections of the respective component API documentation.
:::

All _non-utility_ Material UI components accept two props for overriding their rendered HTML structure:

- `component`—to override the root slot
- `slots`—to replace any interior slots (when present) as well as the root

Additionally, you can pass custom props to interior slots using `slotProps`.

## The root slot

The root slot represents the component's outermost element. It is filled by a styled component with an appropriate HTML element.

For example, the [Button's](/material-ui/react-button/) root slot is a `<button>` element.
This component _only_ has a root slot; more complex components may have additional [interior slots](#interior-slots).

### The component prop

Use the `component` prop to override a component's root slot.
The demo below shows how to replace the Button's `<button>` tag with a `<a>` to create a link button:

{{"component": "file://./demos/overriding-root-slot/index.ts"}}

:::info
The `href`, `target`, and `rel` props are specific to `<a>` tags.
When using the `component` prop, be sure to add the appropriate attributes that correspond to the element you're inserting.
:::

## Interior slots

Complex components are composed of one or more interior slots in addition to the root.
These slots are often (but not necessarily) nested within the root.

For example, the [Autocomplete](/material-ui/react-autocomplete/) is composed of a root `<div>` that houses several interior slots named for the elements they represent: input, startDecorator, endDecorator, clearIndicator, popupIndicator, and more.

### The slots prop

Use the `slots` prop to replace a component's interior slots.
The example below shows how to replace the popper slot in the [Autocomplete](/material-ui/react-autocomplete/) component to remove the popup functionality:

{{"component": "file://./demos/overriding-internal-slot/index.ts"}}

### The slotProps prop

The `slotProps` prop is an object that contains the props for all slots within a component.
You can use it to define additional custom props to pass to a component's interior slots.

For example, the code snippet below shows how to add a custom `data-testid` to the popper slot of the [Autocomplete](/material-ui/react-autocomplete/) component:

```jsx
<Autocomplete slotProps={{ popper: { 'data-testid': 'my-popper' } }} />
```

Each slot prop can also be a callback that receives the component's `ownerState` and returns the props for that slot.
Use this when you need slot props to depend on the component's props or internal state.

```jsx
<Popover
  open={open}
  slotProps={{
    paper: (ownerState) => ({
      elevation: ownerState.open ? 8 : 0,
    }),
  }}
/>
```

All additional props placed on the primary component are also propagated into the root slot (just as if they were placed in `slotProps.root`).
These two examples are equivalent:

```jsx
<Badge id="badge1">
```

```jsx
<Badge slotProps={{ root: { id: 'badge1' } }}>
```

:::warning
If both `slotProps.root` and additional props have the same keys but different values, the `slotProps.root` props will take precedence.
This does not apply to classes or the `style` prop—they will be merged instead.
:::

### Type safety

The `slotProps` prop is not dynamically typed based on the custom `slots` prop, so if the custom slot has a different type than the default slot, you have to cast the type to avoid TypeScript errors and use `satisfies` (available in TypeScript 4.9) to ensure type safety for the custom slot.

The example below shows how to customize the `img` slot of the [Avatar](/material-ui/react-avatar/) component using [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image) component:

```tsx
import Image, { ImageProps } from 'next/image';
import Avatar, { AvatarProps } from '@mui/material/Avatar';

<Avatar
  slots={{
    img: Image,
  }}
  slotProps={
    {
      img: {
        src: 'https://example.com/image.jpg',
        alt: 'Image',
        width: 40,
        height: 40,
        blurDataURL: 'data:image/png;base64',
      } satisfies ImageProps,
    } as AvatarProps['slotProps']
  }
/>;
```

## Best practices

Use the `component` or `slotProps.{slot}.component` prop when you need to override the element while preserving the styles of the slot.

Use the `slots` prop when you need to replace the slot's styles and functionality with your custom component.

Overriding with `component` lets you apply the attributes of that element directly to the root.
For instance, if you override the Button's root with an `<li>` tag, you can add the `<li>` attribute `value` directly to the component.
If you did the same with `slots.root`, you would need to place this attribute on the `slotProps.root` object in order to avoid a TypeScript error.

Be mindful of your rendered DOM structure when overriding the slots of more complex components.
You can easily break the rules of semantic and accessible HTML if you deviate too far from the default structure—for instance, by unintentionally nesting block-level elements inside of inline elements.
