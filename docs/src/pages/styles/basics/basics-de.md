# @material-ui/styles

<p class="description">Sie können die Styling-Lösung von Material-UI in Ihrer App verwenden, unabhängig davon, ob Sie Material-UI-Komponenten verwenden.</p>

Material-UI hat das Ziel, solide Grundlagen für dynamische UIs zu schaffen. Material-UI hat das Ziel, solide Grundlagen für dynamische UIs zu schaffen. Sie können es verwenden, müssen aber nicht, da Material-UI auch mit allen anderen wichtigen Styling-Lösungen [verwendbar ist](/guides/interoperability/).

## Wieso die Styling-Lösung von Material-UI benutzten?

In früheren Versionen hat Material-UI LESS verwendet, eine benutzerdefinierte Inline-Lösung zum Schreiben der Stile der Komponenten. Diese Ansätze erwiesen sich jedoch als begrenzt Einsetzbar. [Eine *CSS-in-JS* Lösung](https://github.com/oliviertassinari/a-journey-toward-better-style) überwindet viele dieser Einschränkungen, und **schaltet viele großartige Funktionen frei** (Theme-Verschachtelung, dynamische Stile, Selbsthilfe, etc.).

Die Styling-Lösung von Material-UI ist von vielen anderen Styling-Bibliotheken wie [styled-components](https://www.styled-components.com/) und [emotion](https://emotion.sh/) inspiriert.

- 💅 Sie können [die gleichen Vorteile](https://www.styled-components.com/docs/basics#motivation) wie bei styled-components erwarten.

<!-- #default-branch-switch -->

- 🚀 Es ist [blitzschnell](https://github.com/mui-org/material-ui/blob/HEAD/benchmark/server#material-uistyles).
- 🧩 Es ist erweiterbar über eine [Plugin](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.
- ⚡️ Es verwednet [JSS](https://github.com/cssinjs/jss) im Kern - ein JavaScript zum CSS-Compiler mit [hohe Leistung](https://github.com/cssinjs/jss/blob/master/docs/performance.md), der zur Laufzeit und serverseitig arbeitet.
- 📦 Weniger als [15 KB komprimiert](https://bundlephobia.com/result?p=@material-ui/styles); und keine Erhöhung der Bündelgröße, wenn es zusammen mit der Material-UI verwendet wird.

## Installation

> `@material-ui/styles` wird erneut exportiert als `@material-ui/core/styles` - Sie müssen es nur installieren, wenn Sie es unabhängig von Material-UI verwenden möchten.

Um die Abhängigkeit zu ihrer `package.json` hinzuzufügen, führen Sie folgenden Befehl aus:

```sh
// mit npm
npm install @material-ui/styles

// mit yarn
yarn add @material-ui/styles
```

## Erste Schritte

Es gibt 3 mögliche APIs, die Sie verwenden können, um Stile zu generieren und anzuwenden, aber sie alle teilen die gleiche zugrunde liegende Logik.

### Hook API

```jsx
import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

{{"demo": "pages/styles/basics/Hook.js"}}

### Styled components API

Hinweis: Dies gilt nur für aufrufende Syntax-Stil-Definitionen, die noch ein JSS-Objekt verwenden. Sie können dieses Verhalten auch mit einigen Einschränkungen [ändern](/styles/advanced/#string-templates).

```jsx
import * as React from 'react';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

{{"demo": "pages/styles/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
```

{{"demo": "pages/styles/basics/HigherOrderComponent.js"}}

## Verschachteln von Selektoren

Sie können Selektoren verschachteln, um Elemente innerhalb der aktuellen Klasse oder Komponente anzuvisieren. Das folgende Beispiel benutzt die Hook-API, aber es funktioniert genauso wie die anderen APIs.

```js
const useStyles = makeStyles({
  root: {
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue'
      }
    }
  },
});
```

{{"demo": "pages/styles/basics/NestedStylesHook.js", "defaultCodeOpen": false}}

## Anpassung basierend auf Eigenschaften

Sie können eine Funktion an `makeStyles` ("Interpolation") übergeben, um den generierten Wert basierend auf den Eigenschaften der Komponente anzupassen. Die Funktion kann auf Stilregelebene oder auf CSS-Eigenschaftsebene bereitgestellt werden:

```jsx
const useStyles = makeStyles({
  // Stilregel
  foo: props => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS Eigenschaft
    color: props => props.color,
  },
});

function MyComponent() {
  // Simulierte Eigenschaften für dieses Beispiel
  const props = { backgroundColor: 'black', color: 'white' };
  // Leite die Eigenschaften als erstes Argument an useStyles() weiter
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}
```

Diese Buttonkomponente hat eine Farbeigenschaft, die ihre Farbe ändert:

### Hook-API anpassen

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### Gestylte Komponenten-API anpassen

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### API für Komponenten höherer Ordnung anpassen

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

### Stresstest

Im folgenden Stresstest können Sie die *Themefarbe* und *background-color property* live aktualisieren:

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## Using the theme context

Starting from v5, Material-UI no longer uses JSS as its default styling solution. If you still want to use the utilities exported by `@material-ui/styles`, you will need to provide the `theme` as part of the context. For this, you can use the `ThemeProvider` component available in `@material-ui/styles`, or, if you are already using `@material-ui/core`, you should use the one exported from `@material-ui/core/styles` so that the same `theme` is available for components from '@material-ui/core'.

```jsx
import { makeStyles } from '@material-ui/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  }
}));

const App = (props) => {
  const classes = useStyles();
  return <ThemeProvider theme={theme}><div {...props} className={classes.root}></ThemeProvider>;
}
```
