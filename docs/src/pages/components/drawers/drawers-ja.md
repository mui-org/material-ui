---
title: React Drawer component
components: Drawer, SwipeableDrawer
githubLabel: 'component: Drawer'
materialDesign: https://material.io/components/navigation-drawer
---

# Drawer

<p class="description">ナビゲーションドロワー(Drawer) を使用すると、App内の目的地にアクセスできます。 サイドシートは、画面の左端または右端にアンカーされた補足コンテンツを含むサーフェスです。</p>

ナビゲーション・ドロワー(または「サイドバー」)は、目的地へのアクセスとアカウントの切り替えなどのアプリケーション機能を提供します。 これらは、画面上で永続的に表示することも、ナビゲーション・メニュー・アイコンで制御することもできます。

[サイドシート](https://material.io/design/components/sheets-side.html) は、主にタブレットやデスクトップで使用される補助サーフェスです。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Temporary drawer

一時的なnavigation drawersは、開閉することができます。 デフォルトでは閉じていますが、セクションが選択されるまで、ドロワーは一時的に他のすべてのコンテンツの上に開きます。

ドロワーをキャンセルするには、オーバーレイをクリックするか、Escキーを押します。 アイテムが選択されると、`open`プロパティを制御して閉じます。

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

### Swipeable

`SwipeableDrawer` コンポーネントを使用すると、引き出しをスワイプ可能にできます。

このコンポーネントには、2 kBの圧縮ペイロードオーバーヘッドがあります。 一部のローエンドモバイルデバイスは、60FPSで指の動きを追うことができません。 `disableBackdropTransition` プロパティを使用すると便利です。

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

このドキュメントのWebサイトでは、コンポーネントの操作性を最適化するために、次のプロパティが使用されています。

- iOSはハイエンドデバイスでホストされています。 背景トランジションはフレームが落ちることなしに有効にできます。 性能は十分良いでしょう。
- iOSには、ディスカバリー機能を妨害する「スワイプして戻る」機能があるため、ディスカバリーを無効にする必要があります。

```jsx
const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />;
```

### スワイプ可能なエッジ

`SwipeableDrawer` を閉じたときにエッジが表示されるように設定することができます。

デスクトップでは、「OPEN」ボタンでドロワーを切り替えることができます。 モバイルでは、CodeSandbox(編集アイコン)でデモを開き、スワイプできます。

{{"demo": "pages/components/drawers/SwipeableEdgeDrawer.js", "iframe": true, "height": 400, "maxWidth": 300}}

### マウントしたままにする

一時的な引き出しがアンマウントされないようにするには、 `ModalProps` のプロパティを次のように指定します。

```jsx
<Drawer
  variant="temporary"
  ModalProps={{
    keepMounted: true,
  }}
/>
```

詳細については、 [Modal performance section](/components/modal/#performance) を参照してください。

## レスポンシブなドロワー

You can use the `temporary` variant to display a drawer for small screens and `permanent` for a drawer for wider screens.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Persistent（永続的）ドロワー

永続的なナビゲーションdrawersは、開閉を切り替えることができます。 この drawerは、コンテンツと同じ表面の高さにあります。 デフォルトでは閉じられており、メニューアイコンを選択すると開き、ユーザーが閉じるまで開いたままになります。 ドロワーの状態は、アクションからアクションへ、セッションからセッションへと記憶されます。

ページグリッドの外側にあるdrawerを開くと、他のコンテンツのサイズが強制的に変更され、小さい方のビューポートに合わせて調整されます。

永続的なナビゲーションdrawersは、モバイルよりも大きいすべてのサイズに適しています。 ナビゲーションに上矢印を使用する必要がある複数レベルの階層を持つAppにはお勧めしません。

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini variant drawer (ミニバリアントドロワー)

このバリエーションでは、固定ナビゲーションドロワーの幅が変更されます。 静止状態はコンテンツと同じ高さのミニドロワーで、アプリバーでクリップされます。 展開すると、標準の永続的なナビゲーション領域として表示されます。

ミニバリアントは、コンテンツと共にクイック選択アクセスが必要なアプリのセクションに推奨されます。

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Permanent drawer　(固定ドロワー)

固定ナビゲーションdrawersは常に表示され、コンテンツまたは背景と同じ高さの左端に固定されます。 それらを閉じることはできません。

固定ドロワーは、**デスクトップ**で推奨されるデフォルトです。

### Full-height navigation（フルハイトナビゲーション）

アプリケーションは、左から右への階層を使用する情報消費に重点を置いていました。

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### アプリケーションバーの下にクリップされている

画面全体のバランスを必要とする生産性を重視したアプリ。

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}
