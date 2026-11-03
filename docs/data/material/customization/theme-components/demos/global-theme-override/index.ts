import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import GlobalThemeOverride from './GlobalThemeOverride';
import ClientProvider from './client';

export default createDemo(import.meta.url, GlobalThemeOverride, { ClientProvider });
