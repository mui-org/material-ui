/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';

export default function EmotionCSS() {
  return (
    <Box sx={{ width: 300 }}>
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
    </Box>
  );
}
