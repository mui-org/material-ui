import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import InfoRounded from '@mui/icons-material/InfoRounded';

export default function RealEstateCard({ sx, ...props }: CardProps) {
  return (
    <Card
      variant="outlined"
      {...props}
      sx={[
        (theme) => ({
          p: 2,
          display: 'flex',
          flexWrap: 'wrap',
          zIndex: 1,
          boxShadow: `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <CardMedia
        component="img"
        width="100"
        height="100"
        alt="123 Main St, Phoenix, AZ cover"
        src="/static/images/cards/real-estate.png"
        sx={{ borderRadius: '6px', width: 'clamp(100px, (304px - 100%) * 999 , 100%)' }}
      />
      <Box sx={{ width: 'clamp(15px, (304px - 100%) * 999 , 100%)', height: 15 }} />
      <Box sx={{ alignSelf: 'center' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'regular' }}>
          123 Main St, Phoenix, AZ, USA
        </Typography>
        <Typography noWrap gutterBottom sx={{ fontWeight: 'bold' }}>
          $280k - $310k
        </Typography>
        <Chip
          size="small"
          variant="outlined"
          icon={<InfoRounded />}
          label="Score: 85%"
          sx={(theme) => ({
            '.MuiChip-icon': { fontSize: 16, ml: '4px', color: 'success.500' },
            bgcolor: 'success.50',
            borderColor: 'success.100',
            color: 'success.900',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.700',
              color: 'success.200',
              borderColor: 'success.900',
            }),
          })}
        />
      </Box>
    </Card>
  );
}
