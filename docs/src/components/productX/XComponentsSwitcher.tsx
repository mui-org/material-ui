import * as React from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import PivotTableChartRoundedIcon from '@mui/icons-material/PivotTableChartRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import { visuallyHidden } from '@mui/utils';
import { Highlighter } from '@mui/internal-core-docs/AppLayout';
import { Link } from '@mui/internal-core-docs/Link';
import { ROUTES } from '@mui/internal-core-docs/constants';

const SwipeableViews = dynamic(() => import('react-swipeable-views'), { ssr: false });

function ComponentItem({
  label,
  icon,
  name,
  description,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  name: React.ReactNode;
  description?: React.ReactNode;
  href: string;
}) {
  return (
    <Box
      component="span"
      sx={{
        flexGrow: 1,
        display: 'flex',
        p: 2,
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
        gap: 2.5,
      }}
    >
      {icon}
      <div>
        <Typography
          component="span"
          variant="body2"
          sx={{ color: 'text.primary', fontWeight: 'bold', display: 'block' }}
        >
          {name}
        </Typography>
        {description && (
          <Typography
            component="span"
            variant="body2"
            gutterBottom
            sx={{ color: 'text.secondary', fontWeight: 'regular', display: 'block' }}
          >
            {description}
          </Typography>
        )}
        <Link
          href={href}
          variant="body2"
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            event.stopPropagation();
          }}
          sx={{
            color: 'primary',
            display: 'inline-flex',
            alignItems: 'center',
            fontWeight: 'semiBold',
            '& > svg': { transition: '0.2s' },
            '&:hover > svg': { transform: 'translateX(2px)' },
          }}
        >
          <span>View the docs</span>{' '}
          <Box component="span" sx={visuallyHidden}>
            {label}
          </Box>
          <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px', ml: '2px' }} />
        </Link>
      </div>
    </Box>
  );
}

export default function XComponentsSwitcher(props: {
  componentIndex: number;
  setComponentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { componentIndex, setComponentIndex } = props;
  const componentElement = [
    <ComponentItem
      name="Data Grid"
      label="Fast, feature-rich data table."
      description="Fast, feature-rich data table."
      icon={<PivotTableChartRoundedIcon />}
      href={ROUTES.dataGridOverview}
    />,
    <ComponentItem
      name="Date and Time Pickers"
      description="A suite of components for selecting dates, times, and ranges."
      label="A suite of components for selecting dates, times, and ranges."
      icon={<CalendarMonthRoundedIcon />}
      href={ROUTES.datePickersOverview}
    />,
    <ComponentItem
      name="Charts"
      description="Data visualization graphs, including bar, line, pie, scatter, and more."
      label="Data visualization graphs, including bar, line, pie, scatter, and more."
      icon={<BarChartRoundedIcon />}
      href={ROUTES.chartsOverview}
    />,
    <ComponentItem
      name="Tree View"
      description="Display hierarchical data, such as a file system navigator."
      label="Display hierarchical data, such as a file system navigator."
      icon={<AccountTreeRounded />}
      href={ROUTES.treeViewOverview}
    />,
  ];
  return (
    <React.Fragment>
      <Box
        sx={{ display: { md: 'none' }, maxWidth: 'calc(100vw - 40px)', '& > div': { pr: '32%' } }}
      >
        <SwipeableViews
          index={componentIndex}
          resistance
          enableMouseEvents
          onChangeIndex={(index) => setComponentIndex(index)}
        >
          {componentElement.map((element, index) => (
            <Highlighter
              key={index}
              disableBorder
              onClick={() => setComponentIndex(index)}
              selected={componentIndex === index}
              sx={{
                width: '100%',
                transition: '0.3s',
                transform: componentIndex !== index ? 'scale(0.9)' : 'scale(1)',
              }}
            >
              {element}
            </Highlighter>
          ))}
        </SwipeableViews>
      </Box>
      <Stack spacing={1} useFlexGap sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: 500 }}>
        {componentElement.map((element, index) => (
          <Highlighter
            key={index}
            disableBorder
            onClick={() => setComponentIndex(index)}
            selected={componentIndex === index}
          >
            {element}
          </Highlighter>
        ))}
      </Stack>
    </React.Fragment>
  );
}
