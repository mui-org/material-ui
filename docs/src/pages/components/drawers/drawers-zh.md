---
title: React Drawer（抽屉）组件
components: Drawer, SwipeableDrawer
githubLabel: 'component: Drawer'
materialDesign: https://material.io/components/navigation-drawer
---

# Drawer（抽屉）

<p class="description">导航抽屉提供了一个访问您应用中的目标地址的途径。 侧边栏被固定在屏幕的左侧或右侧，而它包含了一些补充内容。</p>

用户能够通过 Navigation drawers（或者 “sidebars”）来访问目标地址和一些应用功能，例如切换帐户。 它们既可以永久在屏幕上，也可以由一个导航菜单图标控制。

[Side sheets](https://material.io/components/sheets-side) 主要在平板和桌面上作为辅助侧边栏使用。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 临时抽屉

你可以打开或关闭一个临时的导航抽屉。 抽屉组件的默认状态是关闭，而选中一个区则会触发抽屉组件在任何其他内容之上呈现。

而点击覆盖的区域（overlay）或者按下 Esc 键则可以关闭抽屉。 通过操控 `open` 属性，当选中一个子项的时候，抽屉则会被关闭。

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

### 可滑动的抽屉

您可以使用 `SwipeableDrawer` 组件来实现滑动抽屉。

此组件附带 2 kB gzipped 的负载开销。 一些低端移动设备无法以60 FPS 的速度跟随手指的移动。 你可以通过使用 `disableBackdropTransition` 这个属性来解决此问题。

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

在此文档的页面中有以下的一些属性，它们用来优化组件的使用：

- 一些高端的设备托管了 iOS。 在不丢失帧的情况下，能够启用背景过渡。 这样展示令人足够满意了。
- iOS 有一个“滑动回退”功能，它会影响发现功能，所以必须禁用发现功能。

```jsx
const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />;
```

### 保持挂载（mounted）

你可以使用 `ModalProps` 属性来确保临时抽屉不会被卸载，就像这样：

如果你使用的是桌面设备，那么可以点击 "OPEN" 按钮来切换抽屉的显示。 如果你使用的设备是手机，那么可以在 CodeSandbox（“编辑”图标）中打开该演示，并尝试滑动抽屉。

{{"demo": "pages/components/drawers/SwipeableEdgeDrawer.js", "iframe": true, "height": 400, "maxWidth": 300}}

### 全高导航栏

你可以使用 `ModalProps` 属性来确保临时抽屉不会被卸载，就像这样：

```jsx
<Drawer
  variant="temporary"
  ModalProps={{
    keepMounted: true,
  }}
/>
```

有关此部分的更多详情请查看 [模态框性能部分](/components/modal/#performance)。

## 响应式的抽屉

You can use the `temporary` variant to display a drawer for small screens and `permanent` for a drawer for wider screens.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## 持久的抽屉

持久抽屉可以在打开或关闭状态之间切换。 抽屉与内容位于同一表面的高度上。 它默认情况下是关闭的，可通过选择菜单图标打开，直到用户选择关闭之前，它都会保持打开状态。 在不同操作和不同节点切换时，抽屉的状态都会被记住。

当抽屉位于页面网格之外并打开时，抽屉会强制其他内容更改大小并适应较小的视口。

持久的抽屉能够适用于比移动设备大的屏幕尺寸。 那些有多个层次等级的应用，会用到向上的箭头作为导航，在这样的情况下，我们不推荐使用持久的抽屉。

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## 迷你变体抽屉

在这种情况下，持久的抽屉会更改其宽度。 它的静止状态是一个与其内容相同的迷你抽屉，由一个应用栏夹住。 展开后，它将显示为标准的持久的导航抽屉。

若有快速选择访问应用以及访问应用内容的需求，我们建议您使用迷你变体抽屉。

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## 永久抽屉

永久抽屉始终可见并固定在左侧，与内容或背景位于同一高度。 他们无法被关闭。

推荐在**桌面环境上默认**使用永久抽屉。

### 全高导航栏

一个从左到右层次结构的信息消费，是应用程序需要重视的。

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### 从应用栏下开始分割

一些专注于生产力的应用，需要保持在整个屏幕上的平衡。

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}
