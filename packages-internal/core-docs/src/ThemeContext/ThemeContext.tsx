import * as React from 'react';
import { createTheme as createMdTheme } from '@mui/material/styles';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import useLocalStorageState from '@mui/utils/useLocalStorageState';
import useLazyCSS from '../useLazyCSS';
import { getMetaThemeColor } from '../branding';

const themeInitialOptions = {
  dense: false,
  direction: 'ltr' as 'ltr' | 'rtl',
  paletteMode: 'light' as 'light' | 'dark',
};

export const highDensity = {
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
    },
  },
};

export const DispatchContext = React.createContext<React.ActionDispatch<any>>(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext';
}

export const ThemeOptionsContext = React.createContext(themeInitialOptions);

if (process.env.NODE_ENV !== 'production') {
  ThemeOptionsContext.displayName = 'ThemeOptionsContext';
}

export function ThemeProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'SET_DENSE':
        return {
          ...state,
          dense: action.payload,
        };
      case 'RESET_DENSITY':
        return {
          ...state,
          dense: themeInitialOptions.dense,
        };
      case 'CHANGE':
        // No value changed
        if (
          (!action.payload.paletteMode || action.payload.paletteMode === state.paletteMode) &&
          (!action.payload.direction || action.payload.direction === state.direction)
        ) {
          return state;
        }

        return {
          ...state,
          paletteMode: action.payload.paletteMode || state.paletteMode,
          direction: action.payload.direction || state.direction,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, themeInitialOptions);

  const { direction, paletteMode } = themeOptions;

  useLazyCSS('/static/styles/prism-okaidia.css', '#prismjs');
  // `syntax.css` ships with this package and is emitted as a hashed asset by the
  // bundler (resolved relative to this module), rather than relying on a file
  // copied into the consuming app's public folder.
  useLazyCSS(new URL('./syntax.css', import.meta.url).href, '#syntax');

  // TODO replace with useColorScheme once all pages support css vars
  const { mode, systemMode } = useColorSchemeShim();
  const calculatedMode = mode === 'system' ? systemMode : mode;

  useEnhancedEffect(() => {
    dispatch({
      type: 'CHANGE',
      payload: {
        paletteMode: calculatedMode,
      },
    });
  }, [calculatedMode]);

  useEnhancedEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  useEnhancedEffect(() => {
    // To support light and dark mode images in the docs
    if (paletteMode === 'dark') {
      document.body.classList.remove('mode-light');
      document.body.classList.add('mode-dark');
    } else {
      document.body.classList.remove('mode-dark');
      document.body.classList.add('mode-light');
    }

    const metas = document.querySelectorAll('meta[name="theme-color"]');
    metas.forEach((meta) => {
      meta.setAttribute('content', getMetaThemeColor(paletteMode));
    });
  }, [paletteMode]);

  React.useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    (window as any).createTheme = createMdTheme;
  }, []);

  return (
    <ThemeOptionsContext.Provider value={themeOptions}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </ThemeOptionsContext.Provider>
  );
}

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(
    (options: any) => dispatch({ type: 'CHANGE', payload: options }),
    [dispatch],
  );
}

// TODO: remove once all pages support css vars and replace call sites with useColorScheme()
export function useColorSchemeShim() {
  const [mode, setMode] = useLocalStorageState('mui-mode', 'system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const systemMode = prefersDarkMode ? 'dark' : 'light';

  return {
    mode,
    systemMode,
    setMode,
  };
}
