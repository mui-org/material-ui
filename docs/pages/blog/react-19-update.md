---
title: How we migrated MUI X to React 19
description: Learn how we migrated our library's codebase to React 19 while maintaining backward compatibility.
date: 2025-02-25
authors: ['arminmeh']
tags: ['MUI X']
manualCard: false
---

As maintainers of a popular set of React UI components, we planned to migrate our library's codebase to React 19 as soon as possible after its stable release, which came at the end of 2024.
This proved to be a major undertaking that required careful planning and execution.

This article describes our migration strategy, and how we addressed some of the key issues we encountered along the way.
We hope it may be useful to others who also need to support both versions of React in their codebase.

## The migration strategy

It was crucial for us to keep supporting older React versions, as many of our users rely on existing React 18 applications that can't be migrated immediately.

We understand that upgrading major versions takes time and planning, especially in large production applications, and we want to support our users' migration timelines.
At the same time, we didn't want to block early adopters of React 19 from using the latest React version with our packages.

So, we approached the migration in two phases:

1. First, we added React 19 compatibility while keeping the codebase on React 18
2. Then we moved the entire codebase to React 19 while maintaining compatibility with previous React versions

This shortened the time needed to release React 19 compatible versions of our packages.

### Phase 1: Adding React 19 compatibility

Our first step was checking the list of [breaking changes in React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#breaking-changes).

We were lucky that we didn't have to change much in the source code, but a lot of changes had to be made to our tests because of the modifications related to [strict mode](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#strict-mode-improvements) and [error reporting](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#errors-in-render-are-not-re-thrown).
These changes caused a different call count for our spies and different console outputs, so we had to expect different values based on the React major.

`@mui/internal-test-utils` provides an export `reactMajor` that extracts the major version of the React version used in the test.
We are using that to conditionally set the test expectations.

#### Error message modification

```ts
const errorMessage1 = 'MUI X: Could not find the animation ref context.';
const errorMessage2 =
  'It looks like you rendered your component outside of a ChartsContainer parent component.';
const errorMessage3 =
  'The above error occurred in the <UseSkipAnimation> component:';
const expectedError =
  reactMajor < 19
    ? [errorMessage1, errorMessage2, errorMessage3]
    : `${errorMessage1}\n${errorMessage2}`;
```

#### Strict mode modification

```ts
// Spy call count
//   1x during state initialization
// + 1x during state initialization (StrictMode)
// + 1x when sortedRowsSet is fired
// + 1x when sortedRowsSet is fired (StrictMode) = 4x

// Because of https://react.dev/blog/2024/04/25/react-19-upgrade-guide#strict-mode-improvements
// from React 19 it is:
//   1x during state initialization
// + 1x when sortedRowsSet is fired
const expectedCallCount = reactMajor >= 19 ? 2 : 4;
```

### Performance issue

In React 19, you can access `ref` as a prop for function components. `forwardRef` is no longer needed.
This created an [issue](https://github.com/mui/mui-x/issues/15770) for us, which was spotted by one of our community members.

Because `ref` is now also a prop, spreading props after the ref prop could potentially override the ref.
The existence of the `ref` prop on a `ForwardRef` component—even if `undefined`—makes the component props referentially unstable, which breaks downstream memoizations.

To address this, we added a `forwardRef` shim that enforces the correct prop ordering at the type level.

```tsx
// Compatibility shim that ensures stable props object for forwardRef components
// Fixes https://github.com/react/react/issues/31613
// We ensure that the ref is always present in the props object (even if that's not the case for older versions of React) to avoid the footgun of spreading props over the ref in the newer versions of React.
export const forwardRef = <T, P = {}>(
  render: React.ForwardRefRenderFunction<T, P & { ref: React.Ref<T> }>,
) => {
  if (reactMajor >= 19) {
    const Component = (props: any) => render(props, props.ref ?? null);
    Component.displayName = render.displayName ?? render.name;
    return Component as React.ForwardRefExoticComponent<P>;
  }
  return React.forwardRef(
    render as React.ForwardRefRenderFunction<T, React.PropsWithoutRef<P>>,
  );
};
```

The shim provides two key benefits:

1. Type safety - TypeScript will warn if props are spread incorrectly
2. Forward compatibility - Components using the shim will work correctly in all supported React versions

This is how we implemented it:

```tsx
// Before
const GridRoot = React.forwardRef((props, ref) => {
  const state = useGridState();
  return <div ref={ref} {...props} {...state} />;
});

// After
const GridRoot = forwardRef((props, ref) => {
  const state = useGridState();
  return <div {...props} {...state} ref={ref} />;
});
```

## Phase 2: Moving to React 19

After ensuring compatibility, we started working on migrating the codebase to React 19. This involved:

1. Updating all package dependencies to their React 19-compatible versions (including docs website migration to Next.js 15)
2. Migrating test utilities to work with React 19
3. Ensuring all components work with the new React 19 features
4. Updating CI to run tests with React 18
5. Updating type references with `RefObject` for React 19 and `MutableRefObject` for earlier versions

The biggest change in this phase was around the [`useRef()` hook update](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#useref-requires-argument).
The `apiRef` in the Data Grid component had to be updated from `MutableRefObject` to `RefObject` for React 19 only, to avoid type errors for users who haven't migrated yet.

### Our own `RefObject`

To provide different types for `apiRef` in the Data Grid component for different React versions, we created our own `RefObject` type.

We leveraged the fact that `useRef()` requires a param in React 19 to ensure `RefObject` would be evaluated as `MutableRefObject` for React < 19, and as `RefObject` otherwise.

```ts
// in React 19 useRef requires a parameter, so `() => any` will not match anymore
export type RefObject<T> = typeof React.useRef extends () => any
  ? React.MutableRefObject<T>
  : React.RefObject<T>;
```

## Conclusion

The migration to React 19 was a significant undertaking.
By breaking it down into two phases we were able to quickly provide React 19 compatibility for our users while we worked on our own migration.

The utilities and refactoring made during the migration will make it easier to maintain backward compatibility in the future, since `forwardRef` updates and `apiRef` type changes can all be done from one place.

Though this project was spearheaded by the MUI X team, we owe a special thanks to our colleagues who maintain Material UI for their massive help in adding React 19 support to both v5 and v6 of `@mui/material`.
They also provided the necessary updates to the internal tools that both of our repositories use for building and testing our components.

We hope our experience can be useful and shorten the time needed for your own React 19 migration!
