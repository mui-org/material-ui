---
name: base-ui-component
description: Build a new Material UI component on top of a Base UI (`@base-ui/react`) part, from package source through theme registration, tests, and docs demos. Use when adding a Material UI component whose behavior comes from Base UI, such as a preview card, meter, OTP field, or menubar.
---

# Build a Material UI component on Base UI

Base UI owns behavior; Material UI owns presentation.
The finished component is _indistinguishable_ from any other Material UI component in theming, imports, tests, and docs.
The only new thing is the Base UI part underneath.

Scope: **new components**, ones Material UI has never had (number field, preview card, menubar).
A Base UI successor to an existing component (Menu v2 replacing Menu) ships under `Unstable_<Name>2` subpaths with a migration guide; this skill does not cover it.

`<Name>` below stands for the component name, such as `PreviewCard`; `<name>` is its camelCase form and `<kebab-name>` its kebab-case form.

## API rules

These rules were decided by the Material UI team on 2026-11-04. Apply every one of them.

1. **`render`, not `children` or `component`.** Parts that change their rendered element take a public `render` prop. A trigger requires `render`, because users choose the styled trigger they want (`<PreviewCardTrigger render={<Button>Open</Button>} />`). No part accepts `component`. Parts keep `slots.root`.
2. **Open parts.** When users assemble the component (a root, a trigger, a popup, items), each piece is its own public part. One public part may wrap several Base UI parts for ease of use, as a popup wraps Portal, Positioner, and Popup. `slots` and `slotProps` reach each wrapped part.
3. **Flat names.** Export PascalCase parts (`PreviewCardTrigger`). There is no namespace object (`PreviewCard.Trigger`).
4. **Base UI names for behavior.** Props for logic and event handlers keep Base UI names and signatures (`onOpenChange(open, eventDetails)`, `side`, `align`, `delay`), selected from Base UI types with `Pick`. Presentation props keep Material UI names (`size`, `color`, `variant`, `elevation`, `disableRipple`).
5. **Styling hooks.** Utility classes and `ownerState` carry live Base UI state. The Base UI data attributes are re-exported from Base UI and documented. Users style live state with these classes and data attribute constants in `styleOverrides`; `variants` match props only.
6. **Stable exports.** Each public part is a `@mui/material/<Name><Part>` subpath and a root `@mui/material` export, with a `Mui<Name><Part>` theme key.

## Steps

### 1. Map the Base UI parts

Read the Base UI docs and types for the component. They ship with the package installed for the docs: `docs/node_modules/@base-ui/react/docs/react/components/<kebab-name>.md` and `docs/node_modules/@base-ui/react/<kebab-name>/**/*.d.ts`.

Choose the shape:

- **Single component**: users render one element tree and configure it with props, like `TextField` or `LinearProgress`. Read [references/single-component.md](references/single-component.md).
- **Compound parts**: users compose a trigger, a popup, and items. Read [references/compound-parts.md](references/compound-parts.md).

Done when a table, written into the PR description (or your final report when there is no PR), lists every export of the Base UI component (every part, plus helpers such as `createHandle`) with its role: public part, slot of a named part, internal, or not exposed with the reason. Each rendered row names the existing Material UI component it builds on (`Paper`, `ButtonBase`, `FormControl`, `List`) or says it is a new styled element, and gives its slot name.

### 2. Write the types

Follow [references/adapter.md](references/adapter.md#types).

Done when every public prop of every part is accounted for as one of: a picked Base UI prop, a Material UI presentation prop, a common prop (`render`, `slots`, `slotProps`, `classes`, `className`, `style`, `sx`), or an HTML attribute of the rendered element, and each declared prop has a JSDoc comment.

### 3. Implement each part

Read [references/verify.md](references/verify.md) once, then follow [references/adapter.md](references/adapter.md).
Every Base UI part renders through its `render` callback into a Material styled slot, and every slot goes through `useSlot`.

Done when each row of the step 1 table has its part or slot implemented, and no Base UI prop reaches the DOM unless it was picked.

### 4. Register the component

Follow [references/registration.md](references/registration.md): classes, data attributes, theme types, exports, and the `@base-ui/react` dependency.

Done when a `createTheme({ components: { Mui<Name><Part>: { defaultProps, styleOverrides, variants } } })` call type-checks for every styled part, and every part imports from both its subpath (`@mui/material/<Name><Part>`, or `@mui/material/<Name>` for a single component) and `@mui/material`.

### 5. Test

Follow [references/testing.md](references/testing.md).

Done when every rendered part passes `describeConformance`, every behavior the docs page shows has a test through the Material UI part, and each re-exported data attribute is asserted in a test.

### 6. Document

Follow [references/docs.md](references/docs.md).
The docs demos are the proof that the component works: each one must render in the browser.

Done when the page has a demo for each feature in the Base UI docs that the component exposes, plus a customization section, and every demo renders without console errors.

### 7. Verify

Run, in this order:

1. `pnpm proptypes`, then `pnpm docs:api`. Both write files; keep their output.
2. `pnpm prettier`. `docs:api` writes JSDoc into component files, so format after it.
3. `pnpm typescript` and `pnpm test:unit <Name>`.
4. `pnpm exec eslint --max-warnings 0 <changed files>`. The full `pnpm eslint` run also reports errors from outside your change.

Then go through every check in [references/verify.md](references/verify.md).

Done when every command passes and every check in `verify.md` is ticked, with the evidence (test name, command output, or file and line) written next to it in your final report.
