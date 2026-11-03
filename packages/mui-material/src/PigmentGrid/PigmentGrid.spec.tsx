import Grid from '@mui/material/PigmentGrid';

<Grid size={2} />;
<Grid size={{ xs: 6, sm: 4, md: 3 }} />;
<Grid size={{ xs: 'auto', sm: 'grow', md: null }} />;

// @ts-expect-error `size` is not a valid prop
<Grid size={{ monitor: 3 }} />;

<Grid container />;
<Grid container spacing={2} />;
<Grid container spacing="1rem" />;
<Grid container spacing={{ xs: 6, sm: 4, md: 3 }} />;
<Grid container spacing={{ xs: '1rem', sm: '2rem', md: '3rem' }} />;
<Grid container direction="row" />;
<Grid container direction="row" spacing={2} />;
<Grid container direction="row" spacing={2} wrap="nowrap" />;
