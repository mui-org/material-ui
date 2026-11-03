---
title: "MUI Update: What we've been working on (and why)"
description: An update on active projects, maintenance, and our focus areas in 2026.
date: 2026-01-01T08:00:00.000Z
authors: ['alelthomas']
tags: ['Product']
manualCard: false
---

<img width="692" height="297" alt="Blog banner: what we've been building at MUI" src="https://github.com/user-attachments/assets/6a3510a3-9915-4eaf-b485-fd9b69d5b68f" />

Over the last few months, we've seen more questions from the community about the status of different MUI projects and what we're focusing on.
We'd like to provide clarity on what we're actively investing in today, what we're maintaining, and what's currently on hold.

## Table of contents

- [Where our focus is in 2026](#where-our-focus-is-in-2026)
  - [Material UI](#material-ui)
  - [Base UI](#base-ui)
  - [MUI X](#mui-x)
- [Projects currently on hold or in limited maintenace](#projects-currently-on-hold-or-in-limited-maintenance)
  - [Pigment CSS](#pigment-css)
  - [Joy UI](#joy-ui)
  - [Toolpad](#toolpad)
  - [MUI Sync](#mui-sync)
- [How we're improving communication going forward](#how-were-improving-communication-going-forward)

## Where our focus is in 2026

### Material UI

<img width="692" height="390" loading="lazy" alt="NumberField component is now available." src="https://github.com/user-attachments/assets/ca08c54f-ca30-4c34-8688-32617660144e" />

Material UI continues to be a core focus for us.

We're currently maintaining the library and continuing to ship new components and improvements.
Most recently, we released [NumberField](https://mui.com/material-ui/react-number-field/) (one of our most requested components), designed to fully integrate with Base UI primitives.

We're working on additional components built on top of Base UI, with examples like MenuBar and PreviewCard that are currently in progress.
Alongside this, we're drafting and shaping the feature set that will define the next major version of Material UI (v8).
While it's still early to share specifics, this work is under way and will be communicated as it solidifies.

### Base UI

<img width="692" height="390" alt="Base UI v1.1.0 announcement tweet" src="https://github.com/user-attachments/assets/1e699941-f38f-4275-a7c5-7179ecd251f3" />

Base UI is a major area of focus this year.

[MUI Base](https://v6.mui.com/base-ui/getting-started/) has been deprecated and replaced by Base UI, which represents our long-term direction for foundational, unstyled components.

We recently reached a major milestone by [releasing Base UI as stable](https://base-ui.com/react/overview/releases), followed by the v1.1 release earlier this month.
With stability in place, our focus is now on expanding the component set, improving documentation and guidance, and making adoption and migration easier for teams building their custom design systems.

Base UI is where we are concentrating our foundational work going forward.

### MUI X

<img width="692" height="390" alt="MUI X Data Grid updates since MUI X v8" src="https://github.com/user-attachments/assets/3f0bf173-1fdd-4efe-85a8-aed90a72549d" />

We're also investing in our MUI X advanced components: Data Grid, Charts, Tree View, and Date and Time Pickers.
As we prepare for the next major version, we've been continuously shipping new features and improvements since MUI X v8.
These updates have been covered in our [What's New](https://mui.com/x/whats-new/) section and our [most recent blog post](https://mui.com/blog/mui-x-end-v8/) outlining what's shipped since v8.

## Projects currently on hold or in limited maintenance

### Pigment CSS

Pigment CSS remains in alpha phase and is currently on hold.

We made fast progress early on, but it became clear that the underlying problems were not fully solved yet.
At that point, we made the decision to prioritize our roadmap and focus on one foundational problem at a time.

That prioritization led us to concentrate our efforts on Base UI—a project we've now successfully brought to stability after a long period of iteration.
Pigment CSS is not being developed at the moment.
While we still believe in the potential of the ideas behind it, progressing further would require a different approach.
So for now, development is paused.

### Joy UI

Joy UI is currently on hold.

We have no active plans or timelines to share, and the team is not focused on advancing with the project at this time.
We will be explicit if and when this changes.

### Toolpad

Toolpad is not actively maintained.

The maintainers are currently focused on other projects, and we may not be able to respond promptly to issues or pull requests.
For new projects, we don't recommend adopting Toolpad Core at this time.

As an alternative, you can use the CRUD dashboard template from the Material UI React templates page.
It provides an easy-to-customize, copy-pastable setup that covers many of the same dashboard and CRUD use cases without having to rely on Toolpad Core.

### MUI Sync

Development on the MUI Sync plugin was stopped in 2024.

We don't recommend using it for new projects.
Limited support is still available within the Design Kits repository, and issues can be reported [here](https://github.com/mui/mui-design-kits/issues).

## How we're improving communication going forward

One clear takeaway from community feedback is that it's not enough to quietly shift priorities.
We need to be clearer and more consistent about what's active, what's stable, and what's on hold.
Going forward, our intent is to be explicit about project statuses and sharing progress only when there's meaningful substance behind it.

This blog is part of that effort, and we'll continue refining how we communicate priorities so it's easier to understand where to invest your time and trust.

Thanks for your candid feedback—it's what helps us grow.
We're excited to continue building with you this 2026!
