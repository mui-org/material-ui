---
title: 日付範囲入力コンポーネント
components: DateRangePicker, DateRangePickerDay, DesktopDateRangePicker, MobileDateRangePicker, StaticDateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# 日付範囲の入力[<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-pro/)

<p class="description">日付の範囲を選択することができます。</p>

> ⚠️ Pro component <br /><br /> The date range picker is intended for Material-UI X Pro, a commercial set of advanced components built on top of the community edition (MIT license). <br /><br /> この有料コンポーネントには、リッチなData Gridや、カレンダーによる日付範囲入力コンポーネント、ドラッグ&ドロップできるツリービューなどがあります。 お求めやすい価格にて[提供](https://material-ui.com/store/items/material-ui-pro/) しております。

日付範囲の入力コンポーネントを使うことによって、ユーザーは直感的に日付の範囲を選択できるようになります。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

このコンポーネントはあなたが選択した日付管理ライブラリに依存します。 [date-fns](https://date-fns.org/)、 [luxon](https://moment.github.io/luxon/)、 [dayjs](https://github.com/iamkun/dayjs)、 [moment](https://momentjs.com/) とパブリックな `dateAdapter` インターフェイスを持っている他のライブラリをサポートしています。

これらのライブラリのうちいずれかをインストールし、ルート（またはピッカーを使用できるようにする最高レベル）を`LocalizationProvider`でラップして、適切な日付エンジンを設定してください。

```jsx
// 以下のようにするか、 
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
//@material-ui/lab/dateAdapter/{dayjs,luxon,moment} を使うか、
//その他のdate-ioアダプターを設定してください

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
  );
}
```

## 基本的な用法

[DatePicker](/api/date-picker/)からほぼすべてのプロパティを渡すことができます。

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## static モード

It's possible to render any picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/date-range-picker/StaticDateRangePickerDemo.js", "bg": true}}

## レスポンシブ対応

DateRangePickerコンポーネントは実行されるデバイス用に最適化されるように設計されています。

- The `MobileDateRangePicker` component works best for touch devices and small screens.
- The `DesktopDateRangePicker` component works best for mouse devices and large screens.

By default, the `DateRangePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. これは  `desktopModeMediaQuery` プロパティでカスタマイズできます。 これは  `desktopModeMediaQuery` プロパティでカスタマイズできます。

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Form props

The date range picker component can be disabled or read-only.

{{"demo": "pages/components/date-range-picker/FormPropsDateRangePickers.js"}}

## 異なる月数の場合

`calendars`プロパティは、デスクトップモードでのみ動作します。

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## 日付の無効化

日付を無効化すると、単純な `DatePicker` と同じ動作をします。

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## 入力コンポーネントのカスタマイズ

`renderInput` プロパティを使用して入力欄の表示をカスタマイズできます。 `DateRangePicker` では **2 個の** パラメータ(開始と終了)が必要です。 カスタマイズした入力コンポーネントを使う場合は、 `ref` と `inputProps` を正しく入力コンポーネントに設定してください。

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## 日付表示のカスタマイズ

表示される日付は `renderDay` プロパティに関数を与えることでカスタマイズできます。 You can take advantage of the internal [DateRangePickerDay](/api/date-range-picker-day/) component.

{{"demo": "pages/components/date-range-picker/CustomDateRangePickerDay.js"}}
