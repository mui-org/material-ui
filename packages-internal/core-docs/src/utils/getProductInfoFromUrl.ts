import { pathnameToLanguage } from '../helpers/helpers';

export type MuiProductId =
  | 'null'
  | 'base-ui'
  | 'material-ui'
  | 'system'
  | 'docs-infra'
  | 'docs'
  | 'x-data-grid'
  | 'x-date-pickers'
  | 'x-charts'
  | 'x-tree-view'
  | 'x-scheduler'
  | 'x-chat'
  | 'toolpad-studio'
  | 'toolpad-core';

type MuiProductCategoryId = 'null' | 'core' | 'x';

interface MuiProductInfo {
  productId: MuiProductId;
  productCategoryId: MuiProductCategoryId;
}

// This is a fallback logic to define the productId and productCategoryId of the page.
// Markdown pages can override this value when the URL patterns they follow are a bit strange,
// which should stay the rare exception.
export function getProductInfoFromUrl(asPath: string): MuiProductInfo {
  const asPathWithoutLang = pathnameToLanguage(asPath).canonicalAsServer;
  const firstFolder = asPathWithoutLang.replace(/^\/+([^/]+)\/.*/, '$1');

  // When serialized undefined/null are the same, so we encode null as 'null' to be
  // able to differentiate when the value isn't set vs. set to the right null value.
  let productCategoryId = 'null';
  let productId = 'null';

  if (firstFolder === 'material-ui' || firstFolder === 'base-ui' || firstFolder === 'system') {
    productCategoryId = 'core';
    productId = firstFolder;
  }

  if (firstFolder === 'x') {
    productCategoryId = 'x';
    productId = `x-${asPathWithoutLang.replace('/x/react-', '').replace(/\/.*/, '')}`;

    // No match, give up on it.
    if (productId === 'x-') {
      productId = 'null';
    }
  }

  if (firstFolder === 'toolpad') {
    productCategoryId = 'toolpad';
    const secondFolder = asPathWithoutLang.replace(/^\/+[^/]+\/([^/]+)\/.*/, '$1');
    if (secondFolder === 'studio') {
      productId = 'toolpad-studio';
    } else {
      productId = 'toolpad-core';
    }
  }

  if (firstFolder === 'docs') {
    productId = firstFolder;
  }

  // TODO remove, legacy
  if (firstFolder === 'versions' || firstFolder === 'production-error') {
    productId = 'docs';
  }

  if (asPathWithoutLang.startsWith('/experiments/docs/')) {
    productId = 'docs-infra';
  }

  return {
    productCategoryId,
    productId,
  } as MuiProductInfo;
}
