---
title: React アラート コンポーネント
components: Alert, AlertTitle
githubLabel: 'component: Alert'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#alert'
---

# アラート

<p class="description">アラートは、ユーザのタスクを中断することなく、ユーザの注意を引き付けるような短く重要なメッセージを表示します。</p>

**注意:** このコンポーネントは [マテリアルデザインのガイドライン](https://material.io/)に記載されていませんが、Material-UI ではサポートしています。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本のアラートコンポーネント

このアラートは、特徴的なアイコンと色を設定する4つの重要度レベルを提供します。

{{"demo": "pages/components/alert/BasicAlerts.js"}}

## Description

`アラートタイトル` コンポーネントを使用して、書式付きタイトルをコンテンツの上に表示することができます。

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## アクション

アラートには、閉じるボタンや元に戻すボタンなどのアクションがあります。 これは、アラートの最後にメッセージの後にレンダリングされます。 これは、アラートの最後にメッセージの後にレンダリングされます。

`onClose` コールバックが指定されていて、 `アクション` プロパティが設定されていない場合は、閉じるアイコンが表示されます。 `アクション` プロパティは、ボタンや IconButtonなどの代替アクションを提供するために使用できます。 `アクション` プロパティは、ボタンや IconButtonなどの代替アクションを提供するために使用できます。

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### トランジション

[Collapse](/components/transitions/) のような `トランジションコンポーネント` を使用して、アラートの外観を遷移することができます。

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Icons

`アイコン` プロパティでは、アラートコンポーネントの先頭にアイコンを追加できます。 これは指定された重要度のデフォルトアイコンを上書きします。 これは指定された重要度のデフォルトアイコンを上書きします。 これは指定された重要度のデフォルトアイコンを上書きします。 これは指定された重要度のデフォルトアイコンを上書きします。 これは指定された重要度のデフォルトアイコンを上書きします。

`iconMapping` プロパティを使用して、デフォルトの重要度をアイコンマッピングに変更できます。 `iconMapping` プロパティを使用して、デフォルトの重要度をアイコンマッピングに変更できます。 [テーマカスタマイズ](/customization/globals/#default-props)を使用してグローバルに定義することができます。 `iconMapping` プロパティを使用して、デフォルトの重要度をアイコンマッピングに変更できます。 [テーマカスタマイズ](/customization/globals/#default-props)を使用してグローバルに定義することができます。 `iconMapping` プロパティを使用して、デフォルトの重要度をアイコンマッピングに変更できます。 [テーマカスタマイズ](/customization/globals/#default-props)を使用してグローバルに定義することができます。 [テーマをカスタマイズ](/customization/theme-components/#default-props)してグローバルに定義することができます。

icon プロパティ を `false` に設定すると、アイコンが全て削除されます。

{{"demo": "pages/components/alert/IconAlerts.js"}}

## バリアント

さらに2つのバリエーションがあります – アウトラインと塗りつぶし:

### アウトライン (Outlined)

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### 塗りつぶし

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## トースト

Snackbar を使ってアラートで [乾杯を表示](/components/snackbars/#customized-snackbars)できます。

## カラー

`色` プロパティは、指定された重要度のデフォルトの色を上書きします。

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

コンポーネントが動的に表示されると、ほとんどのスクリーンリーダーによってコンテンツが自動的に表示されます。 この時点で、スクリーンリーダーは、ページが読み込まれたときに存在するアラートをユーザーに知らせることはありません。

色を使って意味を加えることは視覚的な表示のみを提供し、スクリーンリーダーなどの支援技術の利用者には伝えられません。 色で示されている情報がコンテンツ自体から明らかになっていることを確認してください (例えば、目に見えるテキスト) または、隠されたテキストなどの代替手段によって含まれています。

アクションはキーボードのみのユーザーがアクセスできるように、タブインデックスが 0 である必要があります。
