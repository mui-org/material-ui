# Testing

Thanks for writing tests! Here's a quick run-down on our current setup.

## Getting started

1. Add a unit test to `packages/*/src/TheUnitInQuestion/TheUnitInQuestion.test.js` or an integration test `packages/*/test/`.
2. Run `pnpm t TheUnitInQuestion`.
3. Implement the tested behavior
4. Open a PR once the test passes or if you want somebody to review your work

## Tools we use

- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [jsdom](https://github.com/jsdom/jsdom)

## Writing tests

For all unit tests, please use the return value from `@mui/internal-test-utils/createRenderer`.
It prepares the test suite and returns a function with the same interface as
[`render` from `@testing-library/react`](https://testing-library.com/docs/react-testing-library/api#render).

```js
describe('test suite', () => {
  const { render } = createRenderer();

  test('first', () => {
    render(<input />);
  });
});
```

For new tests please use `expect` from the BDD testing approach. Prefer to use as expressive [matchers](https://www.chaijs.com/api/bdd/) as possible. This keeps
the tests readable, and, more importantly, the message if they fail as descriptive as possible.

In addition to the core matchers from `chai` we also use matchers from [`chai-dom`](https://github.com/nathanboktae/chai-dom#readme).

Deciding where to put a test is (like naming things) a hard problem:

- When in doubt, put the new test case directly in the unit test file for that component, for example `packages/mui-material/src/Button/Button.test.js`.
- If your test requires multiple components from the library create a new integration test.
- If you find yourself using a lot of `data-testid` attributes or you're accessing
  a lot of styles consider adding a component (that doesn't require any interaction)
  to `test/regressions/tests/`, for example `test/regressions/tests/List/ListWithSomeStyleProp`
- If you have to dispatch and compose many different DOM events prefer end-to-end tests (Checkout the [end-to-end testing readme](./e2e/README.md) for more information.)

### Unexpected calls to `console.error` or `console.warn`

By default, our test suite fails if any test recorded `console.error` or `console.warn` calls that are unexpected.

The failure message includes the full test name (suite names + test name).
This should help locating the test in case the top of the stack can't be read due to excessive error messages.
The error includes the logged message as well as the stacktrace of that message.

You can explicitly [expect no console calls](#writing-a-test-for-consoleerror-or-consolewarn) for when you're adding a regression test.
This makes the test more readable and properly fails the test in watchmode if the test had unexpected `console` calls.

### Writing a test for `console.error` or `console.warn`

If you add a new warning via `console.error` or `console.warn` you should add tests that expect this message.
For tests that expect a call you can use our custom `toWarnDev` or `toErrorDev` matchers.
The expected messages must be a subset of the actual messages and match the casing.
The order of these messages must match as well.

Example:

```jsx
function SomeComponent({ variant }) {
  if (process.env.NODE_ENV !== 'production') {
    if (variant === 'unexpected') {
      console.error("That variant doesn't make sense.");
    }
    if (variant !== undefined) {
      console.error('`variant` is deprecated.');
    }
  }

  return <div />;
}
expect(() => {
  render(<SomeComponent variant="unexpected" />);
}).toErrorDev(["That variant doesn't make sense.", '`variant` is deprecated.']);
```

```js
function SomeComponent({ variant }) {
  if (process.env.NODE_ENV !== 'production') {
    if (variant === 'unexpected') {
      console.error("That variant doesn't make sense.");
    }
    if (variant !== undefined) {
      console.error('`variant` is deprecated.');
    }
  }

  return <div />;
}
expect(() => {
  render(<SomeComponent />);
}).not.toErrorDev();
```

## Commands

We uses a wide range of tests approach as each of them comes with a different
trade-off, mainly completeness vs. speed.

### React API level

#### Debugging tests

If you want to debug tests with the, for example Chrome inspector (chrome://inspect) you can run `pnpm t <testFilePattern> --debug`.
Note that the test will not get executed until you start code execution in the inspector.

We have a dedicated task to use VS Code's integrated debugger to debug the currently opened test file.
Open the test you want to run and press F5 (launch "Test Current File").

#### Run the core unit/integration test suite

To run all of the unit and integration tests run `pnpm test:unit`. You can scope down to one or more specific files with

```bash
pnpm test:unit <file name pattern>
```

If you want to `grep` for certain tests by name add `-t STRING_TO_GREP`

#### Watch the core unit/integration test suite

`pnpm t <testFilePattern>`

First, we have the **unit test** suite.
It uses [vitest](https://vitest.dev) and a thin wrapper around `@testing-library/react`.
Here is an [example](https://github.com/mui/material-ui/blob/6d9f42a637184a3b3cb552d2591e2cf39653025d/packages/mui-material/src/Dialog/Dialog.test.js#L60-L69) with the `Dialog` component.

Next, we have the **integration** tests. They are mostly used for components that
act as composite widgets like `Select` or `Menu`.
Here is an [example](https://github.com/mui/material-ui/blob/814fb60bbd8e500517b2307b6a297a638838ca89/packages/material-ui/test/integration/Menu.test.js#L98-L108) with the `Menu` component.

#### Create HTML coverage reports

`pnpm test:node --coverage`

```bash
# browser tests
pnpm test:browser run --coverage --coverage.reporter html
# node tests
pnpm test:node run --coverage --coverage.reporter html
# all tests
pnpm test:unit run --coverage --coverage.reporter html
```

When running this command you should get under `coverage/index.html` a full coverage report in HTML format. This is created using [Istanbul](https://istanbul.js.org)'s HTML reporter and gives good data such as line, branch and function coverage.

### DOM API level

#### Run the browser test suite

`pnpm test:browser`

Testing the components at the React level isn't enough;
we need to make sure they will behave as expected with a **real DOM**.
To solve that problem we use [vitest browser mode](https://vitest.dev/guide/browser/).
Our tests run on different browsers to increase the coverage:

- [Headless Chrome](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md)
- Headless Firefox
- Webkit

You can run on other browsers using `VITEST_BROWSERS=firefox,webkit pnpm test:browser`.

### Browser API level

In the end, components are going to be used in a real browser.
The DOM is just one dimension of that environment,
so we also need to take into account the rendering engine.

#### Visual regression tests

Check out the [visual regression testing readme](./regressions/README.md) for more information.

#### end-to-end tests

Checkout the [end-to-end testing readme](./e2e/README.md) for more information.

##### Development

When working on the visual regression tests you can run `pnpm test:regressions:dev` in the background to constantly rebuild the views used for visual regression testing.
To actually take the screenshots you can then run `pnpm test:regressions:run`.
You can pass the same arguments as you could to `vitest`.
For example, `pnpm test:regressions:run -t "docs-system-basic"` to take new screenshots of every demo in `docs/src/pages/system/basic`.
You can view the screenshots in `test/regressions/screenshots/chrome`.

Alternatively, you might want to open `http://localhost:5001` (while `pnpm test:regressions:dev` is running) to view individual views separately.

### Caveats

#### Accessibility tree exclusion

Our tests also explicitly document which parts of the queried element are included in
the accessibility (a11y) tree and which are excluded.
This check is fairly expensive which is why it is disabled when tests are run locally by default.
The rationale being that in almost all cases including or excluding elements from a query-set depending on their a11y-tree membership makes no difference.

The queries where this does make a difference explicitly include checking for a11y tree inclusion, for example `getByRole('button', { hidden: false })` (see [byRole documentation](https://testing-library.com/docs/dom-testing-library/api-queries#byrole) for more information).
To see if your test (`test:unit`) behaves the same between CI and local environment, set the environment variable `CI` to `'true'`.

Not considering a11y tree exclusion is a common cause of "Unable to find an accessible element with the role" or "Found multiple elements with the role".

### Performance monitoring

We have a dedicated CI task that profiles our core test suite.
Since this task is fairly expensive and not relevant to most day-to-day work it has to be started manually.
The CircleCI docs explain [how to start a pipeline manually](https://circleci.com/docs/api/v2/#operation/triggerPipeline) in detail.
Example:
With an environment variable `$CIRCLE_TOKEN` containing a [CircleCI personal access token](https://app.circleci.com/settings/user/tokens).

The following command triggers the `profile` workflow for the pull request #24289.

```bash
curl --request POST \
  --url https://circleci.com/api/v2/project/gh/mui/material-ui/pipeline \
  --header 'content-type: application/json' \
  --header 'Circle-Token: $CIRCLE_TOKEN' \
  --data-raw '{"branch":"pull/24289/head","parameters":{"workflow":"profile"}}'
```

To analyze this profile run you can use https://frontend-public.mui.com/test-profile/:job-number.

To find out the job number you can start with the response of the previous CircleCI API request which includes the created pipeline id.
You then have to search in the [CircleCI UI](https://app.circleci.com/pipelines/github/mui/material-ui) for the job number of `test_profile` that is part of the started pipeline.
The job number can be extracted from the URL of a particular CircleCI job.

For example, in https://app.circleci.com/pipelines/github/mui/material-ui/32796/workflows/23f946de-328e-49b7-9c94-bfe0a0248a12/jobs/211258 `jobs/211258` points to the job number which is in this case `211258` which means you want to visit https://frontend-public.mui.com/test-profile/211258 to analyze the profile.

### Testing multiple versions of React

You can check integration of different versions of React (for example different [release channels](https://react.dev/community/versioning-policy) or PRs to React) by running:

```bash
pnpm code-infra set-version-overrides --pkg react@<version>
```

Possible values for `version`:

- a tag on npm, for example `next`, `experimental` or `latest`
- an older version, for example `^17.0.0`

The command pins `react`, `react-dom` and `react-is` in the `overrides` field of `pnpm-workspace.yaml`, then runs `pnpm dedupe`.

To go back to the React version from the lockfile, revert those changes and reinstall:

```bash
git checkout pnpm-workspace.yaml pnpm-lock.yaml
pnpm install
```

#### CI

##### Circle CI web interface

There are two workflows that can be triggered for any given PR manually in the CircleCI web interface:

- `nightly`: runs the tests against React 18 and `react@next`, and the type tests against `typescript@next` and the minimum supported TypeScript version
- `react-17`: runs the tests against React 17

Follow these steps:

1. Go to https://app.circleci.com/pipelines/github/mui/material-ui?branch=pull/PR_NUMBER/head and replace `PR_NUMBER` with the PR number you want to test.
2. Click `Trigger Pipeline` button.
3. Expand `Add parameters (optional)` and add the following parameter:

   | Parameter type | Name       | Value                   |
   | :------------- | :--------- | :---------------------- |
   | `string`       | `workflow` | `nightly` or `react-17` |

4. Click `Trigger Pipeline` button.

##### API request

You can trigger the same workflows with an API request.
The following API request triggers a run of the `nightly` workflow in PR #24289:

```bash
curl --request POST \
  --url https://circleci.com/api/v2/project/gh/mui/material-ui/pipeline \
  --header 'content-type: application/json' \
  --header 'Circle-Token: $CIRCLE_TOKEN' \
  --data-raw '{"branch":"pull/24289/head","parameters":{"workflow":"nightly"}}'
```
