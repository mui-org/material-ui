import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Grid, { gridClasses as classes } from '@mui/material/Grid';
import { createTheme, ThemeProvider, THEME_ID } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

// The main tests are in mui-system Grid folder
describe('<Grid />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Grid {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLElement,
    muiName: 'MuiGrid',
    testVariantProps: { container: true, spacing: 5 },
    skip: ['classesRoot'],
  }));

  it('should not crash with theme scoping', () => {
    expect(() =>
      render(
        <ThemeProvider theme={{ [THEME_ID]: createTheme() }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>6</Grid>
            <Grid size={{ xs: 12, md: 6 }}>6</Grid>
          </Grid>
        </ThemeProvider>,
      ),
    ).not.throw();
  });

  it('should render with the container class', () => {
    render(<Grid data-testid="grid" container />);
    expect(screen.getByTestId('grid')).to.have.class(classes.container);
  });

  it('should have container styles passed from theme', () => {
    const theme = createTheme({
      components: {
        MuiGrid: {
          styleOverrides: {
            container: {
              padding: '11px',
            },
          },
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Grid data-testid="grid" container>
          hello
        </Grid>
      </ThemeProvider>,
    );
    expect(screen.getByTestId('grid')).to.have.style('padding', '11px');
  });
});
