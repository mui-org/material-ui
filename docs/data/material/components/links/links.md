---
productId: material-ui
components: Link
githubLabel: 'scope: link'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/link/
githubSource: packages/mui-material/src/Link
---

# Links

<p class="description">The Link component allows you to easily customize anchor elements with your theme colors and typography styles.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic links

The Link component is built on top of the [Typography](/material-ui/api/typography/) component, meaning that you can use its props.

{{"component": "file://./demos/links/index.ts"}}

However, the Link component has some different default props than the Typography component:

- `color="primary"` as the link needs to stand out.
- `variant="inherit"` as the link will, most of the time, be used as a child of a Typography component.

## Underline

The `underline` prop can be used to set the underline behavior. The default is `always`.

{{"component": "file://./demos/underline/index.ts"}}

## Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The `Link` component provides the `component` prop to handle this use case.
Here is a [more detailed guide](/material-ui/integrations/routing/#link).

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/link/)

- When providing the content for the link, avoid generic descriptions like "click here" or "go to".
  Instead, use [specific descriptions](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For the best user experience, links should stand out from the text on the page. For instance, you can keep the default `underline="always"` behavior.
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md).
  The demo below illustrates how to properly link with a `<button>`:

{{"component": "file://./demos/button/index.ts"}}

### Keyboard accessibility

- Interactive elements should receive focus in a coherent order when the user presses the <kbd class="key">Tab</kbd> key.
- Users should be able to open a link by pressing <kbd class="key">Enter</kbd>.

### Screen reader accessibility

- When a link receives focus, screen readers should announce a descriptive link name.
  If the link opens in a new window or browser tab, add an [`aria-label`](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA8) to inform screen reader users—for example, _"To learn more, visit the About page which opens in a new window."_
