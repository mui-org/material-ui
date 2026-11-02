import type { ConformanceOptions } from '@mui/internal-test-utils';
import { describeConformance as baseDescribeConformance } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function describeConformance(
  minimalElement: React.ReactElement<unknown>,
  getOptions: () => ConformanceOptions,
) {
  function getOptionsWithDefaults() {
    return {
      ThemeProvider,
      createTheme,
      ...getOptions(),
    };
  }

  return baseDescribeConformance(minimalElement, getOptionsWithDefaults);
}
