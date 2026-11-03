import * as React from 'react';
import copy from 'clipboard-copy';
import { useTheme, styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import MDButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import MDToggleButton from '@mui/material/ToggleButton';
import MDToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import SvgIcon from '@mui/material/SvgIcon';
import Snackbar from '@mui/material/Snackbar';
import Menu from '@mui/material/Menu';
import MDMenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ResetFocusIcon from '@mui/icons-material/CenterFocusWeak';
import { CODE_VARIANTS, stylingSolutionMapping } from '../constants';
import { useSetCodeVariant } from '../codeVariant';
import { useTranslate } from '../i18n';
import { OpenInMUIChatButton } from './OpenInMUIChatButton';
import { useDemoContext } from '../DemoContext';
import * as codeSandbox from '../sandbox/CodeSandbox';
import * as stackBlitz from '../sandbox/StackBlitz';
import type { DemoData as SandboxDemoData } from '../sandbox/types';
import type { DemoToolbarProps } from './Demo';

const Root = styled('div')(({ theme }) => [
  {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.grey[100],
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: 16,
      color: (theme.vars || theme).palette.grey[900],
    },
  },
  theme.applyDarkStyles({
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.primaryDark[700],
      },
    },
    '& .MuiSvgIcon-root': {
      color: (theme.vars || theme).palette.grey[400],
    },
  }),
]);

function DemoTooltip(props: React.ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      slotProps={{
        popper: {
          sx: {
            zIndex: (theme) => theme.zIndex.appBar - 1,
          },
        },
      }}
      {...props}
    />
  );
}

const alwaysTrue = () => true;

const ToggleButtonGroup = styled(MDToggleButtonGroup)(({ theme }) => [
  theme.unstable_sx({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      '&:not(:first-of-type)': {
        pr: '2px', // a nudge for optical alignment
      },
      '&:not(:last-of-type)': {
        pl: '2px', // a nudge for optical alignment
      },
    },
  }),
]);

const Button = styled(MDButton)(({ theme }) => ({
  height: 26,
  padding: '7px 8px 8px 8px', // 7px for optical alignment
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
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  ...theme.applyDarkStyles({
    color: theme.palette.primary[300],
    borderColor: alpha(theme.palette.primary[300], 0.2),
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary[300],
    },
    '&:hover': {
      borderColor: alpha(theme.palette.primary[300], 0.5),
      backgroundColor: alpha(theme.palette.primary[500], 0.2),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  }),
}));

const MenuItem = styled(MDMenuItem)(({ theme }) => ({
  padding: theme.spacing(1),
  [`& .${menuItemClasses.selected}`]: {
    backgroundColor: theme.palette.primary[50],
  },
}));

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

function useToolbar(
  controlRefs: React.RefObject<HTMLButtonElement | null>[],
  options: {
    isFocusableControl?: (index: number) => boolean;
    defaultActiveIndex?: number;
  } = {},
) {
  const { defaultActiveIndex = 0, isFocusableControl = alwaysTrue } = options;
  const [activeControlIndex, setActiveControlIndex] = React.useState(defaultActiveIndex);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveControlIndex((currentActiveControlIndex) => {
      if (!isFocusableControl(currentActiveControlIndex)) {
        return defaultActiveIndex;
      }
      return currentActiveControlIndex;
    });
  }, [defaultActiveIndex, isFocusableControl]);

  function findControlIndex(element: EventTarget) {
    let controlIndex = -1;
    controlRefs.forEach((controlRef, index) => {
      if (controlRef.current === element) {
        controlIndex = index;
      }
    });
    return controlIndex;
  }

  function handleControlFocus(event: React.FocusEvent) {
    const nextActiveControlIndex = findControlIndex(event.target);
    if (nextActiveControlIndex !== -1) {
      setActiveControlIndex(nextActiveControlIndex);
    } else {
      // make sure DCE works
      // eslint-disable-next-line no-lonely-if
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'MUI: The toolbar contains a focusable element that is not controlled by the toolbar. ' +
            'Make sure you have attached `getControlProps(index)` to every focusable element within this toolbar.',
        );
      }
    }
  }

  let handleToolbarFocus: React.FocusEventHandler | undefined;
  if (process.env.NODE_ENV !== 'production') {
    handleToolbarFocus = (event: React.FocusEvent) => {
      if (findControlIndex(event.target) === -1) {
        console.error(
          'MUI: The toolbar contains a focusable element that is not controlled by the toolbar. ' +
            'Make sure you have attached `getControlProps(index)` to every focusable element within this toolbar.',
        );
      }
    };
  }

  const { direction } = useTheme();

  function handleToolbarKeyDown(event: React.KeyboardEvent) {
    let currentFocusableControlIndex = -1;
    const focusableControls: HTMLElement[] = [];
    controlRefs.forEach((controlRef, index) => {
      const { current: control } = controlRef;
      if (index === activeControlIndex) {
        currentFocusableControlIndex = focusableControls.length;
      }
      if (control !== null && isFocusableControl(index)) {
        focusableControls.push(control);
      }
    });

    const prevControlKey = direction === 'ltr' ? 'ArrowLeft' : 'ArrowRight';
    const nextControlKey = direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft';

    let nextFocusableIndex = -1;
    switch (event.key) {
      case prevControlKey:
        nextFocusableIndex =
          (currentFocusableControlIndex - 1 + focusableControls.length) % focusableControls.length;
        break;
      case nextControlKey:
        nextFocusableIndex = (currentFocusableControlIndex + 1) % focusableControls.length;
        break;
      case 'Home':
        nextFocusableIndex = 0;
        break;
      case 'End':
        nextFocusableIndex = focusableControls.length - 1;
        break;
      default:
        break;
    }

    if (nextFocusableIndex !== -1) {
      event.preventDefault();
      focusableControls[nextFocusableIndex].focus();
    }
  }

  function getControlProps(index: number) {
    return {
      onFocus: handleControlFocus,
      ref: controlRefs[index],
      tabIndex: index === activeControlIndex ? 0 : -1,
    };
  }

  return {
    getControlProps,
    toolbarProps: {
      onFocus: handleToolbarFocus,
      onKeyDown: handleToolbarKeyDown,
      role: 'toolbar' as const,
    },
  };
}

export function DemoToolbar(props: DemoToolbarProps) {
  const {
    codeOpen,
    codeVariant,
    copyButtonOnClick,
    copyIcon,
    hasNonSystemDemos,
    demo,
    demoData,
    demoId,
    demoName,
    demoOptions,
    demoSourceId,
    initialFocusRef,
    onCodeOpenChange,
    onResetDemoClick,
    openDemoSource,
    showPreview,
  } = props;

  const setCodeVariant = useSetCodeVariant();
  const t = useTranslate();
  const { csb } = useDemoContext();

  const hasTSVariant = demo.rawTS;
  const renderedCodeVariant = () => {
    if (codeVariant === CODE_VARIANTS.TS && hasTSVariant) {
      return CODE_VARIANTS.TS;
    }
    return CODE_VARIANTS.JS;
  };

  const handleCodeLanguageClick = (_event: React.MouseEvent, clickedCodeVariant: string | null) => {
    if (clickedCodeVariant !== null && codeVariant !== clickedCodeVariant) {
      setCodeVariant(clickedCodeVariant);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string | undefined>(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const createHandleCodeSourceLink =
    (anchor: string, codeVariantParam: string, stylingSolution?: string) => async () => {
      try {
        await copy(
          `${window.location.href.split('#')[0]}#${
            stylingSolution ? `${stylingSolutionMapping[stylingSolution]}-` : ''
          }${anchor}${codeVariantParam === CODE_VARIANTS.TS ? '.tsx' : '.js'}`,
        );
        setSnackbarMessage(t('copiedSourceLink'));
        setSnackbarOpen(true);
      } finally {
        handleMoreClose();
      }
    };

  const handleResetFocusClick = () => {
    initialFocusRef.current?.focusVisible();
  };

  let showCodeLabel: string;
  if (codeOpen) {
    showCodeLabel = showPreview ? t('hideFullSource') : t('hideSource');
  } else {
    showCodeLabel = showPreview ? t('showFullSource') : t('showSource');
  }

  const controlRefs = [
    React.useRef<HTMLButtonElement>(null),
    React.useRef<HTMLButtonElement>(null),
    React.useRef<HTMLButtonElement>(null),
    React.useRef<HTMLButtonElement>(null),
    React.useRef<HTMLButtonElement>(null),
    React.useRef<HTMLButtonElement>(null),
    React.useRef<HTMLButtonElement>(null),
    React.useRef<HTMLButtonElement>(null),
    React.useRef<HTMLButtonElement>(null),
    React.useRef<HTMLButtonElement>(null),
  ];
  // if the code is not open we hide the language controls
  const isFocusableControl = React.useCallback(
    (index: number) => (codeOpen ? true : index !== 1 && index !== 2),
    [codeOpen],
  );
  const { getControlProps, toolbarProps } = useToolbar(controlRefs, {
    defaultActiveIndex: 0,
    isFocusableControl,
  });

  return (
    <React.Fragment>
      <Root aria-label={t('demoToolbarLabel')} {...toolbarProps}>
        <OpenInMUIChatButton
          data-ga-event-category="mui-chat"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="open-in-mui-chat"
          demoData={demoData as unknown as SandboxDemoData}
        />
        <Fade in={codeOpen}>
          <Box sx={{ display: 'flex', ml: 1 }}>
            {hasNonSystemDemos && (
              <Divider orientation="vertical" variant="middle" sx={{ mx: 1, height: '24px' }} />
            )}
            <ToggleButtonGroup
              sx={{ margin: '8px 0' }}
              exclusive
              value={renderedCodeVariant()}
              onChange={handleCodeLanguageClick}
            >
              <ToggleButton
                value={CODE_VARIANTS.JS}
                aria-label={t('showJSSource')}
                data-ga-event-category="demo"
                data-ga-event-action="source-js"
                data-ga-event-label={demo.gaLabel}
                {...getControlProps(1)}
              >
                JS
              </ToggleButton>
              <ToggleButton
                value={CODE_VARIANTS.TS}
                disabled={!hasTSVariant}
                aria-label={t('showTSSource')}
                data-ga-event-category="demo"
                data-ga-event-action="source-ts"
                data-ga-event-label={demo.gaLabel}
                {...getControlProps(2)}
              >
                TS
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Fade>
        <Box sx={{ ml: 'auto' }}>
          <Button
            aria-controls={openDemoSource ? demoSourceId : undefined}
            data-ga-event-category="demo"
            data-ga-event-label={demo.gaLabel}
            data-ga-event-action="expand"
            onClick={onCodeOpenChange}
            {...getControlProps(3)}
            sx={{ mr: 0.5 }}
          >
            {showCodeLabel}
          </Button>
          {demoOptions.hideEditButton ? null : (
            <React.Fragment>
              <DemoTooltip title={t('stackblitz')} placement="bottom">
                <IconButton
                  data-ga-event-category="demo"
                  data-ga-event-label={demo.gaLabel}
                  data-ga-event-action="stackblitz"
                  onClick={() =>
                    stackBlitz
                      .createReactApp(demoData as unknown as SandboxDemoData, csb)
                      .openSandbox()
                  }
                  {...getControlProps(4)}
                  sx={{ borderRadius: 1 }}
                >
                  <SvgIcon viewBox="0 0 19 28">
                    <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
                  </SvgIcon>
                </IconButton>
              </DemoTooltip>
              <DemoTooltip title={t('codesandbox')} placement="bottom">
                <IconButton
                  data-ga-event-category="demo"
                  data-ga-event-label={demo.gaLabel}
                  data-ga-event-action="codesandbox"
                  onClick={() =>
                    codeSandbox
                      .createReactApp(demoData as unknown as SandboxDemoData, csb)
                      .openSandbox()
                  }
                  {...getControlProps(5)}
                  sx={{ borderRadius: 1 }}
                >
                  <SvgIcon viewBox="0 0 1024 1024">
                    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                  </SvgIcon>
                </IconButton>
              </DemoTooltip>
            </React.Fragment>
          )}
          <DemoTooltip title={t('copySource')} placement="bottom">
            <IconButton
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="copy"
              onClick={copyButtonOnClick}
              {...getControlProps(6)}
              sx={{ borderRadius: 1 }}
            >
              {copyIcon}
            </IconButton>
          </DemoTooltip>
          <DemoTooltip title={t('resetFocus')} placement="bottom">
            <IconButton
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="reset-focus"
              onClick={handleResetFocusClick}
              {...getControlProps(7)}
              sx={{ borderRadius: 1 }}
            >
              <ResetFocusIcon />
            </IconButton>
          </DemoTooltip>
          <DemoTooltip title={t('resetDemo')} placement="bottom">
            <IconButton
              aria-controls={demoId}
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="reset"
              onClick={onResetDemoClick}
              {...getControlProps(8)}
              sx={{ borderRadius: 1 }}
            >
              <RefreshRoundedIcon />
            </IconButton>
          </DemoTooltip>
          <IconButton
            onClick={handleMoreClick}
            aria-label={t('seeMore')}
            aria-owns={anchorEl ? 'demo-menu-more' : undefined}
            aria-haspopup="true"
            {...getControlProps(9)}
            sx={{ borderRadius: 1 }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Root>
      <Menu
        id="demo-menu-more"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MDMenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="github"
          component="a"
          href={demoData.githubLocation}
          target="_blank"
          rel="noopener nofollow"
          onClick={handleMoreClose}
        >
          {t('viewGitHub')}
        </MDMenuItem>
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="copy-js-source-link"
          onClick={createHandleCodeSourceLink(demoName, CODE_VARIANTS.JS)}
        >
          {t('copySourceLinkJS')}
        </MenuItem>
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="copy-ts-source-link"
          onClick={createHandleCodeSourceLink(demoName, CODE_VARIANTS.TS)}
        >
          {t('copySourceLinkTS')}
        </MenuItem>
      </Menu>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}
