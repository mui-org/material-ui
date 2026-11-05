/// <reference types="vite/client" />
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import * as locales from '@mui/material/locale';
import type { Localization } from './utils/LocaleTextApi';

type LocalizedComponents = NonNullable<Localization['components']>;

const localeFiles = import.meta.glob<Record<string, Localization>>(['./*.ts', '!./index.ts'], {
  eager: true,
});

const localeEntries = Object.entries(locales).filter(
  (entry): entry is [string, Localization] => typeof entry[1] === 'object',
);

// Match text exactly, since some locales use non-breaking spaces that the default normalizer would collapse.
const exact = { normalizer: (text: string) => text };

function expectText(text: React.ReactNode) {
  if (typeof text === 'string') {
    expect(screen.getAllByText(text, exact).length).to.be.greaterThan(0);
  }
}

function expectLabel(label: React.ReactNode) {
  if (typeof label === 'string') {
    expect(screen.getAllByLabelText(label, exact).length).to.be.greaterThan(0);
  }
}

describe('locale', () => {
  const { render } = createRenderer();

  function renderWithLocale(locale: Localization, element: React.ReactElement) {
    return render(<ThemeProvider theme={createTheme({}, locale)}>{element}</ThemeProvider>);
  }

  it('exports every locale file from the index', () => {
    const fileExports = Object.values(localeFiles).flatMap((module) => Object.keys(module));

    expect(fileExports.length).to.be.greaterThan(0);
    expect(Object.keys(locales)).to.include.members(fileExports);
  });

  describe.each(localeEntries)('%s', (_, locale) => {
    const components: LocalizedComponents = locale.components ?? {};

    it.skipIf(!components.MuiAlert)('localizes Alert', () => {
      const { closeText } = components.MuiAlert!.defaultProps;
      renderWithLocale(locale, <Alert onClose={() => {}}>message</Alert>);

      expectLabel(closeText);
    });

    it.skipIf(!components.MuiAutocomplete)('localizes Autocomplete', () => {
      const { clearText, closeText, loadingText, noOptionsText, openText } =
        components.MuiAutocomplete!.defaultProps;
      const renderInput = (params: object) => <TextField {...params} />;

      const { unmount } = renderWithLocale(
        locale,
        <Autocomplete open options={[]} renderInput={renderInput} />,
      );
      expectText(noOptionsText);
      expectLabel(closeText);
      unmount();

      const { unmount: unmountLoading } = renderWithLocale(
        locale,
        <Autocomplete open loading options={[]} renderInput={renderInput} />,
      );
      expectText(loadingText);
      unmountLoading();

      renderWithLocale(
        locale,
        <Autocomplete options={['option']} defaultValue="option" renderInput={renderInput} />,
      );
      expectLabel(clearText);
      expectLabel(openText);
    });

    it.skipIf(!components.MuiBreadcrumbs)('localizes Breadcrumbs', () => {
      const { expandText } = components.MuiBreadcrumbs!.defaultProps;
      renderWithLocale(
        locale,
        <Breadcrumbs maxItems={2}>
          <span>first</span>
          <span>second</span>
          <span>third</span>
        </Breadcrumbs>,
      );

      expectLabel(expandText);
    });

    it.skipIf(!components.MuiPagination)('localizes Pagination', () => {
      const { 'aria-label': ariaLabel, getItemAriaLabel } = components.MuiPagination!.defaultProps;
      renderWithLocale(
        locale,
        <Pagination count={3} defaultPage={2} showFirstButton showLastButton />,
      );

      expectLabel(ariaLabel);
      if (getItemAriaLabel) {
        expectLabel(getItemAriaLabel('page', 1, false));
        expectLabel(getItemAriaLabel('page', 2, true));
        expectLabel(getItemAriaLabel('first', 1, false));
        expectLabel(getItemAriaLabel('previous', 1, false));
        expectLabel(getItemAriaLabel('next', 3, false));
        expectLabel(getItemAriaLabel('last', 3, false));
      }
    });

    it.skipIf(!components.MuiRating)('localizes Rating', () => {
      const { emptyLabelText, getLabelText } = components.MuiRating!.defaultProps;
      renderWithLocale(locale, <Rating name="rating" />);

      expectLabel(emptyLabelText);
      if (getLabelText) {
        expectLabel(getLabelText(1));
        expectLabel(getLabelText(5));
      }
    });

    it.skipIf(!components.MuiTablePagination)('localizes TablePagination', () => {
      const { getItemAriaLabel, labelDisplayedRows, labelRowsPerPage } =
        components.MuiTablePagination!.defaultProps;
      renderWithLocale(
        locale,
        <TablePagination
          component="div"
          count={100}
          page={1}
          rowsPerPage={10}
          onPageChange={() => {}}
          showFirstButton
          showLastButton
        />,
      );

      expectText(labelRowsPerPage);
      if (labelDisplayedRows) {
        expectText(labelDisplayedRows({ from: 11, to: 20, count: 100, page: 1 }));
      }
      if (getItemAriaLabel) {
        expectLabel(getItemAriaLabel('first'));
        expectLabel(getItemAriaLabel('previous'));
        expectLabel(getItemAriaLabel('next'));
        expectLabel(getItemAriaLabel('last'));
      }
    });
  });
});
