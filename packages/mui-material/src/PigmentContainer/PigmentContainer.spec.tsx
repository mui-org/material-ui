import Container from '@mui/material/PigmentContainer';

<Container />;
<Container maxWidth="sm" />;
<Container fixed />;
<Container disableGutters />;
<Container fixed disableGutters />;

// @ts-expect-error `maxWidth` is not a valid prop
<Container maxWidth="monitor" />;
