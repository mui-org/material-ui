---
title: React Button component
components: Button, IconButton, ButtonBase
materialDesign: https://material.io/components/buttons
githubLabel: 'component: Button'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#button'
---

# Button (Botón)

<p class="description">Los botones permiten a los usuarios ejecutar acciones, y tomar decisiones, con un simple toque.</p>

[Los botones](https://material.io/design/components/buttons.html) comunican acciones que los usuarios pueden realizar. Usualmente están ubicados dentro de tu interfaz, en lugares como:

- Diálogos
- Ventanas modal
- Formularios
- Tarjetas
- Barras de herramientas

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Botones Complejos

The `Button` comes with three variants: text (default), contained, and outlined.

{{"demo": "pages/components/buttons/BasicButtons.js"}}

### Text buttons

[Text buttons](https://material.io/components/buttons#text-button) are typically used for less-pronounced actions, including those located: in dialogs, in cards. En las tarjetas, los botones de texto ayudan a mantener un énfasis en el contenido de la tarjeta.

{{"demo": "pages/components/buttons/TextButtons.js"}}

### Contained buttons

Los [Botones contenidos](https://material.io/design/components/buttons.html#contained-button) son de alto énfasis, distinguidos por el uso de elevación y relleno. Contienen acciones que son primarias para la aplicación.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

Se puede eliminar la elevación con la prop `disableElevation`.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

### Outlined buttons

[Botones con contorno (outlined)](https://material.io/design/components/buttons.html#outlined-button) son de énfasis medio. They contain actions that are important, but aren't the primary action in an app.

Los botones delineados también son una alternativa de menos énfasis que los botones contenidos, o de mayor énfasis que los botones de texto.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Controlador del click

Todos los componentes aceptan un controlador `onClick` el cual se aplica al elemento raíz en el DOM.

```jsx
<Button onClick={() => { alert('clicked') }}>Click me</Button>
```

Ten en cuenta que la documentación [evita](/guides/api/#native-properties) mencionar las propiedades nativas (existen varias) en la sección API de los componentes.

## Color

Botones más grandes o más pequeños? Usa la propiedad `size`.

In addition to using the default button colors, you can add custom ones, or disable any you don't need. See the [Adding new colors](/customization/palette/#adding-new-colors) example for more info.

## Tamaños

For larger or smaller buttons, use the `size` prop.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Botón de subida

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Botones con iconos y títulos

Sometimes you might want to have icons for certain buttons to enhance the UX of the application as we recognize logos more easily than plain text. Por ejemplo, si se crea un botón para borrar se le puede poner un icono de papelera.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon button

Los botones de iconos suelen encontrarse en las barras de aplicaciones y las barras de herramientas.

Los iconos son también apropiados para botones toggle que permiten marcar o desmarcar una sola opción, tal como poner o quitar una estrella de un elemento.

{{"demo": "pages/components/buttons/IconButtons.js"}}

### Tamaños

For larger or smaller icon buttons, use the `size` prop.

{{"demo": "pages/components/buttons/IconButtonSizes.js"}}

## Botones Personalizados

Here are some examples of customizing the component. Puedes aprender más sobre esto en la [sección Personalizando Componentes de la documentación](/customization/how-to-customize/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 Si estás buscando inspiración, puedes mirar [los ejemplos de MUI Treasury](https://mui-treasury.com/styles/button).

## Botones Personalizados

The loading buttons can show loading state and disable interactions.

{{"demo": "pages/components/buttons/LoadingButtons.js"}}

Toggle the switch to see the transition between the different states.

{{"demo": "pages/components/buttons/LoadingButtonsTransition.js"}}

## Complex buttons

Los Botones de Texto, los Botones Contenidos, los Botones de Acción Flotantes y los Botones con Iconos se construyen sobre el mismo componente: el `ButtonBase`. You can take advantage of this lower-level component to build custom interactions.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Librería externa de routing

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. Un caso de uso común es emplear el botón para iniciar la navegación hacia una nueva página. Here is a [more detailed guide](/guides/routing/#button).

## Limitaciones

### Cursor no permitido

El componente ButtonBase define `pointer-events: none;` en los botones deshabilitados, lo que previene la aparición del cursor desactivado.

Si deseas usar `not-allowed`, tienes dos opciones:

1. **Mediante CSS**. Puedes eliminar los estilos del cursor aplicados cuando el elemento `<button>` está deshabilitado:

```css
.MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
```

Sin embargo:

- Debería añadir `pointer-events: none` cuando necesite mostrar [tooltips en elemento deshabilitados](/components/tooltips/#disabled-elements).
- The cursor won't change if you render something other than a button element, for instance, a link `<a>` element.

2. **Cambio en el DOM**. Puede encapsular el botón:

```jsx
<span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
```

Este tiene la ventaja de permitir cualquier elemento, por ejemplo un enlace `<a>`<a></0>.</p>
