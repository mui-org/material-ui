import * as React from 'react';
import { StandardProps } from '../MuiProps';

export interface TableRowProps extends StandardProps<TableRowBaseProps, TableRowClassKey> {
  component?: string | React.ComponentType<TableRowBaseProps>;
  hover?: boolean;
  selected?: boolean;
}

export type TableRowBaseProps = React.HTMLAttributes<HTMLTableRowElement>;

export type TableRowClassKey = 'root' | 'head' | 'footer' | 'hover' | 'selected';

declare const TableRow: React.ComponentType<TableRowProps>;

export default TableRow;
