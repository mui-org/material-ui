---
title: Componente React para Cartão
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'component: Card'
materialDesign: https://material.io/components/cards
---

# Cartão

<p class="description">Cartões contêm conteúdo e ações sobre um único assunto.</p>

[Cartões](https://material.io/design/components/cards.html) são componentes que exibem conteúdo e ações em um único tópico.

Eles devem ser relevantes, de fácil verificação e apresentar informações úteis. Elementos, como texto e imagens, deve ser colocado sobre eles de uma forma que indica claramente a hierarquia.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic card

Apesar dos componentes cartões poderem suportar múltiplas ações tais como: controles de UI, e overflow de menu, use-os com moderação e lembre-se que cartões são pontos de entrada de informações mais complexas e detalhadas.

{{"demo": "pages/components/cards/BasicCard.js", "bg": true}}

### Cartão Delineado

Defina `variant="outlined"` para renderizar um cartão delineado.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## Interação Complexa

O conteúdo do cartão pode ser expandido. (Clique no gerador abaixo para ver detalhes.)

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Mídia

Exemplo de um cartão usando uma imagem para reforçar o conteúdo.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

Por padrão, nós usamos uma combinação de um elemento `&lt;div&gt;` e um *background image* para exibir o componente media. Isto pode ser problemático em algumas situações. Por exemplo, você pode querer exibir um vídeo ou uma imagem responsiva. Use a propriedade `component` para estes casos de uso:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ Quando `component="img"`, CardMedia depende de `object-fit` para centralizar a imagem. Não é suportado pelo IE11.

## Ação primária

Muitas vezes um cartão permite que os usuários interajam com toda sua superfície para acionar sua ação principal, seja uma expansão, um link para outra tela ou algum outro comportamento. A área de ação do cartão pode ser especificada envolvendo seu conteúdo em um componente `CardActionArea`.

{{"demo": "pages/components/cards/ActionAreaCard.js", "bg": true}}

Um cartão também pode oferecer ações suplementares que devem ser desvinculadas da área de ação principal, a fim de evitar sobreposições de eventos.

{{"demo": "pages/components/cards/MultiActionAreaCard.js", "bg": true}}

## Controles da interface do usuário

Ações suplementares dentro do cartão são explicitamente chamadas usando ícones, texto e controles de interface do usuário, normalmente colocados na parte inferior do cartão.

Aqui está um exemplo de um controle de mídia com cartão.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}

## Customização

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/components/card).
