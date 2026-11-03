import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

export default function VisuallyHiddenUsage() {
  return (
    // @focus-start @padding 2
    <Link href="#foo">
      Read more
      {/* always visually hidden because the parent is focusable element */}
      <Box sx={visuallyHidden}>about how to visually hide elements</Box>
    </Link>
    // @focus-end
  );
}
