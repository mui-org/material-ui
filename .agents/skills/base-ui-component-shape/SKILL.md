---
name: base-ui-component-shape
description: Find the shape of a new Material UI component built on Base UI, meaning which pieces end users write in their code. Derives one recommended shape from evidence, lists the few forks where the team must decide, and backs both with prototypes, screenshots, and an RFC. Run before base-ui-component-build.
disable-model-invocation: true
---

# Shape a Material UI component on Base UI

Before anyone builds a component on Base UI, the team decides its **shape**: which pieces end users write in their code.
At one end, one closed component wraps every Base UI part and exposes props.
At the other end, every Base UI part is its own public part.
The right shape sits between them, and it is decided part by part: the Menu v2 work ([#48823](https://github.com/mui/material-ui/pull/48823)) merges Base UI's Portal, Positioner, and Popup into one `Menu2Popup` part, because users rarely customize them alone, but keeps the trigger and the items as public parts.

This skill derives one **recommended shape** from evidence, then lists the **forks**: the few parts where the evidence is weak, the rules conflict, or a product decision is needed.
The team approves the recommendation and decides each fork, from the code end users write and from screenshots of what it renders.
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

Collect the scenarios the shape must handle. Follow [references/scenarios.md](references/scenarios.md), which includes the research briefs for the composition scenarios.

Done when all three categories in `scenarios.md` are present, every scenario names its source, and the composition research has returned.

### 3. Recommended shape

Give every Base UI part one role: its own public part, a slot of a named part, a prop, or hidden. Apply these rules in order:

1. **Merge only parts without customization evidence.** A part joins a neighbor (as a slot or a prop) only when the step 1 inventory found no issue or discussion where users customize it alone. Portal and Positioner usually qualify; a trigger usually does not.
2. **Nested structures repeat the top-level shape.** A submenu has the same parts as a menu (root, trigger, popup), so users learn one pattern.
3. **Follow the closest Material UI component** where it already answers the question, so users meet patterns they know.
4. **When the evidence is neutral, keep the part public.** The team's direction is toward more open components.

Done when a table gives every inventory row a role and names the rule and the evidence behind it.

### 4. Forks

A **fork** is a part where the recommendation is not settled by the rules: the evidence is thin (one old issue), two rules point different ways, or the answer is a product decision (exposing a part that Base UI marks as preview).
Each fork has two choices, the recommended one and the alternative.

Keep at most five forks, ranked by how many scenarios they change. Move the rest to the RFC's open questions.

Done when every fork names its part, its two choices, why the rules do not settle it, and the scenarios it changes.

### 5. Prototype and capture

Build the recommended shape as a prototype and write every scenario with it. For each fork, build a variant that changes only that part, and write only the scenarios the fork changes. Follow [references/prototype.md](references/prototype.md).

Render through `test/regressions` and capture: the recommended shape in every state, each fork variant in the `open` state. Follow [references/prototype.md](references/prototype.md#render-and-capture).

Look at every screenshot. A layout that breaks, a popup that does not open, or a composition that does not render is a finding: fix the prototype if the bug is in it, or record it as a cost of that choice.

Done when every scenario has a screenshot of every state for the recommended shape, every fork has screenshots of its affected scenarios for both choices, every failure is fixed or recorded, and the temporary fixtures are deleted.

### 6. Costs

For the recommended shape, and for each fork's alternative compared with it, measure:

- Lines of end-user code in the affected scenarios.
- Public parts, docs pages, and test suites.
- Slots.
- Code the prototype needed beyond plain wrappers (measured, not estimated).
- Reversibility: opening a part later only adds API; closing it later breaks users.
- Consistency with the closest Material UI component.

Done when the recommended shape and every fork have every measure filled in.

### 7. RFC

Write the RFC with [references/rfc.md](references/rfc.md).

Done when the file exists, every image it links exists, and the "Approved shape" section is left empty for the team.
Stop there and tell the author where the RFC and the scratch folder are. Mention the ways to share an interactive version (see [references/rfc.md](references/rfc.md#sharing)); the author decides.
