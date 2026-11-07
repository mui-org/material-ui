import * as React from 'react';
import PropTypes from 'prop-types';
import {
  createTheme,
  unstable_enhanceDensity as enhanceDensity,
  ThemeProvider,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import { Annotate, useClaims } from './densityAnnotations';

// A row of body text floors at 32px (a 24px line plus its padding), so the
// steps below that would leave the list where it is.
const TOUCH_STEPS = [32, 36, 40, 44];
const ICON_STEPS = [12, 14, 16, 20, 24];

const ITEMS = [
  { label: 'Inbox', icon: <InboxIcon /> },
  { label: 'Starred', icon: <StarIcon /> },
  { label: 'Drafts', icon: <DraftsIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

// Both selectors match every row, and that is the point: the row beams tile
// into a ruler on the right — the rows really are `touchTarget` tall — and
// each icon carries its own frame on the left.
const CLAIMS = [
  {
    on: '.MuiListItemButton-root',
    aspect: 'touch-target',
    token: 'touchTarget',
    route: { gutter: 'right' },
  },
  {
    on: '.MuiListItemIcon-root',
    aspect: 'icon',
    token: 'iconSize',
    route: { gutter: 'left' },
  },
];

function Knob({ label, value, steps, onChange }) {
  return (
    <Box sx={{ px: 3, py: 1.5 }}>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <code>{label}</code>
      </Typography>
      <Slider
        value={value}
        onChange={(event, next) => onChange(next)}
        step={null}
        min={steps[0]}
        max={steps[steps.length - 1]}
        marks={steps.map((step) => ({ value: step, label: `${step}` }))}
        valueLabelDisplay="off"
        aria-label={label}
      />
    </Box>
  );
}

// A slider drag revisits the same few marks; build each theme once.

Knob.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.number.isRequired,
};

const themes = new Map();
function themeFor(touchTarget, iconSize) {
  const key = `${touchTarget}:${iconSize}`;
  let theme = themes.get(key);
  if (!theme) {
    theme = enhanceDensity(
      createTheme({ colorSchemes: { light: true, dark: true } }),
      {
        touchTarget,
        iconSize,
      },
    );
    themes.set(key, theme);
  }
  return theme;
}

export default function TouchTargetDemo() {
  const [touchTarget, setTouchTarget] = React.useState(32);
  const [iconSize, setIconTarget] = React.useState(16);
  const stageRef = React.useRef(null);
  const demoRef = React.useRef(null);
  const state = useClaims(stageRef, demoRef, CLAIMS, [touchTarget, iconSize]);

  const theme = React.useMemo(
    () => themeFor(touchTarget, iconSize),
    [touchTarget, iconSize],
  );

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box sx={{ overflowX: 'auto', py: 2 }}>
        <Box ref={stageRef} sx={{ position: 'relative', minWidth: 440 }}>
          <ThemeProvider theme={theme}>
            <Box
              ref={demoRef}
              component="nav"
              aria-label="mailbox folders"
              sx={{ width: 240, mx: 'auto' }}
            >
              <List disablePadding>
                {ITEMS.map((item, index) => (
                  <React.Fragment key={item.label}>
                    {index > 0 ? <Divider component="li" /> : null}
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </ThemeProvider>
          {state ? <Annotate items={state.items} bounds={state.bounds} /> : null}
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <Knob
          label="iconSize"
          value={iconSize}
          steps={ICON_STEPS}
          onChange={setIconTarget}
        />
        <Box sx={{ borderLeft: '1px solid', borderColor: 'divider' }}>
          <Knob
            label="touchTarget"
            value={touchTarget}
            steps={TOUCH_STEPS}
            onChange={setTouchTarget}
          />
        </Box>
      </Box>
    </Paper>
  );
}
