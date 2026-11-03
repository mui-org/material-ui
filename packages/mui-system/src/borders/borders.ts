import responsivePropType from '../responsivePropType';
import style from '../style';
import type { PropsFor, SimpleStyleFunction, TransformFunction } from '../style';
import compose from '../compose';
import { createUnaryUnit, getValue } from '../spacing';
import { handleBreakpoints } from '../breakpoints';

/** @internal */
export function borderTransform(value: unknown) {
  if (typeof value !== 'number') {
    return value as string;
  }

  return `${value}px solid`;
}

function createBorderStyle<P extends string>(
  prop: P,
  transform?: (value: unknown) => unknown,
): SimpleStyleFunction<P> {
  return style({
    prop,
    themeKey: 'borders',
    transform: transform as TransformFunction | undefined,
  }) as unknown as SimpleStyleFunction<P>;
}

export const border = createBorderStyle('border', borderTransform);
export const borderTop = createBorderStyle('borderTop', borderTransform);
export const borderRight = createBorderStyle('borderRight', borderTransform);
export const borderBottom = createBorderStyle('borderBottom', borderTransform);
export const borderLeft = createBorderStyle('borderLeft', borderTransform);
export const borderColor = createBorderStyle('borderColor');
export const borderTopColor = createBorderStyle('borderTopColor');
export const borderRightColor = createBorderStyle('borderRightColor');
export const borderBottomColor = createBorderStyle('borderBottomColor');
export const borderLeftColor = createBorderStyle('borderLeftColor');
export const outline = createBorderStyle('outline', borderTransform);
export const outlineColor = createBorderStyle('outlineColor');

export const borderRadius = ((props: any) => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4, 'borderRadius');
    const styleFromPropValue = (propValue: any) => ({
      borderRadius: getValue(transformer as any, propValue),
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }

  return null;
}) as unknown as SimpleStyleFunction<'borderRadius'>;

(borderRadius as any).propTypes =
  process.env.NODE_ENV !== 'production' ? { borderRadius: responsivePropType } : {};

(borderRadius as any).filterProps = ['borderRadius'];

const borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,
  borderRadius,
  outline,
  outlineColor,
) as unknown as SimpleStyleFunction<
  | 'border'
  | 'borderTop'
  | 'borderRight'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderColor'
  | 'borderRadius'
>;

export type BordersProps = PropsFor<typeof borders>;

export default borders;
