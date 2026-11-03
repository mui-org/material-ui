import * as React from 'react';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';

const FrameDemo = React.forwardRef<HTMLDivElement, BoxProps>(function FrameDemo(props, ref) {
  return (
    <Box
      ref={ref}
      {...props}
      sx={[
        (theme) => ({
          position: 'relative',
          border: '1px solid',
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
          borderColor: 'grey.100',
          ...theme.applyDarkStyles({
            background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
            borderColor: 'primaryDark.700',
          }),
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
});

const FrameInfo = React.forwardRef<HTMLDivElement, BoxProps>(function FrameInfo(props, ref) {
  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        p: 2,
        overflow: 'clip',
        position: 'relative',
        colorScheme: 'dark',
        color: '#fff',
        bgcolor: 'common.black',
        border: '1px solid',
        borderColor: 'primaryDark.700',
        borderTop: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        ...props.sx,
      }}
    />
  );
});

const Frame = React.forwardRef<HTMLDivElement, BoxProps>(function Frame(
  { sx, ...props }: BoxProps,
  ref,
) {
  return (
    <Box
      ref={ref}
      {...props}
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          '& > div:first-of-type': {
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          },
          '& > div:last-of-type': {
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}) as ReturnType<typeof React.forwardRef<HTMLDivElement, BoxProps>> & {
  Demo: typeof FrameDemo;
  Info: typeof FrameInfo;
};

Frame.Demo = FrameDemo;
Frame.Info = FrameInfo;

export { Frame };
