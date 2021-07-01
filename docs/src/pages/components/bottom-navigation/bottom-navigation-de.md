---
title: Bottom Navigation React-Komponente
components: BottomNavigation, BottomNavigationAction
githubLabel: 'component: BottomNavigation'
materialDesign: https://material.io/components/bottom-navigation
---

# Bottom Navigation (Untere Navigation)

<p class="description">Die unteren Navigationsleisten ermöglichen die Bewegung zwischen primären Zielen in einer App.</p>

Die [untere Navigationsleiste](https://material.io/design/components/bottom-navigation.html) zeigt drei bis fünf Ziele am unteren Bildschirmrand an. Jedes Ziel wird durch ein Symbol und eine optionale Textbezeichnung dargestellt. Wenn Sie auf ein unteres Navigationssymbol tippen, wird der Benutzer zum Navigationsziel der obersten Ebene geführt, das diesem Symbol zugeordnet ist.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Bottom Navigation (Untere Navigation)

Bei **4** oder **5** Aktionen werden inaktive Ansichten nur als Symbole angezeigt.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## Untere Navigation ohne Beschriftung

Bei **4** oder **5** Aktionen werden inaktive Ansichten nur als Symbole angezeigt.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}

## Fixed positioning

This demo keeps bottom navigation fixed to the bottom, no matter the amount of content on-screen.

{{"demo": "pages/components/bottom-navigation/FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}

## Drittanbieter-Routing Bibliothek

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `BottomNavigationAction` component provides the `component` prop to handle this use case. Here is a [more detailed guide](/guides/routing).
