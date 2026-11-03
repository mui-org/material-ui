# Positions

<p class="description">Use these shorthand utilities for quickly configuring the position of an element.</p>

## z-index

{{"component": "file://./demos/z-index/index.ts", "collapseToEmpty": true, "bg": true}}

```jsx
<Box sx={{ zIndex: 'tooltip' }}>
<Box sx={{ zIndex: 'modal' }}>
```

## API

```js
import { positions } from '@mui/system';
```

| Import name | Prop       | CSS property | Theme key                                                                  |
| :---------- | :--------- | :----------- | :------------------------------------------------------------------------- |
| `position`  | `position` | `position`   | none                                                                       |
| `zIndex`    | `zIndex`   | `z-index`    | [`zIndex`](/material-ui/customization/default-theme/?expand-path=$.zIndex) |
| `top`       | `top`      | `top`        | none                                                                       |
| `right`     | `right`    | `right`      | none                                                                       |
| `bottom`    | `bottom`   | `bottom`     | none                                                                       |
| `left`      | `left`     | `left`       | none                                                                       |
