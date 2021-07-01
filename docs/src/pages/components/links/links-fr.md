---
components: Link
githubLabel: 'component: Link'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#link'
---

# Liens

<p class="description">Le composant Lien vous permet de personnaliser facilement les éléments de types ancre avec les couleurs de votre thème et les styles de typographie.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Liens de base

Le composant Link est construit au-dessus du composant [Typography](/api/typography/), ce qui signifie que vous pouvez utiliser ses props.

{{"demo": "pages/components/links/Links.js"}}

Cependant, le composant Link a des accessoires par défaut différents de ceux du composant Typography :

- `color="primary"` as the link needs to stand out.
- `variant="inherit"` as the link will, most of the time, be used as a child of a Typography component.

## Souligner

La prop `underline` peut être utilisée pour définir le comportement de soulignement. La valeur par défaut est `hover`.

{{"demo": "pages/components/links/UnderlineLink.js"}}

## Security

When you use `target="_blank"` with Links, it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` a le même effet, mais empêche également l'en-tête _Referer_ d'être envoyé à la nouvelle page. ⚠️ Removing the referrer header will affect analytics.

## Bibliothèque de routage tierce

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. Le composant `Link` fournit la propriété `component` pour gérer ce cas d'utilisation. Here is a [more detailed guide](/guides/routing/#link).

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- When providing the content for the link, avoid generic descriptions like "click here" or "go to". Instead, use [specific descriptions](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For the best user experience, links should stand out from the text on the page. For instance, you can keep the default `underline="always"` behavior.
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}
