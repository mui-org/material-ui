import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import PortalClickAway from './PortalClickAway';
import ClientProvider from './client';

export default createDemo(import.meta.url, PortalClickAway, { ClientProvider });
