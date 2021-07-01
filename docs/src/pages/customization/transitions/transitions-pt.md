# Transições

<p class="description">A chave do tema permite que você customize as durações e atenuações das várias transições usadas entre componentes do Material-UI, e oferece um utilitário para criar transições customizadas.</p>

## API

### `theme.transitions.create(props, options) => transition`

#### Argumentos

1. `props` (_string_ | _string[]_): Defaults to `['all']`. Fornece uma propriedade CSS, ou uma lista de propriedades CSS que devem ser transicionadas.
2. `options` (_object_ [optional]):

- `options.duration` (_string_ | _number_ [optional]): Defaults to `theme.transitions.duration.standard`. Fornece a duração da transição.
- `options.easing` (_string_ [opcional]): Padrão `theme.transitions.easing.easeInOut`. Fornece a atenuação para a transição.
- `options.delay` (_string_ | _number_ [optional]): Defaults to `0`. Fornece o atraso para a transição.

#### Retornos

`transition`: Um valor CSS de transição, que compõe todas as propriedades CSS que devem ser transitadas juntamente com duração, atenuação e atraso definidos.

Use o utilitário <code>theme.transitions.create()</code> para criar transições consistentes para os elementos da sua UI.</p>

```js
theme.transitions.create(['background-color', 'transform']);
```

#### Exemplo

{{"demo": "pages/customization/transitions/TransitionHover.js", "defaultCodeOpen": false}}

### `theme.transitions.getAutoHeightDuration(height) => duration`

#### Argumentos

1. `height` (_number_): The height of the component.

#### Retornos

`duration`: A duração calculada baseada na altura.

## Durações

Você pode alterar alguns ou todos os valores de duração, ou fornecer valores próprios (para usar com o utilitário `create()`). Este exemplo mostra todos os valores padrão (em milissegundos), mas você só precisa fornecer as chaves que deseja alterar ou adicionar.

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

## Atenuações

Você pode alterar alguns ou todos os valores de atenuação, ou fornecer valores próprios, fornecendo um valor customizado de CSS <code>transition-timing-function</code>.

```js
const theme = createTheme({
  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objetos que entram na tela na velocidade total e
      // lentamente desaceleram até um ponto de repouso.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objetos deixam a tela em velocidade máxima. Não desaceleram quando estão fora da tela.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // A atenuação de curva sharp é usada por objetos que podem retornar a tela a qualquer momento.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});
```

## Referências

Confira a página de [Transições](/components/transitions/) para explorar os componentes de transição que estão incluídos com o Material-UI.
