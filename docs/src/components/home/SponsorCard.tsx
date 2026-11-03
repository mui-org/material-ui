import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link } from '@mui/internal-core-docs/Link';

export default function SponsorCard(props: {
  item: {
    src: string;
    srcDark?: string;
    srcSet?: string;
    name: string;
    description: string;
    href: string;
  };
  inView?: boolean;
  logoSize?: number | string;
}) {
  const { item, inView = false, logoSize = 40 } = props;
  // Keep it under two rows maximum.
  if (item.description.length > 50 && logoSize === 40) {
    throw new Error(
      `${item.name}'s description is too long (${item.description.length} characters). It must fit into two line, so under 50 characters.`,
    );
  }

  return (
    <Paper
      component={Link}
      noLinkStyle
      data-ga-event-category="sponsor"
      data-ga-event-action="homepage"
      data-ga-event-label={new URL(item.href).hostname}
      href={item.href}
      target="_blank"
      rel="sponsored"
      variant="outlined"
      sx={{
        p: 2,
        display: 'flex',
        gap: 2,
        height: '100%',
      }}
    >
      <Avatar
        {...(inView && { src: item.src, srcSet: item.srcSet, alt: `${item.name} logo` })}
        sx={[
          { borderRadius: '4px', width: logoSize, height: logoSize },
          (theme) =>
            item.srcDark
              ? theme.applyDarkStyles({
                  content: `url(${item.srcDark})`,
                })
              : null,
        ]}
        slotProps={{ img: { loading: 'lazy' } }}
      />
      <div>
        <Typography variant="body2" sx={{ fontWeight: 'semiBold', mb: '2px' }}>
          {item.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {item.description}
        </Typography>
      </div>
    </Paper>
  );
}
