import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformanceV5, act, createClientRender } from 'test/utils';
import FormControl, { formControlClasses as classes } from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import useFormControl from './useFormControl';

describe('<FormControl />', () => {
  const render = createClientRender();

  function TestComponent(props) {
    const context = useFormControl();
    React.useEffect(() => {
      props.contextCallback(context);
    });
    return null;
  }

  describeConformanceV5(<FormControl />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'fieldset',
    muiName: 'MuiFormControl',
    testVariantProps: { margin: 'dense' },
    skip: ['componentsProp'],
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
    it('will be unfocused if it gets disabled', () => {
      const readContext = spy();
      const { container, setProps } = render(
        <FormControl>
          <Input />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('focused', false);

      act(() => {
        container.querySelector('input').focus();
      });
      expect(readContext.args[1][0]).to.have.property('focused', true);

      setProps({ disabled: true });
      expect(readContext.args[2][0]).to.have.property('focused', false);
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
      expect(readContext.args[0][0].adornedStart, true);
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
        it('should set the filled state', () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);

          expect(formControlRef.current).to.have.property('filled', false);

          act(() => {
            formControlRef.current.onFilled();
          });

          expect(formControlRef.current).to.have.property('filled', true);

          act(() => {
            formControlRef.current.onFilled();
          });

          expect(formControlRef.current).to.have.property('filled', true);
        });
      });

      describe('onEmpty', () => {
        it('should clean the filled state', () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);

          act(() => {
            formControlRef.current.onFilled();
          });

          expect(formControlRef.current).to.have.property('filled', true);

          act(() => {
            formControlRef.current.onEmpty();
          });

          expect(formControlRef.current).to.have.property('filled', false);

          act(() => {
            formControlRef.current.onEmpty();
          });

          expect(formControlRef.current).to.have.property('filled', false);
        });
      });

      describe('handleFocus', () => {
        it('should set the focused state', () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);
          expect(formControlRef.current).to.have.property('focused', false);

          act(() => {
            formControlRef.current.onFocus();
          });

          expect(formControlRef.current).to.have.property('focused', true);

          act(() => {
            formControlRef.current.onFocus();
          });

          expect(formControlRef.current).to.have.property('focused', true);
        });
      });

      describe('handleBlur', () => {
        it('should clear the focused state', () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);
          expect(formControlRef.current).to.have.property('focused', false);

          act(() => {
            formControlRef.current.onFocus();
          });

          expect(formControlRef.current).to.have.property('focused', true);

          act(() => {
            formControlRef.current.onBlur();
          });

          expect(formControlRef.current).to.have.property('focused', false);

          act(() => {
            formControlRef.current.onBlur();
          });

          expect(formControlRef.current).to.have.property('focused', false);
        });
      });
    });
  });
});
