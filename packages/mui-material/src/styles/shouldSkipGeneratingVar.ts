export default function shouldSkipGeneratingVar(keys: string[]) {
  return (
    keys[0] === 'motion' ||
    // Keep `focusVisible` inline: its values reference the per-component private vars
    // (`--_focusVisible-offset`/`-behavior`). Hoisted to a `:root` var they resolve where those
    // vars are unset, silently breaking the inner-ring inset.
    keys[0] === 'focusVisible' ||
    !!keys[0].match(
      /(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/,
    ) ||
    !!keys[0].match(/sxConfig$/) || // ends with sxConfig
    (keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/))
  );
}
