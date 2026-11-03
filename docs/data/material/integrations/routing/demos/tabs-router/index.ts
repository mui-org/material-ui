import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import TabsRouter from './TabsRouter';
import ClientProvider from './client';

export default createDemo(import.meta.url, TabsRouter, { ClientProvider });
