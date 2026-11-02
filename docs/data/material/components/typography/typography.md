---
productId: material-ui
title: React Typography component
components: Typography
githubLabel: 'scope: typography'
materialDesign: https://m2.material.io/design/typography/the-type-system.html
githubSource: packages/mui-material/src/Typography
---

# Typography

<p class="description">Use typography to present your design and content as clearly and efficiently as possible.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Roboto font

Material UI uses the [Roboto](https://fonts.google.com/specimen/Roboto) font by default.
Add it to your project via Fontsource, or with the Google Fonts CDN.

<codeblock storageKey="package-manager">

```bash npm
npm install @fontsource/roboto
```

```bash pnpm
pnpm add @fontsource/roboto
```

```bash yarn
yarn add @fontsource/roboto
```

</codeblock>

Then you can import it in your entry point like this:

```tsx
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

:::info
Fontsource can be configured to load specific subsets, weights, and styles. Material UI's default typography configuration relies only on the 300, 400, 500, and 700 font weights.
:::

### Google Web Fonts

To install Roboto through the Google Web Fonts CDN, add the following code inside your project's `<head />` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>
```

## Component

### Usage

The Typography component follows the [Material Design typographic scale](https://m2.material.io/design/typography/#type-scale) that provides a limited set of type sizes that work well together for a consistent layout.

{{"component": "file://./demos/types/index.ts"}}

### Theme keys

In some situations you might not be able to use the Typography component.
Hopefully, you might be able to take advantage of the [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) keys of the theme.

{{"component": "file://./demos/theme/index.ts"}}

## Customization

### Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. See the [Adding & disabling variants](/material-ui/customization/typography/#adding-disabling-variants) page for more info.

### Changing the semantic element

The Typography component uses the `variantMapping` prop to associate a UI variant with a semantic element.
It's important to realize that the style of a typography component is independent from the semantic underlying element.

To change the underlying element for a one-off situation, like avoiding two `h1` elements in your page, use the `component` prop:

```jsx
<Typography variant="h1" component="h2">
  h1. Heading
</Typography>
```

To change the typography element mapping globally, [use the theme](/material-ui/customization/typography/#adding-disabling-variants):

```js
const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
```

### sx prop

Use the [`sx` prop](/system/getting-started/the-sx-prop/) to quickly customize any Typography instance using a superset of CSS that has access to all the style functions and theme-aware properties exposed in the MUI System package.
Below is an example of how to apply margin using this prop:

```jsx
<Typography sx={{ m: 2 }} />
```

## Accessibility

Key factors to follow for an accessible typography:

- **Color**. Provide enough contrast between text and its background, check out the minimum recommended [WCAG 2.2 color contrast ratio](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) (4.5:1).
- **Font size**. Use [relative units (rem)](/material-ui/customization/typography/#font-size), instead of pixels, to accommodate the user's browser settings.
- **Heading hierarchy**. Based on [the W3 guidelines](https://www.w3.org/WAI/tutorials/page-structure/headings/), don't skip heading levels. Make sure to [separate the semantics from the style](#changing-the-semantic-element).
