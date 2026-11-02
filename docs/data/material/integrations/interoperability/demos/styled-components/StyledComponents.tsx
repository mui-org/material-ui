import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const SliderCustomized = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export default function StyledComponents() {
  return (
    <Box sx={{ width: 300 }}>
      {/* @focus-start */}
      <Slider defaultValue={30} />
      <SliderCustomized defaultValue={30} />
      {/* @focus-end */}
    </Box>
  );
}
