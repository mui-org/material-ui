import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '../styles';
import Menu2 from './Menu2';
import Menu2Item from '../Unstable_Menu2Item';

describe.skipIf(isJsdom())('Menu2 animation origin', () => {
  const { render } = createRenderer();

  for (const direction of ['ltr', 'rtl'] as const) {
    for (const align of ['start', 'end'] as const) {
      for (const flip of [false, true]) {
        it(`uses the aligned edge for ${direction} ${align}, flip=${flip}`, async () => {
          const completed = vi.fn();
          const { user } = render(
            <ThemeProvider theme={createTheme({ direction })}>
              <Menu2 onOpenChangeComplete={completed}>
                <Menu2Trigger
                  render={
                    <button
                      type="button"
                      style={{
                        position: 'fixed',
                        left: 240,
                        ...(flip ? { bottom: 16 } : { top: 100 }),
                        width: 80,
                        height: 32,
                      }}
                    >
                      Options
                    </button>
                  }
                />
                <Menu2Popup
                  align={align}
                  side="bottom"
                  sideOffset={8}
                  transitionDuration={300}
                  slotProps={{ portal: { dir: direction }, root: { sx: { width: 200 } } }}
                >
                  <Menu2Item>Item</Menu2Item>
                  <Menu2Item>Another item</Menu2Item>
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>,
          );
          const trigger = screen.getByRole('button', { name: 'Options' });
          await user.click(trigger);
          const popup = await screen.findByRole('menu');
          await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
          expect(popup).to.have.attribute('data-side', flip ? 'top' : 'bottom');
          expect(popup).to.have.attribute('data-align', align);

          const anchorRect = trigger.getBoundingClientRect();
          // The positioner does not scale with Grow. Its bounds give the final placement.
          const positionerRect = popup.parentElement!.getBoundingClientRect();
          const alignsLeft = (align === 'start') === (direction === 'ltr');
          expect(positionerRect[alignsLeft ? 'left' : 'right']).to.be.closeTo(
            anchorRect[alignsLeft ? 'left' : 'right'],
            1,
          );
          expect(
            flip ? anchorRect.top - positionerRect.bottom : positionerRect.top - anchorRect.bottom,
          ).to.be.closeTo(8, 1);

          // Base UI uses the aligned popup edge when there is no arrow or collision shift.
          const expectedX = alignsLeft ? 0 : positionerRect.width;
          const expectedY = (flip ? anchorRect.top : anchorRect.bottom) - positionerRect.top;
          const expectOrigin = () => {
            const [x, y] = getComputedStyle(popup).transformOrigin.split(' ').map(parseFloat);
            expect(x).to.be.closeTo(expectedX, 1);
            expect(y).to.be.closeTo(expectedY, 1);
          };

          expectOrigin();
          await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
          expectOrigin();
          completed.mockClear();
          await user.keyboard('{Escape}');
          await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
          expectOrigin();
          await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
        });
      }
    }
  }
});
