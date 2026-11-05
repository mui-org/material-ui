import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import type { Theme, ThemeOptions } from '../styles';
import { createTheme, enhanceHighContrast, ThemeProvider } from '../styles';
import menuItemClasses from '../MenuItem/menuItemClasses';
import Menu2CheckboxItem from '../Unstable_Menu2CheckboxItem';
import type { Menu2ItemProps } from '../Unstable_Menu2Item';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2LinkItem from '../Unstable_Menu2LinkItem';
import Menu2RadioGroup from '../Unstable_Menu2RadioGroup';
import Menu2RadioItem from '../Unstable_Menu2RadioItem';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, { menu2SubmenuTriggerClasses } from '../Unstable_Menu2SubmenuTrigger';
import Menu2 from './Menu2';
import {
  menu2CheckboxItemClasses,
  menu2CheckboxItemIndicatorClasses,
  menu2ItemClasses,
  menu2LinkItemClasses,
  menu2RadioItemClasses,
} from './menu2Classes';

interface ItemTestProps extends Pick<
  Menu2ItemProps,
  'dense' | 'divider' | 'disableGutters' | 'sx'
> {
  'data-testid': string;
}

const itemCases = [
  {
    name: 'MuiMenu2Item',
    classes: menu2ItemClasses,
    renderItem: (props: ItemTestProps) => <Menu2Item {...props}>Target</Menu2Item>,
  },
  {
    name: 'MuiMenu2LinkItem',
    classes: menu2LinkItemClasses,
    renderItem: (props: ItemTestProps) => (
      <Menu2LinkItem {...props} href="#target">
        Target
      </Menu2LinkItem>
    ),
  },
  {
    name: 'MuiMenu2CheckboxItem',
    classes: menu2CheckboxItemClasses,
    renderItem: (props: ItemTestProps) => <Menu2CheckboxItem {...props}>Target</Menu2CheckboxItem>,
  },
  {
    name: 'MuiMenu2RadioItem',
    classes: menu2RadioItemClasses,
    renderItem: (props: ItemTestProps) => (
      <Menu2RadioGroup defaultValue="target">
        <Menu2RadioItem {...props} value="target">
          Target
        </Menu2RadioItem>
      </Menu2RadioGroup>
    ),
  },
  {
    name: 'MuiMenu2SubmenuTrigger',
    classes: menu2SubmenuTriggerClasses,
    renderItem: (props: ItemTestProps) => (
      <Menu2Submenu>
        <Menu2SubmenuTrigger {...props} openOnHover={false}>
          Target
        </Menu2SubmenuTrigger>
        <Menu2SubmenuPopup>
          <Menu2Item>Nested</Menu2Item>
        </Menu2SubmenuPopup>
      </Menu2Submenu>
    ),
  },
] as const;

const highlightedCases = [
  ...itemCases.map(({ name, renderItem }) => ({
    name,
    item: renderItem({ 'data-testid': 'target' }),
  })),
  {
    name: 'MuiMenu2CheckboxItem',
    slot: 'indicator',
    stateName: 'MuiMenu2CheckboxItemIndicator',
    item: (
      <Menu2CheckboxItem defaultChecked slotProps={{ indicator: { 'data-testid': 'target' } }}>
        Target
      </Menu2CheckboxItem>
    ),
  },
  {
    name: 'MuiMenu2RadioItem',
    slot: 'indicator',
    stateName: 'MuiMenu2RadioItemIndicator',
    item: (
      <Menu2RadioGroup defaultValue="target">
        <Menu2RadioItem value="target" slotProps={{ indicator: { 'data-testid': 'target' } }}>
          Target
        </Menu2RadioItem>
      </Menu2RadioGroup>
    ),
  },
] as const;

describe.skipIf(isJsdom())('Menu2 state style overrides', () => {
  const { render } = createRenderer();

  // The rules of one class name are listed in cascade order.
  function getRulesFor(className: string) {
    const rules: Array<{ selector: string; media: string; declarations: string }> = [];
    const walk = (list: CSSRuleList, media: string) => {
      Array.from(list).forEach((rule) => {
        if (rule instanceof CSSMediaRule) {
          walk(rule.cssRules, rule.conditionText);
        } else if (rule instanceof CSSStyleRule && rule.selectorText.includes(className)) {
          rule.selectorText.split(',').forEach((selector) => {
            rules.push({ selector: selector.trim(), media, declarations: rule.style.cssText });
          });
        }
      });
    };
    Array.from(document.styleSheets).forEach((sheet) => walk(sheet.cssRules, ''));
    return rules;
  }

  highlightedCases.forEach((entry) => {
    const { name, item } = entry;
    const slot = 'slot' in entry ? entry.slot : 'root';
    const stateName = 'stateName' in entry ? entry.stateName : name;
    const highlightedStyles = { color: '#111', backgroundColor: '#222' };
    it(`keeps the ${name}.${slot} forced-colors rule after a highlighted override`, async () => {
      const theme = enhanceHighContrast(
        createTheme({
          components: {
            [name]: {
              styleOverrides: {
                [slot]: { [`&.${stateName}-highlighted`]: highlightedStyles },
              },
            },
          },
        }),
      );
      render(
        <ThemeProvider theme={theme}>
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body}>{item}</Menu2Popup>
          </Menu2>
        </ThemeProvider>,
      );
      const target = await screen.findByTestId('target');
      // The generated class name carries the styles; the utility class does not.
      const rootClassName = Array.from(target.classList).find(
        (className) => className !== `${name}-${slot}` && className.endsWith(`${name}-${slot}`),
      )!;
      const highlightedSelector = `.${rootClassName}.${stateName}-highlighted`;
      const highlightedRules = getRulesFor(rootClassName).filter(
        (rule) => rule.selector === highlightedSelector,
      );

      // The last highlighted rule restores the system colors under forced colors.
      // WebKit has no forced colors mode, so it drops `forced-color-adjust`.
      const forcedColorAdjust = CSS.supports('forced-color-adjust', 'none')
        ? 'forced-color-adjust: none; '
        : '';
      expect(highlightedRules.length).to.be.greaterThan(1);
      expect(highlightedRules[highlightedRules.length - 1]).to.deep.equal({
        selector: highlightedSelector,
        media: '(forced-colors: active)',
        declarations:
          slot === 'indicator'
            ? 'color: inherit; background-color: transparent;'
            : `${forcedColorAdjust}color: highlighttext; background-color: highlight;`,
      });
      if (slot === 'indicator') {
        const checkedSelector = `.${rootClassName}[data-checked].${stateName}-highlighted`;
        const checkedRules = getRulesFor(rootClassName).filter(
          (rule) => rule.selector === checkedSelector,
        );
        expect(checkedRules[checkedRules.length - 1]).to.deep.equal({
          selector: checkedSelector,
          media: '(forced-colors: active)',
          declarations: 'color: inherit; background-color: transparent;',
        });
      }
    });
  });

  it('keeps the forced-colors exit tint after a root override', async () => {
    const theme = enhanceHighContrast(
      createTheme({
        components: {
          MuiMenu2SubmenuTrigger: {
            styleOverrides: { root: { color: '#111', backgroundColor: '#222' } },
          },
        },
      }),
    );
    render(
      <ThemeProvider theme={theme}>
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
    const trigger = await screen.findByRole('menuitem', { name: 'More' });
    const rootClassName = Array.from(trigger.classList).find(
      (name) =>
        name !== menu2SubmenuTriggerClasses.root && name.endsWith('MuiMenu2SubmenuTrigger-root'),
    )!;
    const forcedColorAdjust = CSS.supports('forced-color-adjust', 'none')
      ? 'forced-color-adjust: none; '
      : '';

    const selector = `.${rootClassName}[data-mui-internal-retain-open-tint]`;
    const closingRules = getRulesFor(rootClassName).filter((rule) =>
      rule.selector.startsWith(selector),
    );
    expect(closingRules.length).to.be.greaterThan(1);
    expect(closingRules[closingRules.length - 1]).to.deep.equal({
      selector,
      media: '(forced-colors: active)',
      declarations: `${forcedColorAdjust}color: highlighttext; background-color: highlight;`,
    });
  });

  [false, true].forEach((modularCssLayers) => {
    describe(`modularCssLayers: ${modularCssLayers}`, () => {
      function renderWithTheme(children: React.ReactNode, components: ThemeOptions['components']) {
        return render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={createTheme({ modularCssLayers, components })}>
              {children}
            </ThemeProvider>
          </StyledEngineProvider>,
        );
      }

      highlightedCases.forEach((entry) => {
        const { name, item } = entry;
        const slot = 'slot' in entry ? entry.slot : 'root';
        const stateName = 'stateName' in entry ? entry.stateName : name;
        const highlightedStyles = {
          '--menu2-highlighted-test': 'active',
          backgroundColor: 'rgb(1, 2, 3)',
        };
        it(`applies ${name}.${slot} highlight styles only while the item is highlighted`, async () => {
          const { user, unmount } = renderWithTheme(
            <Menu2>
              <Menu2Trigger render={<button type="button">Options</button>} />
              <Menu2Popup transitionDuration={0}>
                <Menu2Item>Before</Menu2Item>
                {item}
                <Menu2Item>After</Menu2Item>
              </Menu2Popup>
            </Menu2>,
            {
              [name]: {
                styleOverrides: {
                  [slot]: { [`&.${stateName}-highlighted`]: highlightedStyles },
                },
              },
            },
          );

          try {
            await user.click(screen.getByRole('button', { name: 'Options' }));
            const target = await screen.findByTestId('target');
            await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
            const marker = () =>
              getComputedStyle(target).getPropertyValue('--menu2-highlighted-test').trim();
            expect(marker()).to.equal('');
            const idleColor = getComputedStyle(target).backgroundColor;

            await user.keyboard('{ArrowDown}');
            await waitFor(() =>
              expect(screen.getByRole('menuitem', { name: 'Before' })).toHaveFocus(),
            );
            expect(marker()).to.equal('');

            await user.keyboard('{ArrowDown}');
            await waitFor(() => expect(target).to.have.attribute('data-highlighted'));
            expect(marker()).to.equal('active');
            expect(getComputedStyle(target).backgroundColor).to.equal('rgb(1, 2, 3)');

            await user.keyboard('{ArrowDown}');
            await waitFor(() =>
              expect(screen.getByRole('menuitem', { name: 'After' })).toHaveFocus(),
            );
            expect(target).not.to.have.attribute('data-highlighted');
            expect(marker()).to.equal('');
            expect(getComputedStyle(target).backgroundColor).to.equal(idleColor);
          } finally {
            unmount();
          }
        });
      });

      ['item', 'indicator'].forEach((kind) => {
        (['object', 'array', 'callback'] as const).forEach((overrideType) => {
          it(`lets a matching highlighted sx selector override the ${kind} ${overrideType} theme`, async () => {
            const name = kind === 'item' ? 'MuiMenu2Item' : 'MuiMenu2CheckboxItem';
            const slot = kind === 'item' ? 'root' : 'indicator';
            const highlightedClass =
              kind === 'item'
                ? menu2ItemClasses.highlighted
                : menu2CheckboxItemIndicatorClasses.highlighted;
            const sx = { [`&.${highlightedClass}`]: { backgroundColor: 'rgb(4, 5, 6)' } };
            const highlightedStyles = {
              [`&.${highlightedClass}`]: {
                backgroundColor: 'rgb(1, 2, 3)',
                '--menu2-highlighted-test': 'active',
              },
            };
            const themeStyles = {
              object: highlightedStyles,
              array: [
                { [`&.${highlightedClass}`]: { '--menu2-highlighted-test': 'overridden' } },
                highlightedStyles,
              ],
              callback: ({ theme }: { theme: Theme }) => ({
                ...highlightedStyles,
                '--menu2-theme-mode': theme.palette.mode,
              }),
            };
            const { user, unmount } = renderWithTheme(
              <Menu2>
                <Menu2Trigger render={<button type="button">Options</button>} />
                <Menu2Popup transitionDuration={0}>
                  {kind === 'item' ? (
                    <Menu2Item data-testid="target" sx={sx}>
                      Target
                    </Menu2Item>
                  ) : (
                    <Menu2CheckboxItem
                      defaultChecked
                      slotProps={{ indicator: { 'data-testid': 'target', sx } }}
                    >
                      Target
                    </Menu2CheckboxItem>
                  )}
                </Menu2Popup>
              </Menu2>,
              {
                [name]: {
                  styleOverrides: { [slot]: themeStyles[overrideType] },
                },
              },
            );

            try {
              await user.click(screen.getByRole('button', { name: 'Options' }));
              const target = await screen.findByTestId('target');
              await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
              expect(getComputedStyle(target).backgroundColor).not.to.equal('rgb(4, 5, 6)');
              expect(
                getComputedStyle(target).getPropertyValue('--menu2-highlighted-test'),
              ).to.equal('');
              if (overrideType === 'callback') {
                expect(
                  getComputedStyle(target).getPropertyValue('--menu2-theme-mode').trim(),
                ).to.equal('light');
              }
              await user.keyboard('{ArrowDown}');
              await waitFor(() => expect(target).to.have.attribute('data-highlighted'));
              expect(getComputedStyle(target).backgroundColor).to.equal('rgb(4, 5, 6)');
              expect(
                getComputedStyle(target).getPropertyValue('--menu2-highlighted-test').trim(),
              ).to.equal('active');
            } finally {
              unmount();
            }
          });
        });
      });

      itemCases.forEach(({ name, classes, renderItem }) => {
        it(`supports ${name} dense, divider, and gutters overrides`, async () => {
          renderWithTheme(
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body} slots={{ transition: null }}>
                {renderItem({ 'data-testid': 'default' })}
                {renderItem({
                  'data-testid': 'states',
                  dense: true,
                  divider: true,
                  disableGutters: true,
                })}
                {renderItem({
                  'data-testid': 'sx',
                  dense: true,
                  divider: true,
                  sx: {
                    paddingTop: '21px',
                    marginTop: '22px',
                    paddingLeft: '23px',
                  },
                })}
              </Menu2Popup>
            </Menu2>,
            {
              [name]: {
                styleOverrides: {
                  dense: { '--menu2-dense-test': 'active', paddingTop: '11px' },
                  divider: {
                    '--menu2-divider-test': 'active',
                    marginTop: '12px',
                  },
                  gutters: {
                    '--menu2-gutters-test': 'active',
                    paddingLeft: '13px',
                  },
                },
              },
            },
          );

          const defaultItem = await screen.findByTestId('default');
          const stateItem = screen.getByTestId('states');
          const sxItem = screen.getByTestId('sx');
          const defaultStyle = getComputedStyle(defaultItem);
          const stateStyle = getComputedStyle(stateItem);
          const sxStyle = getComputedStyle(sxItem);

          expect(defaultItem).not.to.have.class(classes.dense);
          expect(defaultItem).not.to.have.class(classes.divider);
          expect(defaultItem).to.have.class(classes.gutters);
          expect(defaultStyle.getPropertyValue('--menu2-dense-test')).to.equal('');
          expect(defaultStyle.getPropertyValue('--menu2-divider-test')).to.equal('');
          expect(defaultStyle.getPropertyValue('--menu2-gutters-test').trim()).to.equal('active');
          expect(defaultStyle.paddingLeft).to.equal('13px');

          expect(stateItem).to.have.class(classes.dense);
          expect(stateItem).to.have.class(classes.divider);
          expect(stateItem).not.to.have.class(classes.gutters);
          expect(stateStyle.getPropertyValue('--menu2-dense-test').trim()).to.equal('active');
          expect(stateStyle.getPropertyValue('--menu2-divider-test').trim()).to.equal('active');
          expect(stateStyle.getPropertyValue('--menu2-gutters-test')).to.equal('');
          expect(stateStyle.paddingTop).to.equal('11px');
          expect(stateStyle.marginTop).to.equal('12px');

          expect(sxItem).to.have.class(classes.dense);
          expect(sxItem).to.have.class(classes.divider);
          expect(sxItem).to.have.class(classes.gutters);
          expect(sxStyle.paddingTop).to.equal('21px');
          expect(sxStyle.marginTop).to.equal('22px');
          expect(sxStyle.paddingLeft).to.equal('23px');
        });
      });

      it('keeps exit timing out of theme owner state', async () => {
        const completed = vi.fn();
        const ownerStates: object[] = [];
        const { user, unmount } = renderWithTheme(
          <Menu2>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup transitionDuration={0}>
              <Menu2Submenu onOpenChangeComplete={completed}>
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup transitionDuration={{ enter: 0, exit: 300 }}>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>,
          {
            MuiMenu2SubmenuTrigger: {
              styleOverrides: {
                root: ({ ownerState }) => {
                  ownerStates.push(ownerState);
                  return {
                    '--menu2-open-test':
                      'open' in ownerState && ownerState.open ? 'open' : 'closed',
                  };
                },
              },
            },
          },
        );

        try {
          await user.click(screen.getByRole('button', { name: 'Options' }));
          const trigger = await screen.findByRole('menuitem', { name: 'More' });
          await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
          const marker = () =>
            getComputedStyle(trigger).getPropertyValue('--menu2-open-test').trim();
          expect(marker()).to.equal('closed');

          await user.keyboard('{ArrowDown}{ArrowRight}');
          await waitFor(() =>
            expect(screen.getByRole('menuitem', { name: 'Nested' })).toHaveFocus(),
          );
          await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
          expect(marker()).to.equal('open');
          const popup = screen.getByRole('menuitem', { name: 'Nested' }).closest('[role="menu"]')!;

          completed.mockClear();
          await user.keyboard('{Escape}');
          expect(popup).to.have.attribute('data-ending-style');
          expect(trigger).not.to.have.class(menu2SubmenuTriggerClasses.open);
          expect(marker()).to.equal('closed');
          expect(getComputedStyle(trigger).backgroundColor).not.to.equal('rgba(0, 0, 0, 0)');

          await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
          expect(marker()).to.equal('closed');
          expect(ownerStates).not.to.have.length(0);
          ownerStates.forEach((state) => {
            expect(state).not.to.have.property('closing');
            expect(state).not.to.have.property('retainClosingTint');
          });
        } finally {
          unmount();
        }
      });

      [false, true].forEach((override) => {
        it(`styles a closing trigger without focus, override=${override}`, async () => {
          const completed = vi.fn();
          function Demo() {
            const [open, setOpen] = React.useState(false);
            return (
              <Menu2>
                <Menu2Trigger render={<button type="button">Options</button>} />
                <Menu2Popup transitionDuration={0}>
                  <Menu2Submenu open={open} onOpenChange={setOpen} onOpenChangeComplete={completed}>
                    <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                    <Menu2SubmenuPopup
                      finalFocus={false}
                      transitionDuration={{ enter: 0, exit: 300 }}
                    >
                      <Menu2Item
                        onKeyDown={(event) => {
                          if (event.key === 'F2') {
                            setOpen(false);
                          }
                        }}
                      >
                        Nested
                      </Menu2Item>
                    </Menu2SubmenuPopup>
                  </Menu2Submenu>
                </Menu2Popup>
              </Menu2>
            );
          }
          const { user, unmount } = renderWithTheme(
            <Demo />,
            override
              ? {
                  MuiMenu2SubmenuTrigger: {
                    styleOverrides: { root: { '&&': { backgroundColor: 'rgb(1, 2, 3)' } } },
                  },
                }
              : {},
          );

          try {
            await user.click(screen.getByRole('button', { name: 'Options' }));
            const trigger = await screen.findByRole('menuitem', { name: 'More' });
            await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
            await user.keyboard('{ArrowDown}{ArrowRight}');
            await waitFor(() =>
              expect(screen.getByRole('menuitem', { name: 'Nested' })).toHaveFocus(),
            );
            await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
            const openColor = getComputedStyle(trigger).backgroundColor;
            expect(openColor).not.to.equal('rgba(0, 0, 0, 0)');
            const popup = screen
              .getByRole('menuitem', { name: 'Nested' })
              .closest('[role="menu"]')!;

            completed.mockClear();
            await user.keyboard('{F2}');
            expect(popup).to.have.attribute('data-ending-style');
            expect(trigger).not.to.have.class(menu2SubmenuTriggerClasses.open);
            expect(trigger).not.to.have.class(menuItemClasses.focusVisible);
            expect(getComputedStyle(trigger).backgroundColor).to.equal(
              override ? 'rgb(1, 2, 3)' : openColor,
            );

            await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
            expect(popup.isConnected).to.equal(false);
            expect(getComputedStyle(trigger).backgroundColor).to.equal(
              override ? 'rgb(1, 2, 3)' : 'rgba(0, 0, 0, 0)',
            );
          } finally {
            unmount();
          }
        });
      });
    });
  });
});
