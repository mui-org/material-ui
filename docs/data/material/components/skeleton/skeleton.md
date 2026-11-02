---
productId: material-ui
title: React Skeleton component
components: Skeleton
githubLabel: 'scope: skeleton'
githubSource: packages/mui-material/src/Skeleton
---

# Skeleton

<p class="description">Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration.</p>

The data for your components might not be immediately available. You can improve the perceived responsiveness of the page by using skeletons. It feels like things are happening immediately, then the information is incrementally displayed on the screen (Cf. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797)).

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Usage

The component is designed to be used **directly in your components**.
For instance:

```jsx
{
  item ? (
    <img
      style={{
        width: 210,
        height: 118,
      }}
      alt={item.title}
      src={item.src}
    />
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}
```

## Variants

The component supports 4 shape variants:

- `text` (default): represents a single line of text (you can adjust the height via font size).
- `circular`, `rectangular`, and `rounded`: come with different border radius to let you take control of the size.

{{"component": "file://./demos/variants/index.ts"}}

## Animations

By default, the skeleton pulsates, but you can change the animation to a wave or disable it entirely.

{{"component": "file://./demos/animations/index.ts"}}

### Pulsate example

{{"component": "file://./demos/you-tube/index.ts", "collapseToEmpty": true}}

### Wave example

{{"component": "file://./demos/facebook/index.ts", "collapseToEmpty": true, "bg": true}}

## Inferring dimensions

In addition to accepting `width` and `height` props, the component can also infer the dimensions.

It works well when it comes to typography as its height is set using `em` units.

```jsx
<Typography variant="h1">{loading ? <Skeleton /> : 'h1'}</Typography>
```

{{"component": "file://./demos/typography/index.ts", "collapseToEmpty": true}}

Use `variant="text"` when inferring dimensions from typography, and customize the border radius with the `sx` prop if you need a different shape while preserving typography-based sizing.

But when it comes to other components, you may not want to repeat the width and
height. In these instances, you can pass `children` and it will
infer its width and height from them.

```jsx
loading ? (
  <Skeleton variant="circular">
    <Avatar />
  </Skeleton>
) : (
  <Avatar src={data.avatar} />
);
```

{{"component": "file://./demos/children/index.ts", "collapseToEmpty": true}}

## Color

The color of the component can be customized by changing its `background-color` CSS property.
This is especially useful when on a black background (as the skeleton will otherwise be invisible).

{{"component": "file://./demos/color/index.ts", "bg": "inline"}}

## Accessibility

Skeleton screens provide an alternative to the traditional spinner method.
Rather than showing an abstract widget, skeleton screens create anticipation of what is to come and reduce cognitive load.

The background color of the skeleton uses the least amount of luminance to be visible in good conditions (good ambient light, good screen, no visual impairments).

### ARIA

None.

### Keyboard

The skeleton is not focusable.
