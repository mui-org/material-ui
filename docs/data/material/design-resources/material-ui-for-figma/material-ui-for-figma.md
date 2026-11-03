# Material UI for Figma

<p class="description">Enhance designer-developer collaboration between Material UI and Figma.</p>

## Getting started

Material UI for Figma consists of representations of the library's React components in Figma so designers and developers can communicate and iterate more efficiently.
This Design Kit includes:

- components with the same design as Material UI
- additional components and features not covered by Material Design
- shared terminology from the React library for props, variables, design tokens, and other values

### Community vs. full version

The Material UI design kit is available in the [community (free) version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x) and the [full (paid) version](https://mui.com/store/items/figma-react/).

|                                   | Community | Full version |
| :-------------------------------- | --------: | -----------: |
| Components without customizations |       All |          All |
| Components with customizations    |         4 |          All |
| Figma variables                   |         - |           ✅ |

### Installing the full version

Start by extracting the `.zip` archive which contains the `.fig` files.
Then you can either follow [Figma's import guide](https://help.figma.com/hc/en-us/articles/360041003114-Import-files-to-the-file-browser) or [add it to your team library](https://help.figma.com/hc/en-us/articles/360041051154-Guide-to-libraries-in-Figma).

### Changelog

Visit [the Releases tab on GitHub](https://github.com/mui/mui-design-kits/releases?q=figma&expanded=true) to keep track of new design kit versions.

## Theme

### Local variables

The design kit uses Figma's local variables to create a collection of styles comparable to the theme structure of Material UI code.
Follow the steps in the video below to see all the variables available:

<iframe height="490" style="aspect-ratio: 16 / 9; width: 100% !important; border: 0" src="https://www.youtube.com/embed/u3zR6p-OjKQ?si=DDVEsedwmJQeik3T" title="YouTube video player" allowfullscreen></iframe>

### Customizing colors

Use the variables panel to customize colors as shown in the video below:

<iframe height="490" style="aspect-ratio: 16 / 9; width: 100% !important; border: 0" src="https://www.youtube.com/embed/YuzkWFm0-bA?si=XvgPR0vNGtiBPqKY" title="YouTube video player" allowfullscreen></iframe>

### Customizing typography

Typography customization uses local styles rather than local variables.
The experience is similar to modifying colors, as shown in the video below:

<iframe height="490" style="aspect-ratio: 16 / 9; width: 100% !important; border: 0" src="https://www.youtube.com/embed/HepVDfrLmak?si=gklG_3ZZyxDWzlPM" title="YouTube video player" allowfullscreen></iframe>

### Switching between light and dark modes

The design kit uses Figma's local variables to let you toggle the variable mode between light and dark, as shown in the video below:

<iframe height="490" style="aspect-ratio: 16 / 9; width: 100% !important; border: 0" src="https://www.youtube.com/embed/ydTF1HhLnJM?si=1Fj4CFLgVavfg4Fz" title="YouTube video player" allowfullscreen></iframe>

## Components

### Editing the main components

You can use the [Similayer](https://www.figma.com/community/plugin/735733267883397781/similayer) plugin to select multiple components at once that share some property.

<iframe height="490" style="aspect-ratio: 16 / 9; width: 100% !important; border: 0" src="https://www.youtube.com/embed/eHBk0FbS0P8?si=QbOiMU2F1yvGB6s8" title="YouTube video player" allowfullscreen></iframe>

### Table component

#### Adding new columns

The video below shows how to add new columns by detaching cells from their row components, allowing you to freely move content around.

<iframe src="https://www.loom.com/embed/6dd71cc374bc4d84af35ebb75d107d38?sid=1d3a4790-4c28-433e-94ce-97dd969601dd" title="Adding new columns by detaching cells from row components" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width: 100%; height: 500px; border: 0"></iframe>

#### Adding new columns in the main component

The Table and Data Grid components come with a limited number of columns by default.
The video below shows how to add new columns by copying cells directly on the main component:

<iframe height="490" style="aspect-ratio: 16 / 9; width: 100% !important; border: 0" src="https://www.youtube.com/embed/s_n3LHm1daI?si=_QbXvtYPkc8EBd5d" title="YouTube video player" allowfullscreen></iframe>

## Code sync (beta)

You can export theme tokens and component customizations to code using [the Sync plugin for Figma](/material-ui/design-resources/material-ui-sync/).
The Design Kit has been built to be as close to the React components as possible, making it for a fluid integration with code.

Learn more about the Material UI theme structure by visiting the [Theming](/material-ui/customization/theming/) and [Default theme viewer](/material-ui/customization/theming/) pages.

## Using new design kit versions

We generally don't release breaking changes in the updates—we add new content instead.
If you need to replace a single component that's been updated, there are a couple of options:

1. Add the new version of the design kit as a library and use [the new Figma library swap feature](https://www.youtube.com/watch?v=GQ2jztKpxLk). The components must have the same names in both libraries.
2. Observe the new component and re-apply the changes to the existing projects. This is the recommended approach when you need to update multiple projects.
3. Copy and paste the new component into your existing project, give it a different temporary name, then re-link tokens to the new component. When using [Select Similar plugins](https://www.figma.com/community/plugin/792767780551514994/select-similar) this shouldn't take more than five minutes. Then you can remove the old component and update the new component name.

## Feedback and bug reports

If you've got any feedback, we'd love to [hear from you](https://github.com/mui/mui-design-kits/discussions/84).

## Integrations

### Anima

With Anima, you can effortlessly transform your Figma designs into Material UI code.
Anima intelligently matches your design components in Figma to the most relevant code API, ensuring that the code generated is clean, reusable, and production-ready.
Anima supports both Figma and VS Code, so you can choose the workflow that suits you best.

- Use the [Anima Figma Plugin](https://www.figma.com/community/plugin/857346721138427857/anima-figma-to-code-react-html-css-tailwind-mui-devmode-inspect-react-html-vue-css) to convert your designs directly in Figma.
- Use the [Anima VS Code Extension (Frontier)](https://marketplace.visualstudio.com/items?itemName=AnimaApp.vscode-anima) to seamlessly generate and edit Material UI code in your development environment.

Visit [Anima](https://www.animaapp.com/) for more details.

### Quest

[Quest](https://www.quest.ai/) provides a native integration with this design kit.

When you design your components with the kit, you can use [Quest plugin](https://www.figma.com/community/plugin/862039267149408972/figma-to-react-from-quest) to convert your Figma designs into Material UI code.
The code generated should be clean and production-ready.

Visit the [Quest documentation](https://docs.quest.ai/quest-docs) for more details.
