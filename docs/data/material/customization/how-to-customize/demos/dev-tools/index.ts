import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DevTools from './DevTools';
import ClientProvider from './client';

export default createDemo(import.meta.url, DevTools, { ClientProvider });
