---
title: React Fab component
components: Fab
githubLabel: 'component: Fab'
materialDesign: https://material.io/components/buttons-floating-action-button
---

# Floating action button

<p class="description">A floating action button (FAB) performs the primary, or most common, action on a screen.</p>

フローティング アクションボタンは、すべての画面コンテンツの全面に表示されます。通常は、中央にアイコンが付いた円の形状です。 FABには次の二つのタイプがあります: regular extended

画面の最も主要なアクションのための最も適切な方法である場合にのみ、FABを使用してください。 最も頻出なアクションであることを示すために、画面ごとに1つのみ配置することが推奨されます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本的なFAB

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size

By default, the size is `large`. Use the `size` prop for smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

{{"demo": "pages/components/floating-action-button/FloatingActionButtonExtendedSize.js"}}

## Animation

デフォルトでは、フローティングアクションボタンは、拡大する素材として画面上にアニメーション表示されます。

複数の横方向の画面（タブ付き画面など）にまたがるフローティングアクションボタンは、一時的に消えてから、アクションが変わると再表示されます。

これを実現するにはズームトランジションを使用できます。 終了アニメーションと入力アニメーションの両方が同時にトリガーされるため、新しいフローティングアクションボタンのアニメーションが開始される前に終了するように` enterDelay `を使用することに注意してください。

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
