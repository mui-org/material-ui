# Spacing

<p class="description">theme.spacing()　ヘルパーを使用して、 UIの要素間の間隔を一定にします。</p>

Material-UI uses [a recommended 8px scaling factor](https://material.io/design/layout/understanding-layout.html) by default.

```js
const theme = createTheme();

theme.spacing(2); // `${8 * 2}px` = '16px'
```

## Custom spacing

間隔の変換は、次の方法で変更できます。

- 数値

```js
const theme = createTheme({
  spacing: 4,
});

theme.spacing(2); // `${4 * 2}px` = '8px'
```

- 関数

```js
const theme = createTheme({
  spacing: (factor) => `${0.25 * factor}rem`, // (Bootstrap strategy)
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px
```

- 配列

```js
const theme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64],
});

theme.spacing(2); // = '8px'
```

## Multiple arity

`theme.spacing()` ヘルパーは最大4つの引数を受け入れます。 引数を使用すると、ボイラープレートを減らすことができます。

```diff
-padding: `${theme.spacing(1)} ${theme.spacing(2)}`, // '8px 16px'
+padding: theme.spacing(1, 2), // '8px 16px'
```

文字列値のミキシングもサポートされています:

```js
margin: theme.spacing(1, 'auto'), // '8px auto'
```
