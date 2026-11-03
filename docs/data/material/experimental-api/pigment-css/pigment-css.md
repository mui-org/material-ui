# Getting started with Pigment CSS

<p class="description">Learn how to get started customizing your components using Pigment CSS.</p>

:::warning
Pigment CSS is currently in the early alpha stage of development. We're actively working on improving its performance and stability. If you find any problem, please open a [GitHub issue](https://github.com/mui/pigment-css/issues).
:::

<iframe height="400" style="aspect-ratio: 16 / 9; width: 100% !important; border: 0" src="https://www.youtube.com/embed/UVeDpUey5Es?si=w8OtdStXHtWWIODa" title="YouTube video player: Getting Started with Pigment CSS" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Pigment CSS](https://github.com/mui/pigment-css) is a zero-runtime CSS-in-JS library that pre-compiles at build time, making it compatible with React Server Components and providing you with significant performance improvements over other styling engines.

Pigment CSS is compatible with any React component library and can be used with Vite and Next.js.

Check out the [Migrating to Pigment CSS](/material-ui/migration/migrating-to-pigment-css/) guide if you have an existing Material UI project.

## Prerequisites

- Node.js
- A package manager
- A Next.js or Vite project

You can fast track your Pigment CSS installation and project creation with the following commands:

<codeblock storageKey="framework">

```bash Next.js
curl https://codeload.github.com/mui/pigment-css/tar.gz/master | tar -xz --strip=2  pigment-css-master/examples/pigment-css-nextjs-ts
cd pigment-css-nextjs-ts
```

```bash Vite
curl https://codeload.github.com/mui/pigment-css/tar.gz/master | tar -xz --strip=2 pigment-css-master/examples/pigment-css-vite-ts
cd pigment-css-vite-ts
```

</codeblock>

## Manual installation

To get started on an existing project, install Pigment CSS with the following command:

<codeblock storageKey="framework">

```bash Next.js
npm install @pigment-css/react
npm install --save-dev @pigment-css/nextjs-plugin
```

```bash Vite
npm install @pigment-css/react
npm install --save-dev @pigment-css/vite-plugin
```

</codeblock>

Next, head over to your config file and import the `withPigment` plugin:

<codeblock storageKey="framework">

```js Next.js
// next.config.js
import { withPigment } from '@pigment-css/nextjs-plugin';

export default withPigment(nextConfig);
```

```ts Vite
// main.tsx
import { pigment } from '@pigment-css/vite-plugin';

export default defineConfig({
  plugins: [
    pigment(),
    // ... Your other plugins.
  ],
});
```

</codeblock>

Finally, import the Pigment CSS stylesheet in your `layout.tsx` (Next.js) or `main.tsx` (Vite) file:

```js
import '@pigment-css/react/styles.css';
```

## Usage

Pigment CSS addresses the needs of modern React development: it's compatible with React Server Components and lets you reap the benefits of CSS-in-JS—all without runtime performance costs.

With Pigment CSS, you can create locally scoped reusable styles, themes, CSS variables, and more.

### Styling

Pigment CSS simplifies the creation and definition of styles through various APIs:

- `css`: for reusable styles
- `globalCss`: for global styles
- `keyframes`: for reusable animation keyframes
- `styled`: for styled components

#### Creating reusable styles

Use the `css` API to create reusable styles:

```js
import { css } from '@pigment-css/react';
```

You can do this with either template or object syntax:

**Template syntax**

```js
const bodyBackground = css`
  background-color: #000;
  color: #fff;
`;
```

**Object syntax**

```js
const mainClass = css({
  display: '#000',
  color: '#fff',
});
```

#### Creating global styles

Use the `globalCss` API to define global styles to load across an entire app.

You should define these at the top level of your JavaScript file:

```js
import { globalCss } from '@pigment-css/react';

globalCss`
  body {
    margin: 0;
    padding: 0;
  }
`;
```

#### Creating styled components

Keeping styles scoped to components ensures that only the necessary CSS is loaded and leads to better modularity, readability, and maintainability.
You can apply conditional styling to your components based on props or runtime values.

Use the `styled` API to create styled components:

```js
import { styled } from '@pigment-css/react';

const Heading = styled('div')({
  fontSize: '2rem',
  color: '#9FADBC',
  fontWeight: 'bold',
  margin: '1rem',
});
```

**Styling based on props**

Use the `variants` key to define different styling options based on props.
This approach is recommended when the value of the prop is known at build time.

Each of the `variants` is an object with `props` and `style` keys:

```js
import { styled } from '@pigment-css/react';

const Heading = styled('div')({
  fontSize: '2rem',
  color: '#9FADBC',
  fontWeight: 'bold',
  margin: '1rem',
  variants: [
    {
      props: { variant: 'success' },
      style: { color: '#23AD79' },
    },
    {
      props: { size: 'small' },
      style: { fontSize: '1.5rem' },
    },
  ],
});
```

**Styling based on runtime values**

When the value of a prop is unknown ahead of time, you can style your components based on runtime values:

```js
const Heading = styled('h1')({
  color: ({ isError }) => (isError ? 'red' : 'black'),
});
```

### Themes

Pigment CSS supports theming to apply consistent styles and values across your application.
You can create themes by defining them in your config file:

```js
import { withPigment } from '@pigment-css/nextjs-plugin';

export default withPigment(nextConfig, {
  theme: {
    colors: {
      primary: 'tomato',
      secondary: 'cyan',
    },
    spacing: {
      unit: 8,
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    // ...more keys and values, it's free style!
  },
});
```

To access your themes, use a callback with the `styled()` and `css()` APIs:

```js
const Heading = styled('h1')(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.spacing.unit * 4,
  fontFamily: theme.typography.fontFamily,
}));
```

#### CSS variables support

Pigment CSS generates CSS variables from the theme values when they're wrapped by the `extendTheme` utility, creating a `vars` object:

```js
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';

export default withPigment(nextConfig, {
  theme: extendTheme({
    colors: {
      primary: 'tomato',
      secondary: 'cyan',
    },
    spacing: {
      unit: 8,
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  }),
});
```

#### Color schemes

You can use the `colorSchemes` key within the `extendTheme` utility to assign different values based on different conditions, such as switching between dark mode and light mode:

```js
extendTheme({
  colorSchemes: {
    light: {
      colors: {
        background: '#f9f9f9',
        foreground: '#121212',
      },
    },
    dark: {
      colors: {
        background: '#212121',
        foreground: '#fff',
      },
    },
  },
});
```

Pigment CSS uses the `prefers-color-scheme` media query by default to switch between color schemes:

```js
const colorScheme = css`
  background-color: ${({ theme }) => theme.colorSchemes.dark.colors.background};
  color: ${({ theme }) => theme.colorSchemes.dark.colors.foreground};

  @media (prefers-color-scheme: light) {
    background-color: ${({ theme }) => theme.colorSchemes.light.colors.background};
    color: ${({ theme }) => theme.colorSchemes.light.colors.foreground};
  }
`;
```

You can also customize the behavior by providing a `getSelector` function:

```diff
 extendTheme({
   colorSchemes: {
     light: { ... },
     dark: { ... },
   },
+  getSelector: (colorScheme) => colorScheme ? `.theme-${colorScheme}` : ':root',
 });
```

### The sx prop

Pigment CSS includes [the `sx` prop](/system/getting-started/the-sx-prop/) which lets you provide one-off inline custom styles to any element.

At build time, Pigment CSS replaces the `sx` prop with `className` and `style` props.
The `sx` prop works with all Material UI components as well as HTML elements and any third-party JSX components.

```js
<div sx={{ display: 'flex', flexDirection: 'column' }}>

<AnyComponent sx={{ fontSize: 12, color: 'red' }} />;
```

If you use the `sx` prop on an HTML element, you'll need to augment the `HTMLAttributes` interface:

```ts
type Theme = {
  // your theme type
};

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?:
        | React.CSSProperties
        | ((theme: Theme) => React.CSSProperties)
        | ReadonlyArray<
            React.CSSProperties | ((theme: Theme) => React.CSSProperties)
          >;
    }
  }
}
```

### Runtime theme

:::info

**Caveat**

- Avoid using the runtime theme unless you have a compelling reason.
- The runtime theme contains [**only serializable values**](https://developer.mozilla.org/en-US/docs/Glossary/Serializable_object) (some functions still exist in `breakpoints` and `transitions` for internal logic inside components but may be removed in the future).
- The runtime theme will not change between modes (light and dark) because it is pre-compiled at build time. To render something based on the theme structure and its values, use `theme.vars.*` to refer to CSS variables instead.

:::

To access the runtime theme, use the `useTheme` hook:

```js
import { useTheme } from '@mui/material-pigment-css';

function MyComponent() {
  const theme = useTheme();

  return (
    <div>
      {Object.entries(theme.vars.palette.primary).map(([key, value]) => (
        <div key={key} style={{ width: 40, height: 40, background: value }}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}
```
