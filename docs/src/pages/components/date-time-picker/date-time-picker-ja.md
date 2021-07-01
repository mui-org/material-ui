---
title: React Date Time Picker コンポーネント
components: DateTimePicker,DesktopDateTimePicker,MobileDateTimePicker,StaticDateTimePicker
githubLabel: 'component: DateTimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Time Picker

<p class="description">日付と時刻の入力コンポーネントが組み合わさったものです。</p>

このコンポーネントは、日付と時間のピッカーが合体したものです。 これにより、一つのコンポーネントで日付と時刻の両方を選択できます。

このコンポーネントが [DatePicker](/components/date-picker/) と [TimePicker](/components/time-picker/) が組み合わさっているものだということに注意してください。つまりそれらのコンポーネントのプロパティはDateTimePickerにも渡すことができます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

このコンポーネントはあなたが選択した日付管理ライブラリに依存します。 [date-fns](https://date-fns.org/)、 [luxon](https://moment.github.io/luxon/)、 [dayjs](https://github.com/iamkun/dayjs)、 [moment](https://momentjs.com/) とパブリックな `dateAdapter` インターフェイスを持っている他のライブラリをサポートしています。

これらのライブラリのうちいずれかをインストールし、ルート（またはピッカーを使用できるようにする最高レベル）を`LocalizationProvider`でラップして、適切な日付エンジンを設定してください。

```jsx
// または @material-ui/lab/Adapter{Dayjs,Luxon,Moment} や任意の有効な date-io アダプター
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## 基本的な用法

日付と時刻を選択できます。 年、日付、時間、分の4つのステップが利用できるため、日付/時刻のステップを視覚的に区別するためにタブが必要です。

{{"demo": "pages/components/date-time-picker/BasicDateTimePicker.js"}}

## レスポンシブ対応

`DateTimePicker`コンポーネントは実行されるデバイス用に設計および最適化されています。

- The `MobileDateTimePicker` component works best for touch devices and small screens.
- The `DesktopDateTimePicker` component works best for mouse devices and large screens.

By default, the `DateTimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. これは  `desktopModeMediaQuery` プロパティでカスタマイズできます。

{{"demo": "pages/components/date-time-picker/ResponsiveDateTimePickers.js"}}

## Form props

The date time picker component can be disabled or read-only.

{{"demo": "pages/components/date-time-picker/FormPropsDateTimePickers.js"}}

## 日付と時刻のバリデーション

日付と時刻の選択を2つの方法で制限することができます:

- `minDateTime`/`maxDateTime` を使用しで、時間の選択を特定の時間の前後に制限する
- `minTime`/`maxTime`を使用して、毎日一定の時間前後の選択を無効にする

{{"demo": "pages/components/date-time-picker/DateTimeValidation.js"}}

## static モード

It's possible to render any date & time picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/date-time-picker/StaticDateTimePickerDemo.js", "bg": true}}

## カスタマイズ

多くの部分でカスタマイズされた日付 & 時間ピッカーの例をいくつか紹介します:

{{"demo": "pages/components/date-time-picker/CustomDateTimePicker.js"}}
