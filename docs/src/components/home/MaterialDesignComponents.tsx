import * as React from 'react';
import type { Theme, ThemeOptions } from '@mui/material/styles';
import { styled, alpha, extendTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import { capitalize } from '@mui/material/utils';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button, { buttonClasses } from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import MailRounded from '@mui/icons-material/MailRounded';
import VerifiedUserRounded from '@mui/icons-material/VerifiedUserRounded';
import HelpCenterRounded from '@mui/icons-material/HelpCenterRounded';
import { ROUTES } from '@mui/internal-core-docs/constants';
import { Link } from '@mui/internal-core-docs/Link';
import { getDesignTokens, getThemedComponents } from '@mui/internal-core-docs/branding';

const Grid = styled('div')(({ theme }) => [
  {
    borderRadius: (theme.vars || theme).shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[50], 0.4),
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridAutoRows: 240,
    [theme.breakpoints.up('sm')]: {
      gridAutoRows: 260,
      paddingTop: 1,
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridAutoRows: 280,
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    '& > div': {
      padding: theme.spacing(2),
      alignSelf: 'stretch',
      border: '1px solid',
      borderColor: (theme.vars || theme).palette.grey[200],
      [theme.breakpoints.only('xs')]: {
        '&:first-of-type': {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:last-of-type': {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:not(:first-of-type)': {
          marginTop: -1,
        },
      },
      [theme.breakpoints.only('sm')]: {
        marginTop: -1,
        '&:first-of-type': {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:last-of-type': {
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
          borderStyle: 'dashed',
        },
        '&:nth-of-type(even)': {
          marginLeft: -1,
        },
        '&:nth-last-of-type(2)': {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:nth-of-type(2)': {
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
      },
      [theme.breakpoints.up('md')]: {
        marginTop: -1,
        '&:not(:nth-of-type(3n + 1))': {
          marginLeft: -1,
        },
        '&:first-of-type': {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:last-of-type': {
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:nth-last-of-type(3)': {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:nth-of-type(3)': {
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
      },
    },
  },
  theme.applyDarkStyles({
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '& > div': {
      borderColor: alpha(theme.palette.primaryDark[600], 0.3),
    },
  }),
]);

const fallbackTheme = createTheme({ cssVariables: true });

function Demo({
  name,
  children,
  control,
  ...props
}: {
  name: string;
  theme: Theme | undefined;
  children: React.ReactElement<unknown>;
  control?: { prop: string; values: Array<string>; defaultValue?: string };
}) {
  const [propValue, setPropValue] = React.useState(
    control ? control.defaultValue || control.values[0] : '',
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {control ? (
        <Box sx={{ minHeight: 40, ml: -1, mt: -1 }}>
          <Tabs
            value={propValue}
            onChange={(event, value) => setPropValue(value)}
            sx={{
              minHeight: 'initial',
              '& .MuiTabs-indicator': {
                bgcolor: 'transparent',
                '&::before': {
                  height: '100%',
                  content: '""',
                  display: 'block',
                  width: (theme) => `calc(100% - ${theme.spacing(2)})`,
                  bgcolor: 'primary.main',
                  position: 'absolute',
                  top: 0,
                  left: (theme) => theme.spacing(1),
                },
              },
              '& .MuiTab-root': {
                px: 1,
                pt: 0.5,
                minWidth: 'initial',
                minHeight: 'initial',
                fontWeight: 'medium',
              },
            }}
          >
            {control.values.map((value) => (
              <Tab key={value} value={value} label={capitalize(value)} />
            ))}
          </Tabs>
        </Box>
      ) : null}
      <Box
        className="mui-default-theme"
        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ThemeProvider theme={props.theme ?? fallbackTheme}>
          {React.cloneElement(children, {
            ...(control && {
              [control.prop]: propValue,
            }),
          })}
        </ThemeProvider>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 'semiBold' }}>
        {name}
      </Typography>
    </Box>
  );
}

const StyledChip = styled(Chip)(({ theme }) => [
  {
    fontWeight: 700,
    '&.MuiChip-outlined': {
      color: (theme.vars || theme).palette.text.secondary,
    },
    '&.MuiChip-filled': {
      borderColor: (theme.vars || theme).palette.primary[300],
      backgroundColor: alpha(theme.palette.primary[100], 0.5),
      color: (theme.vars || theme).palette.primary[600],
    },
  },
  theme.applyDarkStyles({
    '&.MuiChip-filled': {
      borderColor: (theme.vars || theme).palette.primary[500],
      backgroundColor: (theme.vars || theme).palette.primary[800],
      color: (theme.vars || theme).palette.primary[100],
    },
  }),
]);

const themedComponents = getThemedComponents();
export function buildTheme(): ThemeOptions {
  return {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: '99px',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 24 / 16,
            textTransform: 'none',
            variants: [
              {
                props: { size: 'small' },
                style: { [`& .${buttonClasses.icon}`]: { fontSize: '0.875rem' } },
              },
              {
                props: { size: 'medium' },
                style: { [`& .${buttonClasses.icon}`]: { fontSize: '0.875rem' } },
              },
              {
                props: { size: 'large' },
                style: { [`& .${buttonClasses.icon}`]: { fontSize: '1rem' } },
              },
            ],
          },
          sizeSmall: ({ theme }) => ({
            padding: theme.spacing(0.5, 1),
          }),
          sizeMedium: ({ theme }) => ({
            padding: theme.spacing(0.8, 2),
          }),
          sizeLarge: ({ theme }) => ({
            padding: theme.spacing(1, 2),
            fontSize: '1rem',
          }),
          text: ({ theme }) => ({
            color: (theme.vars || theme).palette.primary[600],
            ...theme.applyDarkStyles({
              color: (theme.vars || theme).palette.primary[300],
            }),
          }),
          contained: ({ theme }) => ({
            color: (theme.vars || theme).palette.primaryDark[50],
            backgroundColor: (theme.vars || theme).palette.primary[600],
            boxShadow: '0 2px 0 rgba(255,255,255,0.1) inset, 0 -1px 0 rgba(0,0,0,0.1) inset',
            border: '1px solid',
            borderColor: (theme.vars || theme).palette.primary[600],
            ...theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primary[600],
              borderColor: (theme.vars || theme).palette.primary[800],
            }),
          }),
          outlined: ({ theme }) => ({
            borderColor: (theme.vars || theme).palette.primary[300],
            ...theme.applyDarkStyles({
              color: (theme.vars || theme).palette.primary[300],
              backgroundColor: alpha(theme.palette.primary[900], 0.1),
              borderColor: alpha(theme.palette.primary[300], 0.5),
            }),
          }),
        },
      },
      MuiAlert: {
        defaultProps: {
          icon: <CheckCircleRounded />,
        },
        styleOverrides: {
          root: ({ theme }) => [
            {
              padding: theme.spacing(1.5),
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primaryDark[800],
              },
              variants: [
                {
                  props: { variant: 'standard', color: 'info' },
                  style: [
                    {
                      backgroundColor: (theme.vars || theme).palette.primary[50],
                      color: (theme.vars || theme).palette.primary[600],
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primaryDark[100], 0.5),
                      '& .MuiAlert-icon': {
                        color: (theme.vars || theme).palette.primary[500],
                      },
                    },
                    theme.applyDarkStyles({
                      backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
                      color: (theme.vars || theme).palette.primaryDark[50],
                      borderColor: alpha(theme.palette.primaryDark[500], 0.2),
                      '& .MuiAlert-icon': {
                        color: (theme.vars || theme).palette.primaryDark[50],
                      },
                    }),
                  ],
                },
              ],
            },
            theme.applyDarkStyles({
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primaryDark[100],
              },
            }),
          ],
          filled: ({ theme }) => ({
            color: (theme.vars || theme).palette.primary[50],
            backgroundColor: (theme.vars || theme).palette.primary[600],
            '& .MuiAlert-icon': {
              color: '#fff',
            },
            ...theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primary[600],
            }),
          }),
          outlined: ({ theme }) => [
            {
              color: (theme.vars || theme).palette.primaryDark[700],
              backgroundColor: '#fff',
              borderColor: (theme.vars || theme).palette.primary[100],
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primary[500],
              },
            },
            theme.applyDarkStyles({
              color: (theme.vars || theme).palette.primaryDark[50],
              backgroundColor: 'transparent',
              borderColor: (theme.vars || theme).palette.primaryDark[600],
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primaryDark[100],
              },
            }),
          ],
          message: {
            padding: 0,
            fontWeight: 500,
          },
          icon: {
            paddingTop: 1,
            paddingBottom: 0,
            '& > svg': {
              fontSize: '1.125rem',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              '& .MuiInputLabel-outlined.Mui-focused': {
                color: (theme.vars || theme).palette.grey[800],
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                background: 'transparent',
                borderColor: (theme.vars || theme).palette.primary[400],
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'transparent',
                borderColor: (theme.vars || theme).palette.grey[50],
              },
              '& .MuiInputBase-root': {
                fontWeight: 700,
                '&::before': {
                  borderColor: (theme.vars || theme).palette.grey[300],
                },
              },
              '& .MuiFilledInput-root': {
                backgroundColor: '#fff',
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.grey[100],
                '&::before': {
                  borderColor: (theme.vars || theme).palette.grey[300],
                },
                '&::after': {
                  borderColor: (theme.vars || theme).palette.primary[400],
                },
                '&:hover': {
                  borderColor: (theme.vars || theme).palette.grey[200],
                },
              },
              '& .MuiInputLabel-filled.Mui-focused': {
                color: (theme.vars || theme).palette.grey[800],
              },
              '& .MuiInput-root.Mui-focused': {
                '&::after': {
                  borderColor: (theme.vars || theme).palette.primary[400],
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: (theme.vars || theme).palette.grey[800],
              },
            },
            theme.applyDarkStyles({
              '& .MuiInputBase-root': {
                '&::before': {
                  borderColor: (theme.vars || theme).palette.primaryDark[500],
                },
              },
              '& .MuiInputLabel-outlined.Mui-focused': {
                color: (theme.vars || theme).palette.primary[300],
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme.vars || theme).palette.primary[300],
              },
              '& .MuiOutlinedInput-input': {
                borderRadius: 'inherit',
                backgroundColor: (theme.vars || theme).palette.primaryDark[800],
              },
              '& .MuiFilledInput-root': {
                borderColor: (theme.vars || theme).palette.primaryDark[700],
                backgroundColor: alpha(theme.palette.primaryDark[900], 0.5),
                '&::after': {
                  borderColor: (theme.vars || theme).palette.primary[300],
                },
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.8),
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                },
              },
              '& .MuiInputLabel-filled.Mui-focused': {
                color: (theme.vars || theme).palette.grey[500],
              },
              '& .MuiInput-root.Mui-focused': {
                '&::after': {
                  borderColor: (theme.vars || theme).palette.primaryDark[400],
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: (theme.vars || theme).palette.grey[500],
              },
            }),
          ],
        },
      },
      MuiTooltip: themedComponents.components?.MuiTooltip,
      MuiPaper: themedComponents.components?.MuiPaper,
      MuiTableHead: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: 8,
            backgroundColor: alpha(theme.palette.grey[50], 0.5),
            borderColor: (theme.vars || theme).palette.divider,
            ...theme.applyDarkStyles({
              backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
            }),
          }),
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: 8,
            borderColor: (theme.vars || theme).palette.divider,
          }),
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: ({ theme }) => ({
            boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
            ...theme.applyDarkStyles({
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            }),
          }),
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            padding: 0,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              margin: theme.spacing(1),
              padding: '4px 8px',
              borderRadius: '8px',
              '& .MuiListItemIcon-root': {
                minWidth: '24px',
              },
              '& svg': {
                fontSize: '1rem',
                color: (theme.vars || theme).palette.grey[500],
              },
            },
            theme.applyDarkStyles({
              '& svg': {
                color: (theme.vars || theme).palette.grey[400],
              },
            }),
          ],
        },
      },
    },
  };
}

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');
export const defaultTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'data-mui-color-scheme',
});
export const customTheme = extendTheme({
  cssVarPrefix: 'muidocs',
  colorSchemeSelector: 'data-mui-color-scheme',
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: darkPalette,
    },
  },
  ...designTokens,
  ...buildTheme(),
});

export default function MaterialDesignComponents() {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const [customized, setCustomized] = React.useState(false);
  const theme = customized ? customTheme : defaultTheme;
  return (
    <div>
      <Box sx={{ mt: { xs: 2, md: 2 }, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <StyledChip
          size="small"
          label="Custom theme"
          variant={customized ? 'filled' : 'outlined'}
          color={customized ? 'primary' : 'secondary'}
          onClick={() => setCustomized(true)}
          sx={{ mr: 1 }}
        />
        <StyledChip
          size="small"
          label="Material Design"
          variant={!customized ? 'filled' : 'outlined'}
          color={!customized ? 'primary' : 'secondary'}
          onClick={() => setCustomized(false)}
        />
      </Box>
      <Grid>
        <div>
          <Demo
            theme={theme}
            name="Button"
            control={{ prop: 'size', values: ['small', 'medium', 'large'], defaultValue: 'medium' }}
          >
            <Button variant="contained" startIcon={<ShoppingCartRounded />}>
              Add to Cart
            </Button>
          </Demo>
        </div>
        <div>
          <Demo
            theme={theme}
            name="Alert"
            control={{ prop: 'variant', values: ['standard', 'filled', 'outlined'] }}
          >
            <Alert color="info">Check out this alert!</Alert>
          </Demo>
        </div>
        <div>
          <Demo
            theme={theme}
            name="Text Field"
            control={{ prop: 'variant', values: ['outlined', 'standard', 'filled'] }}
          >
            <TextField id="material-design-textfield" label="Username" defaultValue="Ultraviolet" />
          </Demo>
        </div>
        <div>
          <Demo theme={theme} name="Menu">
            <React.Fragment>
              <Button onClick={(event) => setAnchor(event.target as HTMLElement)}>
                Click to open
              </Button>
              <Menu
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
                slotProps={{ paper: { variant: 'outlined', elevation: 0 } }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <MailRounded />
                  </ListItemIcon>
                  Contact
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <VerifiedUserRounded />
                  </ListItemIcon>
                  Security
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <HelpCenterRounded />
                  </ListItemIcon>
                  About us
                </MenuItem>
              </Menu>
            </React.Fragment>
          </Demo>
        </div>
        <div>
          <Demo theme={theme} name="Table">
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{
                '& .MuiTableBody-root > .MuiTableRow-root:last-of-type > .MuiTableCell-root': {
                  borderBottomWidth: 0,
                },
              }}
            >
              <Table aria-label="demo table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert</TableCell>
                    <TableCell>Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Frozen yoghurt</TableCell>
                    <TableCell>109</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cupcake</TableCell>
                    <TableCell>305</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Demo>
        </div>
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Want to see more?
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 0.5, maxWidth: 250, mx: 'auto' }}
          >
            Check out the docs for details of the complete library.
          </Typography>
          <Button
            component={Link}
            noLinkStyle
            href={ROUTES.documentation}
            endIcon={<KeyboardArrowRightRounded />}
          >
            Learn more
          </Button>
        </Box>
      </Grid>
    </div>
  );
}
