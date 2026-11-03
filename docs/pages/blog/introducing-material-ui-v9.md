---
title: Material UI v9.0
description: 'Material UI v9.0 for developers: theming, accessibility, keyboard navigation, performance, and new Base UI-powered additions.'
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['Material UI', 'Product']
manualCard: false
hideFromHomeList: true
---

<style>
  /* `object-fit: contain` avoids WebKit autoplay issues vs. layout `cover` on video. */
  /* `clip-path: inset(1px)` trims one decoded pixel per edge (common macroblock/ringing artifacts). */
  .markdown-body video {
    object-fit: contain !important;
    clip-path: inset(1px);
  }
</style>

Material UI v9 is here.
This release focuses on what developers feel immediately: better accessibility defaults, more reliable keyboard navigation, and theming foundations that make CSS integration smoother.

For line‑item changes, follow the [Material UI releases](https://github.com/mui/material-ui/releases) timeline.

This new major is part of a coordinated effort across the entire product suite; for a complete look at the MUI ecosystem changes, check out the [Introducing Material UI and MUI X v9](/blog/introducing-mui-v9/) blog post.

## Table of contents

- [NumberField](#numberfield)
- [Menubar and submenus](#menubar-and-submenus)
- [Theme and CSS variables](#theme-and-css-variables)
  - [Derived colors with `color-mix()`](#derived-colors-with-color-mix)
  - [Tooltip docs clarity and `nativeColor` fixes](#tooltip-docs-clarity-and-nativecolor-fixes)
- [Interaction and accessibility fixes](#interaction-and-accessibility-fixes)
  - [Autocomplete, Backdrop, Tooltip](#autocomplete-backdrop-tooltip)
- [Platform cleanup](#platform-cleanup)
- [Keyboard navigation](#keyboard-navigation)
  - [Roving tabindex across menus and navigation](#roving-tabindex-across-menus-and-navigation)
  - [Autocomplete](#autocomplete)
  - [CSS rule cleanup (partial revert)](#css-rule-cleanup-partial-revert)
  - [Repository note](#repository-note)
- [Breaking changes and migration](#breaking-changes-and-migration)
- [What's next](#whats-next)

## NumberField

Base UI adoption is expanding across Material UI: for now through component recipes, with more native Material UI surfaces to follow.
`NumberField` is the first new primitive in this cycle built on that stack: a focused control for numeric input with consistent accessibility and styling hooks.

<figure>
  <video
    src="/static/blog/introducing-material-ui-v9/number-field.mp4"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    controls
    width="992"
    height="562"
    style="width: 496px; border-radius: 0; border: 0;"
  >
    <source src="/static/blog/introducing-material-ui-v9/number-field.mp4" type="video/mp4" />
  </video>
  <figcaption>NumberField, implemented on Base UI.</figcaption>
</figure>

See the [NumberField](/material-ui/react-number-field/) documentation for API details and examples.

## Menubar and submenus

`Menubar` is the other new Base UI-backed surface in v9: a horizontal menu bar pattern with strong keyboard support, aligned with how menus and navigation are modeled in Base UI.
On this stack, we can finally support submenus, nested menus off the bar, instead of stopping at a single-level strip.

<figure>
  <video
    src="/static/blog/introducing-material-ui-v9/menubar.mp4"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    controls
    width="1462"
    height="998"
    style="border: 0; width: 731px;"
  >
    <source src="/static/blog/introducing-material-ui-v9/menubar.mp4" type="video/mp4" />
  </video>
  <figcaption>Menubar with submenus and keyboard-friendly navigation.</figcaption>
</figure>

Together, NumberField and Menubar show where we're headed in v9: wider Base UI adoption in Material UI, and interactions, including keyboard support, that stay clear and consistent even in dense UIs.

See the [Menubar](/material-ui/react-menubar/) documentation for API details and examples.

## Theme and CSS variables

### Derived colors with `color-mix()`

The theme in v9 extends the CSS variables system to generate `color-mix()` values on top of the default Material UI theme variables.
This gives you:

- More precise control over derived colors.
- Better integration with design systems that already rely on `color-mix()` for overlays and surfaces.
- A path to future optimizations where the theme can encode more semantics into variables rather than relying on ad‑hoc runtime logic.

### Tooltip docs clarity and `nativeColor` fixes

- Tooltip documentation now describes the visible text triggers more explicitly, clarifying which interactions and DOM structures are supported.
- We also fixed the `nativeColor` docs to better reflect how it behaves alongside the CSS variables system.

Current behavior and props are documented on the [Tooltip](/material-ui/react-tooltip/) page.

Behind the scenes, we invested in prep work so the codebase could handle the v9 cycle smoothly, including versioning and build changes, plus adjustments that reduce friction for future breaking‑change work.

## Interaction and accessibility fixes

These updates focus on small but important behavior changes, especially around accessibility and event handling.

### Autocomplete, Backdrop, Tooltip

Autocomplete

- Prevent menu opening on right-click so context-menu interactions don't unexpectedly toggle the options list.

Backdrop

- Remove `aria-hidden` by default so the backdrop no longer aggressively hides content from assistive technologies.

ButtonBase

- Ensure `onClick` events propagate correctly when a non‑native button element is clicked.

Dialog and Modal

- Remove the `disableEscapeKeyDown` prop.

TableCell and theme – color mixing for borders

- Apply alpha before color mixing for the `border-bottom` color when `nativeColor` and `cssVariables` are used together.

Theme typing

- Remove `MuiTouchRipple` from theme component types.

Tooltip

- Fix an error when wrapping a disabled input that is focused.

`useAutocomplete` typing

- Improve TypeScript typing for `useAutocomplete`.

## Platform cleanup

Platform and docs infrastructure work in v9 focuses on maintainability and more efficient developer workflows.

Material UI

- Clean up duplicated CSS rules to reduce redundancy and keep output styles more predictable.

- Bundle size improvements.

- `sx` prop performance improvements up to 30% for heavy `sx` usage (details in [PR #44254](https://github.com/mui/material-ui/pull/44254)).

System

- Refactor the container query sorting regex used in the system layer.

## Keyboard navigation

Keyboard navigation and accessibility improvements keep moving the ecosystem forward.

### Roving tabindex across menus and navigation

- Improved roving tabindex keyboard navigation for Stepper, Tabs, and MenuList.
- Additional accessibility improvements for Stepper, MenuList, and Tabs.

Improved roving tabindex focus is a key v9 highlight for keyboard-first components like Menu, Stepper, and Tabs.

### Autocomplete

- Add a `root` slot.
- Support full slots for `clearIndicator` and `popupIndicator`.
- Fix the popup reopening when the window regains focus with `openOnFocus`.

### CSS rule cleanup (partial revert)

- Partially revert duplicated CSS rules cleanup, where it proved too aggressive.

### Repository note

- As part of ongoing repository maintenance, we removed Joy UI code and docs from this repo.

## Breaking changes and migration

The main breaking changes are related to the removal of deprecated props such as `component` and `componentsProps` across the library, the removal of deprecated system props from layout components, and accessibility improvements for Tabs and Menu.

The main benefits of the breaking changes include a roughly 3% bundle size reduction compared to v7 and overall performance gains.

For a consolidated upgrade path from Material UI v7, follow the [Upgrade to v9](/material-ui/migration/upgrade-to-v9/) migration guide.
For earlier majors, find the [v6](/material-ui/migration/upgrade-to-v6/) and [v7](/material-ui/migration/upgrade-to-v7/) upgrade guides.

## What's next

- Remove dependency on Emotion.
- Performance improvements.
- Accessibility improvements.
- Add more components from Base UI.

## Further reading

- [Introducing Material UI and MUI X v9](/blog/introducing-mui-v9/)
- [MUI X Data Grid v9.0](/blog/introducing-mui-x-data-grid-v9/)
- [MUI X Charts v9.0](/blog/introducing-mui-x-charts-v9/)
- [MUI X v9.0: Tree View, Date Pickers](/blog/introducing-mui-x-tree-view-and-pickers-v9/)
- [MUI X Scheduler v9 alpha](/blog/introducing-mui-x-scheduler-v9-alpha/)
- [MUI X Chat v9 alpha](/blog/introducing-mui-x-chat-v9-alpha/)

## We want your feedback

Your input drives our direction.
Join our GitHub communities today to share your insights, report issues, and help shape the future.
Visit [Material UI on GitHub](https://github.com/mui/material-ui).
