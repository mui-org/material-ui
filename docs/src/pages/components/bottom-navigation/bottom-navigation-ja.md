---
title: Bottom Navigation React component
components: BottomNavigation, BottomNavigationAction
githubLabel: 'component: BottomNavigation'
materialDesign: https://material.io/components/bottom-navigation
---

# ボトムナビゲーション

<p class="description">ボトムナビゲーションを使用すると、アプリ内の主要な目的地間を移動できます。</p>

ボトムナビゲーションバーは、画面下部に3〜5つの目的地を表示します。 各目的地は、アイコンとオプションのテキストラベルで表されます。 ボトムナビゲーションアイコンをタップすると、そのアイコンに関連付けられている最上位のナビゲーション先に移動します。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## ボトムナビゲーション

**3 **アクションしかない場合は、アイコンとテキストラベルの両方を常に表示します。

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## ラベルなしのボトムナビゲーション

**4** または **5** アクションがある場合は、非アクティブビューをアイコンとしてのみ表示します。

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}

## 固定位置

このデモでは、画面上のコンテンツの量に関係なく、下部ナビゲーションを下部に固定します。

{{"demo": "pages/components/bottom-navigation/FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}

## サードパーティ製ルーティングライブラリ

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `BottomNavigationAction` component provides the `component` prop to handle this use case. Here is a [more detailed guide](/guides/routing).
