# Density

<p class="description">How to apply density to Material UI components.</p>

## Applying density

This section explains how to apply density.
It doesn't cover potential use cases, or considerations for using density in your application.
The Material Design guidelines have a [comprehensive guide](https://m2.material.io/design/layout/applying-density.html) covering these topics in more detail.

## Implementing density

Higher density can be applied to some components via props. The component pages
have at least one example using the respective component with higher density applied.

Depending on the component, density is applied either via lower spacing, or simply by
reducing the size.

The following components have props applying higher density:

- [Button](/material-ui/api/button/)
- [Fab](/material-ui/api/fab/)
- [FilledInput](/material-ui/api/filled-input/)
- [FormControl](/material-ui/api/form-control/)
- [FormHelperText](/material-ui/api/form-helper-text/)
- [IconButton](/material-ui/api/icon-button/)
- [InputBase](/material-ui/api/input-base/)
- [InputLabel](/material-ui/api/input-label/)
- [ListItem](/material-ui/api/list-item/)
- [OutlinedInput](/material-ui/api/outlined-input/)
- [Table](/material-ui/api/table/)
- [TextField](/material-ui/api/text-field/)
- [Toolbar](/material-ui/api/toolbar/)

## Explore theme density

This tool allows you to apply density via spacing and component props. You can browse
around and see how this applies to the overall feel of Material UI components.

If you enable high density a custom theme is applied to the docs. This theme is only
for demonstration purposes. You _should not_ apply this theme to your whole application
as this might negatively impact user experience. The [Material Design guidelines](https://m2.material.io/design/layout/applying-density.html) has examples
for when not to apply density.

The theme is configured with the following options:

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

{{"component": "file://./demos/tool/index.ts", "hideToolbar": true}}
