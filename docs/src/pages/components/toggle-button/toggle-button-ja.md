---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
githubLabel: 'component: ToggleButton'
materialDesign: 'https://material.io/components/buttons#toggle-button'
---

# トグルボタン

<p class="description">トグルボタンを使用して、関連するオプションをグループ化できます。</p>

グループは共通のコンテナーを共用する必要があります。 ToggleButton sets `aria-pressed="<bool>"` according to the button state.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 排他的な選択

exclusiveを使うと、いずれかのオプションを選択したとき、他のオプションの選択を解除します。

In this example, text justification toggle buttons present options for left, center, right, and fully justified text (disabled), with only one item available for selection at a time.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## 複数選択

太字、斜体、下線などの論理的にグループ化された選択肢を複数選択することができます。

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## Size

For larger or smaller buttons, use the `size` prop.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## カラー

{{"demo": "pages/components/toggle-button/ColorToggleButton.js"}}

## 垂直方向のボタン

`orientation` プロパティを「vertical」に設定することで、ボタンを垂直に積み上げることができます。

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## 値がセットされていることを強制する

少なくとも1つのボタンが有効でなければならないことを強制する場合は、変更をハンドルする関数を作って適応できます。

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## スタンドアロンのトグルボタン

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## カスタマイズされたトグルボタン

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## アクセシビリティ

### ARIA

- ToggleButtonGroup には `role="group"` が付与されています。 `aria-label="label"`, `aria-labelledby="id"` または `<label>` でアクセシビリティのためにラベルを指定する必要があります。
- ToggleButton は、ボタンの状態によって `aria-pressed="<bool>"` を設定します。 各ボタンに `aria-label` を付けてください。

### Keyboard

現時点では、切り替えボタンは DOM の順序になっています。 タブキーでそれらの間を移動します。 ボタンの動作は標準的なキーボードセマンティクスに従います。
