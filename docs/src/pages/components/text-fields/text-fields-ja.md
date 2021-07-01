---
title: Text Field コンポーネント
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
githubLabel: 'component: TextField'
materialDesign: https://material.io/components/text-fields
---

# Text Field (テキストフィールド)

<p class="description">Text fieldを使用すると、ユーザーはテキストを入力および編集できます。</p>

テキストフィールドを使用すると、UIにテキストを入力できます。 通常、フォームとダイアログに表示されます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic TextField

The `TextField` wrapper component is a complete form control including a label, input, and help text. It comes with three variants: outlined (default), filled, and standard.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**注:**  `TextField`のstandard variantは [Material Design guidelines](https://material.io/) に記載されなくなりましたが([理由はこちら](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03))、 Material-UI は引き続きサポートします。

## Form props

標準的なフォームの属性がサポートされています(`required`, `disabled`, `type` など)。入力がどのように使用されるかなど、フィールドの入力に関するコンテキストを与えるために使用される `helperText` も同様です。

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## バリデーション

The `error` prop toggles the error state. The `helperText` prop can then be used to provide feedback to the user about the error.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multiline

The `multiline` prop transforms the text field into a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) or a [TextareaAutosize](/components/textarea-autosize/). `rows` プロパティが設定されていない限り、テキストフィールドの高さはそのコンテンツと動的に一致します ( [TextareaAutosize](/components/textarea-autosize/) を使用します)。 You can use the `minRows` and `maxRows` props to bound it.

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Select (選択)

The `select` prop makes the text field use the [Select](/components/selects/) component internally.

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Icons

There are multiple ways to display an icon with a text field.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### 入力装飾 (Input Adornments)

これを行う主な方法は `InputAdornment` です。 This can be used to add a prefix, a suffix, or an action to an input. たとえば、アイコンボタンを使用してパスワードを表示または非表示にすることができます。

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## サイズ

小さい入力欄が好きですか？ `size`propを使用します。

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

`filled` スタイルの入力欄の高さは、ラベルを外側に表示することでさらに小さくできます。

{{"demo": "pages/components/text-fields/TextFieldHiddenLabel.js"}}

## Margin

The `margin` prop can be used to alter the vertical spacing of the text field. Using `none` (default) doesn't apply margins to the `FormControl` whereas `dense` and `normal` do.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## 最大幅

`fullWidth` を使用すると、入力欄の幅がコンテナ一杯になります。

{{"demo": "pages/components/text-fields/FullWidthTextField.js"}}

## Uncontrolled vs. Controlled

制御されている(controlled)コンポーネントと制御されていない(uncontrolled)コンポーネントがあります。

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## コンポーネント

`TextField` は小さなコンポーネントから構成されています。（ [`FormControl`](/api/form-control/)、 [`Input`](/api/input/)、 [`FilledInput`](/api/filled-input/)、 [`InputLabel`](/api/input-label/)、 [`OutlinedInput`](/api/outlined-input/)、 や [`FormHelperText`](/api/form-helper-text/)など ）また、フォーム入力を大幅にカスタマイズするために直接活用できます。

いくつかのネイティブHTML入力プロパティが `TextField` コンポーネントにないことに気づいたかもしれません。 これは故意です。 The component takes care of the most used properties. Then, it's up to the user to use the underlying component shown in the following demo. それでも、あなたは使用することができます `inputProps` （及び `InputProps`、 `InputLabelProps` あなたには、いくつかの決まり文句を避けたい場合はプロパティ）。

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## 入力

{{"demo": "pages/components/text-fields/Inputs.js"}}

## カラー

`color` プロパティは入力欄がフォーカスされた時のハイライト色を変更します。

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## カスタマイズされた入力 (Customized inputs)

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

Customization does not stop at CSS. You can use composition to build custom components and give your app a unique feel. 以下は、Googleマップに触発された [`InputBase`](/api/input-base/) コンポーネントを使用した例です。

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/text-field).

## `useFormControl`

For advanced customization use cases, a `useFormControl()` hook is exposed. This hook returns the context value of the parent `FormControl` component.

**API**

```jsx
import { useFormControl } from '@material-ui/core/FormControl';
```

**戻り値**

`value` (_object_):

- `value.adornedStart` (_bool_): Indicate whether the child `Input` or `Select` component has a start adornment.
- `value.setAdornedStart` (_func_): Setter function for `adornedStart` state value.
- `value.color` (_string_): The theme color is being used, inherited from `FormControl` `color` prop .
- `value.disabled` (_bool_): Indicate whether the component is being displayed in a disabled state, inherited from `FormControl` `disabled` prop.
- `value.error` (_bool_): Indicate whether the component is being displayed in an error state, inherited from `FormControl` `error` prop
- `value.filled` (_bool_): Indicate whether input is filled
- `value.focused` (_bool_): Indicate whether the component and its children are being displayed in a focused state
- `value.fullWidth` (_bool_): Indicate whether the component is taking up the full width of its container, inherited from `FormControl` `fullWidth` prop
- `value.hiddenLabel` (_bool_): Indicate whether the label is being hidden, inherited from `FormControl` `hiddenLabel` prop
- `value.required` (_bool_): Indicate whether the label is indicating that the input is required input, inherited from the `FormControl` `required` prop
- `value.size` (_string_): The size of the component, inherited from the `FormControl` `size` prop
- `value.variant` (_string_): The variant is being used by the `FormControl` component and its children, inherited from `FormControl` `variant` prop
- `value.onBlur` (_func_): Should be called when the input is blurred
- `value.onFocus` (_func_): Should be called when the input is focused
- `value.onEmpty` (_func_): Should be called when the input is emptied
- `value.onFilled` (_func_): Should be called when the input is filled

**例**

{{"demo": "pages/components/text-fields/UseFormControl.js"}}

## 制限事項

### シュリンク

入力ラベルの「shrink」状態は必ずしも正しくありません。 入力が何かを表示しているとすぐに入力ラベルは縮小するはずです。 状況によっては、「shrink」状態（数値入力、日時入力、ストライプ入力）を判別できません。 重複があるかもしれません。

![シュリンク](/static/images/text-fields/shrink.png)

この問題を回避するにはラベルの"shrink"状態を以下のように強制する必要があります。

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

または

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### フローティングラベル

The floating label is absolutely positioned. It won't impact the layout of the page. Make sure that the input is larger than the label to display correctly.

### type="number"

type="number" の入力欄には、使いやすさの面で問題がある可能性があります。

- 特定の数字でない文字を許可する ('e', '+', '-', '.') また他の文字を破棄する
- 数値を増減するための機能は、偶発的な変更や通知しにくい変更を引き起こす可能性があります。

詳細は、GOV.UK Design System チームのこちらの記事 [](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) をご覧ください。

数値のバリデーションには、 _pattern_ 属性を持つデフォルトの input typr="text"を使用します。例えば、次のようにします。

```jsx
<TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
```

将来的には、 [数値入力コンポーネント](https://github.com/mui-org/material-ui/issues/19154) を提供するかもしれません。

### ヘルパーテキスト

helper textプロパティはテキストフィールドの高さに影響します。 ヘルパーテキストを持つテキストフィールドと持たないテキストフィールドを横に並べると、それらの高さが異なるようになります。 For example:

{{"demo": "pages/components/text-fields/HelperTextMisaligned.js"}}

これは `helperText` プロパティにスペースを渡すことで修正できます。

{{"demo": "pages/components/text-fields/HelperTextAligned.js"}}

## サードパーティの入力ライブラリとの統合

サードパーティのライブラリを使って入力をフォーマットすることができます。 `inputComponent` プロパティを使用して、 `<input>` 要素のカスタム実装を提供する必要があります。

次のデモでは、[react-text-mask](https://github.com/text-mask/text-mask) と[react-number-format](https://github.com/s-yadav/react-number-format)ライブラリを使用します。 同じ概念を [（たとえば、react-stripe-element)に適用することもできます](https://github.com/mui-org/material-ui/issues/16037)。

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

The provided input component should expose a ref with a value that implements the following interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
const MyInputComponent = React.forwardRef((props, ref) => {
  const { component: Component, ...other } = props;

  // implement `InputElement` interface
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      // logic to focus the rendered component from 3rd party belongs here
    },
    // hiding the value e.g. react-stripe-elements
  }));

  // `Component` will be your `SomeThirdPartyComponent` from below
  return <Component {...other} />;
});

// usage
<TextField
  InputProps={{
    inputComponent: MyInputComponent,
    inputProps: {
      component: SomeThirdPartyComponent,
    },
  }}
/>;
```

## アクセシビリティ

テキストフィールドにアクセスできるようにするには **、入力をラベルおよびヘルパーテキストにリンクする必要があります**。 The underlying DOM nodes should have this structure:

```jsx
<div class="form-control">
  <label for="my-input">Email address</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">We'll never share your email.</span>
</div>
```

- `TextField` コンポーネントを使用している場合は、一意の `id`を指定するだけです。
- コンポーネントを構成している場合は

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
```

## 補完プロジェクト

For more advanced use cases, you might be able to take advantage of:

- [mui-rff](https://github.com/lookfirst/mui-rff) Bindings for using Material-UI with [React Final Form](https://final-form.org/react).
- [formik-material-ui](https://github.com/stackworx/formik-material-ui): Bindings for using Material-UI with [formik](https://jaredpalmer.com/formik).
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui): Bindings for using Material-UI with [Redux Form](https://redux-form.com/).
- [mui-rff](https://github.com/lookfirst/mui-rff): Bindings for using Material-UI with [React Final Form](https://final-form.org/react).
