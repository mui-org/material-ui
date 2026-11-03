import styled from 'styled-components';
import { palette, spacing } from '@mui/system';
import type { PaletteProps, SpacingProps } from '@mui/system';

const Div = styled.div<PaletteProps & SpacingProps>`
  ${palette}
  ${spacing}
`;

export default function CombiningStyleFunctionsDemo() {
  return (
    // @focus-start @padding 2
    <Div color="white" bgcolor="palevioletred" p={1}>
      Styled components
    </Div>
    // @focus-end
  );
}
