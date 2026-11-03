const productNameProductId: Record<string, string> = {
  'material-ui': 'Material UI',
  'base-ui': 'MUI Base',
  x: 'MUI X',
  system: 'MUI System',
  toolpad: 'Toolpad',
  'toolpad-studio': 'Toolpad Studio',
  'toolpad-core': 'Toolpad Core',
  'docs-infra': 'Docs Infra',
};

export function convertProductIdToName(productInfo: {
  productId: string;
  productCategoryId: string;
}): string | undefined {
  return (
    productNameProductId[productInfo.productId] ||
    productNameProductId[productInfo.productCategoryId]
  );
}
