import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import OverridingRootSlot from './OverridingRootSlot';
import ClientProvider from './client';

export default createDemo(import.meta.url, OverridingRootSlot, { ClientProvider });
