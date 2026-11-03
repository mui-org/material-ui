# Material UI Versions

<p class="description">You can come back to this page and switch the version of the docs you're reading at any time.</p>

## Released versions

The most recent stable version (✓) is recommended for use in production.

{{"component": "file://./demos/released/index.ts", "hideToolbar": true, "bg": "inline"}}

## Latest versions

Here you can find the latest unreleased documentation and code.
You can use it to see what changes are coming and provide better feedback to contributors.

{{"component": "file://./demos/latest/index.ts", "hideToolbar": true, "bg": "inline"}}

## Versioning strategy

Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly.
Stability is essential for the ecosystem around Material UI to thrive.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced predictably.

MUI's open-source projects follow [Semantic Versioning 2.0.0](https://semver.org/).
This means that the version numbers have three parts: `major.minor.patch`.
The version number is incremented based on the level of change included in the release.

- **Major releases** contain significant new features, some developer assistance is expected during the update.
  These releases include [breaking changes](#what-doesnt-count-as-a-breaking-change).
  When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs.
- **Minor releases** contain important new features.
  Minor releases are fully backward-compatible; no developer assistance is expected during the update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release.
- **Patch releases** are low risk, contain bug fixes and small new features.
  No developer assistance is expected during the update.

## What doesn't count as a breaking change?

We call "breaking changes" those that require updating your codebase when upgrading to a new version, with the exception of:

- **APIs starting with "unstable\_"**. These are provided as experimental features whose APIs we are not yet confident in.
  By releasing these with an `unstable_` prefix, we can iterate faster and get to a stable API sooner, or simply learn that we don't need the API/feature in the first place.
- **APIs documented as experimental**. Same as the above.
- **Undocumented APIs and internal data structures**. If you access internal properties, there is no warranty. You are on your own.
- **Development warnings**. Since these don't affect production behavior, we may add new warnings or modify existing warnings in between major versions.
  In fact, this is what allows us to reliably warn about upcoming breaking changes.
- **Pre-releases versions**. We provide pre-release versions as a way to test new features early, but we need the flexibility to make changes based on what we learn in the pre-release period.
  If you use these versions, note that APIs may change before the stable release.
- **Small CSS changes**. Visual design changes that have a very low probability of negatively impacting your UI are not considered breaking.

## Release frequency

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of MUI.

In general, you can expect the following release cycle:

- A **major** release every 12 months.
- A few **minor** releases for each major release.
- A **patch** release every month (anytime for an urgent bug fix).

## Release schedule

| Date           | Version | Status   |
| :------------- | :------ | :------- |
| April 2026     | v9.0.0  | Released |
| March 2025     | v7.0.0  | Released |
| August 2024    | v6.0.0  | Released |
| September 2021 | v5.0.0  | Released |
| May 2019       | v4.0.0  | Released |
| September 2018 | v3.0.0  | Released |
| May 2018       | v1.0.0  | Released |

You can follow the [milestones](https://github.com/mui/material-ui/milestones) for a more detailed overview.

:::warning
**Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction, for informational purposes only. We may decide to add or remove new items at any time, depending on our capability to deliver while meeting our quality standards. The development, releases, and timing of any features or functionality remain at the sole discretion of MUI. The roadmap does not represent a commitment, obligation, or promise to deliver at any time.
:::

## Deprecation practices

Sometimes "breaking changes", such as the removal of support for select APIs and features, are necessary.
To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools are provided when possible (for example codemods).
- The deprecation policy described below is followed so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
