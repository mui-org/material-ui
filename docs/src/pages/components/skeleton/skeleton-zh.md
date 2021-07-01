---
title: React Skeleton（骨架屏）组件
components: Skeleton
githubLabel: 'component: Skeleton'
---

# Skeleton 骨架屏

<p class="description">在数据完整加载之前将您的内容显示为一个占位的预览，这样可以减少由加载时间造成的困扰。</p>

您的组件需要的数据可能无法立刻加载。 你可以通过使用骨架屏来提高页面的感知响应度。 好像感觉到事情马上就要发生了，然后信息在屏幕上逐步地显示（Cf. [ 避开 Spinner](https://www.lukew.com/ff/entry.asp?1797)）。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 使用

骨架屏组件可以**直接在你的组件内**使用。 就像这样：

```jsx
{
  item ? (
    <img
      style={{
        width: 210,
        height: 118,
      }}
      alt={item.title}
      src={item.src}
    />
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}
```

## 变体

组件支持 3 种形状变体。

{{"demo": "pages/components/skeleton/Variants.js"}}

## 动画

默认情况下，骨架屏组件使用 pulsates 动画，但是你也可以更改为 wave 动画或者完全禁用它。

{{"demo": "pages/components/skeleton/Animations.js"}}

### 脉动动画例子

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

### 波浪动画例子

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## 推断尺寸

除了接受 `width` 和 `height` props 外，组件还可以自行推断出尺寸。

当您在排版的时候会得心应手，因为它的高度是用 `em` 单位设置的。

```jsx
<Typography variant="h1">{loading ? <Skeleton /> : 'h1'}</Typography>
```

{{"demo": "pages/components/skeleton/SkeletonTypography.js", "defaultCodeOpen": false}}

但是，当涉及到其他组件时，你可能不想重复申明宽度和高度。 在这些情况下，你可以传入 `children`，然后它将会从它们中推断出它的宽度和高度。

```jsx
loading ? (
  <Skeleton variant="circular">
    <Avatar />
  </Skeleton>
) : (
  <Avatar src={data.avatar} />
);
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}

## Color 颜色

The color of the component can be customized by changing its `background-color` CSS property. This is especially useful when on a black background (as the skeleton will otherwise be invisible).

{{"demo": "pages/components/skeleton/SkeletonColor.js", "bg": "inline"}}

## 无障碍设计

骨架屏的动画可以代替传统转圈动画的加载方式。 骨架屏不是一个抽象的小部件，而是提供一个对未来事件的预期，来减少人们的认知负荷。

骨架屏使用的背景色是在良好条件下可见的最小亮度（良好的环境光源、清晰的屏幕、无其他视觉障碍）。

### ARIA

无。

### 键盘输入

骨架屏不能被聚焦。
