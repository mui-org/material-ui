import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export default function useThemeProps({ props, name, defaultTheme }) {
  const theme = useTheme(defaultTheme);
  const mergedProps = getThemeProps({ theme, name, props });
  return mergedProps;
}
