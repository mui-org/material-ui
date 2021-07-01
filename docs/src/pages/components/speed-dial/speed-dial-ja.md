---
title: React Speed Dial component
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: SpeedDial'
materialDesign: 'https://material.io/components/buttons-floating-action-button#types-of-transitions'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# スピードダイヤル（Speed Dial）

<p class="description">フローティング状態のアクションボタンを押すと、3~6つの関連アクションを短縮ダイヤルの形式で表示できます。</p>

6つ以上のアクションが必要な場合は、FAB以外のものを使用してそれらを表示する必要があります。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## シンプルスピードダイヤル

フローティングアクションボタンは、関連するアクションを表示できます。

{{"demo": "pages/components/speed-dial/BasicSpeedDial.js"}}

## Playground

{{"demo": "pages/components/speed-dial/PlaygroundSpeedDial.js"}}

## カスタムcloseアイコン

`SpeedDialIcon` コンポーネントの `アイコン` と `openIcon` props を使用して、閉じた状態と開いた状態の代替アイコンを提供できます。

SpeedDialActionsのツールチップは永続的に表示されるため、ユーザーがタッチデバイスでツールチップを表示するために長押しする必要はありません。

## カスタムcloseアイコン

`SpeedDialIcon` コンポーネントの `アイコン` と `openIcon` props を使用して、閉じた状態と開いた状態の代替アイコンを提供できます。

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## 永続的なアクションのツールチップ

The SpeedDialActions tooltips can be displayed persistently so that users don't have to long-press to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the prop.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}

## アクセシビリティ

### ARIA

#### Required

- You should provide an `ariaLabel` for the speed dial component.
- You should provide a `tooltipTitle` for each speed dial action.

#### Provided

- The Fab has `aria-haspopup`, `aria-expanded` and `aria-controls` attributes.
- The speed dial actions container has `role="menu"` and `aria-orientation` set according to the direction.
- The speed dial actions have `role="menuitem"`, and an `aria-describedby` attribute that references the associated tooltip.

### Keyboard

- The speed dial opens on focus.
- The Space and Enter keys trigger the selected speed dial action, and toggle the speed dial open state.
- The cursor keys move focus to the next or previous speed dial action. (Note that any cursor direction can be used initially to open the speed dial. This enables the expected behavior for the actual or perceived orientation of the speed dial, for example for a screen reader user who perceives the speed dial as a drop-down menu.)
- The Escape key closes the speed dial and, if a speed dial action was focused, returns focus to the Fab.
