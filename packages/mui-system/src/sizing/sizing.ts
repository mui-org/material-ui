import style from '../style';
import type { PropsFor, SimpleStyleFunction } from '../style';
import compose from '../compose';
import { handleBreakpoints } from '../breakpoints';
import * as breakpointsModule from '../breakpoints';

const breakpointsValues: Record<string, number> = (breakpointsModule as any).values;

/** @internal */
export function sizingTransform(value: any) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}

export const width = style({
  prop: 'width',
  transform: sizingTransform,
}) as unknown as SimpleStyleFunction<'width'>;

export const maxWidth = ((props: any) => {
  if (props.maxWidth !== undefined && props.maxWidth !== null) {
    const styleFromPropValue = (propValue: any) => {
      const breakpoint =
        props.theme?.breakpoints?.values?.[propValue] || (breakpointsValues as any)[propValue];

      if (!breakpoint) {
        return {
          maxWidth: sizingTransform(propValue),
        };
      }

      if (props.theme?.breakpoints?.unit !== 'px') {
        return {
          maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`,
        };
      }

      return {
        maxWidth: breakpoint,
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
}) as unknown as SimpleStyleFunction<'maxWidth'>;
(maxWidth as any).filterProps = ['maxWidth'];

export const minWidth = style({
  prop: 'minWidth',
  transform: sizingTransform,
}) as unknown as SimpleStyleFunction<'minWidth'>;

export const height = style({
  prop: 'height',
  transform: sizingTransform,
}) as unknown as SimpleStyleFunction<'height'>;

export const maxHeight = style({
  prop: 'maxHeight',
  transform: sizingTransform,
}) as unknown as SimpleStyleFunction<'maxHeight'>;

export const minHeight = style({
  prop: 'minHeight',
  transform: sizingTransform,
}) as unknown as SimpleStyleFunction<'minHeight'>;

export const sizeWidth = style({
  prop: 'size',
  cssProperty: 'width',
  transform: sizingTransform,
}) as unknown as SimpleStyleFunction<'sizeWidth'>;

export const sizeHeight = style({
  prop: 'size',
  cssProperty: 'height',
  transform: sizingTransform,
}) as unknown as SimpleStyleFunction<'sizeHeight'>;

export const boxSizing = style({
  prop: 'boxSizing',
}) as unknown as SimpleStyleFunction<'boxSizing'>;

const sizing = compose(
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  boxSizing,
) as unknown as SimpleStyleFunction<
  | 'width'
  | 'maxWidth'
  | 'minWidth'
  | 'height'
  | 'maxHeight'
  | 'minHeight'
  | 'sizeWidth'
  | 'sizeHeight'
  | 'boxSizing'
>;

export type SizingProps = PropsFor<typeof sizing>;

export default sizing;
