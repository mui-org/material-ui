import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import type { TooltipProps } from '@mui/material/Tooltip';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: navy;
  }
`;

export default function StyledComponentsPortal() {
  return (
    // @focus-start @padding 2
    <StyledTooltip title="I am navy">
      <Button variant="contained" color="primary">
        Styled tooltip
      </Button>
    </StyledTooltip>
    // @focus-end
  );
}
