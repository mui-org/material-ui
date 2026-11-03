---
title: A pattern for opt-in type-only breaking changes in minor versions
description: Discover how MUI prevents type-breaking changes in minor versions using TypeScript's interface merging and module augmentation.
date: 2026-01-15
authors: ['bernardobelchior']
tags: ['MUI X', 'Tech']
manualCard: false
---

At MUI, type errors across non-major versions are considered breaking changes. This article demonstrates how we use TypeScript's interface merging and module augmentation features to allow users to opt in to breaking changes in types, so we can keep shipping new functionality in minor releases.

## Context

Recently, we introduced our new [Range Bar chart](https://mui.com/x/react-charts/range-bar/) which has a new type to represent its data points:

```tsx
/** [start, end] */
type RangeBarValueType = [number, number];
```

If you want to add a range bar chart, you need to use a bar chart from the Premium plan:

```tsx
<BarChartPremium
  xAxis={[{ data: months }]}
  series={[
    {
      type: 'rangeBar',
      data: [
        [13, 21],
        [17, 25],
      ],
    },
  ]}
/>
```

The bar chart accepts an `onAxisClick` prop, which is called when an user clicks on the chart. This callback is invoked with the event that triggered the click and another argument containing information about the axis section that was clicked. This information is typed as `ChartsAxisData | null`, its definition being as follows:

```tsx
type OnAxisClickCallback = (event: MouseEvent, data: null | ChartsAxisData) => void;

interface ChartsAxisData {
  dataIndex: number;
  axisValue: number | Date | string;
  /**
   * The mapping of series IDs to their value for this particular axis index.
   */
  seriesValues: Record<string, number | null | undefined>;
}
```

The `seriesValues` property of `ChartsAxisData` is a mapping from series ID to the value of that series for the clicked axis section. However, data points in range bar charts must conform to the `RangeBarValueType` type we saw above.

When adding the range bar chart, we attempted to widen the type union:

```tsx
interface ChartsAxisData {
  dataIndex: number;
  axisValue: number | Date | string;
  seriesValues: Record<string, RangeBarValueType | number | null | undefined>;
  //                           ^^^^^^^^^^^^^^^^^
  //                           Added `RangeBarValueType` here
}
```

However, this would cause type errors in cases such as these:

```tsx
function RangeBarChart() {
  const [seriesValues, setSeriesValues] = useState<number | null | undefined>();

  return (
    <BarChartPremium
      xAxis={[{ data: months }]}
      series={[
        {
          type: 'rangeBar',
          data: [
            [13, 21],
            [17, 25],
          ],
        },
      ]}
      onAxisClick={(_event, data) => setSeriesValues(data?.seriesValues)}
      /* TS2345: Argument of type                    ^^^^^^^^^^^^^^^^^^
       * Record<string, number | RangeBarValueType | null | undefined> | undefined
       * is not assignable to parameter of type SetStateAction<number | null | undefined>
       * Type Record<string, number | RangeBarValueType | null | undefined>
       * is not assignable to type SetStateAction<number | null | undefined>
       */
    />
  );
}
```

## Solution

The solution we found for this issue relies on TypeScript's module augmentation and interface merging features.
We can leverage the latter to add more properties or widen the type of a property in an interface.
An initial approach could look like this:

```diff
  interface ChartsAxisData {
    // ...
    seriesValues: Record<string, number | null | undefined>;
  }
+
+ interface ChartsAxisData {
+  seriesValues: Record<string, RangeBarValueType | number | null | undefined>;
+ }
```

However, this doesn't work because we're changing the type of `seriesValues`. We can only widen the type or add more properties to the interface.

```tsx
interface ChartsAxisData {
  // ...
  seriesValues: Record<string, number | null | undefined>;
}

interface ChartsAxisData {
  seriesValues: Record<string, RangeBarValueType | number | null | undefined>;
  // ^^^^^^^^^
  // TS2717: Subsequent property declarations must have the same type.
  // Property seriesValues must be of type Record<string, number | null | undefined>,
  // but here has type Record<string, number | RangeBarValueType | null | undefined>
}
```

So this is what we came up with:

```tsx
export interface ChartsTypeFeatureFlags {}
type HasProperty<T, K extends string> = K extends keyof T ? true : false;

export interface ChartsAxisData {
  dataIndex: number;
  axisValue: number | Date | string;
  /**
   * The mapping of series ids to their value for this particular axis index.
   */
  seriesValues: Record<
    string,
    HasProperty<ChartsTypeFeatureFlags, 'seriesValueOverride'> extends true
      ? // @ts-ignore this property is added through module augmentation
        ChartsTypeFeatureFlags['seriesValuesOverride']
      : number | null | undefined
  >;
}
```

The original `ChartsAxisData` now depends on `ChartsTypeFeatureFlags` having a `seriesValuesOverride` property. If this property is present, `seriesValues` becomes `Record<string, ChartsTypeFeatureFlags['seriesValuesOverride']>`. However, if it's missing, it defaults to `Record<string, number | null | undefined>`.

Now, we just need to find a way to set `seriesValuesOverride` in `ChartsTypeFeatureFlags`.

As mentioned before, we can use interface merging to add more properties to an interface, so we leverage that plus module augmentation to add the property from a separate file that users can import if they need it:

```tsx
declare module '@mui/x-charts/models' {
  interface ChartsTypeFeatureFlags {
    seriesValuesOverride: RangeBarValueType | number | null | undefined;
  }
}

export default {};
```

Users just need to import the file above (for example, `import type {} from '@mui/x-charts-premium/moduleAugmentation/rangeBarOnClick`) and the `seriesValues` type will be correct! If the file isn't imported, the types remain unchanged.

Users that opt in to using the range bar chart and import the file will now experience a type error, but developers who don't use a range bar chart don't have to do anything and their application will continue to function and type-check.

Borrowing a previous example, this is how it would look like after importing the module augmentation file:

```tsx
import type {} from '@mui/x-charts-premium/moduleAugmentation/rangeBarOnClick';
// ^^ Import the module augmentation

function RangeBarChart() {
  const [seriesValues, setSeriesValues] = useState<
    RangeBarValueType | number | null | undefined
    // ^^^^^^^^^^^^^^ Correct the type
  >();

  return (
    <BarChartPremium
      xAxis={[{ data: months }]}
      series={[
        {
          type: 'rangeBar',
          data: [
            [13, 21],
            [17, 25],
          ],
        },
      ]}
      onAxisClick={(_event, data) => setSeriesValues(data?.seriesValues)}
      //                                             ^^^^^^^^^^^^^^^^^^
      //                                             No more type issues here
    />
  );
}
```

Unfortunately, this solution isn't perfect, and comes with the following trade-offs:

- **Type soundness**: if the library consumer uses the range bar chart's `onAxisClick` but doesn't import the module augmentation, the type will be displayed incorrectly as `number | null | undefined`, which might cause a runtime error. This drawback is mitigated by a clear callout in the bar range docs to import module augmentation.
- **Global module augmentation**: module augmentation is global, which means that once you import it, all other usages of the augmented types are affected. So if you import it to fix a range bar chart's `onAxisClick` type, then all other usages of `onAxisClick` will have this new type, potentially causing type errors.

For us, these trade-offs are acceptable since we'd rather release features earlier so our users can benefit from them. In the next major version, we will have the opportunity to clean up this tech debt and become leaner once more.

If you find any problems with this solution or if you would like to provide any feedback, open an issue in the [MUI X](https://github.com/mui/mui-x) repo.
