# API

<p class="description">The API reference of @material-ui/core/styles.</p>

## `createGenerateClassName([options]) => class name generator`

Eine Funktion, die eine [Klassennamengeneratorfunktion](https://cssinjs.org/jss-api/#generate-your-class-names) zurückgibt.

### Parameter

1. `options` (_object_ [optional]):

   - `options.disableGlobal` (_bool_ [optional]): Defaults to `false`. Deaktivieren Sie die Generierung deterministischer Klassennamen.
   - `options.productionPrefix` (*string* [optional]): Standardeinstellung ist `'jss'`. Ein String, der den Klassennamen in der Produktion vorangestellt wird.
   - `options.seed` (*string* [optional]): Standardeinstellung ist `''`. Der String, mit der der Generator eindeutig identifiziert wird. Dies kann verwendet werden, um Klassennamenskollisionen bei Verwendung mehrerer Generatoren in einem Dokument zu vermeiden.

### Rückgabewerte

`class name generator`: Der Generator der JSS zur Verfügung gestellt werden sollte.

### Beispiele

```jsx
import * as React from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

export default function App() {
  return <StylesProvider generateClassName={generateClassName}>...</StylesProvider>;
}
```

## `createStyles(styles) => styles`

Diese Funktion "macht zur Laufzeit nicht wirklich etwas", es ist nur die Identität Funktion. Sein einziger Zweck ist es, **TypeScript** Typverbreiterung zu verhindern, wenn Style-Regeln für `makeStyles`/`withStyles` bereitgestellt werden, welche eine Funktion des `Themes` sind.

### Parameter

1. `styles` (_object_): A styles object.

### Rückgabewerte

`styles`: A styles object.

### Beispiele

```jsx
import { createStyles, makeStyles } from '@material-ui/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.red,
  },
}));

const theme = createTheme();

export default function MyComponent {
  const classes = useStyles();
  return <ThemeProvider theme={theme}><div className={classes.root} /></ThemeProvider>;
}
```

## `makeStyles(styles, [options]) => hook`

Verknüpfen Sie ein Stylesheet mit einer Funktionskomponente mit dem **Hook** Muster.

### Parameter

1. `styles` (* Function | Object *): Eine Funktion, die die Stile oder ein Stilobjekt generiert. Es wird mit der Komponente verknüpft. Verwenden Sie die Funktionssignatur, wenn Sie Zugriff auf das Theme benötigen. Es ist das erste Argument.
2. `options` (_object_ [optional]):

- `options.defaultTheme` (*object* [optional]): Das Standarddesign, das verwendet werden soll, wenn ein Theme nicht über einen Theme Provider bereitgestellt wird.
- `options.name` (*string* [optional]): Der Name des Stylesheets. Nützlich zum Debuggen.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Wenn es `true` ist sind die Stile invertiert. Wenn es `null` ist, folgt es der `theme.direction` Einstellung.
- Die anderen Schlüssel werden an das Optionsargument [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet) weitergeleitet.

### Rückgabewerte

`Hook`: Ein Hook. Dieser Hook kann in einer Funktionskomponente verwendet werden. The documentation often calls this returned hook `useStyles`. Er akzeptiert ein Argument: die Eigenschaften, die für „Interpolation“ in das Stylesheet verwendet wird.

### Beispiele

```jsx
import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: (props) => props.color,
  },
});

export default function MyComponent(props) {
  const classes = useStyles(props);
  return <div className={classes.root} />;
}
```

## `ServerStyleSheets`

Dies ist ein Klassenhelfer für das serverseitige Rendering. [You can follow this guide for a practical approach](/guides/server-rendering/).

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

const sheets = new ServerStyleSheets();
const html = ReactDOMServer.renderToString(sheets.collect(<App />));
const cssString = sheets.toString();

const response = `
<!DOCTYPE html>
<html>
  <head>
    <style id="jss-server-side">${cssString}</style>
  </head>
  <body>${html}</body>
</html>
`;
```

### `neue ServerStyleSheets ([options])`

Die Instantiierung akzeptiert ein Optionsobjekt als erstes Argument.

1. `options` (_object_ [optional]): The options are spread as props to the [`StylesProvider`](#stylesprovider) component.

### `sheets.collect(node) => React element`

Die Methode schließt Ihre React Knoten in ein Provider-Element ein. Es sammelt die Stylesheets während des Renderns, um sie später an den Client zu senden.

### `sheets.toString() => CSS string`

Die Methode gibt die gesammelten Stile zurück.

⚠️ Sie müssen `.collect()` aufrufen, bevor Sie diese Methode verwenden.

### `sheets.getStyleElement() => CSS React element`

Die Methode ist eine Alternative zu `.toString()`, wenn Sie die gesamte Seite mit React rendern.

⚠️ Sie müssen `.collect()` aufrufen, bevor Sie diese Methode verwenden.

## `styled(Component)(styles, [options]) => Component`

Verknüpfen Sie ein Stylesheet mit einer Funktionskomponente mit dem **styled components** Muster.

### Parameter

1. `Component`: Die Komponente, die verpackt wird.
2. `styles` (* Function | Object *): Eine Funktion, die die Stile oder ein Stilobjekt generiert. Es wird mit der Komponente verknüpft. Verwenden Sie die Funktionssignatur, wenn Sie Zugriff auf das Theme benötigen. Es wird als Eigenschaft des ersten Arguments bereitgestellt.
3. `options` (_object_ [optional]):

- `options.defaultTheme` (*object* [optional]): Das Standarddesign, das verwendet werden soll, wenn ein Theme nicht über einen Theme Provider bereitgestellt wird.
- `options.withTheme` (_bool_ [optional]): Defaults to `false`. Übergeben Sie das `Theme` Objekt als Eigenschaft an die Komponente.
- `options.name` (*string* [optional]): Der Name des Stylesheets. Nützlich zum Debuggen. Wenn der Wert nicht angegeben wird, wird versucht, auf den Namen der Komponente zurückzugreifen.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Wenn es `true` ist sind die Stile invertiert. Wenn es `null` ist, folgt es der `theme.direction` Einstellung.
- Die anderen Schlüssel werden an das Optionsargument [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet) weitergeleitet.

### Rückgabewerte

`Component`: Die neu erstellte Komponente.

### Beispiele

```jsx
import * as React from 'react';
import { styled, ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

const MyComponent = styled('div')({
  backgroundColor: 'red',
});

const MyThemeComponent = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
}));

const theme = createTheme();

export default function StyledComponents() {
  return (
    <ThemeProvider theme={theme}>
      <MyThemeComponent>
        <MyComponent />
      </MyThemeComponent>
    <ThemeProvider>
  );
}
```

## `StylesProvider`

Mit dieser Komponente können Sie das Verhalten der Styling-Lösung ändern. Durch den Kontext werden die Optionen im React-Baum verfügbar.

Es sollte vorzugsweise an der **Wurzel Ihres Komponentenbaums** verwendet werden.

### Eigenschaften

| Name              | Typ    | Standard | Beschreibung                                                                                                                                                                                                                                                                                                                                                                      |
|:----------------- |:------ |:-------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children&nbsp;*   | node   |          | Ihr Komponentenbaum.                                                                                                                                                                                                                                                                                                                                                              |
| disableGeneration | bool   | false    | Sie können die Erzeugung der Stile mit dieser Option deaktivieren. Dies kann nützlich sein, wenn Sie den React-Baum außerhalb des HTML-Rendering-Schrittes auf dem Server durchlaufen. Nehmen wir an, Sie verwenden react-apollo, um alle Abfragen der Schnittstelle auf der Serverseite zu extrahieren. Mit dieser Eigenschaft können Sie den Durchlauf erheblich beschleunigen. |
| generateClassName | func   |          | Klassennamengenerator von JSS.                                                                                                                                                                                                                                                                                                                                                    |
| injectFirst       | bool   | false    | By default, the styles are injected last in the `<head>` element of the page. Dadurch erhalten sie eine höhere Spezifität als jedes andere Stylesheet. Wenn Sie die Stile der Material-UI überschreiben möchten, setzen Sie diese Option.                                                                                                                                   |
| jss               | object |          | JSS-Instanz.                                                                                                                                                                                                                                                                                                                                                                      |

### Beispiele

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `ThemeProvider`

Diese Komponente hat eine `Theme` Eigenschaft. Diese wird durch den Kontext in der React-Struktur verfügbar gemacht. Es sollte vorzugsweise an der **Wurzel Ihres Komponentenbaums** verwendet werden.

### Eigenschaften

| Name            | Typ                                      | Standard | Beschreibung                                                                               |
|:--------------- |:---------------------------------------- |:-------- |:------------------------------------------------------------------------------------------ |
| children&nbsp;* | node                                     |          | Ihr Komponentenbaum.                                                                       |
| theme&nbsp;*    | union:&nbsp;object&nbsp;&#124;&nbsp;func |          | Ein Themeobjekt. Sie können eine Funktion bereitstellen, um das äußere Theme zu erweitern. |

### Beispiele

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = {};

function App() {
  return (
    <ThemeProvider theme={theme}>...</ThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `useTheme() => theme`

Dieser Hook gibt das `Theme`-Objekt zurück, so dass es innerhalb einer Funktionskomponente verwendet werden kann.

### Rückgabewerte

`Theme`: Das Themenobjekt, das zuvor in den Kontext eingefügt wurde.

### Beispiele

```jsx
import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function MyComponent() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}
```

## `withStyles(styles, [options]) => higher-order component`

Verknüpfen Sie ein Stylesheet mit einer Funktionskomponente mit dem **higher-order component** Muster. Die an sie übergebene Komponente wird nicht geändert. Stattdessen wird eine neue Komponente mit der Eigenschaft `classes` zurückgegeben. Dieses `classes` Objekt enthält den Namen der Klassennamen, die in das DOM eingefügt wurden.

Einige Implementierungsdetails, die interessant sein könnten:

- Es fügt eine `classes` Eigenschaft hinzu, damit Sie die injizierten Klassennamen von außen überschreiben können.
- Leitet die innere Komponente mit Ref weiter.
- It does **not** copy over statics. For instance, it can be used to define a `getInitialProps()` static method (next.js).

### Parameter

1. `styles` (* Function | Object *): Eine Funktion, die die Stile oder ein Stilobjekt generiert. Es wird mit der Komponente verknüpft. Verwenden Sie die Funktionssignatur, wenn Sie Zugriff auf das Theme benötigen. Es ist das erste Argument.
2. `options` (_object_ [optional]):

- `options.defaultTheme` (*object* [optional]): Das Standarddesign, das verwendet werden soll, wenn ein Theme nicht über einen Theme Provider bereitgestellt wird.
- `options.withTheme` (_bool_ [optional]): Defaults to `false`. Übergeben Sie das `Theme` Objekt als Eigenschaft an die Komponente.
- `options.name` (*string* [optional]): Der Name des Stylesheets. Nützlich zum Debuggen. Wenn der Wert nicht angegeben wird, wird versucht, auf den Namen der Komponente zurückzugreifen.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Wenn es `true` ist sind die Stile invertiert. Wenn es `null` ist, folgt es der `theme.direction` Einstellung.
- Die anderen Schlüssel werden an das Optionsargument [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet) weitergeleitet.

### Rückgabewerte

`Komponente höherer Ordnung`: Sollte zum Umwickeln einer Komponente verwendet werden.

### Beispiele

```jsx
import * as React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

function MyComponent(props) {
  return <div className={props.classes.root} />;
}

export default withStyles(styles)(MyComponent);
```

Sie können auch so als [Dekorateur](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) verwenden:

```jsx
import * as React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@withStyles(styles)
class MyComponent extends React.Component {
  render() {
    return <div className={this.props.classes.root} />;
  }
}

export default MyComponent;
```

## `withTheme(Component) => Component`

Geben Sie das `Theme`-Objekt als Eigenschaft der Eingabekomponente weiter, sodass es in der Render-Methode verwendet werden kann.

### Parameter

1. `Component`: Die Komponente, die verpackt wird.

### Rückgabewerte

`Component`: Die neu erstellte Komponente. Leitet die innere Komponente mit Ref weiter.

### Beispiele

```jsx
import * as React from 'react';
import { withTheme } from '@material-ui/core/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme(MyComponent);
```
