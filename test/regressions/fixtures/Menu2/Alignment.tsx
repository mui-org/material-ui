import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import Box from '@mui/material/Box';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface AlignedMenuProps {
  direction: 'ltr' | 'rtl';
  align: 'start' | 'end';
  side: 'top' | 'bottom';
}

function AlignedMenu({ direction, align, side }: AlignedMenuProps) {
  const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const theme = React.useMemo(() => createTheme({ direction }), [direction]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={setContainer}
        dir={direction}
        sx={{ position: 'relative', width: 240, height: 280 }}
      >
        <Box
          component="button"
          type="button"
          ref={setAnchor}
          sx={{
            position: 'absolute',
            left: 80,
            top: 120,
            width: 80,
            height: 32,
            boxSizing: 'border-box',
          }}
        >
          Anchor
        </Box>
        <Menu2 open={Boolean(anchor && container)} modal={false}>
          <Menu2Popup
            anchor={anchor}
            container={container}
            side={side}
            align={align}
            sideOffset={8}
            slots={{ transition: null }}
            slotProps={{
              root: {
                sx: {
                  width: 160,
                  // A fixed scale makes origin changes visible without a running animation.
                  transform: 'scale(0.8)',
                },
              },
            }}
          >
            <Menu2Item>First item</Menu2Item>
            <Menu2Item>Second item</Menu2Item>
          </Menu2Popup>
        </Menu2>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            typography: 'caption',
          }}
        >
          {direction} / {align} / {side}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Alignment() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 240px)', width: 960 }}>
      {(['top', 'bottom'] as const).flatMap((side) =>
        (['ltr', 'rtl'] as const).flatMap((direction) =>
          (['start', 'end'] as const).map((align) => (
            <AlignedMenu key={`${side}-${direction}-${align}`} {...{ side, direction, align }} />
          )),
        ),
      )}
    </Box>
  );
}
