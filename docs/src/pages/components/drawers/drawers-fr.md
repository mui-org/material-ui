---
title: Composant React Drawer
components: Drawer, SwipeableDrawer
githubLabel: 'component: Drawer'
materialDesign: https://material.io/components/navigation-drawer
---

# Drawer (Tiroir)

<p class="description">Les tiroirs de navigation permettent d'accéder aux destinations de votre application. Les feuilles latérales sont des surfaces contenant du contenu supplémentaire ancré au bord gauche ou droit de l'écran.</p>

[Navigation drawers](https://material.io/design/components/navigation-drawer.html) (or "sidebars") permettent d'accéder aux destinations et aux fonctionnalités de l'application, telles que le changement de compte. Ils peuvent être : soit affichés en permanence à l'écran, soit contrôlés par une une icône de menu de navigation

[Side sheets](https://material.io/design/components/sheets-side.html) (appelé: "Les feuilles latérales") sont des surfaces supplémentaires principalement utilisées sur les tablettes et les ordinateurs de bureau.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Tiroir temporaire

Les drawers de navigation temporaire peuvent activer l'ouverture ou la fermeture. Fermés par défaut, le drawer s'ouvre temporairement au dessus de tout autre contenu jusqu'à qu'une section soit sélectionnée.

Le drawer peut être annulé en cliquant ailleurs dans la zone sombre ou en appuyant sur la touche Échap. Il se ferme quand un élément est sélectionné et est géré par le contrôle de la propriété `open`.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

### Swipeable (glissable)

You can make the drawer swipeable with the `SwipeableDrawer` component.

Ce composant est livré avec une charge utile gzip de 2 kB. Certains appareils mobiles bas de gamme ne peuvent pas suivre les doigts à 60 FPS. Vous pouvez utiliser le prop `disableBackdropTransition` pour vous aider.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

Les propriétés suivantes sont utilisées dans la documentation du site pour une utilisation optimale du composant:

- iOS est hébergé sur des appareils haut de gamme. The performance will be good enough. The backdrop transition can be enabled without dropping frames.
- iOS has a "swipe to go back" feature that interferes with the discovery feature, so discovery has to be disabled.

```jsx
const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />;
```

### Bord glissant

Vous pouvez configurer le `SwipeableDrawer` pour avoir un bord visible lorsqu'il est fermé.

Si vous êtes sur un bureau, vous pouvez basculer le tiroir avec le bouton "OUVERT". Si vous êtes sur mobile, vous pouvez ouvrir la démo dans CodeSandbox (icône "modifier") et glisser.

{{"demo": "pages/components/drawers/SwipeableEdgeDrawer.js", "iframe": true, "height": 400, "maxWidth": 300}}

### Garder monté

Pour vous assurer qu'un tiroir temporaire n'est pas démonté, spécifiez la prop `ModalProps` comme :

```jsx
<Drawer
  variant="temporary"
  ModalProps={{
    keepMounted: true,
  }}
/>
```

Plus de détails dans la [section Performances modales](/components/modal/#performance).

## Tiroir adaptatif

A `temporary` drawer is shown for small screens while a `permanent` drawer is shown for wider screens.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Tiroir persistant

Persistent navigation drawers can toggle open or closed. The drawer sits on the same surface elevation as the content. It is closed by default and opens by selecting the menu icon, and stays open until closed by the user. The state of the drawer is remembered from action to action and session to session.

When the drawer is outside of the page grid and opens, the drawer forces other content to change size and adapt to the smaller viewport.

Persistent navigation drawers are acceptable for all sizes larger than mobile. They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini variante de tiroir

In this variation, the persistent navigation drawer changes its width. Its resting state is as a mini-drawer at the same elevation as the content, clipped by the app bar. When expanded, it appears as the standard persistent navigation drawer.

The mini variant is recommended for apps sections that need quick selection access alongside content.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Tiroir permanent

Les tiroirs de navigation permanents sont toujours visibles et épinglés au bord gauche, à la même altitude que le contenu ou l'arrière-plan. Ils ne peuvent pas être fermés.

Les tiroirs de navigation permanents sont les **recommandés par défaut pour le bureau**.

### Navigation pleine hauteur

Applications axées sur la consommation d'informations utilisant une hiérarchie de gauche à droite.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Clippé sous la barre d'application

Des applications axées sur la productivité qui nécessitent un équilibre sur l’écran.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}
