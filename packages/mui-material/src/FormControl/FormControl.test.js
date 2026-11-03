import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer } from '@mui/internal-test-utils';
import FormControl, { formControlClasses as classes } from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import useFormControl, { useFormControlState } from './useFormControl';
import describeConformance from '../../test/describeConformance';

describe('<FormControl />', () => {
  const { render } = createRenderer();

  function TestComponent(props) {
    const context = useFormControl();
    React.useEffect(() => {
      props.contextCallback(context);
    });
    return null;
  }

  function TestFormControlState({ stateCallback, states, ...props }) {
    const [fcs, muiFormControl] = useFormControlState({ props, states });
    React.useEffect(() => {
      stateCallback(fcs, muiFormControl);
    });
    return null;
  }

  describeConformance(<FormControl />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'fieldset',
    muiName: 'MuiFormControl',
    testVariantProps: { margin: 'dense' },
  }));

  describe('initial state', () => {
    it('should have no margin', () => {
      const { container } = render(<FormControl />);
      const root = container.firstChild;

      expect(root).not.to.have.class(classes.marginNormal);
      expect(root).not.to.have.class(classes.sizeSmall);
    });

    it('can have the margin normal class', () => {
      const { container } = render(<FormControl margin="normal" />);
      const root = container.firstChild;

      expect(root).to.have.class(classes.marginNormal);
      expect(root).not.to.have.class(classes.sizeSmall);
    });

    it('can have the margin dense class', () => {
      const { container } = render(<FormControl margin="dense" />);
      const root = container.firstChild;

      expect(root).to.have.class(classes.marginDense);
      expect(root).not.to.have.class(classes.marginNormal);
    });

    it('should not be filled initially', () => {
      const readContext = spy();
      render(
        <FormControl>
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', false);
    });

    it('should not be focused initially', () => {
      const readContext = spy();
      render(
        <FormControl>
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('focused', false);
    });
  });

  describe('prop: required', () => {
    it('should not apply it to the DOM', () => {
      const { container } = render(<FormControl required />);
      expect(container.firstChild).not.to.have.attribute('required');
    });
  });

  describe('prop: disabled', () => {
    it('will be unfocused if it gets disabled', async () => {
      const readContext = spy();
      const { container, setProps } = render(
        <FormControl>
          <Input />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('focused', false);

      await act(async () => {
        container.querySelector('input').focus();
      });
      expect(readContext.lastCall.args[0]).to.have.property('focused', true);

      setProps({ disabled: true });
      expect(readContext.lastCall.args[0]).to.have.property('focused', false);
    });
  });

  describe('prop: focused', () => {
    it('should display input in focused state', () => {
      const readContext = spy();
      const { container } = render(
        <FormControl focused>
          <Input />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );

      expect(readContext.args[0][0]).to.have.property('focused', true);
      container.querySelector('input').blur();
      expect(readContext.args[0][0]).to.have.property('focused', true);
    });

    it('ignores focused when disabled', () => {
      const readContext = spy();
      render(
        <FormControl focused disabled>
          <Input />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.include({ disabled: true, focused: false });
    });
  });

  describe('input', () => {
    it('should be filled when a value is set', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Input value="bar" />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should be filled when a value is set through inputProps', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Input inputProps={{ value: 'bar' }} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should be filled when a defaultValue is set', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Input defaultValue="bar" />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should not be adornedStart with an endAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Input endAdornment={<div />} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', false);
    });

    it('should be adornedStar with a startAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Input startAdornment={<div />} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', true);
    });
  });

  describe('select', () => {
    it('should not be adorned without a startAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Select value="" />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', false);
    });

    it('should be adorned with a startAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Select value="" input={<Input startAdornment={<div />} />} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', true);
    });
  });

  describe('useFormControl', () => {
    const FormController = React.forwardRef((_, ref) => {
      const formControl = useFormControl();
      React.useImperativeHandle(ref, () => formControl, [formControl]);
      return null;
    });

    const FormControlled = React.forwardRef(function FormControlled(props, ref) {
      return (
        <FormControl {...props}>
          <FormController ref={ref} />
        </FormControl>
      );
    });

    describe('from props', () => {
      it('should have the required prop from the instance', () => {
        const formControlRef = React.createRef();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('required', false);

        setProps({ required: true });
        expect(formControlRef.current).to.have.property('required', true);
      });

      it('should have the error prop from the instance', () => {
        const formControlRef = React.createRef();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('error', false);

        setProps({ error: true });
        expect(formControlRef.current).to.have.property('error', true);
      });

      it('should have the margin prop from the instance', () => {
        const formControlRef = React.createRef();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('size', 'medium');

        setProps({ size: 'small' });
        expect(formControlRef.current).to.have.property('size', 'small');
      });

      it('should have the fullWidth prop from the instance', () => {
        const formControlRef = React.createRef();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('fullWidth', false);

        setProps({ fullWidth: true });
        expect(formControlRef.current).to.have.property('fullWidth', true);
      });
    });

    describe('callbacks', () => {
      describe('onFilled', () => {
        it('should set the filled state', async () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);

          expect(formControlRef.current).to.have.property('filled', false);

          await act(async () => {
            formControlRef.current.onFilled();
          });

          expect(formControlRef.current).to.have.property('filled', true);

          await act(async () => {
            formControlRef.current.onFilled();
          });

          expect(formControlRef.current).to.have.property('filled', true);
        });
      });

      describe('onEmpty', () => {
        it('should clean the filled state', async () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);

          await act(async () => {
            formControlRef.current.onFilled();
          });

          expect(formControlRef.current).to.have.property('filled', true);

          await act(async () => {
            formControlRef.current.onEmpty();
          });

          expect(formControlRef.current).to.have.property('filled', false);

          await act(async () => {
            formControlRef.current.onEmpty();
          });

          expect(formControlRef.current).to.have.property('filled', false);
        });
      });

      describe('handleFocus', () => {
        it('should set the focused state', async () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);
          expect(formControlRef.current).to.have.property('focused', false);

          await act(async () => {
            formControlRef.current.onFocus();
          });

          expect(formControlRef.current).to.have.property('focused', true);

          await act(async () => {
            formControlRef.current.onFocus();
          });

          expect(formControlRef.current).to.have.property('focused', true);
        });
      });

      describe('handleBlur', () => {
        it('should clear the focused state', async () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);
          expect(formControlRef.current).to.have.property('focused', false);

          await act(async () => {
            formControlRef.current.onFocus();
          });

          expect(formControlRef.current).to.have.property('focused', true);

          await act(async () => {
            formControlRef.current.onBlur();
          });

          expect(formControlRef.current).to.have.property('focused', false);

          await act(async () => {
            formControlRef.current.onBlur();
          });

          expect(formControlRef.current).to.have.property('focused', false);
        });
      });
    });
  });

  describe('useFormControlState', () => {
    it('returns the merged state and context from FormControl', () => {
      const readState = spy();

      render(
        <FormControl disabled error required size="small">
          <TestFormControlState
            stateCallback={readState}
            states={['disabled', 'error', 'required', 'size']}
          />
        </FormControl>,
      );

      expect(readState.args[0][0]).to.include({
        disabled: true,
        error: true,
        required: true,
        size: 'small',
      });
      expect(readState.args[0][1]).to.include({
        disabled: true,
        error: true,
        required: true,
        size: 'small',
      });
    });

    it('prefers explicit props over context values', () => {
      const readState = spy();

      render(
        <FormControl color="secondary" disabled error required size="small">
          <TestFormControlState
            color={null}
            disabled={false}
            error={false}
            required={false}
            size=""
            stateCallback={readState}
            states={['color', 'disabled', 'error', 'required', 'size']}
          />
        </FormControl>,
      );

      expect(readState.args[0][0]).to.include({
        color: null,
        disabled: false,
        error: false,
        required: false,
        size: '',
      });
      expect(readState.args[0][1]).to.include({
        color: 'secondary',
        disabled: true,
        error: true,
        required: true,
        size: 'small',
      });
    });

    it('returns undefined context outside FormControl and keeps prop values', () => {
      const readState = spy();

      render(
        <TestFormControlState
          disabled={false}
          required
          stateCallback={readState}
          states={['disabled', 'required']}
        />,
      );

      expect(readState.args[0][0]).to.include({
        disabled: false,
        required: true,
      });
      expect(readState.args[0][1]).to.equal(undefined);
    });
  });
});
