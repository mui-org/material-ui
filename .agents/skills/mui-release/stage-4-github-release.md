# Stage 4 — Publish the GitHub release, then announce

Requires stage 3 complete (docs live).

1. Review the draft release on the repo's GitHub releases page and publish it. Mark it correctly for what's being released:
   - Stable release on the current major → **Set as the latest release**.
   - Release for an older major → do **not** set as latest — the current major's release must keep the "Latest" badge.
   - Unstable version (alpha/beta/RC) → check **Set as a pre-release** instead.
2. The user lifts the merge freeze on Slack and follows the team's internal announcement instructions — as an agent, remind them of both.

**Stage complete when:** the GitHub release is public (non-draft) — the release is done. The freeze lift and announcement are on the user's side; remind them.
