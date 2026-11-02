import Grid from '@mui/material/Grid';
import { InfoCard } from '@mui/internal-core-docs/InfoCard';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import HighlightAltRoundedIcon from '@mui/icons-material/HighlightAltRounded';
import CssRoundedIcon from '@mui/icons-material/CssRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PictureInPictureRoundedIcon from '@mui/icons-material/PictureInPictureRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import MoveUpRoundedIcon from '@mui/icons-material/MoveUpRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import FlipToFrontRoundedIcon from '@mui/icons-material/FlipToFrontRounded';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import DevicesOtherRoundedIcon from '@mui/icons-material/DevicesOtherRounded';

const utilComponents = [
  {
    title: 'Backdrop',
    link: '/material-ui/react-backdrop/',
    icon: <LayersRoundedIcon color="primary" />,
  },
  {
    title: 'Click-Away Listener',
    link: '/material-ui/react-click-away-listener/',
    icon: <HighlightAltRoundedIcon color="primary" />,
  },
  {
    title: 'CSS Baseline',
    link: '/material-ui/react-css-baseline/',
    icon: <CssRoundedIcon color="primary" />,
  },
  {
    title: 'Modal',
    link: '/material-ui/react-modal/',
    icon: <PictureInPictureRoundedIcon color="primary" />,
  },
  {
    title: 'No SSR',
    link: '/material-ui/react-no-ssr/',
    icon: <DnsRoundedIcon color="primary" />,
  },
  {
    title: 'Popover',
    link: '/material-ui/react-popover/',
    icon: <MenuOpenRoundedIcon color="primary" />,
  },
  {
    title: 'Popper',
    link: '/material-ui/react-popper/',
    icon: <FlipToFrontRoundedIcon color="primary" />,
  },
  {
    title: 'Portal',
    link: '/material-ui/react-portal/',
    icon: <MoveUpRoundedIcon color="primary" />,
  },
  {
    title: 'Textarea Autosize',
    link: '/material-ui/react-textarea-autosize/',
    icon: <TextFieldsRoundedIcon color="primary" />,
  },
  {
    title: 'Transitions',
    link: '/material-ui/transitions/',
    icon: <ZoomOutMapRoundedIcon color="primary" />,
  },
  {
    title: 'useMediaQuery',
    link: '/material-ui/react-use-media-query/',
    icon: <DevicesOtherRoundedIcon color="primary" />,
  },
];

export default function MaterialUtilComponents() {
  return (
    <Grid container spacing={2}>
      {utilComponents.map(({ icon, title, link }) => (
        <Grid key={title} size={{ xs: 12, sm: 4 }}>
          <InfoCard link={link} title={title} icon={icon} />
        </Grid>
      ))}
    </Grid>
  );
}
