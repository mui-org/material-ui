---
title: React Box component
githubLabel: 'component: Box'
---

# Box

<p class="description">Die Box-Komponente dient als Wrapper-Komponente für die meisten Anforderungen des CSS-Dienstprogramms.</p>

Die Box-Komponente kombiniert [alle Stilfunktionen](/system/basics/#all-inclusive), die in `@material-ui/system` verfügbar sind.

Die Style-Funktion der [Palette](/system/palette/).

## Beispiel

Die Style-Funktion der [Palette](/system/palette/).

## The `sx` prop

All system properties are available via the [`sx` prop](/system/basics/#the-sx-prop). In addition, the `sx` prop allows you to specify any other CSS rules you may need. Here's an example of how you can use it:

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Material-UI-Komponenten überschreiben

Die Box-Komponente umschließt Ihre Komponente. It creates a new DOM element, a `<div>` by default that can be changed with the `component` prop. Angenommen, stattdessen soll ein `<span>`-Element verwendet werden:

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

Dies funktioniert hervorragend, wenn die Änderungen für ein neues DOM-Element isoliert werden können. Zum Beispiel kann der Rand auf diese Weise verändert werden.

Manchmal müssen Sie jedoch das zugrunde liegende DOM-Element als Ziel festlegen. As an example, you may want to change the border of the Button. The Button component defines its own styles. CSS-Vererbung hilft hier nicht. To workaround the problem, you can use the [`sx`](/system/basics/#the-sx-prop) prop directly on the child if it is a Material-UI component.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>Save</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Save</Button>
```

For non-Material-UI components, use the `component` prop.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <button>Save</button>
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
```

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Name                                     | Typ                                                                                                                           | Standard                                | Beschreibung                                                                                                               |
|:---------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:-------------------------------------------------------------------------------------------------------------------------- |
| <span class="prop-name">children</span>  | <span class="prop-type">node<br></span>                                                                                 |                                         | Box Render-Funktion oder Knoten.                                                                                           |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | Die für den Wurzelknoten verwendete Komponente. Entweder ein String, um ein DOM-Element zu verwenden oder eine Komponente. |
| <span class="prop-name">sx</span>        | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Accepts all system properties, as well as any valid CSS properties.                                                        |

## System props

As a CSS utility component, the `Box` also supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Box mt={2}>
```
