import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DemoMultiTabs from './DemoMultiTabs';
import ClientProvider from './client';

export default createDemo(import.meta.url, DemoMultiTabs, { ClientProvider });
