# OG Image

<p class="description">How the docs platform generate Open Graph card images.</p>

## The edge function

The URL `mui.com/edge-functions/og-image` can be queried with 4 search parameters:

- `product`: the text element displayed next to the MUI logo
- `title`: the title which can contains `\*` to delimit the highlighted (in blue) text sections
- `description`: a paragraph added under the main title
- `authors`: the GitHub usernames of the authors, separated by commas

## Usage with Markdown

By default, the card is generated using the page title and description.
You can override this behavior by providing different/specific `cardTitle` and `cardDescription` in the Markdown header, like so:

```markup
--
cardTitle: A *different* title than the page title
cardDecription: The word "different" on the title is highlighted
--
```

## Card design preview

Visit [this StackBlitz demo](https://stackblitz.com/edit/vitejs-vite-ukeejd?file=src%2FApp.tsx) to see how the card looks like without having to run a random page on an OG preview site.
