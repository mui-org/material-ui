---
title: Componente React para Campo de Texto
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
githubLabel: 'component: TextField'
materialDesign: https://material.io/components/text-fields
---

# Campo de texto

<p class="description">Campos de texto permitem que os usuários digitem e editem texto.</p>

[Campos de texto](https://material.io/design/components/text-fields.html) permitem que os usuários insiram texto em uma interface de usuário. Eles geralmente aparecem em formulários e diálogos.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic TextField

The `TextField` wrapper component is a complete form control including a label, input, and help text. It comes with three variants: outlined (default), filled, and standard.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

Os atributos são suportados pelo `TextField`, como por exemplo `required`, `disabled`, `type`, etc. assim como o `helperText` que é utilizada para dar contexto sobre um campo de entrada, tais como, a entrada que será usada.

## Propriedades de formulário

Standard form attributes are supported e.g. `required`, `disabled`, `type`, etc. as well as a `helperText` which is used to give context about a field's input, such as how the input will be used.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validação

The `error` prop toggles the error state. The `helperText` prop can then be used to provide feedback to the user about the error.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multilinha

A propriedade `multiline` transforma o `textfield` em um `<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">TextArea</a>.
Unless the`rows`prop is set, the height of the text field dynamically matches its content (using [TextareaAutosize](/components/textarea-autosize/)).
You can use the <code>minRows` and `maxRows` props to bound it.

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Seleção

A propriedade `select` faz com que o campo de texto use internamente um componente [Select](/components/selects/).

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Ícones

Há muitas formas de incluir um ícone com um campo de texto.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Adereços de campo

A forma principal é utilizando um componente `InputAdornment`. This can be used to add a prefix, a suffix, or an action to an input. Por exemplo, você pode usar um botão com ícone para ocultar ou revelar a senha.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## Tamanhos

Gosta mais de campos de texto menores? Use a propriedade `size`.

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

A altura do campo na variante `filled` pode ser reduzida ainda mais ao renderizar o rótulo fora dele.

{{"demo": "pages/components/text-fields/TextFieldHiddenLabel.js"}}

## Margin

The `margin` prop can be used to alter the vertical spacing of the text field. Using `none` (default) doesn't apply margins to the `FormControl` whereas `dense` and `normal` do.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Largura total

A propriedade `fullWidth` pode ser usada para fazer com que o campo ocupe a largura total de seu contêiner.

{{"demo": "pages/components/text-fields/FullWidthTextField.js"}}

## Uncontrolled vs. Controlled

O componente pode ser controlado ou não controlado.

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Componentes

O componente `TextField` é composto por componentes menores ([`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), e [`FormHelperText`](/api/form-helper-text/)) que você pode aproveitar diretamente para customizar significativamente os campos do seu formulário.

Você também pode ter notado que algumas propriedades de campo nativas do HTML input estão faltando no componente `TextField`. Isto é intencional. The component takes care of the most used properties. Then, it's up to the user to use the underlying component shown in the following demo. Ainda, você pode usar `inputProps` (`InputProps` e `InputLabelProps`) se você quiser evitar algum boilerplate.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Campos

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Cor

A propriedade `color` altera a cor do destaque do campo de texto quando focado.

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## Campos customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

Customization does not stop at CSS. You can use composition to build custom components and give your app a unique feel. Abaixo há um exemplo usando o componente [`InputBase`](/api/input-base/), inspirado pelo Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/text-field).

## `useFormControl`

For advanced customization use cases, a `useFormControl()` hook is exposed. This hook returns the context value of the parent `FormControl` component.

**API**

```jsx
import { useFormControl } from '@material-ui/core/FormControl';
```

**Retornos**

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

**Exemplo**

{{"demo": "pages/components/text-fields/UseFormControl.js"}}

## Limitações

### Shrink

O rótulo do campo no estado de "shrink"(recuo) nem sempre está correto. O rótulo do campo deve recuar assim que o campo estiver exibindo algo. Em algumas circunstâncias, não podemos determinar o estado de "shrink" (input numérico, input datetime, input Stripe). Você pode notar uma sobreposição.

![shrink](/static/images/text-fields/shrink.png)

Para contornar o problema, você pode forçar o "shrink" do rótulo.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

ou

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### Rótulo flutuante

The floating label is absolutely positioned. It won't impact the layout of the page. Make sure that the input is larger than the label to display correctly.

### type="number"

Campos com type="number" tem problemas potenciais de usabilidade:

- Permitindo certos caracteres não numéricos ('e', '+', '-', '.') e silenciosamente descartando outros e silenciosamente descartando outros e silenciosamente descartando outros
- A funcionalidade de rolagem para incrementar/decrementar o número, pode causar alterações acidentais difíceis de notar

e muito mais - consulte [este artigo](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) da equipe GOV.UK Design System para obter uma explicação mais detalhada.

Para validação de número, uma alternativa viável é usar o padão de campo, type="text", com o atributo _pattern_, por exemplo:

```jsx
<TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
```

No futuro, pretendemos fornecer um [componente de campo número](https://github.com/mui-org/material-ui/issues/19154).

### Texto auxiliar

A propriedade de texto auxiliar afeta a altura do campo de texto. Se dois campos de texto forem colocados lado a lado, um com um texto auxiliar e outro sem ele, terão alturas diferentes. Por exemplo:

Para usos mais avançados, você pode tirar vantagem com:

Isso pode ser corrigido passando um caractere de espaço para a propriedade `helperText`:

{{"demo": "pages/components/text-fields/HelperTextAligned.js"}}

## Integração com bibliotecas de campo de terceiros

Você pode usar bibliotecas de terceiros para formatar um campo. Você precisa fornecer uma implementação personalizada do elemento `<input>` com a propriedade `inputComponent`.

A seguinte demonstração usa as bibliotecas [react-text-mask](https://github.com/text-mask/text-mask) e [react-number-format](https://github.com/s-yadav/react-number-format). O mesmo conceito pode ser aplicado para, [p. ex. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

O componente de entrada fornecido deve expor um ref com um valor que implemente a seguinte interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
const MyInputComponent = React.forwardRef((props, ref) => {
  const { component: Component, ...other } = props;

  // implemente a interface`InputElement`
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      // lógica para focar o componente de terceiro renderizado deve ser feita aqui
    },
    // ocultando o valor, por exemplo, react-stripe-elements
  }));

  // O `Component` abaixo será seu `AlgumComponenteDeTerceiro`
  return <Component {...other} />;
});

// uso
<TextField
  InputProps={{
    inputComponent: MyInputComponent,
    inputProps: {
      component: SomeThirdPartyComponent,
    },
  }}
/>;
```

## Acessibilidade

Para que o campo de texto seja acessível, **a entrada deve estar vinculada ao rótulo e ao texto auxiliar**. Os nós DOM subjacentes devem ter essa estrutura:

```jsx
<div class="form-control">
  <label for="my-input">Endereço de e-mail</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Nós nunca compartilharemos seu e-mail.</span>
</div>
```

- Se você estiver usando o componente `TextField`, basta fornecer um `id` único.
- Se você está compondo o componente:

```jsx
<div class="form-control" mark="crwd-mark">
  <label for="my-input">Endereço de e-mail</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Nós nunca compartilharemos seu e-mail.</span>
</div>
```

## Projetos Complementares

For more advanced use cases, you might be able to take advantage of:

- [react-hook-form](https://react-hook-form.com/): React hook para validação de formulários.
- [formik-material-ui](https://github.com/stackworx/formik-material-ui): Bindings para usar Material-UI com [formik](https://jaredpalmer.com/formik).
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui): Bindings para usar Material-UI com [Redux Form](https://redux-form.com/).
- [mui-rff](https://github.com/lookfirst/mui-rff): Bindings para usar Material-UI com [React Final Form](https://final-form.org/react).
