---
title: Компонент React Portal
components: Portal
githubLabel: 'component: Portal'
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current DOM hierarchy.</p>

Дочерние элементы портала будут добавлены внутрь элемента, указанного в свойстве `container`. Портал используется внутри компонентов [`Modal`](/components/modal/) и [`Popper`](/components/popper/).

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Пример

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. You have to wait for the client-side hydration to see the children.

## Unstyled

- 📦 [970 B gzipped](https://bundlephobia.com/result?p=@material-ui/unstyled@next)

As the component does not have any styles, it also comes with the unstyled package.

```js
import Portal from '@material-ui/unstyled/Portal';
```
