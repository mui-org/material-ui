# Registration

## Classes

One file per public part that has styles, `<name><Part>Classes.ts`, in the standard Material UI form:

```ts
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface PreviewCardPopupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when the popup is open. */
  open: string;
  /** Styles applied to the portal element. */
  portal: string;
  /** Styles applied to the positioner element. */
  positioner: string;
}

export type PreviewCardPopupClassKey = keyof PreviewCardPopupClasses;

export function getPreviewCardPopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPreviewCardPopup', slot);
}

const previewCardPopupClasses: PreviewCardPopupClasses = generateUtilityClasses(
  'MuiPreviewCardPopup',
  ['root', 'open', 'portal', 'positioner'],
);

export default previewCardPopupClasses;
```

Add a class for each slot and for each Base UI state that users style (`open`, `highlighted`, `checked`). Use the global `Mui-disabled` and `Mui-focusVisible` classes where they apply. Parts without styles (a root, a trigger) have no classes file.

## Data attributes

Base UI exports the data attributes of each part as a namespace of constants, for example `PreviewCardPopupDataAttributes.open === 'data-open'`. Re-export them from the matching Material part, so users style live state without writing attribute strings:

```ts
// PreviewCardPopup/index.ts
export { PreviewCardPopupDataAttributes } from '@base-ui/react/preview-card';
```

- Re-export the namespace of every Base UI part that the Material part renders, including the ones behind its slots (`PreviewCardPositionerDataAttributes` from `PreviewCardPopup`).
- A Base UI part without a `DataAttributes` export (Meter) has none to re-export.
- The API docs generator does not read re-exported constants. List the attributes on the docs page instead (see [docs.md](docs.md)).

## Part `index.ts`

```ts
export { default } from './PreviewCardPopup';
export * from './PreviewCardPopup';
export { default as previewCardPopupClasses } from './previewCardPopupClasses';
export * from './previewCardPopupClasses';
export {
  PreviewCardPopupDataAttributes,
  PreviewCardPositionerDataAttributes,
} from '@base-ui/react/preview-card';
```

## Exports and dependency

In `packages/mui-material/package.json`:

- Add `"@base-ui/react"` to `dependencies` if it is not there yet, with the same range as the `docs` catalog in `pnpm-workspace.yaml`. It is a direct dependency, not a peer.
- Add one `exports` entry per public part: `"./PreviewCardPopup": "./src/PreviewCardPopup/index.ts"`. The `./*` wildcard only resolves `index.js` files.

In `packages/mui-material/src/index.js` and `index.d.ts`, add each part in alphabetical order:

```ts
export { default as PreviewCardPopup } from './PreviewCardPopup';
export * from './PreviewCardPopup';
```

## Theme types

For every public part, add an entry in three files under `packages/mui-material/src/styles/`:

```ts
// components.ts
MuiPreviewCardPopup?:
  | {
      defaultProps?: ComponentsProps['MuiPreviewCardPopup'] | undefined;
      styleOverrides?: ComponentsOverrides<Theme>['MuiPreviewCardPopup'] | undefined;
      variants?: ComponentsVariants<Theme>['MuiPreviewCardPopup'] | undefined;
    }
  | undefined;

// props.ts
import type { PreviewCardPopupProps } from '../PreviewCardPopup';
MuiPreviewCardPopup: PreviewCardPopupProps;

// overrides.ts
import type { PreviewCardPopupClassKey } from '../PreviewCardPopup';
MuiPreviewCardPopup: PreviewCardPopupClassKey;
```

Parts without styles (root, trigger) get only `defaultProps` in `components.ts` and an entry in `props.ts`.

Theme `variants` type `ownerState` as the component's props, so a `variants` matcher cannot read live Base UI state. Users style live state in `styleOverrides` with the classes and data attribute constants:

```ts
MuiPreviewCardPopup: {
  styleOverrides: {
    root: {
      [`&.${previewCardPopupClasses.open}`]: { boxShadow: 'none' },
      [`&[${PreviewCardPopupDataAttributes.side}="top"]`]: { marginBottom: 4 },
    },
  },
},
```
