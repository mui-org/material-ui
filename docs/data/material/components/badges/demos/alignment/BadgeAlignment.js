import * as React from 'react';
import Badge from '@mui/material/Badge';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';

export default function BadgeAlignment() {
  const [horizontal, setHorizontal] = React.useState('right');
  const [vertical, setVertical] = React.useState('top');

  const handleHorizontalChange = (event) => {
    setHorizontal(event.target.value);
  };

  const handleVerticalChange = (event) => {
    setVertical(event.target.value);
  };

  const jsx = `
<IconButton aria-label="show 12 unread messages">
  <Badge
    badgeContent={12}
    color="secondary"
    anchorOrigin={{
      vertical: '${vertical}',
      horizontal: '${horizontal}',
    }}
  >
    <MailIcon />
  </Badge>
</IconButton>
`;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& fieldset': {
            margin: 3,
          },
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Vertical</FormLabel>
          <RadioGroup
            name="vertical"
            value={vertical}
            onChange={handleVerticalChange}
          >
            <FormControlLabel value="top" control={<Radio />} label="Top" />
            <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Horizontal</FormLabel>
          <RadioGroup
            name="horizontal"
            value={horizontal}
            onChange={handleHorizontalChange}
          >
            <FormControlLabel value="right" control={<Radio />} label="Right" />
            <FormControlLabel value="left" control={<Radio />} label="Left" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: 'action.active',
          '& > *': {
            margin: 2,
          },
        }}
      >
        <IconButton aria-label="show unread messages">
          <Badge
            color="secondary"
            variant="dot"
            anchorOrigin={{
              horizontal,
              vertical,
            }}
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 1 unread message">
          <Badge
            color="secondary"
            badgeContent={1}
            anchorOrigin={{
              horizontal,
              vertical,
            }}
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 12 unread messages">
          <Badge
            color="secondary"
            badgeContent={12}
            anchorOrigin={{
              horizontal,
              vertical,
            }}
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show more than 99 unread messages">
          <Badge
            color="secondary"
            badgeContent={123}
            anchorOrigin={{
              horizontal,
              vertical,
            }}
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show more than 999 unread messages">
          <Badge
            color="secondary"
            max={999}
            badgeContent={1337}
            anchorOrigin={{
              horizontal,
              vertical,
            }}
          >
            <MailIcon />
          </Badge>
        </IconButton>
      </Box>
      <HighlightedCode code={jsx} language="jsx" />
    </Box>
  );
}
