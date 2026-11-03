import { describe, expect, it } from 'vitest';
import {
  createRenderer,
  reactMajor,
  act,
  screen,
  flushEffects,
  isJsdom,
} from '@mui/internal-test-utils';
import { createTheme } from '@mui/material/styles';
import Masonry, { masonryClasses as classes } from '@mui/lab/Masonry';
import { getStyle } from './Masonry';
import describeConformance from '../../test/describeConformance';

describe('<Masonry />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Masonry>
      <div />
    </Masonry>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'span',
      muiName: 'MuiMasonry',
      skip: ['themeVariants'],
    }),
  );

  const theme = createTheme({ spacing: 8, cssVariables: false });
  const cssVarsTheme = createTheme({ spacing: 8, cssVariables: true });
  // The render tests use the default theme, whose spacing is 8px.
  const defaultThemeSpacing = 8;
  const maxColumnHeight = 100;

  describe('render', () => {
    it.skipIf(isJsdom())('should render with correct default styles', function test() {
      const width = 400;
      const columns = 4;
      const spacing = 1;

      render(
        <div style={{ width: `${width}px` }}>
          <Masonry data-testid="container">
            <div data-testid="child" />
          </Masonry>
        </div>,
      );

      const containerMargin = `-${(defaultThemeSpacing * spacing) / 2}px`;
      const childMargin = `${(defaultThemeSpacing * spacing) / 2}px`;
      expect(screen.getByTestId('container')).toHaveComputedStyle({
        width: `${width}px`,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        marginTop: containerMargin,
        marginRight: containerMargin,
        marginBottom: containerMargin,
        marginLeft: containerMargin,
      });
      expect(screen.getByTestId('child')).toHaveComputedStyle({
        boxSizing: 'border-box',
        marginTop: childMargin,
        marginRight: childMargin,
        marginBottom: childMargin,
        marginLeft: childMargin,
        width: `${width / columns - defaultThemeSpacing * spacing}px`,
      });
    });

    // only run on browser
    it.skipIf(isJsdom())(
      'should re-compute the height of masonry when dimensions of any child change',
      async () => {
        const spacingProp = 1;
        const firstChildHeight = 10;
        const secondChildInitialHeight = 20;
        const secondChildNewHeight = 10;

        render(
          <Masonry columns={2} spacing={spacingProp} data-testid="container">
            <div style={{ height: `${firstChildHeight}px` }} />
          </Masonry>,
        );

        const masonry = screen.getByTestId('container');
        const secondItem = document.createElement('div');
        secondItem.style.height = `${secondChildInitialHeight}px`;
        masonry.appendChild(secondItem);

        const topAndBottomMargin = defaultThemeSpacing * spacingProp * 2;
        expect(window.getComputedStyle(masonry).height).to.equal(
          `${firstChildHeight + secondChildInitialHeight + topAndBottomMargin}px`,
        );

        secondItem.style.height = `${secondChildNewHeight}px`;

        expect(window.getComputedStyle(masonry).height).to.equal(
          `${firstChildHeight + secondChildNewHeight + topAndBottomMargin}px`,
        );

        await flushEffects();
      },
    );

    // React 19 removed prop types support
    it.skipIf(!isJsdom() || reactMajor >= 19)(
      'should throw console error when children are empty',
      function test() {
        expect(() => render(<Masonry columns={3} spacing={1} />)).toErrorDev(
          /Warning: Failed prop type: The prop `children` is marked as required in `ForwardRef\(Masonry.*\)`, but its value is `undefined`\./,
        );
      },
    );

    it.skipIf(isJsdom())('should not throw type error when children are empty', function test() {
      // React 19 removed prop types support
      if (reactMajor < 19) {
        expect(() => render(<Masonry columns={3} spacing={1} />)).toErrorDev(
          /Warning: Failed prop type: The prop `children` is marked as required in `ForwardRef\(Masonry.*\)`, but its value is `undefined`\./,
        );
      }

      expect(() => render(<Masonry columns={3} spacing={1} />)).not.to.throw(new TypeError());
    });
  });

  describe('style attribute:', () => {
    it('should apply correct default styles', () => {
      const columns = 4;
      const spacing = 1;
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: `calc(${theme.spacing(spacing)} / 2)`,
          width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing)})`,
        },
        margin: `calc(0px - (${theme.spacing(spacing)} / 2))`,
        height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing)})`,
      });
    });

    it('should apply responsive margin', () => {
      const columns = 4;
      const spacing = { xs: 1, sm: 2, md: 3 };
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          width: `calc(${(100 / columns).toFixed(2)}% - 0px)`,
        },
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.xs)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.xs)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.xs)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.xs)})`,
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.sm)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.sm)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.sm)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.sm)})`,
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.md)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.md)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.md)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.md)})`,
        },
      });
    });

    it('should apply responsive columns', () => {
      const columns = { xs: 3, sm: 5, md: 7 };
      const spacing = 1;
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: `calc(${theme.spacing(spacing)} / 2)`,
        },
        margin: `calc(0px - (${theme.spacing(spacing)} / 2))`,
        height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing)})`,
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.xs).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.sm).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.md).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
      });
    });
  });

  describe('server-side rendering', () => {
    it('should support server-side rendering', () => {
      const defaultHeight = 700;
      const defaultColumns = 4;
      const defaultSpacing = 1;
      expect(
        getStyle({
          ownerState: {
            defaultColumns,
            defaultSpacing,
            defaultHeight,
            isSSR: true,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: `calc(${theme.spacing(defaultSpacing)} / 2)`,
          width: `calc(${(100 / defaultColumns).toFixed(2)}% - ${theme.spacing(defaultSpacing)})`,
          '&:nth-of-type(4n+1)': { order: 1 },
          '&:nth-of-type(4n+2)': { order: 2 },
          '&:nth-of-type(4n+3)': { order: 3 },
          '&:nth-of-type(4n+0)': { order: 4 },
        },
        margin: `calc(0px - (${theme.spacing(defaultSpacing)} / 2))`,
        height: defaultHeight,
      });
    });

    it('should use the spacing CSS variable with CSS theme variables', () => {
      const defaultColumns = 4;
      const defaultSpacing = 2;
      const spacing = cssVarsTheme.spacing(defaultSpacing);
      const styles = getStyle({
        ownerState: {
          defaultColumns,
          defaultSpacing,
          defaultHeight: 700,
          isSSR: true,
        },
        theme: cssVarsTheme,
      });

      expect(spacing).to.include('var(--mui-spacing');
      expect(styles.margin).to.equal(`calc(0px - (${spacing} / 2))`);
      expect(styles['& > *'].margin).to.equal(`calc(${spacing} / 2)`);
      expect(styles['& > *'].width).to.equal(
        `calc(${(100 / defaultColumns).toFixed(2)}% - ${spacing})`,
      );
    });

    it('should treat a numeric string defaultSpacing as a spacing factor', () => {
      const ownerState = {
        defaultColumns: 4,
        defaultHeight: 700,
        isSSR: true,
      };

      expect(getStyle({ ownerState: { ...ownerState, defaultSpacing: '2' }, theme })).to.deep.equal(
        getStyle({ ownerState: { ...ownerState, defaultSpacing: 2 }, theme }),
      );
    });
  });

  describe('prop: columns', () => {
    it('should generate correct responsive styles regardless of breakpoints order', () => {
      const columns = { sm: 5, md: 7, xs: 3 };
      const spacing = 1;
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: `calc(${theme.spacing(spacing)} / 2)`,
        },
        margin: `calc(0px - (${theme.spacing(spacing)} / 2))`,
        height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing)})`,
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.xs).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.sm).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.md).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
      });
    });
  });

  describe('prop: spacing', () => {
    it('should generate correct responsive styles regardless of breakpoints order', () => {
      const columns = 4;
      const spacing = { sm: 2, md: 3, xs: 1 };
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          width: `calc(${(100 / columns).toFixed(2)}% - 0px)`,
        },
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.xs)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.xs)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.xs)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.xs)})`,
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.sm)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.sm)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.sm)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.sm)})`,
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.md)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.md)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.md)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.md)})`,
        },
      });
    });

    it('should support zero spacing with CSS theme variables', () => {
      const ownerState = { columns: 4, spacing: 0, maxColumnHeight };
      const styles = getStyle({ ownerState, theme: cssVarsTheme });

      expect(styles.margin).to.equal('calc(0px - (0px / 2))');
      expect(styles['& > *'].margin).to.equal('calc(0px / 2)');
      expect(styles['& > *'].width).to.equal('calc(25.00% - 0px)');
      expect(styles.height).to.equal(`calc(${maxColumnHeight}px + 0px)`);
    });

    it('should support responsive zero and unit-string spacing with CSS theme variables', () => {
      const styles = getStyle({
        ownerState: { columns: 4, spacing: { xs: 0, md: '16px' }, maxColumnHeight },
        theme: cssVarsTheme,
      });

      expect(
        styles[`@media (min-width:${cssVarsTheme.breakpoints.values.xs}px)`]['& > *'].width,
      ).to.equal('calc(25.00% - 0px)');
      expect(
        styles[`@media (min-width:${cssVarsTheme.breakpoints.values.md}px)`]['& > *'].width,
      ).to.equal('calc(25.00% - 16px)');
    });
  });

  describe('prop: sequential', () => {
    const pause = (timeout) =>
      act(
        async () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, timeout);
          }),
      );

    // only run on browser
    it.skipIf(isJsdom())('should place children in sequential order', async function test() {
      render(
        <Masonry columns={2} spacing={1} sequential>
          <div style={{ height: `20px` }} data-testid="child1" />
          <div style={{ height: `10px` }} data-testid="child2" />
          <div style={{ height: `10px` }} data-testid="child3" />
        </Masonry>,
      );

      await pause(400); // Masonry elements aren't ordered immediately, and so we need the pause to wait for them to be ordered
      const child1 = screen.getByTestId('child1');
      const child2 = screen.getByTestId('child2');
      const child3 = screen.getByTestId('child3');
      expect(window.getComputedStyle(child1).order).to.equal(`1`);
      expect(window.getComputedStyle(child2).order).to.equal(`2`);
      expect(window.getComputedStyle(child3).order).to.equal(`1`);
    });
  });
});
