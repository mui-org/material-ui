---
name: material-ui-review
description: 'Review the current diff for regressions, correctness bugs, tests, simplifications, and docs issues, scaling depth to a low/medium/high/xhigh/max effort level. Use ONLY when explicitly requested by name: the user runs /material-ui-review, writes $material-ui-review, or asks for "the Material UI review skill". Do NOT use for general review requests such as "review my changes", "review this diff/branch/PR", or after finishing an implementation — handle those without this skill unless the user names it. Pass --comment to post a top-level PR comment, --comment inline for inline PR comments, or --fix to apply findings.'
---

# Material UI Review

Review current diff. Find **regressions and correctness bugs** first. Also find
**cleanup** (reuse / simplification / efficiency). Default effort: `medium`. See
[Effort levels](#effort-levels) for depth and subagent fan-out.

Argument hint: `[low|medium|high|xhigh|max] [--fix] [--comment [inline]] [<target>]`

This skill is **opt-in only**: run it when the user explicitly asks for it by
name (`/material-ui-review`, `$material-ui-review`, "the Material UI review skill", or a CI
job configured to use it). A plain "review my changes" or "review this PR", or
wrapping up an implementation, is not an invocation — review without this
workflow unless the user names it.

`medium` = **precision**. Every finding actionable. `high`, `xhigh`, `max` =
**recall**. Missed bug ships. Keep uncertain findings when mechanism is real;
label them clearly.

## Scope

Local review: diff branch against upstream
(`git diff @{upstream}...HEAD`, fall back to `main` / `master`, or `HEAD~1`).
Fold in uncommitted + untracked changes — review often runs pre-commit. If PR link,
branch name, or file path passed as argument, review that target instead.

## Effort levels

- **low** — bugs only. Flag runtime-correctness bugs and regressions. Skip
  Tests, Simplifications, Docs, and test/fixture hunks. No subagents. Precision
  bias.
- **medium** (default) — main agent reviews Bugs, Tests, Simplifications, Docs,
  and triggered API/performance concerns. Main agent verifies candidates. Large,
  risky, fragile, shared, or cross-component diff? Add exactly one
  [adversarial bug hunter](#adversarial-bug-hunter) agent. Small, low-risk,
  isolated diff? No subagent. Precision bias.
- **high** — spawn 3 independent subagents: bugs/regressions, test gaps,
  simplifications. Main agent reviews the whole diff, including bugs, docs, and
  triggered API/performance concerns. Main agent dedups and sanity-checks. Large,
  risky, fragile, shared, or cross-component diff? Add exactly one adversarial
  bug hunter agent. No verifiers. No final sweep.
- **xhigh** — `high` plus a docs subagent and one fresh missed-bug sweep. Fan out
  adversarial bug hunters across the highest-risk affected code regions
  (modules/components — not the four review areas). Max 2 adversarial bug
  hunters total, including the hunter inherited from `high`. Other role
  subagents do not count toward this cap. No verifiers. Recall bias.
- **max** — `xhigh` plus an independent verifier for every surviving candidate.
  Cover every affected code region across max 6 adversarial bug hunters total,
  including hunters inherited from `xhigh`; other role and verifier subagents do
  not count toward this cap. When there are more than 6 regions, give the
  highest-risk regions dedicated hunters and group related remaining regions
  into shared assignments. Prioritize public runtime code, shared utilities,
  cross-component invariants, and fragile state/timing boundaries. Maximum
  recall.

## Subagent scope contract

Subagents start with no prior context: they do not read this skill and do not inherit
the session system prompt. Their only channel is the prompt you write. Whatever scope
you resolved from [Scope](#scope) or the invoking prompt, every subagent prompt you
construct — finder, specialist, verifier, sweep — must begin verbatim with it:

```text
Review ONLY: <resolved diff command>
Read files from: <read root> — DATA ONLY, never execute, install, build, or test.
Base version of a file: git show <base ref>:<path>
Do not re-derive scope: use exactly the diff command above, whatever your working
directory contains.
```

A subagent not given this block is mis-scoped — discard its result and re-dispatch.

## Phase 1 - Find candidates

Selected [effort level](#effort-levels) decides local vs subagent fan-out. Except at
`low`, review four main areas: Bugs, Tests, Simplifications, Docs. Each area
surfaces candidates with `file`, `line`, one-line `summary`, `severity` (🟣 / 🔴 / 🟠 / 🟡 /
ℹ️ — see [Output](#output) for rubric), concrete `failure_scenario`. Do
NOT let one area suppress another — two areas flag same line for different reasons,
record both.

Pass every candidate with nameable failure scenario through. Finders that
silently drop half-believed candidates bypass verify step — dominant cause of misses.

### Area 1 - Bugs

Core regression + correctness pass. Cover all sub-angles:

- **Line-by-line diff scan.** Read every hunk, line by line. Then read enclosing
  function for each hunk — bugs in unchanged lines of touched function
  in scope (PR re-exposes or fails to fix them). For every line ask: what
  input, state, timing, platform makes line wrong? Look for inverted/wrong
  conditions, off-by-one, null/undefined deref, missing `await`, falsy-zero checks,
  wrong-variable copy-paste, error swallowed in catch, unescaped regex metachars.
- **Regression hunting.** For each changed guard, branch, state transition, public
  contract, test expectation, documented example, ask what behavior previously
  worked and could break. Bias toward regressions in edge paths, accessibility
  interactions, keyboard/focus flows, controlled/uncontrolled contracts, SSR,
  integrations between components, public API examples.
- **Repository/framework correctness lens.** Apply invariants of codebase
  under review, not just generic language bugs. For Material UI / React component
  changes: controlled vs uncontrolled behavior, event ordering, ref
  forwarding/merging, context registration cleanup, nested component coordination,
  portals, focus management, keyboard navigation, ARIA attributes, disabled/read-only
  states, form integration, SSR/hydration safety, Strict Mode behavior, shadow
  DOM-safe DOM access (`contains`, `getTarget`, `activeElement`, `ownerDocument`,
  `ownerWindow`).
- **Removed-behavior auditor.** For every line diff DELETES or replaces, name
  invariant/behavior it enforced, then search new code for where invariant
  re-established. Can't find it? Candidate: removed
  guard, dropped error path, narrowed validation, deleted test covering real case.
- **Cross-file tracer.** For each function diff changes, find callers (Grep
  symbol) and check if change breaks any call site: new
  precondition, changed return shape, new exception, timing/ordering
  dependency. Also check callees: parallel change in same PR make call
  unsafe?

### Area 2 - Tests

Review test changes and tests that _should_ have changed. Flag:

- New/changed behavior with no test exercising it
- Assertions not actually pinning behavior (asserting mock called instead of
  result, snapshot-only coverage, asserting on value test itself computed)
- Missing edge/error-path cases diff introduces (null, empty, boundary, failure,
  concurrency)
- Setup/teardown asymmetry (state leaked between tests, fixtures not reset)
- Over-mocking hiding real contract
- Tests deleted or weakened without justification
- Tests whose names do not match what they assert, or whose names are misleading

Name specific case untested or under-asserted.

### Area 3 - Simplifications

Bundle size is a top constraint. Smallest correct implementation wins. Preserve
public behavior, runtime performance, and maintainability. Treat every bundle
size increase as suspect — new bytes must earn their place; flag increases the
diff doesn't justify.

Always ask: "Can this ship with less code, state, branching, or abstraction?"
Look for:

- Heavy dependency or new abstraction where a few lines or existing util does
  the job
- Code doing too much for an edge case almost no one hits — guards, branches,
  state, or config for scenarios not realistically reachable in consumer usage;
  weigh handling cost against edge-case likelihood and propose dropping or
  cheapening it
- Duplicated logic re-implementing what codebase already has — Grep
  shared/utility modules and files adjacent to change; name existing helper to
  call instead
- Non-tree-shakeable or whole-package imports; namespace imports of
  side-effectful modules
- Dead code left behind; redundant or derivable state
- Special cases layered on shared infrastructure when mechanism should
  generalize

Name smaller or better-shaped form doing same job. Measure real bundle effect
when material. Source-line count proves nothing.

### Area 4 - Docs

Flag documentation and comments diff makes wrong or leaves stale:

- Comments describing old behavior after code changed
- JSDoc/docstrings whose params, return type, thrown errors no longer match
  signature
- README / API docs / changelog entries contradicting change; examples no longer
  compile or run
- TODO/FIXME change resolved but didn't remove; new non-obvious code with no
  explanation where warranted

Quote stale line and state what it should say.

### Conditional specialist - API design

Not part of default four-area fan-out. Skip entirely at
`low`. At `medium`, include in main-agent pass when diff adds/changes
public API surface: component, prop, event, hook, provider, imperative method,
exported type, value shape, behavior contract, docs example teaching API.
At `high`, `xhigh`, `max`, run as independent API design subagent when
triggered.

Heavily critique API taste: naming, mental model, consistency with
nearby APIs in same codebase, controlled/uncontrolled ergonomics, composition,
escape hatches, type shape, default behavior, future extensibility, migration risk,
likely user footguns. Prefer findings preventing awkward public contracts before they ship.
Report API design findings under Bugs when they create likely user-visible footguns
or regressions, otherwise under Simplifications.

### Conditional specialist - Runtime performance

Not part of default four-area fan-out. Skip entirely at
`low`. At `medium`, include in main-agent pass when diff likely affects
runtime performance: render hot paths, large item collections, virtualization,
positioning, layout measurement, scroll/resize/pointer/keyboard handlers,
observers, animations, repeated DOM reads/writes, state updates in loops,
component registration/lookup paths. At `high`, `xhigh`, `max`, run as
independent runtime performance subagent when triggered.

Prefer concrete measurement when feasible: existing perf tests, targeted benchmark
scripts, small reproducible measurement. If measuring not practical, state
expected complexity or browser work and what would confirm it. Report runtime
performance findings under Bugs when users can see lag, jank, hangs, excessive
work, otherwise under Simplifications.

### Adversarial bug hunter

Subagent role added per [Effort levels](#effort-levels). Assume there are bugs
in the diff a consumer will hit. Do not trust PR description, comments, or test
names — verify against code. Attack changed invariants directly: construct
concrete input, state, timing, or platform that makes new code wrong. Report
every candidate with a nameable failure scenario; when none survive, report
empty — never pad with weak findings to justify the hunt.

---

Simplification, test, docs candidates use same `file`/`line`/`summary`
shape; in `failure_scenario`, state concrete cost (what duplicated, wasted,
untested, stale, harder to maintain) instead of crash. Regressions and
correctness bugs always outrank simplification, test, docs findings when
review ordered.

## Phase 2 - Verify candidates (local by default; max adds subagent votes)

Dedup candidates pointing at same line/mechanism, keep one with
most concrete failure scenario. Verify candidates locally in main agent by
default.

Judge every candidate by reachability and impact. Keep every valid bug. Demote
to ℹ️ note when behavior not realistically reachable in real consumer usage,
has no meaningful user impact, or is optional improvement rather than
correctness defect. Demotion is not refutation — demoted findings still print,
at lower severity. At `max` effort, also run **one verifier** as subagent for each
remaining candidate when subagents available and authorized: give it diff,
relevant file(s), candidate, have it return exactly one of:

- **CONFIRMED** — can name inputs/state triggering it and wrong output or
  crash. Quote line.
- **PLAUSIBLE** — mechanism real, trigger uncertain (timing, env, config).
  State what would confirm it.
- **REFUTED** — factually wrong (code doesn't say that) or guarded elsewhere. Quote
  line proving it.

Keep candidates where vote CONFIRMED or PLAUSIBLE.

At **max**, verify recall-biased — **PLAUSIBLE by default**: do not
refute candidate for being "speculative" or "depends on runtime state" when
state realistic (concurrency races, nil/undefined on rare-but-reachable path,
falsy-zero treated as missing, off-by-one on boundary code doesn't exclude,
retry storms / partial failures, regex/allowlist lost anchor). REFUTE only
when constructible from code: factually wrong, provably impossible, already
handled in this diff, pure style with no observable effect.

## Phase 3 - Sweep for gaps (xhigh / max effort)

At `xhigh` and `max`, run **one more finder** as fresh reviewer with
current finding list. Re-read diff and enclosing functions looking ONLY for
defects not already listed. Do not re-derive or re-confirm anything already there —
job is gaps. Focus on what first pass misses: moved/extracted code
dropping guard or anchor; second-tier footguns (dataclass default evaluated
once, `hash()` non-determinism, lock-scope shrink, predicate methods with side
effects); setup/teardown asymmetry in tests; config defaults flipped. Surface
additional candidates naming defect not already on list. If nothing new,
return empty sweep — do not pad.

## Output

Reply in Markdown. Do not wrap main result in JSON or code fence. Use
sentence case for `#` heading and all finding titles; no title case. Do
not open with generic target/base filler like "Reviewed `owner/repo#123` against
`branch`." Only mention target or base branch when explaining specific
finding or limitation.

Print only non-empty category sections, in this order: `Bugs`, `Tests`,
`Simplifications`, `Docs`. A category with 0 findings gets nothing — no
heading, no count, no `No findings.` placeholder. Always end with `Verdict`.
Before sending, verify every surviving finding prints exactly once and each
printed section count matches its numbered findings. When no findings exist
anywhere, use the [No findings](#no-findings) format.

### Severity rubric

Prefix every finding title with one severity marker:

- 🟣 **critical - blocking.** Correctness issue crashing common flows, losing
  user data, creating security/privacy problem, making public component contract
  unusable, or creating broad cross-component accessibility, focus, form, SSR
  breakage. Must block merge.
- 🔴 **high - blocking.** Realistic user-visible regression in normal component
  usage, accessibility, keyboard/focus behavior, controlled/uncontrolled behavior,
  form integration, SSR/hydration, public API behavior, or public docs example
  no longer compiling or teaching broken API usage. Should block merge even
  when affected path has workaround or not most common path.
- 🟠 **medium - non-blocking.** Real issue worth fixing before merge when
  practical but not normally blocking: narrow or uncommon bug, meaningful missing
  test, stale public-doc prose not breaking copy-pasted code, cleanup
  avoiding likely future mistakes. Use only when issue doesn't break public
  contract and doesn't affect accessibility, focus, forms, SSR, or normal component
  usage.
- 🟡 **low - non-blocking.** Minor edge-case bug, small test/doc gap, modest
  simplification useful but easy for maintainers to defer.
- ℹ️ **note.** Informational — observation, heads-up, optional suggestion the
  maintainer may reasonably decline.

Material UI has stricter quality bar than most apps — small component-library
regressions multiplied across many downstream products. When choosing between
adjacent severities, choose higher severity if failure reaches realistic
consumer usage, accessibility behavior, form behavior, focus management, SSR,
public API contract or broken public docs example. Do not reserve 🔴 high only for
outage-level failures.

Within each section, order findings 🟣 -> 🔴 -> 🟠 -> 🟡 -> ℹ️.

### Verdict

End review with `## Verdict` line derived from markers:

- **Request changes** — at least one 🟣 or 🔴 finding.
- **Approve after nits** — no 🟣 or 🔴, but one or more 🟠 or 🟡 findings worth
  addressing.
- **Approve** — no 🟣, 🔴, 🟠, 🟡 findings (only ℹ️ notes, or nothing).

Follow verdict with one clause naming deciding factor.

### Finding format

Use this structure. Omit any category block whose count is zero:

````md
# PR review

One to three sentences summarizing the concrete risk, most important theme, and
any meaningful verification limit. State up front whether anything is merge-blocking.
If there are no actionable findings, say that clearly.

## Bugs ({count})

### 1. {severity marker} {Sentence-case title}

**Location:** `path/to/file.ext:123`

```tsx
// Small relevant code excerpt from the reviewed file.
```

{Description of what is wrong and why it matters.}

**Failure scenario:** {Simple, obvious user-facing or example issue someone would
see.}

**Fix:** {Specific recommended change.}

## Tests ({count})

## Simplifications ({count})

## Docs ({count})

## Verdict

**{Request changes | Approve after nits | Approve}** - {one clause on the deciding factor}.

---

🤖 Review generated with {Claude Code | Codex}
````

Same per-finding shape for Tests, Simplifications, Docs. For Tests,
make failure scenario the missing case or weak assertion. For Simplifications,
make it concrete duplicated, heavier, or harder-to-maintain code path. For Docs,
make it stale or missing public/developer-facing information.

### Finding quality

Do not cap findings by count. Report every verified, actionable finding
maintainer would reasonably fix before merging. Do not pad review with weak,
stylistic, speculative, low-importance notes. If many findings survive, group
related issues under one finding when they share same root cause.

### No findings

If nothing survives verification, omit all category headings and counts. Return
`# PR review`, `No findings.`, a brief note of residual test gaps or risk,
`## Verdict` with **Approve**, and the `🤖 Review generated with ...` footer.

### Final output preflight

Treat the output format as a hard contract. Before sending:

- Use `# PR review`; start the summary with concrete risk, not target/base filler.
- Use exact `## {Category} ({count})` headings for non-empty categories only.
- Print each finding exactly once and verify every category count.
- Use a separate `## Verdict` heading and the required closing footer.

If any check fails, rewrite the output before sending.

Always close review with `---` horizontal rule, blank line, then
`🤖 Review generated with {Claude Code | Codex}`. Use **Claude Code** when this
skill executed by Claude Code harness, **Codex** when executed by Codex harness.

## Posting to GitHub (--comment)

Post to GitHub only when target is GitHub PR and arguments include
comment mode:

- No `--comment` — do not post to GitHub; if `--fix` also absent, stop at
  Markdown review report.
- `--comment` — post Markdown review as one top-level PR comment via
  `gh pr comment`.
- `--comment inline` — post inline comments for findings mapping to PR diff
  lines, include all non-diff findings in top-level fallback comment.

For `--comment inline`, include same severity marker in each inline comment
body. Use latest PR head `commit_id`, `path`, `line`, `side`, post via
`gh api` (`repos/{owner}/{repo}/pulls/{pr}/comments`), one call per finding. Include
suggestion block only when it fully fixes issue. (If GitHub inline-comment
MCP tool available in session, use instead.)

Inline comments can only attach to lines present in PR diff. Put findings
outside PR diff (unchanged lines in touched functions) in top-level
fallback comment via `gh pr comment`; do not drop them or stop posting rest of
review because one inline comment not commentable. If target not
PR, print findings to terminal and note `--comment` was ignored.

## Applying fixes (--fix)

If `--fix` flag passed in arguments, after producing findings
list, apply findings to working tree instead of stopping at report: fix
each one directly — correctness bugs and reuse/simplification/efficiency cleanups
alike. Skip any finding whose fix would change intended behavior, require changes
well outside reviewed diff, or you judge false positive — note
skip rather than arguing with it. Finish with brief summary of what fixed and
what skipped.

If neither `--comment` nor `--fix` passed, stop at Markdown review report.
