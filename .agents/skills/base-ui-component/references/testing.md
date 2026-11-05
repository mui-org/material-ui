# Testing

Unit tests live next to each part: `packages/mui-material/src/<Name><Part>/<Name><Part>.test.tsx`. Run them with `pnpm test:unit <Name>`; each file runs in jsdom and in Chromium.

Import `describe`, `it`, and `expect` from `vitest`. Mark tests that need real layout or computed styles `it.skipIf(isJsdom())`, with `isJsdom` from `@mui/internal-test-utils`.

## Conformance

Every part that renders an element runs `describeConformance` from `packages/mui-material/test/describeConformance`:

```tsx
import { createRenderer, screen } from '@mui/internal-test-utils';
import describeConformance from '../../test/describeConformance';

describeConformance(<PreviewCardPopup>Content</PreviewCardPopup>, () => ({
  classes: previewCardPopupClasses,
  render: (node) =>
    render(
      <PreviewCard defaultOpen>
        <PreviewCardTrigger render={<a href="#">Link</a>} />
        {node}
      </PreviewCard>,
    ),
  getRootElement: () => screen.getByText('Content').closest(`.${previewCardPopupClasses.root}`),
  inheritComponent: Paper,
  muiName: 'MuiPreviewCardPopup',
  refInstanceof: window.HTMLDivElement,
  testVariantProps: { elevation: 2 },
  skip: ['componentProp'],
  slots: {
    portal: { expectedClassName: previewCardPopupClasses.portal },
    positioner: { expectedClassName: previewCardPopupClasses.positioner },
  },
}));
```

- `skip: ['componentProp']` on every part, because no part accepts `component`.
- Parts that live in a portal need `getRootElement`. Parts that need a parent (a popup needs its root) wrap the node in `render`.
- A trigger only forwards its picked props to the user's element, so it runs `only: ['refForwarding']` with `classes: { root: '' }`.
- Parts that render no element (root) get behavior tests only.

## Behavior

Test through the Material UI parts, not the Base UI ones:

- Each behavior the docs page shows: open and close (pointer, keyboard, Escape, outside press), value changes, disabled and read-only states.
- Controlled and uncontrolled state, with the Base UI callback signature (`onOpenChange(open, eventDetails)`, asserting `eventDetails.reason`).
- Theme `defaultProps`, `styleOverrides`, and `variants` reaching each part, and a `styleOverrides` rule that targets a live-state class.
- Server rendering with `createRenderer().renderToString` for parts whose first render depends on state (form fields, formatted values).

jsdom runs no CSS animations, so a closing popup unmounts at once; in Chromium the exit transition keeps it mounted with the closed data attribute. Assert the close through `onOpenChange`, plus "absent, or present with the closed data attribute".

## `render`

For each part with a public `render` prop:

- A trigger renders the user's element with Base UI's attributes and handlers, the user's handlers still run, and opening works.
- A styled part rendered with `render={<section />}` is a `<section>` that keeps its own root class, the classes of its Material base (`MuiPaper-root`, `MuiPaper-elevation8`), its theme styles, and its Base UI behavior and data attributes. No Material prop such as `elevation` appears as a DOM attribute.
- A render function receives the Base UI state (`state.open`, `state.side`).
- The user's `render` element's own children replace the part's children, as Base UI defines.
- With `slots.root` set, the custom root receives no `render` or `component` prop.
- A `component` prop passed without types (`// @ts-expect-error`) does not change the element.

## Data attributes

One test per part asserts each re-exported data attribute in its state, using the constants rather than strings:

```tsx
expect(popup).to.have.attribute(PreviewCardPopupDataAttributes.side, 'bottom');
expect(popup).to.have.attribute(PreviewCardPopupDataAttributes.open);
```

## Types

`<Name>.spec.tsx` next to the component, type-checked by `pnpm typescript`:

- The trigger rejects a missing `render`.
- Parts reject `component`, including `slotProps.root.component`, and any Base UI prop that was not picked.
- Parts that render an element accept HTML attributes (`id`, `onClick`, `aria-label`).
- Theme entries accept `defaultProps`, `styleOverrides`, and `variants` for each part.

## Visual and accessibility

- Every docs demo is a visual regression fixture automatically (`test/regressions/README.md`). Add a fixture under `test/regressions/fixtures/<Name>/` only for a state no demo shows, such as an open popup on each side.
- For an overlay, add accessibility fixtures under `test/regressions/a11y/fixtures/<kebab-name>/` that render the open state.
- CI runs the visual and accessibility suites; a local run needs a build and is optional.

## Components without Base UI state

Some Base UI components have an empty state and no data attributes (Meter). Assert that a render function receives an object, skip the data attribute tests, and say on the docs page that the component has no data attributes.
