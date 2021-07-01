# Sizing (Dimensionnement)

<p class="description">Easily make an element as wide or as tall (relative to its parent) with the width and height utilities.</p>

## Supported values

The sizing style functions support different property input type:

{{"demo": "pages/system/sizing/Values.js", "defaultCodeOpen": false}}

```jsx
// Numbers in [0,1] are multiplied by 100 and converted to % values.
<Box sx={{ width: 1/4 }}>
<Box sx={{ width: 300 }}> // Numbers are converted to pixel values.
<Box sx={{ width: '75%' }}> // Valores de string são usados como CSS bruto.
<Box sx={{ width: 1 }}> // 100%
```

## Width

{{"demo": "pages/system/sizing/Width.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ width: '25%' }}>…
<Box sx={{ width: '50%' }}>…
<Box sx={{ width: '75%' }}>…
<Box sx={{ width: '100%' }}>…
<Box sx={{ width: 'auto' }}>…
```

## Height

{{"demo": "pages/system/sizing/Height.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ height: '25%' }}>…
<Box sx={{ height: '50%' }}>…
<Box sx={{ height: '75%' }}>…
<Box sx={{ height: '100%' }}>…
```

## API

```js
import { sizing } from '@material-ui/system';
```

| Nom importé | Propriété   | Propriété CSS | Clé du thème |
|:----------- |:----------- |:------------- |:------------ |
| `width`     | `width`     | `width`       | none         |
| `maxWidth`  | `maxWidth`  | `max-width`   | none         |
| `minWidth`  | `minWidth`  | `min-width`   | none         |
| `height`    | `height`    | `height`      | none         |
| `maxHeight` | `maxHeight` | `max-height`  | none         |
| `minHeight` | `minHeight` | `min-height`  | none         |
| `boxSizing` | `boxSizing` | `box-sizing`  | none         |
