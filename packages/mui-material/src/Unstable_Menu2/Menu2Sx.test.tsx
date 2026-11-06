import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';

interface StylingProps {
  'data-testid': string;
  sx?: SxProps<Theme>;
  slots?: { root: React.ElementType };
  slotProps?: { root: { sx: SxProps<Theme> } | (() => { sx: SxProps<Theme> }) };
}

const parts: Record<string, (props: StylingProps) => React.ReactNode> = {
  Menu2SubmenuTrigger: (props) => (
    <Menu2Submenu>
      <Menu2SubmenuTrigger {...props}>More</Menu2SubmenuTrigger>
      <Menu2SubmenuPopup>
        <Menu2Item>Nested</Menu2Item>
      </Menu2SubmenuPopup>
    </Menu2Submenu>
  ),
  Menu2Group: (props) => (
    <Menu2Group {...props}>
      <Menu2Item>Item</Menu2Item>
    </Menu2Group>
  ),
  Menu2GroupLabel: (props) => (
    <Menu2Group>
      <Menu2GroupLabel {...props}>Label</Menu2GroupLabel>
    </Menu2Group>
  ),
  Menu2RadioGroup: (props) => <Menu2RadioGroup {...props} />,
  Menu2Separator: (props) => <Menu2Separator {...props} />,
};

const CustomRoot = styled('div')({});

describe('Menu2 root slot sx', () => {
  const { render } = createRenderer();
  const theme = createTheme({ spacing: 10 });

  Object.entries(parts).forEach(([name, createPart]) => {
    describe(`<${name} />`, () => {
      function renderPart(props: Omit<StylingProps, 'data-testid'>) {
        render(
          <ThemeProvider theme={theme}>
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body}>
                {createPart({ ...props, 'data-testid': 'target' })}
              </Menu2Popup>
            </Menu2>
          </ThemeProvider>,
        );
      }

      it('preserves slot sx when top-level sx is absent', () => {
        renderPart({ slotProps: { root: { sx: { paddingLeft: '13px' } } } });
        const root = screen.getByTestId('target');
        expect(getComputedStyle(root).paddingLeft).to.equal('13px');
      });

      it('merges arrays and theme callbacks, with slot sx taking precedence', () => {
        renderPart({
          sx: [false, { paddingLeft: '3px' }, (t) => ({ paddingTop: t.spacing(2) })],
          slotProps: {
            root: () => ({
              sx: [false, (t: Theme) => ({ paddingRight: t.spacing(3), paddingLeft: '13px' })],
            }),
          },
        });
        const styles = getComputedStyle(screen.getByTestId('target'));
        expect(styles.paddingLeft).to.equal('13px');
        expect(styles.paddingTop).to.equal('20px');
        expect(styles.paddingRight).to.equal('30px');
      });

      it('composes sx for a custom styled root', () => {
        renderPart({
          slots: { root: CustomRoot },
          sx: (t) => ({ paddingTop: t.spacing(2) }),
          slotProps: { root: { sx: { paddingLeft: '13px' } } },
        });
        const root = screen.getByTestId('target');
        expect(getComputedStyle(root).paddingTop).to.equal('20px');
        expect(getComputedStyle(root).paddingLeft).to.equal('13px');
      });

      it('does not forward sx to a host root', () => {
        renderPart({
          slots: { root: 'div' },
          sx: { paddingTop: '20px' },
          slotProps: { root: { sx: { paddingLeft: '13px' } } },
        });
        const root = screen.getByTestId('target');
        expect(root).not.to.have.attribute('sx');
        expect(root).not.to.have.attribute('ownerState');
      });
    });
  });
});
