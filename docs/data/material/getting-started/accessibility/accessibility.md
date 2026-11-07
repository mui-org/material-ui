# Accessibility conformance report

<p class="description">How Material UI components conform to WCAG 2.2 Level A and AA, reported in VPAT terms for procurement and accessibility review.</p>

:::warning
**Draft — partial coverage.** This report covers only the components in the [component table](#conformance-by-component), not the whole library. It has not been reviewed by an external auditor, and no assistive-technology testing has been performed yet. See [Scope and limitations](#scope-and-limitations) before relying on it for a procurement decision.
:::

## About this report

This is a Voluntary Product Accessibility Template (VPAT®) style report: it states how far Material UI meets the [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/) at Levels A and AA, using the conformance vocabulary defined by the [Information Technology Industry Council](https://www.itic.org/policy/accessibility/vpat).

Each component is rated criterion by criterion in its own report, kept next to the source code at `packages/mui-material/src/<Component>/accessibility.md`. Those reports carry the reasoning, the responsibility split, and reproducible manual test steps for every criterion. **The table below summarizes them; follow a component link for the detail.**

<!-- scorecard-about:start -->

| Field             | Value                                                         |
| :---------------- | :------------------------------------------------------------ |
| Product           | Material UI (`@mui/material`)                                 |
| Product type      | React component library (software)                            |
| Version assessed  | `@mui/material` v10.0.0-alpha.0                               |
| Vendor            | MUI                                                           |
| Standards applied | WCAG 2.2 Level A and AA                                       |
| Report type       | Self-assessment, published as source-controlled documentation |

<!-- scorecard-about:end -->

## Conformance by component

Each row counts only the criteria that **apply** to that component; criteria that are Not Applicable are excluded. Levels are [cumulative](https://www.w3.org/WAI/WCAG2AA-Conformance) — AA includes all of A.

- **Rated** — applicable Level A and AA criteria.
- **Verified** — criteria confirmed by a test or a recorded review. The remainder are assessed from the source but not yet re-verified; they are flagged 🚩 in the component report. The flag concerns evidence, not conformance.
- **Automated** — criteria a deterministic test proves on its own, so they cannot silently regress.

<!-- scorecard:start -->

| Component                                                                                                                        | Level A | Level AA | Rated | ✅ Supports | ⚠️ Partially Supports | Verified | Automated |
| :------------------------------------------------------------------------------------------------------------------------------- | ------: | -------: | ----: | ----------: | --------------------: | -------: | --------: |
| [Accordion](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Accordion/accessibility.md)                 |      11 |        8 |    19 |          19 |                     0 |    16/19 |         9 |
| [AccordionSummary](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/AccordionSummary/accessibility.md)   |      13 |       11 |    24 |          23 |                     1 |    21/24 |        11 |
| [Avatar](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Avatar/accessibility.md)                       |       5 |        6 |    11 |           9 |                     2 |     6/11 |         2 |
| [Button](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Button/accessibility.md)                       |      15 |       12 |    27 |          24 |                     3 |    20/27 |        11 |
| [Checkbox](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Checkbox/accessibility.md)                   |      14 |       11 |    25 |          24 |                     1 |    22/25 |        11 |
| [CircularProgress](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/CircularProgress/accessibility.md)   |       6 |        5 |    11 |           8 |                     3 |     6/11 |         1 |
| [LinearProgress](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/LinearProgress/accessibility.md)       |       6 |        5 |    11 |           8 |                     3 |     6/11 |         1 |
| [Link](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Link/accessibility.md)                           |      13 |       11 |    24 |          22 |                     2 |    18/24 |        10 |
| [Radio](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Radio/accessibility.md)                         |      14 |       11 |    25 |          24 |                     1 |    23/25 |        11 |
| [RadioGroup](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/accessibility.md)               |       6 |        1 |     7 |           7 |                     0 |      4/7 |         2 |
| [Switch](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Switch/accessibility.md)                       |      14 |       11 |    25 |          24 |                     1 |    23/25 |        11 |
| [TextField](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/TextField/accessibility.md)                 |      14 |       14 |    28 |          25 |                     3 |    24/28 |        12 |
| [ToggleButton](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/ToggleButton/accessibility.md)           |      13 |       11 |    24 |          21 |                     3 |    22/24 |        11 |
| [ToggleButtonGroup](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/ToggleButtonGroup/accessibility.md) |       2 |        2 |     4 |           4 |                     0 |      3/4 |         1 |

<!-- scorecard:end -->

<!-- scorecard-rollup:start -->

**No component records a ❌ Does Not Support rating for any Level A or AA criterion.**

Rolled up to the library level, where each criterion takes the worst rating any assessed component receives, 32 success criteria are exercised: **27 Supports, 5 Partially Supports, 0 Does Not Support.**

<!-- scorecard-rollup:end -->

The Level A and AA criteria absent from every row apply at the page or application level — [2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks), [3.1.1 Language of Page](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page), the [1.2.x Time-based Media](https://www.w3.org/TR/WCAG22/#time-based-media) set — and are the responsibility of the application.

## How to read the ratings

| Symbol | Term               | Meaning                                         |
| :----- | :----------------- | :---------------------------------------------- |
| ✅     | Supports           | Met, with no known defects.                     |
| ⚠️     | Partially Supports | Some functionality does not meet the criterion. |
| ❌     | Does Not Support   | Most functionality does not meet the criterion. |
| ➖     | Not Applicable     | The criterion does not apply to this component. |

Each criterion in a component report also records **who is responsible** for meeting it — ● the component, ◐ shared when used as documented, or ○ you, depending on your implementation and surrounding content. This distinction matters more for a component library than for an application, and the reports state it per criterion.

:::info
An application built with Material UI is not automatically accessible. Material UI supplies accessible building blocks; meeting WCAG for a finished product remains the responsibility of the team building it.
:::

## Known gaps

Each ⚠️ rating comes from one of the issues below. Some of them can be fixed through the theme today.

<!-- scorecard-gaps:start -->

| Gap                                                                                                                  | Criteria                                                                                                                                                                                          | Affected                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Workaround                                                   |
| :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **By default, the keyboard focus indicator is the ripple or a background tint, and its contrast can fall below 3:1** | [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)                                                                                                    | [AccordionSummary](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/AccordionSummary/accessibility.md)<br />[Button](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Button/accessibility.md)<br />[Checkbox](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Checkbox/accessibility.md)<br />[Radio](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Radio/accessibility.md)<br />[Switch](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Switch/accessibility.md)<br />[ToggleButton](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/ToggleButton/accessibility.md)                                                                                                                                                                                                                                                                                    | Enable `focusVisible` in your theme — see below              |
| **Some default palette colors fall short of contrast minimums**                                                      | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)<br />[1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | [Avatar](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Avatar/accessibility.md)<br />[Button](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Button/accessibility.md)<br />[CircularProgress](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/CircularProgress/accessibility.md) (`warning` with `enableTrackSlot`)<br />[LinearProgress](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/LinearProgress/accessibility.md)<br />[Link](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Link/accessibility.md)<br />[Switch](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Switch/accessibility.md)<br />[TextField](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/TextField/accessibility.md)<br />[ToggleButton](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/ToggleButton/accessibility.md) | Override the affected palette entries                        |
| **The selected state of colored Toggle Buttons is conveyed almost entirely by hue**                                  | [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)                                                                                                               | [ToggleButton](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/ToggleButton/accessibility.md) (`primary`, `error`, `info`, `success`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Add a non-color cue to the selected state, such as an icon   |
| **Links without an underline rely on color, and several link colors are below 3:1 against body text**                | [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)                                                                                                               | [Link](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Link/accessibility.md) (`underline="none"`, `underline="hover"`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Keep the default `underline="always"` for links in body text |
| **Dynamic state changes are not announced**                                                                          | [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)                                                                                                         | [Button](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Button/accessibility.md) (`loading`)<br />[CircularProgress](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/CircularProgress/accessibility.md)<br />[LinearProgress](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/LinearProgress/accessibility.md)<br />[TextField](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/TextField/accessibility.md) (error)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Render your own `aria-live` region alongside                 |
| **Indefinite animation cannot be paused**                                                                            | [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)                                                                                                       | [CircularProgress](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/CircularProgress/accessibility.md) (`indeterminate`)<br />[LinearProgress](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/LinearProgress/accessibility.md) (`indeterminate`, `query`, `buffer`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Show it only while an operation is in flight                 |

<!-- scorecard-gaps:end -->

The theme's `focusVisible` option draws an outline ring on keyboard focus that does not depend on the ripple, so it also stays visible under `disableRipple`. See [Focus visible](/material-ui/customization/focus-visible/) for the options:

```js
const theme = createTheme({ focusVisible: true });
```

## Scope and limitations

:::warning
Read this section before citing the report.
:::

- **Component coverage is partial.** Only the components in the [component table](#conformance-by-component) are assessed. Widely used components including Select, Autocomplete, Dialog, Menu, Table, Tabs, Slider, Tooltip, Snackbar, and Drawer are **not yet assessed**, and this report says nothing about them.
- **No assistive-technology testing.** No screen-reader passes have been performed. Criteria that depend on how a specific assistive technology behaves are assessed from the exposed accessibility tree, not from observed behavior.
- **Level AAA is out of scope**, as it is for a standard VPAT.
- **Components are rated in isolation**, as rendered with default props and the default theme. Customization, composition, and your surrounding page can change the result.
- **Evidence strength varies.** See the Verified column above; the shortfall is assessed from the source but not yet re-verified.
- **This is a self-assessment**, not audited by an independent third party.
- **Section 508 and EN 301 549 chapters are not yet included.** The WCAG results above supply the substance those chapters incorporate by reference, but the chapter-by-chapter mapping has not been written.

## Feedback

Accessibility defects are treated as bugs. Report them on [GitHub](https://github.com/mui/material-ui/issues/new/choose) with the component, the success criterion, and steps to reproduce.
