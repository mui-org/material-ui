# Components 组件

<p class="description">The theme's `components` key allows you to customize a component without wrapping it in another component. You can change the styles, the default props, and more. 你可以更改样式、默认属性等等其他东西。 你可以更改样式、默认属性等等其他东西。</p>

## 重写全局样式

可以使用theme的 `styleOverrides` 属性来改变每一个在 DOM 中由 Material-UI 生成的样式。

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

{{"demo": "pages/customization/theme-components/GlobalThemeOverride.js"}}

在组件API 页面的 **CSS**介绍部分，列出了每个组件样式类的文档。

要用 TypeScript 重写lab组件的样式，请查看 [此文档](/components/about-the-lab/#typescript)。

## 默认属性

You can change the default of every prop of a Material-UI component. A `defaultProps` key is exposed in the theme's `components` key for this use case. 下面示例就是指定`defaultProps`属性覆盖`components`下组件的默认属性。 下面示例就是指定`defaultProps`属性覆盖`components`下组件的默认属性。

```js
const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple!
      },
    },
  },
});
```

{{"demo": "pages/customization/theme-components/DefaultProps.js"}}

要使用 TypeScript 覆盖实验室组件样式，请检查 [此文档](/components/about-the-lab/#typescript)

## 添加新的组件变量

You can use the `variants` key in the theme's `components` section to add new variants to Material-UI components. These new variants can specify what styles the component should have when specific props are applied. 这些变量能够决定当使用特定的属性时组件应该采用什么样的样式。 这些变量能够决定当使用特定的属性时组件应该采用什么样的样式。

在组件名称（如：MuiButton）下以数组形式定义组件变量。 数组中的每个变量都会对应一个CSS类添加到HTML`<head>`中。 For each of them a CSS class is added to the HTML `<head>`. The order is important, so make sure that the styles that should win are specified last.

```js
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed grey${blue[500]}`,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
  },
});
```

如果你用的是TypeScript，那么需要使用[moduleaugmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)定义新的variants/colors

<!-- Tested with packages/material-ui/test/typescript/augmentation/themeComponents.spec.ts -->

```tsx
declare module '@material-ui/core/Button/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
```

{{"demo": "pages/customization/theme-components/GlobalThemeVariants.js"}}

## 主题变量

覆盖所有组件实例的另一种方式是调整 [theme configuration variables](/customization/theming/#theme-configuration-variables)。

```js
const theme = createTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/theme-components/ThemeVariables.js"}}
