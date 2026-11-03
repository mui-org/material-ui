---
productId: material-ui
title: Backdrop React Component
components: Backdrop
githubLabel: 'scope: backdrop'
githubSource: packages/mui-material/src/Backdrop
---

# Backdrop

<p class="description">The Backdrop component is a low-level utility that adds a dimmed layer over the application.</p>

Backdrop is normally used through higher-level components such as [Dialog](/material-ui/react-dialog/) and [Modal](/material-ui/react-modal/), which already include it and handle focus and assistive technology.

Most apps should not use Backdrop directly. Reach for it only when you need a custom overlay (for example, a full-screen loader).

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Example

The demo below shows a basic Backdrop with a Circular Progress component in the foreground to indicate a loading state.
After clicking **Show Backdrop**, you can click anywhere on the page to close it.

{{"component": "file://./demos/simple/index.ts"}}

## Transitions

Backdrop uses [Fade](/material-ui/transitions/#fade) by default.
Use `slots.transition` and `slotProps.transition` to replace it with another transition or to pass transition props.
