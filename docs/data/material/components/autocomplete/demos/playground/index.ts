import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Playground from './Playground';
import ClientProvider from './client';

export default createDemo(import.meta.url, Playground, { ClientProvider });
