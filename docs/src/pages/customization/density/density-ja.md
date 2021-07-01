# 密度(Density)

<p class="description">Material-UIコンポーネントに密度を適用する方法。</p>

## 密度を適用する

This section explains how to apply density. Material design ガイドラインには、これらのトピックの詳細を説明した[comprehensive guide](https://material.io/design/layout/applying-density.html#typographic-density) があります。 Material design ガイドラインには、これらのトピックの詳細を説明した[comprehensive guide](https://material.io/design/layout/applying-density.html#typographic-density) があります。

## 実装密度

一部のコンポーネントには、propsを使用して高密度を適用できます。 コンポーネントページ は、より高い密度が適用されたそれぞれのコンポーネントを使用した少なくとも1つの例があります。 一部のコンポーネントには、propsを使用して高密度を適用できます。 コンポーネントページ は、より高い密度が適用されたそれぞれのコンポーネントを使用した少なくとも1つの例があります。 一部のコンポーネントには、propsを使用して高密度を適用できます。 コンポーネントページ は、より高い密度が適用されたそれぞれのコンポーネントを使用した少なくとも1つの例があります。

コンポーネントに応じて、密度は間隔を小さくするか、単純に サイズを縮小します。

次のコンポーネントには、高密度を適用する propsがあります。

- [Button (ボタン)](/api/button/)
- [Fab](/api/fab/)
- [FilledInput](/api/filled-input/)
- [FormControl](/api/form-control/)
- [FormHelperText](/api/form-helper-text/)
- [IconButton](/api/icon-button/)
- [InputBase](/api/input-base/)
- [InputLabel](/api/input-label/)
- [ListItem](/api/list-item/)
- [OutlinedInput](/api/outlined-input/)
- [テーブル](/api/table/)
- [TextField](/api/text-field/)
- [ツールバー](/api/toolbar/)

## テーマ密度を調べる

このツールを使用すると、間隔とコンポーネントpropsによって密度を適用できます。 これがMaterial-UIコンポーネントの全体的な感触にどのように適用されるかを参照できます。 このツールを使用すると、間隔とコンポーネントpropsによって密度を適用できます。 これがMaterial-UIコンポーネントの全体的な感触にどのように適用されるかを参照できます。

高密度を有効にすると、カスタムテーマがドキュメントに適用されます。 このテーマは、デモンストレーションの目的でのみ です。 あなたはこのテーマをアプリケーション全体に適用 *すべきではありません* 。 ユーザーエクスペリエンスに悪影響を及ぼす可能性があります。 密度を適用しない場合の[Material designガイドライン例](https://material.io/design/layout/applying-density.html#typographic-density) があります。

テーマは、次のオプションで構成されます。

```js
const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        sizeSmall: {
          // Adjust spacing to reach minimal touch target hitbox
          marginLeft: 4,
          marginRight: 4,
          padding: 12,
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
    },
  },
});
```

{{"demo": "pages/customization/density/DensityTool.js", "hideToolbar": true}}
