---
title: React Date Picker コンポーネント
components: CalendarPicker, CalendarPickerSkeleton, DatePicker, DesktopDatePicker, MobileDatePicker, MonthPicker, PickersDay, StaticDatePicker, YearPicker
githubLabel: 'component: DatePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Picker

<p class="description">Date pickers を使用すると、ユーザーが日付を選択できるようになります。</p>

Date pickers を使用すると、ユーザーが日付を選択できるようになります。 DatePickerは次のように表示されます:

- モバイル端末ではダイアログ
- デスクトップではテキストフィールドでのドロップダウン

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

{{"demo": "pages/components/date-picker/BasicDatePicker.js"}}

## static モード

It's possible to render any date picker without the modal/popover and text field. これは、カスタム popover/modal コンテナを構築するときに役立ちます。

{{"demo": "pages/components/date-picker/StaticDatePickerDemo.js", "bg": true}}

## レスポンシブ対応

DatePickerコンポーネントは実行されるデバイス用に設計および最適化されています。

- The `MobileDatePicker` component works best for touch devices and small screens.
- The `DesktopDatePicker` component works best for mouse devices and large screens.

By default, the `DatePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. これは  `desktopModeMediaQuery` プロパティでカスタマイズできます。

{{"demo": "pages/components/date-picker/ResponsiveDatePickers.js"}}

## Form props

The date picker component can be disabled or read-only.

{{"demo": "pages/components/date-picker/FormPropsDatePickers.js"}}

## Localization

DatePickerのレンダリングに使用される日付エンジンのロケールを変更するには `LocalizationProvider` を使用します。 `date-fns` アダプターのロケールを変更した例を以下に示します。

{{"demo": "pages/components/date-picker/LocalizedDatePicker.js"}}

## Jalali calendar system

Install `date-fns-jalali` and use `@date-io/date-fns-jalali` adapter to support [Jalali calendar](https://en.wikipedia.org/wiki/Jalali_calendar).

{{"demo": "pages/components/date-picker/JalaliDatePicker.js"}}

## playground を表示する

`年`、 `月`、および `日付` 選択ビューを組み合わせることができます。 ビューは配列 `views` に含まれる順序で表示されます。

{{"demo": "pages/components/date-picker/ViewsDatePicker.js"}}

## 横向き

For ease of use, the date picker will automatically change the layout between portrait and landscape by subscription to the `window.orientation` change. `orientation` プロパティを使用して特定のレイアウトを強制することができます。

{{"demo": "pages/components/date-picker/StaticDatePickerLandscape.js", "bg": true}}

## サブコンポーネント

Some lower-level sub-components (`CalendarPicker`, `MonthPicker`, and `YearPicker`) are also exported. これらはラッパーまたは外側ロジック(マスクされた入力、日付値の解析や検証など)なしでレンダリングされます。

{{"demo": "pages/components/date-picker/SubComponentsPickers.js"}}

## 入力コンポーネントのカスタマイズ

You can customize the rendering of the input with the `renderInput` prop. カスタム入力コンポーネントに `ref` と `inputProps` を正しく伝播させてください。

{{"demo": "pages/components/date-picker/CustomInput.js"}}

## 日付表示のカスタマイズ

表示される日付は `renderDay` プロパティに関数を与えることでカスタマイズできます。 You can take advantage of the [PickersDay](/api/pickers-day/) component.

{{"demo": "pages/components/date-picker/CustomDay.js"}}

## 動的なデータ

時々カレンダーに追加情報を表示しなければならない場合があります。 `onMonthChange`, `loading`, および `renderDay` プロパティを使用して、サーバー側のデータをプリフェッチして表示する例を示します。

{{"demo": "pages/components/date-picker/ServerRequestDatePicker.js"}}
