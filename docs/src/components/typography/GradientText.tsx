import type { PaletteColor } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

type Color = 'primary' | 'error' | 'success' | 'warning';

const GradientText = styled('span')<{
  color?: Color;
}>(({ theme }) => ({
  variants: [
    ...(Object.entries((theme.vars || theme).palette) as Array<[Color, PaletteColor]>)
      .filter(([color, value]) => color !== 'primary' && value && value[400])
      .map(([color, value]) => ({
        props: { color },
        style: {
          background: `linear-gradient(90deg, ${value[400]} 5%, ${value.main} 90%)`,
        },
      })),
    {
      props: {},
      style: {
        background: `linear-gradient(90deg, ${(theme.vars || theme).palette.primary[400]} 5%, ${(theme.vars || theme).palette.primary.main} 90%)`,
        // `Webkit` has to come later
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  ],
}));

export default GradientText;
