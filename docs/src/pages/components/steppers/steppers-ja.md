---
title: React Stepper component
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
githubLabel: 'component: Stepper'
materialDesign: https://material.io/archive/guidelines/components/steppers.html
---

# Stepper ステッパー

<p class="description">ステッパーは、番号の付いたステップを通して進捗を伝えます。 ウィザードのようなワークフローを提供します。</p>

[Steppers](https://material.io/archive/guidelines/components/steppers.html)は、一連の論理ステップと番号付きステップの進行状況を表示します。 ナビゲーションにも使用できます。 ステッパーは、ステップが保存された後に一時的なフィードバックメッセージを表示する場合があります。

- **ステップのタイプ**： Editable, Non-editable, Mobile, Optional
- **ステッパーのタイプ**：Horizontal, Vertical, Linear, Non-linear

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **注：** ステッパーは [Material Design guidelines](https://material.io/)には文書化されなくなりましたが、Material-UIは引き続きそれらをサポートします。

## Horizontal Stepper

Horizontal steppers are ideal when the contents of one step depend on an earlier step.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js", "bg": true}}

### Linear

`alternativeLabel`コンポーネントで`alternativeLabel` propを設定すると、ステップアイコンの下にラベルを配置できます。

`Stepper` は、現在のステップインデックス（ゼロベース）を `activeStep` プロパティとして渡すことで制御できます。 `<code>Stepper`方向は、 `orientation`プロパティを使用して設定されます。

この例では、 `optional`プロパティを第2の`Step`コンポーネントに配置して、オプションの手順を使用する方法も示します。 オプションの手順がスキップされる場合の管理はユーザー次第です。 特定のステップでこれを決定したら、`completed={false}` を設定して、アクティブなステップインデックスがオプションのステップを超えていても、実際には完了していないことを示す必要があります。

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js"}}

### Non-linear

Non-linearステッパーにより、ユーザーはいつでもマルチステップフローを入力できます。

この例は、ステップが `activeStep` プロパティに基づいて `disabled ={true}` 自動的に設定されることを除いて、通常の水平ステッパーに似ています。

The use of the `StepButton` here demonstrates clickable step labels, as well as setting the `completed` flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to determine when all steps are completed (or even if they need to be completed).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js"}}

### カスタマイズされたステッパー

`alternativeLabel`コンポーネントで`alternativeLabel` propを設定すると、ステップアイコンの下にラベルを配置できます。

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js"}}

### Error step

{{"demo": "pages/components/steppers/HorizontalStepperWithError.js"}}

### Non-linear - Alternative Label

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/steppers/CustomizedSteppers.js"}}

## 垂直ステッパー

Vertical steppers are designed for narrow screen sizes. They are ideal for mobile. All the features of the horizontal stepper can be implemented.

{{"demo": "pages/components/steppers/VerticalLinearStepper.js"}}

### テキスト

The content of a step is unmounted when closed. If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to keep the step mounted with:

```jsx
<StepContent TransitionProps={{ unmountOnExit: false }} />
```

## モバイルステッパー

このコンポーネントは、モバイルデバイスに適したコンパクトなステッパーを実装します。 It has more limited functionality than the vertical stepper. その着想については、[mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps)を参照してください。

The mobile stepper supports three variants to display progress through the available steps: text, dots, and progress.

### テキスト

ステップ数が多くない場合はドットを使用します。

{{"demo": "pages/components/steppers/TextMobileStepper.js", "bg": true}}

### テキスト

このデモは前のデモとよく似ていますが、 [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) ステップの遷移を行います。

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js", "bg": true}}

### Dots

Use dots when the number of steps is small.

{{"demo": "pages/components/steppers/DotsMobileStepper.js", "bg": true}}

### Progress

Use a progress bar when there are many steps, or if there are steps that need to be inserted during the process (based on responses to earlier steps).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js", "bg": true}}
