---
title: Componente React Acesso Rápido
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: SpeedDial'
materialDesign: 'https://material.io/components/buttons-floating-action-button#types-of-transitions'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Acesso Rápido

<p class="description">Quando pressionado, um botão de ação flutuante pode exibir de três a seis ações relacionadas na forma de um acesso rápido.</p>

Se mais de seis ações forem necessárias, algo diferente de um BAF deve ser usado para apresentá-las.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Acesso rápido simples

O botão de ação flutuante pode exibir ações relacionadas.

{{"demo": "pages/components/speed-dial/BasicSpeedDial.js"}}

## Área de exemplos

{{"demo": "pages/components/speed-dial/PlaygroundSpeedDial.js"}}

## Ícone de fechamento customizado

Você pode fornecer um ícone alternativo para os estados de aberto e fechado usando as propriedades `icon` e `openIcon` do componente `SpeedDialIcon`.

Os SpeedDialActions podem exibir dicas de forma fixadas para que os usuários não precisem manter as ações pressionadas para ver a dica nos dispositivos de toque.

## Ícone de fechamento customizado

Você pode fornecer um ícone alternativo para os estados de aberto e fechado usando as propriedades `icon` e `openIcon` do componente `SpeedDialIcon`.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Dicas de ação fixadas

Os SpeedDialActions podem exibir dicas de forma fixadas para que os usuários não precisem manter as ações pressionadas para ver a dica nos dispositivos de toque.

A dica é ativada aqui em todos os dispositivos para fins de demonstração, mas em produção pode se usar uma lógica para definir condicionalmente a propriedade `isTouch`.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}

## Acessibilidade

### ARIA

#### Requerido

- Você deve fornecer um `ariaLabel` para o componente de acesso rápido.
- Você deve fornecer um `tooltipTitle` para cada ação do acesso rápido.

#### Fornecido

- O Fab possui os atributos `aria-haspopup`, `aria-expanded` e `aria-controls`.
- As ações de acesso rápido tem `role="menu"` e `aria-direction` definidos de acordo com a direção.
- As ações de acesso rápido tem `role="menuitem"`, e um atributo `aria-describedby` que faz referência à dica associada.

### Teclado

- O acesso rápido abre ao receber foco.
- As teclas de Espaço e Enter ativam a ação selecionado no acesso rápido, e alteram o estado de aberto do acesso rápido.
- As teclas do cursor movem o foco para a ação seguinte ou anterior do acesso rápido. (Note que qualquer direção do cursor pode ser usada inicialmente para abrir o acesso rápido. Isto permite o comportamento esperado para a orientação atual ou percebida do acesso rápido, por exemplo, para um leitor de tela que entende o acesso rápido como um menu suspenso.)
- A tecla de Escape fecha o acesso rápido e se uma ação do acesso rápido foi focada, retorna o foco para o seu botão de ação flutuante.
