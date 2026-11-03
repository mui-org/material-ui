import Chip, { chipClasses } from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ThemeChip() {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={[
        {
          [`& .${chipClasses.root}`]: {
            border: '1px solid',
            [`&.${chipClasses.filled}`]: {
              borderColor: 'grey.300',
              color: 'grey.800',
              bgcolor: 'grey.50',
              [`&.${chipClasses.colorPrimary}`]: {
                borderColor: 'primary.200',
                bgcolor: 'primary.50',
                color: 'primary.700',
              },
              [`&.${chipClasses.colorSuccess}`]: {
                borderColor: 'success.200',
                bgcolor: 'success.50',
                color: 'success.900',
              },
              [`&.${chipClasses.colorWarning}`]: {
                borderColor: 'warning.300',
                bgcolor: 'warning.50',
                color: 'warning.800',
              },
              [`&.${chipClasses.colorError}`]: {
                borderColor: 'error.200',
                bgcolor: 'error.50',
                color: 'error.800',
              },
            },
            [`& .${chipClasses.label}`]: {
              marginBottom: '1px',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              fontWeight: 600,
            },
          },
        },
        (theme) =>
          theme.applyDarkStyles({
            [`& .${chipClasses.root}`]: {
              [`&.${chipClasses.filled}`]: {
                color: '#FFF',
                bgcolor: 'primaryDark.700',
                borderColor: 'primaryDark.500',
                [`&.${chipClasses.colorPrimary}`]: {
                  borderColor: 'primary.700',
                  bgcolor: 'primary.900',
                  color: 'primary.100',
                },
                [`&.${chipClasses.colorSuccess}`]: {
                  borderColor: 'success.700',
                  bgcolor: 'success.900',
                  color: 'success.200',
                },
                [`&.${chipClasses.colorWarning}`]: {
                  borderColor: 'warning.700',
                  bgcolor: 'warning.900',
                  color: 'warning.200',
                },
                [`&.${chipClasses.colorError}`]: {
                  borderColor: 'error.800',
                  bgcolor: 'error.900',
                  color: 'error.100',
                },
              },
            },
          }),
      ]}
    >
      <Chip label="MUI" color="primary" size="small" />
      <Chip label="React" color="warning" size="small" />
      <Chip label="CSS" color="success" size="small" />
      <Chip label="TypeScript" color="error" size="small" />
      <Chip label="JavaScript" size="small" />
    </Stack>
  );
}
