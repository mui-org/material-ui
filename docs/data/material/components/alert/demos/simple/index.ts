import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimpleAlert from './SimpleAlert';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimpleAlert, { ClientProvider });
