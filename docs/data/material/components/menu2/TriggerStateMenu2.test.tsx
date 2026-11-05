import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { act, createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TriggerStateMenu2 from './demos/trigger-state/TriggerStateMenu2';

describe('Menu2 trigger state demo', () => {
  const { render } = createRenderer();

  function renderDemo(reducedMotion: 'never' | 'always' = 'never') {
    const theme = createTheme({
      motion: { reducedMotion },
      components: {
        MuiButtonBase: { defaultProps: { disableRipple: true } },
        MuiMenu2Popup: { defaultProps: { transitionDuration: 0 } },
      },
    });

    return render(
      <ThemeProvider theme={theme}>
        <TriggerStateMenu2 />
      </ThemeProvider>,
    );
  }

  function expectArrowRotation(arrow: HTMLElement, open: boolean) {
    // jsdom keeps the CSS function; browsers return the computed matrix.
    expect(
      open
        ? ['rotate(180deg)', 'matrix(-1, 0, 0, -1, 0, 0)']
        : ['rotate(0deg)', 'matrix(1, 0, 0, 1, 0, 0)'],
    ).to.include(getComputedStyle(arrow).transform);
  }

  it('rotates the arrow on opening and resets it after item selection', async () => {
    const { user } = renderDemo();
    const trigger = screen.getByRole('button', { name: 'Actions' });
    const arrow = screen.getByTestId('KeyboardArrowDownIcon');

    expect(trigger).to.have.attribute('aria-expanded', 'false');
    expect(arrow).to.have.attribute('aria-hidden', 'true');
    expect(getComputedStyle(arrow).transition).to.contain('transform');
    expectArrowRotation(arrow, false);

    await user.click(trigger);

    expect(await screen.findByRole('menu', { name: 'Actions' })).not.to.equal(null);
    expect(trigger).to.have.attribute('aria-expanded', 'true');
    await waitFor(() => expectArrowRotation(arrow, true));

    await user.click(screen.getByRole('menuitem', { name: 'Duplicate' }));

    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
    expect(trigger).to.have.attribute('aria-expanded', 'false');
    await waitFor(() => expectArrowRotation(arrow, false));
  });

  it.each(['{Enter}', '{ArrowDown}'])(
    'opens with %s and returns focus on Escape',
    async (key) => {
      const { user } = renderDemo();
      const trigger = screen.getByRole('button', { name: 'Actions' });

      await act(async () => trigger.focus());
      await user.keyboard(key);

      expect(await screen.findByRole('menu', { name: 'Actions' })).not.to.equal(
        null,
      );
      expect(trigger).to.have.attribute('aria-expanded', 'true');
      await waitFor(() =>
        expect(document.activeElement).to.equal(
          screen.getByRole('menuitem', { name: 'Edit' }),
        ),
      );

      await user.keyboard('{Escape}');

      await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
      await waitFor(() => expect(document.activeElement).to.equal(trigger));
      expect(trigger).to.have.attribute('aria-expanded', 'false');
    },
  );

  it('updates the arrow without a transition when reduced motion is always enabled', async () => {
    const { user } = renderDemo('always');
    const trigger = screen.getByRole('button', { name: 'Actions' });
    const arrow = screen.getByTestId('KeyboardArrowDownIcon');

    expect(getComputedStyle(arrow).transition).to.contain('none');
    expectArrowRotation(arrow, false);

    await user.click(trigger);

    expect(await screen.findByRole('menu', { name: 'Actions' })).not.to.equal(null);
    expect(getComputedStyle(arrow).transition).to.contain('none');
    expectArrowRotation(arrow, true);

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
    expectArrowRotation(arrow, false);
  });
});
