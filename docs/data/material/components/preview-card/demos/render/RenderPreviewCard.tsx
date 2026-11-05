import Link from '@mui/material/Link';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import Typography from '@mui/material/Typography';

export default function RenderPreviewCard() {
  return (
    <Typography>
      Hover the {/* @focus-start */}
      <PreviewCard>
        <PreviewCardTrigger render={<Link href="#render">link</Link>} />
        <PreviewCardPopup
          render={(props, state) => (
            <aside
              {...props}
              aria-label={`Preview placed on the ${state.side} side`}
            />
          )}
        >
          <Typography variant="body2">
            The popup renders an aside element.
          </Typography>
        </PreviewCardPopup>
      </PreviewCard>
      {/* @focus-end */} to see the preview.
    </Typography>
  );
}
