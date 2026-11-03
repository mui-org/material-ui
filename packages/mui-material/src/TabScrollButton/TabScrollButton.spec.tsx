import TabScrollButton from '@mui/material/TabScrollButton';
import SvgIcon from '@mui/material/SvgIcon';

function SampleIcon() {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// Test for slots and slotProps
<TabScrollButton
  direction="left"
  orientation="horizontal"
  slots={{
    StartScrollButtonIcon: SampleIcon,
    EndScrollButtonIcon: SampleIcon,
  }}
  slotProps={{
    endScrollButtonIcon: (ownerState) => ({
      'data-testid': 'test-label-scrollButtonEnd',
      fontSize: ownerState.disabled ? 'large' : 'small',
    }),
    startScrollButtonIcon: (ownerState) => ({
      'data-testid': 'test-label-scrollButtonStart',
      fontSize: ownerState.disabled ? 'large' : 'small',
    }),
  }}
/>;

// Test that ButtonBase props should be available
<TabScrollButton direction="left" orientation="horizontal" centerRipple />;
