import type { Menu2PopupProps } from '@mui/material/Unstable_Menu2Popup';
import Menu2Popup, { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Menu2Item from '../Unstable_Menu2Item';
import { createTheme, ThemeProvider } from '../styles';
import Menu2 from './Menu2';

const CustomBackdrop = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { ownerState?: Menu2PopupProps }
>(function CustomBackdrop({ ownerState, ...props }, ref) {
  return <div {...props} ref={ref} data-testid="custom-backdrop" />;
});

describe('Menu2 backdrop opt-in', () => {
  const { render } = createRenderer();

  it('does not render a visual backdrop without slot configuration', () => {
    const { baseElement } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    expect(screen.getByRole('menu')).not.to.equal(null);
    expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(null);
  });

  it('does not resolve backdrop slot props when the slot is null', () => {
    const backdropProps = vi.fn(() => ({ 'data-testid': 'configured-backdrop' }));
    const { baseElement } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup
          anchor={document.body}
          slots={{ backdrop: null }}
          slotProps={{ backdrop: backdropProps }}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    expect(backdropProps).not.toHaveBeenCalled();
    expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(null);
    expect(screen.queryByTestId('configured-backdrop')).to.equal(null);
  });

  const themeConfigurations: Array<{
    name: string;
    props: Pick<Menu2PopupProps, 'slots' | 'slotProps'>;
  }> = [
    { name: 'custom slot', props: { slots: { backdrop: CustomBackdrop } } },
    { name: 'slot props', props: { slotProps: { backdrop: { className: 'theme-backdrop' } } } },
  ];

  themeConfigurations.forEach(({ name, props }) => {
    it(`can opt out of theme ${name} with a null slot`, async () => {
      function Test() {
        const [showBackdrop, setShowBackdrop] = React.useState(true);
        return (
          <ThemeProvider
            theme={createTheme({
              components: { MuiMenu2Popup: { defaultProps: props } },
            })}
          >
            <button type="button" onClick={() => setShowBackdrop(!showBackdrop)}>
              Toggle backdrop
            </button>
            <Menu2 open modal={false}>
              <Menu2Popup
                anchor={document.body}
                slots={showBackdrop ? undefined : { backdrop: null }}
              >
                <Menu2Item>Profile</Menu2Item>
              </Menu2Popup>
            </Menu2>
          </ThemeProvider>
        );
      }
      const { baseElement, user } = render(<Test />);
      const getBackdrop = () => baseElement.querySelector(`.${menu2PopupClasses.backdrop}`);

      expect(getBackdrop()).not.to.equal(null);
      if (name === 'slot props') {
        expect(getBackdrop()).to.have.class('theme-backdrop');
      }

      await user.click(screen.getByRole('button', { name: 'Toggle backdrop' }));
      expect(getBackdrop()).to.equal(null);
      expect(screen.getByRole('menu')).not.to.equal(null);

      await user.click(screen.getByRole('button', { name: 'Toggle backdrop' }));
      expect(getBackdrop()).not.to.equal(null);
    });
  });

  it('does not resolve theme slot props when a null slot overrides a theme component', () => {
    const backdropProps = vi.fn(() => ({ className: 'theme-backdrop' }));
    const { baseElement } = render(
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiMenu2Popup: {
              defaultProps: {
                slots: { backdrop: CustomBackdrop },
                slotProps: { backdrop: backdropProps },
              },
            },
          },
        })}
      >
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body} slots={{ backdrop: null }}>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    expect(backdropProps).not.toHaveBeenCalled();
    expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(null);
    expect(screen.queryByTestId('custom-backdrop')).to.equal(null);
  });

  it('renders the default backdrop with empty slot props', () => {
    const { baseElement } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body} slotProps={{ backdrop: {} }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const backdrop = baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)!;
    expect(backdrop).not.to.equal(null);
    expect(backdrop).to.have.attribute('role', 'presentation');
    expect(backdrop).to.have.attribute('data-open');
    expect(getComputedStyle(backdrop).pointerEvents).to.equal('none');
    expect(getComputedStyle(backdrop).backgroundColor).to.equal('rgba(0, 0, 0, 0)');
    expect(baseElement.querySelector('[backdrop]')).to.equal(null);
  });

  (
    [
      { name: 'default', component: undefined },
      { name: 'host', component: 'div' },
      { name: 'custom', component: CustomBackdrop },
    ] as const
  ).forEach(({ name, component }) => {
    it(`applies refs, classes, and slot props to an enabled ${name} backdrop`, () => {
      const backdropRef = React.createRef<HTMLDivElement>();
      const { baseElement, unmount } = render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup
            anchor={document.body}
            slots={{ backdrop: component }}
            slotProps={{
              backdrop: (ownerState) => ({
                ref: backdropRef,
                className: 'custom-backdrop-class',
                style: { backgroundColor: 'rgb(1, 2, 3)' },
                'data-side': ownerState.side,
              }),
            }}
          >
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );

      const backdrop = baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)!;
      expect(backdropRef.current).to.equal(backdrop);
      expect(backdrop).to.have.class('custom-backdrop-class');
      expect(backdrop).to.have.attribute('data-side', 'bottom');
      expect(backdrop).to.have.attribute('data-open');
      expect(getComputedStyle(backdrop).backgroundColor).to.equal('rgb(1, 2, 3)');
      expect(baseElement.querySelector('[backdrop]')).to.equal(null);
      unmount();
      expect(backdropRef.current).to.equal(null);
    });
  });
});

describe.skipIf(isJsdom())('Menu2 backdrop slots', () => {
  const { render } = createRenderer();

  it('keeps the visual backdrop click-through when the menu opens on hover', async () => {
    const changed = vi.fn();
    const { user, unmount } = render(
      <Menu2 onOpenChange={changed}>
        <Menu2Trigger openOnHover delay={0} render={<button type="button">Options</button>} />
        <Menu2Popup
          slotProps={{
            backdrop: { 'data-testid': 'backdrop', sx: { backgroundColor: 'rgb(0, 0, 0)' } },
          }}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    try {
      await user.hover(screen.getByRole('button', { name: 'Options' }));
      const popup = await screen.findByRole('menu');
      await waitFor(() => expect(popup).toHaveFocus());

      const backdrop = screen.getByTestId('backdrop');
      expect(getComputedStyle(backdrop).backgroundColor).to.equal('rgb(0, 0, 0)');
      expect(getComputedStyle(backdrop).pointerEvents).to.equal('none');

      changed.mockClear();
      await user.keyboard('{Escape}');
      expect(changed).toHaveBeenCalledExactlyOnceWith(
        false,
        expect.objectContaining({ reason: 'escape-key' }),
      );
      await waitFor(() => expect(screen.queryByTestId('backdrop')).to.equal(null));
      expect(screen.queryByRole('menu')).to.equal(null);
    } finally {
      unmount();
    }
  });

  ['default', 'host'].forEach((slot) => {
    it(`keeps the ${slot} backdrop in sync with a retained popup`, async () => {
      const completed = vi.fn();
      const { user, unmount } = render(
        <div style={{ paddingTop: 96 }}>
          <Menu2 onOpenChangeComplete={completed}>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup
              keepMounted
              transitionDuration={{ enter: 0, exit: 300 }}
              slots={slot === 'host' ? { backdrop: 'div' } : undefined}
              slotProps={{
                backdrop: {
                  'data-testid': 'backdrop',
                  sx: { opacity: 0.5 },
                  style: {
                    position: 'fixed',
                    inset: 0,
                    // Layers use local indices inside the shared root. The
                    // positioner follows this backdrop at the same index.
                    zIndex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    pointerEvents: 'auto',
                  },
                },
              }}
            >
              <Menu2Item>Profile</Menu2Item>
            </Menu2Popup>
          </Menu2>
        </div>,
      );

      try {
        const backdrop = screen.getByTestId('backdrop');
        expect(backdrop).not.to.have.attribute('sx');
        expect(backdrop).to.have.attribute('hidden');
        expect(backdrop).to.have.attribute('data-closed');
        expect(document.elementFromPoint(10, 10)).not.to.equal(backdrop);

        const trigger = screen.getByRole('button', { name: 'Options' });
        await user.click(trigger);
        const popup = await screen.findByRole('menu');
        await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
        expect(backdrop).not.to.have.attribute('hidden');
        expect(backdrop).to.have.attribute('data-open');
        expect(document.elementFromPoint(10, 10)).to.equal(backdrop);

        const item = screen.getByRole('menuitem', { name: 'Profile' }).getBoundingClientRect();
        expect(
          popup.contains(document.elementFromPoint(item.left + 8, item.top + item.height / 2)),
        ).to.equal(true);

        completed.mockClear();
        await user.keyboard('{Escape}');
        expect(backdrop).to.have.attribute('data-closed');
        expect(backdrop).to.have.attribute('data-ending-style');
        expect(backdrop).not.to.have.attribute('hidden');
        expect(popup.isConnected).to.equal(true);

        await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
        expect(backdrop).to.have.attribute('hidden');
        expect(backdrop).not.to.have.attribute('data-ending-style');
        expect(document.elementFromPoint(10, 10)).not.to.equal(backdrop);
        expect(popup.isConnected).to.equal(true);

        completed.mockClear();
        await user.click(trigger);
        await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
        expect(screen.getByTestId('backdrop')).to.equal(backdrop);
        expect(backdrop).not.to.have.attribute('hidden');
        expect(backdrop).to.have.attribute('data-open');
        expect(document.elementFromPoint(10, 10)).to.equal(backdrop);
      } finally {
        unmount();
      }
    });
  });

  it('keeps theme overrides and sx on the default backdrop', async () => {
    const { user, unmount } = render(
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiMenu2Popup: {
              styleOverrides: { backdrop: { backgroundColor: 'rgb(12, 34, 56)' } },
            },
          },
        })}
      >
        <Menu2>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup slotProps={{ backdrop: { 'data-testid': 'backdrop', sx: { opacity: 0.5 } } }}>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    try {
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const backdrop = await screen.findByTestId('backdrop');
      const styles = getComputedStyle(backdrop);
      expect(styles.backgroundColor).to.equal('rgb(12, 34, 56)');
      expect(styles.opacity).to.equal('0.5');
      expect(backdrop).not.to.have.attribute('sx');
      expect(backdrop).to.have.attribute('data-open');
    } finally {
      unmount();
    }
  });

  it('forwards slot props and state to a custom backdrop component', async () => {
    interface CustomBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
      ownerState?: Menu2PopupProps;
      label?: string;
    }

    const backdropRef = React.createRef<HTMLDivElement>();
    let receivedOwnerState: Menu2PopupProps | undefined;
    const CustomBackdrop = React.forwardRef<HTMLDivElement, CustomBackdropProps>(
      function CustomBackdrop({ ownerState, className, label, ...props }, ref) {
        receivedOwnerState = ownerState;

        return (
          <div
            {...props}
            ref={ref}
            className={`custom-backdrop ${className ?? ''}`}
            data-label={label}
          />
        );
      },
    );
    const { user, unmount } = render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup
          keepMounted
          side="top"
          slots={{ backdrop: CustomBackdrop }}
          slotProps={{
            backdrop: (ownerState) => ({
              'data-testid': 'backdrop',
              ref: backdropRef,
              className: 'slot-backdrop',
              style: { backgroundColor: 'rgb(1, 2, 3)' },
              label: ownerState.side,
            }),
          }}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    try {
      const backdrop = screen.getByTestId('backdrop');
      expect(backdropRef.current).to.equal(backdrop);
      expect(backdrop).to.have.class(menu2PopupClasses.backdrop);
      expect(backdrop).to.have.class('custom-backdrop');
      expect(backdrop).to.have.class('slot-backdrop');
      expect(backdrop).to.have.attribute('data-label', 'top');
      expect(getComputedStyle(backdrop).backgroundColor).to.equal('rgb(1, 2, 3)');
      expect(receivedOwnerState?.keepMounted).to.equal(true);
      expect(receivedOwnerState?.side).to.equal('top');
      expect(backdrop).not.to.have.attribute('ownerState');
      expect(backdrop).to.have.attribute('role', 'presentation');
      expect(backdrop).to.have.attribute('data-open');

      await user.keyboard('{Escape}');
      await waitFor(() => expect(backdrop).to.have.attribute('hidden'));
      expect(backdropRef.current).to.equal(backdrop);
    } finally {
      unmount();
    }
    expect(backdropRef.current).to.equal(null);
  });
});
