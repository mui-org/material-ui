import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import KeepMountedStandardTabs from './KeepMountedStandardTabs';
import ClientProvider from './client';

export default createDemo(import.meta.url, KeepMountedStandardTabs, { ClientProvider });
