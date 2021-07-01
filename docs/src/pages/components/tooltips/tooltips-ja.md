---
title: React Tooltip component
components: Tooltip
githubLabel: 'component: Tooltip'
materialDesign: https://material.io/components/tooltips
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tooltip'
---

# Tooltip

<p class="description">ユーザーが要素上にマウスを移動したり、要素をフォーカスしたり、タップしたりすると、ツールチップにわかりやすいテキストが表示されます。</p>

[Tooltips](https://material.io/design/components/tooltips.html)をアクティブにすると、機能の説明など、要素を識別するテキストラベルが表示されます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本的なツールチップ

{{"demo": "pages/components/tooltips/BasicTooltip.js"}}

## ツールチップの配置

`Tooltip` には、12の**配置**の選択肢があります。 矢印はありません。その代わりに、方向を伝達するために発生元から発生するモーションがあります。

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## カスタマイズされたツールチップ

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## 矢印付きツールチップ

`arrow` プロパティを使用して、ツールチップがどの要素を参照するかを示す矢印を表示することできます。

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Custom child element

ツールチップは、DOMイベントリスナーをその子要素に適用する必要があります。 If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip title="Delete">
  <MyComponent>
</Tooltip>
```

同様の概念は、[wrapping components](/guides/composition/#wrapping-components)ガイドにも記載されています。

## トリガー

ツールチップを表示するイベントのタイプを定義できます。

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## 制御された(controlled)ツールチップ

`open`, `onOpen` and `onClose` の各プロパティを使用して、ツールチップの動作を制御できます。

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## 可変幅

既定では、`Tooltip`は長いテキストを折り返して読みやすくします。

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## インタラクティブ

ツールチップはデフォルトでインタラクティブです( [WCAG 2.1 Success Criterion 1.4.13](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) を満たすため)。 ツールチップをインタラクティブにすることができます。 `leaveDelay` が期限切れになる前に、ユーザーがツールチップにカーソルを合わせても閉じません。 `disableInteractive`を渡すことで、この動作を無効にすることができます(したがって、レベルAAに到達するために必要な基準を満たさなくなります)。

{{"demo": "pages/components/tooltips/NonInteractiveTooltips.js"}}

## 無効な(disabled)要素

デフォルトでは無効になっている要素`<button>`はユーザーの操作をトリガーしないため、 `Tooltip`は、ホバーなどの通常のイベントでアクティブになりません。 無効な要素に対応するには、 `span` のような単純なラッパー要素を追加します。

> ⚠️ Safariで動作するようにするため、ツールチップラッパーの下に少なくとも1つの表示ブロックまたはフレックスアイテムが必要です。

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a Material-UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property *pointer-events: none;* to your element when disabled:

```jsx
<Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ? <Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ?
```

## Transitions

別のトランジションを使用します。

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## カーソルに追従させる

`followCursor={true}` を設定して、ツールチップがカーソルに追従するようにできます。

{{"demo": "pages/components/tooltips/FollowCursorTooltips.js"}}

## 仮想Element

In the event you need to implement a custom placement, you can use the `anchorEl` prop: The value of the `anchorEl` prop can be a reference to a fake DOM element. [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/)のようなオブジェクトを作成する必要があります。

{{"demo": "pages/components/tooltips/AnchorElTooltips.js"}}

## 表示と非表示

ツールチップは通常、ユーザーのマウスが要素の上に移動するとすぐに表示され、ユーザーのマウスが離れるとすぐに非表示になります。 ツールチップの表示または非表示の遅延は、上記のControlled Tooltipsデモに示すように、プロパティ `enterDelay` および `leaveDelay`を使用して追加できます。

モバイルでは、ユーザーが要素を長押しして1500msの遅延後に非表示になると、ツールチップが表示されます。 `disableTouchListener` プロパティでこの機能を無効にできます。

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tooltip)

デフォルトでは、ツールチップはその子要素にのみラベル付けします。 This is notably different from `title` which can either label **or** describe its child depending on whether the child already has a label. For example, in:

```html
<button title="some more information">A button</button>
```

the `title` acts as an accessible description. If you want the tooltip to act as an accessible description you can pass `describeChild`. Note that you shouldn't use `describeChild` if the tooltip provides the only visual label. Otherwise, the child would have no accessible name and the tooltip would violate [success criterion 2.5.3 in WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "pages/components/tooltips/AccessibilityTooltips.js"}}
