import { describe, it, expect } from 'vitest';
import {
  createRenderer,
  strictModeDoubleLoggingSuppressed,
  screen,
} from '@mui/internal-test-utils';
import { typographyClasses } from '@mui/material/Typography';
import InputAdornment, { inputAdornmentClasses as classes } from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import describeConformance from '../../test/describeConformance';

describe('<InputAdornment />', () => {
  const { render } = createRenderer();

  describeConformance(<InputAdornment position="start">foo</InputAdornment>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiInputAdornment',
    testVariantProps: { color: 'primary' },
    refInstanceof: window.HTMLDivElement,
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
      render(
        <TextField
          fullWidth
          placeholder="Search"
          label="Search"
          variant="filled"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment data-testid="InputAdornment" position="start">
                  foo
                </InputAdornment>
              ),
            },
          }}
        />,
      );

      const adornment = screen.getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    it("should inherit the FormControl's variant", () => {
      render(
        <FormControl variant="filled">
          <InputAdornment data-testid="InputAdornment" position="start">
            foo
          </InputAdornment>
        </FormControl>,
      );

      const adornment = screen.getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    it('should override the inherited variant', () => {
      render(
        <TextField
          fullWidth
          placeholder="Search"
          label="Search"
          variant="filled"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment data-testid="InputAdornment" variant="standard" position="start">
                  foo
                </InputAdornment>
              ),
            },
          }}
        />,
      );

      const adornment = screen.getByTestId('InputAdornment');

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
      }).toErrorDev([
        'MUI: The `InputAdornment` variant infers the variant ' +
          'prop you do not have to provide one.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The `InputAdornment` variant infers the variant ' +
            'prop you do not have to provide one.',
      ]);
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
    render(
      <FormControl size="small">
        <InputAdornment position="start" data-testid="root">
          $
        </InputAdornment>
      </FormControl>,
    );

    expect(screen.getByTestId('root')).to.have.class(classes.sizeSmall);
  });

  it('applies a hiddenLabel class inside <FormControl hiddenLabel />', () => {
    render(
      <FormControl hiddenLabel>
        <InputAdornment position="start" data-testid="root">
          $
        </InputAdornment>
      </FormControl>,
    );

    expect(screen.getByTestId('root')).to.have.class(classes.hiddenLabel);
  });
});
