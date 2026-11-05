import { expectType } from '@mui/types';
import { unstable_resolveBreakpointValues as resolveBreakpointValues } from '@mui/system';
import type { ResponsiveStyleValue } from '@mui/system';

declare const columns: ResponsiveStyleValue<number>;

const values = resolveBreakpointValues({ values: columns });
expectType<Record<string, number> | number, typeof values>(values);
