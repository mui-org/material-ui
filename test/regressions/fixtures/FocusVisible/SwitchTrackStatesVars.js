import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

// Vars-mode twin of SwitchTrackStates: the disabled alphas resolve through
// `--mui-opacity-switchTrackDisabled` (0.12) — the state that regressed to the
// unchecked 0.38 when the wrong opacity var was read.
const theme = createTheme({ cssVariables: true, focusVisible: true });

const rows = [
  {
    title: 'color="default"',
    states: [
      { label: 'unchecked', props: { color: 'default' } },
      { label: 'checked', props: { color: 'default', defaultChecked: true } },
      {
        label: 'checked+disabled',
        props: { color: 'default', defaultChecked: true, disabled: true },
      },
    ],
  },
  {
    title: 'color="primary"',
    states: [
      { label: 'disabled', props: { disabled: true } },
      { label: 'checked+disabled', props: { defaultChecked: true, disabled: true } },
      { label: 'checked', props: { defaultChecked: true } },
    ],
  },
];

export default function SwitchTrackStatesVars() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ p: 2, alignItems: 'flex-start' }}>
        {rows.map(({ title, states }) => (
          <div key={title}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end' }}>
              {states.map(({ label, props }, index) => (
                <Stack key={index} spacing={0.5} sx={{ alignItems: 'center' }}>
                  <Switch {...props} />
                  <Typography variant="caption">{label}</Typography>
                </Stack>
              ))}
            </Stack>
          </div>
        ))}
      </Stack>
    </ThemeProvider>
  );
}
