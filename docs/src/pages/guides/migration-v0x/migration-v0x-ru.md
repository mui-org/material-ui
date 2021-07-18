# Migration From v0.x to v1

<p class="description">Да! Релиз v1 состоялся! Take advantage of 2 years worth of effort.</p>

## FAQ

### Woah - the API is way different! Does that mean 1.0 is completely different, I'll have to learn the basics all over again, and migrating will be practically impossible?

The answer is no. I'm glad you asked! The core concepts haven't changed. You will notice that the API provides more flexibility, but this has a cost – lower-level components that abstract less complexity.

### What motivated such a large change?

Material-UI was started [4 years ago](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46). The ecosystem has evolved a lot since then, we have also learned a lot. [@nathanmarks](https://github.com/nathanmarks/) started an ambitious task, rebuilding Material-UI from the **ground-up** taking advantage of this knowledge to address long-standing issues. To name some of the major changes:

- New styling solution using CSS-in-JS (better [customization](/customization/how-to-customize/) power, better performance)
- New theme handling (nesting, self-supporting, etc.)
- Blazing fast documentation thanks to [Next.js](https://github.com/zeit/next.js)
- Way better [test coverage](/guides/testing/) (99%+, run on all the major browsers, [visual regression tests](https://www.argos-ci.com/mui-org/material-ui))
- Full [server-side rendering](/guides/server-rendering/) support
- Wide range of [supported browsers](/getting-started/supported-platforms/)

### Where should I start in a migration?

1. Start by installing the v1.x version of Material-UI along side the v0.x version.

With yarn:

```sh
yarn add material-ui
```
```sh
yarn add @material-ui/core
```

Or with npm:

```sh
npm install material-ui
```
```sh
npm install @material-ui/core
```

then

```js
import FlatButton from 'material-ui/FlatButton'; // v0.x
  import Button from '@material-ui/core/Button'; // v1.x
```

2. Run [the migration helper](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod) on your project.
3. `MuiThemeProvider` is optional for v1.x., but if you have a custom theme, you are free to use v0.x and v1.x versions of the component at the same time, like this:

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

4. After that, you are free to migrate one component instance at the time.

## Компоненты

### Autocomplete (Автодополнение)

Material-UI doesn't provide a high-level API for solving this problem. You're encouraged you to explore [the solutions the React community has built](/components/autocomplete/).

In the future, we will look into providing a simple component to solve the simple use cases: [#9997](https://github.com/mui-org/material-ui/issues/9997).

### Svg Icon

Run [the migration helper](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod) on your project.

This will apply a change such as the following:

```diff
-import AddIcon from 'material-ui/svg-icons/Add';
+import AddIcon from '@material-ui/icons/Add';

<AddIcon />
```

### Flat Button

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from '@material-ui/core/Button';

-<FlatButton />
+<Button />
```

### Raised Button

RaisedButton upgrade path:

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from '@material-ui/core/Button';

-<RaisedButton />
+<Button variant="contained" />
```

### Subheader

```diff
-import Subheader from 'material-ui/Subheader';
+import ListSubheader from '@material-ui/core/ListSubheader';

-<Subheader>Sub Heading</Subheader>
+<ListSubheader>Sub Heading</ListSubheader>
```

### Toggle

```diff
-import Toggle from 'material-ui/Toggle';
+import Switch from '@material-ui/core/Switch';

-<Toggle

-  toggled={this.state.checkedA}
-  onToggle={this.handleToggle}
-/>
+<Switch
+  checked={this.state.checkedA}
+  onChange={this.handleSwitch}
+/>
```

### Menu Item

```diff
-import MenuItem from 'material-ui/MenuItem';
+import MenuItem from '@material-ui/core/MenuItem';

-<MenuItem primaryText="Profile" />
+<MenuItem>Profile</MenuItem>
```

### Font Icon

```diff
-import FontIcon from 'material-ui/FontIcon';
+import Icon from '@material-ui/core/Icon';

-<FontIcon>home</FontIcon>
+<Icon>home</Icon>
```

### Circular Progress

```diff
-import CircularProgress from 'material-ui/CircularProgress';
+import CircularProgress from '@material-ui/core/CircularProgress';

-<CircularProgress mode="indeterminate" />
+<CircularProgress variant="indeterminate" />
```

### Drop Down Menu

```diff
-import DropDownMenu from 'material-ui/DropDownMenu';
+import Select from '@material-ui/core/Select';

-<DropDownMenu></DropDownMenu>
+<Select value={this.state.value}></Select>
```

### To be continued…

Have you successfully migrated your app, and wish to help the community? There is an open issue in order to finish this migration guide [#7195](https://github.com/mui-org/material-ui/issues/7195). Any pull request is welcomed 😊.
