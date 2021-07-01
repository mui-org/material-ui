---
title: Componente React para Pano de Fundo
components: Backdrop, BackdropUnstyled
githubLabel: 'component: Backdrop'
---

# Backdrop

<p class="description">O componente backdrop (pano de fundo) é usado para fornecer ênfase em um elemento específico ou partes dele.</p>

The backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs, and more. Em seu formato mais simples, o componente backdrop irá adicionar uma camada escurecida sobre seu aplicativo.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Exemplo

{{"demo": "pages/components/backdrop/SimpleBackdrop.js"}}

## Unstyled

The backdrop also comes with the unstyled package. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import Backdrop from '@material-ui/unstyled/Backdrop';
```
