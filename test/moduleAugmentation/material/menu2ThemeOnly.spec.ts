import { createTheme } from '@mui/material/styles';

// Theme types are available without importing a Menu2 component.
const theme = createTheme({
  components: {
    MuiMenu2: {
      defaultProps: { modal: false },
    },
    MuiMenu2Popup: {
      styleOverrides: { root: { minWidth: 200 } },
      variants: [{ props: { align: 'start' }, style: { minWidth: 160 } }],
    },
    MuiMenu2Submenu: { defaultProps: { closeParentOnEsc: true } },
    MuiMenu2SubmenuPopup: { styleOverrides: { root: { minWidth: 160 } } },
    MuiMenu2SubmenuTrigger: { defaultProps: { openOnHover: false } },
    MuiMenu2Trigger: { defaultProps: { openOnHover: true, delay: 200 } },
    MuiMenu2Item: { defaultProps: { dense: true } },
    MuiMenu2CheckboxItem: { defaultProps: { defaultChecked: true } },
    MuiMenu2RadioItem: { defaultProps: { value: 'one' } },
    MuiMenu2LinkItem: { defaultProps: { href: '/profile' } },
    MuiMenu2Group: { defaultProps: { id: 'group' } },
    MuiMenu2GroupLabel: { defaultProps: { id: 'label' } },
    MuiMenu2RadioGroup: { defaultProps: { value: 'one' } },
    MuiMenu2Separator: { defaultProps: { className: 'separator' } },
  },
});

theme.components?.MuiMenu2?.defaultProps?.modal satisfies boolean | undefined;
theme.components?.MuiMenu2Popup?.defaultProps?.align satisfies
  'start' | 'center' | 'end' | undefined;
theme.components?.MuiMenu2Item?.defaultProps?.dense satisfies boolean | undefined;

createTheme({
  components: {
    MuiMenu2: {
      defaultProps: {
        // @ts-expect-error Menu2 prop types are available without a component import.
        modal: 'false',
      },
    },
  },
});
