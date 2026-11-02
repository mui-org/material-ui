import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import GoogleMaps from './GoogleMaps';
import ClientProvider from './client';

export default createDemo(import.meta.url, GoogleMaps, { ClientProvider });
