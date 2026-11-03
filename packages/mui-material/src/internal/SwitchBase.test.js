import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, reactMajor, screen, fireEvent } from '@mui/internal-test-utils';
import SwitchBase from './SwitchBase';
import FormControl, { useFormControl } from '../FormControl';
import ButtonBase from '../ButtonBase';
import classes from './switchBaseClasses';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<SwitchBase />', () => {
  const { render } = createRenderer();

  function CustomRoot({
    centerRipple,
    focusRipple,
    ownerState,
    internalDisabledThemeFocusVisible,
    ...props
  }) {
    return <div {...props} />;
  }

  describeConformance(
    <SwitchBase checkedIcon="checked" icon="unchecked" type="checkbox" />,
    () => ({
      classes,
      inheritComponent: ButtonBase,
      render,
      refInstanceof: window.HTMLSpanElement,
      testComponentPropWith: 'div',
      testVariantProps: { disabled: true },
      slots: {
        root: {
          expectedClassName: classes.root,
          testWithElement: CustomRoot,
        },
        input: {
          expectedClassName: classes.input,
        },
      },
      skip: ['themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
    }),
  );

  it('should render a span', () => {
    const { container } = render(
      <SwitchBase checkedIcon="checked" icon="unchecked" type="checkbox" />,
    );

    expect(container.firstChild).to.have.property('nodeName', 'SPAN');
  });

  it('should render an icon and input inside the button by default', () => {
    const { container } = render(
      <SwitchBase checkedIcon="checked" icon="unchecked" type="checkbox" />,
    );
    const buttonInside = container.firstChild;

    expect(buttonInside).to.have.property('nodeName', 'SPAN');
    expect(buttonInside.childNodes[0]).to.equal(screen.getByRole('checkbox'));
    expect(buttonInside.childNodes[1]).to.have.text('unchecked');
  });

  it('should have a ripple', async () => {
    const { container } = render(
      <SwitchBase
        checkedIcon="checked"
        icon="unchecked"
        type="checkbox"
        TouchRippleProps={{ 'data-testid': 'TouchRipple' }}
      />,
    );

    await ripple.startTouch(container.querySelector('input'));

    expect(screen.getByTestId('TouchRipple')).not.to.equal(null);
  });

  it('can have edge', () => {
    const { container } = render(
      <SwitchBase edge="start" icon="unchecked" checkedIcon="checked" type="checkbox" />,
    );

    expect(container.firstChild).to.have.class(classes.edgeStart);
  });

  it('can disable the ripple', async () => {
    const { container } = render(
      <SwitchBase
        checkedIcon="checked"
        icon="unchecked"
        type="checkbox"
        disableRipple
        TouchRippleProps={{ 'data-testid': 'TouchRipple' }}
      />,
    );

    await ripple.startTouch(container.querySelector('input'));

    expect(screen.queryByTestId('TouchRipple')).to.equal(null);
  });

  it('should pass tabIndex to the input so it can be taken out of focus rotation', () => {
    render(<SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" tabIndex={-1} />);

    expect(screen.getByRole('checkbox')).to.have.attribute('tabIndex', '-1');
  });

  it('should pass value, and name to the input', () => {
    render(
      <SwitchBase
        icon="unchecked"
        checkedIcon="checked"
        type="checkbox"
        name="gender"
        disabled
        value="male"
      />,
    );

    const input = screen.getByRole('checkbox');

    expect(input).to.have.attribute('name', 'gender');
    expect(input).to.have.attribute('value', 'male');
  });

  describe('prop: disabled', () => {
    it('disables the component', () => {
      render(
        <SwitchBase
          data-testid="test"
          icon="unchecked"
          checkedIcon="checked"
          type="checkbox"
          disabled
        />,
      );

      const inputEl = screen.getByRole('checkbox');
      expect(inputEl).to.not.have.attribute('checked');

      fireEvent.click(inputEl);
      expect(inputEl).to.not.have.attribute('checked');

      fireEvent.click(screen.getByTestId('test'));
      expect(inputEl).to.not.have.attribute('checked');
    });

    it('sets the disabled attribute and className', () => {
      render(
        <SwitchBase
          data-testid="test"
          icon="unchecked"
          checkedIcon="checked"
          type="checkbox"
          disabled
        />,
      );

      expect(screen.getByRole('checkbox')).to.have.attribute('disabled');
      expect(screen.getByTestId('test')).to.have.class(classes.disabled);
    });
  });

  describe('controlled', () => {
    it('should check the checkbox', () => {
      const { container, setProps } = render(
        <SwitchBase
          icon="unchecked"
          checkedIcon={<span data-testid="checked-icon" />}
          type="checkbox"
          checked={false}
        />,
      );
      setProps({ checked: true });

      expect(container.firstChild).to.have.class(classes.checked);
      expect(screen.getByRole('checkbox')).to.have.property('checked', true);
      expect(screen.getByTestId('checked-icon')).not.to.equal(null);
    });

    it('should uncheck the checkbox', () => {
      const { container, setProps } = render(
        <SwitchBase
          icon={<span data-testid="unchecked-icon" />}
          checkedIcon="checked"
          type="checkbox"
          checked
        />,
      );
      setProps({ checked: false });

      expect(container.firstChild).not.to.have.class(classes.checked);
      expect(screen.getByRole('checkbox')).to.have.property('checked', false);
      expect(screen.getByTestId('unchecked-icon')).not.to.equal(null);
    });
  });

  it('can change checked state uncontrolled starting from defaultChecked', () => {
    const { container } = render(
      <SwitchBase
        icon={<span data-testid="unchecked-icon" />}
        checkedIcon={<span data-testid="checked-icon" />}
        type="checkbox"
        defaultChecked
      />,
    );
    const checkbox = screen.getByRole('checkbox');

    expect(container.firstChild).to.have.class(classes.checked);
    expect(checkbox).to.have.property('checked', true);
    expect(screen.getByTestId('checked-icon')).not.to.equal(null);

    act(() => {
      checkbox.click();
    });

    expect(container.firstChild).not.to.have.class(classes.checked);
    expect(checkbox).to.have.property('checked', false);
    expect(screen.getByTestId('unchecked-icon')).not.to.equal(null);

    act(() => {
      checkbox.click();
    });

    expect(container.firstChild).to.have.class(classes.checked);
    expect(checkbox).to.have.property('checked', true);
    expect(screen.getByTestId('checked-icon')).not.to.equal(null);
  });

  describe('handleInputChange()', () => {
    it('should call onChange when uncontrolled', () => {
      const handleChange = spy();

      render(
        <SwitchBase
          icon="unchecked"
          checkedIcon="checked"
          type="checkbox"
          onChange={handleChange}
        />,
      );

      act(() => {
        screen.getByRole('checkbox').click();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.firstCall.args[0].target).to.have.property('checked', true);
    });

    it('should call onChange when controlled', () => {
      const defaultChecked = true;
      function ControlledSwichBase() {
        const [checked, setChecked] = React.useState(defaultChecked);

        return (
          <SwitchBase
            icon="unchecked"
            checkedIcon="checked"
            type="checkbox"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
        );
      }

      render(<ControlledSwichBase />);
      const checkbox = screen.getByRole('checkbox');

      act(() => {
        checkbox.click();
      });

      expect(checkbox).to.have.property('checked', !defaultChecked);
    });

    it('should not change checkbox state when event is default prevented', () => {
      const handleChange = spy();
      const handleClick = spy((event) => event.preventDefault());
      const { container } = render(
        <SwitchBase
          icon="checkbox"
          checkedIcon="checkbox"
          type="checkbox"
          defaultChecked
          onChange={handleChange}
          onClick={handleClick}
        />,
      );
      const checkbox = screen.getByRole('checkbox');

      expect(container.firstChild).to.have.class(classes.checked);
      expect(checkbox).to.have.property('checked', true);

      act(() => {
        checkbox.click();
      });

      expect(handleChange.callCount).to.equal(0);
      expect(container.firstChild).to.have.class(classes.checked);
      expect(checkbox).to.have.property('checked', true);
    });

    describe('slotProps: input', () => {
      it('should be able to add aria', () => {
        render(
          <SwitchBase
            icon="unchecked"
            checkedIcon="checked"
            type="checkbox"
            slotProps={{ input: { 'aria-label': 'foo' } }}
          />,
        );

        expect(screen.getByRole('checkbox', { name: 'foo' })).to.have.property('type', 'checkbox');
      });
    });

    describe('prop: id', () => {
      it('should be able to add id to a checkbox input', () => {
        render(<SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" id="foo" />);

        expect(screen.getByRole('checkbox')).to.have.attribute('id', 'foo');
      });

      it('should be able to add id to a radio input', () => {
        render(<SwitchBase icon="unchecked" checkedIcon="checked" type="radio" id="foo" />);

        expect(screen.getByRole('radio')).to.have.attribute('id', 'foo');
      });
    });
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        render(
          <FormControl>
            <SwitchBase data-testid="root" icon="unchecked" checkedIcon="checked" type="checkbox" />
          </FormControl>,
        );

        expect(screen.getByTestId('root')).not.to.have.class(classes.disabled);
        expect(screen.getByRole('checkbox')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl>
            <SwitchBase
              disabled
              data-testid="root"
              icon="unchecked"
              checkedIcon="checked"
              type="checkbox"
            />
          </FormControl>,
        );

        expect(screen.getByTestId('root')).to.have.class(classes.disabled);
        expect(screen.getByRole('checkbox')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        render(
          <FormControl disabled>
            <SwitchBase data-testid="root" icon="unchecked" checkedIcon="checked" type="checkbox" />
          </FormControl>,
        );

        expect(screen.getByTestId('root')).to.have.class(classes.disabled);
        expect(screen.getByRole('checkbox')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl disabled>
            <SwitchBase
              disabled={false}
              data-testid="root"
              icon="unchecked"
              checkedIcon="checked"
              type="checkbox"
            />
          </FormControl>,
        );

        expect(screen.getByTestId('root')).not.to.have.class(classes.disabled);
        expect(screen.getByRole('checkbox')).not.to.have.attribute('disabled');
      });
    });
  });

  describe('focus/blur', () => {
    it('forwards focus/blur events and notifies the FormControl', async () => {
      function FocusMonitor(props) {
        const { focused } = useFormControl();

        return <span {...props}>focused: {String(focused)}</span>;
      }
      const handleBlur = spy();
      const handleFocus = spy();

      render(
        <FormControl>
          <FocusMonitor data-testid="focus-monitor" />
          <SwitchBase
            onBlur={handleBlur}
            onFocus={handleFocus}
            icon="unchecked"
            checkedIcon="checked"
            type="checkbox"
          />
        </FormControl>,
      );

      const checkbox = screen.getByRole('checkbox');

      await act(async () => {
        checkbox.focus();
      });

      expect(screen.getByTestId('focus-monitor')).to.have.text('focused: true');
      expect(handleFocus.callCount).to.equal(1);

      await act(async () => {
        checkbox.blur();
      });

      expect(screen.getByTestId('focus-monitor')).to.have.text('focused: false');
      expect(handleBlur.callCount).to.equal(1);
    });
  });

  describe('check transitioning between controlled states throws errors', () => {
    it('should error when uncontrolled and changed to controlled', function test() {
      let setProps;
      expect(() => {
        ({ setProps } = render(
          <SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" />,
        ));
      }).not.toErrorDev();

      expect(() => {
        setProps({ checked: true });
      }).toErrorDev([
        reactMajor === 16 &&
          'Warning: A component is changing an uncontrolled input of type checkbox to be controlled.',
        reactMajor >= 19 && 'A component is changing an uncontrolled input to be controlled.',
        reactMajor < 19 &&
          reactMajor !== 16 &&
          'Warning: A component is changing an uncontrolled input to be controlled.',
        'MUI: A component is changing the uncontrolled checked state of SwitchBase to be controlled.',
      ]);
    });

    it('should error when controlled and changed to uncontrolled', function test() {
      let setProps;
      expect(() => {
        ({ setProps } = render(
          <SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" checked={false} />,
        ));
      }).not.toErrorDev();

      expect(() => {
        setProps({ checked: undefined });
      }).toErrorDev([
        reactMajor === 16 &&
          'Warning: A component is changing an uncontrolled input of type checkbox to be controlled.',
        reactMajor >= 19 && 'A component is changing a controlled input to be uncontrolled.',
        reactMajor < 19 &&
          reactMajor !== 16 &&
          'Warning: A component is changing a controlled input to be uncontrolled.',
        'MUI: A component is changing the controlled checked state of SwitchBase to be uncontrolled.',
      ]);
    });
  });

  describe('checkbox form submission', () => {
    it('`value` falls back to the platform default if no `value` is set', () => {
      render(<SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" />);

      // https://html.spec.whatwg.org/multipage/input.html#dom-input-value-default-on
      expect(screen.getByRole('checkbox')).to.have.property('value', 'on');
    });

    it('`value` can be overwritten', () => {
      render(<SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" value="red" />);

      expect(screen.getByRole('checkbox')).to.have.property('value', 'red');
    });
  });

  it('should call event handlers in slotProps when provided', () => {
    const rootOnClick = spy();
    const inputOnClick = spy();

    render(
      <SwitchBase
        icon="unchecked"
        checkedIcon="checked"
        type="checkbox"
        slotProps={{
          root: {
            onClick: rootOnClick,
          },
          input: {
            onClick: inputOnClick,
          },
        }}
      />,
    );

    act(() => {
      screen.getByRole('checkbox').click();
    });

    expect(rootOnClick.callCount).to.equal(1);
    expect(inputOnClick.callCount).to.equal(1);
  });
});
