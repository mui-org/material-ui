import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import VirtualElementPopper from './VirtualElementPopper';
import ClientProvider from './client';

export default createDemo(import.meta.url, VirtualElementPopper, { ClientProvider });
