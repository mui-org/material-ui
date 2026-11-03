import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import GlobalCssOverrideTheme from './GlobalCssOverrideTheme';
import ClientProvider from './client';

export default createDemo(import.meta.url, GlobalCssOverrideTheme, { ClientProvider });
