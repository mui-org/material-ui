---
productId: material-ui
title: React Modal component
components: Modal
githubLabel: 'scope: modal'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
githubSource: packages/mui-material/src/Modal
---

# Modal

<p class="description">The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.</p>

The component renders its `children` node in front of a backdrop component.
The `Modal` offers important features:

- 💄 Manages modal stacking when one-at-a-time just isn't enough.
- 🔐 Creates a backdrop, for disabling interaction below the modal.
- 🔐 It disables scrolling of the page content while open.
- ♿️ It properly manages focus; moving to the modal content,
  and keeping it there until the modal is closed.
- ♿️ Adds the appropriate ARIA roles automatically.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

:::info
The term "modal" is sometimes used to mean "dialog", but this is a misnomer.
A modal window describes parts of a UI.
An element is considered modal if [it blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window).
:::

If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/react-dialog/) component rather than directly using Modal.
Modal is a lower-level construct that is leveraged by the following components:

- [Dialog](/material-ui/react-dialog/)
- [Drawer](/material-ui/react-drawer/)
- [Menu](/material-ui/react-menu/)
- [Popover](/material-ui/react-popover/)

## Basic modal

{{"component": "file://./demos/basic/index.ts"}}

Notice that you can disable the outline (often blue or gold) with the `outline: 0` CSS property.

## Nested modal

Modals can be nested, for example a select within a dialog, but stacking of more than two modals, or any two modals with a backdrop is discouraged.

If you need to nest modals, use the `hideBackdrop` prop on nested Modals to avoid stacking multiple backdrops, which can obscure the active modal or affect interactions.

{{"component": "file://./demos/nested/index.ts"}}

## Transitions

The open/close state of the modal can be animated with a transition component.
This component should respect the following conditions:

- Be a direct child descendent of the modal.
- Have an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed.
  These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"component": "file://./demos/transitions/index.ts"}}

Alternatively, you can use [react-spring](https://github.com/pmndrs/react-spring).

{{"component": "file://./demos/spring/index.ts"}}

## Performance

The content of modal is unmounted when closed.
If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness
it might be a good idea to change this default behavior by enabling the `keepMounted` prop:

```jsx
<Modal keepMounted />
```

{{"component": "file://./demos/keep-mounted/index.ts", "collapseToEmpty": true}}

As with any performance optimization, this is not a silver bullet.
Be sure to identify bottlenecks first, and then try out these optimization strategies.

## Server-side modal

React [doesn't support](https://github.com/react/react/issues/13097) the [`createPortal()`](https://react.dev/reference/react-dom/createPortal) API on the server.
In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"component": "file://./demos/server/index.ts"}}

## Limitations

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes. However, it might create issues.
In the event the users need to interact with another part of the page, for example with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`.
  Additionally, you may give a description of your modal with the `aria-describedby="id..."` prop on the `Modal`.

  ```jsx
  <Modal aria-labelledby="modal-title" aria-describedby="modal-description">
    <h2 id="modal-title">My Title</h2>
    <p id="modal-description">My Description</p>
  </Modal>
  ```

- The [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/) can help you set the initial focus on the most relevant element, based on your modal content.
- Keep in mind that a "modal window" overlays on either the primary window or another modal window. Windows under a modal are **inert**. That is, users cannot interact with content outside an active modal window. This might create [conflicting behaviors](#focus-trap).
