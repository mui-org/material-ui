---
title: 背景 React Component
components: Backdrop, BackdropUnstyled
githubLabel: 'component: Backdrop'
---

# Backdrop

<p class="description">背景コンポーネントは、特定の要素やその一部に重点を置くために使用されます。</p>

The backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs, and more. 最も簡単な形式では、backdrop コンポーネントはアプリケーションにdimmed レイヤーを追加します。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 例

{{"demo": "pages/components/backdrop/SimpleBackdrop.js"}}

## Unstyled

The backdrop also comes with the unstyled package. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import Backdrop from '@material-ui/unstyled/Backdrop';
```
