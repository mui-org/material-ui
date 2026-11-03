import { getPath } from '@mui/system/style';
import { alpha } from '@mui/system/colorManipulator';
import type { Theme } from '../styles';

const getTextDecoration = <T extends Theme>({
  theme,
  ownerState,
}: {
  theme: T;
  ownerState: { color: string };
}) => {
  const transformedColor = ownerState.color;

  if ('colorSpace' in theme && theme.colorSpace) {
    const color = (getPath(theme, `palette.${transformedColor}.main`) ||
      getPath(theme, `palette.${transformedColor}`) ||
      ownerState.color) as string;
    return theme.alpha(color, 0.4);
  }

  // check the `main` color first for a custom palette, then fallback to the color itself
  const color = (getPath(theme, `palette.${transformedColor}.main`, false) ||
    getPath(theme, `palette.${transformedColor}`, false) ||
    ownerState.color) as string;
  const channelColor = (getPath(theme, `palette.${transformedColor}.mainChannel`) ||
    getPath(theme, `palette.${transformedColor}Channel`)) as string | null;
  if ('vars' in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }

  try {
    return alpha(color, 0.4);
  } catch {
    return `color-mix(in srgb, ${color} 40%, transparent)`;
  }
};

export default getTextDecoration;
