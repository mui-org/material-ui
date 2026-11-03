# Properties

<p class="description">This API page lists all the custom MUI System properties, how they are linked with the theme, and which CSS properties they compute.</p>

While this page documents the custom properties, MUI System was designed to be a superset of CSS, so all other regular CSS properties and selectors are supported too.

## Properties reference table

Note that this table only lists custom properties. All other regular CSS properties and selectors are supported too. You can check out the [legend](/system/properties/#legend) below.

| System key(s)         | CSS property/properties                                                                      | System style function                                        | Theme mapping                                                                                       |
| :-------------------- | :------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| `border`              | `border`                                                                                     | [`border`](/system/borders/#border)                          | `${value}px solid`                                                                                  |
| `borderBottom`        | `border-bottom`                                                                              | [`borderBottom`](/system/borders/#border)                    | `${value}px solid`                                                                                  |
| `borderColor`         | `border-color`                                                                               | [`borderColor`](/system/borders/#border-color)               | [`theme.palette[value]`](/material-ui/customization/default-theme/?expand-path=$.palette)           |
| `borderLeft`          | `border-left`                                                                                | [`borderLeft`](/system/borders/#border)                      | `${value}px solid`                                                                                  |
| `borderRadius`        | `border-radius`                                                                              | [`borderRadius`](/system/borders/#border-radius)             | [`theme.shape.borderRadius * value`](/material-ui/customization/default-theme/?expand-path=$.shape) |
| `borderRight`         | `border-right`                                                                               | [`borderRight`](/system/borders/#border)                     | `${value}px solid`                                                                                  |
| `borderTop`           | `border-top`                                                                                 | [`borderTop`](/system/borders/#border)                       | `${value}px solid`                                                                                  |
| `boxShadow`           | `box-shadow`                                                                                 | [`boxShadow`](/system/shadows/)                              | `theme.shadows[value]`                                                                              |
| `displayPrint`        | `display`                                                                                    | [`displayPrint`](/system/display/#display-in-print)          | none                                                                                                |
| `display`             | `display`                                                                                    | [`displayRaw`](/system/display/)                             | none                                                                                                |
| `alignContent`        | `align-content`                                                                              | [`alignContent`](/system/flexbox/#align-content)             | none                                                                                                |
| `alignItems`          | `align-items`                                                                                | [`alignItems`](/system/flexbox/#align-items)                 | none                                                                                                |
| `alignSelf`           | `align-self`                                                                                 | [`alignSelf`](/system/flexbox/#align-self)                   | none                                                                                                |
| `flex`                | `flex`                                                                                       | [`flex`](/system/flexbox/)                                   | none                                                                                                |
| `flexDirection`       | `flex-direction`                                                                             | [`flexDirection`](/system/flexbox/#flex-direction)           | none                                                                                                |
| `flexGrow`            | `flex-grow`                                                                                  | [`flexGrow`](/system/flexbox/#flex-grow)                     | none                                                                                                |
| `flexShrink`          | `flex-shrink`                                                                                | [`flexShrink`](/system/flexbox/#flex-shrink)                 | none                                                                                                |
| `flexWrap`            | `flex-wrap`                                                                                  | [`flexWrap`](/system/flexbox/#flex-wrap)                     | none                                                                                                |
| `justifyContent`      | `justify-content`                                                                            | [`justifyContent`](/system/flexbox/#justify-content)         | none                                                                                                |
| `order`               | `order`                                                                                      | [`order`](/system/flexbox/#order)                            | none                                                                                                |
| `gap`                 | `gap`                                                                                        | [`gap`](/system/grid/#gap)                                   | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `columnGap`           | `column-gap`                                                                                 | [`columnGap`](/system/grid/#row-gap-column-gap)              | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `rowGap`              | `row-gap`                                                                                    | [`rowGap`](/system/grid/#row-gap-column-gap)                 | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `gridColumn`          | `grid-column`                                                                                | [`gridColumn`](/system/grid/#grid-column)                    | none                                                                                                |
| `gridRow`             | `grid-row`                                                                                   | [`gridRow`](/system/grid/#grid-row)                          | none                                                                                                |
| `gridAutoFlow`        | `grid-auto-flow`                                                                             | [`gridAutoFlow`](/system/grid/#grid-auto-flow)               | none                                                                                                |
| `gridAutoColumns`     | `grid-auto-columns`                                                                          | [`gridAutoColumns`](/system/grid/#grid-auto-columns)         | none                                                                                                |
| `gridAutoRows`        | `grid-auto-rows`                                                                             | [`gridAutoRows`](/system/grid/#grid-auto-rows)               | none                                                                                                |
| `gridTemplateColumns` | `grid-template-columns`                                                                      | [`gridTemplateColumns`](/system/grid/#grid-template-columns) | none                                                                                                |
| `gridTemplateRows`    | `grid-template-rows`                                                                         | [`gridTemplateRows`](/system/grid/#grid-template-rows)       | none                                                                                                |
| `gridTemplateAreas`   | `grid-template-areas`                                                                        | [`gridTemplateAreas`](/system/grid/#grid-template-areas)     | none                                                                                                |
| `gridArea`            | `grid-area`                                                                                  | [`gridArea`](/system/grid/#grid-area)                        | none                                                                                                |
| `bgcolor`             | `background-color`                                                                           | [`bgcolor`](/system/palette/#background-color)               | [`theme.palette[value]`](/material-ui/customization/default-theme/?expand-path=$.palette)           |
| `color`               | `color`                                                                                      | [`color`](/system/palette/#color)                            | [`theme.palette[value]`](/material-ui/customization/default-theme/?expand-path=$.palette)           |
| `bottom`              | `bottom`                                                                                     | [`bottom`](/system/positions/)                               | none                                                                                                |
| `left`                | `left`                                                                                       | [`left`](/system/positions/)                                 | none                                                                                                |
| `position`            | `position`                                                                                   | [`position`](/system/positions/)                             | none                                                                                                |
| `right`               | `right`                                                                                      | [`right`](/system/positions/)                                | none                                                                                                |
| `top`                 | `top`                                                                                        | [`top`](/system/positions/)                                  | none                                                                                                |
| `zIndex`              | `z-index`                                                                                    | [`zIndex`](/system/positions/#z-index)                       | [`theme.zIndex[value]`](/material-ui/customization/default-theme/?expand-path=$.zIndex)             |
| `height`              | `height`                                                                                     | [`height`](/system/sizing/#height)                           | none                                                                                                |
| `maxHeight`           | `max-height`                                                                                 | [`maxHeight`](/system/sizing/)                               | none                                                                                                |
| `maxWidth`            | `max-width`                                                                                  | [`maxWidth`](/system/sizing/)                                | none                                                                                                |
| `minHeight`           | `min-height`                                                                                 | [`minHeight`](/system/sizing/)                               | none                                                                                                |
| `minWidth`            | `min-width`                                                                                  | [`minWidth`](/system/sizing/)                                | none                                                                                                |
| `width`               | `width`                                                                                      | [`width`](/system/sizing/#width)                             | none                                                                                                |
| `boxSizing`           | `box-sizing`                                                                                 | [`boxSizing`](/system/sizing/)                               | none                                                                                                |
| `m`, `margin`         | `margin`                                                                                     | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `mb`, `marginBottom`  | `margin-bottom`                                                                              | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `ml`, `marginLeft`    | `margin-left`                                                                                | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `mr`, `marginRight`   | `margin-right`                                                                               | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `mt`, `marginTop`     | `margin-top`                                                                                 | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `mx`, `marginX`       | `margin-left`, `margin-right`                                                                | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `my`, `marginY`       | `margin-top`, `margin-bottom`                                                                | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `marginInline`        | `margin-inline`                                                                              | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `marginInlineStart`   | `margin-inline-start`                                                                        | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `marginInlineEnd`     | `margin-inline-end`                                                                          | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `marginBlock`         | `margin-block`                                                                               | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `marginBlockStart`    | `margin-block-start`                                                                         | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `marginBlockEnd`      | `margin-block-end`                                                                           | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `p`, `padding`        | `padding`                                                                                    | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `pb`, `paddingBottom` | `padding-bottom`                                                                             | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `pl`, `paddingLeft`   | `padding-left`                                                                               | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `pr`, `paddingRight`  | `padding-right`                                                                              | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `pt`, `paddingTop`    | `padding-top`                                                                                | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `px`, `paddingX`      | `padding-left`, `padding-right`                                                              | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `py`, `paddingY`      | `padding-top`, `padding-bottom`                                                              | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `paddingInline`       | `padding-inline`                                                                             | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `paddingInlineStart`  | `padding-inline-start`                                                                       | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `paddingInlineEnd`    | `padding-inline-end`                                                                         | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `paddingBlock`        | `padding-block`                                                                              | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `paddingBlockStart`   | `padding-block-start`                                                                        | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `paddingBlockEnd`     | `padding-block-end`                                                                          | [`spacing`](/system/spacing/)                                | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing)           |
| `typography`          | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`typography`](/system/typography/#variant)                  | [`theme.typography[value]`](/material-ui/customization/default-theme/?expand-path=$.typography)     |
| `fontFamily`          | `font-family`                                                                                | [`fontFamily`](/system/typography/#font-family)              | [`theme.typography[value]`](/material-ui/customization/default-theme/?expand-path=$.typography)     |
| `fontSize`            | `font-size`                                                                                  | [`fontSize`](/system/typography/#font-size)                  | [`theme.typography[value]`](/material-ui/customization/default-theme/?expand-path=$.typography)     |
| `fontStyle`           | `font-style`                                                                                 | [`fontStyle`](/system/typography/#font-style)                | [`theme.typography[value]`](/material-ui/customization/default-theme/?expand-path=$.typography)     |
| `fontWeight`          | `font-weight`                                                                                | [`fontWeight`](/system/typography/#font-weight)              | [`theme.typography[value]`](/material-ui/customization/default-theme/?expand-path=$.typography)     |
| `letterSpacing`       | `letter-spacing`                                                                             | [`letterSpacing`](/system/typography/#letter-spacing)        | [`theme.typography[value]`](/material-ui/customization/default-theme/?expand-path=$.typography)     |
| `lineHeight`          | `line-height`                                                                                | [`lineHeight`](/system/typography/#line-height)              | [`theme.typography[value]`](/material-ui/customization/default-theme/?expand-path=$.typography)     |
| `textAlign`           | `text-align`                                                                                 | [`textAlign`](/system/typography/#text-alignment)            | none                                                                                                |

## Legend

Let's take one row from [the table above](#properties-reference-table), for example:

| System key(s)        | CSS property/properties | System style function         | Theme mapping                                                                             |
| :------------------- | :---------------------- | :---------------------------- | :---------------------------------------------------------------------------------------- |
| `mb`, `marginBottom` | `margin-bottom`         | [`spacing`](/system/spacing/) | [`theme.spacing(value)`](/material-ui/customization/default-theme/?expand-path=$.spacing) |

<br />

and detail each column:

- **System keys**.
  The column lists the key(s) by which you can use this property with the `sx` prop.

  ```jsx
  <Button sx={{ mb: 3 }}>
  // or
  <Box sx={{ mb: 3 }}>
  // or
  <Box sx={{ marginBottom: 3 }}>
  ```

- **CSS properties**.
  The column describes which CSS property will be generated when this system property is used.

  ```css
  .my-class {
    margin-bottom: Xpx;
  }
  ```

- **System style function**.
  The column lists the function which generates the properties shown in the other columns, as a reference in case you want to add this functionality to your custom components. The functions can be imported from `@mui/system`.
  You can see an example of using the style functions on the [Custom components page](/system/getting-started/custom-components/#using-standalone-system-utilities). The content links to the documentation page where this properties are described; in this example, the [spacing](/system/spacing/) page.

- **Theme mapping**.
  Lastly, the column tells you how this property is wired with the theme – with this example, whatever value you provide will be used as input to the `theme.spacing` helper.

Let's take a look at an example:

```jsx
<Button sx={{ mb: 3 }} />

// is equivalent to
<Button sx={{ marginBottom: theme => theme.spacing(3)}} />
```

As the default theme spacing is 8px, this will result in the following CSS class:

```css
.my-class {
  margin-bottom: 24px;
}
```
