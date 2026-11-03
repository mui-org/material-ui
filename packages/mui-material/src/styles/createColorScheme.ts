import type { ColorSystemOptions } from './createThemeWithVars';
import type { PaletteOptions } from './createPalette';
import createPalette from './createPalette';
import getOverlayAlpha from './getOverlayAlpha';

const defaultDarkOverlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return 'none';
  }
  const overlay = getOverlayAlpha(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});

export function getOpacity(mode: 'light' | 'dark') {
  return {
    inputPlaceholder: mode === 'dark' ? 0.5 : 0.42,
    inputUnderline: mode === 'dark' ? 0.7 : 0.42,
    switchTrackDisabled: mode === 'dark' ? 0.2 : 0.12,
    switchTrack: mode === 'dark' ? 0.3 : 0.38,
  };
}
export function getOverlays(mode: 'light' | 'dark') {
  return mode === 'dark' ? defaultDarkOverlays : [];
}

export default function createColorScheme(
  options: ColorSystemOptions & { colorSpace?: string | undefined },
) {
  const {
    palette: paletteInput = { mode: 'light' } as PaletteOptions, // need to cast to avoid module augmentation test
    opacity,
    overlays,
    colorSpace,
    ...other
  } = options;
  // need to cast because `colorSpace` is considered internal at the moment.
  const palette = createPalette({ ...paletteInput, colorSpace } as PaletteOptions);
  return {
    palette,
    opacity: { ...getOpacity(palette.mode), ...opacity },
    overlays: overlays || getOverlays(palette.mode),
    ...other,
  } as unknown as ColorSystemOptions;
}
