export default function shouldSkipGeneratingVar(keys: string[]) {
  return (
    keys[0] === 'motion' ||
    // Keep `focusVisible` inline: its box-shadow references `--_focusVisible-shadow`, which colored
    // surfaces set on their subtree. Hoisted to a `:root` var it resolves where that var is unset.
    keys[0] === 'focusVisible' ||
    keys[0] === 'unstable_focusVisibleInsetOverrides' ||
    !!keys[0].match(
      /(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/,
    ) ||
    !!keys[0].match(/sxConfig$/) || // ends with sxConfig
    (keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/))
  );
}
