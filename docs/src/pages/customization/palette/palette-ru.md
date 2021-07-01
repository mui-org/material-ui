# Палитра

<p class="description">The palette enables you to modify the color of the components to suit your brand.</p>

## Palette colors

The theme exposes the following palette colors (accessible under `theme.palette.`):

- *primary* - Основной. Используется для отображения основных элементов интерфейса It's the color displayed most frequently across your app's screens and components.
- *secondary* - Второстепенный. Используется для отображения второстепенных элементов интерфейса. It provides more ways to accent and distinguish your product. Having it is optional.
- *error* - Цвет ошибки. Используется для отображения элементов, на которые нужно обратить внимание.
- *Предупреждение. Используется для отображения потенциально опасных действия или важных сообщений.</li>
- *info* - Информация. Используется для отображения нейтральной, не представляющей особой важности информации.
- *success* - Успешно. Используется для оповещения об успешном завершении вызванного пользователем действия.</ul>

Для более подробного изучения цветовых настроек можно посетить [секцию про цвета](/customization/color/).

## Default values

You can explore the default values of the palette using [the theme explorer](/customization/default-theme/?expand-path=$.palette) or by opening the dev tools console on this page (`window.theme.palette`).

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline", "hideToolbar": true}}

Стандартная палитра использует оттенки с префиксом `A` (`A200`, и т. д.) - для вторичного оттенка, и без префикса - для всех остальных.

## Кастомизация

You may override the default palette values by including a palette object as part of your theme. If any of the:

- [`.palette.primary`](/customization/default-theme/?expand-path=$.palette.primary)
- [`.palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary)
- [`.palette.error`](/customization/default-theme/?expand-path=$.palette.error)
- [`.palette.warning`](/customization/default-theme/?expand-path=$.palette.warning)
- [`.palette.info`](/customization/default-theme/?expand-path=$.palette.info)
- [`.palette.success`](/customization/default-theme/?expand-path=$.palette.success)

переопределенные цвета палитры заменят стандартные.

The palette color value can either be a [color](/customization/color/#2014-material-design-color-palettes) object, or an object with one or more of the keys specified by the following TypeScript interface:

```ts
interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
```

### Using a color object

Простейший способ переопределить цветовую палитру - импортировать один или несколько существующих цветов и применить их.

```js
import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createTheme({
  palette: {
    primary: blue,
  },
});
```

### Providing the colors directly

Для создания палитры с большим количеством цветов вы можете либо создать свой собственный цвет, либо записать цвета напрямую в один или все ключи `тематической палитры`

```js
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    tonalOffset: 0.2,
  },
});
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    tonalOffset: 0.2,
  },
});
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
```

В примере выше, если палитра содержит пользовательские цвета с одним из следующих ключей: "main", "light", "dark" или"contrastText", они используются следующим образом:

- If the "dark" and / or "light" keys are omitted, their value(s) will be calculated from "main", according to the "tonalOffset" value.
- If "contrastText" is omitted, its value will be calculated to contrast with "main", according to the "contrastThreshold" value.

Both the "tonalOffset" and "contrastThreshold" values may be customized as needed. The "tonalOffset" value can either be a number between 0 and 1, which will apply to both light and dark variants, or an object with light and dark variants specified by the following TypeScript type:

```ts
type PaletteTonalOffset = number | {
  light: number;
  dark: number;
};
```

A higher value for "tonalOffset" will make calculated values for "light" lighter, and "dark" darker. A higher value for "contrastThreshold" increases the point at which a background color is considered light, and given a dark "contrastText".

Note that "contrastThreshold" follows a non-linear curve.

### Пример

{{"demo": "pages/customization/palette/Palette.js", "defaultCodeOpen": true}}

### Adding new colors

You can add new colors inside and outside the palette of the theme as follow:

```js
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

<!-- tested with packages/material-ui/test/typescript/augmentation/paletteColors.spec.ts -->

```ts
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'],
    }
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color']
    }
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
```

{{"demo": "pages/customization/palette/CustomColor.js"}}

## Picking colors

Ищите вдохновение? The Material Design team has built an [palette configuration tool](/customization/color/#picking-colors) to help you.

## Темный режим

Material-UI comes with two palette modes: light (the default) and dark. Вы можете сделать тему темной, установив режим `mode: 'dark'`.

```js
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
```

While it's only a single value change, the `createTheme` helper modifies several palette values. The colors modified by the palette mode are the following:

{{"demo": "pages/customization/palette/DarkTheme.js", "bg": "inline", "hideToolbar": true}}

### Toggling color mode

You can use the React context to toggle the mode with a button inside your page.

{{"demo": "pages/customization/palette/ToggleColorMode.js", "defaultCodeOpen": false}}

### System preference

Пользователи могли указать предпочтение светлой или темной теме. The method by which the user expresses their preference can vary. It might be a system-wide setting exposed by the Operating System, or a setting controlled by the User Agent.

You can leverage this preference dynamically with the [useMediaQuery](/components/use-media-query/) hook and the [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query.

Например, можно включить темный режим автоматически:

```jsx
import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes />
    </ThemeProvider>
  );
}
```
