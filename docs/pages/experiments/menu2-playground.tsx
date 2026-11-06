import * as React from 'react';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClassicMenu from '@mui/material/Menu';
import ClassicMenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { ThemeProvider, createTheme, enhanceHighContrast } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
// The Unstable_ subpaths use default exports, so the local bindings drop the
// prefix and the JSX mirrors the future stable names.
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

type MenuProps = React.ComponentProps<typeof Menu2>;
type PopupProps = React.ComponentProps<typeof Menu2Popup>;
type PopupSide = NonNullable<PopupProps['side']>;
type PopupAlign = NonNullable<PopupProps['align']>;

interface PlaygroundSettings {
  // Root behavior
  modal: boolean;
  triggerOpenOnHover: boolean;
  loopFocus: boolean;
  highlightItemOnHover: boolean;
  // Submenu behavior
  submenusOpenOnHover: boolean;
  submenuIndicator: 'default' | 'custom';
  submenuDelay: number;
  submenuCloseDelay: number;
  closeParentOnEsc: boolean;
  // Positioning
  side: PopupSide;
  align: PopupAlign;
  sideOffset: number;
  alignOffset: number;
  keepMounted: boolean;
  // Appearance
  elevation: number;
  backdrop: 'default' | 'none' | 'dimmed';
  animation: 'grow' | 'fade' | 'zoom' | 'css' | 'off';
  reducedMotion: 'never' | 'system' | 'always';
  dense: boolean;
  dividers: boolean;
  rtl: boolean;
  highContrast: boolean;
  focusVisible: boolean;
}

const defaultSettings: PlaygroundSettings = {
  modal: true,
  triggerOpenOnHover: false,
  loopFocus: true,
  highlightItemOnHover: true,
  submenusOpenOnHover: true,
  submenuIndicator: 'default',
  submenuDelay: 100,
  submenuCloseDelay: 0,
  closeParentOnEsc: false,
  side: 'bottom',
  align: 'start',
  sideOffset: 8,
  alignOffset: 0,
  keepMounted: false,
  elevation: 8,
  backdrop: 'default',
  animation: 'grow',
  reducedMotion: 'never',
  dense: false,
  dividers: false,
  rtl: false,
  highContrast: true,
  focusVisible: false,
};

const SIDES: PopupSide[] = ['bottom', 'top', 'left', 'right', 'inline-start', 'inline-end'];
const ALIGNS: PopupAlign[] = ['start', 'center', 'end'];
const ELEVATIONS = [0, 1, 4, 8, 16, 24];

// Docs demos always run through the enhancer (see `DemoInstanceThemeProvider`);
// the highContrast toggle is here so the forced-colors rules can be compared
// against their absence while emulating high contrast in the browser.
function usePlaygroundTheme({
  rtl,
  highContrast,
  focusVisible,
  reducedMotion,
}: PlaygroundSettings) {
  return React.useMemo(() => {
    const nextTheme = createTheme({
      direction: rtl ? 'rtl' : 'ltr',
      focusVisible,
      motion: { reducedMotion },
      // The focus visible docs page opts out of the ripple, so only the ring shows.
      ...(focusVisible && {
        components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
      }),
    });
    return highContrast ? enhanceHighContrast(nextTheme) : nextTheme;
  }, [rtl, highContrast, focusVisible, reducedMotion]);
}

// With no transition component, Base UI's state attributes drive the surface.
// CSS examples must explicitly follow the theme's reduced-motion policy.
const cssAnimationSx: SxProps<Theme> = (currentTheme) => ({
  transition: currentTheme.transitions.create(['opacity', 'transform'], { duration: 250 }),
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
    transform: 'translateY(-8px)',
  },
  ...(currentTheme.motion.reducedMotion === 'always' && { transition: 'none' }),
  ...(currentTheme.motion.reducedMotion === 'system' && {
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  }),
});

function usePopupKnobProps(settings: PlaygroundSettings) {
  return React.useMemo(
    () =>
      ({
        // The popup root is the Paper surface.
        elevation: settings.elevation,
        keepMounted: settings.keepMounted,
        slots: {
          transition:
            settings.animation === 'css' || settings.animation === 'off'
              ? null
              : { grow: undefined, fade: Fade, zoom: Zoom }[settings.animation],
        },
        dir: settings.rtl ? 'rtl' : 'ltr',
        ...(settings.animation === 'css' && { sx: cssAnimationSx }),
      }) satisfies Partial<PopupProps>,
    [settings.elevation, settings.animation, settings.keepMounted, settings.rtl],
  );
}

function PlaygroundDemo({
  settings,
  onLog,
}: {
  settings: PlaygroundSettings;
  onLog: (entry: string) => void;
}) {
  const popupKnobProps = usePopupKnobProps(settings);
  const itemProps = { dense: settings.dense, divider: settings.dividers };
  // The explicit trigger accepts both item appearance and submenu behavior.
  const submenuTriggerProps = {
    openOnHover: settings.submenusOpenOnHover,
    delay: settings.submenuDelay,
    closeDelay: settings.submenuCloseDelay,
    slotProps: {
      indicator:
        settings.submenuIndicator === 'custom'
          ? {
              // Custom indicator content controls its own direction.
              children: settings.rtl ? (
                <ArrowBackRoundedIcon fontSize="small" />
              ) : (
                <ArrowForwardRoundedIcon fontSize="small" />
              ),
            }
          : undefined,
    },
  };
  // No sideOffset here: submenus use their own default, which overlaps the parent.
  const submenuPopupProps = { ...popupKnobProps };

  const handleOpenChange: MenuProps['onOpenChange'] = (nextOpen, eventDetails) => {
    onLog(`onOpenChange -> ${nextOpen ? 'open' : 'close'} (reason: ${eventDetails.reason})`);
  };

  const handleOpenChangeComplete: MenuProps['onOpenChangeComplete'] = (nextOpen) => {
    onLog(`onOpenChangeComplete -> ${nextOpen ? 'opened' : 'closed'}`);
  };

  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    onLog(`item click: ${event.currentTarget.textContent}`);
  };

  return (
    <Menu2
      modal={settings.modal}
      loopFocus={settings.loopFocus}
      highlightItemOnHover={settings.highlightItemOnHover}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <Menu2Trigger
        openOnHover={settings.triggerOpenOnHover}
        render={
          <Button variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
            Project
          </Button>
        }
      />
      <Menu2Popup
        side={settings.side}
        align={settings.align}
        sideOffset={settings.sideOffset}
        alignOffset={settings.alignOffset}
        {...popupKnobProps}
        slots={{
          ...popupKnobProps.slots,
          backdrop: settings.backdrop === 'none' ? null : undefined,
        }}
        slotProps={{
          backdrop:
            settings.backdrop === 'dimmed'
              ? { sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }
              : undefined,
        }}
      >
        <Menu2Group>
          <Menu2GroupLabel>Actions</Menu2GroupLabel>
          <Menu2Item {...itemProps} onClick={handleItemClick}>
            New file
          </Menu2Item>
          <Menu2Item {...itemProps} onClick={handleItemClick}>
            Duplicate
          </Menu2Item>
          <Menu2Item {...itemProps} disabled onClick={handleItemClick}>
            Archive (disabled)
          </Menu2Item>
        </Menu2Group>
        <Menu2Separator />

        <Menu2Submenu closeParentOnEsc={settings.closeParentOnEsc}>
          <Menu2SubmenuTrigger {...submenuTriggerProps} {...itemProps}>
            Share
          </Menu2SubmenuTrigger>
          <Menu2SubmenuPopup {...submenuPopupProps}>
            <Menu2Item {...itemProps} onClick={handleItemClick}>
              Email
            </Menu2Item>
            <Menu2Item {...itemProps} onClick={handleItemClick}>
              Copy link
            </Menu2Item>
            <Menu2Submenu closeParentOnEsc={settings.closeParentOnEsc}>
              <Menu2SubmenuTrigger {...submenuTriggerProps} {...itemProps}>
                Export as
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup {...submenuPopupProps}>
                <Menu2RadioGroup defaultValue="pdf">
                  <Menu2RadioItem {...itemProps} value="pdf">
                    PDF document
                  </Menu2RadioItem>
                  <Menu2RadioItem {...itemProps} value="epub">
                    EPUB publication
                  </Menu2RadioItem>
                  <Menu2RadioItem {...itemProps} value="markdown">
                    Markdown
                  </Menu2RadioItem>
                </Menu2RadioGroup>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2SubmenuPopup>
        </Menu2Submenu>

        <Menu2Submenu closeParentOnEsc={settings.closeParentOnEsc}>
          <Menu2SubmenuTrigger {...submenuTriggerProps} {...itemProps}>
            View
          </Menu2SubmenuTrigger>
          <Menu2SubmenuPopup {...submenuPopupProps}>
            <Menu2CheckboxItem {...itemProps} defaultChecked>
              Show ruler
            </Menu2CheckboxItem>
            <Menu2CheckboxItem {...itemProps}>Show outline</Menu2CheckboxItem>
          </Menu2SubmenuPopup>
        </Menu2Submenu>
        <Menu2Separator />

        <Menu2LinkItem {...itemProps} href="https://mui.com/material-ui/react-menu/">
          Menu documentation
        </Menu2LinkItem>
      </Menu2Popup>
    </Menu2>
  );
}

const parityItems = [
  { label: 'Profile' },
  { label: 'My account', selected: true },
  { label: 'Settings' },
  { label: 'Read-only mode', disabled: true },
  { label: 'Logout' },
] as const;

function ClassicVersusSuccessorDemo({ settings }: { settings: PlaygroundSettings }) {
  const [classicAnchorEl, setClassicAnchorEl] = React.useState<null | HTMLElement>(null);
  const popupKnobProps = usePopupKnobProps(settings);
  const itemProps = { dense: settings.dense, divider: settings.dividers };

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}
          onClick={(event) => setClassicAnchorEl(event.currentTarget)}
        >
          Classic Menu
        </Button>
        <ClassicMenu
          open={Boolean(classicAnchorEl)}
          anchorEl={classicAnchorEl}
          onClose={() => setClassicAnchorEl(null)}
          elevation={settings.elevation}
          slotProps={{ paper: { dir: settings.rtl ? 'rtl' : 'ltr' } }}
        >
          {parityItems.map((item) => (
            <ClassicMenuItem
              key={item.label}
              {...itemProps}
              selected={'selected' in item && item.selected}
              disabled={'disabled' in item && item.disabled}
              onClick={() => setClassicAnchorEl(null)}
            >
              {item.label}
            </ClassicMenuItem>
          ))}
        </ClassicMenu>
      </div>
      <Menu2>
        <Menu2Trigger
          render={
            <Button variant="outlined" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
              Successor
            </Button>
          }
        />
        <Menu2Popup
          {...popupKnobProps}
          slots={{
            ...popupKnobProps.slots,
            backdrop: settings.backdrop === 'none' ? null : undefined,
          }}
          slotProps={{
            backdrop:
              settings.backdrop === 'dimmed'
                ? { sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }
                : undefined,
          }}
        >
          {parityItems.map((item) => (
            <Menu2Item
              key={item.label}
              {...itemProps}
              disabled={'disabled' in item && item.disabled}
            >
              {item.label}
            </Menu2Item>
          ))}
        </Menu2Popup>
      </Menu2>
    </Stack>
  );
}

// Side-by-side focus indicator check. Both sides are real menus that open from a trigger. Base UI
// moves DOM focus to a Menu2Item on hover, so a pointer user can get a keyboard ring; the classic
// MenuItem avoids that with `suppressInitialFocusVisible`.
function FocusRingComparisonDemo({ settings }: { settings: PlaygroundSettings }) {
  const [classicAnchorEl, setClassicAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const itemProps = { dense: settings.dense, divider: settings.dividers };

  return (
    <Stack direction="row" spacing={4} sx={{ alignItems: 'flex-start' }}>
      <div>
        <Typography component="h3" variant="subtitle2" gutterBottom>
          Classic Menu + MenuItem
        </Typography>
        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}
          onClick={(event) => setClassicAnchorEl(event.currentTarget)}
        >
          Open the classic menu
        </Button>
        <ClassicMenu
          open={Boolean(classicAnchorEl)}
          anchorEl={classicAnchorEl}
          onClose={() => setClassicAnchorEl(null)}
        >
          {parityItems.map((item) => (
            <ClassicMenuItem
              key={item.label}
              {...itemProps}
              selected={'selected' in item && item.selected}
              disabled={'disabled' in item && item.disabled}
              onClick={() => setClassicAnchorEl(null)}
            >
              {item.label}
            </ClassicMenuItem>
          ))}
        </ClassicMenu>
      </div>
      <div>
        <Typography component="h3" variant="subtitle2" gutterBottom>
          Menu2 + Menu2Item
        </Typography>
        <Menu2 open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
          <Menu2Trigger render={<Button variant="outlined">Open the successor menu</Button>} />
          <Menu2Popup sideOffset={4}>
            {parityItems.map((item) => (
              <Menu2Item
                key={item.label}
                {...itemProps}
                disabled={'disabled' in item && item.disabled}
              >
                {item.label}
              </Menu2Item>
            ))}
          </Menu2Popup>
        </Menu2>
      </div>
    </Stack>
  );
}

function ControlledAnchorDemo() {
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [rootEvent, setRootEvent] = React.useState('None');
  const [submenuEvent, setSubmenuEvent] = React.useState('None');
  const open = Boolean(anchorEl);

  const handleOpenChange: MenuProps['onOpenChange'] = (nextOpen, details) => {
    setRootEvent(`${nextOpen ? 'open' : 'closed'} (${details.reason})`);
    if (!nextOpen) {
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <Button
        id={buttonId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        variant="outlined"
        startIcon={<MoreVertRoundedIcon fontSize="small" />}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
          setRootEvent('open (external button)');
          setSubmenuEvent('None');
        }}
      >
        Open (controlled)
      </Button>
      <Menu2 open={open} onOpenChange={handleOpenChange}>
        <Menu2Popup
          anchor={anchorEl ?? undefined}
          sideOffset={4}
          id={menuId}
          aria-labelledby={buttonId}
        >
          <Menu2Item>Profile</Menu2Item>
          <Menu2Item>My account</Menu2Item>
          <Menu2Submenu
            onOpenChange={(nextOpen, details) =>
              setSubmenuEvent(`${nextOpen ? 'open' : 'closed'} (${details.reason})`)
            }
          >
            <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Settings</Menu2Item>
              <Menu2Item>Help</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
          <Menu2Item>Logout</Menu2Item>
        </Menu2Popup>
      </Menu2>
      <p>
        Last root event: <code>{rootEvent}</code>
        <br />
        Last submenu event: <code>{submenuEvent}</code>
      </p>
    </div>
  );
}

const typeaheadEntries = [
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'Colombia',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'India',
  'Ireland',
  'Italy',
  'Japan',
  'Lithuania',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Poland',
  'Portugal',
  'Spain',
  'Sweden',
  'Switzerland',
  'United Kingdom',
];

function TypeaheadScrollDemo() {
  return (
    <Menu2>
      <Menu2Trigger
        render={
          <Button variant="outlined" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
            Country
          </Button>
        }
      />
      <Menu2Popup sx={{ maxHeight: 320 }} sideOffset={4}>
        {typeaheadEntries.map((entry) => (
          <Menu2Item key={entry} dense>
            {entry}
          </Menu2Item>
        ))}
      </Menu2Popup>
    </Menu2>
  );
}

function SettingsPanel({
  settings,
  onChange,
}: {
  settings: PlaygroundSettings;
  onChange: React.Dispatch<React.SetStateAction<PlaygroundSettings>>;
}) {
  const setSetting = <Key extends keyof PlaygroundSettings>(
    key: Key,
    value: PlaygroundSettings[Key],
  ) => {
    onChange((currentSettings) => ({ ...currentSettings, [key]: value }));
  };

  const renderCheckbox = (key: keyof PlaygroundSettings, label: string) => (
    <label style={{ display: 'block' }}>
      <input
        type="checkbox"
        checked={settings[key] as boolean}
        onChange={(event) => setSetting(key, event.target.checked as never)}
      />{' '}
      {label}
    </label>
  );

  const renderNumber = (key: keyof PlaygroundSettings, label: string, step = 50) => (
    <label style={{ display: 'block' }}>
      {label}{' '}
      <input
        type="number"
        min={0}
        step={step}
        value={settings[key] as number}
        style={{ width: 64 }}
        onChange={(event) => setSetting(key, Number(event.target.value) as never)}
      />
    </label>
  );

  return (
    <Box
      component="fieldset"
      sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, '& legend + *': { minWidth: 160 } }}
    >
      <legend>Playground knobs</legend>
      <div>
        <strong>Root behavior</strong>
        {renderCheckbox('modal', 'modal')}
        {renderCheckbox('triggerOpenOnHover', 'openOnHover (trigger)')}
        {renderCheckbox('loopFocus', 'loopFocus')}
        {renderCheckbox('highlightItemOnHover', 'highlightItemOnHover')}
      </div>
      <div>
        <strong>Submenus</strong>
        {renderCheckbox('submenusOpenOnHover', 'openOnHover')}
        {renderNumber('submenuDelay', 'delay (ms)')}
        {renderNumber('submenuCloseDelay', 'closeDelay (ms)')}
        {renderCheckbox('closeParentOnEsc', 'closeParentOnEsc')}
        <label style={{ display: 'block' }}>
          indicator{' '}
          <select
            value={settings.submenuIndicator}
            onChange={(event) =>
              setSetting(
                'submenuIndicator',
                event.target.value as PlaygroundSettings['submenuIndicator'],
              )
            }
          >
            <option value="default">Default chevron</option>
            <option value="custom">Custom arrow</option>
          </select>
        </label>
      </div>
      <div>
        <strong>Positioning</strong>
        <label style={{ display: 'block' }}>
          side{' '}
          <select
            value={settings.side}
            onChange={(event) => setSetting('side', event.target.value as PopupSide)}
          >
            {SIDES.map((side) => (
              <option key={side} value={side}>
                {side}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          align{' '}
          <select
            value={settings.align}
            onChange={(event) => setSetting('align', event.target.value as PopupAlign)}
          >
            {ALIGNS.map((align) => (
              <option key={align} value={align}>
                {align}
              </option>
            ))}
          </select>
        </label>
        {renderNumber('sideOffset', 'sideOffset', 4)}
        {renderNumber('alignOffset', 'alignOffset', 4)}
        {renderCheckbox('keepMounted', 'keepMounted')}
      </div>
      <div>
        <strong>Appearance</strong>
        <label style={{ display: 'block' }}>
          elevation{' '}
          <select
            value={settings.elevation}
            onChange={(event) => setSetting('elevation', Number(event.target.value))}
          >
            {ELEVATIONS.map((elevation) => (
              <option key={elevation} value={elevation}>
                {elevation}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          animation{' '}
          <select
            value={settings.animation}
            onChange={(event) =>
              setSetting('animation', event.target.value as PlaygroundSettings['animation'])
            }
          >
            <option value="grow">Grow (default, auto duration)</option>
            <option value="fade">Fade</option>
            <option value="zoom">Zoom</option>
            <option value="css">CSS fade and slide</option>
            <option value="off">None</option>
          </select>
        </label>
        <label style={{ display: 'block' }}>
          motion.reducedMotion{' '}
          <select
            value={settings.reducedMotion}
            onChange={(event) =>
              setSetting('reducedMotion', event.target.value as PlaygroundSettings['reducedMotion'])
            }
          >
            <option value="never">never</option>
            <option value="system">system</option>
            <option value="always">always</option>
          </select>
        </label>
        <label style={{ display: 'block' }}>
          visual backdrop{' '}
          <select
            value={settings.backdrop}
            onChange={(event) =>
              setSetting('backdrop', event.target.value as PlaygroundSettings['backdrop'])
            }
          >
            <option value="default">Default (undefined)</option>
            <option value="none">None (null)</option>
            <option value="dimmed">Dimmed</option>
          </select>
        </label>
        {renderCheckbox('dense', 'dense items')}
        {renderCheckbox('dividers', 'item dividers')}
        {renderCheckbox('rtl', 'RTL direction')}
        {renderCheckbox('highContrast', 'enhanceHighContrast theme')}
        {renderCheckbox('focusVisible', 'focusVisible theme (keyboard focus ring)')}
      </div>
    </Box>
  );
}

export default function MenuRfcExperiment() {
  const [settings, setSettings] = React.useState<PlaygroundSettings>(defaultSettings);
  const [log, setLog] = React.useState<string[]>([]);

  const pushLog = React.useCallback((entry: string) => {
    setLog((currentLog) => [...currentLog.slice(-11), entry]);
  }, []);

  const playgroundTheme = usePlaygroundTheme(settings);

  return (
    <ThemeProvider theme={playgroundTheme}>
      <CssBaseline />
      <Head
        title="Menu2 playground"
        description="Menu2 knobs playground for the Menu successor RFC"
      />
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        <Stack spacing={4}>
          <Typography component="h1" variant="h4">
            Menu2 playground
          </Typography>
          <Typography>
            Companion experiment for the{' '}
            <NextLink href="/experiments/menu2-rfc/">Menu2 RFC draft</NextLink>. Every knob maps to
            a prop or an RFC open question. See also{' '}
            <NextLink href="/experiments/menu2-recipes/">Menu2 recipes</NextLink> for Tooltip and
            Dialog integrations.
          </Typography>

          <SettingsPanel settings={settings} onChange={setSettings} />
          <Typography>
            Grow is the default transition. Fade and Zoom use <code>slots.transition</code>. The CSS
            example sets <code>slots.transition</code> to <code>null</code> and styles the
            popup&apos;s <code>data-starting-style</code> and <code>data-ending-style</code>
            attributes through <code>Menu2Popup sx</code>. None disables the transition component
            without adding CSS. The reduced-motion setting applies to both the Material transitions
            and this CSS example.
          </Typography>

          <section>
            <h2 id="playground">Kitchen sink</h2>
            <p>
              Nested submenus (three levels), groups with labels, checkbox and radio items, a
              disabled item, and a link item. All knobs apply.
            </p>
            <p>
              To check the forced-colors rules, emulate high contrast in the browser (in Chrome
              DevTools: Rendering &gt; Emulate CSS media feature forced-colors) and toggle the
              <code>enhanceHighContrast theme</code> knob.
            </p>
            <ThemeProvider theme={playgroundTheme}>
              <Box dir={settings.rtl ? 'rtl' : 'ltr'}>
                <PlaygroundDemo settings={settings} onLog={pushLog} />
              </Box>
            </ThemeProvider>
            <Box
              component="pre"
              sx={{
                mt: 2,
                p: 1.5,
                minHeight: 96,
                maxHeight: 200,
                overflow: 'auto',
                bgcolor: 'action.hover',
                borderRadius: 1,
                fontSize: 12,
              }}
            >
              {log.length === 0
                ? 'Event log: interact with the menu to see onOpenChange reasons.'
                : log.join('\n')}
            </Box>
            <Button size="small" onClick={() => setLog([])}>
              Clear log
            </Button>
          </section>

          <section>
            <h2 id="classic-parity">Classic vs successor</h2>
            <p>
              The same item set rendered by the classic Menu and the successor, for visual parity
              checks (dense, dividers, and elevation knobs apply to both). Only the classic Menu
              marks My account as selected. The classic Menu takes <code>elevation</code> on the
              root; the successor takes it on <code>Menu2Popup</code>, whose root slot is the Paper
              surface.
            </p>
            <ThemeProvider theme={playgroundTheme}>
              <ClassicVersusSuccessorDemo settings={settings} />
            </ThemeProvider>
          </section>

          <section>
            <h2 id="focus-ring-comparison">Focus indicator: classic vs successor</h2>
            <p>
              Both sides are real menus that open from a trigger, and both use the same theme. Turn
              on the <code>focusVisible theme</code> knob to show the ring. That knob also sets{' '}
              <code>MuiButtonBase.defaultProps.disableRipple</code>, the way the focus visible docs
              page does, so only the ring shows.
            </p>
            <p>
              Both menus use their default modal behavior. Click outside a menu or press Escape to
              close it before you open the other.
            </p>
            <p>
              Try this: hover the items with the mouse, then navigate with the arrow keys. Compare
              when each side shows the ring.
            </p>
            <ThemeProvider theme={playgroundTheme}>
              <Box dir={settings.rtl ? 'rtl' : 'ltr'}>
                <FocusRingComparisonDemo settings={settings} />
              </Box>
            </ThemeProvider>
          </section>

          <section>
            <h2 id="controlled-anchor">Classic-style controlled usage</h2>
            <p>
              An external button controls this menu through <code>open</code> and{' '}
              <code>onOpenChange</code> on <code>Menu2</code>, and <code>anchor</code> on{' '}
              <code>Menu2Popup</code>. This menu has no <code>Menu2Trigger</code>.
            </p>
            <p>
              Open the menu, then click More. Both menus must stay open. You can also focus More
              with the arrow keys and press Right Arrow. Press Escape to close only the submenu.
              Open More again, then select Settings to close both menus and return focus to the
              external button.
            </p>
            <p>
              Base UI 1.9.0 includes the tree fix that prevents opening More from closing the root
              with reason <code>sibling-open</code>. No local dependency patch is needed.
            </p>
            <ControlledAnchorDemo />
          </section>

          <section>
            <h2 id="typeahead">Typeahead and scrolling</h2>
            <p>
              Open the menu and type to jump between items (for example type &quot;sw&quot;). The
              popup constrains height via <code>Menu2Popup sx</code>.
            </p>
            <TypeaheadScrollDemo />
          </section>

          <a href="https://base-ui.com/react/components/menu">Base UI Menu API</a>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
