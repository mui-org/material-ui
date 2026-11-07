import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// A horizontal group wider than 320 CSS px (1.4.10). The group does not wrap.
// The test viewer hides horizontal overflow, so the screenshot shows it clipped.
export default function ButtonGroupA11yWideGroup() {
  return (
    <ButtonGroup aria-label="Message actions">
      <Button>Reply to all</Button>
      <Button>Forward message</Button>
      <Button>Mark as unread</Button>
      <Button>Move to archive</Button>
      <Button>Report spam</Button>
    </ButtonGroup>
  );
}
