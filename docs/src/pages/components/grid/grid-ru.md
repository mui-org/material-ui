---
title: Компонент React Grid
components: Grid
githubLabel: 'component: Grid'
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grid

<p class="description">Сетка адаптивного макета Material Design адаптируется к размеру экрана и ориентации, обеспечивая согласованность макетов.</p>

[Сетка](https://material.io/design/layout/responsive-layout-grid.html) создает визуальную согласованность между макетами, позволяя гибко адаптироваться к разнообразным дизайнам. Адаптивный пользовательский интерфейс Material Design основан на сетке с 12 колонками.

{{"component": "modules/components/ComponentLinkHeader.js"}}

> ⚠️ Компонент `Сетка` не путать с сеткой данных; он ближе к раскладке сетки. Для передачи данных заголовок перейти к: [компоненту `DataGrid`](/components/data-grid/).

## Как это работает

Система сетки реализована с помощью компонента `Grid`:

- Она использует [модуль Flexible Box CSS](https://www.w3.org/TR/css-flexbox-1/) для повышенной гибкости.
- Существует два типа макетов: *containers* и *items*.
- Ширина item задается в процентах, поэтому они всегда гибко изменяют свой размер относительно родительского элемента.
- Элементы имеют отступы для создания промежутков между отдельными элементами.
- Существует пять контрольных точек прерывания сетки: xs, sm, md, lg и xl.
- Каждой точке останова (breakpoint) могут быть присвоены целые значения, указывая сколько из 12 доступных столбцов занято компонентом, когда ширина видимости соответствует [breakpoint constants](/customization/breakpoints/#default-breakpoints) (константе breakpoint).

Если вы **слабо знакомы (или совсем незнакомы) с Flexbox**, мы рекомендуем Вам прочитать это руководство [CSS-Tricks Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Адаптивные сетки

Адаптивные сетки используют столбцы, которые меняют свою ширину и масштабируют размер содержимого. A fluid grid's layout can use breakpoints to determine if the layout needs to change dramatically.

### Базовая сетка

Column widths are integer values between 1 and 12; they apply at any breakpoint and indicate how many columns are occupied by the component.

A value given to a breakpoint applies to all the other breakpoints wider than it (unless overridden, as you can read later in this page). For example, `xs={12}` sizes a component to occupy the whole viewport width regardless of its size.

{{"demo": "pages/components/grid/BasicGrid.js", "bg": true}}

### Сетка с несколькими breakpoints

Components may have multiple widths defined, causing the layout to change at the defined breakpoint. Width values given to larger breakpoints override those given to smaller breakpoints.

For example, `xs={12} sm={6}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is [600 or more pixels](/customization/breakpoints/#default-breakpoints). For smaller viewports, the component fills all 12 available columns.

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## Интервал

To control space between children, use the `spacing` prop. The spacing value can be any positive number, including decimals and any string. The prop is converted into a CSS property using the [`theme.spacing()`](/customization/spacing/) helper.

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Responsive values

You can switch the props' value based on the active breakpoint. For instance, we can implement the ["recommended"](https://material.io/design/layout/responsive-layout-grid.html) responsive layout grid of Material Design.

{{"demo": "pages/components/grid/ResponsiveGrid.js", "bg": true}}

Responsive values is supported by:

- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- all the [other props](#system-props) of the system

> ⚠️ When using a responsive `columns` prop, each grid item needs its corresponding breakpoint. For instance, this is not working. The grid item misses the value for `md`:
> 
> ```jsx
> <Grid container columns={{ xs: 4, md: 12 }}>
>    <Grid item xs={2} />
> > </Grid>
> ```

### Row & column spacing

The `rowSpacing` and `columnSpacing` props allow for specifying the row and column gaps independently. It's similar to the `row-gap` and `column-gap` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap).

{{"demo": "pages/components/grid/RowAndColumnSpacing.js", "bg": true}}

## Интерактивность

Ниже приведен интерактивный пример, который демонстрирует результаты различных настроек сетки:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Авто-разметка

The Auto-layout makes the _items_ equitably share the available space. That also means you can set the width of one _item_ and the others will automatically resize around it.

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## Сложная сетка

The following demo doesn't follow the Material Design guidelines, but illustrates how the grid can be used to build complex layouts.

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Вложенная сетка

The `container` and `item` props are two independent booleans; they can be combined to allow a Grid component to be both a flex container and child.

> A flex **container** is the box generated by an element with a computed display of `flex` or `inline-flex`. In-flow children of a flex container are called flex **items** and are laid out using the flex layout model.

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

⚠️ Defining an explicit width to a Grid element that is flex container, flex item, and has spacing at the same time lead to unexpected behavior, avoid doing it:

```jsx
<Grid spacing={1} container item xs={12}>
```

If you need to do such, remove one of the props.

## Столбцы

You can change the default number of columns (12) with the `columns` prop.

{{"demo": "pages/components/grid/ColumnsGrid.js", "bg": true}}

## Ограничения

### Отрицательный margin

The spacing between items is implemented with a negative margin. This might lead to unexpected behaviors. For instance, to apply a background color, you need to apply `display: flex;` to the parent.

### white-space: nowrap;

Первоначальные настройки для flex-элементов (flex items) равны `min-width: auto`. Это вызывает конфликт позиционирования, когда потомки используют `white-space: nowrap;`. Вы можете получить проблему с кодом такого типа:

```jsx
<Grid item xs>
  <Typography noWrap>
```

Чтобы элемент оставался в контейнере, необходимо установить `min-width: 0`. In practice, you can set the `zeroMinWidth` prop:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

The `xs`, `sm`, `md`, `lg`, and `xl` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers. If used, these props may have undesirable effects on the height of the `Grid` item elements.

## CSS макет сетки

The `Grid` component is using CSS flexbox internally. But as seen below, you can easily use [the system](/system/grid/) and CSS Grid to layout your pages.

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}

## System props

As a CSS utility component, the `Grid` supports all [`system`](/system/properties/) properties. You can use them as props directly on the component. For instance, a padding:

```jsx
<Grid item p={2}>
```
