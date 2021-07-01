---
title: Componente React para Navegação inferior
components: BottomNavigation, BottomNavigationAction
githubLabel: 'component: BottomNavigation'
materialDesign: https://material.io/components/bottom-navigation
---

# Navegação inferior

<p class="description">A barra de navegação inferior permite navegar entre os principais destinos em um aplicativo.</p>

Barras de [navegação inferior](https://material.io/design/components/bottom-navigation.html) apresentam de três a cinco destinos na parte inferior da tela. Cada destino é apresentado por um ícone e opcionalmente um rótulo de texto. Quando um ícone de navegação inferior é pressionado, o usuário é levado ao destino associado com ícone.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Navegação inferior

Se existir **quatro** ou **cinco** ações, exiba os destinos inativos somente com ícone.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## Navegação inferior sem rótulo

Se existir **quatro** ou **cinco** ações, exiba os destinos inativos somente com ícone.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}

## Posicionamento fixo

Esta demonstração mantém a navegação inferior fixa na parte inferior, não importa a quantidade de conteúdo na tela.

{{"demo": "pages/components/bottom-navigation/FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}

## Biblioteca de roteamento de terceiros

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `BottomNavigationAction` component provides the `component` prop to handle this use case. Here is a [more detailed guide](/guides/routing).
