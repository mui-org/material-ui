import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination, { paginationClasses as classes } from '@mui/material/Pagination';
import { paginationItemClasses } from '@mui/material/PaginationItem';
import describeConformance from '../../test/describeConformance';

describe('<Pagination />', () => {
  const { render } = createRenderer();

  describeConformance(<Pagination />, () => ({
    classes,
    inheritComponent: 'nav',
    render,
    muiName: 'MuiPagination',
    refInstanceof: window.HTMLElement,
    testDeepOverrides: { slotName: 'ul', slotClassName: classes.ul },
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'variant', value: 'outlined', styleKey: 'outlined' },
    skip: ['componentProp'],
  }));

  it('should render', () => {
    const { container } = render(<Pagination />);

    expect(container.firstChild).to.have.class(classes.root);
    expect(screen.getByRole('navigation')).to.have.attribute('aria-label', 'pagination navigation');
  });

  it('moves aria-current to the specified page', () => {
    const { container } = render(<Pagination count={3} page={1} />);

    // previous, page 1
    const [, page1] = screen.getAllByRole('button');
    expect(page1).to.have.attribute('aria-current', 'page');
    // verifying no regression from previous bug where `page` wasn't intercepted
    expect(container.querySelector('[page]')).to.equal(null);
  });

  it('fires onChange when a different page is clicked', () => {
    const handleChange = spy();
    render(<Pagination count={3} onChange={handleChange} page={1} />);

    // previous, page 1, page 2
    const [, , page2] = screen.getAllByRole('button');
    page2.click();

    expect(handleChange.callCount).to.equal(1);
  });

  it('should not fire onChange when an ellipsis div is clicked', () => {
    const handleChange = spy();
    const { container } = render(<Pagination count={10} onChange={handleChange} page={1} />);

    const ellipsisDiv = container.querySelector(`.${paginationItemClasses.ellipsis}`);
    ellipsisDiv.click();

    expect(handleChange.callCount).to.equal(0);
  });

  it('renders controls with correct order in rtl theme', () => {
    render(
      <ThemeProvider
        theme={createTheme({
          direction: 'rtl',
        })}
      >
        <Pagination count={5} page={3} showFirstButton showLastButton />
      </ThemeProvider>,
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons[0].querySelector('svg')).to.have.attribute('data-testid', 'LastPageIcon');
    expect(buttons[1].querySelector('svg')).to.have.attribute('data-testid', 'NavigateNextIcon');
    expect(buttons[2].textContent).to.equal('1');
    expect(buttons[6].textContent).to.equal('5');
    expect(buttons[7].querySelector('svg')).to.have.attribute('data-testid', 'NavigateBeforeIcon');
    expect(buttons[8].querySelector('svg')).to.have.attribute('data-testid', 'FirstPageIcon');
  });

  it('renders correct amount of buttons on correct order when boundaryCount is zero', () => {
    render(
      <ThemeProvider
        theme={createTheme({
          direction: 'rtl',
        })}
      >
        <Pagination count={11} defaultPage={6} siblingCount={1} boundaryCount={0} />
      </ThemeProvider>,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[4].querySelector('svg')).to.have.attribute('data-testid', 'NavigateBeforeIcon');
    expect(buttons[1].textContent).to.equal('5');
    expect(buttons[2].textContent).to.equal('6');
    expect(buttons[3].textContent).to.equal('7');
    expect(buttons[0].querySelector('svg')).to.have.attribute('data-testid', 'NavigateNextIcon');
  });

  it('hides the next button when hideNextButton is true', () => {
    render(<Pagination count={3} hideNextButton />);

    expect(screen.queryByRole('button', { name: /go to next page/i })).to.equal(null);
  });

  it('hides the previous button when hidePrevButton is true', () => {
    render(<Pagination count={3} hidePrevButton />);

    expect(screen.queryByRole('button', { name: /go to previous page/i })).to.equal(null);
  });

  it('hides the first button when showFirstButton is false', () => {
    render(<Pagination count={3} showFirstButton={false} />);

    expect(screen.queryByRole('button', { name: /go to first page/i })).to.equal(null);
  });

  it('hides the last button when showLastButton is false', () => {
    render(<Pagination count={3} showLastButton={false} />);

    expect(screen.queryByRole('button', { name: /go to last page/i })).to.equal(null);
  });

  it('manages focus when buttons become disabled', async () => {
    const { user } = render(
      <Pagination count={3} defaultPage={2} showFirstButton showLastButton />,
    );

    const goToPreviousButton = screen.getByRole('button', { name: /go to previous page/i });
    const goToFirstButton = screen.getByRole('button', { name: /go to first page/i });

    await user.click(goToPreviousButton);

    expect(goToPreviousButton).to.have.attribute('disabled', '');
    expect(goToFirstButton).to.have.attribute('disabled', '');
    expect(screen.getByRole('button', { name: /page 1/i })).toHaveFocus();

    const goToNextButton = screen.getByRole('button', { name: /go to next page/i });
    const goToLastButton = screen.getByRole('button', { name: /go to last page/i });

    await user.click(goToNextButton);
    await user.click(goToNextButton);

    expect(goToNextButton).to.have.attribute('disabled', '');
    expect(goToLastButton).to.have.attribute('disabled', '');
    expect(screen.getByRole('button', { name: /page 3/i })).toHaveFocus();

    await user.click(goToFirstButton);

    expect(goToPreviousButton).to.have.attribute('disabled', '');
    expect(goToFirstButton).to.have.attribute('disabled', '');
    expect(screen.getByRole('button', { name: /page 1/i })).toHaveFocus();

    await user.click(goToLastButton);

    expect(goToNextButton).to.have.attribute('disabled', '');
    expect(goToLastButton).to.have.attribute('disabled', '');
    expect(screen.getByRole('button', { name: /page 3/i })).toHaveFocus();
  });

  [
    {
      type: 'previous',
      props: { count: 3, defaultPage: 2 },
      targetPage: 1,
    },
    {
      type: 'first',
      props: { count: 3, defaultPage: 2, showFirstButton: true },
      targetPage: 1,
    },
    {
      type: 'next',
      props: { count: 3, defaultPage: 2 },
      targetPage: 3,
    },
    {
      type: 'last',
      props: { count: 3, defaultPage: 2, showLastButton: true },
      targetPage: 3,
    },
  ].forEach(({ type, props, targetPage }) => {
    it(`moves focus to page ${targetPage} when the ${type} button becomes disabled`, async () => {
      const { user } = render(<Pagination {...props} />);

      const navigationButton = screen.getByRole('button', {
        name: `Go to ${type} page`,
      });

      act(() => {
        navigationButton.focus();
      });

      await user.keyboard('{Enter}');

      expect(navigationButton).to.have.attribute('disabled', '');
      expect(screen.getByRole('button', { name: `page ${targetPage}` })).toHaveFocus();
    });
  });

  it('moves focus after a controlled page update commits', async () => {
    function TestCase() {
      const [page, setPage] = React.useState(2);

      return <Pagination count={3} page={page} onChange={(_, newPage) => setPage(newPage)} />;
    }

    const { user } = render(<TestCase />);

    const previousButton = screen.getByRole('button', {
      name: 'Go to previous page',
    });

    act(() => {
      previousButton.focus();
    });
    await user.keyboard('{Enter}');

    expect(screen.getByRole('button', { name: 'page 1' })).toHaveFocus();
  });

  it('moves focus when the boundary page is rendered after navigation', async () => {
    const { user } = render(
      <Pagination count={10} defaultPage={5} boundaryCount={0} showFirstButton />,
    );

    expect(screen.queryByRole('button', { name: 'Go to page 1' })).to.equal(null);

    const firstButton = screen.getByRole('button', {
      name: 'Go to first page',
    });

    act(() => {
      firstButton.focus();
    });
    await user.keyboard('{Enter}');

    expect(screen.getByRole('button', { name: 'page 1' })).toHaveFocus();
  });

  it('does not override focus moved by onChange', async () => {
    const resultsRef = React.createRef();

    function TestCase() {
      const [page, setPage] = React.useState(2);

      return (
        <React.Fragment>
          <h2 ref={resultsRef} tabIndex={-1}>
            Results
          </h2>

          <Pagination
            count={3}
            page={page}
            onChange={(_, newPage) => {
              setPage(newPage);
              resultsRef.current.focus();
            }}
          />
        </React.Fragment>
      );
    }

    const { user } = render(<TestCase />);

    const previousButton = screen.getByRole('button', {
      name: 'Go to previous page',
    });

    act(() => {
      previousButton.focus();
    });
    await user.keyboard('{Enter}');

    expect(resultsRef.current).toHaveFocus();
  });

  it('renders no page button when count is zero', () => {
    render(<Pagination count={0} boundaryCount={0} siblingCount={0} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).to.have.length(2);
    buttons.forEach((button) => {
      expect(button).to.have.attribute('disabled');
    });
  });
});
