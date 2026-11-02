# Stage 2 — Merge the PR, then publish the packages

Requires stage 1 complete. Before merging, verify the PR still has the `release` label — the publish tooling finds the release PR by it.

1. Just before merging, the user announces a **merge freeze** on the team's Slack channel so nothing else lands until the release and docs deploy are done — as an agent, remind them of this step.
2. Merge the release PR.
3. Trigger the publish. It always runs through the repo's `publish.yml` GitHub Actions workflow, never from a local machine:
   - **CLI:** `pnpm release:publish` (maps to `code-infra publish`) finds the latest merged release PR, asks for confirmation, and dispatches the workflow. To publish from the exact release commit, pass the release PR's merge commit SHA on the default branch: `pnpm release:publish --sha <merge-commit-sha>` (get it with `gh pr view <number> --json mergeCommit`). The interactive picker may pre-select an unrelated commit — never accept the default without checking it's the `[release] vX.Y.Z` merge commit.
   - **GitHub UI:** open the publish workflow → "Run workflow", supplying the release commit SHA and options.

   Common options either way: a dry-run mode for debugging (also as `pnpm release:publish:dry-run` — still a real workflow run needing environment approval), an npm dist-tag for legacy/canary versions, and whether to auto-create the GitHub release. Legacy releases must pass `--sha` explicitly — the picker only sees the latest release PR.

4. The run pauses on the `npm-publish` environment: click "Review deployments" and approve it. **Never approve workflow runs you didn't initiate.**

**Stage complete when:** the workflow has published the packages to npm and created a **draft** GitHub release from the changelog.

## Troubleshooting

- **Publish reports "no new packages to publish":** the workflow ran against a commit whose package versions are already on npm — usually a wrong SHA (e.g. the picker's pre-selected default). Re-dispatch with `--sha <merge-commit-sha>` of the release PR.
