import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import Typography from '@mui/material/Typography';

export default function ControlledPreviewCard() {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState('none');

  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <FormControlLabel
        control={
          <Switch
            checked={open}
            onChange={(event) => setOpen(event.target.checked)}
          />
        }
        label="Open"
      />
      {/* @focus-start */}
      <PreviewCard
        open={open}
        onOpenChange={(nextOpen, eventDetails) => {
          setOpen(nextOpen);
          setReason(eventDetails.reason);
        }}
      >
        <PreviewCardTrigger
          render={<Link href="#controlled">Material Design</Link>}
        />
        <PreviewCardPopup>
          <Typography variant="body2" sx={{ maxWidth: 240 }}>
            Material Design is a design system created by Google.
          </Typography>
        </PreviewCardPopup>
      </PreviewCard>
      {/* @focus-end */}
      <Typography variant="body2" color="text.secondary">
        Last change reason: {reason}
      </Typography>
    </Stack>
  );
}
