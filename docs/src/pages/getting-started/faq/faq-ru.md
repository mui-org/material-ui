# Часто задаваемые вопросы (FAQ)

<p class="description">Застряли на чём-то? Гляньте сперва на список типичных граблей здесь.</p>

И если всё-таки здесь не найдётся вашей проблемы, обратитесь к [странице поддержки](/getting-started/support/).

## Material-UI просто нечто. Как я могу поддержать проект?

Способов поддержать Material-UI много:

- **Говорите о нас**. Продвигайте Material-UI в массы: разместите ссылки на [material-ui.com](https://material-ui.com/) на своём сайте, каждое упоминание имеет значение. Зафолловьте нас в [Твиттере](https://twitter.com/MaterialUI), лайкайте и ретвитьте значимые новости. Или просто расскажите о нас друзьям.
- **Делитесь отзывами и предложениями**. Говорите, что у нас получается хорошо, а где можно и получше. Пожалуйста, плюсуйте (👍) тикеты, которые вам хотелось бы поскорее увидеть решёнными.
- **Помогайте новичкам**. Поотвечайте на вопросы на [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui).
- **Двигайте проект вперёд**.
  - Edit the documentation. Every page has an "EDIT THIS PAGE" link in the top right.
  - Присылайте багрепорты и фичреквесты [через тикеты](https://github.com/mui-org/material-ui/issues/new).
  - Review and comment on existing [pull requests](https://github.com/mui-org/material-ui/pulls) and [issues](https://github.com/mui-org/material-ui/issues).
  - Помогите [перевести документацию](https://translate.material-ui.com).
  - [Improve our documentation](https://github.com/mui-org/material-ui/tree/master/docs), fix bugs, or add features by [submitting a pull request](https://github.com/mui-org/material-ui/pulls).
- **Поддержите нас финансово на [OpenCollective](https://opencollective.com/material-ui)**. Если вы применяете Material-UI в коммерческих разработках и хотите спонсировать его дальнейшую развитие, или если это личный проект, и вы хотите сделать посильный вклад, вы можете воспользоваться OpenCollective. Мы открыто сообщаем, на что уходят пожертвования, а спонсорам достаётся упоминание в README и на главной странице Material-UI.

## Почему мои компоненты не отображаются корректно в продакшн-сборках?

But you shouldn't share a `createGenerateClassName()` between different requests: You need to provide a new class name generator for each request.

To correct this issue, all components on the page need to be initialized such that there is only ever **one class name generator** among them.

Два генератора имен классов вы можете получить в различных сценариях:

- Вы случайно используете две версии Material-UI в **пакете**. Возможно, у вас есть зависимость, неправильно устанавливающая Material-UI в качестве одноранговой зависимости.
- You are using `StylesProvider` for a **subset** of your React tree.
- Вы используете сборщик, и он разбивает код таким образом, что создает несколько экземпляров генератора имен классов.

> Если вы используете webpack с [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), попробуйте настроить [`runtimeChunk` в секции `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).

Overall, it's simple to recover from this problem by wrapping each Material-UI application with [`StylesProvider`](/styles/api/#stylesprovider) components at the top of their component trees **and using a single class name generator shared among them**.

## Why do the fixed positioned elements move when a modal is opened?

Scrolling is blocked as soon as a modal is opened. This prevents interacting with the background when the modal should be the only interactive content. However, removing the scrollbar can make your **fixed positioned elements** move. In this situation, you can apply a global `.mui-fixed` class name to tell Material-UI to handle those elements.

## How can I disable the ripple effect globally?

The ripple effect is exclusively coming from the `BaseButton` component. You can disable the ripple effect globally by providing the following in your theme:

```js
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
  },
});
```

## Как я могу отключить transitions глобально?

Material-UI uses the same theme helper for creating all its transitions. Therefore you can disable all transitions by overriding the helper in your theme:

```js
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
});
```

It can be useful to disable transitions during visual testing or to improve performance on low-end devices.

You can go one step further by disabling all transitions and animations effects:

```js
import { createTheme } from '@material-ui/core';

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

Notice that the usage of `CssBaseline` is required for the above approach to work. If you choose not to use it, you can still disable transitions and animations by including these CSS rules:

```css
*, *::before, *::after {
  transition: 'none !important';
  animation: 'none !important';
}
```

## Должен ли я использовать JSS для стилизации своего приложения?

No, it's not required. But this dependency comes built in, so carries no additional bundle size overhead.

You can use `npm ls @material-ui/styles`, `yarn list @material-ui/styles` or `find -L ./node_modules | grep /@material-ui/styles/package.json` commands in your application folder. If you think that the issue may be in the duplication of the @material-ui/styles module somewhere in your dependencies, there are several ways to check this.

## When should I use inline-style vs. CSS?

As a rule of thumb, only use inline-style for dynamic style properties. The CSS alternative provides more advantages, such as:

- auto-prefixing
- better debugging
- медиа-запросы
- ключевые кадры

## Как мне использовать react-router?

We detail the [integration with third-party routing libraries](/guides/routing/) like react-router, Gatsby or Next.js in our guide.

## Как я могу получить доступ к элементу DOM?

All Material-UI components that should render something in the DOM forward their ref to the underlying DOM component. This means that you can get DOM elements by reading the ref attached to Material-UI components:

```jsx
// or a ref setter function
const ref = React.createRef();
// render
<Button ref={ref} />;
// usage
const element = ref.current;
```

If you're not sure if the Material-UI component in question forwards its ref you can check the API documentation under "Props" e.g. the [Button API](/api/button/#props) includes

> The ref is forwarded to the root element.

indicating that you can access the DOM element with a ref.

## I have several instances of styles on the page

If you are seeing a warning message in the console like the one below, you probably have several instances of `@material-ui/styles` initialized on the page.

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and make your application bigger without a good reason.

### Возможные причины

Существует несколько распространенных причин для этого:

- You have another `@material-ui/styles` library somewhere in your dependencies.
- You have a monorepo structure for your project (e.g, lerna, yarn workspaces) and `@material-ui/styles` module is a dependency in more than one package (this one is more or less the same as the previous one).
- You have several applications that are using `@material-ui/styles` running on the same page (e.g., several entry points in webpack are loaded on the same page).

### Duplicated module in node_modules

You can use `npm ls @material-ui/styles`, `yarn list @material-ui/styles` or `find -L ./node_modules | grep /@material-ui/styles/package.json` commands in your application folder. If you think that the issue may be in the duplication of the @material-ui/styles module somewhere in your dependencies, there are several ways to check this.

If none of these commands identified the duplication, try analyzing your bundle for multiple instances of @material-ui/styles. You can just check your bundle source, or use a tool like [source-map-explorer](https://github.com/danvk/source-map-explorer) or [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

If you identified that duplication is the issue that you are encountering there are several things you can try to solve it:

If you are using npm you can try running `npm dedupe`. This command searches the local dependencies and tries to simplify the structure by moving common dependencies further up the tree.

If you are using webpack, you can change the way it will [resolve](https://webpack.js.org/configuration/resolve/#resolve-modules) the @material-ui/styles module. You can overwrite the default order in which webpack will look for your dependencies and make your application node_modules more prioritized than default node module resolution order:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Usage with Lerna

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. Try running the bootstrap option with the --hoist flag.

```sh
lerna bootstrap --hoist
```

Alternatively, you can remove @material-ui/styles from your package.json file and hoist it manually to your top-level package.json file.

Example of a package.json file in a Lerna root folder

```json
{
  "name": "my-monorepo",
  "devDependencies": {
    "lerna": "latest"
  },
  "dependencies": {
    "@material-ui/styles": "^4.0.0"
  },
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "start": "lerna run start",
    "build": "lerna run build"
  }
}
```

### Running multiple applications on one page

If you have several applications running on one page, consider using one @material-ui/styles module for all of them. If you are using webpack, you can use [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to create an explicit [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), that will contain the @material-ui/styles module:

```diff
  module.exports = {
    entry: {
+     vendor: ["@material-ui/styles"],
      app1: "./src/app.1.js",
      app2: "./src/app.2.js",
    },
    plugins: [
+     new webpack.optimize.CommonsChunkPlugin({
+       name: "vendor",
+       minChunks: Infinity,
+     }),
    ]
  }
```

## My App doesn't render correctly on the server

If it doesn't work, in 99% of cases it's a configuration issue. A missing property, a wrong call order, or a missing component – server-side rendering is strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup.

The best way to find out what's wrong is to compare your project to an **already working setup**. Check out the [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

### CSS works only on first load then is missing

The CSS is only generated on the first load of the page. Then, the CSS is missing on the server for consecutive requests.

#### Action to Take

The styling solution relies on a cache, the *sheets manager*, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). You need to create **a new `sheets` instance for each request**.

example of fix:

```diff
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Create a sheets instance.
+ const sheets = new ServerStyleSheets();

  //… const html = ReactDOMServer.renderToString(
  -// Create a sheets instance.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Create a sheets instance.

  + const sheets = new ServerStyleSheets();

  //…
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  -// Create a sheets instance.
```

### React class name hydration mismatch

> Warning: Prop className did not match.

There is a class name mismatch between the client and the server. It might work for the first request. Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### Action to Take

The class names value relies on the concept of [class name generator](/styles/advanced/#class-names). The class names value relies on the concept of [class name generator](/styles/advanced/#class-names). This generator needs to behave identically on the server and on the client. Например:

- You need to provide a new class name generator for each request. But you shouldn't share a `createGenerateClassName()` between different requests:

  example of fix:

  ```diff
  -// Create a new class name generator.
  -const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Create a new class name generator.
  -const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Create a new class name generator.

    + const sheets = new ServerStyleSheets();

  //…
    const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  -// Create a sheets instance.
  ```

- You need to verify that your client and server are running the **exactly the same version** of Material-UI. It is possible that a mismatch of even minor versions can cause styling problems. To check version numbers, run `npm list @material-ui/core` in the environment where you build your application and also in your deployment environment.

  You can also ensure the same version in different environments by specifying a specific MUI version in the dependencies of your package.json.

  _example of fix (package.json):_

  ```diff
    "dependencies": {
    ...
  -   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
    },
  ```

- You need to make sure that the server and the client share the same `process.env.NODE_ENV` value.

## Why are the colors I am seeing different from what I see here?

Сайт документации использует пользовательскую тему. Следовательно, цветовая палитра отличается от темы по умолчанию, которую поставляет Material-UI. Пожалуйста, обратитесь к [этой странице](/customization/theming/), чтобы узнать о настройке темы.

## Why does component X require a DOM node in a prop instead of a ref object?

Components like the [Portal](/api/portal/#props) or [Popper](/api/popper/#props) require a DOM node in the `container` or `anchorEl` prop respectively. It seems convenient to simply pass a ref object in those props and let Material-UI access the current value. This works in a simple scenario:

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

where `Portal` would only mount the children into the container when `container.current` is available. Here is a naive implementation of Portal:

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

With this simple heuristic `Portal` might re-render after it mounts because refs are up-to-date before any effects run. However, just because a ref is up-to-date doesn't mean it points to a defined instance. If the ref is attached to a ref forwarding component it is not clear when the DOM node will be available. The above implementation could also not account for a change in the DOM node. In the example above, the `Portal` would run an effect once, but might not re-render because `ref.current` is still `null`. This is especially apparent for React.lazy components in Suspense.

This is why we require a prop with the actual DOM node so that React can take care of determining when the `Portal` should re-render:

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
    className={`MuiButton-root ${disabled ? // let disabled = false, selected = true;

return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${selected ?
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
