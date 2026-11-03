import * as React from 'react';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LibraryAddCheckRounded from '@mui/icons-material/LibraryAddCheckRounded';
import SortByAlphaRounded from '@mui/icons-material/SortByAlphaRounded';
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined';
import FilterAltRounded from '@mui/icons-material/FilterAltRounded';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { Link } from '@mui/internal-core-docs/Link';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import {
  Item,
  Group,
  Highlighter,
  More,
  Frame,
  AppearingInfoBox,
} from '@mui/internal-core-docs/AppLayout';
import FlashCode from 'docs/src/components/animation/FlashCode';
import { ShowcaseCodeWrapper } from 'docs/src/components/home/ShowcaseContainer';
import XGridGlobalStyles from 'docs/src/components/home/XGridGlobalStyles';

import { ROUTES } from '@mui/internal-core-docs/constants';

const DEMOS = ['Editing', 'Selection', 'Sorting', 'Pagination', 'Filtering'] as const;

const code = `<DataGrid
  columns={[ // column definition example
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      sortable: true,
      filterable: true,
    },
  ]}
  checkboxSelection
  disableRowSelectionOnClick
  pagination
/>`;

const startLine = {
  [DEMOS[0]]: 6,
  [DEMOS[1]]: 11,
  [DEMOS[2]]: 7,
  [DEMOS[3]]: 13,
  [DEMOS[4]]: 8,
};

const dataGridStyleOverrides = <XGridGlobalStyles selector="#data-grid-demo" pro />;

export default function XDataGrid() {
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number] | null>(null);
  const gridApiRef = useGridApiRef();
  const icons = {
    [DEMOS[0]]: <EditRoundedIcon fontSize="small" />,
    [DEMOS[1]]: <LibraryAddCheckRounded fontSize="small" />,
    [DEMOS[2]]: <SortByAlphaRounded fontSize="small" />,
    [DEMOS[3]]: <AutoStoriesOutlined fontSize="small" />,
    [DEMOS[4]]: <FilterAltRounded fontSize="small" />,
  };
  const { loading, data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 1000,
    maxColumns: 5,
    editable: true,
  });
  const firstRowId = data.rows[0]?.id;
  React.useEffect(() => {
    if (gridApiRef && gridApiRef.current && !loading) {
      if (demo) {
        gridApiRef.current.scroll({ top: 0, left: 0 });
      }
      if (demo === DEMOS[0]) {
        document.body.focus();
        setTimeout(() => {
          const cell = document.querySelector(
            '#data-grid-demo div[role="cell"][data-field="name"]',
          );
          if (cell) {
            const clickEvent = new MouseEvent('dblclick', { bubbles: true, cancelable: true });
            cell.dispatchEvent(clickEvent);
          }
        }, 120);
      }
      if (demo === DEMOS[1]) {
        const checkbox = document.querySelector(
          '#data-grid-demo div[data-field="__check__"] input',
        ) as HTMLInputElement | null;
        if (checkbox && !checkbox.checked) {
          checkbox.click();
        }
      }
      if (demo === DEMOS[2]) {
        const sorter = document.querySelector(
          '#data-grid-demo button[aria-label="Sort"]',
        ) as HTMLButtonElement | null;
        if (sorter) {
          sorter.click();
        }
      }
      if (demo === DEMOS[3]) {
        const nextPage = document.querySelector(
          '#data-grid-demo button[aria-label="Go to next page"]',
        ) as HTMLButtonElement | null;
        if (nextPage) {
          nextPage.click();
        }
      }
      if (demo === DEMOS[4]) {
        document.body.focus();
        gridApiRef.current.showFilterPanel('name');
      }
    }
  }, [demo, loading, firstRowId, gridApiRef]);

  return (
    <Section cozy>
      <Grid container spacing={2}>
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Data Grid"
            title={
              <Typography variant="h2">
                A level of <GradientText>performance and quality</GradientText> that hasn&apos;t
                been seen before
              </Typography>
            }
            description="The MUI X Data Grid is a data table powerhouse. It is packed with exclusive features that will enrich the experience of dealing with and maintaining lots of data."
          />
          <Group desktopColumns={2} sx={{ m: -2, p: 2 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={icons[name]} title={name} />
              </Highlighter>
            ))}
            <More href={ROUTES.dataGridFeatures} />
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            id="data-grid-demo"
            variant="outlined"
            sx={[
              {
                position: 'relative',
                zIndex: 1,
                height: 240,
                borderRadius: '10px 10px 0 0',
                '& .MuiDataGrid-root': {
                  '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 14, fontWeight: 'bold' },
                  '& .MuiDataGrid-footerContainer': {
                    minHeight: 48,
                    borderTop: '1px solid',
                    borderColor: 'grey.200',
                  },
                  '& .MuiTablePagination-root': {
                    fontSize: '0.75rem',
                    '& p': {
                      fontSize: '0.75rem',
                    },
                    '& .MuiToolbar-root': {
                      minHeight: 48,
                    },
                  },
                },
              },
              (theme) =>
                theme.applyDarkStyles({
                  borderColor: 'divider',
                  '& .MuiDataGrid-root': {
                    '& .MuiDataGrid-footerContainer': {
                      borderColor: 'primaryDark.600',
                    },
                  },
                }),
            ]}
          >
            {dataGridStyleOverrides}
            <DataGridPro
              {...data}
              apiRef={gridApiRef}
              loading={loading}
              density="compact"
              checkboxSelection
              disableRowSelectionOnClick
              pagination
            />
          </Paper>
          <Frame.Info sx={{ p: 0 }}>
            <ShowcaseCodeWrapper maxHeight="100%" clip>
              <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
              {demo && <FlashCode startLine={startLine[demo]} sx={{ mx: 1 }} />}
              <AppearingInfoBox appeared={demo === DEMOS[3] || demo === DEMOS[4]}>
                <React.Fragment>
                  <Typography
                    variant="body2"
                    sx={{ color: 'grey.50', fontWeight: 'medium', mb: '4px' }}
                  >
                    {demo === DEMOS[3] && 'Pagination > 100 rows per page is a paid feature!'}
                    {demo === DEMOS[4] && 'Multi-column filtering is a paid feature!'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.300' }}>
                    The Data Grid and all other MUI X components are available on free and paid
                    plans. Find more details about each plan and its features are on{' '}
                    <Link href={ROUTES.pricing}>the pricing page</Link>.
                  </Typography>
                </React.Fragment>
              </AppearingInfoBox>
            </ShowcaseCodeWrapper>
          </Frame.Info>
        </Grid>
      </Grid>
    </Section>
  );
}
