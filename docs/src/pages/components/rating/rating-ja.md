---
title: Reactレーティングコンポーネント
components: レート
githubLabel: 'component: Rating'
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
---

# レート

<p class="description">レーティングコンポーネントは、ユーザーの意見や評価を反映するためのコンポーネントです。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本のレーティングコンポーネント

{{"demo": "pages/components/rating/BasicRating.js"}}

## Rating precision

大きな評価ボタンと小さな評価ボタンがありますか? `size`propを使用します。

{{"demo": "pages/components/rating/HalfRating.js"}}

## ホバーのフィードバック

You can display a label on hover to help the user pick the correct rating value. `size`propを使用します。

{{"demo": "pages/components/rating/HoverRating.js"}}

## サイズ

For larger or smaller ratings use the `size` prop.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Customized rating

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/rating/CustomizedRating.js"}}

## Radio group

The rating is implemented with a radio group, set `highlightSelectedOnly` to restore the natural behavior.

{{"demo": "pages/components/rating/RadioGroupRating.js"}}

## アクセシビリティ

([WAI tutorial](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

このコンポーネントのアクセシビリティは、

- A radio group with its fields visually hidden. It contains six radio buttons, one for each star, and another for 0 stars that is checked by default. Be sure to provide a value for the `name` prop that is unique to the parent form.
- Labels for the radio buttons containing actual text (“1 Star”, “2 Stars”, … ). Be sure to provide a suitable function to the `getLabelText` prop when the page is in a language other than English. You can use the [included locales](https://material-ui.com/guides/localization/), or provide your own.
- A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons) to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo. This is important to match [success Criterion 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) of WCAG2.1.

{{"demo": "pages/components/rating/TextRating.js"}}

### ARIA

The read only rating has a role of "img", and an aria-label that describes the displayed rating.

### Keyboard

Because the rating component uses radio buttons, keyboard interaction follows the native browser behavior. Tab will focus the current rating, and cursor keys control the selected rating.

The read only rating is not focusable.
