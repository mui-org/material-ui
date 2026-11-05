import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import type { Menu2CheckboxItemSlotProps } from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItem, {
  getMenu2CheckboxItemIndicatorUtilityClass,
  menu2CheckboxItemClasses,
  menu2CheckboxItemIndicatorClasses,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem, {
  getMenu2RadioItemIndicatorUtilityClass,
  menu2RadioItemClasses,
  menu2RadioItemIndicatorClasses,
} from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2 from './Menu2';

interface IndicatorState {
  checked: boolean;
  disabled: boolean;
  highlighted: boolean;
}

interface ItemOptions {
  checked?: boolean;
  checkedIcon?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  indicator?: React.ElementType;
  indicatorClassName?: string;
  indicatorProps?: Menu2CheckboxItemSlotProps['indicator'];
  otherRadioItem?: boolean;
}

const parts = [
  {
    name: 'MuiMenu2CheckboxItem',
    classes: menu2CheckboxItemIndicatorClasses,
    itemClasses: menu2CheckboxItemClasses,
    getUtilityClass: getMenu2CheckboxItemIndicatorUtilityClass,
    role: 'menuitemcheckbox',
    createItem: (options: ItemOptions) => (
      <Menu2CheckboxItem
        defaultChecked={options.checked}
        checkedIcon={options.checkedIcon}
        disabled={options.disabled}
        icon={options.icon}
        closeOnClick={false}
        classes={{ indicator: options.indicatorClassName }}
        slots={{ indicator: options.indicator }}
        slotProps={{ indicator: options.indicatorProps }}
      >
        Target
      </Menu2CheckboxItem>
    ),
  },
  {
    name: 'MuiMenu2RadioItem',
    classes: menu2RadioItemIndicatorClasses,
    itemClasses: menu2RadioItemClasses,
    getUtilityClass: getMenu2RadioItemIndicatorUtilityClass,
    role: 'menuitemradio',
    createItem: (options: ItemOptions) => (
      <Menu2RadioGroup defaultValue={options.checked ? 'target' : undefined}>
        <Menu2RadioItem
          value="target"
          checkedIcon={options.checkedIcon}
          disabled={options.disabled}
          icon={options.icon}
          closeOnClick={false}
          classes={{ indicator: options.indicatorClassName }}
          slots={{ indicator: options.indicator }}
          slotProps={{ indicator: options.indicatorProps }}
        >
          Target
        </Menu2RadioItem>
        {options.otherRadioItem && (
          <Menu2RadioItem value="other" closeOnClick={false}>
            Other
          </Menu2RadioItem>
        )}
      </Menu2RadioGroup>
    ),
  },
] as const;

const CustomIndicator = styled('span')({});

describe('Menu2 indicator slots', () => {
  const { render } = createRenderer();

  parts.forEach(({ name, classes, itemClasses, getUtilityClass, role, createItem }) => {
    describe(`${name}`, () => {
      function renderItem(options: ItemOptions = {}) {
        return render(
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body}>{createItem(options)}</Menu2Popup>
          </Menu2>,
        );
      }

      it('exports the existing indicator class names from the item entry point', () => {
        expect(classes.root).to.equal(`${name}Indicator-root`);
        expect(classes.checked).to.equal('Mui-checked');
        expect(classes.disabled).to.equal('Mui-disabled');
        expect(classes.highlighted).to.equal(`${name}Indicator-highlighted`);
        Object.entries(classes).forEach(([slot, className]) => {
          expect(getUtilityClass(slot)).to.equal(className);
        });
      });

      (
        [
          { slotName: 'default', indicator: undefined },
          { slotName: 'host', indicator: 'i' },
          { slotName: 'custom', indicator: CustomIndicator },
        ] as const
      ).forEach(({ slotName, indicator }) => {
        it(`passes state, classes, attributes, and refs to the ${slotName} slot`, () => {
          const ref = React.createRef<HTMLSpanElement>();
          renderItem({
            indicator,
            checked: true,
            checkedIcon: <span data-testid="checked-icon" />,
            disabled: true,
            indicatorClassName: 'item-indicator-class',
            indicatorProps: {
              ref,
              'data-testid': 'indicator',
              className: 'slot-indicator-class',
              title: 'Indicator title',
              children: <span data-testid="custom-child" />,
              sx: { paddingLeft: '13px' },
            },
          });

          const target = screen.getByTestId('indicator');
          expect(ref.current).to.equal(target);
          expect(target.tagName).to.equal(indicator === 'i' ? 'I' : 'SPAN');
          if (slotName === 'default') {
            expect(target).to.have.class(listItemIconClasses.root);
          }
          [
            classes.root,
            classes.checked,
            classes.disabled,
            itemClasses.indicator,
            'item-indicator-class',
            'slot-indicator-class',
          ].forEach((className) => {
            expect(target).to.have.class(className);
          });
          expect(target).to.have.attribute('data-checked');
          expect(target).to.have.attribute('data-disabled');
          expect(target).to.have.attribute('aria-hidden', 'true');
          expect(target).to.have.attribute('title', 'Indicator title');
          expect(target).not.to.have.attribute('ownerState');
          expect(target).not.to.have.attribute('sx');
          expect(target).not.to.have.attribute('keepMounted');
          expect(target.querySelector('[data-testid="custom-child"]')).not.to.equal(null);
          expect(screen.queryByTestId('checked-icon')).to.equal(null);
          if (indicator !== 'i') {
            expect(getComputedStyle(target).paddingLeft).to.equal('13px');
          }
        });
      });

      it('supports a component override on the default slot', () => {
        renderItem({ indicatorProps: { component: 'i', 'data-testid': 'indicator' } });
        const indicator = screen.getByTestId('indicator');
        expect(indicator.tagName).to.equal('I');
        expect(indicator).to.have.class(listItemIconClasses.root);
      });

      it('supports a component override on a custom styled slot', () => {
        renderItem({
          indicator: CustomIndicator,
          indicatorProps: { component: 'i', 'data-testid': 'indicator' },
        });
        const indicator = screen.getByTestId('indicator');
        expect(indicator.tagName).to.equal('I');
        expect(indicator).not.to.have.attribute('component');
        expect(indicator).not.to.have.attribute('data-mui-menu-indicator');
      });

      [false, true].forEach((modularCssLayers) => {
        it.skipIf(isJsdom())(
          `shares ListItemIcon styling (modularCssLayers: ${modularCssLayers})`,
          () => {
            const iconColumnStyles = { [`& .${listItemIconClasses.root}`]: { minWidth: 48 } };
            const theme = createTheme({
              modularCssLayers,
              components: {
                MuiListItemIcon: {
                  styleOverrides: { root: { paddingRight: 11 } },
                },
                MuiMenu2Item: {
                  styleOverrides: { root: iconColumnStyles },
                },
                [name]: {
                  styleOverrides: { root: iconColumnStyles },
                },
              },
            });
            render(
              <StyledEngineProvider enableCssLayer={modularCssLayers}>
                <ThemeProvider theme={theme}>
                  <Menu2 defaultOpen modal={false}>
                    <Menu2Popup anchor={document.body} slots={{ transition: null }}>
                      <Menu2Item>
                        <ListItemIcon data-testid="decorative-icon">
                          <svg width={20} height={20} aria-hidden="true" />
                        </ListItemIcon>
                        Action
                      </Menu2Item>
                      {createItem({ indicatorProps: { 'data-testid': 'indicator' } })}
                    </Menu2Popup>
                  </Menu2>
                </ThemeProvider>
              </StyledEngineProvider>,
            );

            ['decorative-icon', 'indicator'].forEach((id) => {
              const icon = screen.getByTestId(id);
              expect(icon).to.have.class(listItemIconClasses.root);
              expect(getComputedStyle(icon).minWidth).to.equal('48px');
              expect(getComputedStyle(icon).paddingRight).to.equal('11px');
            });
          },
        );
      });

      [false, true].forEach((overrideThemeIcons) => {
        it(`updates custom icons with item state (override theme: ${overrideThemeIcons})`, async () => {
          const theme = createTheme({
            components: {
              [name]: {
                defaultProps: {
                  icon: <span data-testid="theme-icon" />,
                  checkedIcon: <span data-testid="theme-checked-icon" />,
                },
              },
            },
          });
          const { user } = render(
            <ThemeProvider theme={theme}>
              <Menu2 defaultOpen modal={false}>
                <Menu2Popup anchor={document.body}>
                  {createItem({
                    otherRadioItem: true,
                    ...(overrideThemeIcons && {
                      icon: <span data-testid="item-icon" />,
                      checkedIcon: <span data-testid="item-checked-icon" />,
                    }),
                  })}
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>,
          );
          const item = screen.getByRole(role, { name: 'Target' });
          const iconPrefix = overrideThemeIcons ? 'item' : 'theme';
          const inactiveIconPrefix = overrideThemeIcons ? 'theme' : 'item';
          const expectIcon = (checked: boolean) => {
            expect(item.querySelector(`[data-testid="${iconPrefix}-icon"]`) !== null).to.equal(
              !checked,
            );
            expect(
              item.querySelector(`[data-testid="${iconPrefix}-checked-icon"]`) !== null,
            ).to.equal(checked);
            expect(item.querySelector(`[data-testid="${inactiveIconPrefix}-icon"]`)).to.equal(null);
            expect(
              item.querySelector(`[data-testid="${inactiveIconPrefix}-checked-icon"]`),
            ).to.equal(null);
          };

          expectIcon(false);
          await user.click(item);
          await waitFor(() => expect(item).to.have.attribute('aria-checked', 'true'));
          expectIcon(true);
          await user.click(
            role === 'menuitemradio' ? screen.getByRole(role, { name: 'Other' }) : item,
          );
          await waitFor(() => expect(item).to.have.attribute('aria-checked', 'false'));
          expectIcon(false);
        });
      });

      it('allows null and false icons without using the default icons', async () => {
        const { user } = renderItem({
          icon: null,
          checkedIcon: false,
          indicatorProps: { 'data-testid': 'indicator' },
        });
        expect(screen.getByTestId('indicator').childNodes).to.have.length(0);

        const item = screen.getByRole(role, { name: 'Target' });
        await user.click(item);
        await waitFor(() => expect(item).to.have.attribute('aria-checked', 'true'));
        expect(screen.getByTestId('indicator').childNodes).to.have.length(0);
      });

      it('provides live checked, disabled, and highlighted state to the slot callback', async () => {
        const states: IndicatorState[] = [];
        const { user } = render(
          <Menu2>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup transitionDuration={0}>
              <Menu2Item>Before</Menu2Item>
              {createItem({
                indicator: CustomIndicator,
                indicatorProps: (state) => {
                  states.push(state);
                  return { 'data-testid': 'indicator' };
                },
              })}
              <Menu2Item>After</Menu2Item>
            </Menu2Popup>
          </Menu2>,
        );

        await user.click(screen.getByRole('button', { name: 'Options' }));
        await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
        expect(states[states.length - 1]).to.include({
          checked: false,
          disabled: false,
          highlighted: false,
        });
        await user.keyboard('{ArrowDown}{ArrowDown}');
        const item = screen.getByRole(role, { name: 'Target' });
        await waitFor(() => expect(item).toHaveFocus());
        const indicator = screen.getByTestId('indicator');
        expect(indicator).to.have.class(classes.highlighted);
        expect(indicator).to.have.attribute('data-highlighted');
        expect(states[states.length - 1].highlighted).to.equal(true);

        await user.keyboard('[Space]');
        await waitFor(() => expect(item).to.have.attribute('aria-checked', 'true'));
        expect(states[states.length - 1].checked).to.equal(true);
        expect(indicator).to.have.class(classes.checked);
        expect(indicator).to.have.attribute('data-checked');

        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'After' })).toHaveFocus());
        expect(states[states.length - 1].highlighted).to.equal(false);
        expect(indicator).not.to.have.class(classes.highlighted);
        expect(indicator).not.to.have.attribute('data-highlighted');
      });

      (
        [
          { slotName: 'default', indicator: undefined },
          { slotName: 'host', indicator: 'span' },
          { slotName: 'custom', indicator: CustomIndicator },
        ] as const
      ).forEach(({ slotName, indicator }) => {
        [undefined, true, false].forEach((keepMounted) => {
          it(`uses keepMounted=${keepMounted} for the ${slotName} slot`, async () => {
            const { user } = renderItem({
              indicator,
              indicatorProps: { 'data-testid': 'indicator', keepMounted },
            });

            expect(screen.queryByTestId('indicator') === null).to.equal(keepMounted === false);
            await user.click(screen.getByRole(role, { name: 'Target' }));
            expect(await screen.findByTestId('indicator')).to.have.attribute('data-checked');
          });
        });
      });

      it('uses item theme defaults and keeps root variants out of the indicator', () => {
        const theme = createTheme({
          components: {
            [name]: {
              defaultProps: {
                slotProps: {
                  indicator: { 'data-testid': 'indicator', sx: { paddingLeft: '13px' } },
                },
              },
              styleOverrides: { indicator: { minWidth: 43 } },
              variants: [
                {
                  props: { disabled: true },
                  style: { borderTopWidth: 7, borderTopStyle: 'solid' },
                },
              ],
            },
          },
        });
        render(
          <ThemeProvider theme={theme}>
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body}>{createItem({ disabled: true })}</Menu2Popup>
            </Menu2>
          </ThemeProvider>,
        );

        const item = screen.getByRole(role, { name: 'Target' });
        const indicator = screen.getByTestId('indicator');
        expect(getComputedStyle(item).borderTopWidth).to.equal('7px');
        expect(getComputedStyle(indicator).borderTopWidth).not.to.equal('7px');
        expect(getComputedStyle(indicator).minWidth).to.equal('43px');
        expect(getComputedStyle(indicator).paddingLeft).to.equal('13px');
      });
    });
  });
});
