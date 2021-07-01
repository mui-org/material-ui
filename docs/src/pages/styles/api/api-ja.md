# API

<p class="description">The API reference of @material-ui/core/styles.</p>

## `createGenerateClassName([options]) => class name generator`

[クラス名ジェネレーター関数を返す関数](https://cssinjs.org/jss-api/#generate-your-class-names) 。

### 引数

1. `options` (_object_ [optional]):

   - `options.disableGlobal` (_bool_ [optional]): Defaults to `false`. 確定的なクラス名の生成を無効にします。
   - `options.productionPrefix` (*string* [optional]): Defaults to `'jss'`. プロダクションでクラス名のプレフィックスに使用される文字列。
   - `options.seed` (*string* [optional]): Defaults to `''`. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.

### 戻り値

`class name generator` ：ジェネレーターをJSSに提供する必要があります。

### 例

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

This function doesn't really "do anything" at runtime, it's just the identity function. Its only purpose is to defeat **TypeScript**'s type widening when providing style rules to `makeStyles`/`withStyles` which are a function of the `Theme`.

### 引数

1. `styles` (_object_): A styles object.

### 戻り値

`styles`: A styles object.

### 例

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

Link a style sheet with a function component using the **hook** pattern.

### 引数

1. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
2. `options` (_object_ [optional]):

- `options.defaultTheme` (*object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
- `options.name` (*string* [optional]): The name of the style sheet. Useful for debugging.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
- The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

### 戻り値

`hook`: A hook. This hook can be used in a function component. The documentation often calls this returned hook `useStyles`. It accepts one argument: the properties that will be used for "interpolation" in the style sheet.

### 例

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

This is a class helper to handle server-side rendering. [You can follow this guide for a practical approach](/guides/server-rendering/).

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

### `new ServerStyleSheets([options])`

The instantiation accepts an options object as a first argument.

1. `options` (_object_ [optional]): The options are spread as props to the [`StylesProvider`](#stylesprovider) component.

### `sheets.collect(node) => React element`

The method wraps your React node in a provider element. It collects the style sheets during the rendering so they can be later sent to the client.

### `sheets.toString() => CSS string`

The method returns the collected styles.

⚠️ You must call `.collect()` before using this method.

### `` sheets.getStyleElement() => CSS React element` ``

sheets.getStyleElement() => CSS React element`

⚠️ You must call `.collect()` before using this method.

## `styled(Component)(styles, [options]) => Component`

Link a style sheet with a function component using the **styled components** pattern.

### 引数

1. `Component`:：ラップされるコンポーネント。
2. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as property of the first argument.
3. `options` (_object_ [optional]):

- `options.defaultTheme` (*object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
- `options.withTheme` (_bool_ [optional]): Defaults to `false`. `theme`オブジェクトをプロパティとしてコンポーネントに提供します。
- `options.name` (*string* [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
- The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

### 戻り値

`Component` ：作成された新しいコンポーネント。 内部コンポーネントへの参照を転送します。

### 例

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

This component allows you to change the behavior of the styling solution. It makes the options available down the React tree thanks to the context.

It should preferably be used at **the root of your component tree**.

### Props

| Name              | Type   | Default | Description                                                                                                                                                                                                                                                                                                                          |
|:----------------- |:------ |:------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children&nbsp;*   | node   |         | Your component tree.                                                                                                                                                                                                                                                                                                                 |
| disableGeneration | bool   | false   | You can disable the generation of the styles with this option. It can be useful when traversing the React tree outside of the HTML rendering step on the server. Let's say you are using react-apollo to extract all the queries made by the interface server-side. You can significantly speed up the traversal with this property. |
| generateClassName | func   |         | JSS's class name generator.                                                                                                                                                                                                                                                                                                          |
| injectFirst       | bool   | false   | By default, the styles are injected last in the `<head>` element of the page. As a result, they gain more specificity than any other style sheet. If you want to override Material-UI's styles, set this prop.                                                                                                                 |
| jss               | object |         | JSS's instance.                                                                                                                                                                                                                                                                                                                      |

### 例

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

This component takes a `theme` property, and makes it available down the React tree thanks to the context. It should preferably be used at **the root of your component tree**.

### Props

| Name            | Type                                     | Default | Description                                                           |
|:--------------- |:---------------------------------------- |:------- |:--------------------------------------------------------------------- |
| children&nbsp;* | node                                     |         | Your component tree.                                                  |
| theme&nbsp;*    | union:&nbsp;object&nbsp;&#124;&nbsp;func |         | A theme object. You can provide a function to extend the outer theme. |

### 例

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

Provide the `theme` object as a property of the input component so it can be used in the render method.

### 戻り値

Provide the `theme` object as a property of the input component so it can be used in the render method.

### 例

```jsx
import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function MyComponent() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}
```

## `withStyles(styles, [options]) => higher-order component`

Link a style sheet with a component using the **higher-order component** pattern. It does not modify the component passed to it; instead, it returns a new component with a `classes` property. This `classes` object contains the name of the class names injected in the DOM.

注意が必要な実装の詳細は、次のとおりです。

- It adds a `classes` property so you can override the injected class names from the outside.
- It forwards refs to the inner component.
- It does **not** copy over statics. For instance, it can be used to define a `getInitialProps()` static method (next.js).

### 引数

1. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
2. `options` (_object_ [optional]):

- `options.defaultTheme` (*object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
- `options.withTheme` (_bool_ [optional]): Defaults to `false`. `theme`オブジェクトをプロパティとしてコンポーネントに提供します。
- `options.name` (*string* [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
- The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

### 戻り値

注意が必要な実装の詳細は、次のとおりです。

### 例

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

注意が必要な実装の詳細は、次のとおりです。

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

また、[デコレータ](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)などとしてしても使用できます。

### 引数

1. `Component`:：ラップされるコンポーネント。

### 戻り値

`Component` ：作成された新しいコンポーネント。 内部コンポーネントへの参照を転送します。 内部コンポーネントへの参照を転送します。

### 例

```jsx
import * as React from 'react';
import { withTheme } from '@material-ui/core/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme(MyComponent);
```
