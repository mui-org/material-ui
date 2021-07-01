---
title: React Trap Focus（陷阱焦点）组件
components: Unstable_TrapFocus
githubLabel: 'component: TrapFocus'
---

# Trap Focus 陷阱焦点

<p class="description">在 DOM 节点内捕获焦点。</p>

陷阱焦点是一个为其子节点管理焦点的组件。 这在实现遮罩层时很有用，比如模态对话框，它不应该允许在该组件打开时转移焦点。

当 `open={true}` 的陷阱被启用时，按下 <kbd class="key">Tab</kbd> 或 <kbd><kbd class="key">Shift</kbd>+<kbd class="key">Tab</kbd></kbd> 将在组件的内部可聚焦元素内旋转聚焦。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

> 该组件处于试验阶段，是不稳定的。

## 示例

{{"demo": "pages/components/trap-focus/BasicTrapFocus.js"}}

## Unstyled

- 📦 [2.0kB 已压缩的包](https://bundlephobia.com/result?p=@material-ui/unstyled@next)

As the component does not have any styles, it also comes with the unstyled package.

```js
import TrapFocus from '@material-ui/unstyled/Unstable_TrapFocus';
```

## 禁用强制对焦

Clicks within the focus trap behave normally, but clicks outside the focus trap are blocked.

你可以使用 `disableEnforceFocus` 属性来禁用此行为。

{{"demo": "pages/components/trap-focus/DisableEnforceFocus.js"}}

## 延迟激活

默认情况下，组件在打开后就会立刻将其焦点移到其子节点：`open={true}`。

你可以使用 `disableAutoFocus` 属性来禁止这种行为，并使其变成惰性加载。 当禁用自动聚焦时，就像下面的演示一样，组件只有在聚焦后才会捕捉焦点。

{{"demo": "pages/components/trap-focus/LazyTrapFocus.js"}}

## Portal

The following demo uses the [`Portal`](/components/portal/) component to render a subset of the trap focus children into a new "subtree" outside of the current DOM hierarchy; so that they no longer form part of the focus loop.

{{"demo": "pages/components/trap-focus/PortalTrapFocus.js"}}
