# Installation

<p class="description">Install MUI System, a collection of CSS utilities for rapidly laying out custom designs.</p>

## Default installation

Run one of the following commands to add MUI System to your project:

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/system @emotion/react @emotion/styled
```

```bash pnpm
pnpm add @mui/system @emotion/react @emotion/styled
```

```bash yarn
yarn add @mui/system @emotion/react @emotion/styled
```

</codeblock>

### Peer dependencies

<!-- #react-peer-version -->

Please note that [react](https://www.npmjs.com/package/react) is a peer dependency, meaning you should ensure it is installed before installing MUI System.

```json
"peerDependencies": {
  "react": "^17.0.0 || ^18.0.0 || ^19.0.0"
},
```

## With styled-components

MUI System uses [Emotion](https://emotion.sh/docs/introduction) as its default styling engine.
If you want to use [styled-components](https://styled-components.com/) instead, run one of the following commands:

<!-- #npm-tag-reference -->

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/system@next @mui/styled-engine-sc@next styled-components
```

```bash pnpm
pnpm add @mui/system@next @mui/styled-engine-sc@next styled-components
```

```bash yarn
yarn add @mui/system@next @mui/styled-engine-sc@next styled-components
```

</codeblock>

:::error
As of late 2021, [styled-components](https://github.com/styled-components/styled-components) is **not compatible** with server-rendered Material UI projects.
This is because `babel-plugin-styled-components` isn't able to work with the `styled()` utility inside `@mui` packages.
See [this GitHub issue](https://github.com/mui/material-ui/issues/29742) for more details.

We **strongly recommend** using Emotion for SSR projects.
:::
