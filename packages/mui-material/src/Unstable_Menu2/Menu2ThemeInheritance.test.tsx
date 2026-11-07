import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import type { ThemeOptions } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import type { Menu2ItemProps } from '@mui/material/Unstable_Menu2Item';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

interface ItemTestProps extends Pick<
  Menu2ItemProps,
  'dense' | 'divider' | 'disableGutters' | 'sx'
> {
  'data-testid': string;
}

const itemCases = [
  {
    name: 'MuiMenu2LinkItem',
    renderItem: (props: ItemTestProps) => (
      <Menu2LinkItem {...props} href="#target">
        Target
      </Menu2LinkItem>
    ),
  },
  {
    name: 'MuiMenu2CheckboxItem',
    renderItem: (props: ItemTestProps) => <Menu2CheckboxItem {...props}>Target</Menu2CheckboxItem>,
  },
  {
    name: 'MuiMenu2RadioItem',
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

describe.skipIf(isJsdom())('Menu2 theme style inheritance', () => {
  const { render } = createRenderer();

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

      (['common', 'specific', 'sx'] as const).forEach((source) => {
        it(`applies common popup styles before submenu styles and sx: ${source}`, async () => {
          const useSpecific = source !== 'common';
          const useSx = source === 'sx';
          const { user } = renderWithTheme(
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body} align="center" slots={{ transition: null }}>
                <Menu2Submenu>
                  <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                  <Menu2SubmenuPopup
                    align="end"
                    slots={{ transition: null }}
                    slotProps={{
                      portal: {
                        'data-testid': 'root',
                        sx: useSx ? { zIndex: 1501 } : undefined,
                      },
                      positioner: {
                        'data-testid': 'positioner',
                        sx: useSx ? { paddingLeft: '3px' } : undefined,
                      },
                      root: {
                        'data-testid': 'paper',
                        sx: useSx ? { maxHeight: 303, outlineOffset: 21 } : undefined,
                      },
                      list: {
                        'data-testid': 'list',
                        sx: useSx ? { outlineWidth: '3px' } : undefined,
                      },
                    }}
                  >
                    <Menu2Item>Nested</Menu2Item>
                  </Menu2SubmenuPopup>
                </Menu2Submenu>
              </Menu2Popup>
            </Menu2>,
            {
              MuiMenu2Popup: {
                styleOverrides: {
                  portal: { zIndex: 1401 },
                  positioner: { paddingLeft: 1 },
                  root: ({ ownerState }) => ({
                    maxHeight: ownerState.align === 'end' ? 301 : 300,
                  }),
                  list: { outline: '1px solid red' },
                },
                variants: [{ props: { align: 'end' }, style: { outlineOffset: 11 } }],
              },
              MuiMenu2SubmenuPopup: useSpecific
                ? {
                    styleOverrides: {
                      portal: { zIndex: 1402 },
                      positioner: { paddingLeft: 2 },
                      root: { maxHeight: 302, outlineOffset: 12 },
                      list: { outlineWidth: 2 },
                    },
                  }
                : {},
            },
          );

          await user.click(screen.getByRole('menuitem', { name: 'More' }));
          await screen.findByRole('menuitem', { name: 'Nested' });

          const root = screen.getByTestId('root');
          const positioner = screen.getByTestId('positioner');
          const paper = screen.getByTestId('paper');
          const list = screen.getByTestId('list');
          const expectedIndex = { common: 1, specific: 2, sx: 3 }[source];
          expect(getComputedStyle(root).zIndex).to.equal(
            String(useSx ? 1501 : 1400 + expectedIndex),
          );
          expect(getComputedStyle(paper).outlineOffset).to.equal(
            `${useSx ? 21 : 10 + expectedIndex}px`,
          );
          expect(getComputedStyle(positioner).paddingLeft).to.equal(`${expectedIndex}px`);
          expect(getComputedStyle(paper).maxHeight).to.equal(`${300 + expectedIndex}px`);
          expect(getComputedStyle(list).outlineWidth).to.equal(`${expectedIndex}px`);
          [root, positioner, list].forEach((element) => {
            expect(getComputedStyle(element).outlineOffset).to.equal('0px');
          });
        });
      });

      itemCases.forEach(({ name, renderItem }) => {
        it(`updates common highlighted overrides and variants during keyboard navigation in ${name}`, async () => {
          const { user } = renderWithTheme(
            <Menu2>
              <Menu2Trigger render={<button type="button">Options</button>} />
              <Menu2Popup slots={{ transition: null }}>
                <Menu2Item>Before</Menu2Item>
                {renderItem({ 'data-testid': 'target' })}
                <Menu2Item>After</Menu2Item>
              </Menu2Popup>
            </Menu2>,
            {
              MuiMenu2Item: {
                styleOverrides: {
                  root: ({ ownerState }) => ({ outlineOffset: ownerState.highlighted ? 3 : 1 }),
                },
                variants: [
                  {
                    props: { highlighted: true },
                    style: { '--menu2-highlight-variant': 'active' },
                  },
                ],
              },
            },
          );

          await user.click(screen.getByRole('button', { name: 'Options' }));
          const target = await screen.findByTestId('target');
          await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
          expect(getComputedStyle(target).outlineOffset).to.equal('1px');
          expect(getComputedStyle(target).getPropertyValue('--menu2-highlight-variant')).to.equal(
            '',
          );

          await user.keyboard('{ArrowDown}');
          await waitFor(() =>
            expect(screen.getByRole('menuitem', { name: 'Before' })).toHaveFocus(),
          );
          await user.keyboard('{ArrowDown}');
          await waitFor(() => expect(target).to.have.attribute('data-highlighted'));
          expect(getComputedStyle(target).outlineOffset).to.equal('3px');
          expect(
            getComputedStyle(target).getPropertyValue('--menu2-highlight-variant').trim(),
          ).to.equal('active');

          await user.keyboard('{ArrowDown}');
          await waitFor(() =>
            expect(screen.getByRole('menuitem', { name: 'After' })).toHaveFocus(),
          );
          expect(target).not.to.have.attribute('data-highlighted');
          expect(getComputedStyle(target).outlineOffset).to.equal('1px');
          expect(getComputedStyle(target).getPropertyValue('--menu2-highlight-variant')).to.equal(
            '',
          );
        });

        it(`applies common item overrides and variants to ${name}`, async () => {
          renderWithTheme(
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body} slots={{ transition: null }}>
                {renderItem({ 'data-testid': 'default' })}
                {renderItem({ 'data-testid': 'states', dense: true, divider: true })}
                {renderItem({ 'data-testid': 'no-gutters', disableGutters: true })}
              </Menu2Popup>
            </Menu2>,
            {
              MuiMenu2Item: {
                styleOverrides: {
                  root: ({ ownerState }) => ({ paddingBottom: ownerState.dense ? 11 : 10 }),
                  dense: { paddingTop: 12 },
                  divider: { marginTop: 13 },
                  gutters: { paddingLeft: 14 },
                },
                variants: [{ props: { divider: true }, style: { marginBottom: 15 } }],
              },
            },
          );

          const defaultStyle = getComputedStyle(await screen.findByTestId('default'));
          const stateStyle = getComputedStyle(screen.getByTestId('states'));
          const noGuttersStyle = getComputedStyle(screen.getByTestId('no-gutters'));
          expect(defaultStyle.paddingBottom).to.equal('10px');
          expect(defaultStyle.paddingTop).not.to.equal('12px');
          expect(defaultStyle.marginTop).to.equal('0px');
          expect(defaultStyle.paddingLeft).to.equal('14px');
          expect(defaultStyle.marginBottom).to.equal('0px');
          expect(stateStyle.paddingBottom).to.equal('11px');
          expect(stateStyle.paddingTop).to.equal('12px');
          expect(stateStyle.marginTop).to.equal('13px');
          expect(stateStyle.paddingLeft).to.equal('14px');
          expect(stateStyle.marginBottom).to.equal('15px');
          expect(noGuttersStyle.paddingLeft).to.equal('0px');
        });

        it(`applies ${name} overrides after common item styles, with sx last`, async () => {
          renderWithTheme(
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body} slots={{ transition: null }}>
                {renderItem({ 'data-testid': 'specific', dense: true, divider: true })}
                {renderItem({
                  'data-testid': 'sx',
                  dense: true,
                  divider: true,
                  sx: {
                    paddingBottom: '31px',
                    paddingTop: '32px',
                    marginTop: '33px',
                    paddingLeft: '34px',
                    marginBottom: '35px',
                  },
                })}
              </Menu2Popup>
            </Menu2>,
            {
              MuiMenu2Item: {
                styleOverrides: {
                  root: { paddingBottom: 11 },
                  dense: { paddingTop: 12 },
                  divider: { marginTop: 13 },
                  gutters: { paddingLeft: 14 },
                },
                variants: [{ props: { divider: true }, style: { marginBottom: 15 } }],
              },
              [name]: {
                styleOverrides: {
                  root: { paddingBottom: 21, marginBottom: 25 },
                  dense: { paddingTop: 22 },
                  divider: { marginTop: 23 },
                  gutters: { paddingLeft: 24 },
                },
              },
            },
          );

          await screen.findByTestId('specific');
          ['specific', 'sx'].forEach((testId, index) => {
            const style = getComputedStyle(screen.getByTestId(testId));
            expect(style.paddingBottom).to.equal(`${21 + index * 10}px`);
            expect(style.paddingTop).to.equal(`${22 + index * 10}px`);
            expect(style.marginTop).to.equal(`${23 + index * 10}px`);
            expect(style.paddingLeft).to.equal(`${24 + index * 10}px`);
            expect(style.marginBottom).to.equal(`${25 + index * 10}px`);
          });
        });
      });

      it('applies a common open-state override after the submenu trigger open tint', async () => {
        const { user } = renderWithTheme(
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body} slots={{ transition: null }}>
              <Menu2Submenu>
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup slots={{ transition: null }}>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>,
          {
            MuiMenu2Item: {
              styleOverrides: { root: { '&.Mui-open': { backgroundColor: 'rgb(1, 2, 3)' } } },
            },
          },
        );

        const trigger = screen.getByRole('menuitem', { name: 'More' });
        expect(getComputedStyle(trigger).backgroundColor).not.to.equal('rgb(1, 2, 3)');
        await user.click(trigger);
        await screen.findByRole('menuitem', { name: 'Nested' });
        expect(trigger).to.have.class('Mui-open');
        expect(getComputedStyle(trigger).backgroundColor).to.equal('rgb(1, 2, 3)');
      });

      it('retains sx on the common Menu2Item after other item types extend its styled base', async () => {
        renderWithTheme(
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body} slots={{ transition: null }}>
              <Menu2Item dense data-testid="item" sx={{ paddingTop: '21px' }}>
                Action
              </Menu2Item>
            </Menu2Popup>
          </Menu2>,
          {
            MuiMenu2Item: {
              styleOverrides: { root: { paddingTop: 11 } },
              variants: [{ props: { dense: true }, style: { paddingTop: 12 } }],
            },
          },
        );

        expect(getComputedStyle(await screen.findByTestId('item')).paddingTop).to.equal('21px');
      });

      it('does not inherit MuiMenu2Item default props in other item components', async () => {
        renderWithTheme(
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body} slots={{ transition: null }}>
              <Menu2Item data-testid="item">Action</Menu2Item>
              {itemCases.map(({ name, renderItem }) => (
                <React.Fragment key={name}>{renderItem({ 'data-testid': name })}</React.Fragment>
              ))}
            </Menu2Popup>
          </Menu2>,
          {
            MuiMenu2Item: { defaultProps: { dense: true, divider: true, disableGutters: true } },
          },
        );

        const item = await screen.findByTestId('item');
        expect(item).to.have.class('MuiMenu2Item-dense');
        expect(item).to.have.class('MuiMenu2Item-divider');
        expect(item).not.to.have.class('MuiMenu2Item-gutters');
        itemCases.forEach(({ name }) => {
          const target = screen.getByTestId(name);
          expect(target).not.to.have.class(`${name}-dense`);
          expect(target).not.to.have.class(`${name}-divider`);
          expect(target).to.have.class(`${name}-gutters`);
        });
      });

      it('does not inherit MuiMenu2Popup default props in submenu popups', async () => {
        const { user } = renderWithTheme(
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup
              anchor={document.body}
              slots={{ transition: null }}
              slotProps={{ root: { 'data-testid': 'parent-paper' } }}
            >
              <Menu2Submenu>
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup
                  slots={{ transition: null }}
                  slotProps={{ root: { 'data-testid': 'child-paper' } }}
                >
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>,
          { MuiMenu2Popup: { defaultProps: { elevation: 2 } } },
        );

        expect(screen.getByTestId('parent-paper')).to.have.class('MuiPaper-elevation2');
        await user.click(screen.getByRole('menuitem', { name: 'More' }));
        expect(await screen.findByTestId('child-paper')).to.have.class('MuiPaper-elevation8');
      });
    });
  });
});
