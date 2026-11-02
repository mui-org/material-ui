import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

const theme = createTheme({
  focusVisible: true,
  colorSchemes: { light: true, dark: true },
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

function TightSquareIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props} sx={{ fontSize: 16 }}>
      <rect
        x="0.75"
        y="0.75"
        width="14.5"
        height="14.5"
        rx="3.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
}

function TightSquareCheckedIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props} sx={{ fontSize: 16 }}>
      <rect x="0" y="0" width="16" height="16" rx="4" fill="currentColor" />
      <path
        d="m4.5 8.5 2.5 2.5 4.5-5"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function TightCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props} sx={{ fontSize: 16 }}>
      <circle
        cx="8"
        cy="8"
        r="7.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
}

function TightCircleCheckedIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props} sx={{ fontSize: 16 }}>
      <circle
        cx="8"
        cy="8"
        r="7.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="8" r="3.75" fill="currentColor" />
    </SvgIcon>
  );
}

export default function FocusVisibleCustomIcons() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Press <kbd>Tab</kbd> — the ring hugs the 16px svg icons.
        </Typography>
        <Stack direction="row" spacing={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Settings</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<TightSquareIcon />}
                    checkedIcon={<TightSquareCheckedIcon />}
                    defaultChecked
                  />
                }
                label="Autosave"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<TightSquareIcon />}
                    checkedIcon={<TightSquareCheckedIcon />}
                  />
                }
                label="Notifications"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<TightSquareIcon />}
                    checkedIcon={<TightSquareCheckedIcon />}
                  />
                }
                label="Public profile"
              />
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="custom-icons-density-label">Density</FormLabel>
            <RadioGroup
              aria-labelledby="custom-icons-density-label"
              defaultValue="medium"
              name="density"
            >
              <FormControlLabel
                value="compact"
                control={
                  <Radio
                    icon={<TightCircleIcon />}
                    checkedIcon={<TightCircleCheckedIcon />}
                  />
                }
                label="Compact"
              />
              <FormControlLabel
                value="medium"
                control={
                  <Radio
                    icon={<TightCircleIcon />}
                    checkedIcon={<TightCircleCheckedIcon />}
                  />
                }
                label="Medium"
              />
              <FormControlLabel
                value="spacious"
                control={
                  <Radio
                    icon={<TightCircleIcon />}
                    checkedIcon={<TightCircleCheckedIcon />}
                  />
                }
                label="Spacious"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Stack>
    </ThemeProvider>
    // @focus-end
  );
}
