# Migrando da v4 para v5

<p class="description">Sim, v5 foi lançada!</p>

If you're looking for the v4 docs, you can [find them here](https://material-ui.com/versions/).

> Este documento está em constante evolução. If you have upgraded your site and run into something that's not covered here, please [add your changes on GitHub](https://github.com/mui-org/material-ui/blob/HEAD/docs/src/pages/guides/migration-v4/migration-v4.md).

## Introdução

Esta é uma referência para atualizar seu site de Material-UI v4 para v5. While there's a lot covered here, you probably won't need to do everything. We'll do our best to keep things easy to follow, and as sequential as possible, so you can quickly get rocking on v5!

## Por que você deve migrar

Esta página de documentação cobre o _como_ migrar da v4 para a v5. O *por que* é abordado na [postagem no blog do Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

## Atualizando suas dependências

A primeira coisa que você precisa fazer é atualizar suas dependências.

### Atualize a versão do Material-UI

Você precisa atualizar seu `package.json` para usar a versão mais recente do Material-UI e suas dependências de pares.

```json
"dependencies": {
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@material-ui/core": "^5.0.0"
}
```

Ou execute

```sh
npm install @material-ui/core@next @emotion/react @emotion/styled

ou

yarn add @material-ui/core@next @emotion/react @emotion/styled
```

## Tratamento de alterações recentes

### Suporte de navegadores e versões de node

Os indicativos de suporte do pacote padrão foram alterados. As versões exatas do suporte serão fixadas na consulta browserslist `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

The default bundle supports the following minimum versions:

<!-- #stable-snapshot -->

- Node 12 (antes era 8)
- Chrome 84 (antes era 49)
- Edge 85 (antes 14)
- Firefox 78 (antes era 52)
- Safari 13 (macOS) e 12.2 (iOS) (antes era 10)
- para maiores detalhes (veja [.browserslistrc (seção `stable`)](https://github.com/mui-org/material-ui/blob/HEAD/.browserslistrc#L11))

Não há mais o suporte para o IE 11. Se você precisar do suporte para o IE 11, confira nosso [pacote legado](/guides/minimizing-bundle-size/#legacy-bundle).

### Componentes de classe sem o encaminhamento de refs

O suporte para componentes de classe, sem o encaminhamento de refs, na propriedade `component` ou como um elemento `children` imediato foi removido. Se você estava usando `unstable_createStrictModeTheme` ou não recebeu quaisquer avisos relacionados a `findDOMNode` no `React. StrictMode`, então você não precisa fazer nada. Caso contrário, confira a seção ["Advertência com refs" em nosso guia de composição](/guides/composition/#caveat-with-refs) para descobrir como migrar. Esta alteração afeta quase todos os componentes no qual você está usando a propriedade `component` ou passando diretamente um  `children` para componentes que requerem `children` como elemento (ou seja, `<MenuList><CustomMenuItem /></MenuList>`)

### Supported React version

The minimum supported version of React was increased from v16.8.0 to v17.0.0.

### Supported TypeScript version

The minimum supported version of TypeScript was increased from v3.2 to v3.5. We try to align with types released from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (i.e. packages published on npm under the `@types` namespace). We will not change the minimum supported version in a major version of Material-UI. However, we generally recommend to not use a TypeScript version older than the [lowest supported version of DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped#older-versions-of-typescript-33-and-earlier)

### Style library

The style library used by default in v5 is [`emotion`](https://github.com/emotion-js/emotion). While migrating from JSS to emotion, and if you are using JSS style overrides for your components (for example overrides created by `makeStyles`), you will need to take care of the CSS injection order. To do so, you need to have the `StyledEngineProvider` with the `injectFirst` option at the top of your component tree. Aqui está um exemplo:

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

> **Note:** If you are using emotion to style your app, and have a custom cache, it will override the one provided by Material-UI. In order for the injection order to still be correct, you need to add the `prepend` option to `createCache`. Aqui está um exemplo:

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

> **Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. To see how it can be done, take a look at the [`StyledEngineProvider` implementation](https://github.com/mui-org/material-ui/blob/next/packages/material-ui-styled-engine-sc/src/StyledEngineProvider/StyledEngineProvider.js) in the `@material-ui/styled-engine-sc` package.

### Tema

- The function `createMuiTheme` was renamed to `createTheme` to make more intuitive to use with `ThemeProvider`.

  ```diff
  -import { createMuiTheme } from '@material-ui/core/styles';
  +import { createTheme } from '@material-ui/core/styles';

  -const theme = createMuiTheme({
  +const theme = createTheme({
  ```

- The default background color is now `#fff` in light mode and `#121212` in dark mode. This matches the Material Design guidelines.
- Breakpoints are now treated as values instead of [ranges](https://v4.material-ui.com/customization/breakpoints/#default-breakpoints). The behavior of `down(key)` was changed to define a media query below the value defined by the corresponding breakpoint (exclusive), rather than the breakpoint above. `between(start, end)` was also updated to define a media query for the values between the actual values of start (inclusive) and end (exclusive). Ao usar o utilitário de pontos de quebra `down()`, você precisa atualizar a chave de ponto de quebra em um passo. Ao usar o `between(start, end)`, o ponto de quebra de fim também deve ser atualizado em um passo.

  Here are some examples of the changes required:

  ```diff
  -theme.breakpoints.down('sm') // '@media (max-width:959.95px)' - [0, sm + 1) => [0, md)
  +theme.breakpoints.down('md') // '@media (max-width:959.95px)' - [0, md)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'md') // '@media (min-width:600px) and (max-width:1279.95px)' - [sm, md + 1) => [0, lg)
  +theme.breakpoints.between('sm', 'lg') // '@media (min-width:600px) and (max-width:1279.95px)' - [0, lg)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'xl') // '@media (min-width:600px)'
  +theme.breakpoints.up('sm') // '@media (min-width:600px)'
  ```

  You can use the [`theme-breakpoints` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#theme-breakpoints) for automatic migration of `theme.breakpoints`.

  O mesmo deve ser feito ao usar o componente `Hidden`:

  ```diff
  -<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
  +<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
  ```

- The `theme.breakpoints.width` utility was removed because it's redundant. Use `theme.breakpoints.values` to get the same values.

  ```diff
  -theme.breakpoints.width('md')
  +theme.breakpoints.values.md
  ```

- A assinatura do utilitário `theme.palette.augmentColor` foi alterada:

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

- The `theme.typography.round` helper was removed because it was no longer used. If you need it, use the function below:

  ```js
  function round(value) {
    return Math.round(value * 1e5) / 1e5;
  }
  ```

- The default breakpoints were changed to better match the common use cases. They also better match the Material Design guidelines. [Read more about the change](https://github.com/mui-org/material-ui/issues/21902)

  ```diff
  {
    xs: 0,
    sm: 600,
  - md: 960,
  + md: 900,
  - lg: 1280,
  + lg: 1200,
  - xl: 1920,
  + xl: 1536,
  }
  ```

  If you prefer the old breakpoint values, use the snippet below.

  ```js
  import { createTheme } from '@material-ui/core/styles';

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  ```

#### Utilitário para atualização

For a smoother transition, the `adaptV4Theme` helper allows you to iteratively upgrade to the new theme structure.

```diff
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createTheme, adaptV4Theme } from '@material-ui/core/styles';

-const theme = createMuiTheme({
+const theme = createTheme(adaptV4Theme({
  // v4 theme
-});
+}));
```

##### Supported changes

As seguintes alterações são aplicadas por este utilitário adaptador:

- A abstração com a função "gutters" não provou ser utilizada com frequência suficiente para ser valiosa.

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]: {
  +  paddingLeft: theme.spacing(3),
  +  paddingRight: theme.spacing(3),
  +},
  ```

- `theme.spacing` agora retorna valores únicos com a unidade px por padrão. Esta alteração melhora a integração com styled-components & emotion.

  Antes:

  ```js
  theme.spacing(2) => 16
  ```

  Depois:

  ```js
  theme.spacing(2) => '16px'
  ```

  You can use the [`theme-spacing` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#theme-spacing) to remove any 'px' suffix from `theme.spacing` calls in a template string.

- The `theme.palette.type` key was renamed to `theme.palette.mode`, to better follow the "dark mode" term that is usually used for describing this feature.

  ```diff
  import { createTheme } from '@material-ui/core/styles';
  -const theme = createTheme({palette: { type: 'dark' }}),
  +const theme = createTheme({palette: { mode: 'dark' }}),
  ```

- A chave `theme.palette.text.hint` não era usada em componentes do Material-UI e foi removida. Se você depende dela, você pode adicioná-la de volta:

  ```diff
  import { createTheme } from '@material-ui/core/styles';

  -const theme = createTheme(),
  +const theme = createTheme({
  +  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
  +});
  ```

- The components' definitions in the theme were restructure under the `components` key, to allow for easier discoverability of the definitions related to any one component.

1. `props`

```diff
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
-  props: {
-    MuiButton: {
-      disableRipple: true,
-    },
-  },
+  components: {
+    MuiButton: {
+      defaultProps: {
+        disableRipple: true,
+      },
+    },
+  },
});
```

2. `sobrescrevendo`

```diff
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
-  overrides: {
-    MuiButton: {
-      root: { padding: 0 },
-    },
-  },
+  components: {
+    MuiButton: {
+      styleOverrides: {
+        root: { padding: 0 },
+      },
+    },
+  },
});
```

### Estilos

- Renomeado `fade` para `alpha` para descrever melhor a sua funcionalidade. O nome anterior estava gerando confusão quando a cor de entrada já tinha um valor alfa. O utilitário **sobrescreve** o valor alfa da cor.

  ```diff
  - import { fade } from '@material-ui/core/styles';
  + import { alpha } from '@material-ui/core/styles';

  const classes = makeStyles(theme => ({
  -  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  +  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }));
  ```

  You can use the [`fade-rename-alpha` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#fade-rename-alpha) for automatic migration.

- The `createStyles` function from `@material-ui/core/styles` was moved to the one exported from `@material-ui/styles`. It is necessary for removing the dependency to `@material-ui/styles` in the core package.

```diff
-import { createStyles } from '@material-ui/core/styles';
+import { createStyles } from '@material-ui/styles';
```

### Sistema

- The following system functions (and properties) were renamed because they are considered deprecated CSS:

  1. `gridGap` to `gap`
  1. `gridRowGap` to `rowGap`
  1. `gridColumnGap` to `columnGap`

- Use spacing unit in `gap`, `rowGap`, and `columnGap`. If you were using a number previously, you need to mention the px to bypass the new transformation with `theme.spacing`.

  ```diff
  <Box
  - gap={2}
  + gap="2px"
  >
  ```

- Replace `css` prop with `sx` to avoid collision with styled-components & emotion `css` prop.

  ```diff
  -<Box css={{ color: 'primary.main' }} />
  +<Box sx={{ color: 'primary.main' }} />
  ```

  > Note that the system grid function wasn't documented in v4.

### Componentes do core

As the core components use emotion as their style engine, the props used by emotion are not intercepted. The prop `as` in the following code snippet will not be propagated to `SomeOtherComponent`.

```jsx
<MuiComponent component={SomeOtherComponent} as="button" />
```

### Uma barra de aplicativos proeminente.

- Remove z-index when position static and relative. This avoids the creation of a stacking context and rendering issues.
- The `color` prop has no longer any effect in dark mode. The app bar uses the background color required by the elevation to follow the [Material Design guidelines](https://material.io/design/color/dark-theme.html). Use `enableColorOnDark` to restore the behavior of v4.

  ```jsx
  <AppBar enableColorOnDark />
  ```

### Alerta

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Alert from '@material-ui/lab/Alert';
  -import AlertTitle from '@material-ui/lab/AlertTitle';
  +import Alert from '@material-ui/core/Alert';
  +import AlertTitle from '@material-ui/core/AlertTitle';
  ```

Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

### Autocompletar

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Autocomplete from '@material-ui/lab/Autocomplete';
  -import useAutocomplete  from '@material-ui/lab/useAutocomplete';
  +import Autocomplete from '@material-ui/core/Autocomplete';
  +import useAutoComplete from '@material-ui/core/useAutocomplete';
  ```

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

- Remova a propriedade `debug`. Existem algumas alternativas mais simples: `open={true}`, Chrome devtools ["Emulate focused"](https://twitter.com/sulco/status/1305841873945272321), ou React devtools prop setter.
- `renderOption` deve agora retornar uma estrutura completa do DOM da opção. Isso torna as customizações mais fáceis. Você pode aplicar a alteração com:

  ```diff
  <Autocomplete
  - renderOption={(option, { selected }) => (
  -   <React. Fragment>
  + renderOption={(props, option, { selected }) => (
  +   <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.title}
  -   </React.
  ```

- Rename `closeIcon` prop to `clearIcon` to avoid confusion.

  ```diff
  -<Autocomplete closeIcon={defaultClearIcon} />
  +<Autocomplete clearIcon={defaultClearIcon} />
  ```

  You can use the [`autocomplete-rename-closeicon` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#autocomplete-rename-closeicon) for automatic migration.

- The following values of the reason argument in `onChange` and `onClose` were renamed for consistency:

  1. `create-option` to `createOption`
  2. `select-option` to `selectOption`
  3. `remove-option` to `removeOption`

- Change the CSS rules that use `[data-focus="true"]` to use `.Mui-focused`. The `data-focus` attribute is not set on the focused option anymore, instead, global class names are used.

  ```diff
  -'.MuiAutocomplete-option[data-focus="true"]': {
  +'.MuiAutocomplete-option.Mui-focused': {
  ```

- Rename `getOptionSelected` to `isOptionEqualToValue` to better describe its purpose.

  ```diff
  <Autocomplete
  - getOptionSelected={(option, value) => option.title === value.title}
  + isOptionEqualToValue={(option, value) => option.title === value.title}
  ```

### Avatar

- Renomeie `circle` para `circular` por uma questão de consistência:

  ```diff
  -<Avatar variant="circle">
  -<Avatar classes={{ circle: 'className' }}>
  +<Avatar variant="circular">
  +<Avatar classes={{ circular: 'className' }}>
  ```

  Since `circular` is the default value, the variant prop can be deleted:

  ```diff
  -<Avatar variant="circle">
  +<Avatar>
  ```

  You can use the [`avatar-circle-circular` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#avatar-circle-circular) for automatic migration.

- Mova o componente AvatarGroup do lab para o core.

  ```diff
  -import AvatarGroup from '@material-ui/lab/AvatarGroup';
  +import AvatarGroup from '@material-ui/core/AvatarGroup';
  ```

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

### Badge

- Renomeie `circle` para `circular` e `rectangle` para `rectangular` por uma questão de consistência.

  ```diff
  -<Badge overlap="circle">
  -<Badge overlap="rectangle">
  +<Badge overlap="circular">
  +<Badge overlap="rectangular">
  <Badge classes={{
  - anchorOriginTopRightRectangle: 'className',
  - anchorOriginBottomRightRectangle: 'className',
  - anchorOriginTopLeftRectangle: 'className',
  - anchorOriginBottomLeftRectangle: 'className',
  - anchorOriginTopRightCircle: 'className',
  - anchorOriginBottomRightCircle: 'className',
  - anchorOriginTopLeftCircle: 'className',
  + anchorOriginTopRightRectangular: 'className',
  + anchorOriginBottomRightRectangular: 'className',
  + anchorOriginTopLeftRectangular: 'className',
  + anchorOriginBottomLeftRectangular: 'className',
  + anchorOriginTopRightCircular: 'className',
  + anchorOriginBottomRightCircular: 'className',
  + anchorOriginTopLeftCircular: 'className',
  }}>
  ```

  You can use the [`badge-overlap-value` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#badge-overlap-value) for automatic migration.

### BottomNavigation

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<BottomNavigation onChange={(event: React. ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React. SyntheticEvent) => {}} />
  ```

### Box

- O valor de transformação da propriedade de sistema `borderRadius` foi alterado. Se ele receber um número, ele multiplica esse valor pelo valor de `theme.shape.borderRadius`. Use a string to provide an explicit `px` value.

  ```diff
  -<Box borderRadius="borderRadius">
  +<Box borderRadius={1}>
  ```

  ```diff
  -<Box borderRadius={16}>
  +<Box borderRadius="16px">
  ```

  You can use the [`box-borderradius-values` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#box-borderradius-values) for automatic migration.

- The Box system props have an optional alternative API in v5, using the `sx` prop. You can [read this section](/system/basics/#api-tradeoff) for the "why" behind this new API.

  ```diff
  -<Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
  +<Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
  ```

  If you prefer the new syntax, you can use the [`box-sx-prop` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#box-sx-prop) for automatic migration.

- The following properties have been renamed because they are considered deprecated CSS properties by the CSS specification:

  1. `gridGap` to `gap`
  2. `gridColumnGap` to `columnGap`
  3. `gridRowGap` to `rowGap`

  ```diff
  -<Box gridGap={1}>
  -<Box gridColumnGap={2}>
  -<Box gridRowGap={3}>
  +<Box gap={1}>
  +<Box columnGap={2}>
  +<Box rowGap={3}>
  ```

  (Note that the system grid function wasn't documented in v4.)

  You can use the [`box-rename-gap` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#box-rename-gap) for automatic migration.

- The `clone` prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a Material-UI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }} clone>
  -  <Button>Save</Button>
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

- The ability to pass a render prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a Material-UI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <Button {...props}>Save</Button>}
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

  For non-Material-UI components, use the `component` prop.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <button {...props}>Save</button>}
  -</Box>
  +<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
  ```

### Button

- A propriedade  `color` do botão agora é "primary" por padrão, e "default" foi removido. This makes the button closer to the Material Design guidelines and simplifies the API.

  ```diff
  -<Button color="primary">
  -<Button color="default">
  +<Button>
  +<Button>
  ```

  You can use the [`button-color-prop` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#button-color-prop) for automatic migration.

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
  <button class="MuiButton-root">
  - <span class="MuiButton-label">
      children
  - </span>
  </button>
  ```

### Chip

- Renomeie a variante `default` para `filled` por uma questão de consistência.

  Since `filled` is the default value, the variant prop can be deleted:

  ```diff
  -<Chip variant="default">
  +<Chip>
  ```

  You can use the [`chip-variant-prop` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#chip-variant-prop) for automatic migration.

### Caixa de seleção

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### Conjunto de progressos

- The `static` variant has been renamed to `determinate`, and the previous appearance of `determinate` has been replaced by that of `static`. Era uma exceção para Material Design, e foi removida da especificação.

  ```diff
  <CircularProgress variant="static" classes={{ static: 'className' }} />
  +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  ```

You can use the [`circularprogress-variant` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#circularprogress-variant) for automatic migration.

> NB: Se você já tinha customizado como "determinate", suas customizações provavelmente não são mais válidas. Por favor, remova-as.

### Collapse

- A propriedade `collapsedHeight` foi renomeada para `collapsedSize` para dar suporte para a direção horizontal.

  ```diff
  -<Collapse collapsedHeight={40}>
  +<Collapse collapsedSize={40}>
  ```

- A chave `classes.container` foi alterada para corresponder à convenção dos outros componentes.

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

You can use the [`collapse-rename-collapsedheight` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#collapse-rename-collapsedheight) for automatic migration of both the prop and the classes key.

### CssBaseline

- The component was migrated to use the `@material-ui/styled-engine` (`emotion` or `styled-components`) instead of `jss`. You should remove the `@global` key when defining the style overrides for it. You could also start using the CSS template syntax over the JavaScript object syntax.

  ```diff
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
  -      styleOverrides: {
  -       '@global': {
  -          html: {
  -            WebkitFontSmoothing: 'auto',
  -          },
  -       },
  -      },
  +     styleOverrides: `
  +       html {
  +         -webkit-font-smoothing: auto;
  +       }
  +     `
      },
    },
  });
  ```

- The `body` font size has changed from `theme.typography.body2` (`0.875rem`) to `theme.typography.body1` (`1rem`). To return to the previous size, you can override it in the theme:

  ```js
  const theme = createTheme({
    typography: {
      body1: {
        fontSize: '0.875rem',
      },
    },
  });
  ```

  (Note that this will also affect use of the Typography component with the default `body1` variant).

### Dialog

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

  ```diff
  <Dialog
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

  You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

- Remove the `disableBackdropClick` prop because it is redundant. Em vez disso, ignore eventos de close em `onClose` quando `reason === 'backdropClick'`.

  ```diff
  <Dialog
  - disableBackdropClick
  - onClose={handleClose}
  + onClose={(event, reason) => {
  +   if (reason !== 'backdropClick') {
  +     onClose(event, reason);
  +   }
  + }}
  />
  ```

- Remove the `withMobileDialog` higher-order component. A hook API permite uma solução mais simples e flexível:

  ```diff
  -import withMobileDialog from '@material-ui/core/withMobileDialog';
  +import { useTheme, useMediaQuery } from '@material-ui/core';

  function ResponsiveDialog(props) {
  - const { fullScreen } = props;
  + const theme = useTheme();
  + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

  // ...

  -export default withMobileDialog()(ResponsiveDialog);
  +export default ResponsiveDialog;
  ```

- Flatten DialogTitle DOM structure, remove `disableTypography` prop

  ```diff
  -<DialogTitle disableTypography>
  -  <Typography variant="h4" component="h2">
  +<DialogTitle>
  +  <Typography variant="h4" component="span">
       My header
     </Typography>
  ```

### Divider

- Use cor de borda em vez de cor de fundo. Ela impede a altura inconsistente em telas redimensionadas. If you have customized the color of the border, you will need to update the CSS property override:

  ```diff
  . MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### Painel de expansão

- Renomeie os componentes `ExpansionPanel` para `Accordion` para usar uma convenção de nome mais comum:

  ```diff
  -import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  -import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  -import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  -import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
  +import Accordion from '@material-ui/core/Accordion';
  +import AccordionSummary from '@material-ui/core/AccordionSummary';
  +import AccordionDetails from '@material-ui/core/AccordionDetails';
  +import AccordionActions from '@material-ui/core/AccordionActions';

  -<ExpansionPanel>
  +<Accordion>
  -  <ExpansionPanelSummary>
  +  <AccordionSummary>
       <Typography>Location</Typography>
       <Typography>Select trip destination</Typography>
  -  </ExpansionPanelSummary>
  +  </AccordionSummary>
  -  <ExpansionPanelDetails>
  +  <AccordionDetails>
       <Chip label="Barbados" onDelete={() => {}} />
       <Typography variant="caption">Select your destination of choice</Typography>
  -  </ExpansionPanelDetails>
  +  </AccordionDetails>
     <Divider />
  -  <ExpansionPanelActions>
  +  <AccordionActions>
       <Button size="small">Cancel</Button>
       <Button size="small">Save</Button>
  -  </ExpansionPanelActions>
  +  </AccordionActions>
  -</ExpansionPanel>
  +</Accordion>
  ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<Accordion onChange={(event: React. ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React. SyntheticEvent, expanded: boolean) => {}} />
  ```

- Renomeie `focused` para `focusVisible` por uma questão de consistência:

  ```diff
  <Accordion
    classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
    }}
  />
  ```

- Remova `display: flex` de AccordionDetails, é muito opinativo. A maioria dos desenvolvedores espera uma exibição em bloco.
- Remova a propriedade `IconButtonProps` de AccordionSummary. O componente renderiza um elemento `<div>` em vez de um IconButton. A propriedade não é mais necessária.

### Fab

- Rename `round` to `circular` for consistency:

  ```diff
  -<Fab variant="round">
  +<Fab variant="circular">
  ```

### FormControl

- Altere a variante padrão de `standard` para `outlined`. Standard has been removed from the Material Design guidelines.

  ```diff
  -<FormControl value="Standard" />
  -<FormControl value="Outlined" variant="outlined" />
  +<FormControl value="Standard" variant="standard" />
  +<FormControl value="Outlined" />
  ```

[This codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#variant-prop) will automatically update your code.

### Grid

- Rename `justify` prop to `justifyContent` to align with the CSS property name.

  ```diff
  -<Grid justify="center">
  +<Grid justifyContent="center">
  ```

  You can use the [`component-rename-prop` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#component-rename-prop) for automatic migration.

- The props: `alignItems` `alignContent` and `justifyContent` and their `classes` and style overrides keys were removed: "align-items-xs-center", "align-items-xs-flex-start", "align-items-xs-flex-end", "align-items-xs-baseline", "align-content-xs-center", "align-content-xs-flex-start", "align-content-xs-flex-end", "align-content-xs-space-between", "align-content-xs-space-around", "justify-content-xs-center", "justify-content-xs-flex-end", "justify-content-xs-space-between", "justify-content-xs-space-around" and "justify-content-xs-space-evenly". These props are now considered part of the system, not on the `Grid` component itself. If you still wish to add overrides for them, you can use the `theme.components.MuiGrid.variants` options. For example

  ```diff
  const theme = createTheme({
    components: {
      MuiGrid: {
  -     styleOverrides: {
  -       "align-items-xs-flex-end": {
  -         marginTop: '20px',
  -       },
  -     },
  +     variants: {
  +       props: { alignItems: "flex-end" },
  +       style: {
  +         marginTop: '20px',
  +       },
  +     }],
      },
    },
  });
  ```

  You can use the [`grid-justify-justifycontent` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#grid-justify-justifycontent) for automatic migration.

### GridList

- Renomeie os componentes `GridList` para `ImageList` para entrar em conformidade com o nome atual do componente no Material Design.
- Renomeie no GridList a propriedade  `spacing` para  `gap` para ter conformidade com o atributo CSS.
- Rename the GridList `cellHeight` prop to `rowHeight`.
- Adicione a propriedade `variant` para o GridList.
- Renomeie no GridListItemBar a propriedade `actionPosition` para `position`. (Observe também as alterações de nome de classe relacionadas.)
- Use CSS object-fit. For IE11 support either use a polyfill such as https://www.npmjs.com/package/object-fit-images, or continue to use the v4 component.

  ```diff
  -import GridList from '@material-ui/core/GridList';
  -import GridListTile from '@material-ui/core/GridListTile';
  -import GridListTileBar from '@material-ui/core/GridListTileBar';
  +import ImageList from '@material-ui/core/ImageList';
  +import ImageListItem from '@material-ui/core/ImageListItem';
  +import ImageListItemBar from '@material-ui/core/ImageListItemBar';

  -<GridList spacing={8} cellHeight={200}>
  -  <GridListTile>
  +<ImageList gap={8} rowHeight={200}>
  +  <ImageListItem>
      <img src="file.jpg" alt="Image title" />
  -    <GridListTileBar
  +    <ImageListItemBar
        title="Title"
        subtitle="Subtitle"
      />
  -  </GridListTile>
  -</GridList>
  +  </ImageListItem>
  +</ImageList>
  ```

### Hidden

- This component was removed because its functionality can be created with the [`sx`](/system/basics/#the-sx-prop) prop or the [`useMediaQuery`](/components/use-media-query) hook.

  Use the `sx` prop to replace `implementation="css"`:

  ```diff
  -<Hidden implementation="css" xlUp><Paper /></Hidden>
  -<Hidden implementation="css" xlUp><button /></Hidden>
  +<Paper sx={{ display: { xl: 'none', xs: 'block' } }} />
  +<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} />
  ```

  ```diff
  -<Hidden implementation="css" mdDown><Paper /></Hidden>
  -<Hidden implementation="css" mdDown><button /></Hidden>
  +<Paper sx={{ display: { xs: 'none', md: 'block' } }} />
  +<Box component="button" sx={{ display: { xs: 'none', md: 'block' } }} />
  ```

  Use the `useMediaQuery` hook to replace `implementation="js"`:

  ```diff
  -<Hidden implementation="js" xlUp><Paper /></Hidden>
  +const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
  +return hidden ? null : <Paper />;
  ```

### Icon

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikely event that you were using the value `default`, the prop can be removed:

  ```diff
  -<Icon fontSize="default">icon-name</Icon>
  +<Icon>icon-name</Icon>
  ```

### IconButton

- The default size's padding is reduced to `8px` which makes the default IconButton size of `40px`. To get the old default size (`48px`), use `size="large"`. The change was done to better match Google's products when Material Design stopped documenting the icon button pattern.

  ```diff
  - <IconButton>
  + <IconButton size="large">
  ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
  <button class="MuiIconButton-root">
  - <span class="MuiIconButton-label">
      <svg />
  - </span>
  </button>
  ```

### Menu

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

  ```diff
  <Menu
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  >
  ```

  > Note: The `selectedMenu` variant will no longer vertically align the selected item with the anchor.

  You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

- Change the default value of `anchorOrigin.vertical` to follow the Material Design guidelines. The menu now displays below the anchor instead of on top of it. Você pode reproduzir o comportamento anterior com:

  ```diff
   <Menu
  +  anchorOrigin={{
  +    vertical: 'top',
  +    horizontal: 'left',
  +  }}
  ```

### MenuItem

- The `MenuItem` component inherits the `ButtonBase` component instead of `ListItem`. The class names related to "MuiListItem-\*" are removed and theming `ListItem` is no longer affecting `MenuItem`.

  ```diff
  -<li className="MuiButtonBase-root MuiMenuItem-root MuiListItem-root">
  +<li className="MuiButtonBase-root MuiMenuItem-root">
  ```

- prop `listItemClasses` is removed, use `classes` instead.

  ```diff
  -<MenuItem listItemClasses={{...}}>
  +<MenuItem classes={{...}}>
  ```

  Read more about [MenuItem CSS API](/api/menu-item/#css)

### Modal

- Remove the `disableBackdropClick` prop because it is redundant. Use `onClose` with `reason === 'backdropClick'` instead.

  ```diff
  <Modal
  - disableBackdropClick
  - onClose={handleClose}
  + onClose={(event, reason) => {
  +   if (reason !== 'backdropClick') {
  +     onClose(event, reason);
  +   }
  + }}
  />
  ```

- Remove the `onEscapeKeyDown` prop because it is redundant. Em vez disso, use `onClose` com `reason === "escapeKeyDown"`.

  ```diff
  <Modal
  - onEscapeKeyDown={handleEscapeKeyDown}
  + onClose={(event, reason) => {
  +   if (reason === 'escapeKeyDown') {
  +     handleEscapeKeyDown(event);
  +   }
  + }}
  />
  ```

- Remova a propriedade `onRendered`. Dependendo da sua situação de uso,  use um [ref com callback](https://pt-br.reactjs.org/docs/refs-and-the-dom.html#callback-refs) no elemento filho ou um hook de efeito no componente filho.

### NativeSelect

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<NativeSelect classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<NativeSelect classes={{ select: 'class1 class2 class3' }} />
  ```

### OutlinedInput

- Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined.

  ```diff
  -<OutlinedInput labelWidth={20} />
  +<OutlinedInput label="First Name" />
  ```

### Paper

- Change the background opacity based on the elevation in dark mode. This change was done to follow the Material Design guidelines. You can revert it in the theme:

  ```diff
  const theme = createTheme({
    components: {
      MuiPaper: {
  +     styleOverrides: { root: { backgroundImage: 'unset' } },
      },
    },
  });
  ```

### Paginação

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Pagination from '@material-ui/lab/Pagination';
  -import PaginationItem from '@material-ui/lab/PaginationItem';
  -import { usePagination } from '@material-ui/lab/Pagination';
  +import Pagination from '@material-ui/core/Pagination';
  +import PaginationItem from '@material-ui/core/PaginationItem';
  +import usePagination from '@material-ui/core/usePagination';
  ```

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

- Rename `round` to `circular` for consistency:

  ```diff
  -<Pagination shape="round">
  -<PaginationItem shape="round">
  +<Pagination shape="circular">
  +<PaginationItem shape="circular">
  ```

### Popover

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

  ```diff
  <Popover
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

  You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

- The `getContentAnchorEl` prop was removed to simplify the positioning logic.

### Popper

- Atualize [Popper.js](https://github.com/popperjs/popper-core) da v1 para v2. Esta biblioteca de terceiros introduziu muitas mudanças.<br /> Você pode ler [seu guia de migração](https://popper.js.org/docs/v2/migration-guide/) ou o seguinte resumo:

  - Os prefixos CSS mudaram:
    ```diff
    popper: {
      zIndex: 1,
    - '&[x-placement*="bottom"] $arrow': {
    + '&[data-popper-placement*="bottom"] $arrow': {
    ```
  - Method names have changed:

    ```diff
    -popperRef.current.scheduleUpdate()
    +popperRef.current.update()
    ```

    ```diff
    -popperRef.current.update()
    +popperRef.current.forceUpdate()
    ```

  - A API dos modificadores mudou muito. Há demasiadas alterações para serem cobertas neste guia.

### Portal

- Remova a propriedade `onRendered`. Dependendo da sua situação de uso,  use um [ref com callback](https://pt-br.reactjs.org/docs/refs-and-the-dom.html#callback-refs) no elemento filho ou um hook de efeito no componente filho.

### Botões de opção

- The radio color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the radio closer to the Material Design guidelines.

  ```diff
  -<Radio />
  +<Radio color="secondary />
  ```

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### Rating

- Mova o componente do lab para o core. O componente agora é estável.

  ```diff
  -import Rating from '@material-ui/lab/Rating';
  +import Rating from '@material-ui/core/Rating';
  ```

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

- Altere o ícone padrão de vazio para melhorar a acessibilidade. Se você tiver uma propriedade `icon` customizada e não a propriedade `emptyIcon`, você pode reproduzir o comportamento anterior com:

  ```diff
  <Rating
    icon={customIcon}
  + emptyIcon={null}
  />
  ```

- Renomeie `visuallyhidden` para `visuallyHidden` por uma questão de consistência:

  ```diff
  <Rating
    classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
    }}
  />
  ```

### RootRef

- Este componente foi removido. Você pode obter uma referência para o nó DOM subjacente dos nossos componentes através da propriedade  `ref`. The component relied on [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) which isdeprecated in `React.
<pre><code class="diff">  -<RootRef rootRef={ref}>
  -  <Button />
  -</RootRef>
  +<Button ref={ref} />
`</pre></li> </ul> 
  
  

### Seleção

- Altere a variante padrão de `standard` para `outlined`. Standard has been removed from the Material Design guidelines. If you are composing the Select with a form control component, you only need to update `FormControl`, the select inherits the variant from its context. 
  

  ```diff
  -<Select value="Standard" />
  -<Select value="Outlined" variant="outlined" />
  +<Select value="Standard" variant="standard" />
  +<Select value="Outlined" />
  ```


[This codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#variant-prop) will automatically update your code.

- Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined. The TextField already handles it by default. 
  
  

  ```diff
  -<Select variant="outlined" labelWidth={20} />
  +<Select variant="outlined" label="Gender" />
  ```


- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root. 
  
  

  ```diff
  -<Select classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<Select classes={{ select: 'class1 class2 class3' }} />
  ```




### Skeleton

- Mova o componente do lab para o core. O componente agora é estável. 
  
  

  ```diff
  -import Skeleton from '@material-ui/lab/Skeleton';
  +import Skeleton from '@material-ui/core/Skeleton';
  ```


Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

- Rename `circle` to `circular` and `rect` to `rectangular` for consistency: 
  
  

  ```diff
  -<Skeleton variant="circle" />
  -<Skeleton variant="rect" />
  -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  +<Skeleton variant="circular" />
  +<Skeleton variant="rectangular" />
  +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  ```




### Slider

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`. 
  
  

  ```diff
  -<Slider onChange={(event: React. ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
  ```


- The `ValueLabelComponent` and `ThumbComponent` prop is now part of the `components` prop. 
  
  

  ```diff
  <Slider
  -  ValueLabelComponent={CustomValueLabel}
  -  ThumbComponent={CustomThumb}
  +  components={{
  +    ValueLabel: CustomValueLabel,
  +    Thumb: CustomThumb,
  +  }}
  />
  ```


- Rework the CSS to match the latest [Material Design guidelines](https://material.io/components/sliders) and make custom styles more intuitive. [See documentation](/components/slider/). <a href="/components/slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

You can reduce the density of the slider, closer to v4 with the [`size="small"` prop](/components/slider/#sizes).



### Snackbar

- A notificação agora é exibida na parte inferior esquerda em telas grandes. This better matches the behavior of Gmail, Google Keep, material.io, etc. You can restore the previous behavior with: Você pode reproduzir o comportamento anterior com: 
  
  

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```


- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps. 
  
  

  ```diff
  <Snackbar
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```


You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.



### SpeedDial

- Mova o componente do lab para o core. O componente agora é estável. 
  
  

  ```diff
  -import SpeedDial from '@material-ui/lab/SpeedDial';
  -import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
  -import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
  +import SpeedDial from '@material-ui/core/SpeedDial';
  +import SpeedDialAction from '@material-ui/core/SpeedDialAction';
  +import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
  ```


Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.



### Assistente

- O componente raiz (Paper) foi substituído por um div. Stepper não tem mais elevação, nem herda as propriedades de Paper. Esta alteração destina-se a incentivar a composição. 
  
  

  ```diff
  -<Stepper elevation={2}>
  -  <Step>
  -    <StepLabel>Hello world</StepLabel>
  -  </Step>
  -</Stepper>
  +<Paper square elevation={2}>
  +  <Stepper>
  +    <Step>
  +      <StepLabel>Hello world</StepLabel>
  +    </Step>
  +  </Stepper>
  +<Paper>
  ```


- Remova o padding automático de 24px. 
  
  

  ```diff
  -<Stepper>
  -  <Step>
  -    <StepLabel>Hello world</StepLabel>
  -  </Step>
  -</Stepper>
  +<Stepper style={{ padding: 24 }}>
  +  <Step>
  +    <StepLabel>Hello world</StepLabel>
  +  </Step>
  +</Stepper>
  ```




### SvgIcon

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikey event that you were using the value `default`, the prop can be removed: 
  

  ```diff
  -<SvgIcon fontSize="default">
  +<SvgIcon>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
  ```




### Interruptor

- Remove the second argument from `onChange`. You can pull out the checked state by accessing `event.target.checked`. 
  
  

  ```diff
  function MySwitch() {
  - const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  + const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  +   const checked = event.target.checked;
    };

    return <Switch onChange={handleChange} />;
  }
  ```


- The switch color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the switch closer to the Material Design guidelines. 
  
  

  ```diff
  -<Switch />
  +<Switch color="secondary" />
  ```


- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead. 
  
  

  ```diff
  <span class="MuiSwitch-root">
  -   <span class="MuiIconButton-root MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  -     <span class="MuiIconButton-label">
  -       <input class="MuiSwitch-input PrivateSwitchBase-input">
  +   <span class="MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  +     <span class="MuiSwitch-input PrivateSwitchBase-input">
  ```




### Table

- A customização dos rótulos das ações da paginação da tabela deve ser feita com a propriedade `getItemAriaLabel`. Isso aumenta a consistência com o componente `Paginação`. 
  
  

  ```diff
  <TablePagination
  - backIconButtonText="Avant"
  - nextIconButtonText="Après"
  + getItemAriaLabel={…}
  ```


- Renomeie `onChangeRowsPerPage` para `onRowsPerPageChange` e `onChangePage` para `onPageChange` por questões de consistência da API. 
  
  

  ```diff
  <TablePagination
  - onChangeRowsPerPage={()=>{}}
  - onChangePage={()=>{}}
  + onRowsPerPageChange={()=>{}}
  + onPageChange={()=>{}}
  ```


- Separate classes for different table pagination labels. This allows simpler customizations. 
  
  

  ```diff
  <TablePagination
  - classes={{ caption: 'foo' }}
  + classes={{ selectLabel: 'foo', displayedRows: 'foo' }}
  />
  ```


- Move the custom class on `input` to `select`. The `input` key is being applied on another element. 
  
  

  ```diff
  <TablePagination
  - classes={{ input: 'foo' }}
  + classes={{ select: 'foo' }}
  />
  ```


- Rename the `default` value of the `padding` prop to `normal`. 
  
  

  ```diff
  -<Table padding="default" />
  -<TableCell padding="default" />
  +<Table padding="normal" />
  +<TableCell padding="normal" />
  ```




### Abas

- Change the default `indicatorColor` and `textColor` prop values to "primary". This is done to match the most common use cases with Material Design. 
  
  

  ```diff
  -<Tabs />
  +<Tabs indicatorColor="primary" textColor="inherit" />
  ```


- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`. 
  
  

  ```diff
  -<Tabs onChange={(event: React. ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
  ```


- A API que controla os botões de rolagem foi dividida em duas propriedades.
  
    - A propriedade `scrollButtons` controla quando os botões de rolagem são exibidos dependendo do espaço disponível.
  - A propriedade `allowScrollButtonsMobile` remove a consulta de mídia CSS que oculta sistematicamente os botões de rolagem no celular. 
    

  ```diff
  -<Tabs scrollButtons="on" />
  -<Tabs scrollButtons="desktop" />
  -<Tabs scrollButtons="off" />
  +<Tabs scrollButtons allowScrollButtonsMobile />
  +<Tabs scrollButtons />
  +<Tabs scrollButtons={false} />
  ```


- Tab `minWidth` changed from `72px` => `90px` (without media-query) according to [material-design spec](https://material.io/components/tabs#specs)

- Tab `maxWidth` changed from `264px` => `360px` according to [material-design spec](https://material.io/components/tabs#specs)



### TextField

- Altere a variante padrão de `standard` para `outlined`. Standard has been removed from the Material Design guidelines. 
  
  

  ```diff
  -<TextField value="Standard" />
  -<TextField value="Outlined" variant="outlined" />
  +<TextField value="Standard" variant="standard" />
  +<TextField value="Outlined" />
  ```


You can use the [`variant-prop` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#variant-prop) for automatic migration.

- Renomeie a propriedade `rowsMax` para `maxRows` por questão de consistência com atributos HTML. 
  
  

  ```diff
  -<TextField rowsMax={6}>
  +<TextField maxRows={6}>
  ```


- Melhor isolar o comportamento fixo de altura do textarea para o dinâmico. Você precisa usar a propriedade `minRows` da seguinte forma: 
  
  

  ```diff
  -<TextField rows={2} maxRows={5} />
  +<TextField minRows={2} maxRows={5} />
  ```


- Altere o que é esperado no encaminhamento de ref no componente customizado `inputComponent`. O componente deve encaminhar a propriedade `ref` em vez da propriedade `inputRef`. 
  
  

  ```diff
  -function NumberFormatCustom(props) {
  -  const { inputRef, onChange, ...other } = props;
  +const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  +  props,
  +  ref,
  +) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
  -     getInputRef={inputRef}
  +     getInputRef={ref}
  ```


- Renomeie as classes `marginDense` e `inputMarginDense` para `sizeSmall` e `inputSizeSmall` para corresponder com a propriedade. 
  
  

  ```diff
  -<Input margin="dense" />
  +<Input size="small" />
  ```


- Set the InputAdornment `position` prop to `start` or `end`. Use `start` if used as the value of the `startAdornment` prop. Use `end` if used as the value of the `endAdornment` prop. 
  
  

  ```diff
  -<TextField startAdornment={<InputAdornment>Kg</InputAdornment>} />
  -<TextField endAdornment={<InputAdornment>Kg</InputAdornment>} />
  +<TextField startAdornment={<InputAdornment position="start">Kg</InputAdornment>} />
  +<TextField endAdornment={<InputAdornment position="end">Kg</InputAdornment>} />
  ```




### TextareaAutosize

- Remova a propriedade `rows`, use `minRows` em vez disso. Esta alteração visa esclarecer o comportamento da propriedade. 
  
  

  ```diff
  -<TextareaAutosize rows={2} />
  +<TextareaAutosize minRows={2} />
  ```


- Renomeie a propriedade `rowsMax` para `maxRows` por questão de consistência com atributos HTML. 
  
  

  ```diff
  -<TextareAutosize rowsMax={6}>
  +<TextareAutosize maxRows={6}>
  ```


- Renomeie a propriedade `rowsMin` para `minRows` por questão de consistência com atributos HTML. 
  
  

  ```diff
  -<TextareAutosize rowsMin={1}>
  +<TextareAutosize minRows={1}>
  ```




### ToggleButton

- Mova o componente do lab para o core. O componente agora é estável. 
  
  

  ```diff
  -import ToggleButton from '@material-ui/lab/ToggleButton';
  -import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
  +import ToggleButton from '@material-ui/core/ToggleButton';
  +import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
  ```


Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.



### Tooltip

- Dicas agora estão interativas por padrão.
  
  O comportamento padrão anterior era falho, como mostra neste artigo, [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus). Para refletir o novo valor padrão, a propriedade foi renomeada para `disableInteractive`. Se você quiser reproduzir o comportamento antigo (portanto não chegando ao nível AA), você pode aplicar a seguinte alteração: 
  
  

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  #Dicas interativas não precisam mais da propriedade `interactive`.
  -<Tooltip interactive>
  +<Tooltip>
  ```




### Tipografia

- Remove the `srOnly` variant. You can use the `visuallyHidden` utility in conjunction with the `sx` prop instead. 
  
  

  ```diff
  +import { visuallyHidden } from '@material-ui/utils';

  -<Typography variant="srOnly">Create a user</Typography>
  +<span style={visuallyHidden}>Create a user</span>
  ```


- The following `classes` and style overrides keys were removed: "colorInherit", "colorPrimary", "colorSecondary", "colorTextPrimary", "colorTextSecondary", "colorError", "displayInline" and "displayBlock". These props are now considered part of the system, not on the `Typography` component itself. If you still wish to add overrides for them, you can use the `theme.components.MuiTypography.variants` options. For example 
  
  

  ```diff
  const theme = createTheme({
    components: {
      MuiTypography: {
  -     styleOverrides: {
  -       colorSecondary: {
  -         marginTop: '20px',
  -       },
  -     },
  +     variants: {
  +       props: { color: "secondary" },
  +       style: {
  +         marginTop: '20px',
  +       },
  +     }],
      },
    },
  });
  ```




### `@material-ui/core/styles`



#### createGenerateClassName

- The `createGenerateClassName` function is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`. 
  

  ```diff
  -import { createGenerateClassName } from '@material-ui/core/styles';
  +import { createGenerateClassName } from '@material-ui/styles';
  ```




#### jssPreset

- The `jssPreset` object is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`. 
  

  ```diff
  -import { jssPreset } from '@material-ui/core/styles';
  +import { jssPreset } from '@material-ui/styles';
  ```




#### makeStyles

- The `makeStyles` JSS utility is no longer exported from `@material-ui/core/styles`. You can use `@material-ui/styles/makeStyles` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` component from `@material-ui/core/styles` instead. 
  

  ```diff
  -import { makeStyles } from '@material-ui/core/styles';
  +import { makeStyles } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const theme = createTheme();
   const useStyles = makeStyles((theme) => ({
     background: theme.palette.primary.main,
   }));
   function Component() {
     const classes = useStyles();
     return <div className={classes.root} />
   }

   // In the root of your app
   function App(props) {
  -  return <Component />;
  +  return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
   }
  ```




#### MuiThemeProvider

- The `MuiThemeProvider` component is no longer exported from `@material-ui/core/styles`. Use `ThemeProvider` instead. 
  

  ```diff
  -import { MuiThemeProvider } from '@material-ui/core/styles';
  +import { ThemeProvider } from '@material-ui/core/styles';
  ```




#### ServerStyleSheets

- The `ServerStyleSheets` component is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`. 
  

  ```diff
  -import { ServerStyleSheets } from '@material-ui/core/styles';
  +import { ServerStyleSheets } from '@material-ui/styles';
  ```




#### styled

- The `styled` JSS utility is no longer exported from `@material-ui/core/styles`. You can use `@material-ui/styles/styled` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` component from `@material-ui/core/styles` instead. 
  

  ```diff
  -import { styled } from '@material-ui/core/styles';
  +import { styled } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const theme = createTheme();
   const MyComponent = styled('div')(({ theme }) => ({ background: theme.palette.primary.main }));

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
  ```




#### StylesProvider

- The `StylesProvider` component is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`. 
  

  ```diff
  -import { StylesProvider } from '@material-ui/core/styles';
  +import { StylesProvider } from '@material-ui/styles';
  ```




#### useThemeVariants

- The `useThemeVariants` hook is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`. 
  

  ```diff
  -import { useThemeVariants } from '@material-ui/core/styles';
  +import { useThemeVariants } from '@material-ui/styles';
  ```




#### withStyles

- Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component. 
  
  

  ```diff
  import * as React from 'react';
  import { withStyles } from '@material-ui/styles';

  const MyComponent = withStyles({
    root: {
      backgroundColor: 'red',
    },
  })(({ classes }) => <div className={classes.root} />);

  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```


- The `withStyles` JSS utility is no longer exported from `@material-ui/core/styles`. You can use `@material-ui/styles/withStyles` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@material-ui/core`, you should use the `ThemeProvider` component from `@material-ui/core/styles` instead. 
  
  

  ```diff
  -import { withStyles } from '@material-ui/core/styles';
  +import { withStyles } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const defaultTheme = createTheme();
   const MyComponent = withStyles((props) => {
     const { classes, className, ...other } = props;
     return <div className={clsx(className, classes.root)} {...other} />
   })(({ theme }) => ({ root: { background: theme.palette.primary.main }}));

   function App() {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={defaultTheme}><MyComponent /></ThemeProvider>;
   }
  ```




#### withTheme

- The `withTheme` HOC utility has been removed from the `@material-ui/core/styles` package. You can use `@material-ui/styles/withTheme` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` component from `@material-ui/core/styles` instead. 
  
  

  ```diff
  -import { withTheme } from '@material-ui/core/styles';
  +import { withTheme } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const theme = createTheme();
   const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
  ```


- Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component. 
  
  

  ```diff
  import * as React from 'react';
  import { withTheme  } from '@material-ui/core/styles';

  const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```




#### withWidth

- This HOC was removed. There's an alternative using the `useMediaQuery` hook on [this page](/components/use-media-query/#migrating-from-withwidth).



### `@material-ui/types`

- Rename the exported `Omit` type in `@material-ui/types`. The module is now called `DistributiveOmit`. The change removes the confusion with the built-in `Omit` helper introduced in TypeScript v3.5. The built-in `Omit`, while similar, is non-distributive. This leads to differences when applied to union types. [See this StackOverflow answer for further details](https://stackoverflow.com/a/57103940/1009797). 
  

  ```diff
  -import { Omit } from '@material-ui/types';
  +import { DistributiveOmit } from '@material-ui/types';
  ```




### `@material-ui/styles`



#### ThemeProvider

If you are using the utilities from `@material-ui/styles` together with the `@material-ui/core`, you should replace the use of `ThemeProvider` from `@material-ui/styles` with the one exported from `@material-ui/core/styles`. This way, the `theme` provided in the context will be available in both the styling utilities exported from `@material-ui/styles`, like `makeStyles`, `withStyles` etc. and the Material-UI components.



```diff
-import { ThemeProvider } from '@material-ui/styles';
+import { ThemeProvider } from '@material-ui/core/styles';
```




#### Default theme (TypeScript)

The `@material-ui/styles` package is no longer part of `@material-ui/core/styles`. If you are using `@material-ui/styles` together with `@material-ui/core` you need to add a module augmentation for the `DefaultTheme`.



```ts
import { Theme } from '@material-ui/core/styles';

declare module '@material-ui/styles' {
  interface DefaultTheme extends Theme {}
}
```
