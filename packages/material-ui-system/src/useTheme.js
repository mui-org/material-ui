import createTheme from './createTheme';
import useThemeWithoutDefault from './useThemeWithoutDefault';

export const systemDefaultTheme = createTheme();

function useTheme(defaultTheme = systemDefaultTheme) {
  return useThemeWithoutDefault(defaultTheme);
}

export default useTheme;
