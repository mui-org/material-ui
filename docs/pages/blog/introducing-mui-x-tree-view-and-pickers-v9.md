---
title: 'MUI X v9.0: Tree View, Date Pickers'
description: 'Tree View and Date and Time Pickers in MUI X v9: virtualization-by-default trees, picker field and focus ergonomics, locales, and migration-oriented cleanups.'
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
hideFromHomeList: true
---

In v9, we focused on two areas: large trees that stay fast and predictable, and pickers that behave well with keyboards, forms, and adjacent controls, with locale and adapter coverage that stays aligned with all the other components.

For line‑item changes, follow the [MUI X releases](https://github.com/mui/mui-x/releases) timeline.

This new major is part of a coordinated effort across the entire product suite; for a complete look at the MUI ecosystem changes, check out the [Introducing Material UI and MUI X v9](/blog/introducing-mui-v9/) blog post.

## Table of contents

- [Date and Time Pickers](#date-and-time-pickers)
- [Tree View](#tree-view) [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
- [Migration guides](#migration-guides)

## Date and Time Pickers

Pickers in v9 continue the keyboard‑first calendar work: move through day, month, and year without treating pointer interaction as mandatory.
`fieldRef` stabilizes with `clearValue`, which matters in long forms, filters, and anywhere "reset this field" must be reliable.

We also smoothed focus when dismissing the popover so click‑away is less likely to strand focus on the wrong control, especially near dialogs, drawers, and embedded grid filters.
Locales and adapters expand (for example, `thTH` in step with the Data Grid, and `AdapterDayjsBuddhist` for non‑Gregorian cases); if you use range pickers across zones, re‑validate edge cases after upgrading.

Some cleanup changes are also important in v9:

- [#21966](https://github.com/mui/mui-x/pull/21966): removes `enableAccessibleFieldDOMStructure`; the accessible field DOM is now the only supported mode, with codemod support.
- [#21739](https://github.com/mui/mui-x/pull/21739): removes `PickersDay` and promotes `PickerDay2` as the default day component API.

The [Date and Time Pickers](/x/react-date-pickers/) docs (including migration notes) remain the source of truth for API deltas as v9 stabilizes.

## Tree View [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

Rich Tree View Pro in v9 ships virtualization on by default, with an explicit opt‑out when you need a non‑virtualized layout.
That shift comes with practical defaults. For example, row height is fixed by default; set `itemHeight` when content differs. v9 also changes Rich Tree View Pro events from a nested tree shape to a flat list, as called out in the v9 alpha release notes, which is required to support virtualization.

API and styling hygiene matter too: older model and ref hooks are replaced by the richer variants (`useRichTreeViewApiRef`, `useSimpleTreeViewApiRef`, `useRichTreeViewProApiRef`), `TreeViewBaseItem` is removed in favor of documented model shapes, and state tokens on `treeItemClasses` that encoded expanded/selected styling are dropped in favor of `data-*` attributes you can target in CSS.

If you maintain custom themes or imperative code against trees, budget time to revisit refs, virtualization assumptions, and selectors that depended on the old classes.

Full API notes live in the [Tree View](/x/react-tree-view/) documentation.

## Migration guides

For a complete list of breaking changes and codemod steps, use the dedicated migration guides:

- [Date and Time Pickers: Migration from v8 to v9](/x/migration/migration-pickers-v8/)
- [Tree View: Migration from v8 to v9](/x/migration/migration-tree-view-v8/)

## Further reading

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI v9](/blog/introducing-material-ui-v9/)
- [MUI X Data Grid v9.0](/blog/introducing-mui-x-data-grid-v9/)
- [MUI X Charts v9.0](/blog/introducing-mui-x-charts-v9/)
- [MUI X Scheduler v9 alpha](/blog/introducing-mui-x-scheduler-v9-alpha/)
- [MUI X Chat v9 alpha](/blog/introducing-mui-x-chat-v9-alpha/)

## We want your feedback

Your input drives our direction.
Join our GitHub communities today to share your insights, report issues, and help shape the future.
Visit [MUI X on GitHub](https://github.com/mui/mui-x/issues?q=is%3Aissue%20label%3A%22scope%3A%20tree%20view%22%20OR%20label%3A%22scope%3A%20pickers%22).
