---
title: Componente React para Botões de Alternância
components: ToggleButton, ToggleButtonGroup
githubLabel: 'component: ToggleButton'
materialDesign: 'https://material.io/components/buttons#toggle-button'
---

# Botões de alternância

<p class="description">Os botões de alternância podem ser usados para agrupar opções relacionadas.</p>

Para enfatizar grupos de [botões de alternância](https://material.io/components/buttons#toggle-button) relacionados, o grupo deve ter um container em comum. O `ToggleButtonGroup` controla o estado selecionado de seus botões filhos através de sua propriedade `value`.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Seleção exclusiva

Com seleção exclusiva, selecionar uma opção desseleciona qualquer outra.

In this example, text justification toggle buttons present options for left, center, right, and fully justified text (disabled), with only one item available for selection at a time.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Seleção múltipla

Múltipla seleção permite que opções logicamente agrupadas, como negrito, itálico e sublinhado, tenham várias opções selecionadas.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## Tamanho

For larger or smaller buttons, use the `size` prop.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Cor

{{"demo": "pages/components/toggle-button/ColorToggleButton.js"}}

## Botões verticais

Os botões podem ser empilhados verticalmente com a propriedade `orientation` definida para "vertical".

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## Forçar valor definido

Se você deseja forçar que pelo menos um botão esteja ativo, você pode adaptar sua função handleChange.

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## Botão de alternância autônomo

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Botão de alternância customizado

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Acessibilidade

### ARIA

- ToggleButtonGroup possui `role="group"`. Você deve fornecer um rótulo acessível com `aria-label="label"`, `aria-labelledby="id"` ou `<label>`.
- ToggleButton define `aria-pressed="<bool>"` de acordo com o estado do botão. Você deve rotular cada botão com `aria-label`.

### Teclado

Até o momento, os botões de alternância estão na ordem DOM. Navegue entre eles com a tecla tab. O comportamento dos botões segue a semântica padrão do teclado.
