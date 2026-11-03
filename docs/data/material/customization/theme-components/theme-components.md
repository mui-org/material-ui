# Themed components

<p class="description">You can customize a component's styles, default props, and more by using its component key inside the theme.</p>

The `components` key in the theme helps to achieve styling consistency across your application.
However, the theme isn't tree-shakable, prefer creating new components for heavy customizations.

## Theme default props

Every Material UI component has default values for each of its props.
To change these default values, use the `defaultProps` key exposed in the theme's `components` key:

```js
const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});
```

{{"component": "file://./demos/default-props/index.ts"}}

If you're using TypeScript and [lab components](/material-ui/about-the-lab/), check [this article to learn how to override their styles](/material-ui/about-the-lab/#typescript).

## Theme style overrides

The theme's `styleOverrides` key makes it possible to change the default styles of any Material UI component.

`styleOverrides` requires a slot name as a key (use `root` to target the outer-most element) and an object with CSS properties as a value.
Nested CSS selectors are also supported as values.

```js
const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});
```

{{"component": "file://./demos/global-theme-override/index.ts"}}

### Variants

Most components include design-related props that affect their appearance.
For example, the Card component supports a `variant` prop where you can pick `outlined` as a value that adds a border.

If you want to override styles based on a specific prop, you can use the `variants` key in the particular slot that contains `props` and `style` keys. When the component's `props` matches, the `style` will be applied.

Override definitions are specified as an array.
Also, ensure that any styles that should take precedence are listed last.

#### Overriding styles based on existing props

The example below demonstrates the increase of the border thickness of the `outlined` Card:

```js
const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'outlined' },
              style: {
                borderWidth: '3px',
              },
            },
          ],
        },
      },
    },
  },
});
```

#### Adding styles based on new values

The example below demonstrates the addition of a new variant `dashed` to the Button component:

```js
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              // `dashed` is an example value, it can be any name.
              props: { variant: 'dashed' },
              style: {
                textTransform: 'none',
                border: `2px dashed ${blue[500]}`,
              },
            },
          ],
        },
      },
    },
  },
});
```

#### Overriding styles based on existing and new props

The example below demonstrates the override of styles when the Button's variant is `dashed` (a new variant) and color is `secondary` (an existing color):

```js
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'dashed', color: 'secondary' },
              style: {
                border: `4px dashed ${red[500]}`,
              },
            },
          ],
        },
      },
    },
  },
});
```

If you're using TypeScript, you'll need to specify your new variants/colors, using [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

<!-- Tested with packages/mui-material/test/typescript/augmentation/themeComponents.spec.ts -->

```tsx
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

{{"component": "file://./demos/global-theme-variants/index.ts"}}

The variant `props` can also be defined as a callback, allowing you to apply styles based on conditions. This is useful for styling when a property does not have a specific value.

```js
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: (props) =>
                props.variant === 'dashed' && props.color !== 'secondary',
              style: {
                textTransform: 'none',
                border: `2px dashed ${blue[500]}`,
              },
            },
          ],
        },
      },
    },
  },
});
```

### Slot ownerState callback (deprecated)

Using callback to access slot's `ownerState` has been deprecated, use [variants](#variants) instead.

```diff
 const theme = createTheme({
   components: {
     MuiButton: {
       styleOverrides: {
-        root: ({ ownerState, theme }) => ({ ... }),
+        root: {
+          variants: [...],
         },
       },
     },
   },
 });
```

### The `sx` syntax (experimental)

The `sx` prop acts as a shortcut for defining custom styles that access the theme object.
This prop lets you write inline styles using a superset of CSS.
Learn more about [the concept behind the `sx` prop](/system/getting-started/the-sx-prop/) and [how `sx` differs from the `styled` utility](/system/styled/#difference-with-the-sx-prop).

You can use the `sx` prop inside the `styleOverrides` key to modify styles within the theme using shorthand CSS notation.
This is especially handy if you're already using the `sx` prop with your components because you can use the same syntax in your theme and quickly transfer styles between the two.

:::info
The `sx` prop is a stable feature for customizing components since Material UI v5, but it is still considered _experimental_ when used directly inside the theme object.
:::

{{"component": "file://./demos/global-theme-override-sx/index.ts", "collapseToEmpty": true}}

```tsx
const finalTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            px: 1,
            py: 0.25,
            borderRadius: 1,
          }),
        label: {
          padding: 'initial',
        },
        icon: ({ theme }) =>
          theme.unstable_sx({
            mr: 0.5,
            ml: '-2px',
          }),
      },
    },
  },
});
```

### Specificity

If you use the theming approach to customize the components, you'll still be able to override them using the `sx` prop as it has a higher CSS specificity, even if you're using the experimental `sx` syntax within the theme.

## Theme variables

Another way to override the look of all component instances is to adjust the [theme configuration variables](/material-ui/customization/theming/#theme-configuration-variables).

```js
const theme = createTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"component": "file://./demos/theme-variables/index.ts"}}
