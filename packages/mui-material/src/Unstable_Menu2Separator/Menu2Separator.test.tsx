import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import type { Menu2SeparatorProps } from '@mui/material/Unstable_Menu2Separator';
import Menu2Separator, {
  menu2SeparatorClasses as classes,
} from '@mui/material/Unstable_Menu2Separator';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Separator />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2Separator />, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>{node}</Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2Separator',
    testVariantProps: { orientation: 'vertical' },
  }));

  describe.skipIf(isJsdom())('vertical spacing', () => {
    const cases: {
      name: string;
      props?: Menu2SeparatorProps;
      overrides?: { marginTop: number; marginBottom: number };
      expected: { marginTop: string; marginBottom: string };
    }[] = [
      { name: 'default', expected: { marginTop: '10px', marginBottom: '10px' } },
      {
        name: 'sx',
        props: { sx: { mt: 2, mb: 3 } },
        expected: { marginTop: '20px', marginBottom: '30px' },
      },
      {
        name: 'root slot sx',
        props: { slotProps: { root: { sx: { mt: 2, mb: 3 } } } },
        expected: { marginTop: '20px', marginBottom: '30px' },
      },
      {
        name: 'theme overrides',
        overrides: { marginTop: 13, marginBottom: 17 },
        expected: { marginTop: '13px', marginBottom: '17px' },
      },
    ];

    [false, true].forEach((modularCssLayers) => {
      cases.forEach(({ name, props, overrides, expected }) => {
        it(`uses ${name} margins beside items and submenus (modularCssLayers: ${modularCssLayers})`, async () => {
          const theme = createTheme({
            spacing: 10,
            modularCssLayers,
            components: { MuiMenu2Separator: { styleOverrides: { root: overrides } } },
          });
          const { user } = render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={theme}>
                <Menu2 defaultOpen modal={false}>
                  <Menu2Trigger render={<button type="button">Options</button>} />
                  <Menu2Popup>
                    <Menu2Item>Item</Menu2Item>
                    <Menu2Separator {...props} />
                    <Menu2Submenu>
                      <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                      <Menu2SubmenuPopup>
                        <Menu2Item>Nested item</Menu2Item>
                      </Menu2SubmenuPopup>
                    </Menu2Submenu>
                    <Menu2Separator {...props} />
                    <Menu2Item>After</Menu2Item>
                  </Menu2Popup>
                </Menu2>
                <MenuList>
                  <MenuItem>Classic item</MenuItem>
                  <Menu2Separator {...props} />
                </MenuList>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          function expectMargins() {
            screen.getAllByRole('separator').forEach((separator) => {
              expect(separator).toHaveComputedStyle(expected);
            });
          }

          expectMargins();
          await user.click(screen.getByRole('menuitem', { name: 'More' }));
          const nestedItem = await screen.findByRole('menuitem', { name: 'Nested item' });
          expectMargins();

          await user.keyboard('{Escape}');
          await waitFor(() => expect(nestedItem.isConnected).to.equal(false));
          expectMargins();
        });
      });

      it(`preserves custom Divider root margins (modularCssLayers: ${modularCssLayers})`, () => {
        const CustomRoot = styled(Divider)({ marginTop: 13, marginBottom: 17 });
        render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={createTheme({ modularCssLayers })}>
              <Menu2 defaultOpen modal={false}>
                <Menu2Popup anchor={document.body}>
                  <Menu2Item>Item</Menu2Item>
                  <Menu2Separator slots={{ root: CustomRoot }} />
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>
          </StyledEngineProvider>,
        );

        expect(screen.getByRole('separator')).toHaveComputedStyle({
          marginTop: '13px',
          marginBottom: '17px',
        });
      });

      it(`preserves plain Divider spacing and inset margins (modularCssLayers: ${modularCssLayers})`, () => {
        render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={createTheme({ modularCssLayers, spacing: 10 })}>
              <MenuList>
                <MenuItem>Classic item</MenuItem>
                <Divider />
                <MenuItem>Classic item before inset</MenuItem>
                <Divider variant="inset" data-testid="classic-inset" />
              </MenuList>
              <Menu2 defaultOpen modal={false}>
                <Menu2Popup anchor={document.body}>
                  <Menu2Item>Item</Menu2Item>
                  <Divider />
                  <Menu2Item>Item before inset</Menu2Item>
                  <Menu2Separator
                    slotProps={{ root: { variant: 'inset' } }}
                    data-testid="menu2-inset"
                  />
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>
          </StyledEngineProvider>,
        );

        screen.getAllByRole('separator').forEach((separator) => {
          expect(separator).toHaveComputedStyle({ marginTop: '10px', marginBottom: '10px' });
        });
        expect(screen.getByTestId('classic-inset')).toHaveComputedStyle({ marginLeft: '52px' });
        expect(screen.getByTestId('menu2-inset')).toHaveComputedStyle({ marginLeft: '52px' });
      });
    });
  });
});
