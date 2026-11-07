import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import Typography from '@mui/material/Typography';

export default function DelayPreviewCard() {
  return (
    <Stack direction="row" spacing={4}>
      {/* @focus-start */}
      <PreviewCard>
        <PreviewCardTrigger
          delay={0}
          closeDelay={0}
          render={<Link href="#delay">Instant</Link>}
        />
        <PreviewCardPopup>
          <Typography variant="body2">Opens and closes at once.</Typography>
        </PreviewCardPopup>
      </PreviewCard>
      <PreviewCard>
        <PreviewCardTrigger
          delay={1000}
          closeDelay={600}
          render={<Link href="#delay">Slow</Link>}
        />
        <PreviewCardPopup>
          <Typography variant="body2">Opens after one second.</Typography>
        </PreviewCardPopup>
      </PreviewCard>
      {/* @focus-end */}
    </Stack>
  );
}
