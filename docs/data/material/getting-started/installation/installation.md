# Installation

<p class="description">Install Material UI, the world's most popular React UI framework.</p>

## Default installation

Run one of the following commands to add Material UI to your project:

<!-- #npm-tag-reference -->

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/material@next @emotion/react @emotion/styled
```

```bash pnpm
pnpm add @mui/material@next @emotion/react @emotion/styled
```

```bash yarn
yarn add @mui/material@next @emotion/react @emotion/styled
```

</codeblock>

### Peer dependencies

<!-- #react-peer-version -->

Please note that [react](https://www.npmjs.com/package/react) and [react-dom](https://www.npmjs.com/package/react-dom) are peer dependencies, meaning you should ensure they are installed before installing Material UI.

```json
"peerDependencies": {
  "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
  "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
},
```

### React 18 and below

If you are using React 18 or below, you need to set up a resolution of `react-is` package to the same version as the `react` you are using.

For example, if you are using `react@18.3.1`, do the following steps:

1. Install `react-is@18.3.1`.

<codeblock storageKey="package-manager">

```bash npm
npm install react-is@18.3.1
```

```bash pnpm
pnpm add react-is@18.3.1
```

```bash yarn
yarn add react-is@18.3.1
```

</codeblock>

2. Set the resolutions or overrides in the `package.json`.

<codeblock storageKey="package-manager">

```json npm
{
  …
  "overrides": {
    "react-is": "^18.3.1"
  }
}
```

```json pnpm
{
  …
  "overrides": {
    "react-is": "^18.3.1"
  }
}
```

```json yarn
{
  …
  "resolutions": {
    "react-is": "^18.3.1"
  }
}
```

</codeblock>

#### Why is this needed?

Material UI uses `react-is@19`, which changed how React elements are identified.

If you're on React 18 or below, mismatched versions of `react-is` can cause runtime errors in prop type checks.
Forcing `react-is` to match your React version prevents these errors.

## With styled-components

Material UI uses [Emotion](https://emotion.sh/docs/introduction) as its default styling engine.
If you want to use [styled-components](https://styled-components.com/) instead, run one of the following commands:

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/material @mui/styled-engine-sc styled-components
```

```bash pnpm
pnpm add @mui/material @mui/styled-engine-sc styled-components
```

```bash yarn
yarn add @mui/material @mui/styled-engine-sc styled-components
```

</codeblock>

Next, follow the [styled-components how-to guide](/material-ui/integrations/styled-components/) to properly configure your bundler to support `@mui/styled-engine-sc`.

:::error
As of late 2021, [styled-components](https://github.com/styled-components/styled-components) is **not compatible** with server-rendered Material UI projects.
This is because `babel-plugin-styled-components` isn't able to work with the `styled()` utility inside `@mui` packages.
See [this GitHub issue](https://github.com/mui/material-ui/issues/29742) for more details.

We **strongly recommend** using Emotion for SSR projects.
:::

## Roboto font

Material UI uses the [Roboto](https://fonts.google.com/specimen/Roboto) font by default.
Add it to your project via Fontsource, or with the Google Fonts CDN.

<codeblock storageKey="package-manager">

```bash npm
npm install @fontsource/roboto
```

```bash pnpm
pnpm add @fontsource/roboto
```

```bash yarn
yarn add @fontsource/roboto
```

</codeblock>

Then you can import it in your entry point like this:

```tsx
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

:::info
Fontsource can be configured to load specific subsets, weights and styles. Material UI's default typography configuration relies only on the 300, 400, 500, and 700 font weights.
:::

### Google Web Fonts

To install Roboto through the Google Web Fonts CDN, add the following code inside your project's `<head />` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>
```

## Icons

To use the [font Icon component](/material-ui/icons/#icon-font-icons) or the prebuilt SVG Material Icons (such as those found in the [icon demos](/material-ui/icons/)), you must first install the [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) font.
You can do so with npm, or with the Google Web Fonts CDN.

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/icons-material
```

```bash pnpm
pnpm add @mui/icons-material
```

```bash yarn
yarn add @mui/icons-material
```

</codeblock>

### Google Web Fonts

To install the Material Icons font in your project using the Google Web Fonts CDN, add the following code snippet inside your project's `<head />` tag:

To use the font `Icon` component, you must first add the [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) font.
Here are [some instructions](/material-ui/icons/#icon-font-icons)
on how to do so.
For instance, via Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

## CDN

You can start using Material UI right away with minimal front-end infrastructure by installing it via CDN, which is a great option for rapid prototyping.

<!-- #target-branch-reference -->

Follow [this CDN example](https://github.com/mui/material-ui/tree/master/examples/material-ui-via-cdn) to get started.

:::error
We do _not_ recommend using this approach in production.
It requires the client to download the entire library—regardless of which components are actually used—which negatively impacts performance and bandwidth utilization.
:::
