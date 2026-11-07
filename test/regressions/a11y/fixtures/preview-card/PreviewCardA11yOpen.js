import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import Typography from '@mui/material/Typography';

export default function PreviewCardA11yOpen() {
  return (
    <Box sx={{ p: 2, pb: 20 }}>
      <Typography>
        Read more about{' '}
        <PreviewCard open>
          <PreviewCardTrigger render={<Link href="#typography">typography</Link>} />
          <PreviewCardPopup slots={{ transition: null }}>
            <Typography variant="body2" sx={{ maxWidth: 240 }}>
              Typography is the art and technique of arranging type.
            </Typography>
          </PreviewCardPopup>
        </PreviewCard>{' '}
        in the guide.
      </Typography>
    </Box>
  );
}
