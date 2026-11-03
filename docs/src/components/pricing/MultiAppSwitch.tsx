import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { useMultiApp } from 'docs/src/components/pricing/MultiAppContext';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function MultiAppSwitch() {
  const { multiApp, setMultiApp } = useMultiApp();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMultiApp(event.target.checked);
  };

  const MultiAppDescription = 'Use MUI X across multiple apps within your organization.';

  return (
    <Box
      sx={(theme) => ({
        border: '1px solid',
        borderColor: 'primary.100',
        borderRadius: 1,
        padding: 2,
        backgroundColor: 'background.paper',
        ...theme.applyDarkStyles({
          borderColor: `${alpha(theme.palette.primary[700], 0.4)}`,
        }),
      })}
    >
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={multiApp} onChange={onChange} />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  fontWeight: 'semiBold',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                }}
              >
                Multi App License
              </Typography>
            </Box>
          }
          sx={{
            mb: 0.5,
            ml: 0,
            mr: 0,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            '& .MuiFormControlLabel-label': {
              marginRight: 'auto',
            },
          }}
          labelPlacement="start"
        />
      </FormGroup>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
        {MultiAppDescription}
      </Typography>
    </Box>
  );
}

export function MultiAppSwitchTable() {
  const { multiApp, setMultiApp } = useMultiApp();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMultiApp(event.target.checked);
  };
  const MultiAppDescription =
    'Choose this option if you expect to use MUI X across multiple applications within your organization.';

  const tooltipProps = {
    enterDelay: 400,
    enterNextDelay: 50,
    enterTouchDelay: 500,
    placement: 'top' as const,
    describeChild: true,
    slotProps: {
      tooltip: {
        sx: {
          fontSize: 12,
        },
      },
    },
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={multiApp} onChange={handleChange} />}
        label={
          <Tooltip title={MultiAppDescription} {...tooltipProps}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.875rem' }}
            >
              Multi App License
            </Typography>
          </Tooltip>
        }
        sx={{
          mb: 0.5,
          gap: 1,
        }}
        labelPlacement="start"
      />
    </FormGroup>
  );
}
