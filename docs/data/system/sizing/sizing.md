# Sizing

<p class="description">Easily make an element as wide or as tall (relative to its parent) with the width and height utilities.</p>

## Supported values

The sizing properties: `width`, `height`, `minHeight`, `maxHeight`, `minWidth`, and `maxWidth` are using the following custom transform function for the value:

```js
function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
```

If the value is between (0, 1], it's converted to percent.
Otherwise, it is directly set on the CSS property.

{{"component": "file://./demos/values/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ width: 1/4 }}> // Equivalent to width: '25%'
<Box sx={{ width: 300 }}> // Numbers above 1 are treated as pixel values.
<Box sx={{ width: '75%' }}> // String values are used as raw CSS.
<Box sx={{ width: 1 }}> // 100% -- numbers in the range `(0, 1]` are treated as percentage values from 0 to 100%.
```

## Width

{{"component": "file://./demos/width/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ width: '25%' }}>…
<Box sx={{ width: '50%' }}>…
<Box sx={{ width: '75%' }}>…
<Box sx={{ width: '100%' }}>…
<Box sx={{ width: 'auto' }}>…
```

### Max-width

The max-width property allows setting a constraint on your breakpoints.
In this example, the value resolves to [`theme.breakpoints.values.md`](/material-ui/customization/default-theme/?expand-path=$.breakpoints.values).

```jsx
<Box sx={{ maxWidth: 'md' }}>…
```

## Height

{{"component": "file://./demos/height/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ height: '25%' }}>…
<Box sx={{ height: '50%' }}>…
<Box sx={{ height: '75%' }}>…
<Box sx={{ height: '100%' }}>…
```

## API

```js
import { sizing } from '@mui/system';
```

| Import name | Prop        | CSS property | Theme key                                                                                                |
| :---------- | :---------- | :----------- | :------------------------------------------------------------------------------------------------------- |
| `width`     | `width`     | `width`      | none                                                                                                     |
| `maxWidth`  | `maxWidth`  | `max-width`  | [`theme.breakpoints.values`](/material-ui/customization/default-theme/?expand-path=$.breakpoints.values) |
| `minWidth`  | `minWidth`  | `min-width`  | none                                                                                                     |
| `height`    | `height`    | `height`     | none                                                                                                     |
| `maxHeight` | `maxHeight` | `max-height` | none                                                                                                     |
| `minHeight` | `minHeight` | `min-height` | none                                                                                                     |
| `boxSizing` | `boxSizing` | `box-sizing` | none                                                                                                     |
