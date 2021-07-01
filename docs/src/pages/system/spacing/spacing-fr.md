# Ecartement

<p class="description">A wide range of shorthand responsive margin and padding utility classes to modify an element's appearance.</p>

## Notation

L'utilitaire space convertit les marges abrégées et les accessoires de remplissage en déclarations CSS de marge et de remplissage. Les accessoires sont nommés au format `{property}{sides}`.

Where *property* is one of:

- `m` - for classes that set *margin*
- `p` - for classes that set *padding*

Where *sides* is one of:

- `t` - for classes that set *margin-top* or *padding-top*
- `b` - for classes that set *margin-bottom* or *padding-bottom*
- `l` - for classes that set *margin-left* or *padding-left*
- `r` - for classes that set *margin-right* or *padding-right*
- `x` - for classes that set both **-left* and **-right*
- `y` - for classes that set both **-top* and **-bottom*
- vide - pour les classes qui définissent une marge ou un remplissage sur les 4 côtés de l'élément

## Transformation

En fonction de l'entrée et de la configuration du thème, la transformation suivante est appliquée :

- input: `number` & theme: `number`: the property is multiplied by the theme value.

```jsx
const theme = {
  spacing: 8,
}

<Box sx={{ m: -2 }} /> // margin: -16px;
<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 0.5 }} /> // margin: 4px;
<Box sx={{ m: 2 }} /> // margin: 16px;
```

- input: `number` & theme: `array`: the property is value is used as the array index.

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box sx={{ m: -2 }} /> // margin: -3px;
<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 2 }} /> // margin: 3px;
```

- input: `number` & theme: `function`: the function is called with the property value.

```jsx
const theme = {
  spacing: value => value ** 2,
}

<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 2 }} /> // margin: 4px;
```

- input: `string`: the property is passed as raw CSS value.

```jsx
<Box sx={{ m: "2rem" }} /> // margin: 2rem;
<Box sx={{ mx: "auto" }} /> // margin-left: auto; margin-right: auto;
```

## Exemple

{{"demo": "pages/system/spacing/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ p: 1 }}>…
<Box sx={{ m: 1 }}>…
<Box sx={{ p: 2 }}>…
```

## Centrage horizontal

The CSS flex and grid display properties are often used to align elements at the center. However, you can also use `margin-left: auto;`, `margin-right: auto;`, and a width for horizontally centering:

{{"demo": "pages/system/spacing/HorizontalCentering.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ mx: "auto" }}>…
```

## API

```js
import { spacing } from '@material-ui/system';
```

| Nom importé | Propriété | Propriété CSS                   | Clé du thème                                                     |
|:----------- |:--------- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing`   | `m`       | `margin`                        | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mt`      | `margin-top`                    | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mr`      | `margin-right`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mb`      | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `ml`      | `margin-left`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mx`      | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `my`      | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `p`       | `padding`                       | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pt`      | `padding-top`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pr`      | `padding-right`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pb`      | `padding-bottom`                | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pl`      | `padding-left`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `px`      | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `py`      | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |

_Certaines personnes trouvent le raccourci de prop déroutant, vous pouvez utiliser la version complète si vous préférez :_

```diff
-<Box sx={{ pt: 2 }} />
+<Box sx={{ paddingTop: 2 }} />
```

```diff
-<Box sx={{ px: 2 }} />
+<Box sx={{ paddingX: 2 }} />
```
