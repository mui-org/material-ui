import Link from '@mui/material/Link';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import Typography from '@mui/material/Typography';

export default function BasicPreviewCard() {
  return (
    <Typography>
      The principles of good {/* @focus-start */}
      <PreviewCard>
        <PreviewCardTrigger
          render={
            <Link href="https://en.wikipedia.org/wiki/Typography">typography</Link>
          }
        />
        <PreviewCardPopup>
          <Typography component="p" variant="subtitle2" gutterBottom>
            Typography
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: 260 }}>
            Typography is the art and technique of arranging type to make written
            language legible, readable, and appealing when displayed.
          </Typography>
        </PreviewCardPopup>
      </PreviewCard>
      {/* @focus-end */} remain in the digital age.
    </Typography>
  );
}
