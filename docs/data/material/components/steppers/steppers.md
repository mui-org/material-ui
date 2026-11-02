---
productId: material-ui
title: React Stepper component
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
githubLabel: 'scope: stepper'
materialDesign: https://m1.material.io/components/steppers.html
githubSource: packages/mui-material/src/Stepper
---

# Stepper

<p class="description">Steppers convey progress through numbered steps. It provides a wizard-like workflow.</p>

Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation.
Steppers may display a transient feedback message after a step is saved.

- **Types of Steps**: Editable, Non-editable, Mobile, Optional
- **Types of Steppers**: Horizontal, Vertical, Linear, Non-linear

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

:::info
This component is no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support it.
:::

## Introduction

The Stepper component displays progress through a sequence of logical and numbered steps.
It supports horizontal and vertical orientation for desktop and mobile viewports.

Steppers are implemented using a collection of related components:

- Stepper: the container for the steps.
- Step: an individual step in the sequence.
- Step Label: a label for a Step.
- Step Content: optional content for a Step.
- Step Button: optional button for a Step.
- Step Icon: optional icon for a Step.
- Step Connector: optional customized connector between Steps.

## Basics

```jsx
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
```

## Horizontal stepper

Horizontal steppers are ideal when the contents of one step depend on an earlier step.

Avoid using long step names in horizontal steppers.

### Linear

A linear stepper allows the user to complete the steps in sequence.

The `Stepper` can be controlled by passing the current step index (zero-based) as the `activeStep` prop. `Stepper` orientation is set using the `orientation` prop.

This example also shows the use of an optional step by placing the `optional` prop on the second `Step` component. Note that it's up to you to manage when an optional step is skipped. Once you've determined this for a particular step you must set `completed={false}` to signify that even though the active step index has gone beyond the optional step, it's not actually complete.

{{"component": "file://./demos/horizontal-linear/index.ts"}}

### Non-linear

Non-linear steppers allow the user to enter a multi-step flow at any point.

This example is similar to the regular horizontal stepper, except steps are no longer automatically set to `disabled={true}` based on the `activeStep` prop.

The use of the `StepButton` here demonstrates clickable step labels, as well as setting the `completed`
flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to
determine when all steps are completed (or even if they need to be completed).

Actionable steps mean that they control the content update of a section. From an accessibility standpoint, this means that each `StepButton` requires an `aria-controls` attribute pointing at the content section element.

{{"component": "file://./demos/horizontal-non-linear/index.ts"}}

### Alternative label

Labels can be placed below the step icon by setting the `alternativeLabel` prop on the `Stepper` component.

{{"component": "file://./demos/horizontal-linear-alternative-label/index.ts"}}

### Error step

{{"component": "file://./demos/horizontal-with-error/index.ts"}}

### Customized horizontal stepper

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

## Vertical stepper

Vertical steppers are designed for narrow screen sizes. They are ideal for mobile. All the features of the horizontal stepper can be implemented.

{{"component": "file://./demos/vertical-linear/index.ts"}}

### Alternative label

Use `alternativeLabel` prop on the vertical `Stepper` component to reverse the placement of the label and content.

{{"component": "file://./demos/vertical-linear-alternative-label/index.ts"}}

## Transition

`StepContent` uses [Collapse](/material-ui/transitions/#collapse) by default.
Use `slots.transition` and `slotProps.transition` to replace it with another transition or to pass transition props.

## Performance

The content of a step is unmounted when closed.
If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to keep the step mounted with:

```jsx
<StepContent slotProps={{ transition: { unmountOnExit: false } }} />
```

## Mobile stepper

This component implements a compact stepper suitable for a mobile device. It has more limited functionality than the vertical stepper. See [mobile steps](https://m1.material.io/components/steppers.html#steppers-types-of-steps) for its inspiration.

The mobile stepper supports three variants to display progress through the available steps: text, dots, and progress.

### Text

The current step and total number of steps are displayed as text.

{{"component": "file://./demos/text-mobile/index.ts", "bg": true}}

### Dots

Use dots when the number of steps is small.

{{"component": "file://./demos/dots-mobile/index.ts", "bg": true}}

### Progress

Use a progress bar when there are many steps, or if there are steps that need to be inserted during the process (based on responses to earlier steps).

{{"component": "file://./demos/progress-mobile/index.ts", "bg": true}}
