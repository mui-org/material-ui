import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import { Link as DocsLink } from '@mui/internal-core-docs/Link';

// The <ol> wraps by default. Container collapsing needs a single row that can overflow.
// Applying this on the wrapper covers the real list and both mirrors at once.
const BreadcrumbsRow = styled('div')({
  position: 'relative',
  minWidth: 0,
  overflowX: 'auto',
  [`& .${breadcrumbsClasses.ol}`]: { flexWrap: 'nowrap' },
  [`& .${breadcrumbsClasses.li}`]: { whiteSpace: 'nowrap' },
});

// height: 0 + overflow: hidden keeps the mirror out of the scrollable overflow.
// Clipping is paint-only, so the items inside still measure at their natural width.
const Mirror = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  height: 0,
  width: 'max-content',
  overflow: 'hidden',
  visibility: 'hidden',
  pointerEvents: 'none',
});

function outerWidth(element: Element) {
  const style = window.getComputedStyle(element);
  return (
    element.getBoundingClientRect().width +
    parseFloat(style.marginLeft || '0') +
    parseFloat(style.marginRight || '0')
  );
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

export interface BreadcrumbsLayout {
  collapsed: boolean;
  hiddenCount: number;
  visibleCount: number;
}

export interface ResponsiveBreadcrumbsProps extends Omit<BreadcrumbsProps, 'maxItems'> {
  /**
   * Label for the button that opens the hidden items.
   * @default 'Show hidden path'
   */
  menuLabel?: string;
  onLayoutChange?: (layout: BreadcrumbsLayout) => void;
}

/**
 * Collapses `<Breadcrumbs>` to fit its container, without patching the component.
 *
 * The built-in collapse is not used at all. `maxItems` is a switch, not a dial: above
 * the threshold the component always renders the same three-slot layout, and its
 * `expanded` state never resets. So this wrapper slices the children itself and passes
 * a menu button as an ordinary child, the way the "condensed with menu" demo does.
 */
function ResponsiveBreadcrumbs(props: ResponsiveBreadcrumbsProps) {
  const {
    children,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 1,
    menuLabel = 'Show hidden path',
    onLayoutChange,
    sx,
    ...other
  } = props;

  const items = React.useMemo(
    () => React.Children.toArray(children).filter(React.isValidElement),
    [children],
  );
  const count = items.length;

  // Widest to narrowest. `null` means "no menu, every item is visible".
  const ladder = React.useMemo(() => {
    const steps: (number | null)[] = [null];
    for (let after = count - 1 - itemsBeforeCollapse; after >= itemsAfterCollapse; after -= 1) {
      steps.push(after);
    }
    return steps;
  }, [count, itemsBeforeCollapse, itemsAfterCollapse]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const fullRef = React.useRef<HTMLElement>(null);
  const triggerRef = React.useRef<HTMLElement>(null);
  const [step, setStep] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const update = useEventCallback(() => {
    const container = containerRef.current;
    const fullOl = fullRef.current?.querySelector('ol');
    const triggerItem = triggerRef.current?.querySelector('ol')?.firstElementChild;

    if (!container || !fullOl || !triggerItem) {
      return;
    }

    // The mirror alternates item, separator, item, ... so even indexes are items.
    const itemWidths: number[] = [];
    let separatorWidth = 0;
    Array.from(fullOl.children).forEach((child, index) => {
      if (index % 2 === 0) {
        itemWidths.push(outerWidth(child));
      } else {
        separatorWidth = Math.max(separatorWidth, outerWidth(child));
      }
    });

    const triggerWidth = outerWidth(triggerItem);

    // clientWidth is rounded to an integer, so it can hide a sub-pixel overflow.
    // Derive the content box from the fractional rect instead.
    // offsetWidth - clientWidth covers the borders plus any vertical scrollbar.
    const containerStyle = window.getComputedStyle(container);
    const available =
      container.getBoundingClientRect().width -
      (container.offsetWidth - container.clientWidth) -
      parseFloat(containerStyle.paddingLeft || '0') -
      parseFloat(containerStyle.paddingRight || '0');

    const widthOf = (after: number | null) => {
      if (after === null) {
        return sum(itemWidths) + Math.max(count - 1, 0) * separatorWidth;
      }
      const visible = [
        ...itemWidths.slice(0, itemsBeforeCollapse),
        ...itemWidths.slice(count - after),
      ];
      const slots = itemsBeforeCollapse + 1 + after;
      return sum(visible) + triggerWidth + (slots - 1) * separatorWidth;
    };

    // First step that fits wins; fall back to the narrowest one.
    let next = ladder.length - 1;
    for (let index = 0; index < ladder.length; index += 1) {
      if (widthOf(ladder[index]) <= available) {
        next = index;
        break;
      }
    }
    setStep(next);
  });

  useEnhancedEffect(() => {
    const container = containerRef.current;
    const fullOl = fullRef.current?.querySelector('ol');
    if (!container || !fullOl || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    // The mirror never collapses, so its width only changes when the labels or
    // the fonts change. Observing it re-measures on both without a second hook.
    observer.observe(fullOl);
    return () => observer.disconnect();
  }, [update, ladder]);

  const after = ladder[Math.min(step, ladder.length - 1)] ?? null;
  const hidden = after === null ? [] : items.slice(itemsBeforeCollapse, count - after);

  // The hidden set changed under the open menu, so the menu no longer describes it.
  React.useEffect(() => {
    setAnchorEl(null);
  }, [after]);

  const reportLayout = useEventCallback((layout: BreadcrumbsLayout) => {
    onLayoutChange?.(layout);
  });

  React.useEffect(() => {
    const visibleCount = count - hidden.length;
    reportLayout({
      collapsed: hidden.length > 0,
      hiddenCount: hidden.length,
      visibleCount,
    });
  }, [count, hidden.length, reportLayout]);

  // Breadcrumbs rejects a Fragment child, so the trigger carries its own key.
  const renderTrigger = (interactive: boolean) => (
    <IconButton
      key="menu-trigger"
      size="small"
      aria-label={menuLabel}
      aria-haspopup="menu"
      aria-expanded={interactive ? Boolean(anchorEl) : undefined}
      tabIndex={interactive ? undefined : -1}
      onClick={interactive ? (event) => setAnchorEl(event.currentTarget) : undefined}
    >
      <MoreHorizIcon fontSize="small" />
    </IconButton>
  );

  const visible =
    after === null
      ? items
      : [
          ...items.slice(0, itemsBeforeCollapse),
          renderTrigger(true),
          ...items.slice(count - after),
        ];

  if (count === 0) {
    return (
      <Breadcrumbs {...other} sx={sx}>
        {children}
      </Breadcrumbs>
    );
  }

  return (
    <BreadcrumbsRow ref={containerRef}>
      {/* Off-screen mirrors keep every item measurable while the real list is collapsed. */}
      <Mirror aria-hidden>
        <Breadcrumbs {...other} sx={sx} ref={fullRef} maxItems={count}>
          {children}
        </Breadcrumbs>
        <Breadcrumbs {...other} sx={sx} ref={triggerRef} maxItems={1}>
          {renderTrigger(false)}
        </Breadcrumbs>
      </Mirror>

      <Breadcrumbs {...other} sx={sx} maxItems={visible.length}>
        {visible}
      </Breadcrumbs>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        // The scroll lock pads the body, which resizes the container and would
        // immediately recompute the layout under the open menu.
        disableScrollLock
      >
        {hidden.map((child, index) => {
          const childProps = child.props as { href?: string; children?: React.ReactNode };
          // A children-based API hides the target, so the href has to be recovered
          // from the child to keep the menu item a real link.
          return childProps.href ? (
            // An <a> cannot be a direct child of the menu <ul>, so keep a list item
            // around it. Same wrapper the roving-focus experiment uses.
            <li key={`hidden-${index}`} role="none">
              <MenuItem component="a" href={childProps.href} onClick={() => setAnchorEl(null)}>
                {childProps.children}
              </MenuItem>
            </li>
          ) : (
            <MenuItem key={`hidden-${index}`} onClick={() => setAnchorEl(null)}>
              {child}
            </MenuItem>
          );
        })}
      </Menu>
    </BreadcrumbsRow>
  );
}

const SHORT_PATH = [
  'Home',
  'Catalog',
  'Accessories',
  'Bags',
  'Backpacks',
  'Travel',
  'Carry-on',
  'Model 42',
];

const LONG_PATH = [
  'Organization',
  'Engineering department',
  'Design systems guild',
  'Component library',
  'Material UI package',
  'Navigation components',
  'Breadcrumbs',
];

function renderPath(labels: string[]) {
  return labels.map((label, index) =>
    index === labels.length - 1 ? (
      <Typography key={label} sx={{ color: 'text.primary' }}>
        {label}
      </Typography>
    ) : (
      <Link key={label} underline="hover" color="inherit" href="#responsive-breadcrumbs">
        {label}
      </Link>
    ),
  );
}

interface WidthFrameProps {
  children: React.ReactNode;
  label: string;
  width: number;
}

function WidthFrame(props: WidthFrameProps) {
  const { children, label, width } = props;

  return (
    <Stack spacing={1}>
      <Typography variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, width, maxWidth: '100%', boxSizing: 'border-box' }}>
        {children}
      </Paper>
    </Stack>
  );
}

function ComparisonExample() {
  const [width, setWidth] = React.useState(720);
  const [layout, setLayout] = React.useState<BreadcrumbsLayout>({
    collapsed: false,
    hiddenCount: 0,
    visibleCount: SHORT_PATH.length,
  });

  return (
    <Paper component="section" variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6">Container width drives the collapse</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Drag the slider. The top list drops one middle item at a time until the row fits, and
            the dropped items move into the menu. Open the menu, then keep dragging: the row
            recollapses every time, because there is no expanded state to get stuck in.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            The bottom list is a plain <code>&lt;Breadcrumbs&gt;</code> at the same width for
            comparison: it wraps to a second line instead of collapsing.
          </Typography>
        </div>

        <Box sx={{ maxWidth: 420 }}>
          <Typography id="width-slider" variant="body2" gutterBottom>
            Container width: {width}px
          </Typography>
          <Slider
            aria-labelledby="width-slider"
            value={width}
            min={220}
            max={900}
            step={1}
            onChange={(event, value) => setWidth(value as number)}
          />
        </Box>

        <WidthFrame
          label={`Container aware — ${layout.visibleCount} shown, ${layout.hiddenCount} in the menu`}
          width={width}
        >
          <ResponsiveBreadcrumbs onLayoutChange={setLayout}>
            {renderPath(SHORT_PATH)}
          </ResponsiveBreadcrumbs>
        </WidthFrame>

        <WidthFrame label="Today — maxItems={8}, wraps on overflow" width={width}>
          <Breadcrumbs maxItems={8}>{renderPath(SHORT_PATH)}</Breadcrumbs>
        </WidthFrame>
      </Stack>
    </Paper>
  );
}

function LongLabelExample() {
  const [width, setWidth] = React.useState(560);

  return (
    <Paper component="section" variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6">Uneven label widths</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Item widths differ a lot here, so a count-based threshold cannot predict the fit. The
            measurement pass uses real widths, so each step removes exactly as much as it needs to.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            The second row shows the floor. <code>itemsBeforeCollapse</code> and{' '}
            <code>itemsAfterCollapse</code> are a hard minimum, so below about 500px it cannot
            shrink any further and the row scrolls instead. Only text truncation could go narrower.
          </Typography>
        </div>

        <Box sx={{ maxWidth: 420 }}>
          <Typography id="long-width-slider" variant="body2" gutterBottom>
            Container width: {width}px
          </Typography>
          <Slider
            aria-labelledby="long-width-slider"
            value={width}
            min={220}
            max={900}
            step={1}
            onChange={(event, value) => setWidth(value as number)}
          />
        </Box>

        <WidthFrame label="itemsBeforeCollapse={1}, itemsAfterCollapse={1}" width={width}>
          <ResponsiveBreadcrumbs>{renderPath(LONG_PATH)}</ResponsiveBreadcrumbs>
        </WidthFrame>

        <WidthFrame label="itemsBeforeCollapse={2}, itemsAfterCollapse={2}" width={width}>
          <ResponsiveBreadcrumbs itemsBeforeCollapse={2} itemsAfterCollapse={2}>
            {renderPath(LONG_PATH)}
          </ResponsiveBreadcrumbs>
        </WidthFrame>
      </Stack>
    </Paper>
  );
}

function FluidExample() {
  return (
    <Paper component="section" variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6">Fluid container</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            No slider here. Resize the browser window and the list reacts through a{' '}
            <code>ResizeObserver</code> on the wrapper.
          </Typography>
        </div>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <ResponsiveBreadcrumbs>{renderPath(LONG_PATH)}</ResponsiveBreadcrumbs>
        </Paper>
      </Stack>
    </Paper>
  );
}

export default function ResponsiveBreadcrumbsExperiment() {
  return (
    <React.Fragment>
      <Head title="Responsive Breadcrumbs Experiments" description="" />
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="overline" color="text.secondary">
                Experiments
              </Typography>
              <Typography variant="h3" id="responsive-breadcrumbs">
                Breadcrumbs that collapse to fit their container
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A userland wrapper around the published <code>&lt;Breadcrumbs&gt;</code>. It
                measures the items once in an off-screen mirror, picks the widest layout that still
                fits the container, and puts the dropped items in a menu. No change to the
                component.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button component={DocsLink} href="/experiments" noLinkStyle variant="outlined">
                  Back to experiments
                </Button>
                <Button
                  component={DocsLink}
                  href="https://mui.com/material-ui/react-breadcrumbs/#condensed-with-menu"
                  noLinkStyle
                  variant="text"
                >
                  Condensed with menu docs
                </Button>
              </Box>
            </Stack>

            <ComparisonExample />
            <LongLabelExample />
            <FluidExample />

            <Alert severity="info" variant="outlined">
              <AlertTitle>What the current API cannot do</AlertTitle>
              <Typography variant="body2" component="div">
                <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { mb: 1 } }}>
                  <li>
                    <strong>The built-in collapse cannot be reused.</strong> <code>maxItems</code>{' '}
                    is a switch, not a dial: above the threshold the component always renders{' '}
                    <code>itemsBeforeCollapse + ellipsis + itemsAfterCollapse</code>, and its{' '}
                    <code>expanded</code> state never resets. This wrapper bypasses it and slices
                    the children itself.
                  </li>
                  <li>
                    <strong>A children-based API makes the menu guesswork.</strong> The hidden items
                    are opaque nodes, so the wrapper has to read <code>href</code> off each child to
                    keep the menu item a real link, then wrap it in{' '}
                    <code>&lt;li role=&quot;none&quot;&gt;</code> because an <code>&lt;a&gt;</code>{' '}
                    cannot be a direct child of the menu <code>&lt;ul&gt;</code>. A built-in version
                    would want structured items instead.
                  </li>
                  <li>
                    <strong>The floor can still overflow.</strong> Once{' '}
                    <code>itemsBeforeCollapse + itemsAfterCollapse</code> items remain, dropping
                    stops. A container narrower than that floor overflows, because nothing in the
                    current API truncates label text.
                  </li>
                  <li>
                    <strong>Measurement needs a duplicate DOM tree.</strong> Collapsed items leave
                    the DOM, so the wrapper renders every child twice. A built-in version could
                    measure the real list before it collapses.
                  </li>
                  <li>
                    <strong>The menu scroll lock fights the measurement.</strong> Opening a default{' '}
                    <code>Menu</code> pads the body, which resizes the container and recomputes the
                    layout under the open menu. It needs <code>disableScrollLock</code>.
                  </li>
                  <li>
                    <strong>
                      <code>flexWrap: wrap</code> is hardcoded on the <code>ol</code>.
                    </strong>{' '}
                    Every consumer of this pattern has to override it.
                  </li>
                </Box>
              </Typography>
            </Alert>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}
