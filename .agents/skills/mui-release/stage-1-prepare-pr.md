# Stage 1 — Prepare the release PR

All preparation lands as a normal PR against the branch being released (usually the repo's default branch, `master` in MUI repos; prereleases or older majors may release from a version branch — the README says which). Some repos require specific git remotes (an `upstream` pointing at the MUI repo, sometimes a dedicated docs remote) — check the README's prerequisites first.

1. Create a branch off the up-to-date upstream release branch (`git fetch upstream --tags` first — the changelog script compares against the last tag).
2. Ask the user for the target release version, showing them the current version (the root `package.json` version and the latest release tag) alongside the question so they can make an informed choice. If they passed a version when invoking the skill, use that instead of asking. Never pick the target version yourself.
3. Bump the root `package.json` version to the target release version.
4. Generate the changelog with `pnpm release:changelog` and **prepend** the output to the top-level `CHANGELOG.md`. Run with `--help` for options (comparison range, target branch, token flags).
5. Clean the generated changelog: match the format of the repo's existing GitHub releases, describe breaking changes explicitly, fix package-name casing. Preserve any marker comments the script inserts — downstream automation may depend on them.
6. Version the packages with `pnpm release:version` — an **interactive** (PTY) script that confirms the new version of each workspace package before bumping it (along with inter-package dependency ranges). Ask the user to run it in their own terminal and end the turn there. On the next turn, verify the outcome from `git diff` (which packages were bumped and to what) instead of the command's output, against these rules:
   - Only bump packages that have changes since the last release — but if the tooling detects **any** change, do not skip the bump.
   - Packages that track the root version — the repo's **main package** above all — must end up at exactly the root `package.json` version, even if that skips version numbers or the package had no changes of its own. The script skips unchanged packages, so the main package may need a manual bump after the run.
7. Open the PR titled `[release] <target-version>` (e.g. `[release] v1.2.0`) with the `release` label — stage 2 finds the release PR by this label. Keep the PR description minimal: none at all, or a single line when something genuinely needs calling out (the changelog in the diff is the description).

Some repos ship an interactive script (e.g. `pnpm release:prepare`) that automates this stage end to end — prefer it when the README offers one.

**Stage complete when:** the PR is approved and CI is green.

## Troubleshooting

- **Changelog script fails:** build the changelog manually from the GitHub compare view between the last tag and the release branch (`github.com/mui/<repo>/compare/<lastTag>...<branch>`).
