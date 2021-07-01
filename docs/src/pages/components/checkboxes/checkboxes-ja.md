---
title: React Checkbox コンポーネント
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
materialDesign: 'https://material.io/components/selection-controls#checkboxes'
githubLabel: 'component: Checkbox'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#checkbox'
---

# Checkbox

<p class="description">Checkboxコンポーネントにより、ユーザーの選択が一つ以上の項目から設定します。</p>

CheckBox コンポーネントを使用してオプションをオンまたはオフにすることができます。

リストに複数のオプションを持っている場合は、 Checkboxを使用して代わりのオン/オフスイッチのスペースを保存することができます。 選択肢が1つしかない場合は、チェックボックスを使用せずに代わりにオン/オフスイッチを使用します。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic checkboxes

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

## FormGroupのCheckbox

You can provide a label to the `Checkbox` thanks to the `FormControlLabel` component.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the checkboxes.

{{"demo": "pages/components/checkboxes/SizeCheckboxes.js"}}

## カラー

{{"demo": "pages/components/checkboxes/ColorCheckboxes.js"}}

## Icon

{{"demo": "pages/components/checkboxes/IconCheckboxes.js"}}

## Controlled

You can control the checkbox with the `checked` and `onChange` props:

{{"demo": "pages/components/checkboxes/ControlledCheckbox.js"}}

## FormControlLabel を使用した Checkbox

チェックボックスは、フォーム内でチェックされているかチェックされていないかの2つの状態のみを持つことができます。 その値を送信するかしないかです。 Visually, there are **three** states a checkbox can be in: checked, unchecked, or indeterminate.

{{"demo": "pages/components/checkboxes/IndeterminateCheckbox.js"}}

> ⚠️ When indeterminate is set, the value of the `checked` prop only impacts the form submitted values. It has no accessibility or UX implications.

## ラベルの配置

`FormGroup` is a helpful wrapper used to group selection control components.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## ラベルの配置

ラベルの配置は自由に変更できます。

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## カスタマイズされたチェックボックス

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js"}}

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/styles/checkbox) を確認すると良いでしょう。

## When to use

- [Checkboxと Radio Button](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Checkboxと スイッチ](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。
- ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 この場合、追加の属性（例： `aria-label`, `aria-labelledby`, `title`)を経由して `inputProps` プロパティを追加します。

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```
