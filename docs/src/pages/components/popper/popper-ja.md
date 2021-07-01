---
title: React Popperコンポーネント
components: Popper
githubLabel: 'component: Popper'
---

# Popper

<p class="description">Popperを使用すると、一部のコンテンツを別のコンテンツの上に表示できます。 これは、react-popperの代替です。</p>

`Popper` コンポーネントのいくつかの重要な機能：

- Popperは、サードパーティのライブラリ([Popper.js](https://github.com/popperjs/popper-core))を使います。
- これは、react-popperの代替API です。 シンプルさを目指しています。
- 📦 [gzip形式のファイル(8 kB)](/size-snapshot).
- レンダリングの問題を回避するため、子はドキュメントの本文に対して [`Portal`](/components/portal/)となります。 `disablePortal`この動作を無効にできます。 `disablePortal`この動作を無効にできます。 `disablePortal`この動作を無効にできます。 `disablePortal`この動作を無効にできます。 `disablePortal`この動作を無効にできます。 `disablePortal`この動作を無効にできます。
- スクロールは、 [`Popover`](/components/popover/)コンポーネントのようにブロックされません。 ポッパーの配置は、ビューポートの利用可能な領域で更新されます。
- クリックしても `Popper` コンポーネントは非表示になりません。 クリックしても `Popper` コンポーネントは非表示になりません。 この動作が必要な場合は、 [`ClickAwayListener`](/components/click-away-listener/) 使用することができます - [メニュードキュメンテーションセクション](/components/menus/#menulist-composition)例を参照してください。 クリックしても `Popper` コンポーネントは非表示になりません。 この動作が必要な場合は、 [`ClickAwayListener`](/components/click-away-listener/) 使用することができます - [メニュードキュメンテーションセクション](/components/menus/#menulist-composition)例を参照してください。 クリックしても `Popper` コンポーネントは非表示になりません。 この動作が必要な場合は、 [`ClickAwayListener`](/components/click-away-listener/) 使用することができます - [メニュードキュメンテーションセクション](/components/menus/#menulist-composition)例を参照してください。 クリックしても `Popper` コンポーネントは非表示になりません。 この動作が必要な場合は、 [`ClickAwayListener`](/components/click-away-listener/) 使用することができます - [メニュードキュメンテーションセクション](/components/menus/#menulist-composition)例を参照してください。 この動作が必要な場合は、 [`ClickAwayListener`](/components/click-away-listener/) 使用することができます - [メニュードキュメンテーションセクション](/components/menus/#menulist-composition)例を参照してください。
- `anchorEl` は、新しい `Popper.js` インスタンスを作成するための参照オブジェクトとして渡されます。

[The palette](/system/palette/) style関数。

## 基本のPopper

{{"demo": "pages/components/popper/SimplePopper.js"}}

## Transitions

The open/close state of the popper can be animated with a render prop child and a transition component. This component should respect the following conditions:

- Be a direct child descendent of the popper.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the popper to unmount the child content when closed and fully transitioned.

Popper has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/popper/TransitionsPopper.js"}}

Alternatively, you can use [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/popper/SpringPopper.js"}}

## 定位置に表示されるPopper

{{"demo": "pages/components/popper/PositionedPopper.js"}}

## Scroll playground

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideToolbar": true, "bg": true}}

## 仮想Element

`anchorEl` プロパティは、仮想のDOM要素を参照することができます。 [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/)のようなオブジェクトを作成する必要があります。

テキストの一部をハイライトして、ポップヒントを表示します。

{{"demo": "pages/components/popper/VirtualElementPopper.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

### PopupState helper

サードパーティ製のパッケージ [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) があり、ほとんどの場合、popperの状態を管理してくれます。

{{"demo": "pages/components/popper/PopperPopupState.js"}}
