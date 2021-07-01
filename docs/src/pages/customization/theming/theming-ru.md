# Темизация

<p class="description">Настройте Material-UI с помощью вашего шаблона. Вы можете изменить цвета, типографику и многое другое.</p>

В шаблоне указывается цвет компонентов, темнота поверхностей, уровень тени, соответствующая непрозрачность чернильных элементов и т. д.

Шаблоны позволяют оформить ваше приложение в соответствующем стиле. Они **позволяют настроить все аспекты дизайна** вашего проекта, в соответствии с конкретными потребностями вашего бизнеса или бренда.

Для достижения согласованности в оформлении приложений, вам доступны темы двух типов: светлые и темные. По умолчанию компоненты используют темы светлого типа.

## Провайдер темы

Если вы хотите настроить тему, вам нужно использовать компонент `ThemeProvider`, чтобы добавить тему в ваше приложение. Однако это необязательно; компоненты Material-UI поставляются с базовой темой, по умолчанию.

Вы можете узнать больше об этом в [ разделе API](/styles/api/#themeprovider). `ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize.

## Переменные конфигурации темы

Изменение переменных конфигурации темы (theme configuration variables) — наиболее эффективный способ настройки Material-UI под ваши потребности. В следующих разделах рассматриваются наиболее важные переменные темы:

- [`.палитра`](/customization/palette/)
- [`.typography`](/customization/typography/)
- [`.интервал`](/customization/spacing/)
- [`.контрольные точки`](/customization/breakpoints/)
- [`.zIndex`](/customization/z-index/)
- [`.transições`](/customization/transitions/)
- [`.компоненты`](/customization/theme-components/)

Вы можете проверить [ раздел "тема по умолчанию" (default theme) ](/customization/default-theme/) для просмотра полной информации о default theme.

### Пользовательские переменные

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider), it can be convenient to add additional variables to the theme so you can use them everywhere. Например:

```jsx
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```tsx
declare module '@material-ui/core/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
```

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Доступ к теме в компоненте

<video autoPlay muted loop width="320">
  <source src="/static/studies.mp4" type="video/mp4" >
</video>

Вы [можете получить доступ](/styles/advanced/#accessing-the-theme-in-a-component) к переменным темы внутри ваших React-компонент.

- [mui-theme-creator](https://bareynol.github.io/mui-theme-creator/): Инструмент, помогающий проектировать и настраивать темы для библиотеки компонентов Material-UI. Includes basic site templates to show various components and how they are affected by the theme
- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): Is an online tool for creating Material-UI themes via Material Design Color Tool.
- [Material palette generator](https://material.io/inline-tools/color/): Этот инструмент можно использовать для создания палитры на основе любого выбранного цвета.

## Доступ к теме в компоненте

Вы [можете получить доступ](/styles/advanced/#accessing-the-theme-in-a-component) к переменным темы внутри ваших React-компонент.

## Вложенность тем

[ Вы можете вкладывать](/styles/advanced/#theme-nesting) несколько theme providers друг в друга.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

Внутренняя тема переопределит вашу **внешнюю тему**. Вы можете расширить внешнюю тему, предоставив функцию:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

**Примечание о производительности**

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes. The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `createTheme(options, ...args) => theme`

Generate a theme base on the options received.

#### Аргументы

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### Возвращает

`theme` (_object_): A complete, ready-to-use theme object.

#### Примеры

```js
import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Аргументы

1. `theme` (_object_): The theme object to enhance.
2. `options` (_object_ [optional]):

- `breakpoints` (_array\<string\>_ [optional]): Default to `['sm', 'md', 'lg']`. `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`.
- `disableAlign` (_bool_ [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (_number_ [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must be greater than 1.
- `variants` (_array\<string\>_ [optional]): Default to all. The typography variants to handle.

#### Возвращает

`theme` (_object_): The new theme with a responsive typography.

#### Примеры

```js
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Using `unstable_createMuiStrictModeTheme` restricts the usage of some of our components.

#### Аргументы

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### Возвращает

`theme` (_object_): A complete, ready to use theme object.

#### Примеры

```js
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```
