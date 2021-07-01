---
title: React Speed Dial（快速拨号）组件
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: SpeedDial'
materialDesign: 'https://material.io/components/buttons-floating-action-button#types-of-transitions'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Speed Dial 快速拨号

<p class="description">当按下一个浮动操作按钮（floating action button）时，它可以弹出 3 到 6 个以快速拨号形式出现的相关操作。</p>

如果您需要展示六个以上的操作，则应使用除浮动操作按钮之外的其他操作来呈现它们。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 快速拨号实例

浮动操作按钮可以显示相关操作。

{{"demo": "pages/components/speed-dial/BasicSpeedDial.js"}}

## 练习

{{"demo": "pages/components/speed-dial/PlaygroundSpeedDial.js"}}

## 自定义关闭图标

您可以使用 `SpeedDialIcon` 组件的 `图标` 和 `openIcon` 道具 为关闭和打开状态提供备用图标。

{{"demo": "pages/components/speed-dial/ControlledOpenSpeedDial.js"}}

## 自定义关闭图标

您可以使用 `SpeedDialIcon` 组件的 `icon` 和 `openIcon` 属性，给关闭和打开状态提供一个备用的图标。

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## 恒定不变的操作的工具提示

快速拨号操作（SpeedDialActions）的工具提示可以持久显示，这样用户就不必在触摸设备上长按才能看到工具提示。

为了演示的目的，该示例为所有设备都启用了该功能，但在生产环境中，它可以使用 `isTouch` 逻辑来有条件地设置属性。

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}

## 无障碍设计

### ARIA

#### 必填

- 你应该为快速拨号组件提供一个 `ariaLabel`。
- 你应该为每个快速拨号操作提供一个 `tooltipTitle`。

#### 已提供

- Fab 有 `aria-haspopup`，`aria-expanded` 和 `aria-controls` 属性。
- 快速拨号操作容器根据方向设置了 `role="menu"` 和 `aria-orientation`。
- 快速拨号操作具有 `role="menuitem"` 和引用相关工具提示的 `aria-describedby` 属性。

### 键盘输入

- 对焦时打开快速拨号组件。
- 空格键和回车键将会触发所选的快速拨号动作，并且切换快速拨号组件的打开状态。
- 光标键可将焦点移至下一个或上一个快速拨号操作。 （请注意，任何光标键的方向都可以用来打开快速拨号。 这使得实际或感知到的快速拨号盘方向的预期行为成为可能，例如，对于屏幕阅读器用户来说，他们认为快速拨号盘是一个下拉菜单。 )
- Escape 键将会关闭快速拨号盘，如果一个快速快速拨号盘的动作被聚焦，则将该焦点回退到 Fab。
