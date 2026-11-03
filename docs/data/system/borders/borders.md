# Borders

<p class="description">Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons, or any other element.</p>

## Border

Use border utilities to add or remove an element's borders. Choose from all borders or one at a time.

### Additive

{{"component": "file://./demos/additive/index.ts", "collapseToEmpty": true, "bg": true}}

```jsx
<Box sx={{ border: 1 }}>…
<Box sx={{ borderTop: 1 }}>…
<Box sx={{ borderRight: 1 }}>…
<Box sx={{ borderBottom: 1 }}>…
<Box sx={{ borderLeft: 1 }}>…
```

### Subtractive

{{"component": "file://./demos/subtractive/index.ts", "collapseToEmpty": true, "bg": true}}

```jsx
<Box sx={{ border: 0 }}>…
<Box sx={{ borderTop: 0 }}>…
<Box sx={{ borderRight: 0 }}>…
<Box sx={{ borderBottom: 0 }}>…
<Box sx={{ borderLeft: 0 }}>…
```

## Border color

{{"component": "file://./demos/color/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ borderColor: 'primary.main' }}>…
<Box sx={{ borderColor: 'secondary.main' }}>…
<Box sx={{ borderColor: 'error.main' }}>…
<Box sx={{ borderColor: 'grey.500' }}>…
<Box sx={{ borderColor: 'text.primary' }}>…
```

## Border-radius

{{"component": "file://./demos/radius/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ borderRadius: '50%' }}>…
<Box sx={{ borderRadius: 1 }}>… // theme.shape.borderRadius * 1
<Box sx={{ borderRadius: '16px' }}>…
```

## API

```js
import { borders } from '@mui/system';
```

| Import name         | Prop                | CSS property          | Theme key                                                                    |
| :------------------ | :------------------ | :-------------------- | :--------------------------------------------------------------------------- |
| `border`            | `border`            | `border`              | `borders`                                                                    |
| `borderTop`         | `borderTop`         | `border-top`          | `borders`                                                                    |
| `borderLeft`        | `borderLeft`        | `border-left`         | `borders`                                                                    |
| `borderRight`       | `borderRight`       | `border-right`        | `borders`                                                                    |
| `borderBottom`      | `borderBottom`      | `border-bottom`       | `borders`                                                                    |
| `borderColor`       | `borderColor`       | `border-color`        | [`palette`](/material-ui/customization/default-theme/?expand-path=$.palette) |
| `borderTopColor`    | `borderTopColor`    | `border-top-color`    | [`palette`](/material-ui/customization/default-theme/?expand-path=$.palette) |
| `borderRightColor`  | `borderRightColor`  | `border-right-color`  | [`palette`](/material-ui/customization/default-theme/?expand-path=$.palette) |
| `borderBottomColor` | `borderBottomColor` | `border-bottom-color` | [`palette`](/material-ui/customization/default-theme/?expand-path=$.palette) |
| `borderLeftColor`   | `borderLeftColor`   | `border-left-color`   | [`palette`](/material-ui/customization/default-theme/?expand-path=$.palette) |
| `borderRadius`      | `borderRadius`      | `border-radius`       | [`shape`](/material-ui/customization/default-theme/?expand-path=$.shape)     |
