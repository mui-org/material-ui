import { createTheme, unstable_enhanceDensity as enhanceDensity } from '@mui/material/styles';

// Keys, negated keys, numbers, raw CSS and mixed args all type-check on
// theme.spacing() — with or without a density preset applied — and return string.
function takesString(value: string) {
  return value;
}
const theme = createTheme();
takesString(theme.spacing('small'));
takesString(theme.spacing('-xSmall'));
takesString(theme.spacing('xLarge', 2));
takesString(theme.spacing(1, 'auto'));
// raw CSS stays first-class — unregistered strings pass through by design
takesString(theme.spacing('12px'));
takesString(theme.spacing('small', 2, 'auto', '3px'));

// The scale is closed: every key of the override object must be one the
// enhancer already knows, so a misspelling is a compile error rather than a
// value that silently never reaches a component.
enhanceDensity(createTheme(), { spacing: { small: 8 }, touchTarget: 40, iconSize: 20 });
// @ts-expect-error — misspelled step
enhanceDensity(createTheme(), { spacing: { smal: 8 } });
// @ts-expect-error — the scale cannot be extended with new names
enhanceDensity(createTheme(), { huge: 64 });

function takesOptionalString(value: string | undefined) {
  return value;
}
// `enhanceDensity` resolves them, so its result reads them as plain strings.
takesString(enhanceDensity(createTheme()).iconSize);
// @ts-expect-error — not a theme member; the scale keys stay on theme.spacing()
takesOptionalString((theme.vars || theme).xxSmall);
