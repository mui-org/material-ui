import Grid from '@mui/system/Grid';

// Responsive props accept readonly arrays
<Grid
  container
  columns={[4, null, 12] as const}
  spacing={[1, null, '2rem'] as const}
  rowSpacing={[1, 2] as const}
  columnSpacing={[1, 2] as const}
  direction={['row', 'row-reverse'] as const}
  size={[6, null, 'grow'] as const}
  offset={[0, 'auto'] as const}
/>;
