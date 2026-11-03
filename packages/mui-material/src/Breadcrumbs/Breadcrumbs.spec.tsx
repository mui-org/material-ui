import Breadcrumbs from '@mui/material/Breadcrumbs';
import SvgIcon from '@mui/material/SvgIcon';

function SampleIcon() {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// test for slots and slotProps
<Breadcrumbs
  slots={{
    CollapsedIcon: SampleIcon,
  }}
  slotProps={{
    collapsedIcon(ownerState) {
      return { color: ownerState.maxItems! > 7 ? 'primary' : 'secondary' };
    },
  }}
  maxItems={2}
>
  <span>first</span>
  <span>second</span>
  <span>third</span>
</Breadcrumbs>;
