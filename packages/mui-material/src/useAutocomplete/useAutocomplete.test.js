import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as React from 'react';
import {
  createRenderer,
  screen,
  ErrorBoundary,
  act,
  fireEvent,
  reactMajor,
  isJsdom,
  flushEffects,
} from '@mui/internal-test-utils';
import { spy } from 'sinon';
import useAutocomplete, { createFilterOptions } from '@mui/material/useAutocomplete';

describe('useAutocomplete', () => {
  const { render } = createRenderer();

  it('should preserve DOM nodes of options when re-ordering', () => {
    function Test(props) {
      const { options } = props;
      const {
        groupedOptions,
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
      } = useAutocomplete({
        options,
        open: true,
      });

      return (
        <div>
          <div {...getRootProps()}>
            <label {...getInputLabelProps()}>useAutocomplete</label>
            <input {...getInputProps()} />
          </div>
          {groupedOptions.length > 0 ? (
            <ul {...getListboxProps()}>
              {groupedOptions.map((option, index) => {
                const { key, ...optionProps } = getOptionProps({ option, index });
                return (
                  <li key={key} {...optionProps}>
                    {option}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      );
    }

    const view = render(<Test options={['foo', 'bar']} />);
    const [fooOptionAsFirst, barOptionAsSecond] = screen.getAllByRole('option');
    view.rerender(<Test options={['bar', 'foo']} />);
    const [barOptionAsFirst, fooOptionAsSecond] = screen.getAllByRole('option');

    // If the DOM nodes are not preserved VO will not read the first option again since it thinks it didn't change.
    expect(fooOptionAsFirst).to.equal(fooOptionAsSecond);
    expect(barOptionAsFirst).to.equal(barOptionAsSecond);
  });

  describe('createFilterOptions', () => {
    it('defaults to getOptionLabel for text filtering', () => {
      const filterOptions = createFilterOptions();

      const getOptionLabel = (option) => option.name;
      const options = [
        {
          id: '1234',
          name: 'cat',
        },
        {
          id: '5678',
          name: 'dog',
        },
        {
          id: '9abc',
          name: 'emu',
        },
      ];

      expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([
        options[0],
      ]);
    });

    it('filters without error with empty option set', () => {
      const filterOptions = createFilterOptions();

      const getOptionLabel = (option) => option.name;
      const options = [];

      expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([]);
    });

    describe('option: limit', () => {
      it('stops evaluating options once the result limit is reached', () => {
        const filterOptions = createFilterOptions({ limit: 2 });
        const getOptionLabel = spy((option) => option);
        const options = ['dog', 'cat', 'cow', 'camel', 'crow'];

        expect(filterOptions(options, { inputValue: 'c', getOptionLabel })).to.deep.equal([
          'cat',
          'cow',
        ]);
        expect(getOptionLabel.callCount).to.equal(3);
      });

      it('evaluates all options when there are fewer matches than the limit', () => {
        const filterOptions = createFilterOptions({ limit: 3 });
        const getOptionLabel = spy((option) => option);
        const options = ['dog', 'cat', 'emu'];

        expect(filterOptions(options, { inputValue: 'c', getOptionLabel })).to.deep.equal(['cat']);
        expect(getOptionLabel.callCount).to.equal(options.length);
      });

      it('stops evaluating custom string labels once the result limit is reached', () => {
        const stringify = spy((option) => option.name);
        const filterOptions = createFilterOptions({ limit: 1, stringify });
        const getOptionLabel = spy();
        const options = [{ name: 'dog' }, { name: 'café' }, { name: 'camel' }];

        expect(filterOptions(options, { inputValue: 'CAFE', getOptionLabel })).to.deep.equal([
          options[1],
        ]);
        expect(stringify.callCount).to.equal(2);
        expect(getOptionLabel.callCount).to.equal(0);
      });

      it.each([0, -1, 1.5, NaN, Infinity])('preserves slicing behavior for limit %s', (limit) => {
        const filterOptions = createFilterOptions({ limit });
        const options = ['cat', 'cow', 'camel'];

        expect(
          filterOptions(options, { inputValue: 'c', getOptionLabel: (option) => option }),
        ).to.deep.equal(options.slice(0, limit));
      });

      it('limits the number of suggested options to be shown', () => {
        const filterOptions = createFilterOptions({ limit: 2 });

        const getOptionLabel = (option) => option.name;
        const options = [
          {
            id: '1234',
            name: 'a1',
          },
          {
            id: '5678',
            name: 'a2',
          },
          {
            id: '9abc',
            name: 'a3',
          },
          {
            id: '9abc',
            name: 'a4',
          },
        ];

        expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([
          options[0],
          options[1],
        ]);
      });
    });

    describe('option: matchFrom', () => {
      let filterOptions;
      let getOptionLabel;
      let options;

      beforeEach(() => {
        filterOptions = createFilterOptions({ matchFrom: 'any' });
        getOptionLabel = (option) => option.name;
        options = [
          {
            id: '1234',
            name: 'ab',
          },
          {
            id: '5678',
            name: 'ba',
          },
          {
            id: '9abc',
            name: 'ca',
          },
        ];
      });

      describe('any', () => {
        it('show all results that match', () => {
          expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal(
            options,
          );
        });
      });

      describe('empty', () => {
        it('does not call getOptionLabel if filter is empty', () => {
          const getOptionLabelSpy = spy(getOptionLabel);
          expect(
            filterOptions(options, { inputValue: '', getOptionLabel: getOptionLabelSpy }),
          ).to.deep.equal(options);
          expect(getOptionLabelSpy.callCount).to.equal(0);
        });
      });

      describe('start', () => {
        it('show only results that start with search', () => {
          expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal(
            options,
          );
        });
      });
    });

    describe('option: ignoreAccents', () => {
      it('does not ignore accents', () => {
        const filterOptions = createFilterOptions({ ignoreAccents: false });

        const getOptionLabel = (option) => option.name;
        const options = [
          {
            id: '1234',
            name: 'áb',
          },
          {
            id: '5678',
            name: 'ab',
          },
          {
            id: '9abc',
            name: 'áe',
          },
          {
            id: '9abc',
            name: 'ae',
          },
        ];

        expect(filterOptions(options, { inputValue: 'á', getOptionLabel })).to.deep.equal([
          options[0],
          options[2],
        ]);
      });
    });

    describe('option: ignoreCase', () => {
      it('matches results with case insensitive', () => {
        const filterOptions = createFilterOptions({ ignoreCase: false });

        const getOptionLabel = (option) => option.name;
        const options = [
          {
            id: '1234',
            name: 'Ab',
          },
          {
            id: '5678',
            name: 'ab',
          },
          {
            id: '9abc',
            name: 'Ae',
          },
          {
            id: '9abc',
            name: 'ae',
          },
        ];

        expect(filterOptions(options, { inputValue: 'A', getOptionLabel })).to.deep.equal([
          options[0],
          options[2],
        ]);
      });
    });
  });

  // can't catch render errors in the browser for unknown reason
  // tried try-catch + error boundary + window onError preventDefault
  // TODO is this fixed?
  it.skipIf(!isJsdom())('should warn if the input is not bound', async () => {
    function Test(props) {
      const { options } = props;
      const {
        groupedOptions,
        getRootProps,
        getInputLabelProps,
        // getInputProps,
        getListboxProps,
        getOptionProps,
      } = useAutocomplete({
        options,
        open: true,
      });

      return (
        <div>
          <div {...getRootProps()}>
            <label {...getInputLabelProps()}>useAutocomplete</label>
          </div>
          {groupedOptions.length > 0 ? (
            <ul {...getListboxProps()}>
              {groupedOptions.map((option, index) => {
                const { key, ...optionProps } = getOptionProps({ option, index });
                return (
                  <li key={key} {...optionProps}>
                    {option}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      );
    }

    const muiErrorMessage = 'MUI: Unable to find the input element.';
    const aboveErrorUlElementMessage = 'The above error occurred in the <ul> component';
    const aboveErrorTestComponentMessage = 'The above error occurred in the <Test> component';
    const node16ErrorMessage =
      "TypeError: Cannot read properties of null (reading 'removeAttribute')";
    const olderNodeErrorMessage = "TypeError: Cannot read property 'removeAttribute' of null";

    const nodeVersion = Number(process.versions.node.split('.')[0]);
    const nodeErrorMessage = nodeVersion >= 16 ? node16ErrorMessage : olderNodeErrorMessage;

    const defaultErrorMessages = [muiErrorMessage, nodeErrorMessage, nodeErrorMessage];

    const errorMessagesByReactMajor = {
      17: [
        nodeErrorMessage,
        muiErrorMessage,
        nodeErrorMessage,
        aboveErrorUlElementMessage,
        aboveErrorTestComponentMessage,
      ],
      18: [
        nodeErrorMessage,
        muiErrorMessage,
        nodeErrorMessage,
        muiErrorMessage,
        nodeErrorMessage,
        aboveErrorUlElementMessage,
        aboveErrorTestComponentMessage,
        aboveErrorTestComponentMessage,
      ],
      19: [
        muiErrorMessage,
        muiErrorMessage,
        nodeErrorMessage,
        nodeErrorMessage,
        nodeErrorMessage,
        nodeErrorMessage,
      ],
    };

    const devErrorMessages = errorMessagesByReactMajor[reactMajor] || defaultErrorMessages;

    expect(() => {
      render(
        <ErrorBoundary>
          <Test options={['foo', 'bar']} />
        </ErrorBoundary>,
      );
    }).toErrorDev(devErrorMessages);

    await flushEffects();
  });

  it('should not crash when the input ref is cleared before a pending highlighted index sync', async () => {
    function Test() {
      const [showAutocomplete, setShowAutocomplete] = React.useState(true);
      const options = showAutocomplete ? ['foo', 'bar'] : [];
      const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
        useAutocomplete({ options, open: true });

      return (
        <React.Fragment>
          <button type="button" onClick={() => setShowAutocomplete(false)}>
            Hide
          </button>
          <div {...getRootProps()}>
            {showAutocomplete ? <input {...getInputProps()} /> : null}
            {groupedOptions.length > 0 ? (
              <ul {...getListboxProps()}>
                {groupedOptions.map((option, index) => {
                  const { key, ...optionProps } = getOptionProps({ option, index });
                  return (
                    <li key={key} {...optionProps}>
                      {option}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </React.Fragment>
      );
    }

    const { user } = render(<Test />);

    // This hides the input/listbox while the hook stays mounted. A full unmount
    // doesn't run the highlighted index sync after refs are cleared; this state
    // update does, so it exercises the problematic ordering.
    await user.click(screen.getByRole('button', { name: 'Hide' }));

    await flushEffects();
  });

  describe('prop: freeSolo', () => {
    it('should not reset if the component value does not change on blur', () => {
      function Test(props) {
        const { options } = props;
        const { getInputProps } = useAutocomplete({ options, open: true, freeSolo: true });

        return <input {...getInputProps()} />;
      }
      render(<Test options={['foo', 'bar']} />);
      const input = screen.getByRole('combobox');

      fireEvent.change(input, { target: { value: 'free' } });
      act(() => {
        input.blur();
      });

      expect(input.value).to.equal('free');
    });
  });

  describe('getInputProps', () => {
    it('should disable input element', () => {
      function Test(props) {
        const { options } = props;
        const { getInputProps } = useAutocomplete({ options, disabled: true });

        return <input {...getInputProps()} />;
      }
      render(<Test options={['foo', 'bar']} />);
      const input = screen.getByRole('combobox');

      expect(input).to.have.attribute('disabled');
    });
  });

  it('should allow tuples or arrays as value when multiple=false', () => {
    const defaultValue = ['bar'];

    function Test() {
      const { getClearProps, getInputProps } = useAutocomplete({
        defaultValue,
        disableClearable: false,
        getOptionLabel: ([val]) => val,
        isOptionEqualToValue: (option, value) => {
          if (option === value) {
            return true;
          }
          return option[0] === value[0];
        },
        multiple: false,
        options: [['foo'], defaultValue, ['baz']],
      });

      return (
        <div>
          <input {...getInputProps()} />
          <button data-testid="button" {...getClearProps()} />;
        </div>
      );
    }

    render(<Test />);

    const button = screen.getByTestId('button');

    expect(() => {
      fireEvent.click(button);
    }).not.to.throw();
  });

  describe('prop: isOptionEqualToValue', () => {
    it('should respect custom equality even when option is referentially equal to value', () => {
      const option = { id: 1, label: 'foo' };

      function Test() {
        const { groupedOptions, getInputProps, getListboxProps, getOptionProps } = useAutocomplete({
          options: [option],
          open: true,
          multiple: true,
          value: [option],
          filterSelectedOptions: true,
          getOptionLabel: (optionParam) => optionParam.label,
          isOptionEqualToValue: () => false,
        });

        return (
          <div>
            <input {...getInputProps()} />
            <ul {...getListboxProps()}>
              {groupedOptions.map((optionParam, index) => {
                const { key, ...optionProps } = getOptionProps({ option: optionParam, index });
                return (
                  <li key={key} {...optionProps}>
                    {optionParam.label}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }

      render(<Test />);

      const renderedOption = screen.getByRole('option');
      expect(renderedOption).to.have.text('foo');
      expect(renderedOption).to.have.attribute('aria-selected', 'false');
    });
  });

  describe('removing nullish raw values', () => {
    [null, undefined].forEach((valueToRemove) => {
      ['Backspace', 'delete button'].forEach((method) => {
        it(`preserves details.option for ${valueToRemove} removed with ${method}`, async () => {
          const onChange = spy();

          function Test() {
            const { getRootProps, getInputProps, getItemProps } = useAutocomplete({
              options: [],
              multiple: true,
              defaultValue: [valueToRemove],
              onChange,
            });

            return (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button onClick={getItemProps({ index: 0 }).onDelete}>Remove</button>
              </div>
            );
          }

          const { user } = render(<Test />);

          if (method === 'Backspace') {
            await user.click(screen.getByRole('combobox'));
            await user.keyboard('{Backspace}');
          } else {
            await user.click(screen.getByRole('button', { name: 'Remove' }));
          }

          expect(onChange.callCount).to.equal(1);
          expect(onChange.args[0][1]).to.deep.equal([]);
          expect(onChange.args[0][2]).to.equal('removeOption');
          expect(onChange.args[0][3]).to.deep.equal({ option: valueToRemove });
        });
      });
    });
  });

  describe('prop: getOptionValue', () => {
    const options = [
      { id: 'foo', label: 'Foo' },
      { id: 'bar', label: 'Bar' },
    ];
    const freeSoloOptions = [
      { id: 1, label: 'Foo' },
      { id: 2, label: 'Bar' },
    ];

    const freeSoloStringMappingError =
      'MUI: The `getOptionValue` method of useAutocomplete returned the string value "draft" while `freeSolo` is enabled.\n' +
      'useAutocomplete cannot distinguish string option values from free-solo values. ' +
      'Return a number or boolean from `getOptionValue`, or disable `freeSolo`.';

    const getOptionValue = (option) => option.id;

    function Test(props) {
      const { groupedOptions, getRootProps, getInputProps, getListboxProps, getOptionProps } =
        useAutocomplete({
          options,
          open: true,
          multiple: true,
          value: ['foo'],
          getOptionLabel: (option) => option.label,
          getOptionValue,
          ...props,
        });

      return (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <ul {...getListboxProps()}>
            {groupedOptions.map((option, index) => {
              const { key, ...optionProps } = getOptionProps({ option, index });
              return (
                <li key={key} {...optionProps}>
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    // These tests use the same string as an option's mapped value and as free-solo text.
    // Capture the expected development error while verifying the JavaScript fallback.
    function renderWithFreeSoloStringMapping(element) {
      let view;
      expect(() => {
        view = render(element, { strict: false });
      }).toErrorDev(freeSoloStringMappingError);
      return view;
    }

    it('uses the mapped option value for default equality', () => {
      render(<Test />);

      expect(screen.getByRole('option', { name: 'Foo' })).to.have.attribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('option', { name: 'Bar' })).to.have.attribute(
        'aria-selected',
        'false',
      );
    });

    it('returns a resolver for mapped values', () => {
      let resolveOptionValue;

      function ResolverTest() {
        const { getInputProps, getOptionFromValue } = useAutocomplete({
          options,
          getOptionValue: (option) => option.id,
        });
        resolveOptionValue = getOptionFromValue;
        return <input {...getInputProps()} />;
      }

      render(<ResolverTest />);

      expect(resolveOptionValue('foo').option).to.equal(options[0]);
      expect(resolveOptionValue('missing')).to.equal(null);
    });

    describe.each([false, true])('nullable options with custom equality: %s', (customEquality) => {
      it('distinguishes matched null and undefined options from missing IDs', () => {
        let resolveOptionValue;
        const getOptionValue = (option) => {
          if (option === null) {
            return 0;
          }
          return option === undefined ? 1 : 2;
        };

        function ResolverTest() {
          const { getInputProps, getOptionFromValue } = useAutocomplete({
            options: [null, undefined, 'Other'],
            getOptionValue,
            isOptionEqualToValue: customEquality
              ? (option, value) => getOptionValue(option) === value
              : undefined,
          });
          resolveOptionValue = getOptionFromValue;
          return <input {...getInputProps()} />;
        }

        render(<ResolverTest />);

        expect(resolveOptionValue(0)).to.deep.equal({ option: null });
        expect(resolveOptionValue(1)).to.deep.equal({ option: undefined });
        expect(resolveOptionValue(2).option).to.equal('Other');
        expect(resolveOptionValue(3)).to.equal(null);
      });
    });

    describe('options created by filterOptions', () => {
      const generatedOption = { id: 'baz', alternateId: 'new-baz', label: 'Baz' };
      const customIsOptionEqualToValue = (option, value) =>
        option.id.toLowerCase() === value.toLowerCase();
      let useAutocompleteResult;

      function GeneratedOptionTest(props) {
        useAutocompleteResult = useAutocomplete({
          options,
          getOptionValue,
          filterOptions: (optionsToFilter, { inputValue }) =>
            inputValue === 'Baz' ? [generatedOption] : optionsToFilter,
          ...props,
        });
        const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
          useAutocompleteResult;

        return (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {groupedOptions.length > 0 && (
              <ul {...getListboxProps()}>
                {groupedOptions.map((option, index) => {
                  const { key, ...optionProps } = getOptionProps({ option, index });
                  return (
                    <li key={key} {...optionProps}>
                      {option.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      }

      it('resolves a generated option after a cached custom equality miss and prefers updated options', async () => {
        const { user, rerender } = render(
          <GeneratedOptionTest isOptionEqualToValue={customIsOptionEqualToValue} />,
        );

        expect(useAutocompleteResult.getOptionFromValue('BAZ')).to.equal(null);

        await user.type(screen.getByRole('combobox'), 'Baz');
        await user.keyboard('{ArrowDown}{Enter}');

        expect(useAutocompleteResult.value).to.equal('baz');
        expect(useAutocompleteResult.getOptionFromValue('BAZ').option).to.equal(generatedOption);
        expect(screen.getByRole('combobox')).to.have.value('Baz');

        const updatedOption = { id: 'baz', label: 'Updated Baz' };
        rerender(
          <GeneratedOptionTest
            isOptionEqualToValue={customIsOptionEqualToValue}
            options={[...options, updatedOption]}
          />,
        );

        expect(useAutocompleteResult.getOptionFromValue('BAZ').option).to.equal(updatedOption);

        await user.tab();

        expect(screen.getByRole('combobox')).to.have.value('Updated Baz');
      });

      it.each([
        {
          description: 'undefined',
          generated: { label: 'Baz' },
          returned: 'a value of type undefined',
        },
        { description: 'null', generated: { id: null, label: 'Baz' }, returned: 'null' },
        { description: 'NaN', generated: { id: NaN, label: 'Baz' }, returned: 'NaN' },
        {
          description: 'an object',
          generated: { id: {}, label: 'Baz' },
          returned: 'a value of type object',
        },
        {
          description: 'a symbol',
          generated: { id: Symbol('id'), label: 'Baz' },
          returned: 'a value of type symbol',
        },
        {
          description: 'a freeSolo string',
          generated: { id: 'draft', label: 'Baz' },
          freeSolo: true,
        },
      ])(
        'warns once when a generated option maps to $description',
        async ({ generated, returned, freeSolo = false }) => {
          const { user } = render(
            <GeneratedOptionTest
              options={[]}
              value={null}
              freeSolo={freeSolo}
              filterOptions={() => [generated]}
            />,
          );
          const textbox = screen.getByRole('combobox');
          const expectedError = freeSolo
            ? freeSoloStringMappingError
            : `MUI: The \`getOptionValue\` method of useAutocomplete returned ${returned}, which is not a valid option value.\n` +
              'useAutocomplete uses this value to identify and match options. ' +
              'Return a unique string, number, or boolean for every option.';
          const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

          try {
            await user.type(textbox, 'Baz');
            expect(consoleError).not.toHaveBeenCalled();

            await user.click(screen.getByRole('option', { name: 'Baz' }));
            expect(consoleError).toHaveBeenCalledExactlyOnceWith(expectedError);

            await user.type(textbox, 'Baz');
            await user.click(screen.getByRole('option', { name: 'Baz' }));
            expect(consoleError).toHaveBeenCalledExactlyOnceWith(expectedError);
          } finally {
            consoleError.mockRestore();
          }
        },
      );

      it.each([
        { name: 'default equality', isOptionEqualToValue: undefined },
        { name: 'custom equality', isOptionEqualToValue: customIsOptionEqualToValue },
      ])('forgets deselected generated options with $name', async ({ isOptionEqualToValue }) => {
        const { user } = render(
          <GeneratedOptionTest multiple isOptionEqualToValue={isOptionEqualToValue} />,
        );

        await user.type(screen.getByRole('combobox'), 'Baz');
        await user.keyboard('{ArrowDown}{Enter}');

        expect(useAutocompleteResult.getOptionFromValue('baz').option).to.equal(generatedOption);

        await user.keyboard('{Backspace}');

        expect(useAutocompleteResult.value).to.deep.equal([]);
        expect(useAutocompleteResult.getOptionFromValue('baz')).to.equal(null);
      });

      it('uses the current mapper to resolve retained options', async () => {
        const { user, rerender } = render(<GeneratedOptionTest value="baz" />);

        await user.type(screen.getByRole('combobox'), 'Baz');
        await user.keyboard('{ArrowDown}{Enter}');

        expect(useAutocompleteResult.getOptionFromValue('baz').option).to.equal(generatedOption);

        rerender(
          <GeneratedOptionTest
            value="new-baz"
            getOptionValue={(option) => option.alternateId ?? option.id}
          />,
        );

        expect(useAutocompleteResult.getOptionFromValue('baz')).to.equal(null);
        expect(useAutocompleteResult.getOptionFromValue('new-baz').option).to.equal(
          generatedOption,
        );
        expect(screen.getByRole('combobox')).to.have.value('Baz');

        // The selected value no longer matches under the original mapper.
        rerender(<GeneratedOptionTest value="new-baz" />);

        expect(useAutocompleteResult.getOptionFromValue('new-baz')).to.equal(null);
        expect(useAutocompleteResult.getOptionFromValue('baz')).to.equal(null);
      });

      it('forgets generated options rejected by a controlled value', async () => {
        const onChange = spy();
        const { user } = render(<GeneratedOptionTest value={null} onChange={onChange} />);

        await user.type(screen.getByRole('combobox'), 'Baz');
        await user.keyboard('{ArrowDown}{Enter}');

        expect(onChange.firstCall.args[1]).to.equal('baz');
        expect(useAutocompleteResult.value).to.equal(null);
        expect(useAutocompleteResult.getOptionFromValue('baz')).to.equal(null);
      });
    });

    it('gives freeSolo strings precedence over colliding mapped option values', () => {
      let resolveOptionValue;
      const collidingOptions = [{ id: 'draft', label: 'Published' }];

      function ResolverTest() {
        const { getInputProps, getOptionFromValue } = useAutocomplete({
          options: collidingOptions,
          freeSolo: true,
          getOptionValue: (option) => option.id,
        });
        resolveOptionValue = getOptionFromValue;
        return <input {...getInputProps()} />;
      }

      renderWithFreeSoloStringMapping(<ResolverTest />);

      expect(resolveOptionValue('draft').option).to.equal('draft');
    });

    it('gives freeSolo strings precedence when custom equality matches an option', () => {
      let resolveOptionValue;
      const collidingOptions = [{ id: 'draft', label: 'Published' }];

      function ResolverTest() {
        const { getInputProps, getOptionFromValue } = useAutocomplete({
          options: collidingOptions,
          freeSolo: true,
          getOptionValue: (option) => option.id,
          isOptionEqualToValue: () => true,
        });
        resolveOptionValue = getOptionFromValue;
        return <input {...getInputProps()} />;
      }

      renderWithFreeSoloStringMapping(<ResolverTest />);

      expect(resolveOptionValue('draft').option).to.equal('draft');
    });

    it('rebuilds the mapped value resolver when the options change', () => {
      let resolveOptionValue;
      const getOptionValue = (option) => option.id;
      const initialOptions = [{ id: 'foo', label: 'Initial Foo' }];
      const updatedOptions = [{ id: 'foo', label: 'Updated Foo' }];

      function ResolverTest({ options: optionsProp }) {
        const { getInputProps, getOptionFromValue } = useAutocomplete({
          options: optionsProp,
          getOptionValue,
        });
        resolveOptionValue = getOptionFromValue;
        return <input {...getInputProps()} />;
      }

      const { rerender } = render(<ResolverTest options={initialOptions} />);
      expect(resolveOptionValue('foo').option).to.equal(initialOptions[0]);

      rerender(<ResolverTest options={updatedOptions} />);
      expect(resolveOptionValue('foo').option).to.equal(updatedOptions[0]);
    });

    it('refreshes mapped keys when the mapper changes with the same options', () => {
      const resolverOptions = [{ id: 'foo', alternateId: 'bar', label: 'Foo' }];
      let resolveOptionValue;

      function ResolverTest({ getOptionValue: getValue }) {
        const { getInputProps, getOptionFromValue } = useAutocomplete({
          options: resolverOptions,
          getOptionValue: getValue,
        });
        resolveOptionValue = getOptionFromValue;
        return <input {...getInputProps()} />;
      }

      const { rerender } = render(<ResolverTest getOptionValue={(option) => option.id} />);

      expect(resolveOptionValue('foo').option).to.equal(resolverOptions[0]);
      expect(resolveOptionValue('bar')).to.equal(null);

      rerender(<ResolverTest getOptionValue={(option) => option.alternateId} />);

      expect(resolveOptionValue('foo')).to.equal(null);
      expect(resolveOptionValue('bar').option).to.equal(resolverOptions[0]);
    });

    describe('cached custom equality resolutions', () => {
      const resolverOptions = [
        { id: 'foo', label: 'First Foo' },
        { id: 'FOO', label: 'Second Foo' },
      ];
      const compare = (option, value) => option.id.toLowerCase() === value.toLowerCase();
      let resolveOptionValue;

      function ResolverTest({
        options: optionsProp = resolverOptions,
        isOptionEqualToValue = compare,
        ...other
      }) {
        const { getInputProps, getOptionFromValue } = useAutocomplete({
          options: optionsProp,
          getOptionValue,
          isOptionEqualToValue,
          ...other,
        });
        resolveOptionValue = getOptionFromValue;
        return <input {...getInputProps()} />;
      }

      it('reuses the first match and cached misses across input rerenders', async () => {
        const isOptionEqualToValue = spy(compare);
        const { user } = render(<ResolverTest isOptionEqualToValue={isOptionEqualToValue} />);

        expect(resolveOptionValue('FoO').option).to.equal(resolverOptions[0]);
        expect(resolveOptionValue('missing')).to.equal(null);
        // The first three calls to isOptionEqualToValue are expected: two for 'FoO' and one for 'missing'.
        expect(isOptionEqualToValue.callCount).to.equal(3);
        isOptionEqualToValue.resetHistory();

        expect(resolveOptionValue('FoO').option).to.equal(resolverOptions[0]);
        expect(resolveOptionValue('missing')).to.equal(null);
        expect(isOptionEqualToValue.callCount).to.equal(0);

        await user.type(screen.getByRole('combobox'), 'Foo');

        expect(resolveOptionValue('FoO').option).to.equal(resolverOptions[0]);
        expect(resolveOptionValue('missing')).to.equal(null);
        expect(isOptionEqualToValue.callCount).to.equal(0);
      });

      it('preserves custom resolutions when only the mapper changes, but resets when mapping is disabled', () => {
        const isOptionEqualToValue = spy(compare);
        const { rerender } = render(
          <ResolverTest
            getOptionValue={(option) => option.id}
            isOptionEqualToValue={isOptionEqualToValue}
          />,
        );

        expect(resolveOptionValue('FoO').option).to.equal(resolverOptions[0]);
        expect(resolveOptionValue('missing')).to.equal(null);
        // The first three calls to isOptionEqualToValue are expected: two for 'FoO' and one for 'missing'.
        expect(isOptionEqualToValue.callCount).to.equal(3);
        isOptionEqualToValue.resetHistory();

        rerender(
          <ResolverTest
            getOptionValue={(option) => option.label}
            isOptionEqualToValue={isOptionEqualToValue}
          />,
        );

        expect(resolveOptionValue('FoO').option).to.equal(resolverOptions[0]);
        expect(resolveOptionValue('missing')).to.equal(null);
        expect(isOptionEqualToValue.callCount).to.equal(0);

        rerender(
          <ResolverTest getOptionValue={undefined} isOptionEqualToValue={isOptionEqualToValue} />,
        );

        expect(resolveOptionValue('FoO').option).to.equal('FoO');

        rerender(<ResolverTest isOptionEqualToValue={isOptionEqualToValue} />);

        expect(resolveOptionValue('FoO').option).to.equal(resolverOptions[0]);
        expect(isOptionEqualToValue.callCount).to.equal(1);
      });

      it('refreshes cached matches and misses when options change', () => {
        const { rerender } = render(<ResolverTest />);

        expect(resolveOptionValue('FoO').option).to.equal(resolverOptions[0]);
        expect(resolveOptionValue('missing')).to.equal(null);

        const updatedOptions = [
          { id: 'foo', label: 'Updated Foo' },
          { id: 'missing', label: 'Loaded option' },
        ];
        rerender(<ResolverTest options={updatedOptions} />);

        expect(resolveOptionValue('FoO').option).to.equal(updatedOptions[0]);
        expect(resolveOptionValue('missing').option).to.equal(updatedOptions[1]);

        rerender(<ResolverTest options={[]} />);

        expect(resolveOptionValue('FoO')).to.equal(null);
        expect(resolveOptionValue('missing')).to.equal(null);
      });

      it('refreshes cached matches and misses when the comparator changes', () => {
        const { rerender } = render(
          <ResolverTest isOptionEqualToValue={(option, value) => option.id === value} />,
        );

        expect(resolveOptionValue('foo').option).to.equal(resolverOptions[0]);
        expect(resolveOptionValue('FoO')).to.equal(null);

        rerender(
          <ResolverTest
            isOptionEqualToValue={(option, value) => option.id === value.toUpperCase()}
          />,
        );

        expect(resolveOptionValue('foo').option).to.equal(resolverOptions[1]);
        expect(resolveOptionValue('FoO').option).to.equal(resolverOptions[1]);
      });
    });

    it('returns the mapped option value when selecting a single option', async () => {
      const onChange = spy();

      const { user } = render(<Test multiple={false} value={undefined} onChange={onChange} />);
      await user.click(screen.getByRole('option', { name: 'Bar' }));

      expect(screen.getByRole('combobox')).to.have.value('Bar');
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.equal('bar');
      expect(onChange.args[0][2]).to.equal('selectOption');
      expect(onChange.args[0][3]).to.deep.equal({ option: options[1] });
    });

    it('uses the option label for a mapped controlled value', () => {
      render(<Test multiple={false} value="foo" />);

      expect(screen.getByRole('combobox')).to.have.value('Foo');
    });

    it('uses custom equality when resolving a mapped value to its option', () => {
      render(
        <Test
          multiple={false}
          value="FOO"
          isOptionEqualToValue={(option, value) => option.id.toUpperCase() === value}
        />,
      );

      expect(screen.getByRole('combobox')).to.have.value('Foo');
    });

    it('uses the option label for a mapped default value', () => {
      render(<Test multiple={false} value={undefined} defaultValue="foo" />);

      expect(screen.getByRole('combobox')).to.have.value('Foo');
    });

    it('handles an unmatched mapped value without passing it to getOptionLabel', () => {
      render(<Test multiple={false} value="missing" />);

      expect(screen.getByRole('combobox')).to.have.value('');
    });

    it('appends the mapped option value when selecting multiple options', async () => {
      const onChange = spy();

      const { user } = render(<Test onChange={onChange} />);
      await user.click(screen.getByRole('option', { name: 'Bar' }));

      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.deep.equal(['foo', 'bar']);
      expect(onChange.args[0][2]).to.equal('selectOption');
      expect(onChange.args[0][3]).to.deep.equal({ option: options[1] });
    });

    it('maps options and preserves values created in freeSolo mode', async () => {
      const onChange = spy();
      const { user } = render(
        <Test
          options={freeSoloOptions}
          defaultValue={[freeSoloOptions[1].id]}
          freeSolo
          value={undefined}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
          onChange={onChange}
        />,
      );

      await user.type(screen.getByRole('combobox'), 'custom{Enter}');

      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.deep.equal([freeSoloOptions[1].id, 'custom']);
      expect(onChange.args[0][2]).to.equal('createOption');
      expect(onChange.args[0][3]).to.deep.equal({ option: 'custom' });
    });

    it('does not add a duplicate freeSolo string when option values are mapped', async () => {
      const onChange = spy();
      const { user } = render(
        <Test
          options={freeSoloOptions}
          multiple
          freeSolo
          value={['custom']}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
          onChange={onChange}
        />,
      );
      const textbox = screen.getByRole('combobox');

      await user.type(textbox, 'custom{Enter}');

      expect(onChange.callCount).to.equal(0);
      expect(textbox).to.have.value('custom');
    });

    it('preserves freeSolo text that collides with a mapped option value', async () => {
      const onChange = spy();
      const collidingOptions = [{ id: 'draft', label: 'Published' }];
      const { user } = renderWithFreeSoloStringMapping(
        <Test
          options={collidingOptions}
          multiple={false}
          value={undefined}
          freeSolo
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('combobox');

      await user.type(input, 'draft{Enter}');

      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.equal('draft');
      expect(input).to.have.value('draft');
    });

    it('does not treat a colliding controlled freeSolo value as a selected option', () => {
      const collidingOptions = [{ id: 'draft', label: 'Published' }];

      renderWithFreeSoloStringMapping(
        <Test
          options={collidingOptions}
          multiple={false}
          value="draft"
          freeSolo
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
        />,
      );

      expect(screen.getByRole('option', { name: 'Published' })).to.have.attribute(
        'aria-selected',
        'false',
      );
    });

    it('does not pass values created in freeSolo mode to getOptionValue', async () => {
      const onChange = spy();
      const getOptionValue = spy((option) => option.id);
      const { user } = render(
        <Test
          options={freeSoloOptions}
          defaultValue={[freeSoloOptions[1].id]}
          freeSolo
          value={undefined}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
          getOptionValue={getOptionValue}
          onChange={onChange}
        />,
      );

      await user.type(screen.getByRole('combobox'), 'custom{Enter}');

      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.deep.equal([freeSoloOptions[1].id, 'custom']);
      expect(onChange.args[0][2]).to.equal('createOption');
      expect(onChange.args[0][3]).to.deep.equal({ option: 'custom' });
      expect(getOptionValue.neverCalledWith('custom')).to.equal(true);
    });

    it.each([
      { description: 'a single selection', multiple: false, value: 'foo' },
      { description: 'multiple selections', multiple: true, value: ['foo'] },
      { description: 'an unresolved single selection', multiple: false, value: 'missing' },
      { description: 'unresolved multiple selections', multiple: true, value: ['missing'] },
      { description: 'no selection', multiple: false, value: null },
      { description: 'a nullable raw selection', multiple: true, value: [null], mapped: false },
    ])(
      'preserves the highlighted option when options change with $description',
      async ({ multiple, value, mapped = true }) => {
        const initialOptions = [
          { id: 'foo', label: 'Foo' },
          { id: 'bar', label: 'Bar' },
        ];
        const updatedOptions = [{ id: 'baz', label: 'Baz' }, ...initialOptions];
        const getOptionLabel = (option) => option.label.toUpperCase();

        const { rerender, user } = render(
          <Test
            options={initialOptions}
            multiple={multiple}
            value={value}
            getOptionLabel={getOptionLabel}
            getOptionValue={mapped ? getOptionValue : undefined}
          />,
        );
        const input = screen.getByRole('combobox');

        await user.click(input);
        await user.keyboard('{Home}{ArrowDown}');

        expect(input).to.have.attribute(
          'aria-activedescendant',
          screen.getByRole('option', { name: 'Bar' }).id,
        );

        rerender(
          <Test
            options={updatedOptions}
            multiple={multiple}
            value={value}
            getOptionLabel={getOptionLabel}
            getOptionValue={mapped ? getOptionValue : undefined}
          />,
        );

        expect(input).to.have.attribute(
          'aria-activedescendant',
          screen.getByRole('option', { name: 'Bar' }).id,
        );
      },
    );

    it('uses the mapped option value when filtering selected options', () => {
      render(<Test filterSelectedOptions />);

      expect(screen.queryByRole('option', { name: 'Foo' })).to.equal(null);
      expect(screen.getByRole('option', { name: 'Bar' })).to.have.attribute(
        'aria-selected',
        'false',
      );
    });

    it('uses mapped equality when toggling an already selected option', async () => {
      const onChange = spy();

      const { user } = render(<Test onChange={onChange} />);
      await user.click(screen.getByRole('option', { name: 'Foo' }));

      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.deep.equal([]);
      expect(onChange.args[0][2]).to.equal('removeOption');
      expect(onChange.args[0][3]).to.deep.equal({ option: options[0] });
    });

    it('omits change details when removing an unmatched mapped value', async () => {
      const onChange = spy();
      const { user } = render(<Test value={['missing']} onChange={onChange} />);

      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{Backspace}');

      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.deep.equal([]);
      expect(onChange.args[0][2]).to.equal('removeOption');
      expect(onChange.args[0][3]).to.equal(undefined);
    });

    it('gives a custom isOptionEqualToValue precedence over mapped default equality', () => {
      const isOptionEqualToValue = spy(() => false);

      render(<Test isOptionEqualToValue={isOptionEqualToValue} />);

      expect(isOptionEqualToValue.calledWith(options[0], 'foo')).to.equal(true);
      expect(screen.getByRole('option', { name: 'Foo' })).to.have.attribute(
        'aria-selected',
        'false',
      );
    });

    it('uses the default getOptionValue when no getOptionValue is provided', () => {
      render(<Test getOptionValue={undefined} value={[options[0]]} />);

      expect(screen.getByRole('option', { name: 'Foo' })).to.have.attribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('option', { name: 'Bar' })).to.have.attribute(
        'aria-selected',
        'false',
      );
    });

    function ValidationTest({
      options: optionsProp,
      getOptionValue,
      freeSolo,
      isOptionEqualToValue,
    }) {
      const { getInputProps } = useAutocomplete({
        options: optionsProp,
        getOptionValue,
        freeSolo,
        isOptionEqualToValue,
      });
      return <input {...getInputProps()} />;
    }

    it.each([undefined, (option, value) => option.id === value])(
      'does not remap unchanged options while typing with custom equality=%s',
      async (isOptionEqualToValue) => {
        const getValue = spy((option) => option.id);
        const props = { getOptionValue: getValue, isOptionEqualToValue };
        const { rerender, user } = render(<ValidationTest {...props} options={options} />, {
          strict: false,
        });

        getValue.resetHistory();

        await user.type(screen.getByRole('combobox'), 'Foo');

        expect(getValue.callCount).to.equal(0);

        const newOption = { id: 'baz', label: 'Baz' };
        const updatedOptions = [...options, newOption];
        rerender(<ValidationTest {...props} options={updatedOptions} />);

        expect(getValue.calledWithExactly(newOption)).to.equal(true);
      },
    );

    it('reports a validation error once per instance across StrictMode renders and new prop identities', () => {
      let rerender;
      expect(() => {
        ({ rerender } = render(
          <ValidationTest
            options={[{ id: 'draft' }, { id: 'draft' }]}
            getOptionValue={(option) => option.id}
            freeSolo
          />,
          { strict: true },
        ));
      }).toErrorDev(freeSoloStringMappingError);

      expect(() => {
        rerender(
          <ValidationTest
            options={[{ id: 'draft' }, { id: 'draft' }]}
            getOptionValue={(option) => option.id}
            freeSolo
          />,
        );
      }).not.toErrorDev();

      // A separate instance should still report the same invalid configuration.
      renderWithFreeSoloStringMapping(
        <ValidationTest
          options={[{ id: 'draft' }]}
          getOptionValue={(option) => option.id}
          freeSolo
        />,
      );
    });

    it('validates changed mappers and reports newly introduced duplicate values with custom equality', () => {
      const isOptionEqualToValue = (option, value) => option.id === value;
      const props = { options, isOptionEqualToValue };
      const { rerender } = render(
        <ValidationTest {...props} getOptionValue={(option) => option.id} />,
      );

      for (const duplicateValue of ['duplicate', 'another']) {
        expect(() => {
          rerender(<ValidationTest {...props} getOptionValue={() => duplicateValue} />);
        }).toErrorDev(
          `MUI: The \`getOptionValue\` method of useAutocomplete returned the duplicate value "${duplicateValue}" for multiple options.\n` +
            'useAutocomplete uses these values to identify options. ' +
            'Change `getOptionValue` or the options so that every option has a unique value.',
        );
      }
    });

    it('warns when getOptionValue returns a string in freeSolo mode', () => {
      renderWithFreeSoloStringMapping(
        <ValidationTest
          options={[{ id: 'draft' }]}
          getOptionValue={(option) => option.id}
          freeSolo
        />,
      );
    });

    it.each([
      { description: 'an object', optionValue: {}, returnedValue: 'a value of type object' },
      { description: 'null', optionValue: null, returnedValue: 'null' },
      {
        description: 'undefined',
        optionValue: undefined,
        returnedValue: 'a value of type undefined',
      },
      {
        description: 'a symbol',
        optionValue: Symbol('value'),
        returnedValue: 'a value of type symbol',
      },
      { description: 'NaN', optionValue: NaN, returnedValue: 'NaN' },
      { description: 'a bigint', optionValue: 1n, returnedValue: 'a value of type bigint' },
    ])('warns when getOptionValue returns $description', ({ optionValue, returnedValue }) => {
      expect(() => {
        render(<ValidationTest options={[{}]} getOptionValue={() => optionValue} />, {
          strict: false,
        });
      }).toErrorDev(
        `MUI: The \`getOptionValue\` method of useAutocomplete returned ${returnedValue}, which is not a valid option value.\n` +
          'useAutocomplete uses this value to identify and match options. ' +
          'Return a unique string, number, or boolean for every option.',
      );
    });

    it('warns once per duplicate mapped value', () => {
      expect(() => {
        render(
          <ValidationTest
            options={[{ id: 'duplicate' }, { id: 'duplicate' }, { id: 'duplicate' }]}
            getOptionValue={(option) => option.id}
          />,
          { strict: false },
        );
      }).toErrorDev([
        'MUI: The `getOptionValue` method of useAutocomplete returned the duplicate value "duplicate" for multiple options.\n' +
          'useAutocomplete uses these values to identify options. ' +
          'Change `getOptionValue` or the options so that every option has a unique value.',
      ]);
    });

    it('accepts supported primitive option values', () => {
      expect(() => {
        render(
          <ValidationTest options={['string', 1, true]} getOptionValue={(option) => option} />,
          { strict: false },
        );
      }).not.toErrorDev();
    });

    it('does not validate raw options when getOptionValue is not provided', () => {
      expect(() => {
        render(<ValidationTest options={[{ id: 'foo' }, { id: 'foo' }]} />, { strict: false });
      }).not.toErrorDev();
    });
  });

  describe('prop: defaultValue', () => {
    it('should not trigger onInputChange when defaultValue is provided', () => {
      const onInputChange = spy();
      const defaultValue = 'foo';

      function Test() {
        const { getInputProps } = useAutocomplete({
          defaultValue,
          onInputChange,
          options: ['foo', 'bar'],
        });

        return <input {...getInputProps()} />;
      }

      render(<Test />);
      expect(onInputChange.callCount).to.equal(0);
    });
  });

  describe('prop: value', () => {
    it('should not trigger onInputChange when value is provided', () => {
      const onInputChange = spy();

      function Test() {
        const [value, setValue] = React.useState('foo');
        const { getInputProps } = useAutocomplete({
          value,
          onChange: (event, valueParam) => setValue(valueParam),
          onInputChange,
          options: ['foo', 'bar'],
        });

        return <input {...getInputProps()} />;
      }

      render(<Test />);
      expect(onInputChange.callCount).to.equal(0);
    });
  });

  describe('prop: multiple', () => {
    it('should set aria-multiselectable on the listbox when multiple prop is true', () => {
      function Test(props) {
        const { options } = props;
        const { getListboxProps, getInputProps } = useAutocomplete({
          options,
          open: true,
          multiple: true,
        });
        return (
          <div>
            <input {...getInputProps()} />
            <ul {...getListboxProps()} />;
          </div>
        );
      }

      render(<Test options={['foo', 'bar']} />);

      const listbox = screen.getByRole('listbox');

      expect(listbox).to.have.attribute('aria-multiselectable', 'true');
    });

    it('should not set aria-multiselectable on the listbox when multiple prop is false', () => {
      function Test(props) {
        const { options } = props;
        const { getListboxProps, getInputProps } = useAutocomplete({
          options,
          open: true,
          multiple: false,
        });
        return (
          <div>
            <input {...getInputProps()} />
            <ul {...getListboxProps()} />;
          </div>
        );
      }

      render(<Test options={['foo', 'bar']} />);
      const listbox = screen.getByRole('listbox');

      expect(listbox).to.not.have.attribute('aria-multiselectable');
    });
  });
});
