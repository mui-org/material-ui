# About the lab

<p class="description">This package hosts the incubator components that are not yet ready to move to the core.</p>

The main difference between the lab and the core is how the components are versioned. Having a separate lab package allows us to release breaking changes when necessary while the core package follows a [slower-moving policy](/material-ui/getting-started/versions/#release-frequency).

As developers use and test the components and report issues, the maintainers learn more about shortcomings of the components: missing features, accessibility issues, bugs, API design, etc. The older and more used a component is, the less likely it is that new issues will be found and subsequently need to introduce breaking changes.

For a component to be ready to move to the core, the following criteria are considered:

- It needs to be **used**. We use Google Analytics in the documentation (among other metrics) to evaluate the usage of each component. A lab component with low usage either means that it isn't fully working yet, or that there is low demand for it.
- It needs to match the **code quality** of the core components. It doesn't have to be perfect to be part of the core, but the component should be reliable enough that developers can depend on it.
  - Each component needs **type definitions**. It is not currently required that a lab component is typed, but it would need to be typed to move to the core.
  - Requires good **test coverage**. Some of the lab components don't currently have comprehensive tests.
- Can it be used as **leverage** to incentivize users to upgrade to the latest major release? The less fragmented the community is, the better.
- It needs to have a low probability of a **breaking change** in the short/medium future. For instance, if it needs a new feature that will likely require a breaking change, it may be preferable to delay its promotion to the core.

## Installation

To install and save in your `package.json` dependencies, run one of the following commands:

<!-- #npm-tag-reference -->

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/lab@next @mui/material@next
```

```bash pnpm
pnpm add @mui/lab@next @mui/material@next
```

```bash yarn
yarn add @mui/lab@next @mui/material@next
```

</codeblock>

Note that the lab has a peer dependency on the Material UI components.

## TypeScript

In order to benefit from the [CSS overrides](/material-ui/customization/theme-components/#theme-style-overrides) and [default prop customization](/material-ui/customization/theme-components/#theme-default-props) with the theme, TypeScript users need to import the following types. Internally, it uses [module augmentation](/material-ui/guides/typescript/#customization-of-theme) to extend the default theme structure with the extension components available in the lab.

```tsx
import type {} from '@mui/lab/themeAugmentation';

const theme = createTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});
```
