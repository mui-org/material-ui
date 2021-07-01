---
title: Компонент React Box
githubLabel: 'component: Box'
---

# Box

<p class="description">Box компонент используется как обертка компонента для большинства используемых CSS свойств.</p>

The Box component packages [all the style functions](/system/basics/#all-inclusive) that are exposed in `@material-ui/system`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Пример

[The palette](/system/palette/) style function.

## The `sx` prop

All system properties are available via the [`sx` prop](/system/basics/#the-sx-prop). In addition, the `sx` prop allows you to specify any other CSS rules you may need. Вот пример того, как вы можете использовать его:

{{"demo": "pages/system/box/BoxSx.js", "defaultCodeOpen": true }}

## Переопределение Material-UI компонентов

Box компонент оборачивает ваш компонент. Он создает новый DOM элемент: `<div>` по умолчанию, который можно изменить свойством `component`. Например если вы хотите использовать`<span>` взамен:

{{"demo": "pages/system/box/BoxComponent.js", "defaultCodeOpen": true }}

Это работает превосходно когда изменения могут быть изолированы в новый DOM элемент. Для сущности, вы можете изменить margin(внешний отступ) таким образом.

Тем не менее, иногда вам нужно ориентироваться на базовый элемент DOM. As an example, you may want to change the border of the Button. Этот компонент определяет свои собственные стили. Наследование CSS не помогает. To workaround the problem, you can use the [`sx`](/system/basics/#the-sx-prop) prop directly on the child if it is a Material-UI component.

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

| Имя                                      | Тип                                                                                                                           | По-умолчанию                            | Описание                                                                                   |
|:---------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:------------------------------------------------------------------------------------------ |
| <span class="prop-name">children</span>  | <span class="prop-type">node<br></span>                                                                                 |                                         | Box render function or node.                                                               |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">sx</span>        | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Принимает все системные свойства, а также все допустимые CSS-свойства.                     |

## System props

As a CSS utility component, the `Box` also supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Box mt={2}>
```
