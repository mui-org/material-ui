import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import BasicMasonry from './BasicMasonry';
import ClientProvider from './client';

export default createDemo(import.meta.url, BasicMasonry, { ClientProvider });
