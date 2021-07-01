# About the lab

<p class="description">This package hosts the incubator components that are not yet ready to move to the core.</p>

The main difference between the lab and the core is how the components are versioned. Having a separate lab package allows us to release breaking changes when necessary while the core package follows a [slower-moving policy](https://material-ui.com/versions/#release-frequency).

As developers use and test the components and report issues, the maintainers learn more about shortcomings of the components: missing features, accessibility issues, bugs, API design, etc. The older and more used a component is, the less likely it is that new issues will be found and subsequently need to introduce breaking changes.

For a component to be ready to move to the core, the following criteria are considered:

- It needs to be **used**. The Material-UI team uses Google Analytics in the documentation (among other metrics) to evaluate the usage of each component. A lab component with low usage either means that it isn't fully working yet, or that there is low demand for it.
- It needs to match the **code quality** of the core components. It doesn't have to be perfect to be part of the core, but the component should be reliable enough that developers can depend on it.
  - Each component needs **type definitions**. It is not currently required that a lab component is typed, but it would need to be typed to move to the core.
  - Requires good **test coverage**. Some of the lab components don't currently have comprehensive tests.
- Can it be used as **leverage** to incentivize users to upgrade to the latest major release? The less fragmented the community is, the better.
- It needs to have a low probability of a **breaking change** in the short/medium future. For instance, if it needs a new feature that will likely require a breaking change, it may be preferable to delay its promotion to the core.

## Installation

Install the package in your project directory with:

```sh
// with npm
npm install @material-ui/lab@next

// with yarn
yarn add @material-ui/lab@next
```

The lab has a peer dependency on the core components.
If you are not already using Material-UI in your project, you can install it with:

```sh
// with npm
npm install @material-ui/core@next

// with yarn
yarn add @material-ui/core@next
```

## TypeScript

In order to benefit from the [CSS overrides](/customization/theme-components/#global-style-overrides) and [default prop customization](/customization/theme-components/#default-props) with the theme, TypeScript users need to import the following types. Internally, it uses [module augmentation](/guides/typescript/#customization-of-theme) to extend the default theme structure with the extension components available in the lab.

```tsx
import '@material-ui/lab/themeAugmentation';

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
