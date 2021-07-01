---
title: Reactリストコンポーネント
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: List'
materialDesign: https://material.io/components/lists
---

# List

<p class="description">Listは、テキストまたは画像が連続する垂直方向の索引です。</p>

リストはテキストや画像を一覧表示するものです。 それらは、アイコンとテキストで表される主要または補足的なアクションを含む項目で構成されています。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic List

{{"demo": "pages/components/lists/BasicList.js", "bg": true}}

上のデモの最後の項目は、リンクを表示方法を示しています。

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/guides/routing/#list) of the documentation.

## ネストしたList

{{"demo": "pages/components/lists/NestedList.js", "bg": true}}

## フォルダのList

{{"demo": "pages/components/lists/FolderList.js", "bg": true}}

## インタラクティブ

以下は、さまざまな設定の視覚的な結果を調べることができるインタラクティブなデモです。

{{"demo": "pages/components/lists/InteractiveList.js", "bg": true}}

## 選択されたListItem

{{"demo": "pages/components/lists/SelectedListItem.js", "bg": true}}

## Listの項目の整列

項目内に3行以上を表示するときは、項目の配置を変更する必要があります。`alignItems` プロパティを "flex-start" に設定してください。

{{"demo": "pages/components/lists/AlignItemsList.js", "bg": true}}

## List Controls

### Checkbox

Checkboxは、主要なアクションまたは補助的なアクションのどちらかになります。

チェックボックスは、リストアイテムのプライマリアクションおよび状態インジケータです。 チェックボックスは、リストアイテムのプライマリアクションおよび状態インジケータです。 The comment button is a secondary action and a separate target.

{{"demo": "pages/components/lists/CheckboxList.js", "bg": true}}

Checkboxは、Listの項目と異なるターゲットに対する補助的なアクションです。

{{"demo": "pages/components/lists/CheckboxListSecondary.js", "bg": true}}

### Switch

Switchは補助的なアクションであり異なるターゲットです。

{{"demo": "pages/components/lists/SwitchListSecondary.js", "bg": true}}

## Sticky subheader

スクロールする上で、サブヘッダーは次のサブヘッダーによって画面から押し出されるまで画面の上部に固定されたままになります。 この機能はCSSのSticky positioningに依存しています。 この機能はCSSのSticky positioningに依存しています。 この機能はCSSのSticky positioningに依存しています。 Unfortunately it's [not implemented](https://caniuse.com/#search=sticky) by all the supported browsers. (⚠️ no IE 11 support)

{{"demo": "pages/components/lists/PinnedSubheaderList.js", "bg": true}}

## ピン留めリスト項目

The `inset` prop enables a list item that does not have a leading icon or avatar to align correctly with items that do.

{{"demo": "pages/components/lists/InsetList.js", "bg": true}}

## Gutterless リスト

When rendering a list within a component that defines its own gutters, `ListItem` gutters can be disabled with `disableGutters`.

{{"demo": "pages/components/lists/GutterlessList.js", "bg": true}}

## Virtualized List

次の例では、 `リスト` コンポーネントで [react-window](https://github.com/bvaughn/react-window) を使用する方法を示します。 これは200行をレンダリングし、より多くを簡単に処理できます。 仮想化はパフォーマンスの問題に役立ちます。

{{"demo": "pages/components/lists/VirtualizedList.js", "bg": true}}

The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged. このライブラリがあなたのユースケースをカバーしていない場合は、 [react-virtualized](https://github.com/bvaughn/react-virtualized)、次に [react-virtuoso](https://github.com/petyosi/react-virtuoso)ような代替を使用することを検討する必要があります。 このライブラリがあなたのユースケースをカバーしていない場合は、 [react-virtualized](https://github.com/bvaughn/react-virtualized)、次に [react-virtuoso](https://github.com/petyosi/react-virtuoso)ような代替を使用することを検討する必要があります。 このライブラリがあなたのユースケースをカバーしていない場合は、 [react-virtualized](https://github.com/bvaughn/react-virtualized)、次に [react-virtuoso](https://github.com/petyosi/react-virtuoso)ような代替を使用することを検討する必要があります。 このライブラリがあなたのユースケースをカバーしていない場合は、 [react-virtualized](https://github.com/bvaughn/react-virtualized)、次に [react-virtuoso](https://github.com/petyosi/react-virtuoso)ような代替を使用することを検討する必要があります。 The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged.

## Customized List

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/lists/CustomizedList.js"}}

## カスタマイズ

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/styles/list-item) を確認すると良いでしょう。
