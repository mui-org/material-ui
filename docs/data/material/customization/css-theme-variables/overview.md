# CSS theme variables

<p class="description">An overview of adopting CSS theme variables in Material UI.</p>

[CSS variables](https://www.w3.org/TR/css-variables-1/) are a modern cross-browser feature that let you declare variables in CSS and reuse them in other properties.
You can implement them to improve Material UI's theming and customization experience.

:::info
If this is your first time encountering CSS variables, you should check out [the MDN Web Docs on CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) before continuing here.
:::

:::success
Use the [Material UI theming agent skill](https://github.com/mui/material-ui/tree/master/skills/material-ui-theming) to give your AI coding assistant full context on CSS theme variables, `theme.vars`, and SSR flicker prevention.
:::

## Introduction

CSS theme variables replace raw values in Material UI components for a better developer experience because, in the browser dev tool, you will see which theme token is used as a value.

In addition with these variables, you can inject a theme into your app's stylesheet _at build time_ to apply the user's selected settings before the whole app is rendered.

## Advantages

- It lets you prevent [dark-mode SSR flickering](https://github.com/mui/material-ui/issues/27651).
- You can create unlimited color schemes beyond `light` and `dark`.
- It offers a better debugging experience not only for developers but also designers on your team.
- The color scheme of your website is automatically synced between browser tabs.
- It simplifies integration with third-party tools because CSS theme variables are available globally.
- It reduces the need for a nested theme when you want to apply dark styles to a specific part of your application.

## Trade-offs

For server-side applications, there are some trade-offs to consider:

|                                                              | Compare to the default method | Reason                                                                                                         |
| :----------------------------------------------------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------- |
| HTML size                                                    | Bigger                        | CSS variables are generated for both light and dark mode at build time.                                        |
| [First Contentful Paint (FCP)](https://web.dev/articles/fcp) | Longer                        | Since the HTML size is bigger, the time to download the HTML before showing the content is a bit longer.       |
| [Time to Interactive (TTI)](https://web.dev/articles/tti)    | Shorter (for dark mode)       | Stylesheets are not regenerated between light and dark mode, a lot less time is spent running JavaScript code. |

:::warning
The comparison described in the table above may not be applicable to large and complex applications since there are so many factors that can impact performance metrics.
:::

## What's next

- To start a new project with CSS theme variables, check out the [basic usage guide](/material-ui/customization/css-theme-variables/usage/).
- For theming and customization, check out the [how-to guide](/material-ui/customization/css-theme-variables/configuration/).
