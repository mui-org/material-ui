# Server rendering

<p class="description">The most common use case for server-side rendering is to handle the initial render when a user (or search engine crawler) first requests your app.</p>

When the server receives the request, it renders the required component(s) into an HTML string and then sends it as a response to the client.
From that point on, the client takes over rendering duties.

## Material UI on the server

Material UI was designed from the ground-up with the constraint of rendering on the server, but it's up to you to make sure it's correctly integrated.
It's important to provide the page with the required CSS, otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to flicker (FOUC).
To inject the style down to the client, we need to:

1. Create a fresh, new [`emotion cache`](https://emotion.sh/docs/@emotion/cache) instance on every request.
2. Render the React tree with the server-side collector.
3. Pull the CSS out.
4. Pass the CSS along to the client.

On the client-side, the CSS will be injected a second time before removing the server-side injected CSS.

## Setting up

In the following recipe, we are going to look at how to set up server-side rendering.

### The theme

Create a theme that will be shared between the client and the server:

```js title="theme.js"
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
```

### The server-side

The following is the outline for what the server-side is going to look like.
We are going to set up an [Express middleware](https://expressjs.com/en/guide/using-middleware.html) using [app.use](https://expressjs.com/en/api.html) to handle all requests that come into the server.
If you're unfamiliar with Express or middleware, know that the `handleRender` function will be called every time the server receives a request.

```js title="server.js"
import express from 'express';

// We are going to fill these out in the sections to follow.
function renderFullPage(html, css) {
  /* ... */
}

function handleRender(req, res) {
  /* ... */
}

const app = express();

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Handling the request

The first thing that we need to do on every request is to create a new `emotion cache`.

When rendering, we will wrap `App`, the root component,
inside a [`CacheProvider`](https://emotion.sh/docs/cache-provider) and [`ThemeProvider`](https://v6.mui.com/system/styles/api/#themeprovider) to make the style configuration and the `theme` available to all components in the component tree.

The key step in server-side rendering is to render the initial HTML of the component **before** we send it to the client-side. To do this, we use [ReactDOMServer.renderToString()](https://react.dev/reference/react-dom/server/renderToString).

Material UI uses Emotion as its default styled engine.
We need to extract the styles from the Emotion instance.
For this, we need to share the same cache configuration for both the client and server:

```js title="createEmotionCache.js"
import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css' });
}
```

With this we are creating a new Emotion cache instance and using this to extract the critical styles for the HTML as well.

We will see how this is passed along in the `renderFullPage` function.

```jsx
import express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import theme from './theme';
import createEmotionCache from './createEmotionCache';

function handleRender(req, res) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline
            to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>,
  );

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  // The chunks go into a <style> verbatim, and the browser ends that element at the first
  // `</style>` it sees, even one sitting inside a CSS value. `\3c` is the CSS escape for `<`, so
  // the rule keeps its meaning but the text can no longer close the element.
  emotionChunks.styles = emotionChunks.styles.map((style) => ({
    ...style,
    css: style.css.replace(/<(?=\/?style\b)/gi, '\\3c '),
  }));
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, emotionCss));
}

const app = express();

app.use('/build', express.static('build'));

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Inject initial component HTML and CSS

The final step on the server-side is to inject the initial component HTML and CSS into a template to be rendered on the client-side.

```js
function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>My page</title>
        ${css}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}
```

### The client-side

The client-side is straightforward.
All we need to do is use the same cache configuration as the server-side.
Let's take a look at the client file:

```jsx title="client.js"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import App from './App';
import theme from './theme';
import createEmotionCache from './createEmotionCache';

const cache = createEmotionCache();

function Main() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline
            to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.hydrateRoot(document.querySelector('#root'), <Main />);
```

## Reference implementations

<!-- #target-branch-reference -->

Here is [the reference implementation of this tutorial](https://github.com/mui/material-ui/tree/HEAD/examples/material-ui-express-ssr).
You can more SSR implementations in the GitHub repository under the `/examples` folder, see [the other examples](/material-ui/getting-started/example-projects/).
