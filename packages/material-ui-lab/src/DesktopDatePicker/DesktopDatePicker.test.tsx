import * as React from 'react';
import { expect } from 'chai';
import { SinonFakeTimers, spy, useFakeTimers } from 'sinon';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions';
import { act, fireEvent, screen, userEvent } from 'test/utils';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import {
  createPickerRender,
  FakeTransitionComponent,
  adapterToUse,
  getByMuiTest,
} from '../internal/pickers/test-utils';

const UncontrolledOpenDesktopDatePicker = (({
  onClose = () => {},
  onOpen = () => {},
  open: openProp,
  defaultOpen,
  ...other
}: any) => {
  if (openProp != null) {
    throw new TypeError('Controlling `open` is not supported. Use `defaultOpen` instead.');
  }
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <DesktopDatePicker
      open={open}
      onClose={(...args) => {
        setOpen(false);
        onClose(...args);
      }}
      onOpen={(...args) => {
        setOpen(true);
        onOpen(...args);
      }}
      {...other}
    />
  );
}) as typeof DesktopDatePicker;

describe('<DesktopDatePicker />', () => {
  let clock: SinonFakeTimers;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });
  // StrictModeViolation: Uses CalendarPicker
  const render = createPickerRender({ strict: false });

  it('prop: components.OpenPickerIcon', () => {
    function HomeIcon(props: SvgIconProps) {
      return (
        <SvgIcon data-testid="component-test" {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
      );
    }

    const { getByTestId } = render(
      <DesktopDatePicker
        label="icon test example"
        value={null}
        onChange={() => {}}
        components={{
          OpenPickerIcon: HomeIcon,
        }}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(getByTestId('component-test')).not.to.equal(null);
  });

  it('opens when "Choose date" is clicked', () => {
    const handleOpen = spy();
    render(
      <DesktopDatePicker
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={() => {}}
        onOpen={handleOpen}
        TransitionComponent={FakeTransitionComponent}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    act(() => {
      userEvent.mousePress(screen.getByLabelText(/Choose date/));
    });

    expect(handleOpen.callCount).to.equal(1);
    expect(screen.queryByRole('dialog')).not.to.equal(null);
  });

  ['readOnly', 'disabled'].forEach((prop) => {
    it(`cannot be opened when "Choose date" is clicked when ${prop}={true}`, () => {
      const handleOpen = spy();
      render(
        <DesktopDatePicker
          value={adapterToUse.date('2019-01-01T00:00:00.000')}
          {...{ [prop]: true }}
          onChange={() => {}}
          onOpen={handleOpen}
          open={false}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      act(() => {
        userEvent.mousePress(screen.getByLabelText(/Choose date/));
      });

      expect(handleOpen.callCount).to.equal(0);
    });
  });

  it('closes on clickaway', () => {
    const handleClose = spy();
    render(
      <DesktopDatePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
        TransitionComponent={FakeTransitionComponent}
      />,
    );

    userEvent.mousePress(document.body);

    expect(handleClose.callCount).to.equal(1);
  });

  it('does not close on clickaway when it is not open', () => {
    const handleClose = spy();
    render(
      <DesktopDatePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        onClose={handleClose}
      />,
    );

    userEvent.mousePress(document.body);

    expect(handleClose.callCount).to.equal(0);
  });

  it('does not close on click inside', () => {
    const handleClose = spy();
    render(
      <DesktopDatePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
        TransitionComponent={FakeTransitionComponent}
      />,
    );

    userEvent.mousePress(screen.getByLabelText('Next month'));

    expect(handleClose.callCount).to.equal(0);
  });

  it('accepts date on day button click', () => {
    const onChangeMock = spy();
    render(
      <UncontrolledOpenDesktopDatePicker
        // @ts-expect-error internal prop
        defaultOpen
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        TransitionComponent={FakeTransitionComponent}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 2, 2019'));

    expect(onChangeMock.callCount).to.equal(1);
    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('closes on selection', () => {
    render(
      <UncontrolledOpenDesktopDatePicker
        // @ts-expect-error internal prop
        defaultOpen
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it("prop `disableCloseOnSelect` – if `true` doesn't close picker", () => {
    render(
      <UncontrolledOpenDesktopDatePicker
        // @ts-expect-error internal prop
        defaultOpen
        TransitionComponent={FakeTransitionComponent}
        disableCloseOnSelect
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeVisible();
  });

  it('does not call onChange if same date selected', () => {
    const onChangeMock = spy();
    render(
      <DesktopDatePicker
        open
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 1, 2018'));

    expect(onChangeMock.callCount).to.equal(0);
  });

  it('allows to change selected date from the input according to `format`', () => {
    const onChangeMock = spy();
    render(
      <DesktopDatePicker
        renderInput={(props) => <TextField placeholder="10/10/2018" {...props} />}
        label="Masked input"
        inputFormat="dd/MM/yyyy"
        value={adapterToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        InputAdornmentProps={{
          disableTypography: true,
        }}
      />,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: '10/11/2018',
      },
    });

    expect(screen.getByRole('textbox')).to.have.value('10/11/2018');
    expect(onChangeMock.callCount).to.equal(1);
  });

  it('prop `showToolbar` – renders toolbar in desktop mode', () => {
    render(
      <DesktopDatePicker
        open
        showToolbar
        onChange={() => {}}
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(getByMuiTest('picker-toolbar')).toBeVisible();
  });

  describe('prop: PopperProps', () => {
    it('forwards onClick and onTouchStart', () => {
      const handleClick = spy();
      const handleTouchStart = spy();
      render(
        <DesktopDatePicker
          open
          onChange={() => {}}
          PopperProps={{
            onClick: handleClick,
            onTouchStart: handleTouchStart,
            // @ts-expect-error `data-*` attributes are not recognized in props objects
            'data-testid': 'popper',
          }}
          renderInput={(params) => <TextField {...params} />}
          value={null}
        />,
      );
      const popper = screen.getByTestId('popper');

      fireEvent.click(popper);
      fireEvent.touchStart(popper);

      expect(handleClick.callCount).to.equal(1);
      expect(handleTouchStart.callCount).to.equal(1);
    });
  });

  describe('scroll', () => {
    const NoTransition = React.forwardRef(function NoTransition(
      props: TransitionProps & { children?: React.ReactNode },
      ref: React.Ref<HTMLDivElement>,
    ) {
      const { children, in: inProp } = props;

      if (!inProp) {
        return null;
      }
      return (
        <div ref={ref} tabIndex={-1}>
          {children}
        </div>
      );
    });

    before(function beforeHook() {
      // JSDOM has neither layout nor window.scrollTo
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    let originalScrollX: number;
    let originalScrollY: number;
    beforeEach(() => {
      originalScrollX = window.screenX;
      originalScrollY = window.scrollY;
    });
    afterEach(() => {
      window.scrollTo(originalScrollX, originalScrollY);
    });

    it('does not scroll when opened', () => {
      const handleClose = spy();
      const handleOpen = spy();
      function BottomAnchoredDesktopTimePicker() {
        const [anchorEl, anchorElRef] = React.useState<HTMLElement | null>(null);

        React.useEffect(() => {
          if (anchorEl !== null) {
            window.scrollTo(0, anchorEl.getBoundingClientRect().top);
          }
        }, [anchorEl]);

        return (
          <React.Fragment>
            <div style={{ height: '200vh' }}>Spacer</div>
            <DesktopDatePicker
              value={adapterToUse.date('2018-01-01T00:00:00.000')}
              OpenPickerButtonProps={{ ref: anchorElRef }}
              onChange={() => {}}
              onClose={handleClose}
              onOpen={handleOpen}
              renderInput={(params) => <TextField {...params} />}
              TransitionComponent={NoTransition}
            />
          </React.Fragment>
        );
      }
      render(<BottomAnchoredDesktopTimePicker />);
      const scrollYBeforeOpen = window.scrollY;

      fireEvent.click(screen.getByLabelText(/choose date/i));

      expect(handleClose.callCount).to.equal(0);
      expect(handleOpen.callCount).to.equal(1);
      expect(window.scrollY, 'focus caused scroll').to.equal(scrollYBeforeOpen);
    });
  });
});
