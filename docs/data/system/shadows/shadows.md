# Shadows

<p class="description">Add or remove shadows to elements with box-shadow utilities.</p>

## Example

The helpers allow you to control relative depth, or distance, between two surfaces along the z-axis.
By default, there are 25 elevation levels.

{{"component": "file://./demos/demo/index.ts", "collapseToEmpty": true, "bg": true}}

```jsx
<Box sx={{ boxShadow: 0 }}>…
<Box sx={{ boxShadow: 1 }}>…
<Box sx={{ boxShadow: 2 }}>…
<Box sx={{ boxShadow: 3 }}>…
```

## API

```js
import { shadows } from '@mui/system';
```

| Import name | Prop        | CSS property | Theme key |
| :---------- | :---------- | :----------- | :-------- |
| `boxShadow` | `boxShadow` | `box-shadow` | `shadows` |
