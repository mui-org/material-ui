import * as React from 'react';
import { expect } from 'vitest';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import enhanceDensity from '../src/styles/enhanceDensity';
import { DEFAULT_SIZING_PX, DEFAULT_STEP_PX } from '../src/styles/densityScale';
import type { DensityKey } from '../src/styles/densityScale';

export type Density = {
  id: string;
  step: Record<DensityKey, number>;
  touchTarget: number;
  iconSize: number;
  typography?: Record<string, Record<string, string | number>>;
};

export const DENSITIES: Density[] = [
  {
    id: 'high',
    step: { xxSmall: 2, xSmall: 4, small: 8, medium: 12, large: 16, xLarge: 24, xxLarge: 32 },
    touchTarget: 24,
    iconSize: 12,
    typography: {
      body1: { fontSize: '0.75rem', lineHeight: '16px' },
      body2: { fontSize: '0.6875rem', lineHeight: '14px' },
      caption: { fontSize: '0.6875rem', lineHeight: '14px' },
      button: { fontSize: '0.75rem', lineHeight: '16px' },
    },
  },
  {
    id: 'medium',
    step: DEFAULT_STEP_PX,
    touchTarget: DEFAULT_SIZING_PX.touchTarget,
    iconSize: DEFAULT_SIZING_PX.iconSize,
  },
];

export const THEMES: Record<string, Theme> = Object.fromEntries(
  DENSITIES.map((density) => [
    density.id,
    enhanceDensity(createTheme({ typography: density.typography }), {
      spacing: density.step,
      touchTarget: density.touchTarget,
      iconSize: density.iconSize,
    }),
  ]),
);
export const MEDIUM = THEMES.medium;

export const VARIANTS = ['outlined', 'filled', 'standard'] as const;
export const SIZES = ['small', 'medium'] as const;

export const query = (selector: string, scope: ParentNode = document) => {
  const element = scope.querySelector(selector);
  if (!element) {
    throw new Error(`no element for ${selector}`);
  }
  return element as HTMLElement;
};
export const rect = (selector: string, scope?: ParentNode) =>
  query(selector, scope).getBoundingClientRect();
export const css = (selector: string, scope?: ParentNode) =>
  getComputedStyle(query(selector, scope));
export const inCase = (name: string) => query(`[data-case="${name}"]`);
export const inTheme = (theme: string, name: string) =>
  query(`[data-theme="${theme}"] [data-case="${name}"]`);
export const textBox = (element: Element) => {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  range.selectNodeContents(walker.nextNode()!);
  return range.getBoundingClientRect();
};
export const round2 = (value: number) => Math.round(value * 100) / 100;

export const byName = <T,>(names: readonly string[], read: (name: string) => T) =>
  Object.fromEntries(names.map((name) => [name, read(name)]));

export const grid = <const Axes extends readonly (readonly string[])[]>(
  axes: Axes,
  make: (...values: { [K in keyof Axes]: Axes[K][number] }) => React.ReactNode,
): Record<string, React.ReactNode> =>
  Object.fromEntries(
    axes
      .reduce<string[][]>(
        (rows, axis) => rows.flatMap((row) => axis.map((value) => [...row, value])),
        [[]],
      )
      .map((values) => [values.join(' '), make(...(values as any))]),
  );

export const drift = (diff: number, tolerance = 0.5) =>
  Math.abs(diff) <= tolerance ? 0 : round2(diff);

export const expectNoDrift = (drifts: Record<string, number>) => {
  expect(drifts).to.deep.equal(byName(Object.keys(drifts), () => 0));
};

export const cases = (entries: Record<string, React.ReactNode>) => (
  <React.Fragment>
    {Object.entries(entries).map(([name, node]) => (
      <div key={name} data-case={name}>
        {node}
      </div>
    ))}
  </React.Fragment>
);

export const sideBySide = (themes: Record<string, Theme>, node: React.ReactNode) => (
  <React.Fragment>
    {Object.entries(themes).map(([name, theme]) => (
      <div key={name} data-theme={name}>
        <ThemeProvider theme={theme}>{node}</ThemeProvider>
      </div>
    ))}
  </React.Fragment>
);

export const withUser = (options: Parameters<typeof createTheme>[0]) => ({
  master: createTheme(options),
  enhanced: enhanceDensity(createTheme(options)),
});

export const TABLE_PAGINATION = (
  <Table>
    <TableFooter>
      <TableRow>
        <TablePagination
          count={100}
          page={0}
          rowsPerPage={10}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </TableRow>
    </TableFooter>
  </Table>
);

export const TITLED_DIALOG_CONTENT = (
  <React.Fragment>
    <DialogTitle>Title</DialogTitle>
    <DialogContent>Body</DialogContent>
  </React.Fragment>
);

export const selectField = (
  variant: (typeof VARIANTS)[number] | undefined,
  kind: 'plain' | 'adornment',
  option = 'a',
  props: Record<string, any> = {},
) => (
  <Select
    variant={variant}
    value="a"
    endAdornment={kind === 'adornment' ? <InputAdornment position="end">x</InputAdornment> : null}
    {...props}
  >
    <MenuItem value="a">{option}</MenuItem>
  </Select>
);

export const FIELDS = [
  ...Object.keys(grid([VARIANTS, SIZES], () => null)),
  ...SIZES.map((size) => `filled ${size} hiddenLabel`),
];

export const fieldProps = (name: string) => {
  const [variant, size, hidden] = name.split(' ') as any[];
  return { variant, size, hiddenLabel: !!hidden, label: hidden ? undefined : 'Label' };
};

export const autocompleteField = (name: string, props: Record<string, any> = {}) => {
  const { size, ...field } = fieldProps(name);
  const defaults: Record<string, any> = {
    size,
    options: ['One', 'Two'],
    defaultValue: props.multiple ? ['One'] : 'One',
    renderInput: (params: object) => <TextField {...params} {...field} />,
  };
  return <Autocomplete {...(defaults as any)} {...props} />;
};

export const USER_COMPONENTS = {
  MuiAlert: { styleOverrides: { icon: { paddingTop: 20 }, action: { paddingTop: 20 } } },
  MuiChip: {
    styleOverrides: {
      icon: { fontSize: 30 },
      avatar: { fontSize: 31 },
      deleteIcon: { fontSize: 32 },
    },
  },
  MuiButtonGroup: { styleOverrides: { grouped: { minWidth: 100 } } },
  MuiDivider: { styleOverrides: { inset: { marginLeft: 20 } } },
  MuiFormControlLabel: { styleOverrides: { root: { marginLeft: 4 } } },
  MuiSelect: { styleOverrides: { select: { '&&': { paddingRight: 80 } } } },
  MuiAutocomplete: {
    styleOverrides: { inputRoot: { gap: 10, paddingLeft: 20, paddingTop: 21, paddingBottom: 22 } },
  },
  MuiLink: { styleOverrides: { root: { paddingInline: 3 } } },
};

type OverrideCheck = { node: React.ReactNode; reads: Record<string, [string, string, string]> };

export const OVERRIDE_CHECKS: Record<string, OverrideCheck> = {
  Alert: {
    node: <Alert onClose={() => {}}>Message</Alert>,
    reads: {
      icon: ['.MuiAlert-icon', 'padding-top', '20px'],
      action: ['.MuiAlert-action', 'padding-top', '20px'],
    },
  },
  ...Object.fromEntries(
    SIZES.map((size) => [
      `Chip ${size}`,
      {
        node: (
          <React.Fragment>
            <Chip size={size} icon={<AddIcon />} label="a" onDelete={() => {}} />
            <Chip size={size} avatar={<Avatar>A</Avatar>} label="b" />
          </React.Fragment>
        ),
        reads: {
          icon: ['.MuiChip-icon', 'font-size', '30px'],
          avatar: ['.MuiChip-avatar', 'font-size', '31px'],
          deleteIcon: ['.MuiChip-deleteIcon', 'font-size', '32px'],
        },
      },
    ]),
  ),
  ButtonGroup: {
    node: (
      <ButtonGroup>
        <Button>a</Button>
      </ButtonGroup>
    ),
    reads: { grouped: ['.MuiButtonGroup-grouped', 'min-width', '100px'] },
  },
  Divider: {
    node: (
      <List>
        <ListItem>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    ),
    reads: { inset: ['.MuiDivider-inset', 'margin-left', '20px'] },
  },
  FormControlLabel: {
    node: <FormControlLabel control={<Checkbox />} label="a" />,
    reads: { root: ['.MuiFormControlLabel-root', 'margin-left', '4px'] },
  },
  ...Object.fromEntries(
    Object.entries(
      grid([VARIANTS, ['plain', 'adornment']], (variant, kind) =>
        selectField(variant, kind as 'plain' | 'adornment'),
      ),
    ).map(([name, node]) => [
      `Select ${name}`,
      { node, reads: { select: ['.MuiSelect-select', 'padding-right', '80px'] } },
    ]),
  ),
  ...Object.fromEntries(
    FIELDS.map((name) => [
      `Autocomplete ${name}`,
      {
        node: autocompleteField(name, { multiple: true }),
        reads: {
          gap: ['.MuiAutocomplete-inputRoot', 'column-gap', '10px'],
          paddingLeft: ['.MuiAutocomplete-inputRoot', 'padding-left', '20px'],
          paddingTop: ['.MuiAutocomplete-inputRoot', 'padding-top', '21px'],
          paddingBottom: ['.MuiAutocomplete-inputRoot', 'padding-bottom', '22px'],
        },
      },
    ]),
  ),
  'Breadcrumbs link': {
    node: (
      <React.Fragment>
        <Link href="/" sx={{ display: 'none' }}>
          A link rendered before the breadcrumbs
        </Link>
        <Breadcrumbs>
          <Link href="/" className="hidden" sx={{ display: 'none' }}>
            Hidden
          </Link>
          <Link href="/" className="sx" sx={{ px: 0, lineHeight: '10px' }}>
            Sx
          </Link>
          <Link href="/" className="theme">
            Theme
          </Link>
          <Typography>Current</Typography>
        </Breadcrumbs>
      </React.Fragment>
    ),
    reads: {
      hidden: ['.hidden', 'display', 'none'],
      sxPadding: ['.sx', 'padding-left', '0px'],
      sxLineHeight: ['.sx', 'line-height', '10px'],
      themePadding: ['.theme', 'padding-left', '3px'],
    },
  },
};

export const MASTER_LOSES_WITHOUT_LAYERS: Record<string, string[]> = {
  'Autocomplete filled medium hiddenLabel': ['paddingTop', 'paddingBottom'],
  'Autocomplete filled small': ['paddingBottom'],
  'Autocomplete filled small hiddenLabel': ['paddingTop', 'paddingBottom'],
  'Autocomplete outlined small': ['paddingLeft', 'paddingTop', 'paddingBottom'],
};

export const winsExcept = (losses: Record<string, string[]>) =>
  byName(Object.keys(OVERRIDE_CHECKS), (name) =>
    Object.fromEntries(
      Object.keys(OVERRIDE_CHECKS[name].reads).map((slot) => [slot, !losses[name]?.includes(slot)]),
    ),
  );

export const userWins = (theme: string) =>
  byName(Object.keys(OVERRIDE_CHECKS), (name) =>
    Object.fromEntries(
      Object.entries(OVERRIDE_CHECKS[name].reads).map(([slot, [selector, property, value]]) => [
        slot,
        css(selector, inTheme(theme, name)).getPropertyValue(property) === value,
      ]),
    ),
  );

export const overrideCases = () =>
  cases(byName(Object.keys(OVERRIDE_CHECKS), (name) => OVERRIDE_CHECKS[name].node));
