import { isUnitless, convertLength, responsiveProperty, alignProperty, fontGrid } from './cssUtils';

export default function responsiveFontSizes(themeInput, options = {}) {
  const {
    breakpoints = ['sm', 'md', 'lg'],
    disableAlign = false,
    factor = 2,
    variants = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'caption',
      'button',
      'overline',
    ],
  } = options;

  const theme = { ...themeInput };
  theme.typography = { ...theme.typography };
  const typography = theme.typography;

  // Convert between CSS lengths e.g. em->px or px->rem
  // Set the baseFontSize for your project. Defaults to 16px (also the browser default).
  const convert = convertLength(typography.htmlFontSize);
  const breakpointValues = breakpoints.map((x) => theme.breakpoints.values[x]);

  variants.forEach((variant) => {
    const style = typography[variant];

    if (!style) {
      return;
    }

    const remFontSize = parseFloat(convert(style.fontSize, 'rem'));

    if (remFontSize <= 1) {
      return;
    }

    const maxFontSize = remFontSize;
    const minFontSize = 1 + (maxFontSize - 1) / factor;

    let { lineHeight } = style;

    if (!isUnitless(lineHeight) && !disableAlign) {
      throw /* minify-error */ new Error(
        'MUI: Unsupported non-unitless line height with grid alignment.\n' +
          'Use unitless line heights instead.',
      );
    }

    if (!isUnitless(lineHeight)) {
      // make it unitless
      lineHeight = parseFloat(convert(lineHeight, 'rem')) / parseFloat(remFontSize);
    }

    let transform = null;

    if (!disableAlign) {
      transform = (value) =>
        alignProperty({
          size: value,
          grid: fontGrid({ pixels: 4, lineHeight, htmlFontSize: typography.htmlFontSize }),
        });
    }

    const responsive = responsiveProperty({
      cssProperty: 'fontSize',
      min: minFontSize,
      max: maxFontSize,
      unit: 'rem',
      breakpoints: breakpointValues,
      transform,
    });

    // https://github.com/mui/material-ui/issues/40255
    // Preserve the original font size at the largest breakpoint.
    // Grid alignment can snap the max value away from the original designed size.
    if (breakpointValues.length > 0) {
      const lastBreakpoint = breakpointValues[breakpointValues.length - 1];
      responsive[`@media (min-width:${lastBreakpoint}px)`] = {
        fontSize: `${Math.round(maxFontSize * 10000) / 10000}rem`,
      };
    }

    typography[variant] = {
      ...style,
      ...responsive,
    };
  });

  return theme;
}
