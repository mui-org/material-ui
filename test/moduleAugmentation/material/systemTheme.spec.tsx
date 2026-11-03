import * as React from 'react';
import Box from '@mui/material/Box';

<Box sx={{ borderColor: (theme) => theme.palette.primary.main }} />;

// @ts-expect-error unknown color
<Box sx={{ borderColor: (theme) => theme.palette.invalid }} />;
