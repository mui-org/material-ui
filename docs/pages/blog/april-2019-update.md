---
description: Here are the most significant improvements in April.
---

# April 2019 Update

Olivier Tassinari. May 7, 2019.

Here are the most significant improvements in April:

- 📚 We have migrated [most](https://github.com/mui-org/material-ui/issues/14897) of our demos to TypeScript. **@eps1lon** has lead the effort. You can switch between the JavaScript demo and the TypeScript demo using this toggle button:

  ![TypeScript switch](/static/blog/april-2019-update/typescript.png)

  This was only possible thanks to the contributions **@merceyz**, **@sperry94**, **@jasondashwang**, **@bh1505**, **@donigianrp**, **@Dudrie**, **@eluchsinger**, **@cahilfoley**, **@gabrielgene**, **@kenzhemir**, **@Adherentman**, **@lksilva**, **@Tevinthuku**. Thank you!
  Supporting these TypeScript demos has one important implication, it forces us to have working TypeScript definitions ✨.

- 🎀 We have migrated a large chunk of our components from classes to hooks. **@joshwooding** has lead the effort. We will explain why in the v4 release blog post.
- 📐 We have updated our components to better match the Material Design guidelines
  (Snackbar, List, Checkbox, Radio & Switch).
- 🎁 We have added a demo for building a [TransferList](/components/transfer-list/) component.

  [![Transfer List](/static/blog/april-2019-update/transfer-list.png)](/components/transfer-list/)

- 💅 We have changed the class name generation to output global class names.
  We have seen many people struggling with our `classes` API.
  This API targets plain CSS and styled-components users.
  It can be challenging to apply your class name on the right element with the `classes` API. It can also be cumbersome. ⚠️ Using global class names provide more power but comes with a responsibility. We encourage any pattern that increases your **custom style isolation**.

  [![Global class names](/static/blog/april-2019-update/global-class-names.png)](/styles/advanced/#with-material-ui-core)

- 📅 We have moved material-ui-pickers to our organization: [@material-ui/pickers](https://material-ui-pickers.dev/). A big thanks to **@dmtrKovalenko** for creating and owning these date/time components.
- 🔥 We have fixed more Strict Mode warnings, getting us closer to [Concurrent React](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#react-16x-q2-2019-the-one-with-concurrent-mode) support.
- ♿️ We have significantly improved the keyboard behavior on the Select, Menu, Button and Tooltip components. The arrow key changes feel instantaneous. The select items can be selected with the alphabetical keys. The focus visible state is better detected.
- 💄 We have added support for responsive font sizes. You can wrap your theme with [`responsiveFontSizes()`](/customization/typography/#responsive-font-sizes):

  [![Responsive font sizes](/static/blog/april-2019-update/responsive.png)](/customization/typography/#responsive-font-sizes)

- We have added support for custom [header scroll behaviors](/components/app-bar/#scrolling):

  <video src="/static/blog/april-2019-update/scroll-trigger.mp4" controls loop autoplay></video>

But this summary is just scratching the surface. We have accepted 243 commits from 69 different contributors. We have changed 1,545 files with 36,461 additions and 20,237 deletions.

## Our roadmap intent for May

_(We'll do our best, no guarantee!)_

- We will release Material-UI v4 stable during the React Europe conference.
- We will start an effort to support more components. So far, we have identified a couple of useful ones:
  - Layout
  - Combobox
  - Slider (& range)
  - Dropdown
  - Tree view
  - Dropzone / Upload
  - Skeleton
  - Jumbotron
  - Carousel
  - Rating
  - Timeline
- Something big 🌈

- ❓ Please upvote our [GitHub issues](https://github.com/mui-org/material-ui/issues) if you want something specific. The number of 👍 helps us to prioritize.
