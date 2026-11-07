import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';

describe.skipIf(isJsdom())('Menu2 shared styled bases', () => {
  const { render } = createRenderer();

  [false, true].forEach((modularCssLayers) => {
    describe(`modularCssLayers: ${modularCssLayers}`, () => {
      [false, true].forEach((useSx) => {
        it(`applies specific popup styles, limits variants to root, and applies slot sx: ${useSx}`, async () => {
          const theme = createTheme({
            modularCssLayers,
            components: {
              MuiMenu2Popup: {
                styleOverrides: {
                  portal: { zIndex: 1401 },
                  positioner: { paddingLeft: 1 },
                  root: ({ ownerState }) => ({
                    maxHeight: ownerState.align === 'center' ? 301 : 302,
                    overflowY: 'scroll',
                  }),
                  list: { outline: '1px solid red' },
                },
                variants: [{ props: { align: 'center' }, style: { outlineOffset: 11 } }],
              },
              MuiMenu2SubmenuPopup: {
                styleOverrides: {
                  portal: { zIndex: 1402 },
                  positioner: { paddingLeft: 2 },
                  root: ({ ownerState }) => ({
                    maxHeight: ownerState.align === 'end' ? 201 : 202,
                    overflowY: 'scroll',
                  }),
                  list: { outline: '2px solid blue' },
                },
                variants: [{ props: { align: 'end' }, style: { outlineOffset: 12 } }],
              },
            },
          });
          const { user } = render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={theme}>
                <Menu2 defaultOpen modal={false}>
                  <Menu2Popup
                    anchor={document.body}
                    align="center"
                    slots={{ transition: null }}
                    slotProps={{
                      portal: {
                        'data-testid': 'parent-root',
                        sx: useSx ? { zIndex: 1501 } : undefined,
                      },
                      positioner: {
                        'data-testid': 'parent-positioner',
                        sx: useSx ? { paddingLeft: '3px' } : undefined,
                      },
                      root: {
                        'data-testid': 'parent-paper',
                        sx: useSx
                          ? { maxHeight: 311, overflowY: 'hidden', outlineOffset: 21 }
                          : undefined,
                      },
                      list: {
                        'data-testid': 'parent-list',
                        sx: useSx ? { outlineWidth: '3px' } : undefined,
                      },
                      backdrop: { 'data-testid': 'parent-backdrop' },
                    }}
                  >
                    <Menu2Submenu>
                      <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
                      <Menu2SubmenuPopup
                        align="end"
                        slots={{ transition: null }}
                        slotProps={{
                          portal: {
                            'data-testid': 'child-root',
                            sx: useSx ? { zIndex: 1502 } : undefined,
                          },
                          positioner: {
                            'data-testid': 'child-positioner',
                            sx: useSx ? { paddingLeft: '4px' } : undefined,
                          },
                          root: {
                            'data-testid': 'child-paper',
                            sx: useSx
                              ? { maxHeight: 211, overflowY: 'hidden', outlineOffset: 22 }
                              : undefined,
                          },
                          list: {
                            'data-testid': 'child-list',
                            sx: useSx ? { outlineWidth: '4px' } : undefined,
                          },
                        }}
                      >
                        <Menu2Item>Nested</Menu2Item>
                      </Menu2SubmenuPopup>
                    </Menu2Submenu>
                  </Menu2Popup>
                </Menu2>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          await user.click(screen.getByRole('menuitem', { name: 'More' }));
          await screen.findByRole('menuitem', { name: 'Nested' });

          ['parent', 'child'].forEach((prefix, index) => {
            const root = screen.getByTestId(`${prefix}-root`);
            const positioner = screen.getByTestId(`${prefix}-positioner`);
            const paper = screen.getByTestId(`${prefix}-paper`);
            const list = screen.getByTestId(`${prefix}-list`);
            expect(getComputedStyle(root).zIndex).to.equal(String((useSx ? 1501 : 1401) + index));
            expect(getComputedStyle(paper).outlineOffset).to.equal(
              `${(useSx ? 21 : 11) + index}px`,
            );
            expect(getComputedStyle(positioner).paddingLeft).to.equal(
              `${(useSx ? 3 : 1) + index}px`,
            );
            expect(getComputedStyle(paper).maxHeight).to.equal(
              `${(useSx ? 311 : 301) - index * 100}px`,
            );
            expect(getComputedStyle(paper).overflowY).to.equal(useSx ? 'hidden' : 'scroll');
            expect(getComputedStyle(list).outlineWidth).to.equal(`${(useSx ? 3 : 1) + index}px`);
            [root, positioner, list].forEach((element) => {
              expect(getComputedStyle(element).outlineOffset).to.equal('0px');
            });
            [root, positioner, paper, list].forEach((element) => {
              expect(element).not.to.have.attribute('ownerState');
              expect(element).not.to.have.attribute('sx');
            });
          });
          expect(getComputedStyle(screen.getByTestId('parent-backdrop')).outlineOffset).to.equal(
            '0px',
          );
        });
      });

      it('uses selection-control colors instead of decorative icon colors', () => {
        const theme = createTheme({
          modularCssLayers,
          palette: {
            text: { secondary: 'rgb(12, 34, 56)' },
            action: { active: 'rgb(98, 76, 54)' },
            primary: { main: 'rgb(65, 43, 21)' },
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
                  {[true, false].map((checked) => (
                    <Menu2CheckboxItem
                      key={String(checked)}
                      defaultChecked={checked}
                      slotProps={{ indicator: { 'data-testid': `checkbox-${checked}` } }}
                    >
                      Checkbox
                    </Menu2CheckboxItem>
                  ))}
                  <Menu2RadioGroup defaultValue="true">
                    {[true, false].map((checked) => (
                      <Menu2RadioItem
                        key={String(checked)}
                        value={String(checked)}
                        slotProps={{ indicator: { 'data-testid': `radio-${checked}` } }}
                      >
                        Radio
                      </Menu2RadioItem>
                    ))}
                  </Menu2RadioGroup>
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>
          </StyledEngineProvider>,
        );

        expect(getComputedStyle(screen.getByTestId('decorative-icon')).color).to.equal(
          theme.palette.action.active,
        );
        ['checkbox', 'radio'].forEach((kind) => {
          expect(getComputedStyle(screen.getByTestId(`${kind}-true`)).color).to.equal(
            theme.palette.primary.main,
          );
          expect(getComputedStyle(screen.getByTestId(`${kind}-false`)).color).to.equal(
            theme.palette.text.secondary,
          );
        });
      });

      it('applies ListItemIcon theme colors according to the CSS layer order', () => {
        const iconColor = 'rgb(123, 45, 67)';
        const theme = createTheme({
          modularCssLayers,
          components: {
            MuiListItemIcon: { styleOverrides: { root: { color: iconColor } } },
          },
        });
        render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={theme}>
              <Menu2 defaultOpen modal={false}>
                <Menu2Popup anchor={document.body} slots={{ transition: null }}>
                  {[true, false].map((checked) => (
                    <Menu2CheckboxItem
                      key={String(checked)}
                      defaultChecked={checked}
                      slotProps={{ indicator: { 'data-testid': `checkbox-${checked}` } }}
                    >
                      Checkbox
                    </Menu2CheckboxItem>
                  ))}
                  <Menu2RadioGroup defaultValue="true">
                    {[true, false].map((checked) => (
                      <Menu2RadioItem
                        key={String(checked)}
                        value={String(checked)}
                        slotProps={{ indicator: { 'data-testid': `radio-${checked}` } }}
                      >
                        Radio
                      </Menu2RadioItem>
                    ))}
                  </Menu2RadioGroup>
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>
          </StyledEngineProvider>,
        );

        ['checkbox', 'radio'].forEach((kind) => {
          expect(getComputedStyle(screen.getByTestId(`${kind}-true`)).color).to.equal(
            modularCssLayers ? iconColor : 'rgb(25, 118, 210)',
          );
          expect(getComputedStyle(screen.getByTestId(`${kind}-false`)).color).to.equal(
            modularCssLayers ? iconColor : 'rgba(0, 0, 0, 0.6)',
          );
        });
      });

      (['default', 'theme', 'sx'] as const).forEach((source) => {
        it(`applies indicator styles from ${source}`, () => {
          const theme = createTheme({
            modularCssLayers,
            components:
              source === 'default'
                ? {}
                : {
                    MuiMenu2CheckboxItem: {
                      styleOverrides: {
                        indicator: {
                          minWidth: 40,
                          '&[data-checked]': { color: 'rgb(1, 2, 3)' },
                          variants: [{ props: { checked: true }, style: { minWidth: 41 } }],
                        },
                      },
                    },
                    MuiMenu2RadioItem: {
                      styleOverrides: {
                        indicator: {
                          minWidth: 44,
                          '&[data-checked]': { color: 'rgb(4, 5, 6)' },
                          variants: [{ props: { checked: true }, style: { minWidth: 45 } }],
                        },
                      },
                    },
                  },
          });
          const indicatorSx =
            source === 'sx'
              ? { minWidth: 51, '&[data-checked]': { color: 'rgb(7, 8, 9)' } }
              : undefined;
          render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={theme}>
                <Menu2 defaultOpen modal={false}>
                  <Menu2Popup anchor={document.body} slots={{ transition: null }}>
                    <Menu2CheckboxItem
                      defaultChecked
                      slotProps={{ indicator: { 'data-testid': 'checkbox', sx: indicatorSx } }}
                    >
                      Checkbox
                    </Menu2CheckboxItem>
                    <Menu2RadioGroup defaultValue="one">
                      <Menu2RadioItem
                        value="one"
                        slotProps={{ indicator: { 'data-testid': 'radio', sx: indicatorSx } }}
                      >
                        Radio
                      </Menu2RadioItem>
                    </Menu2RadioGroup>
                  </Menu2Popup>
                </Menu2>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          ['checkbox', 'radio'].forEach((id, index) => {
            const indicator = screen.getByTestId(id);
            const styles = getComputedStyle(indicator);
            expect(indicator).to.have.attribute('data-checked');
            expect(styles.minWidth).to.equal(
              source === 'default' ? '36px' : `${source === 'sx' ? 51 : 41 + index * 4}px`,
            );
            const expectedColors = {
              default: 'rgb(25, 118, 210)',
              theme: ['rgb(1, 2, 3)', 'rgb(4, 5, 6)'][index],
              sx: 'rgb(7, 8, 9)',
            };
            expect(styles.color).to.equal(expectedColors[source]);
            // A flex item has a block outer display type.
            expect(styles.display).to.equal('flex');
          });
        });
      });
    });
  });
});
