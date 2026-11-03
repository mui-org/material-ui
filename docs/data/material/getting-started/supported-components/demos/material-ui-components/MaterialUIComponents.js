import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/internal-core-docs/Link';

const components = [
  {
    name: 'Accordion',
    materialUI: '/material-ui/react-accordion/',
    materialDesign: 'https://m1.material.io/components/expansion-panels.html',
  },
  { name: 'Alert', materialUI: '/material-ui/react-alert' },
  {
    name: 'App Bar: top',
    materialUI: '/material-ui/react-app-bar/',
    materialDesign: 'https://m2.material.io/components/app-bars-top',
  },
  {
    name: 'App Bar: bottom',
    materialUI: '/material-ui/react-app-bar#bottom-app-bar',
    materialDesign: 'https://m2.material.io/components/app-bars-bottom',
  },
  { name: 'Autocomplete', materialUI: '/material-ui/react-autocomplete' },
  {
    name: 'Banner',
    materialUI: 'Composable',
    materialDesign: 'https://m2.material.io/components/banners',
  },
  { name: 'Avatar', materialUI: '/material-ui/react-avatar' },
  { name: 'Badge', materialUI: '/material-ui/react-badge' },
  {
    name: 'Bottom Navigation',
    materialUI: '/material-ui/react-bottom-navigation/',
    materialDesign: 'https://m2.material.io/components/bottom-navigation',
  },
  { name: 'Breadcrumbs', materialUI: '/material-ui/react-breadcrumbs' },
  {
    name: 'Button',
    materialUI: '/material-ui/react-button/',
    materialDesign: 'https://m2.material.io/components/buttons',
  },
  {
    name: 'Floating Action Button',
    materialDesign:
      'https://m2.material.io/components/buttons-floating-action-button',
    materialUI: '/material-ui/react-floating-action-button',
  },
  { name: 'Button Group', materialUI: '/material-ui/react-button-group' },
  {
    name: 'Card',
    materialUI: '/material-ui/react-card/',
    materialDesign: 'https://m2.material.io/components/cards',
  },
  {
    name: 'Checkbox',
    materialUI: '/material-ui/react-checkbox/',
    materialDesign: 'https://m2.material.io/components/checkboxes',
  },
  {
    name: 'Chip',
    materialUI: '/material-ui/react-chip/',
    materialDesign: 'https://m2.material.io/components/chips',
  },
  {
    name: 'Data Grid',
    materialUI: '/x/react-data-grid/',
    materialDesign: 'https://m2.material.io/components/data-tables',
  },
  {
    name: 'Date Pickers',
    materialUI: '/x/react-date-pickers/',
    materialDesign: 'https://m2.material.io/components/date-pickers',
  },
  {
    name: 'Dialog',
    materialUI: '/material-ui/react-dialog/',
    materialDesign: 'https://m2.material.io/components/dialogs',
  },
  {
    name: 'Divider',
    materialUI: '/material-ui/react-divider/',
    materialDesign: 'https://m2.material.io/components/dividers',
  },
  {
    name: 'Drawer',
    materialUI: '/material-ui/react-drawer/',
    materialDesign: 'https://m2.material.io/components/navigation-drawer',
  },
  {
    name: 'Icons',
    materialUI: '/material-ui/icons/',
    materialDesign: 'https://m2.material.io/design/iconography/system-icons.html',
  },
  {
    name: 'Image List',
    materialUI: '/material-ui/react-image-list/',
    materialDesign: 'https://m2.material.io/components/image-lists',
  },
  { name: 'Link', materialUI: '/material-ui/react-link/' },
  {
    name: 'List',
    materialUI: '/material-ui/react-list/',
    materialDesign: 'https://m2.material.io/components/lists',
  },
  { name: 'Masonry', materialUI: '/material-ui/react-masonry/' },
  {
    name: 'Material Icons',
    materialUI: '/material-ui/material-icons/',
    materialDesign: 'https://fonts.google.com/icons',
  },
  {
    name: 'Menu',
    materialUI: '/material-ui/react-menu/',
    materialDesign: 'https://m2.material.io/components/menus',
  },
  {
    name: 'Modal',
    materialUI: '/material-ui/react-modal/',
    materialDesign: 'https://m2.material.io/components/dialogs',
  },
  {
    name: 'Navigation Rail',
    materialDesign: 'https://m2.material.io/components/navigation-rail',
  },
  {
    name: 'Number Field',
    materialUI: '/material-ui/react-number-field/',
    baseUI: 'https://base-ui.com/react/components/number-field',
  },
  { name: 'Pagination', materialUI: '/material-ui/react-pagination/' },
  {
    name: 'Paper',
    materialUI: '/material-ui/react-paper/',
    materialDesign: 'https://m2.material.io/design/environment/elevation.html',
  },
  {
    name: 'Progress',
    materialUI: '/material-ui/react-progress/',
    materialDesign: 'https://m2.material.io/components/progress-indicators',
  },
  {
    name: 'Radio Group',
    materialUI: '/material-ui/react-radio-button/',
    materialDesign: 'https://m2.material.io/components/radio-buttons',
  },
  { name: 'Rating', materialUI: '/material-ui/react-rating/' },
  {
    name: 'Select',
    materialUI: '/material-ui/react-select/',
    materialDesign: 'https://m2.material.io/components/menus#exposed-dropdown-menu',
  },
  { name: 'Skeleton', materialUI: '/material-ui/react-skeleton/' },
  {
    name: 'Slider',
    materialUI: '/material-ui/react-slider/',
    materialDesign: 'https://m2.material.io/components/sliders',
  },
  {
    name: 'Snackbar',
    materialUI: '/material-ui/react-snackbar/',
    materialDesign: 'https://m2.material.io/components/snackbars',
  },
  { name: 'Speed Dial', materialUI: '/material-ui/react-speed-dial' },
  {
    name: 'Stepper',
    materialUI: '/material-ui/react-stepper/',
    materialDesign: 'https://m1.material.io/components/steppers.html',
  },
  {
    name: 'Switch',
    materialUI: '/material-ui/react-switch/',
    materialDesign: 'https://m2.material.io/components/switches',
  },
  {
    name: 'Table',
    materialUI: '/material-ui/react-table/',
    materialDesign: 'https://m2.material.io/components/data-tables',
  },
  {
    name: 'Tabs',
    materialUI: '/material-ui/react-tabs/',
    materialDesign: 'https://m2.material.io/components/tabs',
  },
  {
    name: 'Text Field',
    materialUI: '/material-ui/react-text-field/',
    materialDesign: 'https://m2.material.io/components/text-fields',
  },
  { name: 'Timeline', materialUI: '/material-ui/react-timeline/' },
  { name: 'Toggle Button', materialUI: '/material-ui/react-toggle-button/' },
  {
    name: 'Tooltip',
    materialUI: '/material-ui/react-tooltip/',
    materialDesign: 'https://m2.material.io/components/tooltips',
  },
  { name: 'Transfer List', materialUI: '/material-ui/react-transfer-list/' },
  { name: 'Tree View', materialUI: '/x/react-tree-view/' },
  {
    name: 'Typography',
    materialUI: '/material-ui/react-typography/',
    materialDesign: 'https://m2.material.io/design/typography/the-type-system.html',
  },
];

export default function MaterialUIComponents() {
  return (
    <Paper sx={{ width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Components</TableCell>
            <TableCell>Material Design</TableCell>
            <TableCell>Material UI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {components.map((component) => (
            <TableRow key={component.name}>
              <TableCell>
                <Typography variant="body2">{component.name}</Typography>
              </TableCell>
              <TableCell>
                {component.materialDesign ? (
                  <Link
                    variant="body2"
                    data-no-markdown-link="true"
                    href={component.materialDesign}
                  >
                    {component.materialDesign.substring(8, 10) === 'm1'
                      ? 'MD 1 (legacy)'
                      : 'MD 2'}
                  </Link>
                ) : (
                  'No guidelines'
                )}
              </TableCell>
              <TableCell>
                {component.materialUI &&
                component.materialUI.startsWith('/material-ui') &&
                !component.baseUI ? (
                  <Link
                    variant="body2"
                    data-no-markdown-link="true"
                    href={component.materialUI}
                  >
                    Native support
                  </Link>
                ) : null}
                {component.baseUI ? (
                  <Link
                    variant="body2"
                    data-no-markdown-link="true"
                    href={component.baseUI}
                  >
                    Composed with Base UI
                  </Link>
                ) : null}
                {component.materialUI && component.materialUI.startsWith('/x') ? (
                  <Link
                    variant="body2"
                    data-no-markdown-link="true"
                    href={component.materialUI}
                  >
                    Support in MUI X
                  </Link>
                ) : null}
                {component.materialUI === 'Composable' ? 'Composable' : null}
                {component.materialUI == null ? '❌ No support' : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
