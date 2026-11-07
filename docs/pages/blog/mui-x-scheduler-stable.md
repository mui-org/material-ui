---
title: MUI X Scheduler is production-ready
description: 'MUI X Scheduler is production-ready: calendar and timeline views, virtualization, lazy loading, responsive foundations, and what comes next.'
date: 2026-07-08T08:00:00.000Z
authors: ['josefreitas', 'rita-codes', 'noraleonte']
tags: ['MUI X', 'Product']
manualCard: false
---

<style>
  /* `object-fit: contain` avoids WebKit autoplay issues vs. layout `cover` on video. */
  /* `clip-path: inset(1px)` trims one decoded pixel per edge (common macroblock/ringing artifacts). */
  .markdown-body video {
    object-fit: contain !important;
    clip-path: inset(1px);
  }
</style>

<a href="/x/react-scheduler/">
  <img
    src="/static/blog/introducing-mui-x-scheduler-v9-alpha/scheduler-showcase.png"
    alt=""
    width="1600"
    height="900"
    loading="lazy"
    style="border: 0; width: 100%; height: auto;"
  />
</a>

We are excited to announce that [MUI X Scheduler](/x/react-scheduler/) is production-ready.

Scheduler brings production-ready calendar and timeline experiences to MUI X.
It includes date-first views for appointments and planning, resource-first views for operations and capacity, recurring events, drag-and-drop editing, and the foundations you need to fit scheduling into real products.

Three months ago, when we introduced Scheduler in alpha with MUI X v9, we said the goal was to move quickly toward stable once the API, performance, accessibility, and responsive foundations were ready.
This release closes that loop.
It turns Scheduler from a promising new surface into a component you can confidently build on.

For the full changelog, see the [MUI X releases](https://github.com/mui/mui-x/releases) timeline.

## Table of contents

- [From alpha to stable](#from-alpha-to-stable)
- [Event Calendar](#event-calendar)
- [Event Timeline](#event-timeline) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
- [Ready for larger schedules](#ready-for-larger-schedules) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
- [Resource hierarchies and visibility](#resource-hierarchies-and-visibility)
- [Better layouts on small screens](#better-layouts-on-small-screens)
- [Accessibility, localization, and API hardening](#accessibility-localization-and-api-hardening)
- [What's next for the Scheduler components](#whats-next-for-the-scheduler-components)
- [What's also new in MUI X](#whats-also-new-in-mui-x)
- [How to get involved](#how-to-get-involved)

## From alpha to stable

Scheduler started in v9 alpha as a new way to build time- and resource-centric applications on top of MUI X.
The alpha shipped the core mental model: events, resources, recurrence, calendar views, and a Premium timeline for dense planning.

Since then, the work has focused on the pieces that matter when a component moves from prototype to production:

- **Performance:** Event Timeline now supports virtualization and lazy loading for large resource boards.
- **Responsive behavior:** Scheduler now has a foundation for mobile-friendly layouts, including experimental compact/touch week-view work and responsive typography.
- **Resource management:** The resource sidebar now uses Tree View patterns for hierarchy, keyboard navigation, and expand/collapse behavior.
- **Accessibility:** Event Calendar now has full ARIA grid semantics, and Event Timeline accessibility work has continued with clearer labels and documentation.
- **Public API cleanup:** Types, JSDoc, exported models, and internal leaks were tightened before the stable contract was set.

If you tried the alpha or beta, review the Scheduler sections in the release notes before upgrading.
Several changes were intentional pre-stable cleanups to make the long-term API smaller, clearer, and easier to maintain.

## Event Calendar

The Event Calendar is the best starting point when users think in dates first.
It supports day, week, month, and agenda views for common scheduling use cases: appointments, team calendars, service desks, class schedules, room booking, and shift coordination.

<figure>
  <video
    src="/static/blog/introducing-mui-x-scheduler-v9-alpha/scheduler-calendar.mp4"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    controls
    width="1600"
    height="900"
    style="border: 0; width: 800px;"
  >
    <source src="/static/blog/introducing-mui-x-scheduler-v9-alpha/scheduler-calendar.mp4" type="video/mp4" />
  </video>
  <figcaption>Event Calendar in MUI X Scheduler.</figcaption>
</figure>

Scheduler gives you the interaction primitives expected from a real calendar: drag to move, resize to adjust duration, edit recurring events as a full series or as individual occurrences, and attach events to resources that match your application's domain.

## Event Timeline [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

The Event Timeline is the resource-first view.
It puts time on one axis and resources on the other so users can answer operational questions quickly: who is booked, which room is available, where a piece of equipment is assigned, and how work is distributed across a team.

<figure>
  <video
    src="/static/blog/introducing-mui-x-scheduler-v9-alpha/scheduler-timeline.mp4"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    controls
    width="2130"
    height="1404"
    style="border: 0; width: 800px;"
  >
    <source src="/static/blog/introducing-mui-x-scheduler-v9-alpha/scheduler-timeline.mp4" type="video/mp4" />
  </video>
  <figcaption>Event Timeline in MUI X Scheduler Premium.</figcaption>
</figure>

This makes Scheduler useful for dispatching, workforce planning, project staffing, healthcare appointments, education timetables, manufacturing boards, and logistics workflows where the schedule is not just a calendar but an operating surface.

One advantage of the Scheduler package is that these views share the same underlying event model.
You can start with calendar views when date navigation is enough, then use Timeline when resource density and capacity planning become central.

## Ready for larger schedules [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

Large schedules are hard because the UI can quickly become expensive to render: hundreds of resources, many visible events, recurring occurrences, dense headers, and frequent navigation across date ranges.

For the stable release, Event Timeline has two important foundations:

- **Virtualization** renders only the visible resource rows and events instead of mounting the entire schedule into the DOM.
- **Lazy loading** fetches events dynamically for the visible range, including when users navigate or switch views.

Together, these changes make Scheduler better suited for real operations boards, where the relevant dataset may be much larger than the current viewport.
They also bring Scheduler in line with the rest of MUI X: advanced components should support demanding data and interaction patterns without asking developers to rebuild the rendering engine themselves.

## Resource hierarchies and visibility

Resource lists are rarely flat in real applications.
Teams have departments, sites have rooms, fleets have categories, and project plans have nested ownership.

Scheduler now uses MUI X Tree View patterns in the resource sidebar.
That brings proper hierarchy semantics, arrow-key navigation, nested resource expansion and collapse, and checkbox-based visibility control.

This matters for both usability and accessibility.
Users can collapse parts of the resource tree to focus on the schedule they care about, and assistive technologies can understand the resource list as a real tree rather than a visually indented list.

## Better layouts on small screens

Scheduler is a dense component by nature, so small screens require product-specific decisions rather than shrinking the desktop view until it becomes unusable.

The stable milestone includes responsive groundwork: experimental compact/touch week-view work, responsive typography, and layout adjustments that make the calendar views behave better on smaller screens.

We're treating mobile Scheduler as an ongoing direction, not a one-time checkbox.
The next iterations will continue improving day and week views, and explore a month-plus-agenda pattern that matches how many mobile calendar apps balance overview and detail.

## Accessibility, localization, and API hardening

Stability also depends on the less visible work.
Event Calendar now has full ARIA grid semantics, fixed accessible labels in the Agenda and "+N more" flows, and tighter row and column indexing so screen readers have consistent context.
For Event Timeline, accessibility work continued through clearer labels and documentation, while deeper grid semantics remain an active area of improvement.

Localization improved as well, including better locale handling for recurring labels and new or refined locale coverage.
These details matter in scheduling, where weekday grammar, week starts, time format, and regional expectations are not cosmetic.

The public API also went through pre-stable cleanup:

- missing public types were exported;
- premium model types were exposed through public paths;
- internal styling context was removed from public exports;
- non-functional props were removed before they could become part of the stable contract;
- event IDs and invalid event dates are handled in more predictable ways.

This is the kind of work that makes a stable component feel reliable: the public surface is clearer, errors are easier to understand, and fewer implementation details leak into application code.

## What's next for the Scheduler components

Scheduler is stable, but the product direction is still moving quickly.
The next wave of work is focused on making Scheduler cover more planning workflows while keeping the component ergonomic inside MUI applications.

The biggest upcoming direction is **dependency management** in the Timeline.
Being able to express relationships between scheduled items brings the Timeline one step closer to Gantt-style planning, especially for teams that need to coordinate work across people, tasks, and time.

We will also keep investing in:

- **Mobile and responsive layouts:** better day, week, month, and agenda experiences across small screens.
- **Customization:** more control over dialogs, toolbars, event rendering, timeline controls, and view composition.
- **Integration with other tools:** calendar import/export, external calendar services, and data workflows that connect Scheduler with the rest of your stack.
- **Resource modeling:** richer resource relationships, visibility controls, and ergonomics for large hierarchies.
- **Performance:** continued work on virtualization, lazy loading, and interaction smoothness for dense schedules.

## What's also new in MUI X

Scheduler is the headline, but the MUI X v9 minor releases have continued moving the rest of the stack forward since v9.0.0.

Charts also received several performance and visualization updates.
WebGL rendering was added for Scatter and Bar charts, the same performance patterns were applied to Premium candlestick and heatmap rendering, radial line and radial bar charts were added, Bubble charts landed, and a progressive SVG renderer now paints large Scatter datasets in batched frames.
Radial bar charts also gained refinements such as percentage radius controls and optional tick labels.

Data Grid Pro added a new `multiSelect` column type, making multi-value filtering and editing flows easier to model directly in column definitions.

Scheduler itself moved through beta with Timeline lazy loading, Timeline virtualization, experimental compact/touch week-view work, accessibility documentation, and localization updates.

You can read the release notes for the full list of changes:
[v9.1.0](https://github.com/mui/mui-x/releases/tag/v9.1.0),
[v9.2.0](https://github.com/mui/mui-x/releases/tag/v9.2.0),
[v9.3.0](https://github.com/mui/mui-x/releases/tag/v9.3.0),
[v9.4.0](https://github.com/mui/mui-x/releases/tag/v9.4.0),
[v9.5.0](https://github.com/mui/mui-x/releases/tag/v9.5.0), and
[v9.6.0](https://github.com/mui/mui-x/releases/tag/v9.6.0).

## How to get involved

Your feedback shaped the stable release, and it will continue shaping what comes next.
Try Scheduler in your application, tell us where the model fits, and show us where it still needs to stretch.

- Start with the [Scheduler docs](/x/react-scheduler/).
- Share feedback through our [continuous feedback survey](https://forms.gle/Ksbc91D3PcMiiK5x9).
- Report bugs and request features [on GitHub](https://github.com/mui/mui-x/issues?q=is%3Aissue%20label%3A%22scope%3A%20scheduler%22).
