---
title: Компонент React Skeleton
components: Skeleton
githubLabel: 'component: Skeleton'
---

# Skeleton

<p class="description">Отображайте макет вашего приложения перед загрузкой данных, чтобы уменьшить дискомфорт от загрузки.</p>

Данные ваших компонентов могут не быть доступны сразу. You can improve the perceived responsiveness of the page by using skeletons. Кажется, что все происходит мгновенно, затем информация постепенно отображается на экране. (см. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797)).

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Использование

Компонент разработан для использования **напрямую в ваших компонентах**. Например:

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## Variants

Компонент поддерживает 3 формы.

{{"demo": "pages/components/skeleton/Variants.js"}}

## Анимации

По умолчанию скелет пульсирует, но вы можете изменить анимацию волны или полностью отключить ее.

{{"demo": "pages/components/skeleton/Animations.js"}}

### Pulsate example

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

### Wave example

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## Inferring dimensions

In addition to accepting `width` and `height` props, the component can also infer the dimensions.

It works well when it comes to typography as its height is set using `em` units.

```jsx
<Typography variant="h1">
  {loading ? <Skeleton /> : 'h1'}
</Typography>
```

{{"demo": "pages/components/skeleton/SkeletonTypography.js", "defaultCodeOpen": false}}

But when it comes to other components, you may not want to repeat the width and height. In these instances, you can pass `children` and it will infer its width and height from them.

```jsx
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}

## Цвет

The color of the component can be customized by changing its `background-color` CSS property. This is especially useful when on a black background (as the skeleton will otherwise be invisible).

{{"demo": "pages/components/skeleton/SkeletonColor.js", "bg": "inline"}}

## Доступность

Skeleton screens provide an alternative to the traditional spinner method. Rather than showing an abstract widget, skeleton screens create anticipation of what is to come and reduce cognitive load.

The background color of the skeleton uses the least amount of luminance to be visible in good conditions (good ambient light, good screen, no visual impairments).

### ARIA

None.

### Keyboard

The skeleton is not focusable.
