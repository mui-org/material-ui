---
title: Componente Barra de Aplicativos para React
components: AppBar, Toolbar, Menu
githubLabel: 'component: AppBar'
materialDesign: https://material.io/components/app-bars-top
---

# Barra de Aplicativos

<p class="description">A barra de aplicativos exibe informações e ações relacionadas à tela atual.</p>

A barra de aplicativos superior fornece conteúdo e ações relacionadas à tela atual. Ela é utilizada para a identidade visual, títulos de tela, navegação e ações.

Ela pode se transformar em uma barra de ações contextual ou ser utilizada como uma barra de navegação.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Barra de Aplicativos Simples

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## Barra de Aplicativos com um campo de busca principal

Um campo de busca principal.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## Barra de Aplicativos com menu

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## Barra de Aplicativos com campo de busca

Uma barra de pesquisa na lateral.

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## Densa (apenas para desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## Proeminente

Uma barra de aplicativos proeminente.

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## Barra de Aplicativos inferior

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## Posicionamento fixo

Quando você renderiza a barra de aplicativos com um posicionamento fixo, a dimensão do elemento não afeta o resto da página. Isso pode fazer com que parte do seu conteúdo pareça estar invisível, atrás da barra de aplicativos. Aqui estão 3 soluções possíveis:

1. Você pode usar `position="sticky"` ao invés de fixed. ⚠️ sticky não é suportado pelo IE11.
2. Você pode renderizar um segundo componente `<Toolbar />`:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* conteúdo */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. Você pode usar o CSS `theme.mixins.toolbar`:

```jsx
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Offset />
    </React.Fragment>
  );
}
```

## Rolagem

Você pode usar o hook `useScrollTrigger()` para responder às ações de rolagem do usuário.

### Barra de aplicativos oculta

A barra de aplicativos ficará oculta ao rolar a página para baixo, deixando mais espaço de leitura.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### Barra de aplicativos elevada

A barra de aplicativos eleva-se na rolagem para comunicar que o usuário não está na parte superior da página.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### Voltar ao topo

Um botão de ação flutuante aparece na rolagem para facilitar o retorno ao topo da página.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### Argumentos

1. `options` (_object_ [optional]):

   - `options.disableHysteresis` (_bool_ [optional]): Defaults to `false`. Desabilita a histerese. Ignora a direção de rolagem ao determinar o valor de `trigger`.
   - `options.target` (_Node_ [opcional]): Padrão `window`.
   - `options.threshold` (_number_ [opcional]): Padrão `100`. Modifica o valor limite que aciona a `trigger` quando a barra de rolagem vertical cruzar ou chegar a este limite.

#### Retornos

`trigger`: A posição da tela bate com o critério estabelecido?

#### Exemplos

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```

## Enable Color on Dark

Following the [Material Design guidelines](https://material.io/design/color/dark-theme.html), the `color` prop has no effect on the appearance of the AppBar in dark mode. You can override this behavior by setting the `enableColorOnDark` prop to `true`.

```jsx
// Specific element via prop
<AppBar enableColorOnDark />

// Affect all AppBars via theme
<ThemeProvider
  theme={createTheme({
    components: {
      MuiAppBar: {
        defaultProps: {
          enableColorOnDark: true,
        },
      },
    },
  })}
>
  <AppBar />
</ThemeProvider>
```
