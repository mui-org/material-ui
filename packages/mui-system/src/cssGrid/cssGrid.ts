import style from '../style';
import type { PropsFor, SimpleStyleFunction } from '../style';
import compose from '../compose';
import { createUnaryUnit, getValue } from '../spacing';
import { handleBreakpoints } from '../breakpoints';
import responsivePropType from '../responsivePropType';

export const gap = ((props: any) => {
  if (props.gap !== undefined && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');
    const styleFromPropValue = (propValue: any) => ({
      gap: getValue(transformer as any, propValue),
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }

  return null;
}) as unknown as SimpleStyleFunction<'gap'>;

(gap as any).propTypes = process.env.NODE_ENV !== 'production' ? { gap: responsivePropType } : {};

(gap as any).filterProps = ['gap'];

export const columnGap = ((props: any) => {
  if (props.columnGap !== undefined && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'columnGap');
    const styleFromPropValue = (propValue: any) => ({
      columnGap: getValue(transformer as any, propValue),
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }

  return null;
}) as unknown as SimpleStyleFunction<'columnGap'>;

(columnGap as any).propTypes =
  process.env.NODE_ENV !== 'production' ? { columnGap: responsivePropType } : {};

(columnGap as any).filterProps = ['columnGap'];

export const rowGap = ((props: any) => {
  if (props.rowGap !== undefined && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'rowGap');
    const styleFromPropValue = (propValue: any) => ({
      rowGap: getValue(transformer as any, propValue),
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }

  return null;
}) as unknown as SimpleStyleFunction<'rowGap'>;

(rowGap as any).propTypes =
  process.env.NODE_ENV !== 'production' ? { rowGap: responsivePropType } : {};

(rowGap as any).filterProps = ['rowGap'];

export const gridColumn = style({
  prop: 'gridColumn',
}) as unknown as SimpleStyleFunction<'gridColumn'>;
export const gridRow = style({ prop: 'gridRow' }) as unknown as SimpleStyleFunction<'gridRow'>;
export const gridAutoFlow = style({
  prop: 'gridAutoFlow',
}) as unknown as SimpleStyleFunction<'gridAutoFlow'>;
export const gridAutoColumns = style({
  prop: 'gridAutoColumns',
}) as unknown as SimpleStyleFunction<'gridAutoColumns'>;
export const gridAutoRows = style({
  prop: 'gridAutoRows',
}) as unknown as SimpleStyleFunction<'gridAutoRows'>;
export const gridTemplateColumns = style({
  prop: 'gridTemplateColumns',
}) as unknown as SimpleStyleFunction<'gridTemplateColumns'>;
export const gridTemplateRows = style({
  prop: 'gridTemplateRows',
}) as unknown as SimpleStyleFunction<'gridTemplateRows'>;
export const gridTemplateAreas = style({
  prop: 'gridTemplateAreas',
}) as unknown as SimpleStyleFunction<'gridTemplateAreas'>;
export const gridArea = style({ prop: 'gridArea' }) as unknown as SimpleStyleFunction<'gridArea'>;

const grid = compose(
  gap,
  columnGap,
  rowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea,
) as unknown as SimpleStyleFunction<
  | 'gap'
  | 'columnGap'
  | 'rowGap'
  | 'gridColumn'
  | 'gridRow'
  | 'gridAutoFlow'
  | 'gridAutoColumns'
  | 'gridAutoRows'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
  | 'gridTemplateAreas'
  | 'gridArea'
>;

export type CssGridProps = PropsFor<typeof grid>;

export default grid;
