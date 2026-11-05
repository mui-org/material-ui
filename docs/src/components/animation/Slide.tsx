import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

export default function Slide({
  animationName,
  keyframes,
  ...props
}: BoxProps & { animationName: string; keyframes: Record<string, object> }) {
  return (
    <Box
      {...props}
      sx={{
        display: 'grid',
        gridTemplateRows: 'min-content',
        gap: { xs: 2, sm: 4, md: 8 },
        width: 'min-content',
        animation: `${animationName} 30s ease-out forwards`,
        '@media (prefers-reduced-motion)': {
          animation: 'none',
        },
        [`@keyframes ${animationName}`]: {
          ...keyframes,
        },
        ...props.sx,
      }}
    />
  );
}
