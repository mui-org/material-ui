'use client';
import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export interface ThemeWithProps {
  components?: any;
}

export type ThemedProps<Theme, Name extends keyof any> = Theme extends {
  components: Record<Name, { defaultProps: infer Props }>;
}
  ? Props
  : {};

export default function useThemeProps<
  Theme extends ThemeWithProps,
  Props,
  Name extends keyof any,
>(params: {
  props: Props;
  name: Name;
  defaultTheme?: Theme | undefined;
  themeId?: string | undefined;
}): Props & ThemedProps<Theme, Name> {
  const { props, name, defaultTheme, themeId } = params;
  let theme: any = useTheme(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  return getThemeProps({ theme, name, props }) as Props & ThemedProps<Theme, Name>;
}
