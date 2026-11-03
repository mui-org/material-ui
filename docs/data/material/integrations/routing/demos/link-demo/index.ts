import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import LinkDemo from './LinkDemo';
import ClientProvider from './client';

export default createDemo(import.meta.url, LinkDemo, { ClientProvider });
