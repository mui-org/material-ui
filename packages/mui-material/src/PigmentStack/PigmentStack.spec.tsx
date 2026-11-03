import Stack from '@mui/material/PigmentStack';

<Stack />;
<Stack direction="row" />;
<Stack spacing={2} />;
<Stack spacing={{ sm: 2, lg: 4 }} />;
<Stack spacing="1rem" />;
<Stack spacing={{ sm: '1rem', lg: '2rem' }} />;
<Stack divider={<div />} />;

// @ts-expect-error `spacing` is not a valid prop
<Stack spacing={{ monitor: 3 }} />;
