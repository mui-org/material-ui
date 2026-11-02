# Demos

<p class="description">The different variants of demo containers we have in the docs.</p>

Demos are powered by [`@mui/internal-docs-infra`](https://mui-internal.netlify.app/docs-infra/). Relevant references:

- [CodeHighlighter](https://mui-internal.netlify.app/docs-infra/components/code-highlighter/) — the underlying renderer
- [`useDemo()`](https://mui-internal.netlify.app/docs-infra/hooks/use-demo/) — client hook
- [`abstractCreateDemo({ DemoContent })`](https://mui-internal.netlify.app/docs-infra/factories/abstract-create-demo/) — factory used to build `createDemo`
- [`loadPrecomputedCodeHighlighter`](https://mui-internal.netlify.app/docs-infra/pipeline/load-precomputed-code-highlighter/) — webpack loader

The supported options (for example, `bg`, `hideToolbar`, `isolated`, `iframe`, …) are defined by the `DemoOptions` interface in `packages-internal/core-docs/src/DemoContent/DemoContent.tsx`.

## Standard demo

"Standard" refers to when no background is explicitly defined.
So, it renders the "outlined" background variant.

{{"component": "file://./demos/in-docs/index.ts"}}

## "bg": "outlined"

{{"component": "file://./demos/in-docs/index.ts", "bg": "outlined"}}

## "bg": "inline"

{{"component": "file://./demos/in-docs/index.ts", "bg": "inline"}}

## "bg": true

{{"component": "file://./demos/in-docs/index.ts", "bg": true}}

## "bg": gradient

{{"component": "file://./demos/in-docs/index.ts", "bg": "gradient"}}

## "bg": "playground"

{{"component": "file://./demos/in-docs/index.ts", "bg": "playground"}}

## "hideToolbar": true

{{"component": "file://./demos/in-docs-not-editable/index.ts", "hideToolbar": true}}

## "hideToolbar": true, "bg": true

{{"component": "file://./demos/in-docs-not-editable/index.ts", "hideToolbar": true, "bg": true}}

## "hideToolbar": true, "bg": "inline"

{{"component": "file://./demos/in-docs-not-editable/index.ts", "hideToolbar": true, "bg": "inline"}}

## Multiple Tabs demo

Demos that export more than one file (for example, a main component plus extracted helpers) render a tab bar above the code viewer so each file can be inspected independently.

{{"component": "file://./demos/multi-tabs/index.ts", "bg": "inline" }}

## Isolated demo

Isolated demos are disconnected from the page's theme and color scheme.
They are like mini apps within the documentation.

When `isolated: true` is set to the demo options, the demo will get props for creating isolated demo.
Those props should be passed to the `ThemeProvider` of the demo.

### Basic theme

```js title="DemoIsolated.js"
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
}

export default function DemoIsolated(props) {
  return (
    <ThemeProvider
      {...props}
      theme={createTheme({
        // ...custom theme
      })}
    >
      ...
    </ThemeProvider>
  );
}
```

### Mode toggle with CSS variables

{{"component": "file://./demos/mode-toggle/index.ts", "isolated": true, "bg": "inline" }}

```js title="DemoModeToggle.js"
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
}

export default function DemoModeToggle(props) {
  return (
    <ThemeProvider
      {...props}
      theme={createTheme({
        colorSchemes: { light: true, dark: true },
        cssVariables: {
          // required to make the demo isolated
          cssVarPrefix: props.cssVarPrefix,
          colorSchemeSelector: props.colorSchemeSelector || 'class',
        },
      })}
    >
      ...
    </ThemeProvider>
  );
}
```

:::info
The demo with `isolated` will always set to `system` mode when refresh the page. It will not store the selected mode to the local storage.
:::

### Custom theme with CSS variables

Provide custom palettes to light and/or dark color schemes.

{{"component": "file://./demos/mode-toggle-custom-theme/index.ts", "isolated": true, "bg": "inline" }}

```js title="DemoModeToggleCustomTheme.js"
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

export default function DemoModeToggleCustomTheme(props) {
  const theme = createTheme({
    cssVariables: {
      cssVarPrefix: props.cssVarPrefix,
      colorSchemeSelector: props.colorSchemeSelector || 'class',
    },
    colorSchemes: {
      light: {
        palette: {
          // ...custom palette
        },
      },
      dark: {
        palette: {
          // ...custom palette
        },
      },
    },
  });
  return (
    <ThemeProvider {...props} theme={theme}>
      ...
    </ThemeProvider>
  );
}
```

### Iframe demo

`isolated: true` can be used with iframe demos. The difference is that the node to attach the color scheme selector will be the `html` of the iframe instead of the demo container.

{{"component": "file://./demos/mode-toggle-iframe/index.ts", "bg": "inline", "defaultCodeOpen": false, "iframe": true, "isolated": true }}

## Sizing

### "maxWidth": number

{{"component": "file://./demos/in-docs/index.ts", "bg": "inline", "maxWidth": 320}}

### "height": number

{{"component": "file://./demos/in-docs/index.ts", "bg": "inline", "height": 240}}

## Toolbar variants

### "hideEditButton": true

{{"component": "file://./demos/in-docs/index.ts", "hideEditButton": true}}

### "defaultCodeOpen": true

{{"component": "file://./demos/in-docs/index.ts", "defaultCodeOpen": true}}

### "disableLiveEdit": true

{{"component": "file://./demos/in-docs/index.ts", "disableLiveEdit": true}}

### "aiSuggestion": string

When set, renders a "Customize with AI" hero with the provided prompt.

{{"component": "file://./demos/in-docs/index.ts", "aiSuggestion": "Make this Alert more prominent"}}

## Other options

These options don't have a visual variant worth showcasing, but they are supported:

| Option      | Type             | Purpose                                                                          |
| :---------- | :--------------- | :------------------------------------------------------------------------------- |
| `disableAd` | `boolean`        | Suppresses the inline Carbon ad even when ads are enabled globally.              |
| `anchorId`  | `string \| null` | Overrides the anchor `id` used for deep-links. `null` disables anchors entirely. |

## Validation rules

`DemoContent` throws at build time when these invalid combinations are used:

- `"hideToolbar": false` — redundant; remove it.
- `"hideToolbar": true` combined with `"defaultCodeOpen": true`.
- `"hideToolbar": true` combined with `"disableAd": true`.
- Referencing a `.ts` / `.tsx` demo without `"hideToolbar": true` (TypeScript demos cannot be edited live).
