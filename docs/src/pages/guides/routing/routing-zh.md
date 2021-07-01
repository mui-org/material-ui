# 路由库

<p class="description">By default, the navigation is performed with a native <code>&lt;a&gt;</code> element. You can customize it to use your own router. For instance, using Next.js's Link or react-router.</p>

## Navigation components

There are two main components available to perform navigations. The most common one is the [`Link`](/components/link/) as its name might suggest. It renders a native `<a>` element and applies the `href` as an attribute.

{{"demo": "pages/guides/routing/LinkDemo.js"}}

You can also make a button perform navigation actions. If your component is extending [`ButtonBase`](/api/button-base/), providing a `href` prop enables the link mode. For instance, with a `Button` component:

{{"demo": "pages/guides/routing/ButtonDemo.js"}}

## Global theme Link

In real-life applications, using a native `<a>` element is rarely enough. You can improve the user experience by using an enhanced Link component systematically. The theme of Material-UI allows configuring this component once. For instance, with react-router:

```jsx
const LinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material-UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
```

{{"demo": "pages/guides/routing/LinkRouterWithTheme.js", "defaultCodeOpen": false}}

> ⚠️ This approach has limitations with TypeScript. The `href` prop only accepts a string. In the event you need to provide a richer structure, see the next section.

## `component` 属性

You can achieve the integration with third-party routing libraries with the `component` prop. You can learn more about this prop in the [composition guide](/guides/composition/#component-prop).

Here are a few demos with [react-router](https://github.com/ReactTraining/react-router). You can apply the same strategy with all the components: BottomNavigation, Card, etc.

### Link

{{"demo": "pages/guides/routing/LinkRouter.js"}}

### Tabs 选项卡

{{"demo": "pages/guides/routing/TabsRouter.js", "defaultCodeOpen": false}}

### Button

{{"demo": "pages/guides/routing/ButtonRouter.js"}}

### Lists（列表）

{{"demo": "pages/guides/routing/ListRouter.js"}}

## More examples

### Next.js

Next.js has [a custom Link component](https://nextjs.org/docs/api-reference/next/link). The [example folder](https://github.com/mui-org/material-ui/tree/HEAD/examples/nextjs-with-typescript) provides adapters for usage with Material-UI.

- The first version of the adapter is the [`NextLinkComposed`](https://github.com/mui-org/material-ui/tree/HEAD/examples/nextjs-with-typescript/src/Link.tsx) component. This component is unstyled and only responsible for handling the navigation. The prop `href` was renamed `to` to avoid a naming conflict. This is similar to react-router's Link component.

  ```tsx
  import Button from '@material-ui/core/Button';
  import { NextLinkComposed } from '../src/Link';

  export default function Index() {
    return (
      <Button
        component={NextLinkComposed}
        to={{
          pathname: '/about',
          query: { name: 'test' },
        }}
      >
        Button link
      </Button>
    );
  }
  ```

- The second version of the adapter is the `Link` component. This component is styled. It leverages the [link component of Material-UI](https://material-ui.com/components/links/) with `NextLinkComposed`.

  ```tsx
  import Link from '../src/Link';

  export default function Index() {
    return (
      <Link
        href={{
          pathname: '/about',
          query: { name: 'test' },
        }}
      >
        Link
      </Link>
    );
  }
  ```

### Gatsby

The [Link](https://www.gatsbyjs.com/docs/linking-between-pages/) component of Gatsby is built on `@reach/router`. You can use the same previous documentation for react-router. Unlike Next.js, it doesn't require you to create an adapter.
