# Prototypes

Each option is a **prototype**: thin wrappers over `@base-ui/react` and existing Material UI components, written as user-land code, the way the Menubar and Number Field docs recipes are. A prototype has no package registration, no theme typings, and no tests. It exists to render the scenarios and to measure what each option costs.

## Scratch folder

Everything lives in a scratch folder at the repository root that is never committed:

```text
.shape/<kebab-name>/
  options/closed.tsx        the parts of each option
  options/balanced.tsx
  options/open.tsx
  user-components.tsx       stand-ins for the user's own components
  themes.tsx                the brand theme and the opposite design theme
  frame.tsx                 renders a scenario in one capture state
  scenarios/<scenario>/<option>.tsx
  screenshots/<scenario>/<option>-<state>.png
  <kebab-name>-shape.md     the RFC
```

Keep it out of git without touching `.gitignore`: add `.shape/` to the file that `git rev-parse --git-path info/exclude` prints. In a git worktree, `.git` is a file, so `.git/info/exclude` does not exist there.

## Options

Write each option file as the public API of that option and nothing more:

- Each public part is a function component that renders a Base UI part with Material UI styles through Base UI `render`, as `docs/data/material/components/menubar/demos/Menubar.tsx` does.
- A part that merges several Base UI parts renders them all and takes `slots` and `slotProps` for the inner ones.
- Style each part with `styled(…, { name: 'Mui<Name><Part>', slot: 'root' })`, so `styleOverrides` in a theme reach it at runtime. Use the same part names across options where the part is the same.
- Count the lines each option file needs; step 5 reports them.

## Scenarios

A scenario file is the code an end user would write, and the RFC quotes it as is. Keep it free of capture logic. For example, `.shape/menubar/scenarios/basic/balanced.tsx`:

```tsx
import Button from '@mui/material/Button';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarPopup,
  MenubarItem,
} from '../../options/balanced';

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

Every scenario accepts `defaultOpen` (or the component's equivalent) so the capture can show its open state. Write the same scenario for every option; a scenario that an option cannot express is a finding for step 5.

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

export default function Frame(props: { children: (open: boolean) => React.ReactNode }) {
  const param = new URLSearchParams(window.location.search).get('state');
  const state: CaptureState = param && param in themes ? (param as CaptureState) : 'default';
  return (
    <ThemeProvider theme={themes[state]}>
      <CssBaseline />
      <Box
        data-testid="screenshot-target"
        sx={{ p: 4, width: 720, height: 480, bgcolor: 'background.default' }}
      >
        {props.children(state !== 'default')}
      </Box>
    </ThemeProvider>
  );
}
```

The four capture states are `default`, `open`, `dark` (open, dark mode), and `brand` (open, the brand theme). The theming scenarios set their own theme inside the scenario instead, so the opposite design theme stays visible in every state.

## Render and capture

1. For every scenario and option, add a fixture that re-exports it in the frame. Fixtures are registered by path, `test/regressions/fixtures/<Suite>/<File>.tsx`, and only two path levels count, so encode the scenario and option in the file name, for example `test/regressions/fixtures/MenubarShape/basic--balanced.tsx`:

   ```tsx
   import Frame from '../../../../.shape/menubar/frame';
   import Example from '../../../../.shape/menubar/scenarios/basic/balanced';

   export default function Fixture() {
     return <Frame>{(open) => <Example defaultOpen={open} />}</Frame>;
   }
   ```

2. Build and serve the regressions app the way CI does: `pnpm test:regressions:build`, then `pnpm test:regressions:server`. Each fixture is at `http://localhost:5001/regression-<Suite>/<File>?state=<state>#no-dev`, and the author can open any of them in a browser.
   - Use the build, not `pnpm test:regressions:dev`. The dev server's dependency pre-bundling fails on `sinon`, which `test/regressions/syncDataGridGenerator.ts` imports.
   - If port 5001 is taken, serve on another port with `pnpm exec vite preview test/regressions --port <port> --strictPort`, and pass `--url http://localhost:<port>` to the capture script.
   - Rebuild after every change to a prototype or scenario; the server serves the last build.
3. Capture every fixture in every state:

   ```bash
   node .agents/skills/base-ui-component-shape/scripts/capture.mjs --suite MenubarShape --out .shape/menubar/screenshots
   ```

   The script writes `<out>/<scenario>/<option>-<state>.png`. Add `--states default,open` to capture fewer states.

4. Stop the server and delete `test/regressions/fixtures/<Suite>/`. The fixtures must never reach a commit: regression CI screenshots every fixture.
