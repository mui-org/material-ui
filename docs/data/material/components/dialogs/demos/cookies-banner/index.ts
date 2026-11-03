import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import CookiesBanner from './CookiesBanner';
import ClientProvider from './client';

export default createDemo(import.meta.url, CookiesBanner, { ClientProvider });
