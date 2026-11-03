import Box from '@mui/material/Box';

export default function FreeTemplatesBento() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={(theme) => ({
          width: '100vw',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          py: 3,
          borderBlock: '1px solid',
          borderColor: 'divider',
          background:
            'linear-gradient(180deg, var(--muidocs-palette-primary-50) 0%, hsla(215, 15%, 97%, 0.6) 100%)',
          ...theme.applyStyles('dark', {
            background:
              'linear-gradient(180deg, hsla(210, 100%, 23%, 0.1) 0%, hsla(210, 14%, 4%, 0.5) 100%)',
          }),
        })}
      >
        <Box
          component="img"
          src="/static/blog/material-ui-v6-is-out/light-templates.png"
          loading="lazy"
          sx={(theme) => ({
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
            display: 'block',
            height: 'auto',
            ...theme.applyStyles('dark', {
              content: `url(/static/blog/material-ui-v6-is-out/dark-templates.png)`,
            }),
          })}
        />
      </Box>
    </Box>
  );
}
