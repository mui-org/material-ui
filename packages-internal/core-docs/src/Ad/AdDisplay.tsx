import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useTranslate } from '../i18n';
import { adShape } from './AdManager';
import { adBodyImageStyles, adBodyInlineStyles } from './ad.styles';
import { useAdConfig } from './AdProvider';

const InlineShape = styled('span')(({ theme }) => {
  const styles = adBodyInlineStyles(theme);
  return {
    ...styles.root,
    '& img': styles.img,
    '& a, & a:hover': styles.a,
    '& .AdDisplay-imageWrapper': styles.imgWrapper,
    '& .AdDisplay-description': styles.description,
    '& .AdDisplay-poweredby': styles.poweredby,
  };
});

const ImageShape = styled('span')(({ theme }) => {
  const styles = adBodyImageStyles(theme);
  return {
    ...styles.root,
    '& img': styles.img,
    '& a, & a:hover': styles.a,
    '& .AdDisplay-imageWrapper': styles.imgWrapper,
    '& .AdDisplay-description': styles.description,
    '& .AdDisplay-poweredby': styles.poweredby,
  };
});

export interface AdParameters {
  name: string;
  link: string;
  img?: string;
  descriptionHeader: string;
  description: string;
  poweredby: string;
  label: string;
}
interface AdDisplayProps {
  ad: AdParameters;
  className?: string;
  shape?: 'auto' | 'inline' | 'image';
}

export default function AdDisplay(props: AdDisplayProps) {
  const { ad, className, shape: shapeProp = 'auto' } = props;
  const t = useTranslate();

  const { GADisplayRatio } = useAdConfig();

  React.useEffect(() => {
    // Avoid an exceed on the Google Analytics quotas.
    if (Math.random() > (GADisplayRatio ?? 0.1) || !ad.label) {
      return;
    }

    window.gtag('event', 'ad', {
      eventAction: 'display',
      eventLabel: ad.label,
    });
  }, [GADisplayRatio, ad.label]);

  const shape = shapeProp === 'auto' ? adShape : shapeProp;

  const Root = shape === 'image' ? ImageShape : InlineShape;

  return (
    <Root className={className}>
      <a
        href={ad.link}
        target="_blank"
        rel="sponsored"
        {...(ad.label
          ? {
              'data-ga-event-category': 'ad',
              'data-ga-event-action': 'click',
              'data-ga-event-label': ad.label,
            }
          : {})}
      >
        <span className="AdDisplay-imageWrapper">
          <img height="100" width="130" src={ad.img} alt={ad.name} />
        </span>
        <span className="AdDisplay-description">
          <strong>{ad.descriptionHeader}</strong> - {ad.description}
        </span>
      </a>
      <span className="AdDisplay-poweredby">
        {t('adPublisher').replace('{{publisher}}', ad.poweredby)}
      </span>
    </Root>
  );
}
