# @material-ui/styles

<p class="description">Você pode usar a solução de estilo do Material-UI na sua aplicação, esteja ou não usando componentes de Material-UI.</p>

Material-UI visa fornecer uma base sólida para a criação de interfaces de usuário dinâmicas. Material-UI visa fornecer uma base sólida para a criação de interfaces de usuário dinâmicas. Você pode usá-la, mas você não é obrigado, já que Material-UI também é [ interoperável com](/guides/interoperability/) todas as outras soluções de estilo principais.

## Por que usar a solução de estilo do Material-UI?

Nas versões anteriores, o Material-UI usava o LESS, e em seguida, uma solução customizada no estilo inline para escrever os estilos dos componentes, mas essas abordagens provaram ser limitadas. [Uma solução *CSS-em-JS*](https://github.com/oliviertassinari/a-journey-toward-better-style) supera muitas destas limitações, e ** libera excelentes funcionalidades** (aninhamento de temas, estilos dinâmicos, auto-suporte etc.).

A solução de estilo do Material-UI é inspirada em muitas outras bibliotecas de estilo, como [styled-components](https://www.styled-components.com/) e [emotion](https://emotion.sh/).

- 💅 Você pode esperar [as mesmas vantagens](https://www.styled-components.com/docs/basics#motivation) que styled-components.

<!-- #default-branch-switch -->

- 🚀 Ela é [super rápida](https://github.com/mui-org/material-ui/blob/HEAD/benchmark/server#material-uistyles).
- 🧩 É extensível através de uma API de [plugin](https://github.com/cssinjs/jss/blob/master/docs/plugins.md).
- ⚡️Ela usa [JSS](https://github.com/cssinjs/jss) em seu núcleo – um [alto desempenho](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript para o compilador CSS, que funciona em tempo de execução e no lado do servidor.
- 📦 Menor que [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles); e nenhum aumento no tamanho do pacote se usado juntamente com o Material-UI.

## Instalação

> `@material-ui/styles` é re-exportada como `@material-ui/core/styles` - você só precisa instalá-la se desejar usá-la independentemente do Material-UI.

Para instalar e salvar em suas dependências do `package.json`, execute:

```sh
// utilizando o npm
npm install @material-ui/styles

// utilizando o yarn
yarn add @material-ui/styles
```

## Primeiros passos

Existem 3 APIs possíveis que você pode usar para gerar e aplicar estilos, no entanto, todas elas compartilham a mesma lógica subjacente.

### Hook API

```jsx
import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

{{"demo": "pages/styles/basics/Hook.js"}}

### Styled components API

Nota: isso se aplica somente para a sintaxe de chamada – definições de estilo ainda usam um objeto JSS. Você também pode [alterar esse comportamento](/styles/advanced/#string-templates), com algumas limitações.

```jsx
import * as React from 'react';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

{{"demo": "pages/styles/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
```

{{"demo": "pages/styles/basics/HigherOrderComponent.js"}}

## Aninhamento de seletores

Você pode aninhar seletores para segmentar elementos dentro da classe ou componente atual. O exemplo a seguir usa a Hook API, mas funciona da mesma maneira com as outras APIs.

```js
const useStyles = makeStyles({
  root: {
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue',
      },
    },
  },
});
```

{{"demo": "pages/styles/basics/NestedStylesHook.js", "defaultCodeOpen": false}}

## Adaptando com base em propriedades

Você pode passar uma função para `makeStyles` ("interpolação") a fim de adaptar o valor gerado com base nas propriedades do componente. A função pode ser fornecida no nível da regra de estilo ou no nível da propriedade CSS:

```jsx
const useStyles = makeStyles({
  // regra de estilo
  foo: props => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // propriedade CSS
    color: props => props.color,
  },
});

function MyComponent() {
  // Propriedades simuladas para fins de exemplo
  const props = { backgroundColor: 'black', color: 'white' };
  // Passe as propriedades como primeiro argumento do useStyles()
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}
```

Este componente botão tem uma propriedade de cor que modifica sua cor:

### Adaptando a hook API

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### Adaptando a styled components API

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### Adaptando a higher-order component API

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

### Teste de estresse

No teste de estresse a seguir, você pode atualizar *a cor do tema* e a *propriedade background-color* de forma interativa:

```js
const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## Using the theme context

Starting from v5, Material-UI no longer uses JSS as its default styling solution. If you still want to use the utilities exported by `@material-ui/styles`, you will need to provide the `theme` as part of the context. For this, you can use the `ThemeProvider` component available in `@material-ui/styles`, or, if you are already using `@material-ui/core`, you should use the one exported from `@material-ui/core/styles` so that the same `theme` is available for components from '@material-ui/core'.

```jsx
import { makeStyles } from '@material-ui/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  }
}));

const App = (props) => {
  const classes = useStyles();
  return <ThemeProvider theme={theme}><div {...props} className={classes.root}></ThemeProvider>;
}
```
