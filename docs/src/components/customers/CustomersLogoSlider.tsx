import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { keyframes } from '@mui/material/styles';

interface CustomerLogo {
  name: string;
  lightLogo: string;
}

interface CustomersLogoSliderProps {
  logos?: CustomerLogo[];
}

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const defaultCustomerLogos: CustomerLogo[] = [
  { name: 'Spotify', lightLogo: '/static/branding/companies/slider/spotify.png' },
  { name: 'Amazon', lightLogo: '/static/branding/companies/slider/amazon.png' },
  { name: 'Netflix', lightLogo: '/static/branding/companies/slider/netflix.png' },
  { name: 'Unity', lightLogo: '/static/branding/companies/slider/unity.png' },
  { name: 'AT&T', lightLogo: '/static/branding/companies/slider/atnt.png' },
  { name: 'Tesla', lightLogo: '/static/branding/companies/slider/tesla.png' },
  { name: 'Samsung', lightLogo: '/static/branding/companies/slider/samsung.png' },
  { name: 'Verizon', lightLogo: '/static/branding/companies/slider/verizon.png' },
  { name: 'Shutterstock', lightLogo: '/static/branding/companies/slider/shutterstock.png' },
  { name: 'Apple', lightLogo: '/static/branding/companies/slider/apple.png' },
  { name: 'Volvo', lightLogo: '/static/branding/companies/slider/volvo.png' },
  { name: 'NASA', lightLogo: '/static/branding/companies/slider/nasa.png' },
  { name: 'Deloitte', lightLogo: '/static/branding/companies/slider/deloitte.png' },
];

export default function CustomersLogoSlider({
  logos = defaultCustomerLogos,
}: CustomersLogoSliderProps) {
  React.useEffect(() => {
    logos.forEach((logo) => {
      const img = new Image();
      img.src = logo.lightLogo;
    });
  }, [logos]);

  const logoWidth = 150;
  const gapSize = 24;
  const totalWidth = logos.length * (logoWidth + gapSize);

  return (
    <Container
      sx={{
        p: 0,
        mb: 2,
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          '&:hover .marquee-content': {
            animationPlayState: 'paused',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: `${totalWidth * 2}px`,
            height: '130px',
          }}
        >
          <Box
            className="marquee-content"
            sx={{
              display: 'flex',
              alignItems: 'center',
              animation: {
                xs: `${scroll} 25s linear infinite`,
                sm: `${scroll} 35s linear infinite`,
                md: `${scroll} 50s linear infinite`,
              },
              width: `${totalWidth}px`,
              flexShrink: 0,
              willChange: 'transform',
            }}
          >
            {logos.map((logo, index) => (
              <Box
                key={`first-${logo.name}-${index}`}
                component="img"
                loading="eager"
                alt={`${logo.name} logo`}
                src={logo.lightLogo}
                sx={(theme) => ({
                  height: { xs: 42, sm: 50, md: 70 },
                  width: '150px',
                  objectFit: 'contain',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
                  flexShrink: 0,
                  marginRight: 3,
                  filter: 'none',
                  backfaceVisibility: 'hidden',
                  ...theme.applyDarkStyles({
                    filter:
                      'brightness(0) saturate(100%) invert(93%) sepia(7%) saturate(0%) hue-rotate(84deg) brightness(104%) contrast(111%)',
                  }),
                  '&:hover': {
                    opacity: 1,
                  },
                })}
              />
            ))}
          </Box>
          <Box
            className="marquee-content"
            sx={{
              display: 'flex',
              alignItems: 'center',
              animation: {
                xs: `${scroll} 25s linear infinite`,
                sm: `${scroll} 35s linear infinite`,
                md: `${scroll} 50s linear infinite`,
              },
              width: `${totalWidth}px`,
              flexShrink: 0,
              willChange: 'transform',
            }}
          >
            {logos.map((logo, index) => (
              <Box
                key={`second-${logo.name}-${index}`}
                component="img"
                loading="eager"
                alt={`${logo.name} logo`}
                src={logo.lightLogo}
                sx={(theme) => ({
                  height: { xs: 42, sm: 50, md: 70 },
                  width: '150px',
                  objectFit: 'contain',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
                  flexShrink: 0,
                  marginRight: 3,
                  filter: 'none',
                  backfaceVisibility: 'hidden',
                  ...theme.applyDarkStyles({
                    filter:
                      'brightness(0) saturate(100%) invert(93%) sepia(7%) saturate(0%) hue-rotate(84deg) brightness(104%) contrast(111%)',
                  }),
                  '&:hover': {
                    opacity: 1,
                  },
                })}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
