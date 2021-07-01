---
title: Backdrop React Komponente
components: Backdrop, BackdropUnstyled
githubLabel: 'component: Backdrop'
---

# Backdrop

<p class="description">Die Hintergrundkomponente wird verwendet, um ein bestimmtes Element oder Teile davon hervorzuheben.</p>

The backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs, and more. In ihrer einfachsten Form fügt die Hintergrundkomponente eine abgeblendete Ebene über Ihrer Anwendung hinzu.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Beispiel

{{"demo": "pages/components/backdrop/SimpleBackdrop.js"}}

## Unstyled

The backdrop also comes with the unstyled package. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import Backdrop from '@material-ui/unstyled/Backdrop';
```
