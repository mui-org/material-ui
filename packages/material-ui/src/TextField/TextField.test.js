import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import FormControl from '@material-ui/core/FormControl';
import { inputBaseClasses } from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import { outlinedInputClasses } from '@material-ui/core/OutlinedInput';
import TextField, { textFieldClasses as classes } from '@material-ui/core/TextField';

describe('<TextField />', () => {
  const render = createClientRender();

  describeConformanceV5(<TextField variant="standard" />, () => ({
    classes,
    inheritComponent: FormControl,
    render,
    muiName: 'MuiTextField',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { variant: 'outlined' },
    skip: ['componentProp', 'componentsProp'],
  }));

  describe('structure', () => {
    it('should have an input as the only child', () => {
      const { getAllByRole } = render(<TextField variant="standard" />);

      expect(getAllByRole('textbox')).to.have.lengthOf(1);
    });

    it('should forward the multiline prop to Input', () => {
      const { getByRole } = render(<TextField variant="standard" multiline />);

      expect(getByRole('textbox', { hidden: false })).to.have.class(
        inputBaseClasses.inputMultiline,
      );
    });

    it('should forward the fullWidth prop to Input', () => {
      const { getByTestId } = render(
        <TextField
          variant="standard"
          fullWidth
          InputProps={{ 'data-testid': 'mui-input-base-root' }}
        />,
      );

      expect(getByTestId('mui-input-base-root')).to.have.class(inputBaseClasses.fullWidth);
    });
  });

  describe('with a label', () => {
    it('label the input', () => {
      const { getByRole } = render(<TextField id="labelled" label="Foo bar" variant="standard" />);

      expect(getByRole('textbox', { name: 'Foo bar' })).not.to.equal(null);
    });

    it('should apply the className to the label', () => {
      const { container } = render(
        <TextField
          id="labelled"
          label="Foo bar"
          InputLabelProps={{ className: 'foo' }}
          variant="standard"
        />,
      );

      expect(container.querySelector('label')).to.have.class('foo');
    });

    ['', undefined].forEach((label) => {
      it(`should not render empty (${label}) label element`, () => {
        const { container } = render(<TextField id="labelled" label={label} variant="standard" />);

        expect(container.querySelector('label')).to.equal(null);
      });
    });
  });

  describe('with a helper text', () => {
    it('should apply the className to the FormHelperText', () => {
      const { getDescriptionOf, getByRole } = render(
        <TextField
          id="aria-test"
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          variant="standard"
        />,
      );

      expect(getDescriptionOf(getByRole('textbox'))).to.have.class('foo');
    });

    it('should add accessibility labels to the input', () => {
      const { getDescriptionOf, getByRole } = render(
        <TextField
          id="aria-test"
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          variant="standard"
        />,
      );

      expect(getDescriptionOf(getByRole('textbox'))).to.have.text('Foo bar');
    });
  });

  describe('with an outline', () => {
    it('should set outline props', () => {
      const { container, getAllByTestId } = render(
        <TextField
          InputProps={{ classes: { notchedOutline: 'notch' } }}
          label={<div data-testid="label">label</div>}
          required
        />,
      );

      const [, fakeLabel] = getAllByTestId('label');
      const notch = container.querySelector('.notch legend');
      expect(notch).to.contain(fakeLabel);
      expect(notch).to.have.text('label\u00a0*');
    });

    it('should set shrink prop on outline from label', () => {
      const { container } = render(<TextField InputLabelProps={{ shrink: true }} classes={{}} />);

      expect(container.querySelector('fieldset')).to.have.class(
        outlinedInputClasses.notchedOutline,
      );
    });
  });

  describe('prop: InputProps', () => {
    it('should apply additional props to the Input component', () => {
      const { getByTestId } = render(
        <TextField InputProps={{ 'data-testid': 'InputComponent' }} variant="standard" />,
      );

      expect(getByTestId('InputComponent')).not.to.equal(null);
    });
  });

  describe('prop: select', () => {
    it('can render a <select /> when `native`', () => {
      const currencies = [
        { value: 'USD', label: '$' },
        { value: 'BTC', label: '฿' },
      ];

      const { container } = render(
        <TextField select SelectProps={{ native: true }} variant="standard">
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>,
      );

      const select = container.querySelector('select');
      expect(select).not.to.equal(null);
      expect(select.options).to.have.lengthOf(2);
    });

    it('associates the label with the <select /> when `native={true}` and `id`', () => {
      const { getByRole } = render(
        <TextField
          label="Currency:"
          id="labelled-select"
          select
          SelectProps={{ native: true }}
          value="$"
          variant="standard"
        >
          <option value="dollar">$</option>
        </TextField>,
      );

      expect(getByRole('combobox', { name: 'Currency:' })).to.have.property('value', 'dollar');
    });

    it('renders a combobox with the appropriate accessible name', () => {
      const { getByRole } = render(
        <TextField select id="my-select" label="Release: " value="stable" variant="standard">
          <MenuItem value="alpha">Alpha</MenuItem>
          <MenuItem value="beta">Beta</MenuItem>
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      expect(getByRole('button')).toHaveAccessibleName('Release: Stable');
    });

    it('creates an input[hidden] that has no accessible properties', () => {
      const { container } = render(
        <TextField select id="my-select" label="Release: " value="stable" variant="standard">
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      const input = container.querySelector('input[aria-hidden]');
      expect(input).not.to.have.attribute('id');
      expect(input).not.to.have.attribute('aria-describedby');
    });

    it('renders a combobox with the appropriate accessible description', () => {
      const { getByRole } = render(
        <TextField select id="aria-test" helperText="Foo bar" value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </TextField>,
      );

      expect(getByRole('button')).toHaveAccessibleDescription('Foo bar');
    });
  });
});
