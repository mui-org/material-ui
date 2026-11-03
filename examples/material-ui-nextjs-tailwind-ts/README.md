# Material UI - Next.js App Router example with Tailwind CSS in TypeScript

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/HEAD/packages/create-next-app) with Material UI and Tailwind CSS installed.

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #target-branch-reference -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/material-ui-nextjs-tailwind-ts
cd material-ui-nextjs-tailwind-ts
```

Install it and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

or:

<!-- #target-branch-reference -->

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mui/material-ui/tree/master/examples/material-ui-nextjs-tailwind-ts)

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/mui/material-ui/tree/master/examples/material-ui-nextjs-tailwind-ts)

## The idea behind the example

This example demonstrates how to use [Tailwind CSS](https://tailwindcss.com/) v4 and the [Next.js](https://nextjs.org/) App Router together with Material UI.
It includes `@mui/material` and its peer dependencies, including [Emotion](https://emotion.sh/docs/introduction), the default style engine in Material UI.
Tailwind CSS is configured to work with Material UI: CSS layers place `CssBaseline` after Tailwind preflight, and Tailwind utilities after Material UI styles.

## Learn more

To learn more about this example:

<!-- #host-reference -->

- [Next.js documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Customizing Material UI](https://next.mui.com/material-ui/customization/how-to-customize/) - approaches to customizing Material UI.
- [Tailwind CSS v4 integration](https://next.mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/) - the CSS layer setup used here.

## What's next?

<!-- #host-reference -->

You now have a working example project.
You can head back to the documentation and continue by browsing the [templates](https://next.mui.com/material-ui/getting-started/templates/) section.
