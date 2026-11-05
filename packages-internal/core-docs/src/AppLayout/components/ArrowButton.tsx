import IconButton from '@mui/material/IconButton';
import type { IconButtonProps } from '@mui/material/IconButton';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';

export function ArrowButton({
  direction,
  ...props
}: { direction: 'left' | 'right' } & IconButtonProps) {
  const label = {
    left: 'Previous',
    right: 'Next',
  };
  return (
    <IconButton
      size="small"
      aria-label={label[direction]}
      {...props}
      sx={[
        {
          border: '1px solid',
          color: 'primary.main',
          borderColor: 'grey.200',
          '&:hover': {
            borderColor: 'grey.300',
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            color: 'grey.700',
            borderColor: 'grey.300',
          },
          '& + .MuiIconButton-root': {
            ml: 2,
          },
        },
        (theme) =>
          theme.applyDarkStyles({
            color: 'primary.200',
            borderColor: 'primaryDark.400',
            '&:hover': {
              borderColor: 'primary.300',
            },
            '&.Mui-disabled': {
              color: 'primaryDark.200',
              borderColor: 'primaryDark.400',
            },
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {direction === 'left' && <KeyboardArrowLeftRounded fontSize="small" />}
      {direction === 'right' && <KeyboardArrowRightRounded fontSize="small" />}
    </IconButton>
  );
}
