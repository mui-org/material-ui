import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, screen, ErrorBoundary } from 'test/utils';
import useAutocomplete, { createFilterOptions } from '@material-ui/core/useAutocomplete';

describe('useAutocomplete', () => {
  const render = createClientRender();

  it('should preserve DOM nodes of options when re-ordering', () => {
    const Test = (props) => {
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
                return <li {...getOptionProps({ option, index })}>{option}</li>;
              })}
            </ul>
          ) : null}
        </div>
      );
    };

    const { rerender } = render(<Test options={['foo', 'bar']} />);
    const [fooOptionAsFirst, barOptionAsSecond] = screen.getAllByRole('option');
    rerender(<Test options={['bar', 'foo']} />);
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

  it('should warn if the input is not binded', function test() {
    // TODO is this fixed?
    if (!/jsdom/.test(window.navigator.userAgent)) {
      // can't catch render errors in the browser for unknown reason
      // tried try-catch + error boundary + window onError preventDefault
      this.skip();
    }

    const Test = (props) => {
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
                return <li {...getOptionProps({ option, index })}>{option}</li>;
              })}
            </ul>
          ) : null}
        </div>
      );
    };

    const devErrorMessages = [
      "Error: Uncaught [TypeError: Cannot read property 'removeAttribute' of null]",
      'Material-UI: Unable to find the input element.',
      "Error: Uncaught [TypeError: Cannot read property 'removeAttribute' of null]",
      'The above error occurred in the <ul> component',
      // strict mode renders twice
      React.version.startsWith('16') && 'The above error occurred in the <ul> component',
      'The above error occurred in the <Test> component',
      // strict mode renders twice
      React.version.startsWith('16') && 'The above error occurred in the <Test> component',
    ];

    expect(() => {
      render(
        <ErrorBoundary>
          <Test options={['foo', 'bar']} />
        </ErrorBoundary>,
      );
    }).toErrorDev(devErrorMessages);
  });
});
