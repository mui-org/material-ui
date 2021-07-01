---
title: Componente para navegación a pie de página
components: BottomNavigation, BottomNavigationAction
githubLabel: 'component: BottomNavigation'
materialDesign: https://material.io/components/bottom-navigation
---

# Barra de navegación inferior

<p class="description">Las barras de navegación inferiores permiten movimiento entre destinos primarios en una aplicación.</p>

[La barra de Navegación Inferior](https://material.io/design/components/bottom-navigation.html) muestra de tres a cinco destinos en la parte inferior de una pantalla. Cada destino es representado por un icono y una etiqueta de texto opcional. Cuando un icono de navegación inferior es tocado, el usuario es llevado al destino de navegación superior asociado con ese icono.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Barra de navegación inferior

Si hay **cuatro ** o **cinco** acciones, mostrar vistas inactivas solamente como iconos.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## Botón de navegación sin texto

Si hay **cuatro ** o **cinco** acciones, mostrar vistas inactivas solamente como iconos.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}

## Fixed positioning

This demo keeps bottom navigation fixed to the bottom, no matter the amount of content on-screen.

{{"demo": "pages/components/bottom-navigation/FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}

## Librería externa de routing

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `BottomNavigationAction` component provides the `component` prop to handle this use case. Here is a [more detailed guide](/guides/routing).
