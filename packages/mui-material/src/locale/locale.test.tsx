/// <reference types="vite/client" />
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { createRenderer, screen, within } from '@mui/internal-test-utils';
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

type LocalizedComponentName = keyof NonNullable<Localization['components']>;

interface LocalizedStrings {
  // shown as text
  texts: React.ReactNode[];
  // shown as accessible labels
  labels: React.ReactNode[];
}

const localeFiles = import.meta.glob<Record<string, Localization>>(['./*.ts', '!./index.ts'], {
  eager: true,
});

// `enUS` is empty since the components already default to English, see #21098.
const localeEntries = Object.entries(locales).filter(
  (entry): entry is [string, Localization] => typeof entry[1] === 'object' && entry[0] !== 'enUS',
);

/**
 * Gets the strings a locale translates for each component, as they show up in the components
 * rendered below. A locale can leave a string out, in which case the component falls back to English.
 */
function getLocalizedStrings({
  components = {},
}: Localization): Partial<Record<LocalizedComponentName, LocalizedStrings>> {
  const {
    MuiAlert,
    MuiAutocomplete,
    MuiBreadcrumbs,
    MuiPagination,
    MuiRating,
    MuiTablePagination,
  } = components;
  const strings: Partial<Record<LocalizedComponentName, LocalizedStrings>> = {};

  if (MuiAlert) {
    strings.MuiAlert = { texts: [], labels: [MuiAlert.defaultProps.closeText] };
  }

  if (MuiAutocomplete) {
    const { clearText, closeText, loadingText, noOptionsText, openText } =
      MuiAutocomplete.defaultProps;
    strings.MuiAutocomplete = {
      texts: [noOptionsText, loadingText],
      labels: [clearText, closeText, openText],
    };
  }

  if (MuiBreadcrumbs) {
    strings.MuiBreadcrumbs = { texts: [], labels: [MuiBreadcrumbs.defaultProps.expandText] };
  }

  if (MuiPagination) {
    const { 'aria-label': ariaLabel, getItemAriaLabel } = MuiPagination.defaultProps;
    strings.MuiPagination = {
      texts: [],
      labels: [
        ariaLabel,
        getItemAriaLabel?.('page', 1, false),
        getItemAriaLabel?.('page', 2, true),
        getItemAriaLabel?.('first', 1, false),
        getItemAriaLabel?.('previous', 1, false),
        getItemAriaLabel?.('next', 3, false),
        getItemAriaLabel?.('last', 3, false),
      ],
    };
  }

  if (MuiRating) {
    const { emptyLabelText, getLabelText } = MuiRating.defaultProps;
    strings.MuiRating = {
      texts: [],
      labels: [emptyLabelText, getLabelText?.(1), getLabelText?.(5)],
    };
  }

  if (MuiTablePagination) {
    const { getItemAriaLabel, labelDisplayedRows, labelRowsPerPage } =
      MuiTablePagination.defaultProps;
    strings.MuiTablePagination = {
      texts: [labelRowsPerPage, labelDisplayedRows?.({ from: 11, to: 20, count: 100, page: 1 })],
      labels: [
        getItemAriaLabel?.('first'),
        getItemAriaLabel?.('previous'),
        getItemAriaLabel?.('next'),
        getItemAriaLabel?.('last'),
      ],
    };
  }

  return strings;
}

function renderInput(params: object) {
  return <TextField {...params} />;
}

// Every component a locale can translate, each in its own container since locales reuse strings
// across components, in a state that shows each translated string.
const localizedComponents = (
  <React.Fragment>
    <div data-testid="MuiAlert">
      <Alert onClose={() => {}}>message</Alert>
    </div>
    <div data-testid="MuiAutocomplete">
      <Autocomplete open disablePortal options={[]} renderInput={renderInput} />
      <Autocomplete open disablePortal loading options={[]} renderInput={renderInput} />
      <Autocomplete options={['option']} defaultValue="option" renderInput={renderInput} />
    </div>
    <div data-testid="MuiBreadcrumbs">
      <Breadcrumbs maxItems={2}>
        <span>first</span>
        <span>second</span>
        <span>third</span>
      </Breadcrumbs>
    </div>
    <div data-testid="MuiPagination">
      <Pagination count={3} defaultPage={2} showFirstButton showLastButton />
    </div>
    <div data-testid="MuiRating">
      <Rating name="rating" />
    </div>
    <div data-testid="MuiTablePagination">
      <TablePagination
        component="div"
        count={100}
        page={1}
        rowsPerPage={10}
        onPageChange={() => {}}
        showFirstButton
        showLastButton
      />
    </div>
  </React.Fragment>
);

// Match text exactly, since some locales use non-breaking spaces that the default normalizer would collapse.
const exact = { normalizer: (text: string) => text };

function expectLocalized(locale: Localization) {
  Object.entries(getLocalizedStrings(locale)).forEach(([name, { texts, labels }]) => {
    const component = within(screen.getByTestId(name));
    texts.forEach((text) => {
      if (text !== undefined) {
        expect(component.getAllByText(text as string, exact).length).to.be.greaterThan(0);
      }
    });
    labels.forEach((label) => {
      if (label !== undefined) {
        expect(component.getAllByLabelText(label as string, exact).length).to.be.greaterThan(0);
      }
    });
  });
}

describe('locale', () => {
  const { render } = createRenderer();

  it('exports every locale file from the index', () => {
    const fileExports = Object.values(localeFiles).flatMap((module) => Object.keys(module));

    expect(fileExports.length).to.be.greaterThan(0);
    expect(Object.keys(locales)).to.include.members(fileExports);
  });

  it.each(localeEntries)('%s translates to non-empty strings', (_, locale) => {
    const strings = Object.values(getLocalizedStrings(locale)).flatMap(({ texts, labels }) => [
      ...texts,
      ...labels,
    ]);

    expect(strings.length).to.be.greaterThan(0);
    strings.forEach((text) => {
      if (text !== undefined) {
        expect(text).to.be.a('string').and.not.equal('');
      }
    });
  });

  it('localizes components through the theme', () => {
    render(
      <ThemeProvider theme={createTheme({}, locales.deDE)}>{localizedComponents}</ThemeProvider>,
    );

    expectLocalized(locales.deDE);
  });

  it('localizes components through a CSS variables theme', () => {
    render(
      <ThemeProvider theme={createTheme({ cssVariables: true }, locales.deDE)}>
        {localizedComponents}
      </ThemeProvider>,
    );

    expectLocalized(locales.deDE);
  });
});
