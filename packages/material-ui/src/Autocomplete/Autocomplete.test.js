import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { describeConformanceV5, act, createClientRender, fireEvent, screen } from 'test/utils';
import { spy } from 'sinon';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete, {
  autocompleteClasses as classes,
  createFilterOptions,
} from '@material-ui/core/Autocomplete';

function checkHighlightIs(listbox, expected) {
  const focused = listbox.querySelector(`.${classes.focused}`);

  if (expected) {
    if (focused) {
      expect(focused).to.have.text(expected);
    } else {
      // No options selected
      expect(null).to.equal(expected);
    }
  } else {
    expect(focused).to.equal(null);
  }
}

describe('<Autocomplete />', () => {
  const render = createClientRender();

  describeConformanceV5(
    <Autocomplete options={[]} renderInput={(params) => <TextField {...params} />} />,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiAutocomplete',
      testVariantProps: { variant: 'foo' },
      testDeepOverrides: { slotName: 'endAdornment', slotClassName: classes.endAdornment },
      testStateOverrides: { prop: 'fullWidth', value: true, styleKey: 'fullWidth' },
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'div',
      skip: ['componentProp', 'componentsProp'],
    }),
  );

  it('should be customizable in the theme', () => {
    const theme = createTheme({
      components: {
        MuiAutocomplete: {
          styleOverrides: {
            paper: {
              mixBlendMode: 'darken',
            },
          },
        },
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <Autocomplete options={[]} open renderInput={(params) => <TextField {...params} />} />
      </ThemeProvider>,
    );
    expect(document.querySelector(`.${classes.paper}`)).to.toHaveComputedStyle({
      mixBlendMode: 'darken',
    });
  });

  describe('combobox', () => {
    it('should clear the input when blur', () => {
      const { getByRole } = render(
        <Autocomplete options={[]} renderInput={(params) => <TextField {...params} />} />,
      );
      const input = getByRole('textbox');

      act(() => {
        input.focus();
        fireEvent.change(document.activeElement, { target: { value: 'a' } });
      });

      expect(input.value).to.equal('a');

      act(() => {
        document.activeElement.blur();
      });
      expect(input.value).to.equal('');
    });

    it('should apply the icon classes', () => {
      const { container } = render(
        <Autocomplete
          value="one"
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasClearIcon);
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
    });
  });

  describe('prop: loading', () => {
    it('should show a loading message when open', () => {
      render(
        <Autocomplete
          options={[]}
          freeSolo
          loading
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown' });
      expect(document.querySelector(`.${classes.paper}`).textContent).to.equal('Loading…');
    });
  });

  describe('prop: autoHighlight', () => {
    it('should set the focus on the first item', () => {
      const options = ['one', 'two'];
      const { getByRole } = render(
        <Autocomplete
          freeSolo
          autoHighlight
          open
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(getByRole('listbox'), 'one');
      fireEvent.change(document.activeElement, { target: { value: 'oo' } });
      fireEvent.change(document.activeElement, { target: { value: 'o' } });
      checkHighlightIs(getByRole('listbox'), 'one');
    });

    it('should keep the highlight on the first item', () => {
      const options = ['one', 'two'];
      const { getByRole } = render(
        <Autocomplete
          value="one"
          autoHighlight
          open
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(getByRole('listbox'), 'one');
      fireEvent.change(document.activeElement, { target: { value: 'two' } });
      checkHighlightIs(getByRole('listbox'), 'two');
    });

    it('should set the focus on the first item when possible', () => {
      const options = ['one', 'two'];
      const { getByRole, setProps } = render(
        <Autocomplete
          open
          options={[]}
          autoHighlight
          loading
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');
      expect(textbox).not.to.have.attribute('aria-activedescendant');

      setProps({ options, loading: false });
      expect(textbox).to.have.attribute(
        'aria-activedescendant',
        screen.getAllByRole('option')[0].getAttribute('id'),
      );
    });

    it('should set the highlight on selected item when dropdown is expanded', () => {
      const { getByRole, setProps } = render(
        <Autocomplete
          value="one"
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(getByRole('listbox'), 'one');
      setProps({ value: 'two' });
      checkHighlightIs(getByRole('listbox'), 'two');
    });

    it('should keep the current highlight if possible', () => {
      const { getByRole } = render(
        <Autocomplete
          multiple
          defaultValue={['one']}
          open
          options={['one', 'two', 'three']}
          disableCloseOnSelect
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');

      checkHighlightIs(getByRole('listbox'), 'one');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(getByRole('listbox'), 'two');
      fireEvent.keyDown(textbox, { key: 'Enter' });
      checkHighlightIs(getByRole('listbox'), 'two');
    });

    it('should work with filterSelectedOptions too', () => {
      const options = ['Foo', 'Bar', 'Baz'];
      const { getByRole } = render(
        <Autocomplete
          multiple
          filterSelectedOptions
          autoHighlight
          value={options.slice(0, 1)}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(getByRole('listbox'), 'Bar');
      fireEvent.change(textbox, { target: { value: 'a' } });
      checkHighlightIs(getByRole('listbox'), 'Bar');
      fireEvent.change(textbox, { target: { value: 'aa' } });
      fireEvent.change(textbox, { target: { value: 'a' } });
      checkHighlightIs(getByRole('listbox'), 'Bar');
    });
  });

  describe('highlight synchronisation', () => {
    it('should not update the highlight when multiple open and value change', () => {
      const { setProps, getByRole } = render(
        <Autocomplete
          value={['two']}
          multiple
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(getByRole('listbox'), 'two');
      setProps({
        value: [],
      });
      checkHighlightIs(getByRole('listbox'), 'two');
    });
  });

  describe('prop: limitTags', () => {
    it('show all items on focus', () => {
      const { container, getAllByRole, getByRole } = render(
        <Autocomplete
          multiple
          limitTags={2}
          options={['one', 'two', 'three']}
          defaultValue={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />,
      );

      expect(container.textContent).to.equal('onetwo+1');
      // include hidden clear button because JSDOM thinks it's visible
      expect(getAllByRole('button', { hidden: true })).to.have.lengthOf(4);

      act(() => {
        getByRole('textbox').focus();
      });
      expect(container.textContent).to.equal('onetwothree');
      // Depending on the subset of components used in this test run the computed `visibility` changes in JSDOM.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        expect(getAllByRole('button', { hidden: false })).to.have.lengthOf(5);
      }
    });

    it('show 0 item on close when set 0 to limitTags', () => {
      const { container, getAllByRole, getByRole } = render(
        <Autocomplete
          multiple
          limitTags={0}
          options={['one', 'two', 'three']}
          defaultValue={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />,
      );

      expect(container.textContent).to.equal('+3');
      // include hidden clear button because JSDOM thinks it's visible
      expect(getAllByRole('button', { hidden: true })).to.have.lengthOf(2);

      act(() => {
        getByRole('textbox').focus();
      });
      expect(container.textContent).to.equal('onetwothree');
      // Depending on the subset of components used in this test run the computed `visibility` changes in JSDOM.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        expect(getAllByRole('button', { hidden: false })).to.have.lengthOf(5);
      }
    });
  });

  describe('prop: filterSelectedOptions', () => {
    it('when the last item is selected, highlights the new last item', () => {
      const { getByRole } = render(
        <Autocomplete
          filterSelectedOptions
          openOnFocus
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowUp' });
      checkHighlightIs(getByRole('listbox'), 'three');
      fireEvent.keyDown(textbox, { key: 'Enter' }); // selects the last option (three)
      const input = getByRole('textbox');
      act(() => {
        input.blur();
        input.focus(); // opens the listbox again
      });
      checkHighlightIs(getByRole('listbox'), null);
    });
  });

  describe('prop: autoSelect', () => {
    it('should not clear on blur when value does not match any option', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          freeSolo
          autoSelect
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.change(textbox, { target: { value: 'o' } });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.change(textbox, { target: { value: 'oo' } });
      act(() => {
        textbox.blur();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal('oo');
    });

    it('should add new value when autoSelect & multiple on blur', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          autoSelect
          multiple
          value={[options[0]]}
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      act(() => {
        fireEvent.change(textbox, { target: { value: 't' } });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        textbox.blur();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(options);
    });

    it('should add new value when autoSelect & multiple & freeSolo on blur', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          autoSelect
          freeSolo
          multiple
          onChange={handleChange}
          options={[]}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      act(() => {
        document.activeElement.blur();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['a']);
    });
  });

  describe('prop: multiple', () => {
    it('should not crash', () => {
      const { getByRole } = render(
        <Autocomplete
          openOnFocus
          options={[]}
          renderInput={(params) => <TextField {...params} />}
          multiple
        />,
      );
      const input = getByRole('textbox');

      act(() => {
        input.focus();
        document.activeElement.blur();
        input.focus();
      });
    });

    it('should remove the last option', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { getAllByTestId } = render(
        <Autocomplete
          options={[]}
          defaultValue={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          multiple
        />,
      );
      fireEvent.click(getAllByTestId('CancelIcon')[1]);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[0]]);
    });

    it('navigates between different tags', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('textbox');
      const [firstSelectedValue, secondSelectedValue] = screen.getAllByRole('button');

      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      expect(secondSelectedValue).toHaveFocus();

      fireEvent.keyDown(secondSelectedValue, { key: 'ArrowLeft' });
      expect(firstSelectedValue).toHaveFocus();

      fireEvent.keyDown(firstSelectedValue, { key: 'Backspace' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[1]]);
      expect(textbox).toHaveFocus();
    });

    it('should not crash if a tag is missing', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          defaultValue={options}
          options={options}
          value={options}
          renderTags={(value, getTagProps) =>
            value
              .filter((x, index) => index === 1)
              .map((option, index) => <Chip label={option.title} {...getTagProps({ index })} />)
          }
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('textbox');
      const [firstSelectedValue] = screen.getAllByRole('button');

      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      // skip value "two"
      expect(firstSelectedValue).toHaveFocus();

      fireEvent.keyDown(firstSelectedValue, { key: 'ArrowRight' });
      expect(textbox).toHaveFocus();
    });

    it('has no textbox value', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
          multiple
          value={['one', 'two']}
        />,
      );

      expect(screen.getByRole('textbox')).to.have.property('value', '');
    });

    it('should fail validation if a required field has no value', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Enable once https://github.com/jsdom/jsdom/issues/2898 is resolved
        this.skip();
      }

      const handleSubmit = spy((event) => event.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Autocomplete
            multiple
            options={['one', 'two']}
            renderInput={(params) => <TextField {...params} required />}
            value={[]}
          />
          <button type="submit">Submit</button>
        </form>,
      );

      screen.getByRole('button', { name: 'Submit' }).click();

      expect(handleSubmit.callCount).to.equal(0);
    });

    it('should fail validation if a required field has a value', function test() {
      // Unclear how native Constraint validation can be enabled for `multiple`
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Enable once https://github.com/jsdom/jsdom/issues/2898 is resolved
        // The test is passing in JSDOM but form validation is buggy in JSDOM so we rather skip than have false confidence
        this.skip();
      }

      const handleSubmit = spy((event) => event.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Autocomplete
            multiple
            options={['one', 'two']}
            renderInput={(params) => <TextField {...params} required />}
            value={['one']}
          />
          <button type="submit">Submit</button>
        </form>,
      );

      screen.getByRole('button', { name: 'Submit' }).click();

      expect(handleSubmit.callCount).to.equal(0);
    });
  });

  it('should trigger a form expectedly', () => {
    const handleSubmit = spy();
    const Test = (props) => (
      <div
        onKeyDown={(event) => {
          if (!event.defaultPrevented && event.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <Autocomplete
          options={['one', 'two']}
          renderInput={(props2) => <TextField {...props2} autoFocus />}
          {...props}
        />
      </div>
    );
    const { setProps } = render(<Test />);
    let textbox = screen.getByRole('textbox');

    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(1);

    fireEvent.change(textbox, { target: { value: 'o' } });
    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(1);

    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(2);

    setProps({ key: 'test-2', multiple: true, freeSolo: true });
    textbox = screen.getByRole('textbox');

    fireEvent.change(textbox, { target: { value: 'o' } });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(2);

    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(3);

    setProps({ key: 'test-3', freeSolo: true });
    textbox = screen.getByRole('textbox');

    fireEvent.change(textbox, { target: { value: 'o' } });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(4);
  });

  describe('prop: getOptionDisabled', () => {
    it('should prevent the disabled option to trigger actions but allow focus with disabledItemsFocusable', () => {
      const handleSubmit = spy();
      const handleChange = spy();
      const { getAllByRole } = render(
        <div
          onKeyDown={(event) => {
            if (!event.defaultPrevented && event.key === 'Enter') {
              handleSubmit();
            }
          }}
        >
          <Autocomplete
            disabledItemsFocusable
            getOptionDisabled={(option) => option === 'two'}
            onChange={handleChange}
            openOnFocus
            options={['one', 'two', 'three']}
            renderInput={(props2) => <TextField {...props2} autoFocus />}
          />
        </div>,
      );

      let options;
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      options = getAllByRole('option');
      expect(textbox).to.have.attribute('aria-activedescendant', options[1].getAttribute('id'));

      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleSubmit.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(0);

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      options = getAllByRole('option');
      expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id'));

      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleSubmit.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(1);
    });
  });

  describe('WAI-ARIA conforming markup', () => {
    specify('when closed', () => {
      const { getAllByRole, getByRole, queryByRole } = render(
        <Autocomplete options={[]} renderInput={(params) => <TextField {...params} />} />,
      );

      const combobox = getByRole('combobox');
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      // reflected aria-haspopup is `listbox`
      // this assertion can fail if the value is `listbox`
      expect(combobox).not.to.have.attribute('aria-haspopup');

      const textbox = getByRole('textbox');
      expect(combobox).to.contain(textbox);
      // reflected aria-multiline has to be false i.e. not present or false
      expect(textbox).not.to.have.attribute('aria-multiline');
      expect(textbox).to.have.attribute('aria-autocomplete', 'list');
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );

      // listbox is not only inaccessible but not in the DOM
      const listbox = queryByRole('listbox', { hidden: true });
      expect(listbox).to.equal(null);

      const buttons = getAllByRole('button', { hidden: true });

      expect(buttons[0]).toHaveAccessibleName('Open');
      expect(buttons[0]).to.have.attribute('title', 'Open');
      expect(buttons).to.have.length(1);
      expect(buttons[0], 'button is not in tab order').to.have.property('tabIndex', -1);
    });

    specify('when open', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const combobox = getByRole('combobox');
      expect(combobox).to.have.attribute('aria-expanded', 'true');

      const textbox = getByRole('textbox');

      const listbox = getByRole('listbox');
      expect(combobox, 'combobox owns listbox').to.have.attribute(
        'aria-owns',
        listbox.getAttribute('id'),
      );
      expect(textbox).to.have.attribute('aria-controls', listbox.getAttribute('id'));
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );

      const options = getAllByRole('option');
      expect(options).to.have.length(2);
      options.forEach((option) => {
        expect(listbox).to.contain(option);
      });

      const buttons = getAllByRole('button', { hidden: true });
      expect(buttons[0]).toHaveAccessibleName('Close');
      expect(buttons[0]).to.have.attribute('title', 'Close');
      expect(buttons).to.have.length(1);
      expect(buttons[0], 'button is not in tab order').to.have.property('tabIndex', -1);
    });

    it('should add and remove aria-activedescendant', () => {
      const { getAllByRole, getByRole, setProps } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      const options = getAllByRole('option');
      expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id'));
      setProps({ open: false });
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );
    });
  });

  describe('when popup closed', () => {
    it('opens when the textbox is focused when `openOnFocus`', () => {
      const handleOpen = spy();
      render(
        <Autocomplete
          options={[]}
          onOpen={handleOpen}
          openOnFocus
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      expect(handleOpen.callCount).to.equal(1);
    });

    it('does not open on clear', () => {
      const handleOpen = spy();
      const handleChange = spy();
      const { container } = render(
        <Autocomplete
          onOpen={handleOpen}
          onChange={handleChange}
          open={false}
          options={['one', 'two']}
          value="one"
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const clear = container.querySelector('button');
      fireEvent.click(clear);

      expect(handleOpen.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(1);
    });

    ['ArrowDown', 'ArrowUp'].forEach((key) => {
      it(`opens on ${key} when focus is on the textbox and \`openOnFocus\` without moving focus`, () => {
        const handleOpen = spy();
        render(
          <Autocomplete
            onOpen={handleOpen}
            open={false}
            openOnFocus
            options={[]}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('textbox');

        fireEvent.keyDown(textbox, { key });

        // first from focus
        expect(handleOpen.callCount).to.equal(2);
        expect(textbox).not.to.have.attribute('aria-activedescendant');
      });
    });

    it('does not clear the textbox on Escape', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          onChange={handleChange}
          open={false}
          options={['one', 'two']}
          value="one"
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describe('prop: clearOnEscape', () => {
    it('should clear on escape', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          onChange={handleChange}
          clearOnEscape
          multiple
          value={['one']}
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([]);
    });
  });

  describe('when popup open', () => {
    it('closes the popup if Escape is pressed ', () => {
      const handleClose = spy();
      render(
        <Autocomplete
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });
      expect(handleClose.callCount).to.equal(1);
    });

    it('does not close the popup when option selected if Control is pressed', () => {
      const handleClose = spy();
      const { getAllByRole } = render(
        <Autocomplete
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const options = getAllByRole('option');
      fireEvent.click(options[0], { ctrlKey: true });
      expect(handleClose.callCount).to.equal(0);
    });

    it('does not close the popup when option selected if Meta is pressed', () => {
      const handleClose = spy();
      const { getAllByRole } = render(
        <Autocomplete
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const options = getAllByRole('option');
      fireEvent.click(options[0], { metaKey: true });
      expect(handleClose.callCount).to.equal(0);
    });

    it('moves focus to the first option on ArrowDown', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown' });
      expect(getByRole('textbox')).to.have.attribute(
        'aria-activedescendant',
        getAllByRole('option')[0].getAttribute('id'),
      );
    });

    it('moves focus to the last option on ArrowUp', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowUp' });
      const options = getAllByRole('option');
      expect(getByRole('textbox')).to.have.attribute(
        'aria-activedescendant',
        options[options.length - 1].getAttribute('id'),
      );
    });

    it('should ignore keydown event until the IME is confirmed', function test() {
      // TODO: Often times out in Firefox 78.
      // Is this slow because of testing-library or because of the implementation?
      this.timeout(4000);

      const { getByRole } = render(
        <Autocomplete
          open
          options={['가1', '가2']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');
      const listbox = getByRole('listbox');
      // Actual Behavior when "가" (Korean) is entered and press the arrow down key once on macOS/Chrome
      fireEvent.change(textbox, { target: { value: '가' } });
      fireEvent.keyDown(textbox, { key: 'ArrowDown', keyCode: 229 });
      fireEvent.keyDown(textbox, { key: 'ArrowDown', keyCode: 40 });

      checkHighlightIs(listbox, '가1');
    });
  });

  describe('prop: openOnFocus', () => {
    it('enables open on input focus', () => {
      const { getByRole } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          openOnFocus
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');
      const combobox = getByRole('combobox');

      expect(combobox).to.have.attribute('aria-expanded', 'true');
      expect(textbox).toHaveFocus();

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'false');

      act(() => {
        document.activeElement.blur();
      });

      expect(combobox).to.have.attribute('aria-expanded', 'false');
      expect(textbox).not.toHaveFocus();

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'true');
      expect(textbox).toHaveFocus();

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'false');
    });
  });

  describe('listbox wrapping behavior', () => {
    it('wraps around when navigating the list by default', () => {
      const { getAllByRole } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowUp' });

      const options = getAllByRole('option');
      expect(textbox).toHaveFocus();
      expect(textbox).to.have.attribute(
        'aria-activedescendant',
        options[options.length - 1].getAttribute('id'),
      );
    });

    it('selects the first item if on the last item and pressing up by default', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowUp' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      const options = screen.getAllByRole('option');
      expect(textbox).toHaveFocus();
      expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id'));
    });

    describe('prop: includeInputInList', () => {
      it('considers the textbox the predessor of the first option when pressing Up', () => {
        render(
          <Autocomplete
            includeInputInList
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('textbox');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowUp' });

        expect(textbox).toHaveFocus();
        expect(textbox).not.to.have.attribute('aria-activedescendant');
      });

      it('considers the textbox the successor of the last option when pressing Down', () => {
        render(
          <Autocomplete
            includeInputInList
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('textbox');

        fireEvent.keyDown(textbox, { key: 'ArrowUp' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });

        expect(textbox).toHaveFocus();
        expect(textbox).not.to.have.attribute('aria-activedescendant');
      });
    });

    describe('prop: disableListWrap', () => {
      it('keeps focus on the first item if focus is on the first item and pressing Up', () => {
        render(
          <Autocomplete
            disableListWrap
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('textbox');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowUp' });

        expect(textbox).toHaveFocus();
        expect(textbox).to.have.attribute(
          'aria-activedescendant',
          screen.getAllByRole('option')[0].getAttribute('id'),
        );
      });

      it('focuses the last item when pressing Up when no option is active', () => {
        render(
          <Autocomplete
            disableListWrap
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('textbox');

        fireEvent.keyDown(textbox, { key: 'ArrowUp' });

        const options = screen.getAllByRole('option');
        expect(textbox).toHaveFocus();
        expect(textbox).to.have.attribute(
          'aria-activedescendant',
          options[options.length - 1].getAttribute('id'),
        );
      });

      it('keeps focus on the last item if focus is on the last item and pressing Down', () => {
        render(
          <Autocomplete
            disableListWrap
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('textbox');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });

        const options = screen.getAllByRole('option');
        expect(textbox).toHaveFocus();
        expect(textbox).to.have.attribute(
          'aria-activedescendant',
          options[options.length - 1].getAttribute('id'),
        );
      });
    });
  });

  describe('prop: disabled', () => {
    it('should disable the input', () => {
      const { getByRole } = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const input = getByRole('textbox');
      expect(input).to.have.property('disabled', true);
    });

    it('should disable the popup button', () => {
      const { queryByTitle } = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(queryByTitle('Open').disabled).to.equal(true);
    });

    it('should not render the clear button', () => {
      const { queryByTitle } = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(queryByTitle('Clear')).to.equal(null);
    });

    it('should not apply the hasClearIcon class', () => {
      const { container } = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(container.querySelector(`.${classes.root}`)).not.to.have.class(classes.hasClearIcon);
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
    });

    it('should close the popup when disabled is true', () => {
      const { setProps } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('textbox');
      act(() => {
        textbox.focus();
      });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      expect(screen.queryByRole('listbox')).not.to.equal(null);
      setProps({ disabled: true });
      expect(screen.queryByRole('listbox')).to.equal(null);
    });
  });

  describe('prop: disableClearable', () => {
    it('should not render the clear button', () => {
      const { queryByTitle, container } = render(
        <Autocomplete
          disableClearable
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(queryByTitle('Clear')).to.equal(null);
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
      expect(container.querySelector(`.${classes.root}`)).not.to.have.class(classes.hasClearIcon);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warn if getOptionLabel do not return a string', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          freeSolo
          onChange={handleChange}
          options={[{ name: 'one' }, {}]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      expect(() => {
        fireEvent.change(textbox, { target: { value: 'a' } });
        fireEvent.keyDown(textbox, { key: 'Enter' });
      }).toErrorDev([
        'Material-UI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        // strict mode renders twice
        React.version.startsWith('16') &&
          'Material-UI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        // strict mode renders twice
        React.version.startsWith('16') &&
          'Material-UI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        'Material-UI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        'Material-UI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        'Material-UI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
      ]);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('a');
    });

    it('warn if isOptionEqualToValue match multiple values for a given option', () => {
      const value = [
        { id: '10', text: 'One' },
        { id: '20', text: 'Two' },
      ];
      const options = [
        { id: '10', text: 'One' },
        { id: '20', text: 'Two' },
        { id: '30', text: 'Three' },
      ];

      render(
        <Autocomplete
          multiple
          options={options}
          value={value}
          getOptionLabel={(option) => option.text}
          isOptionEqualToValue={(option) => value.find((v) => v.id === option.id)}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      expect(() => {
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'Enter' });
      }).toErrorDev(
        'The component expects a single value to match a given option but found 2 matches.',
      );
    });

    it('warn if value does not exist in options list', () => {
      const value = 'not a good value';
      const options = ['first option', 'second option'];

      expect(() => {
        render(
          <Autocomplete
            value={value}
            options={options}
            renderInput={(params) => <TextField {...params} />}
          />,
        );
      }).toWarnDev([
        'None of the options match with `"not a good value"`',
        // strict mode renders twice
        React.version.startsWith('16') && 'None of the options match with `"not a good value"`',
        'None of the options match with `"not a good value"`',
        // strict mode renders twice
        React.version.startsWith('16') && 'None of the options match with `"not a good value"`',
        // React 18 Strict Effects run mount effects twice which lead to a cascading update
        React.version.startsWith('18') && 'None of the options match with `"not a good value"`',
      ]);
    });

    it('warn if groups options are not sorted', () => {
      const data = [
        { group: 1, value: 'A' },
        { group: 2, value: 'D' },
        { group: 2, value: 'E' },
        { group: 1, value: 'B' },
        { group: 3, value: 'G' },
        { group: 2, value: 'F' },
        { group: 1, value: 'C' },
      ];
      expect(() => {
        render(
          <Autocomplete
            openOnFocus
            options={data}
            getOptionLabel={(option) => option.value}
            renderInput={(params) => <TextField {...params} autoFocus />}
            groupBy={(option) => option.group}
          />,
        );
      }).toWarnDev([
        'returns duplicated headers',
        // strict mode renders twice
        React.version.startsWith('16') && 'returns duplicated headers',
        // React 18 Strict Effects run mount effects twice which lead to a cascading update
        React.version.startsWith('18') && 'returns duplicated headers',
      ]);
      const options = screen.getAllByRole('option').map((el) => el.textContent);
      expect(options).to.have.length(7);
      expect(options).to.deep.equal(['A', 'D', 'E', 'B', 'G', 'F', 'C']);
    });

    it('warn if the type of the value is wrong', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Autocomplete.propTypes,
          { multiple: true, value: null, options: [], renderInput: () => null },
          'prop',
          'Autocomplete',
        );
      }).toErrorDev('The Autocomplete expects the `value` prop to be an array or undefined.');
    });
  });

  describe('prop: options', () => {
    it('should keep focus on selected option and not reset to top option when options updated', () => {
      const { setProps } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');
      const listbox = screen.getByRole('listbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // goes to 'one'
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // goes to 'two'

      checkHighlightIs(listbox, 'two');

      // three option is added and autocomplete re-renders, reset the highlight
      setProps({ options: ['one', 'two', 'three'] });
      checkHighlightIs(listbox, null);
    });

    it('should not select undefined', () => {
      const handleChange = spy();
      const { getByRole } = render(
        <Autocomplete
          onChange={handleChange}
          openOnFocus
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const input = getByRole('textbox');
      fireEvent.click(input);

      const listbox = getByRole('listbox');
      const firstOption = listbox.querySelector('li');
      fireEvent.click(firstOption);

      expect(handleChange.args[0][1]).to.equal('one');
    });

    it('should work if options are the default data structure', () => {
      const options = [
        {
          label: 'one',
        },
      ];
      const handleChange = spy();
      const { getByRole } = render(
        <Autocomplete
          onChange={handleChange}
          openOnFocus
          options={options}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const input = getByRole('textbox');
      fireEvent.click(input);

      const listbox = getByRole('listbox');
      const htmlOptions = listbox.querySelectorAll('li');

      expect(htmlOptions[0].innerHTML).to.equal('one');
    });

    it("should display a 'no options' message if no options are available", () => {
      const { getByRole } = render(
        <Autocomplete open options={[]} renderInput={(params) => <TextField {...params} />} />,
      );

      const combobox = getByRole('combobox');
      const textbox = getByRole('textbox');
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      expect(combobox).not.to.have.attribute('aria-owns');
      expect(textbox).not.to.have.attribute('aria-controls');
      expect(document.querySelector(`.${classes.paper}`)).to.have.text('No options');
    });
  });

  describe('enter', () => {
    it('select a single value when enter is pressed', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          onChange={handleChange}
          openOnFocus
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('one');
      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });

    it('select multiple value when enter is pressed', () => {
      const handleChange = spy();
      const options = [{ name: 'one' }, { name: 'two ' }];
      render(
        <Autocomplete
          multiple
          onChange={handleChange}
          openOnFocus
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[0]]);
      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });
  });

  describe('prop: autoComplete', () => {
    it('add a completion string', () => {
      render(
        <Autocomplete
          autoComplete
          openOnFocus
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.change(document.activeElement, { target: { value: 'O' } });

      expect(document.activeElement.value).to.equal('O');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      expect(document.activeElement.value).to.equal('one');
      expect(document.activeElement.selectionStart).to.equal(1);
      expect(document.activeElement.selectionEnd).to.equal(3);

      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(document.activeElement.value).to.equal('one');
      expect(document.activeElement.selectionStart).to.equal(3);
      expect(document.activeElement.selectionEnd).to.equal(3);
    });
  });

  describe('click input', () => {
    it('when `openOnFocus` toggles if empty', () => {
      const { getByRole } = render(
        <Autocomplete
          openOnFocus
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = getByRole('textbox');
      const combobox = getByRole('combobox');
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      fireEvent.mouseDown(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'true');
      fireEvent.mouseDown(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'false');
    });

    it('selects all the first time', () => {
      const { getByRole } = render(
        <Autocomplete
          value="one"
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = getByRole('textbox');
      fireEvent.click(textbox);
      expect(textbox.selectionStart).to.equal(0);
      expect(textbox.selectionEnd).to.equal(3);
    });

    it('should focus the input when clicking on the open action', () => {
      const { getByRole, queryByTitle } = render(
        <Autocomplete
          value="one"
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = getByRole('textbox');
      fireEvent.click(textbox);
      expect(textbox).toHaveFocus();

      act(() => {
        textbox.blur();
      });
      fireEvent.click(queryByTitle('Open'));

      expect(textbox).toHaveFocus();
    });

    it('should maintain list box open clicking on input when it is not empty', () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete options={['one']} renderInput={(params) => <TextField {...params} />} />,
      );
      const combobox = getByRole('combobox');
      const textbox = getByRole('textbox');

      expect(combobox).to.have.attribute('aria-expanded', 'false');
      fireEvent.mouseDown(textbox); // Open listbox
      expect(combobox).to.have.attribute('aria-expanded', 'true');
      const options = getAllByRole('option');
      fireEvent.click(options[0]);
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      fireEvent.mouseDown(textbox); // Open listbox
      expect(combobox).to.have.attribute('aria-expanded', 'true');
      fireEvent.mouseDown(textbox); // Remain open listbox
      expect(combobox).to.have.attribute('aria-expanded', 'true');
    });

    it('should not toggle list box', () => {
      const { getByRole } = render(
        <Autocomplete
          value="one"
          options={['one']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const combobox = getByRole('combobox');
      const textbox = getByRole('textbox');

      expect(combobox).to.have.attribute('aria-expanded', 'false');
      fireEvent.mouseDown(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'true');
      fireEvent.mouseDown(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'true');
    });
  });

  describe('controlled', () => {
    it('controls the input value', () => {
      const handleChange = spy();
      function MyComponent() {
        const [, setInputValue] = React.useState('');
        const handleInputChange = (event, value) => {
          handleChange(value);
          setInputValue(value);
        };
        return (
          <Autocomplete
            options={[]}
            inputValue=""
            onInputChange={handleInputChange}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />
        );
      }

      render(<MyComponent />);

      expect(handleChange.callCount).to.equal(0);
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][0]).to.equal('a');
      expect(document.activeElement.value).to.equal('');
    });

    it('should fire the input change event before the change event', () => {
      const handleChange = spy();
      const handleInputChange = spy();
      render(
        <Autocomplete
          onChange={handleChange}
          onInputChange={handleInputChange}
          open
          options={['foo']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(handleInputChange.calledBefore(handleChange)).to.equal(true);
    });
  });

  describe('prop: filterOptions', () => {
    it('should ignore object keys by default', () => {
      const { queryAllByRole } = render(
        <Autocomplete
          open
          options={[
            {
              value: 'one',
              label: 'One',
            },
            {
              value: 'two',
              label: 'Two',
            },
          ]}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      let options;
      options = queryAllByRole('option');
      expect(options.length).to.equal(2);

      fireEvent.change(document.activeElement, { target: { value: 'value' } });
      options = queryAllByRole('option');
      expect(options.length).to.equal(0);

      fireEvent.change(document.activeElement, { target: { value: 'one' } });
      options = queryAllByRole('option');
      expect(options.length).to.equal(1);
    });

    it('limits the amount of rendered options when `limit` is set in `createFilterOptions`', () => {
      const filterOptions = createFilterOptions({ limit: 2 });
      const { queryAllByRole } = render(
        <Autocomplete
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
          filterOptions={filterOptions}
        />,
      );
      expect(queryAllByRole('option').length).to.equal(2);
    });

    it('does not limit the amount of rendered options when `limit` is not set in `createFilterOptions`', () => {
      const filterOptions = createFilterOptions({});
      const { queryAllByRole } = render(
        <Autocomplete
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
          filterOptions={filterOptions}
        />,
      );
      expect(queryAllByRole('option').length).to.equal(3);
    });
  });

  describe('prop: freeSolo', () => {
    it('pressing twice enter should not call onChange listener twice', () => {
      const handleChange = spy();
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          freeSolo
          onChange={handleChange}
          open
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(options[0]);

      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(handleChange.callCount).to.equal(1);
    });

    it('should not delete exiting tag when try to add it twice', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { container } = render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          freeSolo
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.change(textbox, { target: { value: 'three' } });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(container.querySelectorAll('[class*="MuiChip-root"]')).to.have.length(3);

      fireEvent.change(textbox, { target: { value: 'three' } });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(container.querySelectorAll('[class*="MuiChip-root"]')).to.have.length(3);
    });

    it('should not fire change event until the IME is confirmed', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          freeSolo
          onChange={handleChange}
          options={[]}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      // Actual behavior when "あ" (Japanese) is entered on macOS/Safari with IME
      fireEvent.change(textbox, { target: { value: 'あ' } });
      fireEvent.keyDown(textbox, { key: 'Enter', keyCode: 229 });

      expect(handleChange.callCount).to.equal(0);

      fireEvent.keyDown(textbox, { key: 'Enter', keyCode: 13 });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('あ');
    });
  });

  describe('prop: onChange', () => {
    it('provides a reason and details on option creation', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          freeSolo
          onChange={handleChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.change(textbox, { target: { value: options[2] } });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(options[2]);
      expect(handleChange.args[0][2]).to.equal('createOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[2] });
    });

    it('provides a reason and details on option selection', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          onChange={handleChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(options[0]);
      expect(handleChange.args[0][2]).to.equal('selectOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[0] });
    });

    it('provides a reason and details on option removing', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          multiple
          onChange={handleChange}
          value={options}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'Backspace' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(options.slice(0, 2));
      expect(handleChange.args[0][2]).to.equal('removeOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[2] });
    });

    it('provides a reason and details on blur', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          autoSelect
          onChange={handleChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      act(() => {
        textbox.blur();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(options[0]);
      expect(handleChange.args[0][2]).to.equal('blur');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[0] });
    });

    it('provides a reason and details on clear', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { container } = render(
        <Autocomplete
          multiple
          value={options}
          onChange={handleChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const button = container.querySelector('button');
      fireEvent.click(button);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([]);
      expect(handleChange.args[0][2]).to.equal('clear');
      expect(handleChange.args[0][3]).to.equal(undefined);
    });
  });

  describe('prop: onInputChange', () => {
    it('provides a reason on input change', () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      expect(handleInputChange.callCount).to.equal(1);
      expect(handleInputChange.args[0][1]).to.equal('a');
      expect(handleInputChange.args[0][2]).to.equal('input');
    });

    it('provides a reason on select reset', () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          onInputChange={handleInputChange}
          openOnFocus
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(handleInputChange.callCount).to.equal(1);
      expect(handleInputChange.args[0][1]).to.equal(options[0].name);
      expect(handleInputChange.args[0][2]).to.equal('reset');
    });
  });

  describe('prop: blurOnSelect', () => {
    it('[blurOnSelect=true] should blur the input when clicking or touching options', () => {
      const options = [{ name: 'foo' }];
      const { getByRole, queryByTitle } = render(
        <Autocomplete
          openOnFocus
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          blurOnSelect
        />,
      );
      const textbox = getByRole('textbox');
      let firstOption = getByRole('option');
      expect(textbox).toHaveFocus();
      fireEvent.click(firstOption);
      expect(textbox).not.toHaveFocus();

      fireEvent.click(queryByTitle('Open'));
      expect(textbox).toHaveFocus();
      firstOption = getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).not.toHaveFocus();
    });

    it('[blurOnSelect="touch"] should only blur the input when an option is touched', () => {
      const options = [{ name: 'foo' }];
      const { getByRole, queryByTitle } = render(
        <Autocomplete
          openOnFocus
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          blurOnSelect="touch"
        />,
      );
      const textbox = getByRole('textbox');
      let firstOption = getByRole('option');
      fireEvent.click(firstOption);
      expect(textbox).toHaveFocus();

      fireEvent.click(queryByTitle('Open'));
      firstOption = getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).not.toHaveFocus();
    });

    it('[blurOnSelect="mouse"] should only blur the input when an option is clicked', () => {
      const options = [{ name: 'foo' }];
      const { getByRole, queryByTitle } = render(
        <Autocomplete
          openOnFocus
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          blurOnSelect="mouse"
        />,
      );
      const textbox = getByRole('textbox');
      let firstOption = getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).toHaveFocus();

      fireEvent.click(queryByTitle('Open'));
      firstOption = getByRole('option');
      fireEvent.click(firstOption);
      expect(textbox).not.toHaveFocus();
    });
  });

  describe('prop: getOptionLabel', () => {
    it('is considered for falsy values when filtering the list of options', () => {
      const { getAllByRole } = render(
        <Autocomplete
          open
          options={[0, 10, 20]}
          getOptionLabel={(option) => (option === 0 ? 'Any' : option.toString())}
          renderInput={(params) => <TextField {...params} />}
          value={0}
        />,
      );

      const options = getAllByRole('option');
      expect(options).to.have.length(3);
    });

    it('is not considered for nullish values when filtering the list of options', () => {
      const { getAllByRole } = render(
        <Autocomplete
          open
          options={[null, 10, 20]}
          getOptionLabel={(option) => (option === null ? 'Any' : option.toString())}
          renderInput={(params) => <TextField {...params} />}
          value={null}
        />,
      );

      const options = getAllByRole('option');
      expect(options).to.have.length(3);
    });

    it('should update the input value when getOptionLabel changes', () => {
      const { setProps } = render(
        <Autocomplete
          value="one"
          open
          options={['one', 'two', 'three']}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('textbox');
      expect(textbox).to.have.property('value', 'one');
      setProps({
        getOptionLabel: (option) => option.toUpperCase(),
      });
      expect(textbox).to.have.property('value', 'ONE');
    });

    it('should not update the input value when users is focusing', () => {
      const { setProps } = render(
        <Autocomplete
          value="one"
          open
          options={['one', 'two', 'three']}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');
      expect(textbox).to.have.property('value', 'one');
      fireEvent.change(textbox, { target: { value: 'a' } });
      setProps({
        getOptionLabel: (option) => option.toUpperCase(),
      });
      expect(textbox).to.have.property('value', 'a');
    });
  });

  describe('prop: fullWidth', () => {
    it('should have the fullWidth class', () => {
      const { container } = render(
        <Autocomplete
          fullWidth
          options={[0, 10, 20]}
          renderInput={(params) => <TextField {...params} />}
          value={null}
        />,
      );

      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.fullWidth);
    });
  });

  describe('prop: onHighlightChange', () => {
    it('should trigger event when default value is passed', () => {
      const handleHighlightChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          defaultValue={options[0]}
          onHighlightChange={handleHighlightChange}
          options={options}
          open
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      expect(handleHighlightChange.callCount).to.equal(
        // FIXME: highlighted index implementation should be implemented using React not the DOM.
        React.version.startsWith('18') ? 2 : 1,
      );
      expect(handleHighlightChange.args[0]).to.deep.equal([undefined, options[0], 'auto']);
      if (React.version.startsWith('18')) {
        expect(handleHighlightChange.args[1]).to.deep.equal([undefined, options[0], 'auto']);
      }
    });

    it('should support keyboard event', () => {
      const handleHighlightChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          onHighlightChange={handleHighlightChange}
          options={options}
          open
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      expect(handleHighlightChange.callCount).to.equal(
        // FIXME: highlighted index implementation should be implemented using React not the DOM.
        React.version.startsWith('18') ? 4 : 3,
      );
      if (React.version.startsWith('18')) {
        expect(handleHighlightChange.args[2][0]).to.equal(undefined);
        expect(handleHighlightChange.args[2][1]).to.equal(null);
        expect(handleHighlightChange.args[2][2]).to.equal('auto');
      }
      expect(handleHighlightChange.lastCall.args[0]).not.to.equal(undefined);
      expect(handleHighlightChange.lastCall.args[1]).to.equal(options[0]);
      expect(handleHighlightChange.lastCall.args[2]).to.equal('keyboard');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      expect(handleHighlightChange.callCount).to.equal(
        // FIXME: highlighted index implementation should be implemented using React not the DOM.
        React.version.startsWith('18') ? 5 : 4,
      );
      expect(handleHighlightChange.lastCall.args[0]).not.to.equal(undefined);
      expect(handleHighlightChange.lastCall.args[1]).to.equal(options[1]);
      expect(handleHighlightChange.lastCall.args[2]).to.equal('keyboard');
    });

    it('should support mouse event', () => {
      const handleHighlightChange = spy();
      const options = ['one', 'two', 'three'];
      const { getAllByRole } = render(
        <Autocomplete
          onHighlightChange={handleHighlightChange}
          options={options}
          open
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const firstOption = getAllByRole('option')[0];
      fireEvent.mouseOver(firstOption);
      expect(handleHighlightChange.callCount).to.equal(
        // FIXME: highlighted index implementation should be implemented using React not the DOM.
        React.version.startsWith('18') ? 4 : 3,
      );
      if (React.version.startsWith('18')) {
        expect(handleHighlightChange.args[2][0]).to.equal(undefined);
        expect(handleHighlightChange.args[2][1]).to.equal(null);
        expect(handleHighlightChange.args[2][2]).to.equal('auto');
      }
      expect(handleHighlightChange.lastCall.args[0]).not.to.equal(undefined);
      expect(handleHighlightChange.lastCall.args[1]).to.equal(options[0]);
      expect(handleHighlightChange.lastCall.args[2]).to.equal('mouse');
    });

    it('should pass to onHighlightChange the correct value after filtering', () => {
      const handleHighlightChange = spy();
      const options = ['one', 'three', 'onetwo'];
      render(
        <Autocomplete
          onHighlightChange={handleHighlightChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('textbox');

      fireEvent.change(document.activeElement, { target: { value: 'one' } });
      expect(screen.getAllByRole('option').length).to.equal(2);

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      expect(handleHighlightChange.args[handleHighlightChange.args.length - 1][1]).to.equal(
        options[2],
      );
    });

    it('should reset the highlight when the options change', () => {
      const handleHighlightChange = [];
      const { getByRole, setProps } = render(
        <Autocomplete
          onHighlightChange={(event, option) => {
            handleHighlightChange.push(option);
          }}
          openOnFocus
          autoHighlight
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(getByRole('listbox'), 'one');
      setProps({ options: ['four', 'five'] });
      checkHighlightIs(getByRole('listbox'), 'four');
      expect(handleHighlightChange).to.deep.equal([null, 'one', 'four']);
    });
  });

  it('should filter options when new input value matches option', () => {
    const handleChange = spy();
    const { getAllByRole, getByRole } = render(
      <Autocomplete
        openOnFocus
        options={['one', 'two']}
        onChange={handleChange}
        renderInput={(params) => <TextField autoFocus {...params} />}
      />,
    );
    const textbox = getByRole('textbox');
    const combobox = getByRole('combobox');

    fireEvent.change(textbox, { target: { value: 'one' } });
    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal('one');
    expect(combobox).to.have.attribute('aria-expanded', 'false');

    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    expect(combobox).to.have.attribute('aria-expanded', 'true');

    expect(getAllByRole('option')).to.have.length(2);

    fireEvent.change(textbox, { target: { value: 'on' } });
    fireEvent.change(textbox, { target: { value: 'one' } });

    expect(getAllByRole('option')).to.have.length(1);
  });

  it('should prevent the default event handlers', () => {
    const handleChange = spy();
    const handleSubmit = spy();
    const Test = () => (
      <div
        onKeyDown={(event) => {
          if (!event.defaultPrevented && event.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <Autocomplete
          options={['one', 'two']}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.defaultMuiPrevented = true;
            }
          }}
          renderInput={(params) => <TextField autoFocus {...params} />}
        />
      </div>
    );
    render(<Test />);
    const textbox = screen.getByRole('textbox');
    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleChange.callCount).to.equal(0);
    expect(handleSubmit.callCount).to.equal(1);
  });
});
