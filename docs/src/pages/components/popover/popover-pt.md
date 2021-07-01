---
title: Componente React Popover
components: Grow, Popover
githubLabel: 'component: Popover'
---

# Popover

<p class="description">Um Popover pode ser usado para exibir algum conteúdo em cima do outro.</p>

Coisas para saber ao usar o componente `Popover`:

- O componente é construído sobre o componente [`Modal`](/components/modal/).
- A rolagem e o clique fora não é permitido, ao contrário do componente [`Popper`](/components/popper/).

[A paleta](/system/palette/) com funções de estilo.

## Basic Popover

{{"demo": "pages/components/popover/BasicPopover.js" }}

## Âncora - Exemplo interativo

Use os botões de opção para ajustar as posições `anchorOrigin` e `transformOrigin`. Você também pode definir `anchorReference` para `anchorPosition` ou `anchorEl`. Quando configurado com `anchorPosition`, o componente irá, ao contrário de `anchorEl`, basear se nas propriedades do `anchorPosition`, na qual você pode ajustar para definir a posição do popover.

{{"demo": "pages/components/popover/AnchorPlayground.js", "hideToolbar": true}}

## Interação mouse em cima

This demo demonstrates how to use the `Popover` component and the mouseover event to achieve popover behavior.

{{"demo": "pages/components/popover/MouseOverPopover.js"}}

## Projetos Complementares

For more advanced use cases, you might be able to take advantage of:

### PopupState helper

Existe um pacote de terceiros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que cuida do estado popover para você na maioria das situações.

{{"demo": "pages/components/popover/PopoverPopupState.js"}}
