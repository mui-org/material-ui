import type { ThemeOptions, FocusVisible } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { buttonClasses } from '@mui/material/Button';

const theme = createTheme();

// MuiCssBaseline overrides
{
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html, body': {
            color: 'white',
          },
        },
      },
    },
  });
}

// MuiCssBaseline styleOverrides key as a callback
{
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: (themeParam) => `
          span {
            background-color: ${themeParam.palette.success.main};
            color: ${themeParam.palette.error.main};
          }
        `,
      },
    },
  });
}

// theme.typography[variant]
{
  createTheme({
    components: {
      MuiListItemSecondaryAction: {
        styleOverrides: {
          root: {
            ...theme.typography.body1,
          },
        },
      },
    },
  });
}

// theme.mixins[mixin]
{
  createTheme({
    components: {
      MuiListItemSecondaryAction: {
        styleOverrides: {
          root: {
            ...theme.mixins.toolbar,
          },
        },
      },
    },
  });
}

{
  createTheme({
    components: {
      MuiPopper: {
        styleOverrides: {
          root: {
            backgroundColor: 'red',
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: 'black',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          label: {
            color: 'black',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            color: 'black',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: 'black',
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          colorInfo: {
            backgroundColor: '#232323',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            [`&.${buttonClasses.contained}.${buttonClasses.colorSuccess}`]: {
              backgroundColor: '#7CFC00',
            },
            [`&.${buttonClasses.contained}.${buttonClasses.colorError}`]: {
              backgroundColor: '#FF4500',
            },
            [`&.${buttonClasses.contained}.${buttonClasses.colorInfo}`]: {
              backgroundColor: '#7B68EE',
            },
            [`&.${buttonClasses.contained}.${buttonClasses.colorWarning}`]: {
              backgroundColor: '#FFD700',
            },
            [`&.${buttonClasses.text}.${buttonClasses.colorSuccess}`]: {
              color: '#7CFC00',
            },
            [`&.${buttonClasses.text}.${buttonClasses.colorError}`]: {
              color: '#FF4500',
            },
            [`&.${buttonClasses.text}.${buttonClasses.colorInfo}`]: {
              color: '#7B68EE',
            },
            [`&.${buttonClasses.text}.${buttonClasses.colorWarning}`]: {
              color: '#FFD700',
            },
            [`&.${buttonClasses.outlined}.${buttonClasses.colorSuccess}`]: {
              color: '#7CFC00',
            },
            [`&.${buttonClasses.outlined}.${buttonClasses.colorError}`]: {
              color: '#FF4500',
            },
            [`&.${buttonClasses.outlined}.${buttonClasses.colorInfo}`]: {
              color: '#7B68EE',
            },
            [`&.${buttonClasses.outlined}.${buttonClasses.colorWarning}`]: {
              color: '#FFD700',
            },
          },
        },
      },
      MuiRadioGroup: {
        styleOverrides: {
          row: {
            justifyContent: 'space-between',
          },
        },
      },
      MuiTabScrollButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          vertical: {
            height: 32,
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            justifyContent: 'space-between',
          },
          container: {
            justifyContent: 'space-between',
          },
        },
      },
    },
  });
}

{
  createTheme(theme, {
    components: {
      MuiButton: {
        variants: [
          {
            props: {}, // match any props combination
            style: ({ theme: t }) => {
              return {
                fontFamily: t.typography.fontFamily,
              };
            },
          },
        ],
      },
    },
  } as ThemeOptions);
}

{
  createTheme({
    components: {
      MuiButton: {
        variants: [
          {
            props: {}, // match any props combination
            style: ({ theme: t }) => {
              return {
                fontFamily: t.typography.fontFamily,
              };
            },
          },
        ],
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  backdropFilter: 'none',
                },
              },
            ],
          },
          endIcon: ({ theme: t }) => ({
            backgroundColor: t.vars.palette.primary.main,
            variants: [
              {
                props: ({ ownerState }) => ownerState.color === 'primary',
                style: {},
              },
            ],
          }),
        },
      },
    },
  });
}

// props callback in variants
{
  createTheme({
    components: {
      MuiButton: {
        variants: [
          {
            props: (props) => props.color !== 'secondary',
            style: ({ theme: { palette } }) => ({
              backgroundColor: palette.grey[500],
            }),
          },
        ],
      },
    },
  });
}

{
  createTheme({
    shape: {
      borderRadius: '5px',
    },
  });
}

{
  createTheme({
    shape: {
      borderRadius: 8,
    },
  });
}

// CSS variables for shadow DOM
{
  createTheme({
    cssVariables: {
      rootSelector: ':host',
      colorSchemeSelector: 'class',
    },
  });
}

// Invalid variant
{
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          // @ts-expect-error invalid variant
          root: {
            variants: [
              {
                props: { variant: 'not-a-variant' },
                style: { border: 0 },
              },
            ],
          },
        },
      },
    },
  });
}

{
  createTheme({
    components: {
      MuiTablePaginationActions: {
        styleOverrides: {
          root: {
            color: 'red',
          },
        },
      },
    },
  });
}

{
  createTheme({
    components: {
      mergeClassNameAndStyle: true,
    },
  });
}

// focusVisible theme key
{
  createTheme({ focusVisible: true });
  createTheme({ focusVisible: { outlineColor: 'red', outlineWidth: 2, outlineOffset: 3 } });
  createTheme({ focusVisible: { outlineColor: 'red' } });
  createTheme({ focusVisible: { outlineStyle: 'dashed' } });
  createTheme({ focusVisible: { boxShadow: '0 0 0 4px #fff' } });
  createTheme({ focusVisible: { boxShadow: '0 0 0 4px #fff', outlineColor: 'transparent' } });
  createTheme({ focusVisible: false });
  createTheme({ focusVisible: undefined });

  // Resolved theme always exposes the merged object (never the boolean).
  const focusVisible: FocusVisible | false | undefined = theme.focusVisible;
  createTheme({ focusVisible });

  createTheme({
    // @ts-expect-error outlineWidth must be a number or string
    focusVisible: { outlineWidth: true },
  });

  createTheme({
    // @ts-expect-error focusVisible must be a boolean or a CSS properties object
    focusVisible: 'solid',
  });
}

// `theme.vars.zIndex`, `theme.vars.opacity` and the action opacities are typed as CSS variable strings
{
  const varsTheme = createTheme({ cssVariables: true });
  const zIndexVar: string = varsTheme.vars.zIndex.appBar;
  const opacityVar: string = varsTheme.vars.opacity.inputPlaceholder;
  const hoverOpacityVar: string = varsTheme.vars.palette.action.hoverOpacity;
  // Non-opacity action colors are unchanged
  const activeColor: string = varsTheme.vars.palette.action.active;
}
