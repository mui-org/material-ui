---
title: Composant React Modal
components: Modal, ModalUnstyled
githubLabel: 'component: Modal'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal'
---

# Modal

<p class="description">Le composant modal fournit une base solide pour la création de boîtes de dialogue, de popovers, de lightboxes ou autres.</p>

Le composant affiche ses nœuds `children` devant un composant d'arrière-plan. La `Modal` offre d'importantes fonctionnalités :

- 💄 Gère la superposition de modales.
- 🔐 Crée un backdrop, pour désactiver les interactions sous la modale.
- 🔐 Désactive le scroll de la page quand elle est ouverte.
- ♿️ Gère proprement le focus ; assure l'accessibilité au contenu de la modale jusqu'à sa fermeture.
- ♿ Ajoute automatiquement les rôles ARIA appropriés.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

> **Note de terminologie**. Le terme "modal" est parfois utilisé pour signifier "dialogue", mais c'est un terme impropre. Un élément est considéré modal si [il bloque l'interaction avec le reste de l'application](https://en.wikipedia.org/wiki/Modal_window). A modal window describes parts of a UI.

Si vous créez une boîte de dialogue modale, vous voudrez probablement utiliser le composant [Dialog](/components/dialogs/) plutôt que d'utiliser directement Modal. Modal est un élément de construction de niveau faible exploitée par les composants suivants :

- [Dialog](/components/dialogs/)
- [Drawer (Tiroir)](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Modal simple

This demo stacks Modals, but it is strongly discouraged to do so in practice.

Notez que vous pouvez désactiver le contour (souvent bleu ou or) avec la propriété `outline : 0` CSS .

## Unstyled

- Être un enfant descendant direct du modal.

The modal also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import ModalUnstyled from '@material-ui/unstyled/ModalUnstyled';
```

{{"demo": "pages/components/modal/ModalUnstyled.js"}}

## Performances

Modal a un support intégré pour [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/NestedModal.js"}}

## Les transitions

L'état ouvert/fermé de la modale peut être animé avec un composant de transition. Ce composant doit respecter les conditions suivantes :

- Être un enfant descendant direct du modal.
- Avoir la propriété `in`. This corresponds to the open/close state.
- Appeler la propriété de callback `onEnter` lorsque la transition d'entrée démarre.
- Appeler la propriété de callback `onExited` lorsque la transition de sortie est terminée. Ces deux fonctions de callback permettent à la modale de retirer le contenu enfant lorsqu'elle est fermée et que la transition est terminée.

Modal a un support intégré pour [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Alternativement, vous pouvez utiliser [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/modal/SpringModal.js"}}

## Performances

Le contenu du modal est démonté lorsqu'il est fermé. If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to change this default behavior by enabling the `keepMounted` prop:

```jsx
<Modal keepMounted />
```

{{"demo": "pages/components/modal/KeepMountedModal.js", "defaultCodeOpen": false}}

Se n'est tout de même pas une solution miracle. Soyez sure de d'abord identifier les goulot d'étranglement et ensuite de considérer ses stratégies d'optimisation.

## Modal côté serveur

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}

## Limites

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes, however, it might create issues. However, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Accessibilité

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
- Windows under a modal are **inert**. Les fenêtres sous un modal sont **inertes**. Keep in mind that a "modal window" overlays on either the primary window or another modal window. This might create [conflicting behaviors](#focus-trap).
