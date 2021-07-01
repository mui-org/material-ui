# 支持的平台

<p class="description">了解更多Material-UI支持的从最新版到旧版的平台。</p>

## 浏览器

Material-UI 支持所有主流浏览器和平台的最新稳定版本。 您不需要提供任何 JavaScript polyfill， 鉴于它在内部管理了不支持的浏览器的功能并且将其隔离。

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari (macOS) | Safari (iOS) | IE                   |
|:----- |:------- |:------ |:-------------- |:------------ |:-------------------- |
| >= 85 | >= 78   | >= 84  | >= 13          | >= 12.1      | 11 (partial support) |

<!-- #default-branch-switch -->

An extensive list can be found in our [.browserlistrc](https://github.com/mui-org/material-ui/blob/next/.browserslistrc#L12-L27) (check the `stable` entry).

因为 Googlebot 使用了Web rendering service - WRS （网络渲染服务）对页面进行索引，所以Material-UI能提供对它的支持非常重要。 [WRS 定期更新它使用的渲染引擎](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)。 您可以依赖 Material-UI 组件的渲染，并不会出现重大的问题。

### IE 11

Material-UI provides **partial** supports for IE 11. Be aware of the following:

- Some of the components have no support. For instance, the new components, the data grid, the date picker.
- Some of the components have degraded support. For instance, the outlined input border radius is missing, the combobox doesn't remove diacritics, the circular progress animation is wobbling.
- The documentaton itself might crash.
- You need install the [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).
- You might need to install polyfills. For instance for the [popper.js transitive dependency](https://popper.js.org/docs/v2/browser-support/#ie11).

Overall, the library doesn't prioritize the support of IE 11 if it harms the most common use cases. For instance, we will close new issues opened about IE 11 and might not merge pull requests that improve IE 11 support.

v6 will completely remove the support of IE 11.

## 服务器

<!-- #stable-snapshot -->

Material-UI supports [Node.js](https://github.com/nodejs/node) starting with version 12.17 (or 12.0 with `--experimental-modules` enabled) for server-side rendering. Where possible, the [LTS versions that are in maintenance](https://github.com/nodejs/Release#release-schedule) are supported.

### CSS 前缀

请注意，有些 CSS 功能 [需要额外的后处理步骤](https://github.com/cssinjs/jss/issues/279)，来添加不同浏览器标准(vendor-specific) 的特定前缀。 多亏了使用 [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer)，这些前缀会自动被添加到客户端。

本文档中提供的CSS由 [`autoprefixer`](https://www.npmjs.com/package/autoprefixer) 处理。 您可以使用 [文档实现](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) 作为灵感。 请注意，它对页面的性能会产生影响。 对于静态页面来说，这是一个必须要做的事情，但是在渲染动态的页面时，是否采用该方法是权衡利弊之后的考虑。

## React

<!-- #react-peer-version -->

Material-UI supports the most recent versions of React, starting with ^17.0.0 (the one with event delegation at the React root). 我们同时提供了向后兼容的 [版本](https://material-ui.com/versions/)。

## TypeScript

Material-UI requires a minimum version of TypeScript 3.5.
