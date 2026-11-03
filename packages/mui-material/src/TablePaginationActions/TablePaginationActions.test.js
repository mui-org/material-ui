import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TablePaginationActions, {
  tablePaginationActionsClasses as classes,
} from '@mui/material/TablePaginationActions';
import describeConformance from '../../test/describeConformance';

describe('<TablePaginationActions />', () => {
  const { render } = createRenderer();
  const defaultProps = {
    getItemAriaLabel: (type) => `Go to ${type} page`,
    count: 100,
    onPageChange: () => {},
    page: 1,
    rowsPerPage: 10,
    showFirstButton: true,
    showLastButton: true,
  };

  describeConformance(
    <TablePaginationActions
      getItemAriaLabel={(type) => {
        if (type === 'first') {
          return 'first';
        }
        if (type === 'last') {
          return 'last';
        }
        if (type === 'next') {
          return 'next';
        }
        return 'previous';
      }}
      count={100}
      onPageChange={() => {}}
      page={1}
      rowsPerPage={10}
      showFirstButton
      showLastButton
    />,
    () => ({
      inheritComponent: 'div',
      render,
      classes,
      muiName: 'MuiTablePaginationActions',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'themeVariants'],
    }),
  );

  it.each(['first', 'previous', 'next', 'last'])(
    'shows the %s action tooltip on hover',
    async (type) => {
      const { user } = render(<TablePaginationActions {...defaultProps} />);
      const label = `Go to ${type} page`;
      const button = screen.getByRole('button', { name: label });

      expect(button).not.to.have.attribute('title');
      await user.hover(button);

      expect(await screen.findByRole('tooltip')).to.have.text(label);
      expect(button).toHaveAccessibleName(label);
    },
  );

  it('shows a tooltip on keyboard focus and skips disabled actions', async () => {
    const { user } = render(<TablePaginationActions {...defaultProps} page={0} />);

    await user.tab();

    expect(screen.getByRole('button', { name: 'Go to next page' })).toHaveFocus();
    expect(await screen.findByRole('tooltip')).to.have.text('Go to next page');
    expect(screen.getByRole('button', { name: 'Go to first page' })).to.have.property(
      'disabled',
      true,
    );
    expect(screen.getByRole('button', { name: 'Go to previous page' })).to.have.property(
      'disabled',
      true,
    );
  });

  it.each(['ltr', 'rtl'])('preserves custom button slots and titles in %s', async (direction) => {
    const handlePageChange = vi.fn();
    const handleMouseOver = vi.fn();
    const buttonRef = React.createRef();
    const { user } = render(
      <ThemeProvider theme={createTheme({ direction })}>
        <TablePaginationActions
          {...defaultProps}
          onPageChange={handlePageChange}
          slots={{ nextButton: 'button' }}
          slotProps={{
            nextButton: {
              title: 'Custom tooltip',
              'aria-label': 'Custom action',
              onMouseOver: handleMouseOver,
              ref: buttonRef,
            },
          }}
        />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button', { name: 'Custom action' });

    expect(buttonRef.current).to.equal(button);
    expect(button).to.have.attribute('title', 'Custom tooltip');
    await user.hover(button);

    expect(screen.queryByRole('tooltip')).to.equal(null);
    expect(handleMouseOver).toHaveBeenCalled();
    expect(button).toHaveAccessibleName('Custom action');

    await user.click(button);

    expect(handlePageChange).toHaveBeenCalledWith(expect.anything(), direction === 'rtl' ? 0 : 2);
  });

  it.each(
    ['ltr', 'rtl'].flatMap((direction) =>
      ['default', 'native'].map((slot) => ({ direction, slot })),
    ),
  )(
    'respects an explicit undefined title for $slot slots in $direction',
    async ({ direction, slot }) => {
      const types = ['first', 'previous', 'next', 'last'];
      const { user } = render(
        <ThemeProvider
          theme={createTheme({
            direction,
            components: { MuiTooltip: { defaultProps: { enterDelay: 0 } } },
          })}
        >
          <TablePaginationActions
            {...defaultProps}
            slots={
              slot === 'native'
                ? Object.fromEntries(types.map((type) => [`${type}Button`, 'button']))
                : undefined
            }
            slotProps={Object.fromEntries(
              types.map((type) => [`${type}Button`, { title: undefined }]),
            )}
          />
        </ThemeProvider>,
      );

      for (const type of types) {
        const label = `Go to ${type} page`;
        const button = screen.getByRole('button', { name: label });
        expect(button).not.to.have.attribute('title');
        // eslint-disable-next-line no-await-in-loop
        await user.hover(button);
        expect(screen.queryByRole('tooltip')).to.equal(null);
        expect(button).toHaveAccessibleName(label);
      }
    },
  );

  it('uses the slotProps title for a default button tooltip', async () => {
    const { user } = render(
      <TablePaginationActions
        {...defaultProps}
        slotProps={{ nextButton: { title: 'Custom tooltip' } }}
      />,
    );
    const button = screen.getByRole('button', { name: 'Go to next page' });
    expect(button).not.to.have.attribute('title');

    await user.hover(button);

    expect(await screen.findByRole('tooltip')).to.have.text('Custom tooltip');
  });

  it.each(
    [undefined, null].flatMap((ariaLabel) =>
      ['default', 'custom', 'removed'].map((title) => ({ ariaLabel, title })),
    ),
  )('falls back to the $title title when aria-label is $ariaLabel', ({ ariaLabel, title }) => {
    const types = ['first', 'previous', 'next', 'last'];
    render(
      <TablePaginationActions
        {...defaultProps}
        slotProps={Object.fromEntries(
          types.map((type) => [
            `${type}Button`,
            {
              'aria-label': ariaLabel,
              ...(title === 'custom' && { title: `Custom ${type} action` }),
              ...(title === 'removed' && { title: undefined }),
            },
          ]),
        )}
      />,
    );

    screen.getAllByRole('button').forEach((button, index) => {
      const type = types[index];
      const label = {
        default: `Go to ${type} page`,
        custom: `Custom ${type} action`,
        removed: '',
      }[title];
      expect(button).toHaveAccessibleName(label);
    });
  });

  it('preserves an explicit accessible name independently of the tooltip title', async () => {
    const { user } = render(
      <TablePaginationActions
        {...defaultProps}
        slotProps={{ nextButton: { 'aria-label': 'Custom action', title: 'Custom tooltip' } }}
      />,
    );
    const button = screen.getByRole('button', { name: 'Custom action' });

    await user.hover(button);

    expect(await screen.findByRole('tooltip')).to.have.text('Custom tooltip');
    expect(button).toHaveAccessibleName('Custom action');
  });

  it.each(
    ['ltr', 'rtl'].flatMap((direction) =>
      ['first', 'previous', 'next', 'last'].map((type) => ({ direction, type })),
    ),
  )('preserves a plain function $type slot in $direction', async ({ direction, type }) => {
    const handlePageChange = vi.fn();
    function CustomButton(props) {
      return <button {...props} data-testid="custom-button" />;
    }
    const { user } = render(
      <ThemeProvider theme={createTheme({ direction })}>
        <TablePaginationActions
          {...defaultProps}
          slots={{ [`${type}Button`]: CustomButton }}
          onPageChange={handlePageChange}
        />
      </ThemeProvider>,
    );
    const button = screen.getByTestId('custom-button');
    const action =
      direction === 'rtl'
        ? { first: 'last', previous: 'next', next: 'previous', last: 'first' }[type]
        : type;
    expect(button).to.have.attribute('title', `Go to ${action} page`);
    expect(button).toHaveAccessibleName(`Go to ${action} page`);

    await user.hover(button);
    expect(screen.queryByRole('tooltip')).to.equal(null);
    await user.click(button);

    expect(handlePageChange).toHaveBeenCalledWith(
      expect.anything(),
      { first: 0, previous: 0, next: 2, last: 9 }[action],
    );
  });

  it('lets a plain function slot provide its own tooltip', async () => {
    function CustomButton({ title, ...props }) {
      return (
        <Tooltip title={title}>
          <IconButton {...props} />
        </Tooltip>
      );
    }
    const { user } = render(
      <TablePaginationActions
        {...defaultProps}
        slots={{ nextButton: CustomButton }}
        slotProps={{ nextButton: { title: 'Consumer tooltip' } }}
      />,
    );

    await user.hover(screen.getByRole('button', { name: 'Go to next page' }));

    expect(await screen.findByRole('tooltip')).to.have.text('Consumer tooltip');
  });

  describe.skipIf(isJsdom())('focus restoration', () => {
    it.each(
      ['ltr', 'rtl'].flatMap((direction) =>
        ['first', 'previous', 'next', 'last'].map((type, index) => ({ direction, type, index })),
      ),
    )(
      'moves focus when $type becomes disabled in $direction',
      async ({ direction, type, index }) => {
        function TestCase() {
          const [page, setPage] = React.useState(1);
          return (
            <ThemeProvider theme={createTheme({ direction })}>
              <TablePaginationActions
                {...defaultProps}
                count={30}
                page={page}
                onPageChange={(event, nextPage) => setPage(nextPage)}
              />
            </ThemeProvider>
          );
        }
        const { user } = render(<TestCase />);
        for (let tab = 0; tab <= index; tab += 1) {
          // eslint-disable-next-line no-await-in-loop
          await user.tab();
        }
        const button = screen.getByRole('button', { name: `Go to ${type} page` });
        expect(button).toHaveFocus();

        await user.keyboard('{Enter}');

        expect(button).to.have.property('disabled', true);
        const target = index < 2 ? 'next' : 'previous';
        expect(screen.getByRole('button', { name: `Go to ${target} page` })).toHaveFocus();
      },
    );

    it.each(['button', 'link'])(
      'restores focus for a plain function %s slot after an external update',
      async (element) => {
        let disablePrevious;
        function CustomButton({ disabled, children, ...props }) {
          return element === 'button' ? (
            <button {...props} disabled={disabled}>
              {children}
            </button>
          ) : (
            <a {...props} href="#next-page" aria-disabled={disabled}>
              {children}
            </a>
          );
        }
        function TestCase() {
          const [disabled, setDisabled] = React.useState(false);
          disablePrevious = () => setDisabled(true);
          return (
            <TablePaginationActions
              {...defaultProps}
              showFirstButton={false}
              showLastButton={false}
              slots={{ previousButton: CustomButton, nextButton: CustomButton }}
              slotProps={{ previousButton: { disabled } }}
            />
          );
        }
        const { user } = render(<TestCase />);
        await user.tab();
        expect(screen.getByRole(element, { name: 'Go to previous page' })).toHaveFocus();

        await act(async () => disablePrevious());

        expect(screen.getByRole(element, { name: 'Go to next page' })).toHaveFocus();
      },
    );

    it.each([{ disabled: true }, { 'aria-disabled': true }, { tabIndex: -1 }])(
      'skips an ineligible action (%j) when searching backward',
      async (previousButtonProps) => {
        function TestCase() {
          const [page, setPage] = React.useState(1);
          return (
            <TablePaginationActions
              {...defaultProps}
              count={30}
              page={page}
              slotProps={{ previousButton: previousButtonProps }}
              onPageChange={(event, nextPage) => setPage(nextPage)}
            />
          );
        }
        const { user } = render(<TestCase />);
        await user.click(screen.getByRole('button', { name: 'Go to next page' }));

        expect(screen.getByRole('button', { name: 'Go to first page' })).toHaveFocus();
      },
    );

    it('preserves consumer focus and blur handlers and focus moved by onPageChange', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const resultsRef = React.createRef();
      function TestCase() {
        const [page, setPage] = React.useState(1);
        return (
          <React.Fragment>
            <h2 ref={resultsRef} tabIndex={-1}>
              Results
            </h2>
            <TablePaginationActions
              {...defaultProps}
              page={page}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onPageChange={(event, nextPage) => {
                setPage(nextPage);
                resultsRef.current.focus();
              }}
            />
          </React.Fragment>
        );
      }
      const { user } = render(<TestCase />);
      await user.tab();
      await user.keyboard('{Enter}');

      expect(resultsRef.current).toHaveFocus();
      expect(handleFocus).toHaveBeenCalled();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('does not move focus when all actions become disabled', async () => {
      function TestCase() {
        const [disabled, setDisabled] = React.useState(false);
        return (
          <TablePaginationActions
            {...defaultProps}
            disabled={disabled}
            onPageChange={() => setDisabled(true)}
          />
        );
      }
      const { user } = render(<TestCase />);
      await user.tab();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(document.activeElement).to.equal(document.body);
      });
    });

    it('keeps focus on an action that remains enabled', async () => {
      function TestCase() {
        const [page, setPage] = React.useState(1);
        return (
          <TablePaginationActions
            {...defaultProps}
            page={page}
            onPageChange={(event, nextPage) => setPage(nextPage)}
          />
        );
      }
      const { user } = render(<TestCase />);
      const nextButton = screen.getByRole('button', { name: 'Go to next page' });
      await user.click(nextButton);

      expect(nextButton).toHaveFocus();
    });

    it('does not restore focus for a custom slot that omits the data attribute', async () => {
      function CustomButton({ 'data-mui-pagination-action': action, ...props }) {
        return <button {...props} />;
      }
      function TestCase() {
        const [page, setPage] = React.useState(1);
        return (
          <TablePaginationActions
            {...defaultProps}
            page={page}
            slots={{ firstButton: CustomButton }}
            onPageChange={(event, nextPage) => setPage(nextPage)}
          />
        );
      }
      const { user } = render(<TestCase />);
      await user.tab();
      await user.keyboard('{Enter}');

      expect(screen.getByRole('button', { name: 'Go to first page' })).to.have.property(
        'disabled',
        true,
      );
      expect(screen.getByRole('button', { name: 'Go to next page' })).not.toHaveFocus();
      expect(screen.getByRole('button', { name: 'Go to last page' })).not.toHaveFocus();
    });
  });
});
