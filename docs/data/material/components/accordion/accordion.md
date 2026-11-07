---
productId: material-ui
title: React Accordion component
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'scope: accordion'
materialDesign: https://m1.material.io/components/expansion-panels.html
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
githubSource: packages/mui-material/src/Accordion
---

# Accordion

<p class="description">The Accordion component lets users show and hide sections of related content on a page.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

:::info
This component is no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support it.
:::

## Anatomy

{{"component": "file://./demos/usage/index.ts", "bg": true}}

The Accordion components form a header and panel:

- `Accordion`: groups `AccordionSummary` and `AccordionDetails`. Renders a `<div>` element.
- `AccordionSummary`: a trigger that expands or collapses the panel. Renders an `h3` containing a `<button>` element.
- `AccordionDetails`: contains the panel content. Renders a `<div>` element.
- `AccordionActions`: groups actions for the panel. Renders a `<div>` element.

```jsx title="Anatomy"
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';

<Accordion>
  <AccordionSummary>Delivery options</AccordionSummary>
  <AccordionDetails>
    Choose standard shipping, scheduled delivery, or pickup based on what is
    available for your order.
  </AccordionDetails>
  <AccordionActions>
    <Button>Cancel</Button>
    <Button>Save</Button>
  </AccordionActions>
</Accordion>;
```

## Usage guidelines

- **Make summaries descriptive**: The summary is the accordion header button, so it should clearly identify the content that expands.
- **Avoid nested controls**: `AccordionSummary` renders a button, so don't put buttons, links, or other interactive elements inside it. Place those controls in `AccordionDetails` or `AccordionActions` instead.

## Basics

### Expand icon

Use the `expandIcon` prop on the Accordion Summary component to change the expand indicator icon.
The component handles the turning upside-down transition automatically.

{{"component": "file://./demos/expand-icon/index.ts", "bg": true}}

### Expanded by default

Use the `defaultExpanded` prop on the Accordion component to have it opened by default.

{{"component": "file://./demos/expand-default/index.ts", "bg": true}}

### Actions

Use the `AccordionActions` component to group buttons related to the panel content.

```jsx
<Accordion>
  <AccordionSummary>Notification preferences</AccordionSummary>
  <AccordionDetails>
    Choose which account alerts are sent by email, SMS, or push notification.
  </AccordionDetails>
  <AccordionActions>
    <Button>Cancel</Button>
    <Button>Save</Button>
  </AccordionActions>
</Accordion>
```

### Disabled item

Use the `disabled` prop on the Accordion component to disable interaction and focus.

{{"component": "file://./demos/disabled/index.ts", "bg": true}}

## Customization

### Heading level

By default, the Accordion uses an `h3` element for the heading. You can change the heading element using the `slotProps.heading.component` prop to ensure the correct heading hierarchy in your document.

```jsx
<Accordion slotProps={{ heading: { component: 'h4' } }}>
  <AccordionSummary>Shipping methods</AccordionSummary>
  <AccordionDetails>
    Choose how quickly your order should arrive and whether you want delivery updates
    by email or SMS.
  </AccordionDetails>
</Accordion>
```

### Controlled accordion

The Accordion component can be controlled or uncontrolled.

{{"component": "file://./demos/controlled/index.ts", "bg": true}}

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

### Only one expanded at a time

Use the `expanded` prop with React's `useState` hook to allow only one Accordion item to be expanded at a time.
The demo below also shows a bit of visual customization.

{{"component": "file://./demos/customized/index.ts", "bg": true}}

### Transition

Use the `slots.transition` and `slotProps.transition` props to change the Accordion's default transition.

{{"component": "file://./demos/transition/index.ts", "bg": true}}

### Unmounting collapsed content

The Accordion content is mounted by default even if it's not expanded.
This default behavior has server-side rendering and SEO in mind.

If you render the Accordion Details with a big component tree nested inside, or if you have many Accordions, you may want to change this behavior by setting `unmountOnExit` to `true` inside the `slotProps.transition` prop to improve performance:

```jsx
<Accordion slotProps={{ transition: { unmountOnExit: true } }} />
```
