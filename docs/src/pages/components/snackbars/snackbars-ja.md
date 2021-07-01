---
title: React Snackbar component
components: Snackbar, SnackbarContent
githubLabel: 'component: Snackbar'
materialDesign: https://material.io/components/snackbars
waiAria: 'https://www.w3.org/TR/wai-aria-1.1/#alert'
---

# Snackbar

<p class="description">Snackbars provide brief messages about app processes. The component is also known as a toast.</p>

[スナックバー](https://material.io/design/components/snackbars.html) は、アプリが実行したプロセスまたは実行するプロセスをユーザーに通知します。 一時的に画面の下部に表示されます。 They shouldn't interrupt the user experience, and they don't require user input to disappear.

スナックバーには、実行された操作に直接関連する1行のテキストが含まれます。 テキストアクションは含まれますが、アイコンは含まれません。 それら使うことで通知を表示できます。 テキストアクションは含まれますが、アイコンは含まれません。 それら使うことで通知を表示できます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

#### 頻度

一度に表示できるsnackbarは1つだけです。

## シンプルなスナックバー

Google Keepのスナックバーの動作を再現することを目的とした基本的なスナックバー。

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## カスタマイズされたスナックバー

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## 配置されたスナックバー

In wide layouts, snackbars can be left-aligned or center-aligned if they are consistently placed on the same spot at the bottom of the screen, however there may be circumstances where the placement of the snackbar needs to be more flexible. You can control the position of the snackbar by specifying the `anchorOrigin` prop.

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## メッセージの長さ

メッセージの長さが異なるスナックバー。

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## Transitions

### 連続スナックバー

複数のsnackbarの更新が必要な場合は、一度に1つずつ表示されます。

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### スナックバーとフローティングアクションボタン（FAB）

スナックバーはFAB（モバイル）の上に表示されます。

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

### トランジションの変更

[Grow](/components/transitions/#grow) はデフォルトのトランジションですが、別のトランジションを使用できます。

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### スライド方向の制御

[スライド](/components/transitions/#slide) トランジションの方向を変更できます。

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

### notistack

![Stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/notistack.svg)

This example demonstrates how to use [notistack](https://github.com/iamhosseindhv/notistack). notistack has an **imperative API** that makes it easy to display snackbars, without having to handle their open/close state. It also enables you to **stack** them on top of one another (although this is discouraged by the Material Design guidelines).

TODO: Add example once notistack is compatible with v5 or replace with [#1824](https://github.com/mui-org/material-ui/issues/1824).

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-1.1/#alert)

- By default, the snackbar won't auto-hide. However, if you decide to use the `autoHideDuration` prop, it's recommended to give the user [sufficient time](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) to respond.
