---
title: React Dialog コンポーネント
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
githubLabel: 'component: Dialog'
materialDesign: https://material.io/components/dialogs
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal'
---

# Dialog

<p class="description">ダイアログは、タスクについてユーザーに通知します。重要な情報を含める、決定を求める、または複数のタスクを伴うことができます。</p>

Dialogは、重要な情報を提供したり決定を求めたりするために、アプリのコンテンツの前に表示される [モーダル](/components/modal/) ウィンドウの一種です。 ダイアログは表示されるとアプリのすべての機能を無効にし、確認、却下、または必要な操作が行われるまで画面に表示されたままになります。

ダイアログは意図的に中断されるので、慎重にに使用する必要があります。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 単純なダイアログ

単純なダイアログでは、リスト項目に関する詳細情報やアクションを追加できます。 たとえば、アバター、アイコン、明確なサブテキスト、または直交するアクション（アカウントの追加など）を表示できます。

タッチ機構:

- オプションを選択するとすぐにそのオプションが確定され、メニューが閉じます
- ダイアログの外側に触れるか、戻るを押すと、操作がキャンセルされてダイアログが閉じます。

{{"demo": "pages/components/dialogs/SimpleDialog.js"}}

## 通知

アラートは緊急の中断であり、確認を必要とし、状況をユーザーに知らせます。

ほとんどのアラートはタイトルを必要としません。 それらは一つか二つの文章で決定を次のように要約する。

- 質問する(例「この会話を削除しますか?」)
- アクションボタンに関連するステートメントを作る

タイトルバーの警告は、接続が切断される可能性があるなど、リスクの高い状況でのみ使用してください。 ユーザーは、タイトルとボタンテキストだけに基づいて選択を理解できる必要があります。

タイトルは必須入力です。

- 「USBストレージを消去しますか?」など、内容領域に明確な質問や説明を入力します。
- 「警告」や「よろしいですか」などの謝罪、あいまいさ、または質問を避けます。

{{"demo": "pages/components/dialogs/AlertDialog.js"}}

## Transitions

トランジションを入れ替えることもできます。次の例では、`Slide`. を使用します。

{{"demo": "pages/components/dialogs/AlertDialogSlide.js"}}

## フォームダイアログ

フォームダイアログを使用すると、ユーザーはダイアログ内のフォームフィールドに入力できます。 例えば、潜在的な登録者にメールアドレスを入力するように求める場合、登録者はメールアドレスフィールドに入力して 「送信」 をタッチすることができる。

{{"demo": "pages/components/dialogs/FormDialog.js"}}

## Customized dialogs

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

ダイアログボックスには、操作性を高めるために閉じるボタンが追加されています。

{{"demo": "pages/components/dialogs/CustomizedDialogs.js"}}

## Full-screen dialogs

{{"demo": "pages/components/dialogs/FullScreenDialog.js"}}

## オプションサイズ

ダイアログの最大幅を設定するには、列挙型の `maxWidth` と `fullWidth` ブール値を組み合わせて使用しします。 `fullWidth` プロパティがtrueの場合、ダイアログは `maxWidth`値に基づいて調整されます。

{{"demo": "pages/components/dialogs/MaxWidthDialog.js"}}

## レスポンシブ なfull-screen

[`useMediaQuery`](/components/use-media-query/#usemediaquery)を使用して、ダイアログを全画面表示にすることができます。

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return <Dialog fullScreen={fullScreen} />;
}
```

{{"demo": "pages/components/dialogs/ResponsiveDialog.js"}}

## 確認ダイアログ

確認ダイアログでは、オプションを確定する前にユーザーが選択内容を明示的に確認する必要があります。 たとえば、着信音選択ダイアログでユーザーはさまざまな着信音を聞くことができますが、「OK」ボタンをクリックした後にのみ、選択が完了したことを意味します。

確認ダイアログで「キャンセル」をタッチするか、「戻る」を押して操作をキャンセルすると、変更を破棄してダイアログを閉じます。

{{"demo": "pages/components/dialogs/ConfirmationDialog.js"}}

## ドラッグ可能なダイアログ

[react-draggable](https://github.com/mzabriskie/react-draggable)を使用して、ドラッグ可能なダイアログを作成できます。 [react-draggable](https://github.com/mzabriskie/react-draggable)を使用して、ドラッグ可能なダイアログを作成できます。 これを行うには、インポートした`Draggable`コンポーネントを `Dialog` コンポーネントの`PaperComponent` として渡します。 これによりダイアログ全体がドラッグ可能になります。 これによりダイアログ全体がドラッグ可能になります。 [react-draggable](https://github.com/mzabriskie/react-draggable)を使用して、ドラッグ可能なダイアログを作成できます。 これを行うには、インポートした`Draggable`コンポーネントを `Dialog` コンポーネントの`PaperComponent` として渡します。 これによりダイアログ全体がドラッグ可能になります。 これによりダイアログ全体がドラッグ可能になります。 [react-draggable](https://github.com/mzabriskie/react-draggable)を使用して、ドラッグ可能なダイアログを作成できます。 これを行うには、インポートした`Draggable`コンポーネントを `Dialog` コンポーネントの`PaperComponent` として渡します。 これによりダイアログ全体がドラッグ可能になります。 これによりダイアログ全体がドラッグ可能になります。 [react-draggable](https://github.com/mzabriskie/react-draggable)を使用して、ドラッグ可能なダイアログを作成できます。 これを行うには、インポートした`Draggable`コンポーネントを `Dialog` コンポーネントの`PaperComponent` として渡します。 これによりダイアログ全体がドラッグ可能になります。 これによりダイアログ全体がドラッグ可能になります。 これを行うには、インポートした`Draggable`コンポーネントを `Dialog` コンポーネントの`PaperComponent` として渡します。 これによりダイアログ全体がドラッグ可能になります。

{{"demo": "pages/components/dialogs/DraggableDialog.js"}}

## 長いコンテンツをスクロールする

ビューポートやデバイスに対してダイアログが長くなりすぎると、スクロールします。

- `scroll=paper`: paper要素内でダイアログボックスの内容がスクロールします。
- `scroll=body`: ダイアログの内容がbody要素内をスクロールします。

以下のデモを試してみてください。

{{"demo": "pages/components/dialogs/ScrollDialog.js"}}

## パフォーマンス

[Modal performance セクション](/components/modal/#performance) に従ってください。

## 制限事項

Follow the [Modal limitations section](/components/modal/#limitations).

## アクセシビリティ

[モーダルアクセシビリティのセクション](/components/modal/#accessibility)従ってください。
