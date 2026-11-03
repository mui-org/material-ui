import { expect, describe, it, beforeEach } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  act,
  createRenderer,
  fireEvent,
  screen,
  strictModeDoubleLoggingSuppressed,
  isJsdom,
} from '@mui/internal-test-utils';
import { spy } from 'sinon';
import Box from '@mui/system/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Chip, { chipClasses } from '@mui/material/Chip';
import Autocomplete, {
  autocompleteClasses as classes,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import Grow from '@mui/material/Grow';
import InputAdornment from '@mui/material/InputAdornment';
import { paperClasses } from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import describeConformance from '../../test/describeConformance';

// Firefox reports fractional `scrollTop` values in Vitest browser mode, so the exact
// scroll-position assertions below fail. See https://github.com/vitest-dev/vitest/issues/9223
const isFirefox = /firefox/i.test(navigator.userAgent);

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

function getActiveDescendant(textbox) {
  const activeDescendantId = textbox.getAttribute('aria-activedescendant');

  return activeDescendantId ? document.getElementById(activeDescendantId) : null;
}

describe('<Autocomplete />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Autocomplete
      options={['one', 'two']}
      defaultValue="one"
      open
      renderInput={(params) => <TextField {...params} />}
    />,
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
      slots: {
        root: { expectedClassName: classes.root },
        listbox: { expectedClassName: classes.listbox },
        paper: { expectedClassName: classes.paper },
        popper: { expectedClassName: classes.popper, testWithElement: null },
      },
      skip: ['componentProp'],
    }),
  );

  describeConformance(
    <Autocomplete
      options={['one', 'two']}
      defaultValue="one"
      open
      renderInput={(params) => <TextField {...params} />}
    />,
    () => ({
      classes,
      render,
      muiName: 'MuiAutocomplete',
      slots: {
        clearIndicator: { expectedClassName: classes.clearIndicator },
        popupIndicator: { expectedClassName: classes.popupIndicator },
        status: { expectedClassName: classes.status },
      },
      only: [
        'slotsProp',
        'slotPropsProp',
        'slotPropsCallback',
        'slotPropsCallbackWithPropsAsOwnerState',
      ],
    }),
  );

  describeConformance(
    <Autocomplete
      options={['one', 'two']}
      defaultValue={['one']}
      multiple
      open
      renderInput={(params) => <TextField {...params} />}
    />,
    () => ({
      classes,
      render,
      muiName: 'MuiAutocomplete',
      slots: {
        chip: {},
      },
      only: ['slotPropsProp', 'slotPropsCallback'],
    }),
  );

  it('should render the chips with slots.chip and merge the className', () => {
    function CustomChip(props) {
      return <Chip data-testid="custom-chip" {...props} />;
    }

    render(
      <Autocomplete
        multiple
        defaultValue={['one']}
        options={['one', 'two']}
        slots={{ chip: CustomChip }}
        slotProps={{ chip: { className: 'custom' } }}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    const chip = screen.getByTestId('custom-chip');
    expect(chip).to.have.class(classes.tag);
    expect(chip).to.have.class('custom');
  });

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

  it('should have an elevation of 8 by default that can be overridden', () => {
    const { setProps } = render(
      <Autocomplete options={[]} open renderInput={(params) => <TextField {...params} />} />,
    );

    expect(document.querySelector(`.${classes.paper}`)).to.have.class(paperClasses.elevation8);

    setProps({ slotProps: { paper: { elevation: 16 } } });

    expect(document.querySelector(`.${classes.paper}`)).to.have.class(paperClasses.elevation16);
  });

  it('should not throw error when accessing ownerState in styleOverrides', () => {
    const theme = createTheme({
      components: {
        MuiAutocomplete: {
          styleOverrides: {
            root: ({ ownerState }) => {
              return {
                outlineColor: ownerState.size === 'small' ? 'magenta' : 'crimson',
              };
            },
          },
        },
      },
    });

    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <Autocomplete
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} />}
          />
        </ThemeProvider>,
      );
    }).not.to.throw();
  });

  describe('combobox', () => {
    it('should not open popup on right click', async () => {
      const { user } = render(
        <Autocomplete
          disablePortal
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      await user.pointer({ keys: '[MouseRight]', target: screen.getByRole('combobox') });

      const listbox = screen.queryByRole('listbox');
      expect(listbox).to.equal(null);
    });

    it('should clear the input when blur', () => {
      render(<Autocomplete options={[]} renderInput={(params) => <TextField {...params} />} />);
      const input = screen.getByRole('combobox');

      act(() => {
        input.focus();
      });
      fireEvent.change(document.activeElement, { target: { value: 'a' } });

      expect(input.value).to.equal('a');

      act(() => {
        document.activeElement.blur();
      });
      expect(input.value).to.equal('');
    });

    it('should apply the icon classes', () => {
      const view = render(
        <Autocomplete
          value="one"
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(view.container.querySelector(`.${classes.root}`)).to.have.class(classes.hasClearIcon);
      expect(view.container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
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
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      expect(document.querySelector(`.${classes.paper}`).textContent).to.equal('Loading…');
    });

    it('should render the loading message in the status container', () => {
      const view = render(
        <Autocomplete
          open
          options={['one']}
          loadingText="Fetching options"
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const status = screen.getByRole('status');
      expect(status).to.have.attribute('aria-live', 'polite');
      expect(status).to.have.attribute('aria-atomic', 'true');
      expect(status.children).to.have.length(0);

      view.setProps({ options: [], loading: true });

      expect(status).to.have.text('Fetching options');
    });

    it('should show supplied options to the "options" prop even when loading', () => {
      render(
        <Autocomplete
          options={['one', 'two']}
          loading
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      expect(document.querySelector(`.${classes.paper}`).textContent).not.to.equal('Loading…');

      const listbox = screen.getByRole('listbox');
      const htmlOptions = listbox.querySelectorAll('li');
      expect(htmlOptions[0].innerHTML).to.equal('one');
    });
  });

  describe('prop: autoHighlight', () => {
    it('should set the focus on the first item', () => {
      const options = ['one', 'two'];
      render(
        <Autocomplete
          freeSolo
          autoHighlight
          open
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(screen.getByRole('listbox'), 'one');
      fireEvent.change(document.activeElement, { target: { value: 'oo' } });
      fireEvent.change(document.activeElement, { target: { value: 'o' } });
      checkHighlightIs(screen.getByRole('listbox'), 'one');
    });

    it('should keep the highlight on the first item', () => {
      const options = ['one', 'two'];
      render(
        <Autocomplete
          value="one"
          autoHighlight
          open
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(screen.getByRole('listbox'), 'one');
      fireEvent.change(document.activeElement, { target: { value: 'two' } });
      checkHighlightIs(screen.getByRole('listbox'), 'two');
    });

    it('should set the focus on the first item when possible', () => {
      const options = ['one', 'two'];
      const view = render(
        <Autocomplete
          open
          options={[]}
          autoHighlight
          loading
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      expect(getActiveDescendant(textbox)).to.equal(null);

      view.setProps({ options, loading: false });
      expect(getActiveDescendant(textbox)).to.equal(screen.getAllByRole('option')[0]);
    });

    it('should set the highlight on selected item when dropdown is expanded', () => {
      const view = render(
        <Autocomplete
          value="one"
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(screen.getByRole('listbox'), 'one');
      view.setProps({ value: 'two' });
      checkHighlightIs(screen.getByRole('listbox'), 'two');
    });

    // https://github.com/mui/material-ui/issues/34998
    it.skipIf(isJsdom())(
      'should scroll the listbox to the top when keyboard highlight wraps around after the last item is highlighted',
      function test() {
        render(
          <Autocomplete
            open
            options={['one', 'two', 'three', 'four', 'five']}
            renderInput={(params) => <TextField {...params} />}
            slotProps={{ listbox: { style: { padding: 0, maxHeight: '100px' } } }}
            slots={{
              popper: (props) => {
                const { disablePortal, anchorEl, open, ...other } = props;
                return <Box {...other} />;
              },
            }}
          />,
        );
        const textbox = screen.getByRole('combobox');
        act(() => {
          textbox.focus();
        });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });

        checkHighlightIs(screen.getByRole('listbox'), 'one');
        expect(screen.getByRole('listbox')).to.have.property('scrollTop', 0);
      },
    );

    it('should keep the current highlight if possible', () => {
      render(
        <Autocomplete
          multiple
          defaultValue={['one']}
          open
          options={['one', 'two', 'three']}
          disableCloseOnSelect
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      checkHighlightIs(screen.getByRole('listbox'), 'one');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'two');
      fireEvent.keyDown(textbox, { key: 'Enter' });
      checkHighlightIs(screen.getByRole('listbox'), 'two');
    });

    it('should work with filterSelectedOptions too', () => {
      const options = ['Foo', 'Bar', 'Baz'];
      render(
        <Autocomplete
          multiple
          filterSelectedOptions
          autoHighlight
          value={options.slice(0, 1)}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'Bar');
      fireEvent.change(textbox, { target: { value: 'a' } });
      checkHighlightIs(screen.getByRole('listbox'), 'Bar');
      fireEvent.change(textbox, { target: { value: 'aa' } });
      fireEvent.change(textbox, { target: { value: 'a' } });
      checkHighlightIs(screen.getByRole('listbox'), 'Bar');
    });

    // https://github.com/mui/material-ui/issues/45279
    it('should auto highlight first option after options order changes with autoHighlight', () => {
      const view = render(
        <Autocomplete
          autoHighlight
          open
          options={['pediatric ent', 'pediatric flu', 'pediatrician', 'pediatric cough']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(screen.getByRole('listbox'), 'pediatric ent');
      view.setProps({
        options: ['pediatrician', 'pediatric ent', 'pediatric flu', 'pediatric cough'],
      });
      checkHighlightIs(screen.getByRole('listbox'), 'pediatrician');
    });

    it('should auto highlight first option when no match with input value with autoHighlight', () => {
      render(
        <Autocomplete
          open
          autoHighlight
          options={['1', '2', '3', '4']}
          value="5"
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(screen.getByRole('listbox'), '1');
    });

    it('should auto highlight first option of rest after selecting an option with autoHighlight and filterSelectedOptions', () => {
      render(
        <Autocomplete
          open
          autoHighlight
          options={['1', '2', '3', '4']}
          renderInput={(params) => <TextField {...params} autoFocus />}
          filterSelectedOptions
          disableCloseOnSelect
        />,
      );

      const textbox = screen.getByRole('combobox');

      checkHighlightIs(screen.getByRole('listbox'), '1');
      fireEvent.keyDown(textbox, { key: 'Enter' });
      checkHighlightIs(screen.getByRole('listbox'), '2');
    });
  });

  describe('prop: resetHighlightOnMouseLeave', () => {
    it('keeps the mouse-created highlight when the prop uses its default value', async () => {
      const { user } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      await user.click(textbox);
      const optionTwo = screen.getByRole('option', { name: 'two' });

      await user.pointer({ target: optionTwo });
      expect(getActiveDescendant(textbox)).to.equal(optionTwo);

      await user.pointer({ target: textbox });

      expect(getActiveDescendant(textbox)).to.equal(optionTwo);
    });

    it('clears a mouse-created highlight when the mouse leaves the listbox', async () => {
      const { user } = render(
        <Autocomplete
          resetHighlightOnMouseLeave
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      await user.click(textbox);
      const optionTwo = screen.getByRole('option', { name: 'two' });

      await user.pointer({ target: optionTwo });
      expect(getActiveDescendant(textbox)).to.equal(optionTwo);

      await user.pointer({ target: textbox });

      expect(getActiveDescendant(textbox)).to.equal(null);
    });

    it('clears the mouse-created highlight when slotProps.listbox.onMouseLeave is provided', async () => {
      const handleListboxMouseLeave = spy();
      const { user } = render(
        <Autocomplete
          resetHighlightOnMouseLeave
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ listbox: { onMouseLeave: handleListboxMouseLeave } }}
        />,
      );

      const textbox = screen.getByRole('combobox');
      await user.click(textbox);
      const optionTwo = screen.getByRole('option', { name: 'two' });

      await user.pointer({ target: optionTwo });
      expect(getActiveDescendant(textbox)).to.equal(optionTwo);

      await user.pointer({ target: textbox });

      expect(handleListboxMouseLeave.callCount).to.equal(1);
      expect(getActiveDescendant(textbox)).to.equal(null);
    });

    it('keeps a keyboard-created highlight when the mouse leaves the listbox', async () => {
      const { user } = render(
        <Autocomplete
          resetHighlightOnMouseLeave
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      await user.click(textbox);
      await user.keyboard('{ArrowDown}');

      const optionOne = screen.getByRole('option', { name: 'one' });
      expect(getActiveDescendant(textbox)).to.equal(optionOne);

      await user.pointer({ target: screen.getByRole('listbox') });
      await user.pointer({ target: textbox });

      expect(getActiveDescendant(textbox)).to.equal(optionOne);
    });

    it('starts keyboard navigation from the first option after clearing a mouse-created highlight', async () => {
      const { user } = render(
        <Autocomplete
          resetHighlightOnMouseLeave
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      await user.click(textbox);
      await user.pointer({ target: screen.getByRole('option', { name: 'two' }) });
      await user.pointer({ target: textbox });

      expect(getActiveDescendant(textbox)).to.equal(null);

      await user.keyboard('{ArrowDown}');

      expect(getActiveDescendant(textbox)).to.equal(screen.getByRole('option', { name: 'one' }));
    });

    it('selects the typed free solo value on Enter after clearing a mouse-created highlight', async () => {
      const handleChange = spy();
      const { user } = render(
        <Autocomplete
          resetHighlightOnMouseLeave
          freeSolo
          onChange={handleChange}
          options={['The Shawshank Redemption', 'The Godfather']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      await user.type(textbox, 'The');
      await user.pointer({ target: screen.getByRole('option', { name: 'The Godfather' }) });
      await user.pointer({ target: textbox });
      await user.keyboard('{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('The');
    });

    it.skipIf(isFirefox)(
      'preserves listbox scroll position when clearing a mouse-created highlight',
      async () => {
        const { user } = render(
          <Autocomplete
            resetHighlightOnMouseLeave
            options={['one', 'two', 'three', 'four', 'five', 'six', 'seven']}
            renderInput={(params) => <TextField {...params} />}
            slotProps={{ listbox: { style: { maxHeight: '100px', overflow: 'auto' } } }}
          />,
        );

        const textbox = screen.getByRole('combobox');
        await user.click(textbox);
        const listbox = screen.getByRole('listbox');
        listbox.scrollTop = 50;

        await user.pointer({ target: screen.getByRole('option', { name: 'five' }) });
        await user.pointer({ target: textbox });

        expect(getActiveDescendant(textbox)).to.equal(null);
        expect(listbox.scrollTop).to.equal(50);
      },
    );
  });

  describe('highlight synchronisation', () => {
    // https://github.com/mui/material-ui/issues/48177
    it('should restore the first selected option when reopening the popup with keyboard in multiple mode', async () => {
      const { user } = render(
        <Autocomplete
          multiple
          defaultValue={['one', 'two']}
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      await user.keyboard('{ArrowDown}');
      let listbox = screen.getByRole('listbox');
      checkHighlightIs(listbox, 'one');

      await user.keyboard('{ArrowDown}');
      checkHighlightIs(listbox, 'two');

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).to.equal(null);

      await user.keyboard('{ArrowDown}');
      listbox = screen.getByRole('listbox');

      checkHighlightIs(listbox, 'one');
      const focusedOption = listbox.querySelector(`.${classes.focused}`);
      expect(focusedOption).not.to.equal(null);
      expect(getActiveDescendant(textbox)).to.equal(focusedOption);
    });

    it('should restore the first selected option when reopening the popup with mouse in multiple mode', async () => {
      const { user } = render(
        <Autocomplete
          multiple
          defaultValue={['one', 'two']}
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      await user.click(textbox);
      let listbox = screen.getByRole('listbox');
      checkHighlightIs(listbox, 'one');

      await user.keyboard('{ArrowDown}');
      checkHighlightIs(listbox, 'two');

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).to.equal(null);

      await user.click(textbox);
      listbox = screen.getByRole('listbox');

      checkHighlightIs(listbox, 'one');
      const focusedOption = listbox.querySelector(`.${classes.focused}`);
      expect(focusedOption).not.to.equal(null);
      expect(getActiveDescendant(textbox)).to.equal(focusedOption);
    });

    it('should keep Enter aligned with the restored highlight when reopening the popup in multiple mode', async () => {
      const handleChange = spy();
      const { user } = render(
        <Autocomplete
          multiple
          defaultValue={['one', 'two']}
          onChange={handleChange}
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Escape}');
      await user.keyboard('{ArrowDown}');

      const listbox = screen.getByRole('listbox');
      checkHighlightIs(listbox, 'one');

      await user.keyboard('{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['two']);
      expect(handleChange.args[0][2]).to.equal('removeOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: 'one' });
    });

    it('should keep aria-activedescendant in sync when the highlighted option moves to a new index', async () => {
      const view = render(
        <Autocomplete
          open
          options={[{ label: 'one' }, { label: 'two' }]}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const { user } = view;
      const textbox = screen.getByRole('combobox');
      let listbox = screen.getByRole('listbox');

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      checkHighlightIs(listbox, 'two');
      let focusedOption = listbox.querySelector(`.${classes.focused}`);
      expect(focusedOption).not.to.equal(null);
      expect(getActiveDescendant(textbox)).to.equal(focusedOption);

      view.setProps({
        options: [{ label: 'zero' }, { label: 'one' }, { label: 'two' }, { label: 'three' }],
      });

      listbox = screen.getByRole('listbox');
      checkHighlightIs(listbox, 'two');
      focusedOption = listbox.querySelector(`.${classes.focused}`);
      expect(focusedOption).not.to.equal(null);
      expect(getActiveDescendant(textbox)).to.equal(focusedOption);
    });

    it('should not update the highlight when multiple open and value change', () => {
      const view = render(
        <Autocomplete
          value={['two']}
          multiple
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(screen.getByRole('listbox'), 'two');
      view.setProps({
        value: [],
      });
      checkHighlightIs(screen.getByRole('listbox'), 'two');
    });
  });

  describe('prop: limitTags', () => {
    it('show all items on focus', () => {
      const view = render(
        <Autocomplete
          multiple
          limitTags={2}
          options={['one', 'two', 'three']}
          defaultValue={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />,
      );

      expect(view.container.textContent).to.equal('onetwo+1');
      // include hidden clear button because JSDOM thinks it's visible
      expect(screen.getAllByRole('button', { hidden: true })).to.have.lengthOf(4);

      act(() => {
        screen.getByRole('combobox').focus();
      });
      expect(view.container.textContent).to.equal('onetwothree');
      // Depending on the subset of components used in this test run the computed `visibility` changes in JSDOM.
      if (!isJsdom()) {
        expect(screen.getAllByRole('button', { hidden: false })).to.have.lengthOf(5);
      }
    });

    it('show 0 item on close when set 0 to limitTags', () => {
      const view = render(
        <Autocomplete
          multiple
          limitTags={0}
          options={['one', 'two', 'three']}
          defaultValue={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />,
      );

      expect(view.container.textContent).to.equal('+3');
      // include hidden clear button because JSDOM thinks it's visible
      expect(screen.getAllByRole('button', { hidden: true })).to.have.lengthOf(2);

      act(() => {
        screen.getByRole('combobox').focus();
      });
      expect(view.container.textContent).to.equal('onetwothree');
      // Depending on the subset of components used in this test run the computed `visibility` changes in JSDOM.
      if (!isJsdom()) {
        expect(screen.getAllByRole('button', { hidden: false })).to.have.lengthOf(5);
      }
    });
  });

  describe('prop: filterSelectedOptions', () => {
    it('clears the highlight when the highlighted selected option is filtered out', () => {
      render(
        <Autocomplete
          filterSelectedOptions
          openOnFocus
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowUp' });
      checkHighlightIs(screen.getByRole('listbox'), 'three');
      fireEvent.keyDown(textbox, { key: 'Enter' }); // selects the last option (three)

      act(() => {
        textbox.blur();
        textbox.focus(); // opens the listbox again
      });
      checkHighlightIs(screen.getByRole('listbox'), null);
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
      const textbox = screen.getByRole('combobox');

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
      const textbox = screen.getByRole('combobox');

      fireEvent.change(textbox, { target: { value: 't' } });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      act(() => {
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

    it('should add new value when autoSelect & freeSolo & autoHighlight on blur', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          autoSelect
          freeSolo
          autoHighlight
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
      expect(handleChange.args[0][1]).to.equal('a');
    });

    it('should prefer typed text over a mouse-hovered option on blur with freeSolo', async () => {
      const handleChange = spy();
      const options = ['The Shawshank Redemption', 'The Godfather'];
      const { user } = render(
        <Autocomplete
          autoSelect
          freeSolo
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.type(screen.getByRole('combobox'), 'The');
      await user.pointer({ target: screen.getByRole('option', { name: 'The Godfather' }) });
      await user.tab();

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('The');
    });

    it('should not select a touch-highlighted option on blur', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          autoSelect
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.pointer({
        keys: '[TouchA>]',
        target: screen.getByRole('option', { name: 'two' }),
      });
      await user.tab();

      expect(handleChange.callCount).to.equal(0);
    });

    it('should not select a mouse-hovered option on blur even if already highlighted', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          autoSelect
          autoHighlight
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      // First option is programmatically highlighted by autoHighlight.
      // Hovering it should still mark it as mouse-initiated and prevent
      // autoSelect from committing it on blur.
      await user.pointer({ target: screen.getByRole('option', { name: 'one' }) });
      await user.tab();

      expect(handleChange.callCount).to.equal(0);
    });

    it('should not select a mouse-hovered option on blur', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          autoSelect
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.pointer({ target: screen.getByRole('option', { name: 'two' }) });
      await user.tab();

      expect(handleChange.callCount).to.equal(0);
    });

    it('should not select a mouse-hovered option on outside click blur', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <React.Fragment>
          <Autocomplete
            autoSelect
            openOnFocus
            options={options}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />
          <button type="button">Outside</button>
        </React.Fragment>,
      );

      await user.pointer({ target: screen.getByRole('option', { name: 'two' }) });
      await user.click(screen.getByRole('button', { name: 'Outside' }));

      expect(handleChange.callCount).to.equal(0);
    });

    it('should select a keyboard-highlighted option on blur', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          autoSelect
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.keyboard('{ArrowDown}');
      await user.tab();

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('one');
    });

    it('should select the first option on blur when autoHighlight is true', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          autoSelect
          autoHighlight
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.tab();

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('one');
    });
  });

  describe('prop: multiple', () => {
    it('should not crash', () => {
      render(
        <Autocomplete
          openOnFocus
          options={[]}
          renderInput={(params) => <TextField {...params} />}
          multiple
        />,
      );
      const input = screen.getByRole('combobox');

      act(() => {
        input.focus();
        document.activeElement.blur();
        input.focus();
      });
    });

    it('should remove the last option', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          options={[]}
          defaultValue={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          multiple
        />,
      );
      fireEvent.click(screen.getAllByTestId('CancelIcon')[1]);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[0]]);
    });

    it('navigates between different tags', async () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { user } = render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');
      const [firstSelectedValue, secondSelectedValue] = screen.getAllByRole('button');

      await user.keyboard('{ArrowLeft}');
      expect(secondSelectedValue).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(firstSelectedValue).toHaveFocus();

      await user.keyboard('{Backspace}');
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[1]]);
      expect(textbox).toHaveFocus();
    });

    it('deletes a focused tag when pressing the delete key', async () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { user } = render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');
      const [firstSelectedValue, secondSelectedValue] = screen.getAllByRole('button');

      // check that no tags get deleted when the tag is not a focused tag
      await user.keyboard('{Delete}');

      expect(handleChange.callCount).to.equal(0);
      expect(textbox).toHaveFocus();

      // expect on focused tag to delete when pressing delete key
      await user.keyboard('{ArrowLeft}');

      expect(secondSelectedValue).toHaveFocus();

      await user.keyboard('{ArrowLeft}');

      expect(firstSelectedValue).toHaveFocus();

      await user.keyboard('{Delete}');
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[1]]);
      expect(textbox).toHaveFocus();
    });

    it('can delete one tag after another', async () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { user } = render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');

      await user.keyboard('{ArrowLeft}');
      await user.keyboard('{Backspace}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[0]]);
      expect(textbox).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      await user.keyboard('{Backspace}');

      expect(handleChange.callCount).to.equal(2);
      expect(handleChange.args[1][1]).to.deep.equal([]);
      expect(textbox).toHaveFocus();
    });

    it('should remove only the focused chip when pressing the delete key', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');
      const firstSelectedValue = screen.getByRole('button', { name: 'one' });

      act(() => {
        firstSelectedValue.focus();
      });
      await user.keyboard('{Delete}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['two', 'three']);
      expect(textbox).toHaveFocus();
    });

    it('should remove only the focused chip when pressing the backspace key', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');
      const firstSelectedValue = screen.getByRole('button', { name: 'one' });

      act(() => {
        firstSelectedValue.focus();
      });
      await user.keyboard('{Backspace}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['two', 'three']);
      expect(textbox).toHaveFocus();
    });

    it('should suppress a spurious Backspace on the input immediately after removing a focused chip', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');
      const firstSelectedValue = screen.getByRole('button', { name: 'one' });

      await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}');

      // Removing the focused chip sets the suppression flag.
      // Use fireEvent (not user.keyboard) so the setTimeout(0) auto-clear
      // is not flushed before the next keydown.
      fireEvent.keyDown(firstSelectedValue, { key: 'Backspace' });

      expect(handleChange.callCount).to.equal(1);
      expect(textbox).toHaveFocus();

      // Simulate the spurious Backspace VoiceOver synthesises on the input
      // right after focus returns to it — should be suppressed.
      fireEvent.keyDown(textbox, { key: 'Backspace' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['two', 'three']);
    });

    it('should keep listbox open on pressing left or right keys when inputValue is not empty', () => {
      const handleClose = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          options={options}
          onClose={handleClose}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
          inputValue="tw"
        />,
      );

      const textbox = screen.getByRole('combobox');

      fireEvent.mouseDown(textbox);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });

      expect(handleClose.callCount).to.equal(0);
      expect(textbox).to.have.attribute('aria-expanded', 'true');
    });

    it('should close listbox on pressing left or right keys when inputValue is empty', () => {
      const handleClose = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          options={options}
          onClose={handleClose}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
          inputValue=""
        />,
      );

      const textbox = screen.getByRole('combobox');

      fireEvent.mouseDown(textbox);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });

      expect(handleClose.callCount).to.equal(1);
      expect(textbox).to.have.attribute('aria-expanded', 'false');
    });

    it('should not crash if a tag is missing', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          defaultValue={options}
          options={options}
          value={options}
          renderValue={(value, getItemProps) =>
            value
              .filter((x, index) => index === 1)
              .map((option, index) => {
                const { key, ...tagProps } = getItemProps({ index });
                return <Chip key={key} label={option.title} {...tagProps} />;
              })
          }
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');
      const [firstSelectedValue] = screen.getAllByRole('button');

      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      // skip value "two"
      expect(firstSelectedValue).toHaveFocus();

      fireEvent.keyDown(firstSelectedValue, { key: 'ArrowRight' });
      expect(textbox).toHaveFocus();
    });

    it('should not call onChange function for duplicate values', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          freeSolo
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.change(textbox, { target: { value: 'two' } });
      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(0);

      fireEvent.change(textbox, { target: { value: 'three' } });
      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });

    it('should use isOptionEqualToValue to deduplicate multiple freeSolo values without getOptionValue', async () => {
      const handleChange = spy();
      const { user } = render(
        <Autocomplete
          multiple
          freeSolo
          defaultValue={['Foo']}
          options={[]}
          isOptionEqualToValue={(option, value) => option.toLowerCase() === value.toLowerCase()}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      await user.type(screen.getByRole('combobox'), 'foo');
      await user.keyboard('{Enter}');

      expect(handleChange.callCount).to.equal(0);
      expect(screen.getAllByRole('button', { name: /^foo$/i })).to.have.lengthOf(1);
      expect(screen.getByRole('button', { name: 'Foo' })).to.have.text('Foo');
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

      expect(screen.getByRole('combobox')).to.have.property('value', '');
    });

    // Enable once https://github.com/jsdom/jsdom/issues/2898 is resolved
    it.skipIf(isJsdom())(
      'should fail validation if a required field has no value',
      async function test() {
        const handleSubmit = spy((event) => event.preventDefault());
        const view = render(
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

        await view.user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(handleSubmit.callCount).to.equal(0);
      },
    );

    // Enable once https://github.com/jsdom/jsdom/issues/2898 is resolved
    // The test is passing in JSDOM but form validation is buggy in JSDOM so we rather skip than have false confidence
    // Unclear how native Constraint validation can be enabled for `multiple`
    it.skipIf(isJsdom())(
      'should fail validation if a required field has a value',
      async function test() {
        const handleSubmit = spy((event) => event.preventDefault());
        const view = render(
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

        await view.user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(handleSubmit.callCount).to.equal(0);
      },
    );

    it('should move focus to the last chip with ArrowLeft only when caret is at the start when multiple', () => {
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          multiple
          options={options}
          defaultValue={[options[0], options[1]]}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      const [chipOne, chipTwo] = screen.getAllByRole('button');

      // Type something so the input has content.
      fireEvent.change(textbox, { target: { value: 'foo' } });

      // Caret not at start: ArrowLeft should just move the caret, not focus the chip.
      textbox.setSelectionRange(2, 2);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      expect(textbox).toHaveFocus();

      // Caret at start: ArrowLeft should now move focus to the second chip.
      textbox.setSelectionRange(0, 0);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      expect(chipTwo).toHaveFocus();

      // ArrowLeft should now move focus to the first chip.
      fireEvent.keyDown(chipTwo, { key: 'ArrowLeft' });
      expect(chipOne).toHaveFocus();
    });

    it('should clear freeSolo input when moving focus from input to chip with ArrowLeft and not restore it on ArrowRight', () => {
      const options = ['one', 'two'];
      render(
        <Autocomplete
          multiple
          freeSolo
          options={options}
          defaultValue={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      const lastChip = screen.getByRole('button', { name: 'two' });

      // Type some freeSolo text
      fireEvent.change(textbox, { target: { value: 'foo' } });
      expect(textbox).to.have.property('value', 'foo');

      // Caret at start: ArrowLeft should move focus to the last chip
      textbox.setSelectionRange(0, 0);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      expect(lastChip).toHaveFocus();

      // Input text should be cleared and stay cleared
      expect(textbox).to.have.property('value', '');

      // ArrowRight should move focus back to the input, without restoring the old text
      fireEvent.keyDown(lastChip, { key: 'ArrowRight' });
      expect(textbox).toHaveFocus();
      expect(textbox).to.have.property('value', '');
    });
  });

  it('should trigger a form expectedly', () => {
    const handleSubmit = spy();
    function Test(props) {
      const { key, ...other } = props;
      return (
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
            key={key}
            {...other}
          />
        </div>
      );
    }
    const view = render(<Test />);
    let textbox = screen.getByRole('combobox');

    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(1);

    fireEvent.change(textbox, { target: { value: 'o' } });
    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(1);

    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(2);

    view.setProps({ key: 'test-2', multiple: true, freeSolo: true });
    textbox = screen.getByRole('combobox');

    fireEvent.change(textbox, { target: { value: 'o' } });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(2);

    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(3);

    view.setProps({ key: 'test-3', freeSolo: true });
    textbox = screen.getByRole('combobox');

    fireEvent.change(textbox, { target: { value: 'o' } });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(4);
  });

  it('should not open the autocomplete popup when deleting chips', async () => {
    const view = render(
      <Autocomplete
        multiple
        options={['one', 'two', 'three']}
        defaultValue={['one']}
        renderInput={(params) => <TextField {...params} autoFocus />}
      />,
    );

    expect(screen.queryByRole('listbox')).to.equal(null);

    const chip = screen.queryByText('one').parentElement;
    expect(chip).not.to.equal(null);

    // Delete the chip
    await view.user.click(chip.getElementsByClassName(chipClasses.deleteIcon)[0]);

    expect(screen.queryByText('one')).to.equal(null);
    expect(screen.queryByRole('listbox')).to.equal(null);
  });

  it('should toggle the autocomplete popup when clicking the popup indicator', async () => {
    const view = render(
      <Autocomplete
        multiple
        options={['One', 'Two', 'Three']}
        renderInput={(params) => <TextField {...params} autoFocus />}
      />,
    );

    expect(screen.queryByRole('listbox')).to.equal(null);

    const popupIndicator = screen.getByRole('button', { name: 'Open' });
    await view.user.click(popupIndicator);

    expect(screen.queryByRole('listbox')).not.to.equal(null);

    await view.user.click(popupIndicator);

    expect(screen.queryByRole('listbox')).to.equal(null);
  });

  describe('prop: getOptionDisabled', () => {
    it('should prevent the disabled option to trigger actions but allow focus with disabledItemsFocusable', () => {
      const handleSubmit = spy();
      const handleChange = spy();
      render(
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
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      options = screen.getAllByRole('option');
      expect(getActiveDescendant(textbox)).to.equal(options[1]);

      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleSubmit.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(0);

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      options = screen.getAllByRole('option');
      expect(getActiveDescendant(textbox)).to.equal(options[0]);

      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleSubmit.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(1);
    });

    it('should skip disabled options when navigating via keyboard', () => {
      render(
        <Autocomplete
          getOptionDisabled={(option) => option === 'two'}
          openOnFocus
          options={['one', 'two', 'three']}
          renderInput={(props) => <TextField {...props} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'one');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'three');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'one');
    });

    it('should skip disabled options at the end of the list when navigating via keyboard', () => {
      render(
        <Autocomplete
          getOptionDisabled={(option) => option === 'three' || option === 'four'}
          openOnFocus
          options={['one', 'two', 'three', 'four']}
          renderInput={(props) => <TextField {...props} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'one');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'two');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'one');
    });

    it('should skip the first and last disabled options in the list when navigating via keyboard', () => {
      render(
        <Autocomplete
          getOptionDisabled={(option) => option === 'one' || option === 'five'}
          openOnFocus
          options={['one', 'two', 'three', 'four', 'five']}
          renderInput={(props) => <TextField {...props} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'two');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'four');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), 'two');
      fireEvent.keyDown(textbox, { key: 'ArrowUp' });
      checkHighlightIs(screen.getByRole('listbox'), 'four');
    });

    it('should not focus any option when all the options are disabled', () => {
      render(
        <Autocomplete
          getOptionDisabled={() => true}
          openOnFocus
          options={['one', 'two', 'three']}
          renderInput={(props) => <TextField {...props} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(screen.getByRole('listbox'), null);
      fireEvent.keyDown(textbox, { key: 'ArrowUp' });
      checkHighlightIs(screen.getByRole('listbox'), null);
    });
  });

  describe('WAI-ARIA conforming markup', () => {
    it('when closed', () => {
      render(<Autocomplete options={[]} renderInput={(params) => <TextField {...params} />} />);

      const textbox = screen.getByRole('combobox');
      expect(textbox).to.have.attribute('aria-expanded', 'false');
      // reflected aria-haspopup is `listbox`
      // this assertion can fail if the value is `listbox`
      expect(textbox).not.to.have.attribute('aria-haspopup');

      // reflected aria-multiline has to be false i.e. not present or false
      expect(textbox).not.to.have.attribute('aria-multiline');
      expect(textbox).to.have.attribute('aria-autocomplete', 'list');
      expect(getActiveDescendant(textbox), 'no option is focused when opened').to.equal(null);

      // listbox is not only inaccessible but not in the DOM
      const listbox = screen.queryByRole('listbox', { hidden: true });
      expect(listbox).to.equal(null);

      const buttons = screen.getAllByRole('button', { hidden: true });

      expect(buttons[0]).toHaveAccessibleName('Open');
      expect(buttons[0]).to.have.attribute('title', 'Open');
      expect(buttons).to.have.length(1);
      expect(buttons[0], 'button is not in tab order').to.have.property('tabIndex', -1);
    });

    it('when open', () => {
      render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      expect(textbox).to.have.attribute('aria-expanded', 'true');

      const listbox = screen.getByRole('listbox');
      expect(listbox.tagName.toLowerCase()).to.equal('ul');
      expect(textbox).to.have.attribute('aria-controls', listbox.getAttribute('id'));
      expect(getActiveDescendant(textbox), 'no option is focused when opened').to.equal(null);

      const options = screen.getAllByRole('option');
      expect(options).to.have.length(2);
      options.forEach((option) => {
        expect(listbox).to.contain(option);
      });

      const buttons = screen.getAllByRole('button', { hidden: true });
      expect(buttons[0]).toHaveAccessibleName('Close');
      expect(buttons[0]).to.have.attribute('title', 'Close');
      expect(buttons).to.have.length(1);
      expect(buttons[0], 'button is not in tab order').to.have.property('tabIndex', -1);
    });

    it('should add and remove aria-activedescendant', () => {
      const view = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      expect(getActiveDescendant(textbox), 'no option is focused when opened').to.equal(null);
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      const options = screen.getAllByRole('option');
      expect(getActiveDescendant(textbox)).to.equal(options[0]);
      view.setProps({ open: false });
      expect(getActiveDescendant(textbox), 'no option is focused when opened').to.equal(null);
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
      const view = render(
        <Autocomplete
          onOpen={handleOpen}
          onChange={handleChange}
          open={false}
          options={['one', 'two']}
          value="one"
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const clear = view.container.querySelector('button');
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
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key });

        // first from focus
        expect(handleOpen.callCount).to.equal(2);
        expect(getActiveDescendant(textbox)).to.equal(null);
      });
    });

    it('should open popup when clicked on the root element', () => {
      const handleOpen = spy();
      const ref = React.createRef();
      render(
        <Autocomplete
          onOpen={handleOpen}
          options={['one']}
          renderInput={(params) => (
            <TextField
              {...params}
              slotProps={{ ...params.slotProps, input: { ...params.slotProps.input, ref } }}
            />
          )}
        />,
      );

      fireEvent.mouseDown(ref.current);
      expect(handleOpen.callCount).to.equal(1);
    });

    it('should not focus the input when clicking helper text', async () => {
      const { user } = render(
        <Autocomplete
          options={['one']}
          renderInput={(params) => <TextField {...params} helperText="Some help" />}
        />,
      );

      await user.click(screen.getByText('Some help'));
      expect(screen.getByRole('combobox')).not.toHaveFocus();
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

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

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

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([]);
    });

    it('should not suppress focus events after clearing with Escape', async () => {
      const handleOpen = spy();
      const { user } = render(
        <Autocomplete
          clearOnEscape
          openOnFocus
          multiple
          value={['one']}
          options={['one', 'two']}
          onChange={() => {}}
          onOpen={handleOpen}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      // Opening on initial focus
      expect(handleOpen.callCount).to.equal(1);

      // Close the popup first so Escape takes the clear path
      await user.keyboard('{Escape}');
      // Popup was open, so first Escape closes it
      handleOpen.resetHistory();

      // Now Escape should clear (popup is closed, value is non-empty)
      await user.keyboard('{Escape}');

      // Focus is still on the input
      expect(textbox).toHaveFocus();

      // Blur and re-focus: onOpen should be called (ignoreFocus was NOT set)
      act(() => {
        textbox.blur();
      });
      act(() => {
        textbox.focus();
      });
      expect(handleOpen.callCount).to.equal(1);
    });

    it('should clear on escape if rendering single value', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          onChange={handleChange}
          clearOnEscape
          value="one"
          options={['one', 'two']}
          renderValue={(value, getItemProps) => {
            return <Chip label={value} {...getItemProps()} />;
          }}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(null);
      expect(handleChange.args[0][2]).to.deep.equal('clear');
    });
  });

  describe('prop: clearOnBlur', () => {
    it('should clear on blur', () => {
      render(
        <Autocomplete
          clearOnBlur
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      fireEvent.change(textbox, { target: { value: 'test' } });
      expect(document.activeElement.value).to.equal('test');
      act(() => {
        textbox.blur();
      });
      expect(textbox.value).to.equal('');
    });

    it('should not clear on blur', () => {
      render(
        <Autocomplete
          clearOnBlur={false}
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      fireEvent.change(textbox, { target: { value: 'test' } });
      expect(document.activeElement.value).to.equal('test');
      act(() => {
        textbox.blur();
      });
      expect(textbox.value).to.equal('test');
    });

    it('should not clear on blur with `multiple` enabled', () => {
      render(
        <Autocomplete
          multiple
          clearOnBlur={false}
          options={['one', 'two']}
          defaultValue={['one']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      fireEvent.change(textbox, { target: { value: 'test' } });
      expect(document.activeElement.value).to.equal('test');
      act(() => {
        textbox.blur();
      });
      expect(textbox.value).to.equal('test');
    });
  });

  describe('when popup open', () => {
    it('closes the popup if Escape is pressed', () => {
      const handleClose = spy();
      render(
        <Autocomplete
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
      expect(handleClose.callCount).to.equal(1);
    });

    it('does not close the popup when option selected if Control is pressed', () => {
      const handleClose = spy();
      render(
        <Autocomplete
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const options = screen.getAllByRole('option');
      fireEvent.click(options[0], { ctrlKey: true });
      expect(handleClose.callCount).to.equal(0);
    });

    it('does not close the popup when option selected if Meta is pressed', () => {
      const handleClose = spy();
      render(
        <Autocomplete
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const options = screen.getAllByRole('option');
      fireEvent.click(options[0], { metaKey: true });
      expect(handleClose.callCount).to.equal(0);
    });

    it('moves focus to the first option on ArrowDown', () => {
      render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      expect(getActiveDescendant(textbox)).to.equal(screen.getAllByRole('option')[0]);
    });

    it('moves focus to the last option on ArrowUp', () => {
      render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowUp' });
      const options = screen.getAllByRole('option');
      expect(getActiveDescendant(textbox)).to.equal(options[options.length - 1]);
    });

    it('should ignore keydown event until the IME is confirmed', function test() {
      // TODO: Often times out in Firefox 78.
      // Is this slow because of testing-library or because of the implementation?
      this?.timeout?.(4000);

      render(
        <Autocomplete
          open
          options={['가1', '가2']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      const listbox = screen.getByRole('listbox');
      // Actual Behavior when "가" (Korean) is entered and press the arrow down key once on macOS/Chrome
      fireEvent.change(textbox, { target: { value: '가' } });
      fireEvent.keyDown(textbox, { key: 'ArrowDown', keyCode: 229 });
      fireEvent.keyDown(textbox, { key: 'ArrowDown', keyCode: 40 });

      checkHighlightIs(listbox, '가1');
    });
  });

  describe('prop: openOnFocus', () => {
    it('enables open on input focus', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          openOnFocus
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      expect(textbox).to.have.attribute('aria-expanded', 'true');
      expect(textbox).toHaveFocus();

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(textbox).to.have.attribute('aria-expanded', 'false');

      act(() => {
        document.activeElement.blur();
      });

      expect(textbox).to.have.attribute('aria-expanded', 'false');
      expect(textbox).not.toHaveFocus();

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(textbox).to.have.attribute('aria-expanded', 'true');
      expect(textbox).toHaveFocus();

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(textbox).to.have.attribute('aria-expanded', 'false');
    });

    it('does not reopen when window focus is regained', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          openOnFocus
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      expect(textbox).to.have.attribute('aria-expanded', 'true');

      act(() => {
        document.activeElement.blur();
      });
      fireEvent.blur(window);

      expect(textbox).to.have.attribute('aria-expanded', 'false');

      fireEvent.focus(textbox);
      expect(textbox).to.have.attribute('aria-expanded', 'false');

      act(() => {
        document.activeElement.blur();
      });

      fireEvent.focus(textbox);
      expect(textbox).to.have.attribute('aria-expanded', 'true');
    });

    it('should suppress focus events when clearing with the clear button', async () => {
      const handleOpen = spy();
      const { user } = render(
        <Autocomplete
          openOnFocus
          value="one"
          options={['one', 'two']}
          onChange={() => {}}
          onOpen={handleOpen}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      // Opening on initial focus
      expect(handleOpen.callCount).to.equal(1);

      // Close popup
      await user.keyboard('{Escape}');
      handleOpen.resetHistory();

      // Click the clear button
      const clearButton = screen.getByTitle('Clear');
      await user.click(clearButton);

      // onOpen should NOT be called because ignoreFocus is set
      expect(handleOpen.callCount).to.equal(0);
    });
  });

  describe('listbox wrapping behavior', () => {
    it('wraps around when navigating the list by default', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowUp' });

      const options = screen.getAllByRole('option');
      expect(textbox).toHaveFocus();
      expect(getActiveDescendant(textbox)).to.equal(options[options.length - 1]);
    });

    it('selects the first item if on the last item and pressing up by default', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowUp' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      const options = screen.getAllByRole('option');
      expect(textbox).toHaveFocus();
      expect(getActiveDescendant(textbox)).to.equal(options[0]);
    });

    describe('prop: includeInputInList', () => {
      it('considers the textbox the predecessor of the first option when pressing Up', () => {
        render(
          <Autocomplete
            includeInputInList
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowUp' });

        expect(textbox).toHaveFocus();
        expect(getActiveDescendant(textbox)).to.equal(null);
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
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowUp' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });

        expect(textbox).toHaveFocus();
        expect(getActiveDescendant(textbox)).to.equal(null);
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
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowUp' });

        expect(textbox).toHaveFocus();
        expect(getActiveDescendant(textbox)).to.equal(screen.getAllByRole('option')[0]);
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
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowUp' });

        const options = screen.getAllByRole('option');
        expect(textbox).toHaveFocus();
        expect(getActiveDescendant(textbox)).to.equal(options[options.length - 1]);
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
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });

        const options = screen.getAllByRole('option');
        expect(textbox).toHaveFocus();
        expect(getActiveDescendant(textbox)).to.equal(options[options.length - 1]);
      });
    });
  });

  describe('prop: disabled', () => {
    it('should disable the input', () => {
      render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const input = screen.getByRole('combobox');
      expect(input).to.have.property('disabled', true);
    });

    it('should disable the popup button', () => {
      render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(screen.queryByTitle('Open').disabled).to.equal(true);
    });

    it('clicks should not toggle the listbox open state when disabled', () => {
      render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => (
            <TextField
              {...params}
              slotProps={{
                ...params.slotProps,
                input: { ...params.slotProps.input, 'data-testid': 'test-input-root' },
              }}
            />
          )}
        />,
      );
      const textbox = screen.queryByRole('combobox');
      const listbox = screen.queryByRole('listbox', { hidden: true });

      expect(textbox).to.have.attribute('aria-expanded', 'false');
      expect(listbox).to.equal(null);

      const inputBase = screen.getByTestId('test-input-root');
      fireEvent.click(inputBase);

      expect(textbox).to.have.attribute('aria-expanded', 'false');
      expect(listbox).to.equal(null);
    });

    it('mouseup should not toggle the listbox open state when disabled', async () => {
      const view = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = screen.queryByRole('combobox');
      const listbox = screen.queryByRole('listbox', { hidden: true });

      expect(textbox).to.have.attribute('aria-expanded', 'false');
      expect(listbox).to.equal(null);

      // userEvent will fail at releasing MouseLeft if we target the
      // <button> since it has "pointer-events: none"
      const popupIndicator = view.container.querySelector(`.${classes.endAdornment}`);

      await view.user.pointer([
        // this sequence does not work with fireEvent
        // 1. point the cursor somewhere in the textbox and hold down MouseLeft
        { keys: '[MouseLeft>]', target: textbox },
        // 2. move the cursor over the popupIndicator
        { pointerName: 'mouse', target: popupIndicator },
        // 3. release MouseLeft
        { keys: '[/MouseLeft]' },
      ]);

      expect(textbox).to.have.attribute('aria-expanded', 'false');
      expect(listbox).to.equal(null);
    });

    it('should not render the clear button', () => {
      render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(screen.queryByTitle('Clear')).to.equal(null);
    });

    it('should not apply the hasClearIcon class', () => {
      const view = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(view.container.querySelector(`.${classes.root}`)).not.to.have.class(
        classes.hasClearIcon,
      );
      expect(view.container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
    });

    it('should close the popup when disabled is true', () => {
      const view = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      act(() => {
        textbox.focus();
      });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      expect(screen.queryByRole('listbox')).not.to.equal(null);
      view.setProps({ disabled: true });
      expect(screen.queryByRole('listbox')).to.equal(null);
    });

    it('should not crash when autoSelect & freeSolo are set, text is focused & disabled gets truthy', () => {
      const view = render(
        <Autocomplete
          autoSelect
          freeSolo
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
          value="one"
        />,
      );
      const textbox = screen.getByRole('combobox');
      act(() => {
        textbox.focus();
      });
      view.setProps({ disabled: true });
      expect(textbox).toBeVisible();
    });
  });

  describe('prop: disableClearable', () => {
    it('should not render the clear button', () => {
      const view = render(
        <Autocomplete
          disableClearable
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(screen.queryByTitle('Clear')).to.equal(null);
      expect(view.container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
      expect(view.container.querySelector(`.${classes.root}`)).not.to.have.class(
        classes.hasClearIcon,
      );
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
      const textbox = screen.getByRole('combobox');

      expect(() => {
        fireEvent.change(textbox, { target: { value: 'a' } });
        fireEvent.keyDown(textbox, { key: 'Enter' });
      }).toErrorDev([
        'MUI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        'MUI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        'MUI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
        'MUI: The `getOptionLabel` method of Autocomplete returned undefined instead of a string',
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
      const textbox = screen.getByRole('combobox');

      expect(() => {
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'Enter' });
      }).toErrorDev(
        'The component expects a single value to match a given option but found 2 matches.',
      );
    });

    it('warns if isOptionEqualToValue matches multiple freeSolo values without getOptionValue', async () => {
      const { user } = render(
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          defaultValue={['Foo', 'foo']}
          isOptionEqualToValue={(option, value) => option.toLowerCase() === value.toLowerCase()}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      await user.type(screen.getByRole('combobox'), 'FOO');

      await expect(() => user.keyboard('{Enter}')).toErrorDev(
        'MUI: The `isOptionEqualToValue` method of Autocomplete does not handle the arguments correctly.\n' +
          'The component expects a single value to match a given option but found 2 matches.',
      );
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
        const options = screen.getAllByRole('option').map((el) => el.textContent);
        expect(options).to.have.length(7);
        expect(options).to.deep.equal(['A', 'D', 'E', 'B', 'G', 'F', 'C']);
      }).toWarnDev([
        'returns duplicated headers',
        !strictModeDoubleLoggingSuppressed && 'returns duplicated headers',
      ]);
    });

    it('warn if the type of the value is wrong', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Autocomplete.propTypes,
          { multiple: true, value: null, options: [], renderInput: () => null },
          'prop',
          'Autocomplete',
        );
      }).toErrorDev(
        'The Autocomplete expects the `value` prop to be an array when `multiple={true}` or undefined.',
      );
    });

    it('warn if the type of the defaultValue is wrong', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Autocomplete.propTypes,
          { multiple: true, defaultValue: 'wrong-string', options: [], renderInput: () => null },
          'prop',
          'Autocomplete',
        );
      }).toErrorDev(
        'The Autocomplete expects the `defaultValue` prop to be an array when `multiple={true}` or undefined.',
      );
    });
  });

  describe('prop: options', () => {
    it('should keep focus on selected option and not reset to top option when options updated', () => {
      const view = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      const listbox = screen.getByRole('listbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // goes to 'one'
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // goes to 'two'

      checkHighlightIs(listbox, 'two');

      // three option is added and autocomplete re-renders, restore the highlight
      view.setProps({ options: ['one', 'two', 'three'] });
      checkHighlightIs(listbox, 'two');
    });

    it('should keep focus when multiple options are selected and not reset to top option when options updated', () => {
      const view = render(
        <Autocomplete
          open
          multiple
          defaultValue={['one', 'two']}
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      const listbox = screen.getByRole('listbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      checkHighlightIs(listbox, 'three');

      // fourth option is added and autocomplete re-renders, restore the highlight
      view.setProps({ options: ['one', 'two', 'three', 'four'] });
      checkHighlightIs(listbox, 'three');
    });

    it('should keep focus when multiple options are selected by not resetting to the top option when options are updated and when options are provided as objects', () => {
      const view = render(
        <Autocomplete
          open
          multiple
          defaultValue={[{ label: 'one' }]}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          options={[{ label: 'one' }, { label: 'two' }, { label: 'three' }]}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      const listbox = screen.getByRole('listbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      checkHighlightIs(listbox, 'three');

      // fourth option is added and autocomplete re-renders, restore the highlight
      view.setProps({
        options: [{ label: 'one' }, { label: 'two' }, { label: 'three' }, { label: 'four' }],
      });
      checkHighlightIs(listbox, 'three');
    });

    it('should keep focus on selected option when options updates and when options are provided as objects', () => {
      const view = render(
        <Autocomplete
          open
          options={[{ label: 'one' }, { label: 'two' }]}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      const listbox = screen.getByRole('listbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // goes to 'one'
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // goes to 'two'

      checkHighlightIs(listbox, 'two');

      // zero and three options are added and autocomplete re-renders, restore the highlight
      view.setProps({
        options: [{ label: 'zero' }, { label: 'one' }, { label: 'two' }, { label: 'three' }],
      });
      checkHighlightIs(listbox, 'two');

      // check that the highlighted option is still in sync with the internal highlighted index
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // goes to 'three'
      checkHighlightIs(listbox, 'three');
    });

    it('should reset the highlight when the input changed', () => {
      const filterOptions = createFilterOptions({});
      render(
        <Autocomplete
          open
          autoFocus
          autoHighlight
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
          filterOptions={filterOptions}
        />,
      );
      const textbox = screen.getByRole('combobox');
      const listbox = screen.getByRole('listbox');

      fireEvent.change(textbox, { target: { value: 't' } });
      checkHighlightIs(listbox, 'two');

      fireEvent.change(textbox, { target: { value: '' } });
      checkHighlightIs(listbox, 'one');

      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(textbox).has.value('one');
    });

    it("should reset the highlight when previously highlighted option doesn't exists in new options", () => {
      const view = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      const listbox = screen.getByRole('listbox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // goes to 'one'
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // goes to 'two'

      checkHighlightIs(listbox, 'two');

      // Options are updated and autocomplete re-renders; reset the highlight since two doesn't exist in the new options.
      view.setProps({ options: ['one', 'three', 'four'] });
      checkHighlightIs(listbox, null);
    });

    it('should not select undefined', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          onChange={handleChange}
          openOnFocus
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const input = screen.getByRole('combobox');
      fireEvent.click(input);

      const listbox = screen.getByRole('listbox');
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
      render(
        <Autocomplete
          onChange={handleChange}
          openOnFocus
          options={options}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const input = screen.getByRole('combobox');
      fireEvent.click(input);

      const listbox = screen.getByRole('listbox');
      const htmlOptions = listbox.querySelectorAll('li');

      expect(htmlOptions[0].innerHTML).to.equal('one');
    });

    it("should display a 'no options' message if no options are available", () => {
      render(
        <Autocomplete open options={[]} renderInput={(params) => <TextField {...params} />} />,
      );

      const textbox = screen.getByRole('combobox');
      expect(textbox).to.have.attribute('aria-expanded', 'false');
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
      const textbox = screen.getByRole('combobox');

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
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[0]]);
      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });
  });

  describe('prop: autoComplete', () => {
    it('should add a completion string for the auto highlighted option while typing', async () => {
      const { user } = render(
        <Autocomplete
          autoComplete
          autoHighlight
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      await user.type(textbox, 'o');

      expect(textbox.value).to.equal('one');
      expect(textbox.selectionStart).to.equal(1);
      expect(textbox.selectionEnd).to.equal(3);

      await user.keyboard('n');

      expect(textbox.value).to.equal('one');
      expect(textbox.selectionStart).to.equal(2);
      expect(textbox.selectionEnd).to.equal(3);
    });

    it('should not add a completion string when deleting', async () => {
      const { user } = render(
        <Autocomplete
          autoComplete
          autoHighlight
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      await user.type(textbox, 'on');
      expect(textbox.value).to.equal('one');

      await user.keyboard('{Backspace}');
      expect(textbox.value).to.equal('on');

      await user.keyboard('{Backspace}');
      expect(textbox.value).to.equal('o');
    });

    it('add a completion string', () => {
      render(
        <Autocomplete
          autoComplete
          openOnFocus
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

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
      render(
        <Autocomplete
          openOnFocus
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      expect(textbox).to.have.attribute('aria-expanded', 'false');
      fireEvent.mouseDown(textbox);
      expect(textbox).to.have.attribute('aria-expanded', 'true');
      fireEvent.mouseDown(textbox);
      expect(textbox).to.have.attribute('aria-expanded', 'false');
    });

    it('selects all the first time', () => {
      render(
        <Autocomplete
          value="one"
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      fireEvent.click(textbox);
      expect(textbox.selectionStart).to.equal(0);
      expect(textbox.selectionEnd).to.equal(3);
    });

    it('should focus the input when clicking on the open action', () => {
      render(
        <Autocomplete
          value="one"
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      fireEvent.click(textbox);
      expect(textbox).toHaveFocus();

      act(() => {
        textbox.blur();
      });
      fireEvent.click(screen.queryByTitle('Open'));

      expect(textbox).toHaveFocus();
    });

    it('should maintain list box open clicking on input when it is not empty', () => {
      render(
        <Autocomplete options={['one']} renderInput={(params) => <TextField {...params} />} />,
      );

      const textbox = screen.getByRole('combobox');

      expect(textbox).to.have.attribute('aria-expanded', 'false');
      fireEvent.mouseDown(textbox); // Open listbox
      expect(textbox).to.have.attribute('aria-expanded', 'true');
      const options = screen.getAllByRole('option');
      fireEvent.click(options[0]);
      expect(textbox).to.have.attribute('aria-expanded', 'false');
      fireEvent.mouseDown(textbox); // Open listbox
      expect(textbox).to.have.attribute('aria-expanded', 'true');
      fireEvent.mouseDown(textbox); // Remain open listbox
      expect(textbox).to.have.attribute('aria-expanded', 'true');
    });

    it('should not toggle list box', () => {
      render(
        <Autocomplete
          value="one"
          options={['one']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      expect(textbox).to.have.attribute('aria-expanded', 'false');
      fireEvent.mouseDown(textbox);
      expect(textbox).to.have.attribute('aria-expanded', 'true');
      fireEvent.mouseDown(textbox);
      expect(textbox).to.have.attribute('aria-expanded', 'true');
    });

    it('should not focus when tooltip clicked', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                slotProps={{
                  ...params.slotProps,
                  input: {
                    ...params.slotProps.input,
                    startAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="tooltip" open>
                          <div>ICON</div>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            );
          }}
        />,
      );

      const textbox = screen.getByRole('combobox');
      const tooltip = screen.getByText('tooltip');

      fireEvent.click(tooltip);

      expect(textbox).not.toHaveFocus();
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
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(handleInputChange.calledBefore(handleChange)).to.equal(true);
    });
  });

  describe('prop: filterOptions', () => {
    it('should ignore object keys by default', () => {
      render(
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
      options = screen.queryAllByRole('option');
      expect(options.length).to.equal(2);

      fireEvent.change(document.activeElement, { target: { value: 'value' } });
      options = screen.queryAllByRole('option');
      expect(options.length).to.equal(0);

      fireEvent.change(document.activeElement, { target: { value: 'one' } });
      options = screen.queryAllByRole('option');
      expect(options.length).to.equal(1);
    });

    it('limits the amount of rendered options when `limit` is set in `createFilterOptions`', () => {
      const filterOptions = createFilterOptions({ limit: 2 });
      render(
        <Autocomplete
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
          filterOptions={filterOptions}
        />,
      );
      expect(screen.queryAllByRole('option').length).to.equal(2);
    });

    it('does not limit the amount of rendered options when `limit` is not set in `createFilterOptions`', () => {
      const filterOptions = createFilterOptions({});
      render(
        <Autocomplete
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
          filterOptions={filterOptions}
        />,
      );
      expect(screen.queryAllByRole('option').length).to.equal(3);
    });
  });

  describe('prop: freeSolo', () => {
    it('should not reset a controlled inputValue on mount', () => {
      const handleInputChange = spy();

      function App() {
        const [inputValue, setInputValue] = React.useState('Option 1');

        return (
          <Autocomplete
            freeSolo
            value={null}
            inputValue={inputValue}
            options={['Option 1', 'Option 2']}
            onInputChange={(event, newInputValue, reason) => {
              handleInputChange(event, newInputValue, reason);
              setInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        );
      }

      render(<App />);

      expect(screen.getByRole('combobox').value).to.equal('Option 1');
      expect(handleInputChange.callCount).to.equal(0);
    });

    it('should reset input when controlled value changes to null', async () => {
      function App() {
        const [value, setValue] = React.useState('foo');
        return (
          <React.Fragment>
            <Autocomplete
              freeSolo
              value={value}
              options={['foo', 'bar']}
              onChange={(event, newValue) => setValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <button onClick={() => setValue(null)} type="button">
              Reset
            </button>
          </React.Fragment>
        );
      }
      const { user } = render(<App />);
      const textbox = screen.getByRole('combobox');
      expect(textbox.value).to.equal('foo');

      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(textbox.value).to.equal('');
    });

    it('should reset input when controlled value changes to null with clearOnBlur=false', async () => {
      function App() {
        const [value, setValue] = React.useState('foo');
        return (
          <React.Fragment>
            <Autocomplete
              freeSolo
              clearOnBlur={false}
              value={value}
              options={['foo', 'bar']}
              onChange={(event, newValue) => setValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <button onClick={() => setValue(null)} type="button">
              Reset
            </button>
          </React.Fragment>
        );
      }
      const { user } = render(<App />);
      const textbox = screen.getByRole('combobox');
      expect(textbox.value).to.equal('foo');

      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(textbox.value).to.equal('');
    });

    it('should retain input when controlled multiple value changes with clearOnBlur=false', async () => {
      function App() {
        const [value, setValue] = React.useState(['one']);
        return (
          <React.Fragment>
            <Autocomplete
              multiple
              freeSolo
              clearOnBlur={false}
              value={value}
              options={['one', 'two']}
              onChange={(event, newValue) => setValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <button onClick={() => setValue([])} type="button">
              Reset
            </button>
          </React.Fragment>
        );
      }
      const { user } = render(<App />);
      const textbox = screen.getByRole('combobox');

      await user.type(textbox, 'abc');
      expect(textbox.value).to.equal('abc');

      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(textbox.value).to.equal('abc');
    });

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
      const textbox = screen.getByRole('combobox');

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
      const view = render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          freeSolo
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.change(textbox, { target: { value: 'three' } });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(view.container.querySelectorAll('[class*="MuiChip-root"]')).to.have.length(3);

      fireEvent.change(textbox, { target: { value: 'three' } });
      fireEvent.keyDown(textbox, { key: 'Enter' });

      expect(view.container.querySelectorAll('[class*="MuiChip-root"]')).to.have.length(3);
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
      const textbox = screen.getByRole('combobox');

      // Actual behavior when "あ" (Japanese) is entered on macOS/Safari with IME
      fireEvent.change(textbox, { target: { value: 'あ' } });
      fireEvent.keyDown(textbox, { key: 'Enter', keyCode: 229 });

      expect(handleChange.callCount).to.equal(0);

      fireEvent.keyDown(textbox, { key: 'Enter', keyCode: 13 });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('あ');
    });

    it('should prefer typed text over auto-highlighted match on Enter', async () => {
      const handleChange = spy();
      const options = ['The Shawshank Redemption', 'The Godfather'];
      const { user } = render(
        <Autocomplete
          freeSolo
          autoHighlight
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.type(screen.getByRole('combobox'), 'The{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('The');
    });

    it('should prevent form submission when committing typed text over auto-highlighted match', async () => {
      const handleChange = spy();
      const handleSubmit = spy();
      const options = ['The Shawshank Redemption', 'The Godfather'];
      const { user } = render(
        <div
          onKeyDown={(event) => {
            if (!event.defaultPrevented && event.key === 'Enter') {
              handleSubmit();
            }
          }}
        >
          <Autocomplete
            freeSolo
            autoHighlight
            openOnFocus
            options={options}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />
        </div>,
      );

      await user.type(screen.getByRole('combobox'), 'The{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('The');
      expect(handleSubmit.callCount).to.equal(0);

      await user.keyboard('{Enter}');

      expect(handleSubmit.callCount).to.equal(1);
    });

    it('should prevent form submission when committing edited selected text over value-highlighted match', async () => {
      const handleChange = spy();
      const handleSubmit = spy();
      const options = ['The Shawshank Redemption', 'The Godfather'];
      const { user } = render(
        <div
          onKeyDown={(event) => {
            if (!event.defaultPrevented && event.key === 'Enter') {
              handleSubmit();
            }
          }}
        >
          <Autocomplete
            freeSolo
            defaultValue="The Godfather"
            options={options}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />
        </div>,
      );

      await user.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('The Godf');
      expect(handleSubmit.callCount).to.equal(0);

      await user.keyboard('{Enter}');

      expect(handleSubmit.callCount).to.equal(1);
    });

    it('should prefer typed text after editing a selected value', async () => {
      const handleChange = spy();
      const options = ['The Shawshank Redemption', 'The Godfather'];
      const { user } = render(
        <Autocomplete
          freeSolo
          defaultValue="The Godfather"
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      // Edit the text (still partially matches the selected value's option)
      // and press Enter — should create free text, not re-select the old value
      await user.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('The Godf');
    });

    it('should create freeSolo text after one edit and Enter', async () => {
      const handleChange = spy();
      const options = ['The Shawshank Redemption', 'The Godfather'];
      const { user } = render(
        <Autocomplete
          freeSolo
          defaultValue="The Godfather"
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.keyboard('{Backspace}');
      expect(screen.getByRole('option', { name: 'The Godfather' })).not.to.equal(null);
      await user.keyboard('{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('The Godfathe');
    });

    it('should select the highlighted option on Enter after keyboard navigation', async () => {
      const handleChange = spy();
      const options = ['The Shawshank Redemption', 'The Godfather'];
      const { user } = render(
        <Autocomplete
          freeSolo
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.type(screen.getByRole('combobox'), 'The');
      await user.keyboard('{ArrowDown}{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('The Shawshank Redemption');
    });

    it('should select a mouse-hovered option on Enter after typing', async () => {
      const handleChange = spy();
      const options = ['The Shawshank Redemption', 'The Godfather'];
      const { user } = render(
        <Autocomplete
          freeSolo
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.type(screen.getByRole('combobox'), 'The');
      await user.pointer({ target: screen.getByRole('option', { name: 'The Godfather' }) });
      await user.keyboard('{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('The Godfather');
    });

    it('should not select a touch-highlighted option after scroll on Enter', async () => {
      const handleChange = spy();
      const handleClose = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          openOnFocus
          options={options}
          onChange={handleChange}
          onClose={handleClose}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const optionOne = screen.getByRole('option', { name: 'one' });

      // user.pointer({ keys: '[TouchA>]' }) fires pointerdown which moves focus
      // on real devices, touchStart does not move focus
      // therefore fireEvent is more correct here
      fireEvent.touchStart(optionOne);
      fireEvent.scroll(screen.getByRole('listbox'));
      await user.keyboard('{Enter}');

      expect(handleChange.callCount).to.equal(0);
      expect(handleClose.callCount).to.equal(1);
    });

    it('should allow Enter to select after touch-scroll then typing', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          autoHighlight
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      // Touch-scroll makes the highlight stale
      await user.pointer({
        keys: '[TouchA>]',
        target: screen.getByRole('option', { name: 'one' }),
      });
      fireEvent.scroll(screen.getByRole('listbox'));

      // Typing clears the stale scroll flag; autoHighlight re-highlights
      await user.type(screen.getByRole('combobox'), 't');
      await user.keyboard('{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('two');
    });

    it('should select an option on tap without scroll', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          open
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await user.pointer([
        { keys: '[TouchA]', target: screen.getByRole('option', { name: 'one' }) },
      ]);

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('one');
    });

    it('should not misclassify scroll as touch after close and reopen', async () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { user } = render(
        <Autocomplete
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      // Touch an option, then close by pressing Escape
      await user.pointer({
        keys: '[TouchA>]',
        target: screen.getByRole('option', { name: 'one' }),
      });
      await user.keyboard('{Escape}');

      // Reopen (first ArrowDown) and navigate (second ArrowDown), then Enter.
      // The touch state should not leak into this new popup session.
      await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('one');
    });

    it('should render endAdornment only when clear icon or popup icon is available', () => {
      const view = render(
        <Autocomplete freeSolo options={[]} renderInput={(params) => <TextField {...params} />} />,
      );

      expect(view.container.querySelector(`.${classes.endAdornment}`)).to.equal(null);
    });

    it('should not render the Popper when freeSolo and no options match', async () => {
      const { user } = render(
        <Autocomplete
          freeSolo
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ popper: { 'data-testid': 'popper' } }}
        />,
      );
      await user.type(screen.getByRole('combobox'), 'xyz');
      expect(screen.queryByTestId('popper')).to.equal(null);
    });

    it('should render loading text in freeSolo even with no options', async () => {
      const { user } = render(
        <Autocomplete
          freeSolo
          loading
          options={[]}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      await user.type(screen.getByRole('combobox'), 'a');
      expect(screen.getByText('Loading…')).not.to.equal(null);
    });

    it('should keep the Popper in the DOM when freeSolo, keepMounted, and no options match', async () => {
      const { user } = render(
        <Autocomplete
          freeSolo
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ popper: { keepMounted: true, 'data-testid': 'popper' } }}
        />,
      );
      await user.type(screen.getByRole('combobox'), 'xyz');
      // keepMounted keeps the Popper in the DOM but hidden
      expect(screen.getByTestId('popper')).not.to.equal(null);
    });

    it('should respect keepMounted from callback-form slotProps.popper in freeSolo with no matches', async () => {
      const { user } = render(
        <Autocomplete
          freeSolo
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ popper: () => ({ keepMounted: true, 'data-testid': 'popper' }) }}
        />,
      );
      await user.type(screen.getByRole('combobox'), 'xyz');
      expect(screen.getByTestId('popper')).not.to.equal(null);
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
      const textbox = screen.getByRole('combobox');

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
      const textbox = screen.getByRole('combobox');

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
      const textbox = screen.getByRole('combobox');

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
      const textbox = screen.getByRole('combobox');

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
      const view = render(
        <Autocomplete
          multiple
          value={options}
          onChange={handleChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const button = view.container.querySelector('button');
      fireEvent.click(button);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([]);
      expect(handleChange.args[0][2]).to.equal('clear');
      expect(handleChange.args[0][3]).to.equal(undefined);
    });
  });

  describe('prop: onInputChange', () => {
    it('provides a reason on input change', async () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      const view = render(
        <Autocomplete
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await view.user.type(document.activeElement, 'a');

      expect(handleInputChange.callCount).to.equal(1);
      expect(handleInputChange.args[0][1]).to.equal('a');
      expect(handleInputChange.args[0][2]).to.equal('input');
    });

    it('provides a reason on select reset', async () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }, { name: 'bar' }];
      function MyComponent() {
        const [value, setValue] = React.useState(options[0]);
        return (
          <React.Fragment>
            <Autocomplete
              onInputChange={handleInputChange}
              openOnFocus
              options={options}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} autoFocus />}
              value={value}
            />
            <button onClick={() => setValue(options[1])} type="button">
              Reset
            </button>
          </React.Fragment>
        );
      }
      const view = render(<MyComponent />);

      await view.user.click(screen.getByText('Reset'));

      expect(handleInputChange.lastCall.args[1]).to.equal(options[1].name);
      expect(handleInputChange.lastCall.args[2]).to.equal('reset');
    });

    it('provides a reason on clear', async () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      const view = render(
        <Autocomplete
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          defaultValue={options[0]}
        />,
      );

      await view.user.click(screen.getByLabelText('Clear'));

      expect(handleInputChange.lastCall.args[1]).to.equal('');
      expect(handleInputChange.lastCall.args[2]).to.equal('clear');
    });

    it('provides a reason on blur', async () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      const view = render(
        <Autocomplete
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          clearOnBlur
        />,
      );

      await view.user.type(screen.getByRole('combobox'), options[0].name);
      await view.user.tab();

      expect(handleInputChange.lastCall.args[1]).to.equal('');
      expect(handleInputChange.lastCall.args[2]).to.equal('blur');
    });

    it('provides a reason on select option', async () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      const view = render(
        <Autocomplete
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      await view.user.click(screen.getByLabelText('Open'));
      await view.user.click(screen.getByRole('option', { name: options[0].name }));

      expect(handleInputChange.lastCall.args[1]).to.equal(options[0].name);
      expect(handleInputChange.lastCall.args[2]).to.equal('selectOption');
    });

    it('provides a reason on remove option', async () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      const view = render(
        <Autocomplete
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          defaultValue={options}
          multiple
        />,
      );

      await view.user.type(screen.getByRole('combobox'), `${options[0].name}{Enter}`);

      expect(handleInputChange.lastCall.args[1]).to.equal('');
      expect(handleInputChange.lastCall.args[2]).to.equal('removeOption');
    });
  });

  describe('prop: blurOnSelect', () => {
    it('[blurOnSelect=true] should blur the input when clicking or touching options', () => {
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          openOnFocus
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          blurOnSelect
        />,
      );
      const textbox = screen.getByRole('combobox');
      let firstOption = screen.getByRole('option');
      expect(textbox).toHaveFocus();
      fireEvent.click(firstOption);
      expect(textbox).not.toHaveFocus();

      fireEvent.click(screen.queryByTitle('Open'));
      expect(textbox).toHaveFocus();
      firstOption = screen.getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).not.toHaveFocus();
    });

    it('[blurOnSelect="touch"] should only blur the input when an option is touched', () => {
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          openOnFocus
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          blurOnSelect="touch"
        />,
      );
      const textbox = screen.getByRole('combobox');
      let firstOption = screen.getByRole('option');
      fireEvent.click(firstOption);
      expect(textbox).toHaveFocus();

      fireEvent.click(screen.queryByTitle('Open'));
      firstOption = screen.getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).not.toHaveFocus();
    });

    it('[blurOnSelect="mouse"] should only blur the input when an option is clicked', () => {
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          openOnFocus
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          blurOnSelect="mouse"
        />,
      );
      const textbox = screen.getByRole('combobox');
      let firstOption = screen.getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).toHaveFocus();

      fireEvent.click(screen.queryByTitle('Open'));
      firstOption = screen.getByRole('option');
      fireEvent.click(firstOption);
      expect(textbox).not.toHaveFocus();
    });
  });

  describe('prop: getOptionLabel', () => {
    it.each([null, undefined])('preserves the chip label for a raw %s option', (value) => {
      render(
        <Autocomplete
          multiple
          options={[value, 'Other']}
          value={[value]}
          getOptionLabel={(option) => (option == null ? 'Any' : option)}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      expect(screen.getByRole('button', { name: 'Any' })).to.have.text('Any');
    });

    it('is considered for falsy values when filtering the list of options', () => {
      render(
        <Autocomplete
          open
          options={[0, 10, 20]}
          getOptionLabel={(option) => (option === 0 ? 'Any' : option.toString())}
          renderInput={(params) => <TextField {...params} />}
          value={0}
        />,
      );

      const options = screen.getAllByRole('option');
      expect(options).to.have.length(3);
    });

    it('is not considered for nullish values when filtering the list of options', () => {
      render(
        <Autocomplete
          open
          options={[null, 10, 20]}
          getOptionLabel={(option) => (option === null ? 'Any' : option.toString())}
          renderInput={(params) => <TextField {...params} />}
          value={null}
        />,
      );

      const options = screen.getAllByRole('option');
      expect(options).to.have.length(3);
    });

    it('should update the input value when getOptionLabel changes', () => {
      const view = render(
        <Autocomplete
          value="one"
          open
          options={['one', 'two', 'three']}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      expect(textbox).to.have.property('value', 'one');
      view.setProps({
        getOptionLabel: (option) => option.toUpperCase(),
      });
      expect(textbox).to.have.property('value', 'ONE');
    });

    it('should not update the input value when users is focusing', () => {
      const view = render(
        <Autocomplete
          value="one"
          open
          options={['one', 'two', 'three']}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      expect(textbox).to.have.property('value', 'one');
      fireEvent.change(textbox, { target: { value: 'a' } });
      view.setProps({
        getOptionLabel: (option) => option.toUpperCase(),
      });
      expect(textbox).to.have.property('value', 'a');
    });

    it('should not throw error when nested options are provided', () => {
      render(
        <Autocomplete
          openOnFocus
          autoHighlight
          options={[
            { property: { name: 'one' } },
            { property: { name: 'two' } },
            { property: { name: 'three' } },
          ]}
          getOptionLabel={(option) => option.property.name}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      expect(() => {
        fireEvent.focus(screen.getByRole('combobox'));
      }).not.to.throw();
    });
  });

  describe('prop: getOptionValue', () => {
    const options = [
      { id: 'foo', label: 'Foo' },
      { id: 'bar', label: 'Bar' },
    ];

    function Test(props) {
      return (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.id}
          renderInput={(params) => <TextField {...params} />}
          {...props}
        />
      );
    }

    it('uses option labels for mapped values', () => {
      render(<Test multiple value={['foo', 'bar']} />);

      expect(screen.getByText('Foo')).not.to.equal(null);
      expect(screen.getByText('Bar')).not.to.equal(null);
    });

    it('commits the mapped value and original option on autoSelect blur', async () => {
      const onChange = spy();
      const { user } = render(<Test autoSelect openOnFocus onChange={onChange} />);
      const textbox = screen.getByRole('combobox');

      await user.click(textbox);
      await user.keyboard('{ArrowDown}');
      expect(textbox).to.have.attribute(
        'aria-activedescendant',
        screen.getByRole('option', { name: 'Foo' }).id,
      );
      await user.tab();

      expect(onChange.callCount).to.equal(1);
      expect(onChange.firstCall.args.slice(1)).to.deep.equal([
        'foo',
        'blur',
        { option: options[0] },
      ]);
      expect(textbox).to.have.value('Foo');
    });

    describe.each([null, undefined])('nullable mapped option: %s', (nullableOption) => {
      const nullableOptions = [nullableOption, 'Other'];
      const getOptionValue = (option) => (option == null ? 0 : 1);
      const getOptionLabel = (option) => (option == null ? 'Any' : option);

      describe.each([false, true])('custom equality: %s', (customEquality) => {
        const isOptionEqualToValue = customEquality
          ? (option, value) => getOptionValue(option) === value
          : undefined;

        function NullableOptionTest(props) {
          return (
            <Test
              options={nullableOptions}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              isOptionEqualToValue={isOptionEqualToValue}
              {...props}
            />
          );
        }

        it('uses the label for initial and newly selected single values', async () => {
          const handleChange = spy();
          const { user } = render(<NullableOptionTest defaultValue={0} onChange={handleChange} />);
          const textbox = screen.getByRole('combobox');

          expect(textbox).to.have.value('Any');
          await user.click(screen.getByLabelText('Open'));
          expect(screen.getByRole('option', { name: 'Any' })).to.have.attribute(
            'aria-selected',
            'true',
          );
          await user.click(screen.getByRole('option', { name: 'Other' }));
          expect(textbox).to.have.value('Other');

          await user.click(screen.getByLabelText('Open'));
          await user.click(screen.getByRole('option', { name: 'Any' }));
          expect(textbox).to.have.value('Any');
          expect(handleChange.lastCall.args.slice(1)).to.deep.equal([
            0,
            'selectOption',
            { option: nullableOption },
          ]);

          await user.click(screen.getByLabelText('Clear'));
          expect(textbox).to.have.value('');
        });

        it.each(['delete icon', 'Backspace'])(
          'labels the chip and includes the nullable option when removing with %s',
          async (method) => {
            const handleChange = spy();
            const { user } = render(
              <NullableOptionTest multiple defaultValue={[0]} onChange={handleChange} />,
            );

            expect(screen.getByRole('button', { name: 'Any' })).to.have.text('Any');
            if (method === 'delete icon') {
              await user.click(screen.getByTestId('CancelIcon'));
            } else {
              await user.click(screen.getByRole('combobox'));
              await user.keyboard('{Backspace}');
            }

            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args.slice(1)).to.deep.equal([
              [],
              'removeOption',
              { option: nullableOption },
            ]);
            expect(screen.queryByRole('button', { name: 'Any' })).to.equal(null);
          },
        );

        it.each([
          { multiple: false, freeSolo: false, focused: false },
          { multiple: true, freeSolo: false, focused: false },
          { multiple: false, freeSolo: true, focused: false },
          { multiple: false, freeSolo: true, focused: true },
        ])(
          'updates labels when options arrive with multiple=$multiple, freeSolo=$freeSolo, focused=$focused',
          async ({ multiple, freeSolo, focused }) => {
            const props = { multiple, freeSolo, value: multiple ? [0] : 0 };
            const { rerender, user } = render(<NullableOptionTest {...props} options={[]} />);
            const selection = multiple
              ? screen.getByRole('button', { name: '' })
              : screen.getByRole('combobox');

            if (multiple) {
              expect(selection).to.have.text('');
            } else {
              expect(selection).to.have.value('');
            }
            if (focused) {
              await user.click(screen.getByRole('combobox'));
            }

            rerender(<NullableOptionTest {...props} />);

            if (multiple) {
              expect(selection).to.have.text('Any');
            } else {
              expect(selection).to.have.value('Any');
            }
          },
        );

        it('retains nullable options created by filterOptions for labels and removal', async () => {
          const handleChange = spy();
          const { user } = render(
            <NullableOptionTest
              multiple
              options={['Other']}
              filterOptions={(optionsToFilter, { inputValue }) =>
                inputValue === 'Any' ? [nullableOption] : optionsToFilter
              }
              onChange={handleChange}
            />,
          );
          const textbox = screen.getByRole('combobox');

          await user.type(textbox, 'Any');
          await user.click(screen.getByRole('option', { name: 'Any' }));
          expect(screen.getByRole('button', { name: 'Any' })).to.have.text('Any');

          await user.type(textbox, 'Other');
          await user.click(screen.getByRole('option', { name: 'Other' }));
          expect(screen.getByRole('button', { name: 'Any' })).to.have.text('Any');
          await user.click(screen.getAllByTestId('CancelIcon')[0]);

          expect(handleChange.lastCall.args.slice(1)).to.deep.equal([
            [1],
            'removeOption',
            { option: nullableOption },
          ]);
        });
      });
    });

    describe('options created by filterOptions', () => {
      const filterOptions = (optionsToFilter, { inputValue }) =>
        inputValue ? [{ id: inputValue.toLowerCase(), label: inputValue }] : optionsToFilter;

      it.each([false, true])(
        'keeps the selected label after closing the popup with controlled=%s',
        async (controlled) => {
          const handleChange = spy();

          function GeneratedOptionTest() {
            const [value, setValue] = React.useState(null);

            return (
              <Test
                filterOptions={filterOptions}
                value={controlled ? value : undefined}
                onChange={(event, newValue, reason, details) => {
                  handleChange(event, newValue, reason, details);
                  if (controlled) {
                    setValue(newValue);
                  }
                }}
              />
            );
          }

          const { user } = render(<GeneratedOptionTest />);
          const textbox = screen.getByRole('combobox');

          await user.type(textbox, 'Baz');
          await user.click(screen.getByRole('option', { name: 'Baz' }));

          expect(handleChange.callCount).to.equal(1);
          expect(handleChange.firstCall.args.slice(1)).to.deep.equal([
            'baz',
            'selectOption',
            { option: { id: 'baz', label: 'Baz' } },
          ]);
          expect(screen.queryByRole('listbox')).to.equal(null);
          expect(textbox).to.have.value('Baz');

          await user.tab();

          expect(textbox).to.have.value('Baz');
        },
      );

      it('keeps generated chip labels across searches and exposes the option on removal', async () => {
        const handleChange = spy();
        const { user } = render(
          <Test
            multiple
            defaultValue={['foo']}
            filterOptions={filterOptions}
            onChange={handleChange}
          />,
        );
        const textbox = screen.getByRole('combobox');

        await user.type(textbox, 'Baz');
        await user.click(screen.getByRole('option', { name: 'Baz' }));

        expect(screen.getAllByRole('button')[1]).to.have.text('Baz');
        expect(screen.queryByRole('listbox')).to.equal(null);

        await user.type(textbox, 'Qux');

        expect(screen.getAllByRole('button')[1]).to.have.text('Baz');
        await user.click(screen.getByRole('option', { name: 'Qux' }));

        expect(screen.getAllByRole('button')[0]).to.have.text('Foo');
        expect(screen.getAllByRole('button')[1]).to.have.text('Baz');
        expect(screen.getAllByRole('button')[2]).to.have.text('Qux');
        expect(handleChange.lastCall.args[1]).to.deep.equal(['foo', 'baz', 'qux']);

        await user.keyboard('{Backspace}');

        expect(handleChange.lastCall.args.slice(1)).to.deep.equal([
          ['foo', 'baz'],
          'removeOption',
          { option: { id: 'qux', label: 'Qux' } },
        ]);
        expect(screen.queryByRole('button', { name: 'Qux' })).to.equal(null);
        expect(screen.getAllByRole('button')[1]).to.have.text('Baz');
      });
    });

    describe('unresolved mapped chips', () => {
      it('leaves chip labels empty until their options arrive', () => {
        const props = { multiple: true, value: ['foo', 'missing'] };
        const { rerender } = render(<Test {...props} options={[]} />);
        const [loadingChip, staleChip] = screen.getAllByRole('button');

        expect(loadingChip).to.have.text('');
        expect(staleChip).to.have.text('');

        rerender(<Test {...props} options={options} />);

        expect(loadingChip).to.have.text('Foo');
        expect(staleChip).to.have.text('');
      });

      it('does not expose unresolved numeric or boolean values as chip labels', () => {
        render(<Test multiple value={[42, 87, 0, false]} options={[]} />);

        const chips = screen.getAllByRole('button', { name: '' });
        expect(chips).to.have.length(4);
      });

      it('removes an unresolved chip at its original index among resolved chips', async () => {
        const handleChange = spy();
        const { user } = render(
          <Test multiple defaultValue={['foo', 'missing', 'bar']} onChange={handleChange} />,
        );
        const staleChip = screen.getByRole('button', { name: '' });

        expect(staleChip).to.have.attribute('data-item-index', '1');
        await user.click(screen.getAllByTestId('CancelIcon')[1]);

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.firstCall.args.slice(1)).to.deep.equal([
          ['foo', 'bar'],
          'removeOption',
          undefined,
        ]);
        expect(screen.queryByRole('button', { name: '' })).to.equal(null);
        expect(screen.getAllByRole('button')[0]).to.have.text('Foo');
        expect(screen.getAllByRole('button')[1]).to.have.text('Bar');
      });
    });

    describe('async options in freeSolo mode', () => {
      const loadedOptions = [{ id: 2, label: 'Bar' }];

      it.each([false, true])(
        'resolves the selected label when options arrive with focused=%s',
        async (focused) => {
          const handleInputChange = spy();
          const handleChange = spy();
          const props = {
            freeSolo: true,
            value: 2,
            onInputChange: handleInputChange,
            onChange: handleChange,
          };
          const { rerender, user } = render(<Test {...props} options={[]} />);
          const textbox = screen.getByRole('combobox');

          expect(textbox).to.have.value('');
          if (focused) {
            await user.click(textbox);
          }

          rerender(<Test {...props} options={loadedOptions} />);

          expect(textbox).to.have.value('Bar');
          expect(handleInputChange.callCount).to.equal(1);
          expect(handleInputChange.firstCall.args).to.deep.equal([null, 'Bar', 'reset']);
          expect(handleChange.callCount).to.equal(0);
        },
      );

      it('resolves an uncontrolled default value when options arrive', () => {
        const { rerender } = render(<Test freeSolo defaultValue={2} options={[]} />);

        expect(screen.getByRole('combobox')).to.have.value('');

        rerender(<Test freeSolo defaultValue={2} options={loadedOptions} />);

        expect(screen.getByRole('combobox')).to.have.value('Bar');
      });

      it.each(['draft', ''])(
        'preserves edited input "%s" when options arrive after blur',
        async (draft) => {
          const handleInputChange = spy();
          const props = { freeSolo: true, value: 2, onInputChange: handleInputChange };
          const { rerender, user } = render(<Test {...props} options={[]} />);
          const textbox = screen.getByRole('combobox');

          await user.type(textbox, 'draft');
          if (draft === '') {
            await user.clear(textbox);
          }
          await user.keyboard('{Escape}{ArrowDown}');
          await user.tab();
          handleInputChange.resetHistory();

          rerender(<Test {...props} options={loadedOptions} />);

          expect(textbox).to.have.value(draft);
          expect(handleInputChange.callCount).to.equal(0);
        },
      );

      it('preserves a controlled input value when options arrive', () => {
        const props = { freeSolo: true, value: 2, inputValue: 'Custom label' };
        const { rerender } = render(<Test {...props} options={[]} />);

        rerender(<Test {...props} options={loadedOptions} />);

        expect(screen.getByRole('combobox')).to.have.value('Custom label');
      });

      it('keeps the input empty when the controlled value becomes null before options arrive', () => {
        const { rerender } = render(<Test freeSolo value={2} options={[]} />);

        rerender(<Test freeSolo value={null} options={[]} />);
        rerender(<Test freeSolo value={null} options={loadedOptions} />);

        expect(screen.getByRole('combobox')).to.have.value('');
      });

      it('keeps the input empty after clicking Clear before options arrive', async () => {
        const onChange = spy();
        const onInputChange = spy();
        // Keep the controlled selection unchanged so the Clear action alone prevents label sync.
        const props = { freeSolo: true, value: 2, onChange, onInputChange };
        const { rerender, user } = render(<Test {...props} options={[]} />);
        const textbox = screen.getByRole('combobox');

        await user.click(textbox);
        await user.click(screen.getByRole('button', { name: 'Clear' }));

        expect(textbox).to.have.value('');
        expect(onChange.callCount).to.equal(1);
        expect(onChange.firstCall.args.slice(1)).to.deep.equal([null, 'clear', undefined]);
        expect(onInputChange.lastCall.args.slice(1)).to.deep.equal(['', 'clear']);
        onInputChange.resetHistory();

        rerender(<Test {...props} options={loadedOptions} />);

        expect(textbox).to.have.value('');
        expect(onInputChange.callCount).to.equal(0);
        expect(onChange.callCount).to.equal(1);
      });
    });

    it('uses freeSolo text for a chip when it collides with a mapped option value', () => {
      const collidingOptions = [{ id: 'draft', label: 'Published' }];
      const expectedError =
        'MUI: The `getOptionValue` method of useAutocomplete returned the string value "draft" while `freeSolo` is enabled.\n' +
        'useAutocomplete cannot distinguish string option values from free-solo values. ' +
        'Return a number or boolean from `getOptionValue`, or disable `freeSolo`.';

      expect(() => {
        render(
          <Test
            options={collidingOptions}
            multiple
            freeSolo
            value={['draft']}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
          />,
          { strict: false },
        );
      }).toErrorDev(expectedError);

      expect(screen.getByRole('button', { name: 'draft' })).not.to.equal(null);
    });

    it('uses custom equality when resolving mapped values to options', () => {
      render(
        <Test
          multiple
          value={['FOO']}
          isOptionEqualToValue={(option, value) => option.id.toUpperCase() === value}
        />,
      );

      expect(screen.getByText('Foo')).not.to.equal(null);
    });

    it('reuses the mapped value lookup while the mapper identity is stable', async () => {
      const getValue = spy((option) => option.id);

      const { user } = render(
        <Test multiple open={false} defaultValue={['foo']} getOptionValue={getValue} />,
      );
      getValue.resetHistory();

      await user.type(screen.getByRole('combobox'), 'search');

      expect(screen.getByRole('button', { name: 'Foo' })).to.have.text('Foo');
      expect(getValue.callCount).to.equal(0);
    });

    it('rebuilds the mapped value lookup when typing rerenders the parent with a fresh inline mapper', async () => {
      const mapperOptions = [
        { id: 'foo', alternateId: 'bar', label: 'Foo' },
        { id: 'bar', alternateId: 'foo', label: 'Bar' },
      ];
      const getValue = spy((option, inputValue) => (inputValue ? option.alternateId : option.id));

      function InlineMapperTest() {
        const [inputValue, setInputValue] = React.useState('');

        return (
          <Test
            multiple
            open={false}
            options={mapperOptions}
            defaultValue={['foo']}
            inputValue={inputValue}
            onInputChange={(event, nextInputValue) => setInputValue(nextInputValue)}
            getOptionValue={(option) => getValue(option, inputValue)}
          />
        );
      }

      const { user } = render(<InlineMapperTest />);
      expect(screen.getByRole('button', { name: 'Foo' })).to.have.text('Foo');
      getValue.resetHistory();

      await user.type(screen.getByRole('combobox'), 'search');

      mapperOptions.forEach((option) => {
        expect(getValue.calledWithExactly(option, 'search')).to.equal(true);
      });
      // A changed label proves the lookup refreshed, beyond the mapper calls made by validation.
      expect(screen.getByRole('button', { name: 'Bar' })).to.have.text('Bar');
      expect(screen.queryByRole('button', { name: 'Foo' })).to.equal(null);
    });

    it('reuses custom chip resolutions while typing with the popup closed', async () => {
      const getOptionValue = (option) => option.id;
      const isOptionEqualToValue = spy((option, value) => option.id.toUpperCase() === value);
      const { user } = render(
        <Test
          multiple
          open={false}
          value={['FOO', 'missing', 'BAR']}
          getOptionValue={getOptionValue}
          isOptionEqualToValue={isOptionEqualToValue}
        />,
      );
      isOptionEqualToValue.resetHistory();

      await user.type(screen.getByRole('combobox'), 'search');

      expect(screen.getByRole('button', { name: 'Foo' })).to.have.text('Foo');
      expect(screen.getByRole('button', { name: '' })).to.have.text('');
      expect(screen.getByRole('button', { name: 'Bar' })).to.have.text('Bar');
      expect(isOptionEqualToValue.callCount).to.equal(0);
    });

    it('passes mapped values to renderValue', () => {
      const renderValue = spy((value) => <span>{value}</span>);

      render(<Test value="foo" renderValue={renderValue} />);

      expect(renderValue.lastCall.args[0]).to.equal('foo');
      expect(screen.getByText('foo')).not.to.equal(null);
    });

    it('passes the mapped array to renderValue for multiple selections', () => {
      const renderValue = spy((value) => <span>{value.join(', ')}</span>);

      render(<Test multiple value={['foo', 'bar']} renderValue={renderValue} />);

      expect(renderValue.lastCall.args[0]).to.deep.equal(['foo', 'bar']);
      expect(screen.getByText('foo, bar')).not.to.equal(null);
    });

    it('provides the raw option when deleting a mapped chip', async () => {
      const handleChange = spy();
      const { user } = render(<Test multiple value={['foo', 'bar']} onChange={handleChange} />);

      await user.click(screen.getAllByTestId('CancelIcon')[0]);

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['bar']);
      expect(handleChange.args[0][2]).to.equal('removeOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[0] });
    });

    it('provides the raw option when removing a mapped value with Backspace', async () => {
      const handleChange = spy();
      const { user } = render(<Test multiple value={['foo', 'bar']} onChange={handleChange} />);
      const textbox = screen.getByRole('combobox');

      await user.tab();
      expect(textbox).toHaveFocus();
      await user.keyboard('{Backspace}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['foo']);
      expect(handleChange.args[0][2]).to.equal('removeOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[1] });
    });

    it('provides the raw option when removing a focused mapped value with Delete', async () => {
      const handleChange = spy();
      const { user } = render(<Test multiple value={['foo', 'bar']} onChange={handleChange} />);
      const textbox = screen.getByRole('combobox');
      const firstChip = screen.getByRole('button', { name: 'Foo' });

      await user.tab();
      expect(textbox).toHaveFocus();
      await user.keyboard('{ArrowLeft}{ArrowLeft}');
      expect(firstChip).toHaveFocus();
      await user.keyboard('{Delete}');

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['bar']);
      expect(handleChange.args[0][2]).to.equal('removeOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[0] });
    });

    it('provides the raw option when deleting a mapped single-value item', async () => {
      const handleChange = spy();
      const { user } = render(
        <Test
          value="foo"
          onChange={handleChange}
          renderValue={(value, getItemProps) => <Chip label={value} {...getItemProps()} />}
        />,
      );

      await user.click(screen.getByTestId('CancelIcon'));

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(null);
      expect(handleChange.args[0][2]).to.equal('removeOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[0] });
    });

    it.each(['Backspace', 'Delete'])(
      'provides the raw option when removing a mapped single value with %s',
      async (key) => {
        const handleChange = spy();
        const { user } = render(
          <Test
            value="foo"
            onChange={handleChange}
            renderValue={(value, getItemProps) => <Chip label={value} {...getItemProps()} />}
          />,
        );
        const textbox = screen.getByRole('combobox');

        await user.tab();
        expect(textbox).toHaveFocus();
        await user.keyboard(`{${key}}`);

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal(null);
        expect(handleChange.args[0][2]).to.equal('removeOption');
        expect(handleChange.args[0][3]).to.deep.equal({ option: options[0] });
      },
    );
  });

  it('should specify option key for duplicate options', () => {
    render(
      <Autocomplete
        open
        options={[
          { name: 'one', id: '1' },
          { name: 'two', id: '2' },
          { name: 'three', id: '3' },
          { name: 'three', id: '4' },
        ]}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        renderInput={(params) => <TextField {...params} autoFocus />}
      />,
    );

    fireEvent.change(document.activeElement, { target: { value: 'th' } });
    const options = screen.getAllByRole('option');
    expect(options.length).to.equal(2);
  });

  describe('prop: fullWidth', () => {
    it('should have the fullWidth class', () => {
      const renderInput = spy((params) => <TextField {...params} />);
      const { container, rerender } = render(
        <Autocomplete fullWidth options={[0, 10, 20]} renderInput={renderInput} value={null} />,
      );

      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.fullWidth);
      expect(renderInput.lastCall.args[0].fullWidth).to.equal(true);

      rerender(
        <Autocomplete
          fullWidth={false}
          options={[0, 10, 20]}
          renderInput={renderInput}
          value={null}
        />,
      );

      expect(container.querySelector(`.${classes.root}`)).not.to.have.class(classes.fullWidth);
      expect(renderInput.lastCall.args[0].fullWidth).to.equal(false);
    });

    it('should pass fullWidth as true to renderInput if not provided', () => {
      const renderInput = spy((params) => <TextField {...params} />);
      const view = render(
        <Autocomplete options={[0, 10, 20]} renderInput={renderInput} value={null} />,
      );

      expect(view.container.querySelector(`.${classes.root}`)).not.to.have.class(classes.fullWidth);
      expect(renderInput.lastCall.args[0].fullWidth).to.equal(true);
    });
  });

  it('should not override internal listbox ref when external listbox ref is provided by testing if highlighting works', () => {
    const handleHighlightChange = spy();
    const externalListboxRef = React.createRef(null);

    render(
      <Autocomplete
        options={['one', 'two', 'three']}
        slotProps={{
          listbox: {
            ref: externalListboxRef,
          },
        }}
        renderInput={(params) => <TextField {...params} autoFocus />}
        onHighlightChange={handleHighlightChange}
      />,
    );

    const textbox = screen.getByRole('combobox');

    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // open listbox
    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // highlight first option

    expect(handleHighlightChange.callCount).to.equal(1);
  });

  describe('prop: onHighlightChange', () => {
    it('should not trigger event when default value is passed', () => {
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
      expect(handleHighlightChange.callCount).to.equal(0);
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
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      expect(handleHighlightChange.callCount).to.equal(1);
      expect(handleHighlightChange.lastCall.args[0]).not.to.equal(undefined);
      expect(handleHighlightChange.lastCall.args[1]).to.equal(options[0]);
      expect(handleHighlightChange.lastCall.args[2]).to.equal('keyboard');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      expect(handleHighlightChange.callCount).to.equal(2);
      expect(handleHighlightChange.lastCall.args[0]).not.to.equal(undefined);
      expect(handleHighlightChange.lastCall.args[1]).to.equal(options[1]);
      expect(handleHighlightChange.lastCall.args[2]).to.equal('keyboard');
    });

    it('should support mouse event', () => {
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
      const firstOption = screen.getAllByRole('option')[0];
      fireEvent.mouseMove(firstOption);
      expect(handleHighlightChange.callCount).to.equal(1);
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
      const textbox = screen.getByRole('combobox');

      fireEvent.change(document.activeElement, { target: { value: 'one' } });
      expect(screen.getAllByRole('option').length).to.equal(2);

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      expect(handleHighlightChange.args[handleHighlightChange.args.length - 1][1]).to.equal(
        options[2],
      );
    });

    it('should reset the highlight when the options change and onHighlightChange should not be called', () => {
      const handleHighlightChange = spy();
      const view = render(
        <Autocomplete
          onHighlightChange={handleHighlightChange}
          openOnFocus
          autoHighlight
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      checkHighlightIs(screen.getByRole('listbox'), 'one');
      expect(handleHighlightChange.callCount).to.equal(0);

      view.setProps({ options: ['four', 'five'] });

      checkHighlightIs(screen.getByRole('listbox'), 'four');
      expect(handleHighlightChange.callCount).to.equal(0);
    });
  });

  it('should filter options when new input value matches option', () => {
    const handleChange = spy();
    render(
      <Autocomplete
        openOnFocus
        options={['one', 'two']}
        onChange={handleChange}
        renderInput={(params) => <TextField autoFocus {...params} />}
      />,
    );
    const textbox = screen.getByRole('combobox');

    fireEvent.change(textbox, { target: { value: 'one' } });
    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal('one');
    expect(textbox).to.have.attribute('aria-expanded', 'false');

    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    expect(textbox).to.have.attribute('aria-expanded', 'true');

    expect(screen.getAllByRole('option')).to.have.length(2);

    fireEvent.change(textbox, { target: { value: 'on' } });
    fireEvent.change(textbox, { target: { value: 'one' } });

    expect(screen.getAllByRole('option')).to.have.length(1);
  });

  it('should prevent the default event handlers', () => {
    const handleChange = spy();
    const handleSubmit = spy();
    function Test() {
      return (
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
    }
    render(<Test />);
    const textbox = screen.getByRole('combobox');
    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleChange.callCount).to.equal(0);
    expect(handleSubmit.callCount).to.equal(1);
  });

  describe('prop: slotProps', () => {
    it('should keep AutocompletePopper mounted if keepMounted is true in popper props', () => {
      // Autocomplete is not opened
      render(
        <Autocomplete
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{
            popper: { 'data-testid': 'popperRoot', keepMounted: true },
          }}
        />,
      );

      const popperRoot = screen.getByTestId('popperRoot');
      expect(popperRoot.style.display).to.equal('none');
    });
  });

  describe('prop: readOnly', () => {
    it('should make the input readonly', () => {
      render(
        <Autocomplete
          readOnly
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const input = screen.getByRole('combobox');
      expect(input).to.have.attribute('readonly');
    });

    it('should not render the clear button', () => {
      render(
        <Autocomplete
          readOnly
          defaultValue="one"
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(screen.queryByTitle('Clear')).to.equal(null);
    });

    it('should not apply the hasClearIcon class', () => {
      const view = render(
        <Autocomplete
          readOnly
          defaultValue="one"
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      expect(view.container.querySelector(`.${classes.root}`)).not.to.have.class(
        classes.hasClearIcon,
      );
      expect(view.container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
    });

    it('should focus on input when clicked', () => {
      render(
        <Autocomplete
          readOnly
          defaultValue="one"
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      fireEvent.click(textbox);
      expect(textbox).toHaveFocus();

      act(() => {
        textbox.blur();
      });
      fireEvent.click(screen.queryByTitle('Open'));

      expect(textbox).toHaveFocus();
    });

    it('should not open the popup', () => {
      render(
        <Autocomplete
          readOnly
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      fireEvent.mouseDown(textbox);
      expect(screen.queryByRole('listbox')).to.equal(null);
    });

    it('should not be able to delete the tag when multiple=true', () => {
      const view = render(
        <Autocomplete
          readOnly
          multiple
          defaultValue={['one', 'two']}
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const chip = view.container.querySelector(`.${chipClasses.root}`);
      expect(chip).not.to.have.class(chipClasses.deletable);

      const textbox = screen.getByRole('combobox');
      act(() => {
        textbox.focus();
      });
      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(2);
      fireEvent.keyDown(textbox, { key: 'Backspace' });
      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(2);
    });

    it('should not be able to delete the tag using Backspace when using renderValue', () => {
      const view = render(
        <Autocomplete
          readOnly
          options={['one', 'two']}
          defaultValue="one"
          renderInput={(params) => <TextField {...params} />}
          renderValue={(value, getItemProps) => {
            return <Chip label={value} {...getItemProps()} />;
          }}
        />,
      );

      const chip = view.container.querySelector(`.${chipClasses.root}`);
      expect(chip).not.to.have.class(chipClasses.deletable);

      const textbox = screen.getByRole('combobox');
      act(() => {
        textbox.focus();
      });

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);
      fireEvent.keyDown(textbox, { key: 'Backspace' });
      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);
    });
  });

  // https://github.com/mui/material-ui/issues/36114
  describe('deleting a tag immediately after adding it while the listbox is still open', () => {
    it('should allow it, given that options are primitive values', () => {
      const view = render(
        <Autocomplete
          multiple
          disableCloseOnSelect
          filterSelectedOptions
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // highlight the first option...
      fireEvent.keyDown(textbox, { key: 'Enter' }); // ...and select it

      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // highlight another option

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);

      fireEvent.keyDown(textbox, { key: 'Backspace' });
      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(0);
    });

    it('should allow it, given that options are objects', () => {
      const view = render(
        <Autocomplete
          multiple
          disableCloseOnSelect
          filterSelectedOptions
          options={[{ label: 'one' }, { label: 'two' }, { label: 'three' }]}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // highlight the first option...
      fireEvent.keyDown(textbox, { key: 'Enter' }); // ...and select it

      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // highlight another option

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);

      fireEvent.keyDown(textbox, { key: 'Backspace' });
      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(0);
    });
  });

  describe('should apply the expanded class', () => {
    it('when listbox having options is opened', () => {
      const view = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const root = view.container.querySelector(`.${classes.root}`);

      expect(root).not.to.have.class(classes.expanded);

      const textbox = screen.getByRole('combobox');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // open listbox

      expect(root).to.have.class(classes.expanded);
    });

    it('when listbox having no options is opened', () => {
      const view = render(
        <Autocomplete options={[]} renderInput={(params) => <TextField {...params} autoFocus />} />,
      );

      const root = view.container.querySelector(`.${classes.root}`);

      expect(root).not.to.have.class(classes.expanded);

      const textbox = screen.getByRole('combobox');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // open listbox

      expect(root).to.have.class(classes.expanded);
    });
  });

  describe('prop: renderOption', () => {
    it('should pass getOptionLabel through ownerState in renderOption callback', () => {
      render(
        <Autocomplete
          open
          options={[{ name: 'Max' }]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          renderOption={(props, option, optionState, ownerState) => (
            <li key={option.name} data-testid="optionLi">
              {ownerState.getOptionLabel(option)}
            </li>
          )}
        />,
      );

      const renderedOption = screen.getByTestId('optionLi');
      expect(renderedOption).to.have.text('Max');
    });

    // https://github.com/mui/material-ui/issues/38048
    it('should pass getOptionLabel default value through ownerState when no custom getOptionLabel prop provided', () => {
      render(
        <Autocomplete
          open
          options={[{ label: 'Max' }]}
          renderInput={(params) => <TextField {...params} autoFocus />}
          renderOption={(props, option, optionState, ownerState) => (
            <li key={option.label} data-testid="optionLi">
              {ownerState.getOptionLabel(option)}
            </li>
          )}
        />,
      );

      const renderedOption = screen.getByTestId('optionLi');
      expect(renderedOption).to.have.text('Max');
    });
  });

  // https://github.com/mui/material-ui/issues/36212
  it.skipIf(isJsdom() || isFirefox)(
    'should preserve scrollTop position of the listbox when adding new options on mobile',
    function test() {
      function getOptions(count) {
        return Array(count)
          .fill('item')
          .map((value, i) => value + i);
      }

      const view = render(
        <Autocomplete
          open
          options={getOptions(5)}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ listbox: { style: { maxHeight: '100px' } } }}
        />,
      );
      const listbox = screen.getByRole('listbox');

      expect(listbox).to.have.property('scrollTop', 0);

      const options = screen.getAllByRole('option');
      fireEvent.touchStart(options[1]);
      act(() => {
        listbox.scrollBy(0, 60);
        view.setProps({ options: getOptions(10) });
      });

      expect(listbox).to.have.property('scrollTop', 60);
    },
  );

  // https://github.com/mui/material-ui/issues/40250
  it.skipIf(isFirefox)('should preserve scrollTop when more options are added', () => {
    function OptionsAutocomplete({ options }) {
      return (
        <Autocomplete
          open
          options={options}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ listbox: { style: { maxHeight: '100px', overflow: 'auto' } } }}
        />
      );
    }

    const { rerender } = render(<OptionsAutocomplete options={['1', '2', '3', '4', '5']} />);
    const listbox = screen.getByRole('listbox');

    // Simulate user scroll
    listbox.scrollTop = 50;

    // Add more options
    rerender(<OptionsAutocomplete options={['1', '2', '3', '4', '5', '6', '7', '8']} />);

    // scrollTop should be preserved — not reset to 0
    expect(listbox.scrollTop).to.equal(50);
  });

  it.skipIf(isFirefox)(
    'should preserve scrollTop when filtered options grow without changing the input',
    async () => {
      function OptionsAutocomplete({ options }) {
        return (
          <Autocomplete
            open
            options={options}
            renderInput={(params) => <TextField {...params} autoFocus />}
            slotProps={{ listbox: { style: { maxHeight: '100px', overflow: 'auto' } } }}
          />
        );
      }

      const { rerender, user } = render(
        <OptionsAutocomplete options={['aaaa1', 'aaaa2', 'aaaa3', 'aaaa4', 'aaa5', 'aaa6']} />,
      );
      const textbox = screen.getByRole('combobox');
      const listbox = screen.getByRole('listbox');

      await user.type(textbox, 'aaa');

      listbox.scrollTop = 50;

      rerender(
        <OptionsAutocomplete
          options={['aaaa1', 'aaaa2', 'aaaa3', 'aaaa4', 'aaa5', 'aaa6', 'aaa7', 'aaa8']}
        />,
      );

      expect(listbox.scrollTop).to.equal(50);
    },
  );

  it('should reset scrollTop when deleting input adds matching options', async () => {
    const { user } = render(
      <Autocomplete
        open
        options={['aaaa1', 'aaaa2', 'aaaa3', 'aaaa4', 'aaa5', 'aaa6']}
        renderInput={(params) => <TextField {...params} autoFocus />}
        slotProps={{ listbox: { style: { maxHeight: '100px', overflow: 'auto' } } }}
      />,
    );
    const textbox = screen.getByRole('combobox');
    const listbox = screen.getByRole('listbox');

    await user.type(textbox, 'aaaa');

    listbox.scrollTop = 50;

    // The filtered list grows, but because the input changed this is not append-only loading.
    await user.keyboard('{Backspace}');

    expect(listbox.scrollTop).to.equal(0);
  });

  describe('prop: renderValue (single selection)', () => {
    it('should render only a single value, given that options are primitive values', () => {
      const view = render(
        <Autocomplete
          options={['one', 'two']}
          renderValue={(value, getItemProps) => {
            return <Chip label={value} {...getItemProps()} />;
          }}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // highlight the first option...
      fireEvent.keyDown(textbox, { key: 'Enter' }); // ...and select it

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // highlight the second option...
      fireEvent.keyDown(textbox, { key: 'Enter' }); // ...and select it

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);
    });

    it('should render only a single value, given that options as objects', () => {
      const view = render(
        <Autocomplete
          options={[
            { title: 'The Shawshank Redemption', year: 1994 },
            { title: 'The Godfather', year: 1972 },
          ]}
          getOptionLabel={(option) => option.title}
          renderValue={(value, getItemProps) => {
            return <Chip label={value.title} {...getItemProps()} />;
          }}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // highlight the first option...
      fireEvent.keyDown(textbox, { key: 'Enter' }); // ...and select it

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // highlight the second option...
      fireEvent.keyDown(textbox, { key: 'Enter' }); // ...and select it

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);
    });

    it('should delete using Backspace key with empty input text', () => {
      const handleChange = spy();
      const view = render(
        <Autocomplete
          options={['one', 'two']}
          defaultValue="one"
          onChange={handleChange}
          renderValue={(value, getItemProps) => {
            return <Chip label={value} {...getItemProps()} />;
          }}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);

      fireEvent.keyDown(textbox, { key: 'Backspace' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(null);
      expect(handleChange.args[0][2]).to.equal('removeOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: 'one' });

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(0);
    });

    it('should delete using Delete key with empty input text', () => {
      const handleChange = spy();
      const view = render(
        <Autocomplete
          options={['one', 'two']}
          defaultValue="one"
          onChange={handleChange}
          renderValue={(value, getItemProps) => {
            return <Chip label={value} {...getItemProps()} />;
          }}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(1);

      fireEvent.keyDown(textbox, { key: 'Delete' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(null);
      expect(handleChange.args[0][2]).to.equal('removeOption');
      expect(handleChange.args[0][3]).to.deep.equal({ option: 'one' });

      expect(view.container.querySelectorAll(`.${chipClasses.root}`)).to.have.length(0);
    });

    it('navigates between the tag and input', () => {
      const view = render(
        <Autocomplete
          defaultValue="two"
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
          renderValue={(value, getItemProps) => {
            return <Chip label={value} {...getItemProps()} />;
          }}
        />,
      );

      const textbox = screen.getByRole('combobox');
      const chip = view.container.querySelector(`.${chipClasses.root}`);

      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });

      expect(chip).toHaveFocus();

      fireEvent.keyDown(chip, { key: 'ArrowRight' });

      expect(textbox).toHaveFocus();
    });

    // https://github.com/mui/material-ui/issues/47244
    it('should show input caret when focusing input after chip navigation', () => {
      const view = render(
        <Autocomplete
          defaultValue="two"
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
          renderValue={(value, getItemProps) => {
            return <Chip label={value} {...getItemProps()} />;
          }}
        />,
      );

      const textbox = screen.getByRole('combobox');
      const chip = view.container.querySelector(`.${chipClasses.root}`);

      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      expect(chip).toHaveFocus();

      fireEvent.click(textbox);

      expect(textbox).toHaveFocus();
      expect(chip).not.toHaveFocus();
      expect(textbox).toHaveComputedStyle({ opacity: '1' });
    });

    it('should allow zero number (0) as a value to render', () => {
      const view = render(
        <Autocomplete
          defaultValue={0}
          options={[0, 1, 2]}
          getOptionLabel={(option) => option.toString()}
          renderInput={(params) => <TextField {...params} autoFocus />}
          renderValue={(value, getItemProps) => {
            return <Chip label={value} {...getItemProps()} />;
          }}
        />,
      );

      expect(view.container.querySelector(`.${chipClasses.root}`)).to.have.text('0');
    });

    it('should not throw error on pressing ArrowLeft key with no value in single value rendering', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderValue={(value, getItemProps) => {
            return value ? <Chip label={value} {...getItemProps()} /> : null;
          }}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      expect(() => {
        fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      }).not.to.throw();

      expect(textbox).toHaveFocus();
    });

    it('should not throw error on pressing ArrowLeft key with input text but no value in single value rendering', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderValue={(value, getItemProps) => {
            return value ? <Chip label={value} {...getItemProps()} /> : null;
          }}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');

      fireEvent.change(textbox, { target: { value: 'on' } });

      expect(() => {
        fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      }).not.to.throw();

      expect(textbox).to.have.property('value', 'on');
      expect(textbox).toHaveFocus();
    });

    it('should move focus to the rendered value with ArrowLeft only when caret is at the start', () => {
      const options = ['one', 'two'];
      const view = render(
        <Autocomplete
          options={options}
          defaultValue={options[0]}
          renderValue={(value, getItemProps) => <Chip label={value} {...getItemProps()} />}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      const chip = view.container.querySelector(`.${chipClasses.root}`);

      // Type something so the input has content.
      fireEvent.change(textbox, { target: { value: 'foo' } });

      // Caret not at start: ArrowLeft should just move the caret, not focus the chip.
      textbox.setSelectionRange(2, 2);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      expect(textbox).toHaveFocus();

      // Caret at start: ArrowLeft should now move focus to the rendered value.
      textbox.setSelectionRange(0, 0);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      expect(chip).toHaveFocus();
    });

    it('should clear freeSolo input when moving focus to the rendered value with ArrowLeft and not restore it on ArrowRight', () => {
      const options = ['one', 'two'];
      render(
        <Autocomplete
          freeSolo
          options={options}
          defaultValue={options[0]}
          renderValue={(value, getItemProps) => <Chip label={value} {...getItemProps()} />}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const textbox = screen.getByRole('combobox');
      const chip = screen.getByRole('button', { name: 'one' });

      // Type some freeSolo text
      fireEvent.change(textbox, { target: { value: 'foo' } });
      expect(textbox).to.have.property('value', 'foo');

      // Caret at start: ArrowLeft should move focus to the rendered value
      textbox.setSelectionRange(0, 0);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      expect(chip).toHaveFocus();

      // Input text should be cleared
      expect(textbox).to.have.property('value', '');

      // ArrowRight should move focus back to input without restoring text
      fireEvent.keyDown(chip, { key: 'ArrowRight' });
      expect(textbox).toHaveFocus();
      expect(textbox).to.have.property('value', '');
    });
  });

  it('should not shrink the input label when value is an empty array in multiple mode using renderValue', () => {
    render(
      <Autocomplete
        multiple
        value={[]}
        options={['one', 'two', 'three']}
        renderValue={(values, getItemProps) =>
          values.map((option, index) => {
            const { key, ...itemProps } = getItemProps({ index });
            return <Chip key={key} label={option.title} {...itemProps} />;
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Fixed tag"
            slotProps={{
              ...params.slotProps,
              inputLabel: { ...params.slotProps.inputLabel, 'data-testid': 'label' },
            }}
          />
        )}
      />,
    );

    expect(screen.getByTestId('label')).to.have.attribute('data-shrink', 'false');
  });

  describe('prop: noOptionsText', () => {
    it('should render the no options text when there are no options', () => {
      render(
        <Autocomplete
          open
          options={[]}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      expect(screen.getByText('No options')).not.to.equal(null);
    });

    it('should render the custom no options text when there are no options', () => {
      render(
        <Autocomplete
          open
          options={[]}
          noOptionsText="No results"
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      expect(screen.getByText('No results')).not.to.equal(null);
    });

    it('should not render the no options text when loading and there are no options', () => {
      render(
        <Autocomplete
          open
          options={[]}
          loading
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      expect(screen.queryByText('No options')).to.equal(null);
    });

    it('should not render the no options text when freeSolo is true and there are no options', () => {
      render(
        <Autocomplete
          open
          options={[]}
          freeSolo
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      expect(screen.queryByText('No options')).to.equal(null);
    });

    it('should always render a status message container for no options', async () => {
      const { user } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const status = screen.getByRole('status');
      expect(status).to.have.attribute('aria-live', 'polite');
      expect(status).to.have.attribute('aria-atomic', 'true');
      expect(status.children).to.have.length(0);

      await user.type(screen.getByRole('combobox'), 'three');

      expect(status.children).to.have.length(1);
    });
  });

  // https://github.com/mui/material-ui/issues/47203
  it.skipIf(isJsdom())(
    'should not scroll the listbox to the top when listbox is scrolled down and one of the end option is clicked',
    () => {
      render(
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={['one', 'two', 'three', 'four', 'five']}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ listbox: { style: { padding: 0, maxHeight: '100px' } } }}
        />,
      );
      const textbox = screen.getByRole('combobox');

      // open listbox
      fireEvent.mouseDown(textbox);

      // close listbox
      fireEvent.mouseDown(textbox);

      // re-open listbox
      fireEvent.mouseDown(textbox);

      const listbox = screen.getByRole('listbox');
      const options = screen.getAllByRole('option');

      listbox.scrollBy(0, 180);

      fireEvent.click(options[4]);

      expect(listbox).not.to.have.property('scrollTop', 0);
    },
  );

  describe('exit transition', () => {
    it.skipIf(isJsdom())(
      'should preserve options in DOM during Popper exit transition',
      async () => {
        function TransitionPopper(props) {
          const { children, open: popperOpen, ...other } = props;
          return (
            <Popper {...other} open={popperOpen} transition>
              {({ TransitionProps }) => (
                <Grow {...TransitionProps} timeout={200}>
                  <div>{children}</div>
                </Grow>
              )}
            </Popper>
          );
        }
        TransitionPopper.propTypes = {
          children: PropTypes.node,
          open: PropTypes.bool,
        };

        const { user } = render(
          <Autocomplete
            options={['one', 'two', 'three']}
            slots={{ popper: TransitionPopper }}
            renderInput={(params) => <TextField {...params} />}
          />,
        );

        // Open popup
        await user.click(screen.getByRole('combobox'));
        expect(screen.getAllByRole('option')).to.have.length(3);

        // Close popup
        await user.keyboard('{Escape}');

        // Options should still be in DOM during transition
        expect(screen.getAllByRole('option')).to.have.length(3);
      },
    );

    it('should not show stale options from a prior session during exit', async () => {
      const { user, rerender } = render(
        <Autocomplete
          freeSolo
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ popper: { keepMounted: true } }}
        />,
      );

      const input = screen.getByRole('combobox');

      // Open popup and verify options
      await user.click(input);
      expect(screen.getAllByRole('option')).to.have.length(2);

      // Close popup
      await user.keyboard('{Escape}');

      // Change to empty options and re-open
      rerender(
        <Autocomplete
          freeSolo
          options={[]}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ popper: { keepMounted: true } }}
        />,
      );
      await user.click(input);

      // No options should be visible (not stale ones from prior session)
      expect(screen.queryAllByRole('option')).to.have.length(0);

      // Close again — should not flash stale options from the first session
      await user.keyboard('{Escape}');
      expect(screen.queryAllByRole('option')).to.have.length(0);
    });

    it.each([false, true])(
      'should preserve cached grouping when toggling groupBy with initial grouping %s',
      async (initialGrouping) => {
        function Test() {
          const [grouping, setGrouping] = React.useState(initialGrouping);

          return (
            <React.Fragment>
              <input
                type="checkbox"
                aria-label="Group options"
                checked={grouping}
                onChange={(event) => setGrouping(event.target.checked)}
              />
              <Autocomplete
                options={['one', 'two']}
                groupBy={grouping ? () => 'Group' : undefined}
                renderInput={(params) => <TextField {...params} />}
                slotProps={{ popper: { keepMounted: true } }}
              />
            </React.Fragment>
          );
        }

        const { user } = render(<Test />);
        const input = screen.getByRole('combobox');

        await user.click(input);
        const listbox = screen.getByRole('listbox');
        const previousContent = listbox.textContent;
        expect(screen.getAllByRole('option').map((option) => option.textContent)).to.deep.equal([
          'one',
          'two',
        ]);

        // Clicking the checkbox closes the popup before changing the grouping mode.
        await user.click(screen.getByRole('checkbox'));

        expect(input).to.have.attribute('aria-expanded', 'false');
        expect(document.querySelector('[role="listbox"]')).to.equal(listbox);
        expect(listbox).to.have.text(previousContent);
        expect(listbox.querySelectorAll('[role="option"]')).to.have.length(2);
        expect(listbox.querySelectorAll(`.${classes.groupLabel}`)).to.have.length(
          initialGrouping ? 1 : 0,
        );

        // Reopening uses the new grouping mode and keeps the options selectable.
        await user.click(input);
        expect(
          screen.getByRole('listbox').querySelectorAll(`.${classes.groupLabel}`),
        ).to.have.length(initialGrouping ? 0 : 1);
        await user.click(screen.getByRole('option', { name: 'two' }));
        expect(input).to.have.value('two');
      },
    );

    it('should disable pointer events on Popper when closing', async () => {
      const { user } = render(
        <Autocomplete
          options={['one']}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ popper: { keepMounted: true, 'data-testid': 'popper' } }}
        />,
      );

      // Open popup
      await user.click(screen.getByRole('combobox'));
      expect(screen.getByTestId('popper').style.pointerEvents).to.equal('');

      // Close popup
      await user.keyboard('{Escape}');

      // pointerEvents: none prevents stale clicks during exit animation
      expect(screen.getByTestId('popper').style.pointerEvents).to.equal('none');
    });
  });

  describe('Popper width', () => {
    it('should observe anchor element for resize when popup is open', async () => {
      const observeSpy = spy();
      const MockResizeObserver = class {
        observe() {
          observeSpy();
        }

        disconnect() {}
      };
      const originalRO = window.ResizeObserver;
      window.ResizeObserver = MockResizeObserver;

      try {
        const { user } = render(
          <Autocomplete
            options={['one', 'two']}
            renderInput={(params) => <TextField {...params} />}
            slotProps={{ popper: { 'data-testid': 'popper' } }}
          />,
        );

        await user.click(screen.getByRole('combobox'));
        expect(screen.getByTestId('popper')).not.to.equal(null);
        expect(observeSpy.callCount).to.be.greaterThan(0);
      } finally {
        window.ResizeObserver = originalRO;
      }
    });

    it('should disconnect ResizeObserver when popup closes', async () => {
      const disconnectSpy = spy();
      const MockResizeObserver = class {
        observe() {}

        disconnect() {
          disconnectSpy();
        }
      };
      const originalRO = window.ResizeObserver;
      window.ResizeObserver = MockResizeObserver;

      try {
        const { user } = render(
          <Autocomplete options={['one']} renderInput={(params) => <TextField {...params} />} />,
        );

        await user.click(screen.getByRole('combobox'));
        await user.keyboard('{Escape}');
        expect(disconnectSpy.callCount).to.be.greaterThan(0);
      } finally {
        window.ResizeObserver = originalRO;
      }
    });
  });

  describe('theme.focusVisible', () => {
    it.skipIf(isJsdom())('insets the curated ring on the keyboard-highlighted option', () => {
      render(
        <ThemeProvider theme={createTheme({ focusVisible: true })}>
          <Autocomplete
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />
        </ThemeProvider>,
      );
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      const option = screen.getAllByRole('option')[0];
      expect(option).to.have.class(classes.focusVisible);
      expect(option).toHaveComputedStyle({
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineOffset: '-2px',
      });
    });

    it.skipIf(isJsdom())('does not add the focus tint on a selected highlighted option', () => {
      render(
        <ThemeProvider theme={createTheme({ focusVisible: true })}>
          <Autocomplete
            open
            value="one"
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />
        </ThemeProvider>,
      );
      const combobox = screen.getByRole('combobox');
      // walk past "two" and "three" so the highlight lands back on the selected "one"
      fireEvent.keyDown(combobox, { key: 'ArrowDown' });
      fireEvent.keyDown(combobox, { key: 'ArrowDown' });
      fireEvent.keyDown(combobox, { key: 'ArrowDown' });

      const option = screen.getAllByRole('option')[0];
      expect(option).to.have.class(classes.focusVisible);
      expect(option).to.have.attribute('aria-selected', 'true');

      // The theme ring suppresses the extra focusOpacity bump, so the option keeps whatever the
      // highlight alone gives it. That value is media-dependent: pointer devices get the blended
      // `selectedOpacity + hoverOpacity`, while `@media (hover: none)` environments (headless
      // Firefox on CI, touch devices) fall back to `action.selected`.
      const backgroundColor = window.getComputedStyle(option).backgroundColor;
      expect(backgroundColor).not.to.equal('rgba(25, 118, 210, 0.2)');
      expect(['rgba(25, 118, 210, 0.12)', 'rgba(0, 0, 0, 0.08)']).to.contain(backgroundColor);
    });
  });
});
