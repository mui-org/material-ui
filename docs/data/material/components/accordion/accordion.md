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

## Introduction

The Material UI Accordion component includes several complementary utility components to handle various use cases:

- Accordion: the wrapper for grouping related components.
- Accordion Summary: the wrapper for the Accordion header, which expands or collapses the content when clicked.
- Accordion Details: the wrapper for the Accordion content.
- Accordion Actions: an optional wrapper that groups a set of buttons.

{{"component": "file://./demos/usage/index.ts", "bg": true}}

:::info
This component is no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support it.
:::

## Basics

```jsx
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
```

### Expand icon

Use the `expandIcon` prop on the Accordion Summary component to change the expand indicator icon.
The component handles the turning upside-down transition automatically.

{{"component": "file://./demos/expand-icon/index.ts", "bg": true}}

### Expanded by default

Use the `defaultExpanded` prop on the Accordion component to have it opened by default.

{{"component": "file://./demos/expand-default/index.ts", "bg": true}}

### Transition

Use the `slots.transition` and `slotProps.transition` props to change the Accordion's default transition.

{{"component": "file://./demos/transition/index.ts", "bg": true}}

### Disabled item

Use the `disabled` prop on the Accordion component to disable interaction and focus.

{{"component": "file://./demos/disabled/index.ts", "bg": true}}

### Controlled Accordion

The Accordion component can be controlled or uncontrolled.

{{"component": "file://./demos/controlled/index.ts", "bg": true}}

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

## Customization

### Only one expanded at a time

Use the `expanded` prop with React's `useState` hook to allow only one Accordion item to be expanded at a time.
The demo below also shows a bit of visual customization.

{{"component": "file://./demos/customized/index.ts", "bg": true}}

### Changing heading level

By default, the Accordion uses an `h3` element for the heading. You can change the heading element using the `slotProps.heading.component` prop to ensure the correct heading hierarchy in your document.

```jsx
<Accordion slotProps={{ heading: { component: 'h4' } }}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
  >
    Accordion
  </AccordionSummary>
  <AccordionDetails>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
    lacus ex, sit amet blandit leo lobortis eget.
  </AccordionDetails>
</Accordion>
```

## Performance

The Accordion content is mounted by default even if it's not expanded.
This default behavior has server-side rendering and SEO in mind.

If you render the Accordion Details with a big component tree nested inside, or if you have many Accordions, you may want to change this behavior by setting `unmountOnExit` to `true` inside the `slotProps.transition` prop to improve performance:

```jsx
<Accordion slotProps={{ transition: { unmountOnExit: true } }} />
```

## Accessibility

The [WAI-ARIA guidelines for accordions](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) recommend setting an `id` and `aria-controls`, which in this case would apply to the Accordion Summary component.
The Accordion component then derives the necessary `aria-labelledby` and `id` from its content.

```jsx
<Accordion>
  <AccordionSummary id="panel-header" aria-controls="panel-content">
    Header
  </AccordionSummary>
  <AccordionDetails>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </AccordionDetails>
</Accordion>
```

## Anatomy

The Accordion component consists of a root `<div>` that contains the Accordion Summary, Accordion Details, and optional Accordion Actions for action buttons.

```jsx
<div class="MuiAccordion-root">
  <h3 class="MuiAccordion-heading">
    <button class="MuiButtonBase-root MuiAccordionSummary-root" aria-expanded="">
      <!-- Accordion summary goes here -->
    </button>
  </h3>
  <div class="MuiAccordion-region" role="region">
    <div class="MuiAccordionDetails-root">
      <!-- Accordion content goes here -->
    </div>
  </div>
</div>
```
