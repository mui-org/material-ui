# 使い方

<p class="description">Material-UIとReactを今すぐ始めましょう。</p>

Material-UIコンポーネントは独立して機能します。 **これらは自立しており**、表示するのに必要なスタイルだけを加えます。 それらは[normalize.css](https://github.com/necolas/normalize.css/)のようなグローバルのスタイルシートには依存しません。

ドキュメントに示されているように、任意のコンポーネントを使用できます。 どのようにインポートされるか確認する為にそれぞれのコンポーネントの[デモページ](/components/buttons/)を参照してください。

## 今すぐ始める

以下に簡単な例を示します。 **文字通り必要なものすべてです**:

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

そうです。これは本当に始めるのに必要な全てです。この編集可能なデモで確認できるように:

{{"demo": "pages/getting-started/usage/Usage.js", "hideToolbar": true, "bg": true}}

## グローバル

Material-UI usage experience can be improved with a handful of important globals that you'll need to be aware of.

### Responsive meta tag

Material-UIはモバイルファーストで開発されています。最初にモバイル端末用のコードを記述し、次にCSSメディアクエリを使用して必要に応じてコンポーネントを拡張するという方法を用いています。 すべてのデバイスで適切なレンダリングとタッチズームを確実に行うには、responsive viewport meta tagを `<head>` 要素に追加します。

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

### CssBaseline

Material-UIはオプションで[CssBaseline](/components/css-baseline/)コンポーネントを提供しています。 これは、ブラウザやデバイス間の不整合を修正すると同時に、一般的なHTML要素に対して少しだけ独自のリセットを提供します。

## バージョン管理されたドキュメント

このドキュメントは常に最新の安定版のMaterial-UIを反映しています。 古いバージョンのドキュメントは、[別のページ ](https://material-ui.com/versions/)にあります。

## 次のステップ

これで基本的なセットアップがわかったので、次の項目について詳しく学びましょう。

- [Material Designフォントとタイポグラフィ](/components/typography/)を導入する方法
- [テーマソリューションを活用する方法](/customization/theming/) 。
- コンポーネントの見た目を[上書き](/customization/how-to-customize/)する方法
