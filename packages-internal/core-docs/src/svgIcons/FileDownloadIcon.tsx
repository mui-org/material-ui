import SvgIcon from '@mui/material/SvgIcon';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export function FileDownloadIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </SvgIcon>
  );
}

FileDownloadIcon.muiName = 'SvgIcon';
