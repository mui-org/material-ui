---
title: React Typography component
components: Typographie
githubLabel: 'component: Typography'
materialDesign: https://material.io/design/typography/the-type-system.html
---

# Typographie

<p class="description">Utilisez la typographie pour présenter votre design et votre contenu aussi clairement et efficacement que possible.</p>

Trop de types de formats et de styles à la fois peuvent gâcher n'importe quelle mise en page. Une [échelle typographique](https://material.io/design/typography/#type-scale) a un ensemble limité de tailles de type qui fonctionnent bien ensemble avec la grille de mise en page.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Général

La police *Roboto* ne sera **pas** automatiquement chargée par Material-UI. You are responsible for loading any fonts used in your application. Roboto Font a quelques moyens faciles pour commencer. Pour une configuration plus avancée, consultez [la section de personnalisation du thème](/customization/typography/).

## Roboto Font CDN

Afficher ci-dessous est un exemple de balisage de lien utilisé pour charger la police Roboto à partir d'un CDN :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Installer via npm

Vous pouvez [l'installer](https://www.npmjs.com/package/@fontsource/roboto) en tapant la commande ci-dessous dans votre terminal :

`npm install @fontsource/roboto`

Ensuite, vous pouvez l'importer dans votre point d'entrée.

```js
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

For more info check out [Fontsource](https://github.com/fontsource/fontsource).

Fontsource can be configured to load specific subsets, weights and styles. Material-UI default typography configuration only relies on 300, 400, 500, and 700 font weights.

## Composant

The Typography component makes it easy to apply a default set of font weights and sizes in your application.

{{"demo": "pages/components/typography/Types.js"}}

## Thème

In some situations you might not be able to use the `Typography` component. Hopefully, you might be able to take advantage of the [`typography`](/customization/default-theme/?expand-path=$.typography) keys of the theme.

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## Changing the semantic element

The Typography component uses the `variantMapping` property to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element.

- You can change the underlying element for a one time occasion with the `component` property:

```jsx
{/* There is already an h1 in the page, let's not duplicate it. */}
<Typography variant="h1" component="h2">
  h1. */}
<Typography variant="h1" component="h2">
  h1.
```

- You can change the mapping [globally using the theme](/customization/theme-components/#default-props):

```js
const theme = createTheme({
  props: {
    MuiTypography: {
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
});
```

## Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. See the [Adding & disabling variants](/customization/typography/#adding-amp-disabling-variants) example for more info.

## System props

As a CSS utility component, the `Typography` supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Typography mt={2}>
```

## Accessibilité

A few key factors to follow for an accessible typography:

- **Color**. Provide enough contrast between text and its background, check out the minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Font size**. Use [relative units (rem)](/customization/typography/#font-size) to accommodate the user's settings.
- **Heading hierarchy**. [Don't skip](https://www.w3.org/WAI/tutorials/page-structure/headings/) heading levels. In order to solve this problem, you need to [separate the semantics from the style](#changing-the-semantic-element).
