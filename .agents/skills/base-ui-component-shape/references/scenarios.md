# Scenarios

Every option renders the same scenarios. Three categories must be present; the author can add more.

## 1. Basics

Take the basics from Base UI's own examples for the component: every demo in `docs/node_modules/@base-ui/react/docs/react/components/<kebab-name>.md` becomes one scenario, rewritten with Material UI parts.
They show that each option covers what Base UI supports out of the box.

## 2. Theming with `styleOverrides`

Write three themes and apply each to the basic scenario. Each theme uses `styleOverrides` (and `variants` where they help) on the `Mui<Name><Part>` keys that the option exposes:

1. **Material Design**: the component as the Material Design guidelines describe it, including details the defaults may not cover (density, elevation, motion).
2. **Simple adjustment**: a brand tweak, such as a primary color, a border radius, and spacing.
3. **Opposite design**: a visual language far from Material Design, such as a flat, borderless, high-density desktop style.

An option whose parts have no theme key for a piece the design needs to restyle shows it here: record what the theme could not reach.

## 3. Real-world compositions

Find how products and design systems use this kind of component, then turn the findings into scenarios.

At the start of this step, spawn the research agents below in parallel, one per brief, each on a small, fast model (for example `model: "haiku"` with the Agent tool). If your environment cannot spawn agents, run the briefs yourself one after another.

Each brief uses this template, with `<pattern>` replaced by a plain description of the component (for example "a menu bar with dropdown menus, as in desktop apps"):

```text
Research how <pattern> is used in real products. Read-only: browse and search, never post or sign in.
Angle: <angle>
Return 5 to 8 scenarios. For each: one sentence describing the UI, the source URL, what renders inside it (text, icons, forms, other components), what opens or triggers it, and any custom element the product uses (its own button, a router link, an avatar). Mark anything you could not confirm.
```

Angles, one agent each:

1. Product UIs: GitHub, Linear, Notion, Figma, Gmail, Slack, VS Code, Google Docs.
2. Design system docs: Material Design 3, Atlassian, Carbon, Fluent, Polaris, Primer, Radix Themes, shadcn/ui.
3. User questions: `mui/material-ui` and `mui/base-ui` issues and discussions (with `gh`), and Stack Overflow, about building this UI with the closest existing component.
4. This repo: the templates in `docs/data/material/getting-started/templates/` and the docs demos that use the closest existing component.

From the results, pick at least four composition scenarios:

- At least one inside other Material UI components (an `AppBar`, a `Dialog`, a `Table` cell, a form, next to a `Tooltip`).
- At least one with the user's own components: a custom trigger, a router `Link`, a brand card or avatar inside the popup.

Write a stand-in for each user component in `user-components.tsx` (see [prototype.md](prototype.md)), so scenarios do not depend on outside packages.
