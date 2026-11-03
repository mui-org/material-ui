import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ListRouter from './ListRouter';
import ClientProvider from './client';

export default createDemo(import.meta.url, ListRouter, { ClientProvider });
