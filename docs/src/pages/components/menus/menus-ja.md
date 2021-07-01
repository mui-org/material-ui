---
title: Reactメニューコンポーネント
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
githubLabel: 'component: Menu'
materialDesign: https://material.io/components/menus
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Menu

<p class="description">メニューには、一時的なサーフェスの選択肢のリストが表示されます。</p>

メニューコンポーネントは、画面に一時的に表示されるリストのコンポーネントです。 ユーザーがボタンやその他のコントロールを操作すると表示されます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本のメニューコンポーネント

シンプルなメニューはデフォルトでアンカー要素の上に表示されます。 (プロパティによって設定を[変える](#menu-positioning)ことができます。) 画面の端に表示される場合、すべてのメニュー項目が表示されるよう、デフォルトのメニューは垂直方向に表示されます。

オプションを選択したら、そのオプションをすぐにコミットしてメニューを閉じるのが理想的です。

**曖昧さ回避**: メニューとは違い、ダイアログでは、リスト項目で使用可能なオプションに関連する追加の詳細を表示したり、主要なタスクに関連するナビゲーションまたは直交アクションを提供することができます。 同じコンテンツを表示することはできますが、シンプルなダイアログよりもシンプルなメニューが好まれます。シンプルなメニューはユーザーの現在のコンテキストにとって破壊的ではないためです。

{{"demo": "pages/components/menus/BasicMenu.js"}}

## 選択されているメニュー

If used for item selection, when opened, simple menus places the initial focus on the selected menu item. 現在選択されているメニュー項目は、 `selected` プロパティ（[ListItem](/api/list-item/)）を使用して設定されます。 To use a selected menu item without impacting the initial focus, set the `variant` prop to "menu".

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## 位置を決めたメニュー

`Menu`コンポーネントは自信を配置するのに`Popover`コンポーネントを使用するため、配置のために同じ[配置プロパティ](/components/popover/#anchor-playground)を使うことができます。 たとえば、アンカーの下にメニューを表示できます。

{{"demo": "pages/components/menus/PositionedMenu.js"}}

## メニューリストの構成

`Menu` コンポーネントは内部的に `Popover` コンポーネントを使用します。 しかし、別の配置方法を使ったり、スクロールをブロックしないようにしたいかもしれません。 そのようなニーズに応えるために、自身で構成できる `MenuList` コンポーネントを公開しています。次の例では`Popper`を使用しています。

`MenuList` コンポーネントの主な役割は、フォーカスを処理することです。

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## カスタムメニュー

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

`MenuItem` はいくつかの追加のスタイルを備えた `ListItem` のラッパーです。 `MenuItem` コンポーネントで同じリスト構成機能を使用できます:

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/styles/menu) を確認すると良いでしょう。

## 高さの最大値を決めたメニュー

すべてのメニュー項目を表示しないようにメニューの高さを設定すると、メニューは内部でスクロールできるようになります。

{{"demo": "pages/components/menus/LongMenu.js"}}

## 制限事項

`text-overflow: ellipsis`がflexbox layoutで動作しなくなる[fexboxのバグ](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) があります。 `Typography` コンポーネントの `noWrap` を利用してこの問題を回避できます。

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## トランジションの変更

別のトランジションを使用します。

{{"demo": "pages/components/menus/FadeMenu.js"}}

## コンテキストメニュー

コンテキストメニューの例を次に示します。 (右クリックで開きます。)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

### PopupState helper

サードパーティ製のパッケージ [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state)があり、ほとんどの場合、メニューの状態を管理してくれます。

{{"demo": "pages/components/menus/MenuPopupState.js"}}
