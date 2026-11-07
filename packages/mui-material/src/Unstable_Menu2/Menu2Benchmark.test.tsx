import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import type { MenuProps } from '@mui/material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ClassicMenuHarnessProps extends Pick<
  MenuProps,
  'anchorOrigin' | 'transformOrigin' | 'variant' | 'dir'
> {
  withSelected?: boolean;
  triggerHeight?: number;
}

/**
 * Behavior benchmark: the classic `Menu` against the Base UI-backed successor,
 * from the user's perspective. It is the RFC's precondition for finalizing the
 * API shape -- every assertion here is a difference (or a parity) the design
 * phase has to accept or design around, so a failure means the benchmark needs
 * re-reading, not silencing.
 *
 * Both harnesses use a host `button` as the trigger so that ButtonBase's
 * focus-visible and ripple state updates -- which this benchmark does not
 * measure -- stay out of the measurements.
 */
function ClassicMenuHarness(props: ClassicMenuHarnessProps) {
  const { withSelected = false, triggerHeight, ...menuProps } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <div>
      <button
        type="button"
        style={{ height: triggerHeight }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        Options
      </button>
      <p data-testid="sibling">sibling content</p>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        {...menuProps}
      >
        <MenuItem>Alpha</MenuItem>
        <MenuItem disabled>Beta</MenuItem>
        <MenuItem selected={withSelected}>Gamma</MenuItem>
      </Menu>
    </div>
  );
}

function Menu2Harness() {
  return (
    <div>
      <Menu2>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Item>Alpha</Menu2Item>
          <Menu2Item disabled>Beta</Menu2Item>
          <Menu2Item>Gamma</Menu2Item>
        </Menu2Popup>
      </Menu2>
      <p data-testid="sibling">sibling content</p>
    </div>
  );
}

const menuEl = () => document.querySelector('[role="menu"]');
const openTrigger = () => screen.getByRole('button', { name: 'Options' });
const waitForOpen = () => waitFor(() => expect(menuEl()).not.to.equal(null));

// Both menus animate their surface by default, so geometry has to be read
// after the open transition settles. Awaiting `getAnimations()` alone is not
// enough: a CSS transition is absent from that list until it actually starts,
// so the call can return an empty list and let a mid-transition rect through,
// which reads as a small offset rather than an obvious failure.
async function waitForSettled() {
  await waitForOpen();
  const popup = menuEl()!.closest('.MuiPaper-root')!;
  if (typeof popup.getAnimations === 'function') {
    await act(async () => {
      await Promise.all(
        popup.getAnimations().map((animation) => animation.finished.catch(() => {})),
      );
    });
  }
  await waitFor(() => {
    const { transform, opacity } = window.getComputedStyle(popup);
    expect(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)').to.equal(true);
    expect(Number(opacity)).to.equal(1);
  });
}

describe.skipIf(isJsdom())('Menu behavior benchmark: classic vs Menu2', () => {
  const { render } = createRenderer();

  describe('opening', () => {
    it('classic needs the trigger wired by hand; Menu2 opens from the keyboard', async () => {
      const { user } = render(<ClassicMenuHarness />);
      openTrigger().focus();
      await user.keyboard('{ArrowDown}');
      // The classic Menu has no trigger part: an anchor button only opens it
      // through whatever the consumer wired to onClick.
      expect(menuEl()).to.equal(null);
    });

    it('Menu2 opens on ArrowDown from its trigger', async () => {
      const { user } = render(<Menu2Harness />);
      openTrigger().focus();
      await user.keyboard('{ArrowDown}');
      await waitForOpen();
      expect(menuEl()).not.to.equal(null);
    });
  });

  describe('initial focus', () => {
    it('classic highlights an item as soon as it opens', async () => {
      const { user } = render(<ClassicMenuHarness withSelected />);
      await user.click(openTrigger());
      await waitForOpen();
      // `variant="selectedMenu"` is the classic default: the selected item is
      // focused, and without one the first item is.
      expect(screen.getByRole('menuitem', { name: 'Gamma' })).toHaveFocus();
    });

    ['Enter', 'Space', 'ArrowDown', 'ArrowUp'].forEach((key) => {
      it(`Menu2 skips disabled items on ${key} opening but keeps them focusable`, async () => {
        const { user } = render(
          <Menu2>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup>
              <Menu2Item disabled>Unavailable first</Menu2Item>
              <Menu2Item>Alpha</Menu2Item>
              <Menu2Item>Gamma</Menu2Item>
              <Menu2Item disabled>Unavailable last</Menu2Item>
            </Menu2Popup>
          </Menu2>,
        );
        openTrigger().focus();
        await user.keyboard(`[${key}]`);
        await waitForOpen();

        const opensAtEnd = key === 'ArrowUp';
        await waitFor(() =>
          expect(
            screen.getByRole('menuitem', { name: opensAtEnd ? 'Gamma' : 'Alpha' }),
          ).toHaveFocus(),
        );

        await user.keyboard(opensAtEnd ? '{ArrowDown}' : '{ArrowUp}');
        await waitFor(() =>
          expect(
            screen.getByRole('menuitem', {
              name: opensAtEnd ? 'Unavailable last' : 'Unavailable first',
            }),
          ).toHaveFocus(),
        );
      });
    });

    it('Menu2 highlights nothing when opened by pointer', async () => {
      const { user } = render(<Menu2Harness />);
      await user.click(openTrigger());
      await waitForOpen();
      // Focus settles on the popup itself, so Enter cannot activate an item the
      // user never chose. This is the one initial-focus divergence, and it only
      // applies to pointer-opened menus.
      await waitFor(() => expect(menuEl()).toHaveFocus());
      expect(screen.getByRole('menuitem', { name: 'Gamma' })).not.toHaveFocus();
    });
  });

  describe('current-value menus', () => {
    it('classic highlights the selected item, which is what variant="selectedMenu" buys', async () => {
      const { user } = render(<ClassicMenuHarness withSelected />);
      await user.click(openTrigger());
      await waitForOpen();
      expect(screen.getByRole('menuitem', { name: 'Gamma' })).toHaveFocus();
    });

    it('the successor highlights the first enabled item on ArrowDown, not the checked one', async () => {
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup>
            <Menu2RadioGroup defaultValue="200">
              <Menu2RadioItem disabled value="50">
                50%
              </Menu2RadioItem>
              <Menu2RadioItem value="100">100%</Menu2RadioItem>
              <Menu2RadioItem value="200">200%</Menu2RadioItem>
            </Menu2RadioGroup>
          </Menu2Popup>
        </Menu2>,
      );
      openTrigger().focus();
      await user.keyboard('{ArrowDown}');
      await waitForOpen();

      // Radio items are the accessible way to express "current value", but Base UI
      // still starts navigation at the first enabled item: there is no public API to open
      // with the checked item highlighted. This is the capability that
      // `variant="selectedMenu"` provided and that the successor cannot reproduce.
      await waitFor(() =>
        expect(screen.getByRole('menuitemradio', { name: '100%' })).toHaveFocus(),
      );
      expect(screen.getByRole('menuitemradio', { name: '200%' })).to.have.attribute(
        'aria-checked',
        'true',
      );
    });
  });

  describe('disabled items', () => {
    it('classic never lets a disabled item take focus', async () => {
      const { user } = render(<ClassicMenuHarness />);
      await user.click(openTrigger());
      await waitForOpen();

      const disabled = screen.getByRole('menuitem', { name: 'Beta' });
      // Walk the whole list twice over; classic hops over disabled entries.
      for (let step = 0; step < 4; step += 1) {
        // eslint-disable-next-line no-await-in-loop
        await user.keyboard('{ArrowDown}');
        expect(disabled).not.toHaveFocus();
      }
    });

    it('Menu2 keeps disabled items focusable, per the WAI-ARIA menu pattern', async () => {
      const { user } = render(<Menu2Harness />);
      await user.click(openTrigger());
      await waitForOpen();

      const disabled = screen.getByRole('menuitem', { name: 'Beta' });
      const focused: boolean[] = [];
      for (let step = 0; step < 3; step += 1) {
        // eslint-disable-next-line no-await-in-loop
        await user.keyboard('{ArrowDown}');
        focused.push(disabled === document.activeElement);
      }
      expect(focused.some(Boolean), 'the disabled item takes focus while navigating').to.equal(
        true,
      );
    });
  });

  describe('dismissal', () => {
    it('both restore focus to the trigger on Escape', async () => {
      const { user: classicUser, unmount: unmountClassic } = render(<ClassicMenuHarness />);
      const classicTrigger = openTrigger();
      await classicUser.click(classicTrigger);
      await waitForOpen();
      await classicUser.keyboard('{Escape}');
      await waitFor(() => expect(menuEl()).to.equal(null));
      expect(classicTrigger).toHaveFocus();
      unmountClassic();

      const { user: successorUser } = render(<Menu2Harness />);
      const successorTrigger = openTrigger();
      await successorUser.click(successorTrigger);
      await waitForOpen();
      await successorUser.keyboard('{Escape}');
      await waitFor(() => expect(menuEl()).to.equal(null));
      expect(successorTrigger).toHaveFocus();
    });

    it('both close on Tab, but classic keeps focus on the trigger', async () => {
      const { user: classicUser, unmount: unmountClassic } = render(<ClassicMenuHarness />);
      const classicTrigger = openTrigger();
      await classicUser.click(classicTrigger);
      await waitForOpen();
      await classicUser.tab();
      // The classic Menu closes on Tab (`onClose` reason `tabKeyDown`); the
      // element lingers only while the Grow transition plays out.
      await waitFor(() => expect(menuEl()).to.equal(null));
      // It also calls preventDefault, so focus returns to the trigger instead
      // of advancing through the tab sequence.
      expect(classicTrigger).toHaveFocus();
      unmountClassic();

      const { user: successorUser } = render(
        <React.Fragment>
          <Menu2Harness />
          <button type="button" data-testid="next">
            Next
          </button>
        </React.Fragment>,
      );
      await successorUser.click(openTrigger());
      await waitForOpen();
      // A Tab before the menu takes focus ends in the menu, so wait for that focus first.
      await waitFor(() => expect(menuEl()).toHaveFocus());
      await successorUser.tab();
      await waitFor(() => expect(menuEl()).to.equal(null));
      // The successor lets the Tab through, so focus advances as the user asked.
      expect(screen.getByTestId('next')).toHaveFocus();
    });
  });

  describe('page treatment while open', () => {
    it('both lock body scrolling in their default modal state', async () => {
      const { user: classicUser, unmount: unmountClassic } = render(<ClassicMenuHarness />);
      await classicUser.click(openTrigger());
      await waitForOpen();
      expect(window.getComputedStyle(document.body).overflow).to.equal('hidden');
      unmountClassic();

      const { user: successorUser } = render(<Menu2Harness />);
      await successorUser.click(openTrigger());
      await waitForOpen();
      expect(window.getComputedStyle(document.body).overflow).to.equal('hidden');
    });

    it('classic renders a backdrop and hides siblings; Menu2 does neither', async () => {
      const { user: classicUser, unmount: unmountClassic } = render(<ClassicMenuHarness />);
      await classicUser.click(openTrigger());
      await waitForOpen();
      expect(document.querySelector('.MuiBackdrop-root')).not.to.equal(null);
      expect(
        screen.getByTestId('sibling').closest('[aria-hidden="true"]'),
        'classic marks sibling content aria-hidden',
      ).not.to.equal(null);
      unmountClassic();

      const { user: successorUser } = render(<Menu2Harness />);
      await successorUser.click(openTrigger());
      await waitForOpen();
      expect(document.querySelector('.MuiBackdrop-root')).to.equal(null);
      expect(
        screen.getByTestId('sibling').closest('[aria-hidden="true"]'),
        'Menu2 leaves sibling content in the accessibility tree',
      ).to.equal(null);
    });
  });

  describe('placement', () => {
    (['ltr', 'rtl'] as const).forEach((direction) => {
      [36, 64].forEach((triggerHeight) => {
        it(`matches classic top-left origins in ${direction} with a ${triggerHeight}px trigger`, async () => {
          const theme = createTheme({ direction });
          const origin = { vertical: 'top', horizontal: 'left' } as const;
          const layout = { marginLeft: 200, marginTop: 200 };
          const { user: classicUser, unmount: unmountClassic } = render(
            <ThemeProvider theme={theme}>
              <div style={layout}>
                <ClassicMenuHarness
                  dir={direction}
                  triggerHeight={triggerHeight}
                  anchorOrigin={origin}
                  transformOrigin={origin}
                />
              </div>
            </ThemeProvider>,
          );
          const classicAnchor = openTrigger().getBoundingClientRect();
          await classicUser.click(openTrigger());
          await waitForSettled();
          const classicSurface = document.querySelector('.MuiPaper-root')!.getBoundingClientRect();
          expect(classicSurface.left).to.be.closeTo(classicAnchor.left, 1);
          expect(classicSurface.top).to.be.closeTo(classicAnchor.top, 1);
          unmountClassic();

          const { user } = render(
            <ThemeProvider theme={theme}>
              <div style={layout}>
                <Menu2>
                  <Menu2Trigger
                    render={
                      <button type="button" style={{ height: triggerHeight }}>
                        Options
                      </button>
                    }
                  />
                  <Menu2Popup
                    dir={direction}
                    side="bottom"
                    align={direction === 'rtl' ? 'end' : 'start'}
                    sideOffset={({ anchor }) => -anchor.height}
                  >
                    <Menu2Item>Alpha</Menu2Item>
                    <Menu2Item disabled>Beta</Menu2Item>
                    <Menu2Item>Gamma</Menu2Item>
                  </Menu2Popup>
                </Menu2>
              </div>
            </ThemeProvider>,
          );
          const anchor = openTrigger().getBoundingClientRect();
          await user.click(openTrigger());
          await waitForSettled();
          const surface = menuEl()!.getBoundingClientRect();
          expect(surface.left).to.be.closeTo(anchor.left, 1);
          expect(surface.top).to.be.closeTo(anchor.top, 1);
        });
      });
    });

    it('both put the surface flush under the trigger, left aligned', async () => {
      // Classic defaults to anchorOrigin bottom/left; the successor defaults to
      // side="bottom" align="start". Keep the trigger away from the viewport
      // edges so neither is nudged by collision handling.
      const offscreenSafe = { marginLeft: 200, marginTop: 200 };

      const { user: classicUser, unmount: unmountClassic } = render(
        <div style={offscreenSafe}>
          <ClassicMenuHarness />
        </div>,
      );
      const classicAnchor = openTrigger().getBoundingClientRect();
      await classicUser.click(openTrigger());
      await waitForSettled();
      const classicSurface = document.querySelector('.MuiPaper-root')!.getBoundingClientRect();
      expect(Math.round(classicSurface.left)).to.equal(Math.round(classicAnchor.left));
      expect(Math.round(classicSurface.top)).to.equal(Math.round(classicAnchor.bottom));
      unmountClassic();

      const { user: successorUser } = render(
        <div style={offscreenSafe}>
          <Menu2Harness />
        </div>,
      );
      const successorAnchor = openTrigger().getBoundingClientRect();
      await successorUser.click(openTrigger());
      await waitForSettled();
      const successorSurface = document.querySelector('.MuiPaper-root')!.getBoundingClientRect();
      expect(Math.round(successorSurface.left)).to.equal(Math.round(successorAnchor.left));
      expect(Math.round(successorSurface.top)).to.equal(Math.round(successorAnchor.bottom));
    });
  });
});
