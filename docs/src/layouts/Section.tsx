import * as React from 'react';
import Container from '@mui/material/Container';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

interface SelectionProps extends BoxProps {
  bg?: 'white' | 'comfort' | 'dim' | 'gradient' | 'transparent';
  /**
   * Less vertical spacing
   */
  cozy?: boolean;
  noPaddingBottom?: boolean;
}

const map = {
  white: {
    light: 'common.white',
    dark: 'primaryDark.900',
  },
  comfort: {
    light: 'grey.50',
    dark: 'primaryDark.900',
  },
  dim: {
    light: 'primaryDark.700',
    dark: 'primaryDark.700',
  },
  transparent: {
    light: 'transparent',
    dark: 'transparent',
  },
};

const Section = React.forwardRef<HTMLDivElement, SelectionProps>(function Section(props, ref) {
  const { bg = 'white', children, sx, cozy = false, noPaddingBottom = false, ...other } = props;

  return (
    <Box
      ref={ref}
      {...other}
      sx={[
        (theme) => ({
          ...(bg === 'gradient'
            ? {
                background: `linear-gradient(#FFF 0%, ${
                  (theme.vars || theme).palette.primary[50]
                } 100%)`,
                ...theme.applyDarkStyles({
                  background: `linear-gradient(${
                    (theme.vars || theme).palette.primaryDark[900]
                  } 0%, ${alpha(theme.palette.primary[900], 0.2)} 100%)`,
                }),
              }
            : {
                bgcolor: map[bg].light,
                ...theme.applyDarkStyles({
                  bgcolor: map[bg].dark,
                }),
              }),
          py: cozy ? { xs: 6, sm: 10, md: 12 } : { xs: 4, sm: 12, md: 14 },
          pb: noPaddingBottom ? '0 !important' : undefined,
          overflow: 'hidden',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container>{children}</Container>
    </Box>
  );
});

export default Section;
