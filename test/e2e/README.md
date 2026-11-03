# end-to-end testing

End-to-end tests (short <abbr title="end-to-end">e2e</abbr>) are split into two parts:

1. The rendered UI (short: fixture)
2. Instrumentation of that UI

## Rendered UI

The composition of all tests happens in `./index.js`.
The rendered UI is located inside a separate file in `./fixtures` and written as a React component.
If you're adding a new test prefer a new component instead of editing existing files since that might unknowingly alter existing tests.

## Instrumentation

We're using [`playwright`](https://playwright.dev) to replay user actions.
Each test tests only a single fixture.
A fixture can be loaded with `await renderFixture(fixturePath)`, for example `renderFixture('FocusTrap/OpenFocusTrap')`.

## Commands

For development, run `pnpm test:e2e:dev` in one terminal and `pnpm -F ./test/e2e test --watch`
in another terminal.

| command                           | description                                                                   |
| :-------------------------------- | :---------------------------------------------------------------------------- |
| `pnpm test:e2e`                   | Full run. Builds the fixtures, starts the preview server, and runs the tests. |
| `pnpm test:e2e:dev`               | Starts the Vite dev server for the fixture app on port `5001`.                |
| `pnpm -F ./test/e2e test --watch` | Runs the e2e tests in watch mode against the running dev server.              |
| `pnpm -F ./test/e2e build`        | Builds the Vite fixture app.                                                  |
| `pnpm -F ./test/e2e server`       | Serves the built fixture app on port `5001`.                                  |
