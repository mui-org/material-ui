import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@material-ui/utils';
import DiamondSponsors from 'docs/src/modules/components/DiamondSponsors';
import AppNavDrawerItem from 'docs/src/modules/components/AppNavDrawerItem';
import Link from 'docs/src/modules/components/Link';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

const savedScrollTop = {};

function PersistScroll(props) {
  const { slot, children, enabled } = props;
  const rootRef = React.useRef();

  useEnhancedEffect(() => {
    const parent = rootRef.current ? rootRef.current.parentElement : null;
    const activeElement = parent.querySelector('.app-drawer-active');

    if (!enabled || !parent || !activeElement || !activeElement.scrollIntoView) {
      return undefined;
    }

    parent.scrollTop = savedScrollTop[slot];

    const activeBox = activeElement.getBoundingClientRect();

    if (activeBox.top < 0 || activeBox.top > window.innerHeight) {
      parent.scrollTop += activeBox.top - 8 - 32;
    }

    return () => {
      savedScrollTop[slot] = parent.scrollTop;
    };
  }, [enabled, slot]);

  return <div ref={rootRef}>{children}</div>;
}

PersistScroll.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  slot: PropTypes.string.isRequired,
};

// https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
const ToolbarIE11 = styled('div')({ display: 'flex' });

const ToolbarDiv = styled('div')(({ theme }) => {
  return {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(3),
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  };
});

const TitleLink = styled(Link)(({ theme }) => {
  return {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    '&:hover': {
      color: theme.palette.primary.main,
    },
  };
});

const StyledDrawer = styled(Drawer)(({ theme }) => {
  return {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  };
});

const SwipeableDrawerPaperComponent = styled('div')({
  width: 240,
  boxShadow: 'none',
});

function renderNavItems(options) {
  const { pages, ...params } = options;

  return (
    <List disablePadding>
      {pages.reduce(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        (items, page) => reduceChildRoutes({ items, page, ...params }),
        [],
      )}
    </List>
  );
}

/**
 * @param {object} context
 * @param {import('docs/src/pages').MuiPage} context.page
 */
function reduceChildRoutes(context) {
  const { onClose, activePage, items, depth, t } = context;
  let { page } = context;
  if (page.ordered === false) {
    return items;
  }

  if (page.children && page.children.length > 1) {
    const title = pageToTitleI18n(page, t);
    const topLevel = activePage ? activePage.pathname.indexOf(`${page.pathname}/`) === 0 : false;

    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        topLevel={topLevel && !page.subheader}
        openImmediately={topLevel || Boolean(page.subheader)}
        title={title}
      >
        {renderNavItems({ onClose, pages: page.children, activePage, depth: depth + 1, t })}
      </AppNavDrawerItem>,
    );
  } else {
    const title = pageToTitleI18n(page, t);
    page = page.children && page.children.length === 1 ? page.children[0] : page;

    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        onClick={onClose}
      />,
    );
  }

  return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

function AppNavDrawer(props) {
  const { className, disablePermanent, mobileOpen, onClose, onOpen } = props;
  const { activePage, pages } = React.useContext(PageContext);
  const userLanguage = useUserLanguage();
  const languagePrefix = userLanguage === 'en' ? '' : `/${userLanguage}`;
  const t = useTranslate();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const drawer = React.useMemo(() => {
    const navItems = renderNavItems({ onClose, pages, activePage, depth: 0, t });

    return (
      <React.Fragment>
        <ToolbarIE11>
          <ToolbarDiv>
            <TitleLink href="/" underline="hover" onClick={onClose} variant="h6" color="inherit">
              Material-UI
            </TitleLink>
            {process.env.LIB_VERSION ? (
              <Link
                color="text.secondary"
                underline="hover"
                variant="caption"
                href={`https://material-ui.com${languagePrefix}/versions/`}
                onClick={onClose}
              >
                {/* eslint-disable-next-line material-ui/no-hardcoded-labels -- version string is untranslatable */}
                {`v${process.env.LIB_VERSION}`}
              </Link>
            ) : null}
          </ToolbarDiv>
        </ToolbarIE11>
        <Divider />
        <Box sx={{ mx: 3, my: 2 }}>
          <DiamondSponsors spot="drawer" />
        </Box>
        {navItems}
      </React.Fragment>
    );
  }, [activePage, pages, onClose, t, languagePrefix]);

  return (
    <nav className={className} aria-label={t('mainNavigation')}>
      {disablePermanent || mobile ? (
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={onOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            className: 'algolia-drawer',
            component: SwipeableDrawerPaperComponent,
          }}
        >
          <PersistScroll slot="swipeable" enabled={mobileOpen}>
            {drawer}
          </PersistScroll>
        </SwipeableDrawer>
      ) : null}
      {disablePermanent || mobile ? null : (
        <StyledDrawer
          variant="permanent"
          PaperProps={{
            component: SwipeableDrawerPaperComponent,
            elevation: 2,
          }}
          open
        >
          <PersistScroll slot="side" enabled>
            {drawer}
          </PersistScroll>
        </StyledDrawer>
      )}
    </nav>
  );
}

AppNavDrawer.propTypes = {
  className: PropTypes.string,
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default AppNavDrawer;
