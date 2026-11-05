# Verify

Every check below is a bug that a previous build of a Material UI component on Base UI shipped. Read this file once before step 3, then go through every check in step 7. Each check names how to detect the bug; the fix lives in the reference file in brackets.

## Composition

- [ ] **A styled part's `render` keeps its Material base.** With `render={<section />}`, the element is a `<section>` that still has the base's classes (`MuiPaper-root`, `MuiPaper-elevation8`) and no Material prop as a DOM attribute (`elevation`). Detect: the `render` test. [adapter.md, Public `render`]
- [ ] **A render function receives the Base UI state.** A test reads `state.open` or `state.side` inside `render`. [adapter.md, Public `render`]
- [ ] **A custom `slots.root` receives no render wiring.** No `render`, `renderState`, `component`, or `as` prop arrives. Detect: the `slots.root` test. [adapter.md, Public `render`]
- [ ] **`component` does nothing.** The types reject it on the part and on `slotProps.<slot>`, and a `component` passed from JavaScript does not change the element. Detect: the spec file and a runtime test. [adapter.md, Public component]
- [ ] **No internal prop reaches the DOM.** Inspect the rendered root in a test: no `render`, `classes`, `ownerState`, `elevation`, or unpicked Base UI prop. [adapter.md, Public component]

## Props and types

- [ ] **Parts that render an element accept HTML attributes.** `<Part id="x" onClick={fn} aria-label="y">` type-checks. Detect: the spec file. [adapter.md, Types]
- [ ] **ARIA values that Base UI computes survive.** With the ARIA prop omitted, the attribute Base UI computes (`aria-valuetext`, `aria-labelledby`) is present. Detect: a behavior test without the prop. [adapter.md, Types]
- [ ] **Changed defaults are redeclared.** Every prop whose Material default differs from Base UI's is outside `Pick`, with its own `@default`. Detect: `pnpm docs:api` passes. [adapter.md, Types]
- [ ] **Optional props are typed `| undefined`.** Detect: eslint `mui/add-undef-to-optional`.

## Generated files

- [ ] **propTypes are generated, not written.** `pnpm proptypes` leaves no diff after your final commit.
- [ ] **Internal components live in their own files.** Slot adapters and `RenderElement` are in separate files marked `@ignore - internal component`, and `pnpm proptypes` added no `propTypes` to them. [adapter.md, Files]
- [ ] **No giant propTypes from Base UI types.** A `handle` or other Base UI class instance is `/* @typescript-to-proptypes-ignore */`; `children` and `slots` are not. [adapter.md, Public component]
- [ ] **The API JSON is complete.** For each part, `docs/pages/material-ui/api/<kebab-part>.json` has non-empty `props`, its classes under `classes` or under `slots`, both `@mui/material/<Name><Part>` and `@mui/material` imports, and a non-empty `componentDescription` in the matching translations file. [adapter.md, Public component]
- [ ] **`docs:api` deleted nothing.** `git status` shows no deleted files under `docs/pages/system/api/`. A failed `docs:api` run deletes them; fix the failure and run it again.
- [ ] **Formatting runs last.** `pnpm prettier` after `docs:api` leaves no diff.

## Overlays

- [ ] **`slots.transition = null` renders no `Grow`.** [compound-parts.md, Transition]
- [ ] **The transition's styles land on the popup.** In Chromium, the popup has the `transform` that `Grow` sets while opening. [compound-parts.md, Transition]
- [ ] **`transitionDuration="auto"` works with a custom transition slot** that lacks `muiSupportAuto`. [compound-parts.md, Transition]
- [ ] **The stacking layer matches the closest Material component**: `zIndex.tooltip` for hover-opened, `zIndex.modal` for click-opened. [compound-parts.md, Popup]
- [ ] **A `keepMounted` popup leaves no visible portal when closed.** [compound-parts.md, Popup]
- [ ] **Slots without Base UI state report no live state.** The portal's `ownerState` has no `open` field. [compound-parts.md, Popup]

## Behavior

- [ ] **Items activate once.** Enter and Space on an item built on `ButtonBase` call the action once. [compound-parts.md, Items]
- [ ] **Spacing survives focus guards.** No style relies on a sibling combinator (`item + divider`); each part owns its spacing.
- [ ] **State selectors use presence.** Styles and tests select `[data-open]`, not `[data-open="true"]`.
- [ ] **Closing tests pass in both jsdom and Chromium.** [testing.md, Behavior]
- [ ] **Server and browser render the same text.** Every `Intl` formatting in demos and tests passes a `locale`. [docs.md, Demos]

## Tests

- [ ] **Test files import from `vitest`** and render to a string with `createRenderer().renderToString`. [testing.md]
- [ ] **Every rendered part runs `describeConformance`** with `skip: ['componentProp']`; a trigger runs `only: ['refForwarding']`. [testing.md, Conformance]
- [ ] **Data attributes are asserted with the re-exported constants**, not strings. [testing.md, Data attributes]

## Docs

- [ ] **Every demo has `@focus-start` and `@focus-end`.** Detect: eslint `docs-infra/require-demo-focus`. [docs.md, Demos]
- [ ] **Every demo renders without console errors**, in `pnpm docs:dev` or, when no browser is available, in a temporary test that renders each demo in Chromium and fails on `console.error`. Delete that test before committing.
- [ ] **The anatomy is a `text` block**, and the route file has no leftover name from the file it was copied from. [docs.md]

## Repository

- [ ] **The lockfile changed with the dependency.** `git diff --stat` includes `pnpm-lock.yaml` when `@base-ui/react` was added. [registration.md]
- [ ] **Base UI was read from this checkout.** The version you read docs from equals `docs/node_modules/@base-ui/react/package.json`.
- [ ] **Lint ran on the changed files.** `pnpm exec eslint --max-warnings 0 $(git diff --name-only <base>)` passes.
