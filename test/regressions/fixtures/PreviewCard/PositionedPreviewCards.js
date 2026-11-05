import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';

const sides = ['top', 'right', 'bottom', 'left'];

export default function PositionedPreviewCards() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 200px)',
        gap: 15,
        p: 15,
      }}
    >
      {sides.map((side) => (
        <PreviewCard key={side} open>
          <PreviewCardTrigger render={<Link href={`#${side}`}>{side}</Link>} />
          <PreviewCardPopup side={side} slots={{ transition: null }}>
            Preview on the {side}
          </PreviewCardPopup>
        </PreviewCard>
      ))}
    </Box>
  );
}
