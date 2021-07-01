---
title: Componente React Divisor
components: Divider
githubLabel: 'component: Divider'
materialDesign: https://material.io/components/dividers
---

# Divisor

<p class="description">Um divisor é uma linha fina que agrupa conteúdo em listas e leiautes.</p>

[Divisores](https://material.io/design/components/dividers.html) separam grupos de conteúdos.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Divisores de lista

O divisor renderiza como um `<hr>` por padrão. Você pode salvar a renderização desse elemento DOM usando a propriedade `divider` no componente `ListItem`.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Especificação HTML5

Em uma lista, você deve garantir que o `Divider` seja renderizado como um elemento `<li>` para corresponder à especificação HTML5. Os exemplos abaixo mostram duas maneiras de conseguir isso.

## Divisores de inserção

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Divisores de subtítulo

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Divisores médios

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Divisores com texto

Você também pode renderizar um divisor com conteúdo.

{{"demo": "pages/components/dividers/DividerText.js"}}

## Divisor vertical

Você pode renderizar um divisor vertical usando a propriedade `orientation`.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}

> Observe o uso da propriedade `flexItem` para acomodar em um contêiner flexível.

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "pages/components/dividers/VerticalDividerMiddle.js", "bg": true}}

### Vertical com texto

Você também pode renderizar um divisor vertical com conteúdo.

{{"demo": "pages/components/dividers/VerticalDividerText.js"}}
