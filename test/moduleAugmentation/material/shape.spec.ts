import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Shape {
    borderRadiusSecondary: number;
  }

  interface ShapeOptions {
    borderRadiusSecondary: number;
  }
}

createTheme({
  shape: {
    borderRadiusSecondary: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadiusSecondary,
          '&:hover': {
            borderRadius: theme.vars.shape.borderRadiusSecondary,
          },
        }),
      },
    },
  },
});
