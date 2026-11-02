import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useId from '@mui/utils/useId';
import { internal_useNonce as useNonce } from '@mui/styled-engine';
import GlobalStyles from '../GlobalStyles';
import useThemeWithoutDefault from '../useThemeWithoutDefault';

/**
 * This hook returns a `GlobalStyles` component that sets the CSS layer order (for server-side rendering).
 * Then on client-side, it injects the CSS layer order into the document head to ensure that the layer order is always present first before other Emotion styles.
 */
export default function useLayerOrder(theme: { modularCssLayers?: boolean | string | undefined }) {
  const upperTheme = useThemeWithoutDefault();
  const id = useId() || '';
  const nonce = useNonce();
  const { modularCssLayers } = theme;

  let layerOrder = 'mui.global, mui.components, mui.theme, mui.custom, mui.sx';

  if (!modularCssLayers || upperTheme !== null) {
    // skip this hook if upper theme exists.
    layerOrder = '';
  } else if (typeof modularCssLayers === 'string') {
    layerOrder = modularCssLayers.replace(/mui(?!\.)/g, layerOrder);
  } else {
    layerOrder = `@layer ${layerOrder};`;
  }

  useEnhancedEffect(() => {
    const head = document.querySelector('head');
    if (!head) {
      return;
    }
    const firstChild = head.firstChild as HTMLElement | null;

    if (layerOrder) {
      // Only insert if first child doesn't have data-mui-layer-order attribute
      if (
        firstChild &&
        firstChild.hasAttribute?.('data-mui-layer-order') &&
        firstChild.getAttribute('data-mui-layer-order') === id
      ) {
        return;
      }
      const styleElement = document.createElement('style');
      styleElement.setAttribute('data-mui-layer-order', id);
      if (nonce) {
        styleElement.setAttribute('nonce', nonce);
      }
      styleElement.textContent = layerOrder;

      head.prepend(styleElement);
    } else {
      head.querySelector(`style[data-mui-layer-order="${id}"]`)?.remove();
    }
  }, [layerOrder, id, nonce]);

  if (!layerOrder) {
    return null;
  }

  return <GlobalStyles styles={layerOrder} />;
}
