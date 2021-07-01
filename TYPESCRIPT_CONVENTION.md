# TypeScript convention

## Component

> **Public components** are considered all components exported from `@material-ui/core` or `@material-ui/lab`.
>
> **Internal components** are considered all components that are not exported from the packages, but only used in some public component. There is no need to have `sx` prop on these components

### `Props Interface`

- export interface `{ComponentName}classes` from `{component}Classes.ts` and add comment for generating api docs (for internal components, may or may not expose classes but don't need comment)
- export interface `{ComponentName}Props`
- always export props interface (use `interface` over `type`) from the component file
- provide `sx` only for public component

<details>
  <summary>Public component</summary>

```ts
// fooClasses.tsx

export interface FooClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the foo element. */
  foo: string;
  /** Styles applied to the root element if `disabled=true`. */
  disabled: string;
}

const fooClasses: FooClasses = generateUtilityClasses('MuiFoo', ['root', 'foo', 'disabled']);

export default fooClasses;
```

```ts
// Foo.tsx
import { FooClasses } from './fooClasses';

export interface FooProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FooClasses>;
  // ...other props
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}
```

</details>
<details>
  <summary>internal component</summary>

```ts
// Bar.tsx

// if this internal component can accept classes as prop
export interface BarClasses {
  root: string;
}

export interface BarProps {
  classes?: Partial<BarClasses>;
}
```

</details>

### `ClassKey`

- naming as `{ComponentName}ClassKey`
- export if `classes` exists in props interface using `keyof` from `{component}Classes.ts`

```ts
// fooClasses.ts
export interface FooClasses {
  ...
}

export type FooClassKey = keyof FooClasses;
// verify that FooClassKey is union of string literal
```

### `Classes generator & Utility`

- export if `classes` exists in props interface from the component file
- use `{Component}Classes` as type to preventing typo and missing classes
- use `Private` prefix for internal component

<details>
  <summary>Public component</summary>

```ts
// fooClasses.ts
export function getFooUtilityClass(slot: string) {
  return generateUtilityClass('MuiFoo', slot);
}

const useUtilityClasses = (styleProps: FooProps & { extraProp: boolean }) => {
  // extraProp might be the key/value from react context that this component access
  const { foo, disabled, classes } = styleProps;

  const slots = {
    root: ['root', foo && 'foo', disabled && 'disabled'],
  };

  return composeClasses(slots, getFooUtilityClass, classes);
};
```

</details>
<details>
  <summary>internal component</summary>

```ts
// Bar.tsx
// in case that classes is not exposed.
// `classes` is used internally in this component
const classes = generateUtilityClasses('PrivateBar', ['root', 'bar']);
```

</details>

### `StyledComponent`

- naming using slot `{ComponentName}{Slot}`
- use `skipSx` for internal component without specifying `name`, `slot` and `overridesResolver`
- to extend interface of the styled component, pass argument to generic

<details>
  <summary>public component</summary>

```ts
const FooRoot = styled(Typography, {
  name: 'MuiFoo',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  // styling
});
```

</details>
<details>
  <summary>internal component</summary>

```ts
const BarRoot = styled(Typography, { skipSx: true })({
  // styling
});
```

</details>
<details>
  <summary>extends interface</summary>

```ts
const BarRoot = styled(Typography, { skipSx: true })<{
  component?: React.ElementType;
  styleProps: BarProps;
}>(({ theme, styleProps }) => ({
  // styling
}));
// passing `component` to BarRoot is safe and we don't forget to pass styleProps
// <BarRoot component="span" styleProps={styleProps} />
```

</details>

### `Component declaration`

- prefer `function Component() {}` over `React.FC`
- naming the render function in `React.forwardRef` (for devtools)
- `useThemeProps` is needed only for public component
- pass `styleProps` to StyledComponent for styling

<details>
  <summary>public component</summary>

```ts
const Foo = React.forwardRef<HTMLSpanElement, FooProps>(function Foo(inProps, ref) => {
  // pass args like this, otherwise will get error about theme at return section
  const props = useThemeProps<Theme, FooProps, 'MuiFoo'>({
    props: inProps,
    name: 'MuiFoo',
  });
  const { children, className, ...other } = props

  // ...implementation

  const styleProps = { ...props, ...otherValue }

  const classes = useUtilityClasses(styleProps);

  return (
    <FooRoot
      ref={ref}
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      {...other}
    >
      {children}
    </FooRoot>
  )
})
```

</details>
<details>
  <summary>internal component</summary>

```ts
const classes = generateUtilityClasses('PrivateBar', ['selected']);

const BarRoot = styled('div', { skipSx: true })(({ theme }) => ({
  [`&.${classes.selected}`]: {
    color: theme.palette.text.primary,
  },
}));

// if this component does not need React.forwardRef, don't use React.FC
const Bar = (props: BarProps) => {
  const { className, selected, ...other } = props;
  return <BarRoot className={clsx({ [classes.selected]: selected })} {...other} />;
};
```

</details>
