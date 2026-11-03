import * as React from 'react';
import MuiChip from '@mui/material/Chip';
import MuiCardMedia from '@mui/material/CardMedia';
import type { CardProps } from '@mui/material/Card';
import MuiCard from '@mui/material/Card';
import MuiSwitch from '@mui/material/Switch';
import MuiTypography from '@mui/material/Typography';
import MuiStack from '@mui/material/Stack';
import MuiRating from '@mui/material/Rating';
import { withPointer } from 'docs/src/components/home/ElementPointer';

export const componentCode = `
<Card>
  <CardMedia
    component="img"
    alt="Yosemite National Park"
    image="/static/images/cards/yosemite.jpeg"
  />
  <Stack direction="row" spacing={3} sx={{ alignItems: 'center', p: 2 }} useFlexGap>
    <Stack direction="column" spacing={0.5} useFlexGap>
      <Typography>Yosemite National Park, California, USA</Typography>
      <Stack direction="row" spacing={1} useFlexGap>
        <Chip
          size="small"
          label={active ? 'Active' : 'Inactive'}
          color={active ? 'success' : 'default'}
        />
        <Rating defaultValue={4} size="small" />
      </Stack>
    </Stack>
    <Switch checked={active} />
  </Stack>
</Card>
`;

const Card = withPointer(MuiCard, { id: 'card', name: 'Card' });
const CardMedia = withPointer(MuiCardMedia, { id: 'cardmedia', name: 'CardMedia' });
const Stack = withPointer(MuiStack, { id: 'stack', name: 'Stack' });
const Stack2 = withPointer(MuiStack, { id: 'stack2', name: 'Stack' });
const Stack3 = withPointer(MuiStack, { id: 'stack3', name: 'Stack' });
const Typography = withPointer(MuiTypography, { id: 'typography', name: 'Typography' });
const Chip = withPointer(MuiChip, { id: 'chip', name: 'Chip' });
const Rating = withPointer(MuiRating, { id: 'rating', name: 'Rating' });
const Switch = withPointer(MuiSwitch, { id: 'switch', name: 'Switch' });

export default function MaterialDesignDemo(props: CardProps) {
  const [active, setActive] = React.useState(true);
  return (
    <Card {...props} variant="outlined" sx={{ p: 2 }}>
      <CardMedia
        component="img"
        alt="Yosemite National Park"
        height="100"
        image="/static/images/cards/yosemite.jpeg"
        sx={{ borderRadius: 0.5 }}
      />
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', mt: 2 }} useFlexGap>
        <Stack2 direction="column" spacing={0.5} useFlexGap>
          <Typography sx={{ fontWeight: 'semiBold' }}>
            Yosemite National Park, California, USA
          </Typography>
          <Stack3 direction="row" spacing={1} useFlexGap>
            <Chip
              label={active ? 'Active' : 'Inactive'}
              color={active ? 'success' : 'default'}
              size="small"
              sx={{ width: 'fit-content', fontSize: 12, height: 20, px: 0, zIndex: 2 }}
            />
            <Rating name="Rating component" defaultValue={4} size="small" />
          </Stack3>
        </Stack2>
        <Switch
          slotProps={{ input: { 'aria-label': active ? 'Active' : 'Inactive' } }}
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
          sx={{ ml: 'auto' }}
        />
      </Stack>
    </Card>
  );
}
