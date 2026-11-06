import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';
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

interface IndicatorIconProps {
  className?: string;
  component?: React.ElementType;
  fontSize?: 'small' | 'medium';
  ref?: (element: Element | null) => void;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
  title?: string;
  'data-testid'?: string;
  'data-checked'?: string;
}

interface ItemOptions {
  checked?: boolean;
  disabled?: boolean;
  indicator?: React.ElementType;
  indicatorClassName?: string;
  indicatorProps?: Menu2CheckboxItemSlotProps['indicator'];
  indicatorIcon?: React.ElementType;
  indicatorIconClassName?: string;
  indicatorIconProps?: IndicatorIconProps | ((state: IndicatorState) => IndicatorIconProps);
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
        disabled={options.disabled}
        closeOnClick={false}
        classes={{
          indicator: options.indicatorClassName,
          indicatorIcon: options.indicatorIconClassName,
        }}
        slots={{
          ...(options.indicator && { indicator: options.indicator }),
          ...(options.indicatorIcon && { indicatorIcon: options.indicatorIcon }),
        }}
        slotProps={{
          indicator: options.indicatorProps,
          indicatorIcon: options.indicatorIconProps,
        }}
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
          disabled={options.disabled}
          closeOnClick={false}
          classes={{
            indicator: options.indicatorClassName,
            indicatorIcon: options.indicatorIconClassName,
          }}
          slots={{
            ...(options.indicator && { indicator: options.indicator }),
            ...(options.indicatorIcon && { indicatorIcon: options.indicatorIcon }),
          }}
          slotProps={{
            indicator: options.indicatorProps,
            indicatorIcon: options.indicatorIconProps,
          }}
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
const CustomIndicatorIcon = styled('span')({});
const CustomSvgRoot = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  function CustomSvgRoot(props, ref) {
    return <svg {...props} ref={ref} data-custom-root="true" />;
  },
);

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
        expect(itemClasses.indicatorIcon).to.equal(`${name}-indicatorIcon`);
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
            indicatorIconProps: { 'data-testid': 'default-icon' },
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
          expect(screen.queryByTestId('default-icon')).to.equal(null);
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

      [false, true].forEach((overrideThemeIcon) => {
        it(`updates a custom icon with item state (override theme: ${overrideThemeIcon})`, async () => {
          interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
            ownerState: IndicatorState;
          }
          function ThemeIcon({ ownerState, ...props }: IconProps) {
            expect(props).not.to.have.property('checked');
            return (
              <span {...props} data-testid="theme-icon" data-checked={String(ownerState.checked)} />
            );
          }
          function ItemIcon({ ownerState, ...props }: IconProps) {
            expect(props).not.to.have.property('checked');
            return (
              <span {...props} data-testid="item-icon" data-checked={String(ownerState.checked)} />
            );
          }
          const theme = createTheme({
            components: {
              [name]: {
                defaultProps: {
                  slots: { indicatorIcon: ThemeIcon },
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
                    ...(overrideThemeIcon && {
                      indicatorIcon: ItemIcon,
                    }),
                  })}
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>,
          );
          const item = screen.getByRole(role, { name: 'Target' });
          const iconPrefix = overrideThemeIcon ? 'item' : 'theme';
          const inactiveIconPrefix = overrideThemeIcon ? 'theme' : 'item';
          const icon = item.querySelector(`[data-testid="${iconPrefix}-icon"]`);
          expect(icon).not.to.equal(null);
          const expectIcon = (checked: boolean) => {
            expect(item.querySelector(`[data-testid="${iconPrefix}-icon"]`)).to.equal(icon);
            expect(icon).to.have.attribute('data-checked', String(checked));
            expect(icon).not.to.have.attribute('ownerState');
            expect(icon).not.to.have.attribute('checked');
            expect(item.querySelector(`[data-testid="${inactiveIconPrefix}-icon"]`)).to.equal(null);
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

      [false, true].forEach((useCustomSlot) => {
        it(`hides the icon with ${useCustomSlot ? 'a custom slot that returns null' : 'false indicator children'}`, async () => {
          const { user } = renderItem({
            indicatorIcon: useCustomSlot ? () => null : undefined,
            indicatorProps: {
              'data-testid': 'indicator',
              children: useCustomSlot ? undefined : false,
            },
          });
          expect(screen.getByTestId('indicator').childNodes).to.have.length(0);

          const item = screen.getByRole(role, { name: 'Target' });
          await user.click(item);
          await waitFor(() => expect(item).to.have.attribute('aria-checked', 'true'));
          expect(screen.getByTestId('indicator').childNodes).to.have.length(0);
        });
      });

      (
        [
          { slotName: 'default', indicatorIcon: undefined },
          { slotName: 'host', indicatorIcon: 'i' },
          { slotName: 'custom', indicatorIcon: CustomIndicatorIcon },
        ] as const
      ).forEach(({ slotName, indicatorIcon }) => {
        it(`passes classes, attributes, and a ref to the ${slotName} icon slot`, () => {
          let iconRef: Element | null = null;
          const { unmount } = renderItem({
            checked: true,
            disabled: true,
            indicatorIcon,
            indicatorIconClassName: 'item-icon-class',
            indicatorIconProps: {
              ref: (element) => {
                iconRef = element;
              },
              'data-testid': 'icon',
              className: 'slot-icon-class',
              title: 'Selection icon',
              style: { marginLeft: '7px' },
              ...(slotName !== 'host' && { sx: { paddingLeft: '13px' } }),
            },
          });
          const icon = screen.getByTestId('icon');
          expect(iconRef).to.equal(icon);
          [itemClasses.indicatorIcon, 'item-icon-class', 'slot-icon-class'].forEach((className) =>
            expect(icon).to.have.class(className),
          );
          expect(icon).to.have.attribute('title', 'Selection icon');
          expect(icon.style.marginLeft).to.equal('7px');
          expect(icon).not.to.have.attribute('ownerState');
          expect(icon).not.to.have.attribute('checked');
          if (slotName !== 'host') {
            expect(getComputedStyle(icon).paddingLeft).to.equal('13px');
            expect(icon).not.to.have.attribute('sx');
          }
          unmount();
          expect(iconRef).to.equal(null);
        });

        if (slotName !== 'host') {
          it(`supports a component override on the ${slotName} icon slot`, () => {
            const useSvg = slotName === 'default' && role === 'menuitemcheckbox';
            renderItem({
              indicatorIcon,
              indicatorIconProps: {
                component: useSvg ? CustomSvgRoot : 'i',
                'data-testid': 'icon',
              },
            });
            const icon = screen.getByTestId('icon');
            expect(icon.tagName.toLowerCase()).to.equal(useSvg ? 'svg' : 'i');
            if (useSvg) {
              expect(icon).to.have.attribute('data-custom-root', 'true');
            }
            expect(icon).not.to.have.attribute('component');
            expect(icon).not.to.have.attribute('ownerState');
            expect(icon).not.to.have.attribute('checked');
          });
        }
      });

      it('uses icon theme defaults, overrides, and sx without root variants', () => {
        const theme = createTheme({
          components: {
            [name]: {
              defaultProps: {
                slotProps: {
                  indicatorIcon: {
                    'data-testid': 'icon',
                    fontSize: 'medium',
                    sx: { paddingLeft: '13px' },
                  },
                },
              },
              styleOverrides: { indicatorIcon: { marginRight: 7 } },
              variants: [
                {
                  props: { disabled: true },
                  style: { borderTopWidth: 9, borderTopStyle: 'solid' },
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
        const icon = screen.getByTestId('icon');
        expect(getComputedStyle(item).borderTopWidth).to.equal('9px');
        expect(getComputedStyle(icon).borderTopWidth).not.to.equal('9px');
        expect(getComputedStyle(icon).marginRight).to.equal('7px');
        expect(getComputedStyle(icon).paddingLeft).to.equal('13px');
        const svg = icon.tagName.toLowerCase() === 'svg' ? icon : icon.querySelector('svg')!;
        expect(svg).to.have.class('MuiSvgIcon-fontSizeMedium');
      });

      it('provides live checked, disabled, and highlighted state to the slot callback', async () => {
        const states: IndicatorState[] = [];
        const iconStates: IndicatorState[] = [];
        const customIconStates: IndicatorState[] = [];
        function StateIcon({
          ownerState,
          ...props
        }: React.HTMLAttributes<HTMLSpanElement> & { ownerState: IndicatorState }) {
          customIconStates.push(ownerState);
          expect(props).not.to.have.property('checked');
          return <span {...props} />;
        }
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
                indicatorIcon: StateIcon,
                indicatorIconProps: (state) => {
                  iconStates.push(state);
                  return { 'data-testid': 'icon' };
                },
              })}
              <Menu2Item>After</Menu2Item>
            </Menu2Popup>
          </Menu2>,
        );

        await user.click(screen.getByRole('button', { name: 'Options' }));
        await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
        [states, iconStates, customIconStates].forEach((slotStates) => {
          expect(slotStates[slotStates.length - 1]).to.include({
            checked: false,
            disabled: false,
            highlighted: false,
          });
        });
        await user.keyboard('{ArrowDown}{ArrowDown}');
        const item = screen.getByRole(role, { name: 'Target' });
        await waitFor(() => expect(item).toHaveFocus());
        const indicator = screen.getByTestId('indicator');
        expect(indicator).to.have.class(classes.highlighted);
        expect(indicator).to.have.attribute('data-highlighted');
        [states, iconStates, customIconStates].forEach((slotStates) => {
          expect(slotStates[slotStates.length - 1].highlighted).to.equal(true);
        });

        await user.keyboard('[Space]');
        await waitFor(() => expect(item).to.have.attribute('aria-checked', 'true'));
        [states, iconStates, customIconStates].forEach((slotStates) => {
          expect(slotStates[slotStates.length - 1].checked).to.equal(true);
        });
        expect(indicator).to.have.class(classes.checked);
        expect(indicator).to.have.attribute('data-checked');

        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'After' })).toHaveFocus());
        [states, iconStates, customIconStates].forEach((slotStates) => {
          expect(slotStates[slotStates.length - 1].highlighted).to.equal(false);
        });
        expect(indicator).not.to.have.class(classes.highlighted);
        expect(indicator).not.to.have.attribute('data-highlighted');
        expect(screen.getByTestId('icon')).not.to.have.attribute('ownerState');
        expect(screen.getByTestId('icon')).not.to.have.attribute('checked');
      });

      it('provides disabled state to the icon component and its slot props', () => {
        const states: IndicatorState[] = [];
        const customStates: IndicatorState[] = [];
        function DisabledIcon({
          ownerState,
          ...props
        }: React.HTMLAttributes<HTMLSpanElement> & { ownerState: IndicatorState }) {
          customStates.push(ownerState);
          return <span {...props} />;
        }
        renderItem({
          checked: true,
          disabled: true,
          indicatorIcon: DisabledIcon,
          indicatorIconProps: (state) => {
            states.push(state);
            return { 'data-testid': 'icon' };
          },
        });
        [states, customStates].forEach((slotStates) => {
          expect(slotStates[slotStates.length - 1]).to.include({
            checked: true,
            disabled: true,
            highlighted: false,
          });
        });
        expect(screen.getByTestId('icon')).not.to.have.attribute('ownerState');
        expect(screen.getByTestId('icon')).not.to.have.attribute('checked');
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
