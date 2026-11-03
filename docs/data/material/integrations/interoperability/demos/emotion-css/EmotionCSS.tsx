/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

export default function EmotionCSS() {
  return (
    <Box sx={{ width: 300 }}>
      {/* @focus-start */}
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        css={css`
          color: #20b2aa;

          :hover {
            color: #2e8b57;
          }
        `}
      />
      {/* @focus-end */}
    </Box>
  );
}
