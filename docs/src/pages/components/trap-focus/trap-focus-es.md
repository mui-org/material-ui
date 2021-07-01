---
title: Trap Focus React component
components: Unstable_TrapFocus
githubLabel: 'component: TrapFocus'
---

# Trap Focus

<p class="description">Trap focus within a DOM node.</p>

TrapFocus is a component that manages focus for its descendants. This is useful when implementing overlays such as modal dialogs, which should not allow the focus to escape while open.

When `open={true}` the trap is enabled, and pressing <kbd class="key">Tab</kbd> or <kbd><kbd  class="key">Shift</kbd>+<kbd class="key">Tab</kbd></kbd> will rotate focus within the inner focusable elements of the component.

[La función de estilo de la paleta](/system/palette/).

> ⚠️ The component is experimental and unstable.

## Ejemplo

{{"demo": "pages/components/trap-focus/BasicTrapFocus.js"}}

## Unstyled

- 📦 [2.0 kB comprimido](https://bundlephobia.com/result?p=@material-ui/unstyled@next)

As the component does not have any styles, it also comes with the unstyled package.

```js
import TrapFocus from '@material-ui/unstyled/Unstable_TrapFocus';
```

## Disable enforce focus

Clicks within the focus trap behave normally, but clicks outside the focus trap are blocked.

You can disable this behavior with the `disableEnforceFocus` prop.

{{"demo": "pages/components/trap-focus/DisableEnforceFocus.js"}}

## Lazy activation

By default, the component moves the focus to its descendants as soon as it opens: `open={true}`.

You can disable this behavior and make it lazy with the `disableAutoFocus` prop. When auto focus is disabled, as in the demo below, the component only traps the focus once it gets focused.

{{"demo": "pages/components/trap-focus/LazyTrapFocus.js"}}

## Portal

The following demo uses the [`Portal`](/components/portal/) component to render a subset of the trap focus children into a new "subtree" outside of the current DOM hierarchy; so that they no longer form part of the focus loop.

{{"demo": "pages/components/trap-focus/PortalTrapFocus.js"}}
