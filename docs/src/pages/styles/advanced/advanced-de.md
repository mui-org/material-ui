# Erweitert

<p class="description">In diesem Abschnitt wird die erweiterte Verwendung von @material-ui/core/styles behandelt.</p>

## Theming

Sie können das äußere Theme erweitern, indem Sie eine Funktion bereitstellen: Das innere Theme ** überschreibt** das äußere Theme.

> In diesem Beispiel wird ein Designobjekt für benutzerdefinierte Komponenten erstellt. If you intend to use some of the Material-UI's components you need to provide a richer theme structure using the `createTheme()` method. Head to the the [theming section](/customization/theming/) to learn how to build your custom Material-UI theme.

```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import DeepChild from './my_components/DeepChild';

const theme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

function Theming() {
  return (
    <ThemeProvider theme={theme}>
      <DeepChild />
    </ThemeProvider>
  );
}
```

{{"demo": "pages/styles/advanced/Theming.js"}}

### Zugriff auf das Theme in einer Komponente

Möglicherweise müssen Sie auf die Themevariablen in Ihren React-Komponenten zugreifen.

#### `useTheme` hook

Zur Verwendung in Funktionskomponenten:

```jsx
import { useTheme } from '@material-ui/core/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

{{"demo": "pages/styles/advanced/UseTheme.js"}}

#### `withTheme` HOC

Zur Verwendung in Klassen- oder Funktionskomponenten:

```jsx
import { withTheme } from '@material-ui/core/styles';

function DeepChildRaw(props) {
  return <span>{`spacing ${props.theme.spacing}`}</span>;
}

const DeepChild = withTheme(DeepChildRaw);
```

{{"demo": "pages/styles/advanced/WithTheme.js"}}

### Verschachtelung des Themes

Sie können mehrere Theme Provider verschachteln. Dies kann sehr nützlich sein, wenn Sie sich mit unterschiedlichen Bereichen Ihrer Anwendung befassen, die sich voneinander unterscheiden.

```jsx
<ThemeProvider theme={outerTheme}>
  <Child1 />
  <ThemeProvider theme={innerTheme}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

{{"demo": "pages/styles/advanced/ThemeNesting.js"}}

Das innere Theme ** überschreibt** das äußere Theme. Sie können das äußere Theme erweitern, indem Sie eine Funktion bereitstellen:

```jsx
<ThemeProvider theme={…} >
  <Child1 />
  <ThemeProvider theme={outerTheme => ({ darkMode: true, ...outerTheme })}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

## Überschreiben der Styles `classes` Eigenschaft

Die `makeStyle` (Hook-Generator) und `withStyles` (HOC) APIs ermöglichen die Erstellung mehrerer Stilregeln pro Stylesheet. Jede Stilregel hat einen eigenen Klassennamen. Die Klassennamen werden der Komponente mit der `classes` Variable zur Verfügung gestellt. Dies ist besonders nützlich, wenn Sie verschachtelte Elemente in einer Komponente formatieren.

```jsx
// A style sheet
const useStyles = makeStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
});

function Nested(props) {
  const classes = useStyles();
  return (
    <button className={classes.root}>
      {/* 'jss1' */}
      <span className={classes.label}>{/* 'jss2' nested */}</span>
    </button>
  );
}

function Parent() {
  return <Nested />;
}
```

Die Klassennamen sind jedoch häufig nicht deterministisch. Wie kann eine übergeordnete Komponente den Stil eines verschachtelten Elements überschreiben?

### `withStyles`

Dies ist der einfachste Fall. Die umschlossene Komponente akzeptiert die `classes` Eigenschaft, welches einfach die mit dem Stylesheet gelieferten Klassennamen zusammengeführt wird.

```jsx
const Nested = withStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
})(({ classes }) => (
  <button className={classes.root}>
    <span className={classes.label}>{/* 'jss2 my-label' Nested*/}</span>
  </button>
));

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />;
}
```

### `makeStyles`

Die Hook-API erfordert etwas mehr Arbeit. Sie müssen die übergeordneten Eigenschaften als erstes Argument an den Hook übergeben.

```jsx
const useStyles = makeStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
});

function Nested(props) {
  const classes = useStyles(props);
  return (
    <button className={classes.root}>
      <span className={classes.label}>{/* 'jss2 my-label' nested */}</span>
    </button>
  );
}

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />;
}
```

## JSS-Plugins

JSS nutzt Plugins um seinen Kern zu erweitern, sodass Sie die Funktionen, die Sie benötigen auswählen können. Sie bezahlen nur für den Leistungsaufwand, den Sie verwenden.

Nicht alle Plugins sind standardmäßig in der Material-UI verfügbar. Folgende (die eine Teilmenge von [jss-preset-default](https://cssinjs.org/jss-preset-default/) sind) sind inklusive:

- [jss-plugin-rule-value-function](https://cssinjs.org/jss-plugin-rule-value-function/)
- [jss-plugin-global](https://cssinjs.org/jss-plugin-global/)
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)

Selbstverständlich können Sie weitere Plugins benutzen. Hier ist ein Beispiel mit dem [ jss-rtl ](https://github.com/alitaheri/jss-rtl) Plugin.

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import rtl from 'jss-rtl';

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

## String-Vorlagen

Wenn Sie die CSS-Syntax gegenüber JSS bevorzugen, können Sie das [jss-plugin-template](https://cssinjs.org/jss-plugin-template/) Plugin verwenden.

```jsx
const useStyles = makeStyles({
  root: `
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    font-size: 16px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  `,
});
```

Beachten Sie, dass dies keine Selektoren oder verschachtelten Regeln unterstützt.

{{"demo": "pages/styles/advanced/StringTemplates.js"}}

## CSS-Injektionsreihenfolge

> It's **really important** to understand how the CSS specificity is calculated by the browser, as it's one of the key elements to know when overriding styles. Sie werden gebeten, diesen MDN-Absatz zu lesen: [Wie wird spezifität berechnet?](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#How_is_specificity_calculated)

Standardmäßig werden die Style-Tags **zuletzt** im `<head>` -Element der Seite eingefügt. Sie erhalten mehr Details als jedes andere Styletag auf Ihrer Seite, z.B. CSS-Module oder StilKomponenten.

### injectFirst

Der `StylesProvider` Komponente hat eine `injectFirst` Eigenschaft, um **zuerst** die Style-Tags im Kopf einzufügen (weniger Priorität):

```jsx
import { StylesProvider } from '@material-ui/styles';

<StylesProvider injectFirst>
  {/* Dein Komponentenbaum.
      Mit Stil versehene Komponenten können die Stile von Material-UI überschreiben. */}
</StylesProvider>;
```

### `makeStyle` / `withStyles` / `styled`

Das Einfügen von Style-Tags erfolgt in der **gleichen Reihenfolge** wie die `makeStyles`/`withStyles`/`styled` Aufrufe. Zum Beispiel gewinnt die Farbe Rot in diesem Fall:

```jsx
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStylesBase = makeStyles({
  root: {
    color: 'blue', // 🔵
  },
});

const useStyles = makeStyles({
  root: {
    color: 'red', // 🔴
  },
});

export default function MyComponent() {
  // Order doesn't matter
  const classes = useStyles();
  const classesBase = useStylesBase();

  // Order doesn't matter
  const className = clsx(classes.root, classesBase.root);

  // color: red 🔴 wins.
  return <div className={className} />;
}
```

Eigenschaft einer Komponente verwenden, um die Styles zu überschreiben.

### insertionPoint

### insertionPoint ### insertionPoint ### insertionPoint ### insertionPoint JSS \[bietet einen Mechanismus\](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point) um diese Situation zu kontrollieren. Durch Hinzufügen der Platzierung des `Einfügepunkts` innerhalb Ihres HTML-Heads können Sie die \[Reihenfolge steuern\](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order), sodass die CSS-Regeln auf Ihre Komponenten angewendet werden.

#### HTML-Kommentar

In diesem Beispiel wird ein Html-String zurückgegeben und die erforderliche kritische Css direkt vor ihrer Verwendung eingebettet:

```html
<head>
  <!-- jss-insertion-point -->
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  //  Wir definieren einen individuellen insertion point, welcher von JSS benutzt wird, um die Stile in den DOM einzufügen.
  insertionPoint: 'jss-insertion-point',
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

#### Andere HTML-Elemente

The way that you do this is by passing a `<meta property="csp-nonce" content={nonce} />` tag in the `<head>` of your HTML. JSS will then, by convention, look for a `<meta property="csp-nonce"` tag and use the `content` value as the nonce.

```jsx
<head>
  <noscript id="jss-insertion-point" />
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  //  Wir definieren einen individuellen insertion point, welcher von JSS benutzt wird, um die Stile in den DOM einzufügen.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

#### JS createComment

codesandbox.io verhindert Zugriff auf das `<head>` Element. Um dieses Problem zu umgehen, können Sie die JavaScript `document.createComment()` API verwenden:

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  ...jssPreset(),
  // Definiert einen benutzerdefinierten Einfügepunkt, den JSS beim Einfügen der Stile in das DOM sucht.
  insertionPoint: 'jss-insertion-point',
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

## Server-Rendering

This example returns a string of HTML and inlines the critical CSS required, right before it's used:

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

function render() {
  const sheets = new ServerStyleSheets();

  const html = ReactDOMServer.renderToString(sheets.collect(<App />));
  const css = sheets.toString();

  return `
<!DOCTYPE html>
<html>
  <head>
    <style id="jss-server-side">${css}</style>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>
  `;
}
```

You can [follow the server side guide](/guides/server-rendering/) for a more detailed example, or read the [`ServerStyleSheets` API documentation](/styles/api/#serverstylesheets).

### Gatsby

Es gibt [ein offizielles Gatsby-Plugin](https://github.com/hupe1980/gatsby-plugin-material-ui) das serverseitiges Rendering für `@material-ui/styles` ermöglicht. Anleitungen zur Einrichtung und Verwendung finden Sie auf der Seite des Plugins.

<!-- #default-branch-switch -->

Hier finden Sie [Dieses Beispiel für Gatsby-Projekt](https://github.com/mui-org/material-ui/blob/next/examples/gatsby) ein aktuelles Nutzungsbeispiel.

### Next.js

Siehe [dieses Beispielprojekt](https://github.com/mui-org/material-ui/blob/next/examples/nextjs) für ein aktuelles Verwendungsbeispiel.

Die Klassennamen werden von dem [Klassennamengenerator](/styles/api/#creategenerateclassname-options-class-name-generator) generiert.

## Klassennamen

Die Klassennamen werden von dem [Klassennamengenerator](/styles/api/#creategenerateclassname-options-class-name-generator) generiert.

### Standard

Standardmäßig sind die Klassennamen, die von `@material-ui/core/styles` generiert werden, **nicht deterministisch**; Sie können sich nicht darauf verlassen, dass sie gleich bleiben. Nehmen wir den folgenden Stil als Beispiel:

```js
const useStyles = makeStyles({
  root: {
    opacity: 1,
  },
});
```

Dadurch wird ein Klassenname wie `makeStyles-root-123` generiert.

Sie müssen die `Klassen` Eigenschaft einer Komponente verwenden, um die Styles zu überschreiben. Die nicht deterministische Natur der Klassennamen ermöglicht die Stilisolation.

- In der **Entwicklung** lauten der Klassenname: `.makeStyles-root-123` nach dieser Logik:

```js
const sheetName = 'makeStyles';
const ruleName = 'root';
const identifier = 123;

const className = `${sheetName}-${ruleName}-${identifier}`;
```

- In der **Produktion** lauten der Klassenname: `.jss123` nach dieser Logik:

```js
const productionPrefix = 'jss';
const identifier = 123;

const className = `${productionPrefix}-${identifier}`;
```

### Dies ist eine Vereinfachung des `@material-ui/core/Button` Stylesheet der Komponente.

Die generierten Klassennamen der `@material-ui/core` Komponenten verhalten sich anders. Wenn die folgenden Bedingungen erfüllt sind, sind die Klassennamen **deterministisch**:

- Es wird nur ein Themeanbieter verwendet (**Keine Verschachtelung von Themes**)
- Das style sheet  hat einen Namen, der mit `Mui`(alle Material-UI Komponenten).
- Das `disableGlobal`Option des [Klassen Namen Generator ](/styles/api/#creategenerateclassname-options-class-name-generator) ist `false`(Standart).

Diese Bedingungen werden bei den häufigsten Anwendungsfällen von `@material-ui/core` erfüllt. Zum Beispiel dieses Stylesheet:

```jsx
const useStyles = makeStyles(
  {
    root: {
      /* … */
    },
    label: {
      /* … */
    },
    outlined: {
      /* … */
      '&$disabled': {
        /* … */
      },
    },
    outlinedPrimary: {
      /* … */
      '&:hover': {
        /* … */
      },
    },
    disabled: {},
  },
  { name: 'MuiButton' },
);
```

generiert die folgenden Klassennamen, die Sie überschreiben können:

```css
.MuiButton-root {
  /* … */
}
.MuiButton-label {
  /* … */
}
.MuiButton-outlined {
  /* … */
}
.MuiButton-outlined.Mui-disabled {
  /* … */
}
.muibutton-outlinedprimary: {
  /* … */
}
.MuiButton-outlinedPrimary:hover {
  /* … */
}
```

_Dies ist eine Vereinfachung des `@material-ui/core/Button` Stylesheet der Komponente._

Die Anpassung des TextFields kann mit der [ `classes-`API ](#overriding-styles-classes-prop) mühsam sein, wo Sie die classes Eingenschaft definieren müssen. Die Standardwerte sind, wie oben beschrieben, einfacher zu verwenden. Zum Beispiel:

```jsx
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const StyledTextField = styled(TextField)`
  label.focused {
    color: green; 💚
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red; 💔
    }
    &:hover fieldset {
      border-color: yellow; 💛
    }
    &.Mui-focused fieldset {
      border-color: green; 💚
    }
  }
`;
```

{{"demo": "pages/styles/advanced/GlobalClassName.js"}}

## Globales CSS

### `jss-plugin-global`

Das [`jss-plugin-global`](#jss-plugins) Plugin ist in der Standardvoreinstellung installiert. Sie können es verwenden, um globale Klassennamen zu definieren.

{{"demo": "pages/styles/advanced/GlobalCss.js"}}

### Hybrid

Sie können auch JSS-generierte Klassennamen mit globalen Namen kombinieren.

{{"demo": "pages/styles/advanced/HybridGlobalCss.js"}}

## CSS-Präfix

JSS verwendet Featureerkennung, um die korrekten Präfixe anzuwenden. [Seien Sie nicht überrascht](https://github.com/mui-org/material-ui/issues/9293) wenn Sie in der neuesten Version von Chrome kein bestimmtes Präfix sehen können. Ihr Browser benötigt es wahrscheinlich nicht.
