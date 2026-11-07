import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import {
  Annotate,
  slotLabel,
  DENSITY_SCALE,
  DENSITY_STAGE_SX,
  DENSITY_TARGETS,
  DENSITY_THEME,
  useClaims,
} from './densityAnnotations';
import { annotationsFor } from './densityAnnotationSpecs';
import { COMPONENT_NAMES, DENSITY_COMPONENTS } from './densityComponents';

// Stable identity, so a family without controls doesn't re-run the memos.
const NO_CONTROLS = [];

// Two groups, not one list: the steps space a box, the targets size it, and the
// override object splits them the same way.
const SCALE_GROUPS = [
  Object.entries(DENSITY_SCALE),
  Object.entries(DENSITY_TARGETS),
];

function ScaleLegend() {
  const [anchor, setAnchor] = React.useState(null);
  return (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="show the density scale"
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
      <Popover
        open={anchor !== null}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            The scale every caption below is named from.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              columnGap: 2,
              rowGap: 0.5,
            }}
          >
            {SCALE_GROUPS.map((rows, group) => (
              // One grid across both groups, so the value column stays aligned.
              <React.Fragment key={rows[0][0]}>
                {group > 0 && <Divider sx={{ gridColumn: '1 / -1', my: 0.5 }} />}
                {rows.map(([step, value]) => (
                  <React.Fragment key={step}>
                    <Typography variant="body2">{step}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', textAlign: 'right' }}
                    >
                      {value}px
                    </Typography>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Popover>
    </React.Fragment>
  );
}

export default function AllComponentsDemo() {
  const [component, setComponent] = React.useState(COMPONENT_NAMES[0]);
  // One set of values per component, so switching away and back keeps the choice.
  const [byComponent, setByComponent] = React.useState({});
  // Annotations the reader has switched off, per family.
  const [hidden, setHidden] = React.useState({});
  const stageRef = React.useRef(null);
  const demoRef = React.useRef(null);

  const spec = DENSITY_COMPONENTS[component];
  const controls = spec.controls ?? NO_CONTROLS;
  const values = React.useMemo(() => {
    const initial = {};
    controls.forEach((control) => {
      initial[control.prop] = control.initial;
    });
    return { ...initial, ...byComponent[component] };
  }, [controls, byComponent, component]);

  const annotations = React.useMemo(
    () => annotationsFor(component, values),
    [component, values],
  );
  const off = hidden[component];
  const allShown = !off || off.length === 0;
  // One checkbox per slot — every annotation on it hides together.
  const slots = React.useMemo(
    () => [...new Set(annotations.map(slotLabel))],
    [annotations],
  );
  const shown = React.useMemo(
    () => annotations.filter((item) => !off?.includes(slotLabel(item))),
    [annotations, off],
  );
  const resolved = useClaims(stageRef, demoRef, shown, [component, values, shown]);

  const toggle = (slot) =>
    setHidden((previous) => {
      const current = previous[component] ?? [];
      return {
        ...previous,
        [component]: current.includes(slot)
          ? current.filter((item) => item !== slot)
          : [...current, slot],
      };
    });

  const setValue = (prop, next) =>
    setByComponent((previous) => ({
      ...previous,
      [component]: { ...previous[component], [prop]: next },
    }));

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <TextField
          select
          size="small"
          label="Component"
          value={component}
          onChange={(event) => setComponent(event.target.value)}
          sx={{ minWidth: 180 }}
        >
          {COMPONENT_NAMES.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        {controls.map((control) =>
          control.type === 'select' ? (
            <TextField
              key={control.prop}
              select
              size="small"
              label={control.prop}
              value={values[control.prop]}
              onChange={(event) => setValue(control.prop, event.target.value)}
              sx={{ minWidth: 140 }}
            >
              {control.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <FormControlLabel
              key={control.prop}
              control={
                <Switch
                  checked={values[control.prop] === true}
                  onChange={(event) => setValue(control.prop, event.target.checked)}
                />
              }
              label={control.prop}
            />
          ),
        )}

        <Box sx={{ ml: 'auto' }}>
          <ScaleLegend />
        </Box>
      </Box>
      <Divider />
      {slots.length > 0 ? (
        <React.Fragment>
          <Box
            sx={{
              px: 2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              flexWrap: 'wrap',
            }}
          >
            <FormLabel sx={{ fontSize: 13 }}>Slot annotation</FormLabel>
            <FormGroup row>
              {slots.length > 1 ? (
                <FormControlLabel
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: 13 } }}
                  control={
                    <Checkbox
                      size="small"
                      checked={allShown}
                      indeterminate={
                        !allShown && !slots.every((slot) => off?.includes(slot))
                      }
                      onChange={() =>
                        setHidden((previous) => ({
                          ...previous,
                          [component]: allShown ? [...slots] : [],
                        }))
                      }
                    />
                  }
                  label="All slots"
                />
              ) : null}
              {slots.map((slot) => (
                <FormControlLabel
                  key={slot}
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: 13 } }}
                  control={
                    <Checkbox
                      size="small"
                      checked={!off?.includes(slot)}
                      onChange={() => toggle(slot)}
                    />
                  }
                  label={slot}
                />
              ))}
            </FormGroup>
          </Box>
          <Divider />
        </React.Fragment>
      ) : null}
      <Box sx={{ overflowX: 'auto' }}>
        <Box ref={stageRef} sx={DENSITY_STAGE_SX}>
          <Box ref={demoRef} data-density-demo sx={{ display: 'contents' }}>
            <ThemeProvider theme={DENSITY_THEME}>
              {spec.render(values)}
            </ThemeProvider>
          </Box>
          {resolved ? (
            <Annotate items={resolved.items} bounds={resolved.bounds} />
          ) : null}
        </Box>
      </Box>
    </Paper>
  );
}
