---
title: React タイムピッカー・コンポーネント
components: DesktopTimePicker, MobileTimePicker, StaticTimePicker, TimePicker, ClockPicker
githubLabel: 'component: TimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/time-pickers
---

# タイムピッカー

<p class="description">タイムピッカーを使うことでユーザーはある一つの時間を選択することができます。</p>

タイムピッカーを使うことでユーザーはある一つの時間（時間:分の形式）を選択することができます。 The selected time is indicated by the filled circle at the end of the clock hand.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

このコンポーネントはあなたが選択した日付管理ライブラリに依存します。 [date-fns](https://date-fns.org/)、 [luxon](https://moment.github.io/luxon/)、 [dayjs](https://github.com/iamkun/dayjs)、 [moment](https://momentjs.com/) とパブリックな `dateAdapter` インターフェイスを持っている他のライブラリをサポートしています。

これらのライブラリのうちいずれかをインストールし、ルート（またはピッカーを使用できるようにする最高レベル）を`LocalizationProvider`でラップして、適切な日付エンジンを設定してください。

```jsx
// または @material-ui/lab/Adapter{DayJS,Luxon,Moment} や任意の有効な date-io アダプター
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## 基本的な用法

The date picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop.

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## static モード

It's possible to render any time picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## レスポンシブ対応

The time picker component is designed and optimized for the device it runs on.

- The `MobileTimePicker` component works best for touch devices and small screens.
- The `DesktopTimePicker` component works best for mouse devices and large screens.

By default, the `TimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. これは  `desktopModeMediaQuery` プロパティでカスタマイズできます。

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## Form props

The time picker component can be disabled or read-only.

{{"demo": "pages/components/time-picker/FormPropsTimePickers.js"}}

## Localization

Use `LocalizationProvider` to change the date-engine locale that is used to render the time picker. The time picker will automatically adjust to the locale's time setting, i.e. the 12-hour or 24-hour format. This can be controlled with `ampm` prop.

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## Time validation

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## Landscape

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## サブコンポーネント

Some lower-level sub-components (`ClockPicker`) are also exported. これらはラッパーまたは外側ロジック(マスクされた入力、日付値の解析や検証など)なしでレンダリングされます。

{{"demo": "pages/components/time-picker/SubComponentsTimePickers.js"}}

## Seconds

The seconds input can be used for selection of a precise time point.

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
