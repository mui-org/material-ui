import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses as classes,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

const CustomIndicator = styled('span')({});

describe('<Menu2SubmenuTrigger />', () => {
  const { render } = createRenderer();

  it('renders a decorative submenu indicator by default', () => {
    render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2Submenu>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    const indicator = trigger.querySelector(`.${classes.indicator}`);
    expect(indicator).not.to.equal(null);
    expect(indicator).to.have.attribute('aria-hidden', 'true');
    expect(indicator!.querySelector('svg')).not.to.equal(null);
  });

  describeConformance(<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Submenu>
              {node}
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) =>
      baseElement.querySelector('[role="menuitem"][aria-haspopup="menu"]'),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2SubmenuTrigger',
    testVariantProps: { dense: true },
    slots: {
      indicator: { expectedClassName: classes.indicator },
    },
    testDeepOverrides: { slotName: 'indicator', slotClassName: classes.indicator },
  }));

  (['ltr', 'rtl'] as const).forEach((direction) => {
    it(`uses the built-in arrow for ${direction}`, () => {
      render(
        <ThemeProvider theme={createTheme({ direction })}>
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body}>
              <Menu2Submenu>
                <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>
        </ThemeProvider>,
      );

      const indicator = screen
        .getByRole('menuitem', { name: 'More' })
        .querySelector(`.${classes.indicator}`)!;
      expect(indicator.querySelectorAll('svg')).to.have.length(1);
      expect(
        indicator.querySelector(
          `[data-testid="KeyboardArrow${direction === 'rtl' ? 'Left' : 'Right'}Icon"]`,
        ),
      ).not.to.equal(null);
    });

    [
      { name: 'default', indicator: undefined },
      { name: 'custom', indicator: CustomIndicator },
    ].forEach(({ name, indicator }) => {
      it(`does not mirror custom content in the ${name} indicator in ${direction}`, () => {
        render(
          <ThemeProvider theme={createTheme({ direction })}>
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body}>
                <Menu2Submenu>
                  <Menu2SubmenuTrigger
                    slots={{ indicator }}
                    slotProps={{ indicator: { children: <span>More →</span> } }}
                  >
                    More
                  </Menu2SubmenuTrigger>
                  <Menu2SubmenuPopup>
                    <Menu2Item>Nested</Menu2Item>
                  </Menu2SubmenuPopup>
                </Menu2Submenu>
              </Menu2Popup>
            </Menu2>
          </ThemeProvider>,
        );

        const target = screen
          .getByRole('menuitem', { name: 'More' })
          .querySelector(`.${classes.indicator}`)!;
        expect(target).to.have.text('More →');
        expect(target.querySelector('svg')).to.equal(null);
        expect(['', 'none']).to.include(getComputedStyle(target).transform);
        expect(['', 'none']).to.include(getComputedStyle(target.firstElementChild!).transform);
      });
    });
  });

  it.skipIf(isJsdom())('aligns the indicator at the trailing edge', () => {
    render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body} slots={{ transition: null }}>
          <Menu2Submenu>
            <Menu2SubmenuTrigger sx={{ width: 240 }}>
              <span data-testid="label">More</span>
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    const indicator = trigger.querySelector(`.${classes.indicator}`)!;
    const triggerRect = trigger.getBoundingClientRect();
    const iconRect = indicator.querySelector('svg')!.getBoundingClientRect();
    const labelRect = screen.getByTestId('label').getBoundingClientRect();
    expect(triggerRect.right - iconRect.right).to.be.closeTo(16, 0.1);
    expect(iconRect.left - labelRect.right).to.be.greaterThan(8);
  });

  it('can replace the icon or hide the indicator', () => {
    render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2Submenu>
            <Menu2SubmenuTrigger slotProps={{ indicator: { children: <span>+</span> } }}>
              Custom
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
          <Menu2Submenu>
            <Menu2SubmenuTrigger slots={{ indicator: null }}>Hidden</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );
    const custom = screen.getByRole('menuitem', { name: 'Custom' });
    expect(custom.querySelector(`.${classes.indicator}`)).to.have.text('+');
    expect(custom.querySelector('svg')).to.equal(null);
    expect(
      screen.getByRole('menuitem', { name: 'Hidden' }).querySelector(`.${classes.indicator}`),
    ).to.equal(null);
  });

  it('can omit the indicator through theme defaults and restore it per trigger', () => {
    const theme = createTheme({
      components: { MuiMenu2SubmenuTrigger: { defaultProps: { slots: { indicator: null } } } },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Submenu>
              <Menu2SubmenuTrigger>Hidden</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
            <Menu2Submenu>
              <Menu2SubmenuTrigger slots={{ indicator: 'span' }}>Visible</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('menuitem', { name: 'Hidden' }).querySelector(`.${classes.indicator}`),
    ).to.equal(null);
    const visible = screen
      .getByRole('menuitem', { name: 'Visible' })
      .querySelector(`.${classes.indicator}`)!;
    expect(visible).to.have.attribute('aria-hidden', 'true');
    expect(visible.querySelector('[data-testid="KeyboardArrowRightIcon"]')).not.to.equal(null);
  });

  it('can remove and restore the indicator without changing the trigger or its refs', async () => {
    const triggerRef = React.createRef<HTMLDivElement>();
    const indicatorRef = React.createRef<HTMLSpanElement>();

    function Test() {
      const [hidden, setHidden] = React.useState(false);
      return (
        <Menu2 defaultOpen modal={false}>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup transitionDuration={0}>
            <Menu2Item closeOnClick={false} onClick={() => setHidden(!hidden)}>
              Toggle indicator
            </Menu2Item>
            <Menu2Submenu>
              <Menu2SubmenuTrigger
                ref={triggerRef}
                slots={{ indicator: hidden ? null : undefined }}
                slotProps={{ indicator: { ref: indicatorRef } }}
              >
                More
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>
      );
    }

    const { user } = render(<Test />);
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    expect(triggerRef.current).to.equal(trigger);
    expect(indicatorRef.current).to.equal(trigger.querySelector(`.${classes.indicator}`));
    expect(indicatorRef.current).not.to.equal(null);
    await waitFor(() =>
      expect(screen.getByRole('menu').contains(document.activeElement)).to.equal(true),
    );

    await user.click(screen.getByRole('menuitem', { name: 'Toggle indicator' }));
    expect(triggerRef.current).to.equal(trigger);
    expect(indicatorRef.current).to.equal(null);
    expect(trigger.querySelector(`.${classes.indicator}`)).to.equal(null);

    await user.click(screen.getByRole('menuitem', { name: 'Toggle indicator' }));
    expect(triggerRef.current).to.equal(trigger);
    expect(indicatorRef.current).not.to.equal(null);
    expect(indicatorRef.current).to.equal(trigger.querySelector(`.${classes.indicator}`));
  });

  it('lets the caller set the custom indicator direction', () => {
    render(
      <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Submenu>
              <Menu2SubmenuTrigger
                slotProps={{
                  indicator: {
                    children: <span>→</span>,
                    sx: (theme) => ({
                      transform: theme.direction === 'rtl' ? 'scaleX(-1)' : 'none',
                    }),
                  },
                }}
              >
                More
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    const indicator = screen
      .getByRole('menuitem', { name: 'More' })
      .querySelector(`.${classes.indicator}`)!;
    expect(['scaleX(-1)', 'matrix(-1, 0, 0, 1, 0, 0)']).to.include(
      getComputedStyle(indicator).transform,
    );
  });

  it.skipIf(isJsdom())(
    'preserves Tooltip-wrapped label overrides and a single keyboard position',
    async () => {
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<Button>Open</Button>} />
          <Menu2Popup>
            <Menu2Item>Alpha</Menu2Item>
            <Menu2Submenu>
              <Tooltip title="Open more actions" describeChild>
                <Menu2SubmenuTrigger label="Zebra">More</Menu2SubmenuTrigger>
              </Tooltip>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
            <Menu2Item>Omega</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );
      await act(async () => screen.getByRole('button', { name: 'Open' }).focus());
      await user.keyboard('{ArrowDown}');
      await waitFor(() =>
        expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'Alpha' })),
      );
      await user.keyboard('z');
      const trigger = screen.getByRole('menuitem', { name: 'More' });
      expect(document.activeElement).to.equal(trigger);
      expect(trigger).not.to.have.class('MuiMenu2Item-root');
      await user.keyboard('{ArrowDown}');
      expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'Omega' }));
      await user.keyboard('{ArrowUp}{ArrowRight}');
      await waitFor(() =>
        expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'Nested' })),
      );
      // Base UI omits aria-expanded during keyboard opening on VoiceOver platforms.
      expect(trigger).to.have.class(classes.open);
      await user.keyboard('{Escape}');
      await waitFor(() => expect(document.activeElement).to.equal(trigger));
      expect(screen.getByRole('menuitem', { name: 'Alpha' })).not.to.equal(null);
    },
  );

  it.skipIf(isJsdom())(
    'keeps a Tooltip-wrapped disabled trigger focusable without opening it',
    async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<Button>Open</Button>} />
          <Menu2Popup>
            <Menu2Submenu onOpenChange={onOpenChange}>
              <Tooltip title="Unavailable" describeChild>
                <Menu2SubmenuTrigger disabled>More</Menu2SubmenuTrigger>
              </Tooltip>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
            <Menu2Item>After</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );
      await act(async () => screen.getByRole('button', { name: 'Open' }).focus());
      await user.keyboard('{ArrowDown}');
      const trigger = await screen.findByRole('menuitem', { name: 'More' });
      // Initial focus skips disabled items; arrow navigation can still reach them.
      await waitFor(() =>
        expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'After' })),
      );
      await user.keyboard('{ArrowUp}');
      await waitFor(() => expect(document.activeElement).to.equal(trigger));
      expect(trigger).to.have.attribute('aria-disabled', 'true');
      expect(getComputedStyle(trigger).pointerEvents).to.equal('none');
      await user.keyboard('{Enter}{ArrowRight}');
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);
      await user.keyboard('{ArrowDown}');
      expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'After' }));
    },
  );

  it('composes public and slot refs and provides live slot state', async () => {
    const forwardedRef = React.createRef<HTMLDivElement>();
    const slotRef = React.createRef<HTMLDivElement>();
    const indicatorRef = React.createRef<HTMLSpanElement>();
    const onClick = vi.fn();
    const onSlotClick = vi.fn();
    // A page-sized anchor leaves no space for the popup and can cause resize loops.
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Submenu>
            <Menu2SubmenuTrigger
              openOnHover={false}
              ref={forwardedRef}
              onClick={onClick}
              slotProps={{
                root: (state) => ({
                  ref: slotRef,
                  onClick: onSlotClick,
                  'data-open-state': String(state.open),
                  'data-highlighted-state': String(state.highlighted),
                }),
                indicator: (state) => ({
                  ref: indicatorRef,
                  'data-open-state': String(state.open),
                  sx: { color: state.open ? 'rgb(1, 2, 3)' : 'rgb(4, 5, 6)' },
                }),
              }}
            >
              More
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    expect(forwardedRef.current).to.equal(trigger);
    expect(slotRef.current).to.equal(trigger);
    expect(indicatorRef.current).to.equal(trigger.querySelector(`.${classes.indicator}`));
    expect(indicatorRef.current).to.have.attribute('data-open-state', 'false');
    expect(getComputedStyle(indicatorRef.current!).color).to.equal('rgb(4, 5, 6)');
    expect(trigger).to.have.attribute('data-open-state', 'false');
    // Let the parent popup take its initial focus before opening a child popup.
    await waitFor(() =>
      expect(screen.getByRole('menu').contains(document.activeElement)).to.equal(true),
    );
    await user.click(trigger);
    await waitFor(() => expect(trigger).to.have.attribute('data-open-state', 'true'));
    expect(indicatorRef.current).to.have.attribute('data-open-state', 'true');
    expect(getComputedStyle(indicatorRef.current!).color).to.equal('rgb(1, 2, 3)');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onSlotClick).toHaveBeenCalledTimes(1);
  });

  it('themes the trigger independently of its parent list', () => {
    const theme = createTheme({
      components: {
        MuiMenu2SubmenuTrigger: {
          defaultProps: { dense: true, disableRipple: true },
          styleOverrides: { root: { color: 'rgb(1, 2, 3)' } },
          variants: [{ props: { divider: true }, style: { paddingLeft: 24 } }],
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Submenu>
              <Menu2SubmenuTrigger divider>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    expect(trigger).to.have.class(classes.dense);
    expect(trigger).to.have.class(classes.divider);
    expect(getComputedStyle(trigger).color).to.equal('rgb(1, 2, 3)');
    expect(getComputedStyle(trigger).paddingLeft).to.equal('24px');
  });
});
