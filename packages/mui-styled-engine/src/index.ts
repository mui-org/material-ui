'use client';
/* eslint-disable no-underscore-dangle */
import emStyled from '@emotion/styled';
import type { CreateStyled, StyledComponent, StyledOptions } from '@emotion/styled';
import { serializeStyles as emSerializeStyles } from '@emotion/serialize';
import type * as CSS from 'csstype';
import { __unsafe_useEmotionCache } from '@emotion/react';
import type { PropsOf } from '@emotion/react';

// Re-export the public type surface of `@emotion/styled`. Explicit names rather
// than `export type *`: an `export *` (even type-only) is disallowed by the
// `'use client'` Next.js lint rule. Names locally redeclared below intentionally
// shadow Emotion's and are not re-exported here.
export type { CreateStyled, StyledComponent, StyledOptions, StyledTags } from '@emotion/styled';

function styled(tag: React.ElementType, options?: StyledOptions<any>) {
  // Emotion's `styled` overloads each expect a specific tag/component shape;
  // none accept the broadened `React.ElementType` union, so cast the passthrough.
  const stylesFactory = emStyled(tag as any, options);

  if (process.env.NODE_ENV !== 'production') {
    return (...styles: any[]) => {
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
  }

  return stylesFactory;
}

export default styled as unknown as CreateStyled;

/**
 * For internal usage in `@mui/system` package
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_mutateStyles(
  tag: React.ElementType,
  processor: (styles: any) => any,
): void {
  // Emotion attaches all the styles as `__emotion_styles`.
  // Ref: https://github.com/emotion-js/emotion/blob/16d971d0da229596d6bcc39d282ba9753c9ee7cf/packages/styled/src/base.js#L186
  if (Array.isArray((tag as any).__emotion_styles)) {
    (tag as any).__emotion_styles = processor((tag as any).__emotion_styles);
  }
}

// Emotion only accepts an array, but we want to avoid allocations
const wrapper: any[] = [];
// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_serializeStyles<P>(styles: Interpolation<P>): object {
  wrapper[0] = styles;
  return emSerializeStyles(wrapper);
}

/**
 * For internal usage in `@mui/system` package.
 * Returns the nonce of the Emotion cache in context, for style tags created outside of Emotion.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_useNonce(): string | undefined {
  return __unsafe_useEmotionCache()?.nonce;
}

export { ThemeContext, keyframes, css } from '@emotion/react';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
export type { GlobalStylesProps } from './GlobalStyles';

export type MUIStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
> = StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

export interface SerializedStyles {
  name: string;
  styles: string;
  map?: string | undefined;
  next?: SerializedStyles | undefined;
}

export type CSSProperties = CSS.PropertiesFallback<number | string>;
export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K] | ReadonlyArray<Extract<CSSProperties[K], string>>;
};

// TODO v6 - check if we can drop the unknown, as it breaks the autocomplete
// For more info on why it was added, see https://github.com/mui/material-ui/pull/26228
export type CSSPseudos = { [K in CSS.Pseudos]?: unknown | CSSObject };

// TODO v6 - check if we can drop the unknown, as it breaks the autocomplete
// For more info on why it was added, see https://github.com/mui/material-ui/pull/26228
export interface CSSOthersObject {
  [propertiesName: string]: unknown | CSSInterpolation;
}
export type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject };

export interface ArrayCSSInterpolation extends ReadonlyArray<CSSInterpolation> {}

export interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation;
}

// Omit variants as a key, because we have a special handling for it
export interface CSSObject extends CSSPropertiesWithMultiValues, CSSPseudos, CSSOthersObject {}

export interface ComponentSelector {
  __emotion_styles: any;
}

export type Keyframes = {
  name: string;
  styles: string;
  anim: number;
  toString: () => string;
} & string;

export type Equal<A, B, T, F> = A extends B ? (B extends A ? T : F) : F;

export type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject;

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation;

export interface FunctionInterpolation<Props> {
  (props: Props): Interpolation<Props>;
}

export interface ArrayInterpolation<Props> extends ReadonlyArray<Interpolation<Props>> {}

export type Interpolation<Props> =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSPropertiesWithMultiValues
  | (CSSObject & {
      variants?:
        | Array<{
            props:
              | (Props extends { ownerState: infer O }
                  ? Partial<Omit<Props, 'ownerState'> & O>
                  : Partial<Props>)
              | ((
                  props: Props extends { ownerState: infer O }
                    ? Props & O & { ownerState: O }
                    : Props,
                ) => boolean);
            style:
              | CSSObject
              | ((
                  args: Props extends { theme: any } ? { theme: Props['theme'] } : any,
                ) => CSSObject);
          }>
        | undefined;
    })
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>;

export declare function shouldForwardProp(propName: PropertyKey): boolean;

/** Same as StyledOptions but shouldForwardProp must be a type guard */
export interface FilteringStyledOptions<Props, ForwardedProps extends keyof Props = keyof Props> {
  label?: string | undefined;
  shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps;
  target?: string | undefined;
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface CreateStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
  T extends object = {},
> {
  (
    ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
  ): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {}>(
    ...styles: Array<
      Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;

  (
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
  ): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {}>(
    template: TemplateStringsArray,
    ...styles: Array<
      Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;
}

export interface CreateMUIStyled<
  MUIStyledCommonProps extends {},
  MuiStyledOptions,
  Theme extends object,
> {
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
    options?: StyledOptions<PropsOf<C> & MUIStyledCommonProps> & MuiStyledOptions,
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
    options?: StyledOptions<PropsOf<C> & MUIStyledCommonProps> & MuiStyledOptions,
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
    options?: StyledOptions<MUIStyledCommonProps> & MuiStyledOptions,
  ): CreateStyledComponent<MUIStyledCommonProps, React.JSX.IntrinsicElements[Tag], {}, Theme>;
}
