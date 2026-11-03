import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimplePaper from './SimplePaper';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimplePaper, { ClientProvider });
