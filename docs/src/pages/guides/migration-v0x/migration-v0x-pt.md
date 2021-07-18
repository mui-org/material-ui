# Migrando da v0.x para v1

<p class="description">Sim, v1 foi lançada! Tire proveito de 2 anos de esforço.</p>

## Perguntas Frequentes

### Woah - a API é diferente! Does that mean 1.0 is completely different, I'll have to learn the basics all over again, and migrating will be practically impossible?

A resposta é não. I'm glad you asked! The core concepts haven't changed. Você vai notar que a API oferece mais flexibilidade, mas isso tem um custo – componentes de nível inferior que abstraem menos complexidade.

### O que motivou uma mudança tão grande?

Material-UI foi iniciado [4 anos atrás](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46). O ecossistema evoluiu muito desde então, também aprendemos muito. [@nathanmarks](https://github.com/nathanmarks/) iniciou uma tarefa ambiciosa, reconstruindo o Material-UI do **zero**, aproveitando esse conhecimento para resolver problemas de longa data. Para citar algumas das principais mudanças:

- New styling solution using CSS-in-JS (better [customization](/customization/how-to-customize/) power, better performance)
- Novo tratamento de tema (aninhamento, auto-suporte, etc.)
- Documentação rápida e brilhante graças a [Next.js](https://github.com/zeit/next.js)
- Melhor [cobertura de teste](/guides/testing/) (99%+, executado em todos os principais navegadores, [testes de regressão visual](https://www.argos-ci.com/mui-org/material-ui))
- Suporte completo [a renderização do lado do servidor](/guides/server-rendering/)
- Vasta gama de [navegadores suportados](/getting-started/supported-platforms/)

### Onde devo começar a migração?

1. Comece instalando a versão v1.x do Material-UI ao lado da versão v0.x.

utilizando o yarn:

```sh
yarn add material-ui
```
```sh
yarn add @material-ui/core
```

Ou utilizando npm:

```sh
npm install material-ui
```
```sh
npm install @material-ui/core
```

então

```js
import FlatButton from 'material-ui/FlatButton'; // v0.x
  import Button from '@material-ui/core/Button'; // v1.x
```

2. Execute [o auxiliar de migração](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod) em seu projeto.
3. `MuiThemeProvider` é opcional para v1.x., mas se você tem um tema customizado, você é livre para usar as versões v0.x e v1.x do componente, ao mesmo tempo, como neste exemplo:

```jsx
import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = createMuiTheme({
  /* tema para v1.x */
});
const themeV0 = getMuiTheme({
  /* tema para v0.x */
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <V0MuiThemeProvider muiTheme={themeV0}>{/*Components*/}</V0MuiThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
```

4. Depois disso, você está livre para migrar uma instância de componente por vez.

## Componentes

### Autocompletar

Material-UI, não fornece uma API de alto nível para resolver este problema. Recomendamos que você explore [as soluções que a comunidade construiu](/components/autocomplete/).

Execute [o auxiliar de migração](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod) em seu projeto.

### Ícone Svg

Execute [o auxiliar de migração](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod) em seu projeto.

Caminho de atualização do RaisedButton:

```diff
-import AddIcon from 'material-ui/svg-icons/Add';
+import AddIcon from '@material-ui/icons/Add';

<AddIcon />
```

### Botão flat

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from '@material-ui/core/Button';

-<FlatButton />
+<Button />
```

### Botão elevado

Caminho de atualização do RaisedButton:

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from '@material-ui/core/Button';

-<RaisedButton />
+<Button variant="contained" />
```

### Subcabeçalho

```diff
-import Subheader from 'material-ui/Subheader';
+import ListSubheader from '@material-ui/core/ListSubheader';

-<Subheader>Sub Heading</Subheader>
+<ListSubheader>Sub Heading</ListSubheader>
```

### Alternar

```diff
-import Toggle from 'material-ui/Toggle';
+import Switch from '@material-ui/core/Switch';

-<Toggle

-  toggled={this.state.checkedA}
-  onToggle={this.handleToggle}
-/>
+<Switch
+  checked={this.state.checkedA}
+  onChange={this.handleSwitch}
+/>
```

### Item de menu

```diff
-import MenuItem from 'material-ui/MenuItem';
+import MenuItem from '@material-ui/core/MenuItem';

-<MenuItem primaryText="Profile" />
+<MenuItem>Profile</MenuItem>
```

### Ícone de fonte

```diff
-import FontIcon from 'material-ui/FontIcon';
+import Icon from '@material-ui/core/Icon';

-<FontIcon>home</FontIcon>
+<Icon>home</Icon>
```

### Progresso Circular

```diff
-import CircularProgress from 'material-ui/CircularProgress';
+import CircularProgress from '@material-ui/core/CircularProgress';

-<CircularProgress mode="indeterminate" />
+<CircularProgress variant="indeterminate" />
```

### Menu suspenso

```diff
-import DropDownMenu from 'material-ui/DropDownMenu';
+import Select from '@material-ui/core/Select';

-<DropDownMenu></DropDownMenu>
+<Select value={this.state.value}></Select>
```

### Continua…

Você migrou sua aplicação com sucesso, e que tal ajudar a comunidade? Existe um problema em aberto para concluir este guia de migração [#7195](https://github.com/mui-org/material-ui/issues/7195). Qualquer pull request é bem-vindo 😊.
