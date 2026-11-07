import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const noop = () => {};

// The label does not wrap, so it ends with an ellipsis when the chip is too
// narrow. The first chip fits its 240px container at 100% text size. The second
// fits a wide viewport but not 320 CSS px. The third uses the wrapping styles
// from the MultilineChips docs demo.
export default function ChipA11yLongLabel() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Stack sx={{ width: 240, alignItems: 'flex-start' }}>
        <Chip label="Monthly accessibility audit" onDelete={noop} />
      </Stack>
      <Chip label="Quarterly accessibility review for the design system team" onDelete={noop} />
      <Chip
        label="Quarterly accessibility review for the design system team"
        onDelete={noop}
        sx={{
          height: 'auto',
          '& .MuiChip-label': { display: 'block', whiteSpace: 'normal' },
        }}
      />
    </Stack>
  );
}
