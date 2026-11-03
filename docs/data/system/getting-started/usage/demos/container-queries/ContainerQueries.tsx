import Box from '@mui/material/Box';

export default function ContainerQueries() {
  return (
    <Box
      sx={{
        overflow: 'auto',
        resize: 'horizontal',
        width: 400,
        maxWidth: '80%',
        containerType: 'inline-size',
      }}
    >
      {/* @focus-start */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', '@350': 'row' },
          bgcolor: 'background.default',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'clip',
        }}
      >
        <Box
          component="img"
          sx={{
            alignSelf: 'stretch',
            aspectRatio: '16 / 9',
            objectFit: 'cover',
            width: '100%',
            maxWidth: { '@350': '36%', '@500': 240 },
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
        <Box
          sx={{
            p: { xs: 2, '@500': 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <div>
            <Box
              component="span"
              sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
            >
              123 Main St, Phoenix AZ
            </Box>
            <Box
              sx={{
                color: 'primary.main',
                fontSize: '1.125rem',
                fontWeight: 'bold',
              }}
            >
              $280,000 — $310,000
            </Box>
          </div>
          <Box
            sx={{
              width: 'fit-content',
              py: 0.5,
              px: 1,
              backgroundColor: 'rgba(46, 125, 50, 0.1)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              border: '1px solid',
              borderColor: 'rgba(46, 125, 50, 0.1)',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              letterSpacing: '.05rem',
              textTransform: 'uppercase',
              color: 'success.main',
            }}
          >
            Confidence score: 85%
          </Box>
        </Box>
      </Box>
      {/* @focus-end */}
    </Box>
  );
}
