function getReducedMotionStyles(theme, transition) {
  return {
    transition: theme.motion.reducedMotion === 'always' ? 'none' : transition,
    '@media (prefers-reduced-motion: reduce)': {
      transition:
        theme.motion.reducedMotion === 'always' ||
        theme.motion.reducedMotion === 'system'
          ? 'none'
          : transition,
    },
  };
}

export default function mixins(isExpanded, property) {
  return (theme) =>
    getReducedMotionStyles(
      theme,
      theme.transitions.create(property, {
        easing: theme.transitions.easing.sharp,
        duration: isExpanded
          ? theme.transitions.duration.enteringScreen
          : theme.transitions.duration.leavingScreen,
      }),
    );
}
