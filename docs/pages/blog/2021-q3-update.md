---
title: Q3 2021 Update
description: An update on our mission for Q3 2021.
date: 2021-10-26T00:00:00.000Z
authors: ['oliviertassinari']
tags: ['Company']
manualCard: true
---

This update covers our progress over the last three months.
It also covers what we aim to achieve in the months ahead.

## Overview

- [Product](#product)
  - [MUI Core](#mui-core)
  - [MUI X](#mui-x)
  - [Design Kits](#design-kits)
- [Company](#company)
- [Our roadmap intent for Q4 2021](#our-roadmap-intent-for-q4-2021)

## Product

Here are the most significant improvements since early July 2021.

### MUI Core

- 🔥 In September we released a new major version: [v5.0.0](https://github.com/mui/material-ui/releases/tag/v5.0.0) (you might have noticed! 😄 ).
  We're excited about what it means for the future of the library, and we hope you are going to enjoy the simplified customization, the extra flexibility, new components, and more.
  It took us over a year to pull off, with an almost exclusive focus on v5 over v4.
  You can read more about it in the [release blog post](/blog/mui-core-v5/).
- ✨ We also introduced a brand new [product page](/core/) this quarter to better present what the Core is about.
- 🔎 We've reworked the search experience in the docs:
  - The component pages now rank before the API pages.
  - Instead of only displaying up to 5 results, you can scroll for more results.
  - An icon illustrates the nature of the match; either a page, a header, or a paragraph.
  - Your most recent searches are saved in local storage.

  <img loading="lazy" src="/static/blog/2021-q3-update/old-search.png" alt="" width="1192" height="936" style="width: 596px;" />

  <p class="blog-description">Before</p>

  <img loading="lazy" src="/static/blog/2021-q3-update/new-search.png" alt="" width="1200" height="920" style="width: 600px; margin-top: 32px;" />

  <p class="blog-description">After</p>

- [Masonry](https://v5.mui.com/material-ui/react-masonry/). We introduced a new component for use when the `Grid` component leads to wasted space. It's frequently used in dashboards.

  <a href="/material-ui/react-masonry/"><img loading="lazy" src="/static/blog/2021-q3-update/masonry.png" style="width: 700px;" width="1400" height="906" alt="react-masonry" /></a>

- We introduced a new [package of components without styles](https://www.npmjs.com/package/@mui/base), laying the foundations for supporting multiple design systems with headless components.
  While it was tough to balance the time between working on v5 stable and developing the unstyled components, we still managed to introduce the first few:
  - [Autocomplete](https://v5.mui.com/material-ui/react-autocomplete/#useautocomplete)

  ```jsx
  import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
  ```

  - [Button](https://v5.mui.com/material-ui/react-button/#unstyled)

  ```jsx
  import { useButton } from '@mui/base/ButtonUnstyled';
  ```

  - [Modal](https://v5.mui.com/material-ui/react-modal/#unstyled)

  ```jsx
  import { ModalUnstyled } from '@mui/base/ModalUnstyled';
  ```

  - [Slider](https://v5.mui.com/material-ui/react-slider/#unstyled)

  ```jsx
  import { SliderUnstyled } from '@mui/base/SliderUnstyled';
  ```

  - [Switch](https://v5.mui.com/material-ui/react-switch/#unstyled)

  ```jsx
  import { useSwitch } from '@mui/base/SwitchUnstyled';
  ```

  - [Portal](https://v5.mui.com/material-ui/react-portal/#unstyled)

  ```jsx
  import { Portal } from '@mui/base/Portal';
  ```

  - [FocusTrap](https://v6.mui.com/base-ui/react-focus-trap/)

  ```jsx
  import { FocusTrap } from '@mui/base/FocusTrap';
  ```

### MUI X

Last quarter we focused on the data grid components, working towards a stable release.
We also introduced a brand new [product page](/x/) this quarter to better present what MUI X is about.

#### Date Picker

The date picker sits at the border between the core component and advanced components.

- ❌ A few updates but no major ones worth sharing.
  With the release of v5 stable and our focus on the data grid, nobody in the team had the bandwidth to work on it.

#### Data Grid

- 🎉 We released the first stable version: [v4.0.0](https://github.com/mui/mui-x/releases/tag/v4.0.0)!
  We also released the first v5-beta, to support MUI Core v5,
  and will be working almost exclusively on the v5 release line going forward.
- 🔎 We also added a [quick-filter demo](/x/react-data-grid/filtering/quick-filter/) to illustrate how it can be implemented,
  and will add a [built-in](https://github.com/mui/mui-x/issues/202) solution later on.

  <a href="/x/react-data-grid/filtering/quick-filter/"><img loading="lazy" src="/static/blog/2021-q3-update/quick-filter.png" width="1508" height="542" alt="react-data-grid-quick-filter" /></a>

- 🐛 We fixed several non-idiomatic React patterns, for instance we were not handling controllable props by the book, and as we do in MUI Core.
- 🚀 We introduced the [row editing](/x/react-data-grid/editing/#row-editing) feature.

  <video autoplay muted loop playsinline width="1702" height="764">
    <source src="/static/blog/2021-q3-update/row-edit.mp4" type="video/mp4" />
  </video>

- 🦺 We added a [`disableVirtualization`](/x/react-data-grid/virtualization/#disable-virtualization) prop to make it easier to test the data grid without a real browser environment, for example in jsdom with Jest.
- 🚛 We have added an `onViewportRowsChange` prop as a first step toward being able to lazy load a large dataset.
- Last but not least, we have resumed the work on [key missing features](https://github.com/mui/mui-x/issues?q=is%3Aopen+label%3A%22linked+in+docs%22+sort%3Areactions-%2B1-desc).
  Print export and tree data are in the pipeline.

### Design Kits

We introduced a brand new [product page](/design-kits/) this quarter to better present the design kits.

#### Figma

The kit is now up-to-date with MUI Core v5,
and also includes the MUI X components. And, as always, we have been refining it in small areas for issues raised by our users in the support channel.

#### Adobe XD

No updates.

#### Sketch

No updates.

## Company

### Retreat

We held our first company retreat 🏝 in Lisbon, Portugal 🇵🇹 ,
for members of the team that were not prevented by COVID-19 related travel restrictions, and who felt safe enough to travel.
Less than half the company made it, but it was still fun!
We spent half the time doing a [Hackathon](https://x.com/olivtassinari/status/1441773885259583491) and the other half on activities (surfing, biking, winery tour, and sightseeing).

<img loading="lazy" src="/static/blog/2021-q3-update/retreat.jpeg" alt="" width="1613" height="1210" />

<p class="blog-description">Sightseeing in Lisbon</p>

### Growth between Q2 2021 and Q3 2021

- 📦 From 9.1M to 9.9M downloads per month on npm. We have 22.4% market share of the React ecosystem as a proportion of `react-dom` downloads.
- ⭐️ From 69.1k to 72.1k stars. [Leave us yours 🌟](https://github.com/mui/material-ui)!
- 👨‍👩‍👧‍👦 From 2,223 to 2,316 contributors on GitHub. On average, one new contributor joins every day.
- 💰 Grew financial support by 2.99X [year over year](/blog/2020-q3-update/).

### New member

We welcomed one new member to the company this quarter 🏢:

- Benny was our first intern, and is now the first junior developer on the MUI Core team.

  <img loading="lazy" src="/static/blog/2021-q3-update/benny.jpg" alt="Benny" style="width: 160px; height: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

We are now 11 passionate builders empowering the next generation of UI creators.

### A new brand

Alongside the release of v5, we launched our [new brand](/blog/material-ui-is-now-mui/)!
We're excited about our new shorter name, **MUI**.
We were already using it in the class names (`.MuiButton-root`), which embodies our next step beyond Material Design.

This is something we have been considering for some time,
and we did a couple of early design studies with an outside agency,
but it was only after we secured [mui.com](https://mui.com/), the GitHub [`@mui`](https://www.npmjs.com/org/mui) org, and the npm [@mui](https://www.npmjs.com/org/mui) scope that we knew the new name would work.

## Our roadmap intent for Q4 2021

We'll do our best, no guarantee!

### MUI Core

- 🚀 We will double down on v5 before starting to solve new large problems, for example a revamp of the select.
  We have made bold changes in this version since v4, but until recently, only a small percentage of the community was using v5.
  In the last few weeks, we have seen a strong influx of feedback from the community.
  We need to make the most of this feedback to solve regressions, improve the documentation for the new APIs, adjust the tradeoffs we took in the light of more information, and more.
  [15%](https://npm-stat.com/charts.html?package=%40material-ui%2Fcore&package=%40mui%2Fmaterial&from=2020-10-25&to=2021-10-15) of the community has migrated, so far.
- 🦴 Migrate more components to `@mui/base`. [Michał](https://github.com/michaldudak) has recently added support for the [Button](https://v6.mui.com/base-ui/react-button/).
  You can follow our progress in the [umbrella issue](https://github.com/mui/base-ui/issues/10).
- 🎨 We are [exploring](https://github.com/mui/material-ui/discussions/29024) the introduction of CSS variables.
  Since v5, Material UI is no longer actively supporting IE 11. Dropping this browser requirement unlocks new capabilities of the web platform.
- 🌈 Resume work on the second design system.
  Some users (and potential users) dislike Material Design. We'll try to make the second design system one that they love! You can check our [first RFC](https://github.com/mui/material-ui/discussions/29024).
- 🗓 Execute on all of the items in the [public roadmap](https://github.com/orgs/mui/projects/23/views/12).
- ❓ Please upvote [GitHub issues](https://github.com/mui/material-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### MUI X

#### Data Grid

We have planned to:

- ✨ Release the print export feature.
- ✨ Release the tree data feature.
- ✨ Revamp the virtualization to yield better rendering performance and fix bugs.
  It unlocks new features like column pinning and lazy loading.
- 🗓 Execute on all of the items in the [public roadmap](https://github.com/orgs/mui/projects/35).
- ❓ Please upvote [GitHub issues](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

#### Date Picker

No plans. We probably won't progress its development this quarter.

However, we are growing the team.
We plan to resume work on it in Q1 2022, starting with the equivalent of one full-time developer.

### Design Kits

We will release a v5 for Sketch and Adobe XD, as we have already done for Figma.
While the visual difference between MUI Core v4 and v5 is not major, we still need to sync the design components.

### Company

We have the following objectives:

- 📊 Run a new edition of the Developer Survey. The last one was done [15 months ago](https://mui.com/blog/2020-developer-survey-results/). Now that v5 is released, it's time for the 2021 edition!
- 👪 Hire for two new roles: a Product Manager to focus on low-code and our first Developer Advocate.
- 💫 Create a great onboarding experience for the 6-7 new hires of Q4.
