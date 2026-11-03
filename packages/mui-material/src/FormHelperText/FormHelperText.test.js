import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import FormHelperText, { formHelperTextClasses as classes } from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import describeConformance from '../../test/describeConformance';

describe('<FormHelperText />', () => {
  const { render } = createRenderer();

  describeConformance(<FormHelperText />, () => ({
    classes,
    inheritComponent: 'p',
    render,
    refInstanceof: window.HTMLParagraphElement,
    testComponentPropWith: 'div',
    muiName: 'MuiFormHelperText',
    testVariantProps: { size: 'small' },
  }));

  describe('prop: error', () => {
    it('should have an error class', () => {
      const { container } = render(<FormHelperText error />);
      expect(container.firstChild).to.have.class(classes.error);
    });
  });

  describe('with FormControl', () => {
    ['error', 'disabled'].forEach((visualState) => {
      describe(`${visualState}`, () => {
        function FormHelperTextInFormControl(props) {
          return (
            <FormControl {...{ [visualState]: true }}>
              <FormHelperText {...props}>Foo</FormHelperText>
            </FormControl>
          );
        }

        it(`should have the ${visualState} class`, () => {
          render(<FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>);

          expect(screen.getByText(/Foo/)).to.have.class(classes[visualState]);
        });

        it('should be overridden by props', () => {
          const { setProps } = render(
            <FormHelperTextInFormControl {...{ [visualState]: false }}>
              Foo
            </FormHelperTextInFormControl>,
          );

          expect(screen.getByText(/Foo/)).not.to.have.class(classes[visualState]);

          setProps({ [visualState]: true });
          expect(screen.getByText(/Foo/)).to.have.class(classes[visualState]);
        });
      });
    });

    describe('size', () => {
      describe('small margin FormControl', () => {
        it('should have the small class', () => {
          render(
            <FormControl size="small">
              <FormHelperText>Foo</FormHelperText>
            </FormControl>,
          );

          expect(screen.getByText(/Foo/)).to.have.class(classes.sizeSmall);
        });
      });

      it('should be overridden by props', () => {
        function FormHelperTextInFormControl(props) {
          return (
            <FormControl size="medium">
              <FormHelperText {...props}>Foo</FormHelperText>
            </FormControl>
          );
        }

        const { setProps } = render(<FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>);

        expect(screen.getByText(/Foo/)).not.to.have.class(classes.sizeSmall);
        setProps({ size: 'small' });
        expect(screen.getByText(/Foo/)).to.have.class(classes.sizeSmall);
      });
    });
  });
});
