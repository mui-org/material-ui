import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ResizableDemo from '../ResizableDemo';

export default function SxPropContainerQueries() {
  return (
    // @focus-start @padding 2
    <ResizableDemo>
      <Box
        sx={{
          overflow: 'auto',
          resize: 'horizontal',
          width: 400,
          maxWidth: 'min(80vw, 600px)',
          containerType: 'inline-size', // required for container queries
        }}
      >
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: {
              '@': 'column',
              '@350': 'row',
            },
          }}
        >
          <Box
            component="img"
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            sx={{
              alignSelf: 'stretch',
              aspectRatio: '16 / 9',
              objectFit: 'cover',
              width: '100%',
              maxHeight: {
                '@': 160,
                '@350': 'initial',
              },
              maxWidth: {
                '@350': '36%',
                '@500': 240,
              },
              transition: '0.4s',
            }}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              padding: {
                '@': 2,
                '@500': 3,
              },
              flex: 'auto',
              transition: 'padding 0.4s',
            }}
          >
            <div>
              <Typography
                component="div"
                sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
              >
                123 Main St, Phoenix AZ
              </Typography>
              <Typography
                component="div"
                sx={{
                  color: 'primary.main',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                }}
              >
                $280,000 — $310,000
              </Typography>
            </div>
            <Chip
              size="small"
              label="Confidence score: 85%"
              sx={{ p: 0, width: 'fit-content' }}
            />
          </CardContent>
        </Card>
      </Box>
    </ResizableDemo>
    // @focus-end
  );
}
