---
title: React Modal component
components: Modal, ModalUnstyled
githubLabel: 'component: Modal'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal'
---

# Modal

<p class="description">モーダルコンポーネントは、ダイアログ、ポップオーバー、ライトボックスなどを作成するための強固な基盤を提供します。</p>

コンポーネントは、backdropコンポーネントの前にその `children`ノードをレンダリングします。 `Modal` には、次のような重要な機能があります。 `Modal` には、次のような重要な機能があります。 `Modal` には、次のような重要な機能があります。 `Modal` には、次のような重要な機能があります。 `Modal` には、次のような重要な機能があります。 `Modal` には、次のような重要な機能があります。

- 💄 一度に1つだけでは不十分な場合に、モーダルスタッキングを管理します。
- 🔐モーダルの下のインタラクションを無効にするためのバックドロップを作成します。
- 🔐open開いている間、ページコンテンツのスクロールを無効にします。
- ♿️フォーカスを適切に管理します。モーダルコンテンツに移動 して、モーダルが閉じられるまでそこに保持します。
- ♿️適切なARIAロールを自動的に追加します。

[The palette](/system/palette/) style関数。

> **用語の注記**。 「モーダル」という用語は「ダイアログ」を意味するために使用されることがありますが、これは誤った呼び名です。 A modal window describes parts of a UI. 要素が[アプリケーションの他の部分との対話をブロックする場合](https://en.wikipedia.org/wiki/Modal_window)、その要素はモーダルであると見なされます。

要素が[アプリケーションの他の部分との対話をブロックする場合](https://en.wikipedia.org/wiki/Modal_window)、その要素はモーダルであると見なされます。 モーダルは、次のコンポーネントによって活用される低レベルの構成要素です。

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Basic modal

{{"demo": "pages/components/modal/BasicModal.js"}}

`アウトライン：0` CSSプロパティでアウトライン（多くの場合、青または金）を無効にできることに注意してください。

## Unstyled

- 📦 [4.7 kB gzipped](https://bundlephobia.com/result?p=@material-ui/unstyled@next)

The modal also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import ModalUnstyled from '@material-ui/unstyled/ModalUnstyled';
```

{{"demo": "pages/components/modal/ModalUnstyled.js"}}

## Nested modal

Modals can be nested, for example a select within a dialog, but stacking of more than two modals, or any two modals with a backdrop is discouraged.

{{"demo": "pages/components/modal/NestedModal.js"}}

## Transitions

The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:

- Be a direct child descendent of the modal.
- `in`プロパティを持っています。 This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Alternatively, you can use [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/modal/SpringModal.js"}}

## パフォーマンス

モーダルの内容は閉じたときにアンマウントされます。 インタラクションの応答性を最適化しつつ、コンテンツを検索エンジンで使用できるようにする必要がある場合や、モーダル内にリッチなコンポーネントツリーをレンダリングする必要がある場合は、 `keepMount` プロパティを有効にしてデフォルトの動作を変更すると良いでしょう。

```jsx
<Modal keepMounted />
```

{{"demo": "pages/components/modal/KeepMountedModal.js", "defaultCodeOpen": false}}

As with any performance optimization, this is not a silver bullet. Be sure to identify bottlenecks first, and then try out these optimization strategies.

## Server-side modal

React は、サーバー上の [`createPortal（）`](https://reactjs.org/docs/portals.html) APIを[サポートしません。](https://github.com/facebook/react/issues/13097) In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}

## 制限事項

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes. However, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- モーダルタイトルを参照する `aria-labelledby = "id..."` `モーダル`に追加してください。 要素が[アプリケーションの他の部分との対話をブロックする場合](https://en.wikipedia.org/wiki/Modal_window)、その要素はモーダルであると見なされます。

  ```jsx
  <Modal
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    >
    <h2 id="modal-title">
      My Title
    </h2>
    <p id="modal-description">
      My Description
    </p>
    </Modal>
  ```

- The [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.
- Keep in mind that a "modal window" overlays on either the primary window or another modal window. モーダルの下のウィンドウは **inert** です。 That is, users cannot interact with content outside an active modal window. This might create [conflicting behaviors](#focus-trap).
