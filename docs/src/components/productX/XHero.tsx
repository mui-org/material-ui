import * as React from 'react';
import { red, green, yellow, blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { alpha } from '@mui/material/styles';
import {
  DataGridPremium,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { useDemoData } from '@mui/x-data-grid-generator';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from '@mui/internal-core-docs/IconImage';
import FolderTreeView from 'docs/src/components/showcase/FolderTreeView';
import { ROUTES } from '@mui/internal-core-docs/constants';
import dayjs from 'dayjs';

const startDate = dayjs().date(10);
const endDate = dayjs().add(28, 'day');

const visibleFields = [
  'commodity',
  'unitPrice',
  'feeRate',
  'quantity',
  'filledQuantity',
  'isFilled',
  'traderName',
  'status',
  'totalPrice',
];

export default function XHero() {
  const { loading, data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10000,
    editable: true,
    visibleFields,
  });
  const apiRef = useGridApiRef();

  const sortedColumns = React.useMemo(() => {
    return [...data.columns].sort((a, b) => {
      return visibleFields.indexOf(a.field) - visibleFields.indexOf(b.field);
    });
  }, [data.columns]);

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      ...data.initialState,
      rowGrouping: {
        model: ['commodity'],
      },
      aggregation: {
        model: {
          quantity: 'sum',
          unitPrice: 'avg',
          feeRate: 'min',
          totalPrice: 'max',
        },
      },
    },
  });

  const groupingColDef = React.useMemo(
    () => ({
      headerClassName: 'grouping-column-header',
    }),
    [],
  );

  const rowGroupingCounterRef = React.useRef(0);
  const isGroupExpandedByDefault = React.useCallback(() => {
    rowGroupingCounterRef.current += 1;
    return rowGroupingCounterRef.current === 3;
  }, []);

  return (
    <HeroContainer
      linearGradient
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="body2"
            sx={[
              {
                fontWeight: 'bold',
              },
              (theme) => ({
                color: 'primary.600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                '& > *': { mr: 1 },
                ...theme.applyDarkStyles({
                  color: 'primary.400',
                }),
              }),
            ]}
          >
            <IconImage width={28} height={28} loading="eager" name="product-advanced" /> MUI X
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Performant
            <br />
            <GradientText>advanced</GradientText>
            <br /> components
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3, maxWidth: 500 }}>
            Build complex and data-rich applications using a growing list of advanced React
            components, like the Data Grid, Date and Time Pickers, Charts, and more!
          </Typography>
          <GetStartedButtons
            primaryUrl={ROUTES.xIntro}
            secondaryLabel="Learn about licensing"
            secondaryUrl={ROUTES.xLicensing}
          />
        </Box>
      }
      rightSx={{
        p: { md: 2, lg: 3, xl: 4 },
        overflow: 'hidden', // the components on the Hero section are mostly illustrative, even though they're interactive. That's why scrolling is disabled.
      }}
      right={
        <React.Fragment>
          <Paper
            variant="outlined"
            sx={(theme) => ({
              backgroundColor: '#fff',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
              mb: { md: 2, lg: 3, xl: 4 },
              overflow: 'hidden',
              ...theme.applyDarkStyles({
                borderColor: 'primaryDark.700',
                backgroundColor: 'primaryDark.900',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
              }),
            })}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 'semiBold', textAlign: 'center', py: 1.5 }}
            >
              Trades, March 2023
            </Typography>
            <Divider />
            <Box
              sx={[
                {
                  height: { md: 300, xl: 370 },
                  '& .MuiDataGrid-root': {
                    border: 0,
                    color: 'text.secondary',
                    '--DataGrid-rowBorderColor': (theme) => theme.palette.grey[200],
                    '& .MuiCheckbox-root': {
                      p: 0.5,
                      '& > svg': {
                        fontSize: '1.25rem',
                      },
                    },
                    [`& .MuiDataGrid-aggregationColumnHeaderLabel`]: {
                      fontWeight: 'normal',
                    },
                    [`& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within`]:
                      {
                        outline: 'none',
                      },
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                      padding: 0,
                      color: 'text.primary',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      flexGrow: 1,
                      fontSize: '0.875rem',
                    },
                    '& button, & button > svg': {
                      fontSize: 16,
                    },
                    '& .MuiChip-root.Rejected': {
                      color: red[800],
                      backgroundColor: red[50],
                      borderColor: red[100],
                    },
                    '& .MuiChip-root.Filled': {
                      color: green[800],
                      backgroundColor: green[50],
                      borderColor: green[100],
                    },
                    '& .MuiChip-root.Open': {
                      color: blue[800],
                      backgroundColor: blue[50],
                      borderColor: blue[100],
                    },
                    '& .MuiChip-root.PartiallyFilled': {
                      color: 'text.secondary',
                      backgroundColor: yellow[50],
                      borderColor: yellow[600],
                    },
                    '& .grouping-column-header': {
                      pl: 6,
                    },
                  },
                },
                (theme) =>
                  theme.applyDarkStyles({
                    '& .MuiDataGrid-root': {
                      '--DataGrid-rowBorderColor': alpha(theme.palette.primaryDark[600], 0.5),
                      '& .MuiChip-root.Rejected': {
                        color: red[200],
                        backgroundColor: alpha(red[900], 0.2),
                        borderColor: alpha(red[700], 0.5),
                      },
                      '& .MuiChip-root.Filled': {
                        color: green[200],
                        backgroundColor: alpha(green[900], 0.2),
                        borderColor: alpha(green[700], 0.5),
                      },
                      '& .MuiChip-root.Open': {
                        color: blue[200],
                        backgroundColor: alpha(blue[900], 0.2),
                        borderColor: alpha(blue[700], 0.5),
                      },
                      '& .MuiChip-root.PartiallyFilled': {
                        color: yellow[200],
                        backgroundColor: alpha(yellow[900], 0.2),
                        borderColor: alpha(yellow[700], 0.2),
                      },
                      '& .MuiDataGrid-pinnedRows': {
                        backgroundColor: alpha(theme.palette.primaryDark[800], 1),
                        backgroundImage: 'none',
                        '& .MuiDataGrid-footerCell': {
                          color: 'primary.light',
                        },
                      },
                    },
                  }),
              ]}
            >
              <DataGridPremium
                {...data}
                columns={sortedColumns}
                apiRef={apiRef}
                initialState={initialState}
                disableRowSelectionOnClick
                groupingColDef={groupingColDef}
                rowHeight={36}
                columnHeaderHeight={48}
                hideFooter
                loading={loading}
                isGroupExpandedByDefault={isGroupExpandedByDefault}
              />
            </Box>
          </Paper>
          <Box
            sx={{
              display: 'flex',
              overflow: { md: 'auto', xl: 'unset' },
              m: { md: -2, lg: -3, xl: 0 },
              p: { md: 2, lg: 3, xl: 0 },
            }}
          >
            <Paper
              variant="outlined"
              sx={(theme) => ({
                minWidth: 300,
                mr: { md: 2, lg: 3, xl: 4 },
                flexGrow: 1,
                backgroundColor: '#fff',
                borderColor: 'divider',
                boxShadow: `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
                ...theme.applyDarkStyles({
                  borderColor: 'primaryDark.700',
                  backgroundColor: 'primaryDark.900',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                }),
              })}
            >
              <Typography variant="body2" sx={{ fontWeight: 'semiBold', p: 2 }}>
                Cool UI project
              </Typography>
              <Divider />
              <FolderTreeView />
            </Paper>
            <Paper
              variant="outlined"
              sx={[
                {
                  borderColor: 'divider',
                  boxShadow: (theme) => `0px 4px 12px ${alpha(theme.palette.grey[200], 0.6)}`,
                  '& > div': {
                    borderRadius: 1,
                    overflow: 'auto',
                    backgroundColor: 'initial',
                  },
                  '& .MuiTypography-subtitle1': {
                    fontSize: '0.875rem',
                  },
                  '& .MuiDayCalendar-weekDayLabel': {
                    width: { xs: 32, xl: 36 },
                    height: 32,
                    margin: 0,
                  },
                  '& .MuiDayCalendar-root': {
                    minWidth: { xs: 268, xl: 300 },
                  },
                  '& .MuiPickersSlideTransition-root': {
                    minWidth: { xs: 268, xl: 300 },
                    minHeight: { xs: 238, xl: 288 },
                  },
                  '& [role="row"]': {
                    margin: { xs: '4px 0', xl: '6px 0' },
                  },
                  '& .MuiPickersArrowSwitcher-root': {
                    padding: 1,
                  },
                  '& .MuiDateRangePickerDay-root': {
                    '--PickerDay-horizontalMargin': '0px',
                    '--PickerDay-size': { xs: '32px', xl: '36px' },
                    fontWeight: 400,
                  },
                  '& .MuiDateRangePickerDay-selected': {
                    fontWeight: 600,
                  },
                  '& .MuiDateRangePickerDay-today': {
                    outlineColor: 'primary.300',
                  },
                },
                (theme) =>
                  theme.applyDarkStyles({
                    borderColor: 'primaryDark.700',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                    backgroundColor: 'primaryDark.900',
                    '& .MuiDateRangePickerDay-selected': {
                      color: '#FFF',
                    },
                  }),
              ]}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateRangePicker
                  displayStaticWrapperAs="desktop"
                  defaultValue={[startDate, endDate]}
                />
              </LocalizationProvider>
            </Paper>
          </Box>
        </React.Fragment>
      }
    />
  );
}
