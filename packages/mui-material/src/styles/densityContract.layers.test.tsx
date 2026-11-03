import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import { createTheme } from '@mui/material/styles';
import enhanceDensity from './enhanceDensity';
import {
  FIELDS,
  MEDIUM,
  SIZES,
  TABLE_PAGINATION,
  TITLED_DIALOG_CONTENT,
  USER_COMPONENTS,
  autocompleteField,
  byName,
  cases,
  css,
  grid,
  inTheme,
  overrideCases,
  selectField,
  sideBySide,
  userWins,
  winsExcept,
  withUser,
} from '../../test/densityContract';

type Read = { node: React.ReactNode; selector: string; properties: string[] };

const READS: Record<string, Read> = {
  'Select caret': {
    node: selectField(undefined, 'plain', 'A long selected option', { sx: { width: 160 } }),
    selector: '.MuiSelect-select',
    properties: ['padding-right'],
  },
  'DialogContent under a DialogTitle': {
    node: TITLED_DIALOG_CONTENT,
    selector: '.MuiDialogContent-root',
    properties: ['padding-top'],
  },
  ...Object.fromEntries(
    SIZES.flatMap((size) => [
      [
        `Chip ${size} avatar`,
        {
          node: <Chip size={size} avatar={<Avatar>M</Avatar>} label="Chip" />,
          selector: '.MuiChip-avatar',
          properties: ['font-size'],
        },
      ],
      [
        `Chip ${size} delete icon`,
        {
          node: <Chip size={size} label="Chip" onDelete={() => {}} />,
          selector: '.MuiChip-deleteIcon',
          properties: ['font-size'],
        },
      ],
    ]),
  ),
  ...Object.fromEntries(
    ['root', 'toolbar'].map((slot) => [
      `TablePagination ${slot}`,
      {
        node: TABLE_PAGINATION,
        selector: `.MuiTablePagination-${slot}`,
        properties: ['padding-left', 'padding-right'],
      },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(
      grid([['small', 'medium', 'large']], (size) => <Pagination size={size} count={3} />),
    ).map(([size, node]) => [
      `Pagination ${size} icon`,
      { node, selector: '.MuiPaginationItem-icon', properties: ['font-size'] },
    ]),
  ),
  ...Object.fromEntries(
    FIELDS.map((name) => [
      `Autocomplete ${name}`,
      {
        node: autocompleteField(name, { multiple: true }),
        selector: '.MuiAutocomplete-inputRoot',
        properties: ['padding-top', 'padding-bottom'],
      },
    ]),
  ),
};

describe.skipIf(isJsdom())('density contract with modularCssLayers', () => {
  const { render } = createRenderer();

  test('user slot styleOverrides win wherever they win on master', () => {
    render(
      sideBySide(
        withUser({ modularCssLayers: true, components: USER_COMPONENTS as any }),
        overrideCases(),
      ),
    );
    expect(userWins('master')).to.deep.equal(winsExcept({}));
    expect(userWins('enhanced')).to.deep.equal(userWins('master'));
  });

  test('density styles render the same with and without layers', () => {
    const names = Object.keys(READS);
    render(
      sideBySide(
        { unlayered: MEDIUM, layered: enhanceDensity(createTheme({ modularCssLayers: true })) },
        cases(byName(names, (name) => READS[name].node)),
      ),
    );
    const read = (theme: string) =>
      byName(names, (name) =>
        READS[name].properties.map((property) =>
          css(READS[name].selector, inTheme(theme, name)).getPropertyValue(property),
        ),
      );
    expect(read('layered')).to.deep.equal(read('unlayered'));
  });
});
