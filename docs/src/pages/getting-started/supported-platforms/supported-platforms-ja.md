# サポートされているプラットフォーム

<p class="description">モダンなものから古いものまで、Material-UIがサポートするプラットフォームについて学びましょう。</p>

## ブラウザ

Material-UIは主要なブラウザとプラットフォームの最新の安定版リリースをサポートしています。 ブラウザのサポートされていない機能は内部的に独立して管理されているので、JavaScriptポリフィルを導入する必要はありません。

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari (macOS) | Safari (iOS) | IE                   |
|:----- |:------- |:------ |:-------------- |:------------ |:-------------------- |
| >= 85 | >= 78   | >= 84  | >= 13          | >= 12.1      | 11 (partial support) |

<!-- #default-branch-switch -->

An extensive list can be found in our [.browserlistrc](https://github.com/mui-org/material-ui/blob/next/.browserslistrc#L12-L27) (check the `stable` entry).

Googlebotはページコンテンツのインデックス作成にweb rendering service (WRS) を使用するので、Material-UIがそれをサポートすることは重要です。 [WRSは、使用するレンダリングエンジンを定期的に更新します](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)。 特に支障なくレンダリングできるMaterial-UIのコンポーネントを期待できます。

### IE 11

Material-UI provides **partial** supports for IE 11. Be aware of the following:

- Some of the components have no support. For instance, the new components, the data grid, the date picker.
- Some of the components have degraded support. For instance, the outlined input border radius is missing, the combobox doesn't remove diacritics, the circular progress animation is wobbling.
- The documentaton itself might crash.
- You need install the [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).
- You might need to install polyfills. For instance for the [popper.js transitive dependency](https://popper.js.org/docs/v2/browser-support/#ie11).

Overall, the library doesn't prioritize the support of IE 11 if it harms the most common use cases. For instance, we will close new issues opened about IE 11 and might not merge pull requests that improve IE 11 support.

v6 will completely remove the support of IE 11.

## サーバ

<!-- #stable-snapshot -->

Material-UI supports [Node.js](https://github.com/nodejs/node) starting with version 12.17 (or 12.0 with `--experimental-modules` enabled) for server-side rendering. Where possible, the [LTS versions that are in maintenance](https://github.com/nodejs/Release#release-schedule) are supported.

### CSSプレフィックス

一部のCSS機能では、ベンダープレフィックスを追加するための後処理が[必要](https://github.com/cssinjs/jss/issues/279)になることに注意してください。 これらのプレフィックスは [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer) のおかげで自動的にクライアントに追加されます。

ドキュメントで記述されているCSSは、[`autoprefixer`](https://www.npmjs.com/package/autoprefixer)で処理されます。 インスピレーションとして[ドキュメントの実装](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123)を用いることができます。 ページのパフォーマンスに影響することに注意してください。 これは静的ページには必須ですが、動的ページをレンダリングする時には、何もしない事のバランスを取る必要があります。

## React

<!-- #react-peer-version -->

Material-UI supports the most recent versions of React, starting with ^17.0.0 (the one with event delegation at the React root). 下位互換性については、古い [バージョン](https://material-ui.com/versions/) を参照してください。

## TypeScript

Material-UI requires a minimum version of TypeScript 3.5.
