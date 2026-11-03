import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { samePageLinkNavigation } from '../Link';
import { TableOfContents, TOC_WIDTH } from './TableOfContents';
import type { TocItem } from './TableOfContents';

interface FlatTocItem extends TocItem {
  level: number;
}

function flatten(headings: TocItem[]): FlatTocItem[] {
  const items: FlatTocItem[] = [];
  headings.forEach((item) => {
    items.push({ ...item, level: 1 });
    if (item.children.length > 0) {
      item.children.forEach((subitem) => {
        items.push({ ...subitem, level: 2 });
      });
    }
  });
  return items;
}

function getBarWidth(text: string, level: number) {
  const length = text.replace(/<[^>]*>/g, '').length;
  const base = level === 2 ? 8 : 10;
  const width = Math.min(base + length * 0.5, 24);
  return Math.round(width);
}

const Bar = styled('a', {
  shouldForwardProp: (prop) =>
    prop !== 'active' && prop !== 'barWidth' && prop !== 'level' && prop !== 'highlighted',
})<{ active?: boolean; barWidth?: number; level?: number; highlighted?: boolean }>(
  ({ theme, barWidth }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '6px 0',
    cursor: 'pointer',
    '&::after': {
      content: '""',
      display: 'block',
      height: 3,
      width: barWidth,
      borderRadius: 2,
      backgroundColor: (theme.vars || theme).palette.grey[300],
      transition: 'background-color 0.15s ease, width 0.15s ease',
    },
    '&:hover::after': {
      backgroundColor: (theme.vars || theme).palette.grey[500],
    },
    '&:focus-visible': {
      outline: 'none',
    },
    '&:focus-visible::after': {
      outline: '2px solid',
      outlineColor: (theme.vars || theme).palette.grey[500],
      outlineOffset: '2px',
    },
    variants: [
      {
        props: { active: true },
        style: [
          {
            '&::after': {
              backgroundColor: (theme.vars || theme).palette.primary[400],
            },
            '&:hover::after': {
              backgroundColor: (theme.vars || theme).palette.primary[600],
            },
          },
          theme.applyDarkStyles({
            '&::after': {
              backgroundColor: (theme.vars || theme).palette.primary[500],
            },
            '&:hover::after': {
              backgroundColor: (theme.vars || theme).palette.primary[400],
            },
          }),
        ],
      },
      {
        props: { active: false },
        style: theme.applyDarkStyles({
          '&::after': {
            backgroundColor: (theme.vars || theme).palette.grey[700],
          },
          '&:hover::after': {
            backgroundColor: (theme.vars || theme).palette.grey[500],
          },
        }),
      },
      {
        props: { highlighted: true, active: true },
        style: [
          {
            '&::after': {
              backgroundColor: (theme.vars || theme).palette.primary[600],
            },
          },
          theme.applyDarkStyles({
            '&::after': {
              backgroundColor: (theme.vars || theme).palette.primary[400],
            },
          }),
        ],
      },
      {
        props: { highlighted: true, active: false },
        style: [
          {
            '&::after': {
              backgroundColor: (theme.vars || theme).palette.grey[500],
            },
          },
          theme.applyDarkStyles({
            '&::after': {
              backgroundColor: (theme.vars || theme).palette.grey[500],
            },
          }),
        ],
      },
    ],
  }),
);

interface NavItemElementProps {
  sx?: SxProps<Theme>;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

export interface MiniTableOfContentsProps {
  toc: TocItem[];
  activeState: string | null;
  itemLink: (
    item: TocItem,
    level: number,
    onLinkClick?: () => void,
  ) => React.ReactElement<NavItemElementProps>;
  onItemClick: (hash: string) => (event: React.MouseEvent) => void;
  wideLayout?: boolean;
}

export function MiniTableOfContents(props: MiniTableOfContentsProps) {
  const { toc, activeState, itemLink, onItemClick, wideLayout } = props;
  const containerRef = React.useRef<HTMLElement>(null);
  const [popperOpen, setPopperOpen] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const items = React.useMemo(() => flatten(toc), [toc]);

  const hashToIndex = React.useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item, index) => {
      map.set(item.hash, index);
    });
    return map;
  }, [items]);

  const getWidthIncrease = (index: number) => {
    if (hoveredIndex === null) {
      return 0;
    }
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) {
      return 8;
    }
    if (distance === 1) {
      return 4;
    }
    if (distance === 2) {
      return 2;
    }
    return 0;
  };

  const handleMouseEnter = () => {
    setPopperOpen(true);
  };

  const handleClose = () => {
    setPopperOpen(false);
    setHoveredIndex(null);
  };

  const handleBarFocus = (index: number) => {
    setPopperOpen(true);
    setHoveredIndex(index);
  };

  const handleContainerBlur = (event: React.FocusEvent) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      handleClose();
    }
  };

  const handleBarClick = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (samePageLinkNavigation(event as unknown as MouseEvent)) {
      return;
    }
    event.preventDefault();
    onItemClick(hash)(event);
    const node = document.getElementById(hash);
    if (node) {
      node.scrollIntoView({ block: 'start' });
      window.history.pushState(null, '', `#${hash}`);
    }
  };

  const hoveredHash = hoveredIndex !== null ? items[hoveredIndex]?.hash : null;

  const popperItemLink = (item: TocItem, level: number) => {
    const element = itemLink(item, level, handleClose);
    const isHovered = hoveredHash === item.hash;
    const hoverHandlers = {
      onMouseEnter: () => setHoveredIndex(hashToIndex.get(item.hash) ?? null),
      onMouseLeave: () => setHoveredIndex(null),
    };
    if (!isHovered) {
      return React.cloneElement(element, hoverHandlers);
    }
    const isActive = activeState === item.hash;
    return React.cloneElement(element, {
      ...hoverHandlers,
      sx: ((theme: Theme) => ({
        borderLeftColor: isActive
          ? (theme.vars || theme).palette.primary[600]
          : (theme.vars || theme).palette.grey[400],
        color: isActive
          ? (theme.vars || theme).palette.primary[600]
          : (theme.vars || theme).palette.grey[600],
        ...theme.applyDarkStyles({
          borderLeftColor: isActive
            ? (theme.vars || theme).palette.primary[400]
            : (theme.vars || theme).palette.grey[500],
          color: isActive
            ? (theme.vars || theme).palette.primary[400]
            : (theme.vars || theme).palette.grey[200],
        }),
      })) satisfies SxProps<Theme>,
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        component="nav"
        aria-label="Table of contents"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleClose}
        onBlur={handleContainerBlur}
        sx={(theme) => ({
          position: 'sticky',
          top: '20%',
          transform: 'translateY(-20%)',
          height: 'fit-content',
          display: { xs: 'none', sm: 'flex', ...(wideLayout ? {} : { md: 'none' }) },
          flexDirection: 'column',
          alignItems: 'stretch',
          minWidth: 36,
          py: 2,
          marginRight: 1.5,
          ...(wideLayout && {
            [`@media (min-width:${theme.breakpoints.values.xl + TOC_WIDTH}px)`]: {
              display: 'none',
            },
          }),
        })}
      >
        {items.map((item, index) => (
          <Bar
            key={item.hash}
            href={`#${item.hash}`}
            aria-label={item.text.replace(/<[^>]*>/g, '')}
            active={activeState === item.hash}
            highlighted={hoveredIndex === index}
            barWidth={getBarWidth(item.text, item.level) + getWidthIncrease(index)}
            level={item.level}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => handleBarFocus(index)}
            onClick={(event) => handleBarClick(event, item.hash)}
          />
        ))}
        <Popper
          open={popperOpen}
          anchorEl={containerRef.current}
          placement="left-start"
          transition
          sx={{ zIndex: 2000 }}
          aria-hidden
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={250}>
              <Paper
                variant="outlined"
                sx={(theme) => ({
                  p: 1,
                  mr: 1,
                  maxHeight: 'calc(100vh - 200px)',
                  width: TOC_WIDTH,
                  overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  borderColor: 'grey.200',
                  bgcolor: 'background.paper',
                  boxShadow: `0px 4px 16px ${alpha(theme.palette.grey[200], 0.8)}`,
                  ...theme.applyDarkStyles({
                    borderColor: 'primaryDark.700',
                    bgcolor: 'primaryDark.900',
                    boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.8)}`,
                  }),
                })}
              >
                <TableOfContents toc={toc} itemLink={popperItemLink} />
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
