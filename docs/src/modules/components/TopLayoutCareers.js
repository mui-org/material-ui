import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { AppContainer, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeader from 'docs/src/layouts/AppHeader';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import { MarkdownElement } from '@mui/internal-core-docs/MarkdownDocs';
import { Link } from '@mui/internal-core-docs/Link';
import { useTranslate } from '@mui/internal-core-docs/i18n';

const StyledDiv = styled('div')(({ theme }) => ({
  flex: '1 0 100%',
  background: `linear-gradient(180deg, ${(theme.vars || theme).palette.grey[50]} 0%, #FFFFFF 100%)`,
  backgroundSize: '100% 500px',
  backgroundRepeat: 'no-repeat',
  ...theme.applyDarkStyles({
    background: `linear-gradient(180deg, ${alpha(theme.palette.primary[900], 0.15)} 0%, ${(theme.vars || theme).palette.primaryDark[900]} 100%)`,
    backgroundSize: '100% 500px',
    backgroundRepeat: 'no-repeat',
  }),
}));

const StyledAppContainer = styled(AppContainer)(({ theme }) => ({
  '& .markdownElement': {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(4),
    },
  },
}));

export default function TopLayoutCareers(props) {
  const { docs } = props;
  const { description, rendered, title } = docs.en;
  const t = useTranslate();

  return (
    <BrandingCssVarsProvider>
      <AppHeader />
      <Head
        title={`${title} - MUI`}
        description={description}
        card="/static/social-previews/careers-preview.jpg"
      >
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <StyledDiv>
        <StyledAppContainer component="main" sx={{ py: { xs: 3, sm: 4, md: 8 } }}>
          <Link
            href="/careers/#open-roles"
            rel="nofollow"
            variant="body2"
            sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 4 }}
          >
            <KeyboardArrowLeftIcon fontSize="small" />
            {t('backToOpenRoles')}
          </Link>
          {rendered.map((chunk, index) => {
            return <MarkdownElement key={index} renderedMarkdown={chunk} />;
          })}
        </StyledAppContainer>
        <Divider />
        <AppFooter />
      </StyledDiv>
    </BrandingCssVarsProvider>
  );
}

TopLayoutCareers.propTypes = {
  docs: PropTypes.object.isRequired,
};
