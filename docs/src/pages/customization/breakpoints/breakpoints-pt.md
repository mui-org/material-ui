# Pontos de quebra

<p class="description">API que permite o uso de pontos de quebra em uma ampla variedade de contextos.</p>

Para uma experiência de usuário ideal, as interfaces do material design precisam adaptar seu leiaute em vários pontos de quebra. Material-UI usa uma implementação **simplificada** da [especificação](https://material.io/design/layout/responsive-layout-grid.html#breakpoints) original.

The breakpoints are used internally in various components to make them responsive, but you can also take advantage of them for controlling the layout of your application through the [Grid](/components/grid/) component.

## Pontos de quebra padrão

Cada ponto de quebra (uma chave) corresponde a uma largura de tela *fixa* (um valor):

- **xs,** extra-pequeno: 0px
- **sm,** pequeno: 600px
- **md,** medium: 900px
- **lg,** large: 1200px
- **xl,** extra-large: 1536px

Esses valores podem ser [customizados](#custom-breakpoints).

## Consultas de Mídia CSS

Consultas de mídia CSS são a abordagem idiomática para tornar sua interface de usuário responsiva. O tema fornece quatro formas que auxiliam a fazer isso:

- [theme.breakpoints.up(key)](#theme-breakpoints-up-key-media-query)
- [theme.breakpoints.down(key)](#theme-breakpoints-down-key-media-query)
- [theme.breakpoints.only(key)](#theme-breakpoints-only-key-media-query)
- [theme.breakpoints.between(start, end)](#theme-breakpoints-between-start-end-media-query)

Na demonstração a seguir, alteramos a cor do plano de fundo (vermelho, azul & verde) com base na largura da tela.

```jsx
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
```

{{"demo": "pages/customization/breakpoints/MediaQuery.js"}}

## Consultas de mídia JavaScript

Às vezes, usar CSS não é suficiente. Você pode querer alterar a árvore de renderização React com base no valor do ponto de quebra, em JavaScript.

### useMediaQuery hook

Você pode aprender mais na página [useMediaQuery](/components/use-media-query/).

## Pontos de quebra customizados

Você define os pontos de quebra do seu projeto na seção `theme.breakpoints` do seu tema.

- [`theme.breakpoints.values`](/customization/default-theme/?expand-path=$.breakpoints.values): Padrão são [os valores acima](#default-breakpoints). As chaves são seus nomes de tela e os valores são a largura mínima onde esse ponto de quebra deve iniciar.
- `theme.breakpoints.unit`: Padrão é `px`. A unidade usada para os valores do ponto de quebra.
- `theme.breakpoints.step`: Padrão é 5 (`0.05px`). O incremento usado para implementar os pontos de quebra exclusivos.

Se você alterar os valores dos pontos de quebra padrão, você precisará fornecer novos conforme descreveremos:

```jsx
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
```

Sinta-se à vontade para ter quantos pontos de quebra você quiser, nomeando-os da maneira que preferir para o seu projeto.

```js
const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
```

Se você estiver usando TypeScript, você também deverá usar a [extensão de módulos](/guides/typescript/#customization-of-theme) para que o tema aceite os valores acima.

<!-- Tested with packages/material-ui/test/typescript/breakpointsOverrides.augmentation.tsconfig.json -->

```ts
declare module '@material-ui/core/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}
```

## API

### `theme.breakpoints.up(key) => media query`

#### Argumentos

1. `key` (_string_ | _number_): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.

#### Retornos

`media query`: Uma string de consulta de mídia pronta para ser usada com a maioria das soluções de estilo, na qual corresponde à largura da tela maior que, e incluindo o tamanho de tela fornecido pela chave do ponto de quebra.

#### Exemplos

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞)
    //       [900px, ∞)
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

#### Argumentos

1. `key` (_string_ | _number_): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.

#### Retornos

`media query`: Uma string de consulta de mídia pronta para ser usada com a maioria das soluções de estilo, na qual corresponde à largura da tela menor que, e incluindo o tamanho de tela fornecido pela chave do ponto de quebra.

#### Exemplos

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md)
    //       [0, 900px)
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

#### Argumentos

1. `key` (_string_): A breakpoint key (`xs`, `sm`, etc.).

#### Retornos

`media query`: Uma string de consulta de mídia pronta para ser usada com a maioria das soluções de estilo, na qual corresponde à largura da tela incluindo o tamanho de tela fornecido pela chave do ponto de quebra.

#### Exemplos

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1)
    //       [md, lg)
    //       [900px, 1200px)
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### Argumentos

1. `start` (_string_): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.
2. `end` (_string_): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.

#### Retornos

`media query`: Uma string de consulta de mídia pronta para ser usada com a maioria das soluções de estilo, na qual corresponde a larguras de telas maiores que o tamanho da tela fornecido na chave de ponto de quebra no primeiro argumento e menor que o tamanho de tela fornecido pela chave de ponto de quebra no segundo argumento.

#### Exemplos

```js
const styles = (theme) => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md)
    //       [600px, 900px)
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```

## Valores padrão

Você pode explorar os valores padrão dos pontos de quebra usando [o explorador de tema](/customization/default-theme/?expand-path=$.breakpoints) ou abrindo o console das ferramentas de desenvolvimento nesta página (`window.theme.breakpoints`).
