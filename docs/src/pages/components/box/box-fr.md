---
title: Composant React Box
githubLabel: 'component: Box'
---

# Box (Boite)

<p class="description">Le composant Box sert de composant de wrapper pour la plupart des besoins de l'utilitaire CSS.</p>

Le composant Box contiens [toutes les fonctions de style](/system/basics/#all-inclusive) qui sont exposées dans `@material-ui/system`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Exemple

[La palette](/system/palette/) de style fonction.

## The `sx` prop

All system properties are available via the `sx` prop. In addition, this prop allows you to specify any other CSS rules you may need.  Voici un exemple de la façon dont vous pouvez l'utiliser :

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Remplacer les composants Material-UI

Le composant Box enveloppe votre composant. Il crée un nouvel élément DOM, un `<div>` par défaut qui peut être modifié avec la propriété `component`. Disons que vous voulez utiliser un `<span>` à la place :

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

Cela fonctionne très bien quand les changements peuvent être isolés dans un nouvel élément DOM. Par exemple, vous pouvez changer la marge de cette façon.

Cependant, vous devez parfois cibler l'élément DOM sous-jacent. For instance, you want to change the border of the Button. Le composant Button définit ses propres styles. L'héritage CSS n'aide pas. To workaround the problem, you can use the [`sx`](/system/basics/#the-sx-prop) prop directly on the child if it is a Material-UI component.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>Save</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Save</Button>
```

The Box component has a `clone` property to enable the usage of the clone element method of React.

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

| Nom                                            | Type                                                                                                                          | Défaut                                  | Description                                                                                                            |
|:---------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:---------------------------------------------------------------------------------------------------------------------- |
| <span class="prop-name">children&nbsp;*</span> | <span class="prop-type">node<br></span>                                                                                 |                                         | Fonction de rendu ou noeud de la boîte.                                                                                |
| <span class="prop-name">component</span>       | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | Le composant utilisé pour le noeud racine. Soit une chaîne de caractères pour utiliser un élément DOM ou un composant. |
| <span class="prop-name">sx</span>              | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Accepte toutes les propriétés du système, ainsi que toutes les propriétés CSS valides.                                 |

## System props

As a CSS utility component, the `Box` also supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Box mt={2}>
```
