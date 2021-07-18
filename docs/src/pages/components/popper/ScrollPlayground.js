import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MuiPopper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

const Popper = styled(MuiPopper)(({ theme }) => ({
  zIndex: 1,
  '&[data-popper-placement*="bottom"] $arrow': {
    top: 0,
    left: 0,
    marginTop: '-0.9em',
    width: '3em',
    height: '1em',
    '&::before': {
      borderWidth: '0 1em 1em 1em',
      borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
    },
  },
  '&[data-popper-placement*="top"] $arrow': {
    bottom: 0,
    left: 0,
    marginBottom: '-0.9em',
    width: '3em',
    height: '1em',
    '&::before': {
      borderWidth: '1em 1em 0 1em',
      borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
    },
  },
  '&[data-popper-placement*="right"] $arrow': {
    left: 0,
    marginLeft: '-0.9em',
    height: '3em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 1em 1em 0',
      borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
    },
  },
  '&[data-popper-placement*="left"] $arrow': {
    right: 0,
    marginRight: '-0.9em',
    height: '3em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 0 1em 1em',
      borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
    },
  },
}));

const Arrow = styled('div')({
  position: 'absolute',
  fontSize: 7,
  width: '3em',
  height: '3em',
  '&::before': {
    content: '""',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  },
});

export default function ScrollPlayground() {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const [placement, setPlacement] = React.useState('bottom');
  const [disablePortal, setDisablePortal] = React.useState(false);

  const [flip, setFlip] = React.useState({
    enabled: true,
    altBoundary: true,
    rootBoundary: 'document',
  });
  const [preventOverflow, setPreventOverflow] = React.useState({
    enabled: true,
    altAxis: true,
    altBoundary: true,
    tether: true,
    rootBoundary: 'document',
  });

  const [arrow, setArrow] = React.useState(false);
  const [arrowRef, setArrowRef] = React.useState(null);

  const handleClickButton = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const centerScroll = (element) => {
    if (!element) {
      return;
    }

    const container = element.parentElement;
    container.scrollTop = element.clientHeight / 4;
    container.scrollLeft = element.clientWidth / 4;
  };

  const jsx = `
<Popper
  placement="${placement}"
  disablePortal={${disablePortal}}
  modifiers={[
    {
      name: 'flip',
      enabled: ${flip.enabled},
      options: {
        altBoundary: ${flip.altBoundary},
        rootBoundary: '${flip.rootBoundary}',
        padding: 8,
      },
    },
    {
      name: 'preventOverflow',
      enabled: ${preventOverflow.enabled},
      options: {
        altAxis: ${preventOverflow.altAxis},
        altBoundary: ${preventOverflow.altBoundary},
        tether: ${preventOverflow.tether},
        rootBoundary: '${preventOverflow.rootBoundary}',
        padding: 8,
      },
    },
    {
      name: 'arrow',
      enabled: ${arrow},
      options: {
        element: arrowRef,
      },
    },
  ]}
>
  `;
  const id = open ? 'scroll-playground' : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ height: 400, overflow: 'auto', mb: 3 }}>
        <Grid
          sx={{
            position: 'relative',
            width: '230%',
            bgcolor: 'background.paper',
            height: '230%',
          }}
          container
          alignItems="center"
          justifyContent="center"
          ref={centerScroll}
        >
          <div>
            <Button
              ref={anchorRef}
              variant="contained"
              onClick={handleClickButton}
              aria-describedby={id}
            >
              Toggle Popper
            </Button>
            <Typography sx={{ mt: 2, maxWidth: 300 }}>
              Scroll around this container to experiment with flip and
              preventOverflow modifiers.
            </Typography>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorRef.current}
              placement={placement}
              disablePortal={disablePortal}
              modifiers={[
                {
                  name: 'flip',
                  enabled: flip.enabled,
                  options: {
                    altBoundary: flip.altBoundary,
                    rootBoundary: flip.rootBoundary,
                    padding: 8,
                  },
                },
                {
                  name: 'preventOverflow',
                  enabled: preventOverflow.enabled,
                  options: {
                    altAxis: preventOverflow.altAxis,
                    altBoundary: preventOverflow.altBoundary,
                    tether: preventOverflow.tether,
                    rootBoundary: preventOverflow.rootBoundary,
                    padding: 8,
                  },
                },
                {
                  name: 'arrow',
                  enabled: arrow,
                  options: {
                    element: arrowRef,
                  },
                },
              ]}
            >
              {arrow ? <Arrow ref={setArrowRef} /> : null}
              <Paper sx={{ maxWidth: 400, overflow: 'auto' }}>
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Let Google help apps determine location.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickButton}>Disagree</Button>
                  <Button onClick={handleClickButton}>Agree</Button>
                </DialogActions>
              </Paper>
            </Popper>
          </div>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">
              Appearance
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              sx={{ width: 200 }}
              label="Placement"
              select
              InputLabelProps={{
                id: 'scroll-playground-placement-label',
              }}
              SelectProps={{
                native: true,
                inputProps: {
                  'aria-labelledby': 'scroll-playground-placement-label',
                },
              }}
              value={placement}
              onChange={(event) => {
                setPlacement(event.target.value);
              }}
              variant="standard"
            >
              <option value="top-start">top-start</option>
              <option value="top">top</option>
              <option value="top-end">top-end</option>
              <option value="left-start">left-start</option>
              <option value="left">left</option>
              <option value="left-end">left-end</option>
              <option value="right-start">right-start</option>
              <option value="right">right</option>
              <option value="right-end">right-end</option>
              <option value="bottom-start">bottom-start</option>
              <option value="bottom">bottom</option>
              <option value="bottom-end">bottom-end</option>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={disablePortal}
                  onChange={(event) => {
                    setDisablePortal(event.target.checked);
                  }}
                  value="disablePortal"
                />
              }
              label="Disable portal"
            />
            <Typography display="block" variant="caption" color="text.secondary">
              (the children stay within it&apos;s parent DOM hierarchy)
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="div">
            Modifiers (options from Popper.js)
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6}>
            <FormGroup>
              <Typography variant="subtitle1">Prevent Overflow</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={preventOverflow.enabled}
                    onChange={(event) => {
                      setPreventOverflow((old) => ({
                        ...old,
                        enabled: event.target.checked,
                      }));
                    }}
                    value="arrow"
                  />
                }
                label="Enable"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preventOverflow.altAxis}
                    onChange={(event) => {
                      setPreventOverflow((old) => ({
                        ...old,
                        altAxis: event.target.checked,
                      }));
                    }}
                    value="alt-axis"
                  />
                }
                label="Alt axis"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preventOverflow.altBoundary}
                    onChange={(event) => {
                      setPreventOverflow((old) => ({
                        ...old,
                        altBoundary: event.target.checked,
                      }));
                    }}
                    value="alt-boundary"
                  />
                }
                label="Alt Boundary"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preventOverflow.tether}
                    onChange={(event) => {
                      setPreventOverflow((old) => ({
                        ...old,
                        tether: event.target.checked,
                      }));
                    }}
                    value="tether"
                  />
                }
                label="Tether"
              />
              <TextField
                margin="dense"
                size="small"
                label="Root Boundary"
                select
                InputLabelProps={{
                  id: 'scroll-playground-prevent-overflow-root-boundary',
                }}
                SelectProps={{
                  native: true,
                  inputProps: {
                    'aria-labelledby':
                      'scroll-playground-prevent-overflow-root-boundary',
                  },
                }}
                value={preventOverflow.rootBoundary}
                onChange={(event) => {
                  setPreventOverflow((old) => ({
                    ...old,
                    rootBoundary: event.target.value,
                  }));
                }}
                variant="standard"
              >
                <option value="document">document</option>
                <option value="viewport">viewport</option>
              </TextField>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <Typography variant="subtitle1">Flip</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={flip.enabled}
                    onChange={(event) => {
                      setFlip((old) => ({
                        ...old,
                        enabled: event.target.checked,
                      }));
                    }}
                    value="enabled"
                  />
                }
                label="Enable"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={flip.altBoundary}
                    onChange={(event) => {
                      setFlip((old) => ({
                        ...old,
                        altBoundary: event.target.checked,
                      }));
                    }}
                    value="alt-boundary"
                  />
                }
                label="Alt Boundary"
              />
              <TextField
                margin="dense"
                size="small"
                label="Root Boundary"
                select
                InputLabelProps={{
                  id: 'scroll-playground-flip-root-boundary',
                }}
                SelectProps={{
                  native: true,
                  inputProps: {
                    'aria-labelledby': 'scroll-playground-flip-root-boundary',
                  },
                }}
                value={flip.rootBoundary}
                onChange={(event) => {
                  setFlip((old) => ({
                    ...old,
                    rootBoundary: event.target.value,
                  }));
                }}
                variant="standard"
              >
                <option value="document">document</option>
                <option value="viewport">viewport</option>
              </TextField>
            </FormGroup>
            <FormGroup>
              <Typography variant="subtitle1">Arrow</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={arrow}
                    onChange={(event) => {
                      setArrow(event.target.checked);
                    }}
                    value="arrow"
                  />
                }
                label="Enable"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      <HighlightedCode isCopyButtonEnabled code={jsx} language="jsx" />
    </Box>
  );
}
