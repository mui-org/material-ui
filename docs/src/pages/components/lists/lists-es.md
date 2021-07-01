---
title: React List component
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: List'
materialDesign: https://material.io/components/lists
---

# Listas

<p class="description">Las listas son índices contínuos y verticales de texto o imágenes.</p>

Las [listas](https://material.io/design/components/lists.html) son un grupo contínuo de texto o imágenes. Se componen de elementos que contienen acciones primarias y complementarias, que se representan mediante iconos y texto.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic List

{{"demo": "pages/components/lists/BasicList.js", "bg": true}}

El último elemento del demo anterior muestra cómo se puede representar un enlace:

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/guides/routing/#list) of the documentation.

## Lista Anidada

{{"demo": "pages/components/lists/NestedList.js", "bg": true}}

## Lista de Carpetas

{{"demo": "pages/components/lists/FolderList.js", "bg": true}}

## Explora

Debajo de esta línea hay una demostración interactiva que permite explorar el resultado visual de las distintas configuraciones:

{{"demo": "pages/components/lists/InteractiveList.js", "bg": true}}

## ListItem Seleccionado

{{"demo": "pages/components/lists/SelectedListItem.js", "bg": true}}

## Alineación de los elementos de la lista

Debería cambiar la alineación del list item cuando se muestran 3 o más líneas, ajustando la propiedad `alignItems="flex-start"`.

{{"demo": "pages/components/lists/AlignItemsList.js", "bg": true}}

## Controles de Lista

### Checkbox

Un checkbox puede ser una acción primaria o una acción secundaria.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/components/lists/CheckboxList.js", "bg": true}}

El checkbox es la acción secundaria para el elemento de la lista y un objetivo separado.

{{"demo": "pages/components/lists/CheckboxListSecondary.js", "bg": true}}

### Switch

El switch es la acción secundaria y un objetivo separado.

{{"demo": "pages/components/lists/SwitchListSecondary.js", "bg": true}}

## Sticky subheader

Al desplazarse, los subencabezados permanecen anclados en la parte superior de la pantalla hasta que el siguiente subencabezado los saque de la pantalla. Esta característica se basa en el posicionamiento sticky de CSS. (⚠️ no IE 11 support)

{{"demo": "pages/components/lists/PinnedSubheaderList.js", "bg": true}}

## Inset List Item

The `inset` prop enables a list item that does not have a leading icon or avatar to align correctly with items that do.

{{"demo": "pages/components/lists/InsetList.js", "bg": true}}

## Gutterless list

When rendering a list within a component that defines its own gutters, `ListItem` gutters can be disabled with `disableGutters`.

{{"demo": "pages/components/lists/GutterlessList.js", "bg": true}}

## Virtualización de listas

En el siguiente ejemplo se demuestra como usar [react-window](https://github.com/bvaughn/react-window) con el componente `List`. Renderiza 200 filas y puede manejar más con facilidad. La virtualización ayuda con problemas de rendimiento.

{{"demo": "pages/components/lists/VirtualizedList.js", "bg": true}}

If this library doesn't cover your use case, you should consider using [react-virtualized](https://github.com/bvaughn/react-virtualized), then alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso). The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged.

## Customized List

Here are some examples of customizing the component. Puedes aprender más sobre esto en la [sección Personalizando Componentes de la documentación](/customization/how-to-customize/).

{{"demo": "pages/components/lists/CustomizedList.js"}}

## Personalización

🎨 Si estás buscando inspiración, puedes mirar [los ejemplos de MUI Treasury](https://mui-treasury.com/styles/list-item).
