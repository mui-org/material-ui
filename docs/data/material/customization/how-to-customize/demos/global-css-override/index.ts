import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import GlobalCssOverride from './GlobalCssOverride';
import ClientProvider from './client';

export default createDemo(import.meta.url, GlobalCssOverride, { ClientProvider });
