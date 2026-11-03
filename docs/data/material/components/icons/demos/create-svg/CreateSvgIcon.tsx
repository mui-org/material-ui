import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

export default function CreateSvgIcon() {
  return (
    <Stack direction="row" spacing={3}>
      {/* @focus-start */}
      <HomeIcon />
      <HomeIcon color="primary" />
      <PlusIcon />
      <PlusIcon color="secondary" />
      {/* @focus-end */}
    </Stack>
  );
}
