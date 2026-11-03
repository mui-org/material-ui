import type { GridRenderEditCellParams } from '@mui/x-data-grid';
import { useGridRootProps, useGridApiContext, GridEditModes } from '@mui/x-data-grid';
import type { SelectProps } from '@mui/material/Select';
import Select from '@mui/material/Select';
import type { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';

const STATUS_OPTIONS = ['Open', 'PartiallyFilled', 'Filled', 'Rejected'];

export default function EditStatus(props: GridRenderEditCellParams) {
  const { id, value, field } = props;
  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext();

  const handleChange: SelectProps['onChange'] = async (event) => {
    const isValid = await apiRef.current.setEditCellValue({ id, field, value: event.target.value });

    if (isValid && rootProps.editMode === GridEditModes.Cell) {
      apiRef.current.stopCellEditMode({ id, field, cellToFocusAfter: 'below' });
    }
  };

  const handleClose: MenuProps['onClose'] = (event, reason) => {
    if (reason === 'backdropClick') {
      apiRef.current.stopCellEditMode({ id, field, ignoreModifications: true });
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      MenuProps={{
        onClose: handleClose,
      }}
      autoFocus
      fullWidth
      open
    >
      {STATUS_OPTIONS.map((option) => {
        let IconComponent: any = null;
        if (option === 'Rejected') {
          IconComponent = ReportProblemIcon;
        } else if (option === 'Open') {
          IconComponent = InfoIcon;
        } else if (option === 'PartiallyFilled') {
          IconComponent = AutorenewIcon;
        } else if (option === 'Filled') {
          IconComponent = DoneIcon;
        }

        let label = option;
        if (option === 'PartiallyFilled') {
          label = 'Partially Filled';
        }

        return (
          <MenuItem
            key={option}
            value={option}
            dense
            sx={{ '& .MuiListItemIcon-root': { minWidth: 24, '& > svg': { fontSize: '1rem' } } }}
          >
            <ListItemIcon>
              <IconComponent />
            </ListItemIcon>
            <ListItemText primary={label} sx={{ overflow: 'hidden' }} />
          </MenuItem>
        );
      })}
    </Select>
  );
}
