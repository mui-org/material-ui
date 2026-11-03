# AGENTS.md

This file provides guidance for AI agents working with code in this repository.

## Package Manager

**Only pnpm is supported** (yarn/npm will fail). Use the `-F` flag for workspace operations:

```bash
pnpm -F @mui/material add some-package    # Add dependency to a package
pnpm -F @mui/material build               # Build a specific package
```

Never use `cd` to navigate into package directories for commands.

## Common Commands

### Development

```bash
pnpm install                  # Install deps if necessary
pnpm docs:dev                 # Start docs dev server only
```

### Building

```bash
pnpm release:build            # Build all packages (except docs)
pnpm docs:build               # Build documentation site
```

### Testing

```bash
pnpm test:unit                # Run all unit tests (jsdom)
pnpm test:unit ComponentName  # Run tests matching pattern
pnpm test:unit -t "test name" # Grep for specific test name
pnpm test:browser             # Run tests in real browsers (Chrome, Firefox, WebKit)
pnpm test:e2e                 # End-to-end tests
pnpm test:regressions         # Visual regression tests
```

### Code Quality

```bash
pnpm prettier                 # Format staged changes
pnpm eslint                   # Lint with cache
pnpm typescript               # Type check all packages
```

### API Documentation

After changing component props or TypeScript declarations:

```bash
pnpm proptypes && pnpm docs:api
```

### Docs demos

Demos live next to their page under `docs/data/<product>/components/<component>/demos/<demo-name>/`. Each demo folder contains three files:

- `<ComponentName>.tsx` — the demo source, authored as TypeScript (`.tsx`).
- `client.ts` — marks the demo's client boundary:

  ```ts
  'use client';

  import { createDemoClient } from '@mui/internal-core-docs/utils/createDemoClient';

  export default createDemoClient(import.meta.url);
  ```

- `index.ts` — wires the demo into the docs pipeline:

  ```ts
  import { createDemo } from '@mui/internal-core-docs/utils/createDemo';
  import ClientProvider from './client';
  import BasicButtons from './BasicButtons';

  export default createDemo(import.meta.url, BasicButtons, { ClientProvider });
  ```

Reference the demo from the page's markdown via the `component` field. Use a `file://` URL with a path relative to the markdown file:

```md
{{"component": "file://./demos/basic/index.ts"}}
```

Demo options (`bg`, `hideToolbar`, `initialExpanded`, `collapseToEmpty`, `isolated`, `iframe`, `maxWidth`, `height`, `disableAd`, `disableLiveEdit`, `hideEditButton`, `aiSuggestion`, `anchorId`; `defaultCodeOpen` is a legacy alias for `initialExpanded`/`collapseToEmpty`) are defined by the `DemoOptions` interface in `packages-internal/core-docs/src/DemoContent/DemoContent.tsx`. Use `{/* @focus-start */}` / `{/* @focus-end */}` JSX comments inside the demo to highlight regions in the rendered code viewer.

The demo infrastructure itself is documented at <https://mui-internal.netlify.app/docs-infra/>.

## Architecture

This is a monorepo managed by Lerna with Nx for caching. Key packages:

- `@mui/material` - Core Material UI components
- `@mui/system` - Styling system (sx prop, styled, theme)
- `@mui/lab` - Experimental components (new components go here first)
- `@mui/icons-material` - Material Design icons
- `@mui/utils` - Internal utilities
- `@mui/styled-engine` - CSS-in-JS abstraction (Emotion by default)

Internal packages use `@mui/internal-*`; repo-only packages declare `"private": true`.
Private workspaces without workspace dependents omit package names; reference them by path.

## Code Conventions

### TypeScript

- Use `interface` (not `type`) for component props
- Export `{ComponentName}Props` interface from component files
- Path aliases available: `@mui/material` → `./packages/mui-material/src`

### Errors

These guidelines only apply for errors thrown from public packages.

Every error message must:

1. **Say what happened** - Describe the problem clearly
2. **Say why it's a problem** - Explain the consequence
3. **Point toward how to solve it** - Give actionable guidance

Format:

- Prefix with `MUI: `
- Use string concatenation for readability
- Include a documentation link when applicable (`https://mui.com/r/...`)

#### Error Minifier

Use the `/* minify-error */` comment to activate the babel plugin:

```tsx
throw /* minify-error */ new Error(
  'MUI: Expected valid input target. ' +
    'Did you use a custom `inputComponent` and forget to forward refs? ' +
    'See https://mui.com/r/input-component-ref-interface for more info.',
);
```

The minifier works with both `Error` and `TypeError` constructors.

#### After Adding/Updating Errors

Run `pnpm extract-error-codes` to update `docs/public/static/error-codes.json`.

**Important:** If the update created a new error code, but the new and original message have the same number of arguments and semantics haven't changed, update the original error in `error-codes.json` instead of creating a new code.

### Component Structure

```text
packages/mui-material/src/Button/
├── Button.tsx           # Component implementation
├── Button.d.ts          # TypeScript declarations (for JSDoc API docs)
├── Button.test.js       # Unit tests
├── buttonClasses.ts     # CSS classes
└── index.ts             # Public exports
```

### Testing

- Use `createRenderer()` from `@mui/internal-test-utils`
- Use Chai BDD-style assertions (`expect(x).to.equal(y)`)
- Custom matchers: `toErrorDev()`, `toWarnDev()` for console assertions
- Prefer testing components with full interactions using `user.*` methods. Avoid `fireEvent` and `setProps` if possible.
- If tests require the browser because, for example, they require layout measurements, restrict it to the Chromium env by using `it.skipIf(isJsdom())` or `describe.skipIf(isJsdom())` (search other tests for example usage if unsure).

```js
import { createRenderer } from '@mui/internal-test-utils';

describe('Button', () => {
  const { render } = createRenderer();

  it('renders children', async () => {
    const handleClick = vi.fn();
    const { getByRole, user } = render(<Button onClick={handleClick}>Hello</Button>);

    const button = getByRole('button');
    expect(button).to.have.text('Hello');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Testing

axe-core runs inside the visual-regression Playwright loop (`test/regressions/index.test.js`) — no separate browser session. Screenshots and a11y are independent: a demo can opt out of one and still run the other.

Key files:

- `test/regressions/demoMeta.ts` — `SCREENSHOT_RULES` and `A11Y_RULES` arrays, matched last-wins (no inheritance: overrides restate every field) against `docs/data/material/components/{slug}/{Demo}` (minimatch globs).
- `test/regressions/a11y/axe.ts` — asserts `color-contrast` and `link-in-text-block` by default, or all exercised axe rules when the matching a11y rule sets `assertions: 'all'`; `skipAssertions` suppresses selected rule assertions.
- `test/regressions/a11y/a11yReporter.ts` — writes one file per slug at `docs/data/material/components/{slug}/{slug}.a11y.json`. Each file is keyed by demo name, then by axe rule ID. Each rule records a `status` (`pass`, `fail`, or `incomplete`) and WCAG tags.

Enroll a component (slug-wide, or narrow with brace-glob):

```ts
// test/regressions/demoMeta.ts
{ test: 'docs/data/material/components/alert/*', enabled: true, skipAssertions: ['color-contrast'] },
{ test: 'docs/data/material/components/buttons/{BasicButtons,ColorButtons}', enabled: true, assertions: 'all' },
```

Override a specific demo: append a per-demo rule _after_ the slug-wide rule (last-match-wins; the override must restate every field it wants):

```ts
{ test: 'docs/data/material/components/popover/AnchorPlayground', enabled: false }, // Redux isolation
```

Run `pnpm test:regressions` to refresh the `*.a11y.json` files. CI fails if any are stale.

For local iteration, scope the run with vitest's `-t` test-name filter (matched against the `it()` strings, which contain the route). Non-matching tests are skipped — their bodies don't execute, so the browser never navigates to those routes.

```bash
# in one terminal
pnpm test:regressions:server

# in another — note no `--`, pnpm forwards args directly
pnpm test:regressions:run -t '/docs-components-buttons/'              # one slug
pnpm test:regressions:run -t '/docs-components-buttons/BasicButtons$' # one demo
pnpm test:regressions:run -t '/docs-components-(buttons|chips)/'      # multiple slugs
```

Filtered runs only refresh the matched slugs' `*.a11y.json`. Run the unfiltered `pnpm test:regressions` before pushing.

### Imports

Use one-level deep imports to avoid bundling entire packages:

```js
import Button from '@mui/material/Button'; // Good
import { Button } from '@mui/material'; // Avoid in packages
```

## Agent Skills

Packaged guidance for common integration topics lives under `skills/`. Each skill is a self-contained directory:

| Skill                                                                  | Focus                                                       |
| :--------------------------------------------------------------------- | :---------------------------------------------------------- |
| [skills/material-ui-styling](./skills/material-ui-styling/AGENTS.md)   | `sx`, `styled()`, theme overrides, slots, global CSS        |
| [skills/material-ui-theming](./skills/material-ui-theming/AGENTS.md)   | `createTheme`, design tokens, `colorSchemes`, CSS variables |
| [skills/material-ui-nextjs](./skills/material-ui-nextjs/AGENTS.md)     | App/Pages Router, Emotion cache, `next/font`, `Link`, SSR   |
| [skills/material-ui-tailwind](./skills/material-ui-tailwind/AGENTS.md) | Tailwind v4 `@layer`, `enableCssLayer`, v3 interop          |

Read the relevant `AGENTS.md` when helping users with those topics.

## Pre-PR Checklist

1. `pnpm prettier` - Format code
2. `pnpm eslint` - Pass linting
3. `pnpm typescript` - Pass type checking
4. `pnpm test:unit` - Pass unit tests
5. If API changed: `pnpm proptypes && pnpm docs:api`
6. If `.md` files changed: `pnpm vale <file1> <file2> ...` - Check prose style and grammar

## PR Title Format

`[component] Imperative description`

Examples:

- `[button] Add loading state`
- `[docs] Fix typo in Grid documentation`
