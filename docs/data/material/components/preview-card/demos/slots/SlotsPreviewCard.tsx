import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import Typography from '@mui/material/Typography';

export default function SlotsPreviewCard() {
  return (
    <Typography>
      This preview {/* @focus-start */}
      <PreviewCard>
        <PreviewCardTrigger render={<Link href="#slots">fades in</Link>} />
        <PreviewCardPopup
          slots={{ transition: Fade }}
          slotProps={{
            root: { sx: { border: 1, borderColor: 'divider', boxShadow: 'none' } },
          }}
        >
          <Typography variant="body2">
            A flat surface with a fade transition.
          </Typography>
        </PreviewCardPopup>
      </PreviewCard>
      {/* @focus-end */} instead of growing.
    </Typography>
  );
}
