# Visual regression testing

Visual regression tests are split into two parts:

1. The rendered UI (short: fixture)
2. Instrumentation of that UI

## Rendered UI

The composition of all tests happens in `./index.js`.
The rendered UI is either:

1. located inside a separate file in `./fixtures` and written as a React component.

   Here is an [example](https://github.com/mui/material-ui/blob/814fb60bbd8e500517b2307b6a297a638838ca89/test/regressions/tests/Menu/SimpleMenuList.js#L6-L16) with the `Menu` component.

2. a demo from `docs/data`

   Most import-safe demos are included.
   Non-demo paths and interactive or flaky components are excluded in `./index.jsx`.

   Per-demo screenshot and accessibility rules live in `./demoMeta.ts`.
   This keeps screenshot exclusions separate from accessibility coverage.

If you introduce new behavior, prefer adding a demo to the documentation to solve documentation and testing with one file.
If you're adding a new test prefer a new component instead of editing existing files since that might unknowingly alter existing tests.

## Instrumentation

### Manual

`pnpm test:regressions:dev` will build all fixtures and render an overview page that lists all fixtures.
This can be used to debug individual fixtures.
By default, a devtools-like view is shown that can be disabled by appending `#no-dev` to the URL, for example `http://localhost:5001/docs-customization-typography/CustomResponsiveFontSizes#no-dev` or forced by appending `#dev` to the URL, for example `http://localhost:5001/docs-customization-typography/CustomResponsiveFontSizes#dev`.

### Automatic

We're using [`playwright`](https://playwright.dev) to iterate over each fixture in a real browser.

For screenshot-enabled fixtures, Playwright saves a screenshot in `./screenshots/$BROWSER_NAME/`.

Some demos also run axe-core accessibility checks.
Their results are saved next to the related component docs.

It allows catching regressions like this one:

![before](/test/docs-regressions-before.png)
![diff](/test/docs-regressions-diff.png)

Each test tests only a single fixture.
A fixture can be loaded with `await renderFixture(fixturePath)`, for example `renderFixture('FocusTrap/OpenFocusTrap')`.

Accessibility checks are opt-in.
Add rules in `./demoMeta.ts` under `A11Y_RULES`.
By default, only CSS-dependent visual axe rules are asserted.
Set `assertions: 'all'` when a fixture is expected to pass every axe rule it exercises.

Use a slug-wide rule for many demos, or a brace-glob for specific demos:

```ts
{ test: 'docs/data/material/components/buttons/{BasicButtons,ColorButtons}', enabled: true, assertions: 'all' }
```

Filtered runs with `-t` only refresh matched slugs.
Use an unfiltered run when you need to refresh all generated results.

## Commands

For development `pnpm test:regressions:dev` and `pnpm test:regressions:run --watch` in separate terminals is recommended.

| command                        | description                                                                                                           |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `pnpm test:regressions`        | Full run                                                                                                              |
| `pnpm test:regressions:dev`    | Prepares the fixtures to be able to test in watchmode                                                                 |
| `pnpm test:regressions:run`    | Runs the tests (requires `pnpm test:regressions:dev` or `pnpm test:regressions:build`+`pnpm test:regressions:server`) |
| `pnpm test:regressions:build`  | Builds the vite bundle for viewing the fixtures                                                                       |
| `pnpm test:regressions:server` | Serves the fixture bundle.                                                                                            |

## DocSearch search fixture

`algoliaSearchResponse.json` records a response from the live Algolia index.
The screenshot tests replay it without querying the index. Recent searches are
derived from the first two recorded hits.

To refresh the response, run this command from the repository root. The credentials
are the public search-only credentials used by `AppSearch`.

```bash
curl --fail-with-body --silent --show-error \
  'https://tzgz85b9tb-dsn.algolia.net/1/indexes/*/queries' \
  -H 'x-algolia-application-id: TZGZ85B9TB' \
  -H 'x-algolia-api-key: 8177dfb3e2be72b241ffb8c5abafa899' \
  -H 'content-type: application/json' \
  --data-binary @- \
  --output test/regressions/algoliaSearchResponse.json <<'JSON'
{
  "requests": [
    {
      "indexName": "material-ui-v9",
      "query": "container query",
      "hitsPerPage": 8,
      "facetFilters": [
        "version:master",
        "language:en"
      ],
      "filters": "NOT productId:base-ui",
      "optionalFilters": [
        "productId:material-ui"
      ],
      "attributesToRetrieve": [
        "hierarchy.lvl0",
        "hierarchy.lvl1",
        "hierarchy.lvl2",
        "hierarchy.lvl3",
        "hierarchy.lvl4",
        "hierarchy.lvl5",
        "hierarchy.lvl6",
        "content",
        "type",
        "url",
        "productId",
        "productCategoryId"
      ],
      "attributesToSnippet": [
        "hierarchy.lvl1:15",
        "hierarchy.lvl2:15",
        "hierarchy.lvl3:15",
        "hierarchy.lvl4:15",
        "hierarchy.lvl5:15",
        "hierarchy.lvl6:15",
        "content:15"
      ],
      "snippetEllipsisText": "…",
      "highlightPreTag": "<mark>",
      "highlightPostTag": "</mark>"
    }
  ]
}
JSON
pnpm exec prettier --write test/regressions/algoliaSearchResponse.json
```

The request uses the Material UI English search filters from `AppSearch` and
DocSearch's snippet settings. It limits the response to eight hits to keep the
fixture small. If the index or search settings change, update the request above
from the browser's Network panel while searching the Material UI docs. Keep the
query in `docsearchFixtureData.js` in sync with this request.

After refreshing, check that the results still include multiple sections, a
parent with children, highlighted matches, and a content snippet long enough to
exercise wrapping at 767px. Review the light and dark screenshots, including the
recent-search screen. Refresh recordings deliberately; do not query the live
index during screenshot tests.

Build and serve the regression bundle:

```bash
pnpm test:regressions:build
pnpm test:regressions:server
```

In another terminal, run the search captures:

```bash
pnpm test:regressions:run -t '/regression-AppSearch/'
```
