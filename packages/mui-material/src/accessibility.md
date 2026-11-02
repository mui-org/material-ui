# Accessibility conformance reports

Each component is rated against WCAG 2.2 Level A and AA and documented at `<Component>/accessibility.md`.

## The status line

For each SC this indicates:

1. How well it conforms
2. Whether the library or user (the author) is responsible for conformance

```text
<conformance> · <responsibility>
```

For example this:

```text
⚠️ Partially Supports · ● Component
```

Means:

1. Partially conforms
2. The component is fully responsible for WCAG conformance

## Conformance

Whether the component meets the applicable Success Criterion. [VPAT](https://www.itic.org/policy/accessibility/vpat) terminology is used:

| Symbol | Term               | Description                                     |
| :----- | :----------------- | :---------------------------------------------- |
| ✅     | Supports           | Met, no known defects.                          |
| ⚠️     | Partially Supports | Some functionality fails.                       |
| ❌     | Does Not Support   | Most functionality fails.                       |
| ➖     | Not Applicable     | The criterion does not apply to this component. |

A criterion is **flagged** (`🚩`, shown first in its status line) when its rating is assessed from the component's source but not yet confirmed by a test or recorded review. The flag concerns evidence, not conformance, and does not imply a defect.

## Responsibility

Whether the responsibility for meeting conformance is on the library, the author (library user), or shared.

| Symbol | Term      | Description                                                 |
| :----- | :-------- | :---------------------------------------------------------- |
| ●      | Component | Satisfied on its own.                                       |
| ◐      | Shared    | Satisfied when the component is used as documented.         |
| ○      | Author    | Depends on your implementation and the surrounding content. |

## Testing-method groups

Criteria are grouped by testing method, and roughly sorted by descending order of "human judgement required".

| Symbol | Group     | What it takes                                                                           |
| :----- | :-------- | :-------------------------------------------------------------------------------------- |
| 🔍     | Manual    | Human, visual, or assistive-technology judgment.                                        |
| 🔁     | Hybrid    | Automation catches regressions; judgment still needed.                                  |
| ⚙️     | Automated | A deterministic test proves it. `🚩` means such a test is feasible but not yet written. |

## Scope

Components are rated in isolation against WCAG 2.2 A and AA. The levels are [cumulative](https://www.w3.org/WAI/WCAG2AA-Conformance), that is, AA includes all of A.

## Not applicable by default

Most criteria about media, timing, or whole pages do not apply to a single component. A report lists them as not applicable with the reason below, unless its `accessibility.json` rates the criterion. To give a component its own reason, write the criterion region in its report.

<!-- not-applicable-defaults:start -->

- **1.2.1 Audio-only and Video-only (Prerecorded) (A).** <!-- 1.2.1:start -->No audio or video.<!-- 1.2.1:end -->
- **1.2.2 Captions (Prerecorded) (A).** <!-- 1.2.2:start -->No audio or video.<!-- 1.2.2:end -->
- **1.2.3 Audio Description or Media Alternative (Prerecorded) (A).** <!-- 1.2.3:start -->No audio or video.<!-- 1.2.3:end -->
- **1.2.4 Captions (Live) (AA).** <!-- 1.2.4:start -->No audio or video.<!-- 1.2.4:end -->
- **1.2.5 Audio Description (Prerecorded) (AA).** <!-- 1.2.5:start -->No audio or video.<!-- 1.2.5:end -->
- **1.3.4 Orientation (AA).** <!-- 1.3.4:start -->Sets no orientation lock; a layout concern.<!-- 1.3.4:end -->
- **1.3.5 Identify Input Purpose (AA).** <!-- 1.3.5:start -->Collects no information about the user through `autocomplete`.<!-- 1.3.5:end -->
- **1.4.2 Audio Control (A).** <!-- 1.4.2:start -->Emits no audio.<!-- 1.4.2:end -->
- **1.4.13 Content on Hover or Focus (AA).** <!-- 1.4.13:start -->Shows no additional content on hover or focus; a `Tooltip` wrapper would own this.<!-- 1.4.13:end -->
- **2.1.4 Character Key Shortcuts (A).** <!-- 2.1.4:start -->Binds no single-character keyboard shortcut.<!-- 2.1.4:end -->
- **2.2.1 Timing Adjustable (A).** <!-- 2.2.1:start -->Sets no time limit.<!-- 2.2.1:end -->
- **2.2.2 Pause, Stop, Hide (A).** <!-- 2.2.2:start -->No auto-starting moving, blinking, or auto-updating content.<!-- 2.2.2:end -->
- **2.3.1 Three Flashes or Below Threshold (A).** <!-- 2.3.1:start -->Nothing flashes.<!-- 2.3.1:end -->
- **2.4.1 Bypass Blocks (A).** <!-- 2.4.1:start -->Page or site structure, not a single component.<!-- 2.4.1:end -->
- **2.4.2 Page Titled (A).** <!-- 2.4.2:start -->Page or site structure, not a single component.<!-- 2.4.2:end -->
- **2.4.4 Link Purpose (In Context) (A).** <!-- 2.4.4:start -->The component renders no links.<!-- 2.4.4:end -->
- **2.4.5 Multiple Ways (AA).** <!-- 2.4.5:start -->Page or site structure, not a single component.<!-- 2.4.5:end -->
- **2.5.1 Pointer Gestures (A).** <!-- 2.5.1:start -->Activates on a simple click; reads no device motion.<!-- 2.5.1:end -->
- **2.5.4 Motion Actuation (A).** <!-- 2.5.4:start -->Activates on a simple click; reads no device motion.<!-- 2.5.4:end -->
- **2.5.7 Dragging Movements (AA).** <!-- 2.5.7:start -->No drag interactions.<!-- 2.5.7:end -->
- **3.1.1 Language of Page (A).** <!-- 3.1.1:start -->The component emits no `<html lang>` and no text of its own. A foreign-language label is the author's phrase to mark.<!-- 3.1.1:end -->
- **3.1.2 Language of Parts (AA).** <!-- 3.1.2:start -->The component emits no `<html lang>` and no text of its own. A foreign-language label is the author's phrase to mark.<!-- 3.1.2:end -->
- **3.2.3 Consistent Navigation (AA).** <!-- 3.2.3:start -->Covers repeated navigation across a set of pages, not a single component.<!-- 3.2.3:end -->
- **3.2.6 Consistent Help (A).** <!-- 3.2.6:start -->Covers consistent placement of help across pages.<!-- 3.2.6:end -->
- **3.3.1 Error Identification (A).** <!-- 3.3.1:start -->Collects and validates no input; these belong to the form or process.<!-- 3.3.1:end -->
- **3.3.3 Error Suggestion (AA).** <!-- 3.3.3:start -->Collects and validates no input; these belong to the form or process.<!-- 3.3.3:end -->
- **3.3.4 Error Prevention (Legal, Financial, Data) (AA).** <!-- 3.3.4:start -->Collects and validates no input; these belong to the form or process.<!-- 3.3.4:end -->
- **3.3.7 Redundant Entry (A).** <!-- 3.3.7:start -->Captures no previously entered data to repopulate.<!-- 3.3.7:end -->
- **3.3.8 Accessible Authentication (Minimum) (AA).** <!-- 3.3.8:start -->No authentication step; the duty falls on the credential fields.<!-- 3.3.8:end -->
- **4.1.3 Status Messages (AA).** <!-- 4.1.3:start -->Emits no status messages; state changes are covered by 4.1.2.<!-- 4.1.3:end -->

<!-- not-applicable-defaults:end -->

## How it works

A report is a **claim**; a test is the **proof**. The two are kept apart on purpose: the reports are what the public page is built from, and CI's job is to stop a claim standing without proof behind it.

### The claim

A claim has three parts, and a person writes only what needs judgment:

- **`accessibility.json`** (in this folder) holds the library defaults: for each WCAG 2.2 Level A and AA criterion, the default rating, responsibility, testing-method group, and `🚩` flag, and whether it is [not applicable by default](#not-applicable-by-default).
- **`<Component>/accessibility.json`** holds only what differs from the defaults:

  | Key             | Meaning                                                                                                               |
  | :-------------- | :-------------------------------------------------------------------------------------------------------------------- |
  | `criteria`      | `{ "<number>": { … } }`, the fields that differ from the default. Keying a default not-applicable criterion rates it. |
  | `notApplicable` | Criteria that do not apply to this component, beyond the defaults.                                                    |
  | `axe`           | The committed axe results for the component's demos.                                                                  |
  | `axeDemos`      | Demo names, or `*` globs, that count when several components share that file. Absent means every demo counts.         |
  | `tests`         | Other components whose test files also test this one, such as `ButtonBase`.                                           |
  | `inherits`      | For a group component: the parent whose ratings it inherits. The group rates only the criteria it keys in `criteria`. |
  | `title`         | The display name, when it differs from the folder name.                                                               |

- **`<Component>/accessibility.md`** holds the prose: notes, manual testing steps, pass conditions, known-gap summaries, and the reasons a criterion does not apply. Write only between the `<!-- …:start -->` and `<!-- …:end -->` markers. The script generates everything else in the report and keeps that text when it regenerates it. A region can sit anywhere in the file, so to add an optional one, such as `<!-- 1.4.3:pass:start -->`, type its markers. A reason shared by several criteria takes a region named after all of them, such as `<!-- 3.3.1,3.3.3:start -->`.

To rate a new criterion, key it in the component's JSON file and run `pnpm a11y:scorecard`. The report gets empty regions for the prose it needs, and `pnpm a11y:scorecard:check` fails until you fill them in.

For a component that inherits, the Inherited row of the count table counts the criteria rated in the parent report. They are excluded from the Flagged ratio.

### The proof

Three kinds of test, none of which writes anything into a report. The scorecard reads which criteria each covers, so evidence is never listed by hand:

| Kind                    | Where                                                               | Covers                                                                                     |
| :---------------------- | :------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| Unit tests              | `<Component>/<Component>.test.js`, titled `it('2.1.1 Keyboard: …')` | Behavior: keyboard operation, focus order, pointer cancellation, accessible naming         |
| axe-core                | The docs demos, inside the Playwright loop                          | The mechanical layer: ARIA, labels, text contrast, target size                             |
| Playwright layout suite | `test/regressions/a11y/criteriaSuites.mjs`                          | What axe has no rule for: reflow at 320px, 200% text size, the WCAG text-spacing overrides |

- **Unit tests** count as evidence for a criterion when a test title starts with its number and WCAG name, such as `'2.1.1 Keyboard: …'` or `describe('4.1.2 Name, Role, Value')`. A title that names a criterion with the wrong name fails the check.
- **Playwright suites** are listed per component in `criteriaSuites.mjs`, which the regression tests also read.
- **axe results** are written to `docs/data/material/components/{slug}/{slug}.a11y.json` and committed, so a change that alters them fails CI. When two components share that file, `axeDemos` selects which demos count for each one. If every component reading a file sets `axeDemos`, each demo in it must match at least one of them. The WCAG tags that axe-core ships with each rule (for example, `color-contrast` has `wcag143`) map each rule to its criteria. A failing rule rates its criterion ⚠️ Partially Supports unless the component's JSON file sets another rating.

### The rollup

`pnpm a11y:scorecard` reads the defaults, every `<Component>/accessibility.json`, the tests, the axe results, and the prose regions, validates them, and regenerates these files:

- each `<Component>/accessibility.md` report, including its count table, known gaps, and not-applicable list, but keeping its prose regions
- the [Reports](#reports) table below, and the [not applicable by default](#not-applicable-by-default) list above
- the [manual checklist](./manual-testing.md)
- the summary table on the public [accessibility conformance page](../../../docs/data/material/getting-started/accessibility/accessibility.md), between its `scorecard` markers
- the Known gaps table on the same page, from the gap and workaround text in `knownGaps.json`. Each ⚠️ or ❌ rating must have a row, and each row must match a rating.
- `docs/data/material/getting-started/accessibility/scorecard.json`, the machine-readable rollup

None of those numbers are typed by hand. Edit the JSON files or the prose regions, and re-run the command.

### What CI enforces

| Job                | Check                                                                       |
| :----------------- | :-------------------------------------------------------------------------- |
| `test_unit`        | The unit tests pass.                                                        |
| `test_regressions` | axe and the layout suite pass, and the committed `*.a11y.json` still match. |
| `test_static`      | `pnpm a11y:scorecard:check`, described below.                               |

`pnpm a11y:scorecard:check` fails when:

- a data file has an unknown key or value, or a component override repeats its default
- a report does not account for each criterion exactly once: rated, inherited, or not applicable
- the generated files are out of date
- a report is missing prose it needs: notes for a 🔍 Manual or 🔁 Hybrid criterion, a summary for each known gap, or a reason for a criterion that is not applicable only for that component
- a prose region has no place in the report, for example after a criterion moves to Not applicable, so the next run would drop it
- a criterion is rated ⚙️ Automated while still flagged `🚩` or without a test, rated 🔍 Manual although a test covers it, or rated ✅ Supports by hand while an axe rule for it fails
- a component's own tests cover a criterion it calls not applicable

That is the link between claim and proof. The check confirms that a test names the criterion. It does not confirm that the test genuinely proves it. That judgment stays with the reviewer.

## Reports

Generated by `pnpm a11y:scorecard` from each `<Component>/accessibility.json`.
Edit the JSON files, not this table.

<!-- scorecard:start -->

| Component                                                 | ✅ Supports | ⚠️ Partially Supports | ❌ Does Not Support | ➖ Not Applicable | ↗ Inherited | 🚩 Flagged |
| :-------------------------------------------------------- | :---------- | :-------------------- | :------------------ | :---------------- | :---------- | :--------- |
| [Accordion](./Accordion/accessibility.md)                 | 19          | 0                     | 0                   | 31                | 5           | 3/19       |
| [AccordionSummary](./AccordionSummary/accessibility.md)   | 23          | 1                     | 0                   | 31                | —           | 3/24       |
| [Avatar](./Avatar/accessibility.md)                       | 9           | 2                     | 0                   | 44                | —           | 5/11       |
| [Button](./Button/accessibility.md)                       | 24          | 3                     | 0                   | 28                | —           | 7/27       |
| [Checkbox](./Checkbox/accessibility.md)                   | 24          | 1                     | 0                   | 30                | —           | 3/25       |
| [CircularProgress](./CircularProgress/accessibility.md)   | 8           | 3                     | 0                   | 44                | —           | 5/11       |
| [LinearProgress](./LinearProgress/accessibility.md)       | 8           | 3                     | 0                   | 44                | —           | 5/11       |
| [Radio](./Radio/accessibility.md)                         | 24          | 1                     | 0                   | 30                | —           | 2/25       |
| [RadioGroup](./RadioGroup/accessibility.md)               | 7           | 0                     | 0                   | 30                | 18          | 3/7        |
| [Switch](./Switch/accessibility.md)                       | 24          | 1                     | 0                   | 30                | —           | 2/25       |
| [TextField](./TextField/accessibility.md)                 | 25          | 3                     | 0                   | 27                | —           | 4/28       |
| [ToggleButton](./ToggleButton/accessibility.md)           | 21          | 3                     | 0                   | 31                | —           | 2/24       |
| [ToggleButtonGroup](./ToggleButtonGroup/accessibility.md) | 4           | 0                     | 0                   | 31                | 20          | 1/4        |

<!-- scorecard:end -->

The same rollup feeds the public [accessibility conformance page](../../../docs/data/material/getting-started/accessibility/accessibility.md), which restates these results for procurement in VPAT form.
