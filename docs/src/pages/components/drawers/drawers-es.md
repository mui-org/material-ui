---
title: React Drawer component
components: Drawer, SwipeableDrawer
githubLabel: 'component: Drawer'
materialDesign: https://material.io/components/navigation-drawer
---

# Cajón

<p class="description">Los Navigation Drawers brindan acceso a los destinos en su aplicación. Las hojas laterales son superficies que contienen contenido complementario que están ancladas al borde izquierdo o derecho de la pantalla.</p>

[Navigation Drawers](https://material.io/design/components/navigation-drawer.html) proveen acceso a destinos o funcionalidades de su aplicación, como cambiar de cuentas. Pueden estar permanentemente en pantalla o controlados por un ícono del menú de navegación.

[Las hojas laterales](https://material.io/design/components/sheets-side.html) son superficies suplementarias que se usan principalmente en tabletas y computadores de escritorio.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Drawer temporal

Los Drawers temporales puedes estar abiertos o cerrados. Cerrados por defecto, el Drawer se abre temporalmente sobre todo el contenido de la app, hasta que se seleccione una opción.

El Drawer puede ser cancelado, haciendo click sobre el Overlay o presionando la tecla Escape del teclado. Se cierra además, cuando un elemento es seleccionado, a partir del manejo de la propiedad `open`.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

### Swipeable

Puedes hacer que el Drawer sea deslizable con el componente `SwipeableDrawer`.

Este componente viene con una sobrecarga de carga gzipped de 2 kB. Algunos dispositivos móviles de baja gama no podrán seguir los dedos a 60 FPS. Puede utilizar la propiedad `disableBackdropTransition` para ayudar.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

Las siguientes propiedades son usadas en la web de documentación para una óptima usabilidad del componente:

- iOS está alojado en dispositivos de gama alta. La transición de Backdrop puede ser habilitada sin perder frames. El rendimiento será lo suficientemente bueno.
- iOS tiene un gesto "deslizar para volver" que interfiere con la función de descubrimiento, por lo tanto esta debe ser deshabilitada.

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

## Drawer responsivo

You can use the `temporary` variant to display a drawer for small screens and `permanent` for a drawer for wider screens.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Drawer persistente

Los Drawers persistentes pueden intercambiarse entre abierto o cerrado. El Drawer descansa en la misma superficie de elevación que el contenido. Está cerrado por defecto y se abre seleccionando el ícono del menú, y permanece abierto hasta que es cerrado por el usuario. El estado del Drawer es recordado de acción a acción y de sesión a sesión.

Cuando el Drawer está fuera de la grilla de la página y se abre, fuerza al otro contenido a cambiar su tamaño y adaptarse a la vista más pequeña.

Persistent navigation drawers are acceptable for all sizes larger than mobile. They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Cajón variante mini

En esta variación, el cajón de navegación persistente cambia su ancho. Su estado de descanso es un mini-cajón con la misma elevación que el contenido, cortado por la barra de la aplicación. Cuando se expande, aparece como el cajón de navegación persistente estándar.

La variante mini está recomendada para secciones de la aplicación que necesiten acceso a selección rápida junto al contenido.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Cajón permanente

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Aplicaciones enfocadas en consumo de información que usan jerarquía de izquierda a derecha.

### Navegación de altura completa

Aplicaciones enfocadas en consumo de información que usan jerarquía de izquierda a derecha.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Cortado bajo la barra de aplicación

Aplicaciones enfocadas en productividad que requieren balance a través de la pantalla.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}
