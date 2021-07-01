import * as CSS from 'csstype';
import { StandardCSSProperties } from './StandardCssProperties';
import { AliasesCSSProperties } from './AliasesCSSProperties';
import { OverwriteCSSProperties } from './OverwriteCSSProperties';

/**
 * The `css` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 */
export type ResponsiveStyleValue<T> = T | Array<T | null> | { [key: string]: T | null };

/**
 * Map of all CSS pseudo selectors (`:hover`, `:focus`, ...).
 */
export type CSSPseudoSelectorProps<Theme extends object = {}> = {
  [K in CSS.Pseudos]?: SystemStyleObject<Theme>;
};

/**
 * Map all nested selectors.
 */
export interface CSSSelectorObject<Theme extends object = {}> {
  [cssSelector: string]: SystemStyleObject<Theme>;
}

/**
 * Map of all available CSS properties (including aliases) and their raw value.
 * Only used internally to map CSS properties to input types (responsive value,
 * theme function or nested) in `SystemCssProperties`.
 */
export interface AllSystemCSSProperties
  extends Omit<StandardCSSProperties, keyof OverwriteCSSProperties>,
    OverwriteCSSProperties,
    AliasesCSSProperties {}

export type SystemCssProperties<Theme extends object = {}> = {
  [K in keyof AllSystemCSSProperties]:
    | ResponsiveStyleValue<AllSystemCSSProperties[K]>
    | ((theme: Theme) => ResponsiveStyleValue<AllSystemCSSProperties[K]>)
    | SystemStyleObject<Theme>;
};

/**
 * The `SystemStyleObject` defines custom properties that will be transformed to
 * their corresponding values from the `Theme`. Other valid CSS properties are also allowed.
 */
export type SystemStyleObject<Theme extends object = {}> =
  | SystemCssProperties<Theme>
  | CSSPseudoSelectorProps<Theme>
  | CSSSelectorObject<Theme>
  | null;

export type SxProps<Theme extends object = {}> = SystemStyleObject<Theme>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function unstable_styleFunctionSx(props: object): object;
