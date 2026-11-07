# Scenarios

The recommended shape renders every scenario, and each fork variant renders the scenarios it changes. Three categories must be present; the author can add more.

## 1. Basics

Take the basics from Base UI's own examples for the component: every demo in `docs/node_modules/@base-ui/react/docs/react/components/<kebab-name>.md` becomes one scenario, rewritten with Material UI parts. The same demo shown in several styling variants (Tailwind, CSS Modules) counts once.
They show that the shape covers what Base UI supports out of the box.

When the Base UI page has few demos, add the demos of the closest Material UI docs page (for a menubar, the menubar recipe and the `Menu` page), so the basics cover every kind of item the component supports.

## 2. Theming

Apply three themes, from no customization to a complete restyle. Apply each to the scenario with the deepest structure, such as an open submenu, so the theme has to reach nested parts:

1. **Material Design**: the default theme, with no customization (`createTheme()`).
2. **Brand**: customizes only the theme tokens: `palette`, `shape`, `typography`, and `shadows`. It shows how far the tokens alone carry the component.
3. **Opposite design**: everything in the brand theme, plus `components` entries (`styleOverrides`, `variants`, `defaultProps`) on the `Mui<Name><Part>` keys that the shape exposes, to reach a visual language far from Material Design, such as a flat, borderless, high-density desktop style.

A shape whose parts have no theme key for a piece the opposite design needs to restyle shows it here: record what the theme could not reach. A part that the theme cannot reach is a candidate fork.

## 3. Real-world compositions

Find how products and design systems use this kind of component, then turn the findings into scenarios.

At the start of this step, spawn the research agents below in parallel, one per brief, each on a small, fast model (for example `model: "haiku"` with the Agent tool). If your environment cannot spawn agents, run the briefs yourself one after another.

Each brief uses this template, with `<pattern>` replaced by a plain description of the component (for example "a menu bar with dropdown menus, as in desktop apps"):

```text
Research how <pattern> is used in real products. Read-only: browse and search, never post or sign in.
Angle: <angle>
Return 5 to 8 scenarios. For each: one sentence describing the UI, the source URL, what renders inside it (text, icons, forms, other components), what opens or triggers it, and any custom element the product uses (its own button, a router link, an avatar). Open every source URL you cite and confirm the scenario on that page; a search result snippet is not a source. Leave out any scenario you could not confirm.
```

Angles, one agent each:

1. Product UIs: GitHub, Linear, Notion, Figma, Gmail, Slack, VS Code, Google Docs.
2. Design system docs: Material Design 3, Atlassian, Carbon, Fluent, Polaris, Primer, Radix Themes, shadcn/ui.
3. User questions: `mui/material-ui` and `mui/base-ui` issues (with `gh search issues`), their GitHub discussions (with a web search limited to `github.com/mui/<repo>/discussions`), and Stack Overflow, about building this UI with the closest existing component.
4. This repo: the templates in `docs/data/material/getting-started/templates/` and the docs demos that use the closest existing component. For this angle, a repository path is the source.

From the results, pick at least four composition scenarios:

- At least one inside other Material UI components (an `AppBar`, a `Dialog`, a `Table` cell, a form, next to a `Tooltip`).
- At least one with the user's own components: a custom trigger, a router `Link`, a brand card or avatar inside the popup.
- When the component nests (a submenu inside a menu), at least one with custom content in the nested trigger: a badge or count, an avatar, or a disabled trigger with a `Tooltip` that explains why.

Write a stand-in for each user component in `user-components.tsx` (see [prototype.md](prototype.md)), so scenarios do not depend on outside packages.
