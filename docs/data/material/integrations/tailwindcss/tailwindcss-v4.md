# Tailwind CSS v4 integration

<p class="description">Learn how to use Material UI with Tailwind CSS v4.</p>

## Overview

There are two steps to integrate Tailwind CSS v4 with Material UI:

1. Configure the styles to generate with the `@layer` directive.
2. Set up the layer order so that `mui` comes before the `utilities` layer, allowing Tailwind CSS classes to override Material UI styles.

The instructions below detail how to achieve this using common React frameworks.

:::success
Use the [Material UI + Tailwind CSS agent skill](https://github.com/mui/material-ui/tree/master/skills/material-ui-tailwind) to give your AI coding assistant full context on this integration, including CSS layer ordering, `enableCssLayer`, and Tailwind class overrides.
:::

### Next.js App Router

To integrate Tailwind CSS v4 with Material UI in a Next.js App Router project, start by configuring Material UI with Next.js in the [App Router integration guide](/material-ui/integrations/nextjs/#app-router).
Then follow these steps:

1. Enable the [CSS layer feature](/material-ui/integrations/nextjs/#using-other-styling-solutions) in the root layout:

```tsx title="src/app/layout.tsx"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {/* Your app */}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

2. Configure the layer order in the Tailwind CSS file:

```css title="src/app/global.css"
@layer theme, base, mui, components, utilities;
@import 'tailwindcss';
```

### Next.js Pages Router

To integrate Tailwind CSS v4 with Material UI in a Next.js Pages Router project, start by configuring Material UI with Next.js in the [Pages Router integration guide](/material-ui/integrations/nextjs/#pages-router).
Then follow these steps:

1. Create a shared Emotion cache (required for SSR + hydration)

   Material UI relies on Emotion for styling.
   To avoid hydration mismatches, the same Emotion cache instance and configuration must be used on both the server and the client.

   Create a shared cache:

   ```tsx title="src/createEmotionCache.js"
   import { createEmotionCache } from '@mui/material-nextjs/v15-pagesRouter';

   export const emotionCache = createEmotionCache({ enableCssLayer: true });
   ```

   > `enableCssLayer: true` ensures Material UI styles are wrapped in `@layer mui`, which allows Tailwind CSS v4 utilities to override them predictably.

2. Enable the [CSS layer feature](/material-ui/integrations/nextjs/#configuration-2) in a custom `_document`:

```tsx title="pages/_document.tsx"
import { documentGetInitialProps } from '@mui/material-nextjs/v15-pagesRouter';
import { emotionCache } from '../src/createEmotionCache';
// ...

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache,
  });
  return finalProps;
};
```

3. Configure the global Tailwind CSS file:

```css title="styles/global.css"
@import 'tailwindcss';
```

4. Configure the layer order with the `GlobalStyles` component—it must be the first child of the `AppCacheProvider`:

```tsx title="pages/_app.tsx"
import '../styles/global.css';
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import GlobalStyles from '@mui/material/GlobalStyles';
import { emotionCache } from '../src/createEmotionCache';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider emotionCache={emotionCache}>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      {/* Your app */}
    </AppCacheProvider>
  );
}
```

### Vite.js or any other SPA

To integrate Tailwind CSS v4 with Material UI in a Vite-based app, make the following changes in `src/main.tsx`:

1. Pass the `enableCssLayer` prop to the `StyledEngineProvider` component.
2. Configure the layer order with the `GlobalStyles` component.

```tsx title="main.tsx"
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      {/* Your app */}
    </StyledEngineProvider>
  </React.StrictMode>,
);
```

## Tailwind CSS IntelliSense for VS Code

The official [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension requires extra configuration to work properly when customizing the interior slots of Material UI components.
After installing the extension, add the following line to your [VS Code `settings.json`](https://code.visualstudio.com/docs/configure/settings#_settings-json-file) file:

```json
{
  // ...config
  "tailwindCSS.experimental.classRegex": [["className\\s*:\\s*['\"]([^'\"]*)['\"]"]]
}
```

Now you should see the autocomplete and syntax highlighting features when using the `slotProps` prop, as shown in the screenshot below:

![A preview of Tailwind CSS Intellisense](/static/material-ui/tailwind-intellisense.jpg)

## Usage

- Use the `className` prop to apply Tailwind CSS classes to the root element of the component.
- Use `slotProps.{slotName}.className` to apply Tailwind CSS classes to a component's [interior slots](/material-ui/customization/overriding-component-structure/#interior-slots).

{{"component": "file://./demos/text-field-tailwind/index.ts"}}

## Extend Material UI classes

If you want to use Material UI theme tokens in your Tailwind CSS classes, copy the snippet below into your CSS file.

```css title="global.css"
@layer theme, base, mui, components, utilities;
@import 'tailwindcss';

@theme inline {
  /* Material UI typography */
  --font-h1: var(--mui-font-h1);
  --font-h2: var(--mui-font-h2);
  --font-h3: var(--mui-font-h3);
  --font-h4: var(--mui-font-h4);
  --font-h5: var(--mui-font-h5);
  --font-h6: var(--mui-font-h6);
  --font-subtitle1: var(--mui-font-subtitle1);
  --font-subtitle2: var(--mui-font-subtitle2);
  --font-body1: var(--mui-font-body1);
  --font-body2: var(--mui-font-body2);
  --font-button: var(--mui-font-button);
  --font-caption: var(--mui-font-caption);
  --font-overline: var(--mui-font-overline);

  --letter-spacing-h1: -0.01562em;
  --letter-spacing-h2: -0.00833em;
  --letter-spacing-h4: 0.00735em;
  --letter-spacing-h6: 0.0075em;
  --letter-spacing-body1: 0.00938em;
  --letter-spacing-body2: 0.01071em;

  /* Material UI breakpoints */
  --breakpoint-sm: 37.5rem; /* 600px */
  --breakpoint-md: 56.25rem; /* 900px */
  --breakpoint-lg: 75rem; /* 1200px */
  --breakpoint-xl: 96rem; /* 1536px */
  --breakpoint-2xl: 120rem; /* 1920px */

  /* Material UI theme colors */
  --color-primary: var(--mui-palette-primary-main);
  --color-primary-light: var(--mui-palette-primary-light);
  --color-primary-dark: var(--mui-palette-primary-dark);
  --color-primary-contrast: var(--mui-palette-primary-contrastText);

  --color-secondary: var(--mui-palette-secondary-main);
  --color-secondary-light: var(--mui-palette-secondary-light);
  --color-secondary-dark: var(--mui-palette-secondary-dark);
  --color-secondary-contrast: var(--mui-palette-secondary-contrastText);

  /* Material UI status colors */
  --color-info: var(--mui-palette-info-main);
  --color-info-light: var(--mui-palette-info-light);
  --color-info-dark: var(--mui-palette-info-dark);
  --color-info-contrast: var(--mui-palette-info-contrastText);

  --color-error: var(--mui-palette-error-main);
  --color-error-light: var(--mui-palette-error-light);
  --color-error-dark: var(--mui-palette-error-dark);
  --color-error-contrast: var(--mui-palette-error-contrastText);

  --color-success: var(--mui-palette-success-main);
  --color-success-light: var(--mui-palette-success-light);
  --color-success-dark: var(--mui-palette-success-dark);
  --color-success-contrast: var(--mui-palette-success-contrastText);

  --color-warning: var(--mui-palette-warning-main);
  --color-warning-light: var(--mui-palette-warning-light);
  --color-warning-dark: var(--mui-palette-warning-dark);
  --color-warning-contrast: var(--mui-palette-warning-contrastText);

  /* Material UI text & common colors */
  --color-text-primary: var(--mui-palette-text-primary);
  --color-text-secondary: var(--mui-palette-text-secondary);
  --color-text-disabled: var(--mui-palette-text-disabled);
  --color-common-background: var(--mui-palette-common-background);
  --color-common-onBackground: var(--mui-palette-common-onBackground);
  --color-divider: var(--mui-palette-divider);

  /* Material UI background colors */
  --color-background-default: var(--mui-palette-background-default);
  --color-background-paper: var(--mui-palette-background-paper);

  /* Material UI action colors */
  --color-action-active: var(--mui-palette-action-active);
  --color-action-hover: var(--mui-palette-action-hover);
  --color-action-selected: var(--mui-palette-action-selected);
  --color-action-disabled: var(--mui-palette-action-disabled);
  --color-action-focus: var(--mui-palette-action-focus);

  /* Material UI gray scale */
  --color-gray-50: var(--mui-palette-grey-50);
  --color-gray-100: var(--mui-palette-grey-100);
  --color-gray-200: var(--mui-palette-grey-200);
  --color-gray-300: var(--mui-palette-grey-300);
  --color-gray-400: var(--mui-palette-grey-400);
  --color-gray-500: var(--mui-palette-grey-500);
  --color-gray-600: var(--mui-palette-grey-600);
  --color-gray-700: var(--mui-palette-grey-700);
  --color-gray-800: var(--mui-palette-grey-800);
  --color-gray-900: var(--mui-palette-grey-900);
  --color-gray-A100: var(--mui-palette-grey-A100);
  --color-gray-A200: var(--mui-palette-grey-A200);
  --color-gray-A400: var(--mui-palette-grey-A400);
  --color-gray-A700: var(--mui-palette-grey-A700);

  /* Material UI Component Colors */
  /* Alert */
  --color-Alert-error: var(--mui-palette-Alert-errorColor);
  --color-Alert-info: var(--mui-palette-Alert-infoColor);
  --color-Alert-success: var(--mui-palette-Alert-successColor);
  --color-Alert-warning: var(--mui-palette-Alert-warningColor);
  --color-Alert-errorFilled: var(--mui-palette-Alert-errorFilledBg);
  --color-Alert-infoFilled: var(--mui-palette-Alert-infoFilledBg);
  --color-Alert-successFilled: var(--mui-palette-Alert-successFilledBg);
  --color-Alert-warningFilled: var(--mui-palette-Alert-warningFilledBg);
  --color-Alert-errorFilledColor: var(--mui-palette-Alert-errorFilledColor);
  --color-Alert-infoFilledColor: var(--mui-palette-Alert-infoFilledColor);
  --color-Alert-successFilledColor: var(--mui-palette-Alert-successFilledColor);
  --color-Alert-warningFilledColor: var(--mui-palette-Alert-warningFilledColor);
  --color-Alert-errorStandard: var(--mui-palette-Alert-errorStandardBg);
  --color-Alert-infoStandard: var(--mui-palette-Alert-infoStandardBg);
  --color-Alert-successStandard: var(--mui-palette-Alert-successStandardBg);
  --color-Alert-warningStandard: var(--mui-palette-Alert-warningStandardBg);
  --color-Alert-errorIcon: var(--mui-palette-Alert-errorIconColor);
  --color-Alert-infoIcon: var(--mui-palette-Alert-infoIconColor);
  --color-Alert-successIcon: var(--mui-palette-Alert-successIconColor);
  --color-Alert-warningIcon: var(--mui-palette-Alert-warningIconColor);

  /* AppBar */
  --color-AppBar-default: var(--mui-palette-AppBar-defaultBg);

  /* Avatar */
  --color-Avatar-default: var(--mui-palette-Avatar-defaultBg);

  /* Button */
  --color-Button-inheritContained: var(--mui-palette-Button-inheritContainedBg);
  --color-Button-inheritContainedHover: var(
    --mui-palette-Button-inheritContainedHoverBg
  );

  /* Chip */
  --color-Chip-defaultBorder: var(--mui-palette-Chip-defaultBorder);
  --color-Chip-defaultAvatar: var(--mui-palette-Chip-defaultAvatarColor);
  --color-Chip-defaultIcon: var(--mui-palette-Chip-defaultIconColor);

  /* FilledInput */
  --color-FilledInput-bg: var(--mui-palette-FilledInput-bg);
  --color-FilledInput-hover: var(--mui-palette-FilledInput-hoverBg);
  --color-FilledInput-disabled: var(--mui-palette-FilledInput-disabledBg);

  /* LinearProgress */
  --color-LinearProgress-primary: var(--mui-palette-LinearProgress-primaryBg);
  --color-LinearProgress-secondary: var(--mui-palette-LinearProgress-secondaryBg);
  --color-LinearProgress-error: var(--mui-palette-LinearProgress-errorBg);
  --color-LinearProgress-info: var(--mui-palette-LinearProgress-infoBg);
  --color-LinearProgress-success: var(--mui-palette-LinearProgress-successBg);
  --color-LinearProgress-warning: var(--mui-palette-LinearProgress-warningBg);

  /* Skeleton */
  --color-Skeleton-bg: var(--mui-palette-Skeleton-bg);

  /* Slider */
  --color-Slider-primary: var(--mui-palette-Slider-primaryTrack);
  --color-Slider-secondary: var(--mui-palette-Slider-secondaryTrack);
  --color-Slider-error: var(--mui-palette-Slider-errorTrack);
  --color-Slider-info: var(--mui-palette-Slider-infoTrack);
  --color-Slider-success: var(--mui-palette-Slider-successTrack);
  --color-Slider-warning: var(--mui-palette-Slider-warningTrack);

  /* SnackbarContent */
  --color-SnackbarContent-bg: var(--mui-palette-SnackbarContent-bg);
  --color-SnackbarContent-text: var(--mui-palette-SnackbarContent-color);

  /* SpeedDialAction */
  --color-SpeedDialAction-fabHover: var(--mui-palette-SpeedDialAction-fabHoverBg);

  /* StepConnector & StepContent */
  --color-StepConnector-border: var(--mui-palette-StepConnector-border);
  --color-StepContent-border: var(--mui-palette-StepContent-border);

  /* Switch */
  --color-Switch-default: var(--mui-palette-Switch-defaultColor);
  --color-Switch-defaultDisabled: var(--mui-palette-Switch-defaultDisabledColor);
  --color-Switch-primaryDisabled: var(--mui-palette-Switch-primaryDisabledColor);
  --color-Switch-secondaryDisabled: var(--mui-palette-Switch-secondaryDisabledColor);
  --color-Switch-errorDisabled: var(--mui-palette-Switch-errorDisabledColor);
  --color-Switch-infoDisabled: var(--mui-palette-Switch-infoDisabledColor);
  --color-Switch-successDisabled: var(--mui-palette-Switch-successDisabledColor);
  --color-Switch-warningDisabled: var(--mui-palette-Switch-warningDisabledColor);

  /* TableCell */
  --color-TableCell-border: var(--mui-palette-TableCell-border);

  /* Tooltip */
  --color-Tooltip-bg: var(--mui-palette-Tooltip-bg);

  /* Material UI shadows */
  --shadow-1: var(--mui-shadows-1);
  --shadow-2: var(--mui-shadows-2);
  --shadow-3: var(--mui-shadows-3);
  --shadow-4: var(--mui-shadows-4);
  --shadow-5: var(--mui-shadows-5);
  --shadow-6: var(--mui-shadows-6);
  --shadow-7: var(--mui-shadows-7);
  --shadow-8: var(--mui-shadows-8);
  --shadow-9: var(--mui-shadows-9);
  --shadow-10: var(--mui-shadows-10);
  --shadow-11: var(--mui-shadows-11);
  --shadow-12: var(--mui-shadows-12);
  --shadow-13: var(--mui-shadows-13);
  --shadow-14: var(--mui-shadows-14);
  --shadow-15: var(--mui-shadows-15);
  --shadow-16: var(--mui-shadows-16);
  --shadow-17: var(--mui-shadows-17);
  --shadow-18: var(--mui-shadows-18);
  --shadow-19: var(--mui-shadows-19);
  --shadow-20: var(--mui-shadows-20);
  --shadow-21: var(--mui-shadows-21);
  --shadow-22: var(--mui-shadows-22);
  --shadow-23: var(--mui-shadows-23);
  --shadow-24: var(--mui-shadows-24);

  /* Material UI opacity */
  --opacity-activated: calc(100% * var(--mui-palette-action-activatedOpacity));
  --opacity-disabled: calc(100% * var(--mui-palette-action-disabledOpacity));
  --opacity-focus: calc(100% * var(--mui-palette-action-focusOpacity));
  --opacity-hover: calc(100% * var(--mui-palette-action-hoverOpacity));
  --opacity-selected: calc(100% * var(--mui-palette-action-selectedOpacity));

  /* Material UI overlays */
  --overlay-1: var(--mui-overlays-1);
  --overlay-2: var(--mui-overlays-2);
  --overlay-3: var(--mui-overlays-3);
  --overlay-4: var(--mui-overlays-4);
  --overlay-5: var(--mui-overlays-5);
  --overlay-6: var(--mui-overlays-6);
  --overlay-7: var(--mui-overlays-7);
  --overlay-8: var(--mui-overlays-8);
  --overlay-9: var(--mui-overlays-9);
  --overlay-10: var(--mui-overlays-10);
  --overlay-11: var(--mui-overlays-11);
  --overlay-12: var(--mui-overlays-12);
  --overlay-13: var(--mui-overlays-13);
  --overlay-14: var(--mui-overlays-14);
  --overlay-15: var(--mui-overlays-15);
  --overlay-16: var(--mui-overlays-16);
  --overlay-17: var(--mui-overlays-17);
  --overlay-18: var(--mui-overlays-18);
  --overlay-19: var(--mui-overlays-19);
  --overlay-20: var(--mui-overlays-20);
  --overlay-21: var(--mui-overlays-21);
  --overlay-22: var(--mui-overlays-22);
  --overlay-23: var(--mui-overlays-23);
  --overlay-24: var(--mui-overlays-24);
}

/* Material UI base styles */
@layer base {
  h1 {
    font: var(--mui-font-h1);
    letter-spacing: -0.01562em;
  }
  h2 {
    font: var(--mui-font-h2);
    letter-spacing: -0.00833em;
  }
  h3 {
    font: var(--mui-font-h3);
  }
  h4 {
    font: var(--mui-font-h4);
    letter-spacing: 0.00735em;
  }
  h5 {
    font: var(--mui-font-h5);
  }
  h6 {
    font: var(--mui-font-h6);
    letter-spacing: 0.0075em;
  }
  p {
    font: var(--mui-font-body1);
    letter-spacing: 0.00938em;
  }
  span {
    font: var(--mui-font-body2);
    letter-spacing: 0.01071em;
  }
}

/* Material UI typography utilities */
@utility typography-* {
  font: --value(--font-*);
}

/* Material UI overlay utilities */
@utility overlay-* {
  background-image: --value(--overlay-*);
}

/* Material UI elevation utilities */
@utility elevation-* {
  background-image: --value(--overlay-*);
  box-shadow: --value(--shadow-*);
}
```

Then you can start using the new classes—for example:

- The class `typography-h1` produces `font: var(--mui-font-h1);`
- The class `text-primary` produces `color: var(--mui-palette-primary-main);`

So when you add these classes to an element…

```js title="App.tsx"
<div className="typography-h1 text-primary">Hello world</div>
```

…the CSS looks like this:

```css
@layer utilities {
  .typography-h1 {
    font: var(--mui-font-h1);
    letter-spacing: -0.01562em;
  }
  .text-primary {
    color: var(--mui-palette-primary-main);
  }
}
```

### Playground

Visit the [Tailwind CSS Playground](https://play.tailwindcss.com/mh7Ym0mGff) to explore the classes from Material UI theme tokens.

## Troubleshooting

If the Tailwind CSS classes are not overriding Material UI components, make sure that:

- You are using Tailwind CSS >= v4.
- You have configured the layer order correctly by checking the [DevTools styles tab](https://developer.chrome.com/docs/devtools/css/reference#cascade-layers). The `mui` layer should come before the `utilities` layer.
