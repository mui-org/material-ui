---
components: React Link（链接）组件
githubLabel: 'component: Link'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#link'
---

# Links 链接

<p class="description">您可以通过链接（Links）组件，轻松的使用主题颜色和字体铸排的样式来自定义锚定元素。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的链接

链接（Links）组件是基于 [文字铸排（Typography）](/api/typography/) 组件构建的，这意味着你也可以使用文字铸排组件的属性。

{{"demo": "pages/components/links/Links.js"}}

但是，链接组件与文字铸排组件相比，它们存在一些不同的默认属性：

- 当链接需要突出显示时，设置 `color="primary"`。
- 在多数的情况下，当链接需要作为文字铸排的子组件使用，则设置 `variant="inherit"`。

## 下划线

`underline` 属性可以用来设置下划线行为。 该属性的默认值是 `hover`。

{{"demo": "pages/components/links/UnderlineLink.js"}}

## 安全性

当你将 `target="_blank"`和链接组件一起使用时，若想和第三方的内容相连，我们[推荐](https://developers.google.com/web/tools/lighthouse/audits/noopener)始终配置 `rel="noopener"` 或者 `rel="noreferrer"`。

- `rel="noopener"` 会阻止新页面访问 `window.opener` 属性，并确保它在单独的进程运行。 若不如此，目标页面有极大可能将你的页面重定向至一个恶意网址。
- `rel ="noreferrer"` 具有相同的效果，但它也提供阻止将 _Referer_ 标头发送到新页面的功能。 ⚠️ 去除 referrer header 会影响分析。

## Third-party routing library（第三方路由库）

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. 针对这种用法，`Link` 组件了提供 `component` 属性来适配它。 Here is a [more detailed guide](/guides/routing/#link).

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- 当提供链接对应的内容时，避免使用泛泛的描述，比如“点击这里”或“跳转”之类。 相反的，请使用 [具体详细的描述](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text)说明。
- 为了获得最佳的用户体验，链接应该从页面上的文字中脱颖而出。 For instance, you can keep the default `underline="always"` behavior.
- 如果一个链接没有赋予一个有意义的 href 值，[它应该加载成一个`<按钮>`元素](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md)。

{{"demo": "pages/components/links/ButtonLink.js"}}
