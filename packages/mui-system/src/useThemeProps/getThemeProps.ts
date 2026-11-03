import resolveProps from '@mui/utils/resolveProps';

type ThemedProps<Theme, Name extends keyof any> = Theme extends {
  components: Record<Name, { defaultProps: infer Props }>;
}
  ? Props
  : {};

export default function getThemeProps<Theme, Props, Name extends keyof any>(params: {
  props: Props;
  name: Name;
  theme?: Theme | undefined;
}): Props & ThemedProps<Theme, Name> {
  const { theme, name, props } = params;

  if (
    !theme ||
    !(theme as any).components ||
    !(theme as any).components[name] ||
    !(theme as any).components[name].defaultProps
  ) {
    return props as Props & ThemedProps<Theme, Name>;
  }

  return resolveProps((theme as any).components[name].defaultProps, props) as Props &
    ThemedProps<Theme, Name>;
}
