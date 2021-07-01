# コンポジション

<p class="description">Material-UIは、構成をできるだけ簡単にしようとします。</p>

## ラッピングコンポーネント

最大限の柔軟性とパフォーマンスを提供するために、 コンポーネントが受け取る子要素の性質を知る方法が必要です。 To solve this problem, we tag some of the components with a `muiName` static property when needed.

ただし、拡張するためにコンポーネントをラップする必要がある場合があり、これは`muiName`ソリューションと競合する可能性があります。 コンポーネントをラップする場合は、そのコンポーネントにこの静的プロパティーが設定されているかどうかを確認します。

To find out if the Material-UI component you're using has this requirement, check out the the props API documentation for that component. さらに、親コンポーネントがラップされたコンポーネントプロパティをコントロールする必要がある場合があるため、プロパティを転送する必要があります。

例を見てみましょう：

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## Component プロパティ

Material-UIは、`component`プロパティによって、レンダリングされるルート要素を変更することが可能です。

### どのように機能しますか？

カスタマイズされたコンポーネントは Material-UI によって次にようにレンダリングされます。

```js
return React.createElement(props.component, props)
```

例えば、 デフォルトの`List`コンポーネントは、 `<ul>` 要素をレンダリングしますが、 これは[Reactのコンポーネント](https://reactjs.org/docs/components-and-props.html#function-and-class-components)に `component`プロパティを渡すことで変更できます。 次の例は、 `List` コンポーネントのルート要素を`<nav>` 要素としてレンダリングします。

```jsx
<List component="nav">
  <ListItem button>
    <ListItemText primary="Trash" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="Spam" />
  </ListItem>
</List>
```

この手法は非常に強力であり、あなたが使用したいと思っているルーティングやフォームなどの他のライブラリとの相互利用を可能とする優れた柔軟性を持っています。 しかし、 これには、**小さな警告を伴います！**

### インラインについての注意

Using an inline function as an argument for the `component` prop may result in **unexpected unmounting**, since a new component is passed every time React renders. Not only will React update the DOM unnecessarily, the ripple effect of the `ListItem` will also not work correctly.

```jsx
import { Link } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = props => <Link to={to} {...props} />;

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
```

⚠️ しかし、レンダリングされたコンポーネントを変更するためにインライン関数を使用している事から、React は `ListItemLink` がレンダリングされるたびにリンクのマウントを解除します。 ReactがDOMを不必要に更新するだけでなく、 `ListItem`の変更の波及も正しく動作しません。

解決方法はシンプルです。インライン関数を避け、代わりに、**静的なコンポーネントを`component` プロパティに渡します。** `CustomLink` が常に、同じコンポーネントを参照できるように、`ListItemLink` コンポーネントを変更しましょう。

```tsx
import { Link, LinkProps } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
        linkProps,
        ref,
      ) {
        return <Link ref={ref} to={to} {...linkProps} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
```

### プロパティ転送についての注意

プロパティの転送を利用して、コードをシンプルにする事ができます。 この例では、中間コンポーネントを作成しません。

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

しかし、この方法はプロパティの衝突から制限されます。 `component`プロパティを持つコンポーネントは、すべてのプロパティ(例：dense）をルート要素へ転送するわけではありません。

### TypeScriptの使用

詳細については、[TypeScript guide](/guides/typescript/#usage-of-component-prop)を参照してください。

## refsについての注意

このセクションでは、カスタムコンポーネントを `子要素` または `component` プロパティとして使用する場合の注意点について説明します。

一部のコンポーネントは DOM ノードにアクセスする必要があります。 以前は `ReactDOM.findDOMNode` を使用することで可能でしたが、 この関数は `ref` とrefの転送の登場から、非推奨となっています。 ただし、 `ref` が与えられるコンポーネント型は次のものだけです。

- Any Material-UI component
- class components i.e. `React.Component` or `React.PureComponent`
- DOM (or host) components e.g. `div` or `button`
- [React.forwardRef components](https://reactjs.org/docs/react-api.html#reactforwardref)
- [React.lazy components](https://reactjs.org/docs/react-api.html#reactlazy)
- [React.memo components](https://reactjs.org/docs/react-api.html#reactmemo)

If you don't use one of the above types when using your components in conjunction with Material-UI, you might see a warning from React in your console similar to:

> Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

Note that you will still get this warning for `lazy` and `memo` components if their wrapped component can't hold a ref. In some instances an additional warning is issued to help with debugging, similar to:

> Invalid prop `component` supplied to `ComponentName`. Expected an element type that can hold a ref.

Only the two most common use cases are covered. For more information see [this section in the official React docs](https://reactjs.org/docs/forwarding-refs.html).

```diff
-const MyButton = () => <div role="button" />;
+const MyButton = React.forwardRef((props, ref) =>
+  <div role="button" {...props} ref={ref} />);

<Button component={MyButton} />;
```

```diff
-const SomeContent = props => <div {...props}>Hello, World!</div>;
+const SomeContent = React.forwardRef((props, ref) => <div {...props} ref={ref}>Hello, World!</div>);
<Tooltip title="Hello, again."><SomeContent /></Tooltip>;
```

To find out if the Material-UI component you're using has this requirement, check out the the props API documentation for that component. If you need to forward refs the description will link to this section.

### Caveat with StrictMode

If you use class components for the cases described above you will still see warnings in `React.StrictMode`. `ReactDOM.findDOMNode` is used internally for backwards compatibility. You can use `React.forwardRef` and a designated prop in your class component to forward the `ref` to a DOM component. Doing so should not trigger any more warnings related to the deprecation of `ReactDOM.findDOMNode`.

```diff
class Component extends React.Component {
  render() {
-   const { props } = this;
+   const { forwardedRef, ...props } = this.props;
    return <div {...props} ref={forwardedRef} />;
  }
}

-export default Component;
+export default React.forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />);
```
