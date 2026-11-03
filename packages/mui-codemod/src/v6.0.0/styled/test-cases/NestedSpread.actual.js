const Component = styled('div')(({ theme, ownerState }) => {
  const palette = (theme.vars || theme).palette?.[ownerState.color];
  return {
    overflow: 'visible', // Explicitly set the default value to solve a bug on IE 11.
    color: (theme.vars || theme).palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    ...(!ownerState.disableRipple && {
      '&:hover': {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
          : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    }),
    ...(ownerState.edge === 'start' && {
      marginLeft: ownerState.size === 'small' ? -3 : -12,
    }),
    ...(ownerState.edge === 'end' && {
      marginRight: ownerState.size === 'small' ? -3 : -12,
    }),
    ...(ownerState.color !== 'inherit' &&
      ownerState.color !== 'default' && {
        color: palette?.main,
        ...(!ownerState.disableRipple && {
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
        }),
      }),
  };
});
