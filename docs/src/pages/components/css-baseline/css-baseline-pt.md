---
components: CssBaseline, ScopedCssBaseline
githubLabel: 'component: CssBaseline'
---

# CSS Baseline

<p class="description">Material-UI oferece um componente CSS Base a fim de inciar uma elegante, consistente e simples base para construção de aplicativos.</p>

[A paleta](/system/palette/) com funções de estilo.

## Reset global

Você já deve estar familiarizado com [normalize.css](https://github.com/necolas/normalize.css), uma coleção de elementos HTML e normas de atributos de estilo.

```jsx
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React. Fragment>
      <CssBaseline />
      {/* O resto da sua aplicação */}
    </React. Fragment>
  );
}
```

## Escopando componentes filhos

No entanto, você pode estar migrando progressivamente um site para Material-UI, usar um reset global pode não ser uma opção. É possível aplicar a baseline apenas aos filhos usando o componente `ScopedCssBaseline`.

```jsx
import * as React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import MyApp from './MyApp';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* O resto da sua aplicação */}
      <MyApp />
    </ScopedCssBaseline>
  );
}
```

⚠️ Certifique-se de importar `ScopedCssBaseline` primeiro para evitar conflitos de box-sizing, como no exemplo acima.

## Abordagem

### Página

Os elementos `<html>` e `<body>` são atualizados para fornecer melhores padrões para toda a página. Mais especificamente:

- A margem é removida em todos navegadores.
- A cor de fundo padrão do material design é aplicada. Isto usando [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) para dispositivos padrão e um fundo branco para dispositivos de impressão.

### Leiaute

- `box-sizing` é definido globalmente no elemento `<html>` para `border-box`. Todos elementos—incluindo `*::before` e `*::after` são declarados para herdar essa propriedade, que garante que a largura declarada do elemento nunca seja excedida devido ao preenchimento da borda.

### Barras de rolagem

The colors of the scrollbars can be customized to improve the contrast (especially on Windows). Add this code to your theme (for dark mode).

```jsx
import darkScrollbar from '@material-ui/core/darkScrollbar';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: theme.palette.mode === 'dark' ? darkScrollbar() : null,
      },
    },
  },
});
```

This website uses `darkScrollbar` when dark mode is enabled. Be aware, however, that using this utility (and customizing `-webkit-scrollbar`) forces MacOS to always show the scrollbar.

### Tipografia

- Nenhum tamanho de fonte base é declarado no `<html>`, mas 16px é assumido (o padrão do navegador). Você pode aprender mais sobre as implicações da mudança do padrão de tamanho da fonte do `<html>` na página de [documentação do tema](/customization/typography/#typography-html-font-size).
- Define o estilo `theme.typography.body1` no elemento `<body>`.
- Define o font-weight para `theme.typography.fontWeightBold` em elementos `<b>` e `<strong>`.
- Uma customização da suavização da fonte (font-smoothing) é ativada para melhor exibição da fonte Roboto.

## Customização

Vá até a seção de [customização global](/customization/how-to-customize/#5-global-css-override) da documentação para alterar o comportamento desses componentes.
