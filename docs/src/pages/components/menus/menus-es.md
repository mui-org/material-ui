---
title: React Menu component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
githubLabel: 'component: Menu'
materialDesign: https://material.io/components/menus
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Menu

<p class="description">Los menús despliegan una lista de opciones en superficies temporales.</p>

A menu displays a list of choices on a temporary surface. It appears when the user interacts with a button, or other control.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic menu

A basic menu opens over the anchor element by default (this option can be [changed](#menu-positioning) via props). When close to a screen edge, a basic menu vertically realigns to make sure that all menu items are completely visible.

Elegir una opción debiera inmediatamente confirmar la opción y cerrar el menú.

**Desambiguación**: En contraste con los menús simples, los diálogos simples pueden presentar detalles adicionales a las opciones disponibles para un ítem de lista o proveer acciones de navegación u ortogonales relacionadas a la tarea primaria. Although they can display the same content, simple menus are preferred over simple dialogs because simple menus are less disruptive to the user's current context.

{{"demo": "pages/components/menus/BasicMenu.js"}}

## Selected menu

If used for item selection, when opened, simple menus places the initial focus on the selected menu item. El elemento de menú actualmente seleccionado se establece usando la propiedad `selected` (de [ListItem](/api/list-item/)). To use a selected menu item without impacting the initial focus, set the `variant` prop to "menu".

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## Positioned menu

Because the `Menu` component uses the `Popover` component to position itself, you can use the same [positioning props](/components/popover/#anchor-playground) to position it. For instance, you can display the menu below the anchor:

{{"demo": "pages/components/menus/PositionedMenu.js"}}

## Composición de MenuList

El componente `Menu` usa el componente `Popover` internamente. Sin embargo, es posible usar una estrategia de posicionamiento diferente, o no bloquear el desplazamiento. Para responder esas necesidades, exponemos un componente `MenuList` que puede componer, con `Popper` en este ejemplo.

La responsabilidad principal del componente `MenuList` es manejar el foco.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Customized menu

He aquí un ejemplo de personalización del componente. Puedes aprender más sobre esto en la [sección Personalizando Componentes de la documentación](/customization/how-to-customize/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

🎨 Si estás buscando inspiración, puedes mirar [los ejemplos de MUI Treasury](https://mui-treasury.com/styles/menu).

## Max height menu

Si el alto de un menú previene que todos los elementos sean mostrados, puede hacer desplazamiento internamente.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Limitaciones

Existe un [bug de flexbox](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) que previene el funcionamiento de `text-overflow: ellipsis` en un diseño de flexbox. Puede usar el componente `Typography` con `noWrap` para solucionar este problema:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## Change transition

Usar una transición diferente.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Context menu

Here is an example of a context menu. (Right click to open.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## Proyectos relacionados

Para usos más avanzados tal vez puedas aprovercharte de:

### Ayudante PopupState

Existe un paquete de terceros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que se encarga del estado del menú en la mayoría de los casos.

{{"demo": "pages/components/menus/MenuPopupState.js"}}
