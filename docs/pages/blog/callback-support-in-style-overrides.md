---
title: Introducing callback support in style overrides
description: We're excited to introduce callback support for global theme overrides in this minor version update!
date: 2022-01-31T00:00:00.000Z
authors: ['siriwatknp']
tags: ['Material UI', 'Product']
manualCard: true
---

[Material UI v5.3.0](https://github.com/mui/material-ui/releases/tag/v5.3.0) introduces the ability to write a callback in style overrides (global theming), giving you full control of component customization at the theme level.

Why is using a callback better than the existing plain object? Let me explain from the beginning…

## The problems

In v4, the style engine library was JSS which had some limitations.
Style overrides were not able to support dynamic props via a callback so we relied on using classes. Take a look at the [`Chip` classes](https://github.com/mui/material-ui/blob/97d32b0ff3fae4537c20c79e619f132f4a5c5cbb/packages/mui-material/src/Chip/chipClasses.ts) for example – there are more than 20 classes that are incomplete if we count the permutation of elements (`root | avatar | icon | label | deleteIcon`), size (`small | medium | large`), and color (`primary | secondary | ...`).
This leads to a poor theming experience because developers need to know which specific key to customize.

We believe it would be better for developers if they could create custom styles by reading the component props, without ever needing to know what key they should use.

Fortunately, it is now possible in v5 because of the new style engine powered by emotion. Theming is simpler and more flexible. You only need to know the component's slot name and then provide an **object** (static overrides) or a **callback** (dynamic overrides).

## Using callback in `styleOverrides`

The callback gives you the `props` that the slot received. Most of the time you would use:

- `props.ownerState`: the combination of runtime props and internal states.
- `props.theme`: the theme object you provided to `ThemeProvider`, or the default one.

```jsx
import { ThemeProvider, createTheme } from '@mui/material/styles';

<ThemeProvider
  theme={createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          // you can now use the theme without creating the initial theme!
          root: ({ ownerState, theme }) => ({
            padding: {
              small: '8px 4px',
              medium: '12px 6px',
              large: '16px 8px',
            }[ownerState.size],
            ...(ownerState.variant === 'outlined' && {
              borderWidth: '2px',
              ...(ownerState.variant === 'primary' && {
                borderColor: theme.palette.primary.light,
              }),
            }),
          }),
          label: {
            padding: 0,
          },
        },
      },
    },
  })}
>
  ...your app
</ThemeProvider>;
```

> 💡 The side benefit of using a callback is that you can use the runtime theme without creating the outer scoped variable.

### TypeScript

The callback is type-safe.

- `ownerState`: `ComponentProps` interface, for example `ButtonProps`, `ChipProps`, etc.
- `theme`: `Theme` interface from `@mui/material/styles`.

```tsx
{
  MuiChip: {
    styleOverrides: {
      // ownerState: ChipProps
      // theme: Theme
      root: ({ ownerState, theme }) => ({...}),
    },
  }
}
```

If you extend the interface via module augmentation like this:

```ts
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

you will be able to see those props in `ownerState.variant` 🎉. `theme` can be augmented as well.

## Experimental `sx` function

Initially, `sx` was designed to be a prop that enables you to inject styles with a shorthand notation to components created with the `styled` API:

```jsx
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Label = styled('span')({
  fontWeight: 'bold',
  fontSize: '0.875rem',
})

<Box sx={{ display: 'flex' }}>
  <Label sx={{ color: 'text.secondary' }}>Label</Label>
</Box>;
```

:::info
All Material UI and Joy UI components are created with the `styled` API, so they accept `sx` prop by default.
:::

`sx` helps developers write less code and be more productive once they are familiar with the API. With the callback support in `styleOverrides`, it is now possible to use an `sx`-like syntax in global theme overrides.

All you need is to use the [`unstable_sx`](/system/styled/#how-can-i-use-the-sx-syntax-with-the-styled-utility) function from the `theme`. In the following example, the `sx` is used to style the `Chip` component:

```jsx
import { ThemeProvider, createTheme } from '@mui/material/styles';

<ThemeProvider
  theme={createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) =>
            theme.unstable_sx({
              px: '12px', // shorthand for padding-left & right
              py: '6px', // shorthand for padding-top & bottom
              fontWeight: 500,
              borderRadius: '8px',
            }),
          label: {
            padding: 0,
          },
        },
      },
    },
  })}
>
  ...your app
</ThemeProvider>;
```

If I want to add more styles based on these conditions:

- border color `palette.text.secondary` is applied when `<Chip variant="outlined" />`.
- font size is `0.875rem` in mobile viewport, `0.75rem` in larger than mobile viewport when `<Chip size="small" />`.

An array can be used as a return type to make the code easier to add/remove conditions:

```js
// The <ThemeProvider> is omitted for readability.
{
  root: ({ ownerState, theme }) => [
    theme.unstable_sx({
      px: '12px',
      py: '6px',
      fontWeight: 500,
      borderRadius: '8px',
    }),
    ownerState.variant === 'outlined' && ownerState.color === 'default' &&
      theme.unstable_sx({
        borderColor: 'text.secondary',
      }),
    ownerState.size === 'small' &&
      theme.unstable_sx({
        fontSize: { xs: '0.875rem', sm: '0.75rem' },
      })
  ],
}
```

<hr />

**That's it for today!** Happy styling 💅.

I hope this small update makes your customization experience better than ever. Don't forget to share this update with your friends and colleagues.

To get more updates like this in the future, **subscribe to our newsletter** at the bottom of this page.

## Read more

- [Component theming](/material-ui/customization/theme-components/)
- [All supported shorthands in `sx`](/system/getting-started/the-sx-prop/#theme-aware-properties)
- [`sx` performance tradeoff](/system/getting-started/usage/#performance-tradeoffs)
- [`sx` with `styled`](/system/styled/#difference-with-the-sx-prop)
