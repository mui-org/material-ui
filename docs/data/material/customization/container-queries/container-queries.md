# Container queries

<p class="description">Material UI provides a utility function for creating CSS container queries based on theme breakpoints.</p>

## Usage

To create [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries), use `theme.containerQueries` with any method available in the [`theme.breakpoints`](/material-ui/customization/breakpoints/#api).
The value can be unitless (in which case it'll be rendered in pixels), a string, or a breakpoint key. For example:

```js
theme.containerQueries.up('sm'); // => '@container (min-width: 600px)'
```

{{"component": "file://./demos/basic/index.ts"}}

:::info
One of the ancestors must have the CSS container type specified.
:::

### Named containment contexts

To refer to a [containment context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries#naming_containment_contexts), call the `containerQueries` method with the name of the container for access to all breakpoint methods:

```js
theme.containerQueries('sidebar').up('500px'); // => '@container sidebar (min-width: 500px)'
```

## Shorthand syntax

When adding styles using the `sx` prop, use the `@<size>` or `@<size>/<name>` notation to apply container queries without referring to the theme.

- `<size>`: a width or a breakpoint key.
- `<name>` (optional): a named containment context.

{{"component": "file://./demos/sx-prop/index.ts"}}

### Caveats

- The `@` prefix with a unitless value renders as `px`, so `@500` is equivalent to `500px`—but `@500px` is incorrect syntax and won't render correctly.
- `@` with no number renders as `0px`.
- Container queries must share the same units (the sizes can be defined in any order), as shown below:

  ```js
  // ✅ These container queries will be sorted correctly.
  padding: {
    '@40em': 4,
    '@20em': 2,
    '@': 0,
  }

  // ❌ These container queries won't be sorted correctly
  //    because 40em is typically greater than 50px
  //    and the units don't match.
  padding: {
    '@40em': 4,
    '@50': 2,
    '@': 0,
  }
  ```

## API

CSS container queries support all the methods available in [the breakpoints API](/material-ui/customization/breakpoints/#api).

```js
// For default breakpoints
theme.containerQueries.up('sm'); // => '@container (min-width: 600px)'
theme.containerQueries.down('md'); // => '@container (max-width: 900px)'
theme.containerQueries.only('md'); // => '@container (min-width: 600px) and (max-width: 900px)'
theme.containerQueries.between('sm', 'lg'); // => '@container (min-width: 600px) and (max-width: 1200px)'
theme.containerQueries.not('sm'); // => '@container (max-width: 600px)'
```
