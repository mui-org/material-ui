---
name: material-ui-styling
description: Chooses the right Material UI styling approach (sx, styled, theme overrides, global CSS) from official MUI guidance. Use when styling @mui/material components, customizing themes, overriding slots, or comparing sx vs styled.
license: MIT
metadata:
  author: mui
  version: '1.0.0'
---

# Material UI styling

Agent skill for picking the correct styling layer in Material UI (narrowest scope first). SKILL.md is the entry and index; AGENTS.md is the full guide.

## When to apply

- Choosing among `sx`, `styled()`, theme `components`, or global CSS for a change
- Overriding component slots or state safely
- Comparing `sx` vs `styled()` semantics (spacing, theme shortcuts)

## Sections in AGENTS.md (by priority)

| Order | Topic                          | Scope                                 |
| :---- | :----------------------------- | :------------------------------------ |
| 1     | Quick decision                 | Pick `sx` → `styled` → theme → global |
| 2     | `sx` prop                      | One-off / local                       |
| 3     | `styled()`                     | Reusable wrapper                      |
| 4     | `createTheme({ components })`  | All instances                         |
| 5     | `GlobalStyles` / `CssBaseline` | HTML baseline / globals               |
| 6     | `sx` vs `styled()` table       | Foot-gun prevention                   |

## Full guide

Read [AGENTS.md](./AGENTS.md) for the complete instructions, examples, and doc links.

Supplementary tables: [reference.md](./reference.md).
