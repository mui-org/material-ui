/**
 * Opt-in interface for typing `data-*` attributes on MUI slot props.
 *
 * Slot prop types reject arbitrary `data-*` keys by design, so this interface is
 * empty by default. Augment it to declare the keys you want, and they become
 * assignable on every slot of every component that routes its slot props through
 * `@mui/utils/types`.
 *
 * Choose the form that matches how strict you want to be:
 *
 * - Loose index signature: accepts any `data-*` key, like the underlying DOM
 *   element. Simplest to set up, but you get no autocomplete and typos slip through.
 * - Explicit keys: lists each `data-*` key you allow. More to declare up front,
 *   in return for autocomplete and typo-checking on those keys.
 *
 * @example
 * // Loose: accept any `data-*` key.
 * declare module '@mui/utils/types' {
 *   interface DataAttributesOverrides {
 *     [k: `data-${string}`]: string | number | boolean | undefined;
 *   }
 * }
 *
 * @example
 * // Explicit: only the keys you declare, with autocomplete.
 * declare module '@mui/utils/types' {
 *   interface DataAttributesOverrides {
 *     'data-testid'?: string;
 *   }
 * }
 */
export interface DataAttributesOverrides {}

/**
 * Widens a slot-props type so that, when a consumer augments
 * `DataAttributesOverrides`, the augmented keys become assignable to the
 * widened branch. `DataAttributesOverrides` is empty by default, so this
 * widening is a no-op until a consumer opts in.
 *
 * Implemented as a union between the original type and the intersected widened
 * form — `T | (T & DataAttributesOverrides)` — so that pre-typed values remain
 * assignable to the original branch without having to declare a `data-*`
 * index signature themselves, while object literals can pick up the widened
 * branch and include the augmented keys.
 */
export type WithDataAttributes<T> = T | (T & DataAttributesOverrides);
