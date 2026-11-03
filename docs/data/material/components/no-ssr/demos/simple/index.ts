import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimpleNoSsr from './SimpleNoSsr';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimpleNoSsr, { ClientProvider });
