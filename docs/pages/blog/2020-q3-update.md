---
title: Q3 2020 Update
description: An update on our mission for Q3 2020.
date: 2020-10-14T00:00:00.000Z
authors: ['oliviertassinari']
tags: ['Company']
manualCard: true
---

This update covers our progress over the last three months, and what we aim to achieve in the coming months.

## Product

Here are the most significant improvements since June 2020. This was a dense quarter!

- 🚧 We have started the quarter with the first pre-release [v5.0.0-alpha.1](https://github.com/mui/material-ui/releases?after=v5.0.0-alpha.1) of the next major iteration of the library.
  There have been eleven more pre-releases since then. During the alpha development stage of version 5, we are focusing on making the planned breaking changes, as well as developing new features.
  On the breaking changes side, we have made almost half of the changes that we have planned.
- 🧪 We have promoted 7 components from the lab to the core: Alert, Autocomplete, Pagination, Rating, Skeleton, SpeedDial, and ToggleButton.
  Thank you for all your feedback on these components.
  While we still plan a couple of breaking changes on them, we are confident that they have reached the same level of quality as the other core components.
- 👮 We have introduced a new component in the lab, the [FocusTrap](https://v6.mui.com/base-ui/react-focus-trap/). It manages focus for its descendants. This is useful when implementing overlays such as modal dialogs, which should not allow the focus to escape while open:

  <video style="max-height: 416px; margin-bottom: 24px;" autoplay muted loop playsinline>
    <source src="/static/blog/2020-q3-update/trap-focus.mp4" type="video/mp4" />
  </video>

- ⚛️ We have prepared the support for the upcoming release of [React v17](https://legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html). Most of the work was about better handling events, and updating our test infrastructure to run the whole test suite with the _latest_ and _next_ version of React.<br />We have also improved `StrictMode` support. The last standing issues are being addressed with the work on the style engine. More on that later in the post.
- 💅 We have introduced a new dynamic variant API. This API allows developers to add new variants to Material UI components right from the theme, without having to wrap the components. For instance with the Button:

  ```tsx
  // Define the style that should be applied for specific props.
  const theme = createMuiTheme({
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'dashed', color: 'secondary' },
            styles: {
              border: `4px dashed ${red[500]}`,
            },
          },
        ],
      },
    },
  });

  // Optionally retain type safety:
  declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      dashed: true;
    }
  }

  // Enjoy!
  <Button variant="dashed" color="secondary" />;
  ```

  This change is part of a direction to ease the implementation of custom design systems.
  Note that the API not only allows to match a single prop, but also a combination of props.
  This is especially interesting to resolve the conflict when different variants try to modify the same CSS property.

  Hopefully, in the future, we will be able to take advantage of the variant feature [coming in Figma](https://help.figma.com/hc/en-us/articles/360055471353-Prepare-for-Variants) with this API.

- ⚡️ We have released a first alpha version of the [data grid component](/x/react-data-grid/).<br />
  We announced our intent to build this component [a year ago](/blog/september-2019-update/#our-roadmap-intent-for-october). While we could have implemented a simple version and release it a month later, it wouldn't have set us in the right direction for the years to follow. We're aiming aim to deliver the best-in-class React data grid.
  This objective requires a twin licensing model. The component is available under an MIT license for the features that can be relatively easily implemented, and that can be sustained with an open-source model; as well as a paid commercial license for the more advanced features.
  <br />To ensure we could meet this objective, we spent time finding an expert in the field. This led us to open a new job position, and, a few months later, [Damien Tassone](/blog/spotlight-damien-tassone/) joined to lead the work on this component.

  <a href="/x/react-data-grid/"><img src="/static/blog/2020-q3-update/data-grid.png" alt="" style="width: 829px; margin-bottom: 8px;" /></a>

  <p class="blog-description">100,000 rows</p>

  After 6 months of development since the initial commit (March 15th, 2020), you can start using the component! (It targets v4.)

- ⚡️ The data grid effort has led to the introduction of a new repository: [_mui/mui-x_](https://github.com/mui/mui-x). This is the repository that will host all the future commercial components, all the components that we can't sustain with the open-source model. MUI X is our next iteration in scaling MUI, both as a company and as a comprehensive React library of components. While we have an existing sustainability model that can support, in long term, up to 10 people full-time, we are keen to push it by an order of magnitude.
- 🛠 We have migrated parts of the codebase to TypeScript.<br />
  We had to work on the code infrastructure of _mui/material-ui_ to prepare to host the date picker components that are written in TypeScript inside the lab (coming from _mui/material-ui-pickers_ that we will archive once we can).

  <img src="/static/blog/2020-q3-update/typescript-mui.png" alt="" style="width: 299px; margin-bottom: 8px;" />

  <p class="blog-description">MUI's repository</p>

  On the other hand, we started using TypeScript from day one for _mui/mui-x_.

  <img src="/static/blog/2020-q3-update/typescript-mui-x.png" alt="" style="width: 299px; margin-bottom: 8px;" />

  <p class="blog-description">MUI X's repository</p>

- 🐙 We have migrated large parts of the test suite to react-testing-library.<br>
  15 months ago, we introduced the very [first test](https://github.com/mui/material-ui/pull/15732) using the library (to replace enzyme). Last month, react-testing-library had [more downloads](https://npm-stat.com/charts.html?package=enzyme&package=%40testing-library%2Freact&from=2019-10-10&to=2020-10-10) than enzyme!

  <img src="/static/blog/2020-q3-update/react-testing-library.png" alt="" style="width: 640px; margin-bottom: 40px; margin-top: 24px;" />

- 💅 We have completed the first iteration of the unstyled components for v5.<br />You can find a [new version](https://v5.mui.com/material-ui/react-slider/#unstyled) of the slider in the lab without any styles.
  The unstyled component weighs in at [5.2 kB gzipped](https://bundlephobia.com/package/@mui/lab@5.0.0-alpha.12), compared with 26 kB for the styled version (when used standalone). The component is best suited for use when you want to fully customize the look, without reimplementing the JavaScript and accessibility logic.<br />
  We're also pushing in this direction to address a concern we hear from large enterprises
  that want to be able to go one layer down in the abstraction, in order to gain more control.

  ```jsx
  import SliderUnstyled from '@mui/lab/SliderUnstyled';
  ```

  Note that we have experimented with headless components (hooks only) in the past. For instance, you can leverage the [useAutocomplete](https://v5.mui.com/material-ui/react-autocomplete/#useautocomplete), and [usePagination](https://v5.mui.com/material-ui/react-pagination/#usepagination) hooks. However, we are pushing with unstyled first as a required step for the next item: ⬇️.

- 👩‍🎨 We have completed the first iteration of the new styling solution of v5.<br />
  You can find a [new version](https://v5.mui.com/material-ui/react-slider/) of the slider in the lab powered by [Emotion](https://emotion.sh/docs/introduction).<br />
  If you are already using styled-components in your application, you can swap Emotion for styled-components 💅. Check this [CodeSandbox](https://codesandbox.io/p/sandbox/sliderstyled-with-styled-components-forked-olc27?file=/package.json) or [CRA](https://github.com/mui/material-ui/tree/HEAD/examples/material-ui-cra-styled-components/) for a demo. It relies on aliases to prevent any bundle size overhead.<br />
  The new styling solution saves 2kB+ gzipped in the bundle compared to JSS, and about 14 kB gzipped if you were already using styled-components or Emotion.<br />
  Last but not least, this change allows us to take advantage of dynamic style props. We will use them for dynamic color props, variant props, and new style props available in the core components.

  <img src="/static/blog/2020-q3-update/emotion.png" alt="" style="width: 329px;" />

  <p class="blog-description">Slider powered by Emotion</p>

  <img src="/static/blog/2020-q3-update/styled-components.png" alt="" style="width: 323px;" />

  <p class="blog-description">Slider powered by styled-components</p>

- ♿︎ We have kept investing in accessibility, we have fixed [13 bugs](https://github.com/mui/material-ui/pulls?q=is%3Apr+label%3Aaccessibility+is%3Aclosed+sort%3Aupdated-desc).
- 🗓 We have introduced public quarterly roadmaps, both for each [MUI Core](https://github.com/mui/material-ui/projects?query=is%3Aopen) product and [MUI X](https://github.com/orgs/mui/projects/35).

## Company

We are thrilled to welcome two new full-time developers to MUI:

- [Marija Najdova](https://github.com/mnajdova). Marija joins us from the Fluent-UI React team at Microsoft. She's allowing the community team to move faster. You can learn more about her in the [introduction blog post](/blog/marija-najdova-joining/).

  <img src="https://avatars.githubusercontent.com/u/4512430?s=320" alt="marija" style="max-width: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

- [Danail Hadjiatanasov](https://github.com/DanailH). Danail comes to us from the Fintech industry. He's allowing the enterprise team to move faster, he's helping Damien push the data grid further.

  <img src="https://avatars.githubusercontent.com/u/5858539?s=320" alt="marija" style="max-width: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

### Growth between Q2 2020 and Q3 2020

- 📦 From 5.1M to 6.0M downloads per month on npm.<br />
  While React is growing, we are also growing inside its ecosystem.

  <img src="/static/blog/2020-q3-update/react-share.png" alt="" style="width: 588px; margin-bottom: 16px;" />

  <p class="blog-description">% of download relative to react-dom</p>

- ⭐️ From 59.0k to 61.6k stars, leave us yours [🌟](https://github.com/mui/material-ui).
- 👨‍👩‍👧‍👦 From 1,825 to 1,934 contributors on GitHub. We add on average 1 new contributor every day.
- 🏢 We have welcomed two new full-time developers to MUI.

## Our roadmap intent for Q4 2020

We'll do our best, no guarantee!

### Community

- 🗓 Execute on all the items of the [public roadmap](https://github.com/orgs/mui/projects/23/views/12).
- 👩‍🎨 Simplify the migration experience from v4 to v5.
- ❓ Please upvote [GitHub issues](https://github.com/mui/material-ui/issues) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Enterprise

- 👩‍🎨 Complete the collaboration we started with a design agency last quarter to update the branding of the company, redesign the homepage, and design the marketing pages for the enterprise package.
- 🗓 Execute on all the items in the [public roadmap](https://github.com/orgs/mui/projects/35).
- ❓ Please upvote [GitHub issues](https://github.com/mui/mui-x/issues) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Company

These are objectives, no guarantees:

- 🏢 We might hire a full-time designer that has coding skills. One of the objectives would be to solve [#22485](https://github.com/mui/material-ui/issues/22485).
- 🏝 We have put the company-wide team retreat on hold because of the continued risk presented by COVID-19.
  Hopefully, we will be able to hold it in Q2 2021.
