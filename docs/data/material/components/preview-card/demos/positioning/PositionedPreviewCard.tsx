import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import Typography from '@mui/material/Typography';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export default function PositionedPreviewCard() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {sides.map((side) => (
        <PreviewCard key={side}>
          {/* @focus-start */}
          <PreviewCardTrigger render={<Button href="#positioning">{side}</Button>} />
          <PreviewCardPopup side={side} align="start" sideOffset={12}>
            <Typography variant="body2">Opens on the {side} side.</Typography>
          </PreviewCardPopup>
          {/* @focus-end */}
        </PreviewCard>
      ))}
    </Stack>
  );
}
