import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { describeConformanceV5, act, createClientRender } from 'test/utils';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel, { inputLabelClasses as classes } from '@material-ui/core/InputLabel';

describe('<InputLabel />', () => {
  const render = createClientRender();

  describeConformanceV5(<InputLabel>Foo</InputLabel>, () => ({
    classes,
    inheritComponent: FormLabel,
    render,
    refInstanceof: window.HTMLLabelElement,
    muiName: 'MuiInputLabel',
    testVariantProps: { size: 'small' },
    skip: ['componentsProp'],
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

  describe('with FormControl', () => {
    it('should have the formControl class', () => {
      const { getByTestId } = render(
        <FormControl>
          <InputLabel data-testid="root" />
        </FormControl>,
      );
      expect(getByTestId('root')).to.have.class(classes.formControl);
    });

    it('should have the small class', () => {
      const { getByTestId } = render(
        <FormControl size="small">
          <InputLabel data-testid="root" />
        </FormControl>,
      );

      expect(getByTestId('root')).to.have.class(classes.sizeSmall);
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
        const { getByTestId, setProps } = render(<InputLabel data-testid="root">name</InputLabel>, {
          wrapper: Wrapper,
        });

        expect(getByTestId('root')).to.have.class(classes.shrink);

        setProps({ shrink: false });
        expect(getByTestId('root')).not.to.have.class(classes.shrink);

        setProps({ shrink: true });
        expect(getByTestId('root')).to.have.class(classes.shrink);
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

        const { container, getByTestId, setProps } = render(<InputLabel data-testid="root" />, {
          wrapper: Wrapper,
        });
        act(() => {
          container.querySelector('input').focus();
        });

        expect(getByTestId('root')).to.have.class(classes.shrink);

        setProps({ shrink: false });
        expect(getByTestId('root')).not.to.have.class(classes.shrink);

        setProps({ shrink: true });
        expect(getByTestId('root')).to.have.class(classes.shrink);
      });
    });
  });
});
