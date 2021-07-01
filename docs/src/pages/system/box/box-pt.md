---
title: Componente React Box
githubLabel: 'component: Box'
---

# Box

<p class="description">O componente Box serve como um componente encapsulador (wrapper) para a auxiliar na maioria das necessidades de uso com CSS.</p>

O component Box compõe [todas as funções de estilo](/system/basics/#all-inclusive) que são expostas no `@material-ui/system`.

[A paleta](/system/palette/) com funções de estilo.

## Exemplo

[A paleta](/system/palette/) com funções de estilo.

## A propriedade `sx`

All system properties are available via the [`sx` prop](/system/basics/#the-sx-prop). In addition, the `sx` prop allows you to specify any other CSS rules you may need. Aqui está um exemplo de como você pode usá-la:

{{"demo": "pages/system/box/BoxSx.js", "defaultCodeOpen": true }}

## Sobrescrevendo componentes do Material-UI

O componente Box envolve seu componente. Ele cria um novo elemento DOM, uma `<div>` por padrão, comportamento que pode ser modificado através da propriedade `component`. Digamos que você queira usar um `<span>`:

{{"demo": "pages/system/box/BoxComponent.js", "defaultCodeOpen": true }}

Isso funciona muito bem quando as alterações precisam ser isoladas em um novo elemento DOM. Note no exemplo, a forma que você alterou a margem.

No entanto, às vezes, você precisa modificar o elemento DOM subjacente. As an example, you may want to change the border of the Button. Por exemplo, você quer mudar a borda do botão. A herança por CSS não irá ajudar nesse caso. To workaround the problem, you can use the [`sx`](/system/basics/#the-sx-prop) prop directly on the child if it is a Material-UI component.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>Save</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Save</Button>
```

For non-Material-UI components, use the `component` prop.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <button>Save</button>
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
```

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Nome                                     | Tipo                                                                                                                          | Padrão                                  | Descrição                                                                               |
|:---------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:--------------------------------------------------------------------------------------- |
| <span class="prop-name">children</span>  | <span class="prop-type">node<br></span>                                                                                 |                                         | Função de renderização do Box ou nó.                                                    |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | O componente usado como nó raiz. Ou uma string para usar um elemento DOM ou componente. |
| <span class="prop-name">sx</span>        | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Aceita todas as propriedades do sistema, bem como quaisquer propriedades CSS válidas.   |

## System props

As a CSS utility component, the `Box` also supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Box mt={2}>
```
