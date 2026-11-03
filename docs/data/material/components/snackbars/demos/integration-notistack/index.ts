import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import IntegrationNotistack from './IntegrationNotistack';
import ClientProvider from './client';

export default createDemo(import.meta.url, IntegrationNotistack, { ClientProvider });
