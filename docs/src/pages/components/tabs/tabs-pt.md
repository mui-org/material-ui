---
title: Componente React Abas
components: Tabs, Tab, TabScrollButton, TabContext, TabList, TabPanel
githubLabel: 'component: Tabs'
materialDesign: https://material.io/components/tabs
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tabpanel'
---

# Abas

<p class="description">As abas facilitam a exploração e alternam entre diferentes visualizações.</p>

As [abas](https://material.io/design/components/tabs.html) organizam e permitem a navegação entre grupos de conteúdo relacionados e no mesmo nível hierárquico.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Abas simples

A basic example with tab panels.

{{"demo": "pages/components/tabs/BasicTabs.js"}}

## API experimental

O `@material-ui/lab` oferece componentes auxiliares que injetam propriedades para implementar abas acessíveis seguindo as [práticas de autoria da WAI-ARIA](https://www.w3.org/TR/wai-aria-practices/#tabpanel).

{{"demo": "pages/components/tabs/LabTabs.js"}}

## Rótulos com quebras

Os rótulos longos serão quebrados automaticamente nas abas. If the label is too long for the tab, it will overflow, and the text will not be visible.

{{"demo": "pages/components/tabs/TabsWrappedLabel.js"}}

## Colored tab

{{"demo": "pages/components/tabs/ColorTabs.js"}}

## Aba desativada

A tab can be disabled by setting the `disabled` prop.

{{"demo": "pages/components/tabs/DisabledTabs.js"}}

## Abas fixas

Fixed tabs should be used with a limited number of tabs, and when a consistent placement will aid muscle memory.

### Largura total

A propriedade `variant="fullWidth"` deve ser usada em telas menores. Esta demo também usa [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) para animar a transição das abas e permite que estas sejam trocadas em dispositivos que permitem o toque.

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### Centralizado

A propriedade `centered` deve ser usada para telas maiores.

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## Abas roláveis

### Botões de rolagem automáticos

Botões de rolagem para a esquerda e para a direita serão automaticamente apresentados em visualizações desktop e ocultos em móveis. (com base na largura da janela de visualização)

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### Botões de rolagem forçados

Botões de rolagem esquerda e direita são apresentados (espaço reserva) independente da largura de exibição com `scrollButtons={true}` `allowScrollButtonsMobile`:

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

Se você quiser certificar-se de que os botões são sempre visíveis, você deve customizar a opacidade.

```css
.MuiTabs-scrollButtons.Mui-disabled {
  opacity: 0.3;
}
```

{{"demo": "pages/components/tabs/ScrollableTabsButtonVisible.js", "bg": true}}

### Impedir botões de rolagem

Botões de rolagem da esquerda e direita nunca serão apresentados com `scrollButtons={false}`. All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift mouse wheel, etc.)

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## Abas customizadas

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/tabs/CustomizedTabs.js"}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/tabs/).

## Abas verticais

O rótulo das abas podem ser compostos apenas por ícones ou apenas por texto.

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

Note que você pode restaurar a barra de rolagem com `visibleScrollbar`.

## Nav tabs

By default, tabs use a `button` element, but you can provide your custom tag or component. Veja um exemplo de implementação da navegação por abas:

{{"demo": "pages/components/tabs/NavTabs.js"}}

## Icon tabs

O rótulo das abas podem ser compostos apenas por ícones ou apenas por texto.

{{"demo": "pages/components/tabs/IconTabs.js"}}

{{"demo": "pages/components/tabs/IconLabelTabs.js"}}

## Biblioteca de roteamento de terceiros

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `Tab` component provides the `component` prop to handle this use case. Here is a [more detailed guide](/guides/routing/#tabs).

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tabpanel)

As etapas a seguir são necessárias para fornecer a informação coerente para as tecnologias assistivas:

1. Rotule o componente `Tabs` com `aria-label` ou `aria-labelledby`.
2. Para os componentes `Tab`, precisam estar conectados com seu correspondente `[role="tabpanel"]` definindo o correto `id`, `aria-controls` e `aria-labelledby`.

Um exemplo para a implementação atual pode ser encontrado nas demonstrações desta página. Nós também publicamos [uma API experimental](#experimental-api) no pacote `@material-ui/lab` que não requer nenhum trabalho extra.

### Navegação por teclado

Os componentes implementam a navegação do teclado usando o comportamento de "ativação manual". Se você quiser mudar para o comportamento "seleção segue automaticamente o foco" você deve definir `selectionFollowsFocus` no componente `Tabs`. As práticas de autoria da WAI-ARIA têm um guia detalhado sobre [como decidir quando fazer a seleção seguir automaticamente o foco](https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus).

#### Demonstração

As duas demonstrações seguintes diferem apenas no seu comportamento de navegação por teclado. Focus a tab and navigate with arrow keys to notice the difference, e.g. <kbd class="key">Arrow Left</kbd>.

```jsx
/* Tabs where selection follows focus */
<Tabs selectionFollowsFocus />
```

{{"demo": "pages/components/tabs/AccessibleTabs1.js", "defaultCodeOpen": false}}

```jsx
/* Tabs where each tab needs to be selected manually */
<Tabs />
```

{{"demo": "pages/components/tabs/AccessibleTabs2.js", "defaultCodeOpen": false}}
