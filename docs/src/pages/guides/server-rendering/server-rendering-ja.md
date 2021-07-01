# サーバーサイドレンダリング

<p class="description">サーバーサイドレンダリングの最も一般的な使用例は、ユーザー（または検索エンジンのクローラー）が最初にアプリをリクエストしたときの初期レンダリングを処理することです。</p>

サーバはリクエストを受け付けると、必要なコンポーネントをHTMLフォーマットの文字列として書き出し、クライアント側に送り返します。 そして、初回リクエスト以降のレンダリングはクライアント側で行います。

## Material-UIをサーバ上で使用する

Material-UIは、サーバーでのレンダリングの制約を考慮してゼロから設計されましたが、正しく統合されるかどうかはユーザー次第です。 サーバサイドレンダリングでは必要とされるCSSが正しく渡される必要があります。HTML要素だけを返しクライアントサイドでCSSが挿入されるのを待つようにコード書かれた場合、CSSが適用される前後でチラつき（俗にいうFOUC）が発生する場合があります。 クライアントにスタイルを注入するには、次のことが必要です。

1. Create a fresh, new [`emotion cache`](https://emotion.sh/docs/@emotion/cache) instance on every request.
2. Server-side collectorを使用しReactのコンポーネントツリーを描画する。
3. コンポーネントツリーで必要となるCSSを読み込む
4. CSSをツリーと一緒にクライアント側へ渡す。

On the client-side, the CSS will be injected a second time before removing the server-side injected CSS.

## Setting up

ここからは、サーバーサイドレンダリングをどう設定するかについて見ていきます。

### テーマ

サーバー側とクライアント側で共有されるテーマを作成します。

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
  },
});

export default theme;
```

### サーバーサイド

サーバーサイドのコードは概ね次の様になります。 We are going to set up an [Express middleware](https://expressjs.com/en/guide/using-middleware.html) using [app.use](https://expressjs.com/en/api.html) to handle all requests that come into the server. If you're unfamiliar with Express or middleware, know that the `handleRender` function will be called every time the server receives a request.

`server.js`

```js
const css = sheets.toString();

  // Send the rendered page back to the client.
function renderFullPage(html, css) {
  /* ... */
}

function handleRender(req, res) {
  /* ... */
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
*/
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
```

### Handling the request

The first thing that we need to do on every request is to create a new `emotion cache`.

When rendering, we will wrap `App`, the root component, inside a [`CacheProvider`](https://emotion.sh/docs/cache-provider) and [`ThemeProvider`](/styles/api/#themeprovider) to make the style configuration and the `theme` available to all components in the component tree.

The key step in server-side rendering is to render the initial HTML of the component **before** we send it to the client-side. これを実現するために [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html)を使用します。

Material-UI is using emotion as its default styled engine. We need to extract the styles from the emotion instance. For this, we need to share the same cache configuration for both the client and server:

`getCache.js`

```js
import createCache from '@emotion/cache';

export default function getCache() {
  const cache = createCache({ key: 'css' });
  cache.compat = true;
  return cache;
}
```

With this we are creating new emotion cache instance and using this to extract the critical styles for the html as well.

ここで、先ほどの`renderFullPage`関数の中で、これらの値がどの様に受け渡されるを見ていきます。

```jsx
import express from 'express';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import theme from './theme';
import getCache from './getCache';

function handleRender(req, res) {
  const cache = getCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>,
  );

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, emotionCss));
}

const app = express();

app.use('/build', express.static('build'));

// This is fired every time the server-side receives a request.
*/
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
```

### Inject initial component HTML and CSS

The final step on the server-side is to inject the initial component HTML and CSS into a template to be rendered on the client-side.

```js
function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
        ${css}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}
```

### The client-side

The client-side is straightforward. All we need to do is use the same cache configuration as the server-side. クライアント側のコードを見てみましょう:

`client.js`

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import App from './App';
import theme from './theme';
import getCache from './getCache';

function Main() {
  return (
    <CacheProvider value={getCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.hydrate(<Main />, document.querySelector('#root'));
```

## 参考実装

We host different reference implementations which you can find in the [GitHub repository](https://github.com/mui-org/material-ui) under the [`/examples`](https://github.com/mui-org/material-ui/tree/HEAD/examples) folder:

- [このチュートリアルの実装サンプル](https://github.com/mui-org/material-ui/tree/HEAD/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/HEAD/examples/gatsby)
- [Next.js](https://github.com/mui-org/material-ui/tree/HEAD/examples/nextjs) ([TypeScript version](https://github.com/mui-org/material-ui/tree/HEAD/examples/nextjs-with-typescript))

## トラブルシューティング

FAQに投稿された [My App doesn't render correctly on the server](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server)を参照してみてください。
