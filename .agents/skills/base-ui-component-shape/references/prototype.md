# Prototypes

The recommended shape and each fork variant are **prototypes**: thin wrappers over `@base-ui/react` and existing Material UI components, written as user-land code, the way the Menubar and Number Field docs recipes are. A prototype has no package registration, no theme typings, and no tests. It exists to render the scenarios and to measure what each choice costs.

## Scratch folder

Everything lives in a scratch folder at the repository root that is never committed:

```text
.shape/<kebab-name>/
  shape/recommended.tsx     the parts of the recommended shape
  shape/fork-<name>.tsx     one fork variant: the recommended shape with one part changed
  user-components.tsx       stand-ins for the user's own components
  themes.tsx                the brand theme and the opposite design theme
  frame.tsx                 renders a scenario in one capture state
  scenarios/<scenario>/recommended.tsx
  scenarios/<scenario>/fork-<name>.tsx    only for the scenarios that fork changes
  screenshots/<scenario>/<variant>-<state>.png
  <kebab-name>-shape.md     the RFC
```

Keep it out of git without touching `.gitignore`: add `.shape/` to the file that `git rev-parse --git-path info/exclude` prints. In a git worktree, that file belongs to the main repository and applies to every worktree. If you cannot write that file, leave it alone, and never stage or commit `.shape/`.

`@base-ui/react` is installed only under `docs/node_modules`, so files in `.shape/` cannot resolve it. Link it once:

```bash
mkdir -p .shape/node_modules/@base-ui
ln -s ../../../docs/node_modules/@base-ui/react .shape/node_modules/@base-ui/react
```

## Shape files

`shape/recommended.tsx` is the public API of the recommended shape and nothing more. A fork variant re-exports it and replaces only the part the fork is about, so the two differ in one place:

```tsx
export * from './recommended';
```

Below that line, define the one changed part under its usual name (`export function MenubarItem(…)`). A local export takes precedence over the same name from `export *`.

When the fork removes a part (no `MenubarLinkItem`, for example), the variant still exports that name, as a small wrapper that forwards to the part that replaces it (`MenubarItem` with `href`). The scenario code then shows what users write instead.

Write the parts like this:

- Each public part is a function component that renders a Base UI part with Material UI styles through Base UI `render`, as `docs/data/material/components/menubar/demos/Menubar.tsx` does.
- A part that merges several Base UI parts renders them all and takes `slots` and `slotProps` for the inner ones.
- Style each part with `styled(…, { name: 'Mui<Name><Part>', slot: 'root' })`, so `styleOverrides` in a theme reach it at runtime.
- Read props through `useDefaultProps({ props, name: 'Mui<Name><Part>' })` from `@mui/material/DefaultPropsProvider`, so theme `defaultProps` work too.
- A styled part that accepts a user's `render` keeps its styles on the user's element, the way the build skill does it: see "Public `render`" in `.agents/skills/base-ui-component-build/references/adapter.md`. A prototype that lets the user's element replace the styled one makes a choice look worse for a reason the real component would not have.
- Give a portaled popup the `zIndex` of the closest Material component (`zIndex.modal` for click-opened, `zIndex.tooltip` for hover-opened), so it renders above a `Dialog`.
- Count the lines each shape file needs; step 6 reports them.

## Scenarios

A scenario file is the code an end user would write, and the RFC quotes it as is. Keep it free of capture logic. For example, `.shape/menubar/scenarios/basic/recommended.tsx`:

```tsx
import Button from '@mui/material/Button';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarPopup,
  MenubarItem,
} from '../../shape/recommended';

export default function Example({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <Menubar>
      <MenubarMenu defaultOpen={defaultOpen}>
        <MenubarTrigger render={<Button>File</Button>} />
        <MenubarPopup>
          <MenubarItem>New file</MenubarItem>
        </MenubarPopup>
      </MenubarMenu>
    </Menubar>
  );
}
```

Every scenario accepts `defaultOpen` (or the component's equivalent) so the capture can show its open state. Write every scenario with the recommended shape, and write a fork's version only for the scenarios that fork changes. A scenario that a choice cannot express is a finding for step 6.

A state deeper than open, such as an open submenu, is its own scenario: set `defaultOpen` on the inner part too.

## Frame

`frame.tsx` reads the capture state from the URL and wraps the scenario:

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brandTheme } from './themes';

const themes = {
  default: createTheme(),
  open: createTheme(),
  dark: createTheme({ palette: { mode: 'dark' } }),
  brand: brandTheme,
};

type CaptureState = keyof typeof themes;

export default function Frame(props: {
  children: (open: boolean) => React.ReactNode;
  fullPage?: boolean;
}) {
  const param = new URLSearchParams(window.location.search).get('state');
  const state: CaptureState = param && param in themes ? (param as CaptureState) : 'default';
  return (
    <ThemeProvider theme={themes[state]}>
      <CssBaseline />
      <Box
        data-testid={props.fullPage ? undefined : 'screenshot-target'}
        sx={
          props.fullPage
            ? undefined
            : { p: 4, width: 720, height: 480, bgcolor: 'background.default' }
        }
      >
        {props.children(state !== 'default')}
      </Box>
    </ThemeProvider>
  );
}
```

The four capture states are `default`, `open`, `dark` (open, dark mode), and `brand` (open, the brand theme). The theming scenarios set their own theme inside the scenario, so capture them in the `open` state only; their other states repeat it.

A scenario that opens a modal (a `Dialog`) centers it in the page, outside the frame. Its fixture renders `<Frame fullPage>`, and the capture script then screenshots the whole page.

## Render and capture

1. For every scenario file, add a fixture that re-exports it in the frame. Fixtures are registered by path, `test/regressions/fixtures/<Suite>/<File>.tsx`, and only two path levels count, so encode the scenario and variant in the file name, for example `test/regressions/fixtures/MenubarShape/basic--recommended.tsx`:

   ```tsx
   import Frame from '../../../../.shape/menubar/frame';
   import Example from '../../../../.shape/menubar/scenarios/basic/recommended';

   export default function Fixture() {
     return <Frame>{(open) => <Example defaultOpen={open} />}</Frame>;
   }
   ```

2. Build and serve the regressions app the way CI does: `pnpm test:regressions:build`, then `pnpm test:regressions:server`. Each fixture is at `http://localhost:5001/regression-<Suite>/<File>?state=<state>#no-dev`, and the author can open any of them in a browser.
   - Use the build, not `pnpm test:regressions:dev`. The dev server's dependency pre-bundling fails on `sinon`, which `test/regressions/syncDataGridGenerator.ts` imports.
   - If port 5001 is taken, serve on another port with `pnpm exec vite preview test/regressions --port <port> --strictPort`, and pass `--url http://localhost:<port>` to the capture script.
   - Rebuild after every change to a prototype or scenario; the server serves the last build.
   - The first capture after a build can fail while the browser loads; run it again before reading the result.
3. Capture the fixtures. The script writes `<out>/<scenario>/<variant>-<state>.png`. Capture the recommended shape in every state, except the theming scenarios, and the fork variants in the `open` state:

   ```bash
   node .agents/skills/base-ui-component-shape/scripts/capture.mjs --suite MenubarShape --out .shape/menubar/screenshots --match '^(?!theme-).*--recommended$'
   node .agents/skills/base-ui-component-shape/scripts/capture.mjs --suite MenubarShape --out .shape/menubar/screenshots --match '^theme-.*--recommended$' --states open
   node .agents/skills/base-ui-component-shape/scripts/capture.mjs --suite MenubarShape --out .shape/menubar/screenshots --match='--fork-' --states open
   ```

4. Stop the server and delete `test/regressions/fixtures/<Suite>/`. The fixtures must never reach a commit: regression CI screenshots every fixture.
