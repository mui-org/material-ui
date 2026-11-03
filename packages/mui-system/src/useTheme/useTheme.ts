'use client';
import createTheme from '../createTheme';
import type { Theme } from '../createTheme';
import useThemeWithoutDefault from '../useThemeWithoutDefault';

export const systemDefaultTheme = createTheme();

function useTheme<T = Theme>(defaultTheme: T = systemDefaultTheme as unknown as T): T {
  return useThemeWithoutDefault(defaultTheme);
}

export default useTheme;
