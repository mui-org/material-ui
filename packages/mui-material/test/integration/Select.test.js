import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

describe('<Select> integration', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describe('with Dialog', () => {
    function SelectAndDialog() {
      const [value, setValue] = React.useState(10);
      const handleChange = (event) => {
        setValue(Number(event.target.value));
      };

      return (
        <Dialog open>
          <Select
            MenuProps={{
              transitionDuration: 0,
              slotProps: { backdrop: { 'data-testid': 'select-backdrop' } },
            }}
            value={value}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Dialog>
      );
    }

    it('should focus the selected item', async () => {
      render(<SelectAndDialog />);

      const trigger = screen.getByRole('combobox');
      // Let's open the select component
      // in the browser user click also focuses
      fireEvent.mouseDown(trigger);

      const options = screen.getAllByRole('option');
      expect(options[1]).toHaveFocus();

      // Now, let's close the select component
      await act(async () => {
        screen.getByTestId('select-backdrop').click();
      });
      clock.tick(0);

      expect(screen.queryByRole('listbox')).to.equal(null);
      expect(trigger).toHaveFocus();
    });

    it('should be able to change the selected item', async () => {
      render(<SelectAndDialog />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAccessibleName('');
      // Let's open the select component
      // in the browser user click also focuses
      fireEvent.mouseDown(trigger);

      const options = screen.getAllByRole('option');
      expect(options[1]).toHaveFocus();

      // Now, let's close the select component
      await act(async () => {
        options[2].click();
      });
      clock.tick(0);

      expect(screen.queryByRole('listbox')).to.equal(null);
      expect(trigger).toHaveFocus();
      expect(trigger).to.have.text('Twenty');
    });
  });

  describe('with label', () => {
    it('requires `id` and `labelId` for a proper accessible name', () => {
      render(
        <FormControl>
          <InputLabel id="label">Age</InputLabel>
          <Select id="input" labelId="label" value="10">
            <MenuItem value="">none</MenuItem>
            <MenuItem value="10">Ten</MenuItem>
          </Select>
        </FormControl>,
      );

      expect(screen.getByRole('combobox')).toHaveAccessibleName('Age');
    });

    // we're somewhat abusing "focus" here. What we're actually interested in is
    // displaying it as "active". WAI-ARIA authoring practices do not consider the
    // the trigger part of the widget while a native <select /> will outline the trigger
    // as well
    it('is displayed as focused while open', async () => {
      render(
        <FormControl>
          <InputLabel classes={{ focused: 'focused-label' }} data-testid="label">
            Age
          </InputLabel>
          <Select
            MenuProps={{
              transitionDuration: 0,
            }}
            value=""
          >
            <MenuItem value="">none</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>,
      );

      const trigger = screen.getByRole('combobox');
      await act(async () => {
        trigger.focus();
      });
      fireEvent.keyDown(trigger, { key: 'Enter' });
      clock.tick(0);

      expect(screen.getByTestId('label')).to.have.class('focused-label');
    });

    it('does not stays in an active state if an open action did not actually open', async () => {
      // test for https://github.com/mui/material-ui/issues/17294
      // we used to set a flag to stop blur propagation when we wanted to open the
      // select but never considered what happened if the select never opened
      const { container } = render(
        <FormControl>
          <InputLabel classes={{ focused: 'focused-label' }} htmlFor="age-simple">
            Age
          </InputLabel>
          <Select inputProps={{ id: 'age' }} open={false} value="">
            <MenuItem value="">none</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>,
      );
      const trigger = screen.getByRole('combobox');

      await act(async () => {
        trigger.focus();
      });

      expect(container.querySelector('[for="age-simple"]')).to.have.class('focused-label');

      fireEvent.keyDown(trigger, { key: 'Enter' });

      expect(container.querySelector('[for="age-simple"]')).to.have.class('focused-label');

      await act(async () => {
        trigger.blur();
      });

      expect(container.querySelector('[for="age-simple"]')).not.to.have.class('focused-label');
    });
  });
});
