---
title: MUI X Chat v9 alpha
description: 'An early look at MUI X Chat v9 alpha: ChatBox, adapters and streaming, and how it fits AI-native workflows across the stack.'
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
hideFromHomeList: true
---

<style>
  /* `object-fit: contain` avoids WebKit autoplay issues vs. layout `cover` on video. */
  /* `clip-path: inset(1px)` trims one decoded pixel per edge (common macroblock/ringing artifacts). */
  .markdown-body video {
    object-fit: contain !important;
    clip-path: inset(1px);
  }
</style>

In v9 we're laying the groundwork for AI-native conversational experiences in MUI X.
[MUI X Chat](/x/react-chat/) centers on `ChatBox`, with adapters and streaming designed for real product workflows.

This post is an orientation, not an API reference: how the layers stack, why adapters and streams sit at the center, and how early work connects to Data Grid, Scheduler, and the v9 overview.

This new major is part of a coordinated effort across the entire product suite; for a complete look at the MUI ecosystem changes, check out the [Introducing Material UI and MUI X v9](/blog/introducing-mui-v9/) blog post.

## Table of contents

- [Quick start](#quick-start)
- [What alpha means](#what-alpha-means)
- [When to expect the stable](#when-to-expect-the-stable)
- [Chat showcase](#chat-showcase)
- [State, adapters, and streaming](#state-adapters-and-streaming)
- [Message parts beyond plain text](#message-parts-beyond-plain-text)
- [What's next](#whats-next)

## Quick start

Install the package and render your first chat surface in minutes: follow [the quickstart guide](/x/react-chat/) for your first working `ChatBox`.
Then wire your adapter and streaming path so users see tokens and tool output progressively as responses arrive.

## What alpha means

MUI X Chat is deliberately early: the docs are minimal for now, and you should expect breaking changes along the way as we receive feedback from users.
The goal is a foundation you can theme, swap providers on, and extend, not a frozen UI kit on day one.

If you're experimenting with tools, agents, or assistant UX beside your product surface, this is the layer where we want feedback and real integrations.

## When to expect the stable

We're targeting a stable Chat release in early June, based on the feedback and adoption patterns we see during alpha.
That target sets expectations; we will only ship as stable when the components are ready.

Keeping Chat in alpha is intentional because this is the phase where we can still make breaking changes before the next major while the API surface is being stress-tested.

## Chat showcase

<figure>
  <video
    src="/static/blog/introducing-mui-x-chat-v9-alpha/chat-showcase.mp4"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    controls
    width="2020"
    height="1664"
    style="border: 0; width: 800px;"
  >
    <source src="/static/blog/introducing-mui-x-chat-v9-alpha/chat-showcase.mp4" type="video/mp4" />
  </video>
  <figcaption>MUI X Chat showcase in v9 alpha.</figcaption>
</figure>

## State, adapters, and streaming

MUI X Chat work centers on entity types and a normalized store so conversations, threads, messages, participants, tool calls, and results don't turn into duplicated, fragile state as histories grow.

An adapter sits between that state and your backend: same UI whether you call OpenAI, an in‑house model, HTTP, WebSockets, or SSE, and the same boundary when orchestration lives outside React.

A stream processor coordinates token streams, partial parts, tool starts, and tool results so the UI can stay streaming‑first: partial text, progress, and mid‑stream tool UI without ad‑hoc race handling in every app.

Core chat hooks wire store, processor, and adapter together; tests lock those flows so we can iterate without regressing send/stream/tool behavior across tiers.

## Message parts beyond plain text

Modeling messages as parts (such as tool calls and results, sources, and file attachments) keeps assistant UX inspectable: users and developers can see what ran, on what data, and in what order.

Streaming treats responses as sequences of parts and tokens, not one immutable blob, which matters when Chat works alongside Data Grid transforms, Scheduler mutations, or other multi‑step automations where results arrive gradually.

## What's next

Phase 0-1 (v9) is delivered as one milestone: package APIs, core hooks, themed `ChatBox`, docs and examples, opinionated layouts (conversation surface, input, history, threads), and first-class wiring to other MUI X components.

Phase 2 expands workflow patterns ("chat with your data," "chat with your schedule," mixed chart and grid flows), with production-ready docs that help teams ship without reinventing glue code.

Phase 3 ships templates and tighter ecosystem combinations (advanced components + Material UI + Console where licensing applies), aligned with the v9 direction of clear intents and reversible state.

We will roll these milestones through the v9 cycle in regular releases; follow [MUI X releases](https://github.com/mui/mui-x/releases) for packaged updates.

## Further reading

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI v9](/blog/introducing-material-ui-v9/)
- [MUI X Data Grid v9.0](/blog/introducing-mui-x-data-grid-v9/)
- [MUI X Charts v9.0](/blog/introducing-mui-x-charts-v9/)
- [MUI X v9.0: Tree View, Date Pickers](/blog/introducing-mui-x-tree-view-and-pickers-v9/)
- [MUI X Scheduler v9 alpha](/blog/introducing-mui-x-scheduler-v9-alpha/)

## We want your feedback

Your input drives our direction.
Join our GitHub communities today to share your insights, report issues, and help shape the future.
Visit [MUI X on GitHub](https://github.com/mui/mui-x/issues?q=is%3Aissue%20label%3A%22scope%3A%20chat%22).
