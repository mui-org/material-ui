import scStyled from 'styled-components';

export default function styled(tag, options) {
  let stylesFactory;

  if (options) {
    stylesFactory = scStyled(tag).withConfig({
      displayName: options.label,
      shouldForwardProp: options.shouldForwardProp,
    });
  } else {
    stylesFactory = scStyled(tag);
  }

  if (process.env.NODE_ENV !== 'production') {
    return (...styles) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';
      if (styles.length === 0) {
        console.error(
          [
            `Material-UI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`,
            'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
          ].join('\n'),
        );
      } else if (styles.some((style) => style === undefined)) {
        console.error(
          `Material-UI: the styled(${component})(...args) API requires all its args to be defined.`,
        );
      }
      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
}

Object.keys(scStyled).forEach((tag) => {
  styled[tag] = scStyled[tag];
});

export { ThemeContext, keyframes, css } from 'styled-components';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
