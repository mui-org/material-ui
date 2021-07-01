---
description: An update on our mission for Q1 2020.
---

# Q1 2020 Update

Olivier Tassinari. April 14, 2020.

Welcome to the new format of our mission update. We are moving from monthly to quarterly updates.

## Product

Over the last 3 months, we have focused on making patch releases.
We have done eleven so far. We have optimized for stability.

Here are the most significant improvements since the beginning of the year:

- 🔍 We have polished the [Autocomplete](https://material-ui.com/components/autocomplete/) component (Combo box). We have closed more than [270](https://github.com/mui-org/material-ui/labels/lab%3A%20Autocomplete) issues and pull requests so far. We will promote the component to the core in the next major (v5).

  ![autocomplete](/static/blog/2020-q1-update/autocomplete.gif)

  <p class="blog-description">useAutocomplete <a href="https://material-ui.com/components/autocomplete/#useautocomplete">hook</a> example, 4.5 kB gzipped.</p>

  If you wish to make your first contribution to open source, the component has a couple of ["good first issues"](https://github.com/mui-org/material-ui/labels/lab%3A%20Autocomplete) that can be taken.
  If you have TypeScript expertise, the component could [benefit from it](https://github.com/mui-org/material-ui/issues?q=is%3Aopen+label%3A%22lab%3A+Autocomplete%22+label%3Atypescript).

- 📆 We have made a first [alpha release](https://next.material-ui-pickers.dev/demo/daterangepicker) of the date range picker. It's not ready to be used in production but you can start playing. We might release some of the new features of the date picker under the upcoming Enterprise offering.

  ![date picker](/static/blog/2020-q1-update/date-picker.png)

- ⚠️ We have introduced a new [Alert](https://material-ui.com/components/alert/) component in the lab. While this component isn't mentioned in the Material Design guidelines, it's a common and well-established pattern. For instance, it can be interested when [combined](https://material-ui.com/components/snackbars/#notistack) with the Snackbar.

  <img src="/static/blog/2020-q1-update/alert.png" alt="alert" style="max-height: 369px; margin-bottom: 24px;" />

- ⏭ We have introduced a new [Pagination](https://material-ui.com/components/pagination/) component.

  <img src="/static/blog/2020-q1-update/pagination.png" alt="pagination" style="max-height: 208px; margin-bottom: 8px;" />

- 🦴 We have added a new "wave" animation to the [Skeleton](https://material-ui.com/components/skeleton/#animations) component.

  <video autoplay muted loop style="max-height: 95px; margin-bottom: 24px;">
    <source src="/static/blog/2020-q1-update/skeleton.webm" type="video/webm" />
  </video>

- ⚛️ We have worked on improving developer experience inside text editors.

  - We have migrated prop descriptions from JSDoc to TypeScript for 60% of the components. Back-and-forths with the documentation API will be less frequent:

  ![props](/static/blog/2020-q1-update/props.png)

  - The color modules come with new previews:

  ![colors](/static/blog/2020-q1-update/colors.png)

  - We have collaborated with [Andy Edwards](https://github.com/jedwards1211) to provide [snippets](https://marketplace.visualstudio.com/items?itemName=vscodeshift.material-ui-snippets) with Visual Studio Code:

  ![snippets](/static/blog/2020-q1-update/snippets.gif)

- 💎 We have introduced [Sketch assets](/blog/2020-introducing-sketch/).

  <img src="/static/blog/2020-q1-update/sketch.png" alt="sketch" style="max-width: 160px;" />

But this summary is just scratching the surface. We have accepted 572 commits from 214 different contributors.

## Company

We are thrilled to welcome two new full-time developers on Material-UI:

- [Dmitriy Kovalenko](https://github.com/dmtrKovalenko), the author of @material-ui/pickers.
  <img src="https://avatars0.githubusercontent.com/u/16926049" alt="dmitriy" style="max-width: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

- [Damien Tassone](https://github.com/dtassone/), an experienced developer in the finance industry.
  <img src="https://avatars0.githubusercontent.com/u/936978" alt="damien" style="max-width: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

### Growth between Q4 2019 and Q1 2020

- 📦 From 3.2M to 4.8M downloads per month on npm.
- ⭐️ From 53.3k to 56.2k stars, leave us yours 🌟.
- 👨‍👩‍👧‍👦 From 1,581 to 1,720 contributors on GitHub.
- 💰 Grew monthly financial support by 47%.
- 🏢 From 3 to 5 full-time equivalent developers, spread among multiple financially supported core team members.

## Our roadmap intent for Q2 2020

We'll do our best, no guarantee!

- 📣 We will analyze and publish the results of the "Material-UI Developer Survey 2020". If you haven't contributed to it yet, you can follow this link to [fill it in](https://forms.gle/TYWRdvgyZs4AhZNv8), thanks!
- 🎨 We will release Figma assets for Material-UI.

  <img src="/static/blog/2020-q1-update/figma.png" alt="figma" style="max-width: 160px; margin-bottom: 24px;" />

- 🇨🇳 We will translate 100% of the documentation to Chinese. We are collaborating with [Danica Shen](https://github.com/DDDDDanica), a native speaker, to complete the effort. So far, we have translated 73% of the documentation and peer-reviewed 39%. You can help us out on [Crowdin](https://translate.material-ui.com/).

  <img src="/static/blog/2020-q1-update/chinese.png" alt="chinese" style="max-width: 134px; margin-bottom: 24px;" />

- 🔥 We will start to work on the [next major: v5](https://github.com/mui-org/material-ui/issues/20012).
  You can expect the following:

  - A feature freeze on v4.
  - The introduction of deprecation messages in the next v4 minors. These messages will help developers upgrade to v5.
  - A progressive bug fixes freeze on v4, with the exception of security issues and important bugs.
  - At least 6 months of work on v5 to get to a stable release (probably more). You can follow our progress using our [milestone](https://github.com/mui-org/material-ui/milestone/35).

- 🧑‍💻 We will likely look to hire a new full-time member on the core team to help deliver v5 and new features faster.
- ⌗ We announced, back in [October 2019](/blog/september-2019-update/#our-roadmap-intent-for-october), our intention to work on an advanced data grid component. The task was bigger than anticipated, but we are making progress. It might take us 12 months to do it right. Damien is now leading and fully dedicated to this effort. You can follow our early-stage progress on [finui.io](https://finui.io/#/grid) and later, integration into the mono-repository on [#18872](https://github.com/mui-org/material-ui/pull/18872).

  ![data grid](/static/blog/2020-q1-update/data-grid.png)

  <p class="blog-description">For <a href="https://uxdesign.cc/design-better-data-tables-4ecc99d23356">illustration</a> purposes only.</p>

- 📆 We will polish the date picker. We will work on: providing a comprehensive set of features, to unify the experience with the core package, to improve the overall quality. The objective is to make these components stable in the next major (v5).
- ❓ Please upvote our [GitHub issues](https://github.com/mui-org/material-ui/issues) if you want something specific. The number of 👍 helps us to prioritize.
