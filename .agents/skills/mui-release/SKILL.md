---
name: mui-release
description: Run or assist a release in any MUI repo, at any stage - release PR, npm publish, docs deploy, GitHub release.
argument-hint: '[target-version]'
---

# MUI Release

Every MUI repo releases through the same staged pipeline. Each stage depends on the previous one completing — never start a stage before its predecessor is done. This skill describes the shared skeleton; the details vary per repo.

**Resumable:** the skill can be invoked at any stage — a release often spans multiple sessions (e.g. the PR was created and merged earlier, and the user now wants to trigger the npm publish). In the pipeline diagram below, each arrow out of a stage states the observable evidence that the stage is complete: resume at the first stage whose evidence is missing. Confirm the detected stage with the user before continuing; earlier stages' outputs are inputs, not work to redo.

**Source of truth:** the target repo's `scripts/README.md` is the authoritative, evolving runbook. Always read it in the target checkout before releasing; use this skill to know what the stages mean and what to expect. Where the README contradicts this skill, the README wins. Repo-specific steps (docs release pages, hotfix flows, prerelease progressions, docs-only deploys, first-time package publishing) live only there. Repos without that runbook: read their release workflow directly.

## The pipeline

Each stage's instructions live in its own file — after detecting and confirming the current stage, read **that stage's file**:

```mermaid
flowchart TD
    S1["Stage 1: Prepare the release PR\n(stage-1-prepare-pr.md)"]
    S2["Stage 2: Merge the PR, then publish\n(stage-2-publish-packages.md)"]
    S3["Stage 3: Publish the docs\n(stage-3-publish-docs.md)"]
    S4["Stage 4: Publish the GitHub release, then announce\n(stage-4-github-release.md)"]

    S1 -- "open PR with the release label,\napproved, CI green" --> S2
    S2 -- "release PR merged, packages on npm at\nthe new version, draft GitHub release created" --> S3
    S3 -- "docs live for the new version" --> S4
    S4 -- "published non-draft GitHub release for the\ncurrent root package.json version\n(release done, next one starts at Stage 1)" --> S1
```

Verify each stage's evidence with read-only commands (run in the target checkout; `<version>` is the root `package.json` version):

```bash
# release PR: open (stage 1) or merged (stage 2 done merging)
gh pr list --label release --state open --json number,title,reviewDecision
gh pr list --label release --state merged --limit 1 --json number,title,mergedAt
gh pr checks <number>                      # CI green?

# packages on npm at the new version
npm view <main-package>@<version> version

# GitHub release: exists? still a draft?
gh release list --limit 5 --json tagName,isDraft,isLatest
gh release view "v<version>" --json tagName,isDraft

# docs live for the new version
curl -s <docs-url> | grep "<version>"      # or check the Netlify dashboard
```
