# Rechts nach links

<p class="description">Right-to-left languages such as Arabic, Persian or Hebrew are supported. Um die Richtung der Material-UI-Komponenten zu ändern, müssen Sie die folgenden Schritte ausführen.</p>

## Schritte

### 1. HTML

Stellen Sie sicher, dass das `dir` Attribut in body gesetzt wird, sonst werden native Komponenten beschädigt:

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

This can be helpful for creating components to toggle language settings in the live application.

### 2. Theme

Legen Sie die Richtung in Ihrem benutzerdefinierten Theme fest:

```js
const theme = createTheme({
  direction: 'rtl',
});
```

### 3. Install the rtl plugin

Sie benötigen dieses JSS-Plugin, um die Styles umzudrehen: [jss-rtl](https://github.com/alitaheri/jss-rtl).

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

#### 3. jss-rtl

Nachdem Sie das Plugin in Ihrem Projekt installiert haben, müssen die Komponenten der Material-UI weiterhin von der jss-Instanz geladen werden, wie im Folgenden beschrieben. Intern verwendet withStyles dieses JSS-Plugin wenn `direction: 'rtl'` im Theme gesetzt ist. Schaue in die [plugin README](https://github.com/alitaheri/jss-rtl), um mehr zu erfahren.

Nachdem Sie eine neue JSS-Instanz mit dem Plugin erstellt haben, müssen Sie diese für alle Komponenten in der Komponentenstruktur verfügbar machen. The [`StylesProvider`](/styles/api/#stylesprovider) component enables this:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
```

#### 3.2 emotion

Nachdem Sie eine neue JSS-Instanz mit dem Plugin erstellt haben, müssen Sie diese für alle Komponenten in der Komponentenstruktur verfügbar machen. The [`StylesProvider`](/styles/api/#stylesprovider) component enables this:

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

## Demo

_Verwenden Sie den Richtungsumschaltknopf in der oberen rechten Ecke, um die gesamte Dokumentation zu spiegeln_

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## RTL-Umwandlung deaktivieren

### JSS

Wenn Sie verhindern möchten, dass ein bestimmter Regelsatz von der `Rtl` Transformation beeinflusst wird, können Sie `flip: false` am Anfang hinzufügen.

_Verwenden Sie den Richtungsumschaltknopf in der oberen rechten Ecke, um den Effekt zu sehen._

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}

### emotion & styled-components

You have to use the template literal syntax and add the `/* @noflip */` directive before the rule or property for which you want to disable right-to-left styles.

_Verwenden Sie den Richtungsumschaltknopf in der oberen rechten Ecke, um den Effekt zu sehen._

{{"demo": "pages/guides/right-to-left/RtlOptOutStylis.js", "hideEditButton": true}}
