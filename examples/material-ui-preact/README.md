# Material UI - Preact example

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #target-branch-reference -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/material-ui-preact
cd material-ui-preact
```

Install it and run:

```bash
npm install
npm run start
```

## The idea behind the example

The project uses Material UI with [Preact](https://github.com/developit/preact), which is a lightweight (3 kB) alternative to React with the same modern API.

This example uses CRA with `react-app-rewired` for adding webpack aliases for Preact.

It includes `@mui/material` and its peer dependencies, including [Emotion](https://emotion.sh/docs/introduction), the default style engine in Material UI.

<!-- #host-reference -->

If you prefer, you can [use styled-components instead](https://next.mui.com/material-ui/integrations/interoperability/#styled-components).

## What's next?

<!-- #host-reference -->

You now have a working example project.
You can head back to the documentation and continue by browsing the [templates](https://next.mui.com/material-ui/getting-started/templates/) section.
