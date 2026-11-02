import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiPopper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';

const Popper = styled(MuiPopper, {
  shouldForwardProp: (prop) => prop !== 'arrow',
})(({ theme }) => ({
  zIndex: 1,
  '& > div': {
    position: 'relative',
  },
  '&[data-popper-placement*="bottom"]': {
    '& .MuiPopper-arrow': {
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
  },
  '&[data-popper-placement*="top"]': {
    '& .MuiPopper-arrow': {
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
  },
  '&[data-popper-placement*="right"]': {
    '& .MuiPopper-arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
  },
  '&[data-popper-placement*="left"]': {
    '& .MuiPopper-arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
      },
    },
  },
  variants: [
    {
      props: ({ arrow }) => arrow,
      style: {
        '&[data-popper-placement*="bottom"]': {
          '& > div': {
            marginTop: 2,
          },
        },
      },
    },
    {
      props: ({ arrow }) => !arrow,
      style: {
        '&[data-popper-placement*="bottom"]': {
          '& > div': {
            marginTop: 0,
          },
        },
      },
    },
    {
      props: ({ arrow }) => arrow,
      style: {
        '&[data-popper-placement*="top"]': {
          '& > div': {
            marginBottom: 2,
          },
        },
      },
    },
    {
      props: ({ arrow }) => !arrow,
      style: {
        '&[data-popper-placement*="top"]': {
          '& > div': {
            marginBottom: 0,
          },
        },
      },
    },
    {
      props: ({ arrow }) => arrow,
      style: {
        '&[data-popper-placement*="right"]': {
          '& > div': {
            marginLeft: 2,
          },
        },
      },
    },
    {
      props: ({ arrow }) => !arrow,
      style: {
        '&[data-popper-placement*="right"]': {
          '& > div': {
            marginLeft: 0,
          },
        },
      },
    },
    {
      props: ({ arrow }) => arrow,
      style: {
        '&[data-popper-placement*="left"]': {
          '& > div': {
            marginRight: 2,
          },
        },
      },
    },
    {
      props: ({ arrow }) => !arrow,
      style: {
        '&[data-popper-placement*="left"]': {
          '& > div': {
            marginRight: 0,
          },
        },
      },
    },
  ],
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
          container
          ref={centerScroll}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '230%',
            bgcolor: 'background.paper',
            height: '230%',
          }}
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
              arrow={arrow}
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
              <div>
                {arrow ? (
                  <Arrow ref={setArrowRef} className="MuiPopper-arrow" />
                ) : null}
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
              </div>
            </Popper>
          </div>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid container size={12}>
          <Grid size={12}>
            <Typography variant="h6" component="div">
              Appearance
            </Typography>
          </Grid>
          <Grid size={6}>
            <TextField
              margin="dense"
              sx={{ width: 200 }}
              label="Placement"
              select
              value={placement}
              onChange={(event) => {
                setPlacement(event.target.value);
              }}
              variant="standard"
              slotProps={{
                select: {
                  native: true,
                  inputProps: {
                    'aria-labelledby': 'scroll-playground-placement-label',
                  },
                },

                inputLabel: {
                  id: 'scroll-playground-placement-label',
                },
              }}
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
          <Grid size={6}>
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
            <Typography
              variant="caption"
              sx={{ display: 'block', color: 'text.secondary' }}
            >
              (the children stay within their parent DOM hierarchy)
            </Typography>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6" component="div">
            Modifiers (options from Popper.js)
          </Typography>
        </Grid>
        <Grid container spacing={1} size={12}>
          <Grid size={6}>
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
                value={preventOverflow.rootBoundary}
                onChange={(event) => {
                  setPreventOverflow((old) => ({
                    ...old,
                    rootBoundary: event.target.value,
                  }));
                }}
                variant="standard"
                slotProps={{
                  select: {
                    native: true,
                    inputProps: {
                      'aria-labelledby':
                        'scroll-playground-prevent-overflow-root-boundary',
                    },
                  },

                  inputLabel: {
                    id: 'scroll-playground-prevent-overflow-root-boundary',
                  },
                }}
              >
                <option value="document">document</option>
                <option value="viewport">viewport</option>
              </TextField>
            </FormGroup>
          </Grid>
          <Grid size={6}>
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
                value={flip.rootBoundary}
                onChange={(event) => {
                  setFlip((old) => ({
                    ...old,
                    rootBoundary: event.target.value,
                  }));
                }}
                variant="standard"
                slotProps={{
                  select: {
                    native: true,
                    inputProps: {
                      'aria-labelledby': 'scroll-playground-flip-root-boundary',
                    },
                  },

                  inputLabel: {
                    id: 'scroll-playground-flip-root-boundary',
                  },
                }}
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
      <HighlightedCode code={jsx} language="jsx" />
    </Box>
  );
}
