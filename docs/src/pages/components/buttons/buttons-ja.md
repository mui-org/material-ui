---
title: React Button コンポーネント
components: Button, IconButton, ButtonBase
materialDesign: https://material.io/components/buttons
githubLabel: 'component: Button'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#button'
---

# Button (ボタン)

<p class="description">Buttonを使用すると、ユーザーは1回のタップでアクションを実行したり選択したりできます。</p>

ボタンは、ユーザーが実行できるアクションを伝達します。 これらは通常、UI全体の次のような場所に配置されます。

- Dialogs
- Modal window
- Form
- Card
- Toolbar

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic Button

The `Button` comes with three variants: text (default), contained, and outlined.

{{"demo": "pages/components/buttons/BasicButtons.js"}}

### Text button

[Text buttons](https://material.io/components/buttons#text-button) are typically used for less-pronounced actions, including those located: in dialogs, in cards. Cardでは、テキストボタンを使用することでCardの内容に重点を置くことができます。

{{"demo": "pages/components/buttons/TextButtons.js"}}

### Contained button

[Contained button](https://material.io/components/buttons#contained-button) は高さと塗りつぶしによって区別される、より強調されたボタンです。 アプリ内で強調すべきアクションを含みます。

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

`disableElevation`でシャドウを取り除けます。

{{"demo": "pages/components/buttons/DisableElevation.js"}}

### Outlined button

[Outlined buttons](https://material.io/components/buttons#outlined-button) are medium-emphasis buttons. They contain actions that are important but aren't the primary action in an app.

Outlined buttonは、Contained buttonより弱く、 Text buttonよりは強い強調をします。

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Handling clicks

全てのコンポーネントは `onClick`を受け付けます。これはルートのDOM要素に適用されます。

```jsx
<Button onClick={() => { alert('clicked') }}>Click me</Button>
```

ドキュメントでは(多すぎるので)ネイティブpropsに関しては [言及していない](/guides/api/#native-properties)ことに注意してください。

## カラー

{{"demo": "pages/components/buttons/ColorButtons.js"}}

In addition to using the default button colors, you can add custom ones, or disable any you don't need. See the [Adding new colors](/customization/palette/#adding-new-colors) example for more info.

## サイズ

For larger or smaller buttons, use the `size` prop.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Buttons with icons and label

ロゴはプレーンテキストよりも認識しやすいため、ボタンにアイコンを追加してアプリケーションのUXを強化したい場合があります。 たとえば、削除ボタンにごみ箱アイコンを付けるような場合です。

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon button

アイコンだけのボタンは、App BarやToolbarでよく使われます。

アイコンは、アイテムを一つ選択したり、アイテムに星を追加または削除するなど選択/解除できるトグルボタンにも適しています。

{{"demo": "pages/components/buttons/IconButtons.js"}}

### サイズ

他のサイズのボタンを表示したい場合は、 `size` プロパティを使用します。

{{"demo": "pages/components/buttons/IconButtonSizes.js"}}

## カスタムButton

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/styles/button) を確認すると良いでしょう。

## ローディングボタン

ローディングボタンは、読み込み中の状態を表示し、操作を無効にすることができます。

{{"demo": "pages/components/buttons/LoadingButtons.js"}}

状態間の遷移を確認するにはトグルスイッチを切り替えてください。

{{"demo": "pages/components/buttons/LoadingButtonsTransition.js"}}

## 複雑なボタン

テキストボタン、コンテインボタン、フローティングアクションボタン、アイコンボタンは、同じコンポーネント(`ButtonBase`) を元に作成されています。 この低レベルのコンポーネントを利用して独自のインタラクションを構築できます。

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## サードパーティ製ルーティングライブラリ

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. `ButtonBase` コンポーネントはこういった使用法を扱うために`component` プロパティを提供します。 詳細は [こちら](/guides/routing/#button) です。

## 制限事項

### Cursor not-allowed

ButtonBaseコンポーネントは無効化時に、 `pointer-events: none;` としています。無効化されたカーソルが出現することを抑制するためです。

`not-allowed`を意図的に使用したい場合、２つの選択肢があります。

1. **CSS のみ**。 You can remove the pointer-events style on the disabled state of the `<button>` element:

```css
.MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
```

ただし:

- [tooltips を無効化したエレメント](/components/tooltips/#disabled-elements)で表示する必要がある時、 `pointer-events: none;` に戻す必要があります。
- ボタン要素以外をレンダリングする時、カーソルが変更されない時がある。例えば、link `<a>`要素。

2. **DOM を変更する**。 Buttonコンポーネントを囲う。

```jsx
<span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
```

どのような要素でも対応できるメリットがあります。例えば、link `<a>` 要素。
