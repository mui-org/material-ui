# Roadmap

<p class="description">The roadmap is a living document, and it is likely that priorities will change, but the list below should give some indication of our plans for the next major release, and for the future.</p>

## Methodology

Material-UI is community driven – issues that resonate most with the community get the most attention.
Please **upvote** (👍) on GitHub the issues you are most interested in.
Thank you for participating [in the developer survey](https://material-ui.com/blog/2020-developer-survey-results/).

## Priorities

Here are the top priorities:

- **More components**. 🧰 We have to strictly prioritize as developing a fully-fledged component takes a considerable amount of time.
  We apply the following strategy:
  - Identify frequently needed components. There are many resources we leverage for this: the developer survey answers, GitHub issue upvotes, Algolia search volume, Google search volume, documentation usage, npm downloads, etc.
  - Prioritize the creation of frequently needed components.
  - Encourage the usage of third-party components if they already exist and are well maintained.
- **Design.** 🎀 We are relatively up-to-date, but the Material Design guidelines [are evolving](https://material.io/whats-new/). So should we. We also plan to implement [a second design](https://github.com/mui-org/material-ui/issues/22485).
- **Better customization.** 💅 We want to make component customization intuitive, no matter if you are using global CSS or styled-components:
- **Better documentation.** 📚 No solution is complete without great documentation.
- **Performance.** 🚀 React abstraction has a cost. The more components you render, the slower your page will be. You will notice stark differences when rendering a large table or list.
- **Bundle size.** 📦 You can follow our progress [with bundlephobia.com report](https://bundlephobia.com/result?p=@material-ui/core). Please pay special attention to the cost of the individual modules under "Exports Analysis".
- **TypeScript.** 📏 We are continuously improving the definitions. The codebase is mostly written in JavaScript with manually authored `.d.ts` definitions. While we do not plan a migration effort as a standalone effort, new modules are written in TypeScript.
- **Accessibility.** ♿️ We have relatively [few accessibility issues](https://darekkay.com/blog/accessible-ui-frameworks/), but we are eager to address them all. We would appreciate the help of accessibility experts.

## Quarterly roadmap

Our GitHub project's roadmap is where you can learn about what features we're working on, what stage they're at, and when we expect to bring them to you:

- [Material-UI community](https://github.com/mui-org/material-ui/projects/25). This repository focuses on empowering the creation of great design systems with React, as well as providing two ready to use themes (Material Design so far, another one coming in the near future).
- [Material-UI X](https://github.com/mui-org/material-ui-x/projects/1). This repository focuses on providing advanced React components.

## New components

Here are the components we will work on being supported in the Material-UI ecosystem, no matter if they are part of the [community edition](https://github.com/mui-org/material-ui) (MIT license) or [Material-UI X](https://github.com/mui-org/material-ui-x), a paid extension for enterprises:

- 🧪 Close to becoming stable, already released as unstable
- 🛠 Work in progress, will be or already released as unstable
- ⏳ Planning to build
- ⭐️ We will make some of the features available in [Material-UI X](https://github.com/mui-org/material-ui-x) (parts won't be MIT)

| Name                                                                              | Status |
| :-------------------------------------------------------------------------------- | ------ |
| Timeline                                                                          | 🧪     |
| Tree View                                                                         | 🧪     |
| Tree View - Multiselect                                                           | 🧪     |
| Data Grid                                                                         | 🧪     |
| [Data Grid (Advanced)](/components/data-grid/getting-started/#feature-comparison) | 🧪⭐   |
| Date Picker                                                                       | 🧪     |
| Date Range Picker                                                                 | 🧪⭐   |
| Advanced layout                                                                   | ⏳⭐️  |
| Carousel                                                                          | ⏳     |
| Charts                                                                            | ⏳⭐️  |
| Dropdown                                                                          | ⏳     |
| Dropzone                                                                          | ⏳     |
| File Upload                                                                       | ⏳     |
| Gantt Chart                                                                       | ⏳⭐️  |
| Gauge                                                                             | ⏳⭐️  |
| Image                                                                             | ⏳     |
| Masonry                                                                           | ⏳     |
| Navbar                                                                            | ⏳     |
| NProgress                                                                         | ⏳     |
| Nested Menu                                                                       | ⏳     |
| Numeric Input                                                                     | ⏳     |
| Rich Text Editor                                                                  | ⏳⭐️  |
| Scheduler                                                                         | ⏳⭐️  |
| Scrollspy                                                                         | ⏳     |
| Sparkline                                                                         | ⏳⭐️  |
| Window Splitter                                                                   | ⏳⭐️  |
| Tree Select                                                                       | ⏳⭐️  |
| Tree View - Checkbox                                                              | ⏳⭐️  |
| Tree View - Drag & Drop                                                           | ⏳⭐️  |
| Tree View - Virtualization                                                        | ⏳⭐️  |

> ⚠️ **Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction, for informational purposes only. We may decide to add or remove new items at any time, depending on our capability to deliver while meeting our quality standards. The development, releases, and timing of any features or functionality remains at the sole discretion of Material-UI. The roadmap does not represent a commitment, obligation, or promise to deliver at any time.
