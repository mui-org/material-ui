---
title: Компонент React Accordion
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: Accordion'
materialDesign: https://material.io/archive/guidelines/components/expansion-panels.html
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#accordion'
---

# Accordion

<p class="description">Аккордеоны содержат потоки создания и позволяют осуществить легковесное редактирование элемента.</p>

Аккордеон это простой контейнер, который может использоваться как самостоятельно, так и внутри более крупного компонента, такого как Card (карточка).

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **На заметку:** Аккордеоны больше не задокументированы в [руководствах Material Design](https://material.io/), но Material-UI будет продолжать поддерживать их. Ранее они были известны как "expansion panels".

## Простой аккордеон

{{"demo": "pages/components/accordion/BasicAccordion.js", "bg": true}}

## Контролируемый аккордеон

Используя компонент `Accordion`, расширив его поведение по умолчанию, можно получить "аккордеон".

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Кастомизированные аккордеоны

Ниже находится пример кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Производительность

Содержимое аккордеонов монтируется по умолчанию, даже если панель не развернута. Это поведение подразумевает рендеринг на стороне сервера и SEO. Если внутри аккордеона находятся ресурсоемкие, для рендеринга, иерархии компонентов или просто на странице много аккордеонов, то возможно хорошей идеей будет изменить поведение по умолчанию включив `unmountOnExit` в `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Как и при любой оптимизации производительности, эта функция не панацея. Сначала идентифицируйте узкие места и лишь затем пытайтесь применить эти стратегии.

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Для оптимальной доступности мы рекомендуем установить `id` и `aria-controls` на `AccordionSummary`. `Accordion` унаследует необходимые `aria-labelbyby` и `id` для области содержимого панели.
