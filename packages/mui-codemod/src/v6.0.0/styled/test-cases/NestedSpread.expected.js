const Component = styled('div')(({
  theme
}) => {
  const palette = (theme.vars || theme).palette?.[ownerState.color];
  return {
    // Explicitly set the default value to solve a bug on IE 11.
    overflow: 'visible',
    color: (theme.vars || theme).palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [{
      props: (
        {
          ownerState
        }
      ) => !ownerState.disableRipple,
      style: {
        '&:hover': {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
            : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
      }
    }, {
      props: {
        edge: 'start'
      },
      style: {
        marginLeft: -12,
      }
    }, {
      props: {
        edge: 'start',
        size: 'small'
      },
      style: {
        marginLeft: -3
      }
    }, {
      props: {
        edge: 'end'
      },
      style: {
        marginRight: -12,
      }
    }, {
      props: {
        edge: 'end',
        size: 'small'
      },
      style: {
        marginRight: -3
      }
    }, {
      props: (
        {
          ownerState
        }
      ) => ownerState.color !== 'inherit' &&
        ownerState.color !== 'default',
      style: {
        color: palette?.main
      }
    }, {
      props: (
        {
          ownerState
        }
      ) => ownerState.color !== 'inherit' &&
        ownerState.color !== 'default' && !ownerState.disableRipple,
      style: {
        '&:hover': {
          // The codemod won't handle this case when the variable is not declared in the style argument.
          // In this case, the `palette` create a new variable in the style argument.
          ...(palette && {
            backgroundColor: theme.vars
              ? `rgba(${palette.mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
              : alpha(palette.main, theme.palette.action.hoverOpacity),
          }),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
      }
    }]
  };
});
