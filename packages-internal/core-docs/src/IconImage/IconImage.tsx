import * as React from 'react';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/system';
import { ThemeOptionsContext } from '../ThemeContext';

export type IconImageProps = {
  name:
    | 'product-core'
    | 'product-advanced'
    | 'product-toolpad'
    | 'product-templates'
    | 'product-designkits'
    | 'pricing/x-plan-pro'
    | 'pricing/x-plan-premium'
    | 'pricing/x-plan-community'
    | 'pricing/yes'
    | 'pricing/no'
    | 'pricing/time'
    | 'companies/spotify'
    | 'companies/amazon'
    | 'companies/nasa'
    | 'companies/netflix'
    | 'companies/unity'
    | 'companies/shutterstock'
    | 'companies/southwest'
    | 'companies/siemens'
    | 'companies/deloitte'
    | 'companies/apple'
    | 'companies/twitter'
    | 'companies/salesforce'
    | 'companies/verizon'
    | 'companies/atandt'
    | 'companies/patreon'
    | 'companies/ebay'
    | 'companies/samsung'
    | 'companies/volvo'
    | 'companies/tesla'
    | string;
  height?: number;
  mode?: '' | 'light' | 'dark';
  sx?: SxProps<Theme>;
  width?: number;
} & Omit<React.JSX.IntrinsicElements['img'], 'ref'>;

const Img = styled('img')({ display: 'inline-block', verticalAlign: 'bottom' });

let neverHydrated = true;

export default function IconImage(props: IconImageProps) {
  const { height: heightProp, name, width: widthProp, mode: modeProp, ...other } = props;
  const themeOptions = React.useContext(ThemeOptionsContext);
  const [firstRender, setFirstRender] = React.useState(true);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFirstRender(false);
    neverHydrated = false;
  }, []);
  let defaultWidth;
  let defaultHeight;
  const mode = modeProp ?? themeOptions.paletteMode;

  if (name.startsWith('product-')) {
    defaultWidth = 36;
    defaultHeight = 36;
  } else if (name.startsWith('pricing/x-plan-')) {
    defaultWidth = 17;
    defaultHeight = 20;
  } else if (['pricing/yes', 'pricing/no', 'pricing/time'].includes(name)) {
    defaultWidth = 18;
    defaultHeight = 18;
  }

  const width = widthProp ?? defaultWidth;
  const height = heightProp ?? defaultHeight;

  // First time render with a theme depend image
  if (firstRender && neverHydrated && mode !== '') {
    if (other.loading === 'eager') {
      return (
        <React.Fragment>
          <Img
            className="only-light-mode-v2"
            src={`/static/branding/${name}-light.svg`}
            alt=""
            width={width}
            height={height}
            {...other}
            loading="lazy"
          />
          <Img
            className="only-dark-mode-v2"
            src={`/static/branding/${name}-dark.svg`}
            alt=""
            width={width}
            height={height}
            {...other}
            loading="lazy"
          />
        </React.Fragment>
      );
    }

    // Prevent hydration mismatch between the light and dark mode image source.
    return <Box component="span" sx={{ width, height, display: 'inline-block' }} />;
  }

  return (
    <Img
      src={`/static/branding/${name}${mode ? `-${mode}` : ''}.svg`}
      alt=""
      loading="lazy"
      width={width}
      height={height}
      {...other}
    />
  );
}
