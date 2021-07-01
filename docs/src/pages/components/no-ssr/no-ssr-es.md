---
title: No SSR React component
components: NoSsr
---

# No SSR

<p class="description">NoSsr quita a proposito los componentes de la materia de procesamiento del Lado del Servidor (SSR).</p>

Este componente puede ser útil en una variedad de situaciones:

- Escape hatch for broken dependencies not supporting SSR.
- Improve the time-to-first paint on the client by only rendering above the fold.
- Reducir el tiempo de procesamiento en el servidor.
- Bajo demasiado pesada carga del servidor, puede activar la degradación del servicio.
- Improve the time-to-interactive by only rendering what's important (with the `defer` property).

[La función de estilo de la paleta](/system/palette/).

## Client-side deferring

{{"demo": "pages/components/no-ssr/SimpleNoSsr.js"}}

## Aplazar fotograma

In it's core, the NoSsr component purpose is to **defer rendering**. Como se ilustra en la demo anterior, puede utilizarla para diferir el renderizado del servidor al cliente.

Pero también se puede utilizar para aplazar la representación dentro del propio cliente. Puedes **esperar un marco de pantalla** con la propiedad `diferir` para renderizar los hijos. React hace [2 commits](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) en lugar de 1.

{{"demo": "pages/components/no-ssr/FrameDeferring.js"}}
