import * as React from 'react';
import {
  createTheme,
  unstable_enhanceDensity as enhanceDensity,
} from '@mui/material/styles';
import Box from '@mui/material/Box';

// The default scale `enhanceDensity` ships, split into steps and sizing
// targets. A measured number is matched back against it so a caption can name
// the step that produced it.
const {
  touchTarget: defaultTouchTarget,
  iconSize: defaultIconTarget,
  spacing: defaultSteps,
} = enhanceDensity(createTheme()).unstable_densityScale!;

export const DENSITY_THEME = enhanceDensity(
  createTheme({ colorSchemes: { light: true, dark: true } }),
);

export const DENSITY_SCALE = defaultSteps;

export const DENSITY_TARGETS = {
  touchTarget: defaultTouchTarget,
  iconSize: defaultIconTarget,
};

// Wide enough that the captions in the side gutters have room before the canvas
// starts scrolling.
export const DENSITY_STAGE_SX = {
  position: 'relative',
  minWidth: 620,
  minHeight: 300,
  px: 11,
  py: 8,
  display: 'grid',
  placeItems: 'center',
} as const;

// The colors browser devtools use when it highlights a box.
const PADDING_COLOR = '#c3e5a5';
const PADDING_EDGE = '#7ba85a';
const MARGIN_COLOR = '#f8cb9c';
const MARGIN_EDGE = '#d99a5b';
const GAP_COLOR = '#9b6cd9';

// One rung = one caption line plus breathing room. Every ladder steps by it,
// so `offset` means the same distance wherever it is used.
const RUNG = 24;

// How far a connector reaches past its rail before the caption starts. Shared
// by every shape, so a comb and a spine on one rail end level with each other.
const REACH = 10;

// How far an `offset: 0` dimension bar sits clear of the edge it measures. Each
// further step moves it out by one RUNG, which is what `offset` means on a
// touch-target: distance from the element, not which caption line to sit on.
const BEAM_GAP = 10;

// Connector + caption inks, one per aspect. Darker than the fills so text holds
// up on white, lifted in dark mode where the fills would be far too dim.
const INK = { padding: '#4f7a35', margin: '#a8641c', gap: '#6c3fb0' };
const INK_DARK = { padding: '#a9d18a', margin: '#f0b47a', gap: '#c9adf0' };

/** The measurement kinds a claim can ask for. Derived so the vocabulary and
 * the fields each kind accepts stay one declaration. */
export type Aspect = Claim['aspect'];

export type Side = 'top' | 'bottom' | 'left' | 'right';

/** The slot a reader toggles: every annotation on it goes together. */
export const slotLabel = (annotation: { on: string; label?: string }) =>
  annotation.label ??
  annotation.on
    .replace(/^\.Mui/, '')
    .replace(/-root$/, '')
    .replace(/-/g, ' ');

interface Edges {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const round = (value: number) => `${Math.round(value * 10) / 10}px`;

const inset = (rect: Rect, edges: Edges): Rect => ({
  x: rect.x + edges.left,
  y: rect.y + edges.top,
  width: rect.width - edges.left - edges.right,
  height: rect.height - edges.top - edges.bottom,
});

const outset = (rect: Rect, edges: Edges): Rect => ({
  x: rect.x - Math.abs(edges.left),
  y: rect.y - Math.abs(edges.top),
  width: rect.width + Math.abs(edges.left) + Math.abs(edges.right),
  height: rect.height + Math.abs(edges.top) + Math.abs(edges.bottom),
});

/**
 * A collapsed `Collapse` keeps its children mounted under `visibility: hidden`,
 * which leaves their rect and computed padding intact — so a size test would
 * still measure them. Ask the browser instead, and walk the ancestors where
 * `checkVisibility` isn't available.
 */
function isVisible(node: Element) {
  const check = (
    node as Element & { checkVisibility?: (options: object) => boolean }
  ).checkVisibility;
  if (typeof check === 'function') {
    return check.call(node, { visibilityProperty: true });
  }
  let current: Element | null = node;
  while (current) {
    const styles = window.getComputedStyle(current);
    if (styles.display === 'none' || styles.visibility === 'hidden') {
      return false;
    }
    current = current.parentElement;
  }
  return true;
}

/** Re-run `read` whenever the stage could have moved: a resize, a late webfont,
 * or a popper that mounts a frame after the demo does. */
function useStageEffect(
  stageRef: React.RefObject<HTMLElement | null>,
  selectors: string[],
  read: (stage: HTMLElement) => void,
  deps: React.DependencyList,
) {
  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return undefined;
    }
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => read(stage));
    };
    const resize = new ResizeObserver(schedule);
    // Only the measured elements: observing every descendant made each ripple
    // span re-observe the whole subtree.
    const observeAll = () => {
      resize.disconnect();
      resize.observe(stage);
      selectors.forEach((selector) => {
        stage.querySelectorAll(selector).forEach((node) => resize.observe(node));
      });
    };
    let cancelled = false;
    observeAll();
    schedule();
    document.fonts?.ready.then(() => {
      if (!cancelled) {
        schedule();
      }
    });
    // Attribute records cover state changes (`Mui-expanded`, a Collapse's
    // inline height) that never resize a measured element; only child-list
    // records can bring new elements that need observing.
    const mutation = new MutationObserver((records) => {
      const relevant = records.filter(
        (record) => !(record.target as Element).closest?.('.MuiTouchRipple-root'),
      );
      if (relevant.length === 0) {
        return;
      }
      if (relevant.some((record) => record.type === 'childList')) {
        observeAll();
      }
      schedule();
    });
    mutation.observe(stage, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutation.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ---------------------------------------------------------------------------
// The annotation lib. A claim (`on` + aspect + token) resolves to items; the
// draw layer takes plain geometry plus an authored route and knows nothing
// about MUI. No item's position depends on another's — adjusting one route
// moves exactly one label, so hand-tuning converges.
// ---------------------------------------------------------------------------

export type Gutter = Side;

/** Where a label goes. Every field is absolute. */
export interface Route {
  /** which margin strip around the demo the label lives in. */
  gutter: Gutter;
  /** 0-1 along the band edge facing the gutter: where the line attaches. */
  at?: number;
  /** rungs (label lines) out from the gutter's first line. */
  out?: number;
  /** px along the gutter: slides the label; the line follows. */
  shift?: number;
  /** ladder (axis-aligned, default) or diagonal — the opt-in for a crowded
   * side, where straight segments fan instead of stacking. */
  line?: 'diagonal' | 'ladder';
}

/** The claim an item was drawn for, and the value it measured. */
export interface AnnotateSource {
  claim: Claim;
  value: number;
  lineHeight: number;
  fontSize: number;
}

export type AnnotateItem =
  | {
      /** a strip of space: padding, margin, gap. Shown by filling it. */
      kind: 'band';
      bands: Rect[];
      /** paint this ring (outer minus inner, evenodd) instead of the band
       * rects — the full-perimeter highlight behind an `axis: 'all'` claim. */
      ring?: { outer: Rect; inner: Rect };
      /** which axis the strip measures: 'x' = its width is the value. */
      measures: 'x' | 'y';
      tone: 'padding' | 'margin' | 'gap';
      /** the `(px)` part of a side-gutter label renders on its own line. */
      wrap?: boolean;
      label: string;
      route: Route;
      source: AnnotateSource;
    }
  | {
      /** an extent of a box: touch-target, icon. Shown by bracketing its ends. */
      kind: 'bound';
      box: Rect;
      /** dashed box + pointer (a slot inside the component) instead of a beam
       * (the component's own overall size). */
      outline?: boolean;
      /** beam + the dashed target box drawn inset inside the element, so bands
       * touching its edges stay clear. */
      outlined?: boolean;
      /** the `(px)` part of the label renders on its own line. */
      wrap?: boolean;
      measures: 'x' | 'y';
      label: string;
      route: Route;
      source: AnnotateSource;
    };

// The gutter's first label line, off the demo bounds. `out` steps outward from
// it by RUNG. REACH doubles as the fixed lead-in between a line and its label.
const EDGE = 22;

const away = (g: Gutter) => (g === 'top' || g === 'left' ? -1 : 1);
const sideways = (g: Gutter) => g === 'left' || g === 'right';

function railOf(bounds: Rect, g: Gutter, out: number) {
  const d = EDGE + out * RUNG;
  if (g === 'top') {
    return bounds.y - d;
  }
  if (g === 'bottom') {
    return bounds.y + bounds.height + d;
  }
  if (g === 'left') {
    return bounds.x - d;
  }
  return bounds.x + bounds.width + d;
}

/** Just the text, at its gutter address. */
function LabelText({
  gutter,
  rail,
  anchor,
  label,
  wrap,
}: {
  gutter: Gutter;
  rail: number;
  anchor: number;
  label: string;
  wrap?: boolean;
}) {
  const a = away(gutter);
  if (!sideways(gutter)) {
    return (
      <text
        x={anchor}
        y={rail + a * (gutter === 'top' ? 16 : 26)}
        textAnchor="middle"
      >
        {label}
      </text>
    );
  }
  const breakAt = wrap ? label.lastIndexOf(' (') : -1;
  return (
    <text
      x={rail + a * 14}
      y={anchor}
      textAnchor={gutter === 'left' ? 'end' : 'start'}
      dominantBaseline="middle"
    >
      {breakAt > 0 ? (
        <React.Fragment>
          <tspan x={rail + a * 14} dy="-0.55em">
            {label.slice(0, breakAt)}
          </tspan>
          <tspan x={rail + a * 14} dy="1.15em">
            {label.slice(breakAt)}
          </tspan>
        </React.Fragment>
      ) : (
        label
      )}
    </text>
  );
}

/** One straight segment from each attach point to the label. Ends where the
 * ladder's lead-in ends, so both styles stick to the text the same way. */
function DiagonalLeader({
  gutter,
  rail,
  anchor,
  attach,
  label,
  wrap,
}: {
  gutter: Gutter;
  rail: number;
  anchor: number;
  attach: { x: number; y: number }[];
  label: string;
  wrap?: boolean;
}) {
  const a = away(gutter);
  const end = sideways(gutter)
    ? { x: rail + a * REACH, y: anchor }
    : { x: anchor, y: rail + a * REACH };
  return (
    <React.Fragment>
      {attach.map((point) => (
        <line
          key={`${point.x},${point.y}`}
          className="leader"
          x1={point.x}
          y1={point.y}
          x2={end.x}
          y2={end.y}
        />
      ))}
      <LabelText
        gutter={gutter}
        rail={rail}
        anchor={anchor}
        label={label}
        wrap={wrap}
      />
    </React.Fragment>
  );
}

/** The ending every ladder shares: an optional run along the gutter when
 * `shift` moved the label, the fixed lead-in, then the text. */
function LadderEnding({
  gutter,
  rail,
  natural,
  shift = 0,
  covered,
  label,
  wrap,
}: {
  gutter: Gutter;
  rail: number;
  natural: number;
  shift?: number;
  /** the stretch of rail a crossbar already draws — the run never repaints it,
   * or the doubled dashes read as a solid streak. */
  covered?: [number, number];
  label: string;
  wrap?: boolean;
}) {
  const a = away(gutter);
  const anchor = natural + shift;
  let runFrom: number | null = shift !== 0 ? natural : null;
  if (shift !== 0 && covered) {
    if (anchor >= covered[0] && anchor <= covered[1]) {
      runFrom = null;
    } else {
      runFrom = anchor < covered[0] ? covered[0] : covered[1];
    }
  }
  if (!sideways(gutter)) {
    return (
      <React.Fragment>
        {runFrom !== null ? (
          <line className="leader" x1={runFrom} y1={rail} x2={anchor} y2={rail} />
        ) : null}
        <line
          className="leader"
          x1={anchor}
          y1={rail}
          x2={anchor}
          y2={rail + a * REACH}
        />
        <LabelText
          gutter={gutter}
          rail={rail}
          anchor={anchor}
          label={label}
          wrap={wrap}
        />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {runFrom !== null ? (
        <line className="leader" x1={rail} y1={runFrom} x2={rail} y2={anchor} />
      ) : null}
      <line
        className="leader"
        x1={rail}
        y1={anchor}
        x2={rail + a * REACH}
        y2={anchor}
      />
      <LabelText
        gutter={gutter}
        rail={rail}
        anchor={anchor}
        label={label}
        wrap={wrap}
      />
    </React.Fragment>
  );
}

function BandView({
  item,
  bounds,
  hatchId,
}: {
  item: Extract<AnnotateItem, { kind: 'band' }>;
  bounds: Rect;
  hatchId: string;
}) {
  const { bands, measures, route, label, tone, wrap } = item;
  const g = route.gutter;
  const rail = railOf(bounds, g, route.out ?? 0);
  // A stem leaves a band along the strip's own run, so it can only reach the
  // gutter pair perpendicular to the measured axis. Anywhere else the ladder
  // crosses the strip instead — a spine, ticked where it meets each band.
  const naturalPair: Gutter[] =
    measures === 'x' ? ['top', 'bottom'] : ['left', 'right'];
  const comb = naturalPair.includes(g);
  const diagonal = (route.line ?? 'ladder') === 'diagonal';
  // `at` (0-1, default centre) picks the point along the band edge facing the
  // gutter where the line attaches.
  const t = route.at ?? 0.5;
  const facing = (b: Rect) => {
    if (g === 'top') {
      return { x: b.x + b.width * t, y: b.y };
    }
    if (g === 'bottom') {
      return { x: b.x + b.width * t, y: b.y + b.height };
    }
    if (g === 'left') {
      return { x: b.x, y: b.y + b.height * t };
    }
    return { x: b.x + b.width, y: b.y + b.height * t };
  };

  const ringPath = (r: Rect) =>
    `M${r.x},${r.y}H${r.x + r.width}V${r.y + r.height}H${r.x}Z`;
  const fill = item.ring ? (
    <path
      className={`${tone}-box`}
      fillRule="evenodd"
      d={`${ringPath(item.ring.outer)}${ringPath(item.ring.inner)}`}
    />
  ) : (
    bands.map((b) =>
      tone === 'gap' ? (
        <rect
          key={`f-${b.x}-${b.y}`}
          className="gap-box"
          fill={`url(#${hatchId})`}
          x={b.x}
          y={b.y}
          width={b.width}
          height={b.height}
        />
      ) : (
        <rect
          key={`f-${b.x}-${b.y}`}
          className={`${tone}-box`}
          x={b.x}
          y={b.y}
          width={b.width}
          height={b.height}
        />
      ),
    )
  );

  if (diagonal) {
    // Exit from the band edge facing the gutter — the exact point a ladder
    // stem leaves from. Only the line's angle differs between styles.
    const attach = bands.map(facing);
    const spans = attach.map((point) => (sideways(g) ? point.y : point.x));
    const natural = (Math.min(...spans) + Math.max(...spans)) / 2;
    return (
      <g className={`tone-${tone}`}>
        {fill}
        <DiagonalLeader
          gutter={g}
          rail={rail}
          anchor={natural + (route.shift ?? 0)}
          attach={attach}
          label={label}
          wrap={wrap}
        />
      </g>
    );
  }

  if (comb) {
    const stems = bands.map((b) => {
      const point = facing(b);
      return sideways(g) ? point.y : point.x;
    });
    const edgeOf = (b: Rect) => {
      if (g === 'top') {
        return b.y;
      }
      if (g === 'bottom') {
        return b.y + b.height;
      }
      if (g === 'left') {
        return b.x;
      }
      return b.x + b.width;
    };
    const natural = (Math.min(...stems) + Math.max(...stems)) / 2;
    return (
      <g className={`tone-${tone}`}>
        {fill}
        {bands.map((b, index) =>
          sideways(g) ? (
            <line
              key={`s-${b.x}-${b.y}`}
              className="leader"
              x1={edgeOf(b)}
              y1={stems[index]}
              x2={rail}
              y2={stems[index]}
            />
          ) : (
            <line
              key={`s-${b.x}-${b.y}`}
              className="leader"
              x1={stems[index]}
              y1={edgeOf(b)}
              x2={stems[index]}
              y2={rail}
            />
          ),
        )}
        {bands.length > 1 ? (
          <line
            className="leader"
            x1={sideways(g) ? rail : Math.min(...stems)}
            y1={sideways(g) ? Math.min(...stems) : rail}
            x2={sideways(g) ? rail : Math.max(...stems)}
            y2={sideways(g) ? Math.max(...stems) : rail}
          />
        ) : null}
        <LadderEnding
          gutter={g}
          rail={rail}
          natural={natural}
          shift={route.shift}
          covered={
            bands.length > 1 ? [Math.min(...stems), Math.max(...stems)] : undefined
          }
          label={label}
          wrap={wrap}
        />
      </g>
    );
  }

  // Spine: one line crossing the strip(s), a tick where it meets each.
  const lo = Math.min(...bands.map((b) => (measures === 'x' ? b.y : b.x)));
  const hi = Math.max(
    ...bands.map((b) => (measures === 'x' ? b.y + b.height : b.x + b.width)),
  );
  const cross = lo + (hi - lo) * t;
  const marks = bands.map((b) =>
    measures === 'x' ? b.x + b.width / 2 : b.y + b.height / 2,
  );
  const far = away(g) < 0 ? Math.max(...marks) : Math.min(...marks);
  const TICK = 5;
  return (
    <g className={`tone-${tone}`}>
      {fill}
      {sideways(g) ? (
        <line className="leader" x1={rail} y1={cross} x2={far} y2={cross} />
      ) : (
        <line className="leader" x1={cross} y1={rail} x2={cross} y2={far} />
      )}
      {marks.map((mark) =>
        sideways(g) ? (
          <line
            key={mark}
            className="dim"
            x1={mark}
            y1={cross - TICK}
            x2={mark}
            y2={cross + TICK}
          />
        ) : (
          <line
            key={mark}
            className="dim"
            x1={cross - TICK}
            y1={mark}
            x2={cross + TICK}
            y2={mark}
          />
        ),
      )}
      <LadderEnding
        gutter={g}
        rail={rail}
        natural={cross}
        shift={route.shift}
        label={label}
        wrap={wrap}
      />
    </g>
  );
}

function BoundView({
  item,
  bounds,
}: {
  item: Extract<AnnotateItem, { kind: 'bound' }>;
  bounds: Rect;
}) {
  const { box, measures, route, label, outline, outlined, wrap } = item;
  // Split before the trailing `(px)`; the tail keeps its leading space so the
  // node's textContent still reads exactly like the one-line caption.
  const breakAt = wrap ? label.lastIndexOf(' (') : -1;
  const g = route.gutter;
  const a = away(g);
  const vertical = measures === 'y';
  // Inside the element's own edge, so a band fill touching that edge is not
  // painted over by the frame's stroke.
  const frame = (
    <rect
      className="slot-outline"
      x={box.x + 1}
      y={box.y + 1}
      width={box.width - 2}
      height={box.height - 2}
    />
  );

  if (outline) {
    // Pointer: the dashed box already brackets the extent; the line just
    // points at it from the gutter, leaving the edge midpoint facing it.
    const rail = railOf(bounds, g, route.out ?? 0);
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const from = sideways(g)
      ? { x: g === 'left' ? box.x : box.x + box.width, y: cy }
      : { x: cx, y: g === 'top' ? box.y : box.y + box.height };
    const natural = sideways(g) ? cy : cx;
    if ((route.line ?? 'ladder') === 'diagonal') {
      return (
        <g>
          {frame}
          <DiagonalLeader
            gutter={g}
            rail={rail}
            anchor={natural + (route.shift ?? 0)}
            attach={[from]}
            label={label}
          />
        </g>
      );
    }
    return (
      <g>
        {frame}
        {sideways(g) ? (
          <line className="leader" x1={from.x} y1={from.y} x2={rail} y2={from.y} />
        ) : (
          <line className="leader" x1={from.x} y1={from.y} x2={from.x} y2={rail} />
        )}
        <LadderEnding
          gutter={g}
          rail={rail}
          natural={natural}
          shift={route.shift}
          label={label}
        />
      </g>
    );
  }

  // Beam: a bar spanning the box, serifs at both ends. A bound whose edge IS
  // the demo's edge (a root, at out 0) hugs it with nothing to bridge; a
  // nested or moved-out bar stands off in the gutter, with dashed extension
  // lines tying it back to the edges it measures.
  const lo = vertical ? box.y : box.x;
  const hi = vertical ? box.y + box.height : box.x + box.width;
  const mid = (lo + hi) / 2;
  const anchor = mid + (route.shift ?? 0);
  let edge;
  if (vertical) {
    edge = g === 'left' ? box.x : box.x + box.width;
  } else {
    edge = g === 'top' ? box.y : box.y + box.height;
  }
  let boundsEdge;
  if (vertical) {
    boundsEdge = g === 'left' ? bounds.x : bounds.x + bounds.width;
  } else {
    boundsEdge = g === 'top' ? bounds.y : bounds.y + bounds.height;
  }
  const snug = (route.out ?? 0) === 0 && Math.abs(edge - boundsEdge) < 1;
  const bar = snug ? edge + a * BEAM_GAP : railOf(bounds, g, route.out ?? 0);
  const pt = (span: number, off: number) =>
    vertical ? { x: bar + off, y: span } : { x: span, y: bar + off };
  return (
    <g>
      {outlined ? frame : null}
      {snug
        ? null
        : [lo, hi].map((span) => {
            const from = vertical
              ? { x: edge + a * 3, y: span }
              : { x: span, y: edge + a * 3 };
            const to = pt(span, a * 4);
            return (
              <line
                key={`e${span}`}
                className="leader"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              />
            );
          })}
      <line
        className="dim"
        x1={pt(lo, 0).x}
        y1={pt(lo, 0).y}
        x2={pt(hi, 0).x}
        y2={pt(hi, 0).y}
      />
      {[lo, hi].map((span) => (
        <line
          key={`s${span}`}
          className="dim"
          x1={pt(span, -4).x}
          y1={pt(span, -4).y}
          x2={pt(span, 4).x}
          y2={pt(span, 4).y}
        />
      ))}
      {route.shift && (anchor < lo || anchor > hi)
        ? (() => {
            const runFrom = anchor < lo ? lo : hi;
            return (
              <line
                className="leader"
                x1={vertical ? bar : runFrom}
                y1={vertical ? runFrom : bar}
                x2={vertical ? bar : anchor}
                y2={vertical ? anchor : bar}
              />
            );
          })()
        : null}
      {vertical ? (
        <text
          x={bar + a * REACH}
          y={anchor}
          textAnchor={g === 'right' ? 'start' : 'end'}
          dominantBaseline="middle"
        >
          {breakAt > 0 ? (
            <React.Fragment>
              <tspan x={bar + a * REACH} dy="-0.55em">
                {label.slice(0, breakAt)}
              </tspan>
              <tspan x={bar + a * REACH} dy="1.15em">
                {label.slice(breakAt)}
              </tspan>
            </React.Fragment>
          ) : (
            label
          )}
        </text>
      ) : (
        <text x={anchor} y={bar + a * (g === 'top' ? 16 : 26)} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
}

export function Annotate({
  items,
  bounds,
}: {
  items: AnnotateItem[];
  bounds: Rect;
}) {
  const hatchId = React.useId();
  const rendered = items.map((item, index) =>
    item.kind === 'band' ? (
      <BandView key={index} item={item} bounds={bounds} hatchId={hatchId} />
    ) : (
      <BoundView key={index} item={item} bounds={bounds} />
    ),
  );
  return (
    <Box
      component="svg"
      aria-hidden
      data-annotations
      sx={(theme) => ({
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        pointerEvents: 'none',
        // Over demo content (an AppBar sits at 1100) but under the toolbar's
        // own menus (1300) — annotations must not bleed over an open Select.
        // The Tooltip demo lowers its inline popper below this.
        zIndex: 1200,
        color: 'text.secondary',
        fontSize: 13,
        '& text': {
          fill: 'currentColor',
          // the badge: a halo of the page background, so a line passing behind
          // a label never strikes through its text
          stroke: (theme.vars || theme).palette.background.paper,
          strokeWidth: 4,
          strokeLinejoin: 'round',
          paintOrder: 'stroke',
        },
        // labels always paint in front: a lines pass with text hidden, then a
        // labels pass with everything else hidden
        '& .pass-lines text': { display: 'none' },
        '& .pass-labels line, & .pass-labels rect, & .pass-labels path': {
          display: 'none',
        },
        '& .dim': { stroke: 'currentColor', fill: 'none' },
        '& .leader': {
          stroke: 'currentColor',
          fill: 'none',
          strokeDasharray: '3 3',
          opacity: 0.6,
        },
        '& .padding-box': {
          fill: PADDING_COLOR,
          fillOpacity: 0.7,
          stroke: PADDING_EDGE,
        },
        '& .margin-box': {
          fill: MARGIN_COLOR,
          fillOpacity: 0.7,
          stroke: MARGIN_EDGE,
        },
        '& .slot-outline': {
          fill: 'none',
          stroke: 'currentColor',
          strokeDasharray: '2 2',
          opacity: 0.6,
        },
        '& .gap-box': { stroke: GAP_COLOR, strokeDasharray: '2 2' },
        '& .hatch': { stroke: GAP_COLOR, opacity: 0.55 },
        '& .tone-padding': { color: INK.padding },
        '& .tone-margin': { color: INK.margin },
        '& .tone-gap': { color: INK.gap },
        ...theme.applyStyles('dark', {
          '& .tone-padding': { color: INK_DARK.padding },
          '& .tone-margin': { color: INK_DARK.margin },
          '& .tone-gap': { color: INK_DARK.gap },
        }),
      })}
    >
      <defs>
        <pattern
          id={hatchId}
          width={6}
          height={6}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line className="hatch" x1={0} y1={0} x2={0} y2={6} strokeWidth={3} />
        </pattern>
      </defs>
      <g className="pass-lines">{rendered}</g>
      <g className="pass-labels">{rendered}</g>
    </Box>
  );
}

/** Common to every claim: what to find, how to caption it, where to put it. */
interface ClaimBase {
  /** selector, resolved inside the demo. Every match is annotated. */
  on: string;
  /** the expression the theme authored; omitted -> plain px caption. */
  token?: string;
  /** printed instead of the token — to name the measured thing when the
   * expression is private or the component identity matters more. The token,
   * when also given, still drives the value gate's check. */
  text?: string;
  /** shown in the slot toggle list; derived from the selector when absent. */
  label?: string;
  /** authored position; anything omitted falls back to nearest-side defaults. */
  route?: Partial<Route>;
}

/**
 * A claim: what is measured and what the theme authored for it. The aspect
 * picks the branch, and each branch carries only the knobs that branch reads —
 * `resolveClaims` ignores anything else, so a union beats optional fields.
 */
export type Claim =
  | (ClaimBase & {
      /** a strip of space around the element, shown by filling it. */
      aspect: 'padding' | 'margin';
      /** 'all' paints the full ring (every live band) with ONE label, led by a
       * single line from the band facing the route's gutter. */
      axis?: 'inline' | 'block' | 'all';
      /** render the caption's `(px)` part on its own line — for long
       * expressions whose one-line label would reach past the demo frame. */
      wrap?: boolean;
      /** one band only. The way to name a pair whose values differ: the presets
       * author each side's expression separately (details: `xxSmall` top,
       * `small` bottom), so each side gets its own claim carrying its own
       * token. */
      side?: Side;
    })
  | (ClaimBase & {
      /** the space between two children, shown by filling it. */
      aspect: 'gap';
      /** which child boundary the band follows (0 = after the first child). A
       * row with separators has several gaps; this picks one. */
      after?: number;
    })
  | (ClaimBase & {
      /** the glyph's own box, framed with a pointer line to its label. */
      aspect: 'icon';
    })
  | (ClaimBase & {
      /** the element's own box, bracketed end to end by a beam. */
      aspect: 'touch-target';
      /** which dimension the beam reads; the route's gutter decides when
       * omitted — a side reads height, top/bottom reads width. */
      axis?: 'inline' | 'block';
      /** also draw the dashed target box, inset inside the element — makes the
       * interactive area visible, not just its length. */
      outlined?: boolean;
      /** draw as a frame + pointer line (the icon device) instead of a beam —
       * for a small box whose area matters more than a bracketed length. */
      pointer?: boolean;
      /** render the caption's `(px)` part on its own line — for long
       * expressions whose one-line label would reach too far into the demo. */
      wrap?: boolean;
    });

function labelFor(value: number, token?: string) {
  const measured = round(value);
  // A raw-px token already states the measurement — `6px (6px)` says it twice.
  // A token that differs (`iconSize - 2px`) still earns the resolved value.
  return token && token !== measured ? `${token} (${measured})` : measured;
}

/**
 * Turn claims into draw items by measuring the DOM. Pure per claim: no item's
 * geometry depends on another claim's.
 */
export function resolveClaims(
  stage: HTMLElement,
  demo: HTMLElement,
  claims: Claim[],
): { items: AnnotateItem[]; bounds: Rect } {
  const stageBox = stage.getBoundingClientRect();
  const rel = (r: DOMRect): Rect => ({
    x: r.left - stageBox.left,
    y: r.top - stageBox.top,
    width: r.width,
    height: r.height,
  });
  // A `display: contents` demo wrapper has no box of its own — bounds are the
  // union of what actually painted.
  const painted = [demo, ...Array.from(demo.children)]
    .map((node) => node.getBoundingClientRect())
    .filter((b) => b.width > 0 && b.height > 0);
  const leftMost = Math.min(...painted.map((b) => b.left));
  const topMost = Math.min(...painted.map((b) => b.top));
  const bounds: Rect =
    painted.length > 0
      ? {
          x: leftMost - stageBox.left,
          y: topMost - stageBox.top,
          width: Math.max(...painted.map((b) => b.right)) - leftMost,
          height: Math.max(...painted.map((b) => b.bottom)) - topMost,
        }
      : rel(demo.getBoundingClientRect());
  const items: AnnotateItem[] = [];

  // nearest-side defaults: a pure function of the feature's own position. A
  // feature spanning the whole demo (a collapsed or single-row state) is a
  // tie — broken toward top/left so a component's states don't flip labels.
  const nearestOf = (box: Rect, pair: [Gutter, Gutter]): Gutter => {
    if (pair[0] === 'top') {
      return box.y + box.height / 2 <= bounds.y + bounds.height / 2 + 1
        ? 'top'
        : 'bottom';
    }
    return box.x + box.width / 2 <= bounds.x + bounds.width / 2 + 1
      ? 'left'
      : 'right';
  };
  const routed = (route: Partial<Route> | undefined, fallback: Gutter): Route => ({
    gutter: fallback,
    ...route,
  });

  claims.forEach((claim) => {
    Array.from(demo.querySelectorAll(claim.on)).forEach((element) => {
      if (!isVisible(element)) {
        return;
      }
      const box = rel(element.getBoundingClientRect());
      const styles = window.getComputedStyle(element);
      const lineHeight = parseFloat(
        (claim.aspect === 'icon' && element.parentElement
          ? window.getComputedStyle(element.parentElement)
          : styles
        ).lineHeight,
      );
      const fontSize = parseFloat(styles.fontSize);
      const num = (value: string) => parseFloat(value) || 0;
      const edgesOf = (prefix: string, suffix: string): Edges => ({
        top: num(styles[`${prefix}Top${suffix}` as any]),
        right: num(styles[`${prefix}Right${suffix}` as any]),
        bottom: num(styles[`${prefix}Bottom${suffix}` as any]),
        left: num(styles[`${prefix}Left${suffix}` as any]),
      });
      const border = edgesOf('border', 'Width');
      const padding = edgesOf('padding', '');
      const paddingBox = inset(box, border);
      const contentBox = inset(paddingBox, padding);

      if (claim.aspect === 'padding' || claim.aspect === 'margin') {
        const isPad = claim.aspect === 'padding';
        const edges = isPad ? padding : edgesOf('margin', '');
        const outer = isPad ? paddingBox : outset(box, edges);
        const axis =
          claim.axis ??
          (claim.side === 'top' || claim.side === 'bottom' ? 'block' : 'inline');
        const bandOf = (side: keyof Edges): Rect => {
          const size = Math.abs(edges[side]);
          if (side === 'left') {
            return { x: outer.x, y: outer.y, width: size, height: outer.height };
          }
          if (side === 'right') {
            return {
              x: outer.x + outer.width - size,
              y: outer.y,
              width: size,
              height: outer.height,
            };
          }
          if (side === 'top') {
            return { x: outer.x, y: outer.y, width: outer.width, height: size };
          }
          return {
            x: outer.x,
            y: outer.y + outer.height - size,
            width: outer.width,
            height: size,
          };
        };
        if (axis === 'all') {
          const liveSides = (
            ['top', 'right', 'bottom', 'left'] as (keyof Edges)[]
          ).filter((edge) => Math.abs(edges[edge]) > 0.5);
          if (liveSides.length === 0) {
            return;
          }
          const values = new Set(
            liveSides.map((edge) => Math.round(Math.abs(edges[edge]) * 10) / 10),
          );
          const gutter = claim.route?.gutter ?? 'right';
          const lead = liveSides.includes(gutter as keyof Edges)
            ? (gutter as keyof Edges)
            : liveSides[0];
          items.push({
            source: { claim, value: edges[lead], lineHeight, fontSize },
            kind: 'band',
            tone: isPad ? 'padding' : 'margin',
            wrap: claim.wrap,
            measures: lead === 'left' || lead === 'right' ? 'x' : 'y',
            // one label for the whole ring — only honest when every live band
            // agrees on the value
            label: labelFor(
              edges[lead],
              values.size === 1 ? (claim.text ?? claim.token) : undefined,
            ),
            bands: [bandOf(lead)],
            ring: { outer, inner: isPad ? contentBox : box },
            route: routed(claim.route, gutter),
          });
          return;
        }
        const naturalSides: (keyof Edges)[] =
          axis === 'inline' ? ['left', 'right'] : ['top', 'bottom'];
        const pair: (keyof Edges)[] = claim.side ? [claim.side] : naturalSides;
        const live = pair.filter((side) => Math.abs(edges[side]) > 0.5);
        if (live.length === 0) {
          return;
        }
        // Equal bands share one item (and may carry the token); unequal bands
        // split, and both drop it — one name cannot cover two values.
        const byValue = new Map<number, (keyof Edges)[]>();
        live.forEach((side) => {
          const key = Math.round(Math.abs(edges[side]) * 10) / 10;
          byValue.set(key, [...(byValue.get(key) ?? []), side]);
        });
        const gutterPair: [Gutter, Gutter] =
          axis === 'inline' ? ['top', 'bottom'] : ['left', 'right'];
        byValue.forEach((group) => {
          // grouped by magnitude, captioned with the signed value — a pulled-
          // back action margin prints -8px, matching its -xSmall token
          const signed = edges[group[0]];
          items.push({
            source: { claim, value: signed, lineHeight, fontSize },
            kind: 'band',
            tone: isPad ? 'padding' : 'margin',
            wrap: claim.wrap,
            measures: axis === 'inline' ? 'x' : 'y',
            label: labelFor(
              signed,
              byValue.size === 1 ? (claim.text ?? claim.token) : undefined,
            ),
            bands: group.map(bandOf),
            route: routed(claim.route, nearestOf(box, gutterPair)),
          });
        });
        return;
      }

      if (claim.aspect === 'gap') {
        const column = num(styles.columnGap);
        const row = num(styles.rowGap);
        // The band starts where the child before the boundary ends — only that
        // child must be an element (a Button label is a bare text node).
        // `after` picks which boundary when there are several.
        const boundary = claim.after ?? 0;
        const first = element.children[boundary]?.getBoundingClientRect();
        const second = element.children[boundary + 1]?.getBoundingClientRect();
        if (!first) {
          return;
        }
        const stacked = second
          ? second.top >= first.bottom - 0.5
          : row > 0.5 && column <= 0.5;
        let size = stacked ? row : column;
        if (size <= 0.5 && second) {
          // No flex gap declared — the space is margin-made. The distance
          // between the children is still the story the annotation tells.
          const spacing = stacked
            ? second.top - first.bottom
            : second.left - first.right;
          if (spacing > 0.5) {
            size = spacing;
          }
        }
        if (size <= 0.5) {
          return;
        }
        const band: Rect = stacked
          ? {
              x: contentBox.x,
              y: first.bottom - stageBox.top,
              width: contentBox.width,
              height: size,
            }
          : {
              x: first.right - stageBox.left,
              y: contentBox.y,
              width: size,
              height: contentBox.height,
            };
        items.push({
          source: { claim, value: size, lineHeight, fontSize },
          kind: 'band',
          tone: 'gap',
          measures: stacked ? 'y' : 'x',
          label: labelFor(size, claim.text ?? claim.token),
          bands: [band],
          route: routed(
            claim.route,
            nearestOf(box, stacked ? ['left', 'right'] : ['top', 'bottom']),
          ),
        });
        return;
      }

      if (claim.aspect === 'icon') {
        const svg = element.matches('svg') ? element : element.querySelector('svg');
        if (!svg) {
          return;
        }
        const iconBox = rel(svg.getBoundingClientRect());
        items.push({
          source: { claim, value: iconBox.height, lineHeight, fontSize },
          kind: 'bound',
          measures: 'y',
          outline: true,
          label: labelFor(iconBox.height, claim.text ?? claim.token),
          box: iconBox,
          route: routed(claim.route, nearestOf(iconBox, ['left', 'right'])),
        });
        return;
      }

      if (claim.aspect !== 'touch-target') {
        return;
      }

      // The element's own box, bracketed by a beam. The gutter decides the
      // dimension — a side reads height, top/bottom reads width — unless
      // `axis` names it (a pointer's label can sit anywhere).
      const route = routed(claim.route, nearestOf(box, ['left', 'right']));
      const measuresWidth = claim.axis
        ? claim.axis === 'inline'
        : route.gutter === 'top' || route.gutter === 'bottom';
      items.push({
        source: {
          claim,
          value: measuresWidth ? box.width : box.height,
          lineHeight,
          fontSize,
        },
        kind: 'bound',
        measures: measuresWidth ? 'x' : 'y',
        outline: claim.pointer,
        outlined: claim.outlined,
        wrap: claim.wrap,
        label: labelFor(
          measuresWidth ? box.width : box.height,
          claim.text ?? claim.token,
        ),
        box,
        route,
      });
    });
  });

  return { items, bounds };
}

/** Resolve claims against the live DOM, re-measuring whenever the stage could
 * have moved — a resize, a late webfont, a popper mounting a frame later. */
export function useClaims(
  stageRef: React.RefObject<HTMLElement | null>,
  demoRef: React.RefObject<HTMLElement | null>,
  claims: Claim[],
  deps: React.DependencyList,
) {
  const [state, setState] = React.useState<{
    items: AnnotateItem[];
    bounds: Rect;
  } | null>(null);
  // Compared by value, not identity: the measurement re-runs on every observer
  // tick, and handing back a fresh object would re-render the demo. A
  // re-rendered TextareaAutosize re-writes its own height, which trips the
  // ResizeObserver that started the tick — a multiline demo never settles.
  const measured = React.useRef<string | null>(null);
  useStageEffect(
    stageRef,
    claims.map((claim) => claim.on),
    (stage) => {
      const demo = demoRef.current;
      if (!demo) {
        measured.current = null;
        setState(null);
        return;
      }
      const next = resolveClaims(stage, demo, claims);
      const key = JSON.stringify(next);
      if (key === measured.current) {
        return;
      }
      measured.current = key;
      setState(next);
    },
    deps,
  );
  return state;
}
