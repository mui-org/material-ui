import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DefaultTheme from './DefaultTheme';
import ClientProvider from './client';

export default createDemo(import.meta.url, DefaultTheme, { ClientProvider });
