import * as React from 'react';
import { expectType } from '@mui/types';
import { createTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import SvgIcon from '@mui/material/SvgIcon';

function testOnChange() {
  function handleTabsChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Tabs onChange={handleTabsChange} />;

  function handleElementChange(event: React.ChangeEvent) {}
  <Tabs
    // @ts-expect-error internally it's either FocusEvent or ClickEvent
    onChange={handleElementChange}
  />;
}

function TabTest() {
  return <Tabs slotProps={{ indicator: { style: { backgroundColor: 'green' } } }} />;
}

function TabIndicatorSxTest() {
  return <Tabs slotProps={{ indicator: { sx: {} } }} />;
}

function SampleIcon() {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// Test for slots and slotProps
<Tabs
  value={0}
  variant="scrollable"
  scrollButtons
  textColor="secondary"
  slots={{
    startScrollButtonIcon: SampleIcon,
    endScrollButtonIcon: SampleIcon,
  }}
  slotProps={{
    endScrollButtonIcon: (ownerState) => ({
      'data-testid': 'test-label-scrollButtonEnd',
      fontSize: ownerState.textColor === 'secondary' ? 'large' : 'small',
    }),
    startScrollButtonIcon: (ownerState) => ({
      'data-testid': 'test-label-scrollButtonStart',
      fontSize: ownerState.textColor === 'secondary' ? 'large' : 'small',
    }),
  }}
/>;

// Test for ref type
<Tabs
  ref={(elem) => {
    expectType<HTMLDivElement | null, typeof elem>(elem);
  }}
/>;

<Tabs
  slots={{
    root: 'div',
    scroller: 'div',
    list: 'div',
    scrollbar: 'div',
    indicator: 'div',
    scrollButtons: 'div',
    startScrollButtonIcon: 'div',
    endScrollButtonIcon: 'div',
  }}
/>;

const CustomComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div ref={ref} {...props} />,
);
<Tabs
  slots={{
    root: CustomComponent,
    scroller: CustomComponent,
    list: CustomComponent,
    scrollbar: CustomComponent,
    indicator: CustomComponent,
    scrollButtons: CustomComponent,
    startScrollButtonIcon: CustomComponent,
    endScrollButtonIcon: CustomComponent,
  }}
/>;

<Tabs
  slotProps={{
    root: {
      className: 'flex',
    },
    scroller: {
      className: 'flex',
    },
    list: {
      className: 'flex',
    },
    scrollbar: {
      className: 'flex',
    },
    indicator: {
      className: 'flex',
      sx: {
        color: 'primary.main',
      },
      style: { backgroundColor: 'green' },
    },
    scrollButtons: {
      className: 'flex',
      disableRipple: true,
    },
    startScrollButtonIcon: {
      className: 'flex',
      fontSize: 'large',
    },
    endScrollButtonIcon: {
      className: 'flex',
      fontSize: 'large',
    },
  }}
/>;
