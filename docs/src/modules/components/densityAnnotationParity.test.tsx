import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { createRenderer, ignoreActWarnings, isJsdom } from '@mui/internal-test-utils';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  DENSITY_SCALE,
  DENSITY_STAGE_SX,
  DENSITY_TARGETS,
  DENSITY_THEME,
  resolveClaims,
} from 'docs/data/material/experimental-api/enhance-density/densityAnnotations';
import type {
  AnnotateItem,
  AnnotateSource,
  Claim,
} from 'docs/data/material/experimental-api/enhance-density/densityAnnotations';
import { DENSITY_COMPONENTS } from 'docs/data/material/experimental-api/enhance-density/densityComponents';
import type { ControlValue } from 'docs/data/material/experimental-api/enhance-density/densityComponents';
import { annotationsFor } from 'docs/data/material/experimental-api/enhance-density/densityAnnotationSpecs';

type State = Record<string, ControlValue>;

const SCALE: Record<string, number> = { ...DENSITY_SCALE, ...DENSITY_TARGETS };
const TOLERANCE = 0.15;

/** Evaluates `+ - * × /`, parentheses, `min()`/`max()`, px numbers, `<n>lh`, `<n>em` and scale names. */
function evaluateToken(
  token: string,
  { lineHeight, fontSize }: Pick<AnnotateSource, 'lineHeight' | 'fontSize'>,
): number {
  const parts = token.match(/\d*\.?\d+(?:px|lh|em)?|[a-zA-Z]+|[-+*×/(),]/g) ?? [];
  if (parts.join('') !== token.replace(/\s/g, '')) {
    throw new Error(`cannot evaluate ${token}`);
  }
  let index = 0;
  const atom = (): number => {
    const part = parts[index];
    index += 1;
    if (part === '(') {
      const value = sum();
      if (parts[index] !== ')') {
        throw new Error(`unbalanced parentheses in ${token}`);
      }
      index += 1;
      return value;
    }
    if (part === '-') {
      return -atom();
    }
    if ((part === 'min' || part === 'max') && parts[index] === '(') {
      index += 1;
      const args = [sum()];
      while (parts[index] === ',') {
        index += 1;
        args.push(sum());
      }
      if (parts[index] !== ')') {
        throw new Error(`unbalanced parentheses in ${token}`);
      }
      index += 1;
      return part === 'min' ? Math.min(...args) : Math.max(...args);
    }
    if (part !== undefined && /^\d*\.?\d+em$/.test(part)) {
      return parseFloat(part) * fontSize;
    }
    if (part?.endsWith('lh')) {
      if (Number.isNaN(lineHeight)) {
        throw new Error(`no line height for ${token}`);
      }
      return parseFloat(part) * lineHeight;
    }
    if (part !== undefined && /^\d|^\./.test(part)) {
      return parseFloat(part);
    }
    if (part !== undefined && Object.prototype.hasOwnProperty.call(SCALE, part)) {
      return SCALE[part];
    }
    throw new Error(`cannot evaluate "${part}" in ${token}`);
  };
  const product = (): number => {
    let value = atom();
    while (['*', '×', '/'].includes(parts[index])) {
      const operator = parts[index];
      index += 1;
      value = operator === '/' ? value / atom() : value * atom();
    }
    return value;
  };
  function sum(): number {
    let value = product();
    while (parts[index] === '+' || parts[index] === '-') {
      const operator = parts[index];
      index += 1;
      value = operator === '+' ? value + product() : value - product();
    }
    return value;
  }
  const value = sum();
  if (index !== parts.length) {
    throw new Error(`cannot evaluate ${token}`);
  }
  return value;
}

function toolbarStates(family: string): State[] {
  return (DENSITY_COMPONENTS[family].controls ?? []).reduce<State[]>(
    (states, control) =>
      states.flatMap((state) =>
        (control.type === 'select' ? control.options! : [false, true]).map((option) => ({
          ...state,
          [control.prop]: option,
        })),
      ),
    [{}],
  );
}

/** Resolves once every claim drew and the values held for two frames. */
async function settledItems(claims: Claim[]): Promise<AnnotateItem[]> {
  await document.fonts.ready;
  const stage = document.querySelector('[data-stage]') as HTMLElement;
  const demo = document.querySelector('[data-demo]') as HTMLElement;
  const isComplete = (items: AnnotateItem[]) =>
    claims.every((claim) => items.some((item) => item.source.claim === claim));
  let previous = '';
  let items: AnnotateItem[] = [];
  for (let frame = 0; frame < 120; frame += 1) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise(requestAnimationFrame);
    const current = resolveClaims(stage, demo, claims).items;
    const key = JSON.stringify(current.map((item) => item.source.value));
    if (isComplete(current) && key === previous) {
      return current;
    }
    previous = key;
    items = current;
  }
  return items;
}

function mismatchesOf(claims: Claim[], items: AnnotateItem[]) {
  const mismatches: string[] = [];
  claims.forEach((claim) => {
    const drawn = items.filter((item) => item.source.claim === claim);
    if (drawn.length === 0) {
      mismatches.push(`${claim.on} ${claim.aspect}: nothing drawn`);
      return;
    }
    const { token } = claim;
    if (token === undefined) {
      return;
    }
    const shown = claim.text ?? token;
    drawn.forEach(({ label, source }) => {
      if (!label.startsWith(shown)) {
        mismatches.push(`${claim.on} ${claim.aspect}: label "${label}" omits "${shown}"`);
        return;
      }
      try {
        const expected = evaluateToken(token, source);
        if (Math.abs(expected - source.value) > TOLERANCE) {
          mismatches.push(
            `${claim.on} ${claim.aspect}: "${token}" measures ${source.value}px but evaluates to ${expected}px`,
          );
        }
      } catch (error) {
        mismatches.push(`${claim.on} ${claim.aspect}: ${(error as Error).message}`);
      }
    });
  });
  return mismatches;
}

describe.skipIf(isJsdom())('density annotation parity', () => {
  const { render } = createRenderer();

  Object.keys(DENSITY_COMPONENTS).forEach((family) => {
    test(`${family} tokens equal the values they label`, async () => {
      ignoreActWarnings();
      const view = (state: State) => (
        <React.Fragment>
          <CssBaseline />
          <Box data-stage sx={DENSITY_STAGE_SX}>
            <Box data-demo sx={{ display: 'contents' }}>
              <ThemeProvider theme={DENSITY_THEME}>
                {DENSITY_COMPONENTS[family].render(state)}
              </ThemeProvider>
            </Box>
          </Box>
        </React.Fragment>
      );
      const states = toolbarStates(family);
      const { setProps } = render(view(states[0]));
      const mismatches: string[] = [];
      let tokens = 0;

      for (const state of states) {
        setProps({ children: view(state).props.children });
        const claims = annotationsFor(family, state);
        tokens += claims.filter((claim) => claim.token !== undefined).length;
        // eslint-disable-next-line no-await-in-loop
        const items = await settledItems(claims);
        const where =
          Object.entries(state)
            .map(([prop, value]) => `${prop}=${value}`)
            .join(' ') || 'default';
        mismatchesOf(claims, items).forEach((mismatch) => {
          mismatches.push(`${where}: ${mismatch}`);
        });
      }

      expect(mismatches).to.deep.equal([]);
      expect(tokens, 'no claim carries a token').to.be.greaterThan(0);
    });
  });
});
