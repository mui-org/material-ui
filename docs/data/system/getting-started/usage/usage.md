# Usage

<p class="description">Learn the basics of working with MUI System and its utilities.</p>

## Why use MUI System?

MUI System's `sx` prop lets you avoid writing unnecessary styled-component code, and instead define styles directly within the component itself.
This is especially useful for one-off components with custom designs.

The following code samples illustrate the difference between styled-components and `sx`:

{{"component": "file://./demos/why/index.ts", "bg": true, "collapseToEmpty": true}}

1. Using the styled-components API:

```jsx
const StatWrapper = styled('div')(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: ${theme.shadows[1]};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(2)};
  min-width: 300px;
`,
);

const StatHeader = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
`,
);

const StyledTrend = styled(TrendingUpIcon)(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  font-size: 16px;
  vertical-alignment: sub;
`,
);

const StatValue = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  font-size: 34px;
  font-weight: ${theme.typography.fontWeightMedium};
`,
);

const StatDiff = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  display: inline;
  font-weight: ${theme.typography.fontWeightMedium};
  margin-left: ${theme.spacing(0.5)};
  margin-right: ${theme.spacing(0.5)};
`,
);

const StatPrevious = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
  display: inline;
  font-size: 12px;
`,
);

return (
  <StatWrapper>
    <StatHeader>Sessions</StatHeader>
    <StatValue>98.3 K</StatValue>
    <StyledTrend />
    <StatDiff>18.77%</StatDiff>
    <StatPrevious>vs last week</StatPrevious>
  </StatWrapper>
);
```

2. Using MUI System:

```jsx
<Box
  sx={{
    bgcolor: 'background.paper',
    boxShadow: 1,
    borderRadius: 1,
    p: 2,
    minWidth: 300,
  }}
>
  <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
  <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
    98.3 K
  </Box>
  <Box
    component={TrendingUpIcon}
    sx={{ color: 'success.dark', fontSize: 16, verticalAlign: 'sub' }}
  />
  <Box
    sx={{ color: 'success.dark', display: 'inline', fontWeight: 'medium', mx: 0.5 }}
  >
    18.77%
  </Box>
  <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
    vs. last week
  </Box>
</Box>
```

### The sx prop

MUI System's core utility is the `sx` prop, which gives you a quick and efficient way to apply the correct design tokens directly to a React element.

This prop provides a superset of CSS (that is it contains all CSS properties and selectors in addition to custom ones) that maps values directly from the theme, depending on the CSS property used.
It also simplifies the process of defining responsive values by referring to the breakpoints defined in the theme.

Visit [the `sx` prop page](/system/getting-started/the-sx-prop/) for complete details.

### Responsive demo

The following demo shows how to use the `sx` prop to apply custom styles and create a complex UI component using the `Box` wrapper alone.
Resize the window to see the responsive breakpoints:

{{"component": "file://./demos/demo/index.ts", "bg": true, "initialExpanded": true}}

## When to use MUI System

The `sx` prop is best suited for applying one-off styles to custom components.

This is in contrast to the styled-components API, which is ideal for building components that need to support a wide variety of contexts.
These components are used in many different parts of the application and support different combinations of props.

### Performance tradeoffs

MUI System relies on CSS-in-JS.
It works with both Emotion and styled-components.

#### Pros

- 📚 The `sx` prop uses a superset of CSS, so the syntax will be immediately familiar to you if you know CSS already.
  It also offers (optional) shorthand definitions that can save you time if you put in a little work to learn them upfront.
  These are documented in the **Style utilities** section of the primary navigation to the left.
- 📦 The System auto-purges, so that only the CSS that's used on the page is sent to the client.
  The initial bundle size cost is fixed—it doesn't get any larger as you add more CSS properties.
  You pay the cost of [@emotion/react](https://bundlephobia.com/package/@emotion/react) and [@mui/system](https://bundlephobia.com/package/@mui/system).
  The total size is ~15 kB gzipped.
  But if you are already using an MUI Core component library like Material UI, then it comes with no extra overhead.

#### Cons

Runtime performance takes a hit.

| Benchmark case                    | Code snippet          | Time normalized |
| :-------------------------------- | :-------------------- | --------------: |
| a. Render 1,000 primitives        | `<div className="…">` |           100ms |
| b. Render 1,000 components        | `<Div>`               |           112ms |
| c. Render 1,000 styled components | `<StyledDiv>`         |           181ms |
| d. Render 1,000 Box               | `<Box sx={…}>`        |           296ms |

<!-- #target-branch-reference -->

Visit the [benchmark folder](https://github.com/mui/material-ui/tree/master/benchmark/browser) for a reproduction of the metrics above.

We believe that for most use cases it's fast enough, but there are simple workarounds when performance becomes critical.
For instance, when rendering a list with many items, you can use a CSS child selector to have a single "style injection" point (using d. for the wrapper and a. for each item).

### API tradeoff

MUI System's unifying `sx` prop helps to maintain the separation of concerns between CSS utilities and component business logic.

For instance, a `color` prop on a button impacts multiple states (hover, focus, etc.), and is distinct from the CSS `color` property.

MUI components apply System properties through the `sx` prop.
Component props stay focused on documented component behavior, which helps avoid conflicts with native and custom component props.

## Where to use MUI System

The `sx` prop can be used in four different locations:

### Core components

All Material UI components support the `sx` prop.

### Box

[`Box`](/system/react-box/) is a lightweight component that gives access to the `sx` prop, and can be used as a utility component, and as a wrapper for other components.
It renders a `<div>` element by default.

### Custom components

In addition to MUI System components, you can add the `sx` prop to your custom components too, by using the `styled` utility from `@mui/material/styles`.

```jsx
import { styled } from '@mui/material/styles';

const Div = styled('div')``;
```

### Any element with the babel plugin

Visit [the open GitHub issue](https://github.com/mui/material-ui/issues/23220) regarding this topic to learn more.

## How to use MUI System

### Design tokens in the theme

Visit the [System properties page](/system/properties/) to learn how the different CSS (and custom) properties are mapped to the theme keys.

### Shorthands

There are many shorthands available for various CSS properties.
These are documented on their respective Style utilities pages.
Here is an example of a few:

```jsx
<Box
  sx={{  boxShadow: 1, // theme.shadows[1]
    color: 'primary.main', // theme.palette.primary.main
    m: 1, // margin: theme.spacing(1)
    p: {
      xs: 1, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
    },
    zIndex: 'tooltip', // theme.zIndex.tooltip
  }}
>
```

These shorthands are optional—they're great for saving time, but not necessary to use

### Superset of CSS

The `sx` prop supports CSS syntax including child and pseudo-selectors, media queries, raw CSS values, and more.
Here are a few examples of how you can implement these CSS features:

- Using pseudo-selectors:

  ```jsx
  <Box
    sx={{    // some styles
      ":hover": {
        boxShadow: 6,
      },
    }}
  >
  ```

- Using media queries:

  ```jsx
  <Box
    sx={{    // some styles
      '@media print': {
        width: 300,
      },
    }}
  >
  ```

- Using nested selector:

  ```jsx
  <Box
    sx={{    // some styles
      '& .ChildSelector': {
        bgcolor: 'primary.main',
      },
    }}
  >
  ```

### Responsive values

The `sx` prop simplifies the process of defining and implementing responsive breakpoints.
You can define a set of breakpoints in two different ways: as an object, or as an array.

#### Breakpoints as an object

The first option for breakpoints is to define them as an object, using the breakpoint values as keys.
Note that each property for a given breakpoint also applies to all larger breakpoints in the set.
For example, `width: { lg: 100 }` is equivalent to `theme.breakpoints.up('lg')`.

The following demo shows how to define a set of breakpoints using the object syntax:

{{"component": "file://./demos/breakpoints-as-object/index.ts"}}

:::info
📣 Starting from v6, the object structure supports [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) shorthand with `@`.

We recommend checking the [browser support](https://caniuse.com/?search=container%20que) before using CSS container queries.
:::

The shorthand syntax is `@{breakpoint}/{container}`:

- **breakpoint**: a number for `px` unit or a breakpoint key (e.g. `sm`, `md`, `lg`, `xl` for default breakpoints) or a valid CSS value (e.g. `40em`).
- **container** (optional): the name of the [containment context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries#naming_containment_contexts).

{{"component": "file://./demos/container-queries/index.ts"}}

#### Breakpoints as an array

The second option is to define your breakpoints as an array, from smallest to largest.
Here's what that looks like:

{{"component": "file://./demos/breakpoints-as-array/index.ts"}}

:::success
This option should only be considered when the theme has a limited number of breakpoints, for example 3.

We recommend using the object API instead if you need to define more than a few breakpoints.
:::

You can skip breakpoints with the `null` value:

```jsx
<Box sx={{ width: [null, null, 300] }}>This box has a responsive width.</Box>
```

#### Custom breakpoints

You can also specify your own custom breakpoints, and use them as keys when defining the breakpoints object.
Here is an example of how to do that:

```jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

export default function CustomBreakpoints() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: {
            mobile: 100,
            laptop: 300,
          },
        }}
      >
        This box has a responsive width
      </Box>
    </ThemeProvider>
  );
}
```

If you are using TypeScript, you will also need to use [module augmentation](/material-ui/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
```

#### Theme getter

If you wish to use the theme for a CSS property that is not supported natively by MUI System, then you can use a function as the value, in which you can access the theme object.
The following demo shows how this works:

{{"component": "file://./demos/value-as-function/index.ts"}}
