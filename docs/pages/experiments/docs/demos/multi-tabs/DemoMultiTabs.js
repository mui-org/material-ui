import {
  generateFilledQuantity,
  randomColor,
  randomCountry,
  randomEmail,
  randomIncoterm,
  randomInt,
  randomName,
  randomRating,
  randomStatusOptions,
} from '@mui/x-data-grid-generator';

// eslint-disable-next-line no-restricted-imports
import {
  COUNTRY_ISO_OPTIONS_SORTED,
  INCOTERM_OPTIONS,
  STATUS_OPTIONS,
} from '@mui/x-data-grid-generator/services/static-data';
import { DataGrid, gridStringOrNumberComparator } from '@mui/x-data-grid';
import { renderAvatar } from '../../../../../data/experiments/renderers/renderAvatar';
import { renderEmail } from '../../../../../data/experiments/renderers/renderEmail';
import {
  renderEditRating,
  renderRating,
} from '../../../../../data/experiments/renderers/renderRating';
import {
  renderCountry,
  renderEditCountry,
} from '../../../../../data/experiments/renderers/renderCountry';
import { renderSparkline } from '../../../../../data/experiments/renderers/renderSparkline';
import {
  renderEditProgress,
  renderProgress,
} from '../../../../../data/experiments/renderers/renderProgress';
import {
  renderEditStatus,
  renderStatus,
} from '../../../../../data/experiments/renderers/renderStatus';
import {
  renderEditIncoterm,
  renderIncoterm,
} from '../../../../../data/experiments/renderers/renderIncoterm';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 120,
    editable: true,
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    display: 'flex',
    renderCell: renderAvatar,
    valueGetter: (value, row) =>
      row.name == null || row.avatar == null ? null : { name: row.name, color: row.avatar },
    sortable: false,
    filterable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    renderCell: renderEmail,
    width: 150,
    editable: true,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    display: 'flex',
    renderCell: renderRating,
    renderEditCell: renderEditRating,
    width: 180,
    type: 'number',
    editable: true,
    availableAggregationFunctions: ['avg', 'min', 'max', 'size'],
  },
  {
    field: 'country',
    headerName: 'Country',
    type: 'singleSelect',
    valueOptions: COUNTRY_ISO_OPTIONS_SORTED,
    valueFormatter: (value) => value?.label,
    renderCell: renderCountry,
    renderEditCell: renderEditCountry,
    sortComparator: (v1, v2, param1, param2) =>
      gridStringOrNumberComparator(v1.label, v2.label, param1, param2),
    width: 150,
    editable: true,
  },
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    valueFormatter: (value) => {
      if (!value || typeof value !== 'number') {
        return value;
      }
      return `$${value.toLocaleString()}`;
    },
    editable: true,
  },
  {
    field: 'monthlyActivity',
    headerName: 'Monthly activity',
    type: 'custom',
    resizable: false,
    filterable: false,
    sortable: false,
    editable: false,
    groupable: false,
    display: 'flex',
    renderCell: renderSparkline,
    width: 150,
    valueGetter: (value, row) => row.monthlyActivity,
  },
  {
    field: 'budget',
    headerName: 'Budget left',
    renderCell: renderProgress,
    renderEditCell: renderEditProgress,
    availableAggregationFunctions: ['min', 'max', 'avg', 'size'],
    type: 'number',
    width: 120,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: renderStatus,
    renderEditCell: renderEditStatus,
    type: 'singleSelect',
    valueOptions: STATUS_OPTIONS,
    width: 150,
    editable: true,
  },
  {
    field: 'incoTerm',
    headerName: 'Incoterm',
    renderCell: renderIncoterm,
    renderEditCell: renderEditIncoterm,
    type: 'singleSelect',
    valueOptions: INCOTERM_OPTIONS,
    editable: true,
  },
];

const rows = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  name: randomName({}, {}),
  avatar: randomColor(),
  email: randomEmail(),
  rating: randomRating(),
  country: randomCountry(),
  salary: randomInt(35000, 80000),
  monthlyActivity: Array.from({ length: 30 }, () => randomInt(1, 25)),
  budget: generateFilledQuantity({ quantity: 100 }),
  status: randomStatusOptions(),
  incoTerm: randomIncoterm(),
}));

export default function DemoMultiTabs() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
