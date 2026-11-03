const classes = [
  {
    deprecatedClass: ' .MuiCircularProgress-circleDeterminate',
    replacementSelector: '.MuiCircularProgress-determinate .MuiCircularProgress-circle',
  },
  {
    deprecatedClass: ' .MuiCircularProgress-circleIndeterminate',
    replacementSelector: '.MuiCircularProgress-indeterminate .MuiCircularProgress-circle',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated CircularProgress classes with new classes`,
    Rule(rule) {
      const { selector } = rule;

      classes.forEach(({ deprecatedClass, replacementSelector }) => {
        const selectorRegex = new RegExp(`${deprecatedClass}$`);

        if (selector.match(selectorRegex)) {
          rule.selector = selector.replace(selectorRegex, replacementSelector);
        }
      });
    },
  };
};
plugin.postcss = true;

module.exports = {
  plugin,
  classes,
};
