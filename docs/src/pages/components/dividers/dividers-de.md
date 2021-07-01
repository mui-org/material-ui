---
title: React Divider component
components: Divider
githubLabel: 'component: Divider'
materialDesign: https://material.io/components/dividers
---

# Divider

<p class="description">Ein Trenner ist eine dünne Linie, die den Inhalt in Listen und Layouts gruppiert.</p>

[Trenner](https://material.io/design/components/dividers.html) trennt den Inhalt in klare Gruppen.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Listentrenner

Sie können sich dieses zusätzliche Element sparen, in dem sie die `divider`-Eigenschaft bei der `ListItem`-Komponente verwenden. Sie können sich dieses zusätzliche Element sparen, in dem sie die `divider`-Eigenschaft bei der `ListItem`-Komponente verwenden.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5-Spezifikation

In einer Liste sollten sie sicherstellen, dass der `Trenner` als `<li>` gerendered wird, um der HTML5 Spezifikation zu entsprechen. Die folgenden Beispiele zeigen wie dies erreicht werden kann.

## Eingerückter Trenner

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Subheader-Trenner

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Mitteltrenner

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertikale Trennlinien

You can also render a divider with content.

{{"demo": "pages/components/dividers/DividerText.js"}}

## Vertical divider

Sie können einen Trenner auch vertikal mit der `orientation` prop rendern.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}

> Note the use of the `flexItem` prop to accommodate for the flex container.

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "pages/components/dividers/VerticalDividerMiddle.js", "bg": true}}

### Vertical with text

You can also render a vertical divider with content.

{{"demo": "pages/components/dividers/VerticalDividerText.js"}}
