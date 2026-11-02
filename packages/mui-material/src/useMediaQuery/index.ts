import { unstable_createUseMediaQuery } from '@mui/system/useMediaQuery';
import type { UseMediaQueryOptions } from '@mui/system/useMediaQuery';
import THEME_ID from '../styles/identifier';
import type { Theme } from '../styles/createTheme';

export type * from '@mui/system/useMediaQuery';

// TODO v7: remove the generic. It's only used to prevent a breaking change in v6 from system's useMediaQuery in https://github.com/mui/material-ui/pull/44339.
const useMediaQuery = unstable_createUseMediaQuery({ themeId: THEME_ID }) as <T = Theme>(
  queryInput: string | ((theme: T) => string),
  options?: UseMediaQueryOptions,
) => boolean;

export default useMediaQuery;
