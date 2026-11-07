import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const colors = [
  'default',
  'inherit',
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning',
];

export default function FabA11yColorMatrix() {
  return (
    <Box sx={{ display: 'grid', gap: 2, '& > div': { display: 'flex', flexWrap: 'wrap', gap: 1 } }}>
      <div>
        {colors.map((color) => (
          <Fab key={color} color={color} aria-label={`Add ${color}`}>
            <AddIcon />
          </Fab>
        ))}
      </div>
      <div>
        {colors.map((color) => (
          <Fab key={color} color={color} variant="extended">
            <AddIcon sx={{ mr: 1 }} />
            {color}
          </Fab>
        ))}
      </div>
    </Box>
  );
}
