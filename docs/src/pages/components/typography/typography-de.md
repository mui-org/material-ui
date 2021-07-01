---
title: React Typography component
components: Typografie
githubLabel: 'component: Typography'
materialDesign: https://material.io/design/typography/the-type-system.html
---

# Typografie

<p class="description">Verwenden Sie die Typografie, um Ihr Design und Ihren Inhalt so klar und effizient wie möglich darzustellen.</p>

Zu viele Schriftgrößen und -stile gleichzeitig können jedes Layout beeinträchtigen. Eine [typografische Skala](https://material.io/design/typography/#type-scale) hat einen begrenzten Satz von Schriftgrößen, die gut mit dem Layoutraster zusammenarbeiten.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Allgemein

Die *Roboto* Schriftart wird **nicht** automatisch durch Material UI geladen werden. You are responsible for loading any fonts used in your application. Roboto Font bietet einige einfache Einstiegsmöglichkeiten. Für anspruchsvollere Konfiguration, besuche [den Theme Anpassung Abschnitt](/customization/typography/).

## Die Roboto Schrift

Unten ist ein Beispiel für ein Link-Markup zum Laden der Roboto-Schriftart von einem CDN dargestellt:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Mit npm installieren

Sie können [diese installieren](https://www.npmjs.com/package/@fontsource/roboto) durch den folgenden Befehl im Terminal:

`npm install @fontsource/roboto`

Dann können Sie es in Ihren Einstiegspunkt importieren.

```js
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

For more info check out [Fontsource](https://github.com/fontsource/fontsource).

Fontsource can be configured to load specific subsets, weights and styles. Material-UI default typography configuration only relies on 300, 400, 500, and 700 font weights.

## Komponente

The Typography component makes it easy to apply a default set of font weights and sizes in your application.

{{"demo": "pages/components/typography/Types.js"}}

## Theme

In einigen Situationen können Sie möglicherweise die Komponente `Typography` nicht benutzen. Hoffentlich können Sie die Hauptfunktionalitäten der [`Typografie`](/customization/default-theme/?expand-path=$.typography) des Themas nutzen.

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## Ändern des semantischen Elements

Die Komponente Typografie verwendet die Eigenschaft `variantMapping` um eine UI-Variante einem semantischen Element zuzuordnen. It's important to realize that the style of a typography component is independent from the semantic underlying element.

- You can change the underlying element for a one time occasion with the `component` property:

```jsx
{/* There is already an h1 in the page, let's not duplicate it. */}
<Typography variant="h1" component="h2">
  h1. */}
<Typography variant="h1" component="h2">
  h1.
```

- Sie können das Mapping [global mit dem Theme](/customization/theme-components/#default-props) ändern:

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

## Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. See the [Adding & disabling variants](/customization/typography/#adding-amp-disabling-variants) example for more info.

## System props

As a CSS utility component, the `Typography` supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Typography mt={2}>
```

## Barrierefreiheit

A few key factors to follow for an accessible typography:

- **Farbe**. Provide enough contrast between text and its background, check out the minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Schriftgröße**. Use [relative units (rem)](/customization/typography/#font-size) to accommodate the user's settings.
- **Heading hierarchy**. [Don't skip](https://www.w3.org/WAI/tutorials/page-structure/headings/) heading levels. In order to solve this problem, you need to [separate the semantics from the style](#changing-the-semantic-element).
