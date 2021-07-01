# Sobre o lab

<p class="description">Este pacote hospeda os componentes da incubadora que ainda não estão prontos para mover para o core.</p>

A principal diferença entre o lab e o core (núcleo) é como os componentes são versionados. Tendo um pacote separado para o lab, podemos liberar alterações críticas quando necessário, enquanto o pacote do core segue uma [política de liberação mais lenta](https://material-ui.com/versions/#release-frequency).

À medida que os desenvolvedores usam, testam os componentes e relatam problemas, os mantenedores aprendem mais sobre as deficiências dos componentes: recursos ausentes, problemas de acessibilidade, bugs, design de API, etc. Quanto mais antigo e mais usado for um componente, menor é a probabilidade de novos problemas serem encontrados e, consequentemente, necessidades de alterações críticas serem feitas.

Para que um componente esteja pronto para ir para o core, são considerados os seguintes critérios:

- Ele precisa ser **utilizado**. The Material-UI team uses Google Analytics in the documentation (among other metrics) to evaluate the usage of each component. A lab component with low usage either means that it isn't fully working yet, or that there is low demand for it.
- Ele precisa atender critérios de **qualidade de código**, semelhante aos componentes do core. It doesn't have to be perfect to be part of the core, but the component should be reliable enough that developers can depend on it.
  - Cada componente precisa de **definições de tipo**. Atualmente, não é necessário que um componente do lab seja tipado, mas ele precisará ser tipado para passar para o core.
  - Requer boa **cobertura de teste**. Atualmente, alguns dos componentes do lab não têm testes abrangentes.
- O componente pode ser usado como **alavancagem** para incentivar os usuários a atualizar para a versão mais recente? Quanto menos fragmentada a comunidade, melhor.
- Ele precisa ter uma baixa probabilidade de **alterações críticas** no curto/médio prazo. Por exemplo, se o componente precisar de um novo recurso que provavelmente precisará de alterações críticas, pode ser preferível adiar sua promoção para o core.

## Instalação

Instale o pacote no diretório do seu projeto com:

```sh
// usando npm
npm install @material-ui/lab

// usando yarn
yarn add @material-ui/lab
```

O lab tem dependências com os componentes do core. Se você ainda não está utilizando o Material-UI em seu projeto, poderá instalá-lo com:

```sh
// usando npm
npm install @material-ui/core

// usando yarn
yarn add @material-ui/core
```

## TypeScript

Para se beneficiar de [CSS overrides](/customization/theme-components/#global-style-overrides) e [customização de propriedades padrão](/customization/theme-components/#default-props) com o tema, usuários de TypeScript precisam importar os seguintes tipos. Internamente, ele usa [ampliação de módulos](/guides/typescript/#customization-of-theme) para estender a estrutura padrão do tema com os componentes de extensão disponíveis no lab.

```tsx
import '@material-ui/lab/themeAugmentation';

const theme = createTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});
```
