import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

export type RootSvgProps<P = unknown> = Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
  sx?: SxProps<Theme>;
  ref?: React.Ref<SVGSVGElement>;
} & P;

export const RootSvg = styled('svg')({
  verticalAlign: 'bottom',
});
