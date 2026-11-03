import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DemoInDocs from './DemoInDocs';
import ClientProvider from './client';

export default createDemo(import.meta.url, DemoInDocs, { ClientProvider });
