import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { isWeekend } from 'date-fns';
import TextField from '@material-ui/core/TextField';
import { fireEvent, screen, act } from 'test/utils';
import DesktopDatePicker, { DesktopDatePickerProps } from '@material-ui/lab/DesktopDatePicker';
import { adapterToUse, createPickerRender } from '../internal/pickers/test-utils';
import { MakeOptional } from '../internal/pickers/typings/helpers';

function TestKeyboardDatePicker(
  PickerProps: MakeOptional<DesktopDatePickerProps, 'value' | 'onChange' | 'renderInput'>,
) {
  const [value, setValue] = React.useState<unknown>(
    PickerProps.value ?? adapterToUse.date('2019-01-01T00:00:00.000'),
  );

  return (
    <DesktopDatePicker
      value={value}
      onChange={(newDate) => setValue(newDate)}
      renderInput={(props) => <TextField placeholder="10/10/2018" {...props} />}
      {...PickerProps}
    />
  );
}

describe('<DesktopDatePicker /> keyboard interactions', () => {
  let clock: ReturnType<typeof useFakeTimers>;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });

  const render = createPickerRender();

  it('closes on Escape press', () => {
    const handleClose = spy();
    render(
      <DesktopDatePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
      />,
    );

    // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target -- don't care
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });

    expect(handleClose.callCount).to.equal(1);
  });

  context('input', () => {
    it('allows to change selected date from the input according to `format`', () => {
      const onChangeMock = spy();
      render(<TestKeyboardDatePicker onChange={onChangeMock} inputFormat="dd/MM/yyyy" />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '10/11/2018' },
      });

      expect(screen.getByRole('textbox')).to.have.value('10/11/2018');
      expect(onChangeMock.callCount).to.equal(1);
    });

    it("doesn't accept invalid date format", () => {
      render(<TestKeyboardDatePicker />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '01' },
      });
      expect(screen.getByRole('textbox')).to.have.attr('aria-invalid', 'true');
    });

    it('removes invalid state when chars are cleared from invalid input', () => {
      render(<TestKeyboardDatePicker />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '01' },
      });
      expect(screen.getByRole('textbox')).to.have.attr('aria-invalid', 'true');
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '' },
      });
      expect(screen.getByRole('textbox')).to.have.attr('aria-invalid', 'false');
    });

    it('renders correct format helper text and placeholder', () => {
      render(
        <TestKeyboardDatePicker
          mask="____"
          inputFormat="yyyy"
          renderInput={(params) => (
            <TextField {...params} id="test" helperText={params?.inputProps?.placeholder} />
          )}
        />,
      );

      const helperText = document.getElementById('test-helper-text');
      expect(helperText).to.have.text('yyyy');

      expect(screen.getByRole('textbox')).to.have.attr('placeholder', 'yyyy');
    });

    it('correctly input dates according to the input mask', () => {
      render(<TestKeyboardDatePicker />);
      const input = screen.getByRole('textbox');

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '011' },
      });
      expect(input).to.have.value('01/1');

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '01102019' },
      });
      expect(input).to.have.value('01/10/2019');
    });

    it('prop `disableMaskedInput` – disables mask and allows to input anything to the field', () => {
      render(<TestKeyboardDatePicker disableMaskedInput />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'any text' },
      });

      const input = screen.getByRole('textbox');
      expect(input).to.have.value('any text');
      expect(input).to.have.attr('aria-invalid', 'true');
    });

    it('prop `disableMaskedInput` – correctly parses date string when mask is disabled', () => {
      const onChangeMock = spy();
      render(<TestKeyboardDatePicker onChange={onChangeMock} disableMaskedInput />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '01/10/2019' },
      });

      const input = screen.getByRole('textbox');
      expect(input).to.have.value('01/10/2019');
      expect(input).to.have.attribute('aria-invalid', 'false');
      expect(onChangeMock.callCount).to.equal(1);
    });
  });

  context('input validaiton', () => {
    [
      { expectedError: 'invalidDate', props: {}, input: 'invalidText' },
      { expectedError: 'disablePast', props: { disablePast: true }, input: '01/01/1900' },
      { expectedError: 'disableFuture', props: { disableFuture: true }, input: '01/01/2050' },
      {
        expectedError: 'minDate',
        props: { minDate: adapterToUse.date('2000-01-01') },
        input: '01/01/1990',
      },
      {
        expectedError: 'maxDate',
        props: { maxDate: adapterToUse.date('2000-01-01') },
        input: '01/01/2010',
      },
      {
        expectedError: 'shouldDisableDate',
        props: { shouldDisableDate: isWeekend },
        input: '04/25/2020',
      },
    ].forEach(({ props, input, expectedError }) => {
      it(`dispatches ${expectedError} error`, () => {
        const onErrorMock = spy();
        // we are running validation on value change
        function DatePickerInput() {
          const [date, setDate] = React.useState<Date | null>(null);

          return (
            <DesktopDatePicker<Date>
              value={date}
              onError={onErrorMock}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(inputProps) => <TextField {...inputProps} />}
              {...props}
            />
          );
        }

        render(<DatePickerInput />);

        fireEvent.change(screen.getByRole('textbox'), {
          target: {
            value: input,
          },
        });

        expect(onErrorMock.callCount).to.equal(1);
        expect(onErrorMock.args[0][0]).to.equal(expectedError);
      });
    });
  });

  // TODO
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('Opens calendar by keydown on the open button', () => {
    render(<TestKeyboardDatePicker />);
    const openButton = screen.getByLabelText(/choose date/i);

    act(() => {
      openButton.focus();
    });

    fireEvent.keyDown(openButton, {
      key: 'Enter',
      keyCode: 13,
    });

    expect(screen.queryByRole('dialog')).toBeVisible();
  });
});
