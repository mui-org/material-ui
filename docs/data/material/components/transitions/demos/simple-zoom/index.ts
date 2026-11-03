import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimpleZoom from './SimpleZoom';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimpleZoom, { ClientProvider });
