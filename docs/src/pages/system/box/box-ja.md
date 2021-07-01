---
title: React Box コンポーネント
githubLabel: 'component: Box'
---

# Box

<p class="description">Boxコンポーネントは、CSSユーティリティーのほとんどのニーズに対応するラッパーコンポーネントとして機能します</p>

Boxコンポーネントは、`@material-ui/system`で公開される[すべてのスタイル関数](/system/basics/#all-inclusive) をパッケージ化します。

[The palette](/system/palette/) style関数。

## 例

[palette](/system/palette/) style関数。

## The `sx` prop

All system properties are available via the [`sx` prop](/system/basics/#the-sx-prop). In addition, the `sx` prop allows you to specify any other CSS rules you may need. 使用方法の例を次に示します。

{{"demo": "pages/system/box/BoxSx.js", "defaultCodeOpen": true }}

## Material-UI componentsのオーバーライド

The Box componentは、コンポーネントをラップします。 新しいDOM要素を作成します。 この要素はデフォルトで`<div>`であり、`component` プロパティを使用して変更できます。 代わりに `<span>` を使用すると

{{"demo": "pages/system/box/BoxComponent.js", "defaultCodeOpen": true }}

これは、新しいDOM要素に分離する変更の場合に非常に有効です。 たとえば、この方法で余白を変更できます。

ただし、場合によっては基礎となるDOM要素をターゲットにする必要があります。 As an example, you may want to change the border of the Button. しかしButtonコンポーネントは独自のスタイルを定義しています。 CSS継承は役に立ちません。 To workaround the problem, you can use the [`sx`](/system/basics/#the-sx-prop) prop directly on the child if it is a Material-UI component.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>Save</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Save</Button>
```

For non-Material-UI components, use the `component` prop.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <button>Save</button>
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
```

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Name                                     | Type                                                                                                                          | Default                                 | Description                                   |
|:---------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:--------------------------------------------- |
| <span class="prop-name">children</span>  | <span class="prop-type">node<br></span>                                                                                 |                                         | ボックスレンダー関数またはノード。                             |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | ルートノードに使用されるコンポーネント。 DOM要素またはコンポーネントを使用する文字列。 |
| <span class="prop-name">sx</span>        | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | すべてのシステムプロパティと有効な CSS プロパティを受け入れます。           |

## System props

As a CSS utility component, the `Box` also supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Box mt={2}>
```
