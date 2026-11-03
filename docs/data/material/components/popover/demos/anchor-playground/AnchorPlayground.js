import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';

const inlineStyles = {
  anchorVertical: {
    top: {
      top: -5,
    },
    center: {
      top: 'calc(50% - 5px)',
    },
    bottom: {
      bottom: -5,
    },
  },
  anchorHorizontal: {
    left: {
      left: -5,
    },
    center: {
      left: 'calc(50% - 5px)',
    },
    right: {
      right: -5,
    },
  },
};

function AnchorPlayground() {
  const anchorRef = React.useRef();

  const [state, setState] = React.useState({
    open: false,
    anchorOriginVertical: 'top',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'left',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorEl',
  });

  const {
    open,
    anchorOriginVertical,
    anchorOriginHorizontal,
    transformOriginVertical,
    transformOriginHorizontal,
    positionTop,
    positionLeft,
    anchorReference,
  } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleNumberInputChange = (key) => (event) => {
    setState({
      ...state,
      [key]: parseInt(event.target.value, 10),
    });
  };

  const handleClickButton = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  let mode = '';

  if (anchorReference === 'anchorPosition') {
    mode = `
  anchorReference="${anchorReference}"
  anchorPosition={{ top: ${positionTop}, left: ${positionLeft} }}`;
  }

  const jsx = `
<Popover ${mode}
  anchorOrigin={{
    vertical: '${anchorOriginVertical}',
    horizontal: '${anchorOriginHorizontal}',
  }}
  transformOrigin={{
    vertical: '${transformOriginVertical}',
    horizontal: '${transformOriginHorizontal}',
  }}
>
  The content of the Popover.
</Popover>
`;

  const radioAnchorClasses = {
    color: green[600],
    '&.Mui-checked': {
      color: green[500],
    },
  };

  return (
    <div>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid sx={{ position: 'relative', mb: 4 }}>
          <Button ref={anchorRef} variant="contained" onClick={handleClickButton}>
            Open Popover
          </Button>
          {anchorReference === 'anchorEl' && (
            <Box
              sx={{
                bgcolor: green[500],
                width: 10,
                height: 10,
                borderRadius: '50%',
                position: 'absolute',
              }}
              style={{
                ...inlineStyles.anchorVertical[anchorOriginVertical],
                ...inlineStyles.anchorHorizontal[anchorOriginHorizontal],
              }}
            />
          )}
        </Grid>
      </Grid>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        anchorReference={anchorReference}
        anchorPosition={{
          top: positionTop,
          left: positionLeft,
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
      >
        <Typography sx={{ m: 2 }}>The content of the Popover.</Typography>
      </Popover>
      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">anchorReference</FormLabel>
            <RadioGroup
              row
              aria-label="anchor reference"
              name="anchorReference"
              value={anchorReference}
              onChange={handleChange}
            >
              <FormControlLabel
                value="anchorEl"
                control={<Radio />}
                label="anchorEl"
              />
              <FormControlLabel
                value="anchorPosition"
                control={<Radio />}
                label="anchorPosition"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <FormControl variant="standard">
            <InputLabel htmlFor="position-top">anchorPosition.top</InputLabel>
            <Input
              id="position-top"
              type="number"
              value={positionTop}
              onChange={handleNumberInputChange('positionTop')}
            />
          </FormControl>
          &nbsp;
          <FormControl variant="standard">
            <InputLabel htmlFor="position-left">anchorPosition.left</InputLabel>
            <Input
              id="position-left"
              type="number"
              value={positionLeft}
              onChange={handleNumberInputChange('positionLeft')}
            />
          </FormControl>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">anchorOrigin.vertical</FormLabel>
            <RadioGroup
              aria-label="anchor origin vertical"
              name="anchorOriginVertical"
              value={anchorOriginVertical}
              onChange={handleChange}
            >
              <FormControlLabel
                value="top"
                control={<Radio sx={radioAnchorClasses} />}
                label="Top"
              />
              <FormControlLabel
                value="center"
                control={<Radio sx={radioAnchorClasses} />}
                label="Center"
              />
              <FormControlLabel
                value="bottom"
                control={<Radio sx={radioAnchorClasses} />}
                label="Bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">transformOrigin.vertical</FormLabel>
            <RadioGroup
              aria-label="transform origin vertical"
              name="transformOriginVertical"
              value={transformOriginVertical}
              onChange={handleChange}
            >
              <FormControlLabel value="top" control={<Radio />} label="Top" />
              <FormControlLabel
                value="center"
                control={<Radio color="primary" />}
                label="Center"
              />
              <FormControlLabel
                value="bottom"
                control={<Radio color="primary" />}
                label="Bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">anchorOrigin.horizontal</FormLabel>
            <RadioGroup
              row
              aria-label="anchor origin horizontal"
              name="anchorOriginHorizontal"
              value={anchorOriginHorizontal}
              onChange={handleChange}
            >
              <FormControlLabel
                value="left"
                control={<Radio sx={radioAnchorClasses} />}
                label="Left"
              />
              <FormControlLabel
                value="center"
                control={<Radio sx={radioAnchorClasses} />}
                label="Center"
              />
              <FormControlLabel
                value="right"
                control={<Radio sx={radioAnchorClasses} />}
                label="Right"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">transformOrigin.horizontal</FormLabel>
            <RadioGroup
              row
              aria-label="transform origin horizontal"
              name="transformOriginHorizontal"
              value={transformOriginHorizontal}
              onChange={handleChange}
            >
              <FormControlLabel
                value="left"
                control={<Radio color="primary" />}
                label="Left"
              />
              <FormControlLabel
                value="center"
                control={<Radio color="primary" />}
                label="Center"
              />
              <FormControlLabel
                value="right"
                control={<Radio color="primary" />}
                label="Right"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <HighlightedCode code={jsx} language="jsx" />
    </div>
  );
}

export default AnchorPlayground;
