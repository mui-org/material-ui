---
title: Composant React Backdrop
components: Backdrop, BackdropUnstyled
githubLabel: 'component: Backdrop'
---

# Backdrop

<p class="description">Le composant Backdrop est utilisé pour mettre l'accent sur un ou des parties particulières de celui-ci.</p>

Le Backdrop signale à l'utilisateur d'un changement d'état dans l'application et peuvent être utilisés pour créer des chargeurs, des dialogues et plus encore. Dans sa forme la plus simple, le composant Backdrop ajoutera une couche assombrie sur votre application.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Exemple

{{"demo": "pages/components/backdrop/SimpleBackdrop.js"}}

## Unstyled

The backdrop also comes with the unstyled package. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import Backdrop from '@material-ui/unstyled/Backdrop';
```
