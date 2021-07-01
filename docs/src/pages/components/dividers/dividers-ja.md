---
title: React Divider component
components: Divider
githubLabel: 'component: Divider'
materialDesign: https://material.io/components/dividers
---

# Divider

<p class="description">Divider(区切り線) は、リストおよびレイアウトのコンテンツをグループ化する細い線です。</p>

Dividers は、内容を明確なグループに分けます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## List Dividers

Dividerはデフォルトで `<hr>` としてレンダリングされることに注意してください。 このDOM要素のレンダリングを節約するには、 `ListItem` コンポーネントの `divider` プロパティを使用します。

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5仕様

リストでは、HTML5の仕様に合うように、 `Divider` が `<li>` としてレンダリングされていることを確認すべきです。 次の例は、これを実現する2つの方法を示しています。

## Inset Dividers

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Subheader Dividers

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Middle Dividers

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

内容があるDividerを表示することもできます。

{{"demo": "pages/components/dividers/DividerText.js"}}

## Divider (区切り線)

`orientation` プロパティを使用してDividerを垂直に表示することもできます。

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}

> flex コンテナに対応するために `flexItem` プロパティを使用することに注意してください。

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "pages/components/dividers/VerticalDividerMiddle.js", "bg": true}}

### テキスト付きの垂直Divider

垂直Dividerを内容付きで表示することもできます。

{{"demo": "pages/components/dividers/VerticalDividerText.js"}}
