import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';

function NotFoundIllustration() {
  return (
    <Box
      sx={(theme) => ({
        mx: 'auto',
        mb: 4,
        height: { xs: 200, sm: 150 },
        width: { xs: 100, sm: 200 },
        display: 'flex',
        flexDirection: { xs: 'column-reverse', sm: 'column' },
        borderRadius: 1,
        border: `1px solid ${theme.palette.grey[200]}`,
        overflow: 'clip',
        boxShadow: `0px 2px 8px -2px ${alpha(
          theme.palette.primary[300],
          0.3,
        )}, 0px 6px 12px -2px ${alpha(theme.palette.primary[100], 0.2)}`,
        ...theme.applyDarkStyles({
          borderColor: theme.palette.primaryDark[700],
          boxShadow: `0px 2px 8px -2px ${alpha(
            theme.palette.common.black,
            0.3,
          )}, 0px 6px 12px -2px ${alpha(theme.palette.common.black, 0.2)}`,
        }),
      })}
    >
      <Box
        sx={{
          p: 1.5,
          display: { xs: 'none', sm: 'flex' },
          gap: '6px',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box
          sx={{ width: 10, height: 10, borderRadius: 2, bgcolor: 'error.500', opacity: '80%' }}
        />
        <Box
          sx={{ width: 10, height: 10, borderRadius: 2, bgcolor: 'warning.500', opacity: '80%' }}
        />
        <Box
          sx={{ width: 10, height: 10, borderRadius: 2, bgcolor: 'success.500', opacity: '80%' }}
        />
      </Box>
      <Box
        sx={{
          pt: 1,
          pb: '5px',
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ height: 3, width: '40%', bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 2 }} />
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SearchOffRoundedIcon sx={{ fontSize: 50, color: 'primary.500', opacity: '40%' }} />
      </Box>
    </Box>
  );
}

export default function NotFoundHero() {
  return (
    <Section
      bg="gradient"
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& .MuiContainer-root': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <NotFoundIllustration />
      <SectionHeadline
        alwaysCenter
        title={
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'semiBold' }}>
            Page not found
          </Typography>
        }
        description="Apologies, but the page you were looking for wasn't found. Try reaching for the search button on the nav bar above to look for another one."
      />
    </Section>
  );
}
