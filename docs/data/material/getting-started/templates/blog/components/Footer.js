import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import SitemarkIcon from './SitemarkIcon';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link
        href="https://mui.com/"
        sx={{
          color: 'text.secondary',
        }}
      >
        Sitemark
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <SitemarkIcon />
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontWeight: 600, mt: 2 }}
              >
                Join the newsletter
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Subscribe for weekly updates. No spams ever!
              </Typography>
              <InputLabel htmlFor="email-newsletter">Email</InputLabel>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="email-newsletter"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label="Enter your email address"
                  placeholder="Your email address"
                  slotProps={{
                    htmlInput: {
                      autoComplete: 'off',
                      'aria-label': 'Enter your email address',
                    },
                  }}
                  sx={{ width: '250px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ flexShrink: 0 }}
                >
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Product
            </Typography>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Features
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Testimonials
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Highlights
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Pricing
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Company
            </Typography>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              About us
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Careers
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Press
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Legal
            </Typography>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Terms
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Privacy
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Contact
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Privacy Policy
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Terms of Service
            </Link>
            <Copyright />
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/mui"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://x.com/MaterialUI"
              aria-label="X"
              sx={{ alignSelf: 'center' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/company/mui/"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
