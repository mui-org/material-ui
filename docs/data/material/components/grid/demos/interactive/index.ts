import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import InteractiveGrid from './InteractiveGrid';
import ClientProvider from './client';

export default createDemo(import.meta.url, InteractiveGrid, { ClientProvider });
