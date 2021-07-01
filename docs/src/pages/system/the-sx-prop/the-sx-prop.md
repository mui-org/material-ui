# The `sx` prop

<p class="description">The `sx` prop is a shortcut for defining custom style that has access to the theme.</p>

The property is a superset of CSS that packages [all the style functions](/system/basics/#all-inclusive) that are exposed in `@material-ui/system`.
You can specify any valid CSS using this prop.

## Example

{{"demo": "pages/system/the-sx-prop/Example.js", "bg": true, "defaultCodeOpen": true}}

On the example above, you can notice that some of the values are not valid CSS properties.
This is because the `sx` keys are mapped to specific properties of the theme.
In the following sections, you will learn how different `sx` properties are mapped to specific parts of the theme.

## Theme aware properties

### Borders

The `border` property can receive only a number as a value and and it will create a solid black border using the number as the width.

```jsx
<Box sx={{ border: 1 }} />
// equivalent to border: '1px solid black'
```

The `borderColor` property can receive a string, which represents the path in the `theme.palette`.

```jsx
<Box sx={{ borderColor: 'primary.main' }} />
// equivalent to borderColor: theme => theme.palette.primary.main
```

The `borderRadius` properties multiples the value it receives by the `theme.shape.borderRadius` value (the default for the value is `4px`).

```jsx
<Box sx={{ borderRadius: 2 }} />
// equivalent to borderRadius: theme => 2 * theme.shape.borderRadius
```

_Head to the [borders page](/system/borders/) for more examples._

### Display

The `displayPrint` property allows you to specify CSS `display` value, that will be applied only for printing.

```jsx
<Box sx={{ displayPrint: 'none' }} /> // equivalent to '@media print': { display: 'none' }
```

_Head to the [display page](/system/display/) for more examples._

### Grid

The grid CSS properties `gap`, `rowGap` and `columnGap` multiply the values they receive by the `theme.spacing` value (the default for the value is `8px`).

```jsx
<Box sx={{ gap: 2 }} />
// equivalent to gap: theme => theme.spacing(2)
```

_Head to the [grid page](/system/grid/) for more examples._

### Palette

The `color` and `backgroundColor` properties can receive a string, which represents the path in the `theme.palette`.

```jsx
<Box sx={{ color: 'primary.main' }} />
// equivalent to color: theme => theme.palette.primary.main
```

The `backgroundColor` property is also available trough its alias `bgcolor`.

```jsx
<Box sx={{ bgcolor: 'primary.main' }} />
// equivalent to backgroundColor: theme => theme.palette.primary.main
```

_Head to the [palette page](/system/palette/) for more examples._

### Positions

The `zIndex` property maps its value to the `theme.zIndex` value.

```jsx
<Box sx={{ zIndex: 'tooltip' }} />
// equivalent to backgroundColor: theme => theme.zIndex.tooltip
```

_Head to the [positions page](/system/positions/) for more examples._

### Shadows

The `boxShadow` property maps its value to the `theme.shadows` value.

```jsx
<Box sx={{ boxShadow: 1 }} />
// equivalent to boxShadow: theme => theme.shadows[1]
```

_Head to the [shadows page](/system/shadows/) for more examples._

### Sizing

The sizing properties: `width`, `height`, `minHeight`, `maxHeight`, `minWidth` and `maxWidth` are using the following custom transform function for the value:

```js
function transform(value) {
  return value <= 1 ? `${value * 100}%` : value;
}
```

Basically, if the value is between [0, 1] it is converted to percent, otherwise it is directly set on the CSS property.

```jsx
<Box sx={{ width: 0.5 }} /> // equivalent to width: '50%'
<Box sx={{ width: 20 }} /> // equivalent to width: '20px'
```

_Head to the [sizing page](/system/sizing/) for more examples._

### Spacing

The spacing properties: `margin`, `padding` and the corresponding longhand properties multiply the values they receive by the `theme.spacing` value (the default for the value is `8px`).

```jsx
<Box sx={{ margin: 2 }} />
// equivalent to margin: theme => theme.spacing(2)
```

The following aliases are availabel for the spacing properties:

| Prop | CSS property                    |
| :--- | :------------------------------ |
| `m`  | `margin`                        |
| `mt` | `margin-top`                    |
| `mr` | `margin-right`                  |
| `mb` | `margin-bottom`                 |
| `ml` | `margin-left`                   |
| `mx` | `margin-left`, `margin-right`   |
| `my` | `margin-top`, `margin-bottom`   |
| `p`  | `padding`                       |
| `pt` | `padding-top`                   |
| `pr` | `padding-right`                 |
| `pb` | `padding-bottom`                |
| `pl` | `padding-left`                  |
| `px` | `padding-left`, `padding-right` |
| `py` | `padding-top`, `padding-bottom` |

_Head to the [spacing page](/system/spacing/) for more examples._

### Typography

The `fontFamily`, `fontSize`, `fontStyle`, `fontWeight` properties map their value to the `theme.typgraphy` value.

```jsx
<Box sx={{ fontWeight: 'fontWeightLight' }} />
// equivalent to fontWeight: theme.typography.fontWeightLight
```

The same can be achieved by ommiting the CSS property prefix `fontWeight`.

```jsx
<Box sx={{ fontWeight: 'light' }} />
// equivalent to fontWeight: theme.typography.fontWeightLight
```

There is additional `typography` prop available, which sets all values defined in the specific `theme.typography` variant.

```jsx
<Box sx={{ typography: 'body1' }} />
// equivalent to { ...theme.typography.body1 }
```

_Head to the [typography page](/system/typography/) for more examples._

## Responsive values

All properties as part of the `sx` prop also have a support for defining different values for specific breakpoints. For more details on this, take a look at the [Responsive values section](/system/basics/#responsive-values).

## Callback values

Each property in the `sx` prop can receive a function callback as a value. This is useful when you want to use the `theme` for calculating some value.

```jsx
<Box sx={{ height: (theme) => theme.spacing(10) }} />
```

## Performance

If you are interested in the performance tradeoff, you can find more details [here](/system/basics/#performance-tradeoff).
