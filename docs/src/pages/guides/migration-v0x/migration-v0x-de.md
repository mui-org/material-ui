# Migration von v0.x zu v1

<p class="description">Ja, v1 wurde veröffentlicht! Profitieren Sie von 2 Jahren Arbeit.</p>

## Häufig gestellte Fragen

### Woah - die API ist anders! Does that mean 1.0 is completely different, I'll have to learn the basics all over again, and migrating will be practically impossible?

Die Antwort ist nein. I'm glad you asked! The core concepts haven't changed. You will notice that the API provides more flexibility, but this has a cost – lower-level components that abstract less complexity.

### Was hat zu einer so großen Veränderung geführt?

Die Material-UI wurde vor [4 Jahren gestartet](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46). Das Ökosystem hat sich seitdem stark verändert, wir haben auch viel gelernt. [@nathanmarks](https://github.com/nathanmarks/) begann eine ehrgeizige Aufgabe, Material-UI **von Grund auf ** neu zu erstellen unter Ausnutzung seines Wissen seit langem bestehende Probleme zu lösen. Um einige der wichtigsten Änderungen zu nennen:

- New styling solution using CSS-in-JS (better [customization](/customization/how-to-customize/) power, better performance)
- Neues Theming (Schachteln, selbsttragend usw.)
- Schnelle Dokumentation dank [Next.js](https://github.com/zeit/next.js)
- Viel bessere [Testabdeckung](/guides/testing/) (99%+, läuft auf allen gängigen Browsern, [visuelle Regressionstests](https://www.argos-ci.com/mui-org/material-ui))
- Vollständige [serverseitiges Rendern](/guides/server-rendering/) Unterstützung
- Große Auswahl an [ unterstützten Browsern](/getting-started/supported-platforms/)

### Wo soll ich bei einer Migration anfangen?

1. Beginnen Sie mit der Installation der v1.x-Version von Material-UI neben der v0.x-Version.

Mit yarn:

```sh
yarn add material-ui
```
```sh
yarn add @material-ui/core
```

Oder mit npm:

```sh
npm install material-ui
```
```sh
npm install @material-ui/core
```

dann

```js
import FlatButton from 'material-ui/FlatButton'; // v0.x
  import Button from '@material-ui/core/Button'; // v1.x
```

2. Führen Sie den [Migrationshelfer](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod) auf Ihrem Projekt aus.
3. Der `MuiThemeProvider` ist für v1.x optional. Wenn Sie jedoch ein benutzerdefiniertes Design haben, können Sie die Versionen v0.x und v1.x der Komponente gleichzeitig verwenden:

```jsx
import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = createMuiTheme({
  /* theme for v1.x */
});
const themeV0 = getMuiTheme({
  /* theme for v0.x */
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <V0MuiThemeProvider muiTheme={themeV0}>{/*Components*/}</V0MuiThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
```

4. Danach können Sie jeweils eine Komponenteninstanz migrieren.

## Komponenten

### Autovervollständigung (Autocomplete)

Die Material-UI bietet keine übergeordnete API zur Lösung dieses Problems an. Dafür müssen Sie die Lösungen zu erkunden, die [die React-Community entwickelt hat](/components/autocomplete/).

In Zukunft werden wir versuchen, eine einfache Komponente bereitzustellen, um die einfachen Anwendungsfälle zu lösen: [#9997](https://github.com/mui-org/material-ui/issues/9997).

### Svg-Symbol

Führen Sie den [Migrationshelfer](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod) auf Ihrem Projekt aus.

Dadurch werden folgende Änderungen wie die folgende angewendet:

```diff
-import AddIcon from 'material-ui/svg-icons/Add';
+import AddIcon from '@material-ui/icons/Add';

<AddIcon />
```

### Flacher Button

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from '@material-ui/core/Button';

-<FlatButton />
+<Button />
```

### Erhöhter Button

Erhöhter Button-Aktualisierungspfad:

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from '@material-ui/core/Button';

-<RaisedButton />
+<Button variant="contained" />
```

### Untertitel

```diff
-import Subheader from 'material-ui/Subheader';
+import ListSubheader from '@material-ui/core/ListSubheader';

-<Subheader>Sub Heading</Subheader>
+<ListSubheader>Sub Heading</ListSubheader>
```

### Umschalten

```diff
-import Toggle from 'material-ui/Toggle';
+import Switch from '@material-ui/core/Switch';

-<Toggle

- toggled={this.state.checkedA}
- onToggle={this.handleToggle}
-/>
+<Switch
+  checked={this.state.checkedA}
+  onChange={this.handleSwitch}
+/>
```

### Menüelemente

```diff
-import MenuItem from 'material-ui/MenuItem';
+import MenuItem from '@material-ui/core/MenuItem';

-<MenuItem primaryText="Profile" />
+<MenuItem>Profile</MenuItem>
```

### Schriftarten-Icons

```diff
-import FontIcon from 'material-ui/FontIcon';
+import Icon from '@material-ui/core/Icon';

-<FontIcon>home</FontIcon>
+<Icon>home</Icon>
```

### Zirkulärer Fortschritt

```diff
-import CircularProgress from 'material-ui/CircularProgress';
+import CircularProgress from '@material-ui/core/CircularProgress';

-<CircularProgress mode="indeterminate" />
+<CircularProgress variant="indeterminate" />
```

### Dropdownmenü

```diff
-import DropDownMenu from 'material-ui/DropDownMenu';
+import Select from '@material-ui/core/Select';

-<DropDownMenu></DropDownMenu>
+<Select value={this.state.value}></Select>
```

### Fortsetzung folgt…

Haben Sie Ihre App erfolgreich migriert und möchten der Community helfen? There is an open issue in order to finish this migration guide [#7195](https://github.com/mui-org/material-ui/issues/7195). Jede Pull-Anfrage wird begrüßt 😊.
