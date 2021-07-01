# Tipografia

<p class="description">O tema fornece um conjunto de tipos de tamanhos que funcionam bem juntos e também com a grade de leiaute.</p>

## Família da fonte

Você pode alterar a família de fontes com a propriedade `theme.typography.fontFamily`.

Por exemplo, esta demonstração usa a fonte do sistema em vez da fonte padrão Roboto:

```js
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

### Fontes auto-hospedadas

Para fontes auto-hospedadas, baixe os arquivos de fonte em formatos `ttf`, `woff`, e/ou `woff2` e importe-os em seu código.

⚠️ Isso requer que você tenha um plugin ou loader em seu processo de compilação que possa manipular o carregamento de arquivos `ttf`, `woff` e `woff2`. Fontes *não* serão embutidas dentro do seu pacote. Elas serão carregadas de seu servidor da web em vez de uma CDN.

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';
```

Em seguida, você precisa alterar o tema para usar essa nova fonte. Para definir globalmente Raleway como uma fonte, o componente [`CssBaseline`](/components/css-baseline/) pode ser usado (ou qualquer outra solução CSS de sua escolha).

```jsx
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: "local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2')";
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
        }
      `,
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        fontFamily: 'Raleway',
      }}
    >
      Raleway
    </Box>
  </ThemeProvider>
);
```

Note that if you want to add additional `@font-face` declarations, you need to use the string CSS template syntax for adding style overrides, so that the previosly defined `@font-face` declarations won't be replaced.

## Tamanho da fonte

Material-UI usa a unidade `rem` para o tamanho da fonte. O tamanho da fonte padrão do elemento `<html>` do navegador é `16px`, mas os navegadores têm a opção de alterar esse valor, a unidade `rem` nos permite acomodar as configurações do usuário, resultando em um melhor suporte de acessibilidade. Os usuários alteram as configurações de tamanho da fonte por vários motivos, desde problemas de visão, até a escolha de configurações ideais para dispositivos que podem ser muito diferentes em tamanho e distância de visualização.

Para alterar o tamanho da fonte do Material-UI, você pode definir a propriedade `fontSize`. O valor padrão é `14px`.

```js
const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});
```

O tamanho da fonte computada pelo navegador segue esta equação matemática:

<img src="/static/images/font-size.png" alt="cálculo do tamanho da fonte" style="width: 458px;" />

<!-- https://latex.codecogs.com/png.latex?\dpi{200}&space;\text{computed}&space;=&space;\text{specification}\cdot\frac{\text{typography.fontSize}}{14}\cdot\frac{\text{html&space;fontsize}}{\text{typography.htmlFontSize}} -->

### Tamanhos de fonte responsivo

As propriedades de variações de tipografia são mapeadas diretamente para o CSS gerado. Você pode usar [consultas de mídia](/customization/breakpoints/#api) dentro delas:

```js
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
```

{{"demo": "pages/customization/typography/CustomResponsiveFontSizes.js"}}

Para automatizar estas configurações, você pode usar a função auxiliar [`responsiveFontSizes()`](/customization/theming/#responsivefontsizes-theme-options-theme), para fazer a tipografia responsiva em relação aos tamanhos da fonte no tema.

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideToolbar": true}}

Você pode ver isso em ação no exemplo abaixo. Adjust your browser's window size, and notice how the font size changes as the width crosses the different [breakpoints](/customization/breakpoints/):

```js
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

### Tamanhos da fonte fluido

Para ser feito: [#15251](https://github.com/mui-org/material-ui/issues/15251).

### Tamanho da fonte no HTML

Você pode querer alterar o tamanho da fonte padrão do elemento `<html>`. Por exemplo, quando usando a [simplificação de 10px](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/).

> ⚠️ Alterar o tamanho da fonte pode prejudicar a acessibilidade ♿️. A maioria dos navegadores concordou com o tamanho padrão de 16 pixels, mas o usuário pode alterá-lo. For instance, someone with an impaired vision could have set their browser's default font size to something larger.

Uma propriedade de tema `htmlFontSize` é fornecida para este caso de uso, que informa ao Material-UI qual é o tamanho da fonte no elemento `<html>`. Isso é usado para ajustar o valor `rem`, para que o tamanho da fonte calculado sempre corresponda à especificação.

```js
const theme = createTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

_Você precisa aplicar o CSS acima no elemento html desta página para ver a demonstração abaixo renderizada corretamente_

{{"demo": "pages/customization/typography/FontSizeTheme.js"}}

## Variantes

O objeto de tipografia vem com [13 variantes](/components/typography/#component) por padrão:

- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- subtitle2
- body1
- body2
- button
- caption
- overline

Cada uma dessas variantes pode ser customizada individualmente:

```js
const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
```

{{"demo": "pages/customization/typography/TypographyVariants.js"}}

## Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. Here is what you need to do:

**Step 1. Update the theme's typography object**

```js
const theme = createTheme({
  typography: {
    poster: {
      color: 'red',
    },
    // Disable h3 variant
    h3: undefined,
  },
});
```

**Step 2. Update the necessary typings (if you are using TypeScript)**

> If you aren't using TypeScript you should skip this step.

You need to make sure that the typings for the theme's `typography` variants and the `Typography`'s `variant` prop reflects the new set of variants.

<!-- Tested with packages/material-ui/test/typescript/augmentation/typographyVariants.spec.ts -->

```ts
declare module '@material-ui/core/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@material-ui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}
```

**Step 3. You can now use the new variant**

{{"demo": "pages/customization/typography/TypographyCustomVariant.js", "hideToolbar": true}}

```jsx
<Typography variant="poster">poster</Typography>;

/* This variant is no longer supported */
<Typography variant="h3">h3</Typography>;
```

## Valores padrão

Você pode explorar os valores padrão da tipografia usando [o explorador de tema](/customization/default-theme/?expand-path=$.typography) ou abrindo o console das ferramentas de desenvolvimento nesta página (`window.theme.typography`).
