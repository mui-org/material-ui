---
title: Componente React Chip
components: Chip
githubLabel: 'component: Chip'
materialDesign: https://material.io/components/chips
---

# Chip

<p class="description">Chips são elementos compactos que representam uma entrada, atributo ou ação.</p>

[Chips](https://material.io/design/components/chips.html) permitirão que usuários insiram informações, façam seleções, filtrem conteúdo ou acionem gatilhos.

Embora incluído aqui como um componente independente, o uso mais comum será em alguma forma de entrada, portanto, alguns dos comportamentos demonstrados aqui não são mostrados considerando um contexto.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic chip

The `Chip` component supports outlined and filled styling.

{{"demo": "pages/components/chips/BasicChips.js"}}

## Chip actions

You can use the following actions.

- Chips with the `onClick` prop defined change appearance on focus, hover, and click.
- Chips with the `onDelete` prop defined will display a delete icon which changes appearance on hover.

### Clickeable

{{"demo": "pages/components/chips/ClickeableChips.js"}}

### Deleteable

{{"demo": "pages/components/chips/DeleteableChips.js"}}

### Clickeable and deleteable

{{"demo": "pages/components/chips/ClickeableAndDeleteableChips.js"}}

### Clickeable link

{{"demo": "pages/components/chips/ClickeableLinkChips.js"}}

### Custom delete icon

{{"demo": "pages/components/chips/CustomDeleteIconChips.js"}}

## Chip adornments

You can add ornaments to the beginning of the component.

Use the `avatar` prop to added a avatar or use the `icon` prop to added a icon.

### Avatar chip

{{"demo": "pages/components/chips/AvatarChips.js"}}

### Icon chip

{{"demo": "pages/components/chips/IconChips.js"}}

## Color chip

You can use the `color` prop to define a primary or secondary color.

{{"demo": "pages/components/chips/ColorChips.js"}}

## Sizes chip

Você pode usar a propriedade `size` para definir um Chip pequeno.

{{"demo": "pages/components/chips/SizesChips.js"}}

## Matriz de Chip (Array)

An example of rendering multiple chips from an array of values. Deletando um chip irá remove-lo da matriz. Note that since no `onClick` prop is defined, the `Chip` can be focused, but does not gain depth while clicked or touched.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Chip playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Acessibilidade

Se o Chip é deletável ou clicável, então é como um botão na ordem da tabulação. Quando o Chip está focado (ex. quando tabulando) pressionando (evento `keyup`) `Backspace` ou `Delete` irá chamar o evento manipulador `onDelete`, enquanto liberando com a tecla `Escape` irá tirar o foco do Chip.
