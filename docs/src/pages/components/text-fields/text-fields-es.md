---
title: Componente de React Text Field
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
githubLabel: 'component: TextField'
materialDesign: https://material.io/components/text-fields
---

# Text Field (campo de texto)

<p class="description">Los campos de texto permiten a los usuarios ingresar y editar texto.</p>

[Text fields](https://material.io/design/components/text-fields.html) allow users to enter text into a UI. Generalmente se encuentran en formularios y diálogos.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic TextField

The `TextField` wrapper component is a complete form control including a label, input, and help text. It comes with three variants: outlined (default), filled, and standard.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**Nota:** La variante estándar de `TextField` no esta mas documentada en [guía Material Design](https://material.io/) ([Aquí esta el por que](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)), pero Material-UI continuara soportándolo.

## Propiedades del Form

Standard form attributes are supported e.g. `required`, `disabled`, `type`, etc. as well as a `helperText` which is used to give context about a field's input, such as how the input will be used.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validación

The `error` prop toggles the error state. The `helperText` prop can then be used to provide feedback to the user about the error.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multiline

The `multiline` prop transforms the text field into a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) or a [TextareaAutosize](/components/textarea-autosize/). Unless the `rows` prop is set, the height of the text field dynamically matches its content (using [TextareaAutosize](/components/textarea-autosize/)). You can use the `minRows` and `maxRows` props to bound it.

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Selección

The `select` prop makes the text field use the [Select](/components/selects/) component internally.

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Iconos

There are multiple ways to display an icon with a text field.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Adornos de campos de texto

The main way is with an `InputAdornment`. This can be used to add a prefix, a suffix, or an action to an input. This can be used to add a prefix, a suffix or an action to an input.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## Tamaños

Fancy smaller inputs? Use the `size` prop.

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

The `filled` variant input height can be further reduced by rendering the label outside of it.

{{"demo": "pages/components/text-fields/TextFieldHiddenLabel.js"}}

## Margin

The `margin` prop can be used to alter the vertical spacing of the text field. Using `none` (default) doesn't apply margins to the `FormControl` whereas `dense` and `normal` do.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Full width

`fullWidth` can be used to make the input take up the full width of its container.

{{"demo": "pages/components/text-fields/FullWidthTextField.js"}}

## Uncontrolled vs. Controlled

The component can be controlled or uncontrolled.

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Componentes

El componente `TextField` incluye y usa subcomponentes ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/) y [`FormHelperText`](/api/form-helper-text/) ) que pueden ser usados directamente para personalizar campos de ingreso de texto de manera sustancial.

Puede que también hayas notado que algunas propiedades nativas de input HTML no están presentes en el componente `TextField`. Esto es a propósito. The component takes care of the most used properties. Then, it's up to the user to use the underlying component shown in the following demo. Aun así, se puede utilizar `inputProps` (y las propiedades `InputProps` e `InputLabelProps`) para personalizar y evitar el código boilerplate.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Color

The `color` prop changes the highlight color of the text field when focused.

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## Inputs personalizados

Here are some examples of customizing the component. Puedes aprender más sobre esto en la [sección Personalizando Componentes de la documentación](/customization/how-to-customize/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

Customization does not stop at CSS. You can use composition to build custom components and give your app a unique feel. A continuación sigue un ejemplo del uso del componente [`InputBase`](/api/input-base/), inspirado por Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

🎨 Si buscas un poco de inspiración, puedes visitar [MUI Treasury's ejemplos de customizacion](https://mui-treasury.com/styles/text-field).

## `useFormControl`

For advanced customization use cases, a `useFormControl()` hook is exposed. This hook returns the context value of the parent `FormControl` component.

**API**

```jsx
import { useFormControl } from '@material-ui/core/FormControl';
```

**Regresa**

`value` (_object_):

- `value.adornedStart` (_bool_): Indicate whether the child `Input` or `Select` component has a start adornment.
- `value.setAdornedStart` (_func_): Setter function for `adornedStart` state value.
- `value.color` (_string_): The theme color is being used, inherited from `FormControl` `color` prop .
- `value.disabled` (_bool_): Indicate whether the component is being displayed in a disabled state, inherited from `FormControl` `disabled` prop.
- `value.error` (_bool_): Indicate whether the component is being displayed in an error state, inherited from `FormControl` `error` prop
- `value.filled` (_bool_): Indicate whether input is filled
- `value.focused` (_bool_): Indicate whether the component and its children are being displayed in a focused state
- `value.fullWidth` (_bool_): Indicate whether the component is taking up the full width of its container, inherited from `FormControl` `fullWidth` prop
- `value.hiddenLabel` (_bool_): Indicate whether the label is being hidden, inherited from `FormControl` `hiddenLabel` prop
- `value.required` (_bool_): Indicate whether the label is indicating that the input is required input, inherited from the `FormControl` `required` prop
- `value.size` (_string_): The size of the component, inherited from the `FormControl` `size` prop
- `value.variant` (_string_): The variant is being used by the `FormControl` component and its children, inherited from `FormControl` `variant` prop
- `value.onBlur` (_func_): Should be called when the input is blurred
- `value.onFocus` (_func_): Should be called when the input is focused
- `value.onEmpty` (_func_): Should be called when the input is emptied
- `value.onFilled` (_func_): Should be called when the input is filled

**Ejemplo**

{{"demo": "pages/components/text-fields/UseFormControl.js"}}

## Limitaciones

### Shrink

El estado "shrink" de la etiqueta del campo de texto no está siempre correcto. La etiqueta debe achicarse al momento que el campo demuestra algun texto. En algunas circunstancias, no se puede determinar el estado "shrink" (campo de números, campo de fecha y hora, campo de Stripe). Tal vez veas una superposición.

![shrink](/static/images/text-fields/shrink.png)

Para resolver el problema, puedes forzar el estado "shrink" de la etiqueta.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

o

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### Floating label

The floating label is absolutely positioned. It won't impact the layout of the page. Make sure that the input is larger than the label to display correctly.

### type="number"

Inputs of type="number" have potential usability issues:

- Allowing certain non-numeric characters ('e', '+', '-', '.') and silently discarding others and silently discarding others and silently discarding others and silently discarding others
- Si se está componiendo el componente:

and more - see [this article](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) by the GOV. UK Design System team for a more detailed explanation.

For number validation, one viable alternative is to use the default input type="text" with the _pattern_ attribute, for example:

```jsx
<TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
```

In the future, we might provide a [number input component](https://github.com/mui-org/material-ui/issues/19154).

### Helper text

The helper text prop affects the height of the text field. If two text fields are placed side by side, one with a helper text and one without, they will have different heights. For example:

{{"demo": "pages/components/text-fields/HelperTextMisaligned.js"}}

This can be fixed by passing a space character to the `helperText` prop:

{{"demo": "pages/components/text-fields/HelperTextAligned.js"}}

## Integration with 3rd party input libraries

Se pueden utilizar librerías externas para formatear un campo de texto. Para ello, hay que proporcionar una implementación personalizada del elemento `<input>` con el atributo `inputComponent`.

El siguiente demo utiliza las librerías [react-text-mask](https://github.com/text-mask/text-mask) y [react-number-format](https://github.com/s-yadav/react-number-format). The same concept could be applied to [e.g. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

The provided input component should expose a ref with a value that implements the following interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
const MyInputComponent = React.forwardRef((props, ref) => {
  const { component: Component, ...other } = props;

  // implement `InputElement` interface
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      // logic to focus the rendered component from 3rd party belongs here
    },
    // hiding the value e.g. react-stripe-elements
  }));

  // `Component` will be your `SomeThirdPartyComponent` from below
  return <Component {...other} />;
});

// usage
<TextField
  InputProps={{
    inputComponent: MyInputComponent,
    inputProps: {
      component: SomeThirdPartyComponent,
    },
  }}
/>;
```

## Accesibilidad

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure:

```jsx
<FormControl>
  <InputLabel htmlFor="mi-campo">Email</InputLabel>
  <Input id="mi-campo" aria-describedby="mi-texto-de-ayuda" />
  <FormHelperText id="mi-texto-de-ayuda">Nunca compartiremos tu email.</FormHelperText>
</FormControl>
```

- Si se usa el componente `TextField`, sólo hay que proporcionar un `id` único.
- Si se está componiendo el componente:

```jsx
<FormControl>
  <InputLabel htmlFor="mi-campo">Email</InputLabel>
  <Input id="mi-campo" aria-describedby="mi-texto-de-ayuda" />
  <FormHelperText id="mi-texto-de-ayuda">Nunca compartiremos tu email.</FormHelperText>
</FormControl>
```

## Proyectos relacionados

For more advanced use cases, you might be able to take advantage of:

- [mui-rff](https://github.com/lookfirst/mui-rff) Bindings for using Material-UI with [React Final Form](https://final-form.org/react).
- [formik-material-ui](https://github.com/stackworx/formik-material-ui): Bindings for using Material-UI with [formik](https://jaredpalmer.com/formik).
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui): Bindings for using Material-UI with [Redux Form](https://redux-form.com/).
- [mui-rff](https://github.com/lookfirst/mui-rff): Bindings for using Material-UI with [React Final Form](https://final-form.org/react).
