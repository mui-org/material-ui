---
title: React Transition（过渡动画）组件
components: Collapse, Fade, Grow, Slide, Zoom
githubLabel: 'component: Transition'
---

# 过渡动画

<p class="description">过渡动画有利于增强 UI 的表现力并且让人更易于使用。</p>

Material-UI 提供了一系列的过渡效果，你可以将一些基本的 [动作](https://material.io/design/motion/) 添加到你的应用组件中。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

为了更好地支持服务器渲染，Material-UI 为一些动画组件的子组件提供了一个 `style` 属性，（Fade, Grow, Zoom, Slide）。 为了让动画如期实现，必须将 `style` 属性应用到 DOM 上。

```jsx
// 'props' 对象包含一个 'style' 属性。
// 你需要将这个属性提供给 `div` 元素，如下所示。
function MyComponent(props) {
  return (
    <div {...props}>
      Fade
    </div>
  );
}

export default Main() {
  return (
    <Fade>
      <MyComponent />
    </Fade>
  );
}
```

## Collapse 折叠

从子元素的起始边缘开始展开。 如果你需要水平折叠，请使用 `orientation` 属性。 `collapsedHeight` 属性可以用于设置未扩展时的最小高度值。

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade 淡入淡出

从透明淡入至不透明。

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow 扩展

从子元素的中心向外扩展，同时从透明淡入至不透明。

第二个示例演示了如何更改 `transform-origin`，并有条件地应用了 `timeout` 属性来更改输入速度。

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide 滑动

从屏幕边缘滑入。 `direction` 属性控制从屏幕的哪一个边缘开始。

过渡组件的 `mountOnEnter` 属性使子组件无法被挂载，直到 `in` 为 `true`。 这可以保证相对上定位好的组件不会从屏幕外面的位置滚动到视图中。 同样的， 在组件从屏幕中过渡完后，`unmountOnExit` 属性将次组件从 DOM 中移除。

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

## Zoom 放大

从子元素的中心向外扩展。

此示例还演示了如何延迟过渡的开始。

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## TransitionGroup 动画组

要在安装或卸载组件时对其进行动画处理，可以使用 _react-transition-group_ 中的 [`TransitionGroup`](https://reactcommunity.org/react-transition-group/transition-group) 组件。 当组件被添加或删除时，`in` 属性会被 `TransitionGroup` 自动切换。

{{"demo": "pages/components/transitions/TransitionGroupExample.js"}}

## TransitionComponent 属性

有些 Material-UI 组件在内部也在使用这些过渡动画。 它们接受一个 `TransitionComponent` 属性来定制默认的动画。 您可以使用上述的任何组件或者是您自己的组件。 它应遵守以下条件：

- 接受一个 `in` 属性。 这对应于打开/关闭的状态。
- 当进入过渡时调用 `onEnter` 回调属性。
- 当退出过渡完成后应该调用 `onExited` 回调属性。 这两个回调属性保证了当在一个关闭的状态并展示完过渡动画时，才会移除子内容。

For more information on creating a custom transition, visit the _react-transition-group_ [`Transition` documentation](http://reactcommunity.org/react-transition-group/transition). 你还可以访问一些组件的专用部分： 你还可以访问一些组件的专用部分： 你还可以访问一些组件的专用部分：

- [Modal](/components/modal/#transitions)
- [Dialog](/components/dialogs/#transitions)
- [Popper](/components/popper/#transitions)
- [Snackbar（消息条）](/components/snackbars/#transitions)
- [Tooltip](/components/tooltips/#transitions)
