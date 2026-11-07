import * as React from 'react';
import Meter from '@mui/material/Meter';
import { Meter as RootMeter, meterClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';

<Meter value={50} />;
<RootMeter value={50} />;

// @ts-expect-error value is required
<Meter />;

<Meter
  value={50}
  min={0}
  max={200}
  locale="en-US"
  format={{ style: 'unit', unit: 'gigabyte' }}
  getAriaValueText={(formattedValue, value) => `${formattedValue} (${value})`}
  label="Storage"
  showValue
  renderValue={(formattedValue, value) => `${formattedValue} of ${value}`}
  color="success"
/>;

<Meter value={50} id="x" onClick={() => {}} aria-label="y" aria-valuetext="half" />;

<Meter value={50} render={<section />} />;
<Meter value={50} render={(props, state) => <section {...props} data-state={typeof state} />} />;

// @ts-expect-error component is not supported
<Meter value={50} component="section" />;

// @ts-expect-error component is not supported in slotProps
<Meter value={50} slotProps={{ root: { component: 'section' } }} />;

<Meter
  value={50}
  slotProps={{
    root: { 'data-testid': 'root' } as React.HTMLAttributes<HTMLDivElement>,
    label: { sx: { fontWeight: 500 } },
    value: (ownerState) => ({ sx: { color: `${ownerState.color}.main` } }),
    track: { style: { height: 8 } },
    indicator: { className: 'indicator' },
  }}
/>;

// @ts-expect-error unknown color
<Meter value={50} color="tertiary" />;

createTheme({
  components: {
    MuiMeter: {
      defaultProps: { color: 'secondary', showValue: true },
      styleOverrides: {
        root: { gap: 4 },
        track: { height: 8, borderRadius: 4 },
        indicator: ({ ownerState }) => ({ borderRadius: ownerState.value > 90 ? 0 : 4 }),
        label: { fontWeight: 500 },
        value: { [`.${meterClasses.root} &`]: { fontVariantNumeric: 'tabular-nums' } },
      },
      variants: [{ props: { color: 'error' }, style: { outline: '1px solid red' } }],
    },
  },
});
