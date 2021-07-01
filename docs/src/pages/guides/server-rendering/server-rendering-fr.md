# Rendu serveur

<p class="description">The most common use case for server-side rendering is to handle the initial render when a user (or search engine crawler) first requests your app.</p>

When the server receives the request, it renders the required component(s) into an HTML string, and then sends it as a response to the client. From that point on, the client takes over rendering duties.

## Material-UI on the server

Material-UI was designed from the ground-up with the constraint of rendering on the server, but it's up to you to make sure it's correctly integrated. It's important to provide the page with the required CSS, otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to flicker (FOUC). It's important to provide the page with the required CSS, otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to flicker (FOUC).

1. Create a fresh, new [`ServerStyleSheets`](/styles/api/#serverstylesheets) instance on every request.
2. Render the React tree with the server-side collector.
3. Pull the CSS out.
4. Pass the CSS along to the client.

On the client side, the CSS will be injected a second time before removing the server-side injected CSS.

## Mise en place

In the following recipe, we are going to look at how to set up server-side rendering.

### The theme

Create a theme that will be shared between the client and the server:

`theme.js`

```js
import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

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
    background: {
      default: '#fff',
    },
  },
});

export default theme;
```

### The server-side

The following is the outline for what the server-side is going to look like. We are going to set up an [Express middleware](https://expressjs.com/en/guide/using-middleware.html) using [app.use](https://expressjs.com/en/api.html) to handle all requests that come in to the server. If you're unfamiliar with Express or middleware, just know that the handleRender function will be called every time the server receives a request.

`server.js`

```js
const css = sheets.toString();

  // Send the rendered page back to the client.
function renderFullPage(html, css) {
  /* ... */
}

function handleRender(req, res) {
  /* ...
*/
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
```

### Handling the Request

The first thing that we need to do on every request is create a new `ServerStyleSheets`.

When rendering, we will wrap `App`, the root component, inside a [`StylesProvider`](/styles/api/#stylesprovider) and [`ThemeProvider`](/styles/api/#themeprovider) to make the style configuration and the `theme` available to all components in the component tree.

The key step in server-side rendering is to render the initial HTML of the component **before** we send it to the client side. To do this, we use [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html).

We then get the CSS from the `sheets` using `sheets.toString()`. As we are also using emotion as our default styled engine, we need to extract the styles from the emotion instance as well. For this we need to share the same cache definition for both the client and server:

`cache.js`

```js
import createCache from '@emotion/cache';

const cache = createCache({ key: 'css' });

export default cache;
```

With this we are creating new Emotion server instance and using this to extract the critical styles for the html as well.

We will see how this is passed along in the `renderFullPage` function.

```jsx
import express from 'express';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import theme from './theme';
import cache from './cache';

const { extractCritical } = createEmotionServer(cache);

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CacheProvider>,
    ),
  );

  // Grab the CSS from the sheets. const css = sheets.toString();

  // Grab the CSS from emotion
  const styles = extractCritical(html);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, `${css} ${styles.css}`));
}

const app = express();

app.use('/build', express.static('build'));

// This is fired every time the server-side receives a request.
*/
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
```

### Inject Initial Component HTML and CSS

The final step on the server-side is to inject the initial component HTML and CSS into a template to be rendered on the client side.

```js
function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}
```

### Le côté client

The client side is straightforward. All we need to do is remove the server-side generated CSS. Let's take a look at the client file:

`client.js`

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import App from './App';
import theme from './theme';
import cache from './cache';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.hydrate(<Main />, document.querySelector('#root')); */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.hydrate(<Main />, document.querySelector('#root'));
```

## Implémentations de référence

We host different reference implementations which you can find in the [GitHub repository](https://github.com/mui-org/material-ui) under the [`/examples`](https://github.com/mui-org/material-ui/tree/master/examples) folder:

- [The reference implementation of this tutorial](https://github.com/mui-org/material-ui/tree/HEAD/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/HEAD/examples/gatsby)
- https://github.com/mui-org/material-ui/tree/master/examples/nextjs

## Résolution de problèmes

Check out the FAQ answer: [My App doesn't render correctly on the server](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server).
