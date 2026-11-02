---
productId: material-ui
title: React Card component
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'scope: card'
materialDesign: https://m2.material.io/components/cards
githubSource: packages/mui-material/src/Card
---

# Card

<p class="description">Cards contain content and actions about a single subject.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Introduction

Cards are surfaces that display content and actions on a single topic.
The Material UI Card component includes several complementary utility components to handle various use cases:

- Card: a surface-level container for grouping related components.
- Card Content: the wrapper for the Card content.
- Card Header: an optional wrapper for the Card header.
- Card Media: an optional container for displaying images, videos, etc.
- Card Actions: an optional wrapper that groups a set of buttons.
- Card Action Area: an optional wrapper that allows users to interact with the specified area of the Card.

{{"component": "file://./demos/basic/index.ts", "bg": true}}

## Basics

```jsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
```

:::success
Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are meant to be entry points to more complex and detailed information.
:::

### Outlined Card

Set `variant="outlined"` to render an outlined card.

{{"component": "file://./demos/outlined/index.ts", "bg": true}}

## Complex Interaction

On desktop, card content can expand. (Click the downward chevron to view the recipe.)

{{"component": "file://./demos/recipe-review/index.ts", "bg": true}}

## Media

Example of a card using an image to reinforce the content.

{{"component": "file://./demos/media/index.ts", "bg": true}}

By default, we use the combination of a `<div>` element and a _background image_ to display the media. It can be problematic in some situations, for example, you might want to display a video or a responsive image. Use the `component` prop for these use cases:

{{"component": "file://./demos/img-media/index.ts", "bg": true}}

## Primary action

Often a card allow users to interact with the entirety of its surface to trigger its main action, be it an expansion, a link to another screen or some other behavior. The action area of the card can be specified by wrapping its contents in a `CardActionArea` component.

{{"component": "file://./demos/action-area/index.ts", "bg": true}}

A card can also offer supplemental actions which should stand detached from the main action area in order to avoid event overlap.

{{"component": "file://./demos/multi-action-area/index.ts", "bg": true}}

## UI Controls

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

{{"component": "file://./demos/media-control/index.ts", "bg": true}}

## Active state styles

To customize a Card's styles when it's in an active state, you can attach a `data-active` attribute to the Card Action Area component and apply styles with the `&[data-active]` selector, as shown below:

{{"component": "file://./demos/select-action/index.ts", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/primitive/card).
