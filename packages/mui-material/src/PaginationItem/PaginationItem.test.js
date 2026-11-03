import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaginationItem, { paginationItemClasses as classes } from '@mui/material/PaginationItem';
import ButtonBase from '@mui/material/ButtonBase';
import RtlProvider from '@mui/system/RtlProvider';
import describeConformance from '../../test/describeConformance';

describe('<PaginationItem />', () => {
  const { render } = createRenderer();

  describeConformance(<PaginationItem />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiPaginationItem',
    refInstanceof: window.HTMLButtonElement,
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'variant', value: 'outlined', styleKey: 'outlined' },
    slots: {
      first: {},
      last: {},
      previous: {},
      next: {},
    },
    skip: [
      // Icon slots (first, last, previous, next) only render when `type` matches
      // (e.g. type="first" for the first slot). The conformance test renders
      // <PaginationItem /> which defaults to type="page", so icon slots are absent.
      // Manual slot tests below cover this instead.
      'slotsProp',
      'slotPropsProp',
      'slotPropsCallback',
      'slotPropsCallbackWithPropsAsOwnerState',
    ],
  }));

  it('should render', () => {
    const { container } = render(<PaginationItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should add the `selected` class to the root element if `selected={true}`', () => {
    render(<PaginationItem selected />);

    expect(screen.getByRole('button')).to.have.class(classes.selected);
  });

  it('should add the `colorPrimary` class to the root element if `color="primary"`', () => {
    render(<PaginationItem color="primary" />);

    expect(screen.getByRole('button')).to.have.class(classes.colorPrimary);
  });

  it('should add the `colorSecondary` class to the root element if `color="secondary"`', () => {
    render(<PaginationItem color="secondary" />);

    expect(screen.getByRole('button')).to.have.class(classes.colorSecondary);
  });

  describe('prop: disabled', () => {
    it('should add the `disabled` class to the root element if `disabled={true}`', () => {
      render(<PaginationItem disabled />);

      expect(screen.getByRole('button')).to.have.class(classes.disabled);
    });

    it('should render a disabled button if `disabled={true}`', () => {
      render(<PaginationItem disabled />);

      expect(screen.getByRole('button')).to.have.property('disabled', true);
    });
  });

  it('should render a small button', () => {
    render(
      <PaginationItem data-testid="root" size="small" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = screen.getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).to.have.class(classes.sizeSmall);
    expect(root).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large button', () => {
    render(
      <PaginationItem data-testid="root" size="large" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = screen.getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).not.to.have.class(classes.sizeSmall);
    expect(root).to.have.class(classes.sizeLarge);
  });

  it('should render a first-last button', () => {
    render(
      <PaginationItem data-testid="root" page={1} type={'first'}>
        Hello World
      </PaginationItem>,
    );

    expect(screen.getByRole('button')).to.have.class(classes.firstLast);
  });

  it('should render a previous-next button', () => {
    render(
      <PaginationItem data-testid="root" page={1} type={'previous'}>
        Hello World
      </PaginationItem>,
    );

    expect(screen.getByRole('button')).to.have.class(classes.previousNext);
  });

  // describeConformance in it's current form is not able to test slots prop when slots are rendered conditionally. Hence below tests are added in this file.
  describe('prop: slots, slotProps, components', () => {
    function CustomPreviousIcon(props) {
      return <ArrowBackIcon data-testid={props['data-testid'] ?? 'custom-previous'} />;
    }

    function CustomNextIcon(props) {
      return <ArrowForwardIcon data-testid={props['data-testid'] ?? 'custom-next'} />;
    }

    function CustomFirstIcon(props) {
      return <KeyboardDoubleArrowLeftIcon data-testid={props['data-testid'] ?? 'custom-first'} />;
    }

    function CustomLastIcon(props) {
      return <KeyboardDoubleArrowRightIcon data-testid={props['data-testid'] ?? 'custom-last'} />;
    }

    it('icons passed in slots prop should override default icons', () => {
      const slots = {
        previous: CustomPreviousIcon,
        next: CustomNextIcon,
        first: CustomFirstIcon,
        last: CustomLastIcon,
      };

      ['first', 'previous', 'next', 'last'].forEach((slot) => {
        render(<PaginationItem page={1} slots={slots} type={slot} />);

        expect(screen.getByTestId(`custom-${slot}`)).not.to.equal(null);
      });
    });

    it('slotProps should be applied to icons passed in slots prop', () => {
      const slots = {
        previous: CustomPreviousIcon,
        next: CustomNextIcon,
        first: CustomFirstIcon,
        last: CustomLastIcon,
      };

      const slotProps = {
        previous: { 'data-testid': 'slot-previous' },
        next: { 'data-testid': 'slot-next' },
        first: { 'data-testid': 'slot-first' },
        last: { 'data-testid': 'slot-last' },
      };

      ['first', 'previous', 'next', 'last'].forEach((slot) => {
        render(<PaginationItem page={1} slotProps={slotProps} slots={slots} type={slot} />);

        expect(screen.getByTestId(`slot-${slot}`)).not.to.equal(null);
      });
    });

    it('slotProps should override internal props', () => {
      const slotProps = {
        previous: { 'data-testid': 'component-previous' },
        next: { 'data-testid': 'component-next' },
        first: { 'data-testid': 'component-first' },
        last: { 'data-testid': 'component-last' },
      };

      ['first', 'previous', 'next', 'last'].forEach((slot) => {
        render(<PaginationItem page={1} slotProps={slotProps} type={slot} />);

        expect(screen.getByTestId(`component-${slot}`)).not.to.equal(null);
      });
    });

    it('should take RtlProvider into account when provided and apply slotProps to slots accordingly', () => {
      const slots = {
        previous: CustomPreviousIcon,
        next: CustomNextIcon,
        first: CustomFirstIcon,
        last: CustomLastIcon,
      };

      const slotProps = {
        previous: { 'data-testid': 'slot-previous' },
        next: { 'data-testid': 'slot-next' },
        first: { 'data-testid': 'slot-first' },
        last: { 'data-testid': 'slot-last' },
      };

      render(
        <RtlProvider>
          <PaginationItem page={1} slotProps={slotProps} slots={slots} type={'previous'} />
          <PaginationItem page={1} slotProps={slotProps} slots={slots} type={'first'} />
        </RtlProvider>,
      );

      expect(screen.queryByTestId('slot-next')).not.to.equal(null);
      expect(screen.queryByTestId('slot-previous')).to.equal(null);
      expect(screen.queryByTestId('slot-last')).not.to.equal(null);
      expect(screen.queryByTestId('slot-first')).to.equal(null);
    });
  });

  describe('prop: nativeButton', () => {
    it('forwards nativeButton={false} to ButtonBase with a custom component', () => {
      const CustomSpan = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<PaginationItem component={CustomSpan} page={1} nativeButton={false} />);

      const item = screen.getByRole('button');
      expect(item).to.have.tagName('SPAN');
      expect(item).not.to.have.attribute('type');

      // Proves nativeButton={false} was forwarded — without it, ButtonBase
      // would warn about a non-button host with nativeButton omitted.
      expect(errorSpy.mock.calls.length).to.equal(0);
      errorSpy.mockRestore();
    });
  });
});
