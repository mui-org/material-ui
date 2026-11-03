import TimelineDot from '@mui/lab/TimelineDot';

function TestBaseColorPaletteProp() {
  const baseColorPalette = ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
  return (
    <div>
      {baseColorPalette.map((color) => (
        <div key={color}>
          <TimelineDot color={color} />
        </div>
      ))}
    </div>
  );
}
