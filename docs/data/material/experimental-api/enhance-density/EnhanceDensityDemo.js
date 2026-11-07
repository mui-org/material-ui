import * as React from 'react';
import {
  createTheme,
  unstable_enhanceDensity as enhanceDensity,
  ThemeProvider,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { Annotate, useClaims } from './densityAnnotations';

const colorSchemes = { light: true, dark: true };

const defaultTheme = createTheme({ colorSchemes });
const densityTheme = enhanceDensity(createTheme({ colorSchemes }));

// Below this the canvas scrolls. Kept under the card's inner width so the
// stage never overflows it — that would shift the button off centre.
const STAGE_WIDTH = 520;
const STAGE_HEIGHT = 240;

// With the enhancer on, every dimension is a value you can name; with it off
// they are the component's own built-in numbers.
const tokens = {
  gap: 'xSmall',
  icon: '0.8lh',
  // Only the box and its padding step up with the size prop.
  bySize: {
    small: {
      height: 'touchTarget - xSmall',
      padding: 'small',
    },
    medium: { height: 'touchTarget', padding: 'medium' },
    large: {
      height: 'touchTarget + small',
      padding: 'large',
    },
  },
};

const SIZES = Object.keys(tokens.bySize);

/** A token is only claimed when the enhancer authored it — without it the
 * captions print the measured px, and the height is not a claim at all. */
function claimsFor(enhanced, size) {
  const named = (token) => (enhanced ? token : undefined);
  const claims = [
    {
      on: '.MuiButton-root',
      aspect: 'padding',
      axis: 'inline',
      token: named(tokens.bySize[size].padding),
      route: { gutter: 'bottom' },
    },
    {
      on: '.MuiButton-root',
      aspect: 'gap',
      token: named(tokens.gap),
      route: { gutter: 'top' },
    },
    {
      on: '.MuiButton-startIcon svg',
      aspect: 'icon',
      token: named(tokens.icon),
      route: { gutter: 'left' },
    },
  ];

  if (enhanced) {
    claims.push({
      on: '.MuiButton-root',
      aspect: 'touch-target',
      token: tokens.bySize[size].height,
      route: { gutter: 'right' },
    });
  }
  return claims;
}

export default function EnhanceDensityDemo() {
  const [enhanced, setEnhanced] = React.useState(true);
  const [size, setSize] = React.useState('medium');
  const stageRef = React.useRef(null);
  const demoRef = React.useRef(null);
  const state = useClaims(stageRef, demoRef, claimsFor(enhanced, size), [
    enhanced,
    size,
  ]);

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box sx={{ overflowX: 'auto', p: 2 }}>
        <Box
          ref={stageRef}
          sx={{
            position: 'relative',
            width: '100%',
            minWidth: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            mx: 'auto',
          }}
        >
          <ThemeProvider theme={enhanced ? densityTheme : defaultTheme}>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Box ref={demoRef} sx={{ display: 'contents' }}>
                <Button variant="outlined" size={size} startIcon={<AddIcon />}>
                  {/* an element child, so the gap band has an edge to end at */}
                  <span>Button</span>
                </Button>
              </Box>
            </Box>
          </ThemeProvider>
          {state ? <Annotate items={state.items} bounds={state.bounds} /> : null}
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={enhanced}
              onChange={(event) => setEnhanced(event.target.checked)}
            />
          }
          label="Enhance density"
        />
        <TextField
          select
          size="small"
          label="Button size"
          value={size}
          onChange={(event) => setSize(event.target.value)}
          sx={{ minWidth: 120 }}
        >
          {SIZES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Paper>
  );
}
