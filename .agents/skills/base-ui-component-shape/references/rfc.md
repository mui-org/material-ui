# RFC

Write `.shape/<kebab-name>/<kebab-name>-shape.md`. The team reads it to choose a shape, so put the comparison first and keep the method short. Image paths are relative to the RFC file.

## Template

````md
# <Name> on Base UI: shape options

## Context

<Two or three sentences: what the component is, which Base UI component it builds on, and the closest Material UI component.>

## Options

| Base UI part | Closed           | Balanced | Open     |
| :----------- | :--------------- | :------- | :------- |
| `Root`       | prop of `<Name>` | `<Name>` | `<Name>` |
| …            | …                | …        | …        |

<One sentence per option on what users write.>

## Scenarios

### <Scenario title>

<One sentence and the source.>

| Closed                                      | Balanced                                      | Open                                      |
| :------------------------------------------ | :-------------------------------------------- | :---------------------------------------- |
| ![](screenshots/<scenario>/closed-open.png) | ![](screenshots/<scenario>/balanced-open.png) | ![](screenshots/<scenario>/open-open.png) |

<details>
<summary>Closed code</summary>

```tsx
<contents of scenarios/<scenario>/closed.tsx>
```

</details>

<details>
<summary>Balanced code</summary>

```tsx
<…>
```

</details>

<details>
<summary>Open code</summary>

```tsx
<…>
```

</details>

<Repeat for every scenario. Under the theming scenarios, list what each option's theme could not reach.>

## Trade-offs

|                                               | Closed | Balanced | Open |
| :-------------------------------------------- | :----- | :------- | :--- |
| Lines of user code (median per scenario)      |        |          |      |
| Public parts, docs pages, test suites         |        |          |      |
| Slots                                         |        |          |      |
| Extra prototype code                          |        |          |      |
| Reversibility                                 |        |          |      |
| Consistency with <closest Material component> |        |          |      |

## Findings

<Failures from step 4 and their cause, per option.>

## Inventory

<The step 1 table: every Base UI part, its customization evidence, and the matching piece of the closest Material UI component.>

## Open questions

1. <A decision the team still has to make.>

## Approved shape

<Left empty. The team writes the chosen option and the final part table here. base-ui-component-build reads this section.>
````

Show the `open` state in the comparison rows when the component has a popup; link the other states (`default`, `dark`, `brand`) under each row.

## Sharing

The skill stops at the local file. Tell the author the ways to share an interactive version, and let them choose:

- A StackBlitz sandbox built from the option and scenario files. The prototypes use published packages only, so they run as they are.
- A docs experiment page in a draft PR, which gets a Netlify deploy preview link.
- Teammates copy the scratch folder and the fixtures, then run `pnpm test:regressions:build` and `pnpm test:regressions:server` locally.
