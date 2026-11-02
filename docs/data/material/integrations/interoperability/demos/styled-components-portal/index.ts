import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import StyledComponentsPortal from './StyledComponentsPortal';
import ClientProvider from './client';

export default createDemo(import.meta.url, StyledComponentsPortal, { ClientProvider });
