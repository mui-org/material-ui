# Module augmentation tests

Run the suite from the repository root:

```bash
pnpm typescript:module-augmentation
```

You can also use the workspace command:

```bash
pnpm -F ./test/moduleAugmentation typescript:module-augmentation
```

The package script uses pnpm to build the workspace dependencies before it tests
the fixtures. pnpm skips packages without a build script, including this test
workspace. The dependencies run their usual build scripts, which clear the output
folders, copy authored `.d.ts` files, and emit declarations from TypeScript source.
pnpm runs the build scripts directly, without the Nx cache. This adds build time
but prevents stale declarations from hiding errors. Shared dependencies are
built once.

This workspace has its own dependencies and a standalone TypeScript configuration.
It does not inherit the root source aliases. pnpm links the MUI dependencies to
build folders, so imports resolve through the built package exports. Keep the
fixtures here to avoid package self-references that can resolve to library source.

Fixture workers start the next test as soon as a worker is free. Each fixture
runs in a separate compiler process. The worker count defaults to Node's
`os.availableParallelism()`. Set `--concurrency` to limit memory use:

```bash
pnpm typescript:module-augmentation --concurrency 2
```

Build concurrency is separate and uses pnpm's workspace concurrency setting.

The compiler uses the installed `tsc`, including the version selected by CI. The
runner checks the compiler's file list and rejects library files outside the
build folders or files that are not `.d.ts`, `.d.mts`, or `.d.cts` declarations.

Keep implementation checks separate with `pnpm typescript`. Do not apply consumer
augmentations to library source or suppress declaration diagnostics. The
breakpoint fixtures check custom keys, removed keys, invalid keys, and isolation
from other fixtures.
