import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import AdCarbon from 'docs/src/modules/components/AdCarbon';
import AdReadthedocs from 'docs/src/modules/components/AdReadthedocs';
import AdInHouse from 'docs/src/modules/components/AdInHouse';
import { AdContext, adShape } from 'docs/src/modules/components/AdManager';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const styles = (theme) => ({
  'placement-body-image': {
    margin: theme.spacing(4, 1, 3),
    minHeight: 126,
  },
  'placement-body-inline': {
    margin: theme.spacing(4, 0, 3),
    minHeight: 126,
    display: 'flex',
    alignItems: 'flex-end',
  },
  'placement-body-inline2': {
    margin: theme.spacing(4, 0, 3),
    minHeight: 126,
    display: 'flex',
    alignItems: 'flex-end',
  },
  paper: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
});

function PleaseDisableAdblock(props) {
  const t = useTranslate();

  return (
    <Paper component="span" elevation={0} sx={{ display: 'block', p: 1.5 }} {...props}>
      <Typography variant="body2" display="block" component="span" gutterBottom>
        {t('likeMui')}
      </Typography>
      <Typography variant="body2" display="block" component="span" gutterBottom>
        {t('adblock')}
      </Typography>
      <Typography variant="body2" display="block" component="span" gutterBottom>
        {t('thanks')}{' '}
        <span role="img" aria-label={t('emojiLove')}>
          ❤️
        </span>
      </Typography>
    </Paper>
  );
}

const disable = process.env.NODE_ENV !== 'production' && process.env.ENABLE_AD !== 'true';
const inHouseAds = [
  {
    name: 'scaffoldhub',
    link: 'https://scaffoldhub.io/?partner=1',
    img: '/static/ads-in-house/scaffoldhub.png',
    description: '<b>ScaffoldHub</b>. Automate building your full-stack Material-UI web-app.',
  },
  {
    name: 'templates',
    link: 'https://material-ui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-templates',
    img: '/static/ads-in-house/themes-2.jpg',
    description:
      '<b>Premium Templates</b>. Start your project with the best templates for admins, dashboards, and more.',
  },
  {
    name: 'themes',
    link: 'https://material-ui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-themes',
    img: '/static/ads-in-house/themes.png',
    description:
      '<b>Premium Themes</b>. Kickstart your application development with a ready-made theme.',
  },
  {
    name: 'tidelift',
    link: 'https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=enterprise&utm_content=ad',
    img: '/static/ads-in-house/tidelift.png',
    description:
      '<b>Material-UI for enterprise</b>. Save time and reduce risk. Managed open source — backed by maintainers.',
  },
  {
    name: 'sketch',
    link: 'https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-sketch',
    img: '/static/ads-in-house/sketch.png',
    description:
      '<b>For Sketch</b>. A large UI kit with over 600 handcrafted Material-UI symbols 💎.',
  },
  {
    name: 'figma',
    link: 'https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-figma',
    img: '/static/ads-in-house/figma.png',
    description:
      '<b>For Figma</b>. A large UI kit with over 600 handcrafted Material-UI components 🎨.',
  },
];

function Ad(props) {
  const { classes } = props;

  const [adblock, setAdblock] = React.useState(null);
  const [carbonOut, setCarbonOut] = React.useState(null);

  const { current: randomSplit } = React.useRef(Math.random());
  const { current: randomAdblock } = React.useRef(Math.random());
  const { current: randomInHouse } = React.useRef(Math.random());

  let children;
  let label;
  // Hide the content to google bot to avoid its indexation.
  if (/Googlebot/.test(navigator.userAgent) || disable) {
    children = <span />;
  } else if (adblock) {
    if (randomAdblock < 0.2) {
      children = <PleaseDisableAdblock className={classes.paper} />;
      label = 'in-house-adblock';
    } else {
      children = <AdInHouse ad={inHouseAds[Math.floor(inHouseAds.length * randomInHouse)]} />;
      label = 'in-house';
    }
  } else if (carbonOut) {
    children = <AdInHouse ad={inHouseAds[Math.floor(inHouseAds.length * randomInHouse)]} />;
    label = 'in-house-carbon';
  } else if (randomSplit < 0.9) {
    children = <AdCarbon />;
    label = 'carbon';
  } else {
    children = <AdReadthedocs />;
    label = 'readthedocs';
  }

  const ad = React.useContext(AdContext);
  const eventLabel = label ? `${label}-${ad.placement}-${adShape}` : null;

  const timerAdblock = React.useRef();

  const checkAdblock = React.useCallback(
    (attempt = 1) => {
      if (
        document.querySelector('.ea-placement') ||
        document.querySelector('#carbonads') ||
        document.querySelector('.carbonads') ||
        carbonOut
      ) {
        if (
          document.querySelector('#carbonads a') &&
          document.querySelector('#carbonads a').getAttribute('href') ===
            'https://material-ui-next.com/discover-more/backers'
        ) {
          setCarbonOut(true);
        }

        setAdblock(false);
        return;
      }

      if (attempt < 30) {
        timerAdblock.current = setTimeout(() => {
          checkAdblock(attempt + 1);
        }, 500);
      }

      if (attempt > 6) {
        setAdblock(true);
      }
    },
    [carbonOut],
  );

  React.useEffect(() => {
    if (disable) {
      return undefined;
    }
    checkAdblock();

    return () => {
      clearTimeout(timerAdblock.current);
    };
  }, [checkAdblock]);

  React.useEffect(() => {
    // Avoid an exceed on the Google Analytics quotas.
    if (Math.random() < 0.9 || !eventLabel) {
      return undefined;
    }

    const delay = setTimeout(() => {
      window.ga('send', {
        hitType: 'event',
        eventCategory: 'ad',
        eventAction: 'display',
        eventLabel,
      });
    }, 2500);

    return () => {
      clearTimeout(delay);
    };
  }, [eventLabel]);

  return (
    <Box
      component="span"
      sx={{
        position: 'relative',
        display: 'block',
      }}
      className={classes[`placement-body-${adShape}`]}
      data-ga-event-category="ad"
      data-ga-event-action="click"
      data-ga-event-label={eventLabel}
    >
      {children}
    </Box>
  );
}

Ad.propTypes = {
  classes: PropTypes.object.isRequired,
};

const defaultTheme = createTheme();
export default React.memo(withStyles(styles, { defaultTheme })(Ad));
