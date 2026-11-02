import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Demo from './Demo';
import ClientProvider from './client';

export default createDemo(import.meta.url, Demo, { ClientProvider });
