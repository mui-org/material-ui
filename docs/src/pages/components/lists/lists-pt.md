---
title: Componente React Lista
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: List'
materialDesign: https://material.io/components/lists
---

# Listas

<p class="description">Listas são continuas, apresentam verticalmente texto ou imagens.</p>

[Listas](https://material.io/design/components/lists.html) são um grupo contínuo de texto ou imagens. Elas são compostas por itens contendo ações primárias e complementares, que são representados por ícones e texto.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic List

{{"demo": "pages/components/lists/BasicList.js", "bg": true}}

O último item da demonstração anterior mostra como você pode renderizar um link:

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/guides/routing/#list) of the documentation.

## Lista Aninhada

{{"demo": "pages/components/lists/NestedList.js", "bg": true}}

## Lista de Pastas

{{"demo": "pages/components/lists/FolderList.js", "bg": true}}

## Interativo

Abaixo está uma demonstração interativa que permite explorar os resultados visuais das diferentes configurações:

{{"demo": "pages/components/lists/InteractiveList.js", "bg": true}}

## Lista com item selecionado

{{"demo": "pages/components/lists/SelectedListItem.js", "bg": true}}

## Alinhar itens da lista

Você deve alterar o alinhamento do item da lista ao exibir 3 linhas ou mais, alterando a propriedade `alignItems = "flex-start"`.

{{"demo": "pages/components/lists/AlignItemsList.js", "bg": true}}

## Controles de Lista

### Caixa de seleção

Uma caixa de seleção pode ser uma ação primária ou uma ação secundária.

A caixa de seleção é a ação principal e o indicador de estado para o item da lista. O botão de comentário é uma ação secundária e um destino separado.

{{"demo": "pages/components/lists/CheckboxList.js", "bg": true}}

A caixa de seleção é uma ação secundária, sem interferir com o estado do item da lista.

{{"demo": "pages/components/lists/CheckboxListSecondary.js", "bg": true}}

### Interruptor

O interruptor é uma ação secundária, sem interferir com o estado do item da lista.

{{"demo": "pages/components/lists/SwitchListSecondary.js", "bg": true}}

## Sticky subheader

Após a rolagem, os subtítulos permanecem fixos na parte superior da tela até serem empurrados para fora da área de visualização pelo próximo subtítulo. Esse recurso depende do posicionamento fixo do CSS. (⚠️ no IE 11 support)

{{"demo": "pages/components/lists/PinnedSubheaderList.js", "bg": true}}

## Item de lista encaixado

The `inset` prop enables a list item that does not have a leading icon or avatar to align correctly with items that do.

{{"demo": "pages/components/lists/InsetList.js", "bg": true}}

## Lista sem espaçamentos

When rendering a list within a component that defines its own gutters, `ListItem` gutters can be disabled with `disableGutters`.

{{"demo": "pages/components/lists/GutterlessList.js", "bg": true}}

## Lista virtualizada

No exemplo a seguir, nós demonstramos como usar a biblioteca [react-window](https://github.com/bvaughn/react-window) com o componente `List`. Ela renderiza 200 linhas e pode facilmente lidar com mais. A virtualização ajuda a lidar com problemas de desempenho.

{{"demo": "pages/components/lists/VirtualizedList.js", "bg": true}}

O uso da biblioteca [react-window](https://github.com/bvaughn/react-window), quando possível, é recomendado. Se no seu caso esta biblioteca não resolver, você deve considerar o uso de [react-virtualized](https://github.com/bvaughn/react-virtualized), e em seguida, como alternativa [react-virtuoso](https://github.com/petyosi/react-virtuoso).

## Customized List

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/lists/CustomizedList.js"}}

## Customização

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/list-item).
