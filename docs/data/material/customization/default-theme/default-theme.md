# Default theme viewer

<p class="description">This tree view allows you to explore how the theme object looks like with the default values.</p>

If you want to learn more about how the theme is assembled, take a look at [`material-ui/style/createTheme.ts`](https://github.com/mui/material-ui/blob/-/packages/mui-material/src/styles/createTheme.ts),
and the related imports which `createTheme()` uses.

You can play with the documentation theme object in your browser console,
as the `theme` variable is exposed on all the documentation pages.

:::warning
Please note that **the documentation site is using a custom theme** (the MUI's organization branding).
:::

<hr/>

{{"component": "file://./demos/default-theme/index.ts", "hideToolbar": true, "bg": "inline"}}
