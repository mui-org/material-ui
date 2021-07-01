# Инструкция по установке

<p class="description">Установите Material-UI, самый популярный в мире фреймворк для пользовательского интерфейса React.</p>

Material-UI доступен в виде пакета [ npm ](https://www.npmjs.com/package/@material-ui/core).

## npm

Для установки и сохранения в вашем ` package.json ` зависимости, запустите:

```sh
// для npm
npm install @material-ui/core@next @emotion/react @emotion/styled

// для yarn
yarn add @material-ui/core@next @emotion/react @emotion/styled
```

<!-- #react-peer-version -->

Обратите внимание, что [react](https://www.npmjs.com/package/react) >= 17.0.0 и [react-dom](https://www.npmjs.com/package/react-dom) >= 17.0.0 взаимозависимы (peer dependencies).

Or if you want to use `styled-components` as a styling engine:

```sh
// with npm
npm install @material-ui/core@next @material-ui/styled-engine-sc@next styled-components

// with yarn
yarn add @material-ui/core@next @material-ui/styled-engine-sc@next styled-components
```

Take a look at the [Styled Engine guide](/guides/styled-engine/) for more information about how to configure `styled-components` as the style engine.

## Шрифт Roboto

Material-UI был разработан на основе шрифта [Roboto](https://fonts.google.com/specimen/Roboto). Поэтому обязательно следуйте [этим инструкциям](/components/typography/#general). Например, через Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Иконочный шрифт

To use the font `Icon` component, you must first add the [Material icons](https://fonts.google.com/icons) font. Вот [некоторые инструкции](/components/icons/#font-icons) как это сделать. Например, через Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG Иконки

Для того, чтобы использовать предварительно собранные SVG-иконки Material, такие как те, которые используются для [демонстрации](/components/icons/), сначала необходимо установить пакет [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
// через npm
npm install @material-ui/icons

// через yarn
yarn add @material-ui/icons
```

## CDN

Вы можете начать использовать Material-UI с минимальной интерфейсной инфраструктурой, что отлично подходит для прототипирования.

Предоставляются два файла в формате **UMD**:

- один для разработки: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- один для публикации: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Вы можете следовать [этому примеру CDN](https://github.com/mui-org/material-ui/tree/master/examples/cdn) для быстрого старта.

Использование этого подхода в **продакшене** **не рекомендуется** - клиент вынужден загружать целую библиотеку, независимо от того, какие компоненты фактически используются, что оказывает влияние на производительность и загруженность полосы пропускания.

В ссылках на UMD-файлы используется тег `latest` для указания на последнюю версию библиотеки. Этот указатель **нестабильный**, он изменяется при появлении новых версий. Вы можете указывать конкретную версию, например, [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js).

## Design resources

<a href="https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>
<a href="https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="adobe-xd" /></a>
<a href="https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>

A set of reusable components for design tools is available, designed to match the React components and to help you craft great products:

- [Figma](https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): Большой UI-набор из более чем 600 самодельных компонентов Material-UI.
- [Adobe XD](https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): Большой UI-набор из более чем 600 самодельных компонентов Material-UI.
- [Sketch](https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch): Большой UI-набор из более чем 600 самодельных символов Material-UI.
- **Framer**: [Framer for Material-UI](https://packages.framer.com/package/material-ui/material-ui) — A small MIT UI kit preview of handcrafted Material-UI's component.
