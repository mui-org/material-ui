import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

// A 1x1 data-URI image so a real `<img>` renders in the regression harness,
// which blocks network image requests (see test/regressions/index.test.js).
// This exercises the working-image path (`alt` forwarded to a native `<img>`)
// for the axe `image-alt` rule (WCAG 1.1.1).
const dataUri =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

export default function AvatarA11yImage() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src={dataUri} />
    </Stack>
  );
}
