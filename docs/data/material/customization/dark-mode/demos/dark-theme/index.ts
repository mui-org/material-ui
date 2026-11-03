import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DarkTheme from './DarkTheme';
import ClientProvider from './client';

export default createDemo(import.meta.url, DarkTheme, { ClientProvider });
