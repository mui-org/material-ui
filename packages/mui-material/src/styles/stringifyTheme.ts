/* eslint-disable import/prefer-default-export */
import { isPlainObject } from '@mui/utils/deepmerge';

function isSerializable(val: any) {
  return (
    isPlainObject(val) ||
    typeof val === 'undefined' ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'number' ||
    Array.isArray(val)
  );
}

/**
 * `baseTheme` usually comes from `createTheme()` or `extendTheme()`.
 *
 * This function is intended to be used with zero-runtime CSS-in-JS like Pigment CSS
 * For example, in a Next.js project:
 *
 * ```js
 * // next.config.js
 * const { extendTheme } = require('@mui/material/styles');
 *
 * const theme = extendTheme();
 * // `.toRuntimeSource` is Pigment CSS specific to create a theme that is available at runtime.
 * theme.toRuntimeSource = stringifyTheme;
 *
 * module.exports = withPigment({
 *  theme,
 * });
 * ```
 */
export function stringifyTheme(baseTheme: Record<string, any> = {}) {
  const serializableTheme: Record<string, any> = { ...baseTheme };

  function serializeTheme(object: Record<string, any>) {
    const array = Object.entries(object);
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < array.length; index++) {
      const [key, value] = array[index];
      if (!isSerializable(value) || key.startsWith('unstable_') || key.startsWith('internal_')) {
        delete object[key];
      } else if (isPlainObject(value)) {
        object[key] = { ...value };
        serializeTheme(object[key]);
      }
    }
  }

  serializeTheme(serializableTheme);

  return `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(serializableTheme, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.motion = { reducedMotion: 'never', ...theme.motion };
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
