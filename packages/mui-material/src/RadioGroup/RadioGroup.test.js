import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import PropTypes from 'prop-types';
import { act, createRenderer, fireEvent, isJsdom, screen } from '@mui/internal-test-utils';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup, radioGroupClasses as classes } from '@mui/material/RadioGroup';
import describeConformance from '../../test/describeConformance';

describe('<RadioGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<RadioGroup value="" />, () => ({
    render,
    classes: {},
    inheritComponent: FormGroup,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiRadioGroup',
    skip: ['componentProp', 'themeStyleOverrides', 'themeVariants'],
  }));

  it('should fire the onBlur callback', () => {
    const handleBlur = spy();
    const { container } = render(<RadioGroup value="" onBlur={handleBlur} />);

    fireEvent.blur(container.firstChild);

    expect(handleBlur.callCount).to.equal(1);
  });

  it('should fire the onKeyDown callback', () => {
    const handleKeyDown = spy();
    render(<RadioGroup tabIndex={-1} value="" onKeyDown={handleKeyDown} />);
    const radiogroup = screen.getByRole('radiogroup');

    act(() => {
      radiogroup.focus();
    });

    fireEvent.keyDown(radiogroup);

    expect(handleKeyDown.callCount).to.equal(1);
  });

  it('should support uncontrolled mode', () => {
    render(
      <RadioGroup name="group">
        <Radio value="one" />
      </RadioGroup>,
    );

    const radio = screen.getByRole('radio');

    fireEvent.click(radio);

    expect(radio.checked).to.equal(true);
  });

  it('should support default value in uncontrolled mode', () => {
    render(
      <RadioGroup name="group" defaultValue="zero">
        <Radio value="zero" />
        <Radio value="one" />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole('radio');

    expect(radios[0].checked).to.equal(true);

    fireEvent.click(radios[1]);

    expect(radios[1].checked).to.equal(true);
  });

  it('should support number value', () => {
    render(
      <RadioGroup name="group" defaultValue={1}>
        <Radio value={1} />
        <Radio value={2} />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).to.have.attribute('value', '1');
    expect(radios[0].checked).to.equal(true);
    expect(radios[1].checked).to.equal(false);

    fireEvent.click(radios[1]);

    expect(radios[0].checked).to.equal(false);
    expect(radios[1].checked).to.equal(true);
  });

  describe('imperative focus()', () => {
    it('should focus the first non-disabled radio', async () => {
      const actionsRef = React.createRef();
      const oneRadioOnFocus = spy();

      render(
        <RadioGroup actions={actionsRef} value="">
          <Radio value="zero" disabled />
          <Radio value="one" onFocus={oneRadioOnFocus} />
          <Radio value="two" />
        </RadioGroup>,
      );

      await act(async () => {
        actionsRef.current.focus();
      });

      expect(oneRadioOnFocus.callCount).to.equal(1);
    });

    it('should not focus any radios if all are disabled', () => {
      const actionsRef = React.createRef();
      const zeroRadioOnFocus = spy();
      const oneRadioOnFocus = spy();
      const twoRadioOnFocus = spy();

      render(
        <RadioGroup actions={actionsRef} value="">
          <Radio value="zero" disabled onFocus={zeroRadioOnFocus} />
          <Radio value="one" disabled onFocus={oneRadioOnFocus} />
          <Radio value="two" disabled onFocus={twoRadioOnFocus} />
        </RadioGroup>,
      );

      act(() => {
        actionsRef.current.focus();
      });

      expect(zeroRadioOnFocus.callCount).to.equal(0);
      expect(oneRadioOnFocus.callCount).to.equal(0);
      expect(twoRadioOnFocus.callCount).to.equal(0);
    });

    it('should focus the selected radio', async () => {
      const actionsRef = React.createRef();
      const twoRadioOnFocus = spy();

      render(
        <RadioGroup actions={actionsRef} value="two">
          <Radio value="zero" disabled />
          <Radio value="one" />
          <Radio value="two" onFocus={twoRadioOnFocus} />
          <Radio value="three" />
        </RadioGroup>,
      );

      await act(async () => {
        actionsRef.current.focus();
      });

      expect(twoRadioOnFocus.callCount).to.equal(1);
    });

    it('should focus the non-disabled radio rather than the disabled selected radio', async () => {
      const actionsRef = React.createRef();
      const threeRadioOnFocus = spy();

      render(
        <RadioGroup actions={actionsRef} value="two">
          <Radio value="zero" disabled />
          <Radio value="one" disabled />
          <Radio value="two" disabled />
          <Radio value="three" onFocus={threeRadioOnFocus} />
        </RadioGroup>,
      );

      await act(async () => {
        actionsRef.current.focus();
      });

      const radios = screen.getAllByRole('radio');

      expect(radios[0]).not.toHaveFocus();
      expect(radios[1]).not.toHaveFocus();
      expect(radios[2]).not.toHaveFocus();
      expect(radios[3]).toHaveFocus();
      expect(threeRadioOnFocus.callCount).to.equal(1);
    });

    it('should be able to focus with no radios', () => {
      const actionsRef = React.createRef();
      render(<RadioGroup actions={actionsRef} value="" />);

      act(() => {
        actionsRef.current.focus();
      });
    });
  });

  it('should accept invalid child', () => {
    render(
      <RadioGroup value="">
        <Radio />
        {null}
      </RadioGroup>,
    );
  });

  describe('prop: onChange', () => {
    it('should fire onChange', () => {
      const handleChange = spy();

      render(
        <RadioGroup value="" onChange={handleChange}>
          <Radio value="woofRadioGroup" />
          <Radio />
        </RadioGroup>,
      );

      const radios = screen.getAllByRole('radio');

      fireEvent.click(radios[0]);

      expect(handleChange.callCount).to.equal(1);
    });

    it('should chain the onChange property', () => {
      const handleChange1 = spy();
      const handleChange2 = spy();

      render(
        <RadioGroup value="" onChange={handleChange1}>
          <Radio value="woofRadioGroup" onChange={handleChange2} />
          <Radio />
        </RadioGroup>,
      );

      const radios = screen.getAllByRole('radio');

      fireEvent.click(radios[0]);

      expect(handleChange1.callCount).to.equal(1);
      expect(handleChange2.callCount).to.equal(1);
    });

    describe('with non-string values', () => {
      it('passes the value of the selected Radio as a string', () => {
        function Test(props) {
          const { values, ...other } = props;
          return (
            <RadioGroup {...other}>
              {values.map((value) => {
                return <Radio key={value.id} value={value} />;
              })}
            </RadioGroup>
          );
        }
        Test.propTypes = {
          values: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })),
        };

        const values = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
        const handleChange = spy();

        render(<Test onChange={handleChange} value={values[1]} values={values} />);

        const radios = screen.getAllByRole('radio');

        expect(radios[0].checked).to.equal(false);
        expect(radios[1].checked).to.equal(true);

        fireEvent.click(radios[0]);

        // on updates, however, we compare against event.target.value
        // object information is lost on stringification.
        expect(radios[0].checked).to.equal(false);
        expect(radios[1].checked).to.equal(true);
        expect(handleChange.firstCall.args[1]).to.equal('[object Object]');
      });
    });
  });

  describe('useRadioGroup', () => {
    describe('from props', () => {
      const MinimalRadio = React.forwardRef(function MinimalRadio(_, ref) {
        const radioGroup = useRadioGroup();
        return <input {...radioGroup} ref={ref} type="radio" />;
      });

      const RadioGroupControlled = React.forwardRef(function RadioGroupControlled(props, ref) {
        return (
          <RadioGroup {...props}>
            <MinimalRadio ref={ref} />
          </RadioGroup>
        );
      });

      it('should have the name prop from the instance', () => {
        const radioGroupRef = React.createRef();
        const { setProps } = render(<RadioGroupControlled name="group" ref={radioGroupRef} />);

        expect(radioGroupRef.current).to.have.property('name', 'group');

        setProps({ name: 'anotherGroup' });
        expect(radioGroupRef.current).to.have.property('name', 'anotherGroup');
      });

      it('should have the value prop from the instance', () => {
        const radioGroupRef = React.createRef();
        const { setProps } = render(<RadioGroupControlled ref={radioGroupRef} value="" />);

        expect(radioGroupRef.current).to.have.property('value', '');

        setProps({ value: 'one' });
        expect(radioGroupRef.current).to.have.property('value', 'one');
      });

      it('should have a default name from the instance', () => {
        const radioGroupRef = React.createRef();
        const { setProps } = render(<RadioGroupControlled ref={radioGroupRef} />);

        expect(radioGroupRef.current.name).not.to.equal('');

        setProps({ name: 'anotherGroup' });
        expect(radioGroupRef.current).to.have.property('name', 'anotherGroup');
      });
    });

    describe('callbacks', () => {
      const RadioGroupController = React.forwardRef((_, ref) => {
        const radioGroup = useRadioGroup();
        React.useImperativeHandle(ref, () => radioGroup, [radioGroup]);
        return null;
      });

      const RadioGroupControlled = React.forwardRef(function RadioGroupControlled(props, ref) {
        return (
          <RadioGroup {...props}>
            <RadioGroupController ref={ref} />
          </RadioGroup>
        );
      });

      describe('onChange', () => {
        it('should set the value state', () => {
          const radioGroupRef = React.createRef();
          render(<RadioGroupControlled ref={radioGroupRef} defaultValue="zero" />);

          expect(radioGroupRef.current).to.have.property('value', 'zero');

          act(() => {
            radioGroupRef.current.onChange({ target: { value: 'one' } });
          });

          expect(radioGroupRef.current).to.have.property('value', 'one');

          act(() => {
            radioGroupRef.current.onChange({ target: { value: 'two' } });
          });

          expect(radioGroupRef.current).to.have.property('value', 'two');
        });
      });
    });
  });

  describe('warnings', () => {
    it('should warn when switching from controlled to uncontrolled', () => {
      const { setProps } = render(
        <RadioGroup value="foo">
          <Radio value="foo" />
        </RadioGroup>,
      );

      expect(() => {
        setProps({ value: undefined });
      }).toErrorDev(
        'MUI: A component is changing the controlled value state of RadioGroup to be uncontrolled.',
      );
    });

    it('should warn when switching between uncontrolled to controlled', () => {
      const { setProps } = render(
        <RadioGroup>
          <Radio value="foo" />
        </RadioGroup>,
      );

      expect(() => {
        setProps({ value: 'foo' });
      }).toErrorDev(
        'MUI: A component is changing the uncontrolled value state of RadioGroup to be controlled.',
      );
    });
  });

  it('should apply the classnames', () => {
    render(
      <RadioGroup name="group" row>
        <Radio value={1} />
        <Radio value={2} />
      </RadioGroup>,
    );

    const radiogroup = screen.getByRole('radiogroup');
    expect(radiogroup).to.have.class(classes.root);
    expect(radiogroup).to.have.class(classes.row);
    expect(radiogroup).not.to.have.class(classes.error);
  });

  describe('WCAG 2.2 conformance', () => {
    describe('1.3.1 Info and Relationships', () => {
      it('exposes the radiogroup role on the root', () => {
        const { container } = render(<RadioGroup value="" />);

        expect(container.firstChild).to.have.attribute('role', 'radiogroup');
      });

      it('shares one generated name across all radios', () => {
        render(
          <RadioGroup>
            <Radio value="zero" />
            <Radio value="one" />
          </RadioGroup>,
        );

        const [arbitraryRadio, ...radios] = screen.getAllByRole('radio');
        // `name` **property** will always be a string even if the **attribute** is omitted
        expect(arbitraryRadio.name).not.to.equal('');
        // all input[type="radio"] have the same name
        expect(new Set(radios.map((radio) => radio.name))).to.have.length(1);
      });
    });

    it.skipIf(isJsdom())(
      '2.1.1 Keyboard, 2.4.3 Focus Order: arrow keys rove selection as a single tab stop',
      async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">before</button>
            <RadioGroup name="pet" defaultValue="cat">
              <Radio value="cat" disableRipple slotProps={{ input: { 'aria-label': 'Cat' } }} />
              <Radio value="dog" disableRipple slotProps={{ input: { 'aria-label': 'Dog' } }} />
              <Radio value="bird" disableRipple slotProps={{ input: { 'aria-label': 'Bird' } }} />
            </RadioGroup>
            <button type="button">after</button>
          </React.Fragment>,
        );
        const after = screen.getByRole('button', { name: 'after' });
        const [cat, dog, bird] = screen.getAllByRole('radio');

        screen.getByRole('button', { name: 'before' }).focus();

        // Tab enters the group on the checked radio (roving tab order).
        await user.tab();
        expect(cat).toHaveFocus();
        expect(cat).to.have.property('checked', true);

        // Arrow keys move focus to the next radio and check it, unchecking the previous.
        await user.keyboard('[ArrowDown]');
        expect(dog).toHaveFocus();
        expect(dog).to.have.property('checked', true);
        expect(cat).to.have.property('checked', false);

        await user.keyboard('[ArrowDown]');
        expect(bird).toHaveFocus();
        expect(bird).to.have.property('checked', true);

        // The group is a single tab stop: Tab leaves to the next control.
        await user.tab();
        expect(after).toHaveFocus();
      },
    );

    it.skipIf(isJsdom())('2.1.1 Keyboard: arrow navigation skips a disabled radio', async () => {
      const { user } = render(
        <RadioGroup name="pet" defaultValue="cat">
          <Radio value="cat" disableRipple slotProps={{ input: { 'aria-label': 'Cat' } }} />
          <Radio
            value="dog"
            disabled
            disableRipple
            slotProps={{ input: { 'aria-label': 'Dog' } }}
          />
          <Radio value="bird" disableRipple slotProps={{ input: { 'aria-label': 'Bird' } }} />
        </RadioGroup>,
      );
      const [cat, dog, bird] = screen.getAllByRole('radio');

      await user.tab();
      expect(cat).toHaveFocus();

      // The arrow moves selection past the disabled radio to the next enabled one.
      await user.keyboard('[ArrowDown]');
      expect(bird).toHaveFocus();
      expect(bird).to.have.property('checked', true);
      expect(dog).to.have.property('checked', false);
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('exposes the radiogroup role named by the author FormLabel', () => {
        render(
          <FormControl>
            <FormLabel id="pet-label">Pet</FormLabel>
            <RadioGroup aria-labelledby="pet-label">
              <FormControlLabel value="cat" control={<Radio />} label="Cat" />
              <FormControlLabel value="dog" control={<Radio />} label="Dog" />
            </RadioGroup>
          </FormControl>,
        );

        expect(screen.getByRole('radiogroup', { name: 'Pet' })).not.to.equal(null);
      });

      it('exposes the selected value through the checked radio', async () => {
        const { user } = render(
          <RadioGroup aria-label="pet">
            <FormControlLabel value="cat" control={<Radio />} label="Cat" />
            <FormControlLabel value="dog" control={<Radio />} label="Dog" />
          </RadioGroup>,
        );

        await user.click(screen.getByRole('radio', { name: 'Dog' }));

        expect(screen.getByRole('radio', { name: 'Dog' })).to.have.property('checked', true);
        expect(screen.getByRole('radio', { name: 'Cat' })).to.have.property('checked', false);
      });
    });
  });
});
