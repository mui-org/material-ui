import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  { number: '2014', metadata: 'The starting year' },
  { number: '100%', metadata: 'Remote global team' },
  { number: '20+', metadata: 'Countries represented' },
];

export default function TeamStatistics() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      {data.map((item) => (
        <Box key={item.number} sx={{ height: '100%', width: { xs: '100%', sm: 200 } }}>
          <Typography
            component="p"
            variant="h4"
            sx={[
              {
                fontWeight: 'bold',
              },
              (theme) => ({
                textAlign: { xs: 'left', sm: 'center' },
                color: 'primary.main',
                ...theme.applyDarkStyles({
                  color: 'primary.200',
                }),
              }),
            ]}
          >
            {item.number}
          </Typography>
          <Typography sx={{ color: 'text.secondary', textAlign: { xs: 'left', sm: 'center' } }}>
            {item.metadata}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
