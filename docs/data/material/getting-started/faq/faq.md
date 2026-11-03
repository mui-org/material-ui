# Frequently Asked Questions

<p class="description">Stuck on a particular problem? Check some of these common gotchas first in the FAQ.</p>

If you still can't find what you're looking for, you can refer to our [support page](/material-ui/getting-started/support/).

## MUI is an awesome organization. How can I support it?

There are many ways to support us:

- **Spread the word**. Evangelize MUI's products by [linking to mui.com](https://mui.com/) on your website—every backlink matters.
  Follow us on [X](https://x.com/MUI_hq), like and retweet the important news. Or just talk about us with your friends.
- **Give us feedback**. Tell us what is going well or where there is improvement opportunities. Please upvote (👍) the issues that you are the most interested in seeing solved.
- **Help new users**. You can answer questions on
  [Stack Overflow](https://stackoverflow.com/questions/tagged/material-ui).
- **Make changes happen**.
  - Edit the documentation. At the bottom of every page, you can find an "Edit this page" button.
  - Report bugs or missing features by [creating an issue](https://github.com/mui/material-ui/issues/new).
  - Review and comment on existing [pull requests](https://github.com/mui/material-ui/pulls?q=is%3Apr) and [issues](https://github.com/mui/material-ui/issues?q=is%3Aopen+is%3Aclosed).
  - [Improve our documentation](https://github.com/mui/material-ui/tree/HEAD/docs), fix bugs, or add features by [submitting a pull request](https://github.com/mui/material-ui/pulls).
- **Support us financially on [Open Collective](https://opencollective.com/mui-org)**.
  If you use Material UI in a commercial project and would like to support its continued development by becoming a Sponsor, or in a side or hobby project and would like to become a Backer, you can do so through Open Collective.
  All funds donated are managed transparently, and Sponsors receive recognition in the README and on the homepage.

## Why do the fixed positioned elements move when a modal is opened?

Scrolling is blocked as soon as a modal is opened.
This prevents interacting with the background when the modal should be the only interactive content. However, removing the scrollbar can make your **fixed positioned elements** move.
In this situation, you can apply a global `.mui-fixed` class name to tell Material UI to handle those elements.

## How can I disable the ripple effect globally?

The ripple effect is exclusively coming from the `BaseButton` component.
You can disable the ripple effect globally by providing the following in your theme:

```js
import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});
```

## How can I disable transitions globally?

Material UI uses the same theme helper for creating all its transitions.
Therefore you can disable all transitions by overriding the helper in your theme:

```js
import { createTheme } from '@mui/material';

const theme = createTheme({
  transitions: {
    // So `transition: none;` gets applied everywhere
    create: () => 'none',
  },
});
```

It can be useful to disable transitions during visual testing or to improve performance on low-end devices.

You can go one step further by disabling all transitions and animations effects:

```js
import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
});
```

Notice that the usage of `CssBaseline` is required for the above approach to work.
If you choose not to use it, you can still disable transitions and animations by including these CSS rules:

```css
*,
*::before,
*::after {
  transition: 'none !important';
  animation: 'none !important';
}
```

## Do I have to use Emotion to style my app?

No, it's not required.
But if you are using the default styled engine (`@mui/styled-engine`) the Emotion dependency comes built in, so carries no additional bundle size overhead.

Perhaps, however, you're adding some Material UI components to an app that already uses another styling solution,
or are already familiar with a different API, and don't want to learn a new one? In that case, head over to the
[Style library interoperability](/material-ui/integrations/interoperability/) section to learn how to restyle Material UI components with alternative style libraries.

## When should I use inline-style vs. CSS?

As a rule of thumb, only use inline-styles for dynamic style properties.
The CSS alternative provides more advantages, such as:

- auto-prefixing
- better debugging
- media queries
- keyframes

## How do I use react-router?

Visit the guide about [integration with third-party routing libraries](/material-ui/integrations/routing/), like react-router or Next.js, for more details.

## How can I access the DOM element?

All Material UI components that should render something in the DOM forward their
ref to the underlying DOM component. This means that you can get DOM elements
by reading the ref attached to Material UI components:

```jsx
// or a ref setter function
const ref = React.createRef();
// render
<Button ref={ref} />;
// usage
const element = ref.current;
```

If you're not sure if the Material UI component in question forwards its ref you can check the API documentation under "Props."
You should find the message below, like in the [Button API](/material-ui/api/button/#props).

> The ref is forwarded to the root element.

## My App doesn't render correctly on the server

If it doesn't work, in 99% of cases it's a configuration issue.
A missing property, a wrong call order, or a missing component – server-side rendering is strict about configuration.

The best way to find out what's wrong is to compare your project to an **already working setup**.
Check out the [reference implementations](/material-ui/guides/server-rendering/#reference-implementations), bit by bit.

## Why are the colors I am seeing different from what I see here?

The documentation site is using a custom theme. Hence, the color palette is
different from the default theme that Material UI ships. Please refer to [this
page](/material-ui/customization/theming/) to learn about theme customization.

## Why does component X require a DOM node in a prop instead of a ref object?

Components like the [Portal](/material-ui/api/portal/#props) or [Popper](/material-ui/api/popper/#props) require a DOM node in the `container` or `anchorEl` prop respectively.
It seems convenient to simply pass a ref object in those props and let Material UI access the current value.

This works in a simple scenario:

```jsx
function App() {
  const container = React.useRef(null);

  return (
    <div className="App">
      <Portal container={container}>
        <span>portaled children</span>
      </Portal>
      <div ref={container} />
    </div>
  );
}
```

where `Portal` would only mount the children into the container when `container.current` is available.
Here is a naive implementation of Portal:

```jsx
function Portal({ children, container }) {
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    setNode(container.current);
  }, [container]);

  if (node === null) {
    return null;
  }
  return ReactDOM.createPortal(children, node);
}
```

With this simple heuristic `Portal` might re-render after it mounts because refs are up-to-date before any effects run.
However, just because a ref is up-to-date doesn't mean it points to a defined instance.
If the ref is attached to a ref forwarding component it is not clear when the DOM node will be available.
In the example above, the `Portal` would run an effect once, but might not re-render because `ref.current` is still `null`.
This is especially apparent for React.lazy components in Suspense.
The above implementation could also not account for a change in the DOM node.

This is why a prop is required to the actual DOM node so that React can take care of determining when the `Portal` should re-render:

```jsx
function App() {
  const [container, setContainer] = React.useState(null);
  const handleRef = React.useCallback(
    (instance) => setContainer(instance),
    [setContainer],
  );

  return (
    <div className="App">
      <Portal container={container}>
        <span>Portaled</span>
      </Portal>
      <div ref={handleRef} />
    </div>
  );
}
```

## What's the clsx dependency for?

[clsx](https://github.com/lukeed/clsx) is a tiny utility for constructing `className` strings conditionally, out of an object with keys being the class strings, and values being booleans.

Instead of writing:

```jsx
// let disabled = false, selected = true;

return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${
      selected ? 'Mui-selected' : ''
    }`}
  />
);
```

you can do:

```jsx
import clsx from 'clsx';

return (
  <div
    className={clsx('MuiButton-root', {
      'Mui-disabled': disabled,
      'Mui-selected': selected,
    })}
  />
);
```

## I cannot use components as selectors in the styled() utility. What should I do?

If you are getting the error: `TypeError: Cannot convert a Symbol value to a string`, take a look at the [styled()](/system/styled/#how-to-use-components-selector-api) docs page for instructions on how you can fix this.

## How can I contribute to the free templates?

The templates are built using a [shared theme](https://github.com/mui/material-ui/tree/v6.0.2/docs/data/material/getting-started/templates/shared-theme). Below are the structure to create a new template:

### Template page

Create a new page in the `docs/pages/material-ui/getting-started/templates/<name>.js` directory with the following code:

```js
import * as React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import Template from 'docs/data/material/getting-started/templates/<name>/<Template>';

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <Template />
      </TemplateFrame>
    </AppTheme>
  );
}
```

Then create a template file at `docs/data/material/getting-started/templates/<name>/<Template>.tsx` (add more files if needed):

> Note: The `<Template>` must be a pascal case string of the `<name>` folder.

### Shared theme

The template must use `AppTheme` from `../shared-theme/AppTheme` to ensure a consistent look and feel across all templates.

If the template includes custom-themed components, such as the dashboard template with MUI X themed components, pass them to the `AppTheme`'s `themedComponents` prop:

```js
import AppTheme from '../shared-theme/AppTheme';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>...</AppTheme>
  )
}
```

### Color mode toggle

The shared theme provides 2 appearance of the color mode toggle, `ColorModeSelect` and `ColorModeIconDropdown`.
You can use either of them in your template, it will be hidden within the `TemplateFrame` but will be visible in the CodeSandbox and StackBlitz.

### Template frame

If the template has a sidebar or a header that needs to stick to the top, refer to the CSS variable `--template-frame-height` to adjust.

For example, the dashboard template has a fixed header that needs to be accounted for the template frame height:

```js
<AppBar
  position="fixed"
  sx={{
    top: 'var(--template-frame-height, 0px)',
    // ...other styles
  }}
>
```

This will make the `AppBar` stay below the `TemplateFrame` in a preview mode but stick to the top in the CodeSandbox and StackBlitz.

## [legacy] I have several instances of styles on the page

If you are seeing a warning message in the console like the one below, you probably have several instances of `@mui/styles` initialized on the page.

:::warning
It looks like there are several instances of `@mui/styles` initialized in this application.
This may cause theme propagation issues, broken class names, specificity issues, and make your application bigger without a good reason.
:::

### Possible reasons

There are several common reasons for this to happen:

- You have another `@mui/styles` library somewhere in your dependencies.
- You have a monorepo structure for your project (for example, lerna or yarn workspaces) and `@mui/styles` module is a dependency in more than one package (this one is more or less the same as the previous one).
- You have several applications that are using `@mui/styles` running on the same page (for example, several entry points in webpack are loaded on the same page).

### Duplicated module in node_modules

If you think that the issue may be in the duplication of the @mui/styles module somewhere in your dependencies, there are several ways to check this.
You can use `npm ls @mui/styles`, `yarn list @mui/styles` or `find -L ./node_modules | grep /@mui/styles/package.json` commands in your application folder.

If none of these commands identified the duplication, try analyzing your bundle for multiple instances of @mui/styles. You can just check your bundle source, or use a tool like [source-map-explorer](https://github.com/danvk/source-map-explorer) or [webpack-bundle-analyzer](https://github.com/webpack/webpack-bundle-analyzer).

If you identified that duplication is the issue that you are encountering there are several things you can try to solve it:

If you are using npm you can try running `npm dedupe`.
This command searches the local dependencies and tries to simplify the structure by moving common dependencies further up the tree.

If you are using webpack, you can change the way it will [resolve](https://webpack.js.org/configuration/resolve/#resolve-modules) the @mui/styles module. You can overwrite the default order in which webpack will look for your dependencies and make your application node_modules more prioritized than default node module resolution order:

```diff
 resolve: {
+  alias: {
+    '@mui/styles': path.resolve(appFolder, 'node_modules', '@mui/styles'),
+  },
 },
```

### Running multiple applications on one page

If you have several applications running on one page, consider using one @mui/styles module for all of them. If you are using webpack, you can use the [`splitChunks`](https://webpack.js.org/plugins/split-chunks-plugin/) configuration to create a shared [vendor chunk](https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-2) that will contain the @mui/styles module:

```diff
  module.exports = {
    entry: {
      app1: './src/app.1.js',
      app2: './src/app.2.js',
    },
+   optimization: {
+     splitChunks: {
+       cacheGroups: {
+         vendor: {
+           test: /[\\/]node_modules[\\/]@mui[\\/]styles[\\/]/,
+           name: 'vendor',
+           chunks: 'all',
+         },
+       },
+     },
+   },
  }
```

## [legacy] Why aren't my components rendering correctly in production builds?

The #1 reason this happens is likely due to class name conflicts once your code is in a production bundle.
For Material UI to work, the `className` values of all components on a page must be generated by a single instance of the [class name generator](https://v6.mui.com/system/styles/advanced/#class-names).

To correct this issue, all components on the page need to be initialized such that there is only ever **one class name generator** among them.

You could end up accidentally using two class name generators in a variety of scenarios:

- You accidentally **bundle** two versions of `@mui/styles`. You might have a dependency not correctly setting Material UI as a peer dependency.
- You are using `StylesProvider` for a **subset** of your React tree.
- You are using a bundler and it is splitting code in a way that causes multiple class name generator instances to be created.

:::success
If you are using webpack with the [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), try configuring the [`runtimeChunk` setting under `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).
:::

Overall, it's simple to recover from this problem by wrapping each Material UI application with [`StylesProvider`](https://v6.mui.com/system/styles/api/#stylesprovider) components at the top of their component trees **and using a single class name generator shared among them**.

### [legacy] CSS works only on first load and goes missing

The CSS is only generated on the first load of the page.
Then, the CSS is missing on the server for consecutive requests.

#### Action to Take

The styling solution relies on a cache, the _sheets manager_, to only inject the CSS once per component type
(if you use two buttons, you only need the CSS of the button one time).
You need to create **a new `sheets` instance for each request**.

Example of fix:

```diff
-// Create a sheets instance.
-const sheets = new ServerStyleSheets();

 function handleRender(req, res) {
+  // Create a sheets instance.
+  const sheets = new ServerStyleSheets();

   //…

   // Render the component to a string.
   const html = ReactDOMServer.renderToString(
```

### [legacy] React class name hydration mismatch

:::warning
Prop className did not match.
:::

There is a class name mismatch between the client and the server. It might work for the first request.
Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### Action to Take

The class names value relies on the concept of [class name generator](https://v6.mui.com/system/styles/advanced/#class-names).
The whole page needs to be rendered with **a single generator**.
This generator needs to behave identically on the server and on the client. For instance:

- You need to provide a new class name generator for each request.
  But you shouldn't share a `createGenerateClassName()` between different requests:

  Example of fix:

  ```diff
  -// Create a new class name generator.
  -const generateClassName = createGenerateClassName();

   function handleRender(req, res) {
  +  // Create a new class name generator.
  +  const generateClassName = createGenerateClassName();

     //…

     // Render the component to a string.
     const html = ReactDOMServer.renderToString(
  ```

- You need to verify that your client and server are running the **exactly the same version** of Material UI.
  It is possible that a mismatch of even minor versions can cause styling problems.
  To check version numbers, run `npm list @mui/styles` in the environment where you build your application and also in your deployment environment.

  You can also ensure the same version in different environments by specifying a specific Material UI version in the dependencies of your package.json.

  _example of fix (package.json):_

  ```diff
    "dependencies": {
      ...
  -   "@mui/styles": "^5.0.0",
  +   "@mui/styles": "5.0.0",
      ...
    },
  ```

- You need to make sure that the server and the client share the same `process.env.NODE_ENV` value.
