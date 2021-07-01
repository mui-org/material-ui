---
components: Link
githubLabel: 'component: Link'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#link'
---

# Enlaces

<p class="description">Los Enlaces permiten personalizar fácilmente los enlaces con los colores de su Tema y estilos de tipografía.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Enlaces simples

The Link component is built on top of the [Typography](/api/typography/) component. You can leverage its properties.

{{"demo": "pages/components/links/Links.js"}}

However, the Link component has different default properties than the Typography component:

- `color="primary"` as the link needs to stand out.
- `variant="inherit"` as the link will, most of the time, be used as a child of a Typography component.

## Underline

The `underline` prop can be used to set the underline behavior. The default is `hover`.

{{"demo": "pages/components/links/UnderlineLink.js"}}

## Seguridad

When you use `target="_blank"` with Links, it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the *Referer* header from being sent to the new page. ⚠️ Removing the referrer header will affect analytics.

## Librería externa de routing

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `Link` component provides a property to handle this use case: `component`. Here is a [more detailed guide](/guides/routing/#link).

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- Al proporcionar el contenido del enlace, evitar descripciones genéricas como "haga clic aquí" o "ir a". En su lugar, utilice [descripciones específicas](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- Para una mejor experiencia de usuario, los enlaces deben sobresalir del texto en la página. For instance, you can keep the default `underline="always"` behavior.
- Si un enlace no tiene un significativo href, [se debe representarse mediante un `<button>` elemento](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}
