import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Sequential from './Sequential';
import ClientProvider from './client';

export default createDemo(import.meta.url, Sequential, { ClientProvider });
