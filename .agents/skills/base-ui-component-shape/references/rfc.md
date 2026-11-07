# RFC

Write `.shape/<kebab-name>/<kebab-name>-shape.md`. The team reads it to approve a shape and decide the forks, so put the recommendation and the forks first and keep the method short. Image paths are relative to the RFC file.

## Template

````md
# <Name> on Base UI: shape

## Context

<Two or three sentences: what the component is, which Base UI component it builds on, and the closest Material UI component.>

## Recommended shape

| Base UI part | Role                  | Rule and evidence                       |
| :----------- | :-------------------- | :-------------------------------------- |
| `Root`       | `<Name>`              | Public: …                               |
| `Portal`     | slot of `<Name>Popup` | Merged: no customization evidence found |
| …            | …                     | …                                       |

<One sentence on what users write. Then the median lines of user code, the number of public parts, docs pages, and test suites, and the slots.>

## Forks

### 1. <The question, for example: Should `<Name>Item` take `icon` and `hint` props, or only children?>

<Why the rules do not settle it, in one or two sentences, with the evidence.>

| Recommended: <choice>                            | Alternative: <choice>                            |
| :----------------------------------------------- | :----------------------------------------------- |
| ![](screenshots/<scenario>/recommended-open.png) | ![](screenshots/<scenario>/fork-<name>-open.png) |

<One row per scenario the fork changes.>

<details>
<summary>Recommended code</summary>

```tsx
<contents of scenarios/<scenario>/recommended.tsx>
```

</details>

<details>
<summary>Alternative code</summary>

```tsx
<contents of scenarios/<scenario>/fork-<name>.tsx>
```

</details>

|                                               | Recommended | Alternative |
| :-------------------------------------------- | :---------- | :---------- |
| Lines of user code in the affected scenarios  |             |             |
| Public parts, docs pages, test suites         |             |             |
| Slots                                         |             |             |
| Extra prototype code                          |             |             |
| Reversibility                                 |             |             |
| Consistency with <closest Material component> |             |             |

<Repeat for every fork, at most five.>

## Scenarios

### <Scenario title>

<One sentence and the source.>

![](screenshots/<scenario>/recommended-open.png)

Other states: [default](screenshots/<scenario>/recommended-default.png), [dark](screenshots/<scenario>/recommended-dark.png), [brand](screenshots/<scenario>/recommended-brand.png).

<details>
<summary>Code</summary>

```tsx
<contents of scenarios/<scenario>/recommended.tsx>
```

</details>

<Repeat for every scenario. Under the theming scenarios, list what the theme could not reach.>

## Findings

<Failures from step 5 and their cause.>

## Open questions

1. <Forks beyond the first five, and any other decision the team still has to make.>

## Inventory

<The step 1 table: every Base UI part, its customization evidence, and the matching piece of the closest Material UI component.>

## Approved shape

<Left empty. The team writes the approved part table here, with each fork's decision applied. base-ui-component-build reads this section.>
````

Show the `open` state when the component has a popup; otherwise show `default`.

## Sharing

The skill stops at the local file. Tell the author the ways to share an interactive version, and let them choose:

- A StackBlitz sandbox built from the shape and scenario files. The prototypes use published packages only, so they run as they are.
- A docs experiment page in a draft PR, which gets a Netlify deploy preview link.
- Teammates copy the scratch folder and the fixtures, then run `pnpm test:regressions:build` and `pnpm test:regressions:server` locally.
