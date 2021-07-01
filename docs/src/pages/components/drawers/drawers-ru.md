---
title: Компонент React Drawer
components: Drawer, SwipeableDrawer
githubLabel: 'component: Drawer'
materialDesign: https://material.io/components/navigation-drawer
---

# Панель

<p class="description">Навигационные панели предназначены для предоставления ссылок на различные части вашего приложения. Боковые панели содержат дополнительную информацию и закрепляются по левую или правую сторону окна браузера.</p>

[Navigation drawers](https://material.io/design/components/navigation-drawer.html) (or "sidebars") provide access to destinations and app functionality, such as switching accounts. Они могут либо находится всегда в открытом состоянии либо контролироватся с помощью навигационного меню.

\[Боковые панели\](https://material. io/design/components/sheets-side.html) являются дополнительными элементами, в основном используемыми на планшетах и ПК.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Скрытая Панель

Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.

The Drawer can be cancelled by clicking the overlay or pressing the Esc key. It closes when an item is selected, handled by controlling the `open` prop.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

### Swipeable

Вы можете сделать панель скользящей используя компонент `SwipeableDrawer`.

Этот комонент в сжатом виде добавляет 2 kB к загрузке. Некоторые бюджетные мобильные устройства не смогут отвечать на прикосновения с частотой 60 кадров в секунду. Используйте свойство `disableBackdropTransition` чтобы исправить ситуацию.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

Для оптимальной удобства использования компонента используются следующие свойства:

- iOS is hosted on high-end devices. The backdrop transition can be enabled without dropping frames. Производительность достаточно хороша.
- iOS has a "swipe to go back" feature that interferes with the discovery feature, so discovery has to be disabled.

```jsx
const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />;
```

### Swipeable edge

You can configure the `SwipeableDrawer` to have a visible edge when closed.

If you are on a desktop, you can toggle the drawer with the "OPEN" button. If you are on mobile, you can open the demo in CodeSandbox ("edit" icon) and swipe.

{{"demo": "pages/components/drawers/SwipeableEdgeDrawer.js", "iframe": true, "height": 400, "maxWidth": 300}}

### Keep mounted

To ensure a temporary drawer is not unmounted, specify the `ModalProps` prop like:

```jsx
<Drawer
  variant="temporary"
  ModalProps={{
    keepMounted: true,
  }}
/>
```

More details in the [Modal performance section](/components/modal/#performance).

## Приспосабливающаяся панель

You can use the `temporary` variant to display a drawer for small screens and `permanent` for a drawer for wider screens.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Стойкая панель

Стойкая навигационная панель может быть как в открытом так и в закрытом состоянии. Панель находится на том же уровне что и остальное содержимое. По-умолчания она закрыта и может быть открыта с помощю кнопки, оставаясь в таком состоянии пока пользователь не закроет ее. Состояние панель сохраняется между действиями и сессиями.

Когда панель находится за границей экрана и открывается, остальное содержимое меянет размеры приспосбаливаясь к уменьшеному месту в окне браузера.

Persistent navigation drawers are acceptable for all sizes larger than mobile. They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Панель с состоянием минимизации

В этом случае стойкая навигационная панель меняет свою ширину. В закрытом состоянии она минимизирована, на том же уровне что и остальное содержимое, и верхняя ее часть скрыта. В открытом состоянии это обычная стойкая навигационная панель.

Панель с состоянием минимизации рекомендуется использовать в приложениях, где необходимо предоставить быстрый способ обхода вместе с содержимым.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Вполне видимая панель

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Исползуется в приложениях, которые сфокусированны на предоставлении информации и используют иерархию элементов слева направо.

### Навигация в полную высоту

Исползуется в приложениях, которые сфокусированны на предоставлении информации и используют иерархию элементов слева направо.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Панель, скрытая за основной полосой

Используется в приложениях сфокусированных на эффективной работе и требуют сбалансированного заполнения экрана.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}
