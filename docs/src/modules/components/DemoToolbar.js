import * as React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import LZString from 'lz-string';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Fade from '@material-ui/core/Fade';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import { JavaScript as JavaScriptIcon, TypeScript as TypeScriptIcon } from '@material-ui/docs';
import EditIcon from '@material-ui/icons/Edit';
import CodeIcon from '@material-ui/icons/Code';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import ResetFocusIcon from '@material-ui/icons/CenterFocusWeak';
import getDemoConfig from 'docs/src/modules/utils/getDemoConfig';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { useRouter } from 'next/router';

function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function addHiddenInput(form, name, value) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

const useDemoToolbarStyles = makeStyles(
  (theme) => {
    return {
      // Sync with styles form DemoToolbarFallback.
      root: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
          flip: false,
          top: 0,
          right: theme.spacing(1),
          height: theme.spacing(6),
        },
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      toggleButtonGroup: {
        margin: '8px 0',
      },
      toggleButton: {
        padding: '4px 9px',
      },
      tooltip: {
        zIndex: theme.zIndex.appBar - 1,
      },
    };
  },
  { name: 'DemoToolbar' },
);

export function DemoToolbarFallback() {
  const classes = useDemoToolbarStyles();
  const t = useTranslate();

  return (
    <div aria-busy aria-label={t('demoToolbarLabel')} className={classes.root} role="toolbar" />
  );
}

const alwaysTrue = () => true;

/**
 * @param {React.Ref<HTMLElement>[]} controlRefs
 * @param {object} [options]
 * @param {(index: number) => boolean} [options.isFocusableControl] In case certain controls become unfocusable
 * @param {number} [options.defaultActiveIndex]
 */
function useToolbar(controlRefs, options = {}) {
  const { defaultActiveIndex = 0, isFocusableControl = alwaysTrue } = options;
  const [activeControlIndex, setActiveControlIndex] = React.useState(defaultActiveIndex);

  // TODO: do we need to do this during layout practically? It's technically
  // a bit too late since we allow user interaction between layout and passive effects
  React.useEffect(() => {
    setActiveControlIndex((currentActiveControlIndex) => {
      if (!isFocusableControl(currentActiveControlIndex)) {
        return defaultActiveIndex;
      }
      return currentActiveControlIndex;
    });
  }, [defaultActiveIndex, isFocusableControl]);

  // controlRefs.findIndex(controlRef => controlRef.current = element)
  function findControlIndex(element) {
    let controlIndex = -1;
    controlRefs.forEach((controlRef, index) => {
      if (controlRef.current === element) {
        controlIndex = index;
      }
    });
    return controlIndex;
  }

  function handleControlFocus(event) {
    const nextActiveControlIndex = findControlIndex(event.target);
    if (nextActiveControlIndex !== -1) {
      setActiveControlIndex(nextActiveControlIndex);
    } else {
      // make sure DCE works
      // eslint-disable-next-line no-lonely-if
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'Material-UI: The toolbar contains a focusable element that is not controlled by the toolbar. ' +
            'Make sure you have attached `getControlProps(index)` to every focusable element within this toolbar.',
        );
      }
    }
  }

  let handleToolbarFocus;
  if (process.env.NODE_ENV !== 'production') {
    handleToolbarFocus = (event) => {
      if (findControlIndex(event.target) === -1) {
        console.error(
          'Material-UI: The toolbar contains a focusable element that is not controlled by the toolbar. ' +
            'Make sure you have attached `getControlProps(index)` to every focusable element within this toolbar.',
        );
      }
    };
  }

  const { direction } = useTheme();

  function handleToolbarKeyDown(event) {
    // We handle toolbars where controls can be hidden temporarily.
    // When a control is hidden we can't move focus to it and have to exclude
    // it from the order.
    let currentFocusableControlIndex = -1;
    const focusableControls = [];
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

  function getControlProps(index) {
    return {
      onFocus: handleControlFocus,
      ref: controlRefs[index],
      tabIndex: index === activeControlIndex ? 0 : -1,
    };
  }

  return {
    getControlProps,
    toolbarProps: {
      // TODO: good opportunity to warn on missing `aria-label`
      onFocus: handleToolbarFocus,
      onKeyDown: handleToolbarKeyDown,
      role: 'toolbar',
    },
  };
}

export default function DemoToolbar(props) {
  const {
    codeOpen,
    codeVariant,
    demo,
    demoData,
    demoId,
    demoHovered,
    demoName,
    demoOptions,
    demoSourceId,
    initialFocusRef,
    onCodeOpenChange,
    onResetDemoClick,
    openDemoSource,
    showPreview,
  } = props;

  const classes = useDemoToolbarStyles();

  const dispatch = useDispatch();
  const t = useTranslate();

  const hasTSVariant = demo.rawTS;
  const renderedCodeVariant = () => {
    if (codeVariant === CODE_VARIANTS.TS && hasTSVariant) {
      return CODE_VARIANTS.TS;
    }
    return CODE_VARIANTS.JS;
  };

  const handleCodeLanguageClick = (event, clickedCodeVariant) => {
    if (codeVariant !== clickedCodeVariant) {
      dispatch({
        type: ACTION_TYPES.OPTIONS_CHANGE,
        payload: {
          codeVariant: clickedCodeVariant,
        },
      });
    }
  };

  const handleCodeSandboxClick = () => {
    const demoConfig = getDemoConfig(demoData);
    const parameters = compress({
      files: {
        'package.json': {
          content: {
            name: demoConfig.title,
            description: demoConfig.description,
            dependencies: demoConfig.dependencies,
            devDependencies: {
              'react-scripts': 'latest',
              ...demoConfig.devDependencies,
            },
            main: demoConfig.main,
            scripts: demoConfig.scripts,
            // We used `title` previously but only inference from `name` is documented.
            // TODO revisit once https://github.com/codesandbox/codesandbox-client/issues/4983 is resolved.
            title: demoConfig.title,
          },
        },
        ...Object.keys(demoConfig.files).reduce((files, name) => {
          files[name] = { content: demoConfig.files[name] };
          return files;
        }, {}),
      },
    });

    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://codeSandbox.io/api/v1/sandboxes/define';
    addHiddenInput(form, 'parameters', parameters);
    addHiddenInput(
      form,
      'query',
      codeVariant === CODE_VARIANTS.TS ? 'file=/demo.tsx' : 'file=/demo.js',
    );
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleCopyClick = async () => {
    try {
      await copy(demoData.raw);
      setSnackbarMessage(t('copiedSource'));
      setSnackbarOpen(true);
    } finally {
      handleMoreClose();
    }
  };

  const createHandleCodeSourceLink = (anchor) => async () => {
    try {
      await copy(`${window.location.href.split('#')[0]}#${anchor}`);
      setSnackbarMessage(t('copiedSourceLink'));
      setSnackbarOpen(true);
    } finally {
      handleMoreClose();
    }
  };

  const [sourceHintSeen, setSourceHintSeen] = React.useState(false);
  React.useEffect(() => {
    setSourceHintSeen(getCookie('sourceHintSeen'));
  }, []);
  const handleCodeOpenClick = () => {
    document.cookie = `sourceHintSeen=true;path=/;max-age=31536000`;
    onCodeOpenChange();
    setSourceHintSeen(true);
  };

  function handleResetFocusClick() {
    initialFocusRef.current.focusVisible();
  }

  const showSourceHint = demoHovered && !sourceHintSeen;

  let showCodeLabel;
  if (codeOpen) {
    showCodeLabel = showPreview ? t('hideFullSource') : t('hideSource');
  } else {
    showCodeLabel = showPreview ? t('showFullSource') : t('showSource');
  }

  const atLeastSmallViewport = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const controlRefs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ];
  // if the code is not open we hide the first two language controls
  const isFocusableControl = React.useCallback(
    (index) => (codeOpen ? true : index >= 2),
    [codeOpen],
  );
  const { getControlProps, toolbarProps } = useToolbar(controlRefs, {
    defaultActiveIndex: 2,
    isFocusableControl,
  });

  const devMenuItems = [];
  if (process.env.STAGING === true) {
    /* eslint-disable material-ui/no-hardcoded-labels -- staging only */
    // eslint-disable-next-line react-hooks/rules-of-hooks -- process.env.STAGING never changes
    const router = useRouter();

    const defaultReviewID = process.env.GIT_REVIEW_ID ?? '20000';
    devMenuItems.push(
      <MenuItem
        key="link-deploy-preview"
        data-ga-event-category="demo"
        data-ga-event-label={demoOptions.demo}
        data-ga-event-action="link-deploy-preview"
        component="a"
        href={`https://deploy-preview-${defaultReviewID}--${process.env.NETLIFY_SITE_NAME}.netlify.app${router.route}/#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo on PR #{defaultReviewID}
      </MenuItem>,
      <MenuItem
        key="link-next"
        data-ga-event-category="demo"
        data-ga-event-label={demoOptions.demo}
        data-ga-event-action="link-next"
        component="a"
        href={`https://next--${process.env.NETLIFY_SITE_NAME}.netlify.app${router.route}/#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo on&#160;<code>next</code>
      </MenuItem>,
      <MenuItem
        key="permalink"
        data-ga-event-category="demo"
        data-ga-event-label={demoOptions.demo}
        data-ga-event-action="permalink"
        component="a"
        href={`${process.env.NETLIFY_DEPLOY_URL}${router.route}#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo permalink
      </MenuItem>,
      <MenuItem
        key="link-master"
        data-ga-event-category="demo"
        data-ga-event-label={demoOptions.demo}
        data-ga-event-action="link-master"
        component="a"
        href={`https://master--${process.env.NETLIFY_SITE_NAME}.netlify.app${router.route}/#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo on&#160;<code>master</code>
      </MenuItem>,
    );

    /* eslint-enable material-ui/no-hardcoded-labels */
  }

  return (
    <React.Fragment>
      <div aria-label={t('demoToolbarLabel')} className={classes.root} {...toolbarProps}>
        <Fade in={codeOpen}>
          <ToggleButtonGroup
            className={classes.toggleButtonGroup}
            exclusive
            value={renderedCodeVariant()}
            onChange={handleCodeLanguageClick}
          >
            <ToggleButton
              className={classes.toggleButton}
              value={CODE_VARIANTS.JS}
              aria-label={t('showJSSource')}
              data-ga-event-category="demo"
              data-ga-event-action="source-js"
              data-ga-event-label={demoOptions.demo}
              {...getControlProps(0)}
            >
              <JavaScriptIcon />
            </ToggleButton>
            <ToggleButton
              className={classes.toggleButton}
              value={CODE_VARIANTS.TS}
              disabled={!hasTSVariant}
              aria-label={t('showTSSource')}
              data-ga-event-category="demo"
              data-ga-event-action="source-ts"
              data-ga-event-label={demoOptions.demo}
              {...getControlProps(1)}
            >
              <TypeScriptIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Fade>
        <div>
          <Tooltip
            classes={{ popper: classes.tooltip }}
            key={showSourceHint}
            open={showSourceHint && atLeastSmallViewport ? true : undefined}
            PopperProps={{ disablePortal: true }}
            title={showCodeLabel}
            placement="bottom"
          >
            <IconButton
              size="large"
              aria-controls={openDemoSource ? demoSourceId : null}
              data-ga-event-category="demo"
              data-ga-event-label={demoOptions.demo}
              data-ga-event-action="expand"
              onClick={handleCodeOpenClick}
              color={demoHovered ? 'primary' : 'default'}
              {...getControlProps(2)}
            >
              <CodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {demoOptions.hideEditButton ? null : (
            <Tooltip
              classes={{ popper: classes.tooltip }}
              title={t('codesandbox')}
              placement="bottom"
            >
              <IconButton
                size="large"
                data-ga-event-category="demo"
                data-ga-event-label={demoOptions.demo}
                data-ga-event-action="codesandbox"
                onClick={handleCodeSandboxClick}
                {...getControlProps(3)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip classes={{ popper: classes.tooltip }} title={t('copySource')} placement="bottom">
            <IconButton
              size="large"
              data-ga-event-category="demo"
              data-ga-event-label={demoOptions.demo}
              data-ga-event-action="copy"
              onClick={handleCopyClick}
              {...getControlProps(4)}
            >
              <FileCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip classes={{ popper: classes.tooltip }} title={t('resetFocus')} placement="bottom">
            <IconButton
              size="large"
              data-ga-event-category="demo"
              data-ga-event-label={demoOptions.demo}
              data-ga-event-action="reset-focus"
              onClick={handleResetFocusClick}
              {...getControlProps(5)}
            >
              <ResetFocusIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip classes={{ popper: classes.tooltip }} title={t('resetDemo')} placement="bottom">
            <IconButton
              size="large"
              aria-controls={demoId}
              data-ga-event-category="demo"
              data-ga-event-label={demoOptions.demo}
              data-ga-event-action="reset"
              onClick={onResetDemoClick}
              {...getControlProps(6)}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton
            size="large"
            onClick={handleMoreClick}
            aria-label={t('seeMore')}
            aria-owns={anchorEl ? 'demo-menu-more' : undefined}
            aria-haspopup="true"
            {...getControlProps(7)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            id="demo-menu-more"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMoreClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              data-ga-event-category="demo"
              data-ga-event-label={demoOptions.demo}
              data-ga-event-action="github"
              component="a"
              href={demoData.githubLocation}
              target="_blank"
              rel="noopener nofollow"
              onClick={handleMoreClose}
            >
              {t('viewGitHub')}
            </MenuItem>
            <MenuItem
              data-ga-event-category="demo"
              data-ga-event-label={demoOptions.demo}
              data-ga-event-action="copy-js-source-link"
              onClick={createHandleCodeSourceLink(`${demoName}.js`)}
            >
              {t('copySourceLinkJS')}
            </MenuItem>
            <MenuItem
              data-ga-event-category="demo"
              data-ga-event-label={demoOptions.demo}
              data-ga-event-action="copy-ts-source-link"
              onClick={createHandleCodeSourceLink(`${demoName}.tsx`)}
            >
              {t('copySourceLinkTS')}
            </MenuItem>
            {devMenuItems}
          </Menu>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}

DemoToolbar.propTypes = {
  codeOpen: PropTypes.bool.isRequired,
  codeVariant: PropTypes.string.isRequired,
  demo: PropTypes.object.isRequired,
  demoData: PropTypes.object.isRequired,
  demoHovered: PropTypes.bool.isRequired,
  demoId: PropTypes.string,
  demoName: PropTypes.string.isRequired,
  demoOptions: PropTypes.object.isRequired,
  demoSourceId: PropTypes.string,
  initialFocusRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  onCodeOpenChange: PropTypes.func.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
  openDemoSource: PropTypes.bool.isRequired,
  showPreview: PropTypes.bool.isRequired,
};
