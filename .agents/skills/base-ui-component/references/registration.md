# Registration

## Classes

One file per public part, `<name><Part>Classes.ts`, in the standard Material UI form:

```ts
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface PreviewCardPopupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when the popup is open. */
  open: string;
}

export type PreviewCardPopupClassKey = keyof PreviewCardPopupClasses;

export function getPreviewCardPopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPreviewCardPopup', slot);
}

const previewCardPopupClasses: PreviewCardPopupClasses = generateUtilityClasses(
  'MuiPreviewCardPopup',
  ['root', 'open'],
);

export default previewCardPopupClasses;
```

Add a class for each slot and for each Base UI state that users style (`open`, `highlighted`, `checked`). Use the global `Mui-disabled` and `Mui-focusVisible` classes where they apply.

## Data attributes

Base UI documents the `data-*` attributes of each part in `<part>/<Part>DataAttributes.d.ts` inside the installed `@base-ui/react`, but does not export them. Export them from the part's folder, next to its classes:

```ts
// previewCardPopupDataAttributes.ts
export const previewCardPopupDataAttributes = {
  /** Present when the preview card is open. */
  open: 'data-open',
  /** Present when the preview card is closed. */
  closed: 'data-closed',
  /** Present when the preview card begins animating in. */
  startingStyle: 'data-starting-style',
  /** Present when the preview card is animating out. */
  endingStyle: 'data-ending-style',
  /** The side the popup is positioned on. */
  side: 'data-side',
  /** The alignment of the popup relative to its side. */
  align: 'data-align',
} as const;
```

Copy the names and descriptions from the Base UI `DataAttributes` file of each part that renders an element.
This object's shape is proposed; Lukas owns the final decision. Keep it in this one file per part so a rename is a one-place edit.

## Part `index.ts`

```ts
export { default } from './PreviewCardPopup';
export * from './PreviewCardPopup';
export { default as previewCardPopupClasses } from './previewCardPopupClasses';
export * from './previewCardPopupClasses';
export * from './previewCardPopupDataAttributes';
```

## Exports and dependency

In `packages/mui-material/package.json`:

- Add `"@base-ui/react": "^1.9.0"` to `dependencies` if it is not there yet. It is a direct dependency, not a peer. Use the same range as the `docs` catalog in `pnpm-workspace.yaml`.
- Add one `exports` entry per public part: `"./Unstable_PreviewCardPopup": "./src/Unstable_PreviewCardPopup/index.ts"`.

Do not add the parts to `packages/mui-material/src/index.js` or `index.d.ts`. The root barrel export waits until the component is stable.

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
import type { PreviewCardPopupProps } from '../Unstable_PreviewCardPopup';
MuiPreviewCardPopup: PreviewCardPopupProps;

// overrides.ts
import type { PreviewCardPopupClassKey } from '../Unstable_PreviewCardPopup';
MuiPreviewCardPopup: PreviewCardPopupClassKey;
```

Parts without styles (root, trigger) get only `defaultProps` in `components.ts` and an entry in `props.ts`.

Theme types are registered by default; users need no augmentation import. TypeScript 5 is the supported minimum.

## Unstable naming

- Folders and subpaths carry `Unstable_` (`Unstable_PreviewCardPopup`).
- Component identifiers, types, classes, theme keys, and the docs route do not (`PreviewCardPopup`, `MuiPreviewCardPopup`, `/material-ui/react-preview-card/`).
