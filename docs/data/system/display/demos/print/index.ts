import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Print from './Print';
import ClientProvider from './client';

export default createDemo(import.meta.url, Print, { ClientProvider });
