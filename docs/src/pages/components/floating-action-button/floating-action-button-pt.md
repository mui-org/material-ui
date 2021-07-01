---
title: Componente React Botão de ação flutuante
components: Fab
githubLabel: 'component: Fab'
materialDesign: https://material.io/components/buttons-floating-action-button
---

# Botão de ação flutuante

<p class="description">Um botão de ação flutuante (BAF) realiza a principal, ou mais comum, ação na tela.</p>

Um [botão de ação flutuante](https://material.io/design/components/buttons-floating-action-button.html) aparece na frente de todo conteudo da tela, tipicamente em uma forma circular com um ícone em seu centro. BAFs podem ser de dois tipos: regular e estendido.

Use um BAF apenas se for a maneira mais adequada para apresentar a ação principal de uma tela. Only use a FAB if it is the most suitable way to present a screen's primary action.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Botão de ação flutuante

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Tamanho

By default, the size is `large`. Use the `size` prop for smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

{{"demo": "pages/components/floating-action-button/FloatingActionButtonExtendedSize.js"}}

## Animação

O botão de ação flutuante anima na tela como uma parte expansiva do material, por padrão.

Um botão de ação flutuante que abranja várias telas laterais (como telas com abas) deve desaparecer brevemente, então reaparecer se sua ação mudar.

A transição com Zoom pode ser usada para esta finalidade. Observe que, como as animações de entrada e saída são acionadas ao mesmo tempo, usamos `enterDelay` para permitir que a animação do botão de ação flutuante de saída termine antes que a nova seja inserida.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
