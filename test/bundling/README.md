# Bundle fixtures

A collection of "smoke"-test that verify that the package layout is correct.

`createFixture` is used to create new or update existing fixtures.
The created file might need some manual adjustment since not every edge case is covered.

## Run a fixture

### To test a Pull Request

1. Checkout branch
1. `pnpm install`
1. `pnpm lerna run build --scope "@mui/*"`
1. `pnpm release:pack`
1. Navigate into the fixture you want to test (where the `package.json` is located)
1. `pnpm install --ignore-workspace`
1. `pnpm start`

### To test a published npm dist tag

_For example: `latest` or `next` on npm or a pkg.pr.new published version_

1. Navigate into the fixture you want to test (where the `package.json` is located)
1. Adjust `pnpm.overrides` of the `package.json` file to point to the desired version
1. `pnpm install --ignore-workspace`
1. `pnpm start`

### In CI

You have to run our CircleCI pipeline with the `workflow` parameter set to `bundling`.

With the following API request we're triggering a run of the bundling workflow in
PR #24289:

```bash
curl --request POST \
  --url https://circleci.com/api/v2/project/gh/mui/material-ui/pipeline \
  --header 'content-type: application/json' \
  --header 'Circle-Token: $CIRCLE_TOKEN' \
  --data-raw '{"branch":"pull/24289/head","parameters":{"workflow":"bundling"}}'
```

`$CIRCLE_TOKEN` must be set as an environment variable created from https://app.circleci.com/settings/user/tokens.

## Add a new fixture

1. Create a folder in `test/fixtures/bundling`
1. Add the necessary dependencies
1. Re-use the entries for `dependencies` and `pnpm.overrides` for `@mui/*` packages from the other fixtures
1. Create a template
1. Write a factory that fills the template in `test/bundling/scripts/createFixture`
1. Add an entry into the `bundling` CircleCI pipeline (`.circleci/config.yml`)
