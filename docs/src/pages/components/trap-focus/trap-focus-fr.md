---
title: Trap Focus React component
components: Unstable_TrapFocus
githubLabel: 'component: TrapFocus'
---

# Trap Focus

<p class="description">Piéger le focus dans un nœud DOM.</p>

TrapFocus est un composant qui gère le focus pour ses descendants. Ceci est utile lors de l'implémentation de superpositions telles que les dialogues modaux, qui ne devraient pas permettre au focus d'échapper pendant l'ouverture.

Lorsque `open={true}` le piège est activé, et en appuyant sur <kbd class="key">Tab</kbd> ou <kbd><kbd  class="key">Maj</kbd>+<kbd class="key">Tab</kbd></kbd> fera pivoter le focus à l'intérieur des éléments internes du composant.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

> ⚠️ Le composant est expérimental et instable.

## Exemple

{{"demo": "pages/components/trap-focus/BasicTrapFocus.js"}}

## Unstyled

- 📦 [1,5 ko gzippé](https://material-ui.com/size-snapshot).

As the component does not have any styles, it also comes with the unstyled package.

```js
import TrapFocus from '@material-ui/unstyled/Unstable_TrapFocus';
```

## Désactiver le focus imposé

Clicks within the focus trap behave normally, but clicks outside the focus trap are blocked.

Vous pouvez désactiver ce comportement avec la propriété `disableEnforceFocus`.

{{"demo": "pages/components/trap-focus/DisableEnforceFocus.js"}}

## Activation paresseuse (lazy)

Par défaut, la composante déplace le focus vers ses descendants dès qu'elle s'ouvre : `open={true}`.

Vous pouvez désactiver ce comportement et le rendre paresseux avec la propriété `disableAutoFocus`. Lorsque la mise au point automatique est désactivée, comme dans la démo ci-dessous, le composant ne piège le focus qu'une fois qu'il est mis au point.

{{"demo": "pages/components/trap-focus/LazyTrapFocus.js"}}

## Portal

The following demo uses the [`Portal`](/components/portal/) component to render a subset of the trap focus children into a new "subtree" outside of the current DOM hierarchy, so that they no longer form part of the focus loop.

{{"demo": "pages/components/trap-focus/PortalTrapFocus.js"}}
