
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function BoxComponent(props) {
  return (
    <Box
      sx={{
        m: 2,
        border: "1px dashed grey",
        p: [2, 3, 4]
      }}>
      <Box
        component="span"
        clone
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          m: 2,
          border: "1px dashed grey"
        }}>
        <Button component="span">Save</Button>
      </Box>
      <Box
        {...props}
        sx={{
          p: [1, 2, 4]
        }} />
    </Box>
  );
}
