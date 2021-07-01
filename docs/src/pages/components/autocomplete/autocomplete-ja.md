---
title: React 入力補完 コンポーネント
components: TextField, Popper, Autocomplete
githubLabel: 'component: Autocomplete'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#combobox'
---

# Autocomplete

<p class="description">オートコンプリートは、推奨オプションのパネルによって強化された通常のテキスト入力です。</p>

ウィジェットは、単一行テキストボックスの値を設定する際に以下の2通りの状況で役に立ちます。

1. テキストボックスの値が、予め決められた許容値の中から選ばないといけない場合。 例えば、位置の欄は [combo box](#combo-box)の中から選ばなければなりません。
2. テキストボックスが任意の値を含む可能性があるが、ユーザーに可能性のある値の提案をすることが有効な場合。例えば、検索欄で近い、又は、以前の検索結果を示してユーザーの時間を節約する。[free solo](#free-solo).

"react-select"と"downshift"というパッケージの改良版であることを意識しています。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Combo box

テキストボックスの値は、予め決められた許容値の中から選ばないといけない

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### オプション

デフォルトでは、以下のオプションが設定可能です。

```ts
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

例えば：

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

ただし、 `getOptionLabel` プロパティを使用することで、異なる構造を使用することができます。

### Playground

Each of the following examples demonstrates one feature of the Autocomplete component.

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Country select

248の国から一つ選びます。

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

### Controlled states

コンポーネントは、操作できる二つのステートを持ちます。

1. "value"ステートは `value`/`onChange` を組み合わせて使用します。 ユーザーが<kbd class="key">Enter</kbd>キーを押している場合、この値はEnterになります。
2. "input value"ステートは`inputValue`/`onInputChange` を組み合わせて使用します。 この値は、テキストボックスに表示される値を示します。 この値は、テキストボックスに表示される値を示します。 この値は、テキストボックスに表示される値を示します。 この値は、テキストボックスに表示される値を示します。

> ⚠️ These two states are isolated, they should be controlled independently.

{{"demo": "pages/components/autocomplete/ControllableStates.js"}}

## Free solo

`freeSolo`をtureにすることで、テキストボックスに任意の値を含むことができます。

### Search input

Google searchやreact-autowhateverなどの検索候補が表示されるような**検索ボックス**に使われることを想定して設計されています。

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Creatable

このモードを[combo box](#combo-box)のような体験(selectの拡張版) に使う意図であれば、以下のような設定をお勧めします。

- `selectOnFocus`でユーザーが選択した値を消せるようにする。
- `clearOnBlur` でユーザーが新しい値を入力できるようにする。
- `handleHomeEndKeys`を使えば、ポップアップ内で<kbd class="key">Home</kbd>キーや<kbd class="key">End</kbd>キーを使ってフォーカスが移動できるようになります。
- 最後の選択肢に, 例えば`Add "YOUR SEARCH"`を追加する。

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

ユーザーが新しい値を入力する時に、ダイアログを表示することもできます。

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## Grouped

`groupBy` プロパティを使えば、選択肢をグループ化できます。 これを使う場合、グループ化される選択肢は同じ順序でソートされたものにしてください。そうしないと、ヘッダーが重複してしまいます。

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Disabled options

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

For advanced customization use cases, a headless `useAutocomplete()` hook is exposed. JSXのレンダリングに関連する値以外は、Autocompleteコンポーネントとほぼ同じ値をとります。 Autocompleteコンポーネントは内部でこのhookを使用しています。 Autocompleteコンポーネントは内部でこのhookを使用しています。 The Autocomplete component is built on this hook.

```jsx
import useAutocomplete from '@material-ui/core/useAutocomplete';
```

- 📦 [4.5 kB gzipped](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Customized hook

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

Head to the [Customized Autocomplete](#customized-autocomplete) section for a customization example with the `Autocomplete` component instead of the hook.

## 非同期リクエスト

2つの異なる非同期のユースケースをサポートしています:

- [開いてロード](#load-on-open): 選択肢をロードするのにコンポーネントが操作されるのを待ちます。
- [入力して検索](#search-as-you-type): キーストロークごとに新しいリクエストが行われます。

### 開いてロード

ネットワークリクエストがペンディング中であるとき、進行状況を表示します。

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### 入力して検索

キーストロークごとに新しい選択肢をフェッチし、現在のテキストボックスの値を使用してサーバー上でフィルタリングする場合、リクエストの抑制をしたいかもしれません。

さらに、 `filterOptions` プロパティを 上書きすることで、 `Autocomplete` コンポーネントの組み込みフィルタリングを無効にする必要があります。

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

### Google Maps place

Google マップの位置の自動保管用のカスタムUI

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

このデモでは、 [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial) APIをロードする必要があります。

> Google Maps JavaScript APIを使用する前に、サインアップして、決済アカウントを作成する必要があります。

## Multiple values

タグとも呼ばれ、ユーザーは複数の値を入力することができます。

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Fixed options

インターフェースから削除されないように、特定のタグを固定する必要があるイベント中、チップスを無効化することができます。

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Checkboxes

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

### Limit tags

`limitTags` でフォーカスしていない時に表示する選択肢の数に上限を設けられます。

{{"demo": "pages/components/autocomplete/LimitTags.js"}}

## サイズ

小さい入力欄が好きですか？ `size`propを使用します。

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## カスタマイズ

### Custom input

`renderInput`でレンダリングされる入力をカスタマイズできます。 このrender propsの一つ目の引数は、継承する必要のあるpropsを含みます。 `ref` と `inputProps` の扱いに特に注意してください。

{{"demo": "pages/components/autocomplete/CustomInputAutocomplete.js"}}

### GitHub's picker

GitHubのラベルピッカーを再現したデモです。

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

[Customized hook](#customized-hook) 部分で、 コンポーネントの代わりに、`useAutocomplete`hookを使用したカスタマイズ例が見れます。

## Highlights

以下のデモは[autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight)に依存しています。提案されたテキストや自動保管コンポーネントをハイライトする小さいサイズの(1 kB)ユーティリティ

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Custom filter

コンポーネントは `filterOptions` プロパティに提供できるフィルタメソッドを作成するためのファクトリを公開しています。 デフォルトのフィルター挙動を変更するのに使うことができます。

```js
import { createFilterOptions } from '@material-ui/core/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### 引数

1. `config` (_object_ [optional]):

- `config.ignoreAccents` (_bool_ [optional]): Defaults to `true`. 発音記号を削除する
- `config.ignoreCase` (_bool_ [optional]): Defaults to `true`. すべて小文字にする。
- `config.limit` (*number* [optional]): Default to null. 表示される推奨オプションの数を制限する。 例えば、 `config.limit` が `100`の時、頭の`100`個のマッチングオプションのみが表示されます。 バーチャライズせずに、大量の選択肢を扱うのに有効です。
- `config.matchFrom` (*'any' | 'start'* [optional]): Defaults to `'any'`.
- `config.stringify` (*func* [optional]): Controls how an option is converted into a string so that it can be matched against the input text fragment.
- `config.trim` (_bool_ [optional]): Defaults to `false`. 末尾のスペースを削除します。

#### 戻り値

`filterOptions`: 返り値のフィルターメソッドは、`Autocomplete`コンポーネントの`filterOptions`propに直接渡すことができます。hookにも渡すことができます。

以下のデモでは、選択肢が前方一致する必要があります。

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### 高度な機能(Advanced)

Fuzzy matchingのような高度なメカニズムについては  [match-sorter](https://github.com/kentcdodds/match-sorter) を見ることをおすすめします。 例えば：

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Virtualization

10,000のランダム生成された選択肢内で検索します。 リストは [react-window](https://github.com/bvaughn/react-window) によって仮想化されています。

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## イベント

デフォルトのキーハンドラの動作を防止したい場合は、イベントの `defaultMuiPrevented` プロパティを `true` に設定します。

```jsx
<Autocomplete
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      // 'Enter' のデフォルトの動作を防止する。
      event.defaultMuiPrevented = true;
      // your handler code
    }
  }}
/>
```

## 制限事項

### autocomplete/autofill

Browsers have heuristics to help the user fill in form inputs. However, this can harm the UX of the component.

By default, the component disables the input **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute. Google Chromeは現在、この属性設定をサポートしていません ([Issue 587466](https://bugs.chromium.org/p/chromium/issues/detail?id=587466)). 可能な回避策は、コンポーネントにランダムなものを生成させるために `id` を削除することです。

入力された過去の値を記憶することに加えて、ブラウザは **autofill** (保存されたログイン、アドレス、または支払いの詳細) をサジェストするかもしれません。 autofillを避けたい場合、以下の方法を取れます。

- ブラウザが判断できない命名を入力欄に使う。 例: `id="country"`の代わりに、`id="field1"`を使う idを空にした場合、コンポーネントはランダムなidを保管します。
- `autoComplete="new-password"` に設定する。 (一部のブラウザはこの属性設定使うと入力用の強力なパスワードを提案します):

  ```jsx
  <TextField
    {...params}
    inputProps={{
      ...params.inputProps,
      autoComplete: 'new-password',
    }}
  />
  ```

詳細は [MDNのガイド](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) を参照してください。

### iOS VoiceOver

iOS Safariのボイスオーバーは`aria-owns` を十分にサポートしていません。 `disablePortal`を用いて、この問題を回避できます。 `disablePortal`を用いて、この問題を回避できます。 `disablePortal`を用いて、この問題を回避できます。 `disablePortal`を用いて、この問題を回避できます。

### ListBox コンポーネント

`Listbox コンポーネント` のカスタムプロパティを提供する場合、意図するスクロールコンテナの `role` 属性として `listbox` が設定されていることを確認する必要があります。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

テキストボックスに対して、ラベルの使用を奨励しています。 コンポーネントは WAI-ARIA オーサリングを実装しています。
