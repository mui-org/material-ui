---
productId: material-ui
title: React Portal component
components: Portal
githubLabel: 'scope: portal'
---

# Portal

<p class="description">The Portal component lets you render its children into a DOM node that exists outside of the Portal's own DOM hierarchy.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

## Introduction

Portal is a utility component built around [React's `createPortal()` API](https://react.dev/reference/react-dom/createPortal).
It gives you the functionality of `createPortal()` in a convenient component form.
It's used internally by the [Modal](/material-ui/react-modal/) and [Popper](/material-ui/react-popper/) components.

:::info
According to [the React docs](https://react.dev/reference/react-dom/createPortal), portals are useful when "you need the child element to visually 'break out' of its container"—for instance, modals and tooltips, which need to exist outside of the normal flow of the document.
:::

Normally, children of a component are rendered within that component's DOM tree.
But sometimes it's necessary to mount a child at a different location in the DOM.
The Portal component accepts a `container` prop that passes a `ref` to the DOM node where its children will be mounted.

The following demo shows how a `<span>` nested within a Portal can be appended to a node outside of the Portal's DOM hierarchy—click **Mount children** to see how it behaves:

{{"component": "file://./demos/simple/index.ts"}}

## Basics

### Import

```jsx
import Portal from '@mui/material/Portal';
```

## Customization

### Server-side Portals

The DOM API isn't available on the server, so you need to use the `container` prop callback.
This callback is called during a React layout effect:

```jsx
<Portal container={() => document.getElementById('filter-panel')!}>
  <Child />
</Portal>
```

:::error
The Portal component cannot be used to render child elements on the server—client-side hydration is necessary.
This is because React doesn't support the [`createPortal()` API](https://react.dev/reference/react-dom/createPortal) on the server.
See [this GitHub issue](https://github.com/react/react/issues/13097) for details.
:::
