/* eslint-disable @typescript-eslint/naming-convention */
import { styled as scStyled } from 'styled-components';
import type * as React from 'react';
import type * as CSS from 'csstype';
import type * as hoistNonReactStatics from 'hoist-non-react-statics';

// Re-export the full `styled-components` *type* surface, matching the
// hand-written `.d.ts` that this conversion replaces. Type-only: emits
// nothing at runtime. Local declarations below intentionally shadow some
// styled-components names (`Keyframes`, `Interpolation`, `StyledComponent`,
// `CSSObject`, …) — local declarations win over re-exports.
export type * from 'styled-components';

type WithOptionalTheme<P extends { theme?: T | undefined }, T> = OmitU<P, 'theme'> & {
  theme?: T | undefined;
};

// Helper type operators
// Pick that distributes over union types
export type PickU<T, K extends keyof T> = T extends any ? { [P in K]: T[P] } : never;
export type OmitU<T, K extends keyof T> = T extends any ? PickU<T, Exclude<keyof T, K>> : never;

// Any prop that has a default prop becomes optional, but its type is unchanged
// Undeclared default props are augmented into the resulting allowable attributes
// If declared props have indexed properties, ignore default props entirely as keyof gets widened
// Wrap in an outer-level conditional type to allow distribution over props that are unions
type Defaultize<P, D> = P extends any
  ? string extends keyof P
    ? P
    : PickU<P, Exclude<keyof P, keyof D>> &
        Partial<PickU<P, Extract<keyof P, keyof D>>> &
        Partial<PickU<D, Exclude<keyof D, keyof P>>>
  : never;

export type IntrinsicElementsKeys = keyof React.JSX.IntrinsicElements;
type ReactDefaultizedProps<C, P> = C extends { defaultProps: infer D } ? Defaultize<P, D> : P;

type MakeAttrsOptional<
  C extends string | React.ComponentType<any>,
  O extends object,
  A extends keyof P,
  P = React.ComponentPropsWithRef<
    C extends IntrinsicElementsKeys | React.ComponentType<any> ? C : never
  >,
> =
  // Distribute unions early to avoid quadratic expansion
  P extends any ? OmitU<ReactDefaultizedProps<C, P> & O, A> & Partial<PickU<P & O, A>> : never;

export type StyledComponentProps<
  // The Component from whose props are derived
  C extends string | React.ComponentType<any>,
  // The Theme from the current context
  T extends object,
  // The other props added by the template
  O extends object,
  // The props that are made optional by .attrs
  A extends keyof any,
  // The Component passed with "forwardedAs" prop
  FAsC extends string | React.ComponentType<any> = C,
> =
  // Distribute O if O is a union type
  O extends object
    ? WithOptionalTheme<MakeAttrsOptional<C, O, A> & MakeAttrsOptional<FAsC, O, A>, T>
    : never;

export interface ThemeProps<T> {
  theme: T;
}

export type ThemedStyledProps<P, T> = P & ThemeProps<T>;

export interface Keyframes {
  getName(): string;
}

function styled(tag: any, options?: any): any {
  let stylesFactory: any;

  if (options) {
    stylesFactory = scStyled(tag).withConfig({
      displayName: options.label,
      shouldForwardProp: options.shouldForwardProp,
    });
  } else {
    stylesFactory = scStyled(tag);
  }

  if (process.env.NODE_ENV !== 'production') {
    const fn = (...styles: any[]) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';
      if (styles.length === 0) {
        console.error(
          [
            `MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`,
            'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
          ].join('\n'),
        );
      } else if (styles.some((style) => style === undefined)) {
        console.error(
          `MUI: the styled(${component})(...args) API requires all its args to be defined.`,
        );
      }
      return stylesFactory(...styles);
    };
    fn.withConfig = stylesFactory.withConfig;
    return fn;
  }

  return stylesFactory;
}

export default styled as unknown as typeof scStyled;

/**
 * For internal usage in `@mui/system` package
 */
export function internal_mutateStyles(
  tag: React.ElementType,
  processor: (styles: any) => any,
): void {
  // Styled-components attaches an instance to `componentStyle`.
  // https://github.com/styled-components/styled-components/blob/da8151762dcf72735ffba358173d4c097f6d5888/packages/styled-components/src/models/StyledComponent.ts#L257
  //
  // The instance contains `rules` (the styles)
  // https://github.com/styled-components/styled-components/blob/da8151762dcf72735ffba358173d4c097f6d5888/packages/styled-components/src/models/ComponentStyle.ts#L23
  if ((tag as any).componentStyle) {
    (tag as any).componentStyle.rules = processor((tag as any).componentStyle.rules);
  }
}

// Not needed anymore, but fixes https://github.com/mui/material-ui/issues/44112
// TODO: Remove it in v7
export function internal_processStyles(
  tag: React.ElementType,
  processor: (styles: any) => any,
): void {
  return internal_mutateStyles(tag, processor);
}

export function internal_serializeStyles<P>(styles: Interpolation<P>): object {
  return styles as object;
}

// styled-components has no cache that holds a nonce.
export function internal_useNonce(): string | undefined {
  return undefined;
}

export { ThemeContext, keyframes, css } from 'styled-components';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
export type { GlobalStylesProps } from './GlobalStyles';

// These are the same as the ones in @mui/styled-engine
// CSS.PropertiesFallback are necessary so that we support spreading of the mixins. For example:
// '@font-face'?: Fontface | Fontface[]
export type CSSProperties = CSS.PropertiesFallback<number | string>;
export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K] | Array<Extract<CSSProperties[K], string>>;
};
export type CSSPseudos = { [K in CSS.Pseudos]?: unknown | CSSObject };

export interface CSSOthersObject {
  [propertiesName: string]: unknown | CSSInterpolation;
}
export type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject };

export interface ArrayCSSInterpolation extends Array<CSSInterpolation> {}

export interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation;
}

// Omit variants as a key, because we have a special handling for it
export interface CSSObject
  extends CSSPropertiesWithMultiValues, CSSPseudos, Omit<CSSOthersObject, 'variants'> {}

interface CSSObjectWithVariants<Props> extends Omit<CSSObject, 'variants'> {
  variants: Array<{
    props: Props | ((props: Props) => boolean);
    style:
      | CSSObject
      | ((args: Props extends { theme: any } ? { theme: Props['theme'] } : any) => CSSObject);
  }>;
}

export type FalseyValue = undefined | null | false;
export type Interpolation<P> =
  | InterpolationValue
  | CSSObjectWithVariants<P>
  | InterpolationFunction<P>
  | FlattenInterpolation<P>;
// cannot be made a self-referential interface, breaks WithPropNested
// see https://github.com/microsoft/TypeScript/issues/34796
export type FlattenInterpolation<P> = ReadonlyArray<Interpolation<P>>;
export type InterpolationValue =
  string | number | FalseyValue | Keyframes | StyledComponentInterpolation | CSSObject;
export type SimpleInterpolation = InterpolationValue | FlattenSimpleInterpolation;
// adapter for compatibility with @mui/styled-engine
export type CSSInterpolation = SimpleInterpolation;
export type FlattenSimpleInterpolation = ReadonlyArray<SimpleInterpolation>;

export type InterpolationFunction<P> = (props: P) => Interpolation<P>;

// abuse Pick to strip the call signature from ForwardRefExoticComponent
type ForwardRefExoticBase<P> = PickU<
  React.ForwardRefExoticComponent<P>,
  keyof React.ForwardRefExoticComponent<any>
>;

type StyledComponentPropsWithAs<
  C extends string | React.ComponentType<any>,
  T extends object,
  O extends object,
  A extends keyof any,
  AsC extends string | React.ComponentType<any> = C,
  FAsC extends string | React.ComponentType<any> = C,
> = StyledComponentProps<C, T, O, A, FAsC> & {
  as?: AsC | undefined;
  forwardedAs?: FAsC | undefined;
};

export type StyledComponent<
  C extends keyof React.JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object = {},
  O extends object = {},
  A extends keyof any = never,
> =
  // the "string" allows this to be used as an object key
  // I really want to avoid this if possible but it's the only way to use nesting with object styles...
  string &
    StyledComponentBase<C, T, O, A> &
    hoistNonReactStatics.NonReactStatics<C extends React.ComponentType<any> ? C : never>;

// any doesn't count as assignable to never in the extends clause, and we default A to never
export type AnyStyledComponent =
  StyledComponentInstance | React.FunctionComponent<any> | React.ComponentType<any>;

type StyledComponentInstance = StyledComponent<any, any, any, any> | StyledComponent<any, any, any>;

export type StyledComponentInnerComponent<C extends AnyStyledComponent> =
  C extends StyledComponent<infer I, any, any, any>
    ? I
    : C extends StyledComponent<infer I, any, any>
      ? I
      : C;

export type StyledComponentInnerOtherProps<C extends AnyStyledComponent> =
  C extends StyledComponent<any, any, infer O, any>
    ? O
    : C extends StyledComponent<any, any, infer O>
      ? O
      : never;
export type StyledComponentInnerAttrs<C extends AnyStyledComponent> =
  C extends StyledComponent<any, any, any, infer A> ? A : never;

export type StyledComponentInnerProps<
  C extends StyledComponentInstance,
  T extends object,
> = StyledComponentProps<
  StyledComponentInnerComponent<C>,
  T,
  StyledComponentInnerOtherProps<C>,
  StyledComponentInnerAttrs<C>
>;

export interface StyledComponentBase<
  C extends string | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never,
> extends ForwardRefExoticBase<StyledComponentProps<C, T, O, A>> {
  // add our own fake call signature to implement the polymorphic 'as' prop
  (
    props: StyledComponentProps<C, T, O, A> & {
      as?: never | undefined;
      forwardedAs?: never | undefined;
    },
  ): React.ReactElement<StyledComponentProps<C, T, O, A>>;
  <
    AsC extends string | React.ComponentType<any> = C,
    FAsC extends string | React.ComponentType<any> = AsC,
  >(
    props: StyledComponentPropsWithAs<AsC, T, O, A, AsC, FAsC>,
  ): React.ReactElement<StyledComponentPropsWithAs<AsC, T, O, A, AsC, FAsC>>;

  withComponent<WithC extends AnyStyledComponent>(
    component: WithC,
  ): StyledComponent<
    StyledComponentInnerComponent<WithC>,
    T,
    O & StyledComponentInnerOtherProps<WithC>,
    A | StyledComponentInnerAttrs<WithC>
  >;
  withComponent<WithC extends keyof React.JSX.IntrinsicElements | React.ComponentType<any>>(
    component: WithC,
  ): StyledComponent<WithC, T, O, A>;
}

// remove the call signature from StyledComponent so Interpolation can still infer InterpolationFunction
type StyledComponentInterpolation =
  | Pick<StyledComponentBase<any, any, any, any>, keyof StyledComponentBase<any, any>>
  | Pick<StyledComponentBase<any, any, any>, keyof StyledComponentBase<any, any>>;

// These are typings coming from styled-components
// They are adjusted to accept the extended options coming from mui
type AnyIfEmpty<T extends object> = keyof T extends never ? any : T;

type ThemedStyledComponentFactories<T extends object> = {
  [TTag in keyof React.JSX.IntrinsicElements]: ThemedStyledFunctionBase<TTag, T>;
};

export type StyledComponentPropsWithRef<
  C extends keyof React.JSX.IntrinsicElements | React.ComponentType<any>,
> = C extends AnyStyledComponent
  ? React.ComponentPropsWithRef<StyledComponentInnerComponent<C>>
  : React.ComponentPropsWithRef<C>;

// Same as in styled-components, but copied here so that it would use the Interpolation & CSS typings from above
export interface ThemedStyledFunctionBase<
  C extends keyof React.JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never,
> {
  (first: TemplateStringsArray): StyledComponent<C, T, O, A>;
  (
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>>,
    ...other: Array<Interpolation<ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>>>
  ): StyledComponent<C, T, O, A>;
  <U extends object>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<ThemedStyledProps<StyledComponentPropsWithRef<C> & O & U, T>>,
    ...other: Array<Interpolation<ThemedStyledProps<StyledComponentPropsWithRef<C> & O & U, T>>>
  ): StyledComponent<C, T, O & U, A>;
}

// same as ThemedStyledFunction in styled-components, but without attrs, and withConfig
export interface ThemedStyledFunction<
  C extends keyof React.JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never,
> extends ThemedStyledFunctionBase<C, T, O, A> {}

export type CreateStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
  T extends object = {},
  A extends keyof any = never,
> = ThemedStyledFunction<
  React.ComponentType<ComponentProps>,
  T,
  SpecificComponentProps & JSXProps,
  A
>;

// Config to be used with withConfig
export interface StyledConfig<O extends object = {}> {
  // TODO: Add all types from the original StyledComponentWrapperProperties
  componentId?: string | undefined;
  displayName?: string | undefined;
  label?: string | undefined;
  target?: string | undefined;
  shouldForwardProp?:
    ((prop: keyof O, defaultValidatorFn: (prop: keyof O) => boolean) => boolean) | undefined;
}

/** Same as StyledConfig but shouldForwardProp must be a type guard */
export interface FilteringStyledOptions<Props, ForwardedProps extends keyof Props = keyof Props> {
  componentId?: string | undefined;
  displayName?: string | undefined;
  label?: string | undefined;
  shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps;
  target?: string | undefined;
}

// same as ThemedBaseStyledInterface in styled-components, but with added options & common props for MUI components
export interface ThemedBaseStyledInterface<
  MUIStyledCommonProps extends object,
  MuiStyledOptions extends object,
  Theme extends object,
> extends ThemedStyledComponentFactories<Theme> {
  <
    C extends StyledComponentInstance,
    ForwardedProps extends keyof StyledComponentInnerProps<C, Theme> =
      keyof StyledComponentInnerProps<C, Theme>,
  >(
    component: C,
    options: FilteringStyledOptions<StyledComponentInnerProps<C, Theme>, ForwardedProps> &
      MuiStyledOptions,
  ): CreateStyledComponent<
    Pick<StyledComponentInnerProps<C, Theme>, ForwardedProps> & MUIStyledCommonProps,
    StyledComponentInnerOtherProps<C>,
    {},
    Theme,
    StyledComponentInnerAttrs<C>
  >;

  <C extends StyledComponentInstance>(
    component: C,
    options?: StyledConfig<StyledComponentInnerProps<C, Theme> & MUIStyledCommonProps> &
      MuiStyledOptions,
  ): CreateStyledComponent<
    StyledComponentInnerProps<C, Theme> & MUIStyledCommonProps,
    StyledComponentInnerOtherProps<C>,
    {},
    Theme,
    StyledComponentInnerAttrs<C>
  >;

  <
    C extends React.ComponentClass<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & MuiStyledOptions,
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & MUIStyledCommonProps,
    {},
    {
      ref?: React.Ref<InstanceType<C>> | undefined;
    },
    Theme
  >;

  <C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C,
    options?: StyledConfig<PropsOf<C> & MUIStyledCommonProps> & MuiStyledOptions,
  ): CreateStyledComponent<
    PropsOf<C> & MUIStyledCommonProps,
    {},
    {
      ref?: React.Ref<InstanceType<C>> | undefined;
    },
    Theme
  >;

  <
    C extends React.JSXElementConstructor<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & MuiStyledOptions,
  ): CreateStyledComponent<Pick<PropsOf<C>, ForwardedProps> & MUIStyledCommonProps, {}, {}, Theme>;

  <C extends React.JSXElementConstructor<React.ComponentProps<C>>>(
    component: C,
    options?: StyledConfig<PropsOf<C> & MUIStyledCommonProps> & MuiStyledOptions,
  ): CreateStyledComponent<PropsOf<C> & MUIStyledCommonProps, {}, {}, Theme>;

  <
    Tag extends keyof React.JSX.IntrinsicElements,
    ForwardedProps extends keyof React.JSX.IntrinsicElements[Tag] =
      keyof React.JSX.IntrinsicElements[Tag],
  >(
    tag: Tag,
    options: FilteringStyledOptions<React.JSX.IntrinsicElements[Tag], ForwardedProps> &
      MuiStyledOptions,
  ): CreateStyledComponent<
    MUIStyledCommonProps,
    Pick<React.JSX.IntrinsicElements[Tag], ForwardedProps>,
    {},
    Theme
  >;

  <Tag extends keyof React.JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledConfig<MUIStyledCommonProps> & MuiStyledOptions,
  ): CreateStyledComponent<MUIStyledCommonProps, React.JSX.IntrinsicElements[Tag], {}, Theme>;
}

export type CreateMUIStyled<
  MUIStyledCommonProps extends object = {},
  MuiStyledOptions extends object = {},
  T extends object = {},
> = ThemedBaseStyledInterface<MUIStyledCommonProps, MuiStyledOptions, AnyIfEmpty<T>>;

export type PropsOf<
  C extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = React.JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;

export interface MUIStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
> extends React.FC<ComponentProps & SpecificComponentProps & JSXProps> {
  withComponent<C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C,
  ): MUIStyledComponent<
    ComponentProps & PropsOf<C>,
    {},
    { ref?: React.Ref<InstanceType<C>> | undefined }
  >;
  withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
  ): MUIStyledComponent<ComponentProps & PropsOf<C>>;
  withComponent<Tag extends keyof React.JSX.IntrinsicElements>(
    tag: Tag,
  ): MUIStyledComponent<ComponentProps, React.JSX.IntrinsicElements[Tag]>;
}
