---
name: base-ui-component
description: Build a new Material UI component on top of a Base UI (`@base-ui/react`) part, from package source through theme registration, tests, and docs demos. Use when adding a Material UI component whose behavior comes from Base UI, such as a preview card, meter, OTP field, or menubar.
---

# Build a Material UI component on Base UI

Base UI owns behavior; Material UI owns presentation.
The finished component is _indistinguishable_ from any other Material UI component in theming, imports, tests, and docs.
The only new thing is the Base UI part underneath.

Scope: new components without a Material UI predecessor.
A successor to an existing component (for example, Menu v2 replacing Menu) also needs a migration guide, which this skill does not cover.

`<Name>` below stands for the component name, such as `PreviewCard`; `<name>` is its camelCase form.

## API rules

These rules were decided by the Material UI team on 2026-11-04. Apply every one of them.

1. **`render`, not `children` or `component`.** Parts that change their rendered element take a public `render` prop. A trigger requires `render`, because users choose the styled trigger they want (`<PreviewCardTrigger render={<Button>Open</Button>} />`). No part accepts `component`. Parts keep `slots.root`.
2. **Open parts.** When users assemble the component (a root, a trigger, a popup, items), each piece is its own public part. One public part may wrap several Base UI parts for ease of use, as a popup wraps Portal, Positioner, and Popup. `slots` and `slotProps` reach each wrapped part.
3. **Flat names.** Export PascalCase parts (`PreviewCardTrigger`), one subpath each. There is no namespace object (`PreviewCard.Trigger`).
4. **Base UI names for behavior.** Props for logic and event handlers keep Base UI names and signatures (`onOpenChange(open, eventDetails)`, `side`, `align`, `delay`), selected from Base UI types with `Pick`. Presentation props keep Material UI names (`size`, `color`, `variant`, `elevation`, `disableRipple`).
5. **No proptypes.** New components ship without generated `propTypes`.
6. **Styling hooks.** Utility classes and `ownerState` carry live Base UI state, and the Base UI `data-*` attributes are a public styling contract, exported the way classes are.
7. **Unstable subpaths.** Ship under `@mui/material/Unstable_<Name>` subpaths only, with theme keys `Mui<Name>` and an unstable docs page.

## Steps

### 1. Map the Base UI parts

Read the Base UI docs and types for the component.
They ship with the package: `docs/react/components/<kebab-name>.md` and `<kebab-name>/**/*.d.ts` inside the installed `@base-ui/react` (find it with `pnpm -F @mui/material exec node -p "require.resolve('@base-ui/react/package.json')"`).

Choose the shape:

- **Single component**: users render one element tree and configure it with props, like a text field. Read [references/single-component.md](references/single-component.md).
- **Compound parts**: users compose a trigger, a popup, and items. Read [references/compound-parts.md](references/compound-parts.md).

Done when a table lists every Base UI part with its role (public part, slot of a named part, or internal), the existing Material UI component it renders (`Paper`, `ButtonBase`, `FormControl`, `List`) or the new styled element, and its slot name.

### 2. Write the types

Follow [references/adapter.md](references/adapter.md#types).

Done when every public prop of every part is accounted for as one of: a picked Base UI prop, a Material UI presentation prop, or a common prop (`render`, `slots`, `slotProps`, `classes`, `className`, `style`, `sx`).

### 3. Implement each part

Follow [references/adapter.md](references/adapter.md).
Every Base UI part renders through its `render` callback into a Material styled slot, and every slot goes through `useSlot`.

Done when each row of the step 1 table has its part or slot implemented, and no Base UI prop reaches the DOM unless it was picked.

### 4. Register the component

Follow [references/registration.md](references/registration.md): classes, data attributes, theme types, subpath exports, and the `@base-ui/react` dependency.

Done when a `createTheme({ components: { Mui<Name>: { defaultProps, styleOverrides, variants } } })` call type-checks for every part, and every part imports from its `@mui/material/Unstable_<Name>…` subpath.

### 5. Test

Follow [references/testing.md](references/testing.md).

Done when every rendered part passes `describeConformance`, every behavior the docs page shows has a test through the Material UI part, and the documented `data-*` attributes are pinned by a test.

### 6. Document

Follow [references/docs.md](references/docs.md).
The docs demos are the proof that the component works: each one must render in the browser.

Done when the page has a demo for each feature in the Base UI docs that the component exposes, plus a customization section, and every demo renders without console errors.

### 7. Verify

Run the commands from `AGENTS.md`: `pnpm prettier`, `pnpm eslint`, `pnpm typescript`, `pnpm test:unit <Name>`, and `pnpm docs:api`.

Done when all five pass and `git status` shows no generated file left out of the change.

## Pitfalls

- A Base UI `render` element's own props win over the part's props, including `children`. Event handlers are chained, and `className` and `style` are merged.
- `ButtonBase` emulates a click on Enter and Space. When a Base UI part already handles those keys, set `event.defaultMuiPrevented = true` in the slot's key handlers, or the action runs twice.
- Base UI animates the popup root with CSS (`data-starting-style`, `data-ending-style`). A Material transition must clone that element without adding a wrapper.
- Base UI focus-guard elements sit between siblings, so sibling combinators such as `item + divider` break. Each part owns its own spacing.
- Base UI states are present-or-absent attributes: select `[data-open]`, not `[data-open="true"]`.
- A form control that renders `FormControl` needs a placeholder child with `muiName = 'Input'` so the label shrink state is right during server rendering. See [references/single-component.md](references/single-component.md).
