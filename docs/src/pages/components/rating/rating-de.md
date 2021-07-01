---
title: React Rating Komponente
components: Bewertung
githubLabel: 'component: Rating'
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
---

# Bewertung

<p class="description">Bewertungen geben Einblicke in die Meinungen und Erfahrungen anderer und können es dem Benutzer ermöglichen, eine eigene Bewertung abzugeben.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Grundbewertung

{{"demo": "pages/components/rating/BasicRating.js"}}

## Bewertungspräzision

The rating can display any float number with the `value` prop. Use the `precision` prop to define the minimum increment value change allowed.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Hover feedback

Sie können ein Etikett mit dem Mauszeiger anzeigen, um dem Benutzer bei der Auswahl des richtigen Bewertungswerts zu helfen. Die Demo verwendet die `onChangeActive` Prop.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Größen

Für Größeren oder kleinerem Bewertungen benutze `size` prop.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Benutzerdefinierte Bewertung

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

{{"demo": "pages/components/rating/CustomizedRating.js"}}

## Radio group

The rating is implemented with a radio group, set `highlightSelectedOnly` to restore the natural behavior.

{{"demo": "pages/components/rating/RadioGroupRating.js"}}

## Barrierefreiheit

([WAI tutorial](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

Die Barrierefreiheit dieser Komponente setzt voraus:

- A radio group with its fields visually hidden. It contains six radio buttons, one for each star, and another for 0 stars that is checked by default. Be sure to provide a value for the `name` prop that is unique to the parent form.
- Labels for the radio buttons containing actual text (“1 Star”, “2 Stars”, …). Be sure to provide a suitable function to the `getLabelText` prop when the page is in a language other than English. You can use the [included locales](https://material-ui.com/guides/localization/), or provide your own.
- A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons) to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo. This is important to match [success Criterion 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) of WCAG2.1.

{{"demo": "pages/components/rating/TextRating.js"}}

### ARIA

The read only rating has a role of "img", and an aria-label that describes the displayed rating.

### Keyboard

Because the rating component uses radio buttons, keyboard interaction follows the native browser behavior. Tab will focus the current rating, and cursor keys control the selected rating.

The read only rating is not focusable.
