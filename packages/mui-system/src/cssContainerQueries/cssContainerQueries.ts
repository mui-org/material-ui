import type { Breakpoints, Breakpoint } from '../createBreakpoints/createBreakpoints';

export interface ContainerQueries {
  up: Breakpoints['up'];
  down: Breakpoints['down'];
  between: Breakpoints['between'];
  only: Breakpoints['only'];
  not: Breakpoints['not'];
}

export interface CssContainerQueries {
  containerQueries: ((name: string) => ContainerQueries) & ContainerQueries;
}

const MIN_WIDTH_PATTERN = /min-width:\s*([0-9.]+)/;

/**
 * WARN: Mutably updates the `css` object.
 * For using in `sx` prop to sort the breakpoint from low to high.
 * Note: this function does not work and will not support multiple units.
 *       e.g. input: { '@container (min-width:300px)': '1rem', '@container (min-width:40rem)': '2rem' }
 *            output: { '@container (min-width:40rem)': '2rem', '@container (min-width:300px)': '1rem' } // since 40 < 300 even though 40rem > 300px
 */
export function sortContainerQueries(
  theme: Partial<CssContainerQueries>,
  css: Record<string, any>,
) {
  if (!theme.containerQueries || !hasContainerQuery(css)) {
    return css;
  }

  const keys = [];

  for (const key in css) {
    if (key.startsWith('@container')) {
      keys.push(key);
    }
  }

  keys.sort((a, b) => {
    return +(a.match(MIN_WIDTH_PATTERN)?.[1] || 0) - +(b.match(MIN_WIDTH_PATTERN)?.[1] || 0);
  });

  const result = css;

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = result[key];
    delete result[key];
    result[key] = value;
  }

  return result;
}

function hasContainerQuery(css: Record<string, any>) {
  for (const key in css) {
    if (key.startsWith('@container')) {
      return true;
    }
  }
  return false;
}

export function isCqShorthand(breakpointKeys: string[], value: string) {
  return (
    value === '@' ||
    (value.startsWith('@') &&
      (breakpointKeys.some((key) => value.startsWith(`@${key}`)) || !!value.match(/^@\d/)))
  );
}

export function getContainerQuery(theme: CssContainerQueries, shorthand: string) {
  const matches = shorthand.match(/^@([^/]+)?\/?(.+)?$/);
  if (!matches) {
    if (process.env.NODE_ENV !== 'production') {
      // TODO: avoid throwing during React render only in development.
      // eslint-disable-next-line mui/no-guarded-throw
      throw /* minify-error */ new Error(
        `MUI: The provided shorthand ${`(${shorthand})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.\n` +
          'For example, `@sm` or `@600` or `@40rem/sidebar`.',
      );
    }
    return null;
  }
  const [, containerQuery, containerName] = matches;
  const value = (Number.isNaN(+containerQuery) ? containerQuery || 0 : +containerQuery) as
    Breakpoint | number;
  return theme.containerQueries(containerName).up(value);
}

export default function cssContainerQueries<T extends { breakpoints: Breakpoints }>(
  themeInput: T,
): T & CssContainerQueries {
  const toContainerQuery = (mediaQuery: string, name?: string) =>
    mediaQuery.replace('@media', name ? `@container ${name}` : '@container');

  function attachCq(node: any, name?: string) {
    node.up = (...args: Parameters<Breakpoints['up']>) =>
      toContainerQuery(themeInput.breakpoints.up(...args), name);

    node.down = (...args: Parameters<Breakpoints['down']>) =>
      toContainerQuery(themeInput.breakpoints.down(...args), name);

    node.between = (...args: Parameters<Breakpoints['between']>) =>
      toContainerQuery(themeInput.breakpoints.between(...args), name);

    node.only = (...args: Parameters<Breakpoints['only']>) =>
      toContainerQuery(themeInput.breakpoints.only(...args), name);

    node.not = (...args: Parameters<Breakpoints['not']>) => {
      const result = toContainerQuery(themeInput.breakpoints.not(...args), name);
      if (result.includes('not all and')) {
        // `@container` does not work with `not all and`, so need to invert the logic
        return result
          .replace('not all and ', '')
          .replace('min-width:', 'width<')
          .replace('max-width:', 'width>')
          .replace('and', 'or');
      }
      return result;
    };
  }
  const node = {};
  const containerQueries = ((name: string) => {
    attachCq(node, name);
    return node;
  }) as CssContainerQueries['containerQueries'];

  attachCq(containerQueries);

  return {
    ...themeInput,
    containerQueries,
  };
}
