---
name: base-ui-component-shape
description: Compare how open a new Material UI component built on Base UI should be, from one closed component configured by props to one public part per Base UI part, with prototypes, screenshots, and an RFC for the team to decide. Run before base-ui-component-build.
disable-model-invocation: true
---

# Shape a Material UI component on Base UI

Before anyone builds a component on Base UI, the team decides its **shape**: which pieces end users write in their code.
At one end, one closed component wraps every Base UI part and exposes props.
At the other end, every Base UI part is its own public part.
Material UI usually sits between them: the Menu v2 work ([#48823](https://github.com/mui/material-ui/pull/48823)) merges Base UI's Portal, Positioner, and Popup into one `Menu2Popup` part, because users rarely customize them alone.

This skill does not pick the shape. It shows the team three options side by side, as the code end users write and as screenshots of what that code renders, so the team can decide.
`base-ui-component-build` then builds the approved shape; its conventions (`render`, `Pick`, `slots`) are the same for every shape.

The output is a local markdown RFC. Publishing it is the author's decision.

`<Name>` below is the component name (`Menubar`), `<kebab-name>` its kebab-case form.

## Steps

### 1. Inventory

Read the Base UI docs and types for the component in `docs/node_modules/@base-ui/react/` (`docs/react/components/<kebab-name>.md` and `<kebab-name>/**/*.d.ts`).
Find the closest existing Material UI component (`Menu` for a menubar, `Tooltip` for a preview card).
Search `mui/base-ui` issues and discussions with `gh` for each part: does anyone ask to customize, move, or replace it on its own?

List the parts from the "Anatomy" section of the Base UI docs, not only the package export. Some components reuse another component's parts: a Base UI menubar is built from `Menu` parts.

Done when a table lists every part in the Anatomy section plus helpers such as `createHandle`, each with its customization evidence (issue links, or "none found") and the matching piece of the closest Material UI component, if any.

### 2. Scenarios

Collect the scenarios the options must handle. Follow [references/scenarios.md](references/scenarios.md), which includes the research briefs for the composition scenarios.

Done when all three categories in `scenarios.md` are present, every scenario names its source, and the composition research has returned.

### 3. Options

Define three options: **closed**, **balanced**, and **open**.
For each, write a table that gives every Base UI part one role: its own public part, a slot of a named part, a prop, or hidden.
Then build each option as a prototype, following [references/prototype.md](references/prototype.md).

Done when every option's table covers every row of the step 1 inventory, and each option's prototype exports the parts in its table.

### 4. Render and capture

Write every scenario as end-user code for every option, render it through `test/regressions`, and capture the four states. Follow [references/prototype.md](references/prototype.md#render-and-capture).

Look at every screenshot. A layout that breaks, a popup that does not open, or a composition that does not render is a finding: fix the prototype if the bug is in it, or record it as a cost of that option.

Done when every scenario has a screenshot of every state for every option, every failure is fixed or recorded, and the temporary fixtures are deleted.

### 5. Trade-offs

Measure each option against the others:

- Lines of end-user code per scenario.
- Public parts, docs pages, and test suites the option creates.
- Slots the option needs.
- Code the prototype needed beyond the plain wrappers (measured, not estimated).
- Reversibility: opening a part later only adds API; closing it later breaks users.
- Consistency with the closest Material UI component.

Done when the trade-off table has no empty cell.

### 6. RFC

Write the RFC with [references/rfc.md](references/rfc.md).

Done when the file exists, every image it links exists, and the "Approved shape" section is left empty for the team.
Stop there and tell the author where the RFC and the scratch folder are. Mention the ways to share an interactive version (see [references/rfc.md](references/rfc.md#sharing)); the author decides.
