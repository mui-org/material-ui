# APIの設計アプローチ

<p class="description">Material-UIの使用方法については多くのことを学び、v1のリライトによってコンポーネントAPIを完全に再考することができました。</p>

> API設計が難しいのは、単純に見えるようにしても実際にはかなり複雑に見えるようにしたり、単純だが複雑に見えるようにしたりできるからです。

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

Api設計が難しいのは、単純に見えるようにしても実際にはかなり複雑に見えるようにしたり、単純だが複雑に見えるようにしたりできるからです。 組版機能を最大限に活用するため、低レベルのコンポーネントを提供しています。

## コンポジション

コンポーネントの構成に関してAPIに矛盾があることに気付いたかもしれません。 透過性を提供するために、APIを設計する際に次のルールを使用しています。 透過性を提供するために、APIを設計する際に次のルールを使用しています。

1. `children` プロパティの利用は、Reactで構成を行う慣用的な方法です。
2. 場合によっては、子どもの順序の入れ替えを許可する必要がない場合など、子どもの構成が限定されることもあります。 この場合、明示的なプロパティーを指定すると、実装がより単純になり、よりパフォーマンスが向上します。 ; たとえば、`Tab`は`アイコン`および`ラベル`プロパティを例に取ります。
3. APIの一貫性が重要です。

## ルール

上記の構成のトレードオフとは別に、次のルールを実施します。

### スプレッド

Props supplied to a component which are not explicitly documented are spread to the root element; for instance, the `className` prop is applied to the root.

ここで、`MenuItem`のリプルを無効にするとします。 スプレッド動作を利用できます。 スプレッド動作を利用できます。 スプレッド動作を利用できます。 スプレッド動作を利用できます。 スプレッド動作を利用できます。 スプレッド動作を利用できます。

```jsx
<MenuItem disableRipple />
```

`disableRipple` プロパティは次のように流れます：[`MenuItem`](/api/menu-item/) > [`ListItem`](/api/list-item/) > [`ButtonBase`](/api/button-base/) 。

### ネイティブプロパティ

提供されたドキュメント化されていないプロパティはルート要素に広がります; たとえば、[`className`](/customization/components/#overriding-styles-with-class-names)プロパティはルートに適用されます。

### CSS クラス

All components accept a [`classes`](/customization/how-to-customize/#overriding-styles-with-classes) prop to customize the styles. The classes design answers two constraints: to make the classes structure as simple as possible, while sufficient to implement the Material Design guidelines.

- ルート要素に適用されるクラスは、常に`root`と呼ばれます。
- 既定のスタイルはすべて1つのクラスにグループ化されます。
- 非ルート要素に適用されるクラスには、要素の名前の接頭辞が付きます（例：ダイアログコンポーネントの`paperWidthXs`） 。
- Enumプロパティ**によって適用されるバリアントはprifixされます**、(例：`color="primary"`プロパティによって適用される`colorPrimary`クラス)。
- The variants applied by an enum prop **are** prefixed, e.g. the `colorPrimary` class applied by the `color="primary"` prop.
- バリアントには** 1レベルの特異性があります** 。 `color`および`variant`プロパティは、variantと見なされます。 スタイルの特殊性が低いほど、オーバーライドが簡単になります。
- バリアント修飾子の特異性を高めます。 私たちは既に疑似クラス(`:hover`, `:focus`など。 )のためにそれをしなければなりません</strong>。 より多くの定型的なコストで、より多くの制御を可能にします。 もっと直感的になればいいのですが。

```js
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};
```

### ネストされたコンポーネント

コンポーネント内のネストされたコンポーネントには、次のものがあります。

- their own flattened properties when these are key to the top level component abstraction, for instance an `id` prop for the `Input` component.
- 独自の`xxxComponent`コンポーネントインジェクションを実行するためのプロパティ。
- their own `xxxComponent` prop for performing component injection.
- If you pass a different component via the `component` prop, the ref will be attached to that component instead. これは、[「DOM要素にアクセスするにはどうすればいいですか。 」](/getting-started/faq/#how-can-i-access-the-dom-element)という質問に答えるのに役立ちます。

### プロパティの命名

ブーリアン型のプロパティの名前は、**のデフォルト値**に基づいて選択する必要があります。 たとえば、入力エレメントの`disabled`属性を指定すると、デフォルトで`true`になります。 このオプションを選択すると、次のような省略表記が可能になります。

```diff
-<Input enabled={false} />
+<Input disabled />
```

### 制御されたコンポーネント

ほとんどの制御対象コンポーネントは、`値`および`onChange`プロパティによって制御されます。 ただし、ディスプレイ関連の状態には、`open`/`onClose`/`onOpen`の組み合わせが使用されます。 In the cases where there are more events, we put the noun first, and then the verb, for example: `onPageChange`, `onRowsChange`.

### boolean vs. enum

コンポーネントのバリエーションのためのAPIを設計するには、次の二つのオプションがあります。 *boolean*; または*enum*を使用します。 たとえば、異なるタイプのボタンを選択します。 各オプションには長所と短所があります。

- Option 1 *boolean*:

  ```tsx
  type Props = {
    contained: boolean;
    fab: boolean;
    };
  ```

  This API enables the shorthand notation: `<Button>`, `<Button contained />`, `<Button fab />`.

- Option 2 *enum*:

  ```tsx
  type Props = {
      variant: 'text' | 'contained' | 'fab';
    }
  ```

  このAPIはより冗長です： `<Button>`、`<Button variant="contained">`、`<Button variant="fab">`。

  However, it prevents an invalid combination from being used, bounds the number of props exposed, and can easily support new values in the future.

Material-UIコンポーネントは、次の規則に従って2つのアプローチの組み合わせを使用します。

- A *boolean* is used when **2** possible values are required.
- An *enum* is used when **> 2** possible values are required, or if there is the possibility that additional possible values may be required in the future.

Going back to the previous button example; since it requires 3 possible values, we use an *enum*.

### Ref

` ref `はルート要素に転送されます。 `ref`はルート要素に転送されます。 This means that, without changing the rendered root element via the `component` prop, it is forwarded to the outermost DOM element which the component renders. If you pass a different component via the `component` prop, the ref will be attached to that component instead.

## 用語集

- **host component**:`react-dom`のコンテキストにおけるDOMノードタイプ、例えば`'div'`。 If you pass a different component via the `component` prop, the ref will be attached to that component instead.
- **host element** ：`react-domのコンテキストのDOMノード`たとえば、`window.HTMLDivElementのインスタンス` 。
- **outermost**:コンポーネントツリーを上から下に読み込むときの最初のコンポーネントです。
- **root component** ：ホストコンポーネントをレンダリングする最も外側のコンポーネント。
- **root element**：ホストコンポーネントをレンダリングする最も外側の要素。
