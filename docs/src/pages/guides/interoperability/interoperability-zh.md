# 样式库的互通性

<p class="description">虽然你可以使用 Material-UI 提供的基于 emotion 的样式解决方案来自定义你的应用程序，但你也可以使用你已知和喜欢的方案（从普通的 CSS 到 styled-components）。</p>

本指南旨在归档当前比较流行的一些替代方案，但是您会发现在这里运用的法则，也可以在其他库里适用。 我们为以下的样式方案提供了一些示例：

- [纯 CSS](#plain-css)
- [全局 CSS](#global-css)
- [Styled Components](#styled-components)
- [CSS Modules](#css-modules)
- [Emotion](#css-modules)

## 纯 CSS

没有什么特别花哨的，只是纯 CSS。

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/plain-css-fdue7)

**PlainCssSlider.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}
```

**PlainCssSlider.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './PlainCssSlider.css';

export default function PlainCssSlider() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```

### CSS 注入顺序⚠️

**注意：** 大多数的 CSS-in-JS 解决方案是在 HTML `<head>` 的底部注入它们的样式，这会导致你的自定义样式被 Material-UI 的样式规则所覆盖。 如果你有移除 **!important** 的需求，那么就需要改变 CSS 注入顺序。 Here's a demo of how it can be done in Material-UI:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. 现在你可以覆盖 Material-UI 的样式。 */}
    </StyledEngineProvider>
  );
}
```

**Note:** If you are using emotion and have a custom cache in your app, that one will override the one coming from Material-UI. In order for the injection order to still be correct, you need to add the prepend option. 下面是一个示例：

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function PlainCssPriority() {
  return (
    <CacheProvider value={cache}>
      {这里编写你的组件树。 现在你可以覆盖 Material-UI 的样式。 */}
    </CacheProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@material-ui/styled-engine-sc` package.

### 更深层的元素

如果你试图自定义滑块的样式，那么很可能会影响到滑块的一些子元素，例如滚动条的箭头（thumb）。 在 Material-UI 中，所有的子元素都增加了两层的特定类：`.parent .child {}`。 所以在编写覆盖样式的时候，你也需要这样做。

以下示例除了覆盖滑块本身的自定义样式外，还覆盖了滑块的 `thumb` 样式。

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**PlainCssSliderDeep1.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .MuiSlider-thumb {
  border-radius: 1px;
}
```

**PlainCssSliderDeep1.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './PlainCssSliderDeep1.css';

export default function PlainCssSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```

上面的演示依赖于 [默认的`className`值](/styles/advanced/#with-material-ui-core)，但是你也可以使用 `componentsProps` API 来提供你自己的类名。

**PlainCssSliderDeep2.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .thumb {
  border-radius: 1px;
}
```

**PlainCssSliderDeep2.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './PlainCssSliderDeep2.css';

export default function PlainCssSliderDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        className="slider"
        componentsProps={{ thumb: { className: 'thumb' } }}
      />
    </div>
  );
}
```

## 全局 CSS

明确向提组件提供类名是不是太大费周章了？ [您可以定位到由 Material-UI 生成的类名](/styles/advanced/#with-material-ui-core)。

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/global-classnames-dho8k)

**GlobalCssSlider.css**

```css
.MuiSlider-root {
  color: #20b2aa;
}

.MuiSlider-root:hover {
  color: #2e8b57;
}
```

**GlobalCssSlider.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './GlobalCssSlider.css';

export default function GlobalCssSlider() {
  return <Slider defaultValue={30} />;
}
```

### CSS 注入顺序⚠️

**注意：** 大多数的 CSS-in-JS 解决方案是在 HTML `<head>` 的底部注入它们的样式，这会导致你的自定义样式被 Material-UI 的样式规则所覆盖。 如果你有移除 **!important** 的需求，那么就需要改变 CSS 注入顺序。 Here's a demo of how it can be done in Material-UI:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. 现在你可以覆盖 Material-UI 的样式。 */}
    </StyledEngineProvider>
  );
}
```

**Note:** If you are using emotion and have a custom cache in your app, that one will override the one coming from Material-UI. In order for the injection order to still be correct, you need to add the prepend option. 下面是一个示例：

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function GlobalCssPriority() {
  return (
    <CacheProvider value={cache}>
      {/* 这里编写你的组件树。 现在你可以覆盖 Material-UI 的样式。 */}
    </CacheProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@material-ui/styled-engine-sc` package.

### 更深层的元素

如果你试图自定义滑块的样式，那么很可能会影响到滑块的一些子元素，例如滚动条的箭头（thumb）。 在 Material-UI 中，所有的子元素都增加了两层的特定类：`.parent .child {}`。 所以在编写覆盖样式的时候，你也需要这样做。

以下示例除了覆盖滑块本身的自定义样式外，还覆盖了滑块的 `thumb` 样式。

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**GlobalCssSliderDeep.css**

```css
.MuiSlider-root {
  color: #20b2aa;
}

.MuiSlider-root:hover {
  color: #2e8b57;
}

.MuiSlider-root .MuiSlider-thumb {
  border-radius: 1px;
}
```

**GlobalCssSliderDeep.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import './GlobalCssSliderDeep.css';

export default function GlobalCssSliderDeep() {
  return <Slider defaultValue={30} />;
}
```

## Styled Components

![stars](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg)

### 改变默认的样式引擎

默认情况下，Material-UI 组件使用 emotion 来作为它们的样式引擎。 但是，如果你想使用 `styled-components` 的话，那么你可以参考这个 [示例项目](https://github.com/mui-org/material-ui/blob/next/examples/create-react-app-with-styled-components) 来配置你的应用程序。 按照这种方法来配置的话，则可以减少捆绑包的大小，并且无需配置 CSS 注入顺序。

After the style engine is configured properly, you can use the [`styled()`](/customization/styled/) utility from `@material-ui/core/styles` and have direct access to the theme.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/styled-components-interoperability-w9z9d)

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { styled } from '@material-ui/core/styles';

const CustomizedSlider = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export default function StyledComponents() {
  return <CustomizedSlider defaultValue={30} />;
}
```

### 更深层的元素

如果你试图自定义滑块的样式，那么很可能会影响到滑块的一些子元素，例如滚动条的箭头（thumb）。 在 Material-UI 中，所有的子元素都增加了两层的特定类：`.parent .child {}`。 所以在编写覆盖样式的时候，你也需要这样做。

以下示例除了覆盖滑块本身的自定义样式外，还覆盖了滑块的 `thumb` 样式。

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "defaultCodeOpen": true}}

上面的演示依赖于 [默认的`className`值](/styles/advanced/#with-material-ui-core)，但是你也可以使用 `componentsProps` API 来提供你自己的类名。

```jsx
import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const CustomizedSlider = styled((props) => (
  <Slider componentsProps={{ thumb: { className: 'thumb' } }} {...props} />
))`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .thumb {
    border-radius: 1px;
  }
`;

export default function StyledComponentsDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <CustomizedSlider defaultValue={30} />
    </div>
  );
}
```

### 主题

通过使用 Material-UI 主题提供者（theme provider），该主题也可以在样式引擎的主题上下文中可用（emotion 或 styled-components，取决于你的配置）。

> ⚠️如果你**已经**使用了 styled-component 或 emotion 驱动的自定义主题，那么它可能会不兼容 Material-UI 的主题规范。 如果它不兼容，那么你需要<b>先</b>渲染 Material-UI 的 ThemeProvider。 这样做就可以确保主题结构的隔离。 这对于想要在代码库中渐进式地使用 Material-UI 组件是非常理想的。

我们鼓励你在 Material-UI 和你项目的其他部分之间共享相同的主题对象。

```jsx
const CustomizedSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};

  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);
```

{{"demo": "pages/guides/interoperability/StyledComponentsTheme.js"}}

### Portals（传送门组件）

[传送门组件](/components/portal/)提供了一种一流的方法，它将子元素渲染在其父组件的 DOM 层次结构之外的 DOM 节点中。 当您使用这样的 styled-components 规范其 CSS 的方式时，可能会遇到一些无法附着样式的问题。

For example, if you attempt to style the `tooltip` generated by the [Tooltip](/components/tooltip/) component, you will need to pass along the `className` property to the element being rendered outside of it's DOM hierarchy. 下面的示例演示了一个变通办法：

```jsx
import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: navy;
  }
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsPortal.js"}}

## CSS Modules

![stars](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

鉴于它全权依赖于大家使用的打包方案，我们很难得知 [此种样式方案](https://github.com/css-modules/css-modules) 的市场占有率。

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/css-modules-nuyg8)

**CssModulesSlider.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}
```

**CssModulesSlider.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSlider.module.css';

export default function CssModulesSlider() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className={styles.slider} />
    </div>
  );
}
```

### CSS 注入顺序⚠️

**注意：** 大多数的 CSS-in-JS 解决方案是在 HTML `<head>` 的底部注入它们的样式，这会导致你的自定义样式被 Material-UI 的样式规则所覆盖。 如果你有移除 **!important** 的需求，那么就需要改变 CSS 注入顺序。 Here's a demo of how it can be done in Material-UI:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. 现在你可以覆盖 Material-UI 的样式。 */}
    </StyledEngineProvider>
  );
}
```

**Note:** If you are using emotion and have a custom cache in your app, that one will override the one coming from Material-UI. In order for the injection order to still be correct, you need to add the prepend option. 下面是一个示例：

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* 这里编写你的组件 现在你可以覆盖 Material-UI 的样式。 */}
    </CacheProvider>
  );
}
```

**Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. If you are curious to see how it can be done, you can take a look on the `StylesProvider` implementation in the `@material-ui/styled-engine-sc` package.

### 更深层的元素

如果你试图自定义滑块的样式，那么很可能会影响到滑块的一些子元素，例如滚动条的箭头（thumb）。 在 Material-UI 中，所有的子元素都增加了两层的特定类：`.parent .child {}`。 所以在编写覆盖样式的时候，你也需要这样做。

以下示例除了覆盖滑块本身的自定义样式外，还覆盖了滑块的 `thumb` 样式。

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**CssModulesSliderDeep1.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .MuiSlider-thumb {
  border-radius: 1px;
}
```

**CssModulesSliderDeep1.js**

```jsx
import * as React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSliderDeep1.module.css';
import Slider from '@material-ui/core/Slider';

export default function CssModulesSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className={styles.slider} />
    </div>
  );
}
```

上面的演示依赖于 [默认的`className`值](/styles/advanced/#with-material-ui-core)，但是你也可以使用 `componentsProps` API 来提供你自己的类名。

**CssModulesSliderDeep2.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .thumb {
  border-radius: 1px;
}
```

**CssModulesSliderDeep2.js**

```jsx
import * as React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSliderDeep2.module.css';
import Slider from '@material-ui/core/Slider';

export default function CssModulesSliderDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        className={styles.slider}
        componentsProps={{ thumb: { className: styles.thumb } }}
      />
    </div>
  );
}
```

## Emotion

![stars](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/@emotion/react.svg)

### `css` 属性

Emotion 的 **css()** 方法与 Material-UI 无缝协作。

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "defaultCodeOpen": true}}

### 主题

它会像 styled components 一样起作用。 您可以 [使用相同的指南](/guides/interoperability/#styled-components) 。

### `styled()` API

它会像 styled components 一样起作用。 您可以 [使用相同的指南](/guides/interoperability/#styled-components) 。
