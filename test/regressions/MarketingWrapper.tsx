import * as React from 'react';
import { BrandingProvider } from '@mui/internal-core-docs/branding';

// `docs/src/components/product*/*.tsx` composites are authored to run inside
// the Next.js docs site and read the docs branding theme
// (`palette.primaryDark`, `palette.gradients`, `applyDarkStyles`, ...).
// Supply it so they render in the regression fixture. `mode="light"` matches
// the live `/material-ui` / `/x` pages' default.
export default function MarketingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BrandingProvider mode="light">
      <div style={{ width: '100%' }}>{children}</div>
    </BrandingProvider>
  );
}
