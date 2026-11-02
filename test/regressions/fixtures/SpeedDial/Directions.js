import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

function SimpleSpeedDial(props) {
  const tooltipPlacement = {
    up: 'left',
    right: 'top',
    down: 'right',
    left: 'bottom',
  };

  return (
    <SpeedDial icon={<SpeedDialIcon />} open {...props}>
      {['A', 'B', 'C'].map((name) => (
        <SpeedDialAction
          key={name}
          icon={<Avatar>{name}</Avatar>}
          slotProps={{
            tooltip: {
              open: true,
              placement: tooltipPlacement[props.direction],
              title: 'Tooltip',
            },
          }}
        />
      ))}
    </SpeedDial>
  );
}

SimpleSpeedDial.propTypes = {
  direction: PropTypes.string.isRequired,
};

function Directions() {
  return (
    <Box sx={{ position: 'relative', height: 360, width: 560 }}>
      {['up', 'down', 'left', 'right'].map((direction) => (
        <SimpleSpeedDial
          sx={{
            position: 'absolute',
            ...(direction === 'up' && { bottom: 0, right: 0 }),
            ...(direction === 'down' && { top: 0, left: 0 }),
            ...(direction === 'left' && { top: 0, right: 0 }),
            ...(direction === 'right' && { bottom: 0, left: 0 }),
          }}
          key={direction}
          ariaLabel={direction}
          direction={direction}
        />
      ))}
    </Box>
  );
}

export default Directions;
