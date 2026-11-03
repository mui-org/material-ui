import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import LinkRouter from './LinkRouter';
import ClientProvider from './client';

export default createDemo(import.meta.url, LinkRouter, { ClientProvider });
