import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MDButton from '@mui/material/Button';
import MDToggleButton from '@mui/material/ToggleButton';
import MDToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import LibraryAddCheckRoundedIcon from '@mui/icons-material/LibraryAddCheckRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ResetFocusIcon from '@mui/icons-material/CenterFocusWeak';
import { alpha, styled, useTheme } from '@mui/material/styles';
import copy from 'clipboard-copy';
import { useTranslate } from '../i18n';
import { OpenInMUIChatButton } from './OpenInMUIChatButton';
import type { DemoDeploymentLinks } from './demoDeploymentLinks';

export type { DemoDeploymentLinks } from './demoDeploymentLinks';

// ---------------------------------------------------------------------------
// Toolbar control styling
// ---------------------------------------------------------------------------

const ToggleButtonGroup = styled(MDToggleButtonGroup)(({ theme }) => [
  theme.unstable_sx({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      '&:not(:first-of-type)': { pr: '2px' },
      '&:not(:last-of-type)': { pl: '2px' },
    },
  }),
]);

const ToggleButton = styled(MDToggleButton)(({ theme }) => [
  theme.unstable_sx({
    height: 26,
    width: 38,
    p: 0,
    fontSize: theme.typography.pxToRem(13),
    borderRadius: '999px',
    '&.Mui-disabled': {
      opacity: 0.8,
      cursor: 'not-allowed',
    },
  }),
]);

const ToolbarButton = styled(MDButton)(({ theme }) => ({
  height: 26,
  padding: '7px 8px 8px 8px',
  flexShrink: 0,
  borderRadius: 999,
  border: '1px solid',
  borderColor: alpha(theme.palette.grey[200], 0.8),
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.primary[600],
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary[50],
    borderColor: theme.palette.primary[200],
    '@media (hover: none)': { backgroundColor: 'transparent' },
  },
  ...theme.applyDarkStyles({
    color: theme.palette.primary[300],
    borderColor: alpha(theme.palette.primary[300], 0.2),
    '& .MuiSvgIcon-root': { color: theme.palette.primary[300] },
    '&:hover': {
      borderColor: alpha(theme.palette.primary[300], 0.5),
      backgroundColor: alpha(theme.palette.primary[500], 0.2),
      '@media (hover: none)': { backgroundColor: 'transparent' },
    },
  }),
}));

function DemoTooltip(props: React.ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      slotProps={{
        popper: {
          sx: { zIndex: (theme) => theme.zIndex.appBar - 1 },
        },
      }}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Toolbar keyboard navigation
// ---------------------------------------------------------------------------

// The toolbar owns the single roving tab stop, so suppress ToggleButtonGroup's
// built-in roving navigation before it moves focus within the group.
const GROUP_NAV_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
function suppressGroupRovingNav(event: React.KeyboardEvent<HTMLElement>) {
  if (GROUP_NAV_KEYS.includes(event.key)) {
    event.preventDefault();
  }
}

/** ARIA toolbar keyboard navigation with one RTL-aware roving tab stop. */
function isFocusableToolbarButton(button: HTMLElement): boolean {
  if (
    button.hasAttribute('disabled') ||
    button.closest('[aria-hidden="true"], [hidden]') !== null
  ) {
    return false;
  }
  if (typeof button.checkVisibility === 'function') {
    return button.checkVisibility({ visibilityProperty: true });
  }
  if (typeof window === 'undefined') {
    return true;
  }
  const style = window.getComputedStyle(button);
  return style.visibility !== 'hidden' && style.display !== 'none';
}

/**
 * The initial stop is baked into the markup (`tabIndex={-1}` on every control
 * but the first), so nothing runs on mount: `checkVisibility` forces a style
 * flush per button, and a page hydrates dozens of toolbars. The visible set is
 * only resolved once focus enters the toolbar.
 */
export function useToolbarKeyboard() {
  const theme = useTheme();
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const activeIndexRef = React.useRef(0);

  const getFocusableButtons = React.useCallback(() => {
    const container = toolbarRef.current;
    return container
      ? Array.from(container.querySelectorAll<HTMLElement>('button')).filter(
          isFocusableToolbarButton,
        )
      : [];
  }, []);

  const syncTabIndex = React.useCallback(() => {
    toolbarRef.current?.querySelectorAll<HTMLElement>('button').forEach((button) => {
      button.tabIndex = -1;
    });
    const buttons = getFocusableButtons();
    if (buttons.length === 0) {
      return;
    }
    if (activeIndexRef.current >= buttons.length) {
      activeIndexRef.current = 0;
    }
    buttons.forEach((button, index) => {
      button.tabIndex = index === activeIndexRef.current ? 0 : -1;
    });
  }, [getFocusableButtons]);

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const focusedIndex = getFocusableButtons().indexOf(event.target as HTMLElement);
      if (focusedIndex !== -1) {
        activeIndexRef.current = focusedIndex;
        syncTabIndex();
      }
    },
    [getFocusableButtons, syncTabIndex],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const buttons = getFocusableButtons();
      const active = document.activeElement as HTMLElement | null;
      const currentIndex = active ? buttons.indexOf(active) : -1;
      if (currentIndex === -1) {
        return;
      }
      const prevKey = theme.direction === 'ltr' ? 'ArrowLeft' : 'ArrowRight';
      const nextKey = theme.direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft';
      let nextIndex = -1;
      switch (event.key) {
        case prevKey:
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
          break;
        case nextKey:
          nextIndex = (currentIndex + 1) % buttons.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = buttons.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      buttons[nextIndex].focus();
    },
    [getFocusableButtons, theme.direction],
  );

  return { toolbarRef, handleKeyDown, handleFocus };
}

// ---------------------------------------------------------------------------
// Toolbar component
// ---------------------------------------------------------------------------

export interface DemoToolbarProps {
  gaLabel: string;
  /** ID of the source viewer for `aria-controls`. */
  demoSourceId: string | undefined;
  /** Whether the source viewer is currently expanded. */
  expanded: boolean;
  onToggleExpand: () => void;
  /** Ref for the show-source toggle button. */
  toggleRef: React.Ref<HTMLButtonElement>;
  showCodeLabel: React.ReactNode;
  /** Whether a JS transform is available for the current variant. */
  hasJsTransform: boolean;
  isJsSelected: boolean;
  onLanguageClick: (event: React.MouseEvent, value: string | null) => void;
  /**
   * Ref attached to the JS/TS toggle group. `DemoContent` uses it as the
   * scroll-anchor element when a transform swap reflows the code tree.
   */
  languageToggleRef?: React.Ref<HTMLDivElement>;
  /** Variant cycling (styling solutions). */
  variants: readonly string[];
  selectedVariant: string;
  onSelectVariant: (variant: string) => void;
  openMuiChat?: () => Promise<void>;
  hideEditButton?: boolean;
  onOpenStackBlitz: () => void;
  onOpenCodeSandbox: () => void;
  onCopySource: (event: React.MouseEvent<HTMLElement>) => Promise<void>;
  onResetFocus: () => void;
  onReset?: () => void;
  /**
   * Hosted GitHub URL of the file currently shown in the viewer. Undefined
   * when no repository URL is configured (the "View on GitHub" item is then
   * disabled).
   */
  githubLocation?: string;
  /**
   * Anchor id for the TypeScript source of the currently-shown file (e.g.
   * `ComboBox.tsx`), used by the "copy TypeScript link" item. The matching
   * `<DemoAnchorLink>` is rendered alongside the demo; the item is disabled when
   * unset.
   */
  tsSourceAnchor?: string;
  /**
   * Anchor id for the JavaScript twin of the currently-shown file (e.g.
   * `ComboBox.jsx`), used by the "copy JavaScript link" item. Landing on it swaps
   * to the JS transform. Unset when there's no JS transform — the item is then
   * omitted entirely rather than shown disabled.
   */
  jsSourceAnchor?: string;
  /** Deploy permalinks shown on staging and pull-request builds. */
  deploymentLinks?: DemoDeploymentLinks | null;
}

/**
 * Live demo toolbar. Renders the JS/TS toggle (when the source viewer is
 * expanded), the show/hide source button, sandbox launchers, copy/reset
 * actions, and the "more" overflow menu. All handlers are passed in from
 * `DemoContent`; this component owns only the local UI state (open/snackbar/
 * copy feedback) so it can be tested in isolation.
 */
export function DemoToolbar(props: DemoToolbarProps) {
  const {
    gaLabel,
    demoSourceId,
    expanded,
    onToggleExpand,
    toggleRef,
    showCodeLabel,
    hasJsTransform,
    isJsSelected,
    onLanguageClick,
    languageToggleRef,
    variants,
    selectedVariant,
    onSelectVariant,
    openMuiChat,
    hideEditButton,
    onOpenStackBlitz,
    onOpenCodeSandbox,
    onCopySource,
    onResetFocus,
    onReset,
    githubLocation,
    tsSourceAnchor,
    jsSourceAnchor,
    deploymentLinks,
  } = props;
  const t = useTranslate();

  // "More" menu state.
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleMoreClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  }, []);
  const handleMoreClose = React.useCallback(() => {
    setMoreAnchorEl(null);
  }, []);
  const moreMenuOpen = Boolean(moreAnchorEl);

  // Snackbar shown after copying a source link to the clipboard.
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string | undefined>(undefined);
  const handleSnackbarClose = React.useCallback((_event: unknown, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  }, []);

  // Copy-source button feedback — swap the icon to a checkmark briefly after
  // a successful copy.
  const [sourceCopied, setSourceCopied] = React.useState(false);
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(
    () => () => {
      if (copyTimeoutRef.current !== null) {
        clearTimeout(copyTimeoutRef.current);
      }
    },
    [],
  );
  const handleCopySource = React.useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      await onCopySource(event);
      setSourceCopied(true);
      if (copyTimeoutRef.current !== null) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setSourceCopied(false);
      }, 1000);
    },
    [onCopySource],
  );

  // "Copy source link" handlers. Copies a permalink to the current page that
  // targets the selected file's `.tsx` (TS) or `.jsx`/`.js` (JS) source anchor —
  // the per-file ids rendered next to the demo. The anchor already carries the
  // extension, and landing on the JS one swaps to the JS transform. Built from
  // `window.location` at click time so it reflects the page the user is on.
  const createHandleCodeSourceLink = React.useCallback(
    (target: 'js' | 'tsx') => async () => {
      handleMoreClose();
      const anchor = target === 'tsx' ? tsSourceAnchor : jsSourceAnchor;
      if (!anchor || typeof window === 'undefined') {
        return;
      }
      const base = window.location.href.split('#')[0];
      const link = `${base}#${anchor}`;
      try {
        await copy(link);
        setSnackbarMessage(t('copiedSourceLink'));
        setSnackbarOpen(true);
      } catch {
        // Swallow — clipboard access may be denied by the user agent.
      }
    },
    [t, handleMoreClose, tsSourceAnchor, jsSourceAnchor],
  );

  const hasNonSystemDemos = variants.length > 1;

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Open in MUI Chat */}
        <OpenInMUIChatButton
          openMuiChat={openMuiChat}
          data-ga-event-category="mui-chat"
          data-ga-event-label={gaLabel}
          data-ga-event-action="open-in-mui-chat"
        />

        {/* JS/TS toggle (only relevant when code is open). */}
        <ToggleButtonGroup
          ref={languageToggleRef}
          sx={{
            margin: '8px 0',
            opacity: expanded && hasJsTransform ? 1 : 0,
            visibility: expanded && hasJsTransform ? 'visible' : 'hidden',
            pointerEvents: expanded && hasJsTransform ? 'auto' : 'none',
          }}
          exclusive
          aria-hidden={!expanded || !hasJsTransform}
          value={isJsSelected ? 'js' : 'ts'}
          onChange={onLanguageClick}
          onKeyDown={suppressGroupRovingNav}
        >
          <ToggleButton
            value="js"
            tabIndex={-1}
            aria-label={t('showJSSource')}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="source-js"
          >
            JS
          </ToggleButton>
          <ToggleButton
            value="ts"
            tabIndex={-1}
            aria-label={t('showTSSource')}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="source-ts"
          >
            TS
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
        {hasNonSystemDemos && (
          <ToolbarButton
            tabIndex={-1}
            size="small"
            onClick={() => {
              const idx = variants.indexOf(selectedVariant);
              onSelectVariant(variants[(idx + 1) % variants.length]);
            }}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="styling"
          >
            {selectedVariant}
          </ToolbarButton>
        )}

        {hasNonSystemDemos ? (
          <Divider orientation="vertical" variant="middle" sx={{ mx: 1, height: 24 }} />
        ) : null}

        <ToolbarButton
          tabIndex={-1}
          ref={toggleRef}
          onClick={onToggleExpand}
          aria-controls={demoSourceId}
          aria-expanded={expanded}
          data-ga-event-category="demo"
          data-ga-event-label={gaLabel}
          data-ga-event-action="expand"
          sx={{ mr: 0.5 }}
        >
          {showCodeLabel}
        </ToolbarButton>

        {!hideEditButton ? (
          <React.Fragment>
            <DemoTooltip title={t('stackblitz')} placement="bottom">
              <IconButton
                tabIndex={-1}
                onClick={onOpenStackBlitz}
                sx={{ borderRadius: 1 }}
                data-ga-event-category="demo"
                data-ga-event-label={gaLabel}
                data-ga-event-action="stackblitz"
              >
                <SvgIcon viewBox="0 0 19 28">
                  <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
                </SvgIcon>
              </IconButton>
            </DemoTooltip>

            <DemoTooltip title={t('codesandbox')} placement="bottom">
              <IconButton
                tabIndex={-1}
                onClick={onOpenCodeSandbox}
                sx={{ borderRadius: 1 }}
                data-ga-event-category="demo"
                data-ga-event-label={gaLabel}
                data-ga-event-action="codesandbox"
              >
                <SvgIcon viewBox="0 0 1024 1024">
                  <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                </SvgIcon>
              </IconButton>
            </DemoTooltip>
          </React.Fragment>
        ) : null}

        <DemoTooltip title={t('copySource')} placement="bottom">
          <IconButton
            tabIndex={-1}
            onClick={handleCopySource}
            sx={{ borderRadius: 1 }}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="copy"
          >
            {sourceCopied ? <LibraryAddCheckRoundedIcon /> : <ContentCopyRoundedIcon />}
          </IconButton>
        </DemoTooltip>

        <DemoTooltip title={t('resetFocus')} placement="bottom">
          <IconButton
            tabIndex={-1}
            onClick={onResetFocus}
            sx={{ borderRadius: 1 }}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="reset-focus"
          >
            <ResetFocusIcon />
          </IconButton>
        </DemoTooltip>

        <DemoTooltip title={t('resetDemo')} placement="bottom">
          <IconButton
            tabIndex={-1}
            onClick={onReset}
            sx={{ borderRadius: 1 }}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="reset"
          >
            <RefreshRoundedIcon />
          </IconButton>
        </DemoTooltip>

        <IconButton
          tabIndex={-1}
          onClick={handleMoreClick}
          aria-label={t('seeMore')}
          aria-owns={moreMenuOpen ? 'demo-menu-more' : undefined}
          aria-haspopup="true"
          sx={{ borderRadius: 1 }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="demo-menu-more"
          anchorEl={moreAnchorEl}
          open={moreMenuOpen}
          onClose={handleMoreClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            component="a"
            href={githubLocation}
            target="_blank"
            rel="noopener nofollow"
            onClick={handleMoreClose}
            disabled={!githubLocation}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="github"
          >
            {t('viewGitHub')}
          </MenuItem>
          {jsSourceAnchor ? (
            <MenuItem
              onClick={createHandleCodeSourceLink('js')}
              data-ga-event-category="demo"
              data-ga-event-label={gaLabel}
              data-ga-event-action="copy-js-source-link"
            >
              {t('copySourceLinkJS')}
            </MenuItem>
          ) : null}
          <MenuItem
            onClick={createHandleCodeSourceLink('tsx')}
            disabled={!tsSourceAnchor}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="copy-ts-source-link"
          >
            {t('copySourceLinkTS')}
          </MenuItem>
          {deploymentLinks?.pullRequest ? (
            <MenuItem
              component="a"
              href={deploymentLinks.pullRequest}
              target="_blank"
              rel="noopener nofollow"
              onClick={handleMoreClose}
              data-ga-event-category="demo"
              data-ga-event-label={gaLabel}
              data-ga-event-action="link-deploy-preview"
            >
              demo on PR
            </MenuItem>
          ) : null}
          {deploymentLinks ? (
            <React.Fragment>
              <MenuItem
                component="a"
                href={deploymentLinks.next}
                target="_blank"
                rel="noopener nofollow"
                onClick={handleMoreClose}
                data-ga-event-category="demo"
                data-ga-event-label={gaLabel}
                data-ga-event-action="link-next"
              >
                demo on next
              </MenuItem>
              <MenuItem
                component="a"
                href={deploymentLinks.permalink}
                target="_blank"
                rel="noopener nofollow"
                onClick={handleMoreClose}
                data-ga-event-category="demo"
                data-ga-event-label={gaLabel}
                data-ga-event-action="permalink"
              >
                demo permalink
              </MenuItem>
              <MenuItem
                component="a"
                href={deploymentLinks.master}
                target="_blank"
                rel="noopener nofollow"
                onClick={handleMoreClose}
                data-ga-event-category="demo"
                data-ga-event-label={gaLabel}
                data-ga-event-action="link-master"
              >
                demo on master
              </MenuItem>
            </React.Fragment>
          ) : null}
        </Menu>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}
