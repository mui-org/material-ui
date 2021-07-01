# インストール

<p class="description">Material-UIをインストールします。世界で最も人気のあるReact UIフレームワークです。</p>

Material-UIは[ npmパッケージ](https://www.npmjs.com/package/@material-ui/core) として入手可能です。

## npm

次のコマンドを実行してください。これで、あなたの`package.json` に保存できます。

```sh
// with npm
npm install @material-ui/core@next @emotion/react @emotion/styled

// with yarn
yarn add @material-ui/core@next @emotion/react @emotion/styled
```

<!-- #react-peer-version -->

[react](https://www.npmjs.com/package/react) >= 17.0.0 and [react-dom](https://www.npmjs.com/package/react-dom) >= 17.0.0が peer dependencies であることに注意してください。

Or if you want to use `styled-components` as a styling engine:

```sh
// with npm
npm install @material-ui/core@next @material-ui/styled-engine-sc@next styled-components

// with yarn
yarn add @material-ui/core@next @material-ui/styled-engine-sc@next styled-components
```

Take a look at the [Styled Engine guide](/guides/styled-engine/) for more information about how to configure `styled-components` as the style engine.

## Robotoフォント

Material-UIは[Roboto](https://fonts.google.com/specimen/Roboto)フォントを考慮して設計されています。 その為、必ず[以下の手順](/components/typography/#general) に従ってください。 たとえば、Google Web Fontsを用いて、

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## フォントアイコン

To use the font `Icon` component, you must first add the [Material icons](https://fonts.google.com/icons) font. こちらは、その[手順](/components/icons/#font-icons)です。 たとえば、Google Web Fontsを用いて、

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVGアイコン

[component demos](/components/icons/)にあるような事前にビルドされたSVG Material iconsを使う為には、[@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons)パッケージをインストールする必要があります。

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

## CDN

プロトタイピングには最適な最小限のフロントエンド構造でMaterial-UIを使い始めることができます。

2つのユニバーサルモジュール定義 (**UMD**) ファイルが提供されています:

- 開発用: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- 本番用: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

[CDN example](https://github.com/mui-org/material-ui/tree/master/examples/cdn)に従うことで、すぐに開発を始めることができます。

⚠️ただし、**本番環境**でこのアプローチを使用することは**推奨しません**。クライアントは、実際にどのコンポーネントが使用されているかにかかわらず、ライブラリ全体をダウンロードする必要があるため、パフォーマンスと帯域幅の使用率に影響を与えます。

⚠️ UMDリンクは、ライブラリの最新バージョンを示すために`latest`タグを使用しています。 このポインターは**不安定で** 、新しいバージョンがリリースされると変わります。 [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js) のような特定のバージョンを指すことを考慮する必要があります。

## Design resources

<a href="https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>
<a href="https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="adobe-xd" /></a>
<a href="https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>

A set of reusable components for design tools is available, designed to match the React components and to help you craft great products:

- [Figma](https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): 600個以上ものMaterial-UIコンポーネントを含んだ大規模なUIキット
- [Adobe XD](https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): 600を超えるMaterial-UIのコンポーネントを含んだ大規模なUIキット
- [Sketch](https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch): 600を超えるMaterial-UIのシンボルを含んだUIキット
- **Framer**: [Framer for Material-UI](https://packages.framer.com/package/material-ui/material-ui) — A small MIT UI kit preview of handcrafted Material-UI's component.
