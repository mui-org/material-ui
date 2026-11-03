---
title: Q2 2021 Update
description: An update on our mission for Q2 2021.
date: 2021-07-12T00:00:00.000Z
authors: ['oliviertassinari', 'mbrookes']
tags: ['Company']
manualCard: true
---

This update covers our progress over the last three months.
It also covers what we aim to achieve in the months ahead.

## Overview

- [Product](#product)
  - [Core components](#core-components)
  - [Advanced components](#advanced-components)
  - [Design Kits](#design-kits)
- [Company](#company)
- [Our roadmap intent for Q3 2021](#our-roadmap-intent-for-q3-2021)

## Product

Here are the most significant improvements since March 2021.

### Core components

- 🔥 We've made enough progress to ship [v5.0.0-beta.0](https://github.com/mui/material-ui/releases/tag/v5.0.0-beta.0). Here are a few statistics to give an idea of the effort that went into it:
  - [12 months](/blog/2020-q2-update/#product) of dedicated focus.
    We stopped work on v4 early on to fully dedicate to v5.
  - 3,475 pull requests.
  - 5,092 commits (the extra commits came from the merge of [material-ui-pickers](https://github.com/mui/material-ui-pickers))
  - 398 new contributors.
  - The equivalent of four full-time developers working on it on average (core team + community).
  - 38 alpha releases, we release once a week.

- 👩‍🎤 We have rolled out the new **style engine** to all the components.
  The community provided invaluable assistance in completing this effort.
  In v5, we have standardized on the `styled()` API as the styling foundation we build on top of, and introduced the [the `sx` prop](https://mui.com/system/getting-started/the-sx-prop/) for one-off customizations.
  The `styled()` API is loved by the community, and implemented by a number of styling libraries: styled-components, emotion, stitches, goober, etc. It allows us to support them all with [adapters](https://mui.com/material-ui/integrations/styled-components/).

- ⚒️ We added a [codemod CLI](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod) and 17 transformations (so far) to automatically migrate codebases from v4 to v5.
  If you're not familiar with what a codemod is, check out [Effective Refactoring with Codemods by Edd Yerburgh](https://www.youtube.com/watch?v=H9qtLutnT_g).

- 💄 We have [updated the style of the Slider](https://mui.com/material-ui/react-slider/#sizes) to better match the Material Design guidelines, and kept a similar style as before under `size="small"`:

  <a href="https://mui.com/material-ui/react-slider/#sizes"><img loading="lazy" src="/static/blog/2021-q2-update/slider.png" alt="" style="width: 838px; margin-bottom: 16px;" /></a>

- ✨ The new style engine has unlocked problems on the `Grid` component that we couldn't solve before with JSS:

  We have added support for [row & column](https://mui.com/material-ui/react-grid/#row-column-spacing) spacing:

```jsx
<Grid container rowSpacing={1} columnSpacing={2} />
```

We have added support for [responsive values](https://mui.com/material-ui/react-grid/#responsive-values) on all the props:

```jsx
<Grid container spacing={{ xs: 2, md: 3 }} />
```

We have added support for a different [number of columns](https://mui.com/material-ui/react-grid/#columns) than 12:

```jsx
<Grid container columns={16}>
```

We have added an alternative implementation that uses [CSS grid](https://mui.com/material-ui/react-grid/#css-grid-layout):

```jsx
<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
  <Box gridColumn="span 8">
    <Item>xs=8</Item>
  </Box>
  <Box gridColumn="span 4">
    <Item>xs=4</Item>
  </Box>
  <Box gridColumn="span 4">
    <Item>xs=4</Item>
  </Box>
  <Box gridColumn="span 8">
    <Item>xs=8</Item>
  </Box>
</Box>
```

- 💄 We have improved the accessibility of the Link component:

  <a href="https://mui.com/material-ui/react-link/">
    <img loading="lazy" src="/static/blog/2021-q2-update/link.png" alt="" style="width: 129px; margin-bottom: 16px;" />
  </a>

  <p class="blog-description">The underline helps to differentiate links in sentences.</p>

### Advanced components

We have primarily focused on the data grid components, fixing a lot of bugs.

#### Date Picker

The date picker is at the border between the core component and advanced components realms.

- 🐛 We have fixed a couple of straightforward problems: visual bugs, use of the `components` prop for customizability, etc.
- ⚙️ We have continued to focus on addressing technical debt present in the picker components.

#### Data Grid

- 🚨 We have continued to work on breaking changes to reach a stable version.
  We think that the component is good enough for use in production (and many developers already are using it), but we want to get the public API right before committing to a stable release.
- ✍️ We have added support for the [cell edit mode](https://mui.com/x/react-data-grid/editing/).

  <video autoplay muted loop playsinline width="1684" height="782">
    <source src="/static/blog/2021-q2-update/cell-edit.mp4" type="video/mp4" />
  </video>

- 🐛 We have focused on fixing bugs and regressions to ensure early users have a great experience with the component.
  This was done instead of taking on ambitious new features.
  We want our users to be able to adopt new features as fast as we build them.
- 🔘 We have added support for a built-in [single select](/x/react-data-grid/column-definition/#column-types) column type:

  <img loading="lazy" src="/static/blog/2021-q2-update/single-select.png" alt="" style="width: 481px; margin-bottom: 16px;" />

  <p class="blog-description">the <a href="https://codesandbox.io/p/sandbox/material-demo-forked-iuyo5?file=/demo.js">CodeSandbox</a></p>

  and the **boolean** column type.

- 🚀 We have improved the performance.
  Client-side sorting and filtering are 2-3x faster on large data sets.
  We have improved the UX when scrolling.
  We have added memo logic on the render cell's parent, and worked on its effectiveness to reduce the re-rendering of custom cells.
  We have identified more opportunities to improve the performance that we will prioritize later.
- 📚 We have worked on providing more reference documentation. We are semi-automatically generating it from the TypeScript source definitions, with the descriptions.
  For instance, you can now find all the [properties available](/x/api/data-grid/grid-col-def/) of the `GridColDef`.
- ⚡️ We have fixed support for components that use portals, like Select and Autocomplete, in the cell editing mode.
- 🌏 We have accepted many new built-in locales (+15) from the community, after the introduction of [the feature](/x/react-data-grid/localization/#supported-locales) in Q1.

### Design Kits

#### Figma

Designers have a great sense of detail.
We have polished the kit, using all the feedback that we could get.
We have also introduced support for a [dark mode](https://www.figma.com/file/7M8OmZIv6WigOjbSV7Xxlg/2021-q2-update?node-id=4230%3A724)! We have worked on making the design kit close to the React components.
This reduces miscommunications between designers and developers.

#### Adobe XD

We have fixed performance issues and polished the kit.

#### Sketch

We have added support of a dark mode and polished the kit.

## Company

### OKRs

In the first quarter, we focused on introducing a [handbook](https://mui.com/blog/2021-q1-update/#handbook) to share our culture and to help solve the N(N-1)/2 communication channels problem that comes with a larger team.

This quarter, we took on a new initiative to help us solve three problems:

- create alignment on the goals
- improve how we measure success
- create space to take on larger initiatives, away from the day-to-day PR and issue management

After considering [different](https://basecamp.com/shapeup) [alternatives](https://coda.io/@shishir/rituals-for-hypergrowth-an-inside-look-at-how-youtube-scaled), we are going with the [OKR methodology](https://www.whatmatters.com/resources/google-okr-playbook/).

### Growth between Q1 2021 and Q2 2021

- 📦 From 8.6M to 9.1M downloads per month on npm. We have 21.03% of market share inside the React ecosystem, up from 6.68%, 5 years ago.
- ⭐️ From 67.2k to 69.1k stars. [Leave us yours 🌟](https://github.com/mui/material-ui)!
- 👨‍👩‍👧‍👦 From 2,141 to 2,223 contributors on GitHub. We add on average one new contributor every day.

### New members

We have welcomed four new members to the company 🏢:

- [Jun](/blog/siriwat-kunaporn-joining/), leads the implementation of a [second design system](https://github.com/mui/material-ui/issues/22485).

  <img loading="lazy" src="/static/blog/2021-q2-update/jun.jpg" alt="jun" style="width: 160px; height: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

- [Michał](/blog/michal-dudak-joining/) leads the initiative around the [unstyled components](https://github.com/mui/material-ui/issues/6218).

  <img loading="lazy" src="/static/blog/2021-q2-update/michal.jpg" alt="michal" style="width: 160px; height: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

- [Danilo](https://daniloleal.co/), a Lead Designer to raise our design game.

  <img loading="lazy" src="/static/blog/2021-q2-update/danilo.jpg" alt="danilo" style="width: 160px; height: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

- [Flavien](https://github.com/flaviendelangle), an engineer with previous experience building [design systems](https://habx.github.io/ui-core/) and a complex 2D JavaScript rendering engine. He's helping us take on bolder problems on the advanced components (X team), starting with the data grid.

  <img loading="lazy" src="/static/blog/2021-q2-update/flavien.jpg" alt="flavien" style="width: 160px; height: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

We are also **hiring** for various roles! If you're interested in joining us, check out our [jobs page](/careers/#open-roles).

## Our roadmap intent for Q3 2021

We'll do our best, no guarantee!

### Company

We have the following objectives:

- Continue to refine our processes and responsibilities to make sure we function well with over ten people in the company.
- Rebrand. We started this effort one year ago but, failed to execute on it.
  With [Danilo](https://github.com/danilo-leal) (design) and [Jun](https://github.com/siriwatknp) (code) in the team to own the effort, we can finally make it happen.
  We will take a step to distinguish ourselves from a strong association with Material Design.
- Open and fill [4 roles](/careers/#open-roles). We need to strengthen the X team (advanced components)
  We also want to initiate the development of a bold new product vertical.

### Core components

- 🚀 Get v5 stable out! At this point, v5-alpha has about [1%](https://npm-stat.com/charts.html?package=%40material-ui%2Fstyled-engine&package=%40material-ui%2Fcore&from=2020-06-22&to=2021-06-22) of the downloads of v4.
  It has a lot of accumulated value not being realized. We're aiming for 25% of the community to have migrated by the end of the quarter.
- ♨️ Fix the friction the community has during the upgrade to v5.
  We want to make the upgrade feel painless.
- ⚛️ Support [React 18](https://legacy.reactjs.org/blog/2021/06/08/the-plan-for-react-18.html). [Sebastian](https://github.com/eps1lon) is part of the React [Working Group](https://github.com/reactwg/react-18/discussions), focusing on making us ready ahead of time.
  We want our most demanding users to feel empowered by Material UI, not slowed down by a third-party library.
- 🦴 Migrate more components to `@mui/base`. [Michał](https://github.com/michaldudak) has recently added support for the [Switch](https://v6.mui.com/base-ui/react-switch/).
  You can follow our progress in the [umbrella issue](https://github.com/mui/base-ui/issues/10).
- 🌈 Do a proof of concept on supporting a second design system.
  Some of our users (and potential users) dislike Material Design. We will try to make the second design system one that they love!
- 🗓 Execute on all of the items in the [public roadmap](https://github.com/orgs/mui/projects/23/views/12).
- ❓ Please upvote [GitHub issues](https://github.com/mui/material-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Advanced components

- 🚀 Release the first stable version of the Data Grid.
- ✨ Resume work on the [key features](https://github.com/mui/mui-x/issues?q=is%3Aopen+label%3A%22linked+in+docs%22+sort%3Areactions-%2B1-desc), after a quarter focused on stability.
  It seems that the audience is adopting the data grid as fast as we can build it.
  For instance, we have one issue with over [1,000 upvotes](https://github.com/mui/mui-x/issues/204) 👍.
- 🗓 Execute on all of the items in the [public roadmap](https://github.com/orgs/mui/projects/35).
- ❓ Please upvote [GitHub issues](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Design Kits

- Handle designers' pain and bug reports to polish the products.
- Run a survey on thousands of customers to identify important improvement opportunities. Should we build plugins to more easily switch the token variables between design and code? Should we add more in context examples? Should we focus on inconsistencies? etc.
