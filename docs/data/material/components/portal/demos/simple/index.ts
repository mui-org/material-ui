import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimplePortal from './SimplePortal';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimplePortal, { ClientProvider });
