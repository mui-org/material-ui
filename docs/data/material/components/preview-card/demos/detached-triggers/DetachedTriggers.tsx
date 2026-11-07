import Link from '@mui/material/Link';
import PreviewCard, { createPreviewCardHandle } from '@mui/material/PreviewCard';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import Typography from '@mui/material/Typography';

interface Planet {
  name: string;
  description: string;
}

const handle = createPreviewCardHandle<Planet>();

const mars: Planet = {
  name: 'Mars',
  description: 'The fourth planet from the Sun, known for its red surface.',
};

const venus: Planet = {
  name: 'Venus',
  description: 'The second planet from the Sun, wrapped in thick clouds.',
};

export default function DetachedTriggers() {
  return (
    <div>
      {/* @focus-start */}
      <Typography>
        Compare{' '}
        <PreviewCardTrigger
          handle={handle}
          payload={mars}
          render={<Link href="#detached-triggers">Mars</Link>}
        />{' '}
        and{' '}
        <PreviewCardTrigger
          handle={handle}
          payload={venus}
          render={<Link href="#detached-triggers">Venus</Link>}
        />
        .
      </Typography>
      <PreviewCard handle={handle}>
        {({ payload }) => (
          <PreviewCardPopup>
            <Typography component="p" variant="subtitle2">
              {payload?.name}
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 240 }}>
              {payload?.description}
            </Typography>
          </PreviewCardPopup>
        )}
      </PreviewCard>
      {/* @focus-end */}
    </div>
  );
}
