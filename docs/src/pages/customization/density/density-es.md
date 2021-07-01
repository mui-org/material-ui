# Densidad

<p class="description">Cómo aplicar densidad a los componentes de Material-UI.</p>

## Aplicando densidad

Esta sección explica cómo aplicar densidad. Las guias Material Design tienen una [guia extensa](https://material.io/design/layout/applying-density.html#typographic-density) que cubre estos temas con mayor detalle. Las guias Material Design tienen una [guia extensa](https://material.io/design/layout/applying-density.html#typographic-density) que cubre estos temas con mayor detalle.

## Implementando la densidad

Se puede aplicar una mayor densidad a algunos componentes por medio de propiedades. Las páginas de componentes tienen al menos un ejemplo usando el respectivo componente con una densidad mayor aplicada.

Dependiendo del componente, la densidad es aplicada usando menos espacio, o simplemente reduciendo su tamaño.

Los siguientes componentes tienen propiedades para aplicar una mayor densidad:

- [Button (Botón)](/api/button/)
- [Fab](/api/fab/)
- [FilledInput (Campo de entrada relleno)](/api/filled-input/)
- [FormControl (Control de formulario)](/api/form-control/)
- [FormHelperText (Texto de ayuda de formulario)](/api/form-helper-text/)
- [IconButton (Botón de ícono)](/api/icon-button/)
- [InputBase (Base para los campos de entrada)](/api/input-base/)
- [InputLabel (Etiqueta de campo de entrada)](/api/input-label/)
- [ListItem (Elemento de lista)](/api/list-item/)
- [OutlinedInput (Campo de entrada delineado)](/api/outlined-input/)
- [Table (Tabla)](/api/table/)
- [TextField](/api/text-field/)
- [Toolbar (Barra de herramientas)](/api/toolbar/)

## Explorar densidad del tema

Esta herramienta permite aplicar la densidad a través de espaciado de componentes y propiedades. Puedes navegar alrededor y ver cómo se aplica ésto a los componentes de Material-UI.

If you enable high density a custom theme is applied to the docs. This theme is only for demonstration purposes. You *should not* apply this theme to your whole application as this might negatively impact user experience. The [Material design guidelines](https://material.io/design/layout/applying-density.html#typographic-density) has examples for when not to apply density.

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
