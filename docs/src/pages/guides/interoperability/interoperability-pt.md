# Interoperabilidade da Biblioteca de Estilo

<p class="description">Enquanto você pode usar a solução de estilo baseada em emotion fornecida pelo Material-UI para estilizar sua aplicação, você também pode usar o que você já conhece e ama (desde CSS simples a styled-components).</p>

Este guia tem como objetivo documentar as alternativas mais populares, mas você deve descobrir que os princípios aplicados aqui podem ser adaptados para outras bibliotecas. Existem exemplos para as seguintes soluções de estilo:

- [CSS puro](#plain-css)
- [CSS global](#global-css)
- [Styled Components](#styled-components)
- [Módulos CSS](#css-modules)
- [Emotion](#emotion)

## CSS puro

Nada extravagante, apenas CSS.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/plain-css-fdue7)

**PlainCssSlider.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}
```

**PlainCssSlider.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './PlainCssSlider.css';

export default function PlainCssSlider() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```

### Ordem de injeção do CSS ⚠️

**Nota:** A maioria das soluções CSS-in-JS injetam seus estilos na parte inferior do HTML `<head>`, que dá precedência ao Material-UI sobre seus estilos customizados. Para remover a necessidade de **!important**, você precisa alterar a ordem de injeção do CSS. Here's a demo of how it can be done in Material-UI:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. */}
    </CacheProvider>
  );
}
```

**Note:** If you are using emotion and have a custom cache in your app, that one will override the one coming from Material-UI. In order for the injection order to still be correct, you need to add the prepend option. Aqui está um exemplo:

```jsx
Agora você pode sobrescrever os estilos do Material-UI. import * as React from 'react';
import { StylesProvider } from '@material-ui/core';

export default function GlobalCssPriority() {
  return (
    <StylesProvider injectFirst>
      {/* Your component tree. import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. */}
    </StylesProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@material-ui/styled-engine-sc` package.

### Elementos mais profundos

Se você tentar estilizar o Slider, você provavelmente gostaria de afetar alguns dos elementos filhos de Slider, por exemplo o thumb. No Material-UI, todos os elementos filhos têm uma especificidade aumentada de 2: `.parent .child {}`. Ao escrever uma sobrescrita, você precisa fazer o mesmo.

Os exemplos a seguir substituem o estilo de `thumb` do controle slider, além dos estilos customizados no slider em si.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**PlainCssSliderDeep1.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider . MuiSlider-thumb {
  border-radius: 1px;
}
```

**PlainCssSliderDeep1.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './PlainCssSliderDeep1.css';

export default function PlainCssSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```

A demonstração acima depende dos [valores padrão de `className`](/styles/advanced/#with-material-ui-core), mas você pode fornecer seu próprio nome de classe com a API `componentsProps`.

**PlainCssSliderDeep2.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .thumb {
  border-radius: 1px;
}
```

**PlainCssSliderDeep2.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './PlainCssSliderDeep2.css';

export default function PlainCssSliderDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        className="slider"
        componentsProps={{ thumb: { className: 'thumb' } }}
      />
    </div>
  );
}
```

## CSS global

Fornecer explicitamente os nomes das classes ao componente é um esforço excessivo? [Você pode segmentar os nomes de classe gerados por Material-UI](/styles/advanced/#with-material-ui-core).

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/global-classnames-dho8k)

**GlobalCssSlider.css**

```css
. MuiSlider-root {
  color: #20b2aa;
}

. MuiSlider-root:hover {
  color: #2e8b57;
}
```

**GlobalCssSlider.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './GlobalCssSlider.css';

export default function GlobalCssSlider() {
  return <Slider defaultValue={30} />;
}
```

### Ordem de injeção do CSS ⚠️

**Nota:** A maioria das soluções CSS-in-JS injetam seus estilos na parte inferior do HTML `<head>`, que dá precedência ao Material-UI sobre seus estilos customizados. Para remover a necessidade de **!important**, você precisa alterar a ordem de injeção do CSS. Here's a demo of how it can be done in Material-UI:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. */}
    </CacheProvider>
  );
}
```

**Note:** If you are using emotion and have a custom cache in your app, that one will override the one coming from Material-UI. In order for the injection order to still be correct, you need to add the prepend option. Aqui está um exemplo:

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function GlobalCssPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. */}
    </StylesProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@material-ui/styled-engine-sc` package.

### Elementos mais profundos

Se você tentar estilizar o Slider, você provavelmente gostaria de afetar alguns dos elementos filhos de Slider, por exemplo o thumb. No Material-UI, todos os elementos filhos têm uma especificidade aumentada de 2: `.parent .child {}`. Ao escrever uma sobrescrita, você precisa fazer o mesmo.

O exemplo a seguir substituem o estilo de `thumb` do controle slider, além dos estilos customizados no slider em si.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**GlobalCssSliderDeep.css**

```css
. MuiSlider-root {
  color: #20b2aa;
}

. MuiSlider-root:hover {
  color: #2e8b57;
}

. MuiSlider-root . MuiSlider-thumb {
  border-radius: 1px;
}
```

**GlobalCssSliderDeep.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './GlobalCssSliderDeep.css';

export default function GlobalCssSliderDeep() {
  return <Slider defaultValue={30} />;
}
```

## Styled Components

![estrelas](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg)

### Alterar o motor de estilo padrão

Por padrão, os componentes do Material-UI vêm com emotion como seu motor de estilo. Se, no entanto, você gostaria de usar `styled-components`, você pode configurar sua aplicação seguindo este [projeto de exemplo](https://github.com/mui-org/material-ui/blob/next/examples/create-react-app-with-styled-components). Seguir esta abordagem reduz o tamanho do pacote e remove a necessidade de configurar a ordem de injeção de CSS.

After the style engine is configured properly, you can use the [`styled()`](/customization/styled/) utility from `@material-ui/core/styles` and have direct access to the theme.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/styled-components-interoperability-w9z9d)

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { styled } from '@material-ui/core/styles';

const CustomizedSlider = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export default function StyledComponents() {
  return <CustomizedSlider defaultValue={30} />;
}
```

### Elementos mais profundos

Se você tentar estilizar o Slider, você provavelmente gostaria de afetar alguns dos elementos filhos de Slider, por exemplo o thumb. No Material-UI, todos os elementos filhos têm uma especificidade aumentada de 2: `.parent .child {}`. Ao escrever uma sobrescrita, você precisa fazer o mesmo.

Os exemplos a seguir substituem o estilo de `thumb` do controle slider, além dos estilos customizados no slider em si.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "defaultCodeOpen": true}}

A demonstração acima depende dos [valores padrão de `className`](/styles/advanced/#with-material-ui-core), mas você pode fornecer seu próprio nome de classe com a API `componentsProps`.

```jsx
import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const CustomizedSlider = styled((props) => (
  <Slider componentsProps={{ thumb: { className: 'thumb' } }} {...props} />
))`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .thumb {
    border-radius: 1px;
  }
`;

export default function StyledComponentsDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <CustomizedSlider defaultValue={30} />
    </div>
  );
}
```

### Tema

Ao usar o provedor de tema do Material-UI, o tema estará disponível no contexto do tema do motor de estilo também (emotion ou styled-components, dependendo da sua configuração).

> ⚠️ Se você já **estiver** usando um tema customizando com styled-components ou emotion, ele pode não ser compatível com a especificação do tema do Material-UI. Se ele não é compatível, você precisa renderizar o ThemeProvider  do Material-UI <b>primeiro</b>. Isto irá garantir que as estruturas do tema estejam isoladas. Isso é ideal para a adoção progrressiva dos componentes da base de código do Material-UI.

Você é encorajado a compartilhar o mesmo objeto de tema entre Material-UI e o resto de seu projeto.

```jsx
const CustomizedSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};

  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);
```

{{"demo": "pages/guides/interoperability/StyledComponentsTheme.js"}}

### Portais

O [Portal](/components/portal/) fornece uma maneira de elegante para renderizar filhos em um nó DOM que existe fora da hierarquia DOM do componente pai. Devido a maneira como o escopo de CSS do styled-components funciona, você pode encontrar problemas nos quais o estilo não é aplicado.

For example, if you attempt to style the `tooltip` generated by the [Tooltip](/components/tooltip/) component, you will need to pass along the `className` property to the element being rendered outside of it's DOM hierarchy. O exemplo a seguir mostra uma solução alternativa:

```jsx
import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: navy;
  }
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsPortal.js"}}

## Módulos CSS

![estrelas](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

É difícil saber a participação de mercado [nesta solução de estilo](https://github.com/css-modules/css-modules), pois é dependente da solução de empacotamento que as pessoas estão usando.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/css-modules-nuyg8)

**CssModulesSlider.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}
```

**CssModulesSlider.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSlider.module.css';

export default function CssModulesSlider() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className={styles.slider} />
    </div>
  );
}
```

### Ordem de injeção do CSS ⚠️

**Nota:** A maioria das soluções CSS-in-JS injetam seus estilos na parte inferior do HTML `<head>`, que dá precedência ao Material-UI sobre seus estilos customizados. Para remover a necessidade de **!important**, você precisa alterar a ordem de injeção do CSS. Here's a demo of how it can be done in Material-UI:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. */}
    </CacheProvider>
  );
}
```

**Note:** If you are using emotion and have a custom cache in your app, that one will override the one coming from Material-UI. In order for the injection order to still be correct, you need to add the prepend option. Aqui está um exemplo:

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function PlainCssPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. */}
    </StylesProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@material-ui/styled-engine-sc` package.

### Elementos mais profundos

Se você tentar estilizar o Slider, você provavelmente gostaria de afetar alguns dos elementos filhos de Slider, por exemplo o thumb. No Material-UI, todos os elementos filhos têm uma especificidade aumentada de 2: `.parent .child {}`. Ao escrever uma sobrescrita, você precisa fazer o mesmo.

Os exemplos a seguir substituem o estilo de `thumb` do controle slider, além dos estilos customizados no slider em si.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**CssModulesSliderDeep1.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider . MuiSlider-thumb {
  border-radius: 1px;
}
```

**CssModulesSliderDeep1.js**

```jsx
import * as React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSliderDeep1.module.css';
import Slider from '@material-ui/core/Slider';

export default function CssModulesSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className={styles.slider} />
    </div>
  );
}
```

A demonstração acima depende dos [valores padrão de `className`](/styles/advanced/#with-material-ui-core), mas você pode fornecer seu próprio nome de classe com a API `componentsProps`.

**CssModulesSliderDeep2.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .thumb {
  border-radius: 1px;
}
```

**CssModulesSliderDeep2.js**

```jsx
import * as React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSliderDeep2.module.css';
import Slider from '@material-ui/core/Slider';

export default function CssModulesSliderDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        className={styles.slider}
        componentsProps={{ thumb: { className: styles.thumb } }}
      />
    </div>
  );
}
```

## Emotion

![estrelas](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/@emotion/react.svg)

### A propriedade `css`

O método **css()** do Emotion funciona perfeitamente com Material-UI.

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "defaultCodeOpen": true}}

### Tema

Funciona exatamente como styled components. Você pode [usar o mesmo guia](/guides/interoperability/#styled-components).

### A API `styled()`

Funciona exatamente como styled components. Você pode [usar o mesmo guia](/guides/interoperability/#styled-components).
