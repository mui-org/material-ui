import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';

interface RoleProps {
  description: string;
  title: string;
  url?: string;
}

export default function RoleEntry(props: RoleProps) {
  if (props.url) {
    return (
      <Box
        sx={{
          py: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: 'start',
          gap: 2,
        }}
      >
        <div>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'medium' }}
          >
            {props.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 550 }}>
            {props.description}
          </Typography>
        </div>
        <Button
          component="a"
          variant="outlined"
          color="secondary"
          size="small"
          href={props.url}
          endIcon={<KeyboardArrowRightRounded />}
        >
          More about this role
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="body1" gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
        {props.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 650 }}>
        {props.description}
      </Typography>
    </div>
  );
}
