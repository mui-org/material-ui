# Material UI Sync plugin 🧪

<p class="description">Sync is a Figma plugin that generates Material UI themes directly from design to code.</p>

:::error
Development on the Material UI Sync plugin was suspended in 2024.
You should not expect updates on this project in the future.
:::

## Introduction

[Material UI Sync](https://www.figma.com/community/plugin/1336346114713490235/material-ui-sync) is a Figma plugin that lets you generate a theme from the [Material UI for Figma Design Kit](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x).

<img src="/static/material-ui/design-resources/sync.png" style="width: 814px;" alt="Customizing the Material UI Switch component in Figma with the Sync plugin running." width="1628" height="400" />

Sync works in combination with the [Material UI for Figma Design Kit v5.16.0](https://github.com/mui/mui-design-kits/releases) and later.

## Running the plugin

If you don't have the [complete and latest version](/store/items/figma-react/) of the Material UI for Figma Design Kit installed, you can test the plugin by using the [Community version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x) instead.

After installing and opening it in Figma, head over to the [Material UI Sync plugin page](https://www.figma.com/community/plugin/1336346114713490235/material-ui-sync) on the Community tab and click on **Open in…** and select the Material UI for Figma Design Kit.

<img src="/static/material-ui/design-resources/sync-access.png" style="width: 814px;" alt="Accessing Material UI Sync via the Resources menu in Figma." width="1628" height="400" />

## Customizing design tokens

Design tokens are defined in the Design Kit's [local variable collections](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections) and include color palettes, breakpoints, shapes, and spacing tokens.
Typography and shadow-related tokens are found in the [local styles collection](https://help.figma.com/hc/en-us/articles/360039820134-Manage-and-share-styles#:~:text=Local%20styles%20are%20styles%20that,or%20from%20the%20style%20picker.).

### Altering existing tokens

The Design Kit comes fully loaded with design tokens that map out to the [default theme of the Material UI React library](/material-ui/customization/default-theme/).

To customize existing tokens, open the [local variable modal](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections) by clicking on the filter icon as shown below.
Tweak any of the variables available in the collections (such as palettes, breakpoints, shapes, and spacing) as you see fit.

<img src="/static/material-ui/design-resources/sync-variables.png" style="width: 814px; margin-bottom: 8px;" alt="The Local variables menu in Figma, where all design tokens are stored and new ones can be added." width="1628" height="400" />

Then open the Material UI Sync plugin and click on **Generate theme**.

<img src="/static/material-ui/design-resources/sync-generate.png" style="width: 814px; margin-bottom: 8px;" alt="The Generate theme button in the Material UI Sync plugin UI." width="1628" height="400" />

A theme containing the altered tokens is generated and displayed in the plugin's Theme tab.

<img src="/static/material-ui/design-resources/sync-code-editor.png" style="width: 814px; margin-bottom: 8px;" alt="The generated theme displayed in the Material UI Sync plugin UI." width="1628" height="400" />

You can also preview the generated theme and the customized tokens by navigating to the Storybook preview tab.

<img src="/static/material-ui/design-resources/sync-storybook.png" style="width: 814px" alt="The generated theme previewed in Storybook in the Material UI Sync plugin UI." width="1628" height="400" />

### Adding new tokens

You can extend the existing tokens set with your own either by adding new variables to the existing local variable collections, or by adding new elevation and typography styles to the local style collections.
After you've added your custom tokens, click on **Regenerate theme** to include these tokens in your theme.

<img src="/static/material-ui/design-resources/sync-regenerate.png" style="width: 814px" alt="The Regenerate button in the Connect plugin UI." width="1628" height="400" />

## Customizing components

:::warning
This feature is experimental and limited to the **Button**, **Switch**, and **Typography** components.
:::

The Sync plugin can also generate theme styles for customized components, enabling you to completely change their look and feel and create your custom design system from within Figma.

As an example, here's how to customize the checked state, medium size, and primary color of a Switch component to replicate the iOS look and feel:

<img src="/static/material-ui/design-resources/sync-component-variant.png" style="width: 814px; margin-bottom: 8px;" alt="A specific variant of the Switch component selected in the Design Kit." width="1628" height="400" />

:::warning
The Design Kit's component layer hierarchy and layer names must remain unaltered for Sync to correctly extract custom component styles and generate the theme.
:::

The Sync plugin generates the following theme code for the customized Switch:

```js
{
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '&.MuiSwitch-sizeMedium:has(.MuiSwitch-colorPrimary)': {
            '&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))':
              {
                width: '40px',
                height: '21px',
                padding: '0',
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(19px) translateY(2px)',
                  padding: '0',
                  '& .MuiSwitch-thumb': {
                    width: '17px',
                    height: '17px',
                    background: '#FAFAFA',
                  },
                  '& + .MuiSwitch-track': {
                    width: '38px',
                    height: '21px',
                    background: 'var(--mui-palette-success-light)',
                    opacity: '1',
                  },
                },
              },
          },
        },
      },
    },
  },
}
```

The generated theme targets classes that correspond to the specific Switch configuration defined above, so styles are only applied when the props and state of the Material UI component match those of the customized Figma component.

To customize other states, you need to apply the desired design changes to each variant in Figma by following these steps:

1. Customize a single "base" variant—for example, a Switch component in the checked state, of medium size, and primary color.
2. Clone this variant and rename it to target the next variant you'd like to customize—for example, rename the cloned version of `Checked=True, Size=Medium, Color=Primary, State=Enabled` to `Checked=False, Size=Medium, Color=Primary, State=Enabled`.
3. Delete the old versions of the same variant.
4. Move the new version to the correct square in the variant grid.
5. Make the necessary style adjustments to the variant's child layers.

Repeat this process for each variant you want to customize.
Here's an example of what this might look like:

<img src="/static/material-ui/design-resources/sync-switch-component-customized.png" style="width: 814px; margin-bottom: 8px;" alt="A fully customized Switch component in the Material UI Design Kit." width="1628" height="400" />

From here you can run Sync to generate a new theme—here's what would be generated from the example above:

```js
{
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '&.MuiSwitch-sizeMedium:has(.MuiSwitch-colorPrimary)': {
            width: '40px',
            height: '21px',
            padding: '0',
            '& .MuiSwitch-switchBase': {
              padding: '0',
              '& .MuiSwitch-thumb': {
                width: '17px',
                height: '17px',
                background: '#FAFAFA',
              },
              '& + .MuiSwitch-track': {
                width: '38px',
                height: '21px',
                borderRadius: '100px',
                opacity: '1',
              },
            },
            '&:not(:has(.Mui-checked)):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))': {
              '& .MuiSwitch-switchBase': {
                transform: 'translateX(3px) translateY(2px)',
                '& + .MuiSwitch-track': {
                  background: '#BDBDBD',
                },
              },
            },
            '&:not(:has(.Mui-checked)):has(.Mui-disabled):not(:has(.Mui-focusVisible))': {
              '& .MuiSwitch-switchBase': {
                transform: 'translateX(3px) translateY(2px)',
                '& + .MuiSwitch-track': {
                  background: 'rgba(229, 229, 229, 0.99)',
                },
              },
            },
            '&:not(:has(.Mui-checked)):not(:has(.Mui-disabled)):has(.Mui-focusVisible)': {
              '& .MuiSwitch-switchBase': {
                transform: 'translateX(3px) translateY(2px)',
                '& + .MuiSwitch-track': {
                  border: '1px solid #000',
                  background: '#BDBDBD',
                },
              },
            },
            '&:has(.Mui-checked):has(.Mui-disabled):not(:has(.Mui-focusVisible))': {
              '& .MuiSwitch-switchBase': {
                transform: 'translateX(19px) translateY(2px)',
                '& + .MuiSwitch-track': {
                  background: 'rgba(187, 231, 188, 0.99)',
                },
              },
            },
            '&:not(:has(.Mui-checked)):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible)):hover': {
              '& .MuiSwitch-switchBase': {
                transform: 'translateX(3px) translateY(2px)',
                '& + .MuiSwitch-track': {
                  background: '#616161',
                },
              },
            },
            '&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))': {
              '& .MuiSwitch-switchBase': {
                transform: 'translateX(19px) translateY(2px)',
                '& + .MuiSwitch-track': {
                  background: 'var(--mui-palette-success-light)',
                },
              },
            },
            '&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible)):hover': {
              '& .MuiSwitch-switchBase': {
                transform: 'translateX(19px) translateY(2px)',
                '& + .MuiSwitch-track': {
                  background: 'var(--mui-palette-success-dark)',
                },
              },
            },
            '&:has(.Mui-checked):not(:has(.Mui-disabled)):has(.Mui-focusVisible)': {
              '& .MuiSwitch-switchBase': {
                transform: 'translateX(19px) translateY(2px)',
                '& + .MuiSwitch-track': {
                  border: '1px solid #000',
                  background: 'var(--mui-palette-success-light)',
                },
              },
            },
          },
        },
      },
    },
  },
}
```

:::info
The generated theme may contain the CSS `has()` selector, which is used to target specific child classes.
This selector is not used by other theme-related examples in the docs because it used to have limited browser support.
It is now [supported by all modern browsers](https://caniuse.com/css-has).
:::

You can also check out the Storybook preview to test the Material UI version of your component.

<img src="/static/material-ui/design-resources/sync-switch-component-customized-storybook.png" style="width: 814px" alt="A fully customized Switch component in Storybook." width="1628" height="400" />

## Using the generated theme

Here's an example of how to add a Sync-generated theme to your codebase:

```tsx title="_app.tsx"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  shape: {
    borderRadiusRound: 999,
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '&.MuiSwitch-sizeMedium:has(.MuiSwitch-colorPrimary)': {
            '&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))':
              {
                width: '40px',
                height: '21px',
                padding: '0',
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(19px) translateY(2px)',
                  padding: '0',
                  '& .MuiSwitch-thumb': {
                    width: '17px',
                    height: '17px',
                    background: '#FAFAFA',
                  },
                  '& + .MuiSwitch-track': {
                    width: '38px',
                    height: '21px',
                    background: 'var(--mui-palette-success-light)',
                    borderRadius: 'var(--mui-shape-borderRadiusRound)',
                    opacity: '1',
                  },
                },
              },
          },
        },
      },
    },
  },
});

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

## Feedback and bug reports

If you've got any feedback, we'd love to [hear from you](https://github.com/mui/mui-design-kits/discussions/84).
