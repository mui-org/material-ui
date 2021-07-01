import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import PropTypes from 'prop-types';
import { describeConformance, act, createClientRender, fireEvent } from 'test/utils';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup, { useRadioGroup } from '@material-ui/core/RadioGroup';

describe('<RadioGroup />', () => {
  const render = createClientRender();

  describeConformance(<RadioGroup value="" />, () => ({
    classes: {},
    inheritComponent: FormGroup,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('the root component has the radiogroup role', () => {
    const { container } = render(<RadioGroup value="" />);

    expect(container.firstChild).to.have.attribute('role', 'radiogroup');
  });

  it('should fire the onBlur callback', () => {
    const handleBlur = spy();
    const { container } = render(<RadioGroup value="" onBlur={handleBlur} />);

    fireEvent.blur(container.firstChild);

    expect(handleBlur.callCount).to.equal(1);
  });

  it('should fire the onKeyDown callback', () => {
    const handleKeyDown = spy();
    const { getByRole } = render(<RadioGroup tabIndex={-1} value="" onKeyDown={handleKeyDown} />);
    const radiogroup = getByRole('radiogroup');

    act(() => {
      radiogroup.focus();
    });

    fireEvent.keyDown(radiogroup);

    expect(handleKeyDown.callCount).to.equal(1);
  });

  it('should support uncontrolled mode', () => {
    const { getByRole } = render(
      <RadioGroup name="group">
        <Radio value="one" />
      </RadioGroup>,
    );

    const radio = getByRole('radio');

    fireEvent.click(radio);

    expect(radio.checked).to.equal(true);
  });

  it('should support default value in uncontrolled mode', () => {
    const { getAllByRole } = render(
      <RadioGroup name="group" defaultValue="zero">
        <Radio value="zero" />
        <Radio value="one" />
      </RadioGroup>,
    );

    const radios = getAllByRole('radio');

    expect(radios[0].checked).to.equal(true);

    fireEvent.click(radios[1]);

    expect(radios[1].checked).to.equal(true);
  });

  it('should have a default name', () => {
    const { getAllByRole } = render(
      <RadioGroup>
        <Radio value="zero" />
        <Radio value="one" />
      </RadioGroup>,
    );

    const radios = getAllByRole('radio');

    expect(radios[0].name).to.match(/^mui-[0-9]+/);
    expect(radios[1].name).to.match(/^mui-[0-9]+/);
  });

  describe('imperative focus()', () => {
    it('should focus the first non-disabled radio', () => {
      const actionsRef = React.createRef();
      const oneRadioOnFocus = spy();

      render(
        <RadioGroup actions={actionsRef} value="">
          <Radio value="zero" disabled />
          <Radio value="one" onFocus={oneRadioOnFocus} />
          <Radio value="two" />
        </RadioGroup>,
      );

      act(() => {
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

    it('should focus the selected radio', () => {
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

      act(() => {
        actionsRef.current.focus();
      });

      expect(twoRadioOnFocus.callCount).to.equal(1);
    });

    it('should focus the non-disabled radio rather than the disabled selected radio', () => {
      const actionsRef = React.createRef();
      const threeRadioOnFocus = spy();

      const { getAllByRole } = render(
        <RadioGroup actions={actionsRef} value="two">
          <Radio value="zero" disabled />
          <Radio value="one" disabled />
          <Radio value="two" disabled />
          <Radio value="three" onFocus={threeRadioOnFocus} />
        </RadioGroup>,
      );

      act(() => {
        actionsRef.current.focus();
      });

      const radios = getAllByRole('radio');

      expect(radios[0]).not.toHaveFocus();
      expect(radios[1]).not.toHaveFocus();
      expect(radios[2]).not.toHaveFocus();
      expect(radios[3]).toHaveFocus();
      expect(threeRadioOnFocus.callCount).to.equal(1);
    });

    it('should be able to focus with no radios', () => {
      const actionsRef = React.createRef();
      render(<RadioGroup actions={actionsRef} value="" />);

      actionsRef.current.focus();
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
      const { getAllByRole } = render(
        <RadioGroup value="" onChange={handleChange}>
          <Radio value="woofRadioGroup" />
          <Radio />
        </RadioGroup>,
      );

      const radios = getAllByRole('radio');

      fireEvent.click(radios[0]);

      expect(handleChange.callCount).to.equal(1);
    });

    it('should chain the onChange property', () => {
      const handleChange1 = spy();
      const handleChange2 = spy();
      const { getAllByRole } = render(
        <RadioGroup value="" onChange={handleChange1}>
          <Radio value="woofRadioGroup" onChange={handleChange2} />
          <Radio />
        </RadioGroup>,
      );

      const radios = getAllByRole('radio');

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

        const { getAllByRole } = render(
          <Test onChange={handleChange} value={values[1]} values={values} />,
        );

        const radios = getAllByRole('radio');

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

    describe('from props', () => {
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

        expect(radioGroupRef.current.name).to.match(/^mui-[0-9]+/);

        setProps({ name: 'anotherGroup' });
        expect(radioGroupRef.current).to.have.property('name', 'anotherGroup');
      });
    });

    describe('callbacks', () => {
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
        'Material-UI: A component is changing the controlled value state of RadioGroup to be uncontrolled.',
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
        'Material-UI: A component is changing the uncontrolled value state of RadioGroup to be controlled.',
      );
    });
  });
});
