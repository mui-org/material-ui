# Instalación

<p class="description">Instala Material-UI, el framework de IU para React más popular del mundo.</p>

Material-UI está disponible como un [ paquete npm ](https://www.npmjs.com/package/@material-ui/core).

## npm

Para instalarlo y guardarlo en las dependencias de tu ` package.json `, ejecuta:

```sh
// with npm
npm install @material-ui/core@next @emotion/react @emotion/styled

// with yarn
yarn add @material-ui/core@next @emotion/react @emotion/styled
```

<!-- #react-peer-version -->

Ten en cuenta que [ react ](https://www.npmjs.com/package/react) > = 17.0.0 y [ react-dom ](https://www.npmjs.com/package/react-dom) > = 17.0.0 son dependencias tipo "peer".

Or if you want to use `styled-components` as a styling engine:

```sh
// with npm
npm install @material-ui/core@next @material-ui/styled-engine-sc@next styled-components

// with yarn
yarn add @material-ui/core@next @material-ui/styled-engine-sc@next styled-components
```

Take a look at the [Styled Engine guide](/guides/styled-engine/) for more information about how to configure `styled-components` as the style engine.

## Fuente Roboto

Material-UI fue diseñado con la fuente [ Roboto ](https://fonts.google.com/specimen/Roboto) en mente. Así que asegúrate de seguir [ estas instrucciones ](/components/typography/#general). Por ejemplo, a través de Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Fuente de Iconos

To use the font `Icon` component, you must first add the [Material icons](https://fonts.google.com/icons) font. Here are [some instructions](/components/icons/#font-icons) on how to do so. Por ejemplo, a través de Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Iconos SVG

Para poder utilizar los íconos SVG Material precompilados, como los que se encuentran en los [demos de íconos](/components/icons/), primero debes instalar el paquete [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
// usando npm
npm install @material-ui/icons

// usando yarn
yarn add @material-ui/icons
```

## CDN

Puedes comenzar a utilizar Material-UI con una infraestructura mínima de front-end, lo que es excelente para la creación de prototipos.

Se proporcionan dos archivos de Definición Universal de Módulos (**UMD**):

- uno para desarrollo: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- uno para producción: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Puedes seguir [ este ejemplo sobre CDN ](https://github.com/mui-org/material-ui/tree/master/examples/cdn) para empezar rápidamente.

⚠️ Sin embargo, utilizar esta estrategia en **producción** **no es aconsejable** - ya que el cliente tiene que descargar la biblioteca completa, sin importar cuales son los componentes que realmente están en uso, afectando al desempeño y la utilización de ancho de banda.

⚠️ Los enlaces UMD están utilizando la etiqueta `latest` para hacer referencia a la última versión de la biblioteca. ⚠️ Los enlaces UMD están utilizando la etiqueta `latest` para hacer referencia a la última versión de la biblioteca. Deberias considerar hacer referencia a alguna versión específica, por ejemplo, [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js).

## Recursos de diseño

<a href="https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>
<a href="https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="adobe-xd" /></a>
<a href="https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>

A set of reusable components for design tools is available, designed to match the React components and to help you craft great products:

- [Figma](https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): A large UI kit with over 600 handcrafted Material-UI components.
- [Adobe XD](https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): A large UI kit with over 600 handcrafted Material-UI components.
- **Sketch**: [Sketch for Material-UI](https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch) — A large UI kit with over 600 handcrafted Material-UI's symbols 💎.
- **Framer**: [Framer for Material-UI](https://packages.framer.com/package/material-ui/material-ui) — A small MIT UI kit preview of handcrafted Material-UI's component.
