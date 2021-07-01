---
title: React Breadcrumbs コンポーネント
components: Breadcrumbs, Link, Typography
githubLabel: 'component: Breadcrumbs'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#breadcrumb'
---

# Breadcrumbs (パンくずリスト)

<p class="description">Breadcrumbsを使用すると、値の範囲から選択できます。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## シンプルな breadcurmbs

{{"demo": "pages/components/breadcrumbs/BasicBreadcrumbs.js"}}

## 最後のbreadcurmbsをアクティブにする

最後のbreadcrumbをインタラクティブな状態にします。

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## カスタムセパレーター (Custom separator）

In the following examples, we are using two string separators and an SVG icon.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## アイコン付きBreadcrumbs

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## 折りたたみBreadcrumbs

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## カスタマイズされた breadcrumbs

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## react-routerとの統合

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

`Breadcrumbs`コンポーネントには、必ず`aria-label`を追加してください。

このコンポーネントのアクセシビリティは、

- リンクのセットは、順序付けられたリスト(`<ol>` element) を使用して構造化されます。
- リンク間のビジュアルセパレータがスクリーンリーダーから通知されないようにするには、 `aria-hidden`を使用します。
- `aria-label` というラベルが付いたnav要素は、その構造をBreadcrumbs経路として識別し、それをナビゲーション用の目印にして、見つけやすくします。
