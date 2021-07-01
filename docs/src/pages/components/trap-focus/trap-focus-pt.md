---
title: Componente React para capturar foco
components: Unstable_TrapFocus
githubLabel: 'component: TrapFocus'
---

# Capturar foco

<p class="description">Capturar foco dentro de um nó DOM.</p>

TrapFocus é um componente que gerencia o foco para seus descendentes. This is useful when implementing overlays such as modal dialogs, which should not allow the focus to escape while open.

When `open={true}` the trap is enabled, and pressing <kbd class="key">Tab</kbd> or <kbd><kbd  class="key">Shift</kbd>+<kbd class="key">Tab</kbd></kbd> will rotate focus within the inner focusable elements of the component.

[A paleta](/system/palette/) com funções de estilo.

> ⚠️ O componente é experimental e instável.

## Exemplo

{{"demo": "pages/components/trap-focus/BasicTrapFocus.js"}}

## Unstyled

- 📦 [2.0 kB gzipped](https://bundlephobia.com/result?p=@material-ui/unstyled@next)

As the component does not have any styles, it also comes with the unstyled package.

```js
import TrapFocus from '@material-ui/unstyled/Unstable_TrapFocus';
```

## Desabilitar o forçar foco

Clicks within the focus trap behave normally, but clicks outside the focus trap are blocked.

Você pode desativar esse comportamento com a propriedade `disableEnforceFocus`.

{{"demo": "pages/components/trap-focus/DisableEnforceFocus.js"}}

## Ativação tardia

Por padrão, o componente move o foco para seus descendentes assim que abre: `open={true}`.

Você pode desabilitar esse comportamento e deixá-lo de forma tardia com a propriedade  `disableAutoFocus`. Quando o foco automático é desabilitado, como na demonstração abaixo, o componente só captura o foco quando ele for focado.

{{"demo": "pages/components/trap-focus/LazyTrapFocus.js"}}

## Portal

The following demo uses the [`Portal`](/components/portal/) component to render a subset of the trap focus children into a new "subtree" outside of the current DOM hierarchy; so that they no longer form part of the focus loop.

{{"demo": "pages/components/trap-focus/PortalTrapFocus.js"}}
