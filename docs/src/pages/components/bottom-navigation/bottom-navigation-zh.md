---
title: React Bottom Navigation（底部导航栏）组件
components: BottomNavigation, BottomNavigationAction
githubLabel: 'component: BottomNavigation'
materialDesign: https://material.io/components/bottom-navigation
---

# Bottom Navigation 底部导航栏

<p class="description">使用底部导航栏，您可以在应用程序的主要导航项之间跳转。</p>

底部导航栏（Bottom navigation）在屏幕下方显示三到五个导航项。 每一个导航项都由一个图标和一个可选文本标签表示。 当点击底部导航图标时，用户被切换到该图标关联的目标页面顶部。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Bottom Navigation 底部导航栏

当只有**三个**导航项时，导航栏会始终显示图标和文本标签。

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## 无标签的底部导航栏

如果有**四个**或**五个**导航项，那些未被选中的导航项会以图标的样式显示。

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}

## 固定位置

无论屏幕上有多少内容，该演示的内容都会将底部导航固定在底部。

{{"demo": "pages/components/bottom-navigation/FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}

## Third-party routing library（第三方路由库）

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `BottomNavigationAction` component provides the `component` prop to handle this use case. Here is a [more detailed guide](/guides/routing).
