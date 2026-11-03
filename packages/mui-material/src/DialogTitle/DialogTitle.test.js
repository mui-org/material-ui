import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Typography from '@mui/material/Typography';
import DialogTitle, { dialogTitleClasses as classes } from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import describeConformance from '../../test/describeConformance';

describe('<DialogTitle />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogTitle>foo</DialogTitle>, () => ({
    classes,
    inheritComponent: Typography,
    render,
    muiName: 'MuiDialogTitle',
    refInstanceof: window.HTMLHeadingElement,
    testVariantProps: { 'data-color': 'red' },
  }));

  it('should render JSX children', () => {
    const children = <span data-testid="test-children" />;
    render(<DialogTitle>{children}</DialogTitle>);

    screen.getByTestId('test-children');
  });

  it('should render string children as given string', () => {
    const children = 'Hello';
    render(<DialogTitle>{children}</DialogTitle>);

    screen.getByText('Hello');
  });

  it('should render the title as an h2 by default', () => {
    render(<DialogTitle>foo</DialogTitle>);

    const title = screen.getByRole('heading', { name: 'foo', level: 2 });
    expect(title.tagName).to.equal('H2');
  });

  describe('prop: id', () => {
    it('should apply the id attribute provided to the Dialog title', () => {
      render(
        <Dialog open>
          <DialogTitle id="custom-id">title test</DialogTitle>
        </Dialog>,
      );

      expect(screen.getByText('title test')).to.have.attribute('id', 'custom-id');
    });

    it('should fallback to the aria-labelledby from the Dialog', () => {
      render(
        <Dialog open aria-labelledby="custom-id">
          <DialogTitle>title test</DialogTitle>
        </Dialog>,
      );

      expect(screen.getByText('title test')).to.have.attribute('id', 'custom-id');
    });

    it('should apply the id attribute explicitly provided to the DialogTitle and not take from Dialog', () => {
      render(
        <Dialog open aria-labelledby="custom-id-1">
          <DialogTitle id="custom-id-2">title test</DialogTitle>
        </Dialog>,
      );

      expect(screen.getByText('title test')).to.have.attribute('id', 'custom-id-2');
    });
  });
});
