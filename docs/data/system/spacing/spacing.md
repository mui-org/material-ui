# Spacing

<p class="description">A wide range of shorthand responsive margin and padding utility classes to modify an element's appearance.</p>

## Notation

The space utility converts shorthand margin and padding props to margin and padding CSS declarations. The props are named using the format `{property}{sides}`.

Where _property_ is one of:

- `m` - for classes that set _margin_
- `p` - for classes that set _padding_

Where _sides_ is one of:

- `t` - for classes that set _margin-top_ or _padding-top_
- `b` - for classes that set _margin-bottom_ or _padding-bottom_
- `l` - for classes that set _margin-left_ or _padding-left_
- `r` - for classes that set _margin-right_ or _padding-right_
- `x` - for classes that set both _\*-left_ and _\*-right_
- `y` - for classes that set both _\*-top_ and _\*-bottom_
- blank - for classes that set a margin or padding on all 4 sides of the element

## Transformation

Depending on the input and the theme configuration, the following transformation is applied:

- input: `number` & theme: `number`: the prop value is multiplied by the theme value.

```jsx
const theme = {
  spacing: 8,
}

<Box sx={{ m: -2 }} /> // margin: -16px;
<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 0.5 }} /> // margin: 4px;
<Box sx={{ m: 2 }} /> // margin: 16px;
```

- input: `number` & theme: `array`: the prop value is used as the array index.

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box sx={{ m: -2 }} /> // margin: -3px;
<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 2 }} /> // margin: 3px;
```

- input: `number` & theme: `function`: the function is called with the prop value.

```jsx
const theme = {
  spacing: value => value * 2,
}

<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 2 }} /> // margin: 4px;
```

- input: `string`: the prop value is passed as raw CSS value.

```jsx
<Box sx={{ m: '2rem' }} /> // margin: 2rem;
<Box sx={{ mx: 'auto' }} /> // margin-left: auto; margin-right: auto;
```

## Example

{{"component": "file://./demos/demo/index.ts", "collapseToEmpty": true, "bg": true}}

```jsx
<Box sx={{ p: 1 }}>…
<Box sx={{ m: 1 }}>…
<Box sx={{ p: 2 }}>…
```

## Horizontal centering

The CSS flex and grid display properties are often used to align elements at the center.
However, you can also use `margin-left: auto;`, `margin-right: auto;`, and a width for horizontally centering:

{{"component": "file://./demos/horizontal-centering/index.ts", "collapseToEmpty": true, "bg": true}}

```jsx
<Box sx={{ mx: 'auto', width: 200 }}>…
```

## API

```js
import { spacing } from '@mui/system';
```

| Import name | Prop | CSS property                    | Theme key                                                                    |
| :---------- | :--- | :------------------------------ | :--------------------------------------------------------------------------- |
| `spacing`   | `m`  | `margin`                        | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mt` | `margin-top`                    | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mr` | `margin-right`                  | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mb` | `margin-bottom`                 | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `ml` | `margin-left`                   | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mx` | `margin-left`, `margin-right`   | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `my` | `margin-top`, `margin-bottom`   | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `p`  | `padding`                       | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pt` | `padding-top`                   | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pr` | `padding-right`                 | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pb` | `padding-bottom`                | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pl` | `padding-left`                  | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `px` | `padding-left`, `padding-right` | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `py` | `padding-top`, `padding-bottom` | [`spacing`](/material-ui/customization/default-theme/?expand-path=$.spacing) |

_Some people find the prop shorthand confusing, you can use the full version if you prefer:_

```diff
-<Box sx={{ pt: 2 }} />
+<Box sx={{ paddingTop: 2 }} />
```

```diff
-<Box sx={{ px: 2 }} />
+<Box sx={{ paddingX: 2 }} />
```
