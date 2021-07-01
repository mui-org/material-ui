import { useThemeProps as systemUseThemeProps } from '@material-ui/system';
import defaultTheme from './defaultTheme';

export default function useThemeProps({ props, name }) {
  return systemUseThemeProps({ props, name, defaultTheme });
}
