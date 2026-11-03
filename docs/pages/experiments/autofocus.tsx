'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 8 }}>
        <TextField label="Name" defaultValue="" autoFocus />
      </Box>
    </ThemeProvider>
  );
}
