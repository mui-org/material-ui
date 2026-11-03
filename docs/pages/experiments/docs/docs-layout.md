# Docs layout

<p class="description">How to configure the layout of docs pages, including wide layout mode and table of contents behavior.</p>

## Wide layout

By default, the docs page content is constrained to `105ch` (≈ 930px) to keep text readable.
The `wideLayout` prop expands the content area up to the `xl` breakpoint value (1536px by default), while keeping paragraphs (`<p>`) and list items (`<li>`) constrained to `105ch`.

This is useful for pages that contain wide content such as large demos, comparison tables, or data grids.

### Usage

Pass the `wideLayout` prop to `MarkdownDocs` or `MarkdownDocsV2` in the page component:

```jsx
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/components/table/table.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} wideLayout />;
}
```

### What it changes

- **Content max-width**: Expands from `105ch` to the `xl` breakpoint value.
- **Text readability**: Paragraphs and list items remain capped at `105ch`.
- **Table of contents**: Moves from appearing at the `md` breakpoint to only appearing at `xl + 242px` (the TOC width), giving the content more horizontal space on medium-to-large screens.

## Table of contents

By default, the table of contents (TOC) sidebar is shown on docs pages. It appears at the `md` breakpoint and reserves `242px` of horizontal space.

### Disabling the TOC

Pass the `disableToc` prop to `MarkdownDocs` or `MarkdownDocsV2` to hide the TOC sidebar:

```jsx
export default function Page() {
  return <MarkdownDocs {...pageProps} disableToc />;
}
```

When `disableToc` is set:

- The TOC sidebar and the mini TOC bar are not rendered.
- All space reserved for the TOC (margin offsets and extra width) is removed, so the content is centered naturally.
- The content max-width is set to `105ch`.

### Combining `disableToc` with `wideLayout`

Both props can be used together. When `disableToc` and `wideLayout` are both set:

```jsx
export default function Page() {
  return <MarkdownDocs {...pageProps} disableToc wideLayout />;
}
```

- The TOC sidebar is not rendered.
- The content area expands up to the `xl` breakpoint value (1536px), with no margin offset since the wide layout already uses the full available width.
- Paragraphs and list items remain constrained to `105ch` for readability.
