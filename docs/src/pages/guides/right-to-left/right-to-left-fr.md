# Droite à gauche

<p class="description">Right-to-left languages such as Arabic, Persian or Hebrew are supported. Pour modifier le sens des composants Materiau-UI, vous devez suivre les étapes suivantes.</p>

## Etapes

### 1. HTML

Make sure the `dir` attribute is set on the body, otherwise native components will break:

```html
<body dir="rtl">
```

As an alternative to the above, you can also wrap your application in an element with the `dir` attribute:

```jsx
function App() {
  return (
    <div dir="rtl">
      <MyComponent />
    </div>
  );
}
```

You need this JSS plugin to flip the styles: [jss-rtl](https://github.com/alitaheri/jss-rtl).

### 2. Thème

Set the direction in your custom theme:

```js
const theme = createTheme({
  direction: 'rtl',
});
```

### 3. Install the rtl plugin

You need this JSS plugin to flip the styles: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```

If you are using `emotion` or `styled-components`, you need this stylis plugin to flip the styles: [stylis-plugin-rtl](https://github.com/styled-components/stylis-plugin-rtl).

```sh
npm install stylis-plugin-rtl
```

**Note**: Only `emotion` is compatible with version 2 of the plugin. `styled-components` requires version 1. If you are using `styled-components` as styled engine, make sure to install the correct version.

Having installed the plugin in your project, Material-UI components still require it to be loaded by the style engine instance that you use. Find bellow guides on how you can load it.

### 3. Load the rtl plugin

#### 3.1 JSS

Having installed the plugin in your project, Material-UI components still require it to be loaded by the jss instance, as described below. Internally, withStyles is using this JSS plugin when `direction: 'rtl'` is set on the theme. Head to the [plugin README](https://github.com/alitaheri/jss-rtl) to learn more about it.

Once you have created a new JSS instance with the plugin, you need to make it available to all the components in the component tree. The [`StylesProvider`](/styles/api/#stylesprovider) component enables this:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}
```

#### 3.2 emotion

Once you have created a new JSS instance with the plugin, you need to make it available to all the components in the component tree. The [`StylesProvider`](/styles/api/#stylesprovider) component enables this:

```jsx
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
```

#### 3.3 styled-components

If you use `styled-components` as your style engine, you can use the [StyleSheetManager](https://styled-components.com/docs/api#stylesheetmanager) and provide the stylis-plugin-rtl as an item in the `stylisPlugins` property:

```jsx
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';

function RTL(props) {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      {props.children}
    </StyleSheetManager>
  );
}
```

## Démo

_Utilisez le bouton de navigation situé dans le coin supérieur droit pour retourner toute la documentation_

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Désactiver la transformation RTL

### JSS

If you want to prevent a specific rule-set from being affected by the `rtl` transformation you can add `flip: false` at the beginning.

_Use the direction toggle button on the top right corner to see the effect._

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}

### emotion & styled-components

You have to use the template literal syntax and add the `/* @noflip */` directive before the rule or property for which you want to disable right-to-left styles.

_Use the direction toggle button on the top right corner to see the effect._

{{"demo": "pages/guides/right-to-left/RtlOptOutStylis.js", "hideEditButton": true}}
