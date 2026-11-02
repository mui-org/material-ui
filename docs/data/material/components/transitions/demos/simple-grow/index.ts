import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimpleGrow from './SimpleGrow';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimpleGrow, { ClientProvider });
