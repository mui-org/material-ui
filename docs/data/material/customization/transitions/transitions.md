# Transitions

<p class="description">These theme helpers allow you to create custom CSS transitions, and you can customize the durations, easings, and more.</p>

## API

### `theme.transitions.create(props, options) => transition`

#### Arguments

1. `props` (_string_ | _string[]_): Defaults to `['all']`. Provides a CSS property, or a list of CSS properties that should be transitioned.
2. `options` (_object_ [optional]):

- `options.duration` (_string_ | _number_ [optional]): Defaults to `theme.transitions.duration.standard`. Provides the duration of the transition.
- `options.easing` (_string_ [optional]): Defaults to `theme.transitions.easing.easeInOut`. Provides the easing for the transition.
- `options.delay` (_string_ | _number_ [optional]): Defaults to `0`. Provides the delay for the transition.

#### Returns

`transition`: A CSS transition value, which composes all CSS properties that should be transitioned, together with the defined duration, easing, and delay.

For example, calling <code>theme.transitions.create(['background-color', 'transform'])</code> returns a string like:

```js
'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';
```

Use the <code>theme.transitions.create()</code> helper to create consistent transitions for the elements of your UI.

```js
theme.transitions.create(['background-color', 'transform']);
```

#### Example

{{"component": "file://./demos/hover/index.ts", "collapseToEmpty": true}}

### `theme.transitions.getAutoHeightDuration(height) => duration`

#### Arguments

1. `height` (_number_): The height of the component.

#### Returns

`duration`: The calculated duration based on the height.

## Reduced motion

Starting in v9.1.0, reduced-motion behavior can be configured with `theme.motion.reducedMotion`.

```js
const theme = createTheme({
  motion: {
    reducedMotion: 'system',
  },
});
```

The supported values are:

- `never` (default): keep normal transition behavior.
- `system`: reduce motion only when the user's operating system requests it with `prefers-reduced-motion: reduce`.
- `always`: reduce motion for every user, regardless of the operating system setting.

This setting controls Material UI transition components, such as Collapse, Fade, Grow, Slide, and Zoom, as well as components that have animations such as Accordion, Menu, Tabs etc.

For custom CSS transitions in your app, use `theme.transitions.create()` and add reduced-motion overrides directly:

```js
const styles = {
  transition: theme.transitions.create(['background-color', 'transform']),
  ...(theme.motion.reducedMotion === 'always' && {
    transition: 'none',
  }),
  ...(theme.motion.reducedMotion === 'system' && {
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  }),
};
```

When a specific transition component should keep its normal motion while the theme uses `system` or `always`, set `disablePrefersReducedMotion` on that transition component.

```jsx
<Fade in disablePrefersReducedMotion>
  <div />
</Fade>
```

## Durations

You can change some or all of the duration values, or provide your own (for use in the `create()` helper). This example shows all the default values (in milliseconds), but you only need to provide the keys you wish to change or add.

```js
const theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
});
```

## Easings

You can change some or all of the easing values, or provide your own, by providing a custom CSS <code>transition-timing-function</code> value.

```js
const theme = createTheme({
  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});
```

## References

Check out the [Transitions](/material-ui/transitions/) page to explore the transition components that are included with Material UI.
