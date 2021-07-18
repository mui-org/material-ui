/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';
import PageContext from 'docs/src/modules/components/PageContext';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Nav = styled('nav')(({ theme }) => {
  return {
    top: 70,
    // Fix IE11 position sticky issue.
    marginTop: 70,
    width: 175,
    flexShrink: 0,
    position: 'sticky',
    height: 'calc(100vh - 70px)',
    overflowY: 'auto',
    padding: theme.spacing(2, 2, 2, 0),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  };
});

const NavLabel = styled(Typography)(({ theme }) => {
  return {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  };
});

const NavList = styled(Typography)({
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const NavItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'secondary',
})(({ active, secondary, theme }) => {
  const activeStyles = {
    borderLeftColor:
      theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
  };

  return {
    fontSize: '.8125rem',
    padding: theme.spacing(0.5, 0, 0.5, secondary ? 2.5 : '5px'),
    borderLeft: `3px solid transparent`,
    boxSizing: 'border-box',
    '&:hover': {
      borderLeftColor:
        theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
    },
    // TODO: We probably want `aria-current="location"` instead.
    // If so, are we sure "current" and "active" states should have the same styles?
    ...(active && activeStyles),
    '&:active': activeStyles,
  };
});

// TODO: these nodes are mutable sources. Use createMutableSource once it's stable
function getItemsClient(headings) {
  const itemsWithNode = [];

  headings.forEach((item) => {
    itemsWithNode.push({
      ...item,
      node: document.getElementById(item.hash),
    });

    if (item.children.length > 0) {
      item.children.forEach((subitem) => {
        itemsWithNode.push({
          ...subitem,
          node: document.getElementById(subitem.hash),
        });
      });
    }
  });
  return itemsWithNode;
}

const noop = () => {};

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay],
  );

  React.useEffect(() => {
    if (throttledCallback === noop) {
      return undefined;
    }

    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

export default function AppTableOfContents(props) {
  const { items } = props;
  const t = useTranslate();

  const itemsWithNodeRef = React.useRef([]);
  React.useEffect(() => {
    itemsWithNodeRef.current = getItemsClient(items);
  }, [items]);

  const { activePage } = React.useContext(PageContext);
  const [activeState, setActiveState] = React.useState(null);
  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);
  const findActiveIndex = React.useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    let active;
    for (let i = itemsWithNodeRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        active = { hash: null };
        break;
      }

      const item = itemsWithNodeRef.current[i];

      if (process.env.NODE_ENV !== 'production') {
        if (!item.node) {
          console.error(`Missing node on the item ${JSON.stringify(item, null, 2)}`);
        }
      }

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop + document.documentElement.clientHeight / 8
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(items.length > 0 ? findActiveIndex : null, 166);

  const handleClick = (hash) => (event) => {
    // Ignore click for new tab/new window behavior
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }

    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);
    }
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    [],
  );

  const itemLink = (item, secondary) => (
    <NavItem
      display="block"
      color={activeState === item.hash ? 'textPrimary' : 'textSecondary'}
      href={`${activePage.linkProps?.as ?? activePage.pathname}#${item.hash}`}
      underline="none"
      onClick={handleClick(item.hash)}
      active={activeState === item.hash}
      secondary={secondary}
    >
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </NavItem>
  );

  return (
    <Nav aria-label={t('pageTOC')}>
      {items.length > 0 ? (
        <React.Fragment>
          <NavLabel gutterBottom>{t('tableOfContents')}</NavLabel>
          <NavList component="ul">
            {items.map((item) => (
              <li key={item.text}>
                {itemLink(item)}
                {item.children.length > 0 ? (
                  <NavList as="ul">
                    {item.children.map((subitem) => (
                      <li key={subitem.text}>{itemLink(subitem, true)}</li>
                    ))}
                  </NavList>
                ) : null}
              </li>
            ))}
          </NavList>
        </React.Fragment>
      ) : null}
    </Nav>
  );
}

AppTableOfContents.propTypes = {
  items: PropTypes.array.isRequired,
};
