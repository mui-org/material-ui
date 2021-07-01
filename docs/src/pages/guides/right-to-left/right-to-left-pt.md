# Da direita para a esquerda

<p class="description">Idiomas direita-para-esquerda como árabe, persa ou hebraico são suportados. Para alterar a direção dos componentes de Material-UI, você deve seguir as etapas a seguir.</p>

## Passos

### 1. HTML

Certifique-se de que o atributo `dir` é definido no corpo (body), caso contrário, os componentes nativos serão quebrados:

```html
<body dir="rtl">
```

As an alternative to the above, you can also wrap your application in an element with the `dir` attribute:

```jsx
function App() {
  return (
    <div dir="rtl">
      <MyComponent />
    </div>
  );
}
```

This can be helpful for creating components to toggle language settings in the live application.

### 2. Tema

Defina a direção no seu tema customizado:

```js
const theme = createTheme({
  direction: 'rtl',
});
```

### 3. Instale o plugin rtl

Você precisa deste plugin JSS para inverter os estilos: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```

Se você estiver usando `emotion` ou `styled-components`, você precisa deste plugin de estilo para inverter os estilos: [stylis-plugin-rtl](https://github.com/styled-components/stylis-plugin-rtl).

```sh
npm install stylis-plugin-rtl
```

**Note**: Only `emotion` is compatible with version 2 of the plugin. `styled-components` requires version 1. If you are using `styled-components` as styled engine, make sure to install the correct version.

Tendo instalado o plugin em seu projeto, os componentes do Material-UI ainda exigem que ele seja carregado pela instância do motor de estilo que você usa. Encontre guias abaixo de como você pode carregá-lo.

### 3. Carregando o plugin rtl

#### 3.1 JSS

Tendo instalado o plugin em seu projeto, os componentes de Material-UI ainda exigem que ele seja carregado pela instância do jss, conforme descrito abaixo. Internamente, withStyles está usando este plugin JSS quando `direção: 'rtl'` está definido no tema. Vá para o [README do plugin](https://github.com/alitaheri/jss-rtl) para aprender mais sobre isso.

Depois de criar uma nova instância do JSS com o plugin, você precisará disponibilizá-la para todos os componentes na árvore de componentes. O componente [`StylesProvider`](/styles/api/#stylesprovider) permite isso:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
```

#### 3.2 emotion

Depois de criar uma nova instância do JSS com o plugin, você precisará disponibilizá-la para todos os componentes na árvore de componentes. O componente [`StylesProvider`](/styles/api/#stylesprovider) permite isso:

```jsx
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
```

#### 3.3 styled-components

Se você usar `styled-components` como seu motor de estilo, você pode usar o [StyleSheetManager](https://styled-components.com/docs/api#stylesheetmanager) e fornecer a propriedade stylis-plugin-rtl como um item da propriedade `stylisPlugins`:

```jsx
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';

function RTL(props) {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      {props.children}
    </StyleSheetManager>
  );
}
```

## Demonstração

_Use o botão de alternância de direção no canto superior direito para inverter toda a documentação_

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Optando pela transformação do rtl

### JSS

Se você quiser evitar que um conjunto de regras específico seja afetado pela transformação `rtl`, você pode adicionar `flip: false` no inicio.

_Use o botão de alternância de direção no canto superior direito para ver o efeito._

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}

### emotion & styled-components

Você precisa a sintaxe de template literal e adicionar a diretiva `/* @noflip */` antes da regra ou propriedade para a qual você deseja desativar os estilos da direita para a esquerda.

_Use o botão de alternância de direção no canto superior direito para ver o efeito._

{{"demo": "pages/guides/right-to-left/RtlOptOutStylis.js", "hideEditButton": true}}
