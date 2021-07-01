# Unterstützte Plattformen

<p class="description">Erfahren Sie, welche von der modernen bis zu alten Plattformen von Material-UI unterstützt werden.</p>

## Browser

Die Material-UI unterstützt die neuesten, stabilen Versionen aller gängigen Browser und Plattformen. You don't need to provide any JavaScript polyfill as it manages unsupported browser features internally and in isolation.

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari (macOS) | Safari (iOS) | IE                   |
|:----- |:------- |:------ |:-------------- |:------------ |:-------------------- |
| >= 85 | >= 78   | >= 84  | >= 13          | >= 12.1      | 11 (partial support) |

<!-- #default-branch-switch -->

An extensive list can be found in our [.browserlistrc](https://github.com/mui-org/material-ui/blob/next/.browserslistrc#L12-L27) (check the `stable` entry).

Da Googlebot einen Web-Rendering-Service (WRS) zum Indizieren des Seiteninhalts verwendet, ist es entscheidend, dass Material-UI dies unterstützt. [WRS aktualisiert regelmäßig die verwendete Rendering-Engine](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Sie können erwarten, dass die Komponenten von Material-UI ohne größere Probleme gerendert werden.

### IE 11

Material-UI provides **partial** supports for IE 11. Be aware of the following:

- Some of the components have no support. For instance, the new components, the data grid, the date picker.
- Some of the components have degraded support. For instance, the outlined input border radius is missing, the combobox doesn't remove diacritics, the circular progress animation is wobbling.
- The documentaton itself might crash.
- You need install the [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).
- You might need to install polyfills. For instance for the [popper.js transitive dependency](https://popper.js.org/docs/v2/browser-support/#ie11).

Overall, the library doesn't prioritize the support of IE 11 if it harms the most common use cases. For instance, we will close new issues opened about IE 11 and might not merge pull requests that improve IE 11 support.

v6 will completely remove the support of IE 11.

## Server

<!-- #stable-snapshot -->

Material-UI supports [Node.js](https://github.com/nodejs/node) starting with version 12.17 (or 12.0 with `--experimental-modules` enabled) for server-side rendering. Where possible, the [LTS versions that are in maintenance](https://github.com/nodejs/Release#release-schedule) are supported.

### CSS-Präfix

Be aware that some CSS features [require](https://github.com/cssinjs/jss/issues/279) an additional postprocessing step that adds vendor-specific prefixes. These prefixes are automatically added to the client thanks to [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

Das in dieser Dokumentation bereitgestellte CSS wird mit dem [`Autoprefixer`](https://www.npmjs.com/package/autoprefixer) verarbeitet. Sie können die [Dokumentationsimplementierung](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) als Inspiration verwenden. Beachten Sie, dass dies Auswirkungen auf die Leistung der Seite hat. It's a must-do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages.

## React

<!-- #react-peer-version -->

Material-UI supports the most recent versions of React, starting with ^17.0.0 (the one with event delegation at the React root). Have a look at the older [versions](https://material-ui.com/versions/) for backward compatibility.

## TypeScript

Material-UI requires a minimum version of TypeScript 3.5.
