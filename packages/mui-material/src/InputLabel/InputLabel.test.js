import { describe, it, expect } from 'vitest';
import PropTypes from 'prop-types';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import { ClassNames } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import InputLabel, { inputLabelClasses as classes } from '@mui/material/InputLabel';
import describeConformance from '../../test/describeConformance';

describe('<InputLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<InputLabel>Foo</InputLabel>, () => ({
    classes,
    inheritComponent: FormLabel,
    render,
    refInstanceof: window.HTMLLabelElement,
    muiName: 'MuiInputLabel',
    testVariantProps: { size: 'small' },
  }));

  it('should render a label with text', () => {
    const { container } = render(<InputLabel>Foo</InputLabel>);
    expect(container.querySelector('label')).to.have.text('Foo');
  });

  it('should have the animated class by default', () => {
    const { container } = render(<InputLabel>Foo</InputLabel>);
    expect(container.firstChild).to.have.class(classes.animated);
  });

  it('should not have the animated class when disabled', () => {
    const { container } = render(<InputLabel disableAnimation>Foo</InputLabel>);
    expect(container.firstChild).not.to.have.class(classes.animated);
  });

  it('should forward the asterisk class to AsteriskComponent when required', () => {
    const { container } = render(
      <InputLabel classes={{ asterisk: 'my-asterisk' }} required>
        Foo
      </InputLabel>,
    );
    expect(container.querySelector('.my-asterisk')).to.have.class('MuiFormLabel-asterisk');
    expect(container.querySelector('.my-asterisk')).to.have.class('MuiInputLabel-asterisk');
  });

  describe('with FormControl', () => {
    it('should have the formControl class', () => {
      render(
        <FormControl>
          <InputLabel data-testid="root" />
        </FormControl>,
      );

      expect(screen.getByTestId('root')).to.have.class(classes.formControl);
    });

    it('should have the small class', () => {
      render(
        <FormControl size="small">
          <InputLabel data-testid="root" />
        </FormControl>,
      );

      expect(screen.getByTestId('root')).to.have.class(classes.sizeSmall);
    });

    describe('filled', () => {
      it('applies a shrink class that can be controlled by props', () => {
        function Wrapper({ children }) {
          return (
            <FormControl>
              <Input defaultValue="Dave" />
              {children}
            </FormControl>
          );
        }
        Wrapper.propTypes = { children: PropTypes.node };
        const { setProps } = render(<InputLabel data-testid="root">name</InputLabel>, {
          wrapper: Wrapper,
        });

        expect(screen.getByTestId('root')).to.have.class(classes.shrink);

        setProps({ shrink: false });
        expect(screen.getByTestId('root')).not.to.have.class(classes.shrink);

        setProps({ shrink: true });
        expect(screen.getByTestId('root')).to.have.class(classes.shrink);
      });
    });

    describe('focused', () => {
      it('applies a shrink class that can be controlled by props', () => {
        function Wrapper({ children }) {
          return (
            <FormControl>
              <Input />
              {children}
            </FormControl>
          );
        }
        Wrapper.propTypes = { children: PropTypes.node };

        const { container, setProps } = render(<InputLabel data-testid="root" />, {
          wrapper: Wrapper,
        });
        act(() => {
          container.querySelector('input').focus();
        });

        expect(screen.getByTestId('root')).to.have.class(classes.shrink);

        setProps({ shrink: false });
        expect(screen.getByTestId('root')).not.to.have.class(classes.shrink);

        setProps({ shrink: true });
        expect(screen.getByTestId('root')).to.have.class(classes.shrink);
      });

      it('provides ownerState.focused in styleOverrides', () => {
        const theme = createTheme({
          components: {
            MuiInputLabel: {
              styleOverrides: {
                root: (props) => {
                  return {
                    ...(props.ownerState.focused === true && {
                      mixBlendMode: 'darken',
                    }),
                  };
                },
              },
            },
          },
        });

        render(
          <ThemeProvider theme={theme}>
            <FormControl focused>
              <InputLabel>Test Label</InputLabel>
            </FormControl>
          </ThemeProvider>,
        );

        const label = screen.getByText('Test Label');

        expect(label).to.toHaveComputedStyle({
          mixBlendMode: 'darken',
        });
      });
    });
  });

  describe('Emotion compatibility', () => {
    it('classes.root should overwrite built-in styles.', () => {
      const text = 'The label';

      render(
        <ClassNames>
          {({ css }) => (
            <FormControl>
              <InputLabel classes={{ root: css({ position: 'static' }) }}>{text}</InputLabel>
            </FormControl>
          )}
        </ClassNames>,
      );

      const label = screen.getByText(text);

      expect(getComputedStyle(label).position).to.equal('static');
    });

    it('className should overwrite classes.root and built-in styles.', () => {
      const text = 'The label';

      render(
        <ClassNames>
          {({ css }) => (
            <FormControl>
              <InputLabel
                color="primary"
                className={css({ position: 'static' })}
                classes={{ root: css({ position: 'sticky' }) }}
              >
                {text}
              </InputLabel>
            </FormControl>
          )}
        </ClassNames>,
      );

      const label = screen.getByText(text);

      expect(getComputedStyle(label).position).to.equal('static');
    });
  });
});
