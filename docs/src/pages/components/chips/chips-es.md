---
title: React Chip component
components: Chip
githubLabel: 'component: Chip'
materialDesign: https://material.io/components/chips
---

# Chip

<p class="description">Los Chips son elementos compactos que representan una entrada, atributo o acción.</p>

Los [Chips](https://material.io/design/components/chips.html) le permiten a los usuarios introducir información, hacer selecciones, filtrar contenido, o activar acciones.

Aunque incluido como un componente individual, el uso más común será en algún tipo de entrada de formulario, por lo que parte del comportamiento demostrado aquí no se muestra en este contexto.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic chip

Ejemplos de Chips, usando un Avatar de imagen, Avatar de icono SVG, Avatar con "Letra" y (cadena de texto).

{{"demo": "pages/components/chips/Chips.js"}}

## Array de Chips

Los chips con contorno ofrecen un estilo alternativo.

- Los Chips con la propiedad `onClick` definida cambian su apariencia en el focus, el hover y el click.
- Los Chips con la propiedad `onDelete` definida mostrarán un icono de eliminar, el cuál cambia de apariencia en el hover.

### Chips con contorno

{{"demo": "pages/components/chips/OutlinedChips.js"}}

### Default variant

{{"demo": "pages/components/chips/DeleteableChips.js"}}

### Outlined variant

{{"demo": "pages/components/chips/ClickeableAndDeleteableChips.js"}}

### Clickeable link

Puedes usar la propiedad `size` para definir un chip pequeño.

### Custom delete icon

{{"demo": "pages/components/chips/SmallChips.js"}}

## Chip Pequeño

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

Use the `avatar` prop to added a avatar or use the `icon` prop to added a icon.

### Avatar chip

{{"demo": "pages/components/chips/AvatarChips.js"}}

### Icon chip

{{"demo": "pages/components/chips/IconChips.js"}}

## Chip Playground

You can use the `color` prop to define a primary or secondary color.

{{"demo": "pages/components/chips/ColorChips.js"}}

## Accesibilidad

Puedes usar la propiedad `size` para definir un chip pequeño.

{{"demo": "pages/components/chips/SizesChips.js"}}

## Array de Chips

Un ejemplo de cómo renderizar múltiples Chips desde un array de valores. Eliminar un chip lo quita del array. Tened en cuenta que al no estar la propiedad `onClick` definida, al Chip se le puede hacer focus, pero no gana profundidad si se hace click en él o se toca.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Chip playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Accesibilidad

If the Chip is deletable or clickable then it is a button in tab order. When the Chip is focused (e.g. when tabbing) releasing (`keyup` event) `Backspace` or `Delete` will call the `onDelete` handler while releasing `Escape` will blur the Chip.
