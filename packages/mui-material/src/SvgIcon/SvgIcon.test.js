import { describe, beforeAll, it, expect } from 'vitest';
import { createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import SvgIcon, { svgIconClasses as classes } from '@mui/material/SvgIcon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<SvgIcon />', () => {
  const { render } = createRenderer();

  let path;

  beforeAll(() => {
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" data-testid="test-path" />;
  });

  describeConformance(
    <SvgIcon>
      <path />
    </SvgIcon>,
    () => ({
      classes,
      inheritComponent: 'svg',
      render,
      muiName: 'MuiSvgIcon',
      refInstanceof: window.SVGSVGElement,
      testComponentPropWith: (props) => (
        <svg {...props}>
          <defs>
            <linearGradient id="gradient1">
              <stop offset="20%" stopColor="#39F" />
              <stop offset="90%" stopColor="#F3F" />
            </linearGradient>
          </defs>
          {props.children}
        </svg>
      ),
      skip: ['themeVariants'],
    }),
  );

  it('renders children by default', () => {
    const { container } = render(<SvgIcon>{path}</SvgIcon>);

    expect(screen.queryByTestId('test-path')).not.to.equal(null);
    expect(container.firstChild).to.have.attribute('aria-hidden', 'true');
  });

  it.skipIf(isJsdom())('disables the fill transition when reduced motion is always', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SvgIcon>{path}</SvgIcon>
      </ThemeProvider>,
    );

    expect(window.getComputedStyle(container.firstChild).transitionProperty).to.equal('none');
  });

  it('renders children of provided svg and merge the props', () => {
    const { container } = render(
      <SvgIcon>
        <svg viewBox="0 0 48 48" strokeWidth="1.5">
          {path}
        </svg>
      </SvgIcon>,
    );

    expect(container.firstChild).to.have.tagName('svg');
    expect(container.firstChild.firstChild).to.have.tagName('path');
    expect(container.firstChild).to.have.attribute('viewBox', '0 0 48 48');
    expect(container.firstChild).to.have.attribute('stroke-width', '1.5');
  });

  describe('prop: titleAccess', () => {
    it('should be able to make an icon accessible', () => {
      const { container } = render(
        <SvgIcon title="Go to link" titleAccess="Network">
          {path}
        </SvgIcon>,
      );

      expect(screen.queryByText('Network')).not.to.equal(null);
      expect(container.firstChild).not.to.have.attribute('aria-hidden');
    });
  });

  describe('prop: color', () => {
    it('should render with the user and SvgIcon classes', () => {
      const { container } = render(<SvgIcon className="meow">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class('meow');
    });

    it('should render with the secondary color', () => {
      const { container } = render(<SvgIcon color="secondary">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorSecondary);
    });

    it('should render with the action color', () => {
      const { container } = render(<SvgIcon color="action">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorAction);
    });

    it('should render with the error color', () => {
      const { container } = render(<SvgIcon color="error">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorError);
    });

    it('should render with the primary class', () => {
      const { container } = render(<SvgIcon color="primary">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorPrimary);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const { container } = render(<SvgIcon fontSize="inherit">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.fontSizeInherit);
    });
  });

  describe('prop: inheritViewBox', () => {
    function CustomSvg(props) {
      return (
        <svg viewBox="-4 -4 24 24" {...props}>
          {path}
        </svg>
      );
    }

    it('should render with the default viewBox if neither inheritViewBox nor viewBox are provided', () => {
      const { container } = render(<SvgIcon component={CustomSvg} />);
      expect(container.firstChild).to.have.attribute('viewBox', '0 0 24 24');
    });

    it('should render with given viewBox if inheritViewBox is not provided', () => {
      const { container } = render(<SvgIcon component={CustomSvg} viewBox="0 0 30 30" />);
      expect(container.firstChild).to.have.attribute('viewBox', '0 0 30 30');
    });

    it("should use the custom component's viewBox if true", () => {
      const { container } = render(<SvgIcon component={CustomSvg} inheritViewBox />);
      expect(container.firstChild).to.have.attribute('viewBox', '-4 -4 24 24');
    });
  });

  it.skipIf(isJsdom())(
    'should not override internal ownerState with the ownerState passed to the icon',
    function test() {
      const { container } = render(<SvgIcon ownerState={{ fontSize: 'large' }}>{path}</SvgIcon>);
      expect(container.firstChild).toHaveComputedStyle({ fontSize: '24px' }); // fontSize: medium -> 1.5rem = 24px
    },
  );

  // `getComputedStyle()` resolves `currentColor`, so set an explicit color to tell
  // an inherited `fill` apart from the `black` initial value of SVG `fill`.
  it.skipIf(!isJsdom())('should have `fill="currentColor"`', function test() {
    const { container } = render(
      <SvgIcon sx={{ color: 'rgb(255, 0, 0)' }}>
        <path />
      </SvgIcon>,
    );

    expect(container.firstChild).toHaveComputedStyle({ fill: 'rgb(255, 0, 0)' });
  });

  it.skipIf(!isJsdom())('should not add `fill` if svg is a direct child', function test() {
    const { container } = render(
      <SvgIcon sx={{ color: 'rgb(255, 0, 0)' }}>
        <svg>
          <path />
        </svg>
      </SvgIcon>,
    );

    expect(container.firstChild).toHaveComputedStyle({ fill: 'rgb(0, 0, 0)' });
  });
});
