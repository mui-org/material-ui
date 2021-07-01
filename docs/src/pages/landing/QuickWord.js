import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const backers = [
  {
    href: 'https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=homepage',
    alt: 'tidelift',
    title: 'Tidelift — Enterprise-ready open source software',
  },
  {
    href: 'https://bit.dev',
    alt: 'bitsrc',
    title: 'Bitsrc — The fastest way to share code',
  },
  {
    href: 'https://www.text-em-all.com',
    alt: 'textemall',
    title: 'Text-Em-All - Mass Text Messaging & Automated Calling',
  },
  {
    href: 'https://octopus.com/?utm_source=materialui&utm_medium=referral',
    alt: 'octopus',
    title: 'Octopus - Repeatable, reliable deployments',
  },
  {
    href: 'https://www.doit-intl.com/?utm_source=materialui&utm_medium=referral',
    alt: 'doit-intl',
    title: 'DoiT - Management Platform for Google Cloud and AWS',
  },
  {
    href: 'https://www.movavi.com/',
    alt: 'movavi',
    title: 'Movavi: Safe Multimedia Software',
  },
];

const useStyles = makeStyles(
  (theme) => ({
    root: {
      textAlign: 'center',
      minHeight: 60,
      paddingBottom: theme.spacing(2),
    },
  }),
  { name: 'QuickWord' },
);

export default function QuickWord() {
  const classes = useStyles();
  const t = useTranslate();
  const backer = backers[Math.floor(backers.length * Math.random())];

  return (
    <div className={classes.root}>
      <Typography variant="caption">{t('homeQuickWord')}</Typography>
      <NoSsr defer>
        <Link
          variant="body2"
          display="block"
          data-ga-event-category="sponsor"
          data-ga-event-action="quick-word"
          data-ga-event-label={backer.alt}
          href={backer.href}
          target="_blank"
          rel="noopener nofollow"
        >
          {backer.title}
        </Link>
      </NoSsr>
    </div>
  );
}
