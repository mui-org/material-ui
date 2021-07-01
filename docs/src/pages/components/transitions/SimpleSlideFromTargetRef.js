import * as React from 'react';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

export default function SimpleSlideFromTargetRef() {
  const [checked, setChecked] = React.useState(false);
  const targetRef = React.useRef(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      padding={1.5}
      sx={{ height: 180, width: 240 }}
      ref={targetRef}
      bgcolor="gainsboro"
      overflow="hidden"
    >
      <Box sx={{ width: 200 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show from target"
        />
        <Slide
          direction="up"
          in={checked}
          targetRef={targetRef}
          mountOnEnter
          unmountOnExit
        >
          {icon}
        </Slide>
      </Box>
    </Box>
  );
}
