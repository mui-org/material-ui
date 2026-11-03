import * as React from 'react';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import type { MuiPage } from '../MuiPage';
import type { MuiProductId } from '../utils/getProductInfoFromUrl';

export type RootSvgProps<P = unknown> = Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
  sx?: SxProps<Theme>;
  ref?: React.Ref<SVGSVGElement>;
} & P;

export interface ProductVersion {
  text: string;
  current?: boolean;
  href?: string;
}

export interface ProductInfo {
  metadata: string;
  name: string;
  logo?: (props: RootSvgProps) => React.JSX.Element;
  logoSvg?: string;
  wordmarkSvg?: string;
  versions: ProductVersion[];
}

export interface MuiPageContext {
  activePage: MuiPage | null;
  pages: MuiPage[];
  productId: MuiProductId;
  productCategoryId: string;
  productIdentifier: ProductInfo;
  activePageParents: MuiPage[];
}

const PageContext = React.createContext<MuiPageContext>(undefined!);

if (process.env.NODE_ENV !== 'production') {
  PageContext.displayName = 'PageContext';
}

export default PageContext;
