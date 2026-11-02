import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimplePopper from './SimplePopper';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimplePopper, { ClientProvider });
