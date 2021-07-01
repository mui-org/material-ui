---
title: Componente React para emblemas
components: Badge, BadgeUnstyled
githubLabel: 'component: Badge'
---

# Emblema

<p class="description">O componente <code>Badge</code> gera um pequeno emblema no canto superior direito de seu(s) filho(s).</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Emblemas básicos

Exemplos de emblemas contendo texto, usando cores primárias e secundárias. O emblema é aplicado aos seus filhos.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Emblemas customizados

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Visibilidade do emblema

A visibilidade dos emblemas pode ser controlada usando a propriedade `invisible`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

O emblema se esconde automaticamente quando o badgeContent é zero. Você pode sobrescrever isso com a propriedade `showZero`.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Valor máximo

Você pode usar a propriedade `max` para limitar o valor do conteúdo do emblema.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Emblema como ponto

A propriedade `dot` altera um emblema para um pequeno ponto. Isto pode ser usado como uma notificação de que algo mudou sem fornecer uma contagem.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Alinhamento do emblema

Você pode usar a propriedade `overlap` para colocar o emblema em relação ao canto do elemento envolvido.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Alinhamento do emblema

Você pode usar a propriedade `anchorOrigin` para mover o emblema para qualquer canto do elemento envolvido.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideToolbar": true}}

## Unstyled

The badge also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import BadgeUnstyled from '@material-ui/unstyled/BadgeUnstyled';
```

{{"demo": "pages/components/badges/UnstyledBadge.js"}}

## Acessibilidade

You can't rely on the content of the badge to be announced correctly. You should provide a full description, for instance, with `aria-label`:

{{"demo": "pages/components/badges/AccessibleBadges.js"}}
