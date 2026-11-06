import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import type { BaseUIEvent } from '@base-ui/react/types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { touchRippleClasses } from '@mui/material/ButtonBase';
import Menu2 from '@mui/material/Unstable_Menu2';
import type { Menu2CheckboxItemProps } from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';

describe('Menu2 live checked ownerState', () => {
  const { render } = createRenderer();

  ['checkbox', 'radio'].forEach((kind) => {
    describe(`${kind} item`, () => {
      const role = kind === 'checkbox' ? 'menuitemcheckbox' : 'menuitemradio';
      const componentName = kind === 'checkbox' ? 'MuiMenu2CheckboxItem' : 'MuiMenu2RadioItem';
      const renderItem: Menu2CheckboxItemProps['render'] = (props, state) => (
        <div
          {...props}
          data-checked={String(state.checked)}
          style={{ ...props.style, paddingLeft: state.checked ? '19px' : '11px' }}
        />
      );
      const slotProps = {
        indicator: (state: { checked?: boolean }) => ({ 'data-checked': String(state.checked) }),
      };
      const theme = createTheme({
        components: {
          [componentName]: {
            variants: [{ props: { checked: true }, style: { paddingRight: '23px' } }],
          },
        },
      });

      function Fixture({ controlled = false, cancel = false, reject = false }) {
        const [checked, setChecked] = React.useState(true);
        return (
          <ThemeProvider theme={theme}>
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup
                anchor={document.body}
                onKeyDown={(event) => {
                  if (event.key === 'F2') {
                    setChecked((current) => !current);
                  }
                }}
              >
                {kind === 'checkbox' ? (
                  <Menu2CheckboxItem
                    {...(controlled ? { checked } : { defaultChecked: true })}
                    onCheckedChange={(next, details) => {
                      if (cancel) {
                        details.cancel();
                      }
                      if (controlled && !cancel && !reject) {
                        setChecked(next);
                      }
                    }}
                    slotProps={slotProps}
                    render={renderItem}
                  >
                    One
                  </Menu2CheckboxItem>
                ) : (
                  <Menu2RadioGroup
                    {...(controlled ? { value: checked ? 'one' : 'two' } : { defaultValue: 'one' })}
                    onValueChange={(next, details) => {
                      if (cancel) {
                        details.cancel();
                      }
                      if (controlled && !cancel && !reject) {
                        setChecked(next === 'one');
                      }
                    }}
                  >
                    <Menu2RadioItem value="one" slotProps={slotProps} render={renderItem}>
                      One
                    </Menu2RadioItem>
                    <Menu2RadioItem value="two" slotProps={slotProps} render={renderItem}>
                      Two
                    </Menu2RadioItem>
                  </Menu2RadioGroup>
                )}
              </Menu2Popup>
            </Menu2>
          </ThemeProvider>
        );
      }

      function expectState(item: HTMLElement, checked: boolean) {
        expect(item).to.have.attribute('aria-checked', String(checked));
        expect(item).to.have.attribute('data-checked', String(checked));
        expect(item.firstElementChild).to.have.attribute('data-checked', String(checked));
        expect(getComputedStyle(item).paddingLeft).to.equal(checked ? '19px' : '11px');
        expect(getComputedStyle(item).paddingRight).to.equal(checked ? '23px' : '16px');
      }

      [false, true].forEach((controlled) => {
        it(`updates root, indicator and variants for ${controlled ? 'controlled' : 'uncontrolled'} selection`, async () => {
          const { user } = render(<Fixture controlled={controlled} />);
          const one = screen.getByRole(role, { name: 'One' });
          const target = kind === 'checkbox' ? one : screen.getByRole(role, { name: 'Two' });
          expectState(one, true);
          if (kind === 'radio') {
            expectState(target, false);
          }

          await user.click(target);
          expectState(one, false);
          if (kind === 'radio') {
            expectState(target, true);
          }

          await user.click(one);
          expectState(one, true);
          if (kind === 'radio') {
            expectState(target, false);
          }
        });

        it(`does not style a canceled ${controlled ? 'controlled' : 'uncontrolled'} selection`, async () => {
          const { user } = render(<Fixture controlled={controlled} cancel />);
          const one = screen.getByRole(role, { name: 'One' });
          const target = kind === 'checkbox' ? one : screen.getByRole(role, { name: 'Two' });

          await user.click(target);
          expectState(one, true);
          if (kind === 'radio') {
            expectState(target, false);
          }
        });
      });

      it('does not style a rejected controlled selection', async () => {
        const { user } = render(<Fixture controlled reject />);
        const one = screen.getByRole(role, { name: 'One' });
        await user.click(kind === 'checkbox' ? one : screen.getByRole(role, { name: 'Two' }));
        expectState(one, true);
      });

      it('reflects externally changed controlled selection', async () => {
        const { user } = render(<Fixture controlled />);
        const one = screen.getByRole(role, { name: 'One' });
        await act(async () => one.focus());
        expectState(one, true);
        await user.keyboard('{F2}');
        expectState(one, false);
        await user.keyboard('{F2}');
        expectState(one, true);
      });

      it('keeps Material styles, theme defaults, and indicator slots on a custom render element', () => {
        let received: string[] = [];
        const CustomRoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
          function CustomRoot(props, ref) {
            received = Object.keys(props);
            return <div {...props} ref={ref} />;
          },
        );
        const customTheme = createTheme({
          spacing: 10,
          components: {
            [componentName]: {
              defaultProps: { dense: true, render: <CustomRoot className="custom-root" /> },
              styleOverrides: { root: { paddingTop: '21px' } },
              variants: [{ props: { dense: true }, style: { paddingBottom: '19px' } }],
            },
          },
        });
        const itemProps = {
          className: 'external-class',
          sx: [false, (t) => ({ paddingLeft: t.spacing(3) })],
          slotProps: { indicator: { component: 'strong', 'data-testid': 'indicator' } },
        } satisfies Menu2CheckboxItemProps;
        render(
          <ThemeProvider theme={customTheme}>
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body}>
                {kind === 'checkbox' ? (
                  <Menu2CheckboxItem {...itemProps}>One</Menu2CheckboxItem>
                ) : (
                  <Menu2RadioGroup>
                    <Menu2RadioItem {...itemProps} value="one">
                      One
                    </Menu2RadioItem>
                  </Menu2RadioGroup>
                )}
              </Menu2Popup>
            </Menu2>
          </ThemeProvider>,
        );
        const item = screen.getByRole(role, { name: 'One' });
        [
          `${componentName}-root`,
          `${componentName}-dense`,
          'MuiButtonBase-root',
          'custom-root',
          'external-class',
        ].forEach((className) => expect(item).to.have.class(className));
        const styles = getComputedStyle(item);
        expect(styles.display).to.equal('flex');
        expect(styles.paddingTop).to.equal('21px');
        expect(styles.paddingBottom).to.equal('19px');
        expect(styles.paddingLeft).to.equal('30px');
        const indicator = screen.getByTestId('indicator');
        expect(item).to.contain(indicator);
        expect(indicator.tagName).to.equal('STRONG');
        expect(indicator).to.have.class(`${componentName}-indicator`);
        [
          'checked',
          'defaultChecked',
          'ownerState',
          'sx',
          'disableRipple',
          'nativeButton',
          'slots',
          'slotProps',
          'internalRender',
          'internalRenderState',
        ].forEach((prop) => expect(received).not.to.include(prop));
      });

      it('updates disabled render state and prevents keyboard activation', async () => {
        const onChange = vi.fn();
        function Fixture() {
          const [disabled, setDisabled] = React.useState(false);
          const itemProps = {
            disabled,
            dense: true,
            divider: true,
            disableGutters: true,
            render: (props, state) => (
              <div
                {...props}
                data-disabled={String(state.disabled)}
                data-dense={String(state.dense)}
                data-divider={String(state.divider)}
                data-gutters={String(state.disableGutters)}
              />
            ),
          } satisfies Menu2CheckboxItemProps;
          return (
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup
                anchor={document.body}
                onKeyDown={(event) => {
                  if (event.key === 'F2') {
                    setDisabled((value) => !value);
                  }
                }}
              >
                {kind === 'checkbox' ? (
                  <Menu2CheckboxItem {...itemProps} onCheckedChange={onChange}>
                    One
                  </Menu2CheckboxItem>
                ) : (
                  <Menu2RadioGroup onValueChange={onChange}>
                    <Menu2RadioItem {...itemProps} value="one">
                      One
                    </Menu2RadioItem>
                  </Menu2RadioGroup>
                )}
              </Menu2Popup>
            </Menu2>
          );
        }
        const { user } = render(<Fixture />);
        const item = screen.getByRole(role, { name: 'One' });
        expect(item).to.have.attribute('data-disabled', 'false');
        expect(item).to.have.attribute('data-dense', 'true');
        expect(item).to.have.attribute('data-divider', 'true');
        expect(item).to.have.attribute('data-gutters', 'true');
        await act(async () => item.focus());
        await user.keyboard('{F2}');
        expect(item).to.have.attribute('data-disabled', 'true');
        expect(item).to.have.attribute('aria-disabled', 'true');
        await user.keyboard('[Space][Enter]');
        expect(onChange).not.toHaveBeenCalled();
        expect(item).to.have.attribute('aria-checked', 'false');
      });

      [false, true].forEach((disableRipple) => {
        it.skipIf(isJsdom())(
          `retains indicators and ripple through a render callback, disableRipple=${disableRipple}`,
          async () => {
            const itemProps = {
              disableRipple,
              render: (props, state) => <div {...props} data-checked={String(state.checked)} />,
              slotProps: { indicator: { 'data-testid': 'indicator' } },
            } satisfies Menu2CheckboxItemProps;
            const { user } = render(
              <Menu2 defaultOpen modal={false}>
                <Menu2Popup anchor={document.body}>
                  {kind === 'checkbox' ? (
                    <Menu2CheckboxItem {...itemProps}>One</Menu2CheckboxItem>
                  ) : (
                    <Menu2RadioGroup>
                      <Menu2RadioItem {...itemProps} value="one">
                        One
                      </Menu2RadioItem>
                    </Menu2RadioGroup>
                  )}
                </Menu2Popup>
              </Menu2>,
            );
            const item = screen.getByRole(role, { name: 'One' });
            const indicator = screen.getByTestId('indicator');
            expect(item).to.contain(indicator);
            expect(indicator).not.to.have.attribute('data-checked');
            await user.pointer({ keys: '[MouseLeft>]', target: item });
            if (disableRipple) {
              expect(item.querySelector(`.${touchRippleClasses.root}`)).to.equal(null);
            } else {
              await waitFor(() =>
                expect(item.querySelector(`.${touchRippleClasses.rippleVisible}`)).not.to.equal(
                  null,
                ),
              );
            }
            await user.pointer({ keys: '[/MouseLeft]', target: item });
            expect(item).to.have.attribute('data-checked', 'true');
            expect(indicator).to.have.attribute('data-checked');
            expect(screen.getByTestId('indicator')).to.equal(indicator);
          },
        );
      });

      it('composes root refs and click handlers without replacing the item after selection', async () => {
        const itemRef = React.createRef<HTMLDivElement>();
        const renderRef = React.createRef<HTMLDivElement>();
        const onClick = vi.fn();
        const onRenderClick = vi.fn();
        const rootElement = <div ref={renderRef} onClick={onRenderClick} />;
        const { user, unmount } = render(
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body}>
              {kind === 'checkbox' ? (
                <Menu2CheckboxItem ref={itemRef} onClick={onClick} render={rootElement}>
                  One
                </Menu2CheckboxItem>
              ) : (
                <Menu2RadioGroup>
                  <Menu2RadioItem value="one" ref={itemRef} onClick={onClick} render={rootElement}>
                    One
                  </Menu2RadioItem>
                </Menu2RadioGroup>
              )}
            </Menu2Popup>
          </Menu2>,
        );
        const item = screen.getByRole(role, { name: 'One' });
        expect(itemRef.current).to.equal(item);
        expect(renderRef.current).to.equal(item);

        await user.click(item);
        expect(item).to.have.attribute('aria-checked', 'true');
        expect(itemRef.current).to.equal(item);
        expect(renderRef.current).to.equal(item);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onRenderClick).toHaveBeenCalledTimes(1);

        unmount();
        expect(itemRef.current).to.equal(null);
        expect(renderRef.current).to.equal(null);
      });

      for (const cancel of [false, true]) {
        it(`preserves render element event order, cancel=${cancel}`, async () => {
          const calls: string[] = [];
          const itemProps = {
            onClick: () => calls.push('item'),
            render: (
              <div
                onClick={(event) => {
                  calls.push('render');
                  if (cancel) {
                    (event as BaseUIEvent<typeof event>).preventBaseUIHandler();
                  }
                }}
              />
            ),
          };
          const { user } = render(
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body}>
                {kind === 'checkbox' ? (
                  <Menu2CheckboxItem {...itemProps}>One</Menu2CheckboxItem>
                ) : (
                  <Menu2RadioGroup>
                    <Menu2RadioItem value="one" {...itemProps}>
                      One
                    </Menu2RadioItem>
                  </Menu2RadioGroup>
                )}
              </Menu2Popup>
            </Menu2>,
          );

          const item = screen.getByRole(role, { name: 'One' });
          await user.click(item);
          expect(calls).to.deep.equal(cancel ? ['render'] : ['render', 'item']);
          expect(item).to.have.attribute('aria-checked', String(!cancel));
        });
      }

      it('passes live state, component props, and refs to a custom indicator slot', async () => {
        const indicatorRef = React.createRef<HTMLElement>();
        const Indicator = React.forwardRef<
          HTMLElement,
          React.HTMLAttributes<HTMLElement> & {
            as?: React.ElementType;
            ownerState: { checked: boolean };
          }
        >(function Indicator({ as: Component = 'span', ownerState, ...props }, ref) {
          return <Component {...props} ref={ref} data-owner-checked={String(ownerState.checked)} />;
        });
        const itemProps = {
          slots: { indicator: Indicator },
          slotProps: {
            indicator: {
              component: 'strong' as const,
              ref: indicatorRef,
              'data-testid': 'indicator',
              className: 'custom-indicator',
              style: { marginLeft: '7px' },
            },
          },
        };
        const { user, unmount } = render(
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body}>
              {kind === 'checkbox' ? (
                <Menu2CheckboxItem {...itemProps}>One</Menu2CheckboxItem>
              ) : (
                <Menu2RadioGroup>
                  <Menu2RadioItem value="one" {...itemProps}>
                    One
                  </Menu2RadioItem>
                </Menu2RadioGroup>
              )}
            </Menu2Popup>
          </Menu2>,
        );

        const indicator = screen.getByTestId('indicator');
        expect(indicator.tagName).to.equal('STRONG');
        expect(indicator).to.have.class('custom-indicator');
        expect(indicator.style.marginLeft).to.equal('7px');
        expect(indicator).not.to.have.attribute('keepMounted');
        expect(indicator).to.have.attribute('data-owner-checked', 'false');
        expect(indicator).not.to.have.attribute('data-checked');
        expect(indicatorRef.current).to.equal(indicator);

        await user.click(screen.getByRole(role, { name: 'One' }));
        expect(indicator).to.have.attribute('data-owner-checked', 'true');
        expect(indicator).to.have.attribute('data-checked');
        expect(indicatorRef.current).to.equal(indicator);

        unmount();
        expect(indicatorRef.current).to.equal(null);
      });
    });
  });
});
