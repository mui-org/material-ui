---
title: React Modal component
components: Modal, ModalUnstyled
githubLabel: 'component: Modal'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal'
---

# Modal

<p class="description">The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.</p>

The component renders its `children` node in front of a backdrop component. The `Modal` offers important features:

- 💄 Manages modal stacking when one-at-a-time just isn't enough.
- 🔐 Creates a backdrop, for disabling interaction below the modal.
- 🔐 It disables scrolling of the page content while open.
- ♿️ It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
- ♿️ Adds the appropriate ARIA roles automatically.

[La función de estilo de la paleta](/system/palette/).

> **Terminology note**. The term "modal" is sometimes used to mean "dialog", but this is a misnomer. An element is considered modal if [it blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window). A modal window describes parts of a UI.

If you are creating a modal dialog, you probably want to use the [Dialog](/components/dialogs/) component rather than directly using Modal. Modal is a lower-level construct that is leveraged by the following components:

- [Dialog](/components/dialogs/)
- [Cajón](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Basic modal

{{"demo": "pages/components/modal/BasicModal.js"}}

Notice that you can disable the outline (often blue or gold) with the `outline: 0` CSS property.

## Unstyled

- 📦 [4.7 kB comprimido](https://bundlephobia.com/result?p=@material-ui/unstyled@next)

The modal also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import ModalUnstyled from '@material-ui/unstyled/ModalUnstyled';
```

{{"demo": "pages/components/modal/ModalUnstyled.js"}}

## Nested modal

Modals can be nested, for example a select within a dialog, but stacking of more than two modals, or any two modals with a backdrop is discouraged.

{{"demo": "pages/components/modal/NestedModal.js"}}

## Transiciones

The open/close state of the modal can be animated with a transition component. Este componente debe respetar las siguientes condiciones:

- Ser un hijo directo del modal.
- Have an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Como alternativa, puedes usar [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/modal/SpringModal.js"}}

## Rendimiento

The content of modal is unmounted when closed. If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to change this default behavior by enabling the `keepMounted` prop:

```jsx
<Modal keepMounted />
```

{{"demo": "pages/components/modal/KeepMountedModal.js", "defaultCodeOpen": false}}

As with any performance optimization, this is not a silver bullet. Be sure to identify bottlenecks first, and then try out these optimization strategies.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}

## Limitaciones

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes. However, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`. Additionally, you may give a description of your modal with the `aria-describedby="id..."` prop on the `Modal`.

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
- Windows under a modal are **inert**. Keep in mind that a "modal window" overlays on either the primary window or another modal window. Keep in mind that a "modal window" overlays on either the primary window or another modal window. This might create [conflicting behaviors](#focus-trap).
