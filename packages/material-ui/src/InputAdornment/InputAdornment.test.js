import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import { typographyClasses } from '@material-ui/core/Typography';
import InputAdornment, { inputAdornmentClasses as classes } from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

describe('<InputAdornment />', () => {
  const render = createClientRender();

  describeConformanceV5(<InputAdornment position="start">foo</InputAdornment>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiInputAdornment',
    testVariantProps: { color: 'primary' },
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp'],
    testComponentPropWith: 'span',
  }));

  it('should wrap text children in a Typography', () => {
    const { container } = render(<InputAdornment position="start">foo</InputAdornment>);
    const typography = container.querySelector(`.${typographyClasses.root}`);

    expect(typography).not.to.equal(null);
    expect(typography).to.have.text('foo');
  });

  it('should have the root and start class when position is start', () => {
    const { container } = render(<InputAdornment position="start">foo</InputAdornment>);
    const adornment = container.firstChild;

    expect(adornment).to.have.class(classes.root);
    expect(adornment).to.have.class(classes.positionStart);
  });

  it('should have the root and end class when position is end', () => {
    const { container } = render(<InputAdornment position="end">foo</InputAdornment>);
    const adornment = container.firstChild;

    expect(adornment).to.have.class(classes.root);
    expect(adornment).to.have.class(classes.positionEnd);
  });

  describe('prop: variant', () => {
    it("should inherit the TextField's variant", () => {
      const { getByTestId } = render(
        <TextField
          fullWidth
          placeholder="Search"
          label="Search"
          variant="filled"
          InputProps={{
            startAdornment: (
              <InputAdornment data-testid="InputAdornment" position="start">
                foo
              </InputAdornment>
            ),
          }}
        />,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    it("should inherit the FormControl's variant", () => {
      const { getByTestId } = render(
        <FormControl variant="filled">
          <InputAdornment data-testid="InputAdornment" position="start">
            foo
          </InputAdornment>
        </FormControl>,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    it('should override the inherited variant', () => {
      const { getByTestId } = render(
        <TextField
          fullWidth
          placeholder="Search"
          label="Search"
          variant="filled"
          InputProps={{
            startAdornment: (
              <InputAdornment data-testid="InputAdornment" variant="standard" position="start">
                foo
              </InputAdornment>
            ),
          }}
        />,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).not.to.have.class(classes.filled);
    });

    it('should have the filled root and class when variant is filled', () => {
      const { container } = render(
        <InputAdornment variant="filled" position="start">
          foo
        </InputAdornment>,
      );
      const adornment = container.firstChild;

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    it('should warn if the variant supplied is equal to the variant inferred', () => {
      expect(() => {
        render(
          <FormControl variant="filled">
            <Input
              startAdornment={
                <InputAdornment variant="filled" position="start">
                  foo
                </InputAdornment>
              }
            />
          </FormControl>,
        );
      }).toErrorDev(
        'Material-UI: The `InputAdornment` variant infers the variant ' +
          'prop you do not have to provide one.',
      );
    });
  });

  it('should have the disabled pointer events class when disabledPointerEvents true', () => {
    const { container } = render(
      <InputAdornment disablePointerEvents position="start">
        foo
      </InputAdornment>,
    );
    const adornment = container.firstChild;

    expect(adornment).to.have.class(classes.disablePointerEvents);
  });

  it('should not wrap text children in a Typography when disableTypography true', () => {
    const { container } = render(
      <InputAdornment disableTypography position="start">
        foo
      </InputAdornment>,
    );

    expect(container.querySelector(`.${typographyClasses.root}`)).to.equal(null);
  });

  it('should render children', () => {
    const { container } = render(
      <InputAdornment position="end">
        <div>foo</div>
      </InputAdornment>,
    );
    const adornment = container.firstChild;

    expect(adornment.firstChild).to.have.property('nodeName', 'DIV');
  });

  describe('prop: position', () => {
    it('should render span for vertical baseline alignment', () => {
      const { container } = render(
        <InputAdornment position="start">
          <div>foo</div>
        </InputAdornment>,
      );
      const adornment = container.firstChild;

      expect(adornment.firstChild).to.have.tagName('span');
      expect(adornment.firstChild).to.have.class('notranslate');
      expect(adornment.childNodes[1]).to.have.tagName('div');
    });
  });

  it('applies a size small class inside <FormControl size="small" />', () => {
    const { getByTestId } = render(
      <FormControl size="small">
        <InputAdornment position="start" data-testid="root">
          $
        </InputAdornment>
      </FormControl>,
    );

    expect(getByTestId('root')).to.have.class(classes.sizeSmall);
  });

  it('applies a hiddenLabel class inside <FormControl hiddenLabel />', () => {
    const { getByTestId } = render(
      <FormControl hiddenLabel>
        <InputAdornment position="start" data-testid="root">
          $
        </InputAdornment>
      </FormControl>,
    );

    expect(getByTestId('root')).to.have.class(classes.hiddenLabel);
  });
});
