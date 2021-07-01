---
title: React Backdrop（背景暗化）组件
components: Backdrop, BackdropUnstyled
githubLabel: '组件：背景暗化'
---

# Backdrop

<p class="description">背景暗化组件用于提供针对特定元素或这个元素一部分的强调。</p>

The backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs, and more. 在最简单的情况下，背景暗化组件将在您的应用程序上添加一个暗淡的图层。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 示例

{{"demo": "pages/components/backdrop/SimpleBackdrop.js"}}

## Unstyled

The backdrop also comes with the unstyled package. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import Backdrop from '@material-ui/unstyled/Backdrop';
```
