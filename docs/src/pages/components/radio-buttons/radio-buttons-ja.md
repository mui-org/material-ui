---
title: Radio buttons コンポーネント
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
githubLabel: 'component: Radio'
materialDesign: 'https://material.io/components/selection-controls#radio-buttons'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#radiobutton'
---

# Radio

<p class="description">ラジオボタンを使用すると、ユーザーはセットから1つのオプションを選択できます。</p>

ユーザーが利用可能なすべてのオプションを確認する必要がある場合は、 [ラジオボタン](https://material.io/design/components/selection-controls.html#radio-buttons) 使用します。 If this is not the case, you can display an error if no value is selected when the form is submitted:

ラジオボタンは、デフォルトで最も一般的に使用されるオプションで設定されています。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Radio group

`RadioGroup` は、 `Radio` コンポーネントをグループ化するのに使用される便利なラッパーで、より簡単なAPIと、グループへの適切なキーボードアクセシビリティを提供します。

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

### 方向

To lay out the buttons horizontally, set the `row` prop:

{{"demo": "pages/components/radio-buttons/RowRadioButtonsGroup.js"}}

### Controlled

You can control the radio with the `value` and `onChange` props:

{{"demo": "pages/components/radio-buttons/ControlledRadioButtonsGroup.js"}}

## Standalone radio buttons

`Radio` can also be used standalone, without the RadioGroup wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the radios.

{{"demo": "pages/components/radio-buttons/SizeRadioButtons.js"}}

## カラー

{{"demo": "pages/components/radio-buttons/ColorRadioButtons.js"}}

## ラベルの配置

You can change the placement of the label with the `FormControlLabel` component's `labelPlacement` prop:

{{"demo": "pages/components/radio-buttons/FormControlLabelPlacement.js"}}

## Show error

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

{{"demo": "pages/components/radio-buttons/ErrorRadios.js"}}

## カスタマイズされたラジオ

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## `useRadioGroup`

高度なカスタマイズのユースケース向けに、 `useRadioGroup()` フックが公開されています。 これは親のラジオボタングループのコンテキスト値を返します。 Radioコンポーネントは内部でこのフックを使用します。

### API

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```

#### 戻り値

`value` (_object_):

- `value.name` (_string_ [optional]): コントロールの値を参照するために使用される名前。
- `value.onChange` (_func_ [optional]): Callback fired when a radio button is selected.
- `value.value` (_any_ [optional]): 選択したラジオボタンの値。

#### 例

{{"demo": "pages/components/radio-buttons/UseRadioGroup.js"}}

## When to use

- [Checkboxと Radio Button](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。
- ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 この場合、追加の属性（例： `aria-label`, `aria-labelledby`, `title`)を経由して `inputProps` プロパティを追加します。

```jsx
<Radio
  value="radioA"
  inputProps={{
    'aria-label': 'Radio A',
  }}
/>
```
