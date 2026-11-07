import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';

export default function ButtonGroupA11ySemanticStates() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <ButtonGroup aria-label="Text alignment">
        <Button startIcon={<FormatAlignLeftIcon />}>Left</Button>
        <Button startIcon={<FormatAlignCenterIcon />}>Center</Button>
        <Button href="#button-group-a11y-link">Help</Button>
      </ButtonGroup>
      <ButtonGroup variant="text" aria-label="Text style">
        <Button aria-pressed="true">Bold</Button>
        <Button aria-pressed="false">Italic</Button>
        <Button aria-pressed="false">Underline</Button>
      </ButtonGroup>
      <ButtonGroup disabled aria-label="Unavailable actions">
        <Button>Archive</Button>
        <Button>Delete</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" variant="contained" aria-label="Export format">
        <Button>PDF</Button>
        <Button>CSV</Button>
      </ButtonGroup>
      {/* The split button pattern, with `aria-expanded` set while the menu is closed. */}
      <ButtonGroup variant="contained" aria-label="Merge strategy">
        <Button>Create a merge commit</Button>
        <Button
          size="small"
          aria-label="Select merge strategy"
          aria-haspopup="menu"
          aria-expanded="false"
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
