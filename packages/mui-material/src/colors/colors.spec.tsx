import type { Color, colors } from '@mui/material';

type KeysEquivalent<T, U> = keyof T extends keyof U
  ? keyof U extends keyof T
    ? true
    : false
  : false;

function colorTypeMatches(variants: keyof Color) {
  // Checking that each color has the exact shape as Color
  // we don't use the Color type for these to provide JSDoc for each color
  // in which we preview the color
  const amber: KeysEquivalent<Color, typeof colors.amber> = true;
  const blue: KeysEquivalent<Color, typeof colors.blue> = true;
  const blueGrey: KeysEquivalent<Color, typeof colors.blueGrey> = true;
  const brown: KeysEquivalent<Color, typeof colors.brown> = true;
  // common does not have the `Common` type (nice pun)
  // const common: KeysEquivalent<Color, typeof colors.common> = true;
  const cyan: KeysEquivalent<Color, typeof colors.cyan> = true;
  const deepOrange: KeysEquivalent<Color, typeof colors.deepOrange> = true;
  const deepPurple: KeysEquivalent<Color, typeof colors.deepPurple> = true;
  const green: KeysEquivalent<Color, typeof colors.green> = true;
  const grey: KeysEquivalent<Color, typeof colors.grey> = true;
  const indigo: KeysEquivalent<Color, typeof colors.indigo> = true;
  const lightBlue: KeysEquivalent<Color, typeof colors.lightBlue> = true;
  const lightGreen: KeysEquivalent<Color, typeof colors.lightGreen> = true;
  const lime: KeysEquivalent<Color, typeof colors.lime> = true;
  const orange: KeysEquivalent<Color, typeof colors.orange> = true;
  const pink: KeysEquivalent<Color, typeof colors.pink> = true;
  const purple: KeysEquivalent<Color, typeof colors.purple> = true;
  const red: KeysEquivalent<Color, typeof colors.red> = true;
  const teal: KeysEquivalent<Color, typeof colors.teal> = true;
  const yellow: KeysEquivalent<Color, typeof colors.yellow> = true;
}
