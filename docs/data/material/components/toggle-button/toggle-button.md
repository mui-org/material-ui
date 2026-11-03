---
productId: material-ui
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
githubLabel: 'scope: toggle button'
materialDesign: https://m2.material.io/components/buttons#toggle-button
githubSource: packages/mui-material/src/ToggleButton
---

# Toggle Button

<p class="description">A Toggle Button can be used to group related options.</p>

To emphasize groups of related Toggle buttons,
a group should share a common container.
The `ToggleButtonGroup` controls the selected state of its child buttons when given its own `value` prop.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Exclusive selection

With exclusive selection, selecting one option deselects any other.

In this example, text justification toggle buttons present options for left, center, right, and fully justified text (disabled), with only one item available for selection at a time.

**Note**: Exclusive selection does not enforce that a button must be active. For that effect see [enforce value set](#enforce-value-set).

{{"component": "file://./demos/toggle-buttons/index.ts"}}

## Multiple selection

Multiple selection allows for logically-grouped options, like bold, italic, and underline, to have multiple options selected.

{{"component": "file://./demos/multiple/index.ts"}}

## Size

For larger or smaller buttons, use the `size` prop.

{{"component": "file://./demos/sizes/index.ts"}}

## Color

{{"component": "file://./demos/color/index.ts"}}

## Vertical buttons

The buttons can be stacked vertically with the `orientation` prop set to "vertical".

{{"component": "file://./demos/vertical/index.ts"}}

## Enforce value set

If you want to enforce that at least one button must be active, you can adapt your handleChange function.

```jsx
const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};

const handleDevices = (event, newDevices) => {
  if (newDevices.length) {
    setDevices(newDevices);
  }
};
```

{{"component": "file://./demos/not-empty/index.ts"}}

## Standalone toggle button

{{"component": "file://./demos/standalone/index.ts"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized-dividers/index.ts", "bg": true}}

### Spacing

The demos below show how to adjust spacing between toggle buttons in horizontal and vertical orientations.

#### Horizontal Spacing

{{"component": "file://./demos/horizontal-spacing/index.ts"}}

#### Vertical Spacing

{{"component": "file://./demos/vertical-spacing/index.ts"}}

## Accessibility

### ARIA

- ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.
- ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.

### Keyboard

The group uses a single tab stop.
Use the left and right arrow keys to move focus in a horizontal group, or the up and down arrow keys in a vertical group.
The <kbd>Home</kbd> and <kbd>End</kbd> keys move focus to the first and last enabled buttons.
Focus movement wraps, skips disabled buttons, and does not change the selected value.
Press <kbd>Space</kbd> or <kbd>Enter</kbd> to toggle the focused button.
