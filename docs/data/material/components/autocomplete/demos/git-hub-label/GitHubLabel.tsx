import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import type { AutocompleteCloseReason } from '@mui/material/Autocomplete';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    padding: 0,
    backgroundColor: '#fff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#1c2128',
    }),
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: '1px solid #eaecef',
      ...theme.applyStyles('dark', {
        borderBottom: '1px solid #30363d',
      }),
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: '1px solid #e1e4e8',
  boxShadow: `0 8px 24px ${'rgba(149, 157, 165, 0.2)'}`,
  color: '#24292e',
  backgroundColor: '#fff',
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  ...theme.applyStyles('dark', {
    border: '1px solid #30363d',
    boxShadow: '0 8px 24px rgb(1, 4, 9)',
    color: '#c9d1d9',
    backgroundColor: '#1c2128',
  }),
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: '1px solid #eaecef',
  ...theme.applyStyles('dark', {
    borderBottom: '1px solid #30363d',
  }),
  '& input': {
    borderRadius: 4,
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontSize: 14,
    backgroundColor: '#fff',
    border: '1px solid #30363d',
    ...theme.applyStyles('dark', {
      backgroundColor: '#0d1117',
      border: '1px solid #eaecef',
    }),
    '&:focus': {
      boxShadow: '0px 0px 0px 3px rgba(3, 102, 214, 0.3)',
      borderColor: '#0366d6',
      ...theme.applyStyles('dark', {
        boxShadow: '0px 0px 0px 3px rgb(12, 45, 107)',
        borderColor: '#388bfd',
      }),
    },
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 13,
  width: '100%',
  textAlign: 'left',
  paddingBottom: 8,
  fontWeight: 600,
  color: '#586069',
  ...theme.applyStyles('dark', {
    color: '#8b949e',
  }),
  '&:hover,&:focus': {
    color: '#0366d6',
    ...theme.applyStyles('dark', {
      color: '#58a6ff',
    }),
  },
  '& span': {
    width: '100%',
  },
  '& svg': {
    width: 16,
    height: 16,
  },
}));

export default function GitHubLabel() {
  // @focus-start @padding 1
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<LabelType[]>([labels[1], labels[11]]);
  const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;

  return (
    <React.Fragment>
      <Box sx={{ width: 221, fontSize: 13 }}>
        <Button disableRipple aria-describedby={id} onClick={handleClick}>
          <span>Labels</span>
          <SettingsIcon />
        </Button>
        {value.map((label) => (
          <Box
            key={label.name}
            sx={{
              mt: '3px',
              height: 20,
              padding: '.15em 4px',
              fontWeight: 600,
              lineHeight: '15px',
              borderRadius: '2px',
            }}
            style={{
              backgroundColor: label.color,
              color: theme.palette.getContrastText(label.color),
            }}
          >
            {label.name}
          </Box>
        ))}
      </Box>
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box
              sx={(t) => ({
                borderBottom: '1px solid #30363d',
                padding: '8px 10px',
                fontWeight: 600,
                ...t.applyStyles('light', {
                  borderBottom: '1px solid #eaecef',
                }),
              })}
            >
              Apply labels to this pull request
            </Box>
            <Autocomplete
              open
              multiple
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason,
              ) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  ((event as React.KeyboardEvent).key === 'Backspace' ||
                    (event as React.KeyboardEvent).key === 'Delete') &&
                  reason === 'removeOption'
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              renderValue={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Box
                      component={DoneIcon}
                      sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                      style={{
                        visibility: selected ? 'visible' : 'hidden',
                      }}
                    />
                    <Box
                      component="span"
                      sx={{
                        width: 14,
                        height: 14,
                        flexShrink: 0,
                        borderRadius: '3px',
                        mr: 1,
                        mt: '2px',
                      }}
                      style={{ backgroundColor: option.color }}
                    />
                    <Box
                      sx={(t) => ({
                        flexGrow: 1,
                        '& span': {
                          color: '#8b949e',
                          ...t.applyStyles('light', {
                            color: '#586069',
                          }),
                        },
                      })}
                    >
                      {option.name}
                      <br />
                      <span>{option.description}</span>
                    </Box>
                    <Box
                      component={CloseIcon}
                      sx={{ opacity: 0.6, width: 18, height: 18 }}
                      style={{
                        visibility: selected ? 'visible' : 'hidden',
                      }}
                    />
                  </li>
                );
              }}
              options={[...labels].sort((a, b) => {
                // Display the selected labels first.
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.slotProps.input.ref}
                  inputProps={params.slotProps.htmlInput}
                  autoFocus
                  placeholder="Filter labels"
                />
              )}
              slots={{
                popper: PopperComponent,
              }}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
  // @focus-end
}

interface LabelType {
  name: string;
  color: string;
  description?: string;
}

// From https://github.com/abdonrd/github-labels
const labels = [
  {
    name: 'good first issue',
    color: '#7057ff',
    description: 'Good for newcomers',
  },
  {
    name: 'help wanted',
    color: '#008672',
    description: 'Extra attention is needed',
  },
  {
    name: 'priority: critical',
    color: '#b60205',
    description: '',
  },
  {
    name: 'priority: high',
    color: '#d93f0b',
    description: '',
  },
  {
    name: 'priority: low',
    color: '#0e8a16',
    description: '',
  },
  {
    name: 'priority: medium',
    color: '#fbca04',
    description: '',
  },
  {
    name: "status: can't reproduce",
    color: '#fec1c1',
    description: '',
  },
  {
    name: 'status: confirmed',
    color: '#215cea',
    description: '',
  },
  {
    name: 'status: duplicate',
    color: '#cfd3d7',
    description: 'This issue or pull request already exists',
  },
  {
    name: 'status: needs information',
    color: '#fef2c0',
    description: '',
  },
  {
    name: 'status: wont do/fix',
    color: '#eeeeee',
    description: 'This will not be worked on',
  },
  {
    name: 'type: bug',
    color: '#d73a4a',
    description: "Something isn't working",
  },
  {
    name: 'type: discussion',
    color: '#d4c5f9',
    description: '',
  },
  {
    name: 'type: documentation',
    color: '#006b75',
    description: '',
  },
  {
    name: 'type: enhancement',
    color: '#84b6eb',
    description: '',
  },
  {
    name: 'type: epic',
    color: '#3e4b9e',
    description: 'A theme of work that contain sub-tasks',
  },
  {
    name: 'type: feature request',
    color: '#fbca04',
    description: 'New feature or request',
  },
  {
    name: 'type: question',
    color: '#d876e3',
    description: 'Further information is requested',
  },
];
