---
title: Composant React Portal
components: Portal
githubLabel: 'component: Portal'
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current DOM hierarchy.</p>

Les enfants du composant Portal seront ajoutés au `container` fournit. Ce composant est utilisé en interne par les composants [`Modal`](/components/modal/) et [`Popper`](/components/popper/).

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Exemple

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. Il faut attendre l'hydratation côté client pour voir les enfants.

## Unstyled

- 📦 [1.3 kB gzippé](/size-snapshot)

As the component does not have any styles, it also comes with the unstyled package.

```js
import Portal from '@material-ui/unstyled/Portal';
```
