# Typography

<p class="description">Documentation and examples for common text utilities to control alignment, wrapping, weight, and more.</p>

## Variant

{{"component": "file://./demos/variant/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ typography: 'subtitle2' }}>… // theme.typography.subtitle2
<Box sx={{ typography: 'body1' }}>…
<Box sx={{ typography: 'body2' }}>…
```

## Text alignment

{{"component": "file://./demos/text-alignment/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ textAlign: 'left' }}>…
<Box sx={{ textAlign: 'center' }}>…
<Box sx={{ textAlign: 'right' }}>…
```

## Text transformation

{{"component": "file://./demos/text-transform/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ textTransform: 'capitalize' }}>…
<Box sx={{ textTransform: 'lowercase' }}>…
<Box sx={{ textTransform: 'uppercase' }}>…
```

## Font weight

{{"component": "file://./demos/font-weight/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ fontWeight: 'light' }}>… // theme.typography.fontWeightLight
<Box sx={{ fontWeight: 'regular' }}>…
<Box sx={{ fontWeight: 'medium' }}>…
<Box sx={{ fontWeight: 500 }}>…
<Box sx={{ fontWeight: 'bold' }}>…
```

## Font size

{{"component": "file://./demos/font-size/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ fontSize: 'default' }}>…  // theme.typography.fontSize
<Box sx={{ fontSize: 'h6.fontSize' }}>…
<Box sx={{ fontSize: 16 }}>…
```

## Font style

{{"component": "file://./demos/font-style/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ fontStyle: 'normal' }}>…
<Box sx={{ fontStyle: 'italic' }}>…
<Box sx={{ fontStyle: 'oblique' }}>…
```

## Font family

{{"component": "file://./demos/font-family/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ fontFamily: 'default' }}>…
<Box sx={{ fontFamily: 'Monospace' }}>…
```

## Letter spacing

{{"component": "file://./demos/letter-spacing/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ letterSpacing: 6 }}>…
<Box sx={{ letterSpacing: 10 }}>…
```

## Line height

{{"component": "file://./demos/line-height/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ lineHeight: 'normal' }}>…
<Box sx={{ lineHeight: 10 }}>…
```

## API

```js
import { typography } from '@mui/system';
```

| Import name     | Prop            | CSS property                                                                                 | Theme key                                                                          |
| :-------------- | :-------------- | :------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `typography`    | `typography`    | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontFamily`    | `fontFamily`    | `font-family`                                                                                | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontSize`      | `fontSize`      | `font-size`                                                                                  | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontStyle`     | `fontStyle`     | `font-style`                                                                                 | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontWeight`    | `fontWeight`    | `font-weight`                                                                                | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `letterSpacing` | `letterSpacing` | `letter-spacing`                                                                             | none                                                                               |
| `lineHeight`    | `lineHeight`    | `line-height`                                                                                | none                                                                               |
| `textAlign`     | `textAlign`     | `text-align`                                                                                 | none                                                                               |
| `textTransform` | `textTransform` | `text-transform`                                                                             | none                                                                               |
