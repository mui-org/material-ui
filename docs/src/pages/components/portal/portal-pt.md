---
title: Componente React Portal
components: Portal
githubLabel: 'component: Portal'
---

# Portal

<p class="description">O componente portal renderiza seus elementos filho em uma nova "subárvore" fora da hierarquia do DOM atual.</p>

O filho do componente portal será adicionado ao `container` especificado. O componente é usado internamente pelos componentes [`Modal`](/components/modal/) e [`Popper`](/components/popper/).

[A paleta](/system/palette/) com funções de estilo.

## Exemplo

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Do lado do servidor

React [não suporta](https://github.com/facebook/react/issues/13097) a API [`createPortal()`](https://pt-br.reactjs.org/docs/portals.html) no servidor. Você deve esperar pelo lado do cliente fazer a hidratação para ver o filho.

## Unstyled

- 📦 [970 B gzipped](https://bundlephobia.com/result?p=@material-ui/unstyled@next)

As the component does not have any styles, it also comes with the unstyled package.

```js
import Portal from '@material-ui/unstyled/Portal';
```
