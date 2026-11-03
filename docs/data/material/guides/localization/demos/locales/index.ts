import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Locales from './Locales';
import ClientProvider from './client';

export default createDemo(import.meta.url, Locales, { ClientProvider });
