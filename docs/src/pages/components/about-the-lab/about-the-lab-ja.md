# ラボについて

<p class="description">このパッケージは、まだコアに移動する準備ができていないインキュベーター・コンポーネントをホストします。</p>

Labパッケージとcoreパッケージの明確な違いはどのようにバージョン管理されるかです。 Labパッケージとcoreパッケージの明確な違いはどのようにバージョン管理されるかです。 Coreパッケージは[slower-moving policy](https://material-ui.com/versions/#release-frequency).

開発者としてlabパッケージのコンポーネントをテスト/使用し、不具合や、使いにくさ、デザインなどについて報告する事ができます。そうする事によってLab パッケージのコンポーネントをより良くする事ができます。 みなさんが使ってくれれば使ってくれるほど、将来的に起きうる重大な問題を早期に発見・改善する事ができます。

Coreパッケージに移るためには以下の基準を考慮します。

- きちんと**使われている**必要があります。 Material-UI開発チームはドキュメントにGoogleAnalyticsを使用しています。それはそれぞれのコンポーネントがどれだけ使われているかを評価するためです。 A lab component with low usage either means that it isn't fully working yet, or that there is low demand for it.
- Coreコンポーネントと同じ**品質**である必要が あります。 It doesn't have to be perfect to be part of the core, but the component should be reliable enough that developers can depend on it.
  - 各コンポーネントが**型定義**を持つことが必要です。 現在、Labパッケージのコンポーネントに型は必要ありませんが、Coreパッケージに移すためには必要です。
  - 十分な**コード網羅率**が必要です。 Labコンポーネントのいくつかは十分なテストコードが現在ありません。
- ユーザーが最新のメジャーバージョンにアップデートすることに**魅力**を感じるか？ コミュニティが分断されないほど、良い。
- 短/中期的に**破壊的変更**が起きる可能性が低いようにしてください。 たとえば、新しい機能を追加するのに破壊的変更が必要な可能性があれば、そのコンポーネントのCoreへの移動は遅らせた方がよい。

## インストール

次を使用して、プロジェクトディレクトリにパッケージをインストールします。

```sh
// npmの場合
npm install @material-ui/lab@next

// yarnの場合
yarn add @material-ui/lab@next
```

このラボには、コアコンポーネントへのピア依存関係があります。 プロジェクトでまだMaterial-UIを使用していない場合は、次のコマンドでインストールできます。

```sh
// npmの場合
npm install @material-ui/core@next

// yarnの場合
yarn add @material-ui/core@next

```

## TypeScript

[CSSのオーバーライド](/customization/theme-components/#global-style-overrides)と[デフォルトのプロパティのカスタマイズ](/customization/theme-components/#default-props)をするには、TypeScriptユーザーは以下の型をインポートする必要があります。  内部的には、[module augmentation](/guides/typescript/#customization-of-theme)を使って、デフォルトのテーマ構造をLabで利用可能なコンポーネントに拡張します

```tsx
import '@material-ui/lab/themeAugmentation';

const theme = createTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});
```
