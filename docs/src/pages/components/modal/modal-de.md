---
title: React Modal component
components: Modal, ModalUnstyled
githubLabel: 'component: Modal'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal'
---

# Modal

<p class="description">Die modale Komponente bietet eine solide Grundlage für das Erstellen von Dialogen, Popovers, Leuchtkästen oder anderen Elementen.</p>

Die Komponente rendered seine `Kinder` - Knoten vor einer Hintergrund - Komponente. The `Modal` offers important features:

- 💄 Verwaltet modales Stacking, wenn eins zu einem Zeitpunkt nicht ausreicht.
- 🔐 Erstellt einen Hintergrund zum Deaktivieren der Interaktion unter dem Modal.
- 🔐 Es deaktiviert das Blättern des Seiteninhalts, während es geöffnet ist.
- The [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.
- ♿️ Fügt die entsprechenden ARIA-Rollen automatisch hinzu.

Die Style-Funktion der [Palette](/system/palette/).

> **Terminologieanmerkung**. Der Begriff "modal" bedeutet manchmal "Dialog", aber das ist eine Fehlbezeichnung. Ein Element wird als modal betrachtet, wenn es [die Interaktion mit dem Rest der Anwendung blockiert](https://en.wikipedia.org/wiki/Modal_window). A modal window describes parts of a UI.

Wenn Sie ein modales Dialogfeld erstellen, möchten Sie wahrscheinlich die [Dialog-](/components/dialogs/) Komponente verwenden, anstatt direkt ein Modal zu verwenden. Modal ist ein untergeordnetes Konstrukt, das von den folgenden Komponenten genutzt wird:

- [Dialog](/components/dialogs/)
- [Seitliches Menü (Drawer)](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Basic modal

{{"demo": "pages/components/modal/BasicModal.js"}}

Notice that you can disable the outline (often blue or gold) with the `outline: 0` CSS property.

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

## Übergänge

The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:

- Be a direct child descendent of the modal.
- Have an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Alternativ können Sie [react-spring](https://github.com/react-spring/react-spring) verwenden.

{{"demo": "pages/components/modal/SpringModal.js"}}

## Performance

The content of modal is unmounted when closed. If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to change this default behavior by enabling the `keepMounted` prop:

```jsx
<Modal keepMounted />
```

{{"demo": "pages/components/modal/KeepMountedModal.js", "defaultCodeOpen": false}}

As with any performance optimization, this is not a silver bullet. Be sure to identify bottlenecks first, and then try out these optimization strategies.

## Server-seitiges Modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}

## Einschränkungen

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes. However, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- Achten Sie darauf, eine Referenzierung des modalen Titels durch `aria-labelledby = "id..."` zu dem `Modal` hinzufügen. Zusätzlich können Sie eine Beschreibung Ihres Modals mit der `aria-describedby="id..."` Prop auf dem `Modal` angeben.

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
