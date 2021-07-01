---
title: Componente React Avaliação
components: Rating
githubLabel: 'component: Rating'
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
---

# Avaliação

<p class="description">Avaliações fornecem informações sobre as opiniões e experiências dos outros e permitem que o usuário envie sua própria avaliação.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Avaliação básica

{{"demo": "pages/components/rating/BasicRating.js"}}

## Avaliação precisa

A avaliação pode exibir qualquer número flutuante com a propriedade `value`. Use a propriedade `precision` para definir a alteração mínima do valor de incremento permitida.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Feedback ao passar o mouse

Você pode exibir um rótulo ao passar o mouse para ajudar os usuários a escolher o valor de avaliação correto. A demonstração usa a propriedade `onChangeActive`.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Tamanhos

Para avaliações maiores ou menores use a propriedade `size`.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Avaliação customizada

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/rating/CustomizedRating.js"}}

## Radio group

The rating is implemented with a radio group, set `highlightSelectedOnly` to restore the natural behavior.

{{"demo": "pages/components/rating/RadioGroupRating.js"}}

## Acessibilidade

([WAI tutorial](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

A acessibilidade neste componente conta com:

- Um grupo de botões de opção com seus campos visualmente ocultos. Ele contém seis botões de opção, um para cada estrela e outro para 0 estrelas, que é marcado por padrão. Certifique-se de fornecer um valor para a propriedade `name` que é exclusivo para o formulário pai.
- Rótulos para os botões de opção que contém o texto atual (“1 Estrela”, “2 Estrelas”, …). Certifique-se de fornecer uma função adequada para a propriedade `getLabelText` quando a página estiver em um idioma diferente de inglês. Você pode usar as [localidades incluídas](https://material-ui.com/guides/localization/), ou fornecer suas próprias.
- Uma aparência visualmente distinta para os ícones de avaliação. Por padrão, o componente de avaliação usa uma diferença de cor e forma (ícones preenchidos e vazios) para indicar o valor. No caso de você usar cor como a única forma de indicar o valor, a informação também deve ser apresentada como texto, como nesta demonstração. Isto é importante para corresponder a [success Criterion 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) do WCAG2.1.

{{"demo": "pages/components/rating/TextRating.js"}}

### ARIA

A avaliação de somente leitura tem uma regra de "img" e um aria-label que descreve a avaliação exibida.

### Teclado

Devido ao componente avaliação usar botões de opção, a interação do teclado segue o comportamento nativo do navegador. A tecla tab irá focar a avaliação atual e as teclas do cursor controlam a avaliação selecionada.

A avaliação de somente leitura não é focável.
