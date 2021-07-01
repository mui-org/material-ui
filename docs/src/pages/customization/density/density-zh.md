# Density 密度

<p class="description">如何为 Material-UI 组件设置自定义的密度。</p>

## 使用密度

本节解释了如何应用密度。 这不包括一些潜在的用例，也不包括在应用程序中使用密度的注意事项。 在 Material design 规范中有一个 [全面的指南](https://material.io/design/layout/applying-density.html#typographic-density)，它详细地介绍了本章的内容。

## 实现密度（density）

通过给设置某些组件的属性，可以得到更大的密度。 组件页面至少有一个例子，它使用各自的组件并具有较大的密度。

对于不同的组件，可以通过缩小组件的间距（spacing）或简单地减小组件的尺寸（size）来应用密度。

以下组件有一些能够达到较大密度的属性：

- [Button](/api/button/)
- [Fab](/api/fab/)
- [FilledInput](/api/filled-input/)
- [FormControl](/api/form-control/)
- [FormHelperText](/api/form-helper-text/)
- [IconButton](/api/icon-button/)
- [InputBase](/api/input-base/)
- [InputLabel](/api/input-label/)
- [ListItem](/api/list-item/)
- [OutlinedInput](/api/outlined-input/)
- [Table](/api/table/)
- [TextField](/api/text-field/)
- [Toolbar](/api/toolbar/)

## 探索主题的密度

该工具允许您可以来通过 spacing 和 component 属性来应用密度。 您可以浏览一下，看看在 Material-UI 组件上使用后的整体感觉如何。

如果您启用了较大的密度，那么一个自定义的主题将被应用到当前的文档中。 该主题仅为演示使用。 您 _不应该_ 将此主题应用在整个应用程序中，因为这可能会对用户的体验产生一些负面影响。 在 [Material design 规范](https://material.io/design/layout/applying-density.html#typographic-density) 的示例中，列举了不应该使用密度的情景。

主题配置有以下选项：

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
