---
title: React Switch component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: Switch'
materialDesign: 'https://material.io/components/selection-controls#switches'
---

# Switch

<p class="description">スイッチは、単一の設定の状態をオンまたはオフに切り替えます。</p>

[スイッチ](https://material.io/design/components/selection-controls.html#switches) は、モバイルの設定を調整するための好ましい方法です。 The option that the switch controls, as well as the state it's in, should be made clear from the corresponding inline label.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic switches

{{"demo": "pages/components/switches/BasicSwitches.js"}}

## FormGroupのCheckbox

You can provide a label to the `Switch` thanks to the `FormControlLabel` component.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Size

Use the `size` prop to change the size of the switch.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## カラー

{{"demo": "pages/components/switches/ColorSwitches.js"}}

## Controlled

You can control the switch with the `checked` and `onChange` props:

{{"demo": "pages/components/switches/ControlledSwitches.js"}}

## FormGroupを使用したスイッチ

`FormGroup` は、より簡単なAPIを提供する選択コントロールコンポーネントをグループ化するために使用される便利なラッパーです。 `FormGroup` は、より簡単なAPIを提供する選択コントロールコンポーネントをグループ化するために使用される便利なラッパーです。 (See: [When to use](#when-to-use)).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## カスタマイズされたスイッチ （Customized switches）

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch) を確認すると良いでしょう。

## ラベルの配置

ラベルの配置は自由に変更できます。

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## When to use

- [Checkboxと スイッチ](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## アクセシビリティ

- It will render an element with the `checkbox` role not `switch` role since this role isn't widely supported yet. Please test first if assistive technology of your target audience supports this role properly. Then you can change the role with `<Switch inputProps={{ role: 'switch' }}>`
- ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。
- ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 この場合、追加の属性（例： `aria-label`, `aria-labelledby`, `title`)を経由して `inputProps` プロパティを追加します。

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
