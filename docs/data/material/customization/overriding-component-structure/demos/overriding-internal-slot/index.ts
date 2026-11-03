import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import OverridingInternalSlot from './OverridingInternalSlot';
import ClientProvider from './client';

export default createDemo(import.meta.url, OverridingInternalSlot, { ClientProvider });
