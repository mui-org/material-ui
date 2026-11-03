import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SSRMasonry from './SSRMasonry';
import ClientProvider from './client';

export default createDemo(import.meta.url, SSRMasonry, { ClientProvider });
