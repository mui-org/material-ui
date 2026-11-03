# Oldest supported TypeScript major test

This test checks the built Material UI declarations with the latest stable release of TypeScript 5, the oldest supported major version.
It covers root and subpath imports of `createTheme`, `Button`, and `Menu` with `node`, `node16`, and `bundler` module resolution.
The Node.js 16 check includes CommonJS and ESM consumers.
Workspace links resolve to the package build folders. The test has no source aliases and checks library declarations.

Run these commands from the repository root:

```bash
pnpm release:build
pnpm -F ./test/typescriptMinimum test
```

Renovate keeps the TypeScript version pinned to the latest stable minor and patch release within major version 5.
Updates to a newer major version require a support policy change. The development compilers are separate.
