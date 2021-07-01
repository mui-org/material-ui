---
components: Link
githubLabel: 'component: Link'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#link'
---

# Links

<p class="description">Mit der Link-Komponente kannst du Ankerelemente auf einfache Weise an deine Designfarben und Typografiestile anpassen.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Einfache Links

Die Link-Komponente wird auf der [Typography](/api/typography/) Komponente aufgebaut. Sie können diese Eigenschaften nutzen.

{{"demo": "pages/components/links/Links.js"}}

However, the Link component has different default properties than the Typography component:

- `color="primary"` da der Link hervorstechen muss.
- `variant="inherit"` as the link will, most of the time, be used as a child of a Typography component.

## Underline

The `underline` prop can be used to set the underline behavior. The default is `hover`.

{{"demo": "pages/components/links/UnderlineLink.js"}}

## Sicherheit

When you use `target="_blank"` with Links, it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process. Andernfalls kann die Zielseite Ihre Seite möglicherweise auf eine böswillige URL umleiten.
- `rel="noreferrer"` has the same effect, but also prevents the *Referer* header from being sent to the new page. ⚠️ Das entfernen des Referrer Headers kann Auswirkungen auf Analytics haben.

## Drittanbieter-Routing Bibliothek

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. Die `Link`- Komponente bietet eine Eigenschaft für diesen Anwendungsfall: `component`. Here is a [more detailed guide](/guides/routing/#link).

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- Vermeide generische Beschreibungen wie "Hier klicken" oder "Gehe zu" beim Erstellen eines Links. Verwende stattdessen [spezifische Beschreibungen](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For the best user experience, links should stand out from the text on the page. Sie können zum Beispiel das Standardverhalten `underline="dauerhaft"` beibehalten
- Wenn ein Link keinen sinnvollen href hat, [sollte ein `<button>` Element verwendet werden](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}
