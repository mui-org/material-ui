import Grid from '@mui/material/Grid';
import InstallDesktopRoundedIcon from '@mui/icons-material/InstallDesktopRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import { InfoCard } from '@mui/internal-core-docs/InfoCard';

const content = [
  {
    title: 'Installation',
    description: 'Add Material UI to your project with a few commands.',
    link: '/material-ui/getting-started/installation/',
    icon: <InstallDesktopRoundedIcon color="primary" />,
  },
  {
    title: 'Usage',
    description: 'Learn the basics about Material UI components.',
    link: '/material-ui/getting-started/usage/',
    icon: <DrawRoundedIcon color="primary" />,
  },
  {
    title: 'Example projects',
    description: 'A collection of boilerplates to jumpstart your next project.',
    link: '/material-ui/getting-started/example-projects/',
    icon: <PlayCircleFilledWhiteRoundedIcon color="primary" />,
  },
  {
    title: 'Customizing components',
    description: 'Learn about the available customization methods.',
    link: '/material-ui/customization/how-to-customize/',
    icon: <DesignServicesRoundedIcon color="primary" />,
  },
  {
    title: 'Templates',
    description: 'Get started with a selection of free templates.',
    link: '/material-ui/getting-started/templates/',
    icon: <WebRoundedIcon color="primary" />,
  },
  {
    title: 'Design resources',
    description: 'The Material UI components in your favorite design tool.',
    link: 'https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x',
    icon: (
      <img
        src={`/static/branding/design-kits/figma-logo.svg`}
        alt="Figma logo"
        loading="lazy"
        width="18"
        height="18"
      />
    ),
  },
];

export default function MaterialStartingLinksCollection() {
  return (
    <Grid container spacing={2}>
      {content.map(({ icon, title, description, link }) => (
        <Grid key={title} size={{ xs: 12, sm: 6, md: 4 }}>
          <InfoCard
            classNameTitle="algolia-lvl3"
            classNameDescription="algolia-content"
            link={link}
            title={title}
            icon={icon}
            description={description}
          />
        </Grid>
      ))}
    </Grid>
  );
}
