---
title: Composant React Popper
components: Popper
githubLabel: 'component: Popper'
---

# Popper

<p class="description">A Popper can be used to display some content on top of another. It's an alternative to react-popper.</p>

Some important features of the `Popper` component:

- 🕷 Popper s'appuie sur la bibliothèque tierce ([Popper.js](https://github.com/popperjs/popper-core)) pour un positionnement parfait.
- 💄 It's an alternative API to react-popper. It aims for simplicity.
- 📦 [8 kB gzippé](/size-snapshot).
- The children is [`Portal`](/components/portal/) to the body of the document to avoid rendering problems. You can disable this behavior with `disablePortal`.
- The scroll isn't blocked like with the [`Popover`](/components/popover/) component. The placement of the popper updates with the available area in the viewport.
- Clicking away does not hide the `Popper` component. If you need this behavior, you can use [`ClickAwayListener`](/components/click-away-listener/) - see the example in the [menu documentation section](/components/menus/#menulist-composition).
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Simple Popper

{{"demo": "pages/components/popper/SimplePopper.js"}}

## Les transitions

The open/close state of the popper can be animated with a render prop child and a transition component. Ce composant doit respecter les conditions suivantes :

- Be a direct child descendent of the popper.
- Appeler la propriété de callback `onEnter` lorsque la transition d'entrée démarre.
- Appeler la propriété de callback `onExited` lorsque la transition de sortie est terminée. Appeler la propriété de callback `onExited` lorsque la transition de sortie est terminée.

Popper has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/popper/TransitionsPopper.js"}}

Alternativement, vous pouvez utiliser [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/popper/SpringPopper.js"}}

## Popper positionné

{{"demo": "pages/components/popper/PositionedPopper.js"}}

## Scroll playground

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideToolbar": true, "bg": true}}

## Élément virtuel

La valeur de la propriété `anchorEl` peut être une référence à un élément DOM faux. Vous devez créer un objet formé comme le [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/).

Highlight part of the text to see the popper:

{{"demo": "pages/components/popper/VirtualElementPopper.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des projects suivants:

### Assistant PopupState

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popper state for you in most cases.

{{"demo": "pages/components/popper/PopperPopupState.js"}}
