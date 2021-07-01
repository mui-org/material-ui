---
title: Backdrop React Component
components: Backdrop, BackdropUnstyled
githubLabel: 'component: Backdrop'
---

# Backdrop

<p class="description">Затемнение предназначено для акцентирования внимания пользователя на определенном элементе интерфейса.</p>

The backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs, and more. Проще говоря, затемнение добавляет затемнённый слой поверх вашего приложения.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Пример

{{"demo": "pages/components/backdrop/SimpleBackdrop.js"}}

## Unstyled

The backdrop also comes with the unstyled package. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import Backdrop from '@material-ui/unstyled/Backdrop';
```
