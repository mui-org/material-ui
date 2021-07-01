---
title: Componente React para Botão
components: Button, IconButton, ButtonBase
materialDesign: https://material.io/components/buttons
githubLabel: 'component: Button'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#button'
---

# Button

<p class="description">Botões permitem que os usuários tomem ações e decisões com um simples toque.</p>

[Botões](https://material.io/design/components/buttons.html) comunicam ações que os usuários podem realizar. Eles são normalmente colocados em toda a interface do usuário, em lugares como:

- Caixa de diálogo
- Janelas modais
- Formulários
- Cartões
- Barras de ferramentas

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic Button

The `Button` comes with three variants: text (default), contained, and outlined.

{{"demo": "pages/components/buttons/BasicButtons.js"}}

### Botões de texto

[Text buttons](https://material.io/components/buttons#text-button) are typically used for less-pronounced actions, including those located: in dialogs, in cards. Em cartões, os botões de texto ajudam a manter a ênfase no conteúdo do cartão.

{{"demo": "pages/components/buttons/TextButtons.js"}}

### Botões contidos

[Botões Contidos](https://material.io/design/components/buttons.html#contained-button) tem alta ênfase, distinguem-se pelo uso de elevação e preenchimento. Eles contém as principais ações da sua aplicação.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

Você pode remover a elevação com a propriedade `disableElevation`.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

### Botões delineados

[Outlined buttons](https://material.io/components/buttons#outlined-button) are medium-emphasis buttons. They contain actions that are important but aren't the primary action in an app.

Botões delineados são uma alternativa de menor ênfase comparado com botões contidos, ou uma uma alternativa de maior ênfase comparado com botões de texto.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Manipulando cliques

Todos os componentes aceitam um método manipulador `onClick` que é aplicado ao elemento DOM raiz.

```jsx
<Button onClick={() => { alert('clicado') }}>Clique aqui</Button>
```

Note que a documentação [evita](/guides/api/#native-properties) mencionar as propriedades nativas (existem várias) na seção de API dos componentes.

## Cor

{{"demo": "pages/components/buttons/ColorButtons.js"}}

In addition to using the default button colors, you can add custom ones, or disable any you don't need. See the [Adding new colors](/customization/palette/#adding-new-colors) example for more info.

## Tamanhos

For larger or smaller buttons, use the `size` prop.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Botão de upload

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Botões com ícones e rótulo

Às vezes você pode querer ter ícones para certos botões para aprimorar a experiência do usuário, pois reconhecem logotipos mais facilmente do que texto. Por exemplo, se você tem um botão com a ação de "deletar", você pode rotulá-lo com o ícone de lata de lixo.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Ícone do botão

Botões de ícones são comumente encontrados em barras de aplicativos e barras de ferramentas.

Ícones são também adequados para botões de alternância que permitem uma escolha única para ser selecionado ou desmarcado, como adicionar ou remover uma estrela para um item.

{{"demo": "pages/components/buttons/IconButtons.js"}}

### Tamanhos

For larger or smaller icon buttons, use the `size` prop.

{{"demo": "pages/components/buttons/IconButtonSizes.js"}}

## Botões customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/button).

## Botões de progresso

The loading buttons can show loading state and disable interactions.

{{"demo": "pages/components/buttons/LoadingButtons.js"}}

Aqui está um [exemplo de integração com react-router](/guides/composition/#button).

O componente ButtonBase define `pointer-events: none;` ao desabilitar os botões, o que previne que o cursor desabilitado seja exibido.

## Botões complexos

Os botões de texto, botões contidos, botões de ação flutuante e botões de ícone são construídos com base no mesmo componente: O componente `ButtonBase`. Você pode usar esse componente para construir interações diferentes.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Biblioteca de roteamento de terceiros

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. Um caso de uso comum é usar o botão para acionar uma navegação para uma nova página. Here is a [more detailed guide](/guides/routing/#button).

## Limitações

### Propriedade CSS Cursor not-allowed

O componente ButtonBase define `pointer-events: none;` ao desabilitar os botões, o que previne que o cursor desabilitado seja exibido.

Se você deseja usar `not-allowed`, você tem duas opções:

1. **Apenas com CSS**. You can remove the pointer-events style on the disabled state of the `<button>` element:

```css
<span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
```

Então:

- Você deve adicionar `pointer-events: none;` de volta quando você precisar exibir [dicas em elementos desabilitados](/components/tooltips/#disabled-elements).
- O cursor não irá mudar se você renderizar algum outro elemento que não seja um botão, por exemplo, um elemento link `<a>`.

2. **Alteração no DOM**. Você pode encapsular o botão:

```jsx
<span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
```

Isso tem a vantagem de suportar qualquer elemento, por exemplo, um elemento de link `<a>`.
