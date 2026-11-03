import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface CustomNode {
  background: string;
  color: string;
}

declare module '@mui/material/styles' {
  interface ThemeOptions {
    customNode: CustomNode;
  }

  interface Theme {
    customNode: CustomNode;
  }
}

const customTheme = createTheme({
  customNode: {
    background: '#000',
    color: '#fff',
  },
});

const StyledComponent = styled('div')(({ theme }) => ({
  background: theme.customNode.background,
  color: theme.customNode.color,
}));

<Box
  sx={(theme) => ({
    background: theme.customNode.background,
    color: theme.customNode.color,
  })}
/>;
