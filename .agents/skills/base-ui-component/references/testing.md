# Testing

Unit tests live next to each part: `packages/mui-material/src/Unstable_<Name><Part>/<Name><Part>.test.tsx`. Run them with `pnpm test:unit <Name>`.

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
  getRootElement: () => screen.getByText('Content').closest('.MuiPreviewCardPopup-root'),
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
- Parts that render no element (root) get behavior tests only.

## Behavior

Test through the Material UI parts, not the Base UI ones:

- Each behavior the docs page shows: open and close (pointer, keyboard, Escape, outside press), value changes, disabled and read-only states.
- Controlled and uncontrolled state, with the Base UI callback signature (`onOpenChange(open, eventDetails)`).
- Theme `defaultProps`, `styleOverrides`, and `variants` reaching each part, including variants that read live Base UI state from `ownerState`.
- Server rendering with `renderToString` for parts whose first render depends on state (form fields).

## `render`

For each part with a public `render` prop:

- A trigger renders the user's element with Base UI's attributes and handlers, and opening still works.
- A styled part rendered with `render={<a href="/x" />}` is an `<a>`, still has its `Mui<Name><Part>-root` class and theme styles, and keeps its Base UI behavior (activation, highlight, ARIA attributes).
- The user's `render` element's own children replace the part's children, as Base UI defines.

## Data attributes

One test per part asserts each exported data attribute appears with the documented value in the matching state, for example `data-open` on the popup after opening and `data-side="bottom"`.

## Types

`<Name>.spec.tsx` next to the component, type-checked by `pnpm typescript`:

- The trigger rejects a missing `render`.
- Parts reject `component` and any Base UI prop that was not picked.
- Theme entries accept `defaultProps`, `styleOverrides`, and `variants` for each part.

## Visual and accessibility

- Every docs demo is a visual regression fixture automatically (`test/regressions/README.md`). Add a fixture under `test/regressions/fixtures/<Name>/` only for a state no demo shows, such as an open popup on each side.
- For an overlay, add accessibility fixtures under `test/regressions/a11y/fixtures/<name>/` that render the open state.
