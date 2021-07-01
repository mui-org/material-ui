---
title: Composant React Skeleton
components: Skeleton (Squelette)
githubLabel: 'component: Skeleton'
---

# Skeleton (Squelette)

<p class="description">Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration.</p>

The data for your components might not be immediately available. Vous pouvez améliorer la réactivité perçue de la page en utilisant des Skeletons. It feels like things are happening immediately, then the information is incrementally displayed on the screen (Cf. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797)).

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Utilisation

Le composant est conçu pour être utilisé **directement dans vos composants**. Par exemple:

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## Variants

The component supports 3 shape variants.

{{"demo": "pages/components/skeleton/Variants.js"}}

## Animations

Par défaut, c'est le Skeleton Pulsates, mais vous pouvez changer l'animation en une vague ou la désactiver entièrement.

{{"demo": "pages/components/skeleton/Animations.js"}}

### Pulsate example

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

### Wave example

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## Inferring dimensions

In addition to accepting `width` and `height` props, the component can also infer the dimensions.

It works well when it comes to typography as its height is set using `em` units.

```jsx
<Typography variant="h1">
  {loading ? <Skeleton /> : 'h1'}
</Typography>
```

{{"demo": "pages/components/skeleton/SkeletonTypography.js", "defaultCodeOpen": false}}

But when it comes to other components, you may not want to repeat the width and height. In these instances, you can pass `children` and it will infer its width and height from them.

```jsx
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}

## Couleur

The color of the component can be customized by changing its `background-color` CSS property. This is especially useful when on a black background (as the skeleton will otherwise be invisible).

{{"demo": "pages/components/skeleton/SkeletonColor.js", "bg": "inline"}}

## Accessibilité

Les écrans de Skeleton offrent une alternative à la méthode traditionnelle. Rather than showing an abstract widget, skeleton screens create anticipation of what is to come and reduce cognitive load.

The background color of the skeleton uses the least amount of luminance to be visible in good conditions (good ambient light, good screen, no visual impairments).

### ARIA

Aucune.

### Clavier

Le Skeleton n'est pas concentrable.
