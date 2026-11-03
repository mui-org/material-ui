---
productId: material-ui
title: React Tooltip component
components: Tooltip
githubLabel: 'scope: tooltip'
materialDesign: https://m2.material.io/components/tooltips
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
githubSource: packages/mui-material/src/Tooltip
---

# Tooltip

<p class="description">Tooltips display informative text when users hover over, focus on, or tap an element.</p>

When activated, Tooltips display a text label identifying an element, such as a description of its function.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic tooltip

{{"component": "file://./demos/basic/index.ts"}}

## Labels and descriptions

By default, the tooltip only labels its child element.
This is notably different from `title` which can either label or describe its child depending on whether the child already has a label.
For example, in the element below, the `title` acts as an accessible description:

```html
<button title="some more information">A button</button>
```

If you want the tooltip to act as an accessible description, you can pass the `describeChild` prop.
You shouldn't use `describeChild` if the tooltip provides the only visual label.
In that case, the child would have no accessible name and the tooltip would violate [WCAG 2.2 Success Criterion 2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html).
If the trigger already has either visible text or an `aria-label`, use the tooltip as a description and pass the `describeChild` prop.
Otherwise, you can use the default behavior and let the tooltip label the trigger.

{{"component": "file://./demos/accessibility/index.ts"}}

## Positioned tooltips

The `Tooltip` has 12 **placement** choices.
They don't have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"component": "file://./demos/positioned/index.ts"}}

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

## Arrow tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

{{"component": "file://./demos/arrow/index.ts"}}

## Distance from anchor

To adjust the distance between the tooltip and its anchor, you can use the `slotProps` prop to modify the [offset](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/modifiers/offset.md) of the popper.

{{"component": "file://./demos/offset/index.ts"}}

Alternatively, you can use the `slotProps` prop to customize the margin of the popper.

{{"component": "file://./demos/margin/index.ts"}}

## Custom child element

The tooltip needs to apply DOM event listeners to its child element.
If the child is a custom React element, you need to make sure that it spreads its props to the underlying DOM element.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <div {...props} ref={ref}>
      Bin
    </div>
  );
});

// ...

<Tooltip title="Delete">
  <MyComponent />
</Tooltip>;
```

If using a class component as a child, you'll also need to ensure that the ref is forwarded to the underlying DOM element. (A ref to the class component itself will not work.)

```jsx
class MyComponent extends React.Component {
  render() {
    const { innerRef, ...props } = this.props;
    //  Spread the props to the underlying DOM element.
    return (
      <div {...props} ref={innerRef}>
        Bin
      </div>
    );
  }
}

// Wrap MyComponent to forward the ref as expected by Tooltip
const WrappedMyComponent = React.forwardRef(function WrappedMyComponent(props, ref) {
  return <MyComponent {...props} innerRef={ref} />;
});

// ...

<Tooltip title="Delete">
  <WrappedMyComponent />
</Tooltip>;
```

## Triggers

You can define the types of events that cause a tooltip to show.

The touch action requires a long press due to the `enterTouchDelay` prop being set to `700`ms by default.

{{"component": "file://./demos/triggers/index.ts"}}

## Controlled tooltips

You can use the `open`, `onOpen` and `onClose` props to control the behavior of the tooltip.

{{"component": "file://./demos/controlled/index.ts"}}

## Variable width

The `Tooltip` wraps long text by default to make it readable.

{{"component": "file://./demos/variable-width/index.ts"}}

## Interactive

Tooltips are interactive by default (to pass [WCAG 2.2 Success Criterion 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)).
It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.
You can disable this behavior (thus failing the success criterion which is required to reach Level AA) by passing `disableInteractive`.

{{"component": "file://./demos/non-interactive/index.ts"}}

## Disabled elements

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

:::warning
In order to work with Safari, you need at least one display block or flex item below the tooltip wrapper.
:::

{{"component": "file://./demos/disabled/index.ts"}}

:::warning
If you're not wrapping a Material UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property _pointer-events: none;_ to your element when disabled:
:::

```jsx
<Tooltip describeChild title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: 'none' } : {}}>
      A disabled button
    </button>
  </span>
</Tooltip>
```

## Transitions

Use `slots.transition` and `slotProps.transition` to use a different transition.

{{"component": "file://./demos/transitions/index.ts"}}

## Follow cursor

You can enable the tooltip to follow the cursor by setting `followCursor={true}`.

{{"component": "file://./demos/follow-cursor/index.ts"}}

## Virtual element

In the event you need to implement a custom placement, you can use the `anchorEl` prop:
The value of the `anchorEl` prop can be a reference to a fake DOM element.
You need to create an object shaped like the [`VirtualElement`](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/virtual-elements.md).

{{"component": "file://./demos/anchor-el/index.ts"}}

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the `enterDelay` and `leaveDelay` props.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` prop.

{{"component": "file://./demos/delay/index.ts"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

Tooltips should wrap triggers that are focusable and hoverable (for example, buttons) so that all users can activate them. When tooltips are displayed, they are automatically linked to the trigger. The trigger element is either labeled or described by the tooltip content. However, tooltip content should not be used as a full text alternative for truncated content.
