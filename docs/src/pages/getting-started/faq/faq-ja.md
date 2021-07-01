# よくある質問と回答

<p class="description">特定の問題で立ち往生していますか？ 特定の問題で立ち往生していますか？ 特定の問題で立ち往生していますか？ Check some of these common gotchas first in the FAQ.</p>

If you still can't find what you're looking for, you can refer to our [support page](/getting-started/support/).

## Material-UI uses the same theme helper for creating all its transitions. Therefore you can disable all transitions by overriding the helper in your theme:

Material-UIをサポートする方法はたくさんあります。

- **ライブラリを布教する**  **ライブラリを布教する** **ライブラリを布教する** **ライブラリを布教する** **ライブラリを布教する** Evangelize Material-UI by [linking to material-ui.com](https://material-ui.com/) on your website, every backlink matters. Follow us on [Twitter](https://twitter.com/MaterialUI), like and retweet the important news. Or just talk about us with your friends.
- **フィードバックを送る** Tell us what we're doing well or where we can improve. Please upvote (👍) the issues that you are the most interested in seeing solved.
- **新規ユーザーを助ける** You can answer questions on [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui).
- **変更を加える**
  - Edit the documentation. Every page has an "EDIT THIS PAGE" link in the top right.
  - Report bugs or missing features by [creating an issue](https://github.com/mui-org/material-ui/issues/new).
  - Review and comment on existing [pull requests](https://github.com/mui-org/material-ui/pulls) and [issues](https://github.com/mui-org/material-ui/issues).
  - Help [translate](https://translate.material-ui.com) the documentation.
  - [Pull Requestを出して](https://github.com/mui-org/material-ui/pulls)、[私たちのドキュメントを改善したり](https://github.com/mui-org/material-ui/tree/next/docs)、 バグを修正したり、新機能を追加したりしましょう。
- **[OpenCollective](https://opencollective.com/material-ui)で資金的なサポートをする** If you use Material-UI in a commercial project and would like to support its continued development by becoming a Sponsor, or in a side or hobby project and would like to become a Backer, you can do so through OpenCollective. All funds donated are managed transparently, and Sponsors receive recognition in the README and on the Material-UI home page.

## productionビルドでコンポーネントが正しくレンダリングされないのはなぜですか？

Material-UIが機能するためには、`className`ページ上のすべてのコンポーネントの値は、[クラス名ジェネレータ](/styles/advanced/#class-names)の単一インスタンスによって生成される必要があります。 Material-UIが機能するためには、`className`ページ上のすべてのコンポーネントの値は、[クラス名ジェネレータ](/styles/advanced/#class-names)の単一インスタンスによって生成される必要があります。 The #1 reason this likely happens is due to class name conflicts once your code is in a production bundle.

To correct this issue, all components on the page need to be initialized such that there is only ever **one class name generator** among them.

さまざまなシナリオで、誤って2つのクラス名ジェネレータを使用することになる事例

- 誤って2つのバージョンのMaterial-UIを**バンドル**してしまっている場合。 If you think that the issue may be in the duplication of the @material-ui/styles module somewhere in your dependencies, there are several ways to check this. --hoistフラグを指定してbootstrap option を実行してみてください。
- Reactツリーの**サブセット**に`StylesProvider`を使用している場合
- バンドラーを使用していて、それが原因で複数のクラス名ジェネレータインスタンスが作成されるようにコードを分割している場合。

> Webパックで[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)を使用している場合は、[`最適化`で`runtimeChunk`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk)設定を構成してみてください。

Overall, it's simple to recover from this problem by wrapping each Material-UI application with [`StylesProvider`](/styles/api/#stylesprovider) components at the top of their component trees **and using a single class name generator shared among them**.

## モーダルを開くと、fixed positionされたDOMが移動するのはなぜですか？

Scrolling is blocked as soon as a modal is opened. This prevents interacting with the background when the modal should be the only interactive content. However, removing the scrollbar can make your **fixed positioned elements** move. この場合、Material-UIにこれらのDOMを処理するように伝えるために、グローバルな `.mui-fixed`クラス名を適用することができます。

## 波紋アニメーションをグローバルに無効にする方法は？

Material-UI uses the same theme helper for creating all its transitions. Therefore you can disable all transitions by overriding the helper in your theme:

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

## 移行をグローバルに無効にするにはどうすればよいですか？

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

## アプリのスタイルを設定するにはJSSを使用する必要がありますか？

いいえ、必須ではありません。 いいえ、必須ではありません。 But this dependency comes built in, so carries no additional bundle size overhead. いいえ、必須ではありません。 But this dependency comes built in, so carries no additional bundle size overhead.

その場合は、[スタイルライブラリの相互運用](/guides/interoperability/)セクションで、Material-UIコンポーネントを別のスタイルのライブラリでスタイル変更することがいかに簡単であるかを示します。 その場合は、[スタイルライブラリの相互運用](/guides/interoperability/)セクションで、Material-UIコンポーネントを別のスタイルのライブラリでスタイル変更することがいかに簡単であるかを示しています。

## When should I use inline-style vs. CSS?

経験則として、動的styleプロパティにはinline-styleのみを使用してください。 CSSの代替手段は、次のようなより多くの利点を提供します。

- auto-prefixing
- デバックのしやすさ
- メディアクエリ
- keyframes

## react-routerの使い方は？

We detail the [integration with third-party routing libraries](/guides/routing/) like react-router, Gatsby or Next.js in our guide.

## どうやってDOM要素にアクセスできますか？

DOM内の何かを描画するすべてのMaterial-UIコンポーネントは、そのrefを基礎となるDOMコンポーネントに転送します。 つまり、Material-UIコンポーネントにアタッチされたrefを読み取ることでDOM要素 を取得できます。 DOM内の何かを描画するすべてのMaterial-UIコンポーネントは、そのrefを基礎となるDOMコンポーネントに転送します。 つまり、Material-UIコンポーネントにアタッチされたrefを読み取ることでDOM要素 を取得できます。 DOM内の何かを描画するすべてのMaterial-UIコンポーネントは、そのrefを基礎となるDOMコンポーネントに転送します。 つまり、Material-UIコンポーネントにアタッチされたrefを読み取ることでDOM要素 を取得できます。 DOM内の何かを描画するすべてのMaterial-UIコンポーネントは、そのrefを基礎となるDOMコンポーネントに転送します。 つまり、Material-UIコンポーネントにアタッチされたrefを読み取ることでDOM要素 を取得できます。 DOM内の何かを描画するすべてのMaterial-UIコンポーネントは、そのrefを基礎となるDOMコンポーネントに転送します。 つまり、Material-UIコンポーネントにアタッチされたrefを読み取ることでDOM要素 を取得できます。

```jsx
// or a ref setter function
const ref = React.createRef();
// render
<Button ref={ref} />;
// usage
const element = ref.current;
```

問題のMaterial-UIコンポーネントがそのrefを転送するかどうかわからない場合は、 [Button API](/api/button/#props)など、「プロパティ」のAPIドキュメントを確認できます。 含む

> Refはルート要素に転送されます。

refを使用してDOM要素にアクセスできることを示します。

## ページにスタイルのインスタンスがいくつかあります

次のような警告メッセージがコンソールに表示される場合は、ページ上で`@material-ui/styles`のインスタンスがいくつか初期化されている可能性があります。

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and make your application bigger without a good reason.

### 考えられる理由:

これが起こる一般的な理由はいくつかあります。

- 依存関係のどこかに別の`@material-ui/styles`ライブラリがあります。
- プロジェクト(例：yarn workspaces)にmonorepo構造があり、`@material-ui/styles`モジュールが複数のパッケージ(これは前のとだいたい同じです)に依存しています。
- `@material-ui/styles`を使用する複数のアプリケーションが同じページ(たとえば、webpackの複数のエントリポイントが同じページにロードされる。)で実行されています。

### node_modulesの重複モジュール

You can use `npm ls @material-ui/styles`, `yarn list @material-ui/styles` or `find -L ./node_modules | grep /@material-ui/styles/package.json` commands in your application folder. If you think that the issue may be in the duplication of the @material-ui/styles module somewhere in your dependencies, there are several ways to check this.

If you think that the issue may be in the duplication of the @material-ui/styles module somewhere in your dependencies, there are several ways to check this. --hoistフラグを指定してbootstrap option を実行してみてください。

重複が発生している問題であることがわかった場合は、いくつかの解決方法があります。

Npmを使用している場合は、`npm dedupe`を実行してみてください。 このコマンドは、ローカルの依存関係を検索し、共通の依存関係をツリーの上位に移動して構造を単純化しようとします。

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. --hoistフラグを指定してbootstrap option を実行してみてください。

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Lernaでの使用

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. --hoistフラグを指定してbootstrap option を実行してみてください。

```sh
lerna bootstrap --hoist
```

または、パッケージから@material-ui/stylesを削除することもできます。jsonファイルを作成し、手動で最上位のパッケージに上げます。jsonファイルを使用します。

Lernaルートフォルダー内のpackage.jsonファイルの例

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

### 1つのページで複数のアプリケーションを実行する

1つのページで複数のアプリケーションを実行している場合は、それらすべてに1つの@material-ui/stylesモジュールを使用することを検討してください。 1つのページで複数のアプリケーションを実行している場合は、それらすべてに1つの@material-ui/stylesモジュールを使用することを検討してください。 Webパックを使用している場合は、[CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)を使用して@material-ui/stylesモジュールを含む明示的な[vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), を作成できます。 1つのページで複数のアプリケーションを実行している場合は、それらすべてに1つの@material-ui/stylesモジュールを使用することを検討してください。 Webパックを使用している場合は、[CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)を使用して@material-ui/stylesモジュールを含む明示的な[vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), を作成できます。 1つのページで複数のアプリケーションを実行している場合は、それらすべてに1つの@material-ui/stylesモジュールを使用することを検討してください。 Webパックを使用している場合は、[CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)を使用して@material-ui/stylesモジュールを含む明示的な[vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), を作成できます。

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

## サーバーでアプリが正しくレンダリングされない

動作しない場合は、99%のケースで設定の問題になります。 A missing property, a wrong call order, or a missing component – server-side rendering is strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup.

The best way to find out what's wrong is to compare your project to an **already working setup**. Check out the [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

### CSSは最初のロードでのみ機能し、その後欠落します

CSSは、ページの最初のロード時にのみ生成されます。 この場合、CSSは連続した要求に対してサーバに存在しません。 CSSは、ページの最初のロード時にのみ生成されます。 この場合、CSSは連続した要求に対してサーバに存在しません。 CSSは、ページの最初のロード時にのみ生成されます。 この場合、CSSは連続した要求に対してサーバに存在しません。 CSSは、ページの最初のロード時にのみ生成されます。 この場合、CSSは連続した要求に対してサーバに存在しません。 CSSは、ページの最初のロード時にのみ生成されます。 この場合、CSSは連続した要求に対してサーバに存在しません。 CSSは、ページの最初のロード時にのみ生成されます。 この場合、CSSは連続した要求に対してサーバに存在しません。

#### 実行するアクション

The styling solution relies on a cache, the *sheets manager*, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). 要求ごとに**新しい`シート`インスタンスを作成する必要があります**。

修正の例：

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

### Reactクラス名のハイドレーションの不一致

> Warning: Prop className did not match.

クライアントとサーバーの間にクラス名の不一致があります。 最初の要求で機能する場合があります。 う1つの症状は、初期ページ・ロードとクライアント・スクリプトのダウンロードの間でスタイル設定が変更されることです。 最初の要求で機能する場合があります。 う1つの症状は、初期ページ・ロードとクライアント・スクリプトのダウンロードの間でスタイル設定が変更されることです。

#### 実行するアクション

クラス名の値は、[class name generator](/styles/advanced/#class-names)の概念に基づいています。 ページ全体を**単一のジェネレーターでレンダリングする必要があります** 。 このジェネレーターは、サーバーとクライアントで同じように動作する必要があります。 例えば： ページ全体を**単一のジェネレーターでレンダリングする必要があります** 。 このジェネレーターは、サーバーとクライアントで同じように動作する必要があります。 例えば： ページ全体を**単一のジェネレーターでレンダリングする必要があります** 。 このジェネレーターは、サーバーとクライアントで同じように動作する必要があります。 例えば： ページ全体を**単一のジェネレーターで**レンダリングする必要があります 。 このジェネレーターは、サーバーとクライアントで同じように動作する必要があります。 例えば：

- 要求ごとに新しいクラス名ジェネレータを提供する必要があります。 しかし、異なるリクエスト間で`createGenerateClassName()`を共有すべきではありません。 要求ごとに新しいクラス名ジェネレータを提供する必要があります。 しかし、異なるリクエスト間で`createGenerateClassName()`を共有すべきではありません。 要求ごとに新しいクラス名ジェネレータを提供する必要があります。 しかし、異なるリクエスト間で`createGenerateClassName()`を共有すべきではありません。 要求ごとに新しいクラス名ジェネレータを提供する必要があります。 しかし、異なるリクエスト間で`createGenerateClassName()`を共有すべきではありません。 要求ごとに新しいクラス名ジェネレータを提供する必要があります。 しかし、異なるリクエスト間で`createGenerateClassName()`を共有すべきではありません。 要求ごとに新しいクラス名ジェネレータを提供する必要があります。 しかし、異なるリクエスト間で`createGenerateClassName()`を共有すべきではありません。

  修正の例：

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

- しかし、異なるリクエスト間で**createGenerateClassName()**を共有すべきではありません。 マイナーバージョンの不一致でも、スタイルの問題が発生する可能性があります。 バージョン番号を確認するには、アプリケーションを構築する環境と配備環境で`npm list@material-ui/core`を実行します

  Package.jsonの依存関係に特定のMUIバージョンを指定することで、異なる環境で同じバージョンを使用することもできます。

  _修正の例（package.json）：_

  ```diff
    "dependencies": {
    ...
  -   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
    },
  ```

- サーバーとクライアントが同じ`process.env.NODE_ENV` valueを共有していることを確認する必要があります。

## 私が見ている色とこのサイトで見ている色が違うのはなぜですか？

ドキュメントサイトはカスタムテーマを使用しています。 したがって、カラーパレットがあるMaterial-UIが提供しているデフォルトのテーマは異なります。 テーマのカスタマイズについて学ぶには、この[ページ](/customization/theming/)を参照してください。 したがって、カラーパレットがあるMaterial-UIが提供しているデフォルトのテーマは異なります。 テーマのカスタマイズについて学ぶには、この[ページ](/customization/theming/)を参照してください。 したがって、カラーパレットがあるMaterial-UIが提供しているデフォルトのテーマは異なります。 テーマのカスタマイズについて学ぶには、この[ページ](/customization/theming/)を参照してください。 したがって、カラーパレットがあるMaterial-UIが提供しているデフォルトのテーマは異なります。 テーマのカスタマイズについて学ぶには、この[ページ](/customization/theming/)を参照してください。 したがって、カラーパレットがあるMaterial-UIが提供しているデフォルトのテーマは異なります。 テーマのカスタマイズについて学ぶには、この[ページ](/customization/theming/)を参照してください。

## Component Xがrefオブジェクトの代わりにpropでDOMノードを必要とするのはなぜですか？

[Portal](/api/portal/#props)または[Popper](/api/popper/#props)のようなコンポーネントでは、それぞれ `container` または`anchorEl`プロパティにDOMノードが必要です。 これらのプロップにrefオブジェクトを渡し、Material-UIに現在の値にアクセスさせると便利です。 これは、次のような単純なシナリオで機能します。 これらのプロップにrefオブジェクトを渡し、Material-UIに現在の値にアクセスさせると便利です。 これは、次のような単純なシナリオで機能します。

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

ここで、`Portal`は、`container.current`が使用可能の場合にのみ、子をコンテナーにマウントします。 ポータルの単純な実装は次のとおりです。 ポータルの単純な実装は次のとおりです。 ポータルの単純な実装は次のとおりです。 ポータルの単純な実装は次のとおりです。 ポータルの単純な実装は次のとおりです。 ポータルの単純な実装は次のとおりです。

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

この単純なヒューリスティックな` Portal ` refはエフェクトが実行される前に最新であるため、マウント後に再レンダリングされる可能性があります。 ただし、refが最新であるからといって、定義済みインスタンスを指しているわけではありません。 refがref転送コンポーネントに接続されている場合、DOMノードがいつ使用可能になるかは不明です。 この単純なヒューリスティックな`Portal` refはエフェクトが実行される前に最新であるため、マウント後に再レンダリングされる可能性があります。 ただし、refが最新であるからといって、定義済みインスタンスを指しているわけではありません。 refがref転送コンポーネントに接続されている場合、DOMノードがいつ使用可能になるかは不明です。 In the example above, the `Portal` would run an effect once, but might not re-render because `ref.current` is still `null`. This is especially apparent for React.lazy components in Suspense. 上記の実装では、DOMノードの変更も考慮できませんでした。

このため、Reactが`Portal`をいつ再レンダリングするかを決定できるように、実際のDOMノードを持つプロップが必要です。

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

## Clsxの依存関係は何ですか？

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
