import * as React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import PaginationItem from '@mui/material/PaginationItem';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TableFooter from '@mui/material/TableFooter';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Toolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import SvgIcon from '@mui/material/SvgIcon';
import ButtonGroup from '@mui/material/ButtonGroup';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import Check from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import enhanceDensity from './enhanceDensity';
import { DEFAULT_SIZING_PX, DEFAULT_STEP_PX } from './densityScale';
import {
  DENSITIES,
  FIELDS,
  MASTER_LOSES_WITHOUT_LAYERS,
  MEDIUM,
  SIZES,
  THEMES,
  USER_COMPONENTS,
  VARIANTS,
  autocompleteField,
  byName,
  cases,
  css,
  drift,
  expectNoDrift,
  fieldProps,
  grid,
  inCase,
  inTheme,
  overrideCases,
  query,
  rect,
  round2,
  sideBySide,
  textBox,
  userWins,
  winsExcept,
  withUser,
} from '../../test/densityContract';
import type { Density } from '../../test/densityContract';

/* eslint-disable vitest/valid-title */

const isChromium = typeof navigator !== 'undefined' && /Chrome\//.test(navigator.userAgent);

type Spec = {
  sizes?: (string | undefined)[];
  render: (size?: any) => React.ReactElement;
  selector: string;
  axis?: 'width' | 'minWidth' | 'minHeight';
  rendered?: boolean;
  height: (density: Density, size: string | undefined) => number;
};

const ramp = (density: Density, size: string | undefined) => {
  if (size === 'small') {
    return density.touchTarget - density.step.xxSmall;
  }
  if (size === 'large') {
    return density.touchTarget + density.step.small;
  }
  return density.touchTarget;
};

const rampToTargetSize = (density: Density, size: string | undefined) =>
  Math.max(24, ramp(density, size));

const CONTROLS: Record<string, Spec> = {
  Button: {
    sizes: ['small', 'medium', 'large'],
    render: (size) => <Button size={size}>Label</Button>,
    selector: '.MuiButton-root',
    height: ramp,
  },
  IconButton: {
    sizes: ['small', 'medium', 'large'],
    render: (size) => (
      <IconButton size={size}>
        <AddIcon />
      </IconButton>
    ),
    selector: '.MuiIconButton-root',
    height: ramp,
  },
  Checkbox: {
    sizes: ['small', 'medium'],
    render: (size) => <Checkbox size={size} />,
    selector: '.MuiCheckbox-root',
    height: rampToTargetSize,
  },
  Radio: {
    sizes: ['small', 'medium'],
    render: (size) => <Radio size={size} />,
    selector: '.MuiRadio-root',
    height: rampToTargetSize,
  },
  ToggleButton: {
    sizes: ['small', 'medium', 'large'],
    render: (size) => (
      <ToggleButton size={size} value="a">
        A
      </ToggleButton>
    ),
    selector: '.MuiToggleButton-root',
    height: ramp,
  },
  PaginationItem: {
    sizes: ['small', 'medium', 'large'],
    render: (size) => <PaginationItem size={size} page={1} />,
    selector: '.MuiPaginationItem-root',
    height: ramp,
  },
  Switch: {
    sizes: ['small', 'medium'],
    render: (size) => <Switch size={size} />,
    selector: '.MuiSwitch-root',
    height: rampToTargetSize,
  },
  Avatar: {
    render: () => <Avatar>A</Avatar>,
    selector: '.MuiAvatar-root',
    height: (density) => density.touchTarget,
  },
  Badge: {
    sizes: ['standard', 'dot'],
    render: (variant) => (
      <Badge badgeContent={4} variant={variant} color="primary">
        <Avatar>A</Avatar>
      </Badge>
    ),
    selector: '.MuiBadge-badge',
    height: (density, variant) =>
      variant === 'dot' ? density.step.small : 16 + 2 * density.step.xxSmall,
  },
  Fab: {
    sizes: ['small', 'medium', 'large'],
    render: (size) => (
      <Fab size={size}>
        <AddIcon />
      </Fab>
    ),
    selector: '.MuiFab-root',
    height: (density, size) => {
      if (size === 'small') {
        return density.touchTarget + density.step.xxSmall;
      }
      if (size === 'large') {
        return density.touchTarget + density.step.medium;
      }
      return density.touchTarget + density.step.xSmall;
    },
  },
  Chip: {
    sizes: ['small', 'medium'],
    render: (size) => <Chip size={size} label="Chip" />,
    selector: '.MuiChip-root',
    height: ramp,
  },
  InputBase: {
    sizes: ['small', 'medium'],
    render: (size) => <InputBase size={size} defaultValue="Ada" />,
    selector: '.MuiInputBase-root',
    height: ramp,
  },
  Input: {
    sizes: ['small', 'medium'],
    render: (size) => <TextField variant="standard" size={size} defaultValue="Ada" />,
    selector: '.MuiInput-root',
    height: ramp,
  },
  OutlinedInput: {
    sizes: ['small', 'medium'],
    render: (size) => <TextField variant="outlined" size={size} defaultValue="Ada" />,
    selector: '.MuiOutlinedInput-root',
    height: ramp,
  },
  FilledInput: {
    sizes: ['small', 'medium'],
    render: (size) => <TextField variant="filled" hiddenLabel size={size} defaultValue="Ada" />,
    selector: '.MuiFilledInput-root',
    height: ramp,
  },
  StandaloneFilledInput: {
    sizes: ['small', 'medium'],
    render: (size) => <FilledInput hiddenLabel size={size} defaultValue="Ada" />,
    selector: '.MuiFilledInput-root',
    height: ramp,
  },
  Select: {
    sizes: ['small', 'medium'],
    render: (size) => (
      <Select variant="outlined" size={size} value="a">
        <MenuItem value="a">a</MenuItem>
      </Select>
    ),
    selector: '.MuiOutlinedInput-root',
    height: ramp,
  },
  AccordionSummary: {
    render: () => (
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
      </Accordion>
    ),
    selector: '.MuiAccordionSummary-root',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
  Toolbar: {
    sizes: ['regular', 'dense'],
    render: (size) => <Toolbar variant={size}>Title</Toolbar>,
    selector: '.MuiToolbar-root',
    axis: 'minHeight',
    height: (density, size) =>
      size === 'dense'
        ? density.touchTarget + 2 * density.step.xxSmall
        : density.touchTarget + 2 * density.step.xSmall,
  },
  Tabs: {
    render: () => (
      <Tabs value={0}>
        <Tab label="One" />
      </Tabs>
    ),
    selector: '.MuiTabs-root',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
  Tab: {
    render: () => (
      <Tabs value={0}>
        <Tab label="One" />
      </Tabs>
    ),
    selector: '.MuiTab-root',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
  TableCell: {
    sizes: ['small', 'medium'],
    render: (size) => (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell size={size}>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    selector: '.MuiTableRow-root',
    rendered: true,
    height: (density, size) =>
      size === 'small'
        ? density.touchTarget + density.step.xxSmall
        : density.touchTarget + 2 * density.step.xxSmall,
  },
  TablePagination: {
    render: () => (
      <Table>
        <TableBody>
          <TableRow>
            <TablePagination count={1} page={0} rowsPerPage={10} onPageChange={() => {}} />
          </TableRow>
        </TableBody>
      </Table>
    ),
    selector: '.MuiTablePagination-toolbar',
    axis: 'minHeight',
    height: (density) => density.touchTarget + density.step.medium,
  },
  BottomNavigation: {
    render: () => (
      <BottomNavigation>
        <BottomNavigationAction label="A" />
      </BottomNavigation>
    ),
    selector: '.MuiBottomNavigation-root',
    height: (density) => density.step.xxLarge,
  },
  ButtonGroup: {
    render: () => (
      <ButtonGroup>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    ),
    selector: '.MuiButtonGroup-grouped',
    axis: 'minWidth',
    height: (density) => density.touchTarget,
  },
  Breadcrumbs: {
    render: () => (
      <Breadcrumbs maxItems={2}>
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
        <span>Four</span>
      </Breadcrumbs>
    ),
    selector: `.MuiBreadcrumbs-ol li > .MuiButtonBase-root`,
    height: (density) => density.touchTarget,
  },
  Autocomplete: {
    render: () => (
      <Autocomplete
        open
        options={['One', 'Two']}
        renderInput={(params) => <TextField {...params} />}
      />
    ),
    selector: '.MuiAutocomplete-option',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
  StepLabel: {
    render: () => (
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>One</StepLabel>
        </Step>
      </Stepper>
    ),
    selector: '.MuiStepLabel-iconContainer',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
  StepConnector: {
    render: () => (
      <Stepper orientation="vertical" activeStep={0}>
        <Step>
          <StepLabel>One</StepLabel>
        </Step>
        <Step>
          <StepLabel>Two</StepLabel>
        </Step>
      </Stepper>
    ),
    selector: '.MuiStepConnector-line',
    height: (density) => density.step.medium,
  },
  TabScrollButton: {
    render: () => (
      <Tabs value={0} variant="scrollable" scrollButtons>
        <Tab label="One" />
      </Tabs>
    ),
    selector: '.MuiTabScrollButton-root',
    axis: 'width',
    height: (density) => density.touchTarget,
  },
  LinearProgress: {
    render: () => <LinearProgress />,
    selector: '.MuiLinearProgress-root',
    height: () => 4,
  },
  Slider: {
    render: () => <Slider value={50} />,
    selector: '.MuiSlider-root',
    height: (density) => density.touchTarget,
  },
  MenuItem: {
    render: () => (
      <MenuList>
        <MenuItem>Item</MenuItem>
      </MenuList>
    ),
    selector: '.MuiMenuItem-root',
    axis: 'minHeight',
    height: (density) => Math.max(28, density.touchTarget),
  },
  ListItemButtonDense: {
    render: () => <ListItemButton dense>Item</ListItemButton>,
    selector: '.MuiListItemButton-root',
    axis: 'minHeight',
    height: (density) => Math.max(24, density.touchTarget - density.step.xxSmall),
  },
  ListItemButton: {
    render: () => <ListItemButton>Item</ListItemButton>,
    selector: '.MuiListItemButton-root',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
  ListItemIcon: {
    render: () => (
      <ListItemIcon>
        <Check fontSize="small" />
      </ListItemIcon>
    ),
    selector: '.MuiListItemIcon-root',
    axis: 'minWidth',
    height: (density) => density.iconSize,
  },
};

const ICON_SIZES = {
  small: (density: Density) => density.iconSize - density.step.xxSmall,
  medium: (density: Density) => density.iconSize,
  large: (density: Density) => density.iconSize + 8,
};

const BOX_PROPS = ['height', 'minHeight', 'width', 'minWidth', '--_size', '--_height'];

const claimsABox = (value: unknown) =>
  value !== 0 && value !== 'auto' && value !== '0' && value !== 'none' && value !== '100%';

function emitsABox(node: unknown): boolean {
  if (Array.isArray(node)) {
    return node.some(emitsABox);
  }
  if (node === null || typeof node !== 'object') {
    return false;
  }
  return Object.entries(node as Record<string, unknown>).some(([key, value]) =>
    BOX_PROPS.includes(key) ? claimsABox(value) : emitsABox(value),
  );
}

describe.skipIf(isJsdom())('density contract', () => {
  const { render } = createRenderer();
  const renderIn = (theme: Theme, node: React.ReactNode) =>
    render(<ThemeProvider theme={theme}>{node}</ThemeProvider>);

  describe('boxes', () => {
    test('every component that sizes a box has a spec', () => {
      const components = (MEDIUM.components ?? {}) as Record<string, any>;
      const asserted = new Set([
        'MuiSvgIcon',
        ...Object.keys(CONTROLS).map((name) => `Mui${name}`),
      ]);
      const unmeasured = Object.entries(components)
        .filter(([name, value]) => !asserted.has(name) && emitsABox(value?.styleOverrides))
        .map(([name]) => name);
      expect(unmeasured).to.deep.equal([]);
    });

    DENSITIES.forEach((density) => {
      describe(density.id, () => {
        test('SvgIcon sizes', () => {
          const sizes = Object.keys(ICON_SIZES) as (keyof typeof ICON_SIZES)[];
          renderIn(
            THEMES[density.id],
            cases(
              byName(sizes, (size) => (
                <SvgIcon fontSize={size as any}>
                  <path d="M0 0h24v24H0z" />
                </SvgIcon>
              )),
            ),
          );
          expect(
            byName(sizes, (size) => parseFloat(css('.MuiSvgIcon-root', inCase(size)).fontSize)),
          ).to.deep.equal(
            byName(sizes, (size) => ICON_SIZES[size as keyof typeof ICON_SIZES](density)),
          );
        });

        Object.entries(CONTROLS).forEach(([name, spec]) => {
          (spec.sizes ?? [undefined]).forEach((size) => {
            test(`${name}${size ? ` ${size}` : ''}`, () => {
              renderIn(THEMES[density.id], spec.render(size));
              const side = spec.rendered
                ? rect(spec.selector).height
                : parseFloat(css(spec.selector)[spec.axis ?? 'height']);
              expect(round2(side)).to.equal(spec.height(density, size));
            });
          });
        });
      });
    });

    test('a region that overrides --mui-touchTarget and --mui-iconSize resizes the controls in it', () => {
      renderIn(
        enhanceDensity(createTheme({ cssVariables: true })),
        <div
          style={{ '--mui-touchTarget': '44px', '--mui-iconSize': '24px' } as React.CSSProperties}
        >
          <Button>Label</Button>
          <Checkbox />
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>,
      );
      expect({
        button: rect('.MuiButton-root').height,
        checkbox: rect('.MuiCheckbox-root').height,
        iconButton: rect('.MuiIconButton-root').height,
        icon: parseFloat(css('.MuiIconButton-root svg').fontSize),
      }).to.deep.equal({ button: 44, checkbox: 44, iconButton: 44, icon: 24 });
    });

    describe('touch area', () => {
      const touchArea = (selector: string, scope?: ParentNode) => {
        const element = query(selector, scope);
        const before = getComputedStyle(element, '::before');
        return {
          margin: (['Top', 'Right', 'Bottom', 'Left'] as const).map((side) =>
            parseFloat(getComputedStyle(element)[`margin${side}`]),
          ),
          tap:
            before.content === 'none'
              ? null
              : {
                  width: round2(parseFloat(before.width)),
                  height: round2(parseFloat(before.height)),
                },
        };
      };
      const smallControls = cases({
        filled: <Chip size="small" label="Chip" onClick={() => {}} />,
        outlined: <Chip size="small" variant="outlined" label="Chip" onClick={() => {}} />,
        icon: (
          <IconButton size="small">
            <AddIcon />
          </IconButton>
        ),
        edgeStart: (
          <IconButton size="small" edge="start">
            <AddIcon />
          </IconButton>
        ),
      });
      const paddingBox = (selector: string, scope?: ParentNode) => {
        const element = query(selector, scope);
        const border = parseFloat(getComputedStyle(element).borderTopWidth);
        const { width, height } = element.getBoundingClientRect();
        return { width: round2(width - 2 * border), height: round2(height - 2 * border) };
      };

      DENSITIES.forEach((density) => {
        test(`${density.id}: small clickable Chip and small IconButton reach 24px`, () => {
          renderIn(THEMES[density.id], smallControls);
          const small = density.touchTarget - density.step.xxSmall;
          const margin = Math.max(0, (24 - small) / 2);
          const tap = Math.max(24, small);
          expect({
            filled: touchArea('.MuiChip-root', inCase('filled')),
            outlined: touchArea('.MuiChip-root', inCase('outlined')),
            icon: touchArea('.MuiIconButton-root', inCase('icon')),
            edgeStart: touchArea('.MuiIconButton-root', inCase('edgeStart')),
          }).to.deep.equal({
            filled: {
              margin: [margin, 0, margin, 0],
              tap: {
                width: paddingBox('.MuiChip-root', inCase('filled')).width,
                height: Math.max(24, paddingBox('.MuiChip-root', inCase('filled')).height),
              },
            },
            outlined: {
              margin: [margin, 0, margin, 0],
              tap: {
                width: paddingBox('.MuiChip-root', inCase('outlined')).width,
                height: Math.max(24, paddingBox('.MuiChip-root', inCase('outlined')).height),
              },
            },
            icon: { margin: [margin, margin, margin, margin], tap: { width: tap, height: tap } },
            edgeStart: {
              margin: [margin, margin, margin, -density.touchTarget / 4],
              tap: { width: tap, height: tap },
            },
          });
        });
      });

      DENSITIES.forEach((density) => {
        test(`${density.id}: small Button, ToggleButton and PaginationItem reach 24px`, () => {
          renderIn(
            THEMES[density.id],
            cases({
              button: <Button size="small">Label</Button>,
              toggle: (
                <ToggleButton value="a" size="small">
                  <AddIcon />
                </ToggleButton>
              ),
              page: <PaginationItem size="small" page={1} />,
              ellipsis: <PaginationItem size="small" type="start-ellipsis" />,
            }),
          );
          const small = density.touchTarget - density.step.xxSmall;
          const margin = Math.max(0, (24 - small) / 2);
          const grown = (selector: string, name: string) => {
            const box = paddingBox(selector, inCase(name));
            return { width: Math.max(24, box.width), height: Math.max(24, box.height) };
          };
          expect({
            button: touchArea('.MuiButton-root', inCase('button')),
            toggle: touchArea('.MuiToggleButton-root', inCase('toggle')),
            page: touchArea('.MuiPaginationItem-root', inCase('page')),
            ellipsis: touchArea('.MuiPaginationItem-root', inCase('ellipsis')),
          }).to.deep.equal({
            button: {
              margin: [margin, 0, margin, 0],
              tap: {
                width: paddingBox('.MuiButton-root', inCase('button')).width,
                height: grown('.MuiButton-root', 'button').height,
              },
            },
            toggle: {
              margin: [margin, margin, margin, margin],
              tap: grown('.MuiToggleButton-root', 'toggle'),
            },
            page: {
              margin: [margin, margin, margin, margin],
              tap: grown('.MuiPaginationItem-root', 'page'),
            },
            ellipsis: { margin: [margin, margin, margin, margin], tap: null },
          });
        });

        test(`${density.id}: small groups reach 24px: ButtonGroup reserves space on the group, grouped toggles grow square`, () => {
          renderIn(
            THEMES[density.id],
            cases(
              byName(['horizontal', 'vertical'], (orientation: any) => (
                <React.Fragment>
                  <ButtonGroup size="small" orientation={orientation}>
                    <Button>One</Button>
                    <Button>Two</Button>
                  </ButtonGroup>
                  <ToggleButtonGroup size="small" orientation={orientation}>
                    <ToggleButton value="a">
                      <AddIcon />
                    </ToggleButton>
                    <ToggleButton value="b">
                      <AddIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </React.Fragment>
              )),
            ),
          );
          const small = density.touchTarget - density.step.xxSmall;
          const margin = Math.max(0, (24 - small) / 2);
          const size = (selector: string, orientation: string) => {
            const { width, height } = rect(selector, inCase(orientation));
            return { width: round2(width), height: round2(height) };
          };
          const read = (orientation: string) => ({
            buttonGroup: touchArea('.MuiButtonGroup-root', inCase(orientation)).margin,
            button: touchArea('.MuiButton-root', inCase(orientation)),
            toggleGroup: touchArea('.MuiToggleButtonGroup-root', inCase(orientation)).margin,
            toggle: touchArea('.MuiToggleButton-root', inCase(orientation)),
            toggleSize: size('.MuiToggleButton-root', orientation),
          });
          const buttonBox = paddingBox('.MuiButton-root', inCase('horizontal'));
          const toggleSide = Math.max(24, small);
          expect({ horizontal: read('horizontal'), vertical: read('vertical') }).to.deep.equal({
            horizontal: {
              buttonGroup: [margin, 0, margin, 0],
              button: {
                margin: [0, 0, 0, 0],
                tap: { width: buttonBox.width, height: Math.max(24, buttonBox.height) },
              },
              toggleGroup: [0, 0, 0, 0],
              toggle: { margin: [0, 0, 0, 0], tap: null },
              toggleSize: { width: toggleSide, height: toggleSide },
            },
            vertical: {
              buttonGroup: [0, 0, 0, 0],
              button: { margin: [0, 0, 0, 0], tap: null },
              toggleGroup: [0, 0, 0, 0],
              toggle: { margin: [0, 0, 0, 0], tap: null },
              toggleSize: { width: toggleSide, height: toggleSide },
            },
          });
          expect(size('.MuiButton-root', 'vertical').height).to.equal(
            Math.max(24, size('.MuiButton-root', 'horizontal').height),
          );
        });
      });

      test('leaves non-clickable Chips and medium sizes alone', () => {
        renderIn(
          THEMES.high,
          cases({
            static: <Chip size="small" label="Chip" />,
            deletable: <Chip size="small" label="Chip" onDelete={() => {}} />,
            mediumChip: <Chip label="Chip" onClick={() => {}} />,
            mediumIcon: (
              <IconButton>
                <AddIcon />
              </IconButton>
            ),
          }),
        );
        const untouched = { margin: [0, 0, 0, 0], tap: null };
        expect({
          static: touchArea('.MuiChip-root', inCase('static')),
          deletable: touchArea('.MuiChip-root', inCase('deletable')),
          mediumChip: touchArea('.MuiChip-root', inCase('mediumChip')),
          mediumIcon: touchArea('.MuiIconButton-root', inCase('mediumIcon')),
        }).to.deep.equal({
          static: untouched,
          deletable: untouched,
          mediumChip: untouched,
          mediumIcon: untouched,
        });
      });

      test('a region that lowers --mui-touchTarget grows the margin and keeps the tap area at 24px', () => {
        renderIn(
          enhanceDensity(createTheme({ cssVariables: true })),
          <div style={{ '--mui-touchTarget': '20px' } as React.CSSProperties}>{smallControls}</div>,
        );
        expect({
          filled: touchArea('.MuiChip-root', inCase('filled')),
          icon: touchArea('.MuiIconButton-root', inCase('icon')),
        }).to.deep.equal({
          filled: {
            margin: [4, 0, 4, 0],
            tap: { width: paddingBox('.MuiChip-root', inCase('filled')).width, height: 24 },
          },
          icon: { margin: [4, 4, 4, 4], tap: { width: 24, height: 24 } },
        });
      });
    });

    test('a size added by the app renders like medium', () => {
      const added = 'xlarge' as any;
      renderIn(
        MEDIUM,
        cases(
          byName(['medium', added], (size: any) => (
            <React.Fragment>
              <Switch size={size} />
              <ToggleButton value="a" size={size}>
                <AddIcon />
              </ToggleButton>
              <Chip size={size} label="Chip" onDelete={() => {}} />
            </React.Fragment>
          )),
        ),
      );
      const boxes = (size: string) =>
        byName(
          [
            '.MuiSwitch-root',
            '.MuiSwitch-switchBase',
            '.MuiSwitch-thumb',
            '.MuiSwitch-track',
            '.MuiToggleButton-root',
            '.MuiChip-root',
          ],
          (selector) => {
            const element = query(selector, inCase(size));
            const { width, height } = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return {
              width: round2(width),
              height: round2(height),
              radius: style.borderTopLeftRadius,
              padding: style.padding,
            };
          },
        );
      expect(boxes(added)).to.deep.equal(boxes('medium'));
    });
  });

  describe('inputs', () => {
    DENSITIES.forEach((density) => {
      test(`${density.id}: filled fields with and without a label share one box`, () => {
        renderIn(
          THEMES[density.id],
          cases(
            grid([SIZES, ['standalone', 'labeled', 'hiddenLabel', 'multiline']], (size, kind) =>
              kind === 'standalone' ? (
                <FilledInput size={size} defaultValue="Ada" />
              ) : (
                <TextField
                  variant="filled"
                  size={size}
                  label={kind === 'labeled' ? 'Label' : undefined}
                  hiddenLabel={kind !== 'labeled'}
                  multiline={kind === 'multiline'}
                  defaultValue="Ada"
                />
              ),
            ),
          ),
        );
        const height = (name: string) => rect('.MuiFilledInput-root', inCase(name)).height;
        expectNoDrift(
          Object.fromEntries(
            SIZES.flatMap((size) => [
              [
                `${size} standalone vs labeled`,
                drift(height(`${size} standalone`) - height(`${size} labeled`)),
              ],
              [
                `${size} multiline vs hiddenLabel`,
                drift(height(`${size} multiline`) - height(`${size} hiddenLabel`)),
              ],
            ]),
          ),
        );
      });

      test(`${density.id}: Autocomplete has the TextField box`, () => {
        renderIn(
          THEMES[density.id],
          cases(
            grid([FIELDS, ['autocomplete', 'textfield']], (name, kind) =>
              kind === 'autocomplete' ? (
                autocompleteField(name)
              ) : (
                <TextField {...fieldProps(name)} defaultValue="One" />
              ),
            ),
          ),
        );
        const height = (name: string) => rect('.MuiInputBase-root', inCase(name)).height;
        expectNoDrift(
          byName(FIELDS, (name) =>
            drift(height(`${name} autocomplete`) - height(`${name} textfield`)),
          ),
        );
      });

      test(`${density.id}: the floating label starts where the value starts`, () => {
        const fields = grid(
          [['TextField', 'Select', 'Autocomplete'], VARIANTS, SIZES],
          (control, variant, size) => {
            if (control === 'Select') {
              return (
                <TextField select variant={variant} size={size} label="Label" defaultValue="a">
                  <MenuItem value="a">Value</MenuItem>
                </TextField>
              );
            }
            if (control === 'Autocomplete') {
              return autocompleteField(`${variant} ${size}`, {
                options: ['Value'],
                defaultValue: 'Value',
              });
            }
            return <TextField variant={variant} size={size} label="Label" defaultValue="Value" />;
          },
        );
        renderIn(THEMES[density.id], cases(fields));
        expectNoDrift(
          byName(Object.keys(fields), (name) => {
            const value = query('input:not([aria-hidden]), .MuiSelect-select', inCase(name));
            const valueStart =
              value.getBoundingClientRect().left + parseFloat(getComputedStyle(value).paddingLeft);
            return drift(valueStart - textBox(query('.MuiInputLabel-root', inCase(name))).left);
          }),
        );
      });

      test(`${density.id}: Autocomplete chips keep the field height and room around wrapped rows`, () => {
        const options = ['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry', 'Fig'];
        const values: Record<string, string[]> = {
          empty: [],
          one: ['Apple'],
          wrapped: options,
        };
        const names = Object.keys(grid([VARIANTS, SIZES], () => null));
        renderIn(
          THEMES[density.id],
          cases(
            grid([names, Object.keys(values)], (name, kind) =>
              autocompleteField(name, {
                multiple: true,
                options,
                defaultValue: values[kind],
                sx: { width: kind === 'wrapped' ? 220 : 400 },
              }),
            ),
          ),
        );
        const root = (name: string) => rect('.MuiAutocomplete-inputRoot', inCase(name));
        expect(
          byName(names, (name) => {
            const box = root(`${name} wrapped`);
            const items = Array.from(
              inCase(`${name} wrapped`).querySelectorAll(
                '.MuiAutocomplete-tag, .MuiAutocomplete-input',
              ),
            ).map((item) => item.getBoundingClientRect());
            const top = Math.min(...items.map((item) => item.top)) - box.top;
            const bottom = box.bottom - Math.max(...items.map((item) => item.bottom));
            return {
              sameHeight: drift(root(`${name} one`).height - root(`${name} empty`).height) === 0,
              roomBelow: bottom > 1,
              roomAbove: name.startsWith('filled') ? top > bottom : drift(top - bottom) === 0,
            };
          }),
        ).to.deep.equal(
          byName(names, () => ({ sameHeight: true, roomBelow: true, roomAbove: true })),
        );
      });

      test(`${density.id}: the Autocomplete value stops before the end buttons`, () => {
        const value = 'A long option value that fills the field';
        const fields = grid([VARIANTS, ['clearable', 'popup only']], (variant, kind) =>
          autocompleteField(`${variant} medium`, {
            sx: { width: 300 },
            options: [value],
            defaultValue: value,
            disableClearable: kind === 'popup only',
          }),
        );
        renderIn(THEMES[density.id], cases(fields));
        expectNoDrift(
          byName(Object.keys(fields), (name) => {
            const input = query('.MuiAutocomplete-input', inCase(name));
            const textEnd =
              input.getBoundingClientRect().right -
              parseFloat(getComputedStyle(input).paddingRight);
            return drift(
              Math.max(0, textEnd - rect('.MuiAutocomplete-endAdornment', inCase(name)).left),
            );
          }),
        );
      });

      test(`${density.id}: the Select value stops before the caret and the end adornment`, () => {
        const fields = grid([VARIANTS, ['plain', 'adornment']], (variant, kind) => (
          <Select
            variant={variant}
            value="a"
            sx={{ width: 160 }}
            endAdornment={
              kind === 'adornment' ? <InputAdornment position="end">x</InputAdornment> : null
            }
          >
            <MenuItem value="a">A long selected option</MenuItem>
          </Select>
        ));
        renderIn(THEMES[density.id], cases(fields));
        expectNoDrift(
          byName(Object.keys(fields), (name) => {
            const value = query('.MuiSelect-select', inCase(name));
            const textEnd =
              value.getBoundingClientRect().right -
              parseFloat(getComputedStyle(value).paddingRight);
            const ends = Array.from(
              inCase(name).querySelectorAll('.MuiSelect-icon, .MuiInputAdornment-root'),
            ).map((end) => end.getBoundingClientRect().left);
            return drift(Math.max(0, textEnd - Math.min(...ends)));
          }),
        );
      });
    });

    test('every input type shares the text box', () => {
      const types = ['text', 'date', 'time', 'datetime-local', 'month', 'week', 'color'];
      const fields = grid([VARIANTS, SIZES, types], (variant, size, type) => (
        <TextField variant={variant} size={size} type={type} />
      ));
      renderIn(MEDIUM, cases(fields));
      const height = (name: string) => rect('.MuiInputBase-root', inCase(name)).height;
      expectNoDrift(
        byName(Object.keys(fields), (name) =>
          drift(height(name) - height(name.replace(/\S+$/, 'text'))),
        ),
      );
    });

    test('a label keeps master position when the input does not set it', () => {
      const fields = grid([[...VARIANTS, 'shrunk'], SIZES], (kind, size) => (
        <FormControl variant={kind === 'shrunk' ? 'filled' : kind} size={size}>
          <InputLabel shrink={kind === 'shrunk' || undefined}>Label</InputLabel>
          <InputBase />
        </FormControl>
      ));
      render(sideBySide({ master: createTheme(), enhanced: MEDIUM }, cases(fields)));
      const transforms = (theme: string) =>
        byName(Object.keys(fields), (name) => css('label', inTheme(theme, name)).transform);
      expect(transforms('enhanced')).to.deep.equal(transforms('master'));
    });

    test('helper text with inline elements flows as text', () => {
      render(
        sideBySide(
          { master: createTheme(), enhanced: MEDIUM },
          cases({
            field: (
              <TextField
                sx={{ width: 220 }}
                helperText={
                  <React.Fragment>
                    Use <strong>letters only</strong> and read the <a href="#rules">naming rules</a>{' '}
                    before you continue.
                  </React.Fragment>
                }
              />
            ),
          }),
        ),
      );
      const linkWidth = (theme: string) =>
        rect('.MuiFormHelperText-root a', inTheme(theme, 'field')).width;
      expect(linkWidth('enhanced')).to.equal(linkWidth('master'));
    });

    test('the outlined label lift follows touchTarget, including a region override', () => {
      const field = <TextField label="Label" defaultValue="value" />;
      const varsTheme = enhanceDensity(createTheme({ cssVariables: true }));
      const region = (touchTarget: string) => (
        <ThemeProvider theme={varsTheme}>
          <div style={{ '--mui-touchTarget': touchTarget } as React.CSSProperties}>{field}</div>
        </ThemeProvider>
      );
      render(
        cases({
          ...byName(['24', '32', '44'], (touchTarget) => (
            <ThemeProvider
              theme={enhanceDensity(createTheme(), { touchTarget: Number(touchTarget) })}
            >
              {field}
            </ThemeProvider>
          )),
          'region 44': region('44px'),
          'region 24': region('24px'),
        }),
      );
      const liftInLines = (name: string) => {
        const style = css('.MuiInputLabel-root', inCase(name));
        return (
          Math.round((new DOMMatrix(style.transform).f / parseFloat(style.lineHeight)) * 1000) /
          1000
        );
      };
      expect(byName(['24', '32', '44', 'region 44', 'region 24'], liftInLines)).to.deep.equal({
        24: -0.475,
        32: -0.475,
        44: -0.375,
        'region 44': -0.375,
        'region 24': -0.475,
      });
    });
  });

  describe('content', () => {
    test('DialogContent keeps block padding without a title, and none under one', () => {
      renderIn(
        MEDIUM,
        cases({
          alone: <DialogContent>Body</DialogContent>,
          titled: (
            <React.Fragment>
              <DialogTitle>Title</DialogTitle>
              <DialogContent>Body</DialogContent>
            </React.Fragment>
          ),
        }),
      );
      const alone = css('.MuiDialogContent-root', inCase('alone'));
      expect(parseFloat(alone.paddingTop)).to.be.greaterThan(0);
      expect(parseFloat(alone.paddingBottom)).to.be.greaterThan(0);
      expect(css('.MuiDialogContent-root', inCase('titled')).paddingTop).to.equal('0px');
    });

    test('wrapped TableCell and AccordionSummary content keeps an xxSmall inset', () => {
      const longText = 'A value long enough to wrap onto several lines in a narrow column';
      renderIn(
        MEDIUM,
        <React.Fragment>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: 120 }}>
                  <span data-testid="cell-text">{longText}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Accordion sx={{ width: 200 }}>
            <AccordionSummary>
              <span data-testid="summary-text">{longText}</span>
            </AccordionSummary>
          </Accordion>
        </React.Fragment>,
      );
      const inset = (outer: string, inner: string) => {
        const outerBox = rect(outer);
        const innerBox = rect(inner);
        return Math.min(innerBox.top - outerBox.top, outerBox.bottom - innerBox.bottom);
      };
      expect(inset('.MuiTableCell-root', '[data-testid="cell-text"]')).to.be.at.least(
        DEFAULT_STEP_PX.xxSmall,
      );
      expect(inset('.MuiAccordionSummary-root', '[data-testid="summary-text"]')).to.be.at.least(
        DEFAULT_STEP_PX.xxSmall,
      );
    });

    test('CardActions keeps top padding below a CardMedia', () => {
      renderIn(
        MEDIUM,
        <Card>
          <CardMedia sx={{ height: 40 }} />
          <CardActions>
            <Button>Share</Button>
          </CardActions>
        </Card>,
      );
      expect(parseFloat(css('.MuiCardActions-root').paddingTop)).to.be.greaterThan(0);
    });
  });

  describe('buttons', () => {
    test('a wrapped Button label grows the button', () => {
      renderIn(
        MEDIUM,
        <Button variant="contained" sx={{ width: 100 }}>
          Save and continue to checkout
        </Button>,
      );
      const button = query('.MuiButton-root');
      expect(button.scrollHeight).to.be.at.most(button.clientHeight);
      expect(rect('.MuiButton-root').height).to.be.greaterThan(DEFAULT_SIZING_PX.touchTarget);
    });

    test('sx block padding grows the Button', () => {
      renderIn(
        MEDIUM,
        <Button variant="contained" sx={{ py: '20px' }}>
          Save
        </Button>,
      );
      expect(rect('.MuiButton-root').height).to.be.greaterThan(DEFAULT_SIZING_PX.touchTarget);
    });

    test('an IconButton keeps its box with width: min-content', () => {
      renderIn(
        MEDIUM,
        <IconButton sx={{ width: 'min-content' }}>
          <SearchIcon />
        </IconButton>,
      );
      expect(rect('.MuiIconButton-root').width).to.equal(DEFAULT_SIZING_PX.touchTarget);
    });

    test('a small Button inside a ButtonGroup matches the group height', () => {
      renderIn(
        MEDIUM,
        <ButtonGroup variant="contained">
          <Button data-testid="main">Merge</Button>
          <Button size="small" data-testid="arrow">
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>,
      );
      expect(rect('[data-testid="arrow"]').height).to.equal(rect('[data-testid="main"]').height);
    });

    test('a wrapped ToggleButton label grows the button', () => {
      renderIn(
        MEDIUM,
        <ToggleButtonGroup value="a" orientation="vertical" sx={{ width: 100 }}>
          <ToggleButton value="a">Monthly subscription plan</ToggleButton>
        </ToggleButtonGroup>,
      );
      const button = query('.MuiToggleButton-root');
      expect(button.scrollHeight).to.be.at.most(button.clientHeight);
    });

    test('the loading spinner takes the place of the icon', () => {
      const centerX = (element: Element) => {
        const box = element.getBoundingClientRect();
        return box.left + box.width / 2;
      };
      const buttons = grid(
        [
          ['text', 'outlined', 'contained'],
          ['small', 'medium', 'large'],
          ['start', 'end'],
        ],
        (variant, size, position) => (
          <Button
            variant={variant}
            size={size}
            loading
            loadingPosition={position}
            {...{ [`${position}Icon`]: <AddIcon /> }}
          >
            Save
          </Button>
        ),
      );
      renderIn(MEDIUM, cases(buttons));
      expectNoDrift(
        byName(Object.keys(buttons), (name) =>
          drift(
            centerX(query('.MuiButton-loadingIndicator', inCase(name))) -
              centerX(query(`.MuiButton-${name.split(' ')[2]}Icon`, inCase(name))),
            1,
          ),
        ),
      );
    });

    (['start', 'end'] as const).forEach((position) => {
      test(`fullWidth ${position}: the label stays put and the spinner takes the icon's place`, () => {
        const node = (loading: boolean) => (
          <ThemeProvider theme={MEDIUM}>
            <Button
              fullWidth
              loading={loading}
              loadingPosition={position}
              {...{ [`${position}Icon`]: <AddIcon /> }}
            >
              <span data-testid="label">Save</span>
            </Button>
          </ThemeProvider>
        );
        const centerX = (box: DOMRect) => box.left + box.width / 2;
        const { setProps } = render(node(false));
        const before = rect('[data-testid="label"]').left;
        const iconCenter = centerX(rect(`.MuiButton-${position}Icon`));
        setProps({ children: node(true).props.children });
        expect(rect('[data-testid="label"]').left).to.be.closeTo(before, 0.5);
        expect(centerX(rect('.MuiButton-loadingIndicator'))).to.be.closeTo(iconCenter, 1);
      });
    });
  });

  describe('form labels', () => {
    DENSITIES.forEach((density) => {
      test(`${density.id}: a Checkbox label pulls the glyph onto the container edge`, () => {
        renderIn(
          THEMES[density.id],
          <div data-testid="container">
            <FormControlLabel control={<Checkbox />} label="a" />
          </div>,
        );
        expect(
          drift(rect('.MuiCheckbox-root svg').left - rect('[data-testid="container"]').left),
        ).to.equal(0);
      });

      test(`${density.id}: a Switch with its thumb inside the track pulls the track onto the container edge`, () => {
        renderIn(
          THEMES[density.id],
          <div data-testid="container">
            <FormControlLabel
              control={
                <Switch
                  sx={{
                    '--_trackWidth': 'calc(2 * var(--_thumbHeight) + 4px)',
                    '--_trackHeight': 'calc(var(--_thumbHeight) + 4px)',
                  }}
                />
              }
              label="a"
            />
          </div>,
        );
        expect(
          drift(rect('.MuiSwitch-track').left - rect('[data-testid="container"]').left),
        ).to.equal(0);
      });

      test(`${density.id}: a Switch takes its track size from the track inputs`, () => {
        renderIn(
          THEMES[density.id],
          <Switch sx={{ '--_trackWidth': '36px', '--_trackHeight': '20px' }} />,
        );
        const track = rect('.MuiSwitch-track');

        expect([round2(track.width), round2(track.height)]).to.deep.equal([36, 20]);
        expect(round2(rect('.MuiSwitch-root').height)).to.equal(density.touchTarget);
      });
    });

    test('a Switch inside a label is pulled in, and sx margins on the label or the Switch win', () => {
      renderIn(
        MEDIUM,
        <React.Fragment>
          <FormControlLabel data-testid="label" sx={{ ml: 0 }} control={<Checkbox />} label="a" />
          <FormControlLabel data-testid="plain" control={<Switch />} label="b" />
          <FormControlLabel data-testid="with-sx" control={<Switch sx={{ ml: 0 }} />} label="c" />
        </React.Fragment>,
      );
      expect(css('[data-testid="label"]').marginLeft).to.equal('0px');
      expect(parseFloat(css('[data-testid="plain"] .MuiSwitch-root').marginLeft)).to.be.lessThan(0);
      expect(css('[data-testid="with-sx"] .MuiSwitch-root').marginLeft).to.equal('0px');
    });
  });

  describe('alerts', () => {
    DENSITIES.forEach((density) => {
      test(`${density.id}: an Alert is touchTarget + 2 × xSmall tall with or without a close button`, () => {
        renderIn(
          THEMES[density.id],
          cases(
            byName(['plain', 'closable'], (kind) => (
              <Alert onClose={kind === 'closable' ? () => {} : undefined}>Message</Alert>
            )),
          ),
        );
        const expected = density.touchTarget + 2 * density.step.xSmall;

        ['plain', 'closable'].forEach((kind) => {
          expect(rect('.MuiAlert-root', inCase(kind)).height).to.be.closeTo(expected, 0.1);
        });
      });
    });
  });

  describe('lists and menus', () => {
    const insetThemes: Record<string, Theme> = {
      ...THEMES,
      ...Object.fromEntries(
        ['1.5', '22px', 'normal'].map((lineHeight) => [
          `body2 lineHeight ${lineHeight}`,
          enhanceDensity(createTheme({ typography: { body2: { lineHeight } } })),
        ]),
      ),
    };
    Object.entries(insetThemes).forEach(([name, theme]) => {
      test(`${name}: inset menu text, inset divider and small-icon text line up with the icon row text`, () => {
        renderIn(
          theme,
          cases(
            byName(['regular', 'dense'], (kind) => (
              <MenuList
                dense={kind === 'dense'}
                sx={{ fontFamily: 'serif', fontSize: 16, lineHeight: 1.5 }}
              >
                <MenuItem data-testid="inset">
                  <ListItemText inset>Single</ListItemText>
                </MenuItem>
                <MenuItem data-testid="icon">
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  <ListItemText>Custom</ListItemText>
                </MenuItem>
                <MenuItem data-testid="icon-small">
                  <ListItemIcon>
                    <Check fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Small icon</ListItemText>
                </MenuItem>
                <Divider variant="inset" component="li" />
              </MenuList>
            )),
          ),
        );
        expectNoDrift(
          Object.fromEntries(
            ['regular', 'dense'].flatMap((kind) => {
              const iconText = rect(
                '[data-testid="icon"] .MuiListItemText-root',
                inCase(kind),
              ).left;
              return [
                [
                  `${kind} inset text`,
                  drift(
                    rect('[data-testid="inset"] .MuiTypography-root', inCase(kind)).left - iconText,
                  ),
                ],
                [
                  `${kind} inset divider`,
                  drift(rect('.MuiDivider-root', inCase(kind)).left - iconText),
                ],
                [
                  `${kind} small icon text`,
                  drift(
                    rect('[data-testid="icon-small"] .MuiListItemText-root', inCase(kind)).left -
                      iconText,
                  ),
                ],
              ];
            }),
          ),
        );
      });
    });

    Object.entries(insetThemes).forEach(([name, theme]) => {
      test(`${name}: inset list text and small-icon text line up with the icon row text`, () => {
        const rows = (Row: React.ElementType, dense?: boolean) => (
          <List dense={dense}>
            <Row data-testid="inset">
              <ListItemText inset>Single</ListItemText>
            </Row>
            <Row data-testid="icon">
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText>Custom</ListItemText>
            </Row>
            <Row data-testid="icon-small">
              <ListItemIcon>
                <Check fontSize="small" />
              </ListItemIcon>
              <ListItemText>Small icon</ListItemText>
            </Row>
          </List>
        );
        const kinds = ['button', 'dense button', 'item'];
        renderIn(
          theme,
          cases(
            byName(kinds, (kind) =>
              rows(kind === 'item' ? ListItem : ListItemButton, kind === 'dense button'),
            ),
          ),
        );
        expectNoDrift(
          Object.fromEntries(
            kinds.flatMap((kind) => {
              const textLeft = (testId: string) =>
                rect(`[data-testid="${testId}"] .MuiListItemText-root`, inCase(kind)).left;
              const iconText = textLeft('icon');
              return [
                [
                  `${kind} inset text`,
                  drift(
                    rect('[data-testid="inset"] .MuiTypography-root', inCase(kind)).left - iconText,
                  ),
                ],
                [`${kind} small icon text`, drift(textLeft('icon-small') - iconText)],
              ];
            }),
          ),
        );
      });
    });

    const groups: [string, React.ReactElement, string, string, number][] = [
      [
        'MenuList',
        <MenuList>
          <ListSubheader>Edit</ListSubheader>
          <MenuItem>Copy</MenuItem>
        </MenuList>,
        '.MuiListSubheader-root',
        '.MuiMenuItem-root',
        0,
      ],
      [
        'grouped Select',
        <Select open value="a" MenuProps={{ disablePortal: true, transitionDuration: 0 }}>
          <ListSubheader>Group</ListSubheader>
          <MenuItem value="a">Apple</MenuItem>
        </Select>,
        '.MuiListSubheader-root',
        '.MuiMenuItem-root',
        0,
      ],
      [
        'grouped Autocomplete',
        <Autocomplete
          open
          disablePortal
          options={['Apple']}
          groupBy={() => 'Group'}
          renderInput={(params) => <TextField {...params} />}
        />,
        '.MuiAutocomplete-groupLabel',
        '.MuiAutocomplete-option',
        DEFAULT_STEP_PX.small - DEFAULT_STEP_PX.xSmall,
      ],
      [
        'List with ListItemButton',
        <List subheader={<ListSubheader>Inbox</ListSubheader>}>
          <ListItemButton>Drafts</ListItemButton>
        </List>,
        '.MuiListSubheader-root',
        '.MuiListItemButton-root',
        0,
      ],
      [
        'List with ListItem',
        <List subheader={<ListSubheader>Contacts</ListSubheader>}>
          <ListItem>Alice</ListItem>
        </List>,
        '.MuiListSubheader-root',
        '.MuiListItem-root',
        0,
      ],
    ];
    groups.forEach(([name, element, header, item, indent]) => {
      test(`${name}: the group header lines up with its items`, () => {
        renderIn(MEDIUM, element);
        expect(Math.round(textBox(query(item)).left - textBox(query(header)).left)).to.equal(
          indent,
        );
      });
    });

    const insetRows: Record<string, React.ReactNode> = {
      'ListItem with an avatar': (
        <ListItem>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Text" />
        </ListItem>
      ),
      'ListItem with an icon': (
        <ListItem>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </ListItem>
      ),
      'ListItemButton with an icon': (
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </ListItemButton>
      ),
      'ListItem around a ListItemButton with an avatar': (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>A</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Text" />
          </ListItemButton>
        </ListItem>
      ),
    };

    DENSITIES.forEach((density) => {
      test(`${density.id}: an inset divider starts where the text above it starts`, () => {
        renderIn(
          THEMES[density.id],
          cases(
            byName(Object.keys(insetRows), (name) => (
              <List>
                {insetRows[name]}
                <Divider variant="inset" component="li" />
              </List>
            )),
          ),
        );
        expectNoDrift(
          byName(Object.keys(insetRows), (name) =>
            drift(
              rect('.MuiDivider-inset', inCase(name)).left -
                textBox(query('.MuiListItemText-primary', inCase(name))).left,
            ),
          ),
        );
      });

      test(`${density.id}: a top-aligned list avatar sits xSmall below the row content edge`, () => {
        renderIn(
          THEMES[density.id],
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Text" secondary="Two lines of secondary text" />
            </ListItem>
          </List>,
        );
        const contentTop =
          rect('.MuiListItem-root').top + parseFloat(css('.MuiListItem-root').paddingTop);
        expect(
          drift(rect('.MuiListItemAvatar-root').top - contentTop - density.step.xSmall),
        ).to.equal(0);
      });
    });
  });

  describe('overlays', () => {
    (['top', 'bottom', 'left', 'right'] as const).forEach((placement) => {
      test(`${placement}: the tooltip arrow tip keeps the bubble's gap to the anchor`, async () => {
        renderIn(
          MEDIUM,
          <div style={{ padding: 150 }}>
            <Tooltip open placement={placement} title="Copy">
              <Button data-testid="bubble">Copy</Button>
            </Tooltip>
            <Tooltip arrow open placement={placement} title="Copy">
              <Button data-testid="arrow">Copy</Button>
            </Tooltip>
          </div>,
        );
        const gap = (anchorId: string, tip: Element) => {
          const anchor = rect(`[data-testid="${anchorId}"]`);
          const box = tip.getBoundingClientRect();
          return {
            top: anchor.top - box.bottom,
            bottom: box.top - anchor.bottom,
            left: anchor.left - box.right,
            right: box.left - anchor.right,
          }[placement];
        };
        await vi.waitFor(() => {
          const bubble = query('.MuiTooltip-tooltip:not(.MuiTooltip-tooltipArrow)');
          const arrow = query('.MuiTooltip-arrow');
          const { width, height } = arrow.getBoundingClientRect();
          const vertical = placement === 'top' || placement === 'bottom';
          const [depth, breadth] = vertical ? [height, width] : [width, height];
          expect(gap('arrow', arrow) + depth - breadth / 2).to.be.closeTo(gap('bubble', bubble), 1);
        });
      });
    });

    const sliderLabelOffset = (orientation: 'horizontal' | 'vertical') => {
      const { unmount } = renderIn(
        MEDIUM,
        <div style={{ height: 200 }}>
          <Slider
            orientation={orientation}
            marks={[
              { value: 0, label: '0' },
              { value: 100, label: '100' },
            ]}
          />
        </div>,
      );
      const root = rect('.MuiSlider-root');
      const label = rect('.MuiSlider-markLabel');
      unmount();
      return orientation === 'horizontal'
        ? drift(label.top - root.top - root.height)
        : drift(label.left - root.left - root.width);
    };

    (['horizontal', 'vertical'] as const).forEach((orientation) => {
      test(`${orientation} slider labels start at the edge of the box`, () => {
        expect(sliderLabelOffset(orientation)).to.equal(0);
      });

      test.skipIf(!isChromium)(
        `${orientation} slider labels start at the edge of the box on a coarse pointer`,
        async () => {
          const { cdp } = await import('vitest/browser' as string);
          const setCoarse = (enabled: boolean) =>
            cdp().send('Emulation.setTouchEmulationEnabled', { enabled, maxTouchPoints: 1 });
          await setCoarse(true);
          try {
            expect(matchMedia('(pointer: coarse)').matches).to.equal(true);
            expect(sliderLabelOffset(orientation)).to.equal(0);
          } finally {
            await setCoarse(false);
          }
        },
      );
    });
  });

  describe('user overrides win wherever they win on master', () => {
    test('slot styleOverrides', () => {
      render(sideBySide(withUser({ components: USER_COMPONENTS as any }), overrideCases()));
      expect(userWins('master')).to.deep.equal(winsExcept(MASTER_LOSES_WITHOUT_LAYERS));
      expect(userWins('enhanced')).to.deep.equal(userWins('master'));
    });

    [
      ['narrow portrait', 500, 900],
      ['wide', 1280, 800],
    ].forEach(([label, width, height]) => {
      test(`TablePagination toolbar and select on a ${label} screen`, async () => {
        const { page } = await import('vitest/browser' as string);
        const { innerWidth, innerHeight } = window;
        await page.viewport(width, height);
        try {
          render(
            sideBySide(
              {
                ...withUser({
                  components: {
                    MuiTablePagination: {
                      styleOverrides: { toolbar: { minHeight: 64 }, select: { fontSize: 20 } },
                    },
                  },
                }),
                density: MEDIUM,
              },
              cases({
                pagination: (
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
                ),
              }),
            ),
          );
          const paginationWins = (theme: string) => ({
            toolbar:
              css('.MuiTablePagination-toolbar', inTheme(theme, 'pagination')).minHeight === '64px',
            select:
              css('.MuiTablePagination-select', inTheme(theme, 'pagination')).fontSize === '20px',
          });
          expect(paginationWins('enhanced')).to.deep.equal(paginationWins('master'));
          expect(
            drift(
              rect('.MuiTablePagination-toolbar', inTheme('density', 'pagination')).height -
                DEFAULT_SIZING_PX.touchTarget -
                DEFAULT_STEP_PX.medium,
            ),
          ).to.equal(0);
        } finally {
          await page.viewport(innerWidth, innerHeight);
        }
      });
    });
  });

  describe('breadcrumbs', () => {
    test('a plain crumb link sits on the touch target', () => {
      renderIn(
        MEDIUM,
        <Breadcrumbs>
          <Link href="#" data-testid="link">
            Home
          </Link>
          <Typography>Current</Typography>
        </Breadcrumbs>,
      );
      expect(rect('[data-testid="link"]').height).to.equal(DEFAULT_SIZING_PX.touchTarget);
    });

    test('a Chip crumb keeps its own size', () => {
      renderIn(
        MEDIUM,
        <React.Fragment>
          <Chip size="small" label="ref" onDelete={() => {}} data-testid="standalone" />
          <Breadcrumbs maxItems={2}>
            <Chip size="small" label="a" onDelete={() => {}} data-testid="crumb" />
            <Chip size="small" label="b" onDelete={() => {}} />
            <Chip size="small" label="c" onDelete={() => {}} />
          </Breadcrumbs>
        </React.Fragment>,
      );
      expect(css('[data-testid="crumb"]').height).to.equal(
        css('[data-testid="standalone"]').height,
      );
    });
  });
});
