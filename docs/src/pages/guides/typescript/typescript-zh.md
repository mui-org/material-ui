# TypeScript

<p class="description">借助 TypeScript，你可以为 JavaScript 添加静态类型，从而提高代码质量及开发者的工作效率。</p>

Material-UI requires a minimum version of TypeScript 3.5.

请查看 [Create React App with TypeScript](https://github.com/mui-org/material-ui/tree/next/examples/create-react-app-with-typescript) 的例子。

若想使用类型，你必须在 `tsconfig.json` 里启用以下的一些选项：

```json
{
  "compilerOptions": {
    "lib": ["es6", "dom"],
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true
  }
}
```

对每个发布在 `@types/` 命名空间下的类型声明包，同样需要启用严格模式（strict mode）。 使用不太严格的 `tsconfig.json` 或省略某些库可能会造成一些错误。 若您想获得最佳类型（type）的体验，我们建议设置 `"strict": true` 。

## `withStyles` 的使用

在 TypeScript 中使用 `withStyles` 可能有点棘手，但有一些工具集可以使体验尽可能地轻松。

### 使用 `createStyles` 来杜绝类型扩展

造成混淆的一个常见原因是 TypeScript的 [类型扩展（type widening）](https://mariusschulz.com/blog/typescript-2-1-literal-type-widening)，这会导致以下示例无法按预期工作：

```ts
const styles = {
  root： {
    display: 'flex',
    flexDirection: 'column',
  }
};

withStyles（styles）;
//         ^^^^^^
//        属性 'flexDirection' 的类型是不兼容的。
//           “string” 类型不能赋予给这些类型：'"-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row"...'。
```

问题是 `flexDirection` 属性的类型被推断为 `string`，这样太随意了。 要解决此问题，您可以将样式对象直接传递给 `withStyles`：

```ts
withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});
```

然而，如果您尝试根据主题来构建样式，那么类型扩展会再次显示其不怎么雅观的部分：

```ts
withStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit,
    backgroundColor: palette.background.default,
    color: palette.primary.main,
  },
}));
```

这是因为 TypeScript [扩展了函数表达式的返回类型](https://github.com/Microsoft/TypeScript/issues/241)。

因此，我们建议使用我们的 `createStyles` 帮助函数来构造样式规则对象：

```ts
// 不依赖于主题的样式
const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

// 依赖于主题的样式
const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: spacing.unit,
      backgroundColor: palette.background.default,
      color: palette.primary.main,
    },
  });
```

`createStyles` 只是一个恒等函数（identity function)；它不会在运行时“做任何事情”，只是在编译时帮助指导类型推断。

### Media queries（媒体查询）

`withStyles` 允许样式对象具有顶级媒体查询的权限，如下所示：

```ts
const styles = createStyles({
  root: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    root: {
      display: 'flex',
    },
  },
});
```

然而，为了让这些样式能在TypeScript 中使用，所以在定义时必须明确 CSS 类的名称和实际的 CSS 属性名称。 由于类名称应与 CSS 属性相同，因此应避免使用。

```ts
// 这样是错误的，因为 TypeScript 认为 `@media (min-width: 960px)` 是一个类名
// 并且认为 `content` 是 css 属性
const ambiguousStyles = createStyles({
  content: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    content: {
      display: 'flex',
    },
  },
});

// 这样定义就可以
const ambiguousStyles = createStyles({
  contentClass: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    contentClass: {
      display: 'flex',
    },
  },
});
```

### 使用 `WithStyles` 来扩充你的属性

由于用 `withStyles(styles)` 装饰的组件被注入了一个特殊的 `classes` 属性，您需要相应地定义其属性：

```ts
const styles = (theme: Theme) =>
  createStyles({
    root: {
      /* ... */
    },
    paper: {
      /* ... */
    },
    button: {
      /* ... */
    },
  });

interface Props {
  // 未被注入样式的属性
  foo: number;
  bar: boolean;
  // 已被注入样式的属性
  classes: {
    root: string;
    paper: string;
    button: string;
  };
}
```

然而，这是不是很 [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) ，因为它需要你在两个不同的地方保持类名（如 `“root”`， `“paper”`， `“button”`，...）。 我们提供了一个类型操作符 `WithStyles` 来帮助解决这个问题，因此您可以直接写入：:

```ts
import { createStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      /* ... */
    },
    paper: {
      /* ... */
    },
    button: {
      /* ... */
    },
  });

interface Props extends WithStyles<typeof styles> {
  foo: number;
  bar: boolean;
}
```

### 装饰组件

将 `withStyles(styles)` 作为函数来如期使用：

```tsx
const DecoratedSFC = withStyles(styles)(({ text, type, color, classes }: Props) => (
  <Typography variant={type} color={color} classes={classes}>
    {text}
  </Typography>
));

const DecoratedClass = withStyles(styles)(
  class extends React.Component<Props> {
    render() {
      const { text, type, color, classes } = this.props;
      return (
        <Typography variant={type} color={color} classes={classes}>
          {text}
        </Typography>
      );
    }
  },
);
```

不幸的是，由于 [TypeScript 装饰器现有的限制](https://github.com/Microsoft/TypeScript/issues/4881)， 在 TypeScript 中，`withStyles(styles)`作为一个装饰器使用。

## 定制的`主题`

将自定义属性添加到 `Theme` 中时，您可以通过以强类型的方式实现 [TypeScript 的模块扩充](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) 而继续使用它 。

以下示例添加了一个 `appDrawer` 属性，并将其合并到由 `material-ui` 提供的属性中：

```ts
import { Breakpoint, Theme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width'];
      breakpoint: Breakpoint;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width'];
      breakpoint?: Breakpoint;
    };
  }
}
```

以及一个带有额外的默认选项的一个自定义主题仓库：

**./styles/createMyTheme**:

```ts
import { createTheme, ThemeOptions } from '@material-ui/core/styles';

export default function createMyTheme(options: ThemeOptions) {
  return createTheme({
    appDrawer: {
      width: 225,
      breakpoint: 'lg',
    },
    ...options,
  });
}
```

也可以这样使用：

```ts
import createMyTheme from './styles/createMyTheme';

const theme = createMyTheme({
  appDrawer: { breakpoint: 'md' },
});
```

## `component` 属性的用法

你可以通过 `component` 属性替换许多 Material-UI 的许多组件的根节点，我们在组件的 API 文档中做了详细的说明。 例如，一个按钮（Button）的根节点可以被替换成一个 React Router 的链接（Link），并且，任何传入按钮（Button）的额外的属性，例如 `to` ，都会被传递到链接（Link）组件中。 关于按钮和 react-router-dom 的代码示例查看[这些示例](/guides/routing/#component-prop)。

为了能够单独使用 Material-UI 组件的属性，该属性应该与类型参数一起使用。 否则，`component` 属性将不会出现在 Material-UI 组件的属性中。

下面的示例使用了 `TypographyProps`，这也同样适用于那些带有 `OverrideProps` 定义的属性的组件。

以下 `CustomComponent` 组件与 `Typography` 组件具有相同的属性。

```ts
function CustomComponent(props: TypographyProps<'a', { component: 'a' }>) {
  /* ... */
}
```

按照以上示例来设置，现在的 `CustomComponent` 就可以与 `component` 属性一起使用了，并且该属性应该设置为 `'a'`。 此外，`CustomComponent` 将拥有 `<a>` 这个 HTML 元素的所有属性。 `Typography` 组件的其他属性也会出现在 `CustomComponent` 的属性中。

而通过一个通用的 `CustomComponent` 来接受任何React组件、自定义的和 HTML 元素也是有可能的。

```ts
function GenericCustomComponent<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  /* ... */
}
```

现在，如果将 `GenericCustomComponent` 与所提供的 `component` 属性一起使用，它也应该拥有所提供的组件所需的所有属性。

```ts
function ThirdPartyComponent({ prop1 }: { prop1: string }) {
  return <div />;
}
// ...
<GenericCustomComponent component={ThirdPartyComponent} prop1="some value" />;
```

当所需的 `ThirdPartyComponent` 是明确要求时，`prop1` 也成为 `GenericCustomComponent` 的必需属性。

但是，并不是每个组件都完全支持您传入的任何组件类型。 如果您在 TypeScript 中遇到一个不接受其 `component` 属性的组件，请新建一个 issue。 我们也一直在努力实现组件属性的通用化。

## 处理 `值（value）` 和事件处理器

很多与用户输入有关的组件会提供一个 `value` 属性或者包含当前 `值` 的事件处理器。 大多数情况下只在 React 内部处理`值`，这样的话它能够是任何类型，譬如 objects 或者 arrays。

然而，如果是它依赖于组件子项的情况，此类型无法在编译时被验证，例如对于 `Select` 或者 `RadioGroup` 来说。 这意味着留给我们的最合适的选项是将其输入为 `unknown` 并让开发者自行决定如何来缩小该类型。 与 [`event.target` 在 React 中并不通用的原因](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682) 相同，我们并不推荐您在这些案例中尝试使用一个通用的类型。

这些演示包括使用类型转换的类型变量。 鉴于所有的类型都位于一个文件中，并且都是非常基本的，这样的折衷可以接受。 您必须自行决定是否能够接受同样的折衷。 库的类型默认为严格的，但也可以通过选择性加入变得通融一点。
