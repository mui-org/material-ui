---
title: Composant React Sider
components: Slider, SliderUnstyled
githubLabel: 'component: Slider'
materialDesign: https://material.io/components/sliders
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#slider'
---

# Slider

<p class="description">Les curseurs permettent aux utilisateurs d'effectuer des sélections à partir d'une plage de valeurs.</p>

[Les curseurs](https://material.io/design/components/sliders.html) reflètent une plage de valeurs sur une barre, à partir de laquelle les utilisateurs peuvent sélectionner une seule valeur. Ils sont idéaux pour ajuster des paramètres tels que le volume, la luminosité ou l'application de filtres d'images.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Continuous sliders

Continuous sliders allow users to select a value along a subjective range.

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## Tailles

For smaller slider, use the prop `size="small"`.

{{"demo": "pages/components/slider/SliderSizes.js"}}

## Discrete sliders

Discrete sliders can be adjusted to a specific value by referencing its value indicator. You can generate a mark for each step with `marks={true}`.

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

### Small steps

You can change the default step increment.

{{"demo": "pages/components/slider/DiscreteSliderSteps.js"}}

### Custom marks

You can have custom marks by providing a rich array to the `marks` prop.

{{"demo": "pages/components/slider/DiscreteSliderMarks.js"}}

### Restricted values

You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### Label always visible

You can force the thumb label to be always visible with `valueLabelDisplay="on"`.

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## Range slider

The slider can be used to set the start and end of a range by supplying an array of values to the `value` prop.

{{"demo": "pages/components/slider/RangeSlider.js"}}

### Minimum distance

You can enforce a minimum distance between values in the `onChange` event handler. By default, when you move the pointer over a thumb while dragging another thumb, the active thumb will swap to the hovered thumb. You can disable this behavior with the `disableSwap` prop. If you want the range to shift when reaching minimum distance, you can utilize the `activeThumb` parameter in `onChange`.

In this example an input allows a discrete value to be set.

## Slider with input field

In this example, an input allows a discrete value to be set.

{{"demo": "pages/components/slider/InputSlider.js"}}

## Couleur

{{"demo": "pages/components/slider/ColorSlider.js"}}

## Curseurs personnalisés

Here are some examples of customizing the component. Vous pouvez en apprendre plus à ce sujet dans la [page de documentation](/customization/how-to-customize/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

### Lecteur de musique

{{"demo": "pages/components/slider/MusicPlayerSlider.js"}}

## Vertical sliders

{{"demo": "pages/components/slider/VerticalSlider.js"}}

**AVERTISSEMENT** : Chrome, Safari et les versions plus récentes d'Edge, c'est-à-dire que tout navigateur basé sur WebKit expose `<Slider orientation="vertical" />` comme horizontal ([problème de chrome #1158217](https://bugs.chromium.org/p/chromium/issues/detail?id=1158217)). En appliquant la propriété `-webkit-appearance: slider-vertical;` le curseur est exposé comme vertical.

En appliquant la propriétés  `-webkit-appearance: slider-vertical;` la navigation au clavier pour les touches horizontales (<kbd class="key">flèche gauche</kbd>, <kbd class="key">flèche droite</kbd>) est inversée ([problème de chrome #1162640](https://bugs. chromium.org/p/chromium/issues/detail?id=1162640)). Habituellement, haut et droite devrait augmenter, gauche et bas devrait diminuer la valeur. Si vous appliquez `-webkit-appearance` vous pouvez empêcher la navigation du clavier pour les touches fléchées horizontales pour un curseur vraiment vertical. Cela peut être moins déroutant pour les utilisateurs par rapport à un changement de direction.

{{"demo": "pages/components/slider/VerticalAccessibleSlider.js"}}

## Track

The track shows the range available for user selection.

### Removed track

The track can be turned off with `track={false}`.

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### Inverted track

The track can be inverted with `track="inverted"`.

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## Non-linear scale

You can use the `scale` prop to represent the `value` on a different scale.

Dans la démo suivante, la valeur _x_ représente la valeur _2^x_. Chaque augmentation de _x_ est multiplié par  _2_ pour chaque nouvelle valeur.

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## Unstyled

<!-- #default-branch-switch -->

- 📦 [22 kB gzipped](/size-snapshot) (but only +8 kB when used together with other Material-UI components).

The slider also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import SliderUnstyled from '@material-ui/unstyled/SliderUnstyled';
```

{{"demo": "pages/components/slider/UnstyledSlider.js"}}

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value. This is not required if the value matches the semantics of the label. You can change the name with the `getAriaValueText` or `aria-valuetext` prop.

## Limites

### IE11

Le libellé de la valeur du curseur n'est pas centré dans IE 11. L'alignement n'est pas géré pour faciliter la personnalisation avec les derniers navigateurs. Vous pouvez résoudre ce problème avec:

```css
.MuiSlider-valueLabel {
  left: calc(-50% - 4px);
}
```
