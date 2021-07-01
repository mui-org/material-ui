import * as React from 'react';
import { expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import {
  describeConformanceV5,
  ErrorBoundary,
  act,
  createClientRender,
  fireEvent,
  screen,
} from 'test/utils';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import classes from './selectClasses';

describe('<Select />', () => {
  /**
   * @type {ReturnType<typeof useFakeTimers>}
   */
  let clock;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });

  const render = createClientRender();

  describeConformanceV5(<Select value="" />, () => ({
    classes,
    inheritComponent: OutlinedInput,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiSelect',
    skip: ['componentProp', 'componentsProp', 'themeVariants', 'themeStyleOverrides'],
  }));

  describe('prop: inputProps', () => {
    it('should be able to provide a custom classes property', () => {
      render(
        <Select
          inputProps={{
            classes: { select: 'select' },
          }}
          value=""
        />,
      );
      expect(document.querySelector(`.${classes.select}`)).to.have.class('select');
    });
  });

  it('should be able to mount the component', () => {
    const { container } = render(
      <Select value={10}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>,
    );

    expect(container.querySelector('input')).to.have.property('value', '10');
  });

  specify('the trigger is in tab order', () => {
    const { getByRole } = render(
      <Select value="">
        <MenuItem value="">None</MenuItem>
      </Select>,
    );

    expect(getByRole('button')).to.have.property('tabIndex', 0);
  });

  it('should accept null child', () => {
    render(
      <Select open value={10}>
        {null}
        <MenuItem value={10}>Ten</MenuItem>
      </Select>,
    );
  });

  it('should have an input with [aria-hidden] by default', () => {
    const { container } = render(
      <Select value="10">
        <MenuItem value="10">Ten</MenuItem>
      </Select>,
    );

    expect(container.querySelector('input')).to.have.attribute('aria-hidden', 'true');
  });

  it('should ignore onBlur when the menu opens', () => {
    // mousedown calls focus while click opens moving the focus to an item
    // this means the trigger is blurred immediately
    const handleBlur = spy();
    const { getByRole, getAllByRole, queryByRole } = render(
      <Select
        onBlur={handleBlur}
        value=""
        onMouseDown={(event) => {
          // simulating certain platforms that focus on mousedown
          if (event.defaultPrevented === false) {
            event.currentTarget.focus();
          }
        }}
      >
        <MenuItem value="">none</MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
      </Select>,
    );
    const trigger = getByRole('button');

    fireEvent.mouseDown(trigger);

    expect(handleBlur.callCount).to.equal(0);
    expect(getByRole('listbox')).not.to.equal(null);

    act(() => {
      const options = getAllByRole('option');
      fireEvent.mouseDown(options[0]);
      options[0].click();
    });

    expect(handleBlur.callCount).to.equal(0);
    expect(queryByRole('listbox', { hidden: false })).to.equal(null);
  });

  it('options should have a data-value attribute', () => {
    const { getAllByRole } = render(
      <Select open value={10}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>,
      { baseElement: document.body },
    );
    const options = getAllByRole('option');

    expect(options[0]).to.have.attribute('data-value', '10');
    expect(options[1]).to.have.attribute('data-value', '20');
  });

  [' ', 'ArrowUp', 'ArrowDown', 'Enter'].forEach((key) => {
    it(`should open menu when pressed ${key} key on select`, () => {
      render(
        <Select value="">
          <MenuItem value="">none</MenuItem>
        </Select>,
      );
      const trigger = screen.getByRole('button');
      act(() => {
        trigger.focus();
      });

      fireEvent.keyDown(trigger, { key });
      expect(screen.getByRole('listbox', { hidden: false })).not.to.equal(null);

      fireEvent.keyUp(screen.getAllByRole('option')[0], { key });
      expect(screen.getByRole('listbox', { hidden: false })).not.to.equal(null);
    });
  });

  it('should pass "name" as part of the event.target for onBlur', () => {
    const handleBlur = stub().callsFake((event) => event.target.name);
    const { getByRole } = render(
      <Select onBlur={handleBlur} name="blur-testing" value="">
        <MenuItem value="">none</MenuItem>
      </Select>,
    );
    const button = getByRole('button');
    act(() => {
      button.focus();
    });

    act(() => {
      button.blur();
    });

    expect(handleBlur.callCount).to.equal(1);
    expect(handleBlur.firstCall.returnValue).to.equal('blur-testing');
  });

  it('should call onClose when the backdrop is clicked', () => {
    const handleClose = spy();
    const { getByTestId } = render(
      <Select
        MenuProps={{ BackdropProps: { 'data-testid': 'backdrop' } }}
        onClose={handleClose}
        open
        value=""
      >
        <MenuItem value="">none</MenuItem>
      </Select>,
    );

    act(() => {
      getByTestId('backdrop').click();
    });

    expect(handleClose.callCount).to.equal(1);
  });

  it('should call onClose when the same option is selected', () => {
    const handleChange = spy();
    const handleClose = spy();
    render(
      <Select open onChange={handleChange} onClose={handleClose} value="second">
        <MenuItem value="first" />
        <MenuItem value="second" />
      </Select>,
    );

    screen.getByRole('option', { selected: true }).click();

    expect(handleChange.callCount).to.equal(0);
    expect(handleClose.callCount).to.equal(1);
  });

  it('should focus select when its label is clicked', () => {
    const { getByRole, getByTestId } = render(
      <React.Fragment>
        <InputLabel id="my$label" data-testid="label" />
        <Select value="" labelId="my$label" />
      </React.Fragment>,
    );

    fireEvent.click(getByTestId('label'));

    expect(getByRole('button')).toHaveFocus();
  });

  it('should focus list if no selection', () => {
    const { getByRole } = render(<Select value="" autoFocus />);

    fireEvent.mouseDown(getByRole('button'));

    // TODO not matching WAI-ARIA authoring practices. It should focus the first (or selected) item.
    expect(getByRole('listbox')).toHaveFocus();
  });

  describe('prop: onChange', () => {
    it('should get selected element from arguments', () => {
      const onChangeHandler = spy();
      const { getAllByRole, getByRole } = render(
        <Select onChange={onChangeHandler} value="0">
          <MenuItem value="0" />
          <MenuItem value="1" />
          <MenuItem value="2" />
        </Select>,
      );
      fireEvent.mouseDown(getByRole('button'));
      act(() => {
        getAllByRole('option')[1].click();
      });

      expect(onChangeHandler.calledOnce).to.equal(true);
      const selected = onChangeHandler.args[0][1];
      expect(React.isValidElement(selected)).to.equal(true);
    });

    it('should call onChange before onClose', () => {
      const eventLog = [];
      const onChangeHandler = spy(() => eventLog.push('CHANGE_EVENT'));
      const onCloseHandler = spy(() => eventLog.push('CLOSE_EVENT'));
      const { getAllByRole, getByRole } = render(
        <Select onChange={onChangeHandler} onClose={onCloseHandler} value="0">
          <MenuItem value="0" />
          <MenuItem value="1" />
        </Select>,
      );

      fireEvent.mouseDown(getByRole('button'));
      act(() => {
        getAllByRole('option')[1].click();
      });

      expect(eventLog).to.deep.equal(['CHANGE_EVENT', 'CLOSE_EVENT']);
    });

    it('should not be called if selected element has the current value (value did not change)', () => {
      const onChangeHandler = spy();
      const { getAllByRole, getByRole } = render(
        <Select onChange={onChangeHandler} value="1">
          <MenuItem value="0" />
          <MenuItem value="1" />
          <MenuItem value="2" />
        </Select>,
      );
      fireEvent.mouseDown(getByRole('button'));
      act(() => {
        getAllByRole('option')[1].click();
      });

      expect(onChangeHandler.callCount).to.equal(0);
    });
  });

  describe('prop: value', () => {
    it('should select the option based on the number value', () => {
      const { getAllByRole } = render(
        <Select open value={20}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
        { baseElement: document.body },
      );
      const options = getAllByRole('option');

      expect(options[0]).not.to.have.attribute('aria-selected', 'true');
      expect(options[1]).to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should select the option based on the string value', () => {
      const { getAllByRole } = render(
        <Select open value="20">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
        { baseElement: document.body },
      );
      const options = getAllByRole('option');

      expect(options[0]).not.to.have.attribute('aria-selected', 'true');
      expect(options[1]).to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should select only the option that matches the object', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const { getAllByRole } = render(
        <Select open value={obj1}>
          <MenuItem value={obj1}>1</MenuItem>
          <MenuItem value={obj2}>2</MenuItem>
        </Select>,
        { baseElement: document.body },
      );
      const options = getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should be able to use an object', () => {
      const value = {};
      const { getByRole } = render(
        <Select value={value}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={value}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      expect(getByRole('button')).to.have.text('Twenty');
    });

    describe('warnings', () => {
      it('warns when the value is not present in any option', () => {
        expect(() =>
          render(
            <Select value={20}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>,
          ),
        ).toWarnDev([
          'Material-UI: You have provided an out-of-range value `20` for the select component.',
          // strict mode renders twice
          'Material-UI: You have provided an out-of-range value `20` for the select component.',
        ]);
      });
    });
  });

  describe('SVG icon', () => {
    it('should not present an SVG icon when native and multiple are specified', () => {
      const { container } = render(
        <Select native multiple value={[0, 1]}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(container.querySelector('svg')).to.equal(null);
    });

    it('should present an SVG icon', () => {
      const { container } = render(
        <Select native value={1}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(container.querySelector('svg')).toBeVisible();
    });
  });

  describe('accessibility', () => {
    it('sets aria-expanded="true" when the listbox is displayed', () => {
      // since we make the rest of the UI inaccessible when open this doesn't
      // technically matter. This is only here in case we keep the rest accessible
      const { getByRole } = render(<Select open value="" />);

      expect(getByRole('button', { hidden: true })).to.have.attribute('aria-expanded', 'true');
    });

    specify('ARIA 1.2: aria-expanded="false" if the listbox isnt displayed', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('button')).to.have.attribute('aria-expanded', 'false');
    });

    it('sets aria-disabled="true" when component is disabled', () => {
      const { getByRole } = render(<Select disabled value="" />);

      expect(getByRole('button')).to.have.attribute('aria-disabled', 'true');
    });

    it('sets disabled attribute in input when component is disabled', () => {
      const { container } = render(<Select disabled value="" />);

      expect(container.querySelector('input')).to.have.property('disabled', true);
    });

    specify('aria-disabled is not present if component is not disabled', () => {
      const { getByRole } = render(<Select disabled={false} value="" />);

      expect(getByRole('button')).not.to.have.attribute('aria-disabled');
    });

    it('indicates that activating the button displays a listbox', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('button')).to.have.attribute('aria-haspopup', 'listbox');
    });

    it('renders an element with listbox behavior', () => {
      const { getByRole } = render(<Select open value="" />);

      expect(getByRole('listbox')).toBeVisible();
    });

    specify('the listbox is focusable', () => {
      const { getByRole } = render(<Select open value="" />);

      getByRole('listbox').focus();

      expect(getByRole('listbox')).toHaveFocus();
    });

    it('identifies each selectable element containing an option', () => {
      const { getAllByRole } = render(
        <Select open value="">
          <MenuItem value="1">First</MenuItem>
          <MenuItem value="2">Second</MenuItem>
        </Select>,
      );

      const options = getAllByRole('option');
      expect(options[0]).to.have.text('First');
      expect(options[1]).to.have.text('Second');
    });

    it('indicates the selected option', () => {
      const { getAllByRole } = render(
        <Select open value="2">
          <MenuItem value="1">First</MenuItem>
          <MenuItem value="2">Second</MenuItem>
        </Select>,
      );

      expect(getAllByRole('option')[1]).to.have.attribute('aria-selected', 'true');
    });

    it('it will fallback to its content for the accessible name when it has no name', () => {
      const { getByRole } = render(<Select value="" />);

      // TODO what is the accessible name actually?
      expect(getByRole('button')).not.to.have.attribute('aria-labelledby');
    });

    it('is labelled by itself when it has a name', () => {
      const { getByRole } = render(<Select name="select" value="" />);

      expect(getByRole('button')).to.have.attribute(
        'aria-labelledby',
        getByRole('button').getAttribute('id'),
      );
    });

    it('is labelled by itself when it has an id which is preferred over name', () => {
      const { getAllByRole } = render(
        <React.Fragment>
          <span id="select-1-label">Chose first option:</span>
          <Select id="select-1" labelId="select-1-label" name="select" value="" />
          <span id="select-2-label">Chose second option:</span>
          <Select id="select-2" labelId="select-2-label" name="select" value="" />
        </React.Fragment>,
      );

      const triggers = getAllByRole('button');

      expect(triggers[0]).to.have.attribute(
        'aria-labelledby',
        `select-1-label ${triggers[0].getAttribute('id')}`,
      );
      expect(triggers[1]).to.have.attribute(
        'aria-labelledby',
        `select-2-label ${triggers[1].getAttribute('id')}`,
      );
    });

    it('can be labelled by an additional element if its id is provided in `labelId`', () => {
      const { getByRole } = render(
        <React.Fragment>
          <span id="select-label">Choose one:</span>
          <Select labelId="select-label" name="select" value="" />
        </React.Fragment>,
      );

      expect(getByRole('button')).to.have.attribute(
        'aria-labelledby',
        `select-label ${getByRole('button').getAttribute('id')}`,
      );
    });

    specify('the list of options is not labelled by default', () => {
      const { getByRole } = render(<Select open value="" />);

      expect(getByRole('listbox')).not.to.have.attribute('aria-labelledby');
    });

    specify('the list of options can be labelled by providing `labelId`', () => {
      const { getByRole } = render(
        <React.Fragment>
          <span id="select-label">Choose one:</span>
          <Select labelId="select-label" open value="" />
        </React.Fragment>,
      );

      expect(getByRole('listbox')).to.have.attribute('aria-labelledby', 'select-label');
    });

    it('should have appropriate accessible description when provided in props', () => {
      const { getByRole } = render(
        <React.Fragment>
          <Select aria-describedby="select-helper-text" value="" />
          <span id="select-helper-text">Helper text content</span>
        </React.Fragment>,
      );

      const target = getByRole('button');
      expect(target).to.have.attribute('aria-describedby', 'select-helper-text');
      expect(target).toHaveAccessibleDescription('Helper text content');
    });
  });

  describe('prop: readOnly', () => {
    it('should not trigger any event with readOnly', () => {
      render(
        <Select readOnly value="10">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
        </Select>,
        { baseElement: document.body },
      );
      const trigger = screen.getByRole('button');
      act(() => {
        trigger.focus();
      });

      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      expect(screen.queryByRole('listbox')).to.equal(null);

      fireEvent.keyUp(trigger, { key: 'ArrowDown' });
      expect(screen.queryByRole('listbox')).to.equal(null);
    });
  });

  describe('prop: MenuProps', () => {
    it('should apply additional props to the Menu component', () => {
      const onEntered = spy();
      const { getByRole } = render(
        <Select MenuProps={{ TransitionProps: { onEntered }, transitionDuration: 100 }} value="10">
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      fireEvent.mouseDown(getByRole('button'));
      act(() => {
        clock.tick(99);
      });

      expect(onEntered.callCount).to.equal(0);

      act(() => {
        clock.tick(1);
      });

      expect(onEntered.callCount).to.equal(1);
    });

    it('should be able to override PaperProps minWidth', () => {
      const { getByTestId } = render(
        <Select
          MenuProps={{ PaperProps: { 'data-testid': 'paper', style: { minWidth: 12 } } }}
          open
          value="10"
        >
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      expect(getByTestId('paper').style).to.have.property('minWidth', '12px');
    });
  });

  describe('prop: SelectDisplayProps', () => {
    it('should apply additional props to trigger element', () => {
      const { getByRole } = render(
        <Select SelectDisplayProps={{ 'data-test': 'SelectDisplay' }} value="10">
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      expect(getByRole('button')).to.have.attribute('data-test', 'SelectDisplay');
    });
  });

  describe('prop: displayEmpty', () => {
    it('should display the selected item even if its value is empty', () => {
      const { getByRole } = render(
        <Select value="" displayEmpty>
          <MenuItem value="">Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      expect(getByRole('button')).to.have.text('Ten');
    });
  });

  describe('prop: renderValue', () => {
    it('should use the prop to render the value', () => {
      const renderValue = (x) => `0b${x.toString(2)}`;
      const { getByRole } = render(
        <Select renderValue={renderValue} value={4}>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>,
      );

      expect(getByRole('button')).to.have.text('0b100');
    });
  });

  describe('prop: open (controlled)', () => {
    it('should not focus on close controlled select', () => {
      function ControlledWrapper() {
        const [open, setOpen] = React.useState(false);

        return (
          <div>
            <button type="button" id="open-select" onClick={() => setOpen(true)}>
              Open select
            </button>
            <Select
              MenuProps={{ transitionDuration: 0 }}
              open={open}
              onClose={() => setOpen(false)}
              value=""
            >
              <MenuItem onClick={() => setOpen(false)}>close</MenuItem>
            </Select>
          </div>
        );
      }
      const { container, getByRole } = render(<ControlledWrapper />);
      const openSelect = container.querySelector('#open-select');
      openSelect.focus();
      fireEvent.click(openSelect);

      const option = getByRole('option');
      expect(option).toHaveFocus();
      fireEvent.click(option);

      expect(container.querySelectorAll(classes.focused).length).to.equal(0);
      expect(openSelect).toHaveFocus();
    });

    it('should allow to control closing by passing onClose props', () => {
      function ControlledWrapper() {
        const [open, setOpen] = React.useState(false);

        return (
          <Select
            MenuProps={{ transitionDuration: 0 }}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value=""
          >
            <MenuItem onClick={() => setOpen(false)}>close</MenuItem>
          </Select>
        );
      }
      const { getByRole, queryByRole } = render(<ControlledWrapper />);

      fireEvent.mouseDown(getByRole('button'));
      expect(getByRole('listbox')).not.to.equal(null);

      act(() => {
        getByRole('option').click();
      });
      // react-transition-group uses one extra commit for exit to completely remove
      // it from the DOM. but it's at least immediately inaccessible.
      // It's desired that this fails one day. The additional tick required to remove
      // this from the DOM is not a feature
      expect(getByRole('listbox', { hidden: true })).toBeInaccessible();
      act(() => {
        clock.tick(0);
      });

      expect(queryByRole('listbox', { hidden: true })).to.equal(null);
    });

    it('should be open when initially true', () => {
      const { getByRole } = render(
        <Select open value="">
          <MenuItem>Hello</MenuItem>
        </Select>,
      );

      expect(getByRole('listbox')).not.to.equal(null);
    });

    it('open only with the left mouse button click', () => {
      // Test for https://github.com/mui-org/material-ui/issues/19250#issuecomment-578620934
      // Right/middle mouse click shouldn't open the Select
      const { getByRole, queryByRole } = render(
        <Select value="">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      const trigger = getByRole('button');

      // If clicked by the right/middle mouse button, no options list should be opened
      fireEvent.mouseDown(trigger, { button: 1 });
      expect(queryByRole('listbox')).to.equal(null);

      fireEvent.mouseDown(trigger, { button: 2 });
      expect(queryByRole('listbox')).to.equal(null);
    });
  });

  describe('prop: autoWidth', () => {
    it('should take the trigger width into account by default', () => {
      const { getByRole, getByTestId } = render(
        <Select MenuProps={{ PaperProps: { 'data-testid': 'paper' } }} value="">
          <MenuItem>Only</MenuItem>
        </Select>,
      );
      const button = getByRole('button');
      stub(button, 'clientWidth').get(() => 14);

      fireEvent.mouseDown(button);
      expect(getByTestId('paper').style).to.have.property('minWidth', '14px');
    });

    it('should not take the triger width into account when autoWidth is true', () => {
      const { getByRole, getByTestId } = render(
        <Select autoWidth MenuProps={{ PaperProps: { 'data-testid': 'paper' } }} value="">
          <MenuItem>Only</MenuItem>
        </Select>,
      );
      const button = getByRole('button');
      stub(button, 'clientWidth').get(() => 14);

      fireEvent.mouseDown(button);
      expect(getByTestId('paper').style).to.have.property('minWidth', '');
    });
  });

  describe('prop: multiple', () => {
    it('should serialize multiple select value', () => {
      const { container, getAllByRole } = render(
        <Select multiple open value={[10, 30]}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );
      const options = getAllByRole('option');

      expect(container.querySelector('input')).to.have.property('value', '10,30');
      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
      expect(options[2]).to.have.attribute('aria-selected', 'true');
    });

    it('selects value based on their stringified equality when theyre not objects', () => {
      const { getAllByRole } = render(
        <Select multiple open value={['10', '20']}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );
      const options = getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('selects values based on strict equlity if theyre objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };
      const { getAllByRole } = render(
        <Select multiple open value={[obj1, obj3]}>
          <MenuItem value={obj1}>ID: 1</MenuItem>
          <MenuItem value={obj2}>ID: 2</MenuItem>
          <MenuItem value={obj3}>ID: 3</MenuItem>
        </Select>,
      );
      const options = getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
      expect(options[2]).to.have.attribute('aria-selected', 'true');
    });

    describe('errors', () => {
      it('should throw if non array', function test() {
        // TODO is this fixed?
        if (!/jsdom/.test(window.navigator.userAgent)) {
          // can't catch render errors in the browser for unknown reason
          // tried try-catch + error boundary + window onError preventDefault
          this.skip();
        }

        const errorRef = React.createRef();
        expect(() => {
          render(
            <ErrorBoundary ref={errorRef}>
              <Select multiple value="10,20">
                <MenuItem value="10">Ten</MenuItem>
                <MenuItem value="20">Twenty</MenuItem>
                <MenuItem value="30">Thirty</MenuItem>
              </Select>
            </ErrorBoundary>,
          );
        }).toErrorDev([
          'Material-UI: The `value` prop must be an array',
          'The above error occurred in the <ForwardRef(SelectInput)> component',
        ]);
        const {
          current: { errors },
        } = errorRef;
        expect(errors).to.have.length(1);
        expect(errors[0].toString()).to.include('Material-UI: The `value` prop must be an array');
      });
    });

    describe('prop: onChange', () => {
      it('should call onChange when clicking an item', () => {
        function ControlledSelectInput(props) {
          const { onChange } = props;
          const [values, clickedValue] = React.useReducer((currentValues, valueClicked) => {
            if (currentValues.indexOf(valueClicked) === -1) {
              return currentValues.concat(valueClicked);
            }
            return currentValues.filter((value) => {
              return value !== valueClicked;
            });
          }, []);

          const handleChange = (event) => {
            onChange(event);
            clickedValue(event.target.value);
          };

          return (
            <Select multiple name="age" onChange={handleChange} value={values}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Ten</MenuItem>
              <MenuItem value={30}>Ten</MenuItem>
            </Select>
          );
        }
        const onChange = stub().callsFake((event) => {
          return {
            name: event.target.name,
            value: event.target.value,
          };
        });
        const { getByRole, getAllByRole } = render(<ControlledSelectInput onChange={onChange} />);

        fireEvent.mouseDown(getByRole('button'));
        const options = getAllByRole('option');
        fireEvent.click(options[2]);

        expect(onChange.callCount).to.equal(1);
        expect(onChange.firstCall.returnValue).to.deep.equal({ name: 'age', value: [30] });

        act(() => {
          options[0].click();
        });

        expect(onChange.callCount).to.equal(2);
        expect(onChange.secondCall.returnValue).to.deep.equal({ name: 'age', value: [30, 10] });
      });
    });
  });

  describe('prop: autoFocus', () => {
    it('should focus select after Select did mount', () => {
      const { getByRole } = render(<Select value="" autoFocus />);

      expect(getByRole('button')).toHaveFocus();
    });
  });

  it('should be able to return the input node via a ref object', () => {
    const ref = React.createRef();
    const { setProps } = render(<Select inputProps={{ ref }} value="" />);

    expect(ref.current.node).to.have.tagName('input');

    setProps({
      value: '',
    });
    expect(ref.current.node).to.have.tagName('input');
  });

  describe('prop: inputRef', () => {
    it('should be able to return the input node via a ref object', () => {
      const ref = React.createRef();
      render(<Select inputRef={ref} value="" />);

      expect(ref.current.node).to.have.tagName('input');
    });

    // TODO: This might be confusing a prop called input!Ref can imperatively
    // focus a button. This implies <input type="button" /> is still used.
    it('should be able focus the trigger imperatively', () => {
      const ref = React.createRef();
      const { getByRole } = render(<Select inputRef={ref} value="" />);

      act(() => {
        ref.current.focus();
      });

      expect(getByRole('button')).toHaveFocus();
    });
  });

  describe('prop: name', () => {
    it('should have no id when name is not provided', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('button')).not.to.have.attribute('id');
    });

    it('should have select-`name` id when name is provided', () => {
      const { getByRole } = render(<Select name="foo" value="" />);

      expect(getByRole('button')).to.have.attribute('id', 'mui-component-select-foo');
    });
  });

  describe('prop: native', () => {
    it('renders a <select />', () => {
      const { container } = render(<Select native />);

      expect(container.querySelector('select')).not.to.equal(null);
    });

    it('can be labelled with a <label />', () => {
      const { getByRole } = render(
        <React.Fragment>
          <label htmlFor="select">A select</label>
          <Select id="select" native />
        </React.Fragment>,
      );

      expect(getByRole('combobox', { name: 'A select' })).to.have.property('tagName', 'SELECT');
    });
  });

  it('prevents the default when releasing Space on the children', () => {
    const keyUpSpy = spy();
    render(
      <Select value="one" open>
        <MenuItem onKeyUp={keyUpSpy} value="one">
          One
        </MenuItem>
      </Select>,
    );

    fireEvent.keyUp(screen.getAllByRole('option')[0], { key: ' ' });

    expect(keyUpSpy.callCount).to.equal(1);
    expect(keyUpSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
  });

  it('should pass onClick prop to MenuItem', () => {
    const onClick = spy();
    const { getAllByRole } = render(
      <Select open value="30">
        <MenuItem onClick={onClick} value={30}>
          Thirty
        </MenuItem>
      </Select>,
    );

    const options = getAllByRole('option');
    fireEvent.click(options[0]);

    expect(onClick.callCount).to.equal(1);
  });

  // https://github.com/testing-library/react-testing-library/issues/322
  // https://twitter.com/devongovett/status/1248306411508916224
  it('should handle the browser autofill event and simple testing-library API', () => {
    const onChangeHandler = spy();
    const { container, getByRole } = render(
      <Select onChange={onChangeHandler} defaultValue="germany" name="country">
        <MenuItem value="france">France</MenuItem>
        <MenuItem value="germany">Germany</MenuItem>
        <MenuItem value="china">China</MenuItem>
      </Select>,
    );
    fireEvent.change(container.querySelector('input[name="country"]'), {
      target: {
        value: 'france',
      },
    });

    expect(onChangeHandler.calledOnce).to.equal(true);
    expect(getByRole('button')).to.have.text('France');
  });

  it('should support native form validation', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // see https://github.com/jsdom/jsdom/issues/123
      this.skip();
    }

    const handleSubmit = spy((event) => {
      // avoid karma reload.
      event.preventDefault();
    });
    const Form = (props) => (
      <form onSubmit={handleSubmit}>
        <Select required name="country" {...props}>
          <MenuItem value="" />
          <MenuItem value="france">France</MenuItem>
          <MenuItem value="germany">Germany</MenuItem>
          <MenuItem value="china">China</MenuItem>
        </Select>
        <button type="submit" />
      </form>
    );
    const { container, setProps } = render(<Form value="" />);

    fireEvent.click(container.querySelector('button[type=submit]'));
    expect(handleSubmit.callCount).to.equal(0, 'the select is empty it should disallow submit');

    setProps({ value: 'france' });
    fireEvent.click(container.querySelector('button[type=submit]'));
    expect(handleSubmit.callCount).to.equal(1);
  });

  it('should programmatically focus the select', () => {
    const { getByRole } = render(
      <Select
        value={1}
        inputRef={(input) => {
          if (input !== null) {
            input.focus();
          }
        }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
      </Select>,
    );
    expect(document.activeElement).to.equal(getByRole('button'));
  });

  it('should not override the event.target on mouse events', () => {
    const handleChange = spy();
    const handleClick = spy();
    render(
      <div onClick={handleClick}>
        <Select open onChange={handleChange} value="second">
          <MenuItem value="first" />
          <MenuItem value="second" />
        </Select>
      </div>,
    );

    const options = screen.getAllByRole('option');
    options[0].click();

    expect(handleChange.callCount).to.equal(1);
    expect(handleClick.callCount).to.equal(1);
    expect(handleClick.firstCall.args[0]).to.have.property('target', options[0]);
  });

  it('should only select options', () => {
    const handleChange = spy();
    render(
      <Select open onChange={handleChange} value="second">
        <MenuItem value="first" />
        <Divider />
        <MenuItem value="second" />
      </Select>,
    );

    const divider = document.querySelector('hr');
    divider.click();
    expect(handleChange.callCount).to.equal(0);
  });

  it('slots overrides should work', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const iconStyle = {
      marginTop: '13px',
    };

    const nativeInputStyle = {
      marginTop: '10px',
    };

    const theme = createTheme({
      components: {
        MuiSelect: {
          styleOverrides: {
            icon: iconStyle,
            nativeInput: nativeInputStyle,
          },
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Select open value="first">
          <MenuItem value="first" />
          <MenuItem value="second" />
        </Select>
      </ThemeProvider>,
    );

    expect(container.getElementsByClassName(classes.icon)[0]).to.toHaveComputedStyle(iconStyle);
    expect(container.getElementsByClassName(classes.nativeInput)[0]).to.toHaveComputedStyle(
      nativeInputStyle,
    );
  });

  it('should merge the class names', () => {
    const { getByTestId } = render(
      <Select className="foo" input={<InputBase data-testid="root" className="bar" />} value="" />,
    );
    expect(getByTestId('root')).to.have.class('foo');
    expect(getByTestId('root')).to.have.class('bar');
  });
});
