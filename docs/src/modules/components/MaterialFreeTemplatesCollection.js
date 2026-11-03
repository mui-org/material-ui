import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import Visibility from '@mui/icons-material/Visibility';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { useTranslate } from '@mui/internal-core-docs/i18n';
import { pascalCase } from '@mui/internal-core-docs/helpers';
import sourceMaterialTemplates from 'docs/src/modules/material/sourceMaterialTemplates';
import { codeSandbox, stackBlitz } from '@mui/internal-core-docs/sandbox';

const sourcePrefix = `${process.env.SOURCE_CODE_REPO}/tree/v${process.env.LIB_VERSION}`;

function layouts(translation) {
  return [
    {
      title: translation('dashboardTitle'),
      description: translation('dashboardDescr'),
      href: '/material-ui/getting-started/templates/dashboard/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/dashboard`,
      hasDarkMode: true,
    },
    {
      title: translation('marketingPageTitle'),
      description: translation('marketingPageDescr'),
      href: '/material-ui/getting-started/templates/marketing-page/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/marketing-page`,
      hasDarkMode: true,
    },
    {
      title: translation('checkoutTitle'),
      description: translation('checkoutDescr'),
      href: '/material-ui/getting-started/templates/checkout/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/checkout`,
      hasDarkMode: true,
    },
    {
      title: translation('signInTitle'),
      description: translation('signInDescr'),
      href: '/material-ui/getting-started/templates/sign-in/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in`,
      hasDarkMode: true,
    },
    {
      title: translation('signInSideTitle'),
      description: translation('signInSideDescr'),
      href: '/material-ui/getting-started/templates/sign-in-side/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in-side`,
      hasDarkMode: true,
    },
    {
      title: translation('signUpTitle'),
      description: translation('signUpDescr'),
      href: '/material-ui/getting-started/templates/sign-up/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-up`,
      hasDarkMode: true,
    },
    {
      title: translation('blogTitle'),
      description: translation('blogDescr'),
      href: '/material-ui/getting-started/templates/blog/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/blog`,
      hasDarkMode: true,
    },
    {
      title: translation('crudDashboardTitle'),
      description: translation('crudDashboardDescr'),
      href: '/material-ui/getting-started/templates/crud-dashboard/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/crud-dashboard`,
      hasDarkMode: true,
    },
  ];
}

export default function MaterialFreeTemplatesCollection() {
  const translation = useTranslate();
  const materialTemplates = sourceMaterialTemplates();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
      {layouts(translation).map((layout, index) => {
        const templateId = layout.source.split('/').pop();
        const templateName = pascalCase(templateId);
        const item = materialTemplates.map.get(templateId);
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} key={layout.title}>
            <Typography component="h3" variant="h6" sx={{ fontWeight: 'semiBold' }}>
              {layout.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              {layout.description}
            </Typography>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderColor: 'divider',
              }}
            >
              <Link
                href={layout.href}
                sx={{
                  position: 'relative',
                  '&:hover > .MuiCardMedia-root': {
                    filter: 'blur(4px)',
                  },
                  '&:hover > .MuiButtonBase-root': {
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  // The image source is generated from `pnpm template:screenshot material-ui`, do not modify the image manually.
                  image={`/static/screenshots${layout.href.replace(/\/$/, '')}.jpg`}
                  alt={layout.title}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  sx={(theme) => ({
                    aspectRatio: '16 / 9',
                    objectPosition: 'top',
                    transition: 'filter 0.3s',
                    ...theme.applyStyles('dark', {
                      content: 'var(--src)',
                    }),
                  })}
                  style={{
                    '--src': layout.hasDarkMode
                      ? `url(/static/screenshots${layout.href.replace(/\/$/, '')}-dark.jpg)`
                      : `url(/static/screenshots${layout.href.replace(/\/$/, '')}.jpg)`,
                  }}
                />
                <Button
                  variant="text"
                  endIcon={<OpenInNewRoundedIcon />}
                  component="div"
                  data-ga-event-category="material-ui-template"
                  data-ga-event-label={layout.title}
                  data-ga-event-action="preview-img"
                  tabIndex={null}
                  role="none"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    backgroundColor: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'background.default',
                    },
                  }}
                >
                  See live preview
                </Button>
              </Link>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Tooltip title="Edit in StackBlitz">
                    <IconButton
                      color="primary"
                      size="small"
                      aria-label="StackBlitz playground"
                      data-ga-event-category="material-ui-template"
                      data-ga-event-label={templateId}
                      data-ga-event-action="stackblitz"
                      onClick={() =>
                        stackBlitz
                          .createMaterialTemplate({
                            ...item,
                            files: { ...item.files, ...materialTemplates.sharedTheme?.files },
                            title: `${templateName} Template - Material UI`,
                            githubLocation: `${process.env.SOURCE_CODE_REPO}/blob/v${
                              process.env.LIB_VERSION
                            }/docs/data/material/templates/${templateId}/${templateName}.${
                              item.codeVariant === 'TS' ? 'tsx' : 'js'
                            }`,
                          })
                          .replaceContent((content) => {
                            if (typeof content === 'string') {
                              return content
                                .replace(/\.\.\/shared-theme\//g, './theme/')
                                .replace('./App', `./${templateName}`);
                            }
                            return content;
                          })
                          .openStackBlitz(`/${templateName}`)
                      }
                    >
                      <SvgIcon viewBox="0 0 19 28">
                        <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit in CodeSandbox">
                    <IconButton
                      color="primary"
                      size="small"
                      aria-label="CodeSandbox playground"
                      data-ga-event-category="material-ui-template"
                      data-ga-event-label={templateId}
                      data-ga-event-action="codesandbox"
                      onClick={() =>
                        codeSandbox
                          .createMaterialTemplate({
                            ...item,
                            files: { ...item.files, ...materialTemplates.sharedTheme?.files },
                            title: `${templateName} Template - Material UI`,
                            githubLocation: `${process.env.SOURCE_CODE_REPO}/blob/v${
                              process.env.LIB_VERSION
                            }/docs/data/material/templates/${templateId}/${templateName}.${
                              item.codeVariant === 'TS' ? 'tsx' : 'js'
                            }`,
                          })
                          .replaceContent((content) => {
                            if (typeof content === 'string') {
                              return content
                                .replace(/\.\.\/shared-theme\//g, './theme/')
                                .replace('./App', `./${templateName}`);
                            }
                            return content;
                          })
                          .openSandbox(`/${templateName}`)
                      }
                    >
                      <SvgIcon viewBox="0 0 1080 1080">
                        <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="See source code">
                    <IconButton component="a" href={layout.source} color="primary" size="small">
                      <CodeRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Button
                  component="a"
                  href={layout.href}
                  size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<Visibility sx={{ mr: 0.5 }} />}
                  data-ga-event-category="material-ui-template"
                  data-ga-event-label={layout.title}
                  data-ga-event-action="preview-img"
                  sx={{ alignSelf: 'self-start' }}
                >
                  Live preview
                </Button>
              </Box>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}
