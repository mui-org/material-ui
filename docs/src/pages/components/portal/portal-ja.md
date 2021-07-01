---
title: React Portalコンポーネント
components: Portal
githubLabel: 'component: Portal'
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current DOM hierarchy.</p>

ポータルコンポーネントの子は、指定された `container` 追加されます。 コンポーネントは、 [`Modal`](/components/modal/) および [`Popper`](/components/popper/) コンポーネントによって内部的に使用されます。

[The palette](/system/palette/) style関数。

## 例

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React は、サーバー上の [`createPortal（）`](https://reactjs.org/docs/portals.html) APIを[サポートしません。](https://github.com/facebook/react/issues/13097) In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: 子要素を見るには、クライアント側のhydrationを待つ必要があります。

## Unstyled

- 📦 [970 B gzipped](https://bundlephobia.com/result?p=@material-ui/unstyled@next)

As the component does not have any styles, it also comes with the unstyled package.

```js
import Portal from '@material-ui/unstyled/Portal';
```
